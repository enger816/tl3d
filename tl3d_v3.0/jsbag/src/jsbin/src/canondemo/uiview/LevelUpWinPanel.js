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
var levelup;
(function (levelup) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var Scene_data = Pan3d.Scene_data;
    var UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    var GameDataModel = game.GameDataModel;
    var LeveBestUIRenderOnlyPicComponent = /** @class */ (function (_super) {
        __extends(LeveBestUIRenderOnlyPicComponent, _super);
        function LeveBestUIRenderOnlyPicComponent($rect) {
            var _this = _super.call(this) || this;
            _this._rect = $rect;
            if (!GameData.wx_public_cavans_texture) {
                GameData.wx_public_cavans_texture = Pan3d.Scene_data.context3D.creatTexture(1024, 1024);
            }
            _this.textureRes = new Pan3d.TextureRes();
            _this.textureRes.texture = GameData.wx_public_cavans_texture;
            return _this;
        }
        LeveBestUIRenderOnlyPicComponent.prototype.changeRendrDataByVc = function ($vcId, ty) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            for (var i = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = this._rect.width;
                this.renderData2[i * 4 + 1] = this._rect.height;
                this.renderData2[i * 4 + 2] = this._rect.x;
                this.renderData2[i * 4 + 3] = this._rect.y;
                ;
            }
        };
        LeveBestUIRenderOnlyPicComponent.prototype.makeRenderDataVc = function ($vcId) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            this.changeRendrDataByVc($vcId, 0);
        };
        return LeveBestUIRenderOnlyPicComponent;
    }(UIRenderOnlyPicComponent));
    levelup.LeveBestUIRenderOnlyPicComponent = LeveBestUIRenderOnlyPicComponent;
    var LevelUpWinPanel = /** @class */ (function (_super) {
        __extends(LevelUpWinPanel, _super);
        function LevelUpWinPanel() {
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
            _this._bestUserRender = new LeveBestUIRenderOnlyPicComponent(new Pan3d.Rectangle(512 / 1024, 512 / 1024, 100 / 1024, 100 / 1024));
            _this.addRender(_this._bestUserRender);
            _this._bestUserNameRender = new LeveBestUIRenderOnlyPicComponent(new Pan3d.Rectangle(512 / 1024, (512 + 100) / 1024, 150 / 1024, 30 / 1024));
            _this.addRender(_this._bestUserNameRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LevelUpWinPanel.prototype.tipFristOpenSkinWindow = function (level) {
            if (GameData.severinfo && GameData.severinfo.skinopenlevel < level) {
                if (!GameData.getStorageSync("changeSkinFrist")) {
                    if (GameData.skinType == 10) {
                        GameData.skinType = random(3) + 1;
                        GameData.setStorageSync("skinType", GameData.skinType);
                        game.GameDataModel.centenBall.changeSkinById(GameData.skinType);
                    }
                    console.log("提示打开皮肤");
                    var obj = new tips.PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/3.png";
                    obj.type = tips.PandaMeshData.type1;
                    obj.key = tips.PandaMeshData.key3; //皮肤
                    obj.data = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_SKIN_LIST_PANEL);
                    var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj;
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                }
            }
        };
        LevelUpWinPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.u_tip_bg:
                    var eee = GameDataModel.levelNum + 1;
                    GameData.dispatchToLevel(eee);
                    this.tipFristOpenSkinWindow(eee); //提示打开皮肤窗口
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        LevelUpWinPanel.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
            GameData.needDrawWxpublicTexture = false;
            Pan3d.ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.TEST_FRIST_TIP_ONLINE_PLAY));
        };
        LevelUpWinPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                GameData.needDrawWxpublicTexture = true;
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        LevelUpWinPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.u_tip_bg = this.addEvntButUp("u_tip_bg", this._bottomRender);
            this.u_tip_bg.top = 0;
            this.u_tip_bg.left = 0;
            this.u_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.u_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("u_best_user_pic_bg"));
            this.addChild(this._topRender.getComponent("u_best_user_name_bg"));
            this.addChild(this._topRender.getComponent("u_best_tittle_txt"));
            this.addChild(this._topRender.getComponent("u_level_up"));
            this.addChild(this._topRender.getComponent("u_clik_next_levet"));
            this._bestUserRender.uiAtlas = this._bottomRender.uiAtlas;
            this.addChild(this._bestUserRender.getComponent("u_best_head_pic"));
            this._bestUserNameRender.uiAtlas = this._bottomRender.uiAtlas;
            this.addChild(this._bestUserNameRender.getComponent("u_best_user_name"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        return LevelUpWinPanel;
    }(H5UIConatiner));
    levelup.LevelUpWinPanel = LevelUpWinPanel;
})(levelup || (levelup = {}));
//# sourceMappingURL=LevelUpWinPanel.js.map