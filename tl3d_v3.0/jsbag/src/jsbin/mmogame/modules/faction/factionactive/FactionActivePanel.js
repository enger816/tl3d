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
    var FactionActivePanel = /** @class */ (function (_super) {
        __extends(FactionActivePanel, _super);
        function FactionActivePanel() {
            var _this = _super.call(this) || this;
            _this._selIdx = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._baseUiAtlas = new UIAtlas();
            _this._leaderPanel = new faction.FactionLeaderPanel();
            _this._tripPanel = new faction.FactionTripPanel();
            return _this;
        }
        FactionActivePanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this._leaderPanel) {
                this._leaderPanel.dispose();
                this._leaderPanel = null;
            }
            if (this._tripPanel) {
                this._tripPanel.dispose();
                this._tripPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        FactionActivePanel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                this.hide();
            }
        };
        FactionActivePanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/faction/factionactive/factionactive.xml", "ui/uidata/faction/factionactive/factionactive.png", function () { _this.loadConfigCom(); });
        };
        FactionActivePanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            this._leaderPanel.setUIAtlas(this._baseUiAtlas, this);
            this._tripPanel.setUIAtlas(this._baseUiAtlas, this.winmidRender);
            this.resize();
            this.applyLoadComplete();
        };
        FactionActivePanel.prototype.initUI = function () {
            this.addUIList(["t_win_bian"], this.winmidRender);
            this.addUIList(["t_win_line"], this._topRender);
            this.addChild(this._baseRender.getComponent("t_win_title"));
            this.tab0 = this._baseRender.getComponent("t_tab0");
            this.addChild(this.tab0);
            this.tab0.addEventListener(InteractiveEvent.Down, this.tabClick, this);
            this.tab1 = this._baseRender.getComponent("t_tab1");
            this.addChild(this.tab1);
            this.tab1.addEventListener(InteractiveEvent.Down, this.tabClick, this);
        };
        FactionActivePanel.prototype.tabClick = function ($e) {
            if ($e.target == this.tab0) {
                this.setIdx(SharedDef.MODULE_FACTIONACTIVE_TRIAL);
            }
            else if ($e.target == this.tab1) {
                this.setIdx(SharedDef.MODULE_FACTIONACTIVE_BOSS);
            }
        };
        FactionActivePanel.prototype.setIdx = function ($idx) {
            if ($idx == SharedDef.MODULE_FACTIONACTIVE_TRIAL) {
                this.tab0.selected = true;
                this.tab1.selected = false;
                this._tripPanel.show();
                this._leaderPanel.hide();
            }
            else if ($idx == SharedDef.MODULE_FACTIONACTIVE_BOSS) {
                this.tab0.selected = false;
                this.tab1.selected = true;
                this._tripPanel.hide();
                this._leaderPanel.show();
            }
            this._selIdx = $idx;
        };
        FactionActivePanel.prototype.show = function ($tab) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            SceneManager.getInstance().render = false;
            this.setIdx($tab);
            //UIManager.getInstance().addUIContainer(this._tripPanel);
            var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        };
        FactionActivePanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this._selIdx == SharedDef.MODULE_FACTIONACTIVE_TRIAL) {
                this._tripPanel.hide();
            }
            else if (this._selIdx == SharedDef.MODULE_FACTIONACTIVE_BOSS) {
                this._leaderPanel.hide();
            }
            //UIManager.getInstance().removeUIContainer(this._leaderPanel);
            //UIManager.getInstance().removeUIContainer(this._tripPanel);
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        FactionActivePanel.prototype.leadDataChg = function () {
            if (this._leaderPanel && this._leaderPanel.hasStage) {
                this._leaderPanel.drawLead();
            }
        };
        FactionActivePanel.prototype.tripDataChg = function () {
            if (this._tripPanel && this._tripPanel.hasStage) {
                this._tripPanel.maxChg();
            }
        };
        return FactionActivePanel;
    }(WindowUi));
    faction.FactionActivePanel = FactionActivePanel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionActivePanel.js.map