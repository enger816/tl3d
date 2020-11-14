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
var topui;
(function (topui) {
    var TopTargetHeadPanel = /** @class */ (function (_super) {
        __extends(TopTargetHeadPanel, _super);
        function TopTargetHeadPanel() {
            var _this = _super.call(this) || this;
            _this.lastVisble = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.left = 0;
            return _this;
        }
        TopTargetHeadPanel.prototype.setRender = function ($bottom, $mid, $top, $centerRender) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._centerRender = $centerRender;
            this._topRender = $top;
            this.loadConfigCom();
        };
        TopTargetHeadPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this.addUIList(["t_tar_bg"], this._bottomRender);
            this.bloodUI = this.addChild(this._midRender.getComponent("t_tar_blood"));
            this.iconUI = this.addChild(this._midRender.getComponent("t_tar_icon"));
            this.addUIList(["t_tar_mask"], this._centerRender);
            this.nameUI = this.addChild(this._topRender.getComponent("t_name"));
            this.bloodTxt = this.addChild(this._topRender.getComponent("t_blood_txt"));
            this.levUI = this.addChild(this._topRender.getComponent("t_level"));
            //this.draw();
            //this.refreshBlood();
            TimeUtil.addFrameTick(function (t) { _this.upDataFun(t); });
        };
        TopTargetHeadPanel.prototype.upDataFun = function (t) {
            var $isvisible = true;
            if (GameInstance.attackTarget && GuidData.map) {
                if (GameInstance.attackTarget.isBoss) {
                    $isvisible = false;
                }
                if (GuidData.map.is1V1() || GuidData.map.is3V3() || GuidData.map.getMapID() == 3018) {
                    $isvisible = false;
                }
            }
            else {
                $isvisible = false;
            }
            if ($isvisible) {
                this.setVisible(true);
                this.drawAttackName();
                this.drawBloodNum();
                this.drawIcon();
            }
            else {
                this.setVisible(false);
            }
        };
        TopTargetHeadPanel.prototype.drawBloodNum = function () {
            var $num = GameInstance.attackTarget.unit.getHp() / GameInstance.attackTarget.unit.getMaxHp();
            if (this.lastBloodnum !== $num) {
                this.lastBloodnum = $num;
                this.bloodUI.uvScale = $num * -1;
                var $hpStr = Math.ceil(Math.abs($num * 100)) + "/100";
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.bloodTxt.skinName, $hpStr, 14 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db);
            }
        };
        TopTargetHeadPanel.prototype.setVisible = function (value) {
            if (this.lastVisble != value) {
                if (value) {
                    this.left = 0;
                }
                else {
                    this.left = -1000;
                }
                this.lastVisble = value;
            }
        };
        TopTargetHeadPanel.prototype.drawIcon = function () {
            var _this = this;
            var $sid = GameInstance.attackTarget.unit.getEntry();
            if ($sid == 0) {
                $sid = GameInstance.attackTarget.unit.getCharType() % 2;
            }
            else {
                $sid = tb.TB_creature_template.get_TB_creature_template($sid).avatar;
            }
            if (this.lastIconId != $sid) {
                this.lastIconId = $sid;
                IconManager.getInstance().getIcon(getRoleIconUrl(String(this.lastIconId)), function ($img) {
                    var rec = _this._midRender.uiAtlas.getRec(_this.iconUI.skinName);
                    var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    TextureManager.getInstance().updateTexture(_this._midRender.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
                });
            }
        };
        TopTargetHeadPanel.prototype.drawAttackName = function () {
            var $level = String(GameInstance.attackTarget.unit.getLevel());
            var $useName = getBaseName(GameInstance.attackTarget.unit.getName());
            if (this.lastName != $useName || this.lastLevel != $level) {
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.nameUI.skinName, ColorType.Whitefff7db + $useName + " ", 16 * 1.5, TextAlign.RIGHT, ColorType.Whitefff7db);
                this.lastName = $useName;
                this.lastLevel = $level;
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.levUI.skinName, ColorType.Whitefff7db + $level, 16 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db);
            }
        };
        return TopTargetHeadPanel;
    }(UIVirtualContainer));
    topui.TopTargetHeadPanel = TopTargetHeadPanel;
    var TopHeadPanel = /** @class */ (function (_super) {
        __extends(TopHeadPanel, _super);
        function TopHeadPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.left = 0;
            return _this;
        }
        TopHeadPanel.prototype.setRender = function ($bottom, $mid, $top, $fra, $red) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this._effRender = $fra;
            this._redRender = $red;
            this.loadConfigCom();
        };
        TopHeadPanel.prototype.loadConfigCom = function () {
            this.a_head_bg = this.addChild(this._bottomRender.getComponent("a_head_bg"));
            var ui = this.addChild(this._bottomRender.getComponent("a_vip_bg"));
            ui.addEventListener(InteractiveEvent.Down, this.vipclick, this);
            this.a_blood_bar = this.addChild(this._midRender.getComponent("a_blood_bar"));
            this.a_head_pic = this.addEvntButUp("a_head_pic", this._midRender);
            this.a_pk_model = this.addEvntButUp("a_pk_model", this._midRender);
            this.addChild(this._topRender.getComponent("a_head_mask"));
            this.addChild(this._topRender.getComponent("a_levbg"));
            this.a_vip_num = this.addChild(this._topRender.getComponent("a_vip_num"));
            this.a_name = this.addChild(this._topRender.getComponent("a_name"));
            this.a_level = this.addChild(this._topRender.getComponent("a_level"));
            this.a_blood_txt = this.addChild(this._topRender.getComponent("a_blood_txt"));
            this.a_froce = this.addChild(this._topRender.getComponent("a_froce"));
            this.soundUI = this.addChild(this._topRender.getComponent("t_sound"));
            // this.soundUI.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.setSound();
            //this.mailUI = this.addChild(this._topRender.getComponent("t_mail"));   
            //this.mailUI.addEventListener(InteractiveEvent.Down, this.mailClick, this); 
            //var red: RedPointCompenent = this._redRender.getRedPointUI(this, 3, new Vector2D(this.mailUI.x + this.mailUI.width, this.mailUI.y));
            this.buildeff();
            this.loadRolePic();
        };
        TopHeadPanel.prototype.setSound = function () {
            this.soundUI.goToAndStop(GameData.configData.block_volume_set > 0 ? 1 : 0);
        };
        TopHeadPanel.prototype.buildeff = function () {
            var _this = this;
            this._effRender.setImg(getEffectUIUrl("ef_zhanli_01"), 8, 4, function ($ui) {
                _this._effUI = $ui;
                _this._effUI.x = _this.a_head_bg.x + 83;
                _this._effUI.y = _this.a_head_bg.y + 23;
                //this.expEff.width = this.expEff.baseRec.width * 1.5;
                //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                _this._effUI.speed = 1;
                _this._effUI.play();
                _this.addChild(_this._effUI);
            });
        };
        TopHeadPanel.prototype.vipclick = function ($e) {
            ModulePageManager.openPanel(SharedDef.MODULE_VIP);
        };
        TopHeadPanel.prototype.mailClick = function ($e) {
            ModulePageManager.openPanel(SharedDef.MODULE_MAIL);
        };
        TopHeadPanel.prototype.loadRolePic = function () {
            var $type = GuidData.player.getCharType(); //1男2女
            var $url = getTouPic($type);
            this._bottomRender.uiAtlas.upDataPicToTexture($url, this.a_head_pic.skinName);
        };
        TopHeadPanel.prototype.refreshBloodBar = function () {
            var $unit = GameInstance.mainChar.unit;
            ////console.log($unit.getHp(), "/", $unit.getMaxHp());
            this.a_blood_bar.uvScale = $unit.getCurHpView() / $unit.getMaxHpView();
            var $hpStr = String($unit.getCurHpView()) + "/" + String($unit.getMaxHpView());
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_blood_txt.skinName, $hpStr, 14 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db);
            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.a_blood_txt.skinName, $hpStr, ArtFont.num30, TextAlign.RIGHT, 1);
        };
        TopHeadPanel.prototype.refresh = function () {
            if (GuidData.map.showAreaById(AreaType.topleft_1)) {
                this.left = 0;
            }
            else {
                this.left = -1000;
            }
            var $level = String(GuidData.player.getLevel());
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_level.skinName, ColorType.Whitefff7db + $level, 16 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db);
            var $useName = getBaseName(GuidData.player.getName());
            //ColorType.White, "#27262e", 3
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_name.skinName, ColorType.Whitefff7db + $useName + " ", 16 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db);
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.a_vip_num.skinName, String(GuidData.player.getVipLevel()), ArtFont.numVip, TextAlign.LEFT);
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.a_froce.skinName, Snum(Math.floor(GuidData.player.getForce())), ArtFont.numVip, TextAlign.LEFT);
            var $fieldNotoriety = GuidData.player.getUnitFieldNotoriety(); //战斗模式
            if ($fieldNotoriety == 0) {
                this.a_pk_model.goToAndStop(0);
            }
            if ($fieldNotoriety == 1) {
                this.a_pk_model.goToAndStop(1);
            }
            this.refreshBloodBar();
        };
        TopHeadPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_head_pic:
                    UiTweenScale.getInstance().changeButSize(this.soundUI);
                    if (GameStart.outNet) {
                        if (GameData.configData.block_volume_set > 0) {
                            GameData.configData.block_volume_set = 0;
                        }
                        else {
                            GameData.configData.block_volume_set = 1;
                        }
                        this.setSound();
                    }
                    else {
                        if (GameStart.GM && evt.type == InteractiveEvent.Up) {
                            ModuleEventManager.dispatchEvent(new Camand.ComandEvent(Camand.ComandEvent.SHOW_COMMAND_EVENT));
                        }
                    }
                    break;
                case this.a_pk_model:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (GuidData.map.tbMapVo.allowChangeMode == 1) {
                        if (this.a_pk_model.current == 0) {
                            AlertUtil.show("切换为pk模式将攻击家族以外的所有玩家，是否确认？", "提示", function (a) {
                                if (a == 1) {
                                    NetManager.getInstance().protocolos.change_battle_mode(SharedDef.FAMILY_MODE);
                                }
                            });
                        }
                        else {
                            NetManager.getInstance().protocolos.change_battle_mode(SharedDef.PEACE_MODE);
                        }
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "此场景无法切换模式", 99);
                    }
                    //public static PEACE_MODE: number = 0;	// 和平模式
                    //public static FAMILY_MODE: number = 1;// 家族模式
                    //public static GROUP_MODE: number = 2;	// 组队模式
                    break;
                default:
                    break;
            }
        };
        return TopHeadPanel;
    }(UIVirtualContainer));
    topui.TopHeadPanel = TopHeadPanel;
})(topui || (topui = {}));
//# sourceMappingURL=TopHeadPanel.js.map