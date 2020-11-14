
class Scene2dSprite extends Laya.Sprite {
    constructor() {
        super();
        var $imag: Laya.Image = new Laya.Image(Pan3d.Scene_data.fileRoot+"672982210469139386.jpg")
        this.addChild($imag);


        this.layaSceneLevel = new BaseLaya3dSprite();
        this.addChild(this.layaSceneLevel)

        this.uiLayaSceneChar = this.addModelChar()
        this.uiLayaSceneChar.set2dPos(200, 200);  //坐标
        this.uiLayaSceneChar.nameEnable = true
        this.uiLayaSceneChar.bloodEnable = true
 

        $imag.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);

    }
    private uiLayaSceneChar: Game2dChar
    private mouseHandler(e: Laya.Event): void {
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
               this.uiLayaSceneChar.moveTopos(new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));  //坐标
         
                this.showJumpText()


                var $a: Pan3d.Vector3D = new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z)


                break;
            default:
                break
        }
  
    }
    private showJumpText(): void {

        var $jumpVo: Pan3d.TextJumpUiVo = new Pan3d.TextJumpUiVo()
        $jumpVo.str = "122"
        $jumpVo.pos = new Pan3d.Vector3D();
        $jumpVo.pos.x = this.uiLayaSceneChar.px;
        $jumpVo.pos.z = this.uiLayaSceneChar.pz;
        $jumpVo.pos.y = 30
        $jumpVo.type = random(5)
        $jumpVo.starttime = Pan3d.TimeUtil.getTimer();
        $jumpVo.endtime = Pan3d.TimeUtil.getTimer() + 1200;
        this.layaSceneLevel.scene.bloodManager.setJumpNum($jumpVo);
    }
    private layaSceneLevel: BaseLaya3dSprite
    private addModelChar(): Game2dChar{
        var $baseChar: Game2dChar = new Game2dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        //$baseChar.setMount("4104");
        $baseChar.setWing("902");
        //$baseChar.setWeaponByAvatar(50011);
        $baseChar.set2dPos(600,200);  //坐标
        return $baseChar
    }

}