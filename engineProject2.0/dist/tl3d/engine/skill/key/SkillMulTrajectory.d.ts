import { IMulBind } from "../../display3D/interfaces/IBind";
import { SkillTrajectory } from "./SkillTrajectory";
import { Object3D } from "../../base/Object3D";
import { Vector3D } from "../../math/Vector3D";
import { SkillMulPath } from "../path/SkillMulPath";
export declare class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
    activeList: Array<Object3D>;
    currentPosList: Array<Vector3D>;
    pathMul: SkillMulPath;
    update(t: number): void;
    getSunType(): number;
    addToRender(): void;
    setMulPlayData($activeList: Array<Object3D>, $target: Object3D, $removeCallFun: Function, types?: number): void;
    getMulSocket(ary: Array<Vector3D>): void;
}
