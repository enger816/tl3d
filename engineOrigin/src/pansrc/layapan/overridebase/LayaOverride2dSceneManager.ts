module layapan {
    import Display3dMovie = Pan3d.Display3dMovie;
    export class LayaOverride2dSceneManager extends scene3d.OverrideSceneManager {
        private static sceneNum: number=0
        constructor() {
            super();

            this.particleManager = new LayaOverride2dParticleManager();
            this.shadowManager = new LayaOverrideShadowManager();
            this.skillManager = new LayaOverride2dSkillManager(this);
            this.bloodManager = new Pan3d.BloodManager();
            this.groupDataManager = new LayaOverrideGroupDataManager();
            console.log("创建场景=>", LayaOverride2dSceneManager.sceneNum++);
        }
        public shadowManager: LayaOverrideShadowManager
        public groupDataManager : LayaOverrideGroupDataManager
        public skillManager: LayaOverride2dSkillManager;
        public particleManager: LayaOverride2dParticleManager;
        public bloodManager: Pan3d.BloodManager;
  
        public static initConfig(): void {
            Pan3d.SceneManager._instance = new LayaOverride2dSceneManager;
        }
        public update(): void {
            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            scene2d.GroundModel.getInstance().update();
        
            this.upFrame();
        }
        public changeBloodManager($bloodManager: Pan3d.BloodManager): void {
            this.bloodManager = $bloodManager
        }
        public addMovieDisplay($display: Display3dMovie): void {
            $display._scene=this
            this._displayRoleList.push($display);
            $display.addStage();
        }
        public loadSceneConfigCom(obj: any): void {
            //保持原来的角度
            var $rotationY: number = Pan3d.Scene_data.focus3D.rotationY;
            super.loadSceneConfigCom(obj);
            Pan3d.Scene_data.focus3D.rotationY = $rotationY;

        }
        public playLyf($url: string, $pos: Pan3d.Vector3D, $r: number = 0): void {
         
            this.groupDataManager.scene =this
            this.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, (groupRes: Pan3d.GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: Pan3d.GroupItem = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: Pan3d.CombineParticle = this.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.rotationY = $r;
                        this.particleManager.addParticle($particle);
                        $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
        }
        public charPlaySkill($char: layapan.LayaSceneChar, $skillfile: string): void {
            if (!$char._scene.ready) {
                return;
            }
          
            var $skill: layapan.OverrideSkill = this.skillManager.getSkill(getSkillUrl($skillfile), "skill_02");
            if (!$skill.keyAry) {
                return;
            }
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            $skill.configFixEffect($char);
            this.skillManager.playSkill($skill)
        }
        private onPlayCom(value: Pan3d.BaseEvent): void {
            this.particleManager.removeParticle(<Pan3d.CombineParticle>(value.target))
        }
        public cameraMatrix: Pan3d.Matrix3D;
        public viewMatrx3D:Pan3d.Matrix3D;
        public upFrame(): void {
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = Pan3d.TimeUtil.getTimer()
        
            }
            this.updateMovieFrame();
            if (this._ready) {
                this.particleManager.updateTime();
                this.skillManager.update()

                if (this.render) {
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();
                    this.shadowManager.update()
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                    this.particleManager.update();
                    this.bloodManager.update();
                    Pan3d.Scene_data.context3D.setBlendParticleFactors(0)
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                }
                Pan3d.Scene_data.context3D.setDepthTest(false);
                Pan3d.UIManager.getInstance().update();

                this.cameraMatrix = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
                this.viewMatrx3D = Pan3d.Scene_data.viewMatrx3D.clone();
            }
        }
    }
}