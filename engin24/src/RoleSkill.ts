import Sprite = laya.display.Sprite
import Event = laya.events.Event
import {Vector3D} from "../pan3d/engine/math/Vector3D"
import Browser = laya.utils.Browser
import {MouseType} from "../pan3d/engine/utils/KeyControl"
import {ModelshowMouseManager} from "../pan3dinit/scenedis/ModelshowMouseManager"
import {Scene_data} from "../pan3d/engine/context/Scene_data"
import {ProgrmaManager} from "../pan3d/engine/program/ProgramManager"
import {LineDisplayShader} from "../pan3d/engine/scene/grldLevel/LineDisplayShader"
import {GridLineSprite} from "../pan3d/engine/scene/grldLevel/LineDisplaySprite"
import {TB_skill_effect} from "./TableData"
import {CharAction} from "../pan3d/baseprite/CharAction"
import Tween = laya.utils.Tween
import Handler = laya.utils.Handler
import {OverrideSkill} from "./pansrc/layapan/overridebase/skill/OverrideSkill"
import {PathManager} from "../pan3d/engine/skill/path/PathManager"


class RoleSkill extends Laya.Sprite {
    //Boss相机角度
    private bossCamparm = [-29, 5, 1311, -80, 217, 5];
    //战斗相机角度
    private fightCamparm = [-24, -15, 1205, -27, 177, 146];
    // private fightCamparm = [4, 0, 990, -54, 250, -97];

    //敌对角色
    private _animysPosition: Array<Vector3D> = [
        new Vector3D(11, 0, -64),//左上
        new Vector3D(48, 0, 208),//右上
        new Vector3D(-124, 0, 109),//第二排左一
        new Vector3D(-20, 0, 129),//第二排左中
        new Vector3D(92, 0, 153),//第二排右一

        new Vector3D(57, 0, -136),//右下
        new Vector3D(-42, 0, -154),//左下
        new Vector3D(120, 0, -33),//第二排右一
        new Vector3D(-73, 0, 209),//第二排右中
        new Vector3D(-102, 0, -84)//第二排右一
    ];

    //Boss站位
    private _bossPosition: Array<Vector3D> = [
        new Vector3D(-30, 0, 138),//第二排右一
        new Vector3D(66, 0, -320),//右下
        new Vector3D(-66, 0, -321),//左下
        new Vector3D(0, 0, -235),//第二排右一

        new Vector3D(119, 0, -219),//第二排右中
        new Vector3D(81, 0, 14),//第二排左一
        new Vector3D(-113, 0, -246),//第二排右一
        new Vector3D(-130, 0, -9),//左上
        new Vector3D(-73, 0, 209),//右上

        new Vector3D(-73, 0, 209),//第二排左中

    ];

    private _charlist: Array<Game3dChar>;
    private _isBoss: boolean;
    constructor() {
        super();
        this._isBoss = getUrlParam("isBoss") ? getUrlParam("isBoss") === "1" : false;
        console.log("----------是否是boss场景:", this._isBoss);
        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        this.ape.pos(0, 0)
        this.ape.size(Browser.width, Browser.height);
        this.layaSceneLevel = new Base3dSceneLayer();
        this.addChild(this.layaSceneLevel)
        this.initCam();
        this._charlist = new Array;
        this._mainChar = this.addModelChar();
        this._charlist.push(this._mainChar);
        this._enemyChar = new Array
        this._enemyChar.push(this.addEnemyChar(1));
        this._enemyChar.push(this.addEnemyChar(2));
        this._enemyChar.push(this.addEnemyChar(3));
        this._charlist = this._charlist.concat(this._enemyChar);
        for (var i = 4; i < 8; i++) {
            this._charlist.push(this.addEnemyChar(i));
        }

        this.loadSkill();
        this.on(MouseType.MouseDown, this, this.onStartDrag);
        ModelshowMouseManager.getInstance().addMouseEvent();

        var $map: string = getUrlParam("map");
        console.log("----------当前加载地图:", $map);
        this.layaSceneLevel.scene.loadScene($map, this.mainSceneComplete, this.mainSceneProgress, this.mainSceneComplete);
        this.addGridLineSprite();
        // this.loadsss()
    }

    /**
     * 初始化相机角度
     */
    public initCam(): void {
        // private bossCamparm = [-29, 5, 1311, -80, 217, 5];
        // private fightCamparm = [-24, -15, 1205, -27, 177, 146];
        let camparm = this._isBoss ? this.bossCamparm : this.fightCamparm;
        //相机角度
        this.layaSceneLevel.camRotationX = camparm[0]; //垂直角度
        this.layaSceneLevel.camRotationY = camparm[1]; //水平角度
        //相机距离
        this.layaSceneLevel.camDistance = camparm[2];
        //相机位置
        this.layaSceneLevel.camPositionX = camparm[3]; //左右
        this.layaSceneLevel.camPositionY = camparm[4]; //上下
        this.layaSceneLevel.camPositionZ = camparm[5]; //前后
        this.layaSceneLevel.camViewLH = 1.0
        this.layaSceneLevel.camFar = 3000
        Scene_data.fogData = [825, 0.003];
    }

    private addGridLineSprite(): void {
        ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
        var $GridLineSprite: GridLineSprite = new GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    }

    private mainSceneComplete(): void {

    }
    private mainSceneProgress(num: number): void {

    }

    private loadSkill(): void {
        var $skillid: string = getUrlParam("skillid");
        console.log("----------当前加载技能:", $skillid);
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl($skillid));
        // this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("300041"));
    }

    private loadsss() {
        let aa = tb.TB_skill_effect.get_TB_skill_effect();
        // let aa  = tb.TB_map.get_TB_map();
        // let aa  = tb.TB_testeffects.get_TB_testeffects();
        // let aa  = tb.TB_testrole.get_TB_testrole();
        for (var i = 0; i < aa.length; i++) {
            var element = aa[i];
            this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl(String(element.effect_id)));
            // this.layaSceneLevel.scene.loadScene(element.map_id, this.mainSceneComplete, this.mainSceneProgress, this.mainSceneComplete);
            // this.layaSceneLevel.scene.playLyf(getEffectUrl(element.beizhu), new Vector3D(180, 0, -420));
            // MeshDataManager.getInstance().getMeshData(getRoleUrl(element.beizhu), ()=>{});
        }
    }

    private _mainChar: Game3dChar
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }
    private sx: number = 0;
    private numIdx: number = 0;
    private onStartDrag(e: Event): void {
        // this.fight();
        // this._mainChar.play(CharAction.JUMP, 2, false);
        // ShockUtil.getInstance().shock(1000, 20);

        // this.testChangeRoleUrl();
        this._mainChar.visible = !this._mainChar.visible;
    }

    private _testRoleUrl = [3206, 4207, 4206, 3209, 4201, 4204, 4205, 3220, 3212, 3221, 3210, 3208, 3217, 3207, 3214, 3201, 3216, 3211, 3202, 4203, 3215, 3218, 3203, 3205, 3222, 4211, 4213];
    private testChangeRoleUrl() {
        // this.numIdx++;
        // this._mainChar.setRoleUrl(getRoleUrl(String(this.numIdx % 2?4205:3208)));
        let x = Math.floor(Math.random() * 28)
        this._mainChar.setRoleUrl(getRoleUrl(String(this._testRoleUrl[x])));
    }

    private fight() {
        // this.sx += 1;
        // let x = (this.sx % 2) + 1
        // var $skilltype: string = String(x);
        // var $ballistic: number = x;//弹道类型
        var $skillid: string = getUrlParam("skillid");
        var $skilltype: string = getUrlParam("skilltype");
        var $att_type: number = Number(getUrlParam("att_type"));//近战远程
        var $ballistic: number = Number(getUrlParam("ballistic"));//弹道类型
        var attck = "skill_0" + $skilltype;
        console.log("当前释放技能：", $skillid, "    动作：", attck);
        if ($att_type == 1) {
            //近战 只会有一个目标
            this._mainChar.watch(this._enemyChar[0]);
            this._mainChar.play(CharAction.WALK, 2, false);
            //法线延长线坐标
            var tpos: Vector3D = new Vector3D(this._enemyChar[0].px, this._enemyChar[0].py, this._enemyChar[0].pz);
            var cpos: Vector3D = new Vector3D(this._mainChar.px, this._mainChar.py, this._mainChar.pz);
            var dis: number = Vector3D.distance(tpos, cpos);
            var normalV3: Vector3D = tpos.subtract(cpos);
            normalV3.normalize();
            normalV3.scaleBy(dis * 0.8);
            var $c3d: Vector3D = cpos.add(normalV3);

            Laya.Tween.to(this._mainChar, { "px": $c3d.x, "pz": $c3d.z }, 500, null,
                Laya.Handler.create(this, ($handlerChar, $s_type, $skillfile, $effectfile) => {
                    this.charPlaySkill($handlerChar, $s_type, $skillfile, $effectfile);
                }, [this._mainChar, $att_type, $skillid, attck]));
        } else if ($att_type == 2) {
            //远攻 攻击几个，就有几个目标
            if ($ballistic == 1) {
                //弹道类型
                for (var i = 0; i < this._enemyChar.length; i++) {
                    this._mainChar.watch(this._enemyChar[i]);
                    this.charDandaoPlaySkill(this._mainChar, this._enemyChar[i], $skillid, attck);
                }
            } else {
                let postion = this._isBoss ? this._bossPosition : this._animysPosition;
                let ary = $ballistic == 3 || $ballistic == 0 ? null : [postion[1]];
                this.charPlaySkill(this._mainChar, $att_type, $skillid, attck, ary);
            }
        }
    }

    private charDandaoPlaySkill($charVo: Game3dChar, $target: Game3dChar, skillfile, effectfile) {
        if (!$charVo._scene.ready) {
            return;
        }

        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl(skillfile), effectfile);
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }

        PathManager.init();
        $skill.needSound = true
        $skill.configTrajectory($charVo, $target, () => {
            loge("技能结束");
        });
        loge("开始播放");
        this.layaSceneLevel.scene.skillManager.playSkill($skill)
    }

    //使用技能
    private charPlaySkill($charVo: Game3dChar, $att_type, skillfile, effectfile, $targetAry: Array<Vector3D> = null): void {
        //技能播放结束回调
        var comSkillFun: Function = () => {
            setTimeout(() => {
                if ($att_type == 1) {
                    $charVo.rotationY += 180;
                    $charVo.play(CharAction.WALK, 2, false);
                    let postion = this._isBoss ? this._bossPosition : this._animysPosition;
                    Laya.Tween.to($charVo, { "px": postion[0].x, "pz": postion[0].z }, 500, null, Laya.Handler.create(this, () => {
                        $charVo.rotationY += 180;
                    }));
                }
            }, 300)

        };
        if (!$charVo._scene.ready) {
            return;
        }
        var $skill: layapan.OverrideSkill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl(skillfile), effectfile);
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.needSound = true
        $skill.configFixEffect($charVo, comSkillFun, $targetAry);
        this.layaSceneLevel.scene.skillManager.playSkill($skill)
    }

    private ape: BaseWinPanel
    private layaSceneLevel: Base3dSceneLayer
    private _pos: Vector3D = new Vector3D(10, 10, 10);
    private addModelChar(): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        var $role: string = getUrlParam("role")
        console.log("----------当前加载角色:", $role);
        $baseChar.scale = 3
        $baseChar.setRoleUrl(getRoleUrl($role));
        let postion = this._isBoss ? this._bossPosition : this._animysPosition;
        $baseChar.px = postion[0].x;
        $baseChar.py = postion[0].y;
        $baseChar.pz = postion[0].z;
        if (this._isBoss) {
            $baseChar.rotationY = 180
        }
        // $baseChar.play(CharAction.JUMP, 2, false);
        $baseChar.visible = true;
        return $baseChar
    }

    private _enemyChar: Array<Game3dChar>;
    private addEnemyChar($idx: number): Game3dChar {
        let enemyChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay(enemyChar);
        enemyChar.setRoleUrl(getRoleUrl("4004"));
        // enemyChar.scale = 3;
        let postion = this._isBoss ? this._bossPosition : this._animysPosition;
        enemyChar.px = postion[$idx].x
        enemyChar.py = postion[$idx].y
        enemyChar.pz = postion[$idx].z
        return enemyChar;
    }
}
