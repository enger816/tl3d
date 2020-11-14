import Scene_data=tl3d.Scene_data
export class GroundPosLaya {
    private static _plantObjectMath: tl3d. ObjectMath;
    private static _plantnormal: tl3d.Vector3D;
    private static _plane_a: tl3d.Vector3D;
    private static cam3D: tl3d.Camera3D;
    private static windowRect: tl3d.Rectangle;
    private static viewMatrx3D: tl3d.Matrix3D;
    public static getGroundPos($x: number, $y: number, $cam3D: tl3d.Camera3D, $rect: tl3d.Rectangle, $m: tl3d.Matrix3D): tl3d.Vector3D {
        this.cam3D = $cam3D;
        this.windowRect = $rect;
        this.viewMatrx3D = $m;
        var $ty: number = -0
        if (!this._plantObjectMath) {
            var A: tl3d. Vector3D = new tl3d. Vector3D(0, $ty, 500);
            var B: tl3d. Vector3D = new tl3d. Vector3D(-500, $ty, 0);
            var C: tl3d.Vector3D = new tl3d. Vector3D(500, $ty, 0);
            this._plantObjectMath = tl3d.  Calculation._PanelEquationFromThreePt(A, B, C);
            this._plantnormal = new tl3d. Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
            this._plantnormal.normalize();
            this._plane_a = new tl3d. Vector3D(A.x, A.y, A.z);
        }
        //计算直线与平面交点
        var line_a: tl3d.Vector3D = this.mathDisplay2Dto3DWorldPos(new tl3d.Vector2D($x, $y), 500)
        var line_b: tl3d.Vector3D = new tl3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z)
        var crossPoint: tl3d.Vector3D = tl3d. Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
        return crossPoint

    }
    public static mathDisplay2Dto3DWorldPos($point: tl3d.Vector2D, $depht: number = 300): tl3d.Vector3D {

        var sceneViewHW: number;
        if (Scene_data.stageWidth > Scene_data.stageHeight) {
             sceneViewHW = Math.max(Scene_data.stageWidth, Scene_data.stageHeight)
        } else {
             sceneViewHW = Math.min(Scene_data.stageWidth, Scene_data.stageHeight)
        }

        var $disNum: number = $depht / (sceneViewHW / 2)

        var $far: number = sceneViewHW / 2 * $disNum
        var fovw: number = this.windowRect.width
        var fovh: number = this.windowRect.height
        var m: tl3d. Matrix3D = new tl3d.Matrix3D;
        m.prependRotation(-this.cam3D.rotationY, tl3d. Vector3D.Y_AXIS);
        m.prependRotation(-this.cam3D.rotationX, tl3d.Vector3D.X_AXIS);

        var uc: tl3d.Vector3D = this.viewMatrx3D.transformVector(new tl3d. Vector3D(500, 0, 500))
        var zScale: number = uc.x / uc.w
        var fw: number = (fovw / 2 / zScale) * $disNum
        var fh: number = (fovh / 2 / zScale) * $disNum

        var tx: number = (($point.x / fovw) * fw) * 2
        var ty: number = (($point.y / fovh) * fh) * 2

        var p: tl3d.Vector3D = this.gettempPos(new tl3d.Vector3D(-fw + tx, +fh - ty, $far), m)
        return p

    }
    private static gettempPos(a: tl3d.Vector3D, m): tl3d.Vector3D {
        var b = m.transformVector(a)
        b = b.add(new tl3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z))
        return b
    }
}
// export class Scene3dLaya3dSprite extends tl3d.BaseLaya3dSprite {

//     protected upFrame(): void {
//         Scene_data.context3D.setWriteDepth(true);
//         Scene_data.context3D.setDepthTest(true);
//         tl3d.TimeUtil.update();

//         //这是是移动2D的基础坐标
//         Scene_data.focus3D.x = 0
//         Scene_data.focus3D.y = 0
//         Scene_data.focus3D.z = 0


//         Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
//         var $copyM: tl3d.Matrix3D = Scene_data.viewMatrx3D.clone();
//         var $copyD: number = Scene_data.cam3D.distance
//         this.makeNewMatrix()
//         Scene_data.context3D._contextSetTest.clear();
  

//         Scene_data.viewMatrx3D = $copyM;
//         Scene_data.cam3D.distance = $copyD
//     }
//     public getGroundPos($x: number, $y: number): tl3d.Vector3D {
//         var $pos: tl3d.Vector3D = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D)
//         return $pos
//     }
//     private _windowRect: tl3d.Rectangle = new tl3d.Rectangle(0, 0, 512, 512);
    
//     private focus3d: tl3d.Object3D = new tl3d.Object3D;

//     private copyViewMatrx3D: tl3d.Matrix3D;
//     public copyCam3d: tl3d.Camera3D;

//     public camDistance: number = 700;
//     public camRotationX: number = -35
//     public camRotationY: number = 0;
//     public camViewLH: number = 1.76
//     public camAotuMove: boolean = true
    
//     private makeNewMatrix(): void {
//         this._windowRect.x = this.x + this._windowRect.width / 2;
//         this._windowRect.y = this.y + this._windowRect.height / 2;

   
 

//         var fovw: number = Scene_data.stageWidth 
//         var fovh: number = Scene_data.stageHeight 
//         var sceneViewHW = Math.min(Scene_data.stageWidth, Scene_data.stageHeight )
   

//         Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, 2000);
//         Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
//         this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();


//         Scene_data.cam3D.distance = this.camDistance;
//         this.focus3d.rotationX = this.camRotationX;
//         this.focus3d.rotationY = this.camRotationY;
//         if (this.camAotuMove) {
//             this.camRotationY+=0.1
//         }
        

//         Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Scene_data.stageHeight) * 2, 0)
//         tl3d.MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵

//         this.cloneCam3d(Scene_data.cam3D);
//     }
//     private cloneCam3d($temp: tl3d.Camera3D): void {
//         this.copyCam3d = new tl3d.Camera3D;
//         this.copyCam3d.x = $temp.x
//         this.copyCam3d.y = $temp.y
//         this.copyCam3d.z = $temp.z
//         this.copyCam3d.rotationX = $temp.rotationX
//         this.copyCam3d.rotationY = $temp.rotationY
//         this.copyCam3d.rotationZ = $temp.rotationZ
//     }
// }