import Sprite = laya.display.Sprite
import Event = laya.events.Event
import {Vector2D} from "../../../pan3d/engine/math/Vector2D"
import {Vector3D} from "../../../pan3d/engine/math/Vector3D"
import {MouseType} from "../../../pan3d/engine/utils/KeyControl"
import {Override2dEngine} from "../../../pan3dinit/scene2d/override2d/Override2dEngine"
import {CharAction} from "../../../pan3d/baseprite/CharAction"




class SelectChar2dPanel extends Laya.Sprite {
    constructor() {
        super();
        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(100, 100)

        this.layaSceneLevel = new BaseLaya3dSprite();
        this.addChild(this.layaSceneLevel)
        this.uiLayaSceneChar = this.addModelChar();
        this.uiLayaSceneChar.nameEnable = true
        this.uiLayaSceneChar.bloodEnable = true


        this.ape.on(MouseType.MouseDown, this, this.onStartDrag);
    }
    private uiLayaSceneChar: Game2dChar

    public render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }


    private ape: BaseWinPanel

    private onStartDrag(e: Event): void {
        var $mouse: Vector2D = new Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y)
        var $tx: number = $mouse.x * scene2d.Override2dEngine.htmlScale;
        var $tz: number = $mouse.y * scene2d.Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
        this.layaSceneLevel.scene.playLyf("model/texiao001.txt", new Vector3D($tx, 0, $tz));
    }


    private layaSceneLevel: BaseLaya3dSprite
    private addModelChar(): Game2dChar {
        var $baseChar: Game2dChar = new Game2dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        $baseChar.setMount("4104");
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(CharAction.STAND_MOUNT);
        $baseChar.forceRotationY = 145
        $baseChar.set2dPos(400, 200);  //坐标
        return $baseChar
    }

}