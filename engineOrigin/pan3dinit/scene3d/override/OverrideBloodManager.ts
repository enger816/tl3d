module scene3d {
    export class ExpTextJumpUiDrawAndRefreash256 extends Pan3d.ExpTextJumpUiDrawAndRefreash {

        protected drawTxtBydigitalAndtext($vo: Pan3d.TextJumpUiVo): number {
            var rec: Pan3d.UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor: string;
            if ($vo.type == Pan3d.TextJumpType.EXPERIENCE) {
                txtcolor = Pan3d.ArtFont.num54
            }
            var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), Pan3d.UIData.publicUi);

            Pan3d. ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);

            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return distion;
        }


     
    }
}
module scene3d {
    export class OverrideBloodManager extends Pan3d.BloodManager {
        public static getInstance(): OverrideBloodManager {
            if (!Pan3d.BloodManager._instance) {
                console.log("一定要到这里--->复写飘字")
                Pan3d. BloodManager._instance = new OverrideBloodManager();
            }
            return <OverrideBloodManager>Pan3d.BloodManager._instance;
        }
        private _jumpText256_256: Pan3d.AlphaUiContianer
        constructor() {
            super()
 
            this._jumpText256_256 = new Pan3d.AlphaUiContianer(scene3d.ExpTextJumpUiDrawAndRefreash256, new Pan3d.Rectangle(0, 0, 256, 256), 2);
            this.uiContianerItem.push(this._jumpText256_256);
        }
        public setExpJump256_256Num($textJumpUiVo: Pan3d.TextJumpUiVo): void {
            this._jumpText256_256.showTemp($textJumpUiVo);
            console.log($textJumpUiVo)
        }

    }
}