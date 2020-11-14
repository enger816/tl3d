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
    var FightUiPanel = /** @class */ (function (_super) {
        __extends(FightUiPanel, _super);
        function FightUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.right = 0;
            _this.bottom = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._cdUIRenderComponent = new CdRenderComponent();
            _this.addRender(_this._cdUIRenderComponent);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            TimeUtil.addFrameTick(function (t) { _this.update(t); });
            return _this;
        }
        FightUiPanel.prototype.update = function (t) {
            if (this.uiAtlasComplet) {
                this.fightSkillPanel.update(t);
            }
        };
        FightUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/fight/fight.xml", "ui/uidata/mainui/fight/fight.png", function () { _this.loadConfigCom(); });
        };
        FightUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._cdUIRenderComponent.uiAtlas = this._midRender.uiAtlas;
            this.fightSkillPanel = new fightui.FightSkillPanel();
            this.fightSkillPanel.setRender(this._bottomRender, this._midRender, this._topRender, this._cdUIRenderComponent);
            this.addVirtualContainer(this.fightSkillPanel);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        return FightUiPanel;
    }(UIPanel));
    fightui.FightUiPanel = FightUiPanel;
})(fightui || (fightui = {}));
//# sourceMappingURL=FightUiPanel.js.map