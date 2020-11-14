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
var treasure;
(function (treasure) {
    var TreasurePage = /** @class */ (function (_super) {
        __extends(TreasurePage, _super);
        function TreasurePage() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        TreasurePage.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this.mountRoleSprite.destory();
            this.mountRoleSprite = null;
            if (this.treasureRightPanel) {
                this.treasureRightPanel.dispose();
                this.treasureRightPanel = null;
            }
        };
        TreasurePage.prototype.initUiAtlas = function ($uiAtlas, $winRender) {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._publicRender = $winRender;
            this.initView();
        };
        TreasurePage.prototype.initView = function () {
            this.addChild(this._bgRender.getComponent("t_bg"));
            this.addChild(this._bgRender.getComponent("a_zhanlinum"));
            this.addChild(this._bgRender.getComponent("e_linev"));
            this.pubbg = new Array;
            var cnew_bg_yellow = this.addChild(this._publicRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._baseRender);
            this.pubbg.push(cnew_bg_yellow);
            this.a_zhanli_all = this.addChild(this._baseRender.getComponent("a_zhanli_all"));
            var cnew_right_bg_top = this.addChild(this._publicRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            this.pubbg.push(cnew_right_bg_top);
            var cnew_right_bg_bottom = this.addChild(this._publicRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);
            this.pubbg.push(cnew_right_bg_bottom);
            this._publicRender.applyObjData();
            this.mountRoleSprite = new Person2DChar();
            this.mountRoleSprite.needUIUrl = false;
            // this.mountRoleSprite .showAvatarVisibel=false
            // this.mountRoleSprite.setAvatar(6013);
            this._baseRender.addModel(this.mountRoleSprite);
        };
        TreasurePage.prototype.setZhanli = function () {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_zhanli_all.skinName, String(GuidData.player.gettalismantotalzhanli()), ArtFont.num56);
        };
        TreasurePage.prototype.setAvatar = function ($num, $name, $value) {
            // //console.log($num);
            this.mountRoleSprite.setAvatar($num);
        };
        TreasurePage.prototype.resizeRole = function () {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 3 * UIData.Scale;
                //this.mountRoleSprite.rotationY = 45
                this.mountRoleSprite.x = 10 * UIData.Scale;
                this.mountRoleSprite.y = -50 * UIData.Scale;
            }
        };
        TreasurePage.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            this.resizeRole();
            _super.prototype.resize.call(this);
        };
        TreasurePage.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.treasureRightPanel) {
                this.treasureRightPanel = new treasure.TreasureRightPanel();
                this.treasureRightPanel.initUiAtlas(this._baseRender.uiAtlas, this._publicRender.uiAtlas);
                this.treasureRightPanel.parent = this;
            }
            this.treasureRightPanel.show();
            this.setZhanli();
            this.setUiListVisibleByItem(this.pubbg, true);
            this.resize();
        };
        TreasurePage.prototype.hide = function () {
            if (this.treasureRightPanel) {
                this.treasureRightPanel.hide();
            }
            this.setUiListVisibleByItem(this.pubbg, false);
            UIManager.getInstance().removeUIContainer(this);
        };
        return TreasurePage;
    }(UIVirtualContainer));
    treasure.TreasurePage = TreasurePage;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasurePage.js.map