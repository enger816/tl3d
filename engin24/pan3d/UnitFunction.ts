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
    return "map/" + name+ getBaseUrl()  + ".txt";
}
function getBaoxiangUrl(): string {
    return "changjing/baoxiang/100001.txt";
}

function getRoleUrl(name: string): string {
    return "role/" + name + getBaseUrl() + ".txt";
}
function getZipMapUrl(name: string): string {
    return "map/" + name + "/";
}

function getEffectUrl(name: string): string {
    return "effect/scene/" + name + getBaseUrl() + ".txt";
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