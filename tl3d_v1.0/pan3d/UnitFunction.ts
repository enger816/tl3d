class GameVersion {
    private static _dic: any = new Object;
    public static init(str: string): void {
        var ary: Array<string> = str.split("\n");
        for (var i: number = 0; i < ary.length; i++) {
            var itemAry: Array<string> = ary[i].split("\t");
            if (itemAry.length == 2) {
                this._dic[itemAry[0]] = itemAry[1];
            }
        }
    }

    public static getVersion(key: string): string {
        return this._dic[key];
    }

}
function getUItittleUrl(name: string): string {

    return "ui/load/tittle/" + name + ".png";
}
function getSkillUrl(name: string): string {
    if (!name || name.length == 0) {
        //console.log("没有技能")
    }
    var str: string = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt")
}

function getModelUrl(name: string): string {
    return "model/" + name + getBaseUrl() + ".txt";
}

function getModelUIUrl(name: string): string {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name: string): string {
    return "map/" + name + ".txt";
}

function getRoleUrl(name: string): string {
    // if (name.search("2242") != -1) {
    //     //console.log("2242224222422242")
    // }
    // if (name == "0") {
    //     //console.log("没有这个装备")
    // }
    return "role/" + name + getBaseUrl() + ".txt";
}
function getZipMapUrl(name: string): string {
    return "map/" + name + "/";
}
/**标准化数字 */
function Snum($num: number): string {
   
        return "123"

}
function getEffectUIUrl(name: string): string {
    return "ui/load/effect/" + name + ".png";
}
function getKeyProById($id: number): string {
    return "cc";
}