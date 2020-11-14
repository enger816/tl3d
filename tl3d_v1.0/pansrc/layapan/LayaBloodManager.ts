module layapan {
    export class LayaJumpUiDrawAndRefreash256 extends Pan3d.ExpTextJumpUiDrawAndRefreash {

        protected drawTxtBydigitalAndtext($vo: Pan3d.TextJumpUiVo): number {
            var rec: Pan3d.UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 92*1.5;
            var $height = 50 * 1.5;
            var txtcolor: string;
            txtcolor = Pan3d.ArtFont.num54
            var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);

            Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.Rectangle((rec.pixelWitdh - $width )/ 2, 0, $width, $height), Pan3d.UIData.publicUi);
            Pan3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, (rec.pixelWitdh - distion )/ 2,$height);
            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return distion;

        }
        public makeData(): void {
            if (this._data) {
                var vo: Pan3d.TextJumpUiVo = this._data;
                this.pos = vo.pos;
                this.dtime = vo.endtime;
                this.drawTxtBydigitalAndtext(vo);
            }
        }

        public update(): void {
            if (this._data) {
                this.time = Pan3d. TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
                var vo: Pan3d.TextJumpUiVo = this._data;
                var t: number = (this.time - vo.starttime) / 1000 * 60;
                var v2d: Pan3d.Vector2D = this.Vector3DToVector2D(new Pan3d.Vector3D(this.pos.x, this.pos.y, this.pos.z))
                this.ui.width = 256 
                this.ui.height = 256
                this.ui.y = v2d.y - t
                this.ui.x = v2d.x;
                (<Pan3d.AlphaUICompenent>this.ui).alpha = 1
            }
        }
    }

    export class LayaBloodManager extends Pan3d.BloodManager {

        private _jumpText256_256: Pan3d.AlphaUiContianer
        constructor() {
            super()

            this._jumpText256_256 = new Pan3d.AlphaUiContianer(LayaJumpUiDrawAndRefreash256, new Pan3d.Rectangle(0, 0, 256, 256), 2);
            this.uiContianerItem.push(this._jumpText256_256);
        }
        public setExpJump256_256Num($textJumpUiVo: Pan3d.TextJumpUiVo): void {
            this._jumpText256_256.showTemp($textJumpUiVo);
            console.log($textJumpUiVo)
        }

    }
}