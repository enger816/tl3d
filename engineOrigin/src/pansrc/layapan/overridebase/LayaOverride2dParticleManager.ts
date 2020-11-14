module layapan {
    import CombineParticle = Pan3d.CombineParticle
    import CombineParticleData = Pan3d.CombineParticleData
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import ParticleManager = Pan3d.ParticleManager
    
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
}