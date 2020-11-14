import { SceneManager } from "../../../tl3d/engine/scene/SceneManager";
import { FBO } from "../../../tl3d/engine/context/Context3D";
import { LightVo } from "../../../tl3d/engine/vo/LightVo";
import { MathClass } from "../../../tl3d/engine/math/MathClass";
import { Scene_data } from "../../../tl3d/engine/context/Scene_data";
import { TimeUtil } from "../../../tl3d/engine/utils/TimeUtil";
import { ParticleManager } from "../../../tl3d/engine/particle/ParticleManager";
import { SkillManager } from "../../../tl3d/engine/skill/SkillManager";
import { UIManager } from "../../../tl3d/engine/ui/UIManager";


export class OverrideSceneManager extends SceneManager {
    public fbo: FBO;
    public light: LightVo;
    constructor() {
        super()
    }
    public static initConfig(): void {
        SceneManager._instance = new OverrideSceneManager;
    }
    public update(): void {

        MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        Scene_data.context3D._contextSetTest.clear();
        if (isNaN(this._time)) {
            this._time = TimeUtil.getTimer()
        }
        this.updateMovieFrame();
        if (this._ready) {
            ParticleManager.getInstance().updateTime();
            SkillManager.getInstance().update();
            if (this.render) {
                Scene_data.context3D.cullFaceBack(false)
                Scene_data.context3D.cullFaceBack(true)
                Scene_data.context3D.cullFaceBack(true)



                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                this.updateMovieDisplay();

                Scene_data.context3D.setWriteDepth(false);
                ParticleManager.getInstance().update();
                Scene_data.context3D.setBlendParticleFactors(0)
                Scene_data.context3D.setWriteDepth(true);
            }
            Scene_data.context3D.setDepthTest(false);
        }

    }

}