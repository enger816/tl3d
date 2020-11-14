module Pan3d {
    export class SkillKey {
        public time: number = 0;
        public particle: CombineParticle;
        public removeCallFun: Function;

        public constructor() {

        }

        public addToRender(): void {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true

            ParticleManager.getInstance().addParticle(this.particle);
        }



        public setInfo(obj: SkillKeyVo): void {
            this.time = obj.frame * Scene_data.frameTime;

            this.particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + obj.url);


        }

        public reset(): void {
            //this.time = 0;
            this.particle.reset();
            ParticleManager.getInstance().removeParticle(this.particle);
        }

        public destory(): void {
            this.particle.destory();
            this.particle = null;
            this.removeCallFun = null;
        }

    }


}