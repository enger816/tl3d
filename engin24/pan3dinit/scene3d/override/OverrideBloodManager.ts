import {ExpTextJumpUiDrawAndRefreash} from "../../../pan3d/engine/utils/BloodManager"
import {TextJumpUiVo} from "../../../pan3d/engine/utils/BloodManager"
import {UIRectangle} from "../../../pan3d/engine/ui/base/UIRectangle"
import {UIManager} from "../../../pan3d/engine/ui/UIManager"
import {TextJumpType} from "../../../pan3d/engine/utils/BloodManager"
import {ArtFont} from "../../../pan3d/engine/utils/ArtFont"
import {UiDraw} from "../../../pan3d/engine/ui/base/UIData"
import {Rectangle} from "../../../pan3d/engine/math/Rectangle"
import {UIData} from "../../../pan3d/engine/ui/base/UIData"
import {TextureManager} from "../../../pan3d/engine/material/TextureManager"
import {BloodManager} from "../../../pan3d/engine/utils/BloodManager"
import {AlphaUiContianer} from "../../../pan3d/engine/ui/compenent/AlphaUiContianer"

    export class ExpTextJumpUiDrawAndRefreash256 extends ExpTextJumpUiDrawAndRefreash {

        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number {
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor: string;
            if ($vo.type == TextJumpType.EXPERIENCE) {
                txtcolor = ArtFont.num54
            }
            var distion = ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), UIData.publicUi);

             ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);

            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return distion;
        }
    }

    export class OverrideBloodManager extends BloodManager {
        public static getInstance(): OverrideBloodManager {
            if (!BloodManager._instance) {
                console.log("一定要到这里--->复写飘字")
                 BloodManager._instance = new OverrideBloodManager();
            }
            return <OverrideBloodManager>BloodManager._instance;
        }
        private _jumpText256_256: AlphaUiContianer
        constructor() {
            super()
 
            this._jumpText256_256 = new AlphaUiContianer(ExpTextJumpUiDrawAndRefreash256, new Rectangle(0, 0, 256, 256), 2);
            this.uiContianerItem.push(this._jumpText256_256);
        }
        public setExpJump256_256Num($textJumpUiVo: TextJumpUiVo): void {
            this._jumpText256_256.showTemp($textJumpUiVo);
            console.log($textJumpUiVo)
        }

    }
