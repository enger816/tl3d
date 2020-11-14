import { Display3DModelPartilce } from "./Display3DModelPartilce";
import { Scene_data } from "../../context/Scene_data";
import { Util } from "../../utils/Util";

export class Display3dModelAnimParticle extends Display3DModelPartilce {

    public constructor() {
        super();
    }


    public updateUV(): void {
        var currentFrame: number = this._time / Scene_data.frameTime;
        currentFrame = currentFrame > this.modeldata._maxAnimTime ? this.modeldata._maxAnimTime : currentFrame;
        currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);

        this._resultUvVec[0] = Util.float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Scene_data.frameTime * this.data._uSpeed;
        this._resultUvVec[1] = Util.float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Scene_data.frameTime * this.data._vSpeed;
    }

}