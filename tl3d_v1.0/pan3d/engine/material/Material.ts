module Pan3d {
    export class Material extends ResCount {
        public url: string;

        public shaderStr: string;
        public texList: Array<TexItem> = new Array;
        public constList: Array<ConstItem> = new Array;
        public hasTime: boolean;
        public timeSpeed: number;
        public blendMode: number;
        public backCull: boolean;
        public killNum: number = 0;
        public hasVertexColor: boolean;
        public usePbr: boolean;
        public useNormal: boolean;
        public roughness: number;
        public program: WebGLProgram;
        public shader: Shader3D;
        public writeZbuffer: boolean = true;
        public hasFresnel: boolean;
        public useDynamicIBL: boolean;
        public normalScale: number;
        public lightProbe: boolean;
        public useKill: boolean;
        public directLight: boolean;
        public noLight: boolean;
        public scaleLightMap: boolean;
        public fogMode: number = 0;
        public fcNum: number = 0;
        public fcIDAry: Array<number>;

        public hasParticleColor: boolean;

        public locationDic: Object;


        public fcData: Float32Array;
        public sceneNumId: number;

        public update(t: number): void {
            this.updateTime(t);
            //this.updateCam();
            this.updateScene();
        }

        public updateTime(t: number): void {
            if (this.hasTime) {
                this.fcData[1] = t;
            }
        }

        public updateCam(x: number, y: number, z: number): void {
            if (this.usePbr || this.fogMode == 1) {
                var idx: number = this.fcIDAry[0] * 4;
                this.fcData[0 + idx] = x;
                this.fcData[1 + idx] = y;
                this.fcData[2 + idx] = z;
            }
        }

        public updateScene(): void {
            if (this.sceneNumId == Scene_data.sceneNumId) {
                return;
            }

            this.sceneNumId = Scene_data.sceneNumId;

            if (this.fogMode != 0) {
                var idx: number = this.fcIDAry[1] * 4;
                this.fcData[0 + idx] = Scene_data.fogColor[0];
                this.fcData[1 + idx] = Scene_data.fogColor[1];
                this.fcData[2 + idx] = Scene_data.fogColor[2];
            }

            if (this.scaleLightMap) {
                var idx: number = this.fcIDAry[2] * 4;
                this.fcData[0 + idx] = Scene_data.scaleLight[0];
            }

        }

        public initFcData(): void {
            this.fcData = new Float32Array(this.fcNum * 4);

            if (this.fcNum <= 0) {
                return;
            }



            this.sceneNumId = Scene_data.sceneNumId;

            if (this.hasTime || this.useKill || this.fogMode != 0) {//fc0

                if (this.useKill) {
                    this.fcData[0] = this.killNum;
                }

                if (this.fogMode != 0) {
                    this.fcData[2] = Scene_data.fogData[0];
                    this.fcData[3] = Scene_data.fogData[1];
                }

            }

            if (this.usePbr || this.fogMode == 1) {
                var idx: number = this.fcIDAry[0] * 4;
                this.fcData[0 + idx] = Scene_data.cam3D.x / 100;
                this.fcData[1 + idx] = Scene_data.cam3D.y / 100;
                this.fcData[2 + idx] = Scene_data.cam3D.z / 100;
            }

            if (this.fogMode != 0) {
                var idx: number = this.fcIDAry[1] * 4;
                this.fcData[0 + idx] = Scene_data.fogColor[0];
                this.fcData[1 + idx] = Scene_data.fogColor[1];
                this.fcData[2 + idx] = Scene_data.fogColor[2];
            }

            if (this.scaleLightMap) {
                var idx: number = this.fcIDAry[2] * 4;
                this.fcData[0 + idx] = Scene_data.scaleLight[0];
            }



        }

        public setCompileData(_compileData: any): void {
            if (!_compileData) {
                return;
            }
            this.shaderStr = _compileData.shaderStr;

            this.hasTime = _compileData.hasTime;
            this.timeSpeed = _compileData.timeSpeed;
            this.blendMode = _compileData.blendMode
            this.backCull = _compileData.backCull;
            this.killNum = _compileData.killNum;
            this.hasVertexColor = _compileData.hasVertexColor;
            this.usePbr = _compileData.usePbr;
            this.useNormal = _compileData.useNormal;
            this.roughness = _compileData.roughness;
            this.writeZbuffer = _compileData.writeZbuffer;
            this.hasFresnel = _compileData.hasFresnel;
            this.useDynamicIBL = _compileData.useDynamicIBL;
            this.normalScale = _compileData.normalScale;
            this.lightProbe = _compileData.lightProbe;
            this.useKill = _compileData.useKill;
            this.directLight = _compileData.directLight;
            this.noLight = _compileData.noLight;
            this.scaleLightMap = _compileData.scaleLightMap;
            this.fogMode = _compileData.fogMode;

            this.hasParticleColor = false;

            this.initFcData();

            if (_compileData.texList) {
                var ary: Array<any> = _compileData.texList;
                this.texList = new Array;
                for (var i: number = 0; i < ary.length; i++) {
                    var texItem: TexItem = new TexItem;
                    texItem.id = ary[i].id;
                    texItem.url = ary[i].url;
                    texItem.isDynamic = ary[i].isDynamic;
                    texItem.paramName = ary[i].paramName;
                    texItem.isMain = ary[i].isMain;
                    texItem.isParticleColor = ary[i].isParticleColor;
                    texItem.type = ary[i].type;
                    texItem.wrap = ary[i].wrap;
                    texItem.filter = ary[i].filter;
                    texItem.mipmap = ary[i].mipmap;
                    this.texList.push(texItem);
                    if (texItem.isParticleColor) {
                        this.hasParticleColor = true;
                    }
                }
            }

            if (_compileData.constList) {
                ary = _compileData.constList;
                this.constList = new Array;
                for (i = 0; i < ary.length; i++) {
                    var constItem: ConstItem = new ConstItem;
                    constItem.setData(ary[i]);
                    constItem.creat(this.fcData);
                    this.constList.push(constItem);
                }
            }

        }

        public setByteData(byte: Pan3dByteArray): void {
            var fs: Pan3dByteArray = byte;

            var vesion: number = fs.readInt();


            this.shaderStr = fs.readUTF()  //fs.writeUTF(_compileData.shaderStr)
            this.hasTime = fs.readBoolean()//fs.writeBoolean(_compileData.hasTime);
            this.timeSpeed = fs.readFloat()//fs.writeFloat(_compileData.timeSpeed);
            this.blendMode = fs.readFloat() //fs.writeFloat(_compileData.blendMode);
            this.backCull = fs.readBoolean() //fs.writeBoolean(_compileData.backCull);
            this.killNum = fs.readFloat() //fs.writeFloat(_compileData.killNum);
            this.hasVertexColor = fs.readBoolean() //fs.writeBoolean(_compileData.hasVertexColor);
            this.usePbr = fs.readBoolean()   //fs.writeBoolean(_compileData.usePbr);
            this.useNormal = fs.readBoolean()  //fs.writeBoolean(_compileData.useNormal);
            this.roughness = fs.readFloat() //fs.writeFloat(_compileData.roughness);
            this.writeZbuffer = fs.readBoolean()//fs.writeBoolean(_compileData.writeZbuffer);
            this.hasFresnel = fs.readBoolean()//fs.writeBoolean(_compileData.hasFresnel);
            this.useDynamicIBL = fs.readBoolean() //fs.writeBoolean(_compileData.useDynamicIBL);
            this.normalScale = fs.readFloat()  //fs.writeFloat(_compileData.normalScale);
            this.lightProbe = fs.readBoolean()  //fs.writeBoolean(_compileData.lightProbe);
            this.useKill = fs.readBoolean() //fs.writeBoolean(_compileData.useKill);
            this.directLight = fs.readBoolean() //fs.writeBoolean(_compileData.directLight);
            this.noLight = fs.readBoolean() //fs.writeBoolean(_compileData.noLight);
            this.scaleLightMap = fs.readBoolean() //fs.writeBoolean(_compileData.scaleLightMap)
            if (vesion > 2) {
                this.fogMode = fs.readInt();
            }
            if (vesion >= 22) {
                this.fcNum = fs.readByte();
                var leg: number = fs.readByte();
                this.fcIDAry = new Array;
                for (var i: number = 0; i < leg; i++) {
                    this.fcIDAry.push(fs.readByte());
                }
            } else {

                // //console.log("ddddd");
            }

            this.hasParticleColor = false;

            this.initFcData();

            this.readTexList(fs)
            this.readConstLis(fs)



        }
        private readConstLis(fs: Pan3dByteArray): void {
            var constLisLen: number = fs.readInt();
            this.constList = new Array
            for (var i: number = 0; i < constLisLen; i++) {
                var constItem: ConstItem = new ConstItem;

                constItem.id = fs.readFloat()
                constItem.value = new Vector3D(fs.readFloat(), fs.readFloat(), fs.readFloat(), fs.readFloat());

                constItem.paramName0 = fs.readUTF()
                constItem.param0Type = fs.readFloat()
                constItem.param0Index = fs.readFloat()

                constItem.paramName1 = fs.readUTF()
                constItem.param1Type = fs.readFloat()
                constItem.param1Index = fs.readFloat()

                constItem.paramName2 = fs.readUTF()
                constItem.param2Type = fs.readFloat()
                constItem.param2Index = fs.readFloat()

                constItem.paramName3 = fs.readUTF()
                constItem.param3Type = fs.readFloat()
                constItem.param3Index = fs.readFloat()
                constItem.creat(this.fcData);

                this.constList.push(constItem);
            }

        }
        private readTexList(fs: Pan3dByteArray): void {
            var texListLen: number = fs.readInt();
            this.texList = new Array;
            for (var i: number = 0; i < texListLen; i++) {


                var texItem: TexItem = new TexItem;
                texItem.id = fs.readFloat()
                texItem.url = fs.readUTF()
                texItem.isDynamic = fs.readBoolean()
                texItem.paramName = fs.readUTF()
                texItem.isMain = fs.readBoolean()
                texItem.isParticleColor = fs.readBoolean()
                texItem.type = fs.readFloat()
                texItem.wrap = fs.readFloat()
                texItem.filter = fs.readFloat()
                texItem.mipmap = fs.readFloat()

                if (texItem.isParticleColor) {
                    this.hasParticleColor = true;
                }

                this.texList.push(texItem);

            }

        }

        public destory(): void {

            for (var i: number = 0; i < this.texList.length; i++) {
                this.texList[i].destory();
            }

            this.texList = null;
            this.constList = null;

            if (this.shader) {
                this.shader.clearUseNum();
            }

        }

    }
}