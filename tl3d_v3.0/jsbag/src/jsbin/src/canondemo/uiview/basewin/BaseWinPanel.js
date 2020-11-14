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
var basewin;
(function (basewin) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var Rectangle = Pan3d.Rectangle;
    var BaseWinPanel = /** @class */ (function (_super) {
        __extends(BaseWinPanel, _super);
        function BaseWinPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._winRect = new Rectangle(0, 0, 300, 300);
            _this._baseTipUiRender = new UIRenderComponent();
            _this.addRender(_this._baseTipUiRender);
            _this._baseWinUiRender = new UIRenderComponent();
            _this.addRender(_this._baseWinUiRender);
            _this._baseTipUiRender.uiAtlas = new H5UIAtlas;
            _this._baseTipUiRender.uiAtlas.setInfo("ui/basewin/basewin.txt", "ui/basewin/basewin.png", function () { _this.baseWindowLoadFinish(); });
            return _this;
        }
        BaseWinPanel.prototype.baseWindowLoadFinish = function () {
            this._baseWinUiRender.uiAtlas = this._baseTipUiRender.uiAtlas;
            this.base_tip_bg = this.addChild(this._baseTipUiRender.getComponent("base_tip_bg"));
            this.base_tip_bg.top = 0;
            this.base_tip_bg.left = 0;
            this.base_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.base_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.base_win_bg = this.addChild(this._baseWinUiRender.getComponent("base_win_bg"));
            this.base_win_close = this.addEvntBut("base_win_close", this._baseWinUiRender);
            this.winRect = this._winRect;
        };
        Object.defineProperty(BaseWinPanel.prototype, "winRect", {
            set: function (value) {
                this._winRect = value;
                if (this.base_win_close && this.base_win_bg) {
                    this.base_win_bg.width = this._winRect.width;
                    this.base_win_bg.height = this._winRect.height;
                    this.base_win_bg.x = (540 - this._winRect.width) / 2 + this._winRect.x;
                    this.base_win_bg.y = (960 - this._winRect.height) / 2 + this._winRect.y;
                    this.base_win_close.x = this.base_win_bg.x + this._winRect.width - this.base_win_close.width + 10;
                    this.base_win_close.y = this.base_win_bg.y - 10;
                    this._baseWinUiRender.applyObjData();
                }
            },
            enumerable: true,
            configurable: true
        });
        return BaseWinPanel;
    }(H5UIConatiner));
    basewin.BaseWinPanel = BaseWinPanel;
})(basewin || (basewin = {}));
//# sourceMappingURL=BaseWinPanel.js.map