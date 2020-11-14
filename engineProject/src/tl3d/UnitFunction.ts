namespace tl3d {
    export class UnitFunction {
        static getUItittleUrl(name: string): string {
            return "ui/load/tittle/" + name + ".png";
        }
        static getSkillUrl(name: string): string {
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
            return "map/" + name + Util.getBaseUrl() + ".txt";
        }
        static getBaoxiangUrl(): string {
            return "changjing/baoxiang/100001.txt";
        }

        static getRoleUrl(name: string): string {
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
}
