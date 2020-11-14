import { SceneManager } from "../../../tl3d/engine/scene/SceneManager";
import { FBO } from "../../../tl3d/engine/context/Context3D";
import { LightVo } from "../../../tl3d/engine/vo/LightVo";
export declare class OverrideSceneManager extends SceneManager {
    fbo: FBO;
    light: LightVo;
    constructor();
    static initConfig(): void;
    update(): void;
}
