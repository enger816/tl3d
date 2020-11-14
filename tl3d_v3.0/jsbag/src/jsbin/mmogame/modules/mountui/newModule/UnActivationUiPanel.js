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
var mountui;
(function (mountui) {
    var UnActivationUiPanel = /** @class */ (function (_super) {
        __extends(UnActivationUiPanel, _super);
        function UnActivationUiPanel() {
            var _this = _super.call(this) || this;
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
            return _this;
        }
        UnActivationUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        UnActivationUiPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        UnActivationUiPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.addUIList(["t_titlebg"], renderLevel);
            this.addUIList(["a_btntxt", "a_info", "a_attrtitle", "t_line2", "t_line2"], this._topRender);
            this.attrary = new Array;
            for (var i = 0; i < 8; i++) {
                this.attrary.push(this.addChild(renderLevel.getComponent("a_attr" + i)));
            }
            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);
            this._publicRender.applyObjData();
        };
        UnActivationUiPanel.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        UnActivationUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.showAttr();
            this.resize();
        };
        UnActivationUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        UnActivationUiPanel.prototype.showAttr = function () {
            this._vo = mountui.NewMountModel.getInstance().getOrderAttribute();
            //绘制当前属性
            for (var i = 0; i < this.attrary.length; i++) {
                if (this._vo.curtab.prosKeys.length - 1 < i) {
                    this.setUiListVisibleByItem([this.attrary[i]], false);
                }
                else {
                    UiDraw.drawAttValAdd(this.attrary[i], this._vo.curtab.prosKeys[i], this._vo.curtab.prosValues[i]);
                }
            }
        };
        UnActivationUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.cnew_btn1:
                    UIManager.popClikNameFun("cnew_btn1");
                    NetManager.getInstance().protocolos.active_mount();
                    break;
                default:
                    break;
            }
        };
        return UnActivationUiPanel;
    }(UIVirtualContainer));
    mountui.UnActivationUiPanel = UnActivationUiPanel;
})(mountui || (mountui = {}));
//# sourceMappingURL=UnActivationUiPanel.js.map