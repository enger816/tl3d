module Pan3d {
    export class SkillData extends ResCount {
        public data: any;
        private srcList: Array<Skill> = new Array();
        public srcOutAry: Array<Skill>;
        public addSrcSkill($skill: Skill): void {
            this.srcList.push($skill);
        }
        public destory(): void {
            for (var i: number = 0; i < this.srcList.length; i++) {
                this.srcList[i].destory();
                SkillManager.getInstance().gcSkill(this.srcList[i]);
            }
        }
        public testDestory(): boolean {
            for (var i: number = 0; i < this.srcList.length; i++) {
                if (!(this.srcList[i].isDeath && this.srcList[i].idleTime >= ResCount.GCTime)) {
                    return false
                }
            }
            return true;
        }
    }
}