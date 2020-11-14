import { ParticleManager } from "../../../tl3d/engine/particle/ParticleManager";
import { CombineParticle } from "../../../tl3d/engine/particle/CombineParticle";
import { CombineParticleData } from "../../../tl3d/engine/particle/CombineParticleData";
import { Pan3dByteArray } from "../../../tl3d/engine/math/Pan3dByteArray";
import { LoadManager } from "../../../tl3d/engine/utils/LoadManager";

export class LayaOverride2dParticleManager extends ParticleManager {

    public constructor() {
        super();
    }

    public getParticleByte($url: string): CombineParticle {
        $url = $url.replace("_byte.txt", ".txt")
        $url = $url.replace(".txt", "_byte.txt")
        var combineParticle: CombineParticle = new CombineParticle();
        var url: string = $url;
        if (ParticleManager.getInstance()._dic[url]) {
            var baseData: CombineParticleData = ParticleManager.getInstance()._dic[url];
            combineParticle = baseData.getCombineParticle();
        }
        else {
            LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                var byte: Pan3dByteArray = new Pan3dByteArray($byte);
                combineParticle.setDataByte(byte)
            });
            } 

        combineParticle.url = url;
        return combineParticle;
    }

    public registerUrl($url: string): void {
        $url = $url.replace("_byte.txt", ".txt")
        $url = $url.replace(".txt", "_byte.txt")
        if (ParticleManager.getInstance()._dic[$url]) {
            var baseData: CombineParticleData = ParticleManager.getInstance()._dic[$url];
            baseData.useNum++;
        }
    }

    public releaseUrl($url: string): void {
        $url = $url.replace("_byte.txt", ".txt")
        $url = $url.replace(".txt", "_byte.txt")
        if (ParticleManager.getInstance()._dic[$url]) {
            var baseData: CombineParticleData = ParticleManager.getInstance()._dic[$url];
            baseData.clearUseNum();
        }
    }



    public addResByte($url: string, $data: Pan3dByteArray): void {
        if (!ParticleManager.getInstance()._dic[$url]) {
            var baseData: CombineParticleData = new CombineParticleData();
            ////console.log("load particle",$url);
            baseData.setDataByte($data);
            ParticleManager.getInstance()._dic[$url] = baseData;
        }
    }
}