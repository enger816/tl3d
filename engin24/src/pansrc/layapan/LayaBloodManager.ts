import {ui} from "../../../../../zhuilong/src/ui/layaMaxUI"
import {Vector2D} from "../../../pan3d/engine/math/Vector2D"
import {Vector3D} from "../../../pan3d/engine/math/Vector3D"
import {ExpTextJumpUiDrawAndRefreash} from "../../../pan3d/engine/utils/BloodManager"
import {TextJumpUiVo} from "../../../pan3d/engine/utils/BloodManager"
import {UIRectangle} from "../../../pan3d/engine/ui/base/UIRectangle"
import {UIManager} from "../../../pan3d/engine/ui/UIManager"
import {ArtFont} from "../../../pan3d/engine/utils/ArtFont"
import {UiDraw} from "../../../pan3d/engine/ui/base/UIData"
import {Rectangle} from "../../../pan3d/engine/math/Rectangle"
import {UIData} from "../../../pan3d/engine/ui/base/UIData"
import {TextureManager} from "../../../pan3d/engine/material/TextureManager"
import {TimeUtil} from "../../../pan3d/engine/utils/TimeUtil"
import {AlphaUICompenent} from "../../../pan3d/engine/ui/compenent/AlphaUiContianer"
import {BloodManager} from "../../../pan3d/engine/utils/BloodManager"
import {AlphaUiContianer} from "../../../pan3d/engine/ui/compenent/AlphaUiContianer"

    export class LayaJumpUiDrawAndRefreash256 extends ExpTextJumpUiDrawAndRefreash {

        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number {
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 92*1.5;
            var $height = 50 * 1.5;
            var txtcolor: string;
            txtcolor = ArtFont.num54
            var distion = ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);

            UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Rectangle((rec.pixelWitdh - $width )/ 2, 0, $width, $height), UIData.publicUi);
            ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, (rec.pixelWitdh - distion )/ 2,$height);
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return distion;

        }
        public makeData(): void {
            if (this._data) {
                var vo: TextJumpUiVo = this._data;
                this.pos = vo.pos;
                this.dtime = vo.endtime;
                this.drawTxtBydigitalAndtext(vo);
            }
        }

        public update(): void {
            if (this._data) {
                this.time =  TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
                var vo: TextJumpUiVo = this._data;
                var t: number = (this.time - vo.starttime) / 1000 * 60;
                var v2d: Vector2D = this.Vector3DToVector2D(new Vector3D(this.pos.x, this.pos.y, this.pos.z))
                this.ui.width = 256 
                this.ui.height = 256
                this.ui.y = v2d.y - t
                this.ui.x = v2d.x;
                (<AlphaUICompenent>this.ui).alpha = 1
            }
        }
    }

    export class LayaBloodManager extends BloodManager {

        private _jumpText256_256: AlphaUiContianer
        constructor() {
            super()

            this._jumpText256_256 = new AlphaUiContianer(LayaJumpUiDrawAndRefreash256, new Rectangle(0, 0, 256, 256), 2);
            this.uiContianerItem.push(this._jumpText256_256);
        }
        public setExpJump256_256Num($textJumpUiVo: TextJumpUiVo): void {
            this._jumpText256_256.showTemp($textJumpUiVo);
            console.log($textJumpUiVo)
        }

    }
