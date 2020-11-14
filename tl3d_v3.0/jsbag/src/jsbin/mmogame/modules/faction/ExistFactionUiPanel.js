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
    var ExistFactionUiPanel = /** @class */ (function (_super) {
        __extends(ExistFactionUiPanel, _super);
        function ExistFactionUiPanel() {
            var _this = _super.call(this, 2) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._topRender.uiAtlas = new UIAtlas();
            return _this;
        }
        ExistFactionUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this.factionFunctionPanel.dispose();
            this.factionFunctionPanel = null;
            this.factionPersonPanel.dispose();
            this.factionPersonPanel = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            _super.prototype.dispose.call(this);
        };
        ExistFactionUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/newfaction/extisfaction.xml", "ui/uidata/faction/newfaction/extisfaction.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
        };
        ExistFactionUiPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._topRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbgRender.uiAtlas;
            var renderLevel = this._topRender;
            this.factionPersonPanel = new faction.FactionPersonPanel();
            this.factionPersonPanel.initUiAtlas(renderLevel.uiAtlas, this._publicbgRender.uiAtlas);
            this.factionPersonPanel.parent = this;
            this.factionFunctionPanel = new faction.FactionFunctionPanel();
            this.factionFunctionPanel.initUiAtlas(renderLevel.uiAtlas, this);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "bg_1", renderLevel);
            this.addUIList(["title"], renderLevel);
            this.tab_person = this.addEvntBut("tab_person", this._baseRender);
            this.tab_shang = this.addEvntBut("tab_shang", this._baseRender);
            this.tab_sai = this.addEvntBut("tab_sai", this._baseRender);
            this.un_liansai = this._topRender.getComponent("un_liansai");
            this.un_liansai.addEventListener(InteractiveEvent.Down, function () {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "开服第三天开启", 99);
            }, this);
            this._redPointRender.getRedPointUI(this, 61, new Vector2D(this.tab_person.x + this.tab_person.width - 5, this.tab_person.y));
            this._redPointRender.getRedPointUI(this, 63, new Vector2D(this.tab_shang.x + this.tab_shang.width - 5, this.tab_shang.y));
            this.applyLoadComplete();
        };
        ExistFactionUiPanel.prototype.selectlo = function ($value) {
            if ($value == SharedDef.MODULE_FACTION_MEMBER) {
                this.tab_person.selected = true;
                this.tab_shang.selected = false;
                this.tab_sai.selected = false;
            }
            else if ($value == SharedDef.MODULE_FACTION_FUNCTION) {
                this.tab_person.selected = false;
                this.tab_sai.selected = false;
                this.tab_shang.selected = true;
            }
            else if ($value == SharedDef.MODULE_FACTION_WAR) {
                this.tab_person.selected = false;
                this.tab_sai.selected = true;
                this.tab_shang.selected = false;
            }
            this.selectdatalo($value);
        };
        ExistFactionUiPanel.prototype.showhide_select = function ($value) {
            if ($value == SharedDef.MODULE_FACTION_MEMBER) {
                this.factionFunctionPanel.hide();
                ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.HIDE_LEAGUE_EVENT));
                this.factionPersonPanel.show();
            }
            else if ($value == SharedDef.MODULE_FACTION_FUNCTION) {
                this.factionPersonPanel.hide();
                ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.HIDE_LEAGUE_EVENT));
                this.factionFunctionPanel.show();
            }
            else if ($value == SharedDef.MODULE_FACTION_WAR) {
                this.factionPersonPanel.hide();
                this.factionFunctionPanel.hide();
                ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.SHOW_LEAGUE_EVENT));
            }
        };
        ExistFactionUiPanel.prototype.selectdatalo = function ($value) {
            if (this._typelo == $value) {
                return;
            }
            this._typelo = $value;
            //处理逻辑
            this.showhide_select($value);
        };
        ExistFactionUiPanel.prototype.refresh = function () {
            var session = GuidData.globelValue.getFactionLeagueSession();
            this.setUiListVisibleByItem([this.un_liansai], session == 0);
        };
        ExistFactionUiPanel.prototype.show = function (value) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selectlo(value);
            this.refresh();
        };
        ExistFactionUiPanel.prototype.hide = function () {
            this._typelo = -1;
            UIManager.getInstance().removeUIContainer(this);
            this.factionPersonPanel.hide();
            this.factionFunctionPanel.hide();
            ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            _super.prototype.hide.call(this);
            // this.queenPanel.hide();
        };
        ExistFactionUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        ExistFactionUiPanel.prototype.butClik = function (evt) {
            //console.log("--btn---", evt.target);
            switch (evt.target) {
                case this.tab_person:
                    this.selectlo(SharedDef.MODULE_FACTION_MEMBER);
                    break;
                case this.tab_shang:
                    this.selectlo(SharedDef.MODULE_FACTION_FUNCTION);
                    break;
                case this.tab_sai:
                    this.selectlo(SharedDef.MODULE_FACTION_WAR);
                    break;
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.HIDE_EXISTFACTIONUI_EVENT));
                    break;
                default:
                    break;
            }
        };
        return ExistFactionUiPanel;
    }(WindowUi));
    faction.ExistFactionUiPanel = ExistFactionUiPanel;
})(faction || (faction = {}));
//# sourceMappingURL=ExistFactionUiPanel.js.map