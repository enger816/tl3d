import Sprite = laya.display.Sprite
import Event = laya.events.Event
import {Vector3D} from "../../../pan3d/engine/math/Vector3D"
import {MouseType} from "../../../pan3d/engine/utils/KeyControl"
import {ModelshowMouseManager} from "../../../pan3dinit/scenedis/ModelshowMouseManager"
import {ProgrmaManager} from "../../../pan3d/engine/program/ProgramManager"
import {LineDisplayShader} from "../../../pan3d/engine/scene/grldLevel/LineDisplayShader"
import {GridLineSprite} from "../../../pan3d/engine/scene/grldLevel/LineDisplaySprite"


class Particle3dPanel extends Laya.Sprite {
    constructor() {
        super();


        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(150, 50)
        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.addMaskUi(664, 520)
        this.addChild(this.layaSceneLevel)

        this.uiLayaSceneChar = this.addModelChar()
        this.uiLayaSceneChar.bloodEnable = true;
    
        this.uiLayaSceneChar.nameEnable = true;
         this.uiLayaSceneChar.shadow = true;

        this.uiLayaSceneChar.px = 100;
        this.uiLayaSceneChar.pz = 100;

        this.addGridLineSprite()

        this.ape.on(MouseType.MouseDown, this, this.onStartDrag);
        ModelshowMouseManager.getInstance().addMouseEvent();
    }
    private addGridLineSprite(): void {
        ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
        var $GridLineSprite: GridLineSprite = new GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);



    }
    private uiLayaSceneChar: Game3dChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }
    private onStartDrag(e: Event): void {

        var $pos: Vector3D = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY)
        this.layaSceneLevel.scene.playLyf("model/texiao001.txt", $pos);
    }

    private ape: BaseWinPanel
    private layaSceneLevel: Scene3dLaya3dSprite

    private addModelChar(): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5101"));
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);

        return $baseChar
    }
  

}