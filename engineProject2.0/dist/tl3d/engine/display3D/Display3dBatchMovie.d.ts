import { Display3dMovie } from "./Display3dMovie";
import { MeshData } from "../base/MeshData";
import { Material } from "../material/Material";
import { Object3D } from "../base/Object3D";
import { Vector3D } from "../math/Vector3D";
export declare class Display3dBatchMovie extends Display3dMovie {
    batchNum: number;
    batchPos: Array<Movie3D>;
    constructor();
    set fileScale(value: number);
    addSun($obj: Movie3D): void;
    setVcMatrix($mesh: MeshData): void;
    setLightProbeVc($material: Material): void;
    setVa($mesh: MeshData): void;
    addStage(): void;
    removeStage(): void;
}
export declare class Movie3D extends Object3D {
    private _shadow;
    posData: Array<number>;
    retinueShadowFix: Vector3D;
    target: Vector3D;
    hasReach: boolean;
    set shadow(value: boolean);
    _fileScale: number;
    set fileScale(value: number);
    set scale(value: number);
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    add(): void;
    remove(): void;
}
