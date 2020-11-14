module Pan3d {
    export class GroupRes extends BaseRes {
        private _fun: Function;

        public dataAry: Array<GroupItem>;

        private _objDic: Object;
        private _particleDic: Object;
        private _materialDic: Object;

        public load(url: string, $fun: Function): void {

            this._fun = $fun;
            LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadComplete($byte);
            });
        }

        public loadComplete($byte: ArrayBuffer): void {
            this.dataAry = new Array;

            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0

            this.version = this._byte.readInt();

            this.read(() => { this.readNext() });//img


        }

        private readNext(): void {
            this.read();//obj
            this.read();//material
            this.read();//particle;

            var isGroup: boolean = this._byte.readBoolean();

            if (isGroup) {
                var length: number = this._byte.readInt();

                for (var i: number = 0; i < length; i++) {
                    this.readItem(true);
                }

            } else {
                this.readItem(false);

            }

            this._fun();

            this._fun = null;
            this._byte = null;
        }

        private readItem(isG: boolean): void {
            var types: number = this._byte.readInt();
            var item: GroupItem = new GroupItem();
            item.isGroup = isG;

            if (isG) {
                item.x = this._byte.readFloat();
                item.y = this._byte.readFloat();
                item.z = this._byte.readFloat();
                item.scaleX = this._byte.readFloat();
                item.scaleY = this._byte.readFloat();
                item.scaleZ = this._byte.readFloat();
                item.rotationX = this._byte.readFloat();
                item.rotationY = this._byte.readFloat();
                item.rotationZ = this._byte.readFloat();
            }

            if (types == BaseRes.PREFAB_TYPE) {
                item.objUrl = this._byte.readUTF();
                item.materialUrl = this._byte.readUTF();

                if (this.version >= 4) {
                    item.materialInfoArr = this.readMaterialInfo();
                }
                item.types = BaseRes.PREFAB_TYPE;

            } else if (types == BaseRes.SCENE_PARTICLE_TYPE) {
                item.particleUrl = this._byte.readUTF();
                item.types = BaseRes.SCENE_PARTICLE_TYPE;
            }

            this.dataAry.push(item);
        }


        public initReg(): void {
            this._objDic = new Object;
            this._materialDic = new Object;
            this._particleDic = new Object;

            for (var i: number = 0; i < this.dataAry.length; i++) {
                var item: GroupItem = this.dataAry[i];
                if (item.objUrl) {
                    this._objDic[Scene_data.fileRoot + item.objUrl] = true;
                }
                if (item.materialUrl) {
                    this._materialDic[Scene_data.fileRoot + item.materialUrl] = true;
                }
                if (item.particleUrl) {
                    this._particleDic[Scene_data.fileRoot + item.particleUrl] = true;
                }
            }

            for (var key in this._objDic) {
                ObjDataManager.getInstance().registerUrl(key);
            }

            for (var key in this._materialDic) {
                MaterialManager.getInstance().registerUrl(key);
            }

            for (var key in this._particleDic) {
                ParticleManager.getInstance().registerUrl(key);
            }

        }

        public destory(): void {
            super.destory();

            for (var key in this._objDic) {
                ObjDataManager.getInstance().releaseUrl(key);
            }

            for (var key in this._materialDic) {
                MaterialManager.getInstance().releaseUrl(key);
            }

            for (var key in this._particleDic) {
                ParticleManager.getInstance().releaseUrl(key);
            }

            this.dataAry = null;

            this._objDic = null;
            this._particleDic = null;
            this._materialDic = null;
        }




    }

    export class GroupItem extends Object3D {
        public objUrl: string;
        public materialUrl: string;
        public particleUrl: string;
        public materialInfoArr: Array<any>
        public isGroup: boolean;
        public types: number;
    }
}