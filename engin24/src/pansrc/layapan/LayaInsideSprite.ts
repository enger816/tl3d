import Sprite = laya.display.Sprite
import Value2D = laya.webgl.shader.d2.value.Value2D
import CONST3D2D = laya.webgl.utils.CONST3D2D
import VertexBuffer2D = laya.webgl.utils.VertexBuffer2D
import IndexBuffer2D = laya.webgl.utils.IndexBuffer2D
import {Scene_data} from "../../../pan3d/engine/context/Scene_data"
import {ParticleBoneData} from "../../../pan3d/engine/particle/bone/ParticleBoneData"
import {ParticleFacetData} from "../../../pan3d/engine/particle/facet/ParticleFacetData"
import {ParticleFollowData} from "../../../pan3d/engine/particle/follow/ParticleFollowData"
import {ParticleFollowLocusData} from "../../../pan3d/engine/particle/followlocus/ParticleFollowLocusData"
import {ParticleLocusData} from "../../../pan3d/engine/particle/locus/ParticleLocusData"
import {ParticleLocusballData} from "../../../pan3d/engine/particle/locusball/ParticleLocusballData"
import {ParticleModelData} from "../../../pan3d/engine/particle/model/ParticleModelData"
import {ParticleBallData} from "../../../pan3d/engine/particle/ball/ParticleBallData"
import {MeshDataManager} from "../../../pan3d/engine/utils/MeshDataManager"
import {SkinMesh} from "../../../pan3d/engine/vo/skinanim/SkinMesh"
import {ObjDataManager} from "../../../pan3d/engine/utils/ObjDataManager"
import {ObjData} from "../../../pan3d/engine/base/ObjData"
import {ArtFont} from "../../../pan3d/engine/utils/ArtFont"
import {SkillRes} from "../../../pan3d/engine/utils/res/SkillRes"
import {RoleRes} from "../../../pan3d/engine/utils/res/RoleRes"
import {RoleResLow} from "../../../pan3d/engine/utils/res/RoleResLow"
import {ModelRes} from "../../../pan3d/engine/utils/res/ModelRes"
import {GroupRes} from "../../../pan3d/engine/utils/res/GroupRes"
import {UIRenderComponent} from "../../../pan3d/engine/ui/base/UIRenderComponent"
import {Display3dShadow} from "../../../pan3d/engine/display3D/Display3dShadow"
import Shader = laya.webgl.shader.Shader
import Texture = laya.resource.Texture
import RenderSprite = laya.renders.RenderSprite
import Render = laya.renders.Render
import {LayaOverride2dSceneManager} from "./overridebase/LayaOverride2dSceneManager"
import {LayaScene2dInit} from "./overridebase/LayaScene2dInit"
import {TimeUtil} from "../../../pan3d/engine/utils/TimeUtil"
/*
自定义着色器
*/

    import Pan3dByteArray = Pan3dByteArray;
    import WebGLContext = laya.webgl.WebGLContext;
    
	export class Pan3dInSideLaya {
		static inited: boolean = false;
		static overrideMethods(): void {
 
			if (this.inited) {
				return;
			}
			this.inited = true;
			let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
				let gl = Scene_data.context3D.renderContext;
   
                let arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
                let elementArrayBuffer  = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
                let v = pan3dFunc.apply(this, args);

                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
              
				return v;
			}
			let ParticleBoneData_setAllByteInfo = ParticleBoneData.prototype.setAllByteInfo;
			ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
			}
			let ParticleFacetData_setAllByteInfo = ParticleFacetData.prototype.setAllByteInfo;
			ParticleFacetData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleFacetData_setAllByteInfo, byte);
			}
			let ParticleFollowData_setAllByteInfo = ParticleFollowData.prototype.setAllByteInfo;
			ParticleFollowData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleFollowData_setAllByteInfo, byte);
			}
			let ParticleFollowLocusData_setAllByteInfo = ParticleFollowLocusData.prototype.setAllByteInfo;
			ParticleFollowLocusData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleFollowLocusData_setAllByteInfo, byte);
			}
			let ParticleLocusData_setAllByteInfo = ParticleLocusData.prototype.setAllByteInfo;
			ParticleLocusData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleLocusData_setAllByteInfo, byte);
			}
			let ParticleLocusballData_setAllByteInfo = ParticleLocusballData.prototype.setAllByteInfo;
			ParticleLocusballData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleLocusballData_setAllByteInfo, byte);
			}
			let ParticleModelData_setAllByteInfo = ParticleModelData.prototype.setAllByteInfo;
			ParticleModelData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleModelData_setAllByteInfo, byte);
			}
			let ParticleBallData_setAllByteInfo = ParticleBallData.prototype.regShader;
			ParticleBallData.prototype.regShader = function (): void {
				return compatibleLayaRender.call(this, ParticleBallData_setAllByteInfo);
            }
			// 重写下以下方法 要不会影响到渲染队列之前的laya绘制
			let MeshDataManager_readData = MeshDataManager.prototype.readData;
			MeshDataManager.prototype.readData = function (byte, batchNum, url, version): SkinMesh {
				return compatibleLayaRender.call(this, MeshDataManager_readData, byte, batchNum, url, version);
			}
			let ObjDataManager_loadObjCom = ObjDataManager.prototype.loadObjCom;
			ObjDataManager.prototype.loadObjCom = function (byte: ArrayBuffer, url: string): ObjData {
				return compatibleLayaRender.call(this, ObjDataManager_loadObjCom, byte, url);
			}

			let ArtFont_getAirFontWidth = ArtFont.prototype.getAirFontWidth;
			ArtFont.prototype.getAirFontWidth = function ($ctx: CanvasRenderingContext2D, $str: string, $color: string = ArtFont.White, $txtInterval: number = 0): number {
				return compatibleLayaRender.call(this, ArtFont_getAirFontWidth, $ctx, $str, $color, $txtInterval) + $txtInterval;
			}

			let ArtFont_writeFontToCtxLeft =  ArtFont.prototype.writeFontToCtxLeft;
			ArtFont.prototype.writeFontToCtxLeft = function ($ctx: CanvasRenderingContext2D, $str: string, $color: string = ArtFont.num1, $tx: number = 0, $ty: number = 0, $txtInterval: number = 0): number {
				return compatibleLayaRender.call(this, ArtFont_writeFontToCtxLeft, $ctx, $str, $color, $tx, $ty, $txtInterval) + $txtInterval;
			}

			let SkillRes_loadComplete = SkillRes.prototype.loadComplete;
			SkillRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, SkillRes_loadComplete, byte);
			}
			let RoleRes_loadComplete = RoleRes.prototype.loadComplete;
			RoleRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, RoleRes_loadComplete, byte);
			}
			let RoleResLow_loadComplete = RoleResLow.prototype.loadComplete;
			RoleResLow.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, RoleResLow_loadComplete, byte);
			}
			let ModelRes_loadComplete = ModelRes.prototype.loadComplete;
			ModelRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, ModelRes_loadComplete, byte);
			}
			let GroupRes_loadComplete = GroupRes.prototype.loadComplete;
			GroupRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, GroupRes_loadComplete, byte);
			}

			let UIRenderComponent_applyObjData = UIRenderComponent.prototype.applyObjData;
			UIRenderComponent.prototype.applyObjData = function (): void {
				compatibleLayaRender.call(this, UIRenderComponent_applyObjData);
			}
			let Display3dShadow_applyObjData = Display3dShadow.prototype.applyObjData;
			Display3dShadow.prototype.applyObjData = function (): void {
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
        private oldTm: number;
        public static  timespeed: number = 0  //(  >=0.99)) //负为慢，正为快  //不能小于-1
        private makeSteemTm(): void {
            if (this.oldTm) {
                var n: number =Date.now()- this.oldTm;
                LayaInsideSprite.timespeed =Math.max( LayaInsideSprite.timespeed,-0.99);
                TimeUtil.START_TIME -= LayaInsideSprite.timespeed * n
            }
            this.oldTm =Date.now()
        }
        public testRenderPan3d(index: number): void {
       
            if (index == this._layaRenderIndex) {
                this._layaRenderIndex = -1;
                this.makeSteemTm();
                 this.upFrame();
                Scene_data.context3D.setWriteDepth(false);
                Scene_data.context3D.setDepthTest(false);
            }
    
        }

        protected upFrame(): void {

         
        }
	
    
    }





