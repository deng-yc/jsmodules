/* eslint-disable */
const axios = require("axios");
const template = require("art-template");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const cwdDir = process.cwd();

function replaceName(name) {
    return name.replace(/[-|_]./g, function (r) {
        return r.replace(/[-|_]/, "").toUpperCase();
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

async function codegen(config = {}, options) {
    const outputDir = path.join(cwdDir, options.outputDir, config.outputDir);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("获取配置文件", config.docsUrl);
    const res = await axios.get(config.docsUrl);

    const { paths } = res.data;

    const apis = {};

    for (const pathName in paths) {
        const methods = paths[pathName];
        for (const methodName in methods) {
            const method = methods[methodName];
            const apiName = method.tags[0];
            const api = (apis[apiName] = apis[apiName] || {
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
            }
            func.name = funcName;
            func.url = pathName.replace("/1", "").replace(/\{/g, "${");
            func.summary = func.summary || [];
            func.summary.push(method.summary);
            func.method = func.method || [];
            func.method.push({ name: methodName.toUpperCase(), summary: method.summary });
            func.methodNames = func.method.map((m) => `'${m.name}'`).join(", ");
            if (!func.security) {
                if (method.security && method.security.length > 0) {
                    func.security = {
                        required: securityRequired,
                    };
                }
            }
        }
    }

    const templatePath = process.cwd() + "/scripts/codegen/api.art";

    let files = [];
    for (const name in apis) {
        const data = apis[name];
        data.relative = path.relative(outputDir, cwdDir + "/src").replace(/\\/g, "/");
        data.apiName = `${config.prefix}${name}Api`;
        data.diName = `${config.prefix}${name}Api`;
        data.configName = config.diName;
        const content = template(templatePath, data);
        const outputPath = path.join(outputDir, `${name}.ts`.toLowerCase());
        fs.writeFileSync(outputPath, content, "utf-8");
        console.log("生成文件", data.apiName, "->", outputPath);
        files.push(outputPath);
    }
    return files;
}

exports.apis = async function apis(configs, options) {
    let imports = [];
    for (const config of configs) {
        const results = await codegen(config, options);
        imports.push(...results);
    }

    const rel = path.join(cwdDir, options.outputDir);
    const exportFile = path.join(rel, "index.ts");

    fs.writeFileSync(exportFile, `//生成时间:${new Date().toLocaleString()}\n`);
    for (const file of imports) {
        var d = path.relative(rel, file).replace(/\\/g, "/").replace(/.ts$/, "");

        fs.appendFileSync(exportFile, `export * from './${d}'\n`);
    }
};
