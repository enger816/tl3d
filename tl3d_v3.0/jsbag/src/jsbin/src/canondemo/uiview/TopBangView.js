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
    var UIConatiner = Pan3d.UIConatiner;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var TopBangView = /** @class */ (function (_super) {
        __extends(TopBangView, _super);
        function TopBangView() {
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
        TopBangView.prototype.butClik = function (evt) {
            UIManager.getInstance().removeUIContainer(this);
            console.log(evt.target);
        };
        TopBangView.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.b_bang_bg = this.addEvntBut("b_bang_bg", this._bottomRender);
            this.b_bang_view_all_link = this.addEvntBut("b_bang_view_all_link", this._topRender);
            this.addChild(this._topRender.getComponent("b_bang_view_all"));
            this.addChild(this._midRender.getComponent("b_bang_bg_other"));
            this.addChild(this._topRender.getComponent("a_white_line"));
            this.b_level_num_0 = this.addChild(this._topRender.getComponent("b_level_num_0"));
            this.b_level_num_1 = this.addChild(this._topRender.getComponent("b_level_num_1"));
            this.b_level_num_2 = this.addChild(this._topRender.getComponent("b_level_num_2"));
            this.b_level_pic_0 = this.addChild(this._topRender.getComponent("b_level_pic_0"));
            this.b_level_pic_1 = this.addChild(this._topRender.getComponent("b_level_pic_1"));
            this.b_level_pic_2 = this.addChild(this._topRender.getComponent("b_level_pic_2"));
            this.b_level_tatol_0 = this.addChild(this._topRender.getComponent("b_level_tatol_0"));
            this.b_level_tatol_1 = this.addChild(this._topRender.getComponent("b_level_tatol_1"));
            this.b_level_tatol_2 = this.addChild(this._topRender.getComponent("b_level_tatol_2"));
            this.b_level_name_0 = this.addChild(this._topRender.getComponent("b_level_name_0"));
            this.b_level_name_1 = this.addChild(this._topRender.getComponent("b_level_name_1"));
            this.b_level_name_2 = this.addChild(this._topRender.getComponent("b_level_name_2"));
            this.setData();
        };
        TopBangView.prototype.setData = function () {
            for (var i = 0; i < 3; i++) {
                var $nameUi = this["b_level_name_" + i];
                var $leveUi = this["b_level_num_" + i];
                var $tatolUi = this["b_level_tatol_" + i];
                var $picUi = this["b_level_pic_" + i];
                var $$nameStr = "潘佳治";
                if (i == 1) {
                    $$nameStr = "Lation_Pan";
                }
                if (i == 2) {
                    $$nameStr = "西辰世纪-杰";
                }
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, $nameUi.skinName, $$nameStr, 18);
                ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, $leveUi.skinName, String(i + 1), "NUM40", TextAlign.CENTER);
                ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, $tatolUi.skinName, String(random(1000)), "NUM16", TextAlign.CENTER, 3);
                //  this._bottomRender.uiAtlas.upDataPicToTexture("touxiang.jpg", $picUi.skinName);
            }
        };
        return TopBangView;
    }(UIConatiner));
    uiview.TopBangView = TopBangView;
})(uiview || (uiview = {}));
//# sourceMappingURL=TopBangView.js.map