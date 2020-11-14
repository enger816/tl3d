

class Mode3dPanel extends Laya.Sprite {
    constructor() {
        super();

        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(250, 250)


        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.scene.changeBloodManager(new layapan.LayaBloodManager)
        this.layaSceneLevel.camAotuMove = false
     //    this.layaSceneLevel.camRotationX=40

        this.addChild(this.layaSceneLevel)
        this.layaSceneLevel.addMaskUi(664 - 80, 520 - 80)
        //this.uiLayaSceneChar = this.addModelChar();
        //this.uiLayaSceneChar.nameEnable = true
        //this.uiLayaSceneChar.bloodEnable = true

        //this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        //this.ape.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);

        this.addGridLineSprite();

        this.addModes()

      // this.layaSceneLevel.scene.loadScene("scene011", this.mainSceneComplete, this.mainSceneProgress, this.mainSceneComplete)

    }
    private   addModes(): void {
        this.layaSceneLevel.scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + "model/pantest1.txt", (groupRes: Pan3d.GroupRes) => {
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: Pan3d. GroupItem = groupRes.dataAry[i];
                var display: Pan3d.Display3DSprite = new Pan3d.Display3DSprite();
                display.setObjUrl(item.objUrl);
                display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                display.dynamic = true;
                this.layaSceneLevel.scene.addSpriteDisplay(display);

            }
        })

    }
    private onMouseWheel(e: any): void {
        this.layaSceneLevel.camDistance += e.delta
    }
    private mainSceneComplete(): void {
    }
    private mainSceneProgress(num: number): void {

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
    private uiLayaSceneChar: layapan.LayaSceneChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x + 40
        this.layaSceneLevel.y = this.ape.y + 40


    }


    private ape: BaseWinPanel
    private dragRegion: Laya.Rectangle;


    private onStartDrag(e: Event): void {


        if (this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK || this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK_MOUNT) {
            this.uiLayaSceneChar.play(Pan3d.CharAction.STANAD)
        } else {
            this.uiLayaSceneChar.play(Pan3d.CharAction.WALK)
        }

        this.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz))
    }
    public showJumpText($scene: layapan.LayaOverride2dSceneManager, $pos: Pan3d.Vector3D): void {

        var $jumpVo: Pan3d.TextJumpUiVo = new Pan3d.TextJumpUiVo()
        $jumpVo.str = String(random(999));
        $jumpVo.pos = new Pan3d.Vector3D();
        $jumpVo.pos.x = $pos.x
        $jumpVo.pos.z = $pos.z
        $jumpVo.pos.y = 30
        $jumpVo.type = 2
        $jumpVo.starttime = Pan3d.TimeUtil.getTimer();
        $jumpVo.endtime = Pan3d.TimeUtil.getTimer() + 1200;
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
        $baseChar.play(Pan3d.CharAction.STAND_MOUNT);

        return $baseChar
    }

}