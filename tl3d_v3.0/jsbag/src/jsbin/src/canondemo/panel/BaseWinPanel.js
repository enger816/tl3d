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
    var InteractiveEvent = Pan3d.InteractiveEvent;
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
            _this._baseTipBgUiRender = new UIRenderComponent();
            _this.addRender(_this._baseTipBgUiRender);
            _this._baseBotUiRender = new UIRenderComponent();
            _this.addRender(_this._baseBotUiRender);
            _this._baseMidUiRender = new UIRenderComponent();
            _this.addRender(_this._baseMidUiRender);
            _this._baseTopUiRender = new UIRenderComponent();
            _this.addRender(_this._baseTopUiRender);
            _this._baseTipBgUiRender.uiAtlas = new H5UIAtlas;
            _this._baseTipBgUiRender.uiAtlas.setInfo("panelui/basewin/basewin.txt", "panelui/basewin/basewin.png", function () { _this.baseWindowLoadFinish(); });
            return _this;
        }
        BaseWinPanel.prototype.baseWindowLoadFinish = function () {
            this._baseBotUiRender.uiAtlas = this._baseTipBgUiRender.uiAtlas;
            this._baseMidUiRender.uiAtlas = this._baseTipBgUiRender.uiAtlas;
            this._baseTopUiRender.uiAtlas = this._baseTipBgUiRender.uiAtlas;
            this.win_tip_bg = this.addChild(this._baseTipBgUiRender.getComponent("base_tip_bg"));
            this.win_tip_bg.top = 0;
            this.win_tip_bg.left = 0;
            this.win_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.win_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.base_title_bg = this.addChild(this._baseBotUiRender.getComponent("base_title_bg"));
            this.base_win_bg = this.addChild(this._baseMidUiRender.getComponent("base_win_bg"));
            this.base_win_close = this.addEvntButUp("base_win_close", this._baseTopUiRender);
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
                    this.base_win_close.x = this.base_win_bg.x + this._winRect.width - this.base_win_close.width + 20;
                    this.base_win_close.y = this.base_win_bg.y - 30;
                    this.base_title_bg.y = this.base_win_bg.y - this.base_title_bg.height + 15;
                    this._baseTopUiRender.applyObjData();
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