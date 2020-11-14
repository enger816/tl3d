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
var adventuremap;
(function (adventuremap) {
    var WorldAdventureUiPanel = /** @class */ (function (_super) {
        __extends(WorldAdventureUiPanel, _super);
        function WorldAdventureUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._bgRender.uiAtlas = new UIAtlas;
            return _this;
        }
        WorldAdventureUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.adventureMapPanel) {
                this.adventureMapPanel.dispose();
                this.adventureMapPanel = null;
            }
            if (this.mapWorldPanel) {
                this.mapWorldPanel.dispose();
                this.mapWorldPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        WorldAdventureUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/adventure/adventuremap/adventuremap.xml", "ui/uidata/adventure/adventuremap/adventuremap.png", function () { _this.loadConfigCom(); });
        };
        WorldAdventureUiPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        WorldAdventureUiPanel.prototype.initData = function () {
            this.TabAry = new Array;
            for (var i = 0; i < 2; i++) {
                var a = this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = 2 * i + 1;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bgRender);
            this.UnlockUIAry = new Array;
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock1);
            this.winmidRender.applyObjData();
            this.addUIList(["a_tittle_name"], this._bgRender);
            this.addUIList(["t_bgline"], this._baseRender);
        };
        WorldAdventureUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        WorldAdventureUiPanel.prototype.refreshOpenLev = function () {
            //判断解锁情况
            for (var i = 0; i < 2; i++) {
                if (GuidData.player.getsyspageopen(SharedDef.MODULE_TEST, 2 * i + 1)) {
                    this.setUiListVisibleByItem([this.TabAry[i]], true);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                }
                else {
                    this.setUiListVisibleByItem([this.TabAry[i]], false);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
                    this.UnlockUIAry[i].data = tb.TB_system_base.getTempVo(SharedDef.MODULE_TEST * 10 + 2 * i + 1);
                }
            }
        };
        WorldAdventureUiPanel.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.refreshOpenLev();
            this.selectedTab($data);
        };
        WorldAdventureUiPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        };
        WorldAdventureUiPanel.prototype.selectedTab = function ($value) {
            this._lastvalue = $value;
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            this.hideTabPage($value);
            this.showTabPage($value);
        };
        WorldAdventureUiPanel.prototype.showTabPage = function ($value) {
            switch ($value) {
                case SharedDef.MODULE_TEST_RISK:
                    if (!this.adventureMapPanel) {
                        this.adventureMapPanel = new adventuremap.AdventureMapPanel();
                        this.adventureMapPanel.initUiAtlas(this._bgRender.uiAtlas);
                        this.adventureMapPanel.parent = this;
                    }
                    this.adventureMapPanel.refresh();
                    break;
                case SharedDef.MODULE_TEST_WORLD:
                    if (!this.mapWorldPanel) {
                        this.mapWorldPanel = new adventuremap.MapWorldPanel();
                        this.mapWorldPanel.initUiAtlas(this._bgRender.uiAtlas);
                        this.mapWorldPanel.parent = this;
                    }
                    this.mapWorldPanel.show();
                    break;
                default:
                    break;
            }
        };
        WorldAdventureUiPanel.prototype.hideTabPage = function ($value) {
            if ($value === void 0) { $value = -1; }
            switch ($value) {
                case SharedDef.MODULE_TEST_RISK:
                    if (this.mapWorldPanel) {
                        this.mapWorldPanel.hide();
                    }
                    break;
                case SharedDef.MODULE_TEST_WORLD:
                    if (this.adventureMapPanel) {
                        this.adventureMapPanel.hide();
                    }
                    break;
                default:
                    if (this.adventureMapPanel) {
                        this.adventureMapPanel.hide();
                    }
                    if (this.mapWorldPanel) {
                        this.mapWorldPanel.hide();
                    }
                    break;
            }
        };
        WorldAdventureUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new adventuremap.AdventureMapEvent(adventuremap.AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL));
                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock1.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        };
        WorldAdventureUiPanel.prototype.click = function (evt) {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        };
        return WorldAdventureUiPanel;
    }(WindowUi));
    adventuremap.WorldAdventureUiPanel = WorldAdventureUiPanel;
})(adventuremap || (adventuremap = {}));
//# sourceMappingURL=WorldAdventureUiPanel.js.map