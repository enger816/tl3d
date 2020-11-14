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
var layapan;
(function (layapan) {
    var LayaJumpUiDrawAndRefreash256 = /** @class */ (function (_super) {
        __extends(LayaJumpUiDrawAndRefreash256, _super);
        function LayaJumpUiDrawAndRefreash256() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LayaJumpUiDrawAndRefreash256.prototype.drawTxtBydigitalAndtext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 92 * 1.5;
            var $height = 50 * 1.5;
            var txtcolor;
            txtcolor = Pan3d.ArtFont.num54;
            var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.Rectangle((rec.pixelWitdh - $width) / 2, 0, $width, $height), Pan3d.UIData.publicUi);
            Pan3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, (rec.pixelWitdh - distion) / 2, $height);
            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return distion;
        };
        LayaJumpUiDrawAndRefreash256.prototype.makeData = function () {
            if (this._data) {
                var vo = this._data;
                this.pos = vo.pos;
                this.dtime = vo.endtime;
                this.drawTxtBydigitalAndtext(vo);
            }
        };
        LayaJumpUiDrawAndRefreash256.prototype.update = function () {
            if (this._data) {
                this.time = Pan3d.TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
                var vo = this._data;
                var t = (this.time - vo.starttime) / 1000 * 60;
                var v2d = this.Vector3DToVector2D(new Pan3d.Vector3D(this.pos.x, this.pos.y, this.pos.z));
                this.ui.width = 256;
                this.ui.height = 256;
                this.ui.y = v2d.y - t;
                this.ui.x = v2d.x;
                this.ui.alpha = 1;
            }
        };
        return LayaJumpUiDrawAndRefreash256;
    }(Pan3d.ExpTextJumpUiDrawAndRefreash));
    layapan.LayaJumpUiDrawAndRefreash256 = LayaJumpUiDrawAndRefreash256;
    var LayaBloodManager = /** @class */ (function (_super) {
        __extends(LayaBloodManager, _super);
        function LayaBloodManager() {
            var _this = _super.call(this) || this;
            _this._jumpText256_256 = new Pan3d.AlphaUiContianer(LayaJumpUiDrawAndRefreash256, new Pan3d.Rectangle(0, 0, 256, 256), 2);
            _this.uiContianerItem.push(_this._jumpText256_256);
            return _this;
        }
        LayaBloodManager.prototype.setExpJump256_256Num = function ($textJumpUiVo) {
            this._jumpText256_256.showTemp($textJumpUiVo);
            console.log($textJumpUiVo);
        };
        return LayaBloodManager;
    }(Pan3d.BloodManager));
    layapan.LayaBloodManager = LayaBloodManager;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaBloodManager.js.map