import { Matrix3D } from "../math/Matrix3D";
import { Pan3dByteArray } from "../math/Pan3dByteArray";
import { AnimData } from "../vo/skinanim/AnimData";
export declare class AnimManager {
    private _dic;
    constructor();
    private static _instance;
    static getInstance(): AnimManager;
    getAnimData($url: string, $fun: Function): void;
    getAnimDataImmediate($url: string): AnimData;
    clearAnim($url: string): void;
    readData(byte: Pan3dByteArray, $url: any): AnimData;
    private readFrameData;
    private readFrameTypeData;
    private processFrame;
    frameToBone(frameData: Array<number>, hierarchyList: Array<ObjectBone>): Array<ObjectBaseBone>;
    private setFrameToMatrix;
    private getW;
}
declare class ObjectBaseBone {
    father: number;
    name: string;
    tx: number;
    ty: number;
    tz: number;
    tw: number;
    qx: number;
    qy: number;
    qz: number;
    qw: number;
}
declare class ObjectBone extends ObjectBaseBone {
    changtype: number;
    startIndex: number;
    matrix: Matrix3D;
    clone(): ObjectBone;
}
export {};
