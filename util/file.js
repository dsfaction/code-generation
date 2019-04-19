let tpl = require('mini-tpl');
let fs = require('fs');
let basepath = 'out/';
let cptName = "lala";
let path = cptName.split('/');
let name = path[path.length - 1];
let writes = [`${name}.tsx`];
let reads = [`libs/detail/temps/component.tsx`];
let author = require('os').homedir().split('\\').pop();

//检测是否存在文件夹
let exists = function () {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of path) {
                fs.existsSync(basepath + a) ? basepath = `${basepath}${a}/` : await mkdir(a);
            }
            res(basepath);
        })()
    })
}
//建立文件夹
let mkdir = function (a) {
    return new Promise((res, rej) => {
        fs.mkdir(basepath + a, (err) => {
            if (err) rej(err);
            basepath = `${basepath}${a}/`
            res(basepath);
        });
    })
}

//读取模板文件内容，并替换为目标组件
let readFile = function () {
    let file = [];
    return new Promise((res) => {
        for (let a of reads) {
            console.log("正在处理" + a);
            let text = fs.readFileSync(a).toString();
            text = text
                .replace(/temp/g, name)
                .replace(/author/g, author)
            file.push(text)
        }
        res(file);
    })
}
//生成文件，并填入之前读取的文件内容

let writeFile = function (file) {
    return new Promise((res, rej) => {
        (async function () {
            for (let i = 0; i < file.length; i++) {
                var newFile = tpl(file[i], { title: "name" });
                await fs.writeFile(`${basepath}${writes[i]}`, newFile, (err) => {
                    if (err) rej(err);
                });
            }
            res('succ');
        })()
    })
}
async function creatCpt() {
    try {
        await exists();
        await readFile()
        await writeFile(await readFile());
        return console.log(`Successfully created ${name} component`)
    }
    catch (err) {
        console.error(err);
    }
}


module.exports = {
    creatCpt: creatCpt
};