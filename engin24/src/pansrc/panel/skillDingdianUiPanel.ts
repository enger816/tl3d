import {ui} from "../../../../../zhuilong/src/ui/layaMaxUI"
import Sprite = laya.display.Sprite
import Image = laya.ui.Image
import Event = laya.events.Event
import {MouseType} from "../../../pan3d/engine/utils/KeyControl"
import {MathClass} from "../../../pan3d/engine/math/MathClass"
import {LayaSceneChar} from "../layapan/LayaSceneChar"
import {Scene_data} from "../../../pan3d/engine/context/Scene_data"
import {OverrideSkill} from "../layapan/overridebase/skill/OverrideSkill"
class skillDingdianUiPanel extends Laya.Sprite {
    constructor() {
        super();
        this.ape = new BaseWinPanel()
        this.addChild(this.ape);

        var $imag: Laya.Image = new Laya.Image("res/2dbg.jpg")
        $imag.x = 20
        $imag.y = 30
        this.ape.addChild($imag);

        this.ape.pos(150, 150)

        this.layaSceneLevel = new BaseLaya3dSprite();
        this.addChild(this.layaSceneLevel)
        this.uiLayaSceneChar = this.addModelChar();
        this.uiLayaSceneChar.nameEnable = true
        this.uiLayaSceneChar.bloodEnable = true
        this.uiLayaSceneChar.set2dPos(200, 200)
        this.attactRoleAry = new Array
        this.attactRoleAry.push(this.addOther(400, 400));
        this.attactRoleAry.push(this.addOther(100, 300));

        this.ape.on(MouseType.MouseDown, this, this.onStartDrag);

        this.loadSkill()
        MathClass.SetShock = false


    }
    private attactRoleAry: Array<layapan.LayaSceneChar>;

    private addOther(x, y): layapan.LayaSceneChar {

        let attactRole = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay(attactRole);
        attactRole.setRoleUrl(getRoleUrl("erchiyuan002"));
        attactRole.set2dPos(x, y)
        return attactRole;
    }
    private loadSkill(): void {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("200191"));

    }
    private uiLayaSceneChar: layapan.LayaSceneChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.ape.x = Scene_data.cam3D.offset.x
        this.ape.y = Scene_data.cam3D.offset.y
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
        //  this.uiLayaSceneChar.set2dPos(this.ape.x + 200, this.ape.y + 200)

    }


    private ape: BaseWinPanel

    private onStartDrag(e: Event): void {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        // PathManager.init();

        // var $mouse: Vector2D = new Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y)
        // var $tx: number = $mouse.x * scene2d.Override2dEngine.htmlScale;
        // var $tz: number = $mouse.y * scene2d.Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
        // this.attactRole.set2dPos($mouse.x, $mouse.y)


        // this.playDindianSkill(this.uiLayaSceneChar);
        // this.charPlayDanDaoSkill(this.uiLayaSceneChar);
        this.charPlayDingdianSkill(this.uiLayaSceneChar);


        //  this.layaSceneLevel.scene.playLyf("model/ccav_lyf.txt", new Vector3D($tx, 0, $tz));



    }

    private charPlayDingdianSkill($char: layapan.LayaSceneChar){
        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl("300162"), "skill_03");

        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        // $skill.needSound = true
        // let ary = new Array
        // for (var i = 0; i < this.attactRoleAry.length; i++) {
        //     var element = this.attactRoleAry[i];
        //     ary.push(new Vector3D(element.px,element.py,element.pz));
        // }
        // $skill.configFixEffect($char,null,ary);
        $skill.configFixEffect($char);
        this.layaSceneLevel.scene.skillManager.playSkill($skill)
    }

    private playDindianSkill($char: layapan.LayaSceneChar): void {
        // $char.watch(this.attactRole)


        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl("erchijinen002"), "attack_02");

        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.needSound = true
        $skill.configFixEffect($char);
        this.layaSceneLevel.scene.skillManager.playSkill($skill)
    }
    public charPlayDanDaoSkill($char: layapan.LayaSceneChar): void {
        if (!$char._scene.ready) {
            return;
        }
        // $char.watch(this.attactRole)
        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl("200191"), "skill_02");
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        for (var i = 0; i < this.attactRoleAry.length; i++) {
            var element = this.attactRoleAry[i];
            $skill.configTrajectory($char, element);
        }
        this.layaSceneLevel.scene.skillManager.playSkill($skill)
    }

    private layaSceneLevel: BaseLaya3dSprite
    private addModelChar(): layapan.LayaSceneChar {
        var $baseChar: layapan.LayaSceneChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("3016"));

        return $baseChar
    }
}