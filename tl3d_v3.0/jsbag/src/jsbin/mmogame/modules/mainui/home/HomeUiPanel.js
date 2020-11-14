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
var homeui;
(function (homeui) {
    var HomeUiPanel = /** @class */ (function (_super) {
        __extends(HomeUiPanel, _super);
        function HomeUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            // this._bottomRender = new UIRenderComponent;
            // this.addRender(this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            //this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._baseRender.uiAtlas = new UIAtlas;
            return _this;
        }
        HomeUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/mainui/home/home.xml", "ui/uidata/mainui/home/home.png", function () { _this.loadConfigCom(); });
        };
        HomeUiPanel.prototype.loadConfigCom = function () {
            //this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            //this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.homeSysPanel = new homeui.HomeSysPanel();
            this.homeSysPanel.setRender(this._baseRender, this._redPointRender);
            this.addVirtualContainer(this.homeSysPanel);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        return HomeUiPanel;
    }(UIPanel));
    homeui.HomeUiPanel = HomeUiPanel;
})(homeui || (homeui = {}));
//# sourceMappingURL=HomeUiPanel.js.map