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
var tips;
(function (tips) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var ProgressBarView = /** @class */ (function (_super) {
        __extends(ProgressBarView, _super);
        function ProgressBarView() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this.interfaceUI = true;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.frmeFun = function () { _this.upFram(); };
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        ProgressBarView.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_game_star_bg:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        ProgressBarView.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.addChild(this._midRender.getComponent("p_progress_bar_bg"));
            this.p_progress_bar_line = this.addChild(this._midRender.getComponent("p_progress_bar_line"));
            this.uiLoadComplte = true;
            this.showPanel();
            this.refristData(this.totalTime);
        };
        ProgressBarView.prototype.refristData = function (value) {
            this.totalTime = value;
            this.startTime = Pan3d.TimeUtil.getTimer();
            if (this.uiLoadComplte && this.totalTime) {
                Pan3d.TimeUtil.addFrameTick(this.frmeFun);
            }
        };
        ProgressBarView.prototype.upFram = function () {
            var $n = (this.totalTime + this.startTime) - Pan3d.TimeUtil.getTimer();
            if ($n > 0) {
                var $speedNum = Math.floor($n / this.totalTime * 100) / 100;
                this.p_progress_bar_line.uvScale = 1 - $speedNum;
            }
            else {
                this.hidePanel();
            }
        };
        ProgressBarView.prototype.onRemove = function () {
            Pan3d.TimeUtil.removeFrameTick(this.frmeFun);
            _super.prototype.onRemove.call(this);
        };
        ProgressBarView.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        ProgressBarView.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        return ProgressBarView;
    }(H5UIConatiner));
    tips.ProgressBarView = ProgressBarView;
})(tips || (tips = {}));
//# sourceMappingURL=ProgressBarView.js.map