import { Vector3D } from "./Vector3D";
import { Matrix3D } from "./Matrix3D";
import { Scene_data } from "../context/Scene_data";
import { Rectangle } from "./Rectangle";
import { Vector2D } from "./Vector2D";
import { Camera3D } from "../base/Camera3D";
import { Object3D } from "../base/Object3D";

export class MathClass {


    constructor() {


    }


    static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array {


        //var $dis: number = 1000;

        // _Cam.update();

        //计算出相机的位置
        var $m: Matrix3D = new Matrix3D;
        $m.appendRotation(-_focus_3d.rotationX, Vector3D.X_AXIS);
        $m.appendTranslation(_focus_3d.x, _focus_3d.y, _focus_3d.z)
        var $p: Vector3D = $m.transformVector(new Vector3D(0, 0, -_Cam.distance))
        _Cam.x = $p.x
        _Cam.y = $p.y
        _Cam.z = $p.z

        _Cam.rotationX = _focus_3d.rotationX;

        //重置相机矩阵
        _Cam.cameraMatrix.identity();
        _Cam.cameraMatrix.prependTranslation(0, 0, _Cam.distance);
        _Cam.cameraMatrix.prependRotation(_Cam.rotationX, Vector3D.X_AXIS);
        _Cam.cameraMatrix.prependTranslation(-_focus_3d.x, -_focus_3d.y, -_focus_3d.z);
        
        _Cam.cameraMatrix.setClipPlan(999,1)

        this.updateVp();
        return _Cam.cameraMatrix.m
    }

    public static updateVp(): void {
        Scene_data.vpMatrix.identity();
        Scene_data.vpMatrix.prepend(Scene_data.viewMatrx3D);
        Scene_data.vpMatrix.prepend(Scene_data.cam3D.cameraMatrix);

    }

    //获取透视空间包围盒;
    static viewBoxVecItem: Array<Vector3D>;

    static GetViewHitBoxDataCopy($dis: number): void {


        if (!this.viewBoxVecItem) {
            this.viewBoxVecItem = new Array;
            this.viewBoxVecItem.push(new Vector3D());
            this.viewBoxVecItem.push(new Vector3D());
            this.viewBoxVecItem.push(new Vector3D());
            this.viewBoxVecItem.push(new Vector3D());

        }
        var $disNum: number = $dis / (Scene_data.sceneViewHW / 2)

        var $far: number = Scene_data.sceneViewHW / 2 * $disNum
        var fovw: number = Scene_data.stageWidth
        var fovh: number = Scene_data.stageHeight
        var m: Matrix3D = new Matrix3D;
        m.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
        m.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);

        var uc: Vector3D = Scene_data.viewMatrx3D.transformVector(new Vector3D(500, 0, 500))
        var zScale: number = uc.x / uc.w
        var ss: number = 0.8;
        var fw: number = (fovw / 2 / zScale) * $disNum * ss
        var fh: number = (fovh / 2 / zScale) * $disNum * ss



        this.viewBoxVecItem[0] = this.gettempPos(new Vector3D(-fw, -fh, $far), m);
        this.viewBoxVecItem[1] = this.gettempPos(new Vector3D(+fw, -fh, $far), m);
        this.viewBoxVecItem[2] = this.gettempPos(new Vector3D(+fw, +fh, $far), m);
        this.viewBoxVecItem[3] = this.gettempPos(new Vector3D(-fw, +fh, $far), m);


    }

    private static gettempPos(a: Vector3D, m): Vector3D {

        var b = m.transformVector(a)
        b = b.add(new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z))
        return b
    }

    static math_distance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1))
    }
}