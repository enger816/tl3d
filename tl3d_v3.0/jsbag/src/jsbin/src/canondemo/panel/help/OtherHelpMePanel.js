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
    var Rectangle = Pan3d.Rectangle;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameDataModel = game.GameDataModel;
    var PandaMeshData = rightpanda.PandaMeshData;
    var OtherHelpMePanel = /** @class */ (function (_super) {
        __extends(OtherHelpMePanel, _super);
        function OtherHelpMePanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        OtherHelpMePanel.prototype.baseWindowLoadFinish = function () {
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
        OtherHelpMePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.base_win_close:
                case this.d_cancel_but:
                    this.hidePanel();
                    ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.CHECK_SELF_HELP_INFO));
                    break;
                case this.d_submit_but:
                    this.hidePanel();
                    if (this._helpOtherVo.level <= GameDataModel.levelNum) {
                        GameDataModel.levelNum = this._helpOtherVo.level + 1;
                        GameData.dispatchToLevel(GameDataModel.levelNum);
                    }
                    GameData.WEB_SEVER_EVENT_AND_BACK("check_help_info", "openid=" + GameData.getStorageSync("openid"));
                    GameData.clearPandaOrInof(2, 1);
                    break;
                default:
                    break;
            }
        };
        OtherHelpMePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, 0, 400, 350);
            this.addChild(this._topRender.getComponent("d_win_tittle_txt"));
            this.d_helper_centen_pic = this.addChild(this._topRender.getComponent("d_helper_centen_pic"));
            this.d_help_use_name = this.addChild(this._topRender.getComponent("d_help_use_name"));
            this.d_submit_to_next = this.addChild(this._topRender.getComponent("d_submit_to_next"));
            this.d_cancel_but = this.addEvntButUp("d_cancel_but", this._topRender);
            this.d_submit_but = this.addEvntButUp("d_submit_but", this._topRender);
            this.uiLoadComplte = true;
            this.refrishData(this._helpOtherVo);
            this.showPanel();
        };
        OtherHelpMePanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        OtherHelpMePanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                Pan3d.UIManager.getInstance().removeUIContainer(_this);
                PandaMeshData.hideCentenTxtInfoType2(PandaMeshData.key101);
            });
        };
        OtherHelpMePanel.prototype.refrishData = function (value) {
            var _this = this;
            this._helpOtherVo = value;
            if (this.uiLoadComplte && this._helpOtherVo) {
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
        return OtherHelpMePanel;
    }(basewin.BaseWinPanel));
    help.OtherHelpMePanel = OtherHelpMePanel;
})(help || (help = {}));
//# sourceMappingURL=OtherHelpMePanel.js.map