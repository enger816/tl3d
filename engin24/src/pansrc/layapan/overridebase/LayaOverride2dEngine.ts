import {OverrideEngine} from "../../../../pan3dinit/scene3d/override/OverrideEngine"
import {UIData} from "../../../../pan3d/engine/ui/base/UIData"
import {Engine} from "../../../../pan3d/engine/Engine"
import {Override2dEngine} from "../../../../pan3dinit/scene2d/override2d/Override2dEngine"

    export class LayaOverride2dEngine extends OverrideEngine {


        constructor() {
            super()
        }


        public static initConfig(): void {
   
            UIData.resize = () => { this.uiScaleresize() }  //更换update
            Engine.update = () => { this.update() }  //更换update
            Engine.init = ($caves: HTMLCanvasElement) => { scene2d.Override2dEngine.init($caves) } //更换引擎初始化
            Engine.resetSize = (width?: number, height?: number) => { scene2d.Override2dEngine.resetSize(width, height) } //更尺寸变化

            Engine.resetViewMatrx3D = () => { scene2d.Override2dEngine.resetViewMatrx3D() }
        }
        public static uiScaleresize(): void {
            console.log("重置什么也不做")
            UIData.Scale = 1
        }
       

       

    }
