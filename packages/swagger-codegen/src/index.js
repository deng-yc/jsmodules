/* eslint-disable */
const axios = require("axios");
const template = require("art-template");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const cwdDir = process.cwd();

function replaceName(name) {
    return name.replace(/[-|_|:]./g, function (r) {
        return r.replace(/[-|_|:]/, "").toUpperCase();
    });
}

function getFuncName(pathName) {
    const parts = pathName.split("/");
    let name = "",
        subNames = [];
    for (let i = parts.length; i > 0; i--) {
        const part = parts[i - 1];
        if (/^\{.+\}$/.test(part)) {
            subNames.push(part.replace(/[{|}]/g, ""));
        } else {
            name = part;
            break;
        }
    }
    if (subNames.length > 0) {
        name = name + "-by-" + subNames.join("-and-");
    }
    return replaceName(name);
}

function transformTypeName(type) {
    switch (type) {
        case "string":
        case "number":
        case "boolean":
            return type;
        case "integer":
            return "number";
        case "object":
        default:
            return "any";
    }
}

function getRequestBodyType(components, ref) {
    const componentName = ref.replace("#/components/schemas/", "");
    const component = components.schemas[componentName];
    let type = "{ ";
    if (component) {
        if (component.type === "object") {
            const properties = component.properties;
            for (const p in properties) {
                const prop = properties[p];
                let propName = p;
                let propType = "";
                if (prop.$ref) {
                    propType = getRequestBodyType(components, prop.$ref);
                } else if (prop.type === "array") {
                    const items = prop.items;
                    if (items.$ref) {
                        propType = getRequestBodyType(components, items.$ref) + "[]";
                    } else {
                        propType = transformTypeName(prop.type) + "[]";
                    }
                } else {
                    propType = transformTypeName(prop.type);
                }
                if (prop.nullable) {
                    propName = propName + "?";
                }
                type = type + propName + ": " + propType + ", ";
            }
        }
        if (component.type === "string") {
            if (component.enum) {
                return component.enum.map((item) => `"${item}"`).join(" | ");
            }
            return "string";
        }
    }
    return type + "}";
}

async function codegen(config = {}, options) {
    const outputPath = path.join(cwdDir, options.outputPath, config.outputDir);
    console.log(outputPath);
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    console.log("获取配置文件", config.docsUrl);
    const res = await axios.get(config.docsUrl);

    const { paths, components } = res.data;

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
                .filter((p) => p.in == "path")
                .map((p) => {
                    return {
                        name: p.name,
                        type: p.schema.type,
                        required: p.required,
                        description: p.description || "无说明",
                    };
                });
            func.paramNames = func.params.map((m) => `${m.name}${m.required ? "" : "?"}`).join(", ");
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
            func.url = pathName.replace("/1", "").replace(/\{/g, "${");
            func.summary = func.summary || [];
            func.summary.push(method.summary);
            func.method = func.method || [];

            let apiMethodName = methodName.toLowerCase();
            if (methodName === "delete") {
                apiMethodName = "remove";
            }
            let apiReqBody = [];
            if (method.requestBody) {
                const schema = method.requestBody.content["application/json"].schema;
                let type = {};
                let name = "body";

                if (schema.$ref) {
                    type = getRequestBodyType(components, schema.$ref);
                } else {
                    type = transformTypeName(schema.type);
                }
                apiReqBody.push({
                    name: name,
                    type,
                });
            }
            func.method.push({
                api: apiMethodName,
                name: methodName.toUpperCase(),
                summary: method.summary,
                params: apiReqBody,
            });

            func.methodNames = func.method.map((m) => `'${m.name}'`).join(", ");
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

    const templatePath = path.join(__dirname, "template.art");
    const srcPath = path.join(cwdDir, options.srcPath);
    let files = [];
    for (const name in apis) {
        const data = apis[name];
        data.relative = path.relative(outputPath, srcPath).replace(/\\/g, "/");
        data.apiName = `${config.prefix}${name}Api`;
        data.diName = `${config.prefix}${name}Api`;
        data.configName = config.diName;
        const content = template(templatePath, data);
        const outputFileName = path.join(outputPath, `${name}.ts`.toLowerCase());
        fs.writeFileSync(outputFileName, content, "utf-8");
        console.log("生成文件", data.apiName, "->", outputFileName);
        files.push(outputFileName);
    }
    return files;
}

exports.apis = async function apis(configs, options) {
    let apis = [];
    for (const config of configs) {
        const results = await codegen(config, options);
        apis.push({
            name: config.diName,
            apis: results,
        });
    }

    const rel = path.join(cwdDir, options.outputPath);
    const exportFile = path.join(rel, "index.ts");
    fs.writeFileSync(exportFile, `//生成时间:${new Date().toLocaleString()}\n`);
    for (const api of apis) {
        const apiFile = path.join(rel, api.name + ".ts");
        fs.writeFileSync(apiFile, `//生成时间:${new Date().toLocaleString()}\n`);
        for (const file of api.apis) {
            var d = path.relative(rel, file).replace(/\\/g, "/").replace(/.ts$/, "");
            fs.appendFileSync(apiFile, `export * from './${d}'\n`);
        }
        // var d = path.relative(rel, file).replace(/\\/g, "/").replace(/.ts$/, "");
        fs.appendFileSync(exportFile, `export * from './${api.name}'\n`);
    }
};
