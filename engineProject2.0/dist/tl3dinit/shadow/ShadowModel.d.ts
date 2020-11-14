import { Shader3D } from "../../tl3d/engine/program/Shader3D";
import { Matrix3D } from "../../tl3d/engine/math/Matrix3D";
import { FBO } from "../../tl3d/engine/context/Context3D";
import { SceneManager } from "../../tl3d/engine/scene/SceneManager";
export declare class BaseShadowShader extends Shader3D {
    static BaseShadowShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export declare class ShadowModel {
    private static _instance;
    static getInstance(): ShadowModel;
    static shadowViewMatx3D: Matrix3D;
    private renderContext;
    getFBO(): FBO;
    private _uvTextureRes;
    updateDepthTexture(fbo: FBO): void;
    private sunRotationX;
    sunRotationY: number;
    private sunDistens100;
    private makeUseShadowView;
    private isNeedMake;
    private _visible;
    setShowdowVisible(value: boolean): void;
    updateDepth($scene: SceneManager): void;
    private drawTempSprite;
}
