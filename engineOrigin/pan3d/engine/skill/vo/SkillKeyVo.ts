module Pan3d {
    export class SkillKeyVo {
        public frame: number = 0;
        public url: string;

        public setData($data: any): void {
            this.frame = $data.frame;
            this.url = $data.url;
        }
    }

    export class SkillShockVo {
        public time: number;
        public lasttime: number;
        public amp: number;

        public setData($data: any): void {
            this.time = $data.time * Scene_data.frameTime;
            this.lasttime = $data.lasttime * Scene_data.frameTime;
            this.amp = $data.amp;
        }
    }

    export class SkillFixEffectKeyVo extends SkillKeyVo {
        public pos: Vector3D;
        public rotation: Vector3D;
        public hasSocket: boolean;
        public socket: string;

        public setData($data: any): void {
            super.setData($data);

            this.hasSocket = $data.hasSocket;

            if (this.hasSocket) {
                this.socket = $data.socket;
            } else {
                this.pos = new Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
                this.rotation = new Vector3D($data.rotation.x, $data.rotation.y, $data.rotation.z);
            }

        }

    }

    export class SkillTrajectoryTargetKeyVo extends SkillKeyVo {
        public beginType: number;
        public beginSocket: string;
        public beginPos: Vector3D;
        public hitSocket: string;
        public endParticleUrl: string;
        public speed: number;
        public multype: number;

        public setData($data: any): void {
            super.setData($data);
            this.beginType = $data.beginType;
            if (this.beginType == 0) {
                this.beginPos = new Vector3D($data.beginPos.x, $data.beginPos.y, $data.beginPos.z);
            } else if (this.beginType == 1) {
                this.beginSocket = $data.beginSocket;
            }
            this.speed = $data.speed;
            if ($data.hitSocket) {
                this.hitSocket = $data.hitSocket
            }
            if ($data.endParticle) {
                this.endParticleUrl = $data.endParticle;
            }
            this.multype = $data.multype;
        }


    }
}