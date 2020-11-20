import { Engine } from "../../../tl3d/engine/Engine";
import { Scene_data } from "../../../tl3d/engine/context/Scene_data";
import { UIManager } from "../../../tl3d/engine/ui/UIManager";

import { OverrideEngine } from "../../scene3d/override/OverrideEngine";
import { Matrix3D } from "../../../tl3d/engine/math/Matrix3D";
import { CanvasPostionModel } from "../CanvasPostionModel";

export class Override2dEngine extends OverrideEngine {


    constructor() {
        super()
    }

/*     public static initConfig(): void {
        Engine.update = () => { this.update() }  //更换update
        Engine.init = ($caves: HTMLCanvasElement) => { this.init($caves) } //更换引擎初始化
        Engine.resetSize = (width?: number, height?: number) => { this.resetSize(width, height) } //更尺寸变化

        Engine.resetViewMatrx3D = () => { this.resetViewMatrx3D() }
    } */

    public static resetSize(width?: number, height?: number): void {
        if (isNaN(width)) {
            width = document.body.clientWidth;
        }
        if (isNaN(height)) {
            height = document.body.clientHeight;
        }

        Scene_data.stageWidth = width;
        Scene_data.stageHeight = height;

        Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);
        
        Engine.resetViewMatrx3D();

        CanvasPostionModel.getInstance().resetSize();
    }


    public static init(): void {

        OverrideEngine.init()
        Scene_data.focus3D.x = 0;
        Scene_data.focus3D.y = 0;
        Scene_data.focus3D.z = 0;
/*         Scene_data.focus3D.rotationY = 0;
        Scene_data.focus3D.rotationX = -45
        Scene_data.cam3D.distance = 250; */

    }
    
    public static resetViewMatrx3D() {
        if (Scene_data.viewMatrx3D) {
            Scene_data.viewMatrx3D.identity()
        } else {
            Scene_data.viewMatrx3D = new Matrix3D;
        }
        
        var fovw: number = Scene_data.stageWidth
        var fovh: number = Scene_data.stageHeight

        var sX:number = 2 / fovw;
        var sY:number =  2 / fovh;
        Scene_data.viewMatrx3D.appendScale(
            sX, 
            sY, 
        1 / 1000);
    }
}