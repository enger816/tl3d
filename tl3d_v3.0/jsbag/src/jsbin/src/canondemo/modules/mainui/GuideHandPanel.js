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
var guidehand;
(function (guidehand) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var TimeUtil = Pan3d.TimeUtil;
    var GuideHandPanel = /** @class */ (function (_super) {
        __extends(GuideHandPanel, _super);
        function GuideHandPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/guide/guide.txt", "panelui/guide/guide.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        GuideHandPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.a_guide_head_pic = this.addEvntButUp("a_guide_head_pic", this._topRender);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        GuideHandPanel.prototype.upData = function () {
            if (game.GameDataModel.levelNum == 1) {
                this.a_guide_head_pic.x = this.a_guide_head_pic.baseRec.x + Math.cos((TimeUtil.getTimer() / 10) * Math.PI / 180) * 100;
            }
            if (game.GameDataModel.levelNum == 2) {
                this.a_guide_head_pic.y = this.a_guide_head_pic.baseRec.y + Math.cos((TimeUtil.getTimer() / 10) * Math.PI / 180) * 100 + 50;
            }
        };
        GuideHandPanel.prototype.showPanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                TimeUtil.addFrameTick(function () { _this.upData(); });
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        GuideHandPanel.prototype.hidePanel = function () {
            var _this = this;
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeFrameTick(function () { _this.upData(); });
            rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key104);
        };
        return GuideHandPanel;
    }(H5UIConatiner));
    guidehand.GuideHandPanel = GuideHandPanel;
})(guidehand || (guidehand = {}));
//# sourceMappingURL=GuideHandPanel.js.map