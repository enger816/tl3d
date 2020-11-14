import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { KeyFrame } from "./KeyFrame";
export declare class TimeLineData {
    dataAry: Array<any>;
    maxFrameNum: number;
    beginTime: number;
    destory(): void;
    setByteData($byte: Pan3dByteArray): void;
    addKeyFrame(num: number): KeyFrame;
    private getByteDataTemp;
}
