

class SanguoRoleVo {

    public Char: layapan.LayaSceneChar;
    public type: number;
    public name: string;
}
class SanguoSkillVo {
    public skillfile: string;
    public effectName: string;
}
class Sanguo3dScenePanel extends Laya.Sprite {
    constructor() {
        super();
        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(250, 250)


        this.layaSceneLevel = new Scene3dLaya3dSprite();
        this.layaSceneLevel.camAotuMove = false;
        this.layaSceneLevel.camRotationY = 45
        this.layaSceneLevel.camDistance=520
        this.addChild(this.layaSceneLevel)
        this.layaSceneLevel.addMaskUi(664 - 80, 520 - 80);

   

        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        this.ape.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
        this.roleItem = new Array()

        this.addBaseRole("wujiang_0001", new Pan3d.Vector3D(-70, 0, -80), 90);
        this.addBaseRole("wujiang_0002", new Pan3d.Vector3D(-70, 0, -30), 90);
        this.addBaseRole("wujiang_0003", new Pan3d.Vector3D(-70, 0, +30), 90);
        this.addBaseRole("wujiang_0014", new Pan3d.Vector3D(-70, 0, +80), 90);


        this.addBaseRole("npc_0003", new Pan3d.Vector3D(+70, 0, -80), -90);
        this.addBaseRole("npc_0004", new Pan3d.Vector3D(+70, 0, -30), -90);
        this.addBaseRole("npc_0005", new Pan3d.Vector3D(+70, 0, +30), -90);
        this.addBaseRole("npc_0006", new Pan3d.Vector3D(+70, 0, +80),- 90);

        this.skillItem = new Array();
        this.addSkillToItem("spell_0001", "skill_001")
        this.addSkillToItem("spell_0002", "skill_002")
        this.addSkillToItem("spell_0003", "skill_003")
        this.addSkillToItem("spell_0004", "skill_004")
        this.addSkillToItem("spell_0005", "skill_005")
        this.addSkillToItem("spell_0006", "skill_006")
        this.addSkillToItem("spell_10001", "skill_001_2")
        this.addSkillToItem("spell_10002", "skill_003_2")
        this.addSkillToItem("spell_10003", "skill_002_2")
        this.addSkillToItem("spell_10004", "skill_004_2")
        this.addSkillToItem("spell_10006", "skill_014_2")

        this.addGridLineSprite();

        this.layaSceneLevel.scene.loadScene("1001", this.mainSceneComplete, this.mainSceneProgress, this.mainSceneComplete)

    }
    private addSkillToItem($skillfile: string, $effectName: string): void {
        var $vo: SanguoSkillVo = new SanguoSkillVo();
        $vo.skillfile = $skillfile;
        $vo.effectName = $effectName;
        this.skillItem.push($vo)

        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl($vo.skillfile));
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
   // private uiLayaSceneChar: layapan.LayaSceneChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x + 40
        this.layaSceneLevel.y = this.ape.y + 40


    }


    private ape: BaseWinPanel
    private dragRegion: Laya. Rectangle;


    private skipNum: number = 0

    private skillItem: Array<SanguoSkillVo>

    private onMouseWheel(e: any): void {
     

        this.layaSceneLevel.camDistance += e.delta
    }
    private onStartDrag(e: Event): void {
        var $id: number = this.skipNum++ % this.roleItem.length

        var $SanguoRoleVo: SanguoRoleVo = this.roleItem[$id]

      

        var $skillVo: SanguoSkillVo;
        switch ($SanguoRoleVo.name) {
            case "wujiang_0001":
                $skillVo = this.skillItem[0]
                break;
            case "wujiang_0002":
                $skillVo = this.skillItem[3]
                break;
            case "wujiang_0003":
                $skillVo = this.skillItem[5]
                break;
            case "wujiang_0014":
                $skillVo = this.skillItem[5]
                break;
            default:
                 $skillVo = this.skillItem[random(this.skillItem.length)]
                break

        }

        this.charPlaySkill($SanguoRoleVo.Char, $skillVo.skillfile, $skillVo.effectName);

    }
    private charPlaySkill($char: layapan.LayaSceneChar, $skillfile: string, $effectName: string): void {
        if (!$char._scene.ready) {
            return;
        }

        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl($skillfile), $effectName);
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.configFixEffect($char);
        this.layaSceneLevel.scene.skillManager.playSkill($skill)

        this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D($char.px, $char.py, $char.pz))
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
    private roleItem: Array<SanguoRoleVo>
    private addBaseRole($str: string = "ms_0001", $pos: Pan3d.Vector3D=null, $rotation: number=0): void {
        
        var $baseChar: layapan.LayaSceneChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl($str));
        if ($pos) {
            $baseChar.px = $pos.x
            $baseChar.py = $pos.y
            $baseChar.pz = $pos.z
        }
        $baseChar.rotationY = $rotation
        if ($pos.x > 0) {
            $baseChar.scale = 0.7
        }
     

        var $vo: SanguoRoleVo = new SanguoRoleVo()
        $vo.name = $str
        $vo.type = 0;
        $vo.Char = $baseChar;

        $baseChar.nameEnable = true;
        $baseChar.bloodEnable = true;


        this.roleItem.push($vo);
  
    }

}