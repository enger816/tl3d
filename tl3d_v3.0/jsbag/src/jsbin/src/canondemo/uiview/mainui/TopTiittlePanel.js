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
var topui;
(function (topui) {
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var UIVirtualContainer = Pan3d.UIVirtualContainer;
    var GameDataModel = game.GameDataModel;
    var TopTiittlePanel = /** @class */ (function (_super) {
        __extends(TopTiittlePanel, _super);
        function TopTiittlePanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.top = 0;
            return _this;
        }
        TopTiittlePanel.prototype.setRender = function ($bottom, $mid, $top) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        };
        TopTiittlePanel.prototype.loadConfigCom = function () {
            this.addChild(this._midRender.getComponent("a_tittle_level_bg"));
            this.a_top_level_num_txt = this.addEvntBut("a_top_level_num_txt", this._midRender);
            this.a_level_left_txt = this.addChild(this._topRender.getComponent("a_level_left_txt"));
            this.a_level_right_txt = this.addChild(this._topRender.getComponent("a_level_right_txt"));
            this.a_reset_level_but = this.addEvntButUp("a_reset_level_but", this._topRender);
            this.a_reset_level_but.left = 30;
            this.a_diamonds_icon = this.addChild(this._topRender.getComponent("a_diamonds_icon"));
            this.a_diamonds_icon.right = 20;
            this.a_diamonds_num_txt = this.addChild(this._topRender.getComponent("a_diamonds_num_txt"));
            this.a_diamonds_num_txt.right = 50;
        };
        TopTiittlePanel.prototype.refrishDiamondNum = function () {
            var $num = GameData.hasdiamondsHavenum;
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_diamonds_num_txt.skinName, String($num), "NUM10", TextAlign.CENTER);
        };
        TopTiittlePanel.prototype.refrishUi = function () {
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_top_level_num_txt.skinName, String(GameDataModel.levelNum), "NUM41", TextAlign.CENTER);
            if (GameData.gameType == 1) {
                this.top = 0;
            }
            else {
                this.top = -10000;
            }
        };
        TopTiittlePanel.prototype.showCammandPanel = function () {
            if (camand.CammandPanel.getInstance().hasStage) {
                camand.CammandPanel.getInstance().hide();
            }
            else {
                camand.CammandPanel.getInstance().show();
            }
        };
        TopTiittlePanel.prototype.butClik = function (evt) {
            if (GameData.isPlayVideo) {
                console.log("读取录像现在不操作");
                return;
            }
            switch (evt.target) {
                case this.a_top_level_num_txt:
                    this.showCammandPanel();
                    break;
                case this.a_reset_level_but:
                    GameData.dispatchToLevel(GameDataModel.levelNum);
                    break;
                default:
                    break;
            }
        };
        return TopTiittlePanel;
    }(UIVirtualContainer));
    topui.TopTiittlePanel = TopTiittlePanel;
})(topui || (topui = {}));
//# sourceMappingURL=TopTiittlePanel.js.map