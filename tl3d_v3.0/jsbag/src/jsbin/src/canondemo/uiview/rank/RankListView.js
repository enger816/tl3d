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
var rank;
(function (rank) {
    var SList = Pan3d.SList;
    var UIManager = Pan3d.UIManager;
    var SListItem = Pan3d.SListItem;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var TextureManager = Pan3d.TextureManager;
    var RankUiList = /** @class */ (function (_super) {
        __extends(RankUiList, _super);
        function RankUiList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -0;
            _this._maskLevel = 6;
            return _this;
        }
        RankUiList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        RankUiList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, RankViewRender, 400, 64 * 8, 0, 64, 8, 256, 1024, 1, 14);
        };
        RankUiList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        RankUiList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return RankUiList;
    }(SList));
    rank.RankUiList = RankUiList;
    var RankViewRender = /** @class */ (function (_super) {
        __extends(RankViewRender, _super);
        function RankViewRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        RankViewRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.F_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Rank_bg", 0, 0, 400, 64);
            $container.addChild(this.F_bg);
            this.F_ranking_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Rank_ranking_id", 10, 28, 50, 20);
            $container.addChild(this.F_ranking_id);
            this.F_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Rank_ion_pic", 90, 10, 44, 44);
            $container.addChild(this.F_ion_pic);
            this.F_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Rank_name", 150, 28, 100, 20);
            $container.addChild(this.F_name);
            this.F_level_num = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Rank_res", 280, 28, 60, 20);
            $container.addChild(this.F_level_num);
        };
        RankViewRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $vo = $data.data;
                var $isSelf = ($vo.selfRank == $data.id);
                var $txtColor = $isSelf ? ColorType.Green20a200 : ColorType.Whitefff0b4;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_ranking_id.skinName, String($data.id), 16, TextAlign.CENTER, $txtColor);
                this.uiAtlas.upDataWebPicToTexture($vo.avatar, this.F_ion_pic.skinName);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_name.skinName, $vo.name, 16, TextAlign.CENTER, $txtColor);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_level_num.skinName, String($vo.money), 16, TextAlign.CENTER, $txtColor);
                this.fileColor(this.F_bg.skinName, $data.id % 2 == 0 ? "rgba(66,66,66,1)" : "rgba(56,53,54,1)");
            }
        };
        RankViewRender.prototype.fileColor = function ($iconName, $color) {
            var rec = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color;
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        };
        RankViewRender.prototype.butClik = function (evt) {
        };
        return RankViewRender;
    }(SListItem));
    rank.RankViewRender = RankViewRender;
})(rank || (rank = {}));
//# sourceMappingURL=RankListView.js.map