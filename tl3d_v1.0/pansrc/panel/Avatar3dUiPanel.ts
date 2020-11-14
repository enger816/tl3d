

class Avatar3dUiPanel extends Laya.Sprite {
    constructor() {
        super();
        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(200, 200)


        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.addMaskUi(664, 520)

        this.addChild(this.layaSceneLevel)
        this.uiLayaSceneChar = this.addModelChar();
        this.uiLayaSceneChar.nameEnable = true
        this.uiLayaSceneChar.bloodEnable = true
        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        this.addGridLineSprite()

    }
    private addGridLineSprite(): void {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite: Pan3d.GridLineSprite = new Pan3d.GridLineSprite();
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

    private ape: BaseWinPanel

    private onStartDrag(e: Event): void {

        this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz))
        var $pos: Pan3d.Vector3D = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY)
        this.uiLayaSceneChar.moveTopos3d($pos)
    }

    private layaSceneLevel: Scene3dLaya3dSprite
    private addModelChar(): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        $baseChar.setMount("4104");
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(Pan3d.CharAction.STANAD);
        return $baseChar
    }

}