//enger
//2018.10.7

var fs = require('fs');
var scripttagstr = "";
var dtsstr="declare  module tl3d{  \r";

readdir("src");
fs.writeFileSync("./src/TL3dIndex.ts", scripttagstr);
console.log("TL3dIndex.ts 写入成功！");

//递归读取所有文件目录
function readdir(dirpath) {

    var files = fs.readdirSync(dirpath);
    var ignorList=["TL3dIndex.ts","TestCplus.ts"];

    files.forEach((value, index, array) => {
        if (value.indexOf(".ts") == -1) //目录
        {
            readdir(dirpath + "/" + value);
        }
        else if (ignorList.indexOf(value)==-1) //这些特殊的排除一下
        {
            value=value.replace(".ts","");
            scripttagstr += "export {"+value+"};\r";
        }

    }, null);
}



