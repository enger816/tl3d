module Pan3d {
    export class CombineParticleData extends ResCount {


        public maxTime: number;

        public dataAry: Array<ParticleData>;

        public destory(): void {
            for (var i: number = 0; i < this.dataAry.length; i++) {
                this.dataAry[i].destory();
            }
        }

        public getCombineParticle(): CombineParticle {
            var particle: CombineParticle = new CombineParticle();
            particle.maxTime = this.maxTime;

            for (var i: number = 0; i < this.dataAry.length; i++) {
                var display: Display3DParticle = this.dataAry[i].creatPartilce();
                particle.addPrticleItem(display);
            }

            particle.sourceData = this;

            this.useNum++;

            return particle;
        }

        public setDataByte(byte: Pan3dByteArray): void {
            byte.position = 0;

            var version: number = byte.readInt();

            var len: number = byte.readInt();
            this.maxTime = 0;
            this.dataAry = new Array;
            for (var i: number = 0; i < len; i++) {

                var $particleType: number = byte.readInt();

                var pdata: ParticleData = this.getParticleDataType($particleType);
                pdata.version = version;
                pdata.setAllByteInfo(byte);

                this.dataAry.push(pdata);

                if (pdata.timelineData.maxFrameNum > this.maxTime) {
                    this.maxTime = pdata.timelineData.maxFrameNum;
                }

            }

            this.maxTime *= Scene_data.frameTime;
        }

        private getParticleDataType($type: number): ParticleData {

            var pdata: ParticleData;
            switch ($type) {
                case 1:
                    {
                        pdata = new ParticleFacetData();
                        break;
                    }
                case 18:
                    {
                        pdata = new ParticleBallData();
                        break;
                    }
                case 3:
                    {
                        pdata = new ParticleLocusData();
                        break;
                    }
                case 14:
                    {
                        pdata = new ParticleLocusballData();
                        break;
                    }
                case 9:
                case 4:
                case 7:
                    {
                        pdata = new ParticleModelData();
                        break;
                    }
                case 8:
                    {
                        pdata = new ParticleFollowData();
                        break;
                    }
                case 12:
                    {
                        pdata = new ParticleFollowLocusData();
                        break;
                    }
                case 13:
                    {
                        pdata = new ParticleBoneData()
                        break;
                    }

            }
            return pdata;
        }


    }
}