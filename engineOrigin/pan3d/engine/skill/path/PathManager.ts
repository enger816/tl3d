module Pan3d {
    export class PathManager {
        private static dic: any = new Object;
        public static reg(types: number, cls: any): void {
            this.dic[types] = cls;
        }

        public static getNewPath(types: number): any {
            var cls: any = this.dic[types];
            return new cls();
        }

        public static init(): void {
            this.dic[0] = SkillPath;
            this.dic[1] = SkillSinPath;
            this.dic[2] = SkillCosPath;
        }

    }
}