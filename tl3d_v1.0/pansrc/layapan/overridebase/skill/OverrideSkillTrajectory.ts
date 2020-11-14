module layapan {
    export class OverrideSkillTrajectory extends Pan3d.SkillTrajectory {
        public skill: OverrideSkill
        public reset(): void {
            this.particle.reset();
            this.skill.skillManager.sceneManager.particleManager.removeParticle(this.particle);
            if (this.endParticle) {
                this.endParticle.reset();
                this.skill.skillManager.sceneManager.particleManager.addParticle(this.endParticle);
                this.endParticle.setPos(this._currentTargetPos.x, this._currentTargetPos.y, this._currentTargetPos.z);
            }
            if (this.removeCallFun) {
                this.removeCallFun(this);
            }
        
        }
        public addToRender(): void {
    
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true

            this.skill.skillManager.sceneManager.particleManager.addParticle(this.particle);


            var beginPos: Pan3d. Vector3D;
            if (this.data.beginType == 0) {
                var ma: Pan3d.Matrix3D = new Pan3d.Matrix3D;
                ma.appendRotation(this.active.rotationY, Pan3d. Vector3D.Y_AXIS);
                beginPos = ma.transformVector(this.data.beginPos);
                this._currentPos.setTo(this.active.x + beginPos.x, this.active.y + beginPos.y, this.active.z + beginPos.z);
            } else if (this.data.beginType == 1) {
                var tempMa: Pan3d. Matrix3D = new Pan3d.Matrix3D;
                var bindActive: Pan3d.Display3dMovie = <Pan3d.Display3dMovie>(this.active);
                bindActive.getSocket(this.data.beginSocket, tempMa);
                beginPos = tempMa.position;
                this._currentPos.setTo(beginPos.x, beginPos.y, beginPos.z);
            }

            this.particle.setPos(this._currentPos.x, this._currentPos.y, this._currentPos.z);

            this.path.add();
        }
 

        public endPlayFun(e: Pan3d. BaseEvent = null): void {
            this.skill.skillManager.sceneManager.particleManager.removeParticle(this.endParticle);
            this.endParticle.removeEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);

        }
        public setInfo(obj: Pan3d.SkillKeyVo): void {


            this.time = obj.frame * Pan3d.Scene_data.frameTime;
            this.particle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + obj.url);
            this.particle.bindTarget = this;
            this.data = <Pan3d.SkillTrajectoryTargetKeyVo>obj;
            //this.path.speed = this.data.speed;
            if (this.data.endParticleUrl) {
                this.endParticle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + this.data.endParticleUrl);
                this.endParticle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
            }
            //this.time = obj.frame * Pan3d.Scene_data.frameTime;
            //this.particle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + obj.url);
            //this.particle.bindTarget = this;
            //this.data = <Pan3d.SkillTrajectoryTargetKeyVo>obj;
            ////this.path.speed = this.data.speed;
            //if (this.data.endParticleUrl) {
            //    this.endParticle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + this.data.endParticleUrl);
            //    this.endParticle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
            //}
        }

    }
}