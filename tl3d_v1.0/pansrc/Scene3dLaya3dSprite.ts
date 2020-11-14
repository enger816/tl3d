
//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
class MaskScene3dLaya extends Pan3d.UIMask {
    public applyAbsolutePoint(): void {

        this.absoluteX = this._x 
        this.absoluteY = this._y 

        this.absoluteWidth = this._width 
        this.absoluteHeight = this._height
        this.applyRenderSize();
  
    }
    public applyRenderSize(): void {
  
        this.renderData[0] = this.absoluteX / Pan3d.Scene_data.stageWidth;
        this.renderData[1] = this.absoluteY / Pan3d.Scene_data.stageHeight;
        this.renderData[2] = this.absoluteWidth / Pan3d. Scene_data.stageWidth;
        this.renderData[3] = this.absoluteHeight / Pan3d.Scene_data.stageHeight;


    }

}
class GroundPosLaya {
    private static _plantObjectMath: Pan3d. ObjectMath;
    private static _plantnormal: Pan3d.Vector3D;
    private static _plane_a: Pan3d.Vector3D;
    private static cam3D: Pan3d.Camera3D;
    private static windowRect: Pan3d.Rectangle;
    private static viewMatrx3D: Pan3d.Matrix3D;
    public static getGroundPos($x: number, $y: number, $cam3D: Pan3d.Camera3D, $rect: Pan3d.Rectangle, $m: Pan3d.Matrix3D): Pan3d.Vector3D {
        this.cam3D = $cam3D;
        this.windowRect = $rect;
        this.viewMatrx3D = $m;
        var $ty: number = -0
        if (!this._plantObjectMath) {
            var A: Pan3d. Vector3D = new Pan3d. Vector3D(0, $ty, 500);
            var B: Pan3d. Vector3D = new Pan3d. Vector3D(-500, $ty, 0);
            var C: Pan3d.Vector3D = new Pan3d. Vector3D(500, $ty, 0);
            this._plantObjectMath = Pan3d.  Calculation._PanelEquationFromThreePt(A, B, C);
            this._plantnormal = new Pan3d. Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
            this._plantnormal.normalize();
            this._plane_a = new Pan3d. Vector3D(A.x, A.y, A.z);
        }
        //计算直线与平面交点
        var line_a: Pan3d.Vector3D = this.mathDisplay2Dto3DWorldPos(new Pan3d.Vector2D($x, $y), 500)
        var line_b: Pan3d.Vector3D = new Pan3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z)
        var crossPoint: Pan3d.Vector3D = Pan3d. Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
        return crossPoint

    }
    public static mathDisplay2Dto3DWorldPos($point: Pan3d.Vector2D, $depht: number = 300): Pan3d.Vector3D {

        var sceneViewHW: number;
        if (Pan3d.Scene_data.stageWidth > Pan3d.Scene_data.stageHeight) {
             sceneViewHW = Math.max(Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight)
        } else {
             sceneViewHW = Math.min(Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight)
        }

        var $disNum: number = $depht / (sceneViewHW / 2)

        var $far: number = sceneViewHW / 2 * $disNum
        var fovw: number = this.windowRect.width
        var fovh: number = this.windowRect.height
        var m: Pan3d. Matrix3D = new Pan3d.Matrix3D;
        m.prependRotation(-this.cam3D.rotationY, Pan3d. Vector3D.Y_AXIS);
        m.prependRotation(-this.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);

        var uc: Pan3d.Vector3D = this.viewMatrx3D.transformVector(new Pan3d. Vector3D(500, 0, 500))
        var zScale: number = uc.x / uc.w
        var fw: number = (fovw / 2 / zScale) * $disNum
        var fh: number = (fovh / 2 / zScale) * $disNum

        var tx: number = (($point.x / fovw) * fw) * 2
        var ty: number = (($point.y / fovh) * fh) * 2

        var p: Pan3d.Vector3D = this.gettempPos(new Pan3d.Vector3D(-fw + tx, +fh - ty, $far), m)
        return p

    }
    private static gettempPos(a: Pan3d.Vector3D, m): Pan3d.Vector3D {
        var b = m.transformVector(a)
        b = b.add(new Pan3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z))
        return b
    }
}
class Scene3dLaya3dSprite extends BaseLaya3dSprite {

    protected upFrame(): void {
        Pan3d.Scene_data.context3D.setWriteDepth(true);
        Pan3d.Scene_data.context3D.setDepthTest(true);
        Pan3d.TimeUtil.update();

        //这是是移动2D的基础坐标
        Pan3d.Scene_data.focus3D.x = 0
        Pan3d.Scene_data.focus3D.y = 0
        Pan3d.Scene_data.focus3D.z = 0


        Pan3d.Scene_data.context3D.renderContext.clear(Pan3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        var $copyM: Pan3d.Matrix3D = Pan3d.Scene_data.viewMatrx3D.clone();
        var $copyD: number = Pan3d.Scene_data.cam3D.distance
        this.makeNewMatrix()
        Pan3d.Scene_data.context3D._contextSetTest.clear();

        if (this._uiMask) {
            this._uiMask.x = this.x - 0
            this._uiMask.y = this.y - 0
            var renderContext: WebGLRenderingContext = Pan3d.Scene_data.context3D.renderContext;
            renderContext.enable(renderContext.STENCIL_TEST);
            renderContext.stencilMask(0xFF);
            renderContext.stencilFunc(renderContext.NEVER, this._uiMask.level, 0xFF);
            renderContext.stencilOp(renderContext.REPLACE, renderContext.REPLACE, renderContext.REPLACE);
            this._uiMask.update()
            renderContext.stencilFunc(renderContext.LESS, this._uiMask.level - 1, 0xFF);
            renderContext.stencilOp(renderContext.KEEP, renderContext.KEEP, renderContext.KEEP);

         //   this._uiMask.update()
        } 
              
        this.scene.upFrame();
        if (this._uiMask) {
            Pan3d.Scene_data.context3D.renderContext.disable(Pan3d.Scene_data.context3D.renderContext.STENCIL_TEST);
        }

        Pan3d.Scene_data.viewMatrx3D = $copyM;
        Pan3d.Scene_data.cam3D.distance = $copyD
    }
    public getGroundPos($x: number, $y: number): Pan3d.Vector3D {
        var $pos: Pan3d.Vector3D = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D)
        return $pos
    }
    private _windowRect: Pan3d.Rectangle = new Pan3d.Rectangle(0, 0, 512, 512);
    private _uiMask: MaskScene3dLaya;
    private static maskeLevel: number=2
    public addMaskUi($w: number, $h: number): void {
        if (!this._uiMask) {
            this._uiMask = new MaskScene3dLaya();
            Scene3dLaya3dSprite.maskeLevel++
            this._uiMask.level = Scene3dLaya3dSprite.maskeLevel;
        }
        this._windowRect.width = $w
        this._windowRect.height = $h
        this._uiMask.width = this._windowRect.width;
        this._uiMask.height = this._windowRect.height;
    }
   
    private focus3d: Pan3d.Object3D = new Pan3d.Object3D;

    private copyViewMatrx3D: Pan3d.Matrix3D;
    public copyCam3d: Pan3d.Camera3D;

    public camDistance: number = 700;
    public camRotationX: number = -35
    public camRotationY: number = 0;
    public camViewLH: number = 1.76
    public camAotuMove: boolean = true
    
    private makeNewMatrix(): void {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;

   
 

        var fovw: number = Pan3d.Scene_data.stageWidth 
        var fovh: number = Pan3d.Scene_data.stageHeight 
        var sceneViewHW = Math.min(Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight )
   

        Pan3d.Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, 2000);
        Pan3d.Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Pan3d.Scene_data.viewMatrx3D.clone();


        Pan3d.Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        if (this.camAotuMove) {
            this.camRotationY+=0.1
        }
        

        Pan3d.Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Pan3d.Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Pan3d.Scene_data.stageHeight) * 2, 0)
        Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵

        this.cloneCam3d(Pan3d.Scene_data.cam3D);
    }
    private cloneCam3d($temp: Pan3d.Camera3D): void {
        this.copyCam3d = new Pan3d.Camera3D;
        this.copyCam3d.x = $temp.x
        this.copyCam3d.y = $temp.y
        this.copyCam3d.z = $temp.z
        this.copyCam3d.rotationX = $temp.rotationX
        this.copyCam3d.rotationY = $temp.rotationY
        this.copyCam3d.rotationZ = $temp.rotationZ
    }
}