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
var helpinfo;
(function (helpinfo) {
    var UIConatiner = Pan3d.UIConatiner;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var HelpInfoPanel = /** @class */ (function (_super) {
        __extends(HelpInfoPanel, _super);
        function HelpInfoPanel() {
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
            _this._midRender.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        HelpInfoPanel.prototype.butClik = function (evt) {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            game.GameDataModel.levelNum++; //有人帮助了就直接下一关
            this.perentPanel.hidePanel();
            var $postStr = "openid=" + GameData.getStorageSync("openid");
            GameData.WEB_SEVER_EVENT_AND_BACK("check_help_info", $postStr);
        };
        HelpInfoPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.h_tip_bg = this.addEvntButUp("h_tip_bg", this._bottomRender);
            this.h_tip_bg.top = 0;
            this.h_tip_bg.left = 0;
            this.h_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.h_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("h_win_bg"));
            this.h_head_pic = this.addChild(this._topRender.getComponent("h_head_pic"));
            this.h_help_user_name = this.addChild(this._topRender.getComponent("h_help_user_name"));
            this.addChild(this._topRender.getComponent("h_help_text_info"));
            this.uiLoadComplte = true;
            this.refrishData(this.infoData);
        };
        HelpInfoPanel.prototype.refrishData = function (value) {
            var _this = this;
            this.infoData = value;
            if (this.uiLoadComplte && this.infoData) {
                var $infoStr = this.infoData.helper_info;
                var $arr = $infoStr.split("|");
                var $url = "res/d.jpg";
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.h_help_user_name.skinName, $arr[0], 20, TextAlign.CENTER, Pan3d.ColorType.Black000000);
                if ($arr[1].length > 10) {
                    $url = $arr[1];
                }
                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.IMG_TYPE, function ($img) {
                    var rec = _this._topRender.uiAtlas.getRec(_this.h_head_pic.skinName);
                    _this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    _this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    Pan3d.TextureManager.getInstance().updateTexture(_this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, _this._topRender.uiAtlas.ctx);
                });
            }
        };
        return HelpInfoPanel;
    }(UIConatiner));
    helpinfo.HelpInfoPanel = HelpInfoPanel;
})(helpinfo || (helpinfo = {}));
//# sourceMappingURL=HelpInfoPanel.js.map