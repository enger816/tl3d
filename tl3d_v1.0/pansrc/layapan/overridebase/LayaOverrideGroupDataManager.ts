module layapan {
    export class LayaGroupRes extends Pan3d.GroupRes {
        public constructor() {
            super();
        }
        public scene: LayaOverride2dSceneManager
        public readParticle(): void {
            var objNum: number = this._byte.readInt();
            //this.particleAry = new Array;
            var time: number = Pan3d. TimeUtil.getTimer();

            for (var i: number = 0; i < objNum; i++) {
                var url: string = Pan3d.Scene_data.fileRoot + this._byte.readUTF();
                var size: number = this._byte.readInt();


                var dataByte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size)

                this.scene.particleManager.addResByte(url, dataByte);

            }

      
        }
    }
    export class LayaOverrideGroupDataManager extends Pan3d.GroupDataManager{

   
        public  scene: LayaOverride2dSceneManager
        public getGroupData($url: string, $fun: Function): void {

            if (this._dic[$url]) {
                var gr: LayaGroupRes = this._dic[$url];
                gr.useNum++;
                $fun(gr);
                return;
            }

            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);

            var group: LayaGroupRes = new LayaGroupRes();
            group.scene = this.scene;
            group.load($url, () => {
                var ary: Array<Function> = this._loadDic[$url];
                for (var i: number = 0; i < ary.length; i++) {
                    var fun: Function = ary[i];
                    fun(group);
                }
                this._dic[$url] = group;
                delete this._loadDic[$url];
                group.initReg();
            })




        }

    }
}