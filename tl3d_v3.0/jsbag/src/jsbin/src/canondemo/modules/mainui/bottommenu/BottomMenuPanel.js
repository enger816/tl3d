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
var bottommenuA;
(function (bottommenuA) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var BottomMenuPanel = /** @class */ (function (_super) {
        __extends(BottomMenuPanel, _super);
        function BottomMenuPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.top = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/bottommenu/bottommenu.txt", "panelui/bottommenu/bottommenu.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        BottomMenuPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            //  this.a_bottom_rigth_but=   this.addEvntButUp("a_bottom_rigth_but", this._topRender)
            this.uiLoadComplte = true;
            this.showPanel();
        };
        BottomMenuPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_bottom_rigth_but:
                    ModuleEventManager.dispatchEvent(new menuselectpan.MenuSelectEvent(menuselectpan.MenuSelectEvent.SHOW_MENU_SELECT_PANEL));
                    break;
                default:
                    break;
            }
        };
        BottomMenuPanel.prototype.refrishUi = function () {
        };
        BottomMenuPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishUi();
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        BottomMenuPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        return BottomMenuPanel;
    }(H5UIConatiner));
    bottommenuA.BottomMenuPanel = BottomMenuPanel;
})(bottommenuA || (bottommenuA = {}));
//# sourceMappingURL=BottomMenuPanel.js.map