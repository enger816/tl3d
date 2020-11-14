import { Shader3D } from "../../tl3d/engine/program/Shader3D";
import { Display3DSprite } from "../../tl3d/engine/display3D/Display3DSprite";
import { TextureRes } from "../../tl3d/engine/material/TextureRes";
export declare class DirectShadowDisplay3DShader extends Shader3D {
    static DirectShadowDisplay3DShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export declare class DirectShadowDisplay3DSprite extends Display3DSprite {
    constructor();
    needScanShadow: boolean;
    protected initData(): void;
    protected modelShder: Shader3D;
    setObjUrl(value: string): void;
    private nrmFlag;
    protected _uvTextureRes: TextureRes;
    update(): void;
    protected drawTemp($dis: Display3DSprite): void;
    updateRotationMatrix(): void;
    setPicUrl($str: string): void;
    groupItem: Array<Display3DSprite>;
    setModelById($str: string): void;
}
