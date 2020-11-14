export declare class Curve {
    type: number;
    valueVec: Array<Array<number>>;
    private valueV3d;
    begintFrame: number;
    maxFrame: number;
    constructor();
    getValue($t: number): Array<number>;
    setData(obj: any): void;
}
