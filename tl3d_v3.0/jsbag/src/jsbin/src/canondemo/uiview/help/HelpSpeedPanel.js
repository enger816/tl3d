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
var helpspeed;
(function (helpspeed) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var GameDataModel = game.GameDataModel;
    var HelpSpeedPanel = /** @class */ (function (_super) {
        __extends(HelpSpeedPanel, _super);
        function HelpSpeedPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
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
        HelpSpeedPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.d_cancel_but:
                    this.hidePanel();
                    break;
                case this.d_submit_but:
                    this.hidePanel();
                    GameDataModel.levelNum = this.showData.level + 1;
                    GameData.dispatchToLevel(GameDataModel.levelNum);
                    GameData.WEB_SEVER_EVENT_AND_BACK("check_help_info", "openid=" + GameData.getStorageSync("openid"));
                    GameData.clearPandaOrInof(2, 1);
                    break;
                default:
                    break;
            }
        };
        HelpSpeedPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.addChild(this._bottomRender.getComponent("d_win_bg"));
            this.d_helper_centen_pic = this.addChild(this._topRender.getComponent("d_helper_centen_pic"));
            this.d_help_use_name = this.addChild(this._topRender.getComponent("d_help_use_name"));
            this.d_submit_to_next = this.addChild(this._topRender.getComponent("d_submit_to_next"));
            this.d_cancel_but = this.addEvntButUp("d_cancel_but", this._topRender);
            this.d_submit_but = this.addEvntButUp("d_submit_but", this._topRender);
            this.uiLoadComplte = true;
            this.refrishData(this.showData);
            this.showPanel();
        };
        HelpSpeedPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        HelpSpeedPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            tips.PandaMeshData.hideCentenTxtInfoType2(tips.PandaMeshData.key101);
        };
        HelpSpeedPanel.prototype.refrishData = function (value) {
            var _this = this;
            this.showData = value;
            if (this.uiLoadComplte) {
                var helpInof = String(value.helper_info).split("|");
                var picUir = getWxAvatar132UrlByUrl(helpInof[1]);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.d_help_use_name.skinName, helpInof[0] + "帮助了我", 20, TextAlign.CENTER, Pan3d.ColorType.Black000000, "", 2);
                GameData.loadImgByPicUrl(picUir, function ($img) {
                    var rec = _this._topRender.uiAtlas.getRec(_this.d_helper_centen_pic.skinName);
                    _this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    _this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    Pan3d.TextureManager.getInstance().updateTexture(_this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, _this._topRender.uiAtlas.ctx);
                });
            }
        };
        return HelpSpeedPanel;
    }(H5UIConatiner));
    helpspeed.HelpSpeedPanel = HelpSpeedPanel;
})(helpspeed || (helpspeed = {}));
//# sourceMappingURL=HelpSpeedPanel.js.map