import { Vector3D } from "../math/Vector3D";
import { Scene_data } from "../context/Scene_data";
import { Object3D } from "./Object3D";
import { Matrix3D } from "../math/Matrix3D";
import { Rectangle } from "../math/Rectangle";

export class Camera3D extends Object3D {
    public cameraMatrix: Matrix3D;
    
    private _distance: number = 500;
    
    public offset: Vector3D = new Vector3D();

    constructor() {
        super()
        this.cameraMatrix = new Matrix3D;

    }

    public get distance(): number {
        return this._distance;
    }

    public set distance(value: number) {
        this._distance = value;
    }
}