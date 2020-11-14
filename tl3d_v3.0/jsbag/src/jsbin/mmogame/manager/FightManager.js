var FightDataVo = /** @class */ (function () {
    function FightDataVo() {
        //用于二级重影
        this.typeUp = -1;
    }
    return FightDataVo;
}());
var AttackEffectsManager = /** @class */ (function () {
    function AttackEffectsManager() {
    }
    AttackEffectsManager.playLyf = function ($url, $taget, $offset) {
        var _this = this;
        if ($offset === void 0) { $offset = null; }
        if (!this.lyfItem) {
            this.lyfItem = new Array();
        }
        GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + $url, function (groupRes) {
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ParticleManager.getInstance().addParticle($particle);
                    $particle.addEventListener(BaseEvent.COMPLETE, _this.onPlayCom, _this);
                    _this.lyfItem.push({ dis: $particle, tg: $taget, offset: $offset });
                }
                else {
                    //console.log("播放的不是单纯特效");
                }
            }
        });
    };
    AttackEffectsManager.frameUpData = function () {
        if (this.lyfItem) {
            var $campos = new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z);
            for (var i = 0; i < this.lyfItem.length; i++) {
                var $particle = this.lyfItem[i].dis;
                var $sceneChar = this.lyfItem[i].tg;
                var $pos = new Vector3D($sceneChar.x, $sceneChar.y + $sceneChar.tittleHeight / 3, $sceneChar.z);
                if (this.lyfItem[i].offset) {
                    $pos = $pos.add(this.lyfItem[i].offset);
                }
                var $tpos = $campos.subtract($pos);
                $tpos.normalize();
                $tpos.scaleBy(10);
                $pos = $pos.add($tpos);
                $particle.setPos($pos.x, $pos.y, $pos.z);
            }
        }
    };
    AttackEffectsManager.onPlayCom = function (event) {
        var $particle = event.target;
        var $indexs = -1;
        for (var i = 0; i < this.lyfItem.length; i++) {
            if (this.lyfItem[i].dis == $particle) {
                $indexs = i;
            }
        }
        if ($indexs != -1) {
            this.lyfItem.splice($indexs, 1);
        }
        $particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
        ParticleManager.getInstance().removeParticle($particle);
    };
    return AttackEffectsManager;
}());
var FightManager = /** @class */ (function () {
    function FightManager() {
    }
    FightManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new FightManager();
        }
        return this._instance;
    };
    FightManager.prototype.fightUpdate = function (bytes) {
        // console.log("收到战斗消息：+" + bytes.bytesAvailable + "--" + bytes.length, TimeUtil.getTimer());
        var _this = this;
        var caster = bytes.readUnsignedInt();
        var count = bytes.readUnsignedByte();
        var sdAry = new Array;
        for (var i = 0; i < count; i++) {
            var sd = new SkillBeAttackData();
            sd.target = bytes.readUnsignedInt();
            sd.lastHp = bytes.readUnsignedInt();
            sd.utype = bytes.readUnsignedByte();
            sd.isKilled = bytes.readUnsignedByte();
            sd.damage = bytes.readDouble();
            if (sd.lastHp == 0) {
                sd.isKilled = 1;
            }
            sdAry.push(sd);
        }
        var skillid = bytes.readUnsignedInt();
        var $tx = bytes.readShort();
        var $ty = bytes.readShort();
        var $fightDataArr = this.getFightDataItem(sdAry, caster);
        // console.log("skillid",skillid)
        var targetSc;
        if (sdAry.length) {
            targetSc = SceneCharManager.getInstance().getSceneCharByUID(sdAry[0].target);
        }
        var sccc = SceneCharManager.getInstance().getSceneCharByUID(caster);
        if (targetSc && targetSc.unit.isMain) {
            if (sccc && sccc.unit.isPlayer() && bottomui.Progress_line.getInstance() && targetSc != sccc) {
                bottomui.Progress_line.getInstance().hide();
            }
        }
        if (sccc && sccc.resultVisible) {
            this.showSkill(caster, skillid, sdAry, new Vector2D($tx, $ty), targetSc, function () { _this.showFightDataByItem($fightDataArr); });
        }
        else {
            this.showFightDataByItem($fightDataArr);
        }
        ////console.log("延迟掉血：",bloodTime);
        // TimeUtil.addTimeOut(bloodTime, () => {
        //     this.showFightDataByItem($fightDataArr);
        // });
    };
    FightManager.prototype.showFightDataByItem = function ($arr) {
        //   //console.log("技能回调函数==============>")
        for (var i = 0; $arr && i < $arr.length; i++) {
            var $FightDataVo = $arr[i];
            var bsc = SceneCharManager.getInstance().getSceneCharByUID($FightDataVo.target);
            if (!bsc) {
                return;
            }
            if ($FightDataVo.type == SharedDef.HITINFO_NORMALSWING || $FightDataVo.type == SharedDef.HITINFO_CRITHIT) {
                var $ty = GuidData.player.getCharType();
                if ($ty == 1 || $ty == 2) {
                    AttackEffectsManager.playLyf(getModelUrl("beiji_lyf"), bsc);
                }
                else if ($ty == 3 || $ty == 4) {
                    AttackEffectsManager.playLyf(getModelUrl("beiji_ds_lyf"), bsc);
                }
                else {
                    AttackEffectsManager.playLyf(getModelUrl("beiji_jk_lyf"), bsc);
                }
            }
            bsc.setHp($FightDataVo.lastHp);
            if ($FightDataVo.txtNum != 0) {
                //显示飘字时，走的流程
                var $textJumpUiVo = new Pan3d.TextJumpUiVo();
                $textJumpUiVo.str = $FightDataVo.damagenum;
                $textJumpUiVo.type = $FightDataVo.type;
                $textJumpUiVo.starttime = TimeUtil.getTimer();
                $textJumpUiVo.endtime = TimeUtil.getTimer() + 1200;
                var $bscy = bsc.py + Math.min(bsc.tittleHeight - 5, 40);
                $textJumpUiVo.pos = new Vector3D(bsc.px, $bscy, bsc.pz);
                BloodManager.getInstance().setJumpNum($textJumpUiVo);
                if (!$FightDataVo.isKilled) {
                    bsc.refreshLifeNum();
                }
            }
            else {
                // if ($FightDataVo.type != 4) {
                //不现实数字时，走的飘字流程
                var $textJumpUiVo = new Pan3d.TextJumpUiVo();
                $textJumpUiVo.type = $FightDataVo.type;
                $textJumpUiVo.starttime = TimeUtil.getTimer();
                $textJumpUiVo.endtime = TimeUtil.getTimer() + 1200;
                //飘字初始化位置均为玩家头顶
                $textJumpUiVo.pos = new Vector3D(bsc.x, bsc.y + bsc.tittleHeight - 5, bsc.z);
                BloodManager.getInstance().setJumpNum($textJumpUiVo);
                // }
            }
            //目标死亡，播放完飘字后，设置血量。并移除攻击对象
            if ($FightDataVo.isKilled) {
                bsc.setHp(0);
                GameInstance.removeAttackTarget(bsc);
                bsc.refreshUnitFieldByte();
                bsc.play(CharAction.DEATH, 1);
                if ($FightDataVo.casterme && !$FightDataVo.isme) {
                    this.attackFly(bsc);
                }
            }
        }
    };
    FightManager.prototype.needdrawNum = function (sdAry, caster) {
        var bsc;
        for (var i = 0; i < sdAry.length; i++) {
            bsc = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
            if (bsc && bsc.unit.isMain) {
                return true;
            }
        }
        bsc = SceneCharManager.getInstance().getSceneCharByUID(caster);
        if (bsc && bsc.unit.isMain) {
            return true;
        }
        return false;
    };
    //延时500毫秒设置攻击对象数据。掉血
    FightManager.prototype.getFightDataItem = function (sdAry, caster) {
        var casterChar = SceneCharManager.getInstance().getSceneCharByUID(caster);
        if (this.needdrawNum(sdAry, caster)) {
            //是否为我的战斗飘字
            var $arr = new Array;
            for (var i = 0; i < sdAry.length; i++) {
                if (sdAry[i].target == 0) {
                    continue;
                }
                var bsc = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
                if (bsc) {
                    var $FightDataVo = new FightDataVo();
                    $FightDataVo.target = sdAry[i].target;
                    $FightDataVo.txtNum = 0;
                    $FightDataVo.lastHp = sdAry[i].lastHp; //现在血量 减 原来血量
                    if (sdAry[i].utype != SharedDef.HITINFO_CURE) {
                        $FightDataVo.txtNum = Math.floor(sdAry[i].damage / 100);
                        //  //console.log("战斗掉血：" + sdAry[i].damage)
                        $FightDataVo.damagenum = String(Math.abs($FightDataVo.txtNum));
                    }
                    else {
                        var cureNum = Math.floor((Math.abs($FightDataVo.lastHp) - bsc.unit.getHp()) / 100);
                        $FightDataVo.damagenum = String(cureNum);
                        $FightDataVo.txtNum = 100; //这里是为了后面判断的时候使用。不作具体使用
                    }
                    if (bsc.unit.isMain) {
                        //我自己
                        if (sdAry[i].utype == SharedDef.HITINFO_CRITHIT || sdAry[i].utype == SharedDef.HITINFO_NORMALSWING) {
                            $FightDataVo.type = Pan3d.TextJumpType.MYNORMALDAMAGE;
                            $FightDataVo.typeUp = Pan3d.TextJumpType.MYNORMALDAMAGEUP;
                        }
                        else if (sdAry[i].utype == SharedDef.HITINFO_CURE) {
                            //治疗
                            $FightDataVo.typeUp = -1;
                            $FightDataVo.type = Pan3d.TextJumpType.TREATMENT;
                            if (Number($FightDataVo.damagenum) <= 0) {
                                $FightDataVo.damagenum = "";
                            }
                            else {
                                $FightDataVo.damagenum = "+" + $FightDataVo.damagenum;
                            }
                        }
                        else if (sdAry[i].utype == SharedDef.HITINFO_MISS) {
                            //闪避
                            $FightDataVo.typeUp = -1;
                            $FightDataVo.type = Pan3d.TextJumpType.DODGE;
                        }
                    }
                    else {
                        //其他人
                        if (sdAry[i].utype == SharedDef.HITINFO_MISS) {
                            //闪避
                            $FightDataVo.typeUp = -1;
                            $FightDataVo.type = Pan3d.TextJumpType.MISS;
                        }
                        else if (sdAry[i].utype == SharedDef.HITINFO_NORMALSWING) {
                            //普通
                            $FightDataVo.type = Pan3d.TextJumpType.NORMALDAMAGE;
                            $FightDataVo.typeUp = Pan3d.TextJumpType.NORMALDAMAGEUP;
                        }
                        else if (sdAry[i].utype == SharedDef.HITINFO_CRITHIT) {
                            //暴击
                            $FightDataVo.type = Pan3d.TextJumpType.CRIT;
                            $FightDataVo.typeUp = Pan3d.TextJumpType.CRITUP;
                        }
                    }
                    $FightDataVo.isme = bsc.unit.isMain;
                    if (casterChar && casterChar.unit) {
                        $FightDataVo.casterme = casterChar.unit.isMain;
                    }
                    else {
                        //casterChar会报错 杨
                        $FightDataVo.casterme = false;
                    }
                    if (sdAry[i].isKilled) {
                        $FightDataVo.isKilled = true;
                    }
                    $arr.push($FightDataVo);
                }
            }
            return $arr;
        }
        else {
            //设置血量
            for (var i = 0; i < sdAry.length; i++) {
                if (sdAry[i].target == 0) {
                    continue;
                }
                var bsc = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
                if (bsc) {
                    if (sdAry[i].isKilled) {
                        bsc.setHp(0);
                    }
                    else {
                        bsc.setHp(sdAry[i].lastHp); //现在血量 减 原来血量
                    }
                    bsc.refreshLifeNum();
                }
            }
            return null;
        }
    };
    FightManager.prototype.setSelfSkillCd = function ($skillid) {
        var $tb_skill_base = tb.TB_skill_base.get_TB_skill_base($skillid);
        if ($tb_skill_base.effect_file && $tb_skill_base.effect) {
            if (!$tb_skill_base.is_remain) {
                var $mainEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH);
                $mainEvent.data = $skillid;
                ModuleEventManager.dispatchEvent($mainEvent);
            }
        }
        // if (tb.SkillData.angerSkillVo) {
        //     if ($skillid == tb.SkillData.angerSkillVo.id) {
        //         var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SKILL_TIP_DATA)
        //         $MsgTipEvent.data = tb.SkillData.angerSkillVo.tb_skill_base.icon;
        //         ModuleEventManager.dispatchEvent($MsgTipEvent);
        //     }
        // }
    };
    FightManager.prototype.showSkill = function (caster, skillid, sdAry, tagetPos, dynamicTarget, bloodFun) {
        if (skillid == 0) {
            // for (var i: number = 0; i < sdAry.length; i++) {
            //     if (sdAry[i].target == 0) {
            //         continue;
            //     }
            //     var bsc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
            //     if (!bsc && GameInstance.mainChar) {
            //         if (GameInstance.mainChar.unit.uintGuid == sdAry[i].target) {
            //             bsc = GameInstance.mainChar;
            //         }
            //     }
            //     if (bsc) {
            //         bsc.setHp(sdAry[i].lastHp);
            //         bsc.refreshLifeNum();
            //     }
            // }
            bloodFun();
            return;
        }
        var sc = SceneCharManager.getInstance().getSceneCharByUID(caster);
        if (!sc) {
            //console.log("技能释放找不到施法者：" + caster);
            bloodFun();
            return;
        }
        var $skilldata = Play_Skill_Vo.get_Play_Skill_Vo(skillid);
        var timeout = $skilldata.tb_skill_base.timeout;
        if (sc.unit.isMain) {
            this.setSelfSkillCd(skillid);
            // //console.log(skillid)
            //bloodFun();
            if (timeout > 0) {
                TimeUtil.addTimeOut(timeout, bloodFun);
            }
            else {
                bloodFun();
            }
            return;
        }
        if ($skilldata.tb_skill_base.specialtype == 1) {
            bloodFun();
            return;
        }
        if (sc.isDeath) {
            bloodFun();
            return;
        }
        if ($skilldata.tb_skill_base.is_play_forbid == 0) {
            if ($skilldata.tb_skill_base.effect_file && $skilldata.tb_skill_base.effect) {
                var $skill = SkillManager.getInstance().getSkill(getSkillUrl($skilldata.tb_skill_base.effect_file), $skilldata.tb_skill_base.effect);
                if ($skill) {
                    $skill.reset();
                    $skill.needSound = sc.unit.isMain;
                    if ($skilldata.tb_skill_base.isOrbit == 1888888) {
                        this.playDynamicTarget($skill, $skilldata, sc, dynamicTarget, bloodFun);
                    }
                    else {
                        if ($skilldata.tb_skill_base.is_remain == 0) {
                            this.playFixEffect($skill, $skilldata, tagetPos, sc, sdAry);
                        }
                    }
                }
            }
        }
        if (timeout > 0) {
            TimeUtil.addTimeOut(timeout, bloodFun);
        }
        else {
            bloodFun();
        }
    };
    FightManager.prototype.playDynamicTarget = function ($skill, $skilldata, sc, dynamicTarget, $bloodFun) {
        $skill.configTrajectory(sc, dynamicTarget, function () { }, 0, $bloodFun);
        this.playBaseSkill($skill, $skilldata, sc);
    };
    FightManager.prototype.playBaseSkill = function ($skill, $skilldata, sc) {
        if (sc.isMount) {
            sc.unit.setDownMount(); //修改下坐骑的U数据
            sc.setMount(); //刷新
        }
        if ($skilldata.tb_skill_base.group != 0 && sc.unit.isMain) {
            $skilldata.skill = $skill;
        }
        else {
            sc.playSkill($skill);
        }
        //sc.playSkill($skill);
    };
    FightManager.prototype.playFixEffect = function ($skill, $skilldata, tagetPos, sc, sdAry) {
        ////console.log("$skill$skill$skill$skill", $skill)
        var $hitPosItem;
        var $tempPos = AstarUtil.getWorldPosByStart2D(tagetPos);
        if ($skilldata.tb_skill_base.target_type == 4) {
            $hitPosItem = new Array();
            $tempPos.y = AstarUtil.getHeightByPos($tempPos);
            $hitPosItem.push($tempPos);
        }
        if (tagetPos.x && tagetPos.y) {
            var $watch3D = new Display3D();
            $watch3D.x = $tempPos.x;
            $watch3D.z = $tempPos.z;
            sc.watch($watch3D, true);
        }
        $skill.configFixEffect(sc, null, $hitPosItem);
        if (sdAry && sdAry.length && $skilldata.tb_skill_base.lock_type == 1) {
            //这里还要修改
            var bsc = SceneCharManager.getInstance().getSceneCharByUID(sdAry[0].target);
            sc.watch(bsc);
        }
        this.playBaseSkill($skill, $skilldata, sc);
        ////console.log($skill, $skilldata, sc)
    };
    FightManager.prototype.attackFly = function (target) {
        var self = GameInstance.mainChar;
        var a = self.getAstarPos();
        var b = target.getAstarPos();
        if (!a || !b) {
            return;
        }
        var dir = b.sub(a);
        dir.normalize();
        dir.scaleBy(-5);
        b = b.add(dir);
        var targetpos = AstarUtil.getWorldPosByStart2D(b);
        targetpos.y = AstarUtil.getHeightByPos(targetpos);
        var obj = target;
        var fun = function () { target.refreshPos(); };
        TweenLite.to(obj, 0.3, { px: targetpos.x, py: targetpos.y, pz: targetpos.z, onUpdate: fun });
    };
    return FightManager;
}());
var SkillBeAttackData = /** @class */ (function () {
    function SkillBeAttackData() {
    }
    return SkillBeAttackData;
}());
//# sourceMappingURL=FightManager.js.map