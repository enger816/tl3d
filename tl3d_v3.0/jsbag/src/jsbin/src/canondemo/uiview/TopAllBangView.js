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
var uiview;
(function (uiview) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    var UIManager = Pan3d.UIManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var RankUIRenderOnlyPicComponent = /** @class */ (function (_super) {
        __extends(RankUIRenderOnlyPicComponent, _super);
        function RankUIRenderOnlyPicComponent($rect) {
            var _this = _super.call(this) || this;
            if (!GameData.wx_public_cavans_texture) {
                GameData.wx_public_cavans_texture = Pan3d.Scene_data.context3D.creatTexture(1024, 1024);
            }
            _this.textureRes = new Pan3d.TextureRes();
            _this.textureRes.texture = GameData.wx_public_cavans_texture;
            return _this;
        }
        RankUIRenderOnlyPicComponent.prototype.changeRendrDataByVc = function ($vcId, ty) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            for (var i = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 480 / 1024;
                this.renderData2[i * 4 + 1] = 480 / 1024;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0.25 + ty;
                ;
            }
        };
        RankUIRenderOnlyPicComponent.prototype.makeRenderDataVc = function ($vcId) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            this.changeRendrDataByVc($vcId, 0);
        };
        return RankUIRenderOnlyPicComponent;
    }(UIRenderOnlyPicComponent));
    uiview.RankUIRenderOnlyPicComponent = RankUIRenderOnlyPicComponent;
    var SelfUIRenderOnlyPicComponent = /** @class */ (function (_super) {
        __extends(SelfUIRenderOnlyPicComponent, _super);
        function SelfUIRenderOnlyPicComponent($rect) {
            var _this = _super.call(this) || this;
            if (!GameData.wx_public_cavans_texture) {
                GameData.wx_public_cavans_texture = Pan3d.Scene_data.context3D.creatTexture(1024, 1024);
            }
            _this.textureRes = new Pan3d.TextureRes();
            _this.textureRes.texture = GameData.wx_public_cavans_texture;
            return _this;
        }
        SelfUIRenderOnlyPicComponent.prototype.makeRenderDataVc = function ($vcId) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            for (var i = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 480 / 1024;
                this.renderData2[i * 4 + 1] = 100 / 1024;
                this.renderData2[i * 4 + 2] = 0.5;
                this.renderData2[i * 4 + 3] = 0;
                console.log("----------更新-------");
            }
        };
        return SelfUIRenderOnlyPicComponent;
    }(UIRenderOnlyPicComponent));
    uiview.SelfUIRenderOnlyPicComponent = SelfUIRenderOnlyPicComponent;
    var TopAllBangView = /** @class */ (function (_super) {
        __extends(TopAllBangView, _super);
        function TopAllBangView() {
            var _this = _super.call(this) || this;
            _this.lastY = 0;
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
            _this._rankUIRender = new RankUIRenderOnlyPicComponent(new Pan3d.Rectangle());
            _this.addRender(_this._rankUIRender);
            _this._selfUIRender = new SelfUIRenderOnlyPicComponent(new Pan3d.Rectangle());
            _this.addRender(_this._selfUIRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TopAllBangView.prototype.butClik = function (evt) {
            if (evt.target == this.b_bang_bg) {
                this.hidePanel();
            }
        };
        TopAllBangView.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
            GameData.needDrawWxpublicTexture = false;
        };
        TopAllBangView.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                GameData.needDrawWxpublicTexture = true;
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        TopAllBangView.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.d_all_rank_tip_bg = this.addChild(this._bottomRender.getComponent("d_all_rank_tip_bg"));
            this.d_all_rank_tip_bg.top = 0;
            this.d_all_rank_tip_bg.left = 0;
            this.d_all_rank_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.d_all_rank_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("d_bang_tittle"));
            this.addChild(this._midRender.getComponent("d_bg"));
            this.b_bang_bg = this.addEvntBut("d_try_game", this._topRender);
            this.addChild(this._midRender.getComponent("d_self_bg"));
            this.addChild(this._topRender.getComponent("d_bang_info_txt"));
            this._selfUIRender.uiAtlas = this._bottomRender.uiAtlas;
            var $ui = this.addChild(this._selfUIRender.getComponent("d_self_bg"));
            this._rankUIRender.uiAtlas = this._bottomRender.uiAtlas;
            this.r_rank_pic = this.addChild(this._rankUIRender.getComponent("r_rank_pic"));
            this.r_rank_pic.addEventListener(InteractiveEvent.Down, this.onDown, this);
            this._rankUIRender.changeRendrDataByVc(this.r_rank_pic.vcId, 0);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        TopAllBangView.prototype.onDown = function (evt) {
            this.lastY = evt.y;
            Pan3d.Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Pan3d.Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        TopAllBangView.prototype.onMove = function (evt) {
            console.log(this.r_rank_pic.vcId);
            var ty = evt.y - this.lastY;
            // ty /= Pan3d.UIData.Scale
            this._rankUIRender.changeRendrDataByVc(this.r_rank_pic.vcId, -ty / 1024);
        };
        TopAllBangView.prototype.onUp = function (evt) {
            Pan3d.Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Pan3d.Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
            var ty = evt.y - this.lastY;
            // ty/= Pan3d.UIData.Scale
            var $e = new game.SceneEvent(game.SceneEvent.Move_Rank_roll_Evet);
            $e.data = Math.floor(ty / 80) * 80;
            console.log("  $e.data", $e.data);
            Pan3d.ModuleEventManager.dispatchEvent($e);
            this._rankUIRender.changeRendrDataByVc(this.r_rank_pic.vcId, 0);
        };
        return TopAllBangView;
    }(H5UIConatiner));
    uiview.TopAllBangView = TopAllBangView;
})(uiview || (uiview = {}));
//# sourceMappingURL=TopAllBangView.js.map