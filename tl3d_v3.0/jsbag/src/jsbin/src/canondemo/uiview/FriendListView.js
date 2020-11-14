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
var friend;
(function (friend) {
    var SList = Pan3d.SList;
    var UIManager = Pan3d.UIManager;
    var SListItem = Pan3d.SListItem;
    var SListItemData = Pan3d.SListItemData;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var TextureManager = Pan3d.TextureManager;
    var FriendUiList = /** @class */ (function (_super) {
        __extends(FriendUiList, _super);
        function FriendUiList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -50;
            _this._maskLevel = 4;
            return _this;
        }
        FriendUiList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        FriendUiList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, FriendViewRender, 400, 64 * 6, 0, 64, 8, 256, 1024, 1, 10);
        };
        FriendUiList.prototype.refreshDataByNewData = function () {
            var $arr = new Array;
            for (var i = 0; i < 99; i++) {
                $arr.push(i);
            }
            var $sListItemData = this.getData($arr);
            this.refreshData($sListItemData);
        };
        FriendUiList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = "ccav";
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        FriendUiList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshDataByNewData();
            }
        };
        FriendUiList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return FriendUiList;
    }(SList));
    friend.FriendUiList = FriendUiList;
    var FriendViewRender = /** @class */ (function (_super) {
        __extends(FriendViewRender, _super);
        function FriendViewRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        FriendViewRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.F_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "F_bg", 0, 0, 400, 64);
            $container.addChild(this.F_bg);
            this.F_ranking_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "F_ranking_id", 10, 28, 50, 20);
            $container.addChild(this.F_ranking_id);
            this.F_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "F_ion_pic", 80, 10, 44, 44);
            $container.addChild(this.F_ion_pic);
            this.F_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "F_name", 130, 28, 100, 20);
            $container.addChild(this.F_name);
            this.F_level_num = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "F_level_num", 250, 28, 100, 20);
            $container.addChild(this.F_level_num);
        };
        FriendViewRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_ranking_id.skinName, String($data.id), 16, TextAlign.CENTER, ColorType.Whitefff0b4);
                this.uiAtlas.upDataPicToTexture("https://api.h5key.com/static/wudiqiuqiu/ui/userpic/" + random(10) + ".jpg", this.F_ion_pic.skinName);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_name.skinName, "潘佳治", 16, TextAlign.CENTER, ColorType.Whitefff0b4);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_level_num.skinName, "1000" + $data.id, 16, TextAlign.CENTER, ColorType.Whitefff0b4);
                this.fileColor(this.F_bg.skinName, $data.id % 2 == 0 ? "rgba(66,66,66,1)" : "rgba(56,53,54,1)");
            }
        };
        FriendViewRender.prototype.fileColor = function ($iconName, $color) {
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
        FriendViewRender.prototype.butClik = function (evt) {
        };
        return FriendViewRender;
    }(SListItem));
    friend.FriendViewRender = FriendViewRender;
})(friend || (friend = {}));
//# sourceMappingURL=FriendListView.js.map