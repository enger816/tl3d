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
var adventurebang;
(function (adventurebang) {
    var AdventureBangPanel = /** @class */ (function (_super) {
        __extends(AdventureBangPanel, _super);
        function AdventureBangPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.bottom = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        AdventureBangPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/offlinereward/offlinereward.xml", "ui/uidata/adventure/offlinereward/offlinereward.png", function () { _this.loadConfigCom(); });
        };
        AdventureBangPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        AdventureBangPanel.prototype.butClik = function (evt) {
            this.close();
        };
        AdventureBangPanel.prototype.close = function () {
        };
        AdventureBangPanel.prototype.refresh = function () {
        };
        return AdventureBangPanel;
    }(UIPanel));
    adventurebang.AdventureBangPanel = AdventureBangPanel;
})(adventurebang || (adventurebang = {}));
//# sourceMappingURL=AdventureBangPanel.js.map