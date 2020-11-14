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
var faction;
(function (faction) {
    var FactionBuildUiPanel = /** @class */ (function (_super) {
        __extends(FactionBuildUiPanel, _super);
        function FactionBuildUiPanel() {
            var _this = _super.call(this) || this;
            /**
             * 监听当前挑战的bossid，若不为0，则表示正在挑战boss。需要倒计时刷新界面
             */
            _this._timeTickflag = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            return _this;
        }
        FactionBuildUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.factionBuildRightPanel) {
                this.factionBuildRightPanel.dispose();
                this.factionBuildRightPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        FactionBuildUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/factionbuild/mainbuild.xml", "ui/uidata/faction/factionbuild/mainbuild.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
        };
        FactionBuildUiPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._baseRender.uiAtlas = this._topRender.uiAtlas;
            this._publicRender.uiAtlas = WindowUi.winUIAtlas;
            var renderLevel = this._topRender;
            this.tickFun = function () { _this.refreshBossState(); };
            var a = this.addChild(this._publicRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(a, "coffeeBg", renderLevel);
            // this.addEvntBut("baseBg", this._publicRender) //大黑背景
            this.b_speed = this.addEvntButUp("cnew_but_operation", this._publicRender);
            this.b_speed.x = 743;
            this.b_speed.y = 449;
            this._publicRender.applyObjData();
            this.addUIList(["a_17", "a_18"], renderLevel);
            this.addUIList(["bg3_1", "bg3_2"], this._baseRender);
            this.curbuild = this.addChild(renderLevel.getComponent("a_19"));
            this.buildtime = this.addChild(renderLevel.getComponent("a_20"));
            var a_1 = this.addChild(renderLevel.getComponent("a_1"));
            var a_3 = this.addChild(renderLevel.getComponent("a_3"));
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a_1.skinName, "当前建造中:", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a_3.skinName, "剩余建造时间:", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.Needrefresh();
            this.applyLoadComplete();
        };
        FactionBuildUiPanel.prototype.refreshBossState = function () {
            if (GuidData.faction.getBuildCur() == 0 || !this.hasStage) {
                this._timeTickflag = false;
                TimeUtil.removeTimeTick(this.tickFun);
                return;
            }
            this.resetData();
        };
        FactionBuildUiPanel.prototype.Needrefresh = function () {
            if (GuidData.faction.getBuildCur() != 0 && !this._timeTickflag) {
                this._timeTickflag = true;
                TimeUtil.addTimeTick(5000, this.tickFun);
            }
        };
        FactionBuildUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            if (!this.factionBuildRightPanel) {
                this.factionBuildRightPanel = new faction.FactionBuildRightPanel();
                this.factionBuildRightPanel.initUiAtlas(this._topRender.uiAtlas, this._publicRender.uiAtlas);
            }
            this.factionBuildRightPanel.show();
            this.resetData();
        };
        FactionBuildUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.factionBuildRightPanel) {
                this.factionBuildRightPanel.hide();
            }
            _super.prototype.hide.call(this);
        };
        FactionBuildUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        FactionBuildUiPanel.prototype.resetData = function () {
            var curbuildname = "无";
            var curbuildtime = "无";
            if (GuidData.faction.getBuildCur() > 0) {
                var tabvo = tb.TB_faction_building.get_TB_faction_buildingById(GuidData.faction.getBuildCur());
                curbuildname = tabvo.name + "  LV" + tabvo.level + " - LV" + (tabvo.level + 1);
                var curtime = this.getRestTime();
                var hour = "";
                var min = "";
                if (curtime[0] > 0) {
                    hour = curtime[0] + "小时";
                }
                if (curtime[1] > 0) {
                    min = curtime[1] + "分钟";
                }
                curbuildtime = hour + min;
            }
            //console.log("---", curbuildtime);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.curbuild.skinName, "  " + curbuildname + "  ", 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.buildtime.skinName, "  " + curbuildtime, 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
        };
        FactionBuildUiPanel.prototype.getRestTime = function () {
            var endtime = GuidData.faction.getBuildEndTime();
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts);
            var a = endtime - $sever.getTime();
            var min;
            var h;
            if (a < 3600) {
                min = Math.ceil(a / 60);
                h = 0;
            }
            else {
                h = Math.floor(a / 3600);
                min = Math.ceil(a / 60) - (h * 60);
            }
            return [h, min];
        };
        FactionBuildUiPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.HIDE_BUILD_EVENT));
                    break;
                case this.b_speed:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (GuidData.faction.getBuildCur() > 0) {
                        var tab3 = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
                        //加速建造
                        var $evt = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL);
                        $evt.resoureItem = tab3.speedup_cost;
                        // $evt.Type = popbuy.PopBuyType.SPEEDBUILD;
                        $evt.Info1 = "剩余";
                        var tab = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
                        $evt.Info2 = "一次加速减少" + tab.speedup_time + "分钟建造时间";
                        $evt.cutNum = tab3.speedup_limit - GuidData.player.getFactionSpeedUpNum();
                        $evt.SubmitFun = function (value) {
                            if (_this.compareTime(value * tab3.speedup_time)) {
                                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BUILDING_UPGRADE_SPEEDUP, value, 0, "", "");
                            }
                            else {
                                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "建筑即将建造完成，请减少购买次数", 99);
                            }
                        };
                        ModuleEventManager.dispatchEvent($evt);
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前无可加速建筑", 99);
                    }
                    break;
                default:
                    break;
            }
        };
        FactionBuildUiPanel.prototype.compareTime = function ($addtime) {
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts);
            var time = ($sever.getTime() + $addtime * 60) - GuidData.faction.getBuildEndTime() - 59;
            if (time > 0) {
                return false;
            }
            else {
                return true;
            }
        };
        return FactionBuildUiPanel;
    }(WindowUi));
    faction.FactionBuildUiPanel = FactionBuildUiPanel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBuildUiPanel.js.map