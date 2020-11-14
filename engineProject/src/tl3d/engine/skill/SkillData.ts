namespace tl3d {
    export class SkillData extends ResCount {
        //
        public data: any;
        //一个角色的一组技能
        private srcList: Array<Skill> = new Array();
        public skillMgr:SkillManager

        public constructor(skillMgr:SkillManager){
            super();
            this.skillMgr=skillMgr;
        }

        public addSrcSkill($skill: Skill): void {
            this.srcList.push($skill);
        }

        public destory(): void {
            for (var i: number = 0; i < this.srcList.length; i++) {
                let skill=this.srcList[i];
                skill.destory();
                this.skillMgr.gcSkill(skill);
            }
        }

        //列表中的对象全部播放完并且都没有使用才可以释放
        public testDestory(): boolean {
            for (var i: number = 0; i < this.srcList.length; i++) {
                let skill=this.srcList[i];
                if (!(skill.isDeath && skill.idleTime >= ResCount.GCTime)) {
                    return false
                }
            }
            return true;
        }
    }
}