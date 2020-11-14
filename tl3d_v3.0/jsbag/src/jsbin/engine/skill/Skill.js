var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Skill = /** @class */ (function (_super) {
    __extends(Skill, _super);
    function Skill() {
        var _this = _super.call(this) || this;
        _this.isDeath = true;
        _this.src = false;
        _this.time = 0;
        _this.targetFlag = 0;
        _this.targetShockFlag = 0;
        _this.needSound = false;
        _this.hasDestory = false;
        return _this;
    }
    Skill.prototype.setData = function ($data, $skillData) {
        if (this.hasDestory) {
            return;
        }
        this.skillVo = new SkillVo();
        this.skillVo.setData($data);
        this.setKeyAry();
        this.trajectoryAry = new Array;
        this._skillData = $skillData;
    };
    Skill.prototype.getBloodTime = function () {
        if (this.skillVo) {
            return this.skillVo.bloodTime;
        }
        else {
            return SkillVo.defaultBloodTime;
        }
    };
    Skill.prototype.play = function () {
        if (!this.skillVo) {
            this.skillComplete();
            return;
        }
        if (this.active && this.active instanceof Display3dMovie) {
            var $movie3d = this.active;
            $movie3d.play(this.skillVo.action, 2, false);
        }
    };
    Skill.prototype.setKeyAry = function () {
        var _this = this;
        this.keyAry = new Array;
        if (this.skillVo.types == SkillType.FixEffect) {
            for (var i = 0; i < this.skillVo.keyAry.length; i++) {
                var keySkill = new SkillFixEffect();
                keySkill.setInfo(this.skillVo.keyAry[i]);
                keySkill.removeCallFun = function ($key) { _this.removeKey($key); };
                keySkill.active = this.active;
                this.keyAry.push(keySkill);
            }
        }
        else if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
            for (var i = 0; i < this.skillVo.keyAry.length; i++) {
                var trajectory;
                var tkv = (this.skillVo.keyAry[i]);
                if (tkv.multype == 1) {
                    trajectory = new SkillMulTrajectory();
                }
                else {
                    trajectory = new SkillTrajectory();
                }
                trajectory.setInfo(this.skillVo.keyAry[i]);
                this.keyAry.push(trajectory);
            }
        }
    };
    Skill.prototype.removeKey = function ($key) {
        this.completeNum++;
        if (this.completeNum == this.keyAry.length) {
            //    //console.log("播放结束");
            this.skillComplete();
        }
    };
    /**强制移除技能 */
    Skill.prototype.removeSkillForce = function () {
        // if(this.key == "skill/jichu_1_byte.txtm_skill_04"){
        //     SkillManager.getInstance().fengbaonum--;
        //     console.log("移除技能风暴 " + SkillManager.getInstance().fengbaonum);
        // }        
        if (this.keyAry) {
            for (var i = 0; i < this.keyAry.length; i++) {
                this.keyAry[i].reset();
            }
        }
        this.skillComplete();
        this.reset();
    };
    Skill.prototype.skillComplete = function () {
        SkillManager.getInstance().removeSkill(this);
        this.isDeath = true;
        if (this.completeFun) {
            this.completeFun();
        }
        this.idleTime = 0;
    };
    Skill.prototype.reset = function () {
        this.time = 0;
        this.completeNum = 0;
        this.active = null;
        this.completeFun = null;
        this.targetFlag = 0;
        this.targetShockFlag = 0;
        this.soundPlay = false;
        this.needSound = false;
    };
    Skill.prototype.update = function (t) {
        this.time += t;
        if (this.time > Skill.MaxTime) {
            //console.log("超时结束");
            this.skillComplete();
        }
        this.getKeyTarget();
        this.getShockTarget();
        this.updateTrajector(t);
    };
    Skill.prototype.updateTrajector = function (t) {
        for (var i = 0; i < this.trajectoryAry.length; i++) {
            this.trajectoryAry[i].update(t);
        }
    };
    Skill.prototype.getKeyTarget = function () {
        if (!this.keyAry) {
            return;
        }
        for (var i = this.targetFlag; i < this.keyAry.length; i++) {
            if (this.keyAry[i].time < this.time) {
                this.keyAry[i].addToRender();
                if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                    var ss = this.keyAry[i];
                    this.trajectoryAry.push(ss);
                }
                i++;
                this.targetFlag = i;
            }
            else {
                break;
            }
        }
        this.getSound();
    };
    Skill.prototype.getShockTarget = function () {
        if (!this.skillVo.shockAry || !this.needSound) {
            return;
        }
        for (var i = this.targetShockFlag; i < this.skillVo.shockAry.length; i++) {
            if (this.skillVo.shockAry[i].time < this.time) {
                //震动
                ShockUtil.getInstance().shock(this.skillVo.shockAry[i].lasttime, this.skillVo.shockAry[i].amp);
                i++;
                this.targetShockFlag = i;
            }
            else {
                break;
            }
        }
        //this.getSound();
    };
    Skill.prototype.getSound = function () {
        if (!this.skillVo.sound || this.soundPlay || !this.needSound) {
            return;
        }
        if (this.skillVo.sound.frame < this.time) {
            SoundManager.getInstance().playSkillSound(this.skillVo.sound.url);
            this.soundPlay = true;
        }
    };
    Skill.prototype.configFixEffect = function ($active, $completeFun, $posObj) {
        if ($completeFun === void 0) { $completeFun = null; }
        if ($posObj === void 0) { $posObj = null; }
        this.active = $active;
        this.completeFun = $completeFun;
        if (!this.keyAry) {
            return;
        }
        for (var i = 0; i < this.keyAry.length; i++) {
            if (this.skillVo.types != SkillType.FixEffect) {
                continue;
            }
            var skillFixEffect = this.keyAry[i];
            skillFixEffect.active = $active;
            if ($posObj && $posObj.length) {
                if (i > ($posObj.length - 1)) {
                    skillFixEffect.outPos = $posObj[$posObj.length - 1];
                }
                else {
                    skillFixEffect.outPos = $posObj[i];
                }
            }
            else {
                skillFixEffect.outPos = null;
            }
        }
    };
    Skill.prototype.configTrajectory = function ($active, $target, $completeFun, types, $bloodFun) {
        var _this = this;
        if ($completeFun === void 0) { $completeFun = null; }
        if (types === void 0) { types = 0; }
        if ($bloodFun === void 0) { $bloodFun = null; }
        this.active = $active;
        this.completeFun = $completeFun;
        this.completeNum = 0;
        if (!this.keyAry) {
            return;
        }
        for (var i = 0; i < this.keyAry.length; i++) {
            if (!(this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint)) {
                continue;
            }
            var skillTrajector = this.keyAry[i];
            skillTrajector.setPlayData($active, $target, function ($skilltra) { _this.removeTrajectory($skilltra); }, types, (i == 0 ? $bloodFun : null));
        }
    };
    Skill.prototype.configMulTrajectory = function ($activeList, $active, $target, $completeFun) {
        var _this = this;
        if ($completeFun === void 0) { $completeFun = null; }
        this.active = $active;
        this.completeFun = $completeFun;
        this.completeNum = 0;
        if (!this.keyAry) {
            return;
        }
        for (var i = 0; i < this.keyAry.length; i++) {
            if (this.skillVo.types != SkillType.TrajectoryDynamicTarget) {
                continue;
            }
            var skillTrajector = this.keyAry[i];
            skillTrajector.setMulPlayData($activeList, $target, function ($skilltra) { _this.removeTrajectory($skilltra); }, 2);
        }
    };
    Skill.prototype.removeTrajectory = function ($skilltra) {
        var index = this.trajectoryAry.indexOf($skilltra);
        if (index != -1) {
            this.trajectoryAry.splice(index, 1);
        }
        this.completeNum++;
        if (this.completeNum == this.keyAry.length) {
            // //console.log("播放结束");
            this.skillComplete();
        }
    };
    Skill.prototype.destory = function () {
        this.skillVo = null;
        this.name = null;
        if (this.keyAry) {
            for (var i = 0; i < this.keyAry.length; i++) {
                this.keyAry[i].destory();
            }
            this.keyAry.length = 0;
            this.keyAry = null;
        }
        this.active = null;
        this.completeFun = null;
        if (this.trajectoryAry) {
            for (var i = 0; i < this.trajectoryAry.length; i++) {
                this.trajectoryAry[i].destory();
            }
            this.trajectoryAry.length = 0;
            this.trajectoryAry = null;
        }
        if (this._skillData) {
            this._skillData.useNum--;
        }
        this._skillData = null;
        this.hasDestory = true;
    };
    Skill.MaxTime = 1000 * 5;
    return Skill;
}(ResCount));
//# sourceMappingURL=Skill.js.map