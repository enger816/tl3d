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
var help2info;
(function (help2info) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var GameDataModel = game.GameDataModel;
    var Help2InfoPanel = /** @class */ (function (_super) {
        __extends(Help2InfoPanel, _super);
        function Help2InfoPanel() {
            var _this = _super.call(this) || this;
            _this.canCloseTime = 0;
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
            _this.h5UIAtlas.setInfo("ui/help/help.txt", "ui/help/help.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        Help2InfoPanel.prototype.butClik = function (evt) {
            if (Pan3d.TimeUtil.getTimer() > this.canCloseTime && this.e_win_bg == evt.target) {
                this.hidePanel();
                var $num = GameData.hasdiamondsHavenum;
                GameData.hasdiamondsHavenum = $num + GameData.getDiamodsByShareInput(game.GameDataModel.levelNum);
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                GameDataModel.levelNum = GameData.helpBeforSelfLevel;
                GameData.dispatchToLevel(GameDataModel.levelNum);
            }
        };
        Help2InfoPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this.d_tip_bg = this.addEvntBut("d_tip_bg", this._bottomRender);
            this.d_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.d_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.d_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.d_tip_bg.left = 0;
            this.d_tip_bg.top = 0;
            this.e_win_bg = this.addEvntBut("e_win_bg", this._midRender);
            this.e_helper_pic = this.addChild(this._topRender.getComponent("e_helper_pic"));
            this.e_help_text_info = this.addChild(this._topRender.getComponent("e_help_text_info"));
            this.uiLoadComplte = true;
            this.showPanel();
            this.refrish2Data(this.infoData);
        };
        Help2InfoPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        Help2InfoPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.canCloseTime = Pan3d.TimeUtil.getTimer() + 1000;
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        Help2InfoPanel.prototype.refrish2Data = function (value) {
            var _this = this;
            this.infoData = value;
            if (this.uiLoadComplte && this.infoData) {
                console.log(this.infoData);
                var $url = getWxAvatar132UrlByUrl(this.infoData.avatarUrl);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_help_text_info.skinName, "我成功的帮助了" + this.infoData.nickName, 20, TextAlign.CENTER, Pan3d.ColorType.Black000000);
                GameData.loadImgByPicUrl($url, function ($img) {
                    var rec = _this._topRender.uiAtlas.getRec(_this.e_helper_pic.skinName);
                    _this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    _this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    Pan3d.TextureManager.getInstance().updateTexture(_this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, _this._topRender.uiAtlas.ctx);
                });
                var $helpdata = GameData.getStorageSync("helpdata");
                if (!$helpdata) {
                    $helpdata = {};
                }
                var $tadayStr = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
                if ($helpdata.date != $tadayStr) {
                    $helpdata.date = $tadayStr;
                    $helpdata.helpnum = 0;
                    $helpdata.isget = false;
                }
                $helpdata.helpnum++;
                GameData.setStorageSync("helpdata", $helpdata);
            }
        };
        return Help2InfoPanel;
    }(H5UIConatiner));
    help2info.Help2InfoPanel = Help2InfoPanel;
})(help2info || (help2info = {}));
//# sourceMappingURL=Help2InfoPanel.js.map