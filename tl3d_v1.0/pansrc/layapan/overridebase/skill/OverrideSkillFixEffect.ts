module layapan {
    import BaseEvent = Pan3d.BaseEvent;
    import IBind = Pan3d.IBind;
    import Vector3D = Pan3d.Vector3D;
    import Matrix3D = Pan3d.Matrix3D;
    import ParticleManager = Pan3d.ParticleManager;
    export class OverrideSkillFixEffect extends Pan3d.SkillFixEffect {
        public skill: OverrideSkill
        public constructor($skillvo: OverrideSkill) {
            super()
            this.skill = $skillvo
        }
        protected onPlayCom(event: Event = null): void {
            this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            this.skill.skillManager.sceneManager.particleManager.removeParticle(this.particle);
            this.removeCallFun(this);
        }
        public addToRender(): void {
         
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true

           
            this.skill.skillManager.sceneManager.particleManager.addParticle(this.particle);


            this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);


            if (this.outPos) {
                this.particle.x = this.outPos.x;
                this.particle.y = this.outPos.y;
                this.particle.z = this.outPos.z;

                this.particle.rotationX = this.rotation.x;
                this.particle.rotationY = this.rotation.y + this.active.rotationY;
                this.particle.rotationZ = this.rotation.z;

                this.particle.bindTarget = null;
            } else if (this.hasSocket) {
                var targetActive: any = this.active;
                this.particle.bindTarget = <IBind>(targetActive);
                this.particle.bindSocket = this.socket;
            } else {
                var ma: Matrix3D = new Matrix3D;
                ma.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
                var v3d: Vector3D = ma.transformVector(this.pos);
                v3d.x += this.active.x;
                v3d.y += this.active.y;
                v3d.z += this.active.z;

   
                var $SkillBugBind: Pan3d. SkillBugBind = new Pan3d.SkillBugBind();
                $SkillBugBind.bindMatrix = new Matrix3D
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.x, Vector3D.X_AXIS)
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.y, Vector3D.Y_AXIS)
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.z, Vector3D.Z_AXIS)
                $SkillBugBind.bindMatrix.appendRotation(this.active.rotationY, Vector3D.Y_AXIS)
                $SkillBugBind.bindMatrix.appendTranslation(v3d.x, v3d.y, v3d.z)
                this.particle.bindTarget = $SkillBugBind;
            }






        }
    }
}