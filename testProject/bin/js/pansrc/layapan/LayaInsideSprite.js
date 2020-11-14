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
/*
自定义着色器
*/
var layapan;
(function (layapan) {
    var Scene_data = tl3d.Scene_data;
    var WebGLContext = laya.webgl.WebGLContext;
    /*
    自定义着色器
    */
    var OtherShader = /** @class */ (function (_super) {
        __extends(OtherShader, _super);
        function OtherShader() {
            var _this = this;
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
            if (!OtherShader.shader) {
                OtherShader.shader = new OtherShader();
            }
            _this.init(null);
            return _this;
        }
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
                // var texWidth: number = 10+random(20);
                // var texHeight: number = 10+random(20);
                // var red: number = 1;
                // var greed: number = 1;
                // var blue: number = 1;
                // var alpha: number = 1;
                // vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
                // vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
                // vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
                // vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
            }
            if (ib) {
                ibArray = ib;
            }
            else {
                ibArray = [];
                ibArray.push(0, 1, 3); //从第一个三角形的顶点索引
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
    var LayaInsideSprite = /** @class */ (function (_super) {
        __extends(LayaInsideSprite, _super);
        function LayaInsideSprite() {
            var _this = _super.call(this) || this;
            _this._layaRenderIndex = -1;
            _this.timespeed1 = 0;
            _this.initData();
            LayaInsideSprite.add(_this);
            return _this;
        }
        LayaInsideSprite.add = function (v) {
            LayaInsideSprite._list.push(v);
            if (this.inited) {
                return;
            }
            this.inited = true;
            var context = Laya.Render.context.ctx;
            context.submitElement = function (start, end) {
                if (end > 0) {
                    while (start < end) {
                        var temp = context._submits[start];
                        start += temp.renderSubmit();
                        // if (temp instanceof Laya.SubmitOtherIBVB) {
                        //     start += temp.renderSubmit();
                        // } else {
                        //     start += temp.renderSubmit();
                        // }
                        for (var i = 0; i < LayaInsideSprite._list.length; i++) {
                            if (start == LayaInsideSprite._list[i]._layaRenderIndex) {
                                LayaInsideSprite._list[i].testRenderPan3d(start);
                            }
                        }
                    }
                }
            };
        };
        LayaInsideSprite.prototype.initData = function () {
            this.customRenderEnable = true;
            this.scene = new tl3d.SceneManager();
            this.scene.ready = true;
        };
        LayaInsideSprite.prototype.customRender = function (context, x, y) {
            _super.prototype.customRender.call(this, context, x, y);
            this._layaRenderIndex = context.ctx._submits._length; //记录在laya队例中的编号
        };
        // public static timespeed: number = 0  //(  >=0.99)) //负为慢，正为快  //不能小于-1
        LayaInsideSprite.prototype.makeSteemTm = function () {
            if (this.oldTm) {
                var n = Date.now() - this.oldTm;
                this.timespeed1 = Math.max(this.timespeed1, -0.99);
                this.scene.startTime -= this.timespeed1 * n;
                // Pan3d.TimeUtil.START_TIME -= this.timespeed1 * n;
                // LayaInsideSprite.timespeed = Math.max(LayaInsideSprite.timespeed, -0.99);
                // Pan3d.TimeUtil.START_TIME -= LayaInsideSprite.timespeed * n;
            }
            this.oldTm = Date.now();
        };
        LayaInsideSprite.prototype.testRenderPan3d = function (index) {
            if (index == this._layaRenderIndex) {
                this._layaRenderIndex = -1;
                var gl = Scene_data.context3D.renderContext;
                var _sFactor = gl.getParameter(WebGLContext.BLEND_SRC_RGB);
                var _dFactor = gl.getParameter(WebGLContext.BLEND_DST_RGB);
                gl.blendFunc(_sFactor, _dFactor); //还原laya混合模式
                this.makeSteemTm();
                this.upFrame();
                Scene_data.context3D.setWriteDepth(false);
                Scene_data.context3D.setDepthTest(false);
                Laya.BaseShader.activeShader = null;
                Laya.BaseShader.bindShader = null;
            }
        };
        LayaInsideSprite.prototype.upFrame = function () {
        };
        LayaInsideSprite._list = [];
        return LayaInsideSprite;
    }(OtherLayaRectSprite));
    layapan.LayaInsideSprite = LayaInsideSprite;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaInsideSprite.js.map