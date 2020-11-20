
import { OverrideEngine } from "../../../tl3dinit/scene3d/override/OverrideEngine";
import { Override2dEngine } from "../../../tl3dinit/scene2d/override2d/Override2dEngine";
import { Engine } from "../../../tl3d/engine/Engine";

export class LayaOverride2dEngine extends OverrideEngine {


    constructor() {
        super()
    }


    public static initConfig(): void {

        // Engine.update = () => { this.update() }  //更换update
        Engine.init = () => { Override2dEngine.init() } //更换引擎初始化
        Engine.resetSize = (width?: number, height?: number) => { Override2dEngine.resetSize(width, height) } //更尺寸变化

        Engine.resetViewMatrx3D = () => { Override2dEngine.resetViewMatrx3D() }
    }
}