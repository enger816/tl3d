import { Matrix3D } from "../../math/Matrix3D";
import { Vector3D } from "../../math/Vector3D";
import { SkillTrajectory } from "../key/SkillTrajectory";
export declare class SkillPath {
    currentPos: Vector3D;
    currentTargetPos: Vector3D;
    rotationMatrix: Matrix3D;
    time: number;
    /**
    * 是否已经到达
    */
    protected hasReached: boolean;
    endTime: number;
    /**
    * 当前方向
    */
    protected _currentDirect: Vector3D;
    speed: number;
    skillTrajectory: SkillTrajectory;
    endFun: Function;
    bloodFun: Function;
    types: number;
    update(t: number): void;
    setRotationMatrix($newPos: Vector3D): void;
    arrive(): void;
    applyArrive(): void;
    reset(): void;
    add(): void;
    setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D, $bloodFun: Function): void;
}
