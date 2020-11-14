import { Util } from "./engine/utils/Util";

export class UnitFunction {

    static getUItittleUrl(name: string): string {

        return "ui/load/tittle/" + name + ".png";
    }

    static getSkillUrl(name: string): string {
        if (!name || name.length == 0) {
            //console.log("没有技能")
        }
        var str: string = "skill/" + name + Util.getBaseUrl() + ".txt";
        return str.replace(".txt", "_byte.txt")
    }

    static getModelUrl(name: string): string {
        return "model/" + name + Util.getBaseUrl() + ".txt";
    }

    static getModelUIUrl(name: string): string {
        return "model/" + name + Util.getBaseUrl() + ".txt";
    }

    static getMapUrl(name: string): string {
        return "map/" + name + ".txt";
    }

    /**
     * 返回角色模型的url
     * @param name 
     */
    static getRoleUrl(name: number): string {
        // if (name.search("2242") != -1) {
        //     //console.log("2242224222422242")
        // }
        // if (name == "0") {
        //     //console.log("没有这个装备")
        // }
        return "role/" + name + Util.getBaseUrl() + ".txt";
    }

    static getZipMapUrl(name: string): string {
        return "map/" + name + "/";
    }

    /**标准化数字 */
    static Snum($num: number): string {
        return "123"
    }

    static getEffectUIUrl(name: string): string {
        return "ui/load/effect/" + name + ".png";
    }
    static getKeyProById($id: number): string {
        return "cc";
    }
}