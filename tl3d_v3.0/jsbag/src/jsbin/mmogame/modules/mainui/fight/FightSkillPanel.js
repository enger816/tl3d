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
var fightui;
(function (fightui) {
    var SkillUIVo = /** @class */ (function () {
        function SkillUIVo() {
        }
        return SkillUIVo;
    }());
    fightui.SkillUIVo = SkillUIVo;
    var JumpAndEatCompenent = /** @class */ (function () {
        function JumpAndEatCompenent() {
        }
        JumpAndEatCompenent.prototype.update = function () {
            var $num = Math.ceil((GuidData.player.nextCanJumpTM - TimeUtil.getTimer()) / 1000);
            if ($num > 0) {
                var $kt = (GuidData.player.nextCanJumpTM - TimeUtil.getTimer()) / (10 * 1000);
                this.jumpcd.setCdNum(1 - $kt);
            }
            else {
                this.jumpcd.setCdNum(0.999999);
            }
            this.resetEatCd();
            //  //console.log(tb.SkillData.getCdMeshBySkillId(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD))
        };
        JumpAndEatCompenent.prototype.resetEatCd = function () {
            var $num = 0;
            var $cdTime = tb.SkillData.getCdMeshBySkillId(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD);
            if (isNaN($cdTime)) {
                $num = 0;
            }
            else {
                $num = $cdTime - TimeUtil.getTimer();
            }
            if ($num > 0) {
                var $leveCdtb = tb.TB_restore_potion_base.get_TB_restore_potion_base(GuidData.player.getLevel()).cd;
                $num = $num / ($leveCdtb * 1000);
                $num = Math.max(0, Math.min($num, 0.999999));
                this.eatcd.setCdNum(1 - $num);
            }
            else {
                this.eatcd.setCdNum(0.999999);
            }
        };
        JumpAndEatCompenent.prototype.clikJump = function () {
            if (GuidData.player.jumpButcanClik()) {
                AotuSkillManager.getInstance().jumpTo();
            }
            else {
                //console.log("clikJumpCd中 ")
            }
        };
        return JumpAndEatCompenent;
    }());
    fightui.JumpAndEatCompenent = JumpAndEatCompenent;
    var FightSkillPanel = /** @class */ (function (_super) {
        __extends(FightSkillPanel, _super);
        function FightSkillPanel() {
            var _this = _super.call(this) || this;
            _this.skilImgKey = new Object;
            _this.skillList = new Array;
            _this.nextThreeButTime = 0;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.right = 0;
            _this.bottom = 0;
            return _this;
        }
        FightSkillPanel.prototype.setRender = function ($bottom, $mid, $top, $cd) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this._cdRender = $cd;
            this.loadConfigCom();
        };
        FightSkillPanel.prototype.loadConfigCom = function () {
            this.a_skill_1 = this.addEvntBut("a_skill_1", this._bottomRender);
            this.a_skill_2 = this.addEvntBut("a_skill_2", this._bottomRender);
            this.a_skill_3 = this.addEvntBut("a_skill_3", this._bottomRender);
            this.a_skill_4 = this.addEvntBut("a_skill_4", this._bottomRender);
            this.a_skill_5 = this.addEvntBut("a_skill_5", this._bottomRender);
            this.a_skill_6 = this.addEvntBut("a_skill_6", this._bottomRender);
            this.addSkillUiToList(this.a_skill_2);
            this.addSkillUiToList(this.a_skill_3);
            this.addSkillUiToList(this.a_skill_4);
            this.addSkillUiToList(this.a_skill_5);
            this.a_jump_but = this.addChild(this._bottomRender.getComponent("a_jump_but"));
            this.a_jump_but.addEventListener(InteractiveEvent.Up, this.butClikSample, this);
            this.a_eat_icon = this.addChild(this._bottomRender.getComponent("a_eat_icon"));
            this.a_eat_icon.addEventListener(InteractiveEvent.Up, this.butClikSample, this);
            this._jumpAndEatCompenent = new JumpAndEatCompenent();
            this._jumpAndEatCompenent.jumpUi = this.a_jump_but;
            this._jumpAndEatCompenent.jumpcd = this._cdRender.getComponent("a_jump_cd");
            this._jumpAndEatCompenent.eatUi = this.a_eat_icon;
            this._jumpAndEatCompenent.eatcd = this._cdRender.getComponent("a_eat_cd");
            this._jumpAndEatCompenent.jumpcd.x = this._jumpAndEatCompenent.jumpUi.x;
            this._jumpAndEatCompenent.jumpcd.y = this._jumpAndEatCompenent.jumpUi.y;
            this._jumpAndEatCompenent.jumpcd.clockwise = false;
            this._jumpAndEatCompenent.eatcd.x = this._jumpAndEatCompenent.eatUi.x;
            this._jumpAndEatCompenent.eatcd.y = this._jumpAndEatCompenent.eatUi.y;
            this._jumpAndEatCompenent.eatcd.clockwise = false;
            this.addChild(this._jumpAndEatCompenent.jumpcd);
            this.addChild(this._jumpAndEatCompenent.eatcd);
            //
            this.refresh();
        };
        FightSkillPanel.prototype.butClikSample = function (evt) {
            if (!GameInstance.canclikFightui) {
                return;
            }
            switch (evt.target) {
                case this.a_jump_but:
                    this._jumpAndEatCompenent.clikJump();
                    break;
                case this.a_eat_icon:
                    MainCharControlModel.getInstance().clikEat();
                    break;
                default:
                    break;
            }
        };
        FightSkillPanel.prototype.addEvntBut = function ($name, $uiRender) {
            var $temp = this.addChild($uiRender.getComponent($name));
            $temp.addEventListener(InteractiveEvent.Down, this.butClik, this);
            $temp.addEventListener(InteractiveEvent.Up, this.butUpClik, this);
            return $temp;
        };
        FightSkillPanel.prototype.butUpClik = function (evt) {
        };
        //需要加上倒计时和CD技能
        FightSkillPanel.prototype.addSkillUiToList = function ($ui) {
            var $cdRender = this._cdRender;
            var $vo = new SkillUIVo();
            var $cd = this._cdRender.getComponent("a_cd_mask");
            var $alpha = 0.3;
            // $cd.colorVer = [1 * $alpha, 1 * $alpha, 1 * $alpha, $alpha];
            $cd.setCdNum(1);
            $cd.x = $ui.x + 1;
            $cd.y = $ui.y + 1;
            $vo.baseRect = new Rectangle($ui.x, $ui.y, $ui.width, $ui.height);
            this.addChild($cd);
            $vo.cd = $cd;
            $vo.iconUi = $ui;
            $vo.blackMask = this.addChild(this._midRender.getComponent("a_bleak_ui"));
            $vo.blackMask.x = $vo.iconUi.x;
            $vo.blackMask.y = $vo.iconUi.y;
            $vo.blackMask.width = $vo.iconUi.width;
            $vo.blackMask.height = $vo.iconUi.height;
            $vo.cdnumA = this.addChild(this._topRender.getComponent("a_cd_num"));
            $vo.cdnumB = this.addChild(this._topRender.getComponent("a_cd_num"));
            $vo.cdnumA.Invisible();
            $vo.cdnumB.Invisible();
            var $pos = new Vector2D(25, 22);
            $vo.cdnumB.y = $pos.y + $vo.iconUi.y;
            $vo.cdnumA.y = $pos.y + $vo.iconUi.y;
            this.skillList.push($vo);
        };
        FightSkillPanel.prototype.update = function (t) {
            for (var i = 0; i < this.skillList.length; i++) {
                var $skillUIVo = this.skillList[i];
                if ($skillUIVo.cd && $skillUIVo.cdnumA) {
                    var $k = TimeUtil.getTimer() - $skillUIVo.cd.lastTime;
                    if ($k < $skillUIVo.cd.cdTotalnum) {
                        var $pos = new Vector2D(25, 22);
                        var $second = Math.ceil(($skillUIVo.cd.cdTotalnum - $k) / 1000);
                        var $A = $second % 10;
                        $skillUIVo.cdnumA.goToAndStop($A);
                        var $B = Math.floor($second / 10);
                        $skillUIVo.cdnumB.goToAndStop($B);
                        if ($B <= 0) {
                            $skillUIVo.cdnumB.Invisible();
                            $skillUIVo.cdnumA.x = $pos.x + $skillUIVo.baseRect.x;
                        }
                        else {
                            $skillUIVo.cdnumB.x = $pos.x + $skillUIVo.baseRect.x - 8;
                            $skillUIVo.cdnumA.x = $pos.x + $skillUIVo.baseRect.x + 8;
                        }
                        $skillUIVo.blackMask.x = $skillUIVo.iconUi.x;
                    }
                    else {
                        $skillUIVo.cdnumB.Invisible();
                        $skillUIVo.cdnumA.Invisible();
                        $skillUIVo.blackMask.x = 2000;
                    }
                }
            }
            this._jumpAndEatCompenent.update();
        };
        //设置当前主技能的功能
        FightSkillPanel.prototype.loadBaseSkillIconById = function (value) {
            var $url = this.getPicToSkillById(value);
            this.drawPicToSkill($url);
            this.lastNeedShowUrl = $url;
        };
        FightSkillPanel.prototype.getPicToSkillById = function ($id) {
            return "ui/load/skill/" + $id + ".png";
        };
        FightSkillPanel.prototype.drawPicToSkill = function ($url) {
            var _this = this;
            if ($url != this.lastNeedShowUrl) {
                return;
            }
            if (this.skilImgKey[$url]) {
                var rec = this._bottomRender.uiAtlas.getRec(this.a_skill_1.skinName);
                var $ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                $ctx.drawImage(this.skilImgKey[$url], 0, 0, rec.pixelWitdh, rec.pixelHeight);
                TextureManager.getInstance().updateTexture(this._bottomRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $ctx);
            }
            else {
                var img = new Image();
                img.onload = function () {
                    _this.skilImgKey[$url] = img;
                    _this.drawPicToSkill($url);
                };
                img.src = Scene_data.fileRoot + $url;
            }
        };
        FightSkillPanel.prototype.refresh = function () {
            tb.SkillData.resetSkillData();
            var $skillList = tb.SkillData.skillList;
            for (var i = 0; i < $skillList.length; i++) {
                var $vo = $skillList[i];
                if ($vo.slot >= 2 && $vo.slot <= 5) {
                    this.drawSkillIcon($vo);
                }
                else if (i > 0 && isNaN($vo.slot)) {
                    this.drawFristIconPic($vo, i + 1, this.getunlocklev($vo.tb_skill_base.id));
                }
            }
            // this.showDivneSkillIcon();
        };
        FightSkillPanel.prototype.getunlocklev = function ($skillid) {
            var tabvo = tb.TB_char_skill.get_TB_char_skillById(GuidData.player.getCharType());
            for (var i = 0; i < tabvo.unlocks.length; i++) {
                var element = tabvo.unlocks[i][1];
                if (element == $skillid) {
                    return tabvo.unlocks[i][0];
                }
            }
            return -1;
        };
        FightSkillPanel.prototype.drawFristIconPic = function ($vo, $id, $unlocklev) {
            var _this = this;
            //console.log("---");
            var $tempBut = this["a_skill_" + $id];
            IconManager.getInstance().getIcon(getSkillIconUrl(String($vo.tb_skill_base.icon)), function ($img) {
                var $rec = _this._topRender.uiAtlas.getRec($tempBut.skinName);
                var $ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg($ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                $ctx.drawImage($img, 4, 4, 62, 62);
                UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, 71, 71));
                var str = $unlocklev > 9 ? "" : " ";
                str += $unlocklev + " 级\n开 启";
                LabelTextFont.writeSingleLabelToCtx($ctx, str, 16, 16, 15, TextAlign.LEFT, ColorType.colorffe9b4, ColorType.colord27262e);
                _this._topRender.uiAtlas.updateCtx($ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        //绘制神兵图标
        FightSkillPanel.prototype.drawPicToFristDiveneIcon = function () {
            var _this = this;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_divine_base); //找到第一个神兵
            for (var $key in $obj.data) {
                var sele = $obj.data[$key];
                break;
            }
            var $vo = tb.TB_divine_baseVO.get_TB_divine_base(sele.id);
            LoadManager.getInstance().load(Scene_data.fileRoot + getSkillIconUrl(String($vo.skillvo.tb_skill_base.icon)), LoadManager.IMG_TYPE, function ($img) {
                var $skillrec = _this._topRender.uiAtlas.getRec(_this.a_skill_5.skinName);
                var $ctx = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                $ctx.drawImage($img, 2, 2, 65, 65);
                UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, 69, 69));
                //推送至显卡
                _this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
            });
        };
        FightSkillPanel.prototype.drawSkillIcon = function ($vo) {
            var $tempBut = this["a_skill_" + $vo.slot];
            this.drawPicToSkillBut($vo, $tempBut);
        };
        //给技能加上图标， 神兵和主动技能
        FightSkillPanel.prototype.drawPicToSkillBut = function ($vo, $ui) {
            var _this = this;
            $ui.data = $vo;
            LoadManager.getInstance().load(Scene_data.fileRoot + getSkillIconUrl(String($vo.tb_skill_base.icon)), LoadManager.IMG_TYPE, function ($img) {
                var $skillrec = _this._topRender.uiAtlas.getRec($ui.skinName);
                var $ctx = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                UiDraw.cxtDrawImg($ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                $ctx.drawImage($img, 4, 4, 62, 62);
                //推送至显卡
                _this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
            });
            this.setSkillCdTime($ui);
        };
        FightSkillPanel.prototype.refreshCdBySkillId = function ($skillId) {
            if ($skillId == 1) {
                GuidData.player.nextCanJumpTM = TimeUtil.getTimer() + tb.SkillData.jumpSkillVo.singleCD;
            }
            else {
                for (var i = 0; i < this.skillList.length; i++) {
                    var $skillUIVo = this.skillList[i];
                    var $skillVo = $skillUIVo.iconUi.data;
                    if ($skillVo && $skillVo.id == $skillId) {
                        tb.SkillData.setCdMeshData($skillVo.id, $skillVo.singleCD);
                        $skillUIVo.cd.lastTime = TimeUtil.getTimer();
                    }
                }
            }
        };
        FightSkillPanel.prototype.setSkillCdTime = function ($ui) {
            for (var i = 0; i < this.skillList.length; i++) {
                var $skillUIVo = this.skillList[i];
                if ($skillUIVo.iconUi == $ui) {
                    var $skillBaseDataVo = $ui.data;
                    var $saveTime = tb.SkillData.getCdMeshBySkillId($skillBaseDataVo.id);
                    $skillUIVo.cd.cdTotalnum = $skillBaseDataVo.singleCD;
                    $skillUIVo.cd.lastTime = $saveTime - $skillBaseDataVo.singleCD;
                }
            }
        };
        FightSkillPanel.prototype.butClik = function (evt) {
            if (!GameInstance.canclikFightui) {
                return;
            }
            if (GuidData.map.is1V1()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                return;
            }
            switch (evt.target) {
                case this.a_skill_2:
                case this.a_skill_3:
                case this.a_skill_4:
                case this.a_skill_5:
                    // //console.log("--技能名--",evt.target.data.tb_skill_base.id);
                    this.selectSkillButUi(evt.target);
                    break;
                case this.a_skill_1:
                    this.selectThreeBut();
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    break;
                case this.a_jump_but:
                    AotuSkillManager.getInstance().jumpTo();
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    break;
                default:
                    break;
            }
        };
        FightSkillPanel.prototype.selectThreeBut = function () {
            if (this.nextThreeButTime < TimeUtil.getTimer()) {
                var $vo = tb.SkillData.threeSkillList[GameInstance.threeBattarId++ % 3];
                this.playSkillToAttack($vo);
                this.nextThreeButTime = TimeUtil.getTimer() + 700;
            }
        };
        FightSkillPanel.prototype.testCdFinishBySkillId = function ($ui) {
            for (var i = 0; i < this.skillList.length; i++) {
                var $skillUIVo = this.skillList[i];
                if ($skillUIVo.iconUi == $ui) {
                    return $skillUIVo.cd.isFinish;
                }
            }
            return false;
        };
        FightSkillPanel.prototype.selectSkillButUi = function ($ui) {
            if (GameInstance.mainChar.isDeath) {
                return;
            }
            if (!this.testCdFinishBySkillId($ui)) {
                return;
            }
            if ($ui.data) {
                this.playSkillToAttack($ui.data);
            }
        };
        FightSkillPanel.prototype.playSkillToAttack = function ($vo) {
            // if (GuidData.map.is1V1()) {
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
            //     return;
            // }
            var _this = this;
            GameInstance.attackTarget = RelationManager.getInstance().findNearAttackBySkill();
            var $canPlay = FightSkillModel.getInstance().canPlaySkillToAttackTarger($vo.tb_skill_uplevel.distance * 10);
            if ($vo.id == 10017) {
                $canPlay = true; //还需要更具表重新规划，
            }
            if ($canPlay) {
                MainCharControlModel.getInstance().sendStop();
                MainCharControlModel.getInstance().downMount();
                AotuSkillManager.getInstance().aotuBattle = false;
                FightSkillModel.getInstance().playSkillToAttack($vo, true);
            }
            else {
                if (GameInstance.mainChar._speedDirect) {
                    GameInstance.attackTarget = null;
                }
                else {
                    if (GameInstance.attackTarget) {
                        FightSkillModel.getInstance().moveToAttackTarger(GameInstance.attackTarget, $vo, function () {
                            _this.playSkillToAttack($vo);
                        });
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "附近没有目标", 99);
                    }
                }
            }
        };
        return FightSkillPanel;
    }(UIVirtualContainer));
    fightui.FightSkillPanel = FightSkillPanel;
})(fightui || (fightui = {}));
//# sourceMappingURL=FightSkillPanel.js.map