/* eslint-disable */
const fetch = require('node-fetch');
const template = require('art-template');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const cwdDir = process.cwd();

function replaceName(name) {
  return name.replace(/[-|_|:]./g, function (r) {
    return r.replace(/[-|_|:]/, '').toUpperCase();
  });
}

const reserved = [
  'break',
  'as',
  'catch',
  'switch',
  'case',
  'if',
  'throw',
  'else',
  'var',
  'instanceof',
  'typeof',
  'public',
  'private',
  'enum',
  'export',
  'finally',
  'for',
  'while',
  'void',
  'null',
  'super',
  'this',
  'new',
  'in',
  'return',
  'true',
  'false',
  'extends',
  'static',
  'let',
  'package',
  'implements',
  'interface',
  'function',
  'new',
  'try',
  'yield',
  'const',
  'continue',
  'do',
];

function getFuncName(pathName) {
  const parts = pathName.split('/');
  let name = '',
    subNames = [];
  for (let i = parts.length; i > 0; i--) {
    const part = parts[i - 1];
    if (/^\{.+\}$/.test(part)) {
      subNames.push(part.replace(/[{|}]/g, ''));
    } else {
      name = part;
      break;
    }
  }
  if (subNames.length > 0) {
    name = name + '-by-' + subNames.join('-and-');
  }
  if (reserved.includes(name)) {
    console.warn(name, '是保留关键字,重命名为', '$' + name);
    name = '$' + name;
  }
  return replaceName(name);
}

function transformTypeName(type, format) {
  switch (type) {
    case 'string':
    case 'number':
    case 'boolean':
      return type;
    case 'integer':
      if (format === 'int64') {
        return 'string';
      }
      return 'number';
    case 'object':
    default:
      return 'any';
  }
}

function getRequestBodyType(components, ref) {
  const componentName = ref.replace('#/components/schemas/', '');
  const component = components.schemas[componentName];
  let type = '{ ';
  if (component) {
    if (component.type === 'object') {
      const properties = component.properties;
      for (const p in properties) {
        const prop = properties[p];
        let propName = p;
        let propType = '';
        if (prop.$ref) {
          propType = getRequestBodyType(components, prop.$ref);
        } else if (prop.type === 'array') {
          const items = prop.items;
          if (items.$ref) {
            propType = getRequestBodyType(components, items.$ref) + '[]';
          } else {
            propType = transformTypeName(prop.type, prop.format) + '[]';
          }
        } else {
          propType = transformTypeName(prop.type, prop.format);
        }
        if (prop.nullable) {
          propName = propName + '?';
          propType += ' | null';
        }
        type = type + propName + ': ' + propType + ', ';
      }
    }
    if (component.type === 'string') {
      if (component.enum) {
        return component.enum.map(item => `"${item}"`).join(' | ');
      }
      return 'string';
    }
  }
  return type + '}';
}

template.defaults.imports.transformTypeName = transformTypeName;

function typesgen(components, outputDir, outputName) {
  const schemas = components.schemas;
  const templatePath = path.join(__dirname, 'templates/types.art');
  const content = template(templatePath, { moduleName: outputName, schemas: schemas });
  const typesDir = path.join(outputDir, 'types');
  const typesFile = path.join(typesDir, outputName + '.d.ts');
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }
  fs.writeFileSync(typesFile, content);
  return typesFile;
}

async function codegen(config = {}, options) {
  const outputDir = path.join(cwdDir, options.outputPath || options.outputDir);
  const outputPath = path.join(cwdDir, options.outputPath || options.outputDir, config.outputDir);
  console.log(outputPath);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  console.log('获取配置文件', config.docsUrl);
  try {
    const resp = await fetch(config.docsUrl);
    const data = await resp.json();
    // const res = await axios.get(config.docsUrl, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   ...options.axios,
    // });
    // const data = res.data;

    const { paths, components } = data;

    const typesFile = typesgen(components, outputDir, config.prefix || 'defaultApi');

    const apis = {};

    for (const pathName in paths) {
      const methods = paths[pathName];
      for (const methodName in methods) {
        const method = methods[methodName];
        const apiName = method.tags[0];
        const api = (apis[apiName] = apis[apiName] || {
          names: {},
          functions: {},
        });
        const functions = api.functions;
        const func = (functions[pathName] = functions[pathName] || {});
        const parameters = method.parameters || [];
        func.params = parameters
          .filter(p => p.in == 'path')
          .map(p => {
            return {
              name: p.name,
              type: p.schema.type,
              required: p.required,
              description: p.description || '无说明',
            };
          });

        func.paramNames = func.params.map(m => `${m.name}${m.required ? '' : '?'}`).join(', ');
        let funcName = getFuncName(pathName);
        let securityRequired = true;
        if (config.rules && config.rules[pathName]) {
          const rule = config.rules[pathName];
          if (_.isString(rule)) {
            funcName = rule;
          } else {
            if (rule.name) {
              funcName = rule.name;
            }
            securityRequired = rule.securityRequired;
          }
        } else {
          let key = `${funcName}${apiName}`;
          let nameInfo = api.names[key] || { count: 0, pathName };
          if (nameInfo.count > 0 && nameInfo.pathName != pathName) {
            nameInfo.count += 1;
            console.log(apiName, funcName, nameInfo.count);
            funcName = `${funcName}_${nameInfo.count}`;
          } else {
            nameInfo.count = 1;
          }
          api.names[key] = nameInfo;
        }
        func.name = funcName;
        func.url = pathName.replace('/1', '').replace(/\{/g, '${');
        func.summary = func.summary || [];
        func.summary.push(method.summary);
        func.method = func.method || [];

        let apiMethodName = methodName.toLowerCase();
        if (methodName === 'delete') {
          apiMethodName = 'remove';
        }
        let apiReqBody = [];
        if (method.requestBody) {
          const schema = method.requestBody.content['application/json'].schema;
          let type = {};
          let name = 'body';

          if (schema.$ref) {
            type = getRequestBodyType(components, schema.$ref);
          } else {
            type = transformTypeName(schema.type, schema.format);
          }
          apiReqBody.push({
            name: name,
            type,
            required: true,
          });
        }
        if (['get', 'head', 'delete', 'post', 'put', 'patch'].includes(methodName)) {
          if (!method.requestBody && methodName !== 'get') {
            apiReqBody.push({
              name: 'data',
              type: 'any',
            });
          }
          apiReqBody.push({
            name: 'query',
            type: 'any',
            required: false,
          });
        }
        func.method.push({
          api: apiMethodName,
          name: methodName.toUpperCase(),
          summary: method.summary,
          paramsDef: apiReqBody.map(s => `${s.name}${s.required ? '' : '?'}:${s.type}`).join(', '),
          paramsCall: apiReqBody.map(s => s.name).join(', '),
        });

        func.methodNames = func.method.map(m => `'${m.name.toUpperCase()}'`).join(', ');
        if (!func.security) {
          if (method.security && method.security.length > 0) {
            func.security = {
              required: securityRequired,
            };
          }
        } else {
          if (!method.security || method.security.length == 0) {
            func.security.required = false;
          }
        }
        if (options.security && func.security) {
          func.security.required = options.security.required;
        }
      }
    }

    const templatePath = path.join(__dirname, 'templates/template.art');
    const srcPath = path.join(cwdDir, options.srcPath);
    let files = [];
    for (const name in apis) {
      const data = apis[name];
      data.relativeSrc = path.relative(outputPath, srcPath).replace(/\\/g, '/');
      data.relativeOutput = path.relative(outputPath, outputDir).replace(/\\/g, '/');
      data.apiName = `${name}Api`;
      data.configName = config.configName;
      const content = template(templatePath, data);
      const outputFileName = path.join(outputPath, `${name}.ts`.toLowerCase());
      fs.writeFileSync(outputFileName, content, 'utf-8');
      console.log('生成文件', data.apiName, '->', outputFileName);
      files.push({
        file: outputFileName,
        data,
      });
    }
    return { files, typesFile };
  } catch (err) {
    return Promise.reject(new Error(err.message));
  }
}

function genHttpBuild(configNames, options) {
  const srcPath = path.join(cwdDir, options.srcPath);
  const outputPath = path.join(cwdDir, options.outputPath);

  const srcRelative = path.relative(outputPath, srcPath).replace(/\\/g, '/');
  const configFile = path.join(outputPath, './config.ts');
  fs.writeFileSync(
    configFile,
    `//生成时间:${new Date().toLocaleString()}
import { httpClient } from "${srcRelative}/ApiHttpClient";
`,
  );
  for (const configName in configNames) {
    fs.appendFileSync(
      configFile,
      `
export function ${configName}(apiPath:string){
  return httpClient.get("${configName}",apiPath);
}
`,
    );
  }
}

exports.apis = async function apis(configs, options) {
  const outputDir = path.join(cwdDir, options.outputPath || options.outputDir);
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  let apis = [];
  const configNames = {};
  for (const config of configs) {
    const { files, typesFile } = await codegen(config, options);
    configNames[config.configName] = config.configName;
    apis.push({
      name: config.prefix,
      path: config.outputDir,
      typesFile,
      groups: files,
    });
  }

  const rel = path.join(cwdDir, options.outputPath);
  const exportFile = path.join(rel, 'index.ts');
  fs.writeFileSync(exportFile, `//生成时间:${new Date().toLocaleString()}\n`);
  for (const api of apis) {
    const apiIndex = path.join(rel, api.path, 'index.ts');
    fs.writeFileSync(apiIndex, `//生成时间:${new Date().toLocaleString()}\n`);
    for (const group of api.groups) {
      var d = path.relative(path.join(rel, api.path), group.file).replace(/\\/g, '/').replace(/.ts$/, '');
      fs.appendFileSync(apiIndex, `export * as ${group.data.apiName} from './${d}'\n`);
    }
    var d = path.relative(rel, apiIndex).replace(/\\/g, '/').replace(/.ts$/, '');
    if (api.name) {
      fs.appendFileSync(exportFile, `export * as ${api.name} from './${d}'\n`);
    } else {
      fs.appendFileSync(exportFile, `export * ${api.name} from './${d}'\n`);
    }
    // if (api.typesFile) {
    //   var typesRel = path
    //     .relative(rel, api.typesFile)
    //     .replace(/\\/g, '/')
    //     .replace(/\.d\.ts$/, '');

    //   if (api.name) {
    //     fs.appendFileSync(exportFile, `export * as ${api.name}Models from './${typesRel}'\n`);
    //   } else {
    //     fs.appendFileSync(exportFile, `export * from './${typesRel}'\n`);
    //   }
    // }
  }
  genHttpBuild(configNames, options);
};
