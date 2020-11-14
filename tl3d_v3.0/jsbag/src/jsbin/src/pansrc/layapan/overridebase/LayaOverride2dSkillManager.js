var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var layapan_me;
(function (layapan_me) {
    var ResManager = Pan3d.ResManager;
    var Scene_data = Pan3d.Scene_data;
    var SkillData = Pan3d.SkillData;
    var SkillManager = Pan3d.SkillManager;
    var LayaOverride2dSkillManager = /** @class */ (function (_super) {
        __extends(LayaOverride2dSkillManager, _super);
        function LayaOverride2dSkillManager($sceneManager) {
            var _this = _super.call(this) || this;
            _this.sceneManager = $sceneManager;
            return _this;
        }
        LayaOverride2dSkillManager.prototype.addSrc = function ($url, skillData) {
            for (var key in skillData.data) {
                var skill = new layapan_me.OverrideSkill(this);
                skill.name = key;
                skill.isDeath = true;
                skill.src = true;
                skill.setData(skillData.data[key], skillData);
                skillData.addSrcSkill(skill);
                //skillData.useNum++;
                SkillManager.getInstance();
                var dkey = $url + key;
                if (!SkillManager.getInstance()._skillDic[dkey]) {
                    SkillManager.getInstance()._skillDic[dkey] = new Array;
                }
                SkillManager.getInstance()._skillDic[dkey].push(skill);
            }
        };
        LayaOverride2dSkillManager.prototype.playSkill = function ($skill) {
            $skill.skillManager = this;
            _super.prototype.playSkill.call(this, $skill);
        };
        LayaOverride2dSkillManager.prototype.getSkill = function ($url, $name, $callback) {
            var _this = this;
            if ($callback === void 0) { $callback = null; }
            var skill;
            var key = $url + $name;
            // if(key == "skill/jichu_1_byte.txtm_skill_04"){
            //     console.log("添加技能风暴");
            //     this.fengbaonum++;
            // }
            var ary = SkillManager.getInstance()._skillDic[key];
            if (ary) {
                for (var i = 0; i < ary.length; i++) {
                    skill = ary[i];
                    if (skill.isDeath && skill.useNum == 0) {
                        skill.reset();
                        skill.isDeath = false;
                        return skill;
                    }
                }
            }
            skill = new layapan_me.OverrideSkill(this);
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
                var obj = new Object;
                obj.name = $name;
                obj.skill = skill;
                obj.callback = $callback;
                SkillManager.getInstance()._loadDic[$url].push(obj);
                return skill;
            }
            SkillManager.getInstance()._loadDic[$url] = new Array;
            var obj = new Object;
            obj.name = $name;
            obj.skill = skill;
            obj.callback = $callback;
            SkillManager.getInstance()._loadDic[$url].push(obj);
            ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, function ($skillRes) {
                _this.loadSkillCom($url, $skillRes);
            });
            return skill;
        };
        LayaOverride2dSkillManager.prototype.loadSkillCom = function ($url, $skillRes) {
            var skillData = new SkillData();
            skillData.data = $skillRes.data;
            for (var i = 0; i < SkillManager.getInstance()._loadDic[$url].length; i++) {
                var obj = SkillManager.getInstance()._loadDic[$url][i];
                if (!obj.skill.hasDestory) {
                    obj.skill.setData(skillData.data[obj.name], skillData);
                    obj.skill.key = $url + obj.name;
                    skillData.useNum++;
                }
            }
            this._dic[$url] = skillData;
            this.addSrc($url, skillData);
            for (var i = 0; i < SkillManager.getInstance()._loadDic[$url].length; i++) {
                var obj = SkillManager.getInstance()._loadDic[$url][i];
                if (obj.callback) {
                    obj.callback();
                }
            }
            SkillManager.getInstance()._loadDic[$url].length = 0;
            SkillManager.getInstance()._loadDic[$url] = null;
        };
        return LayaOverride2dSkillManager;
    }(SkillManager));
    layapan_me.LayaOverride2dSkillManager = LayaOverride2dSkillManager;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=LayaOverride2dSkillManager.js.map