﻿import { Context3D, FBO } from "./Context3D";
import { Camera3D } from "../base/Camera3D";
import { Object3D } from "../base/Object3D";
import { Matrix3D } from "../math/Matrix3D";
import { LightVo } from "../vo/LightVo";
import { CanvasPostionModel } from "../../../tl3dinit/scene2d/CanvasPostionModel";

export class Scene_data {
    public static isPanGm: boolean;
    public static isPc: boolean;
    public static isIos: boolean;
    public static context3D: Context3D;
    // public static canvas3D: HTMLCanvasElement;
    public static stageWidth: number;
    public static stageHeight: number;
    public static sceneViewHW: number = 500;
    public static fileRoot: string = "res/";
    public static verticalScene: boolean = false;
    public static effectsLev: number = 2;  //2高配1中配0低配
    //public static fileRoot: string = "assets/";

    public static cam3D: Camera3D;
    public static focus3D: Object3D;
    private static _viewMatrx3D: Matrix3D;
    public static vpMatrix: Matrix3D;
    public static camFar: number = 1000; //镜头最远距离


    public static skyCubeMap: Array<WebGLTexture>;
    public static pubLut: WebGLTexture;
    public static tex128:WebGLTexture;
    public static tex32:WebGLTexture;

    public static frameTime: number = 1000 / 60;
    public static MAX_NUMBER: number = 10000000;

    public static user: number = 0;  //0为小刘，1为pan

    public static light: LightVo;

    public static scaleLight: Array<number> = [2.0];

    public static useByte: Boolean = true

    public static fogColor: Array<number> = [0, 0, 0];
    public static fogData: Array<number> = [1000, 0.003];

    public static gameAngle: number = 0
    public static sceneNumId: number = 0;
    public static fbo: FBO;

    public static set viewMatrx3D(value: Matrix3D) {
        Scene_data._viewMatrx3D = value
    }
    public static get viewMatrx3D(): Matrix3D {
        return Scene_data._viewMatrx3D;
    }

    public static supportBlob: boolean = false;

    /**
     * z平面放大倍数
     */
    public static SCALE_Z:number = 1/Math.sin(CanvasPostionModel.SCENE_2D_ROTATION_45 * Math.PI / 180);

}