var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var drag;
(function (drag) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var TextureManager = Pan3d.TextureManager;
    var DragPanel = /** @class */ (function (_super) {
        __extends(DragPanel, _super);
        function DragPanel(w, h) {
            var _this = _super.call(this) || this;
            _this.tempUiName = "tempui";
            _this._bRender = new UIRenderComponent();
            _this.addRender(_this._bRender);
            _this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas = _this._bRender.uiAtlas;
            $uiAtlas.configData = [];
            $uiAtlas.configData.push($uiAtlas.getObject(_this.tempUiName, 0, 0, w, h, w, h));
            _this.ui = _this._bRender.creatBaseComponent(_this.tempUiName);
            _this.ui.width = w;
            _this.ui.height = h;
            _this.addChild(_this.ui);
            _this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(w, h, false);
            _this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(_this._bRender.uiAtlas.ctx);
            return _this;
        }
        DragPanel.prototype.setData = function (value) {
            if (value.icon) {
                this.ui.uiRender.uiAtlas.upDataPicToTexture(value.icon, this.ui.skinName);
            }
        };
        return DragPanel;
    }(UIConatiner));
    drag.DragPanel = DragPanel;
})(drag || (drag = {}));
//# sourceMappingURL=DragPanel.js.map