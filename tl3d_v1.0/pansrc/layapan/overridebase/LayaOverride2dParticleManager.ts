module layapan {
    import Shader3D = Pan3d.Shader3D
    import Display3DParticle = Pan3d.Display3DParticle
    import CombineParticle = Pan3d.CombineParticle
    import CombineParticleData = Pan3d.CombineParticleData
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import ParticleManager = Pan3d.ParticleManager
    import LoadManager = Pan3d.LoadManager
    import ObjData = Pan3d.ObjData
    import TextureRes = Pan3d.TextureRes
    import TextureManager = Pan3d.TextureManager


    export class Frame3DParticleShader extends Shader3D {
        static Frame3DParticleShader: string = "Frame3DParticleShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +

                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz =infoUv.xyz*infoUv.w;\n" +
                "gl_FragColor =infoUv;\n" +
                "}"
            return $str

        }

    }
    export class Frame3DParticle extends Display3DParticle {
        private shader: Shader3D
        private beginTime: number;
        private static baseFrameObjData: ObjData
        public constructor() {
            super();
            this.beginTime =0
            Pan3d.ProgrmaManager.getInstance().registe(Frame3DParticleShader.Frame3DParticleShader, new Frame3DParticleShader)
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Frame3DParticleShader.Frame3DParticleShader)
            this.initData()

        }
     
        public updateTime(t: number): void {
            this._time = t - this.beginTime;
            if (this.frameTextureItem) {
                if (!this.loop) {
                    if (this._time>(this.speedTm * this.frameTextureItem.length) ) {
                        this.visible = false;
                    }
                }
                var skipId: number = Math.floor(this._time / this.speedTm)
                this._uvTextureRes = this.frameTextureItem[skipId % this.frameTextureItem.length];
            }
        }
   
        private objData: ObjData
        protected initData(): void {
            if (Frame3DParticle.baseFrameObjData) {
                this.objData = Frame3DParticle.baseFrameObjData
                return;
            }
            this.objData = new ObjData;
            this.objData.vertices = new Array();

            var tw: number = 100
            var th: number = 100
            this.objData.vertices.push(-tw, -th, 0);
            this.objData.vertices.push(tw, -th, 0);
            this.objData.vertices.push(tw, th, 0);
            this.objData.vertices.push(-tw, th, 0);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 1);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 0);

            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);

            this.upToGpu();
            Frame3DParticle.baseFrameObjData = this.objData
        }

        private speedTm: number;
        private picNum: number;
        private loop: boolean;

        private makeFrameParticle(pathurl: string, fileBaseName: string, info: any): void {
            this.speedTm = 100; //默认为100毫秒一帧
            this.picNum = 5;  //默认只有一张图从0开始
            this.loop = true
            for (var key in info) {
                this[key] = info[key];
            }
            this.loadTexture(pathurl, fileBaseName);
        }
        public static getFrameParticle( pathurl: string, fileBaseName: string, info: any): CombineParticle {
            var combineParticle: CombineParticle = new CombineParticle();
            combineParticle.url = pathurl + fileBaseName;
            combineParticle.displayAry = new Array();
            var tempDic: Frame3DParticle = new Frame3DParticle();
            combineParticle.displayAry.push(tempDic);
            tempDic.bindVecter3d = combineParticle.bindVecter3d;
            tempDic.makeFrameParticle(pathurl, fileBaseName, info);
            return combineParticle
        }
        private loadTexture(pathurl: string, fileBaseName: string): void {
            this.frameTextureItem = new Array;
   
            for (var i: number = 0; i < this.picNum; i++) {
                this.frameTextureItem.push(null)
                var url: string = pathurl + fileBaseName + i + ".png";
                //   url = "res/skill/10104_shifa/xulimengji_qishou_00001.png";
                TextureManager.getInstance().getTexture(url, ($texture: TextureRes, $info: any) => {
                    this.frameTextureItem[$info.id] = $texture
                }, null, { id: i });
            }
        }
        private frameTextureItem: Array<TextureRes>;
        public _uvTextureRes: TextureRes
        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }

        public update(): void {
            if (!this.visible) {
                return;
            }
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram(this.shader.program);
                this.posMatrix = new Pan3d.Matrix3D
                if (this.bindVecter3d) {
                    this.posMatrix.appendScale(2, 2, 1);
                    this.posMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z)
                }
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }

        }
    }
    export class AtlasFrameVo  {

        public frame: any
        public sourceSize: any
        public spriteSourceSize: Pan3d.Vector2D
        public key: string

        public meshData(value: any): void {
            this.frame = value.frame;
            this.sourceSize = value.sourceSize;
            this.spriteSourceSize = value.spriteSourceSize;
        }
    }
    export class Frame3DAtlasShader extends Shader3D {
        static Frame3DAtlasShader: string = "Frame3DAtlasShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "uniform vec4 uvchange;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x*uvchange.z+uvchange.x, u2Texture.y*uvchange.w+uvchange.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz =infoUv.xyz*infoUv.w;\n" +
                "gl_FragColor =infoUv;\n" +
                "}"
            return $str

        }

    }
    export class Frame3DAtlasParticle extends Display3DParticle {
        private shader: Shader3D
        private beginTime: number;
        private static baseFrameObjData: ObjData
        public constructor() {
            super();
            this.uvchangeData = [0, 0, 1, 1]
            this.beginTime = 0
            Pan3d.ProgrmaManager.getInstance().registe(Frame3DAtlasShader.Frame3DAtlasShader, new Frame3DAtlasShader)
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Frame3DAtlasShader.Frame3DAtlasShader)
            this.initData()

        }

        public updateTime(t: number): void {
            this._time = t - this.beginTime;
            if (this.frameInfoItem && this._uvTextureRes ) {
                if (!this.loop) {
                    if (this._time > this.timeLen) {
                        this.visible = false;
                    }
                }
                var skipId: number = Math.floor(this._time / (this.timeLen / this.frameInfoItem.length))
                var vo: AtlasFrameVo = this.frameInfoItem[skipId % this.frameInfoItem.length]
                this.uvchangeData[0] = vo.frame.x / this._uvTextureRes.width;
                this.uvchangeData[1] = vo.frame.y / this._uvTextureRes.height;
                this.uvchangeData[2] = vo.frame.w / this._uvTextureRes.width;
                this.uvchangeData[3] = vo.frame.h / this._uvTextureRes.height;

                this.scaleX = vo.sourceSize.w / 100 * this.frameScale;
                this.scaleY = vo.sourceSize.h / 100 * this.frameScale;
            }
          
        }
        

        private objData: ObjData
        protected initData(): void {
            if (Frame3DAtlasParticle.baseFrameObjData) {
                this.objData = Frame3DAtlasParticle.baseFrameObjData
                return;
            }
          
            this.objData = new ObjData;
            this.objData.vertices = new Array();

            var tw: number = 50
            var th: number = 50
            this.objData.vertices.push(-tw, -th, 0.9);
            this.objData.vertices.push(tw, -th, 0.9);
            this.objData.vertices.push(tw, th, 0.9);
            this.objData.vertices.push(-tw, th, 0.9);

            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 1);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 0);

            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);

            this.upToGpu();
            Frame3DAtlasParticle.baseFrameObjData = this.objData
        }

        private timeLen: number;
        private loop: boolean;
        private frameScale: number;
        private isShow: boolean
        private makeFrameParticle(pathurl: string, fileBaseName: string, info: any): void {
     
  
            this.frameScale = 1;
            this.isShow = true;
            for (var key in info) {
                this[key] = info[key];
            }
            this.LoadAtlas(pathurl, fileBaseName)
        }
        private frameInfoItem: Array<AtlasFrameVo>

        private LoadAtlas(pathurl: string, fileBaseName: string): void {
            LoadManager.getInstance().load( pathurl + fileBaseName +".atlas", LoadManager.XML_TYPE,
                ($data: string) => {
                  
                    var $obj: any = Array(JSON.parse($data))[0]
                    this.frameInfoItem = []
                    for (var key in $obj.frames) {
                        var $atlasFrameVo: AtlasFrameVo = new AtlasFrameVo();
                        $atlasFrameVo.meshData($obj.frames[key])
                        $atlasFrameVo.key = key;
                        this.frameInfoItem.push($atlasFrameVo);
                    }
                    if (isNaN(this.timeLen)) {
                        this.timeLen = this.frameInfoItem.length * 140;//默认
                    }

                    TextureManager.getInstance().getTexture( pathurl+ $obj.meta.image, ($texture: TextureRes, $info: any) => {
                        this._uvTextureRes = $texture;
                    });
                 
                });
        }
        public static getFrameParticle(pathurl: string, fileBaseName: string, info: any): CombineParticle {
            var combineParticle: CombineParticle = new CombineParticle();
            combineParticle.url = pathurl + fileBaseName;
            combineParticle.displayAry = new Array();
            var tempDic: Frame3DAtlasParticle = new Frame3DAtlasParticle();
            combineParticle.displayAry.push(tempDic);
            tempDic.bindVecter3d = combineParticle.bindVecter3d;
            tempDic.makeFrameParticle(pathurl, fileBaseName, info);
            return combineParticle
        }

   
        public _uvTextureRes: TextureRes
        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }

        public update(): void {
            if (!this.visible) {
                return;
            }
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
               
                if (this.isShow) {
                    Scene_data.context3D.setWriteDepth(false);
                    Scene_data.context3D.setDepthTest(false);
                } else {
                    Scene_data.context3D.setWriteDepth(false);
                    Scene_data.context3D.setDepthTest(true);
                }
     
                Scene_data.context3D.setProgram(this.shader.program);
                this.posMatrix = new Pan3d.Matrix3D
                this.posMatrix.appendScale(this.scaleX, this.scaleY, 1);
                
                if (this.bindVecter3d) {
                    this.posMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z)
                }
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVc4fv(this.shader, "uvchange", this.uvchangeData);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
                if (this.isShow) {
                    Scene_data.context3D.setWriteDepth(true);
                    Scene_data.context3D.setDepthTest(true);
                }
            }

        }
        private uvchangeData: Array<number>
 
    }
    
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