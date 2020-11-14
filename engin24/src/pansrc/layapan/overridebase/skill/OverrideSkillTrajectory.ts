import {Vector3D} from "../../../../../pan3d/engine/math/Vector3D"
import {Matrix3D} from "../../../../../pan3d/engine/math/Matrix3D"
import {SkillTrajectory} from "../../../../../pan3d/engine/skill/key/SkillTrajectory"
import {OverrideSkill} from "./OverrideSkill"
import {Display3dMovie} from "../../../../../pan3d/engine/display3D/Display3dMovie"
import {BaseEvent} from "../../../../../pan3d/engine/events/Event"
import {SkillKeyVo} from "../../../../../pan3d/engine/skill/vo/SkillKeyVo"
import {Scene_data} from "../../../../../pan3d/engine/context/Scene_data"
import {SkillTrajectoryTargetKeyVo} from "../../../../../pan3d/engine/skill/vo/SkillKeyVo"

    export class OverrideSkillTrajectory extends SkillTrajectory {
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


            var beginPos:  Vector3D;
            if (this.data.beginType == 0) {
                var ma: Matrix3D = new Matrix3D;
                ma.appendRotation(this.active.rotationY,  Vector3D.Y_AXIS);
                beginPos = ma.transformVector(this.data.beginPos);
                this._currentPos.setTo(this.active.x + beginPos.x, this.active.y + beginPos.y, this.active.z + beginPos.z);
            } else if (this.data.beginType == 1) {
                var tempMa:  Matrix3D = new Matrix3D;
                var bindActive: Display3dMovie = <Display3dMovie>(this.active);
                bindActive.getSocket(this.data.beginSocket, tempMa);
                beginPos = tempMa.position;
                this._currentPos.setTo(beginPos.x, beginPos.y, beginPos.z);
            }

            this.particle.setPos(this._currentPos.x, this._currentPos.y, this._currentPos.z);

            this.path.add();
        }
 

        public endPlayFun(e:  BaseEvent = null): void {
            this.skill.skillManager.sceneManager.particleManager.removeParticle(this.endParticle);
            this.endParticle.removeEventListener(BaseEvent.COMPLETE, this.endPlayFun, this);

        }
        public setInfo(obj: SkillKeyVo): void {


            this.time = obj.frame * Scene_data.frameTime;
            this.particle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Scene_data.fileRoot + obj.url);
            this.particle.bindTarget = this;
            this.data = <SkillTrajectoryTargetKeyVo>obj;
            //this.path.speed = this.data.speed;
            if (this.data.endParticleUrl) {
                this.endParticle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Scene_data.fileRoot + this.data.endParticleUrl);
                this.endParticle.addEventListener(BaseEvent.COMPLETE, this.endPlayFun, this);
            }
            //this.time = obj.frame * Scene_data.frameTime;
            //this.particle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Scene_data.fileRoot + obj.url);
            //this.particle.bindTarget = this;
            //this.data = <SkillTrajectoryTargetKeyVo>obj;
            ////this.path.speed = this.data.speed;
            //if (this.data.endParticleUrl) {
            //    this.endParticle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Scene_data.fileRoot + this.data.endParticleUrl);
            //    this.endParticle.addEventListener(BaseEvent.COMPLETE, this.endPlayFun, this);
            //}
        }

    }
