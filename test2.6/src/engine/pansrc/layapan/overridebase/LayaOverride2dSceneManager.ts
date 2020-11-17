import { OverrideSceneManager } from "../../../tl3dinit/scene3d/override/OverrideSceneManager";
import { LayaOverride2dParticleManager } from "./LayaOverride2dParticleManager";
import { SceneManager } from "../../../tl3d/engine/scene/SceneManager";
import { MathClass } from "../../../tl3d/engine/math/MathClass";
import { Scene_data } from "../../../tl3d/engine/context/Scene_data";
import { Display3dMovie } from "../../../tl3d/engine/display3D/Display3dMovie";
import { Vector3D } from "../../../tl3d/engine/math/Vector3D";
import { GroupItem, GroupRes } from "../../../tl3d/engine/utils/res/GroupRes";
import { CombineParticle } from "../../../tl3d/engine/particle/CombineParticle";
import { BaseRes } from "../../../tl3d/engine/utils/res/BaseRes";
import { BaseEvent } from "../../../tl3d/engine/events/BaseEvent";
import { Matrix3D } from "../../../tl3d/engine/math/Matrix3D";
import { TimeUtil } from "../../../tl3d/engine/utils/TimeUtil";
import { LayaOverride2dSkillManager } from "./LayaOverride2dSkillManager";
import { LayaOverrideGroupDataManager } from "./LayaOverrideGroupDataManager";

export class LayaOverride2dSceneManager extends OverrideSceneManager {
    private static sceneNum: number = 0
    constructor() {
        super();

        this.particleManager = new LayaOverride2dParticleManager();
        this.skillManager = new LayaOverride2dSkillManager(this);
        this.groupDataManager = new LayaOverrideGroupDataManager();
       console.log("创建场景=>", LayaOverride2dSceneManager.sceneNum++);
    }

    public groupDataManager: LayaOverrideGroupDataManager
    public skillManager: LayaOverride2dSkillManager;
    public particleManager: LayaOverride2dParticleManager;

    public static initConfig(): void {
        SceneManager._instance = new LayaOverride2dSceneManager;
    }
    public update(): void {
        MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵

        this.upFrame();
    }

    public addMovieDisplay($display: Display3dMovie): void {
        $display._scene = this
        this._displayRoleList.push($display);
        $display.addStage();
    }
    public loadSceneConfigCom(obj: any): void {
        //保持原来的角度
        var $rotationY: number = Scene_data.focus3D.rotationY;
        super.loadSceneConfigCom(obj);
        Scene_data.focus3D.rotationY = $rotationY;

    }
    public playLyf($url: string, $pos: Vector3D, $r: number = 0): void {

        this.groupDataManager.scene = this
        this.groupDataManager.getGroupData(Scene_data.fileRoot + $url, (groupRes: GroupRes) => {
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $particle: CombineParticle = this.particleManager.getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    $particle.x = $pos.x;
                    $particle.y = $pos.y;
                    $particle.z = $pos.z;
                    $particle.rotationY = $r;
                    this.particleManager.addParticle($particle);
                    $particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
                } else {
                    console.log("播放的不是单纯特效");
                }
            }
        })
    }
   /*  public charPlaySkill($char: LayaSceneChar, $skillfile: string): void {
        if (!$char._scene.ready) {
            return;
        }

        var $skill: OverrideSkill = this.skillManager.getSkill(getSkillUrl($skillfile), "skill_01");
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.configFixEffect($char);
        this.skillManager.playSkill($skill)
    } */
    private onPlayCom(value: BaseEvent): void {
        this.particleManager.removeParticle(<CombineParticle>(value.target))
    }
    public cameraMatrix: Matrix3D;
    public viewMatrx3D: Matrix3D;
    public upFrame(): void {
        Scene_data.context3D._contextSetTest.clear();
        if (isNaN(this._time)) {
            this._time = TimeUtil.getTimer()

        }
        this.updateMovieFrame();
        if (this._ready) {
            this.particleManager.updateTime();
            this.skillManager.update()

            if (this.render) {
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                this.updateMovieDisplay();

//                ShadowManager.getInstance().update();

                Scene_data.context3D.setWriteDepth(false);
                this.particleManager.update();

                //draw shadow pass
                this.renderShadow();

/*                 Scene_data.context3D.setBlendParticleFactors(0)
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setWriteDepth(false); */
            }
            // Scene_data.context3D.setDepthTest(false);


            this.cameraMatrix = Scene_data.cam3D.cameraMatrix.clone();
            this.viewMatrx3D = Scene_data.viewMatrx3D;
        }
    }
}