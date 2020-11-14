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
var endless;
(function (endless) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var PandaMeshData = rightpanda.PandaMeshData;
    var EndLessEvent = endless.EndLessEvent;
    var EndLessStartPanel = /** @class */ (function (_super) {
        __extends(EndLessStartPanel, _super);
        function EndLessStartPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = false;
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
            _this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        EndLessStartPanel.prototype.butClik = function (evt) {
            this.hidePanel();
            Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL));
            Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.ENDLESS_MODEL_START));
            Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SHOW_ENDLESS_TOP_PANEL));
            Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SHOW_ENDLESS_LEFT_RANK_PANEL));
            //  Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessLeftRankEvent(endless.EndLessLeftRankEvent.SHOW_ENDLESS_LEFT_RANK_PANEL))
        };
        EndLessStartPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            var a_tip_bg = this.addChild(this._bottomRender.getComponent("a_tip_bg"));
            a_tip_bg.top = 0;
            a_tip_bg.left = 0;
            a_tip_bg.width = 540 * Pan3d.UIData.Scale;
            a_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addEvntButUp("a_base_but_bg0", this._midRender);
            this.addChild(this._topRender.getComponent("a_start_endless"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        EndLessStartPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        EndLessStartPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            PandaMeshData.hideCentenTxtInfoType2(PandaMeshData.key101);
        };
        return EndLessStartPanel;
    }(H5UIConatiner));
    endless.EndLessStartPanel = EndLessStartPanel;
})(endless || (endless = {}));
//# sourceMappingURL=EndLessStartPanel.js.map