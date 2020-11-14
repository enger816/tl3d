var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
自定义着色器
*/
var layapan;
(function (layapan) {
    var Pan3dInSideLaya = /** @class */ (function () {
        function Pan3dInSideLaya() {
        }
        Pan3dInSideLaya.overrideMethods = function () {
            if (this.inited) {
                return;
            }
            this.inited = true;
            var compatibleLayaRender = function (pan3dFunc) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var gl = Pan3d.Scene_data.context3D.renderContext;
                var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
                var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
                var v = pan3dFunc.apply(this, args);
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
                return v;
            };
            /*
    let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
    Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
        return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
    }
    let ParticleFacetData_setAllByteInfo = Pan3d.ParticleFacetData.prototype.setAllByteInfo;
    Pan3d.ParticleFacetData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
        return compatibleLayaRender.call(this, ParticleFacetData_setAllByteInfo, byte);
    }
    let ParticleFollowData_setAllByteInfo = Pan3d.ParticleFollowData.prototype.setAllByteInfo;
    Pan3d.ParticleFollowData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
        return compatibleLayaRender.call(this, ParticleFollowData_setAllByteInfo, byte);
    }
    let ParticleFollowLocusData_setAllByteInfo = Pan3d.ParticleFollowLocusData.prototype.setAllByteInfo;
    Pan3d.ParticleFollowLocusData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
        return compatibleLayaRender.call(this, ParticleFollowLocusData_setAllByteInfo, byte);
    }
    let ParticleLocusData_setAllByteInfo = Pan3d.ParticleLocusData.prototype.setAllByteInfo;
    Pan3d.ParticleLocusData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
        return compatibleLayaRender.call(this, ParticleLocusData_setAllByteInfo, byte);
    }
    let ParticleLocusballData_setAllByteInfo = Pan3d.ParticleLocusballData.prototype.setAllByteInfo;
    Pan3d.ParticleLocusballData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
        return compatibleLayaRender.call(this, ParticleLocusballData_setAllByteInfo, byte);
    }
    let ParticleModelData_setAllByteInfo = Pan3d.ParticleModelData.prototype.setAllByteInfo;
    Pan3d.ParticleModelData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
        return compatibleLayaRender.call(this, ParticleModelData_setAllByteInfo, byte);
    }
    let ParticleBallData_setAllByteInfo = Pan3d.ParticleBallData.prototype.regShader;
    Pan3d.ParticleBallData.prototype.regShader = function (): void {
        return compatibleLayaRender.call(this, ParticleBallData_setAllByteInfo);
    }
    // 重写下以下方法 要不会影响到渲染队列之前的laya绘制
    let MeshDataManager_readData = Pan3d.MeshDataManager.prototype.readData;
    Pan3d.MeshDataManager.prototype.readData = function (byte, batchNum, url, version): Pan3d.SkinMesh {
        return compatibleLayaRender.call(this, MeshDataManager_readData, byte, batchNum, url, version);
    }
    let ObjDataManager_loadObjCom = Pan3d.ObjDataManager.prototype.loadObjCom;
    Pan3d.ObjDataManager.prototype.loadObjCom = function (byte: ArrayBuffer, url: string): Pan3d.ObjData {
        return compatibleLayaRender.call(this, ObjDataManager_loadObjCom, byte, url);
    }

    let ArtFont_getAirFontWidth = Pan3d.ArtFont.prototype.getAirFontWidth;
    Pan3d.ArtFont.prototype.getAirFontWidth = function ($ctx: CanvasRenderingContext2D, $str: string, $color: string = Pan3d.ArtFont.White, $txtInterval: number = 0): number {
        return compatibleLayaRender.call(this, ArtFont_getAirFontWidth, $ctx, $str, $color, $txtInterval) + $txtInterval;
    }

    let ArtFont_writeFontToCtxLeft = Pan3d. ArtFont.prototype.writeFontToCtxLeft;
    Pan3d.ArtFont.prototype.writeFontToCtxLeft = function ($ctx: CanvasRenderingContext2D, $str: string, $color: string = Pan3d.ArtFont.num1, $tx: number = 0, $ty: number = 0, $txtInterval: number = 0): number {
        return compatibleLayaRender.call(this, ArtFont_writeFontToCtxLeft, $ctx, $str, $color, $tx, $ty, $txtInterval) + $txtInterval;
    }

    let SkillRes_loadComplete = Pan3d.SkillRes.prototype.loadComplete;
    Pan3d.SkillRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
        compatibleLayaRender.call(this, SkillRes_loadComplete, byte);
    }
    let RoleRes_loadComplete = Pan3d.RoleRes.prototype.loadComplete;
    Pan3d.RoleRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
        compatibleLayaRender.call(this, RoleRes_loadComplete, byte);
    }
    let RoleResLow_loadComplete = Pan3d.RoleResLow.prototype.loadComplete;
    Pan3d.RoleResLow.prototype.loadComplete = function (byte: ArrayBuffer): void {
        compatibleLayaRender.call(this, RoleResLow_loadComplete, byte);
    }
    let ModelRes_loadComplete = Pan3d.ModelRes.prototype.loadComplete;
    Pan3d.ModelRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
        compatibleLayaRender.call(this, ModelRes_loadComplete, byte);
    }
    let GroupRes_loadComplete = Pan3d.GroupRes.prototype.loadComplete;
    Pan3d.GroupRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
        compatibleLayaRender.call(this, GroupRes_loadComplete, byte);
    }

    let UIRenderComponent_applyObjData = Pan3d.UIRenderComponent.prototype.applyObjData;
    Pan3d.UIRenderComponent.prototype.applyObjData = function (): void {
        compatibleLayaRender.call(this, UIRenderComponent_applyObjData);
    }
    let Display3dShadow_applyObjData = Pan3d.Display3dShadow.prototype.applyObjData;
    Pan3d.Display3dShadow.prototype.applyObjData = function (): void {
        compatibleLayaRender.call(this, Display3dShadow_applyObjData);
    }
    */
        };
        Pan3dInSideLaya.inited = false;
        return Pan3dInSideLaya;
    }());
    layapan.Pan3dInSideLaya = Pan3dInSideLaya;
    /*
    该类需继承自显示对象类
    在该类中使用了自定义的着色器程序
    注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
    */
    var LayaInsideSprite = /** @class */ (function (_super) {
        __extends(LayaInsideSprite, _super);
        function LayaInsideSprite() {
            var _this = _super.call(this) || this;
            _this._layaRenderIndex = -1;
            LayaInsideSprite.add(_this);
            _this.initData();
            return _this;
        }
        LayaInsideSprite.add = function (v) {
            LayaInsideSprite._list.push(v);
            // 重写下laya的渲染提交函数插入pan渲染
            var context = Laya.Render.context.ctx;
            context.submitElement = function (start, end) {
                var renderList = context._submits;
                end < 0 && (end = renderList._length);
                if (start == end) {
                    LayaInsideSprite.forEach(function (value, index) {
                        value.testRenderPan3d(-1);
                    });
                }
                else {
                    while (start < end) {
                        start += renderList[start].renderSubmit();
                        LayaInsideSprite.forEach(function (value, index) {
                            value.testRenderPan3d(start);
                        });
                    }
                }
            };
        };
        LayaInsideSprite.forEach = function (f) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var item = _a[_i];
                f.call(null, item, 0);
            }
        };
        LayaInsideSprite.prototype.initData = function () {
            // Pan3dInSideLaya.overrideMethods();
            this.init(null);
            this.scene = new layapan.LayaOverride2dSceneManager();
            this.scene.layaSprite = this;
            this.scene.ready = true;
            this.addOther();
        };
        LayaInsideSprite.prototype.addOther = function () {
            var $other = new layapan.OtherLayaRectSprite();
            this.addChild($other);
        };
        /*
        初始化此类
        texture 纹理对象
        vb 顶点数组
        ib 顶点索引数组
        */
        LayaInsideSprite.prototype.init = function (texture, vb, ib) {
            var _this = this;
            if (vb === void 0) { vb = null; }
            if (ib === void 0) { ib = null; }
            // 保证customRender必定执行
            this.frameLoop(1, this, function () {
                _this.graphics.clear();
                _this.graphics.drawLine(0, 0, 1, 0, '#000');
            });
            this.customRenderEnable = true;
            this.customRender = function (context, x, y) {
                var webGLContext = context.ctx;
                _this._layaRenderIndex = webGLContext._submits._length;
            };
        };
        LayaInsideSprite.prototype.testRenderPan3d = function (index) {
            if (this._layaRenderIndex < 0
                || (index != 0 && index != this._layaRenderIndex)) {
                return;
            }
            this._layaRenderIndex = -1;
            this.upFrame();
        };
        LayaInsideSprite.prototype.upFrame = function () {
        };
        // 保存WebGLContext laya的渲染状态
        LayaInsideSprite.saveLayaWebGLContext = function () {
            var gl = laya.webgl.WebGL.mainContext;
            laya.webgl.WebGLContext._depthTest = gl.isEnabled(laya.webgl.WebGLContext.DEPTH_TEST);
            laya.webgl.WebGLContext._depthMask = gl.getParameter(laya.webgl.WebGLContext.DEPTH_WRITEMASK);
            laya.webgl.WebGLContext._depthFunc = gl.getParameter(laya.webgl.WebGLContext.DEPTH_FUNC);
            laya.webgl.WebGLContext._blend = gl.isEnabled(laya.webgl.WebGLContext.BLEND);
            laya.webgl.WebGLContext._sFactor = gl.getParameter(laya.webgl.WebGLContext.BLEND_SRC_RGB);
            laya.webgl.WebGLContext._dFactor = gl.getParameter(laya.webgl.WebGLContext.BLEND_DST_RGB);
            laya.webgl.WebGLContext._cullFace = gl.isEnabled(laya.webgl.WebGLContext.CULL_FACE);
            laya.webgl.WebGLContext['_cullFaceMode'] = gl.getParameter(laya.webgl.WebGLContext.CULL_FACE_MODE);
            laya.webgl.WebGLContext['_arrayBuffer'] = gl.getParameter(laya.webgl.WebGLContext.ARRAY_BUFFER_BINDING);
            laya.webgl.WebGLContext['_arrayBuffer'] && gl.bindBuffer(laya.webgl.WebGLContext.ARRAY_BUFFER, null);
            laya.webgl.WebGLContext['_elementArrayBuffer'] = gl.getParameter(laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER_BINDING);
            laya.webgl.WebGLContext['_elementArrayBuffer'] && gl.bindBuffer(laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER, null);
            laya.webgl.WebGLContext['_frameBuffer'] = gl.getParameter(laya.webgl.WebGLContext.FRAMEBUFFER_BINDING);
            laya.webgl.WebGLContext['_frameBuffer'] && gl.bindFramebuffer(laya.webgl.WebGLContext.FRAMEBUFFER, null);
            laya.webgl.WebGLContext['_renderBuffer'] = gl.getParameter(laya.webgl.WebGLContext.RENDERBUFFER_BINDING);
            laya.webgl.WebGLContext['_renderBuffer'] && gl.bindRenderbuffer(laya.webgl.WebGLContext.RENDERBUFFER, null);
            laya.webgl.WebGLContext['_bindTextureCubeMap'] = gl.getParameter(laya.webgl.WebGLContext.TEXTURE_BINDING_CUBE_MAP);
            laya.webgl.WebGLContext['_activeTexture'] = gl.getParameter(laya.webgl.WebGLContext.ACTIVE_TEXTURE);
        };
        // 还原WebGLContext到laya之前的渲染状态
        LayaInsideSprite.revertLayaWebGLContext = function () {
            var gl = laya.webgl.WebGL.mainContext;
            gl.bindBuffer(laya.webgl.WebGLContext.ARRAY_BUFFER, laya.webgl.WebGLContext['_arrayBuffer']);
            gl.bindBuffer(laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER, laya.webgl.WebGLContext['_elementArrayBuffer']);
            gl.bindFramebuffer(laya.webgl.WebGLContext.FRAMEBUFFER, laya.webgl.WebGLContext['_frameBuffer']);
            gl.bindRenderbuffer(laya.webgl.WebGLContext.RENDERBUFFER, laya.webgl.WebGLContext['_renderBuffer']);
            gl.useProgram(laya.webgl.WebGLContext._useProgram);
        };
        LayaInsideSprite._list = [];
        return LayaInsideSprite;
    }(Laya.Sprite));
    layapan.LayaInsideSprite = LayaInsideSprite;
    /*
    自定义着色器
    */
    var OtherShader = /** @class */ (function (_super) {
        __extends(OtherShader, _super);
        function OtherShader() {
            var _this = this;
            OtherShader.shader = new OtherShader();
            //顶点着色器程序和片元着色器程序。
            var vs = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1.0);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}";
            var ps = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = vec4(1.0,0.0,1.0,1.0);}";
            _this = _super.call(this, vs, ps, "myShader") || this;
            return _this;
        }
        return OtherShader;
    }(Laya.Shader));
    layapan.OtherShader = OtherShader;
    var OtherShaderValue = /** @class */ (function (_super) {
        __extends(OtherShaderValue, _super);
        function OtherShaderValue() {
            var _this = _super.call(this, 0, 0) || this;
            var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
            //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
            _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
            _this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
            _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
            return _this;
        }
        return OtherShaderValue;
    }(Laya.Value2D));
    layapan.OtherShaderValue = OtherShaderValue;
    var OtherLayaRectSprite = /** @class */ (function (_super) {
        __extends(OtherLayaRectSprite, _super);
        function OtherLayaRectSprite() {
            var _this = _super.call(this) || this;
            _this.iNum = 0;
            _this.init(null);
            return _this;
        }
        /*
        初始化此类
        texture 纹理对象
        vb 顶点数组
        ib 顶点索引数组
        */
        OtherLayaRectSprite.prototype.init = function (texture, vb, ib) {
            if (vb === void 0) { vb = null; }
            if (ib === void 0) { ib = null; }
            this.vBuffer = Laya.VertexBuffer2D.create();
            this.iBuffer = Laya.IndexBuffer2D.create();
            this.ibData = new Uint16Array([]);
            var vbArray;
            var ibArray;
            if (vb) {
                vbArray = vb;
            }
            else {
                vbArray = [];
                var texWidth = 100;
                var texHeight = 100;
                //定义颜色值，取值范围0~1浮点
                var red = 1;
                var greed = 1;
                var blue = 1;
                var alpha = 1;
                //在顶点数组中放入4个顶点
                //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
                vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
                vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
            }
            if (ib) {
                ibArray = ib;
            }
            else {
                ibArray = [];
                //在顶点索引数组中放入组成三角形的顶点索引
                //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
                ibArray.push(0, 1, 3); //从第一个三角形的顶点索引
                //ibArray.push(3,1,2);第二个三角形的顶点索引
            }
            this.iNum = ibArray.length;
            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);
            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);
            this.shaderValue = new OtherShaderValue();
            this.shaderValue.textureHost = null;
            this._renderType |= Laya.RenderSprite.CUSTOM; //设置当前显示对象的渲染模式为自定义渲染模式
        };
        OtherLayaRectSprite.prototype.customRender = function (context, x, y) {
            context.ctx.setIBVB(x, y, (this.iBuffer), (this.vBuffer), this.iNum, null, OtherShader.shader, this.shaderValue, 0, 0);
        };
        return OtherLayaRectSprite;
    }(Laya.Sprite));
    layapan.OtherLayaRectSprite = OtherLayaRectSprite;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaInsideSprite.js.map