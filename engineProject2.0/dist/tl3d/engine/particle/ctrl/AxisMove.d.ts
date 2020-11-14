import { BaseAnim } from "./BaseAnim";
import { Vector3D } from "../../math/Vector3D";
export declare class AxisMove extends BaseAnim {
    axis: Vector3D;
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
}
