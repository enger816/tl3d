import { Vector3D } from "../math/Vector3D";
import { DynamicBaseConstItem } from "./DynamicBaseConstItem";
/**
*
*
* pramaType 0 表示无类型 1表示 float 2表示 vec2 3表示vec3
*/
export declare class ConstItem {
    private _id;
    name: string;
    value: Vector3D;
    vecNum: Float32Array;
    paramName0: string;
    param0Type: number;
    param0Index: number;
    paramName1: string;
    param1Type: number;
    param1Index: number;
    paramName2: string;
    param2Type: number;
    param2Index: number;
    paramName3: string;
    param3Type: number;
    param3Index: number;
    isDynamic: Boolean;
    offset: number;
    set id(value: number);
    get id(): number;
    creat($vc: Float32Array): void;
    setData(obj: any): void;
    setDynamicOffset($dynamic: DynamicBaseConstItem): void;
    setDynamicDirect($ary: Array<number>, $offset: any): void;
    setDynamic($dynamic: DynamicBaseConstItem): void;
}
