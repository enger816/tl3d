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
var role;
(function (role) {
    var RoleUiPanel = /** @class */ (function (_super) {
        __extends(RoleUiPanel, _super);
        function RoleUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._publicbguiRender = new UIRenderComponent;
            _this.addRender(_this._publicbguiRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        RoleUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this.achievementPanel) {
                this.achievementPanel.dispose();
                this.achievementPanel = null;
            }
            if (this.attributeUiPanel) {
                this.attributeUiPanel.dispose();
                this.attributeUiPanel = null;
            }
            if (this.designationPanel) {
                this.designationPanel.dispose();
                this.designationPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        RoleUiPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/role/newrole.xml", "ui/uidata/role/newrole.png", function () { _this.loadConfigCom(); }, "ui/uidata/role/newrolepc.png");
            // });
        };
        RoleUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;
            this.initData();
            this.applyLoadComplete();
        };
        RoleUiPanel.prototype.initData = function () {
            //添加UI控件初始化
            this.addChild(this._bgRender.getComponent("t_title"));
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);
            this.tab0UiAry = new Array;
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.tab0UiAry.push(cnew_right_bg_top);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.tab0UiAry.push(cnew_right_bg_bottom);
            this.a_tab2 = this.addEvntBut("tab2", this._roleRender);
            // this.a_tab1 = <SelectButton>this.addEvntBut("tab1", this._roleRender);
            this.a_tab0 = this.addEvntBut("tab0", this._roleRender);
            // this._redPointRender.getRedPointUI(this, 7, new Vector2D(this.a_tab1.x + this.a_tab1.width - 5, this.a_tab1.y));
            this._redPointRender.getRedPointUI(this, 10, new Vector2D(this.a_tab2.x + this.a_tab2.width - 5, this.a_tab2.y));
            this.addChild(this._roleRender.getComponent("t_line"));
        };
        RoleUiPanel.prototype.selecttype = function ($value) {
            this.setUiListVisibleByItem(this.tab0UiAry, $value != 1);
            if ($value == 0) {
                this.a_tab0.selected = true;
                // this.a_tab1.selected = false;
                this.a_tab2.selected = false;
                this.showTab0pnael();
                this.setSizeForPanelUiCopy(this.tab0UiAry[0], "b_right_bg_top", this._roleRender);
                this.setSizeForPanelUiCopy(this.tab0UiAry[1], "b_right_bg_bottom", this._roleRender);
                // } else if ($value == 1) {
                //     this.a_tab1.selected = true;
                //     this.a_tab0.selected = false;
                //     this.a_tab2.selected = false;
                //     this.showTab1pnael();
            }
            else {
                this.a_tab2.selected = true;
                this.a_tab0.selected = false;
                // this.a_tab1.selected = false;
                this.showTab2pnael();
                this.setSizeForPanelUiCopy(this.tab0UiAry[0], "b_right_bg_top1", this._roleRender);
                this.setSizeForPanelUiCopy(this.tab0UiAry[1], "b_right_bg_bottom1", this._roleRender);
            }
            this.winmidRender.applyObjData();
            this.resize();
        };
        RoleUiPanel.prototype.showTab0pnael = function () {
            if (!this.attributeUiPanel) {
                this.attributeUiPanel = new role.AttributeUiPanel();
                this.attributeUiPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
            }
            this.attributeUiPanel.show();
            if (this.achievementPanel) {
                this.achievementPanel.hide();
            }
            if (this.designationPanel) {
                this.designationPanel.hide();
            }
        };
        // private showTab1pnael() {
        //     if (!this.achievementPanel) {
        //         this.achievementPanel = new AchievementPanel();
        //         this.achievementPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
        //     }
        //     this.achievementPanel.show();
        //     if (this.attributeUiPanel) {
        //         this.attributeUiPanel.hide();
        //     }
        //     if (this.designationPanel) {
        //         this.designationPanel.hide();
        //     }
        // }
        RoleUiPanel.prototype.showTab2pnael = function () {
            if (!this.designationPanel) {
                this.designationPanel = new role.DesignationPanel();
                this.designationPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
            }
            this.designationPanel.show();
            if (this.achievementPanel) {
                this.achievementPanel.hide();
            }
            if (this.attributeUiPanel) {
                this.attributeUiPanel.hide();
            }
        };
        RoleUiPanel.prototype.hidealltab = function () {
            if (this.achievementPanel) {
                this.achievementPanel.hide();
            }
            if (this.attributeUiPanel) {
                this.attributeUiPanel.hide();
            }
            if (this.designationPanel) {
                this.designationPanel.hide();
            }
        };
        RoleUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        RoleUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(0);
            this.resize();
        };
        RoleUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.hidealltab();
            ModulePageManager.hideResTittle();
        };
        RoleUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.HIDE_ROLE_EVENT));
                    break;
                case this.a_tab0:
                    this.selecttype(0);
                    break;
                // case this.a_tab1:
                //     this.selecttype(1);
                //     break;
                case this.a_tab2:
                    this.selecttype(2);
                    break;
                default:
                    break;
            }
        };
        return RoleUiPanel;
    }(WindowUi));
    role.RoleUiPanel = RoleUiPanel;
})(role || (role = {}));
//# sourceMappingURL=RoleUiPanel.js.map