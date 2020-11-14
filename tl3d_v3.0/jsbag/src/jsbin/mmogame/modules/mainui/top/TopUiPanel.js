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
    var TopUiPanel = /** @class */ (function (_super) {
        __extends(TopUiPanel, _super);
        function TopUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._centerRender = new UIRenderComponent;
            _this.addRender(_this._centerRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender();
            _this.addRender(_this._redPointRender);
            _this._cdRender = new CdRenderComponent();
            _this.addRender(_this._cdRender);
            _this._effRender = new FrameUIRender;
            _this.addRender(_this._effRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        TopUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/top/top.xml", "ui/uidata/mainui/top/top.png", function () { _this.loadConfigCom(); });
        };
        //  public topUiBuffPanel: TopUiBuffPanel
        TopUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._cdRender.uiAtlas = this._midRender.uiAtlas;
            this._centerRender.uiAtlas = this._midRender.uiAtlas;
            this.topPandaPanel = new topui.TopPandaPanel();
            this.topPandaPanel.setRender(this._bottomRender, this._midRender, this._topRender, this._redPointRender);
            this.addVirtualContainer(this.topPandaPanel);
            this.topHeadPanel = new topui.TopHeadPanel();
            this.topHeadPanel.setRender(this._bottomRender, this._midRender, this._topRender, this._effRender, this._redPointRender);
            this.addVirtualContainer(this.topHeadPanel);
            this.topTargetHeadPanel = new topui.TopTargetHeadPanel();
            this.topTargetHeadPanel.setRender(this._bottomRender, this._midRender, this._topRender, this._centerRender);
            this.addVirtualContainer(this.topTargetHeadPanel);
            //this.topUiBuffPanel = new TopUiBuffPanel();
            //this.topUiBuffPanel.setRender(this._topRender,this._cdRender);
            //this.addVirtualContainer(this.topUiBuffPanel);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        TopUiPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                this.topPandaPanel.refresh();
                this.topHeadPanel.refresh();
                //this.topUiBuffPanel.refresh();
            }
        };
        return TopUiPanel;
    }(UIPanel));
    topui.TopUiPanel = TopUiPanel;
})(topui || (topui = {}));
//# sourceMappingURL=TopUiPanel.js.map