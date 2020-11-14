import {Vector3D} from "../../pan3d/engine/math/Vector3D"
import {Camera3D} from "../../pan3d/engine/base/Camera3D"
import {Matrix3D} from "../../pan3d/engine/math/Matrix3D"
import {Vector2D} from "../../pan3d/engine/math/Vector2D"
import {Object3D} from "../../pan3d/engine/base/Object3D"
import {UIMask} from "../../pan3d/engine/ui/base/UIMask"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {ObjectMath} from "../../pan3d/engine/math/Calculation"
import {Rectangle} from "../../pan3d/engine/math/Rectangle"
import {Calculation} from "../../pan3d/engine/math/Calculation"
import {TimeUtil} from "../../pan3d/engine/utils/TimeUtil"
import {MathClass} from "../../pan3d/engine/math/MathClass"

//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
class MaskScene3dLaya extends UIMask {
    public applyAbsolutePoint(): void {

        this.absoluteX = this._x 
        this.absoluteY = this._y 

        this.absoluteWidth = this._width 
        this.absoluteHeight = this._height
        this.applyRenderSize();
  
    }
    public applyRenderSize(): void {
  
        this.renderData[0] = this.absoluteX / Scene_data.stageWidth;
        this.renderData[1] = this.absoluteY / Scene_data.stageHeight;
        this.renderData[2] = this.absoluteWidth /  Scene_data.stageWidth;
        this.renderData[3] = this.absoluteHeight / Scene_data.stageHeight;


    }

}
class GroundPosLaya {
    private static _plantObjectMath:  ObjectMath;
    private static _plantnormal: Vector3D;
    private static _plane_a: Vector3D;
    private static cam3D: Camera3D;
    private static windowRect: Rectangle;
    private static viewMatrx3D: Matrix3D;
    public static getGroundPos($x: number, $y: number, $cam3D: Camera3D, $rect: Rectangle, $m: Matrix3D): Vector3D {
        this.cam3D = $cam3D;
        this.windowRect = $rect;
        this.viewMatrx3D = $m;
        var $ty: number = -0
        if (!this._plantObjectMath) {
            var A:  Vector3D = new  Vector3D(0, $ty, 500);
            var B:  Vector3D = new  Vector3D(-500, $ty, 0);
            var C: Vector3D = new  Vector3D(500, $ty, 0);
            this._plantObjectMath =   Calculation._PanelEquationFromThreePt(A, B, C);
            this._plantnormal = new  Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
            this._plantnormal.normalize();
            this._plane_a = new  Vector3D(A.x, A.y, A.z);
        }
        //计算直线与平面交点
        var line_a: Vector3D = this.mathDisplay2Dto3DWorldPos(new Vector2D($x, $y), 500)
        var line_b: Vector3D = new Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z)
        var crossPoint: Vector3D =  Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
        return crossPoint

    }
    public static mathDisplay2Dto3DWorldPos($point: Vector2D, $depht: number = 300): Vector3D {

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
        var m:  Matrix3D = new Matrix3D;
        m.prependRotation(-this.cam3D.rotationY,  Vector3D.Y_AXIS);
        m.prependRotation(-this.cam3D.rotationX, Vector3D.X_AXIS);

        var uc: Vector3D = this.viewMatrx3D.transformVector(new  Vector3D(500, 0, 500))
        var zScale: number = uc.x / uc.w
        var fw: number = (fovw / 2 / zScale) * $disNum
        var fh: number = (fovh / 2 / zScale) * $disNum

        var tx: number = (($point.x / fovw) * fw) * 2
        var ty: number = (($point.y / fovh) * fh) * 2

        var p: Vector3D = this.gettempPos(new Vector3D(-fw + tx, +fh - ty, $far), m)
        return p

    }
    private static gettempPos(a: Vector3D, m): Vector3D {
        var b = m.transformVector(a)
        b = b.add(new Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z))
        return b
    }
}
class Scene3dLaya3dSprite extends BaseLaya3dSprite {

    protected upFrame(): void {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        TimeUtil.update();

        //这是是移动2D的基础坐标
        Scene_data.focus3D.x = 0
        Scene_data.focus3D.y = 0
        Scene_data.focus3D.z = 0


        Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        var $copyM: Matrix3D = Scene_data.viewMatrx3D.clone();
        var $copyD: number = Scene_data.cam3D.distance
        this.makeNewMatrix()
        Scene_data.context3D._contextSetTest.clear();

        if (this._uiMask) {
            this._uiMask.x = this.x - 0
            this._uiMask.y = this.y - 0
            var renderContext: WebGLRenderingContext = Scene_data.context3D.renderContext;
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
            Scene_data.context3D.renderContext.disable(Scene_data.context3D.renderContext.STENCIL_TEST);
        }

        Scene_data.viewMatrx3D = $copyM;
        Scene_data.cam3D.distance = $copyD
    }
    public getGroundPos($x: number, $y: number): Vector3D {
        var $pos: Vector3D = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D)
        return $pos
    }
    private _windowRect: Rectangle = new Rectangle(0, 0, 512, 512);
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
   
    private focus3d: Object3D = new Object3D;

    private copyViewMatrx3D: Matrix3D;
    public copyCam3d: Camera3D;

    public camDistance: number = 700;
    public camRotationX: number = -35
    public camPositionX:number=0;
    public camPositionY:number=0;
    public camPositionZ:number=0;
    public camRotationY: number = 0;
    public camAotuMove: boolean = true
    
    private makeNewMatrix(): void {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;

   
 

        var fovw: number = Scene_data.stageWidth 
        var fovh: number = Scene_data.stageHeight 
        var sceneViewHW = Math.min(Scene_data.stageWidth, Scene_data.stageHeight )
   

        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(1.76, 1, 10, 2000);
        Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();


        Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;

        this.focus3d.x = this.camPositionX;
        this.focus3d.y = this.camPositionY;
        this.focus3d.z = this.camPositionZ;
        if (this.camAotuMove) {
            this.camRotationY+=0.1
        }
        

        Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Scene_data.stageHeight) * 2, 0)
        MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵

        this.cloneCam3d(Scene_data.cam3D);
    }
    private cloneCam3d($temp: Camera3D): void {
        this.copyCam3d = new Camera3D;
        this.copyCam3d.x = $temp.x
        this.copyCam3d.y = $temp.y
        this.copyCam3d.z = $temp.z
        this.copyCam3d.rotationX = $temp.rotationX
        this.copyCam3d.rotationY = $temp.rotationY
        this.copyCam3d.rotationZ = $temp.rotationZ
    }
}