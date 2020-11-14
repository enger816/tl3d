/*
自定义着色器
*/
module layapan {
    import Scene_data = tl3d.Scene_data;
    import Pan3dByteArray = tl3d.TL3dByteArray;
    import WebGLContext = laya.webgl.WebGLContext;
    /*
    自定义着色器
    */
    export class OtherShader extends Laya.Shader {
        public static shader: OtherShader;
        constructor() {
            var vs: string = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1.0);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}"
            var ps: string = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = vec4(1.0,0.0,1.0,1.0);}";
            super(vs, ps, "myShader");
        }
    }
    export class OtherShaderValue extends Laya.Value2D {
        public texcoord: any;
        constructor() {
            super(0, 0);
            var _vlen: number = 8 * Laya.CONST3D2D.BYTES_PE;
            this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
            this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
            this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
        }
    }

    export class OtherLayaRectSprite extends Laya.Sprite {
        protected vBuffer: Laya.VertexBuffer2D;
        protected iBuffer: Laya.IndexBuffer2D;
        protected vbData: Float32Array;
        protected ibData: Uint16Array;
        protected iNum: number = 0;
        protected shaderValue: OtherShaderValue;
        constructor() {
            super();
            if(!OtherShader.shader){
                OtherShader.shader = new OtherShader();
            }
            this.init(null);
        }
        public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
            this.vBuffer = Laya.VertexBuffer2D.create();
            this.iBuffer = Laya.IndexBuffer2D.create();
            this.ibData = new Uint16Array([]);
            var vbArray: Array<any>;
            var ibArray: Array<any>;
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
                ibArray.push(0, 1, 3);//从第一个三角形的顶点索引
            }
            this.iNum = ibArray.length;
            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);
            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);
            this.shaderValue = new OtherShaderValue();
            this.shaderValue.textureHost = null;
            this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
        }
        public customRender(context: Laya.RenderContext, x: number, y: number): void {
            (context.ctx as Laya.WebGLContext2D).setIBVB(x, y, (this.iBuffer) as Laya.IndexBuffer2D, (this.vBuffer) as Laya.VertexBuffer2D, this.iNum, null, OtherShader.shader, this.shaderValue, 0, 0);
        }
    }
    export class LayaInsideSprite extends OtherLayaRectSprite {
        private static _list: Array<LayaInsideSprite> = [];
        private static inited: boolean
        private static add(v: LayaInsideSprite): void {
            LayaInsideSprite._list.push(v);

            if (this.inited) {
                return
            }
            this.inited = true;

            let context = Laya.Render.context.ctx as Laya.WebGLContext2D;
            context.submitElement = (start: number, end: number): void => {//重写laya的渲染队例
                if (end > 0) {

                    while (start < end) {
                        let temp = context._submits[start];
                        start += temp.renderSubmit();
                        // if (temp instanceof Laya.SubmitOtherIBVB) {
                        //     start += temp.renderSubmit();
                        // } else {
                        //     start += temp.renderSubmit();
                        // }
                        for (var i: number = 0; i < LayaInsideSprite._list.length; i++) {
                            if (start == LayaInsideSprite._list[i]._layaRenderIndex) {
                                LayaInsideSprite._list[i].testRenderPan3d(start);

                            }
                        }
                    }

                }
            }
        }

        protected _layaRenderIndex: number = -1;
        public scene: tl3d.SceneManager;
        constructor() {
            super();
            this.initData();
            LayaInsideSprite.add(this);

        }
        protected initData(): void {
            this.customRenderEnable = true;
            this.scene = new tl3d.SceneManager();
            this.scene.ready = true;
        }


        public customRender(context: Laya.RenderContext, x: number, y: number): void {
            super.customRender(context, x, y)
            this._layaRenderIndex = context.ctx._submits._length; //记录在laya队例中的编号
        }
        private oldTm: number;
        public timespeed1: number = 0
        // public static timespeed: number = 0  //(  >=0.99)) //负为慢，正为快  //不能小于-1
        private makeSteemTm(): void {
            if (this.oldTm) {
                var n: number = Date.now() - this.oldTm;
                this.timespeed1 = Math.max(this.timespeed1, -0.99);
                this.scene.startTime -= this.timespeed1 * n;
                // Pan3d.TimeUtil.START_TIME -= this.timespeed1 * n;
                // LayaInsideSprite.timespeed = Math.max(LayaInsideSprite.timespeed, -0.99);
                // Pan3d.TimeUtil.START_TIME -= LayaInsideSprite.timespeed * n;
            }
            this.oldTm = Date.now()
        }
        public testRenderPan3d(index: number): void {

            if (index == this._layaRenderIndex) {
                this._layaRenderIndex = -1;
                var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
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

        }

        protected upFrame(): void {


        }


    }





}