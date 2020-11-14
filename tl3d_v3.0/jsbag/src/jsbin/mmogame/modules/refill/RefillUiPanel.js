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
var refill;
(function (refill) {
    var RefillUiPanel = /** @class */ (function (_super) {
        __extends(RefillUiPanel, _super);
        function RefillUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baImg = new UIBackImg();
            _this._baImg.alpha = 0.5;
            _this._baImg.setFbo();
            _this.addRender(_this._baImg);
            _this._bigPic = new UIRenderOnlyPicComponent();
            _this.addRender(_this._bigPic);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        RefillUiPanel.prototype.dispose = function () {
            this._bigPic.dispose();
            this._bigPic = null;
            this._baImg.dispose();
            this._baImg = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this.weaponRoleSprite.destory();
            this.weaponRoleSprite = null;
            this.roleSprite.destory();
            this.roleSprite = null;
            this.weaponRoleBgSprite.destory();
            this.weaponRoleBgSprite = null;
            this.roleBgSprite.destory();
            this.roleBgSprite = null;
        };
        RefillUiPanel.prototype.onAdd = function () {
            _super.prototype.onAdd.call(this);
            SceneManager.getInstance().updateFBO();
        };
        RefillUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/refill/refill.xml", "ui/uidata/refill/refill.png", function () { _this.loadConfigCom(); });
        };
        RefillUiPanel.prototype.loadConfigCom = function () {
            this._bigPic.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._baseRender;
            //大背景
            this.addChild(this._bigPic.getComponent("basebg"));
            this._bigPic.setImgUrl("ui/uidata/refill/basebg.png");
            this.addUIList(["a_forcebg0", "a_forcebg1"], this._baseRender);
            this.addUIList(["a_info0", "a_info1"], this._topRender);
            this.a_refillbtn = this.addEvntButUp("a_refillbtn", this._baseRender);
            this.b_close = this.addEvntButUp("a_closebtn", this._topRender);
            this.iconAry = new Array;
            this.forceAry = new Array;
            for (var i = 0; i < 4; i++) {
                if (i < 2) {
                    this.forceAry.push(this.addChild(this._topRender.getComponent("a_force" + i)));
                }
                this.iconAry.push(this.addChild(this._topRender.getComponent("a_icon" + i)));
            }
            this.weaponRoleSprite = new Person2DChar();
            this.weaponRoleSprite.uishow = true;
            // this.mountRoleSprite.needUIUrl = false;
            this._baseRender.addModel(this.weaponRoleSprite);
            this.roleSprite = new Person2DChar();
            // this.roleSprite.needUIUrl = false;
            this._baseRender.addModel(this.roleSprite);
            this.roleBgSprite = new Person2DChar();
            // this.roleSprite.needUIUrl = false;
            this._baseRender.addModel(this.roleBgSprite);
            this.weaponRoleBgSprite = new Person2DChar();
            // this.roleSprite.needUIUrl = false;
            this._baseRender.addModel(this.weaponRoleBgSprite);
            this.resize();
            this.applyLoadComplete();
        };
        RefillUiPanel.prototype.resetData = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_recharge_first_reward, GuidData.player.getCharType());
            var $ary = $obj["reward"];
            for (var i = 0; i < $ary.length; i++) {
                IconManager.getInstance().drawItemIcon60(this.iconAry[i], $ary[i][0], $ary[i][1]);
            }
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.forceAry[0].skinName, Snum($obj["weapon_force"]), ArtFont.num56, TextAlign.LEFT);
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.forceAry[1].skinName, Snum($obj["avatar_force"]), ArtFont.num56, TextAlign.LEFT);
            this.weaponRoleSprite.showAvatarVisibel = false;
            this.weaponRoleSprite.setAvatar(6302);
            this.weaponRoleSprite.setWeaponByAvatar($obj["weapon"]);
            this.roleSprite.showAvatarVisibel = true;
            this.roleSprite.setAvatar($obj["avatar"]);
            this.weaponRoleBgSprite.showAvatarVisibel = false;
            this.weaponRoleBgSprite.setAvatar(6310);
            // this.weaponRoleBgSprite.setWeaponByAvatar($obj["weapon"]);
            this.roleBgSprite.showAvatarVisibel = false;
            this.roleBgSprite.setAvatar(6310);
            // this.roleSprite.setWeapon(0);
            this.resize();
        };
        RefillUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.resetData();
        };
        RefillUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        };
        RefillUiPanel.prototype.resizeRole = function () {
            if (this.weaponRoleSprite) {
                this.weaponRoleSprite.resize();
                this.weaponRoleSprite.scale = 4 * UIData.Scale;
                // this.weaponRoleSprite.rotationX = 45
                // this.weaponRoleSprite.rotationX = 80
                this.weaponRoleSprite.y = -20 * UIData.Scale;
                this.weaponRoleSprite.x = 190 * UIData.Scale;
            }
            if (this.roleSprite) {
                this.roleSprite.resize();
                this.roleSprite.scale = 4 * UIData.Scale;
                // this.roleSprite.rotationY = 0
                this.roleSprite.y = -90 * UIData.Scale;
                this.roleSprite.x = -190 * UIData.Scale;
            }
            if (this.roleBgSprite) {
                this.roleBgSprite.resize();
                this.roleBgSprite.scale = 4 * UIData.Scale;
                // this.roleSprite.rotationY = 0
                this.roleBgSprite.y = -90 * UIData.Scale;
                this.roleBgSprite.x = -190 * UIData.Scale;
            }
            if (this.weaponRoleBgSprite) {
                this.weaponRoleBgSprite.resize();
                this.weaponRoleBgSprite.scale = 4 * UIData.Scale;
                // this.roleSprite.rotationY = 0
                this.weaponRoleBgSprite.y = -90 * UIData.Scale;
                this.weaponRoleBgSprite.x = 190 * UIData.Scale;
            }
        };
        RefillUiPanel.prototype.resize = function () {
            this.resizeRole();
            _super.prototype.resize.call(this);
        };
        RefillUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_close:
                    ModuleEventManager.dispatchEvent(new refill.RefillEvent(refill.RefillEvent.HIDE_Refill_EVENT));
                    break;
                case this.a_refillbtn:
                    ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                    break;
                default:
                    break;
            }
        };
        return RefillUiPanel;
    }(UIPanel));
    refill.RefillUiPanel = RefillUiPanel;
})(refill || (refill = {}));
//# sourceMappingURL=RefillUiPanel.js.map