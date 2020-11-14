import { Display3D } from "./Display3D";
import { Shadow } from "../utils/shadow/Shadow";
export declare class Display3dShadow extends Display3D {
    static texture: WebGLTexture;
    shadowList: Array<Shadow>;
    needUpdate: boolean;
    private posProLocation;
    constructor();
    addShadow($shdow: Shadow): void;
    removeShadow($shdow: Shadow): void;
    stateChage(): void;
    hasIdle(): boolean;
    applyObjData(): void;
    private locationFloat32;
    update(): void;
}
