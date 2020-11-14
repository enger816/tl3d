namespace tl3d {
    export class ExpTextJumpUiDrawAndRefreash256 extends tl3d.ExpTextJumpUiDrawAndRefreash {

        protected drawTxtBydigitalAndtext($vo: tl3d.TextJumpUiVo): number {
            var rec: tl3d.UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor: string;
            if ($vo.type == tl3d.TextJumpType.EXPERIENCE) {
                txtcolor = tl3d.ArtFont.num54
            }
            var distion = tl3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            tl3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new tl3d.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), tl3d.UIData.publicUi);

            tl3d. ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);

            tl3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return distion;
        }


     
    }

    export class OverrideBloodManager extends tl3d.BloodManager {
        private _jumpText256_256: tl3d.AlphaUiContianer
        constructor() {
            super()
 
            this._jumpText256_256 = new tl3d.AlphaUiContianer(ExpTextJumpUiDrawAndRefreash256, new tl3d.Rectangle(0, 0, 256, 256), 2);
            this.uiContianerItem.push(this._jumpText256_256);
        }
        public setExpJump256_256Num($textJumpUiVo: tl3d.TextJumpUiVo): void {
            this._jumpText256_256.showTemp($textJumpUiVo);
           // console.log($textJumpUiVo)
        }

    }
}