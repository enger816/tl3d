var GameVersion = /** @class */ (function () {
    function GameVersion() {
    }
    GameVersion.init = function (str) {
        var ary = str.split("\n");
        for (var i = 0; i < ary.length; i++) {
            var itemAry = ary[i].split("\t");
            if (itemAry.length == 2) {
                this._dic[itemAry[0]] = itemAry[1];
            }
        }
    };
    GameVersion.getVersion = function (key) {
        return this._dic[key];
    };
    GameVersion._dic = new Object;
    return GameVersion;
}());
function getUItittleUrl(name) {
    return "ui/load/tittle/" + name + ".png";
}
function getSkillUrl(name) {
    if (!name || name.length == 0) {
        //console.log("没有技能")
    }
    var str = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt");
}
function getModelUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getModelUIUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name) {
    return "map/" + name + ".txt";
}
function getRoleUrl(name) {
    // if (name.search("2242") != -1) {
    //     //console.log("2242224222422242")
    // }
    // if (name == "0") {
    //     //console.log("没有这个装备")
    // }
    return "role/" + name + getBaseUrl() + ".txt";
}
function getZipMapUrl(name) {
    return "map/" + name + "/";
}
/**标准化数字 */
function Snum($num) {
    return "123";
}
function getEffectUIUrl(name) {
    return "ui/load/effect/" + name + ".png";
}
function getKeyProById($id) {
    return "cc";
}
//# sourceMappingURL=UnitFunction.js.map