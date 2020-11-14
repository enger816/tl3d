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
var special;
(function (special) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var Vector2D = Pan3d.Vector2D;
    var Rectangle = Pan3d.Rectangle;
    var TimeUtil = Pan3d.TimeUtil;
    var UiDraw = Pan3d.UiDraw;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var SpecialLevelTopPanel = /** @class */ (function (_super) {
        __extends(SpecialLevelTopPanel, _super);
        function SpecialLevelTopPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this.interfaceUI = true;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.timeUint = function () { return _this.upFrame(); };
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/special/special.txt", "panelui/special/special.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        SpecialLevelTopPanel.prototype.upFrame = function () {
            var $str = "00:00";
            if (Physics.ready) {
                $str = TimeUtil.getDiffTime2(Math.floor((TimeUtil.getTimer() - GameDataModel.levelStartTm) / 1000));
                $str = $str.substring(3, $str.length);
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_use_tm_txt.skinName, $str, 26, TextAlign.CENTER);
        };
        SpecialLevelTopPanel.prototype.onAdd = function () {
            _super.prototype.onAdd.call(this);
            TimeUtil.addTimeTick(1000, this.timeUint);
        };
        SpecialLevelTopPanel.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
            TimeUtil.removeTimeTick(this.timeUint);
        };
        SpecialLevelTopPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.b_use_tm_txt = this.addChild(this._bottomRender.getComponent("b_use_tm_txt"));
            this.b_use_tm_txt.top = 150;
            this.b_rank_info = this.addChild(this._bottomRender.getComponent("b_rank_info"));
            this.b_rank_info.top = this.b_rank_info.baseRec.y;
            this.b_rank_info.left = 0;
            this.uiLoadComplte = true;
            this.showPanel();
        };
        SpecialLevelTopPanel.prototype.drawRankCell = function () {
            var $ui = this.b_rank_info;
            var $rect = this._topRender.uiAtlas.getRec($ui.skinName);
            this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            for (var i = 0; this.rankeList && i < this.rankeList.length; i++) {
                var $userVo = this.rankeList[i];
                var $pos = new Vector2D(0, i * 26);
                UiDraw.cxtDrawImg(this._topRender.uiAtlas.ctx, "List_id_rank" + (1 + i), new Rectangle(0, $pos.y, 28, 28), UIData.textlist);
                var $str = TimeUtil.getDiffTime2(Math.floor($userVo.data / 1000));
                $str = $str.substring(3, $str.length);
                $str = $userVo.name.substr(0, 10) + Pan3d.ColorType.Whiteffffff + "(" + $str + ")";
                LabelTextFont.writeSingleLabelToCtx(this._topRender.uiAtlas.ctx, Pan3d.ColorType.Black000000 + $str, 16, 28, $pos.y + 5, TextAlign.LEFT);
            }
            Pan3d.TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this._topRender.uiAtlas.ctx);
        };
        SpecialLevelTopPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.drawRankCell();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        SpecialLevelTopPanel.prototype.hiedPanel = function () {
            if (this.uiLoadComplte && this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return SpecialLevelTopPanel;
    }(H5UIConatiner));
    special.SpecialLevelTopPanel = SpecialLevelTopPanel;
})(special || (special = {}));
//# sourceMappingURL=SpecialLevelTopPanel.js.map