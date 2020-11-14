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
var help;
(function (help) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Rectangle = Pan3d.Rectangle;
    var SceneEvent = game.SceneEvent;
    var HelpOtherPanel = /** @class */ (function (_super) {
        __extends(HelpOtherPanel, _super);
        function HelpOtherPanel() {
            var _this = _super.call(this) || this;
            _this.canCloseTime = 0;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        HelpOtherPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/help/help.txt", "panelui/help/help.png", function () { _this.loadConfigCom(); });
        };
        HelpOtherPanel.prototype.butClik = function (evt) {
            if (Pan3d.TimeUtil.getTimer() > this.canCloseTime) {
                this.hidePanel();
                GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum + GameData.getDiamodsByShareInput(game.GameDataModel.levelNum);
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                GameData.dispatchToLevel(GameData.helpBeforSelfLevel);
                console.log("关闭");
            }
        };
        HelpOtherPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, 0, 400, 350);
            this.e_helper_pic = this.addChild(this._topRender.getComponent("e_helper_pic"));
            this.e_help_text_info = this.addChild(this._topRender.getComponent("e_help_text_info"));
            this.addChild(this._topRender.getComponent("e_help_get_daimand"));
            this.e_help_get_num_txt = this._topRender.getComponent("e_help_get_num_txt");
            this.addChild(this._topRender.getComponent("e_win_tittle_txt"));
            this.addEvntButUp("e_submit_but", this._topRender);
            this.uiLoadComplte = true;
            this.showPanel();
            this.refrish2Data(this.infoData);
        };
        HelpOtherPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                Pan3d.UIManager.getInstance().removeUIContainer(_this);
            });
        };
        HelpOtherPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.canCloseTime = Pan3d.TimeUtil.getTimer() + 1000;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_help_get_num_txt.skinName, Pan3d.ColorType.Black000000 + "x" + GameData.getDiamodsByShareInput(game.GameDataModel.levelNum), 20);
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        HelpOtherPanel.prototype.refrish2Data = function (value) {
            var _this = this;
            this.infoData = value;
            if (this.uiLoadComplte && this.infoData) {
                console.log(this.infoData);
                var $url = getWxAvatar132UrlByUrl(this.infoData.userAvatarUrl);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_help_text_info.skinName, "我成功的帮助了" + this.infoData.userNickName, 20, TextAlign.CENTER, Pan3d.ColorType.Black000000);
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
        return HelpOtherPanel;
    }(basewin.BaseWinPanel));
    help.HelpOtherPanel = HelpOtherPanel;
})(help || (help = {}));
//# sourceMappingURL=HelpOtherPanel.js.map