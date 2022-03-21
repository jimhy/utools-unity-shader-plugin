const path = require('path')
const fs = require('fs')
const htmlDir = "public/command"
const xhtmlDir = path.join(__dirname, htmlDir)
fs.readdirSync(xhtmlDir).forEach(file => {
    if (!file.endsWith('.html')) return
    let resultStr = "";
    const content = fs.readFileSync(path.join(xhtmlDir, file), { encoding: 'utf-8' })
    const strAry = content.split("<hr>");
    strAry.forEach(str => {
        if (/<h3>(.+?)<\/h3>/.test(str)) {
            let t = RegExp.$1.trim();
            str = str.replace("<h3>", `<h3 id=\"${t}\">`);
        }
        resultStr += str + "\n<hr>";
    });
    fs.writeFileSync(path.join(__dirname, "tmp/" + file), resultStr)
})