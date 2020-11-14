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
var concern;
(function (concern) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ConcernPanel = /** @class */ (function (_super) {
        __extends(ConcernPanel, _super);
        function ConcernPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/concern/concern.txt", "panelui/concern/concern.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        ConcernPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        ConcernPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                Pan3d.UIManager.getInstance().removeUIContainer(_this);
            });
        };
        ConcernPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        ConcernPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.a_win_close = this.addEvntButUp("a_win_close", this._topRender);
            this.addChild(this._midRender.getComponent("a_win_bg"));
            this.addChild(this._topRender.getComponent("a_content_txt"));
            this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        return ConcernPanel;
    }(H5UIConatiner));
    concern.ConcernPanel = ConcernPanel;
})(concern || (concern = {}));
//# sourceMappingURL=ConcernPanel.js.map