import { DynamicBaseConstItem } from "./DynamicBaseConstItem";
import { Curve } from "../utils/curves/Curve";
export declare class DynamicConstItem extends DynamicBaseConstItem {
    curve: Curve;
    update(t?: number): void;
    set type(value: number);
}
