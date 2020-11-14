import { OverrideSceneManager } from "../../../tl3dinit/scene3d/override/OverrideSceneManager";
import { LayaOverride2dParticleManager } from "./LayaOverride2dParticleManager";
import { LayaOverride2dSkillManager } from "./LayaOverride2dSkillManager";
import { LayaOverrideGroupDataManager } from "./LayaOverrideGroupDataManager";
import { Display3dMovie } from "../../../tl3d/engine/display3D/Display3dMovie";
import { Vector3D } from "../../../tl3d/engine/math/Vector3D";
import { Matrix3D } from "../../../tl3d/engine/math/Matrix3D";
export declare class LayaOverride2dSceneManager extends OverrideSceneManager {
    private static sceneNum;
    constructor();
    groupDataManager: LayaOverrideGroupDataManager;
    skillManager: LayaOverride2dSkillManager;
    particleManager: LayaOverride2dParticleManager;
    static initConfig(): void;
    update(): void;
    addMovieDisplay($display: Display3dMovie): void;
    loadSceneConfigCom(obj: any): void;
    playLyf($url: string, $pos: Vector3D, $r?: number): void;
    private onPlayCom;
    cameraMatrix: Matrix3D;
    viewMatrx3D: Matrix3D;
    upFrame(): void;
}
