var scenedis;
(function (scenedis) {
    var me;
    (function (me) {
        var CharSkillPlayModel = /** @class */ (function () {
            function CharSkillPlayModel() {
                this.skillFileName = "jichu_1";
                this.charIdstr = "50001";
                this.weaponNum = 50011;
                this.skipId = 1;
                this.skillEffectItem = ["skill_01", "skill_02", "skill_03", "m_skill_01", "m_skill_02", "m_skill_03"];
                this.initSkillPlay();
            }
            CharSkillPlayModel.prototype.initSkillPlay = function () {
                if (!getUrlParam("id")) {
                    window.location.href = "index.html?id=" + random(10);
                }
                else {
                    this.makeUrlParam();
                    this.makeMainChar();
                }
            };
            CharSkillPlayModel.prototype.makeUrlParam = function () {
                this.paramId = Number(getUrlParam("id"));
                if (isNaN(this.paramId)) {
                    this.paramId = 0;
                }
                this.paramId = Math.floor(this.paramId);
                this.paramId = this.paramId % 6 + 1;
                if (this.paramId <= 0 || this.paramId > 6) {
                    this.paramId = 1;
                }
                if (this.paramId == 3 || this.paramId == 4) {
                    this.makeAttackChar();
                }
                this.skillFileName = "jichu_" + (Math.ceil(this.paramId / 2));
                this.charIdstr = "5000" + this.paramId;
                this.weaponNum = 50010 + this.paramId;
            };
            CharSkillPlayModel.prototype.makeAttackChar = function () {
                var $sc = new Pan3d.SceneChar();
                $sc.z = 100;
                $sc.setRoleUrl(getRoleUrl("7001"));
                Pan3d.SceneManager.getInstance().addMovieDisplay($sc);
                this.attackTarget = $sc;
                this.attackTarget.x = random(50) + 30;
                this.attackTarget.z = random(50) + 30;
            };
            CharSkillPlayModel.prototype.makeMainChar = function () {
                var _this = this;
                Pan3d.SkillManager.getInstance().preLoadSkill(getSkillUrl(this.skillFileName));
                var $sc = new scenedis.me.SkillSceneChar();
                $sc.setRoleUrl(getRoleUrl(this.charIdstr));
                Pan3d.SceneManager.getInstance().addMovieDisplay($sc);
                $sc.setWeaponByAvatar(this.weaponNum);
                this.mainChar = $sc;
                $sc.changeActionFun = function () { _this.playSkill(); };
                $sc.loadFinishFun = function () {
                    Pan3d.ResManager.getInstance().loadSkillRes(Pan3d.Scene_data.fileRoot + getSkillUrl(_this.skillFileName), function ($skillRes) {
                        Pan3d.SkillManager.getInstance().preLoadSkill(getSkillUrl(_this.skillFileName));
                        Pan3d.TimeUtil.addTimeOut(1000, function () { _this.playSkill(); });
                        console.log(Pan3d.TimeUtil.getTimer());
                    });
                };
            };
            CharSkillPlayModel.prototype.playSkill = function () {
                var $effectName = this.skillEffectItem[this.skipId % this.skillEffectItem.length];
                var $skill = Pan3d.SkillManager.getInstance().getSkill(getSkillUrl(this.skillFileName), $effectName);
                if ($skill.keyAry) {
                    if (this.textPlaySkillFun) {
                        Pan3d.TimeUtil.removeTimeTick(this.textPlaySkillFun);
                        this.textPlaySkillFun = null;
                    }
                }
                else {
                    return;
                }
                if ($skill) {
                    $skill.reset();
                    $skill.isDeath = false;
                }
                if (this.paramId == 3 || this.paramId == 4) {
                    /*
                    if ($effectName == "skill_01" || $effectName == "skill_02" || $effectName == "skill_03") {
                        $skill.configTrajectory(this.mainChar, this.attackTarget);
                    } else {
                       
                        if ($effectName == "m_skill_01") {
                            $skill.configFixEffect(this.mainChar);
                        } else {
                            this.attackTarget.x = random(50) + 30;
                            this.attackTarget.z = random(50) + 30;
                            var $tempPos: Vector3D = new Vector3D(this.attackTarget.x, this.attackTarget.y, this.attackTarget.z)
                            var $hitPosItem: Array<Vector3D> = new Array()
                            $hitPosItem.push($tempPos)
                            $skill.configFixEffect(this.mainChar, null, $hitPosItem);
            
                        }
                    }
                    */
                    if ($effectName == "m_skill_01") {
                        $skill.configFixEffect(this.mainChar);
                    }
                    else {
                        this.attackTarget.x = random(50) + 30;
                        this.attackTarget.z = random(50) + 30;
                        var $tempPos = new Pan3d.Vector3D(this.attackTarget.x, this.attackTarget.y, this.attackTarget.z);
                        var $hitPosItem = new Array();
                        $hitPosItem.push($tempPos);
                        $skill.configFixEffect(this.mainChar, null, $hitPosItem);
                    }
                    this.mainChar.watch(this.attackTarget, true);
                }
                else {
                    $skill.configFixEffect(this.mainChar);
                }
                this.mainChar.playSkill($skill);
                this.skipId++;
            };
            return CharSkillPlayModel;
        }());
        me.CharSkillPlayModel = CharSkillPlayModel;
    })(me = scenedis.me || (scenedis.me = {}));
})(scenedis || (scenedis = {}));
//# sourceMappingURL=CharSkillPlayModel.js.map