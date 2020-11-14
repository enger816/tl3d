import { ConstItem } from "./ConstItem";
export declare class DynamicBaseConstItem {
    target: ConstItem;
    paramName: string;
    currentValue: Array<number>;
    targetOffset: number;
    protected _type: number;
    update(t?: number): void;
    get type(): number;
    set type(value: number);
    setTargetInfo($target: ConstItem, $paramName: string, $type: number): void;
    setCurrentVal(...args: any[]): void;
}
