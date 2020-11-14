class Game2dChar extends layapan.LayaSceneChar {
    constructor() {
        super();
    }
    public runspeed: number = 3;
    public movetocb: Function
    public moveokcb: Function
    public moveEndAction: string = tl3d.CharAction.STANAD
    public moveTopos(v: tl3d.Vector2D): void {
        this.moveToPosV2d = v;
        var $nmr: tl3d.Vector2D = this.pixelPos.sub(this.moveToPosV2d);
        this.pRotationY = 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
    }
    public set2dPos($x: number, $y: number): void {
        super.set2dPos($x, $y);
        this.pixelPos = new tl3d.Vector2D($x, $y)
    }

    public stopMove(stopPos?: tl3d.Vector2D) {
        if (this.moveToPosV2d) {
            this.moveToPosV2d = null;
            if (this.moveEndAction) {
                this.play(this.moveEndAction);
            }
            if (stopPos) {
                super.set2dPos(stopPos.x, stopPos.y);
            }
        }
    }

    public pixelPos: tl3d.Vector2D
    private moveToPosV2d: tl3d.Vector2D;
    public updateFrame(t: number): void {
        if (this.moveToPosV2d) {
            var $dis: number = tl3d.Vector2D.distance(this.pixelPos, this.moveToPosV2d)
            if ($dis > 10) {
                var $nmr: tl3d.Vector2D = this.pixelPos.sub(this.moveToPosV2d);
                $nmr.normalize()
                $nmr.scaleBy(this.runspeed)
                this.pixelPos.x += $nmr.x
                this.pixelPos.y += $nmr.y
                super.set2dPos(this.pixelPos.x, this.pixelPos.y);
                // this.play(tl3d.CharAction.WALK);
                if (this.movetocb) {
                    this.movetocb(this.pixelPos);
                }
            } else {
                super.set2dPos(this.moveToPosV2d.x, this.moveToPosV2d.y);
                this.moveToPosV2d = null;
                // this.play(tl3d.CharAction.STANAD);
                if (this.moveEndAction) {
                    this.play(this.moveEndAction);
                }
                //移动回调
                if (this.moveokcb)
                    this.moveokcb();
            }
        }
        super.updateFrame(t);
        if (!this._partDic) return;
        var dicAry: Array<tl3d.CombineParticle> = this._partDic["mesh"];
        for (var i: number = 0; dicAry && i < dicAry.length; i++) {
            if (dicAry[i].scaleX != this.scale) {
                dicAry[i].scaleX = this.scale
                dicAry[i].scaleY = this.scale
                dicAry[i].scaleZ = this.scale
            }
        }
    }
}