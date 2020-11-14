import {Vector2D} from "../../pan3d/engine/math/Vector2D"
import {LayaSceneChar} from "./layapan/LayaSceneChar"
import {CharAction} from "../../pan3d/baseprite/CharAction"
import {CombineParticle} from "../../pan3d/engine/particle/CombineParticle"
class Game2dChar extends layapan.LayaSceneChar{
    constructor() {
        super();
    }
    public moveTopos(v: Vector2D): void {
        this.moveToPosV2d = v;
        var $nmr: Vector2D = this.pixelPos.sub(this.moveToPosV2d);
        this.pRotationY  = 180-Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
    }
    public set2dPos($x: number, $y: number): void {
        super.set2dPos($x, $y);
        this.pixelPos = new Vector2D($x, $y)
    }
    private pixelPos: Vector2D
    private moveToPosV2d: Vector2D;
    public updateFrame(t: number): void {
        if (this.moveToPosV2d) {
            var $dis: number = Vector2D.distance(this.pixelPos, this.moveToPosV2d)
            if ($dis > 10) {
                var $nmr: Vector2D = this.pixelPos.sub(this.moveToPosV2d);
                $nmr.normalize()
                $nmr.scaleBy(3)
                this.pixelPos.x += $nmr.x
                this.pixelPos.y += $nmr.y
                super.set2dPos(this.pixelPos.x, this.pixelPos.y);
                this.play(CharAction.WALK);
            } else {
                this.play(CharAction.STANAD);
            }
        }
        super.updateFrame(t);

        var dicAry: Array<CombineParticle> = this._partDic["mesh"];
        for (var i: number = 0; dicAry && i < dicAry.length; i++) {
            if (dicAry[i].scaleX != this.scale) {
                dicAry[i].scaleX = this.scale
                dicAry[i].scaleY = this.scale
                dicAry[i].scaleZ = this.scale
            }
        }
    }
}