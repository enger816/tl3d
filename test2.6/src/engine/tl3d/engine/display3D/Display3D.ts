import { Object3D } from "../base/Object3D";
import { ObjData } from "../base/ObjData";
import { Shader3D } from "../program/Shader3D";
import { SceneManager } from "../scene/SceneManager";

    export class Display3D extends Object3D {
        public objData: ObjData;
        public program: WebGLProgram;
        public shader: Shader3D;
        public beginTime: number;
        public type: number; //类型  
        protected _onStage: boolean;
        public sceneVisible: boolean = true;
        protected _hasDestory: boolean = false;
        public _scene: SceneManager;
        constructor() {
            super();
            this._onStage = false;
        }

        public update(): void {

        }

        public get onStage(): boolean {
            return this._onStage;
        }

        public addStage(): void {
            this._onStage = true;
        }

        public removeStage(): void {
            this._onStage = false;
        }
        public resize(): void {

        }

        public destory(): void {
            this.sceneVisible = false;
            if (this.objData) {
                this.objData.useNum--;
            }
        }
    }