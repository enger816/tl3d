import { GC } from "./GC";
export declare class ResCount extends GC {
    protected _useNum: number;
    idleTime: number;
    static GCTime: number;
    get useNum(): number;
    set useNum(n: number);
    clearUseNum(): void;
}
