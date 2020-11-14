class Game3dChar extends layapan.LayaSceneChar {
    constructor() {
        super();
    }
    public moveTopos3d(v: Pan3d.Vector3D): void {
        this.moveToPosV2d = v;
        var $selfPos: Pan3d.Vector3D = new Pan3d.Vector3D(this.px, this.py, this.pz)
        var $nmr: Pan3d.Vector3D = this.moveToPosV2d.subtract($selfPos)
        $nmr.normalize();
        this.pRotationY =  Math.atan2($nmr.x, $nmr.z) * 180 / Math.PI;
    }
    private moveToPosV2d: Pan3d.Vector3D;
    public updateFrame(t: number): void {

        if (this.moveToPosV2d) {
            var $selfPos: Pan3d.Vector3D = new Pan3d.Vector3D(this.px, this.py, this.pz)
            var $dis: number = Pan3d.Vector3D.distance($selfPos, this.moveToPosV2d)
            if ($dis > 2) {
                var $nmr: Pan3d.Vector3D = this.moveToPosV2d.subtract($selfPos)
                $nmr.normalize();
                $nmr.scaleBy(1)
                this.px = $selfPos.x + $nmr.x
                this.pz = $selfPos.z + $nmr.z
                this.play(Pan3d.CharAction.WALK);
            } else {
                this.play(Pan3d.CharAction.STANAD);
            }
        }
   
        super.updateFrame(t);
    }
}