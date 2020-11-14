import {Matrix3D} from "../../pan3d/engine/math/Matrix3D"
import {Vector3D} from "../../pan3d/engine/math/Vector3D"
import {Object3D} from "../../pan3d/engine/base/Object3D"
import {Camera3D} from "../../pan3d/engine/base/Camera3D"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {TimeUtil} from "../../pan3d/engine/utils/TimeUtil"
import {Rectangle} from "../../pan3d/engine/math/Rectangle"
import {MathClass} from "../../pan3d/engine/math/MathClass"
class Base3dSceneLayer extends Base2dSceneLayer {

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
            Base3dSceneLayer.maskeLevel++
            this._uiMask.level = Base3dSceneLayer.maskeLevel;
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
    public camRotationY: number = 0;
    public camPositionX:number=0;
    public camPositionY:number=0;
    public camPositionZ:number=0;
	public camViewLH: number = 1.25  //镜头透视系数  1-3. 修变这个值，需要配合镜头距离
    public camFar:number=2000; //镜头长短
    private makeNewMatrix(): void {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;

   
        var sceneViewHW = Math.max(this._windowRect.width, this._windowRect.height)

        var fovw: number = Scene_data.stageWidth 
        var fovh: number = Scene_data.stageHeight 
        sceneViewHW = Math.max(fovw, fovh)

        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, this.camFar);
        Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();


        Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        this.focus3d.x = this.camPositionX;
        this.focus3d.y = this.camPositionY;
        this.focus3d.z = this.camPositionZ;
        // Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Scene_data.stageHeight) * 2, 0)
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
