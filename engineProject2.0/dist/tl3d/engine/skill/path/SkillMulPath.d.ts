import { SkillPath } from "./SkillPath";
import { Vector3D } from "../../math/Vector3D";
import { SkillTrajectory } from "../key/SkillTrajectory";
import { Matrix3D } from "../../math/Matrix3D";
export declare class SkillMulPath extends SkillPath {
    private skillMul;
    private currentPosAry;
    private alltime;
    private lastTime;
    private maxV3d;
    private allTimeList;
    resultAry: Array<Array<Array<number>>>;
    setInitCurrentPos(ary: Array<Vector3D>): void;
    private directAry;
    add(): void;
    setAllData(): void;
    update(t: number): void;
    setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D): void;
    applyData(ary: Array<Vector3D>): void;
    reset(): void;
}
