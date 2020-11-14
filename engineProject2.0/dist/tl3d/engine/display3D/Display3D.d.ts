import { Object3D } from "../base/Object3D";
import { ObjData } from "../base/ObjData";
import { Shader3D } from "../program/Shader3D";
import { SceneManager } from "../scene/SceneManager";
export declare class Display3D extends Object3D {
    objData: ObjData;
    program: WebGLProgram;
    shader: Shader3D;
    beginTime: number;
    type: number;
    protected _onStage: boolean;
    sceneVisible: boolean;
    protected _hasDestory: boolean;
    _scene: SceneManager;
    constructor();
    update(): void;
    get onStage(): boolean;
    addStage(): void;
    removeStage(): void;
    resize(): void;
    destory(): void;
}
