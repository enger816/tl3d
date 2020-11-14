export declare class BaseAnim {
    baseNum: number;
    num: number;
    time: number;
    speed: number;
    aSpeed: number;
    beginTime: number;
    lastTime: number;
    baseTime: number;
    protected _isActiva: boolean;
    protected _isDeath: boolean;
    BaseAnim(): void;
    update(t: number): void;
    coreCalculate(): void;
    reset(): void;
    depthReset(): void;
    set data(value: Array<any>);
    get isDeath(): boolean;
    set isDeath(value: boolean);
    getAllNum(allTime: number): void;
}
