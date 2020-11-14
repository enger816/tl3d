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
var rightui;
(function (rightui) {
    var RightUiPanel = /** @class */ (function (_super) {
        __extends(RightUiPanel, _super);
        function RightUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.right = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._aotuRender = new UIRenderComponent;
            _this.addRender(_this._aotuRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._exitRender = new UIRenderComponent;
            _this.addRender(_this._exitRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._effRender = new FrameUIRender;
            _this.addRender(_this._effRender);
            _this._frameRender = new FrameUIRender;
            _this.addRender(_this._frameRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        RightUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/right/right.xml", "ui/uidata/mainui/right/right.png", function () { _this.loadConfigCom(); });
        };
        RightUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._exitRender.uiAtlas = this._midRender.uiAtlas;
            this._aotuRender.uiAtlas = this._midRender.uiAtlas;
            this.a_bag = this.addEvntButUp("a_bag", this._bottomRender);
            this.a_bag.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            this.a_hunjing = this.addEvntButUp("a_hunjing", this._bottomRender);
            this.a_hunjing.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            this.removeChild(this.a_hunjing);
            this.a_skill_aotu = this.addEvntBut("a_skill_aotu", this._aotuRender);
            this.a_sys_tip_pic = this.addEvntButUp("a_sys_tip_pic", this._bottomRender);
            this.a_sys_tip_pic.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            this.a_sys_tip_pic.addEventListener(InteractiveEvent.Up, this.a_sys_tip_picClik, this);
            //  this.removeChild(this.a_sys_tip_pic)
            this.a_sys_tip_txt = this.addChild(this._midRender.getComponent("a_sys_tip_txt"));
            this.a_sys_tip_icon = this.addChild(this._midRender.getComponent("a_sys_tip_icon"));
            this.a_change = this.addEvntButUp("a_change", this._bottomRender);
            this.a_change.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            this._redPointRender.getRedPointUI(this, 124, new Vector2D(this.a_hunjing.x + this.a_hunjing.width, this.a_hunjing.y));
            this.bag_red = this._redPointRender.getRedPointUI(this, 1, new Vector2D(this.a_bag.x + this.a_bag.width, this.a_bag.y));
            this.change_red = this._redPointRender.getRedPointUI(this, 5, new Vector2D(this.a_change.x + this.a_change.width, this.a_change.y));
            this.a_exit = this.addChild(this._exitRender.getComponent("a_exit"));
            this.a_exit.addEventListener(InteractiveEvent.Up, this.exitMap, this);
            this.a_exit.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            this.uiAtlasComplet = true;
            this.refreshNotice();
            this.buildFram();
            BagData.uipos.x = this.a_bag.absoluteX + this.a_bag.width / 2;
            BagData.uipos.y = this.a_bag.absoluteY + this.a_bag.height / 2;
        };
        RightUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            BagData.uipos.x = this.a_bag.absoluteX + this.a_bag.width / 2;
            BagData.uipos.y = this.a_bag.absoluteY + this.a_bag.height / 2;
        };
        RightUiPanel.prototype.buildFram = function () {
            var _this = this;
            // if (!this._frameRender) {
            // this._frameRender = new FrameUIRender();
            // this.addRender(this._frameRender);
            this._frameRender.setImg(getEffectUIUrl("ef_zd"), 4, 4, function ($ui) {
                _this.effui = $ui;
                _this.effui.x = _this.a_skill_aotu.x - 46;
                _this.effui.y = _this.a_skill_aotu.y - 42;
                _this.effui.width = _this.effui.baseRec.width * 1.1;
                _this.effui.height = _this.effui.baseRec.height * 1.1;
                _this.effui.speed = 3;
                _this.applyLoadComplete();
            }, 1);
            // }else{
            //     this.refresh();
            // }
        };
        RightUiPanel.prototype.playEff = function ($isvisiable) {
            if (!this.effui) {
                return;
            }
            if ($isvisiable) {
                //console.log("----对象------", this.effui);
                this.addChild(this.effui);
                this.effui.play();
            }
            else {
                this.removeChild(this.effui);
            }
        };
        RightUiPanel.prototype.a_sys_tip_picClik = function ($e) {
            if (this.a_sys_tip_pic.data instanceof tb.TB_system_preview) {
                var $tb = this.a_sys_tip_pic.data;
                //console.log($tb)
                // var a: vec3DshowVo = new vec3DshowVo();
                // a.info = $tb.p_info;
                // a.name = $tb.p_name;
                // a.type = $tb.type;
                // a.id = $tb.id;
                // if ($tb.p_model[0].length > 1) {
                //     if (GuidData.player.getCharType() == 1) {
                //         a.modelid = $tb.p_model[0][0];
                //     } else {
                //         a.modelid = $tb.p_model[0][1];
                //     }
                // } else {
                //     a.modelid = $tb.p_model[0][0];
                // }
                // a.state = 2;
                // Vec3DshowPanel.getInstance().show(a);
                var $evt = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_SYSTRAILER_EVENT);
                $evt.data = $tb.id;
                ModuleEventManager.dispatchEvent($evt);
            }
            else {
                var $showActivityVo = this.a_sys_tip_pic.data;
                ModulePageManager.openPanel($showActivityVo.data.goto, $showActivityVo.data.goto_sub);
            }
        };
        RightUiPanel.prototype.isaddHuanjingBut = function () {
            var _this = this;
            if (!this._huanjingEff) {
                this.addChild(this.a_hunjing);
                this._effRender.setImg(getEffectUIUrl("ui_mx"), 4, 4, function ($ui) {
                    _this._huanjingEff = $ui;
                    _this._huanjingEff.x = _this.a_hunjing.x - 10;
                    _this._huanjingEff.y = _this.a_hunjing.y - 10;
                    _this._huanjingEff.width = _this._huanjingEff.baseRec.width * 0.7;
                    _this._huanjingEff.height = _this._huanjingEff.baseRec.height * 0.7;
                    _this.addChild(_this._huanjingEff);
                    _this._huanjingEff.speed = 3;
                    _this._huanjingEff.play();
                });
            }
        };
        RightUiPanel.prototype.refreshNotice = function () {
            var $has = false;
            if (this.uiAtlasComplet) {
                if (GuidData.faction) {
                    if (GuidData.faction.getApplyList().length) {
                        $has = true;
                    }
                }
            }
        };
        RightUiPanel.prototype.butClik = function (evt) {
            if (!GameInstance.canclikFightui) {
                return;
            }
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_bag:
                    ModulePageManager.openPanel(SharedDef.MODULE_BAG, 2);
                    break;
                case this.a_change:
                    UIManager.popClikNameFun(this.a_change.skinName);
                    mainUi.MainUiModel.skillTabIndex = (mainUi.MainUiModel.skillTabIndex + 1) % 2;
                    if (mainUi.MainUiModel.skillTabIndex == 0) {
                        ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.SHOW_FIGHT_UI_PANEL));
                        ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.HIDE_HOME_UI_PANEL));
                    }
                    else {
                        ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.SHOW_HOME_UI_PANEL));
                        ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.HIDE_FIGHT_UI_PANEL));
                    }
                    ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
                    break;
                case this.a_hunjing:
                    //console.log("---a_hunjing---");
                    ModulePageManager.openPanel(SharedDef.MODULE_REALM);
                    // msgtip.GuideModel.getInstance().clikOptionalGuide
                    UIManager.popClikNameFun(this.a_hunjing.name);
                    break;
                case this.a_skill_aotu:
                    AotuSkillManager.getInstance().aotuBattle = !AotuSkillManager.getInstance().aotuBattle;
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    break;
                default:
                    break;
            }
        };
        RightUiPanel.prototype.changeSkillAotu = function () {
            if (this.a_skill_aotu) {
                this.a_skill_aotu.selected = AotuSkillManager.getInstance().aotuBattle;
                if (GuidData.map.showAreaById(AreaType.rightChange_6) || GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                    this.playEff(this.a_skill_aotu.selected);
                    //console.log("====自动战斗按钮======", this.a_skill_aotu.selected)
                }
            }
        };
        RightUiPanel.prototype.exitMap = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (!this._exitFun) {
                this._exitFun = function ($type) {
                    if ($type == 1) {
                        NetManager.getInstance().protocolos.instance_exit(0);
                    }
                };
            }
            if (GuidData.map.tbMapVo.inst_sub_type == 13) {
                AlertUtil.show("放弃挑战不会获得任何奖励并扣除挑战次数！是否放弃？", "", this._exitFun, 2, ["是", "否"]);
            }
            else if (GuidData.map.tbMapVo.inst_sub_type == 20) {
                AlertUtil.show("副本尚未结束,退出副本将损失巨大经验,副本次数不会返还,是否退出？", "", this._exitFun, 2, ["是", "否"]);
            }
            else {
                this._exitFun(1);
            }
        };
        RightUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            var bagShow = GuidData.map.showAreaById(AreaType.rightChange_6);
            this.renderSetVisibel([this._bottomRender, this._midRender, this._redPointRender, this._effRender], bagShow);
            var exitShow = GuidData.map.showAreaById(AreaType.sceneExit_30);
            this.renderSetVisibel([this._exitRender], exitShow);
            if (exitShow) {
                if (bagShow) {
                    this.a_exit.y = this.a_exit.baseRec.y - 70;
                    this.a_exit.x = this.a_exit.baseRec.x - 0;
                }
                else {
                    this.a_exit.y = this.a_exit.baseRec.y;
                    this.a_exit.x = this.a_exit.baseRec.x;
                }
            }
            // if (GuidData.map.isAdventureBaseScene() || GuidData.map.isAdventureBossScene()) {
            //     if (GuidData.map.isAdventureBaseScene()) {
            //         this.a_hunjing.goToAndStop(1);
            //     } else {
            //         this.a_hunjing.goToAndStop(2);
            //     }
            //     if (this._huanjingEff) {
            //         this.removeChild(this._huanjingEff);
            //     }
            // } else {
            //     this.a_hunjing.goToAndStop(0);
            //     if (this._huanjingEff) {
            //         this.addChild(this._huanjingEff)
            //     }
            // }
            if (GuidData.player.isOpenSystemNeedShow(SharedDef.MODULE_REALM)) {
                this.isaddHuanjingBut();
            }
            if (GuidData.map.showAreaById(AreaType.rightChange_6) || GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                this.renderSetVisibel([this._aotuRender], true);
            }
            else {
                this.renderSetVisibel([this._aotuRender], false);
            }
            this.drawSysTemTip();
            this.changeSkillAotu();
        };
        RightUiPanel.prototype.drawSysTemTip = function () {
            var $arr = tb.TB_system_preview.getItem();
            var temp;
            for (var i = 0; i < $arr.length; i++) {
                if ($arr[i].level_start <= GuidData.player.getLevel() && $arr[i].level > GuidData.player.getLevel()) {
                    temp = $arr[i];
                    break;
                }
            }
            if (temp) {
                var syslevtab;
                var idx;
                if (temp.npc == 1) {
                    idx = getNpcmodul(temp.system_id[3]);
                    syslevtab = tb.TB_system_base.getTempVo(idx * 10 + temp.system_id[4]);
                }
                else {
                    idx = temp.system_id[0];
                    syslevtab = tb.TB_system_base.getTempVo(temp.system_id[0] * 10 + temp.system_id[1]);
                }
                this._bottomRender.uiAtlas.upDataPicToTexture(this.getIconByID(idx), this.a_sys_tip_icon.skinName);
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_sys_tip_txt.skinName, syslevtab.level + "级解锁", 24, TextAlign.CENTER, ColorType.Whitefff4d6);
                this.a_sys_tip_pic.data = temp;
            }
            this.setUiListVisibleByItem([this.a_sys_tip_pic, this.a_sys_tip_icon, this.a_sys_tip_txt], Boolean(temp) && GuidData.map.isBaseMap());
        };
        RightUiPanel.prototype.getIconByID = function ($id) {
            //  return "ui/load/activity/panda/" + $id + ".png"
            return "ui/load/systemicon/" + $id + ".png";
        };
        RightUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return RightUiPanel;
    }(UIPanel));
    rightui.RightUiPanel = RightUiPanel;
})(rightui || (rightui = {}));
//# sourceMappingURL=RightUiPanel.js.map