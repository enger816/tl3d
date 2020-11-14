import { LayaSceneBaseChar } from "./LayaSceneBaseChar";import { Skill } from "../../tl3d/engine/skill/Skill";import { CharAction } from "../../tl3d/baseprite/CharAction";import { Display3D } from "../../tl3d/engine/display3D/Display3D";import { Vector3D } from "../../tl3d/engine/math/Vector3D";import { Display3DSprite } from "../../tl3d/engine/display3D/Display3DSprite";import { LineDisplaySprite } from "../../tl3d/engine/scene/grldLevel/LineDisplaySprite";import { ProgramManager } from "../../tl3d/engine/program/ProgramManager";import { LineDisplayShader } from "../../tl3d/engine/scene/grldLevel/LineDisplayShader";import { Display3dMovie } from "../../tl3d/engine/display3D/Display3dMovie";import { MathClass } from "../../tl3d/engine/math/MathClass";import { Vector2D } from "../../tl3d/engine/math/Vector2D";import { Scene_data } from "../../tl3d/engine/context/Scene_data";import { LayaOverride2dSceneManager } from "./overridebase/LayaOverride2dSceneManager";
import { UnitFunction } from "../../tl3d/UnitFunction";



export class LayaSceneChar extends LayaSceneBaseChar {
    // 血条颜色 对应素材 res_3d\ui\load\blood.png
    static BLOOD_COLOR_HP = 0;
    static BLOOD_COLOR_ANGER = 1;

    public skillitem: Array<Skill>;//存放着角色的技能;

    public isMount: boolean = false;

    public static Defaul_Man_Avatar: number = 2002//男
    public static Defaul_WoMan_Avater: number = 2012//女

    public static WEAPON_PART: string = "weapon";
    public static WEAPON_DEFAULT_SLOT: string = "w_01";
    public static MOUNT_SLOT: string = "mount_01";
    public static WING_SLOT: string = "wing_01";
    public static SEL_PART: string = "select";
    public static QUEST_ICON: string = "questicon";
    public static NONE_SLOT: string = "none";

    protected _px: number = 0;
    protected _py: number = 0;
    protected _pz: number = 0;
    private _pRotationY: number = 0;
    toRotationY: number = 0;
    private _pScale: number = 1;

    tittleHeight: number = 50;

    private _optimization: boolean = false;//当优化为true的时候 不显示



    constructor() {
        super();
        // this.shadow = true;
        this.skillitem = new Array();

    }


    /**强制角度 */
    set forceRotationY(val: number) {
        this.pRotationY = val;
        this.rotationY = val;
        this.toRotationY = val;
    }

    get pRotationY(): number {
        return this._pRotationY;
    }
    set pRotationY(val: number) {
        this._pRotationY = val;
        if (this.isMount) {
            this._mountChar.rotationY = val;
        } else {
            this.rotationY = val;
        }
    }

    get pScale(): number {
        return this._pScale;
    }
    set pScale(v: number) {
        this._pScale = v;
        this._mountChar && (this._mountChar.scale = v);
        this._wingDisplay && (this._wingDisplay.scale = v);
        this.scale = v;
        if (this._skinMesh) {
            this.tittleHeight = this._skinMesh.tittleHeight * v;
        }
    }


    protected _mountChar: LayaSceneBaseChar;

    setMount(v: number): boolean {
        this.isMount = v != 0;
        if (this.isMount) {
            if (!this._mountChar) {
                this._mountChar = new LayaSceneBaseChar();
                this._mountChar.scale = this._pScale;
            }
            this._mountChar.setRoleUrl(UnitFunction.getRoleUrl(v));
            this.setBind(this._mountChar, LayaSceneChar.MOUNT_SLOT);
            this._mountChar._scene = this._scene
            this._scene && this._scene.addMovieDisplay(this._mountChar);
        }
        else {
            this.setBind(null, null);
            if (this._mountChar) {
                this._mountChar = null;
            }
        }
        return this.isMount;
    }

    private _wingDisplay: LayaSceneBaseChar;

    public setWing(v: number): void {
        if (v) {
            if (!this._wingDisplay) {
                this._wingDisplay = new LayaSceneBaseChar();
                this._wingDisplay.scale = this._pScale;
            }
            this._wingDisplay.setRoleUrl(UnitFunction.getRoleUrl(v));
            this._wingDisplay.setBind(this, LayaSceneChar.WING_SLOT);
            this._wingDisplay._scene = this._scene
            this._scene && this._scene.addMovieDisplay(this._wingDisplay);
        }
        else {
            if (this._wingDisplay) {
                this._wingDisplay.setBind(null, null);
                //this._wingDisplay.removeSelf();
                this._wingDisplay = null;
            }
        }
    }


    private _weaponNum: number = -1;
    setWeapon(num: number): void {
        if (this._weaponNum == num) {
            return;
        }
        this._weaponNum = num;
        if (num <= 0) {//移除武器
            this.removePart(LayaSceneChar.WEAPON_PART);
        } else {
            this.setWeaponByAvatar(this._weaponNum);
        }
    }

    setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
        this.addPart(LayaSceneChar.WEAPON_PART, LayaSceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
    }

    protected getSceneCharAvatarUrl(num: number): string {
        if (num == 0) {
            //console.log("衣服为0")
            throw new Error("衣服为getSceneCharAvatarUrl");
        }
        var $url: string = UnitFunction.getRoleUrl(num);
        return $url
    }

    onMeshLoaded(): void {
        if (this._skinMesh) {
            this.tittleHeight = this._skinMesh.tittleHeight * this._pScale;
        }
    }

    play($action: string, $completeState: number = 0, needFollow: boolean = true): boolean {
        if (this.isMount) {
            this._mountChar.visible = Boolean($action != CharAction.JUMP)
            if ($action == CharAction.STANAD) {
                super.play(CharAction.STAND_MOUNT);
            } else if ($action == CharAction.WALK) {
                super.play(CharAction.WALK_MOUNT);
            } else {
                if (this._mountChar.visible) {
                    super.play(CharAction.STAND_MOUNT);
                } else {
                    super.play(CharAction.JUMP);
                }
            }
            return this._mountChar.play($action, $completeState, needFollow);
        } else {
            return super.play($action, $completeState, needFollow)
        }
    }

    getCurrentAction(): string {
        if (this.isMount) {
            return this._mountChar.curentAction;
        } else {
            return this.curentAction;
        }
    }

    //平滑num=1为直接
    protected rotationToNew(value: number, num: number = 1): void {
        var anum: number = value - this.pRotationY;
        if (anum == 0) {
            return;
        }
        if (anum < 1) {
            this.pRotationY = value;
            return;
        }
        var a: number = ((value - this.pRotationY) % 360 + 360) % 360;
        if (a > 180) {
            this.pRotationY -= (360 - a) / num;
        } else {
            this.pRotationY += a / num;
        }
    }

    stopMove(): void {
        this.play(CharAction.STANAD);
    }

    watch($obj: Display3D, $syn: boolean = false): void {
        if (!$obj) {
            //console.log("面向对象无")
            return;
        }
        var xx: number = $obj.x - this.px;
        var yy: number = $obj.z - this.pz;
        var distance: number = Math.sqrt(xx * xx + yy * yy);
        xx /= distance;
        yy /= distance;
        var angle: number = Math.asin(xx) / Math.PI * 180;
        if (yy <= 0) {
            angle = 180 - angle;
        }
        if (!isNaN(angle)) {
            this.forceRotationY = angle
        }
    }

    getCurrentPos(): Vector3D {
        return new Vector3D(this.px, this.py, this.pz);
    }

    skillVo: Skill;

    /*
    playSkill($skill: Skill): void {
        if (!this._scene) {
            return;
        }
        this._scene.skillManager.playSkill($skill);
        this.skillVo = $skill;
    }
    */

    msgSpellStop(): void {
        if (this.skillVo) {
            ////console.log("停止技能播放");
            this.skillVo.removeSkillForce();
            this.changeAction(this._defaultAction)
            this.skillVo = null;
        }
        this.isSinging = false;
    }
    /*
    setScene(scene: SceneManager): void {
        super.setScene(scene);
        if (this._scene) {
            this._mountChar && this._scene.addMovieDisplay(this._mountChar);
            this._wingDisplay && this._scene.addMovieDisplay(this._wingDisplay);
        }
        this._bloodManager = this._scene instanceof PanScene ? this._scene.bloodManager : null;
        this.nameEnable = this._nameEnable;
        this.bloodEnable = this._bloodEnable;
        this.angerEnable = this._angerEnable;
    }

    removeSelf(): void {
        if (this._mountChar) {
            this._mountChar.removeSelf();
        }
        if (this._wingDisplay) {
            this._wingDisplay.removeSelf();
        }
        if (this._charNameVo) {
            this._charNameVo.visible = false;
        }
        if (this._charBloodVo) {
            this._charBloodVo.visible = false;
        }
        if (this._charAngerVo) {
            this._charAngerVo.visible = false;
        }
        super.removeSelf();
    }
    */
    public destory(): void {
        if (this._hasDestory) {
            return;
        }
        if (this.skillVo) {
            this.skillVo.removeSkillForce();
            this.skillVo = null;
        }
        if (this._mountChar) {
            this._mountChar.destory();
            this._mountChar = null;
        }

        if (this._wingDisplay) {
            this._wingDisplay.destory();
            this._wingDisplay = null;
        }
 
        this._hasDestory = true;
        super.destory();
    }

    set visible(value: boolean) {
        this._visible = value;
        this.applyVisible();
    }
    get visible(): boolean {
        return this._visible
    }

    set optimization(value: boolean) {
        this._optimization = value;
        this.applyVisible();
    }
    get optimization(): boolean {
        return this._optimization
    }


    private _resultVisible: boolean = true;
    get resultVisible(): boolean {
        return this._resultVisible;
    }

    applyVisible(): void {
        var value: boolean = this._visible;
        if (this._visible) {
            if (this._optimization) {
                value = false;
            } else {
                value = true;
            }
        } else {
            value = false;
        }

        if (this._partDic) {
            if (this._partDic[LayaSceneChar.WEAPON_PART]) {
                for (var obj of this._partDic[LayaSceneChar.WEAPON_PART]) {
                    obj.sceneVisible = value;
                }
            }
        }

        // this._mountChar && (this._mountChar.sceneVisible = value);
        // this._wingDisplay && (this._wingDisplay.sceneVisible = value);

        this._resultVisible = value;
    }

    //摄像机是否2D
    protected _isCamera2D: boolean;
    set isCamera2D(v: boolean) {
        this._isCamera2D = v;
    }

    public updateBind(): void {
        super.updateBind();
        this.updateWeaponScale();
    }

    private updateWeaponScale(): void {
        if (this._partDic && this._partDic.hasOwnProperty(LayaSceneChar.WEAPON_PART)) {
            var ary = this._partDic[LayaSceneChar.WEAPON_PART];
            if (ary instanceof Array) {
                for (var i: number = 0; i < ary.length; i++) {
                    let item = ary[i];
                    if (item instanceof Display3DSprite) {
                        item.scale = this._pScale;
                    }
                }
            }
        }
    }

    public get px(): number {
        return this._px
    }
    public set px(value: number) {
        this._px = value
        if (this._mountChar) {
            this._mountChar.x = this._px
        } else {
            this.x = this.px
        }
    }

    public get pz(): number {
        return this._pz
    }
    public set pz(value: number) {
        this._pz = value
        if (this._mountChar) {
            this._mountChar.z = this._pz
        } else {
            this.z = this.pz
        }
    }

    private lineSprite: LineDisplaySprite;

    public update(): void {
        if (!this._skinMesh) {
            return;
        }
        if (this._optimization) {
            return;
        }

        super.update();
        if (this._showHitBox) {
            if (!this.lineSprite) {
                ProgramManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader)
                this.lineSprite = new LineDisplaySprite();
                this.lineSprite.clear();

                for (var i: number = 0; i < this._triIndex.length / 3; i++) {
                    var a: Vector3D = this._skinMesh.hitPosItem[this._triIndex[i * 3 + 0]]
                    var b: Vector3D = this._skinMesh.hitPosItem[this._triIndex[i * 3 + 1]]
                    var c: Vector3D = this._skinMesh.hitPosItem[this._triIndex[i * 3 + 2]]

                    this.lineSprite.makeLineMode(a, b);
                    this.lineSprite.makeLineMode(b, c);
                    this.lineSprite.makeLineMode(c, a);
                }

                this.lineSprite.upToGpu()
            }
            this.lineSprite.posMatrix = this.posMatrix.clone();
            this.lineSprite.update()
        }
    }

    public math_distance($other: Display3dMovie): number {
        return MathClass.math_distance(this.px, this.pz, $other.x, $other.z)
    }
    public get2dPos(): Vector2D {
        var $v2d: Vector2D = new Vector2D
        if (this._mountChar) {

            $v2d.x = this._mountChar.px
            $v2d.y = this._mountChar.pz
        } else {
            $v2d.x = this.px
            $v2d.y = this.pz
        }
        $v2d.x = $v2d.x;
        $v2d.y = $v2d.y / -1 / Scene_data.SCALE_Z;
        return $v2d
    }
    public set2dPos($x: number, $y: number): void {
        var $tx: number = $x;
        var $tz: number = $y * Scene_data.SCALE_Z * -1;

        this._px = $tx
        this._pz = $tz

        if (this._mountChar) {
            this._mountChar.x = $tx;
            this._mountChar.z = $tz;
        } else {
            this.x = $tx;
            this.z = $tz;
        }

    }
    private _showHitBox = false;
    // private triIndex: Array<number> = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]
    // private triIndex: Array<number> = [0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0]
    protected _triIndex: Array<number> = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0]

    protected _hitBox2DItem: Array<Vector2D>;

    public mouseClik(lineA: Vector3D, lineB: Vector3D): boolean {


        return false
    }

    public removeStage(): void {
        super.removeStage()

        if (this._mountChar) {
            (<LayaOverride2dSceneManager>this._scene).removeMovieDisplay(this._mountChar);
        }
        if (this._wingDisplay) {
            (<LayaOverride2dSceneManager>this._scene).removeMovieDisplay(this._wingDisplay);
        }
    }

    public addStage(): void {
        super.addStage();

        if (this._mountChar) {
            (<LayaOverride2dSceneManager>this._scene).addMovieDisplay(this._mountChar);
        }
        if (this._wingDisplay) {
            (<LayaOverride2dSceneManager>this._scene).addMovieDisplay(this._wingDisplay);
        }
    }

}