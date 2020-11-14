import { Vector3D } from "../../math/Vector3D";
import { SkillPath } from "./SkillPath";
export declare class SkillSinPath extends SkillPath {
    private alltime;
    private lastTime;
    protected basePos: Vector3D;
    add(): void;
    update(t: number): void;
    setApplyPos($offset: Vector3D): void;
    getOffset(ypos: number): Vector3D;
    reset(): void;
}
export declare class SkillCosPath extends SkillSinPath {
    getOffset(ypos: number): Vector3D;
}
