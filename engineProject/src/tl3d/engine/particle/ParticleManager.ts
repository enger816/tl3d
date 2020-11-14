namespace tl3d {
    export class ParticleManager extends ResGC {
        private static _instance:ParticleManager;

        static getInstance():ParticleManager{
            if(!ParticleManager._instance){
                ParticleManager._instance=new ParticleManager();
            }
            return ParticleManager._instance;
        }

        public constructor() {
            super();
        }
        public getParticleByte($url: string): CombineParticle {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            var combineParticle: CombineParticle;
            var url: string = $url;
            if (this._dic[url]) {
                var baseData: CombineParticleData = this._dic[url];
                combineParticle = baseData.getCombineParticle();
            }
            else
            {
                combineParticle=new CombineParticle()
            }
            // else {
            //     LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
            //         var byte: ByteArray = new ByteArray($byte);
            //         combineParticle.setDataByte(byte)
            //     });
            // }
            combineParticle.url = url;
            return combineParticle;
        }

        public registerUrl($url: string): void {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            if (this._dic[$url]) {
                var baseData: CombineParticleData = this._dic[$url];
                baseData.useNum++;
            }
        }

        public releaseUrl($url: string): void {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            if (this._dic[$url]) {
                var baseData: CombineParticleData = this._dic[$url];
                baseData.clearUseNum();
            }
        }



        public addResByte($url: string, $data: TLByteArray): void {
            if (!this._dic[$url]) {
                var baseData: CombineParticleData = new CombineParticleData();
                ////console.log("load particle",$url);
                baseData.setDataByte($data);
                this._dic[$url] = baseData;
            }
        }

       
    }
}