module Pan3d {
    export class Skill extends ResCount {
        protected skillVo: SkillVo;
        public name: string;
        public key: string;
        public isDeath: boolean = true;
        public keyAry: Array<SkillKey>;
        public completeNum: number;
        public src: boolean = false;

        public active: Object3D;
        public completeFun: Function;
        public time: number = 0;
        public static MaxTime: number = 1000 * 5;
        public targetFlag: number = 0;
        public targetShockFlag: number = 0;
        public trajectoryAry: Array<SkillTrajectory>;
        protected _skillData: SkillData;
        public batterObj: any;
        public tbSkillId: number; //用于存放数据表中的技能ID。项目组
        public soundPlay: boolean;
        public needSound: boolean = false;
        public hasDestory: boolean = false;
        public actionEnd: boolean = false

        public constructor() {
            super();
        }

        public setData($data: any, $skillData: SkillData): void {
            if (this.hasDestory) {
                return;
            }
            this.skillVo = new SkillVo();
            this.skillVo.setData($data);
            this.setKeyAry();
            this.trajectoryAry = new Array;
            this._skillData = $skillData;
        }

        public getBloodTime(): number {
            if (this.skillVo) {
                return this.skillVo.bloodTime
            } else {
                return SkillVo.defaultBloodTime;
            }
        }


        public play(): void {
            if (!this.skillVo) {
                this.skillComplete();
                return;
            }

            if (this.active && this.active instanceof Display3dMovie) {
                var $movie3d: Display3dMovie = (<Display3dMovie>this.active);
                $movie3d.play(this.skillVo.action, this.actionEnd?1:2, false);
            }

        }

        public setKeyAry(): void {
            this.keyAry = new Array;
            if (this.skillVo.types == SkillType.FixEffect) {
                for (var i: number = 0; i < this.skillVo.keyAry.length; i++) {
                    var keySkill: SkillFixEffect = new SkillFixEffect();
                    keySkill.setInfo(this.skillVo.keyAry[i]);
                    keySkill.removeCallFun = ($key: SkillKey) => { this.removeKey($key) };
                    keySkill.active = this.active;
                    this.keyAry.push(keySkill);
                }
            } else if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                for (var i: number = 0; i < this.skillVo.keyAry.length; i++) {

                    var trajectory: SkillTrajectory;
                    var tkv: SkillTrajectoryTargetKeyVo = <SkillTrajectoryTargetKeyVo>(this.skillVo.keyAry[i]);
                    if (tkv.multype == 1) {
                        trajectory = new SkillMulTrajectory();
                    } else {
                        trajectory = new SkillTrajectory();
                    }

                    trajectory.setInfo(this.skillVo.keyAry[i]);
                    this.keyAry.push(trajectory);
                }
            }
        }

        public removeKey($key: SkillKey): void {
            this.completeNum++;
            if (this.completeNum == this.keyAry.length) {
                //    //console.log("播放结束");
                this.skillComplete();
            }
        }
        /**强制移除技能 */
        public removeSkillForce(): void {
            // if(this.key == "skill/jichu_1_byte.txtm_skill_04"){
            //     SkillManager.getInstance().fengbaonum--;
            //     console.log("移除技能风暴 " + SkillManager.getInstance().fengbaonum);
            // }        

            if (this.keyAry) {
                for (var i: number = 0; i < this.keyAry.length; i++) {
                    this.keyAry[i].reset();
                }
            }
            this.skillComplete();
            this.reset();
        }

        public skillComplete(): void {
            SkillManager.getInstance().removeSkill(this);
            this.isDeath = true;
            if (this.completeFun) {
                this.completeFun();
            }
            this.idleTime = 0;
        }

        public reset(): void {
            this.time = 0;
            this.completeNum = 0;
            this.active = null;
            this.completeFun = null;
            this.targetFlag = 0;
            this.targetShockFlag = 0;
            this.soundPlay = false;
            this.needSound = false;
        }

        public update(t: number): void {
            this.time += t;
            if (this.time > Skill.MaxTime) {
                //console.log("超时结束");
                this.skillComplete();
            }

            this.getKeyTarget();
            this.getShockTarget();
            this.updateTrajector(t);

        }

        public updateTrajector(t: number): void {
            for (var i: number = 0; i < this.trajectoryAry.length; i++) {
                this.trajectoryAry[i].update(t);
            }
        }

        private getKeyTarget(): void {
            if (!this.keyAry) {
                return;
            }
            for (var i: number = this.targetFlag; i < this.keyAry.length; i++) {
                if (this.keyAry[i].time < this.time) {
                    this.keyAry[i].addToRender();

                    if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                        var ss: any = this.keyAry[i];
                        this.trajectoryAry.push(ss);
                    }

                    i++;
                    this.targetFlag = i;

                } else {
                    break;
                }
            }
            this.getSound();
        }

        private getShockTarget(): void {
            if (!this.skillVo.shockAry || !this.needSound) {
                return;
            }
            for (var i: number = this.targetShockFlag; i < this.skillVo.shockAry.length; i++) {
                if (this.skillVo.shockAry[i].time < this.time) {
                    //震动
                    ShockUtil.getInstance().shock(this.skillVo.shockAry[i].lasttime, this.skillVo.shockAry[i].amp);
                    i++;
                    this.targetShockFlag = i;

                } else {
                    break;
                }
            }
            //this.getSound();
        }

        private getSound(): void {
            if (!this.skillVo.sound || this.soundPlay || !this.needSound) {
                return;
            }
            if (this.skillVo.sound.frame < this.time) {
                SoundManager.getInstance().playSkillSound(this.skillVo.sound.url);
                this.soundPlay = true;
            }

        }

        public configFixEffect($active: Object3D, $completeFun: Function = null, $posObj: Array<Vector3D> = null): void {
            this.active = $active;
            this.completeFun = $completeFun;

            if (!this.keyAry) {
                return;
            }
            for (var i: number = 0; i < this.keyAry.length; i++) {
                if (this.skillVo.types != SkillType.FixEffect) {
                    continue;
                }
                var skillFixEffect: SkillFixEffect = <SkillFixEffect>this.keyAry[i];
                skillFixEffect.active = $active;
                if ($posObj && $posObj.length) {
                    if (i > ($posObj.length - 1)) {
                        skillFixEffect.outPos = $posObj[$posObj.length - 1];
                    } else {
                        skillFixEffect.outPos = $posObj[i];
                    }
                } else {
                    skillFixEffect.outPos = null;
                }
            }

        }

        public configTrajectory($active: Object3D, $target: Object3D, $completeFun: Function = null, types: number = 0, $bloodFun: Function = null): void {
            this.active = $active;
            this.completeFun = $completeFun;
            this.completeNum = 0;
            if (!this.keyAry) {
                return;
            }
            for (var i: number = 0; i < this.keyAry.length; i++) {
                if (!(this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint)) {
                    continue;
                }
                var skillTrajector: SkillTrajectory = <SkillTrajectory>this.keyAry[i];
                skillTrajector.setPlayData($active, $target, ($skilltra: SkillTrajectory) => { this.removeTrajectory($skilltra) }, types, (i == 0 ? $bloodFun : null));
            }

        }

        public configMulTrajectory($activeList: Array<Object3D>, $active: Object3D, $target: Object3D, $completeFun: Function = null): void {
            this.active = $active;
            this.completeFun = $completeFun;
            this.completeNum = 0;
            if (!this.keyAry) {
                return;
            }
            for (var i: number = 0; i < this.keyAry.length; i++) {
                if (this.skillVo.types != SkillType.TrajectoryDynamicTarget) {
                    continue;
                }
                var skillTrajector: SkillMulTrajectory = <SkillMulTrajectory>this.keyAry[i];
                skillTrajector.setMulPlayData($activeList, $target, ($skilltra: SkillTrajectory) => { this.removeTrajectory($skilltra) }, 2);
            }

        }

        public removeTrajectory($skilltra: SkillTrajectory): void {
            var index: number = this.trajectoryAry.indexOf($skilltra);
            if (index != -1) {
                this.trajectoryAry.splice(index, 1);
            }

            this.completeNum++;
            if (this.completeNum == this.keyAry.length) {
                // //console.log("播放结束");
                this.skillComplete();
            }
        }

        public destory(): void {
            this.skillVo = null;
            this.name = null;
            if (this.keyAry) {
                for (var i: number = 0; i < this.keyAry.length; i++) {
                    this.keyAry[i].destory();
                }
                this.keyAry.length = 0;
                this.keyAry = null;
            }


            this.active = null;
            this.completeFun = null;


            if (this.trajectoryAry) {
                for (var i: number = 0; i < this.trajectoryAry.length; i++) {
                    this.trajectoryAry[i].destory();
                }
                this.trajectoryAry.length = 0;
                this.trajectoryAry = null;
            }

            if (this._skillData) {
                this._skillData.useNum--;
            }

            this._skillData = null;

            this.hasDestory = true;

        }

        // public set useNum(n:number) {
        //     this._useNum = n;
        //     if (this._useNum == 0){
        //         this.idleTime = 0;
        //     }
        // }


    }
}