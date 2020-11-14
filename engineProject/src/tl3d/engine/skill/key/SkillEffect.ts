/// <reference path="SkillKey.ts" />

namespace tl3d {
    export class SkillEffect extends SkillKey {
        // public active: Object3D;

        constructor(skillMgr: SkillManager) {
            super(skillMgr);
        }

        private _active: tl3d.Object3D
        public set active($val) {
            this._active = $val;
        }

        public get active(): tl3d.Object3D {
            return this._active;
        }

        public addToRender(): void {
            super.addToRender();
            // this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            if(!this.particle)return;
            this.particle.onComplete = (particle) => {
                this.onPlayCom();
            };
        }

        protected onPlayCom(event: Event = null): void {
            // this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            this.skillMgr.scene.removeParticle(this.particle);
            this.removeCallFun(this);
        }


    }
}