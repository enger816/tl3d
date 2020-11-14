import {OverrideSceneManager} from "../../scene3d/override/OverrideSceneManager"
import {SceneManager} from "../../../pan3d/engine/scene/SceneManager"
import {MathClass} from "../../../pan3d/engine/math/MathClass"
import {Scene_data} from "../../../pan3d/engine/context/Scene_data"
import {TimeUtil} from "../../../pan3d/engine/utils/TimeUtil"
import {GroundModel} from "../GroundModel"
import {ParticleManager} from "../../../pan3d/engine/particle/ParticleManager"
import {SkillManager} from "../../../pan3d/engine/skill/SkillManager"
import {BloodManager} from "../../../pan3d/engine/utils/BloodManager"
import {UIManager} from "../../../pan3d/engine/ui/UIManager"

    export class Override2dSceneManager extends OverrideSceneManager {
        constructor() {
            super()
        }
        public static initConfig(): void {
            SceneManager._instance = new Override2dSceneManager;
        }

        public update(): void {

            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time =  TimeUtil.getTimer()
            }
            GroundModel.getInstance().update();
            this.updateMovieFrame();
            if (this._ready) {
                 ParticleManager.getInstance().updateTime();
                 SkillManager.getInstance().update();
                if (this.render) {

                    Scene_data.context3D.setWriteDepth(true);
                    Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();

                     Scene_data.context3D.setWriteDepth(false);
                     ParticleManager.getInstance().update();
                     BloodManager.getInstance().update();
                     Scene_data.context3D.setBlendParticleFactors(0)
                      Scene_data.context3D.setWriteDepth(true);
                      Scene_data.context3D.setWriteDepth(false);
                }
                 Scene_data.context3D.setDepthTest(false);
                 UIManager.getInstance().update();
            }

        }
    }
