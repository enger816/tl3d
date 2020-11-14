/*
自定义着色器
*/
module layapan {
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import WebGLContext = laya.webgl.WebGLContext;
    
	export class Pan3dInSideLaya {
		static inited: boolean = false;
		static overrideMethods(): void {
 		 
			if (this.inited) {
				return;
			}
			this.inited = true;
			let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
				let gl = Pan3d.Scene_data.context3D.renderContext;
   
                let arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
                let elementArrayBuffer  = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
                let v = pan3dFunc.apply(this, args);

                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
              
				return v;
			}
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
		}
    }

    /*
    自定义着色器
    */
    export class OtherShader extends Laya.Shader {
        public static shader: OtherShader = new OtherShader();
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
            this.init(null)
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
                var texWidth: number = 10+random(20)
                var texHeight: number = 10+random(20)
                var red: number = 1;
                var greed: number = 1;
                var blue: number = 1;
                var alpha: number = 1;
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
    export class LayaInsideSprite extends layapan.OtherLayaRectSprite{
        private static _list: Array<LayaInsideSprite> = [];
        private static inited:boolean
        private static add(v: LayaInsideSprite): void {
            LayaInsideSprite._list.push(v);
            
            if(this.inited){
                return 
            }
            this.inited=true;

            let context = Laya.Render.context.ctx as Laya.WebGLContext2D;
            context.submitElement = (start: number, end: number): void => {//重写laya的渲染队例
                if (end > 0) {
          
                    while (start <end) {
                        let temp =context._submits[start];
                        if( temp  instanceof Laya.SubmitOtherIBVB ){
                            start += temp.renderSubmit();
                     
                        }else{
                            start += temp.renderSubmit();
                        }
                        for (var i:number=0;i< LayaInsideSprite._list.length;i++) {
                            if(start==LayaInsideSprite._list[i]._layaRenderIndex){
                                LayaInsideSprite._list[i].testRenderPan3d(start);

                            }
                        }
                    }
     
                }
            }
        }

        protected _layaRenderIndex: number = -1;
        public scene: LayaOverride2dSceneManager;
        constructor() {
            super();
            this.initData();
            LayaInsideSprite.add(this);
       
        }
        protected initData(): void {
            if (!layapan.LayaScene2dInit.isConfig) {
                layapan.LayaScene2dInit.initData();
            }

            Pan3dInSideLaya.overrideMethods();
            this.customRenderEnable = true;
            this.scene = new LayaOverride2dSceneManager();
            this.scene.ready = true;

        }
       
   
        public customRender(context: Laya.RenderContext, x: number, y: number): void{
            super.customRender(context, x, y)
            this._layaRenderIndex = context.ctx._submits._length; //记录在laya队例中的编号
        }
        public testRenderPan3d(index: number): void {
       
            /*if (index == this._layaRenderIndex) {
                this._layaRenderIndex = -1;
                 this.upFrame();
                Pan3d.Scene_data.context3D.setWriteDepth(false);
                Pan3d.Scene_data.context3D.setDepthTest(false);
            }*/

            if (index == this._layaRenderIndex) {
                this._layaRenderIndex = -1;
                var gl:WebGLRenderingContext = Pan3d.Scene_data.context3D.renderContext;
                var _sFactor = gl.getParameter(WebGLContext.BLEND_SRC_RGB);
                var _dFactor = gl.getParameter(WebGLContext.BLEND_DST_RGB);

                 this.upFrame();
                 gl.blendFunc(_sFactor,_dFactor);
                Pan3d.Scene_data.context3D.setWriteDepth(false);
                Pan3d.Scene_data.context3D.setDepthTest(false);
            }
    
        }

        protected upFrame(): void {

         
        }
	
    
    }





}