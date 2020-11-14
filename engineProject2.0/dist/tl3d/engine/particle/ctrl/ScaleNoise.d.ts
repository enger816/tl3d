import { BaseAnim } from "./BaseAnim";
export declare class ScaleNoise extends BaseAnim {
    amplitude: number;
    coreCalculate(): void;
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
    getAllNum(allTime: number): void;
}
