module Pan3d {
    export class ParticleBallGpuData extends ParticleGpuData {
        public basePos: Array<number>;
        public basePosBuffer: WebGLBuffer;

        public beMove: Array<number>;
        public beMoveBuffer: WebGLBuffer

        public randomColor: Array<number>;
        public randomColorBuffer: WebGLBuffer;
        public randomOffset: number;

        public baseRotation: Array<number>;
        public baseRotationBuffer: WebGLBuffer;

        public destory(): void {
            super.destory();

            if (this.basePos) {
                this.basePos.length = 0;
                this.basePos = null;
                if (this.basePosBuffer) {
                    Scene_data.context3D.deleteBuffer(this.basePosBuffer);
                    this.basePosBuffer = null;
                }

            }

            if (this.beMove) {
                this.beMove.length = 0;
                this.beMove = null;
                if (this.beMoveBuffer) {
                    Scene_data.context3D.deleteBuffer(this.beMoveBuffer);
                    this.beMoveBuffer = null;
                }

            }

            if (this.randomColor) {
                this.randomColor.length = 0;
                this.randomColor = null;
                if (this.randomColorBuffer) {
                    Scene_data.context3D.deleteBuffer(this.randomColorBuffer);
                    this.randomColorBuffer = null;
                }
            }

            if (this.baseRotation) {
                this.baseRotation.length = 0;
                this.baseRotation = null;
                if (this.baseRotationBuffer) {
                    Scene_data.context3D.deleteBuffer(this.baseRotationBuffer);
                    this.baseRotationBuffer = null;
                }

            }


        }

    }
}