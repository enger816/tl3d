import { BaseAnim } from "./BaseAnim";
export declare class ScaleChange extends BaseAnim {
    maxNum: number;
    minNum: number;
    constructor();
    coreCalculate(): void;
    /**
     *
     * @param value
     *
     */
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
    getAllNum(allTime: number): void;
    reset(): void;
    depthReset(): void;
}
