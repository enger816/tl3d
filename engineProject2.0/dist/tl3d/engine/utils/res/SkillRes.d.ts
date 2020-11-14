import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { Vector3D } from "../../math/Vector3D";
import { BaseRes } from "./BaseRes";
export declare class SkillRes extends BaseRes {
    skillUrl: string;
    private _fun;
    meshBatchNum: number;
    data: any;
    constructor();
    load(url: string, $fun: Function): void;
    loadComplete($byte: ArrayBuffer): void;
    private readNext;
    private readData;
    readV3d($byte: Pan3dByteArray): Vector3D;
}
