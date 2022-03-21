const path = require('path')
const fs = require('fs')
const indexes = []
const htmlDir = "public/command"
const xhtmlDir = path.join(__dirname, htmlDir)
fs.readdirSync(xhtmlDir).forEach(file => {
    if (!file.endsWith('.html')) return
    const content = fs.readFileSync(path.join(xhtmlDir, file), { encoding: 'utf-8' })
    const strAry = content.split("<hr>");
    strAry.forEach(str => {
        let t = "";
        let id = "";
        if (/<h3 id="(.+?)">(.+?)<\/h3>/.test(str)) {
            t = RegExp.$2.trim();
            id = `#${RegExp.$1}`
        }
        let d = "";
        if (/<p>([\w\W]+)<\/p>/.test(str)) {
            d = RegExp.$1.trim();
        }
        if(t != ""){
            indexes.push({ t: t, d: d, p: `command/${file}${id}` })
        }
    });
})
fs.writeFileSync(path.join(__dirname, 'indexes_tmp.json'), JSON.stringify(indexes))