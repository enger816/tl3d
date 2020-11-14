import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { Display3DParticle } from "../Display3DParticle";
import { Matrix3D } from "../../math/Matrix3D";
import { EventDispatcher } from "../../events/EventDispatcher";
import { KeyFrame } from "./KeyFrame";
import { Vector3D } from "../../math/Vector3D";
import { TimeLineData } from "./TimeLineData";
export declare class TimeLine extends EventDispatcher {
    private _keyFrameAry;
    maxFrameNum: number;
    private _currentKeyFrame;
    private _currentFrameNum;
    private _time;
    private targetFlag;
    visible: boolean;
    beginTime: number;
    private _selfRotaion;
    private _axisRotaion;
    private _axisMove;
    private _scaleChange;
    private _scaleAnim;
    private _scaleNosie;
    constructor();
    updateMatrix(posMatrix: Matrix3D, $particle: Display3DParticle): void;
    inverAxisRotation($targetMatrix: Matrix3D): void;
    applySelfRotation($targetMatrix: Matrix3D, $axis: Vector3D): void;
    addKeyFrame(num: number): KeyFrame;
    updateTime(t: number): void;
    private getTarget;
    enterKeyFrame(ary: Array<any>, baseTime?: number, baseValueAry?: Array<number>): void;
    reset(): void;
    private isByteData;
    setAllByteInfo($byte: Pan3dByteArray, $allObj: any): void;
    setAllDataInfo($data: TimeLineData): void;
    private setBaseTimeByte;
    private getByteDataTemp;
    /**
     * 获取最大的帧数
     * @return 最大帧数
     *
     */
    getMaxFrame(): number;
    dispose(): void;
}
