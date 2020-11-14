import {Vector3D} from "../../pan3d/engine/math/Vector3D"
import {LayaSceneChar} from "./layapan/LayaSceneChar"
import {CharAction} from "../../pan3d/baseprite/CharAction"
class Game3dChar extends layapan.LayaSceneChar {
    constructor() {
        super();
    }
    public moveTopos3d(v: Vector3D): void {
        this.moveToPosV2d = v;
        var $selfPos: Vector3D = new Vector3D(this.px, this.py, this.pz)
        var $nmr: Vector3D = this.moveToPosV2d.subtract($selfPos)
        $nmr.normalize();
        this.pRotationY =  Math.atan2($nmr.x, $nmr.z) * 180 / Math.PI;
    }
    private moveToPosV2d: Vector3D;
    public updateFrame(t: number): void {

        if (this.moveToPosV2d) {
            var $selfPos: Vector3D = new Vector3D(this.px, this.py, this.pz)
            var $dis: number = Vector3D.distance($selfPos, this.moveToPosV2d)
            if ($dis > 2) {
                var $nmr: Vector3D = this.moveToPosV2d.subtract($selfPos)
                $nmr.normalize();
                $nmr.scaleBy(1)
                this.px = $selfPos.x + $nmr.x
                this.pz = $selfPos.z + $nmr.z
                this.play(CharAction.WALK);
            } else {
                this.play(CharAction.STANAD);
            }
        }
   
        super.updateFrame(t);
    }
}