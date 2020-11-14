import { IBind } from "../../display3D/interfaces/IBind";
import { Matrix3D } from "../../math/Matrix3D";
import { SkillEffect } from "./SkillEffect";
import { Vector3D } from "../../math/Vector3D";
import { SkillKeyVo } from "../vo/SkillKeyVo";
export declare class SkillBugBind implements IBind {
    bindMatrix: Matrix3D;
    getSocket(socketName: string, resultMatrix: Matrix3D): void;
    getSunType(): number;
}
export declare class SkillFixEffect extends SkillEffect {
    pos: Vector3D;
    rotation: Vector3D;
    outPos: Vector3D;
    hasSocket: boolean;
    socket: string;
    setInfo(obj: SkillKeyVo): void;
    addToRender(): void;
}
