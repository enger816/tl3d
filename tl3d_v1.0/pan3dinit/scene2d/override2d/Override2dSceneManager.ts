module scene2d {
    export class Override2dSceneManager extends scene3d.OverrideSceneManager {
        constructor() {
            super()
        }
        public static initConfig(): void {
            Pan3d.SceneManager._instance = new Override2dSceneManager;
        }

        public update(): void {

            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = Pan3d. TimeUtil.getTimer()
            }
            GroundModel.getInstance().update();
            this.updateMovieFrame();
            if (this._ready) {
                Pan3d. ParticleManager.getInstance().updateTime();
                Pan3d. SkillManager.getInstance().update();
                if (this.render) {

                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();

                    Pan3d. Scene_data.context3D.setWriteDepth(false);
                    Pan3d. ParticleManager.getInstance().update();
                    Pan3d. BloodManager.getInstance().update();
                    Pan3d. Scene_data.context3D.setBlendParticleFactors(0)
                    Pan3d.  Scene_data.context3D.setWriteDepth(true);
                    Pan3d.  Scene_data.context3D.setWriteDepth(false);
                }
                Pan3d. Scene_data.context3D.setDepthTest(false);
                Pan3d. UIManager.getInstance().update();
            }

        }
    }
}