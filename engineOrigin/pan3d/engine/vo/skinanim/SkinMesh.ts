module Pan3d {

    export class SkinMesh extends ResCount {
        public meshAry: Array<MeshData> = new Array;
 

  

        public boneSocketDic: Object;

        public fileScale: number = 1;
        public tittleHeight: number = 0;
        public hitBox: Vector2D = new Vector2D(0, 0);

        public type: number = 0;

        public animDic: Object = new Object;

        public ready: boolean = false;

        public animUrlAry: Array<string>;


        public lightData: Array<Array<number>>;
        public hitPosItem: Array<Vector3D>;

        public allParticleDic: Object;
        public url: string;
        public hasDestory: boolean = false;
        public makeHitBoxItem(): void {
            this.hitPosItem = new Array
            var w: number = this.hitBox.x;
            var h: number = this.hitBox.y;

            var a: Vector3D = new Vector3D(-w, 0, -w);
            var b: Vector3D = new Vector3D(w, 0, -w);
            var c: Vector3D = new Vector3D(w, 0, w);
            var d: Vector3D = new Vector3D(-w, 0, w);
            this.hitPosItem.push(a);
            this.hitPosItem.push(b);
            this.hitPosItem.push(c);
            this.hitPosItem.push(d);


            var a1: Vector3D = new Vector3D(-w, h, -w);
            var b1: Vector3D = new Vector3D(w, h, -w);
            var c1: Vector3D = new Vector3D(w, h, w);
            var d1: Vector3D = new Vector3D(-w, h, w);
            this.hitPosItem.push(a1);
            this.hitPosItem.push(b1);
            this.hitPosItem.push(c1);
            this.hitPosItem.push(d1);

        }

        public addMesh($mesh: MeshData): void {
            $mesh.uid = this.meshAry.length;
            this.meshAry.push($mesh);
        }
        public loadParticle(): void {

        }
        public loadMaterial($fun: Function = null): void {
            for (var i: number = 0; i < this.meshAry.length; i++) {
                this.loadByteMeshDataMaterial(this.meshAry[i], $fun);
            }
        }

        private loadByteMeshDataMaterial($meshData: MeshData, $fun: Function = null): void {
            var url: string = Scene_data.fileRoot + $meshData.materialUrl;
            url = url.replace("_byte.txt", ".txt")
            url = url.replace(".txt", "_byte.txt")

            MaterialManager.getInstance().getMaterialByte(url, ($material: Material) => {
                $meshData.material = $material;
                if ($material.usePbr) {
                    MeshDataManager.getInstance().uploadPbrMesh($meshData, $material.useNormal);
                } else if ($material.lightProbe || $material.directLight) {
                    MeshDataManager.getInstance().uploadPbrMesh($meshData, false);
                }

                if ($meshData.materialParamData) {
                    $meshData.materialParam = new MaterialBaseParam();
                    $meshData.materialParam.setData($meshData.material, $meshData.materialParamData);
                }

                if ($fun) {
                    $fun($material);
                }
            }, null, true, MaterialAnimShader.MATERIAL_ANIM_SHADER, MaterialAnimShader);
        }

        public setAction(actionAry: Array<string>, roleUrl: string): void {
            this.animUrlAry = new Array;
            for (var i: number = 0; i < actionAry.length; i++) {
                var name: string = actionAry[i];
                var url: string = roleUrl + actionAry[i];
                var anim: AnimData = AnimManager.getInstance().getAnimDataImmediate(url);
                anim.processMesh(this);
                this.animDic[name] = anim;
                this.animUrlAry.push(url);
            }
        }

        public destory(): void {
            if (this.allParticleDic) {
                for (var key in this.allParticleDic) {
                    ParticleManager.getInstance().releaseUrl(key);
                }
                this.allParticleDic = null;
            }
            for (var i: number = 0; i < this.meshAry.length; i++) {
                this.meshAry[i].destory();
            }
            this.meshAry.length = 0;
            this.meshAry = null;


            this.boneSocketDic = null;

            for (var i: number = 0; i < this.animUrlAry.length; i++) {
                AnimManager.getInstance().clearAnim(this.animUrlAry[i]);
            }

            for (var key in this.animDic) {
                delete this.animDic[key];
            }

            this.animDic = null;

            this.hasDestory = true;


        }




    }
}