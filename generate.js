const path = require('path')
const fs = require('fs')
const indexes = []
const htmlDir = "command"
const xhtmlDir = path.join(__dirname, htmlDir)
fs.readdirSync(xhtmlDir).forEach(file => {
    if (!file.endsWith('.html')) return
    const content = fs.readFileSync(path.join(xhtmlDir, file), { encoding: 'utf-8' })
    const strAry = content.split("<hr>");
    strAry.forEach(str => {
        let t = "";
        if (/<h3>(.+?)<\/h3>/.test(str)) {
            t = RegExp.$1.trim();
        }
        let d = "";
        if (/<p>([\w\W]+)<\/p>/.test(str)) {
            d = RegExp.$1.trim();
        }
        indexes.push({ t: t, d: d, p: htmlDir + '/' + file })
    });
})
fs.writeFileSync(path.join(__dirname, 'indexes_tmp.json'), JSON.stringify(indexes))