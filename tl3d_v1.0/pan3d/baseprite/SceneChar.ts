module Pan3d {
    export class SceneChar extends SceneBaseChar {
        public _speedDirect: Vector3D;
        public speedTX: number = 1.5 / 20;
        public life: number = 0;

        protected _walkPath: Array<Vector3D>;
        private _astarDirect: Vector3D;
        private _astatTopos: Vector3D;
        public skillitem: Array<Skill>;//存放着角色的技能;

        public unit: Unit;
        public mountChar: MountChar;
        public isMount: boolean = false;

        public static WEAPON_PART: string = "weapon";
        public static WEAPON_DEFAULT_SLOT: string = "w_01";
        public static MOUNT_SLOT: string = "mount_01";
        public static WING_SLOT: string = "wing_01";
        public static SEL_PART: string = "select";
        public static QUEST_ICON: string = "questicon";
        public static NONE_SLOT: string = "none";

        protected _px: number = 0;
        protected _py: number = 0;
        protected _pz: number = 0;
        private _pRotationY: number = 0;
        private _isBoss: boolean = false;

        private _optimization: boolean = false;//当优化为true的时候 不显示

        public constructor() {
            super();
            this.shadow = true;
            this.skillitem = new Array();
        }
        public get isDeath(): boolean {
            return false
        }
        public get isBoss(): boolean {
            return this._isBoss;
        }
        public set isBoss(val: boolean) {
            this._isBoss = val;
        }
        public get px(): number {
            return this._px;
        }
        public set px(val: number) {
            this._px = val;
            if (this.isMount) {
                this.mountChar.x = val;
                if (this._shadow) {
                    this._shadow.x = val;
                }
            } else {
                this.x = val;
            }
        }
        public get py(): number {
            return this._py;
        }
        public set py(val: number) {
            this._py = val;
            if (this.isMount) {
                this.mountChar.y = val;
                if (this._shadow) {
                    this._shadow.y = val;
                }
            } else {
                this.y = val;
            }
        }
        public get pz(): number {
            return this._pz;
        }
        public set pz(val: number) {
            this._pz = val;
            if (this.isMount) {
                this.mountChar.z = val;
                if (this._shadow) {
                    this._shadow.z = val;
                }
            } else {
                this.z = val;
            }


        }
        /**强制角度 */
        public set forceRotationY(val: number) {
            this.pRotationY = val;
            this.rotationY = val;
            this.toRotationY = val;
        }

        public get pRotationY(): number {
            return this._pRotationY;
        }
        public set pRotationY(val: number) {
            this._pRotationY = val;
            if (this.isMount) {
                this.mountChar.rotationY = val;
            } else {
                this.rotationY = val;
            }
        }
        public play($action: string, $completeState: number = 0, needFollow: boolean = true): boolean {


            if (this.isSinging) {
                $completeState = 0;//吟唱时动作状态成为2;
                if ($action == CharAction.WALK || $action == CharAction.STANAD) {
                    return true;
                }
            }

            if (this.isMount) {

                this.mountChar.visible = Boolean($action != CharAction.JUMP)
                if ($action == CharAction.STANAD) {
                    super.play(CharAction.STAND_MOUNT);
                } else if ($action == CharAction.WALK) {
                    super.play(CharAction.WALK_MOUNT);
                } else {
                    if (this.mountChar.visible) {
                        super.play(CharAction.STAND_MOUNT);
                    } else {
                        super.play(CharAction.JUMP);
                    }

                }
                return this.mountChar.play($action, $completeState, needFollow);
            } else {
                return super.play($action, $completeState, needFollow)
            }
            // if (this.unit && this.unit.isMain) {
            //     if (this.isMount) {
            //         //console.log("有坐骑")
            //     } else {
            //         //console.log("无坐骑") 
            //     }
            // }
        }


        public getCurrentAction(): string {
            if (this.isMount) {
                return this.mountChar.curentAction;
            } else {
                return this.curentAction;
            }
        }


        protected getSceneCharAvatarUrl(num: number): string {

            var $tempNum: string = String(num)
            if (num == 0) {
                //console.log("衣服为0")
                throw new Error("衣服为getSceneCharAvatarUrl");
            }
            var $url: string = getRoleUrl($tempNum);
            return $url
        }
        public static Defaul_Man_Avatar: number = 2002//男
        public static Defaul_WoMan_Avater: number = 2012//女
        public setMount(): void {

            

        }




  

        private _weaponNum: number = -1;
        public setWeapon(num: number): void {
            if (this._weaponNum == num) {
                return;
            }
            this._weaponNum = num;
            if (num <= 0) {//移除武器
                this.removePart(SceneChar.WEAPON_PART);
            } else {
           
            }
        }

        public setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
         
        }

        private _wingID: number = -1;
        protected _wingDisplay: SceneBaseChar;
       


        public addTestWeapon(): void {
            this.addPart("test" + Math.random(), SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(Math.random() > 0.5 ? 5202 : 5201));
        }
       

        private _charTitleVo: CharTitleMeshVo;
        public refreshTittle(): void {
          
            this.refreshPos();
        }


        protected _charNameVo: CharNameMeshVo;

        public showName($color: string = null): void {
         
            var nameAry: Array<string> = this.unit.getName().split(",");
            var $baseName: string = nameAry[nameAry.length - 1]
            $color = "[00ff00]"
     
            var $colorName: string =  $color + $baseName 
            if (!this._charNameVo) {
                this._charNameVo = BloodManager.getInstance().getCharNameMeshVo($colorName)
            } else {
                this._charNameVo.name = $colorName;
            }

            this.refreshPos()

        }


        protected _charBloodVo: BloodLineMeshVo;
        private lastBloodcolorType = 0
        public showBlood($colorType: number = 0): void {
            //添加显示血条 -FIXME--0
            this.lastBloodcolorType = $colorType
            if (!this._charBloodVo) {
                this._charBloodVo = BloodManager.getInstance().getBloodLineMeshVo()
                this._charBloodVo.colortype = $colorType;
            } else {
                this._charBloodVo.colortype = $colorType;
            }
            this.refreshPos()
        }

        public tittleHeight: number = 50

        public onMeshLoaded(): void {
            if (this._skinMesh) {
                this.tittleHeight = this._skinMesh.tittleHeight
            }

        }

        public refreshPos(): void {

            //处理血条和名字位置 -FIXME--0
            if (this._charBloodVo) {
                this._charBloodVo.pos.x = this.px
                if (this.isMount) {
                    this._charBloodVo.pos.y = this.py + this.tittleHeight - 6 + 20;
                } else {
                    this._charBloodVo.pos.y = this.py + this.tittleHeight - 6;
                }
                this._charBloodVo.pos.z = this.pz
                this._charBloodVo.visible = this._resultVisible;
            }
            if (this._charNameVo) {
                this._charNameVo.pos.x = this.px;
                if (this.isMount) {
                    this._charNameVo.pos.y = this.py + this.tittleHeight + 20;
                } else {
                    this._charNameVo.pos.y = this.py + this.tittleHeight;
                }
                this._charNameVo.pos.z = this.pz
                this._charNameVo.visible = this._resultVisible;

            }




            if (this._charTitleVo) {
                this._charTitleVo.pos.x = this.px;
                if (this.isMount) {
                    this._charTitleVo.pos.y = this.py + this.tittleHeight + 20 + 10
                } else {
                    this._charTitleVo.pos.y = this.py + this.tittleHeight + 10;
                }
    
                this._charTitleVo.pos.z = this.pz

                this._charTitleVo.visible = this._resultVisible;

            }
        }
        public set walkPath($wp: Array<Vector3D>) {
            if ($wp.length == 0) {
                return;
            }
            // //console.log("收到寻路信息",$wp,  TimeUtil.getTimer())



            if (this.curentAction == CharAction.STANAD || this.curentAction == CharAction.STAND_MOUNT) {
                this.play(CharAction.WALK);
            }
            this._walkPath = $wp;
            this.setTarget();
            this._speedDirect = null;


        }
        /*
        public set walkPath2D($item: Array<Vector2D>) {
            //if (this.unit) {
            //    this.unit.sendPath($item);
            //}
          //  $item.splice(0, 1);
            $item.shift()
            this.applyWalk($item)
        }
        private setWalkPathFun($item: Array<Vector2D>, $bfun: Function = null): void {
    
            this.walkPath2D = $item;
            this.walkCompleteBackFun = $bfun
    
        }
        */
        //得到A星数据后重新刷坐标
        public fixAstartData(pos: Vector2D): void {
            if (this._walkPath) {
                for (var i: number = 0; i < this._walkPath.length; i++) {
                    this._walkPath[i].x += pos.x;
                    this._walkPath[i].z = pos.y - this._walkPath[i].z;
                    this._walkPath[i].y = AstarUtil.getHeightByPos(this._walkPath[i]);
                }
            }
            this.px += pos.x;
            this.pz = pos.y - this.pz;
            if (this._astatTopos) {
                this._astatTopos.x += pos.x;
                this._astatTopos.z = pos.y - this._astatTopos.z;
                this.setAstarNrmAndRotation();
            }
            this.refreshY();

        }

        public applyWalk($item: Array<Vector2D>): void {

            if ($item && $item.length == 2) {
                //排除是停止的路径将不处理
                if ($item[0].x == $item[1].x && $item[0].y == $item[1].y) {

                    this._speedDirect = null;
                    this._walkPath = null;
                    if (this.curentAction == CharAction.WALK) {
                        this.play(CharAction.STANAD);
                    }
                    var $k: Vector3D = AstarUtil.getWorldPosByStart2D($item[0]);
                    this.px = $k.x;
                    this.pz = $k.z;
                    return;
                }
            }
            this.walkPath = AstarUtil.Path2dTo3d($item);
        }
       
        public set moveToPos2D($v2d: Vector2D) {
            // $v2d=new Vector2D(154,87)
            this._walkPath = null;
            this.play(this._defaultAction);
            var pos: Vector3D = AstarUtil.getWorldPosByStart2D($v2d);
            this.px = pos.x;
            this.pz = pos.z;
            this.refreshY();


        }

        private stopToPos($v2d: Vector2D): void {
            var pos: Vector3D = AstarUtil.getWorldPosByStart2D($v2d);
            var arr: Array<Vector3D> = new Array;
            arr.push(pos);
            this.walkPath = arr;
        }

        private moveTile(xt: number, yt: number) {
            this.moveToPos2D = new Vector2D(xt, yt);
        }
        public updateFrame(t: number): void {
            super.updateFrame(t);
     
        }

        public refreshY(): void {
            this.py = AstarUtil.getHeightByPos(this.getCurrentPos());
            this.refreshPos();
        }
        public refreshHP(): void {

        }
      


        //平滑num=1为直接
        protected rotationToNew(value: number, num: number = 1): void {
            var anum: number = value - this.pRotationY;
            if (anum == 0) {
                return;
            }
            if (anum < 1) {
                this.pRotationY = value;
                return;
            }
            var a: number = ((value - this.pRotationY) % 360 + 360) % 360;
            if (a > 180) {
                this.pRotationY -= (360 - a) / num;
            } else {
                this.pRotationY += a / num;
            }

        }
        //设计毫秒走每个格子，
        public set speedUseTime(value: number) {
            // this.speed = 0.01 * (1000 / (value))

            this.speedTX = 0.01 * (value / 10);
            ////console.log(this.speedTX )
        }
        public refreshSpeed(): void {

            this.speedUseTime = 1
        }
        private lastPos: Vector3D
        protected walkAstar(t: number): void {
            if (this.unit && this.unit.isMain) {

            }
            var $wk: number = Math.min(t, 50)
            var distance: number = Vector3D.distance(new Vector3D(this.px, 0, this.pz), this._astatTopos);
            if (distance > 5) {
                var sn: number = $wk * this.speedTX;
                if (sn > distance) {
                    this.px = this._astatTopos.x;
                    this.pz = this._astatTopos.z;
                    var tempT: number = (sn - distance) / this.speedTX;
                    this.walkAstar(tempT);
                } else {
                    this.px += this._astarDirect.x * sn;
                    this.pz += this._astarDirect.z * sn;
                }
            } else {
                this.setTarget();
                if (!this._walkPath) {//已结束
                    this.px = this._astatTopos.x;
                    this.pz = this._astatTopos.z;
                    this.walkComplete()
                } else {
                    this.walkAstar(t);
                }
            }
        }

        protected walkComplete(): void {

            if (this.walkCompleteBackFun) {
                this.walkCompleteBackFun()
            }
        }
        public walkCompleteBackFun: Function;
        protected setTarget(): void {
            if (!this._walkPath) {
                return;
            }
            if (this._walkPath.length == 0) {
                this._walkPath = null;
                this.play(CharAction.STANAD);
                return;
            }
            this._astatTopos = this._walkPath.shift();
            this.setAstarNrmAndRotation()

        }
        //计算移动角度和寻路方向 
        public setAstarNrmAndRotation(): void {
            if (this._astatTopos) {
                this._astarDirect = this._astatTopos.subtract(this.getCurrentPos());
                this._astarDirect.y = 0;
                this._astarDirect.normalize();
                if (Vector3D.distance(this.getCurrentPos(), this._astatTopos) > 10) {
                    this.toRotationY = this.mathAngle(this._astatTopos.z, this._astatTopos.x, this.pz, this.px) + 180
                }
            }
        }
        public toRotationY: number = 0;
        protected mathAngle(x1: number, y1: number, x2: number, y2: number): number {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
        }
        public setSpeedDirect(value: Vector3D): void {
            if (this.isDeath) {
                return;
            }
            this._speedDirect = value;
            if (this.curentAction == CharAction.STANAD || this.curentAction == CharAction.STAND_MOUNT) {
                this.play(CharAction.WALK);
            }
            this._walkPath = null;
        }
        public stopMove(): void {

            this._speedDirect = null;
            this._walkPath = null;
            this.play(CharAction.STANAD);
        }
        public getEndWalkPathPos(): Vector3D {
            if (this._walkPath) {
                return this._walkPath[this._walkPath.length - 1]
            } else {
                return null
            }
        }

        public watch($obj: Display3D, $syn: boolean = false): void {
            if (!$obj) {
                //console.log("面向对象无")
                return;
            }
            var xx: number = $obj.x - this.px;
            var yy: number = $obj.z - this.pz;
            var distance: number = Math.sqrt(xx * xx + yy * yy);
            xx /= distance;
            yy /= distance;
            var angle: number = Math.asin(xx) / Math.PI * 180;
            if (yy <= 0) {
                angle = 180 - angle;
            }
            if (!isNaN(angle)) {
                this.forceRotationY = angle
            }
        }
        public getCurrentPos(): Vector3D {
            return new Vector3D(this.px, this.py, this.pz);
        }
        public getAstarPos(): Vector2D {
            return AstarUtil.getGrapIndexByPos(this.getCurrentPos())
        }

        protected changeAction($action: string): void {

            if (this.unit&&this.unit.isMain) {
                switch ($action) {
                    case CharAction.ATTACK_01:
                        this.play(CharAction.ATTACK_010, 2);
                        break;
                    case CharAction.ATTACK_02:
                        this.play(CharAction.ATTACK_020, 2);
                        break;
                    default:
                        super.changeAction($action)
                        break;
                }
            } else {
                super.changeAction($action)
            }

        }

        public skillVo: Skill;

        public playSkill($skill: Skill): void {

            this._walkPath = null;
            SkillManager.getInstance().playSkill($skill);
            this.skillVo = $skill;
        }
        public msgSpellStop(): void {
            if (this.skillVo) {
                ////console.log("停止技能播放");
                this.skillVo.removeSkillForce();
                this.changeAction(this._defaultAction)
                this.skillVo = null;
            }
            this.isSinging = false;

        }
        //清理等待播放的连击技能





        public destory(): void {
            if (this._hasDestory) {
                return;
            }
            super.destory();
            this.destoryName();
            if (this._isBoss) {
         
            }
            if (this.skillVo) {
                this.skillVo.removeSkillForce();
                this.skillVo = null;
            }
            if (this._wingDisplay) {
                this._wingDisplay.destory();
            }
            this._hasDestory = true;
        }
        private destoryName(): void {
            //清理血条和名称 -FIXME-0
            if (this._charNameVo) {
                this._charNameVo.destory()
                this._charNameVo = null
            }
      
            if (this._charBloodVo) {
                this._charBloodVo.destory()
                this._charBloodVo = null
            }
            if (this._charTitleVo) {
                this._charTitleVo.destory()
                this._charTitleVo = null
            }
        }

        public removeStage(): void {
            super.removeStage();
            if (this._charNameVo) {
                this._charNameVo.visible = false
            }
            if (this._charBloodVo) {
                this._charBloodVo.visible = false
            }
            if (this.mountChar) {
                SceneManager.getInstance().removeMovieDisplay(this.mountChar);
            }
            if (this._wingDisplay) {
                SceneManager.getInstance().removeMovieDisplay(this._wingDisplay);
            }
        }
        public addStage(): void {
            super.addStage();
            if (this._charNameVo) {
                this._charNameVo.visible = true;
            }
            if (this._charBloodVo) {
                this._charBloodVo.visible = true;
            }
            if (this.mountChar) {
                SceneManager.getInstance().addMovieDisplay(this.mountChar);
            }
            if (this._wingDisplay) {
                SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
            }
        }
        public math_distance($other: Display3dMovie): number {
            return MathClass.math_distance(this.px, this.pz, $other.x, $other.z)
        }
        public set visible(value: boolean) {
            this._visible = value;
            this.applyVisible();
        }
        public get visible(): boolean {
     
            return this._visible
        }

        public set optimization(value: boolean) {
            this._optimization = value;
            this.applyVisible();

        }
        public get optimization(): boolean {
            return this._optimization
        }


        private _resultVisible: boolean = true;
        public get resultVisible(): boolean {
            return this._resultVisible;
        }
        public applyVisible(): void {
            var value: boolean = this._visible;
            if (this._visible) {
                if (this._optimization) {
                    value = false;
                } else {
                    value = true;
                }
            } else {
                value = false;
            }

            if (this._partDic) {
                if (this._partDic[SceneChar.WEAPON_PART]) {
                    for (var obj of this._partDic[SceneChar.WEAPON_PART]) {
                        obj.sceneVisible = value;
                    }
                }
            }

            if (this._wingDisplay) {
                this._wingDisplay.visible = value;
            }
            /*
            if (this._charBloodVo) {           
                this._charBloodVo.visible = value
            }
            if (this._charNameVo) {
                this._charNameVo.visible = value
            }
            if (this._factionNameVo) {
                this._factionNameVo.visible = value
            }
            if (this._charTitleVo) {            
                this._charTitleVo.visible = value
            }
            */

            if (!value) {
                this.destoryName();
            }



            this.shadow = value;

            this._resultVisible = value;
        }
        private lineSprite: LineDisplaySprite;
        public update(): void {

            if (!this._skinMesh) {
                return;
            }
            if (this._optimization) {
                return;
            }

            super.update();
            if (this._showHitBox) {
                if (!this.lineSprite) {
                    ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader)
                    this.lineSprite = new LineDisplaySprite();
                    this.lineSprite.clear();

                    for (var i: number = 0; i < this.triIndex.length / 3; i++) {
                        var a: Vector3D = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 0]]
                        var b: Vector3D = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 1]]
                        var c: Vector3D = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 2]]

                        this.lineSprite.makeLineMode(a, b);
                        this.lineSprite.makeLineMode(b, c);
                        this.lineSprite.makeLineMode(c, a);
                    }

                    this.lineSprite.upToGpu()
                }
                this.lineSprite.posMatrix = this.posMatrix.clone();
                this.lineSprite.update()
            }
        }
        private _showHitBox = false;
        // private triIndex: Array<number> = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]
        // private triIndex: Array<number> = [0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0]
        private triIndex: Array<number> = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0]

        private hitBox2DItem: Array<Vector2D>;
        public mouseClik($lineA: Vector3D, $lineB: Vector3D): boolean {

            var $pos: Vector3D = Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos())
            if ($pos.z < Scene_data.cam3D.distance / 3) { //在Z后面
                return null
            }

            var hitVec2: Vector2D = MathUtil.math3DWorldtoDisplay2DPos($lineB)
            if (this._skinMesh) {
                if (!this.hitBox2DItem) {
                    this.hitBox2DItem = new Array;
                }
                this.hitBox2DItem.length = 0
                for (var j: number = 0; j < this._skinMesh.hitPosItem.length; j++) {
                    var temppp: Vector3D = this.posMatrix.transformVector(this._skinMesh.hitPosItem[j])
                    this.hitBox2DItem.push(MathUtil.math3DWorldtoDisplay2DPos(temppp))
                }
                for (var i: number = 0; i < this.triIndex.length / 3; i++) {

                    TestTriangle.baseTri.p1 = this.hitBox2DItem[this.triIndex[i * 3 + 0]];
                    TestTriangle.baseTri.p2 = this.hitBox2DItem[this.triIndex[i * 3 + 1]];
                    TestTriangle.baseTri.p3 = this.hitBox2DItem[this.triIndex[i * 3 + 2]];

                    if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
                        return true
                    }
                }

            } else {

                if (Vector2D.distance(hitVec2, MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position)) < 20) {
                    return true
                }

            }
            return false
        }


    }
}
