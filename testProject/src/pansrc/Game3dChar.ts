class Game3dChar extends layapan.LayaSceneChar {
    constructor() {
        super();
    }
    public moveTopos3d(v: tl3d.Vector3D): void {
        this.moveToPosV2d = v;
        var $selfPos: tl3d.Vector3D = new tl3d.Vector3D(this.px, this.py, this.pz)
        var $nmr: tl3d.Vector3D = this.moveToPosV2d.subtract($selfPos)
        $nmr.normalize();
        this.pRotationY =  Math.atan2($nmr.x, $nmr.z) * 180 / Math.PI;
    }
    private moveToPosV2d: tl3d.Vector3D;
    public updateFrame(t: number): void {

        if (this.moveToPosV2d) {
            var $selfPos: tl3d.Vector3D = new tl3d.Vector3D(this.px, this.py, this.pz)
            var $dis: number = tl3d.Vector3D.distance($selfPos, this.moveToPosV2d)
            if ($dis > 2) {
                var $nmr: tl3d.Vector3D = this.moveToPosV2d.subtract($selfPos)
                $nmr.normalize();
                $nmr.scaleBy(1)
                this.px = $selfPos.x + $nmr.x
                this.pz = $selfPos.z + $nmr.z
                this.play(tl3d.CharAction.WALK);
            } else {
                this.play(tl3d.CharAction.STANAD);
            }
        }
   
        super.updateFrame(t);
    }
}