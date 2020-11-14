module Pan3d {
    export class Display3dModelAnimParticle extends Display3DModelPartilce {

        public constructor() {
            super();
        }


        public updateUV(): void {
            var currentFrame: number = this._time / Scene_data.frameTime;
            currentFrame = currentFrame > this.modeldata._maxAnimTime ? this.modeldata._maxAnimTime : currentFrame;
            currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);

            this._resultUvVec[0] = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Scene_data.frameTime * this.data._uSpeed;
            this._resultUvVec[1] = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Scene_data.frameTime * this.data._vSpeed;
        }

    }
}