namespace tl3d {
    export class SkillKey {
        public time: number = 0;
        public particle: CombineParticle;
        public removeCallFun: Function;
        public skillMgr:SkillManager;

        public constructor(skillMgr:SkillManager) {
            this.skillMgr=skillMgr;
        }

        public addToRender(): void {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true
            this.skillMgr.scene.addParticle(this.particle);
        }



        public setInfo(obj: SkillKeyVo): void {
            this.time = obj.frame * Scene_data.frameTime;
            this.particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + obj.url);
        }

        protected onPlayCom(){

        }

        public reset(): void {
            //this.time = 0;
            this.skillMgr.scene.removeParticle(this.particle);
        }

        public destory(): void {
            if(this.particle){
                this.particle.destory();
                this.particle = null;
            }
            this.removeCallFun = null;
        }

    }


}