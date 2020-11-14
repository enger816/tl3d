import Sprite = laya.display.Sprite
import Event = laya.events.Event
import {Vector3D} from "../../../pan3d/engine/math/Vector3D"
import {MouseType} from "../../../pan3d/engine/utils/KeyControl"
import {ProgrmaManager} from "../../../pan3d/engine/program/ProgramManager"
import {LineDisplayShader} from "../../../pan3d/engine/scene/grldLevel/LineDisplayShader"
import {GridLineSprite} from "../../../pan3d/engine/scene/grldLevel/LineDisplaySprite"
import {CharAction} from "../../../pan3d/baseprite/CharAction"


class DeleteRolePanel extends Laya.Sprite {
    constructor() {
        super();


        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(100, 0)
        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.addMaskUi(664, 520)
        this.addChild(this.layaSceneLevel)

        this.roleItem = new Array();
        this.roleItem.push(this.addModelChar(new Vector3D(-100, 0, 0)));
        this.roleItem.push(this.addModelChar(new Vector3D(-50, 0, 0)));
        this.roleItem.push(this.addModelChar(new Vector3D(0, 0, 0)));
        this.roleItem.push(this.addModelChar(new Vector3D(50, 0, 0)));
        this.roleItem.push(this.addModelChar(new Vector3D(100, 0, 0)));
      

        this.addGridLineSprite()
        this.loadSkill()
        this.ape.on(MouseType.MouseDown, this, this.onStartDrag);
        this.ape.on(MouseType.MouseWheel, this, this.onMouseWheel);
 
    }
    private onMouseWheel(e: any): void {
        this.layaSceneLevel.camDistance += e.delta
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
    private roleItem: Array<Game3dChar>
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }
    private isDele: boolean = true
    private onStartDrag(e: Event): void {
        if (this.isDele) {
            if (this.roleItem.length) {
                var $char: Game3dChar = this.roleItem.pop()
                this.layaSceneLevel.scene.removeMovieDisplay($char)
            } 
            if (this.roleItem.length==0) {
                this.isDele = false
            }
        } else {
            var $pos: Vector3D = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY)
            var $char: Game3dChar = this.addModelChar(new Vector3D(this.roleItem.length * 50 - 100, 0, 0))
            $char.px = $pos.x;
            $char.pz = $pos.z;
            this.roleItem.push($char);
            if (this.roleItem.length >= 5) {
                this.isDele = true
            }
        }
 

    
    }

    private ape: BaseWinPanel



    private layaSceneLevel: Scene3dLaya3dSprite
    private addModelChar($pos: Vector3D): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5101"));
        $baseChar.setWing("902");
        $baseChar.setMount("4104");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(CharAction.STANAD);

        $baseChar.px = $pos.x
        $baseChar.py = $pos.y
        $baseChar.pz = $pos.z
        $baseChar.bloodEnable = true;
        $baseChar.nameEnable = true;



        return $baseChar
    }

}