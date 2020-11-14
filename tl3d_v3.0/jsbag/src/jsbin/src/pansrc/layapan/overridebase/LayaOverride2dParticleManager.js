var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var layapan_me;
(function (layapan_me) {
    var Shader3D = Pan3d.Shader3D;
    var Display3DParticle = Pan3d.Display3DParticle;
    var CombineParticle = Pan3d.CombineParticle;
    var CombineParticleData = Pan3d.CombineParticleData;
    var ParticleManager = Pan3d.ParticleManager;
    var LoadManager = Pan3d.LoadManager;
    var TextureManager = Pan3d.TextureManager;
    var Scene_data = Pan3d.Scene_data;
    var Frame3DParticleShader = /** @class */ (function (_super) {
        __extends(Frame3DParticleShader, _super);
        function Frame3DParticleShader() {
            return _super.call(this) || this;
        }
        Frame3DParticleShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        Frame3DParticleShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
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
                "}";
            return $str;
        };
        Frame3DParticleShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz =infoUv.xyz*infoUv.w;\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        Frame3DParticleShader.Frame3DParticleShader = "Frame3DParticleShader";
        return Frame3DParticleShader;
    }(Shader3D));
    layapan_me.Frame3DParticleShader = Frame3DParticleShader;
    var Frame3DParticle = /** @class */ (function (_super) {
        __extends(Frame3DParticle, _super);
        function Frame3DParticle() {
            var _this = _super.call(this) || this;
            _this.beginTime = 0;
            Pan3d.ProgrmaManager.getInstance().registe(Frame3DParticleShader.Frame3DParticleShader, new Frame3DParticleShader);
            _this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Frame3DParticleShader.Frame3DParticleShader);
            _this.initData();
            return _this;
        }
        Frame3DParticle.prototype.updateTime = function (t) {
            this._time = t - this.beginTime;
            if (this.frameTextureItem) {
                if (!this.loop) {
                    if (this._time > (this.speedTm * this.frameTextureItem.length)) {
                        this.visible = false;
                    }
                }
                var skipId = Math.floor(this._time / this.speedTm);
                this._uvTextureRes = this.frameTextureItem[skipId % this.frameTextureItem.length];
            }
        };
        Frame3DParticle.prototype.initData = function () {
            if (Frame3DParticle.baseFrameObjData) {
                this.objData = Frame3DParticle.baseFrameObjData;
                return;
            }
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            var tw = 100;
            var th = 100;
            this.objData.vertices.push(-tw, -th, 0);
            this.objData.vertices.push(tw, -th, 0);
            this.objData.vertices.push(tw, th, 0);
            this.objData.vertices.push(-tw, th, 0);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 1);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 0);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.upToGpu();
            Frame3DParticle.baseFrameObjData = this.objData;
        };
        Frame3DParticle.prototype.makeFrameParticle = function (pathurl, fileBaseName, info) {
            this.speedTm = 100; //默认为100毫秒一帧
            this.picNum = 5; //默认只有一张图从0开始
            this.loop = true;
            for (var key in info) {
                this[key] = info[key];
            }
            this.loadTexture(pathurl, fileBaseName);
        };
        Frame3DParticle.getFrameParticle = function (pathurl, fileBaseName, info) {
            var combineParticle = new CombineParticle();
            combineParticle.url = pathurl + fileBaseName;
            combineParticle.displayAry = new Array();
            var tempDic = new Frame3DParticle();
            combineParticle.displayAry.push(tempDic);
            tempDic.bindVecter3d = combineParticle.bindVecter3d;
            tempDic.makeFrameParticle(pathurl, fileBaseName, info);
            return combineParticle;
        };
        Frame3DParticle.prototype.loadTexture = function (pathurl, fileBaseName) {
            var _this = this;
            this.frameTextureItem = new Array;
            for (var i = 0; i < this.picNum; i++) {
                this.frameTextureItem.push(null);
                var url = pathurl + fileBaseName + i + ".png";
                //   url = "res/skill/10104_shifa/xulimengji_qishou_00001.png";
                TextureManager.getInstance().getTexture(url, function ($texture, $info) {
                    _this.frameTextureItem[$info.id] = $texture;
                }, null, { id: i });
            }
        };
        Frame3DParticle.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        Frame3DParticle.prototype.update = function () {
            if (!this.visible) {
                return;
            }
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram(this.shader.program);
                this.posMatrix = new Pan3d.Matrix3D;
                if (this.bindVecter3d) {
                    this.posMatrix.appendScale(2, 2, 1);
                    this.posMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z);
                }
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return Frame3DParticle;
    }(Display3DParticle));
    layapan_me.Frame3DParticle = Frame3DParticle;
    var AtlasFrameVo = /** @class */ (function () {
        function AtlasFrameVo() {
        }
        AtlasFrameVo.prototype.meshData = function (value) {
            this.frame = value.frame;
            this.sourceSize = value.sourceSize;
            this.spriteSourceSize = value.spriteSourceSize;
        };
        return AtlasFrameVo;
    }());
    layapan_me.AtlasFrameVo = AtlasFrameVo;
    var Frame3DAtlasShader = /** @class */ (function (_super) {
        __extends(Frame3DAtlasShader, _super);
        function Frame3DAtlasShader() {
            return _super.call(this) || this;
        }
        Frame3DAtlasShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        Frame3DAtlasShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
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
                "   vt0.z =v3Position.z;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        Frame3DAtlasShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz =infoUv.xyz*infoUv.w;\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        Frame3DAtlasShader.Frame3DAtlasShader = "Frame3DAtlasShader";
        return Frame3DAtlasShader;
    }(Shader3D));
    layapan_me.Frame3DAtlasShader = Frame3DAtlasShader;
    var Frame3DAtlasParticle = /** @class */ (function (_super) {
        __extends(Frame3DAtlasParticle, _super);
        function Frame3DAtlasParticle() {
            var _this = _super.call(this) || this;
            _this.uvchangeData = [0, 0, 1, 1];
            _this.beginTime = 0;
            Pan3d.ProgrmaManager.getInstance().registe(Frame3DAtlasShader.Frame3DAtlasShader, new Frame3DAtlasShader);
            _this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Frame3DAtlasShader.Frame3DAtlasShader);
            _this.initData();
            return _this;
        }
        Frame3DAtlasParticle.prototype.updateTime = function (t) {
            this._time = t - this.beginTime;
            if (this.frameInfoItem && this._uvTextureRes) {
                if (!this.loop) {
                    if (this._time > this.timeLen) {
                        this.visible = false;
                    }
                }
                var skipId = Math.floor(this._time / (this.timeLen / this.frameInfoItem.length));
                var vo = this.frameInfoItem[skipId % this.frameInfoItem.length];
                this.uvchangeData[0] = vo.frame.x / this._uvTextureRes.width;
                this.uvchangeData[1] = vo.frame.y / this._uvTextureRes.height;
                this.uvchangeData[2] = vo.frame.w / this._uvTextureRes.width;
                this.uvchangeData[3] = vo.frame.h / this._uvTextureRes.height;
                this.scaleX = vo.sourceSize.w / 100 * this.frameScale;
                this.scaleY = vo.sourceSize.h / 100 * this.frameScale;
            }
        };
        Frame3DAtlasParticle.prototype.initData = function () {
            if (Frame3DAtlasParticle.baseFrameObjData) {
                this.objData = Frame3DAtlasParticle.baseFrameObjData;
                return;
            }
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            var tw = 50;
            var th = 50;
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
            Frame3DAtlasParticle.baseFrameObjData = this.objData;
        };
        Frame3DAtlasParticle.prototype.makeFrameParticle = function (pathurl, fileBaseName, info) {
            this.frameScale = 1;
            this.isShow = true;
            for (var key in info) {
                this[key] = info[key];
            }
            this.LoadAtlas(pathurl, fileBaseName);
        };
        Frame3DAtlasParticle.prototype.LoadAtlas = function (pathurl, fileBaseName) {
            var _this = this;
            LoadManager.getInstance().load(pathurl + fileBaseName + ".atlas", LoadManager.XML_TYPE, function ($data) {
                var $obj = Array(JSON.parse($data))[0];
                _this.frameInfoItem = [];
                for (var key in $obj.frames) {
                    var $atlasFrameVo = new AtlasFrameVo();
                    $atlasFrameVo.meshData($obj.frames[key]);
                    $atlasFrameVo.key = key;
                    _this.frameInfoItem.push($atlasFrameVo);
                }
                if (isNaN(_this.timeLen)) {
                    _this.timeLen = _this.frameInfoItem.length * 100; //默认
                }
                TextureManager.getInstance().getTexture(pathurl + $obj.meta.image, function ($texture, $info) {
                    _this._uvTextureRes = $texture;
                });
            });
        };
        Frame3DAtlasParticle.getFrameParticle = function (pathurl, fileBaseName, info) {
            var combineParticle = new CombineParticle();
            combineParticle.url = pathurl + fileBaseName;
            combineParticle.displayAry = new Array();
            var tempDic = new Frame3DAtlasParticle();
            combineParticle.displayAry.push(tempDic);
            tempDic.bindVecter3d = combineParticle.bindVecter3d;
            tempDic.makeFrameParticle(pathurl, fileBaseName, info);
            return combineParticle;
        };
        Frame3DAtlasParticle.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        Frame3DAtlasParticle.prototype.update = function () {
            if (!this.visible) {
                return;
            }
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                if (this.isShow) {
                    Scene_data.context3D.setWriteDepth(false);
                    Scene_data.context3D.setDepthTest(false);
                }
                else {
                    Scene_data.context3D.setWriteDepth(false);
                    Scene_data.context3D.setDepthTest(true);
                }
                Scene_data.context3D.setProgram(this.shader.program);
                this.posMatrix = new Pan3d.Matrix3D;
                this.posMatrix.appendScale(this.scaleX, this.scaleY, 1);
                if (this.bindVecter3d) {
                    this.posMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z);
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
        };
        return Frame3DAtlasParticle;
    }(Display3DParticle));
    layapan_me.Frame3DAtlasParticle = Frame3DAtlasParticle;
    var LayaOverride2dParticleManager = /** @class */ (function (_super) {
        __extends(LayaOverride2dParticleManager, _super);
        function LayaOverride2dParticleManager() {
            return _super.call(this) || this;
        }
        LayaOverride2dParticleManager.prototype.getParticleByte = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            var combineParticle = new CombineParticle();
            var url = $url;
            if (ParticleManager.getInstance()._dic[url]) {
                var baseData = ParticleManager.getInstance()._dic[url];
                combineParticle = baseData.getCombineParticle();
            }
            combineParticle.url = url;
            return combineParticle;
        };
        LayaOverride2dParticleManager.prototype.registerUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (ParticleManager.getInstance()._dic[$url]) {
                var baseData = ParticleManager.getInstance()._dic[$url];
                baseData.useNum++;
            }
        };
        LayaOverride2dParticleManager.prototype.releaseUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (ParticleManager.getInstance()._dic[$url]) {
                var baseData = ParticleManager.getInstance()._dic[$url];
                baseData.clearUseNum();
            }
        };
        LayaOverride2dParticleManager.prototype.addResByte = function ($url, $data) {
            if (!ParticleManager.getInstance()._dic[$url]) {
                var baseData = new CombineParticleData();
                ////console.log("load particle",$url);
                baseData.setDataByte($data);
                ParticleManager.getInstance()._dic[$url] = baseData;
            }
        };
        return LayaOverride2dParticleManager;
    }(ParticleManager));
    layapan_me.LayaOverride2dParticleManager = LayaOverride2dParticleManager;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=LayaOverride2dParticleManager.js.map