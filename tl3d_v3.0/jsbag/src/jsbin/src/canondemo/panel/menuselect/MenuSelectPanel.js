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
var menuselectpan;
(function (menuselectpan) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var MenuSelectPanel = /** @class */ (function (_super) {
        __extends(MenuSelectPanel, _super);
        function MenuSelectPanel() {
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
            _this.h5UIAtlas.setInfo("panelui/menuselect/menuselect.txt", "panelui/menuselect/menuselect.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        MenuSelectPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.m_select_skin_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.SHOW_SKIN_LIST_PANEL));
                    break;
                case this.m_select_level_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    break;
                case this.m_select_sys_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new setupui.SetupWinEvent(setupui.SetupWinEvent.SHOW_SETUP_WIN_PANEL));
                    break;
                case this.m_select_rank_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL));
                    break;
                case this.m_tip_bg:
                    break;
                default:
                    break;
            }
            this.hidePanel();
        };
        MenuSelectPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        MenuSelectPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        MenuSelectPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.m_tip_bg = this.addEvntButUp("m_tip_bg", this._bottomRender);
            this.m_tip_bg.top = 0;
            this.m_tip_bg.left = 0;
            this.m_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.m_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.m_select_sys_txt = this.addEvntButUp("m_select_sys_txt", this._midRender);
            this.m_select_rank_txt = this.addEvntButUp("m_select_rank_txt", this._midRender);
            this.m_select_skin_txt = this.addEvntButUp("m_select_skin_txt", this._midRender);
            this.m_select_level_txt = this.addEvntButUp("m_select_level_txt", this._midRender);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        return MenuSelectPanel;
    }(H5UIConatiner));
    menuselectpan.MenuSelectPanel = MenuSelectPanel;
})(menuselectpan || (menuselectpan = {}));
//# sourceMappingURL=MenuSelectPanel.js.map