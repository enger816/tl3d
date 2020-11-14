

class SkillDandaoPanel extends Laya.Sprite {
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
        this.addOther()

        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);

        this.loadSkill()
        Pan3d.MathClass.SetShock = false


    } 
    private attactRole: layapan.LayaSceneChar;

    private addOther(): void {

        this.attactRole = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay(this.attactRole);
        this.attactRole.setRoleUrl(getRoleUrl("role_0001"));
        this.attactRole.set2dPos(400, 400)
    }
    private loadSkill(): void {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("skill002"));
        
    }
    private uiLayaSceneChar: layapan.LayaSceneChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
      this.ape.x = Pan3d.Scene_data.cam3D.offset.x
       this.ape.y = Pan3d.Scene_data.cam3D.offset.y
        this.layaSceneLevel.x = this.ape.x 
        this.layaSceneLevel.y = this.ape.y 
        //  this.uiLayaSceneChar.set2dPos(this.ape.x + 200, this.ape.y + 200)

    }


    private ape: BaseWinPanel

    private onStartDrag(e: Event): void {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        Pan3d.PathManager.init();

        var $mouse: Pan3d.Vector2D = new Pan3d.Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y)
        var $tx: number = $mouse.x * scene2d.Override2dEngine.htmlScale;
        var $tz: number = $mouse.y * scene2d.Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
        this.attactRole.set2dPos($mouse.x, $mouse.y)


    this.playDindianSkill(this.uiLayaSceneChar);


      //  this.layaSceneLevel.scene.playLyf("model/ccav_lyf.txt", new Pan3d.Vector3D($tx, 0, $tz));



    }
    private playDindianSkill($char: layapan.LayaSceneChar): void {
        $char.watch(this.attactRole)

  
        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl("erchijinen006"), "skill_0030_2");
       // $skill.actionEnd=true
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
        $char.watch(this.attactRole)
        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl("dandao1"), "skill_0002_2");
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.configTrajectory($char, this.attactRole);
        this.layaSceneLevel.scene.skillManager.playSkill($skill)
    }
   
    private layaSceneLevel: BaseLaya3dSprite
    private addModelChar(): layapan.LayaSceneChar {
        var $baseChar: layapan.LayaSceneChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("erchiyuan006"));

        return $baseChar
    }

}