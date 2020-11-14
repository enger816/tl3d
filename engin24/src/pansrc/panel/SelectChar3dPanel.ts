import Sprite = laya.display.Sprite
import Event = laya.events.Event
import {Vector3D} from "../../../pan3d/engine/math/Vector3D"
import {MouseType} from "../../../pan3d/engine/utils/KeyControl"
import {ModelshowMouseManager} from "../../../pan3dinit/scenedis/ModelshowMouseManager"
import {ProgrmaManager} from "../../../pan3d/engine/program/ProgramManager"
import {LineDisplayShader} from "../../../pan3d/engine/scene/grldLevel/LineDisplayShader"
import {GridLineSprite} from "../../../pan3d/engine/scene/grldLevel/LineDisplaySprite"


class SelectChar3dPanel extends Laya.Sprite {
    constructor() {
        super();


        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(100, 0)
        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.addMaskUi(664, 520)
        this.addChild(this.layaSceneLevel)

        this.charItem = new Array
        for (var i: number = 0; i < 10; i++) {
            var tempChar: Game3dChar = this.addModelChar();
            tempChar.px = -0 + i * 100;

            tempChar.px = random(400) - 200;
            tempChar.pz = random(400) - 200;
          //  tempChar.nameEnable = true;
           // tempChar.bloodEnable = true;
            this.charItem.push(tempChar)
        }
        this.addGridLineSprite()
        this.loadSkill()
        this.ape.on(MouseType.MouseDown, this, this.onStartDrag);
        ModelshowMouseManager.getInstance().addMouseEvent();
    }
    private charItem: Array<Game3dChar>
    private addGridLineSprite(): void {
        ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
        var $GridLineSprite: GridLineSprite = new GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);



    }
    private loadSkill(): void {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_1"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    }
    private uiLayaSceneChar: Game3dChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }
    private onStartDrag(e: Event): void {

        var $a: Vector3D = new Vector3D(this.layaSceneLevel.copyCam3d.x, this.layaSceneLevel.copyCam3d.y, this.layaSceneLevel.copyCam3d.z) 

        var $b: Vector3D = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY)

 
        for (var i: number = 0; i < this.charItem.length; i++) {
            var $hit: boolean = this.charItem[i].mouseClik($a, $b)
            if ($hit) {
                this.charItem[i].nameEnable = true;
                this.charItem[i].bloodEnable = true;
            }
        }
    }

    private ape: BaseWinPanel



    private layaSceneLevel: Scene3dLaya3dSprite
    private addModelChar(): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("1001"));


        return $baseChar
    }

}