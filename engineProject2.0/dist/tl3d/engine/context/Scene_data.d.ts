import { Context3D, FBO } from "./Context3D";
import { Camera3D } from "../base/Camera3D";
import { Object3D } from "../base/Object3D";
import { Matrix3D } from "../math/Matrix3D";
import { LightVo } from "../vo/LightVo";
export declare class Scene_data {
    static isPanGm: boolean;
    static isPc: boolean;
    static isIos: boolean;
    static context3D: Context3D;
    static canvas3D: HTMLCanvasElement;
    static stageWidth: number;
    static stageHeight: number;
    static sceneViewHW: number;
    static fileRoot: string;
    static verticalScene: boolean;
    static effectsLev: number;
    static cam3D: Camera3D;
    static focus3D: Object3D;
    private static _viewMatrx3D;
    static vpMatrix: Matrix3D;
    static camFar: number;
    static skyCubeMap: Array<WebGLTexture>;
    static pubLut: WebGLTexture;
    static frameTime: number;
    static MAX_NUMBER: number;
    static user: number;
    static light: LightVo;
    static scaleLight: Array<number>;
    static useByte: Boolean;
    static fogColor: Array<number>;
    static fogData: Array<number>;
    static gameAngle: number;
    static sceneNumId: number;
    static fbo: FBO;
    static set viewMatrx3D(value: Matrix3D);
    static get viewMatrx3D(): Matrix3D;
    static supportBlob: boolean;
    /**
     * z平面放大倍数
     */
    static SCALE_Z: number;
}
