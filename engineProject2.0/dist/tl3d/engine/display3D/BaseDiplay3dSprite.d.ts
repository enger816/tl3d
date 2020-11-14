import { Shader3D } from "../program/Shader3D";
import { Display3D } from "./Display3D";
import { TextureRes } from "../material/TextureRes";
export declare class BaseDiplay3dShader extends Shader3D {
    static BaseDiplay3dShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export declare class BaseDiplay3dSprite extends Display3D {
    constructor();
    protected initData(): void;
    private loadTexture;
    _uvTextureRes: TextureRes;
    upToGpu(): void;
    update(): void;
}
