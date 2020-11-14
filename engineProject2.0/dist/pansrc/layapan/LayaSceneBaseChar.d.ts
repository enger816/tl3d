import { Display3dMovie } from "../../tl3d/engine/display3D/Display3dMovie";
import { GroupRes } from "../../tl3d/engine/utils/res/GroupRes";
import { MeshData } from "../../tl3d/engine/base/MeshData";
import { MaterialBaseParam } from "../../tl3d/engine/material/MaterialBaseParam";
import { Material } from "../../tl3d/engine/material/Material";
export declare class LayaSceneBaseChar extends Display3dMovie {
    private _avatar;
    _visible: boolean;
    get visible(): boolean;
    set visible(value: boolean);
    changeColor: Array<number>;
    constructor();
    set alpha(value: number);
    private _alpha;
    get alpha(): number;
    updateMaterialMesh($mesh: MeshData): void;
    setMaterialTextureAlpha($material: Material, $mp?: MaterialBaseParam): void;
    private static alphaShader;
    private makeAlphaShader;
    setAvatar(num: number): void;
    update(): void;
    protected getSceneCharAvatarUrl(num: number): string;
    protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
    /**
     * 是否包含动作
     * @param motion
     * @return
     *
     */
    hasAnimation(motion: string): boolean;
    /**
     * 返回动作时间 毫秒
     * @param motion 动作名
     * @return
     */
    getAnimationTotalDuration(motion: string): number;
    isPlaying(): boolean;
    protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
    removeStage(): void;
    get px(): number;
    set px(value: number);
    get py(): number;
    set py(value: number);
    get pz(): number;
    set pz(value: number);
    addSkinMeshParticle(): void;
}
