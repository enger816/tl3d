import Event = laya.events.Event
import {SkillFixEffect} from "../../../../../pan3d/engine/skill/key/SkillFixEffect"
import {OverrideSkill} from "./OverrideSkill"
import {SkillBugBind} from "../../../../../pan3d/engine/skill/key/SkillFixEffect"

    import BaseEvent = BaseEvent;
    import IBind = IBind;
    import Vector3D = Vector3D;
    import Matrix3D = Matrix3D;
    import ParticleManager = ParticleManager;
    export class OverrideSkillFixEffect extends SkillFixEffect {
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


            // if (this.outPos) {
            //     this.particle.x = this.outPos.x;
            //     this.particle.y = this.outPos.y;
            //     this.particle.z = this.outPos.z;

            //     this.particle.rotationX = this.rotation.x;
            //     this.particle.rotationY = this.rotation.y + this.active.rotationY;
            //     this.particle.rotationZ = this.rotation.z;

            //     this.particle.bindTarget = null;
            // } else 
            if (this.hasSocket) {
                var targetActive: any = this.active;
                this.particle.bindTarget = <IBind>(targetActive);
                this.particle.bindSocket = this.socket;
            } else {
                var ma: Matrix3D = new Matrix3D;
                ma.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
                var v3d: Vector3D = ma.transformVector(this.pos);
                v3d.x += this.outPos == null ? this.active.x : this.outPos.x;
                v3d.y += this.outPos == null ? this.active.y : this.outPos.y;
                v3d.z += this.outPos == null ? this.active.z : this.outPos.z;


                var $SkillBugBind: SkillBugBind = new SkillBugBind();
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
