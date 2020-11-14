

class RoleSkill extends Laya.Sprite {
    //Boss相机角度
    private bossCamparm = [-29, 5, 1311, -80, 217, 5];
    //战斗相机角度
    private fightCamparm = [-24, -15, 1205, -27, 177, 146];
    // private fightCamparm = [4, 0, 990, -54, 250, -97];

    //敌对角色
    private _animysPosition: Array<tl3d.Vector3D> = [
        new tl3d.Vector3D(11, 0, -64),//左上
        new tl3d.Vector3D(48, 0, 208),//右上
        new tl3d.Vector3D(-124, 0, 109),//第二排左一
        new tl3d.Vector3D(-20, 0, 129),//第二排左中
        new tl3d.Vector3D(92, 0, 153),//第二排右一

        new tl3d.Vector3D(57, 0, -136),//右下
        new tl3d.Vector3D(-42, 0, -154),//左下
        new tl3d.Vector3D(120, 0, -33),//第二排右一
        new tl3d.Vector3D(-73, 0, 209),//第二排右中
        new tl3d.Vector3D(-102, 0, -84)//第二排右一
    ];

    //Boss站位
    private _bossPosition: Array<tl3d.Vector3D> = [
        new tl3d.Vector3D(-30, 0, 138),//第二排右一
        new tl3d.Vector3D(66, 0, -320),//右下
        new tl3d.Vector3D(-66, 0, -321),//左下
        new tl3d.Vector3D(0, 0, -235),//第二排右一

        new tl3d.Vector3D(119, 0, -219),//第二排右中
        new tl3d.Vector3D(81, 0, 14),//第二排左一
        new tl3d.Vector3D(-113, 0, -246),//第二排右一
        new tl3d.Vector3D(-130, 0, -9),//左上
        new tl3d.Vector3D(-73, 0, 209),//右上

        new tl3d.Vector3D(-73, 0, 209),//第二排左中

    ];

    // private maps = ["scene004"];
    private maps = ["scene001", "scene011", "scene014"];
    // private maps = ["scene001", "scene002", "scene003", "scene004", "scene005", "scene006", "scene007", "scene008", "scene010", "scene011", "scene012", "scene013", "scene014", "scene015", "scene016"
    //     , "scene017", "scene018", "scene019", "scene020", "scene021"];

    private _charlist: Array<Game3dChar>;
    private _isBoss: boolean;
    constructor() {
        super();
        tl3d.Scene_data.isPc = true;
        this.mouseEnabled = true;
        // scenedis.ModelshowMouseManager.getInstance().addMouseEvent();

        document.addEventListener(tl3d.MouseType.MouseDown, ($evt: MouseEvent) => { this.onStartDrag() });

        this._isBoss = getUrlParam("isBoss") ? getUrlParam("isBoss") === "1" : false;
        console.log("----------是否是boss场景:", this._isBoss);
        this.layaSceneLevel = new Base3dSceneLayer();
        this.addChild(this.layaSceneLevel)


        this.initCam();
        // this._charlist = new Array;
        // this._mainChar = this.addModelChar();
        // this._charlist.push(this._mainChar);
        // this._enemyChar = new Array
        // this._enemyChar.push(this.addEnemyChar(1));
        // this._enemyChar.push(this.addEnemyChar(2));
        // this._enemyChar.push(this.addEnemyChar(3));
        // this._charlist = this._charlist.concat(this._enemyChar);
        // for (var i = 4; i < 8; i++) {
        //     this._charlist.push(this.addEnemyChar(i));
        // }

        // this.loadSkill();


        Laya.stage.on(tl3d.MouseType.MouseDown, this, this.onStartDrag);

        // setTimeout(() => {
        //     for (var i = 0; i < this._charlist.length; i++) {
        //         var element = this._charlist[i];
        //         this.layaSceneLevel.scene.addMovieDisplay(element);
        //         element.play(tl3d.CharAction.JUMP, 2, false);
        //     }
        // }, 1500);

        // var $map: string = getUrlParam("map");

        this.loadMap("scene011");

        this.addGridLineSprite()

        // var $imag: Laya.Image = new Laya.Image("res/btn_qianwang.png")
        // $imag.mouseEnabled = true;
        // // $imag.alpha = 0
        // this.addChild($imag);
        // $imag.on(tl3d.MouseType.MouseDown, this, this.onStartDrag);
    }


    private loadMap(mapid) {
        this.layaSceneLevel.scene.clearStaticScene();

        if (!mapid) {
            let newmapid = Math.floor(random(this.maps.length));
            mapid = this.maps[newmapid]
        }
        console.log("----------当前加载地图:", mapid);
        this.layaSceneLevel.scene.loadScene(mapid, () => { }, this.mainSceneProgress, this.mainSceneComplete.bind(this));
    }

    /**
     * 初始化相机角度
     */
    public initCam(): void {
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
        this.layaSceneLevel.camFar = 6000
        tl3d.Scene_data.fogData = [825, 0.003];
    }

    private addGridLineSprite(): void {
        tl3d.ProgrmaManager.getInstance().registe(tl3d.LineDisplayShader.LineShader, new tl3d.LineDisplayShader);
        var $GridLineSprite: tl3d.GridLineSprite = new tl3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    }

    private mainSceneComplete(): void {
        this._mainChar = this.addModelChar();
    }
    private mainSceneProgress(num: number): void {

    }

    private loadSkill(): void {
        var $skillid: string = getUrlParam("skillid");
        console.log("----------当前加载技能:", $skillid);
        this.layaSceneLevel.scene.skillMgr.preLoadSkill(getSkillUrl($skillid));
        // this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("300041"));
    }
    private _mainChar: Game3dChar
    private sx: number = 0;
    private onStartDrag(): void {
        console.log("点击了：");

        this.loadMap(null);
        // this.fight();
        // this._mainChar.play(tl3d.CharAction.JUMP, 2, false);
        // tl3d.ShockUtil.getInstance().shock(1000, 20);
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
            this._mainChar.play(tl3d.CharAction.WALK, 2, false);
            //法线延长线坐标
            var tpos: tl3d.Vector3D = new tl3d.Vector3D(this._enemyChar[0].px, this._enemyChar[0].py, this._enemyChar[0].pz);
            var cpos: tl3d.Vector3D = new tl3d.Vector3D(this._mainChar.px, this._mainChar.py, this._mainChar.pz);
            var dis: number = tl3d.Vector3D.distance(tpos, cpos);
            var normalV3: tl3d.Vector3D = tpos.subtract(cpos);
            normalV3.normalize();
            normalV3.scaleBy(dis * 0.8);
            var $c3d: tl3d.Vector3D = cpos.add(normalV3);

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

        var $skill: tl3d.Skill = this.layaSceneLevel.scene.skillMgr.getSkill(getSkillUrl(skillfile), effectfile);
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }

        tl3d.PathManager.init();
        $skill.needSound = true
        $skill.configTrajectory($charVo, $target, () => {
            loge("技能结束");
        });
        loge("开始播放");
        this.layaSceneLevel.scene.skillMgr.playSkill($skill)
    }

    //使用技能
    private charPlaySkill($charVo: Game3dChar, $att_type, skillfile, effectfile, $targetAry: Array<tl3d.Vector3D> = null): void {
        //技能播放结束回调
        var comSkillFun: Function = () => {
            setTimeout(() => {
                if ($att_type == 1) {
                    $charVo.rotationY += 180;
                    $charVo.play(tl3d.CharAction.WALK, 2, false);
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
        var $skill: tl3d.Skill = this.layaSceneLevel.scene.skillMgr.getSkill(getSkillUrl(skillfile), effectfile);
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.needSound = true
        $skill.configFixEffect($charVo, comSkillFun, $targetAry);
        this.layaSceneLevel.scene.skillMgr.playSkill($skill)
    }

    private layaSceneLevel: Base3dSceneLayer
    private _pos: tl3d.Vector3D = new tl3d.Vector3D(10, 10, 10);
    private addModelChar(): Game3dChar {
        var $baseChar: Game3dChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        // var $role: string = getUrlParam("role")
        // console.log("----------当前加载角色:", $role);
        $baseChar.setRoleUrl(getRoleUrl(20011));
        // $baseChar.scale = 3
        let postion = this._isBoss ? this._bossPosition : this._animysPosition;
        $baseChar.px = postion[0].x;
        $baseChar.py = postion[0].y + 100;
        $baseChar.pz = postion[0].z;
        if (this._isBoss) {
            $baseChar.rotationY = 180
        }
        // $baseChar.play(tl3d.CharAction.JUMP, 2, false);
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
