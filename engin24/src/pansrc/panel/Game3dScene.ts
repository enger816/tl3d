import Sprite = laya.display.Sprite
import Event = laya.events.Event
import {Vector3D} from "../../../pan3d/engine/math/Vector3D"
import {LayaBloodManager} from "../layapan/LayaBloodManager"
import {MouseType} from "../../../pan3d/engine/utils/KeyControl"
import {ProgrmaManager} from "../../../pan3d/engine/program/ProgramManager"
import {LineDisplayShader} from "../../../pan3d/engine/scene/grldLevel/LineDisplayShader"
import {GridLineSprite} from "../../../pan3d/engine/scene/grldLevel/LineDisplaySprite"
import {LayaSceneChar} from "../layapan/LayaSceneChar"
import {Rectangle} from "../../../pan3d/engine/math/Rectangle"
import {CharAction} from "../../../pan3d/baseprite/CharAction"
import {LayaOverride2dSceneManager} from "../layapan/overridebase/LayaOverride2dSceneManager"
import {TextJumpUiVo} from "../../../pan3d/engine/utils/BloodManager"
import {TimeUtil} from "../../../pan3d/engine/utils/TimeUtil"


class Game3dScene extends Laya.Sprite {
    constructor() {
        super();

        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(250, 250)


        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.scene.changeBloodManager(new layapan.LayaBloodManager)

        this.addChild(this.layaSceneLevel)
        this.layaSceneLevel.addMaskUi(664 - 80, 520 - 80)
        this.uiLayaSceneChar = this.addModelChar();
        this.uiLayaSceneChar.nameEnable = true
        this.uiLayaSceneChar.bloodEnable = true

        this.ape.on(MouseType.MouseDown, this, this.onStartDrag);
        this.ape.on(MouseType.MouseWheel, this, this.onMouseWheel);

        this.addGridLineSprite();

        this.layaSceneLevel.scene.loadScene("123456", this.mainSceneComplete, this.mainSceneProgress, this.mainSceneComplete)
       
    }
    private onMouseWheel(e: any): void {
        this.layaSceneLevel.camDistance += e.delta
    }
    private mainSceneComplete(): void {
    }
    private mainSceneProgress(num: number): void {
        
    }
    private addGridLineSprite(): void {
        ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
        var $GridLineSprite: GridLineSprite = new GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);

    }
    private loadSkill(): void {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_1"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    }
    private uiLayaSceneChar: layapan.LayaSceneChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x +40
        this.layaSceneLevel.y = this.ape.y +40


    }


    private ape: BaseWinPanel
    private dragRegion: Laya. Rectangle;


    private onStartDrag(e: Event): void {


        if (this.uiLayaSceneChar.curentAction == CharAction.WALK || this.uiLayaSceneChar.curentAction == CharAction.WALK_MOUNT) {
            this.uiLayaSceneChar.play(CharAction.STANAD)
        } else {
            this.uiLayaSceneChar.play(CharAction.WALK)
        }

        this.showJumpText(this.layaSceneLevel.scene, new Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz))
    }
    public showJumpText($scene: layapan.LayaOverride2dSceneManager, $pos: Vector3D): void {

        var $jumpVo: TextJumpUiVo = new TextJumpUiVo()
        $jumpVo.str = String(random(999));
        $jumpVo.pos = new Vector3D();
        $jumpVo.pos.x = $pos.x
        $jumpVo.pos.z = $pos.z
        $jumpVo.pos.y = 30
        $jumpVo.type = 2
        $jumpVo.starttime = TimeUtil.getTimer();
        $jumpVo.endtime = TimeUtil.getTimer() + 1200;
       // $scene.bloodManager.setJumpNum($jumpVo);
        (<layapan.LayaBloodManager>$scene.bloodManager).setExpJump256_256Num($jumpVo)
    }
    private layaSceneLevel: Scene3dLaya3dSprite
    private addModelChar(): layapan.LayaSceneChar {
        var $baseChar: layapan.LayaSceneChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        $baseChar.setMount("4104");
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(CharAction.STAND_MOUNT);
     
        return $baseChar
    }

}