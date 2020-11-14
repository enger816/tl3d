

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
        this.roleItem.push(this.addModelChar(new Pan3d.Vector3D(-100, 0, 0)));
        this.roleItem.push(this.addModelChar(new Pan3d.Vector3D(-50, 0, 0)));
        this.roleItem.push(this.addModelChar(new Pan3d.Vector3D(0, 0, 0)));
        this.roleItem.push(this.addModelChar(new Pan3d.Vector3D(50, 0, 0)));
        this.roleItem.push(this.addModelChar(new Pan3d.Vector3D(100, 0, 0)));
      

        this.addGridLineSprite()
        this.loadSkill()
        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        this.ape.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
 
    }
    private onMouseWheel(e: any): void {
        this.layaSceneLevel.camDistance += e.delta
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
            var $pos: Pan3d.Vector3D = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY)
            var $char: Game3dChar = this.addModelChar(new Pan3d.Vector3D(this.roleItem.length * 50 - 100, 0, 0))
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
    private addModelChar($pos: Pan3d.Vector3D): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5101"));
        $baseChar.setWing("902");
        $baseChar.setMount("4104");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(Pan3d.CharAction.STANAD);

        $baseChar.px = $pos.x
        $baseChar.py = $pos.y
        $baseChar.pz = $pos.z
        $baseChar.bloodEnable = true;
        $baseChar.nameEnable = true;



        return $baseChar
    }

}