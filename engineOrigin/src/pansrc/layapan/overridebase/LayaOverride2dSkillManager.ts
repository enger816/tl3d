module layapan {
    import Skill = Pan3d.Skill
    import ResManager = Pan3d.ResManager
    import Scene_data = Pan3d.Scene_data
    import SkillRes = Pan3d.SkillRes
    import SkillData = Pan3d.SkillData
    import SkillManager = Pan3d.SkillManager

    export class LayaOverride2dSkillManager extends SkillManager {
        public sceneManager: LayaOverride2dSceneManager
        constructor($sceneManager:LayaOverride2dSceneManager) {
            super();
            this.sceneManager = $sceneManager;
        }

        public addSrc($url: string, skillData: SkillData): void {
            for (var key in skillData.data) {
                var skill: OverrideSkill = new OverrideSkill(this);
                skill.name = key;
                skill.isDeath = true;
                skill.src = true;
                skill.setData(skillData.data[key], skillData);
                skillData.addSrcSkill(skill);
                //skillData.useNum++;
                SkillManager.getInstance()
                var dkey: string = $url + key
                if (!SkillManager.getInstance()._skillDic[dkey]) {
                    SkillManager.getInstance()._skillDic[dkey] = new Array;
                }
                SkillManager.getInstance()._skillDic[dkey].push(skill);

            }
        }
        public playSkill($skill: OverrideSkill): void {
            $skill.skillManager = this
            super.playSkill($skill);
        }
        public getSkill($url: string, $name: string, $callback: Function = null): OverrideSkill {

            var skill: OverrideSkill;
            var key: string = $url + $name;
            // if(key == "skill/jichu_1_byte.txtm_skill_04"){
            //     console.log("添加技能风暴");
            //     this.fengbaonum++;
            // }
            var ary: Array<OverrideSkill> = SkillManager.getInstance()._skillDic[key];
            if (ary) {
                for (var i: number = 0; i < ary.length; i++) {
                    skill = ary[i];
                    if (skill.isDeath && skill.useNum == 0) {
                        skill.reset();
                        skill.isDeath = false;
                        return skill;
                    }
                }
            }



            skill = new OverrideSkill(this);
            skill.name = $name;
            skill.isDeath = false;

            if (!SkillManager.getInstance()._skillDic[key]) {
                SkillManager.getInstance()._skillDic[key] = new Array;
            }
            SkillManager.getInstance()._skillDic[key].push(skill);

            if (this._dic[$url]) {
                skill.setData(this._dic[$url].data[skill.name], this._dic[$url]);
                skill.key = key;
                this._dic[$url].useNum++;
                return skill;
            }

            if (SkillManager.getInstance()._loadDic[$url]) {
                var obj: any = new Object;
                obj.name = $name;
                obj.skill = skill;
                obj.callback = $callback;
                SkillManager.getInstance()._loadDic[$url].push(obj);
                return skill;
            }

            SkillManager.getInstance()._loadDic[$url] = new Array;
            var obj: any = new Object;
            obj.name = $name;
            obj.skill = skill;
            obj.callback = $callback;
            SkillManager.getInstance()._loadDic[$url].push(obj);


            ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, ($skillRes: SkillRes) => {

                this.loadSkillCom($url, $skillRes);

            });
            return skill;
        }
        protected loadSkillCom($url: string, $skillRes: SkillRes): void {

            var skillData: SkillData = new SkillData();
            skillData.data = $skillRes.data;



            for (var i: number = 0; i < SkillManager.getInstance()._loadDic[$url].length; i++) {
                var obj: any = SkillManager.getInstance()._loadDic[$url][i];
                if (!obj.skill.hasDestory) {
                    obj.skill.setData(skillData.data[obj.name], skillData);
                    obj.skill.key = $url + obj.name;
                    skillData.useNum++;
                }

            }



            this._dic[$url] = skillData;

            this.addSrc($url, skillData);

            for (var i: number = 0; i < SkillManager.getInstance()._loadDic[$url].length; i++) {
                var obj: any = SkillManager.getInstance()._loadDic[$url][i];
                if (obj.callback) {
                    obj.callback();
                }
            }

            SkillManager.getInstance()._loadDic[$url].length = 0
            SkillManager.getInstance()._loadDic[$url] = null;


        }
    }
}