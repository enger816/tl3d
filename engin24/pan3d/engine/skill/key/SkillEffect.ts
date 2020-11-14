import Event = laya.events.Event
import {Object3D} from "../../base/Object3D"
import {SkillKey} from "./SkillKey"
import {BaseEvent} from "../../events/Event"
import {ParticleManager} from "../../particle/ParticleManager"

    export class SkillEffect extends SkillKey {
        public active: Object3D;

        public addToRender(): void {
            super.addToRender();
            this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
        }

        protected onPlayCom(event: Event = null): void {
            this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            ParticleManager.getInstance().removeParticle(this.particle);
            this.removeCallFun(this);
        }


    }
