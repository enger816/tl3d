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
var linklist;
(function (linklist) {
    var LinkListPanel = /** @class */ (function (_super) {
        __extends(LinkListPanel, _super);
        function LinkListPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            return _this;
        }
        LinkListPanel.prototype.applyLoad = function () {
            this._midRender.uiAtlas = new UIAtlas();
            this.applyLoadComplete();
        };
        LinkListPanel.prototype.butClik = function (evt) {
            UIManager.getInstance().removeUIContainer(this);
        };
        return LinkListPanel;
    }(WindowCentenMin));
    linklist.LinkListPanel = LinkListPanel;
})(linklist || (linklist = {}));
//# sourceMappingURL=LinkListPanel.js.map