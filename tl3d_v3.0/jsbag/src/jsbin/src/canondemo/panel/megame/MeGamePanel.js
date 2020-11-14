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
var megame;
(function (megame) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var TimeUtil = Pan3d.TimeUtil;
    var MeGamePanel = /** @class */ (function (_super) {
        __extends(MeGamePanel, _super);
        function MeGamePanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.top = 0;
            _this.interfaceUI = true;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this.timeFun = function () { _this.upFrame(); };
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/megame/megame.txt", "panelui/megame/megame.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        MeGamePanel.prototype.onAdd = function () {
            TimeUtil.addFrameTick(this.timeFun);
        };
        MeGamePanel.prototype.onRemove = function () {
            TimeUtil.removeFrameTick(this.timeFun);
        };
        MeGamePanel.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        MeGamePanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        MeGamePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this.a_top_move_pic = this.addEvntBut("a_top_move_pic", this._bottomRender);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        MeGamePanel.prototype.upFrame = function () {
            if (this.a_top_move_pic) {
                var $tm = TimeUtil.getTimer();
                $tm = $tm % 5000;
                if ($tm < 1500) {
                    $tm = $tm;
                    this.a_top_move_pic.x = this.a_top_move_pic.baseRec.x + Math.sin(($tm / 1500) * 3 * Math.PI * 2) * 30;
                }
                else {
                    this.a_top_move_pic.x = this.a_top_move_pic.baseRec.x;
                }
                var $ps = this.getMenuButtonBoundingClientRect();
                if ($ps) {
                    this.a_top_move_pic.top = $ps.top + 10;
                }
            }
        };
        MeGamePanel.prototype.getMenuButtonBoundingClientRect = function () {
            return null;
        };
        MeGamePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_top_move_pic:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        return MeGamePanel;
    }(H5UIConatiner));
    megame.MeGamePanel = MeGamePanel;
})(megame || (megame = {}));
//# sourceMappingURL=MeGamePanel.js.map