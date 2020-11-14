module Pan3d {
    export class ParticleManager extends ResGC {
        public static _instance: ParticleManager;
        public static getInstance(): ParticleManager {
            if (!this._instance) {
                this._instance = new ParticleManager();
            }
            return this._instance;
        }
        private _particleList: Array<CombineParticle>;
        private _time: number = 0;

        public constructor() {
            super();
            this._particleList = new Array;
        }
        public getParticleByte($url: string): CombineParticle {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            var combineParticle: CombineParticle = new CombineParticle();
            var url: string = $url;
            if (this._dic[url]) {
                var baseData: CombineParticleData = this._dic[url];
                combineParticle = baseData.getCombineParticle();
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



        public addResByte($url: string, $data: Pan3dByteArray): void {
            if (!this._dic[$url]) {
                var baseData: CombineParticleData = new CombineParticleData();
                ////console.log("load particle",$url);
                baseData.setDataByte($data);
                this._dic[$url] = baseData;
            }
        }

        public update(): void {
            // for (var i: number = 0; i < this._particleList.length; i++) {
            //     this._particleList[i].update();
            // }
            this.updateRenderDic();
            this.clearPaticleVa();
        }

        public clearPaticleVa(): void {
            Scene_data.context3D.clearVa(2);
            Scene_data.context3D.clearVa(3);
            Scene_data.context3D.clearVa(4);
            Scene_data.context3D.clearVa(5);
        }

        public setHide(): void {
            for (var i: number = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].dynamic) {
                    //  this._particleList[i].sceneVisible = false;
                }
            }
        }
        public get particleList(): Array<CombineParticle> {
            return this._particleList
        }

        public updateTime(): void {

            var _tempTime: number = TimeUtil.getTimer();
            var t: number = _tempTime - this._time;
            for (var i: number = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].sceneVisible) {
                    continue;
                }
                this._particleList[i].updateTime(t);
            }
            this._time = _tempTime;

        }
        private renderDic: Object = new Object;
        private addRenderDic($particle: CombineParticle): void {
            var url: string = $particle.url;
            if (!this.renderDic[url]) {
                this.renderDic[url] = new Array;
            }

            this.renderDic[url].push($particle);

        }
        private removeRenderDic($particle: CombineParticle): void {
            var url: string = $particle.url;

            var indexs: number = this.renderDic[url].indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this.renderDic[url].splice(indexs, 1);
            if (this.renderDic[url].length == 0) {
                delete this.renderDic[url];
            }
        }

        private updateRenderDic(): void {
            for (var key in this.renderDic) {
                var list: Array<CombineParticle> = this.renderDic[key];
                if (list.length == 1) {
                    list[0].update();
                } else {
                    var size: number = list[0].size;

                    for (var j: number = 0; j < size; j++) {
                        for (var i: number = 0; i < list.length; i++) {
                            list[i].updateItem(j);
                        }
                    }

                }

            }
        }

        public addParticle($particle: CombineParticle): void {
            if (this._particleList.lastIndexOf($particle) != -1) {
                return;
            }
            this._particleList.push($particle);
            this.addRenderDic($particle);
        }

        public removeParticle($particle: CombineParticle): void {
            var indexs: number = this._particleList.indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this._particleList.splice(indexs, 1);
            this.removeRenderDic($particle);

        }
        public removeAllParticle(){
            for(let i = 0; i < this._particleList.length; i ++)
            {
                this.removeRenderDic(this._particleList[i]);
                this._particleList.splice(i, 1);   
            }
        }

        public gc(): void {
            super.gc();
        }
    }
}