

class Skill3dUiPanel extends Laya.Sprite {
    constructor() {
        super();


        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(100, 0)
        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.addMaskUi(664, 520)
        this.addChild(this.layaSceneLevel)
        this.uiLayaSceneChar = this.addModelChar();
        this.uiLayaSceneChar.nameEnable = true
        this.uiLayaSceneChar.bloodEnable = true

        this.addGridLineSprite()
        this.loadSkill()
        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
    }
    private addGridLineSprite(): void {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite: Pan3d.GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);



    }

    private skillKey = ["400041","400041"];
    private loadSkill(): void {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl(this.skillKey[0]));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl(this.skillKey[1]));
    }
    private uiLayaSceneChar: Game3dChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x 
        this.layaSceneLevel.y = this.ape.y 
    }
    private onStartDrag(e: Event): void {
   

        this.layaSceneLevel.scene.charPlaySkill(this.uiLayaSceneChar, (Math.random() > 0.5 ? this.skillKey[0] : this.skillKey[1]));
        // this.layaSceneLevel.scene.charPlaySkill(this.uiLayaSceneChar, this.skillKey[0]);

        var $pos: Pan3d.Vector3D = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY)
        this.uiLayaSceneChar.px = $pos.x;
        this.uiLayaSceneChar.pz = $pos.z;
    }
   
    private ape: BaseWinPanel
    


    private layaSceneLevel: Scene3dLaya3dSprite
    private addModelChar(): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("4004"));
        // $baseChar.setWing("902");
        // $baseChar.setWeaponByAvatar(50011);

        return $baseChar
    }

}