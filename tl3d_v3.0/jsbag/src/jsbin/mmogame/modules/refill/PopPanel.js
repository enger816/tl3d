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
    var PopPanel = /** @class */ (function (_super) {
        __extends(PopPanel, _super);
        function PopPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.right = 0;
            _this.top = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        PopPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this.weaponRoleSprite.destory();
            this.weaponRoleSprite = null;
            _super.prototype.dispose.call(this);
        };
        PopPanel.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/refill/pop.xml", "ui/uidata/refill/pop.png", function () { _this.loadConfigCom(); });
        };
        PopPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.a_basebg = this.addChild(this._bgRender.getComponent("a_basebg"));
            this.a_basebg.addEventListener(InteractiveEvent.Up, function () { }, this);
            this.a_basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
            this.a_force = this.addChild(this._baseRender.getComponent("a_force"));
            this.a_close = this.addEvntButUp("a_close", this._baseRender);
            this.a_btn = this.addEvntButUp("a_btn", this._baseRender);
            this.weaponRoleSprite = new Person2DChar();
            this._baseRender.addModel(this.weaponRoleSprite);
            this.layer = 250;
            this._updateFun = function () {
                _this.hide();
            };
            this.applyLoadComplete();
        };
        PopPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_close:
                    this.hide();
                    break;
                case this.a_btn:
                    this.hide();
                    ModulePageManager.openPanel(SharedDef.MODULE_FIRST_RECHARGE);
                    break;
                default:
                    break;
            }
        };
        PopPanel.prototype.show = function ($data) {
            UIManager.getInstance().addUIContainer(this);
            var $obj = TableData.getInstance().getData(TableData.tb_recharge_first_reward, GuidData.player.getCharType());
            this.weaponRoleSprite.showAvatarVisibel = false;
            this.weaponRoleSprite.uishow = true;
            this.weaponRoleSprite.setAvatar(6309);
            this.weaponRoleSprite.setWeaponByAvatar($obj["weapon"]);
            ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_force.skinName, Snum($obj["weapon_force"]), ArtFont.num56, TextAlign.LEFT);
            this.a_basebg.x = $data.ui.x - 104;
            this.a_basebg.y = $data.ui.y + 62;
            this.selectUi = $data.ui;
            this.resizepos();
            this.resize();
            TimeUtil.addTimeOut(5 * 1000, this._updateFun);
        };
        PopPanel.prototype.resizepos = function () {
            this.a_close.x = 160 + this.a_basebg.x;
            this.a_close.y = 38 + this.a_basebg.y;
            this.a_force.x = 73 + this.a_basebg.x;
            this.a_force.y = 218 + this.a_basebg.y;
            this.a_btn.x = 48 + this.a_basebg.x;
            this.a_btn.y = 246 + this.a_basebg.y;
        };
        PopPanel.prototype.resize = function () {
            this.resizeRole();
            _super.prototype.resize.call(this);
        };
        PopPanel.prototype.resizeRole = function () {
            if (this.weaponRoleSprite) {
                this.weaponRoleSprite.scale = 2.3 * UIData.Scale;
                this.weaponRoleSprite.y = 0;
                this.weaponRoleSprite.x = 0;
                if (this.selectUi) {
                    this.weaponRoleSprite.trueMove.x = (this.selectUi.absoluteX) / Scene_data.stageWidth;
                    this.weaponRoleSprite.trueMove.y = (this.selectUi.absoluteY + 210 * UIData.Scale) / Scene_data.stageHeight;
                }
                this.weaponRoleSprite.resize();
            }
        };
        PopPanel.prototype.hide = function () {
            if (this._updateFun) {
                TimeUtil.removeTimeOut(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
        };
        return PopPanel;
    }(UIPanel));
    refill.PopPanel = PopPanel;
})(refill || (refill = {}));
//# sourceMappingURL=PopPanel.js.map