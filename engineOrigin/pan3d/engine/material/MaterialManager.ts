module Pan3d {
    export class MaterialManager extends ResGC {
        //private _dic: Object;
        private _loadDic: Object;
        private _resDic: Object;
        private _regDic: Object;
        constructor() {
            //this._dic = new Object();
            super();
            this._loadDic = new Object();
            this._resDic = new Object();
            this._regDic = new Object();
        }

        private static _instance: MaterialManager;
        public static getInstance(): MaterialManager {
            if (!this._instance) {
                this._instance = new MaterialManager();
            }
            return this._instance;
        }
        /**
        public getMaterial($url: string, $fun: Function, $info: Object = null, $autoReg: boolean = false, $regName: string = null, $shader3D: Shader3D = null): void {
    
            if (this._dic[$url]) {
                if ($info) {
                    $fun(this._dic[$url], $info);
                } else {
                    $fun(this._dic[$url]);
                }
                return;
            }
    
            var materialLoad: MaterialLoad = new MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3D);
            if (this._loadDic[$url]) {
                var ary: Array<MaterialLoad> = this._loadDic[$url];
                ary.push(materialLoad);
                return;
            }
    
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(materialLoad);
    
            if (this._resDic[$url]) {
                this.loadMaterialCom(this._resDic[$url], materialLoad);
            } else {
                LoadManager.getInstance().load($url, LoadManager.XML_TYPE, ($data: string, _info: MaterialLoad) => { this.loadMaterialCom($data, _info) }, materialLoad);
            }
        }
         */
        public getMaterialByte($url: string, $fun: Function, $info: Object = null, $autoReg: boolean = false, $regName: string = null, $shader3DCls: any = null): void {


            if (this._dic[$url]) {
                if ($info) {
                    $fun(this._dic[$url], $info);
                } else {
                    $fun(this._dic[$url]);
                }
                this._dic[$url].useNum++;

                // if ($url.indexOf("m_ef_ver_byte.txt") != -1) {
                //     //console.log("aaaaaaaaaaaaaaaa", this._dic[$url].useNum)
                // }
                return;
            }

            var materialLoad: MaterialLoad = new MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3DCls);
            if (this._loadDic[$url]) {
                var ary: Array<MaterialLoad> = this._loadDic[$url];
                ary.push(materialLoad);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(materialLoad);

            if (this._resDic[$url]) {

                this.meshByteMaterialByt(this._resDic[$url], materialLoad);

                if (this._regDic[$url]) {
                    this._dic[$url].useNum += this._regDic[$url];
                    delete this._regDic[$url];
                }

                delete this._resDic[$url];
            } else {
                LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($data: ArrayBuffer, _info: MaterialLoad) => { this.loadMaterialByteCom($data, _info) }, materialLoad);
            }


        }

        private meshByteMaterialByt(byte: Pan3dByteArray, _info: MaterialLoad): void {

            var material: Material = new Material()
            material.setByteData(byte)
            material.url = _info.url;


            this.loadMaterial(material);

            if (_info.autoReg) {
                material.shader = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
                material.program = material.shader.program;
            }


            var ary: Array<TextureLoad> = this._loadDic[_info.url];
            for (var i: number = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(material, ary[i].info);
                } else {
                    ary[i].fun(material);
                }
                material.useNum++;

                // if (_info.url.indexOf("m_ef_ver_byte.txt") != -1) {
                //     //console.log("aaaaaaaaaaaaaaaa", material.useNum)
                // }

            }

            delete this._loadDic[_info.url];

            this._dic[_info.url] = material;
        }
        public loadMaterialByteCom($data: ArrayBuffer, _info: MaterialLoad): void {
            var byte: Pan3dByteArray = new Pan3dByteArray($data);
            this.meshByteMaterialByt(byte, _info)
        }
        public addResByte($url: string, $data: Pan3dByteArray): void {

            if (!this._dic[$url] && !this._resDic[$url]) {
                this._resDic[$url] = $data;
            }
        }

        public registerUrl($url: string): void {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            if (this._dic[$url]) {
                this._dic[$url].useNum++;
            } else {
                if (this._regDic[$url]) {
                    this._regDic[$url]++;
                } else {
                    this._regDic[$url] == 1;
                }
            }
        }

        public releaseUrl($url: string): void {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            if (this._dic[$url]) {
                this._dic[$url].clearUseNum();
            }
        }
        /**
        public loadMaterialCom($data: string, _info: MaterialLoad): void {
            var obj = JSON.parse($data);
            
            var material: Material = new Material();
            material.setCompileData(obj);
            material.url = _info.url;
    
            this.loadMaterial(material);
    
            if (_info.autoReg){
                material.program = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
            }
    
            var ary: Array<TextureLoad> = this._loadDic[_info.url];
            for (var i: number = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(material, ary[i].info);
                } else {
                    ary[i].fun(material);
                }
            }
            
            delete this._loadDic[_info.url];
    
            this._dic[_info.url] = material;
    
        }
        */
        private loadMaterial($material: Material): void {
            var texVec: Array<TexItem> = $material.texList;
            for (var i: number = 0; i < texVec.length; i++) {
                if (texVec[i].isParticleColor || texVec[i].isDynamic || texVec[i].type != 0) {
                    continue;
                }
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + texVec[i].url, ($textureVo: TextureRes, $texItem: TexItem) => {
                    $texItem.textureRes = $textureVo;
                }, texVec[i].wrap, texVec[i], texVec[i].filter, texVec[i].mipmap);
            }
        }

        public loadDynamicTexUtil(material: MaterialParam): void {
            var dynamicTexList: Array<DynamicTexItem> = material.dynamicTexList;

            for (var i: number = 0; i < dynamicTexList.length; i++) {
                if (dynamicTexList[i].isParticleColor) {
                    dynamicTexList[i].creatTextureByCurve();
                } else {
                    TextureManager.getInstance().getTexture(Scene_data.fileRoot + dynamicTexList[i].url, ($textureVo: TextureRes, $texItem: DynamicTexItem) => {
                        $texItem.textureRes = $textureVo;
                    }, 0, dynamicTexList[i], 0, 1);
                }
            }

        }

        public gc(): void {
            super.gc();
        }


    }

    class MaterialLoad {
        public fun: Function;
        public info: any;
        public url: string;
        public autoReg: boolean;
        public regName: string;
        public shader3D: any;

        constructor($fun: Function, $info: any, $url: string, $autoReg: boolean, $regName: string, $shader3D: any) {
            this.fun = $fun;
            this.info = $info;
            this.url = $url;

            this.autoReg = $autoReg;
            this.regName = $regName;
            this.shader3D = $shader3D;
        }

    }
}