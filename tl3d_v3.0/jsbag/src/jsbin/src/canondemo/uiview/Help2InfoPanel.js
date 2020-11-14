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
    var UIConatiner = Pan3d.UIConatiner;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var Help2InfoPanel = /** @class */ (function (_super) {
        __extends(Help2InfoPanel, _super);
        function Help2InfoPanel() {
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
        Help2InfoPanel.prototype.butClik = function (evt) {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        Help2InfoPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.h2_tip_bg = this.addEvntButUp("h2_tip_bg", this._bottomRender);
            this.h2_tip_bg.top = 0;
            this.h2_tip_bg.left = 0;
            this.h2_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.h2_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("h2_win_bg"));
            this.h2_head_pic = this.addChild(this._topRender.getComponent("h2_head_pic"));
            this.addChild(this._topRender.getComponent("h2_help_text_info"));
            this.h2_help_user_name = this.addChild(this._topRender.getComponent("h2_help_user_name"));
            this.uiLoadComplte = true;
            this.refrish2Data(this.infoData);
        };
        Help2InfoPanel.prototype.refrish2Data = function (value) {
            var _this = this;
            this.infoData = value;
            if (this.uiLoadComplte && this.infoData) {
                console.log(this.infoData);
                var $url = this.infoData.avatarUrl;
                console.log("帮助的图片地址", $url);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.h2_help_user_name.skinName, this.infoData.nickName, 20, TextAlign.CENTER, Pan3d.ColorType.Black000000);
                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.IMG_TYPE, function ($img) {
                    var rec = _this._topRender.uiAtlas.getRec(_this.h2_head_pic.skinName);
                    _this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    _this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    Pan3d.TextureManager.getInstance().updateTexture(_this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, _this._topRender.uiAtlas.ctx);
                });
            }
        };
        return Help2InfoPanel;
    }(UIConatiner));
    help2info.Help2InfoPanel = Help2InfoPanel;
})(help2info || (help2info = {}));
//# sourceMappingURL=Help2InfoPanel.js.map