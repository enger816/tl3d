import { Vector3D } from "../math/Vector3D";
export declare class LightProbeManager {
    private static _instance;
    static getInstance(): LightProbeManager;
    private _dataAry;
    private _defaultVec;
    constructor();
    setLightProbeData($arr: Array<any>): void;
    clear(): void;
    getData($pos: Vector3D): Array<Vector3D>;
    testPoint(lightArea: any, $pos: Vector3D): Boolean;
    getResultData(ary: Array<any>, x: number, z: number, y: number, bNum: Number, $pos: Vector3D): Array<Vector3D>;
}
