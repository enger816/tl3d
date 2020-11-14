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
    var ApplyFactionUiPanel = /** @class */ (function (_super) {
        __extends(ApplyFactionUiPanel, _super);
        function ApplyFactionUiPanel() {
            var _this = _super.call(this, 0) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        ApplyFactionUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this.applybuildpanel.dispose();
            this.applybuildpanel = null;
            this.applyzhaomupanel.dispose();
            this.applyzhaomupanel = null;
            _super.prototype.dispose.call(this);
        };
        ApplyFactionUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/faction/newfaction/joinfaction.xml", "ui/uidata/faction/newfaction/joinfaction.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
        };
        ApplyFactionUiPanel.prototype.loadConfigCom = function () {
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            var renderLevel = this._baseRender;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this.applybuildpanel = new faction.ApplyBuildPanel();
            this.applybuildpanel.initUiAtlas(renderLevel.uiAtlas, this.winmidRender);
            this.applyzhaomupanel = new faction.ApplyZhaomuPanel();
            this.applyzhaomupanel.initUiAtlas(renderLevel.uiAtlas, this.winmidRender);
            this.tab_zhao = this.addEvntBut("tab_zhao", renderLevel);
            this.tab_chuang = this.addEvntBut("tab_chuang", renderLevel);
            this.tab_sai = this.addEvntBut("tab_sai", renderLevel);
            // UIuitl.getInstance().drawCostUI(renderLevel.uiAtlas,xxx.skinName,[104,100],"#853d07",90,20);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", renderLevel);
            this.addUIList(["title"], this._baseRender);
            this.un_liansai = this._topRender.getComponent("un_liansai");
            this.un_liansai.addEventListener(InteractiveEvent.Down, function () {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "开服第三天开启", 99);
            }, this);
            this.winmidRender.applyObjData();
            this.applyLoadComplete();
        };
        ApplyFactionUiPanel.prototype.selecttype = function ($value) {
            if ($value == SharedDef.MODULE_FACTION_RECRUIT) {
                this.tab_zhao.selected = true;
                this.tab_chuang.selected = false;
                this.tab_sai.selected = false;
                this.applybuildpanel.hide();
                this.applyzhaomupanel.show();
                ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            }
            else if ($value == SharedDef.MODULE_FACTION_CREATE) {
                this.tab_chuang.selected = true;
                this.tab_zhao.selected = false;
                this.tab_sai.selected = false;
                this.applybuildpanel.show();
                this.applyzhaomupanel.hide();
                ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            }
            else if ($value == SharedDef.MODULE_FACTION_WAR) {
                this.tab_zhao.selected = false;
                this.tab_chuang.selected = false;
                this.tab_sai.selected = true;
                ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.SHOW_LEAGUE_EVENT));
                this.applybuildpanel.hide();
                this.applyzhaomupanel.hide();
            }
            var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
            if ($value == 0) {
                $scenePange.data = SharedDef.MODULE_FACTION;
            }
            ModuleEventManager.dispatchEvent($scenePange);
        };
        ApplyFactionUiPanel.prototype.refresh = function () {
            var session = GuidData.globelValue.getFactionLeagueSession();
            this.setUiListVisibleByItem([this.un_liansai], session == 0);
        };
        ApplyFactionUiPanel.prototype.show = function (value) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(value);
            this.refresh();
        };
        ApplyFactionUiPanel.prototype.hide = function () {
            this.applybuildpanel.hide();
            this.applyzhaomupanel.hide();
            ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            UIManager.getInstance().removeUIContainer(this);
            _super.prototype.hide.call(this);
        };
        ApplyFactionUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        ApplyFactionUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.tab_chuang:
                    this.selecttype(SharedDef.MODULE_FACTION_CREATE);
                    break;
                case this.tab_zhao:
                    this.selecttype(SharedDef.MODULE_FACTION_RECRUIT);
                    break;
                case this.tab_sai:
                    this.selecttype(SharedDef.MODULE_FACTION_WAR);
                    break;
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.HIDE_APPLYFACTIONUI_EVENT));
                    break;
                default:
                    break;
            }
        };
        return ApplyFactionUiPanel;
    }(WindowUi));
    faction.ApplyFactionUiPanel = ApplyFactionUiPanel;
})(faction || (faction = {}));
//# sourceMappingURL=ApplyFactionUiPanel.js.map