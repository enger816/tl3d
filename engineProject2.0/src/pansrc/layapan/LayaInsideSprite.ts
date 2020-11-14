import WebGLContext = laya.webgl.WebGLContext;
import { LayaOverride2dSceneManager } from "./overridebase/LayaOverride2dSceneManager";
import { Scene_data } from "../../tl3d/engine/context/Scene_data";
import { ParticleBoneData } from "../../tl3d/engine/particle/bone/ParticleBoneData";
import { Pan3dByteArray } from "../../tl3d/engine/math/Pan3dByteArray";
import { ParticleFacetData } from "../../tl3d/engine/particle/facet/ParticleFacetData";
import { ParticleFollowData } from "../../tl3d/engine/particle/follow/ParticleFollowData";
import { ParticleFollowLocusData } from "../../tl3d/engine/particle/followlocus/ParticleFollowLocusData";
import { ParticleLocusData } from "../../tl3d/engine/particle/locus/ParticleLocusData";
import { ParticleLocusballData } from "../../tl3d/engine/particle/locusball/ParticleLocusballData";
import { ParticleModelData } from "../../tl3d/engine/particle/model/ParticleModelData";
import { ParticleBallData } from "../../tl3d/engine/particle/ball/ParticleBallData";
import { MeshDataManager } from "../../tl3d/engine/utils/MeshDataManager";
import { SkinMesh } from "../../tl3d/engine/vo/skinanim/SkinMesh";
import { ObjDataManager } from "../../tl3d/engine/utils/ObjDataManager";
import { ObjData } from "../../tl3d/engine/base/ObjData";
import { SkillRes } from "../../tl3d/engine/utils/res/SkillRes";
import { RoleRes } from "../../tl3d/engine/utils/res/RoleRes";
import { RoleResLow } from "../../tl3d/engine/utils/res/RoleResLow";
import { ModelRes } from "../../tl3d/engine/utils/res/ModelRes";
import { GroupRes } from "../../tl3d/engine/utils/res/GroupRes";
import { Display3dShadow } from "../../tl3d/engine/display3D/Display3dShadow";

/*
自定义着色器
*/

export class Pan3dInSideLaya {
    static inited: boolean = false;
    static overrideMethods(): void {
        if (this.inited) {
            return;
        }
        this.inited = true;
        let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
            let gl = Scene_data.context3D.renderContext;
            let arrayBuffer = gl.getParameter(Laya.WebGLContext.ARRAY_BUFFER_BINDING);
            let elementArrayBuffer = gl.getParameter(Laya.WebGLContext.ELEMENT_ARRAY_BUFFER_BINDING);
            let v = pan3dFunc.apply(this, args);
            gl.bindBuffer(Laya.WebGLContext.ARRAY_BUFFER, arrayBuffer);
            gl.bindBuffer(Laya.WebGLContext.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
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


        let Display3dShadow_applyObjData = Display3dShadow.prototype.applyObjData;
        Display3dShadow.prototype.applyObjData = function (): void {
            compatibleLayaRender.call(this, Display3dShadow_applyObjData);
        }
    }
}

/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
export class LayaInsideSprite extends Laya.Sprite {
    private static _list: Array<LayaInsideSprite> = [];
    private static add(v: LayaInsideSprite): void {
        LayaInsideSprite._list.push(v);

        // 重写下laya的渲染提交函数插入pan渲染
        let context = Laya.Render.context as Laya.WebGLContext2D;
        context.submitElement = (start: number, end: number): number => {
            var renderList = context._submits;
            var ret:number = renderList._length;
            end < 0 && (end = renderList._length);
            if (start == end) {
                LayaInsideSprite.forEach((value: LayaInsideSprite, index: number) => {
                    value.testRenderPan3d(-1);
                });
            }
            else {
                while (start < end) {
                    let submit:any = renderList[start];
                    start += submit.renderSubmit();
                    LayaInsideSprite.forEach((value: LayaInsideSprite, index: number) => {
                        value.testRenderPan3d(start);
                    }); 
                }
            }

            return ret;
        }
    }

    private static forEach(f: Function) {
        for (let item of this._list) {
            f.call(null, item, 0);
        }
    }

    public testRenderPan3d(index: number): void {

        if (this._layaRenderIndex < 0
            || (index != 0 && index != this._layaRenderIndex)
        ) {
            return;
        }
        
        this._layaRenderIndex = -1;
        LayaInsideSprite.saveLayaWebGLContext();
        this.upFrame();
        Scene_data.context3D.setWriteDepth(false);
        Scene_data.context3D.setDepthTest(false);
        LayaInsideSprite.revertLayaWebGLContext();

        Laya.Submit.preRender = null;
    }

    protected _layaRenderIndex: number = -1;
    public tscene: LayaOverride2dSceneManager;

    constructor() {
        super();
        LayaInsideSprite.add(this);
        this.initData()
    }
    protected initData(): void {
        Pan3dInSideLaya.overrideMethods();
        this.init(null);

        this.tscene = new LayaOverride2dSceneManager();
        this.tscene.ready = true
    }
 
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
        // 保证customRender必定执行
        this.frameLoop(1, this, () => {
            this.graphics.clear();
            this.graphics.drawLine(0, 0, 1, 0, '#000');
        });
        this.customRenderEnable = true;
        this.customRender = (context: laya.webgl.canvas.WebGLContext2D, x: number, y: number) => {
            let webGLContext = context;
            this._layaRenderIndex = webGLContext._submits._length;
        }
    }

    protected upFrame(): void {


    }


    // 保存WebGLContext laya的渲染状态
    static saveLayaWebGLContext(): void {
        let gl:laya.webgl.WebGLContext = laya.webgl.WebGL.mainContext;

        WebGLContext._depthTest = Boolean(gl.isEnabled(WebGLContext.DEPTH_TEST));
        WebGLContext._depthMask = gl.getParameter(WebGLContext.DEPTH_WRITEMASK);
        WebGLContext._depthFunc = gl.getParameter(WebGLContext.DEPTH_FUNC)
        WebGLContext._blend = Boolean(gl.isEnabled(WebGLContext.BLEND));
        WebGLContext._sFactor = gl.getParameter(WebGLContext.BLEND_SRC_RGB);
        WebGLContext._dFactor = gl.getParameter(WebGLContext.BLEND_DST_RGB);
        WebGLContext._cullFace = Boolean(gl.isEnabled(WebGLContext.CULL_FACE));
        WebGLContext['_cullFaceMode'] = gl.getParameter(WebGLContext.CULL_FACE_MODE);

        WebGLContext['_arrayBuffer'] = gl.getParameter(WebGLContext.ARRAY_BUFFER_BINDING);
        WebGLContext['_arrayBuffer'] && gl.bindBuffer(WebGLContext.ARRAY_BUFFER, null);
        WebGLContext['_elementArrayBuffer'] = gl.getParameter(WebGLContext.ELEMENT_ARRAY_BUFFER_BINDING);
        WebGLContext['_elementArrayBuffer'] && gl.bindBuffer(WebGLContext.ELEMENT_ARRAY_BUFFER, null);

        WebGLContext['_frameBuffer'] = gl.getParameter(WebGLContext.FRAMEBUFFER_BINDING);
        WebGLContext['_frameBuffer'] && gl.bindFramebuffer(WebGLContext.FRAMEBUFFER, null);
        WebGLContext['_renderBuffer'] = gl.getParameter(WebGLContext.RENDERBUFFER_BINDING);
        WebGLContext['_renderBuffer'] && gl.bindRenderbuffer(WebGLContext.RENDERBUFFER, null);

        WebGLContext['_bindTextureCubeMap'] = gl.getParameter(WebGLContext.TEXTURE_BINDING_CUBE_MAP);
        WebGLContext['_activeTexture'] = gl.getParameter(WebGLContext.ACTIVE_TEXTURE);

    }

    // 还原WebGLContext到laya之前的渲染状态
    static revertLayaWebGLContext(): void {
        let gl:laya.webgl.WebGLContext = laya.webgl.WebGL.mainContext;
        WebGLContext._depthTest ? gl.enable(WebGLContext.DEPTH_TEST) : gl.disable(WebGLContext.DEPTH_TEST);
        gl.depthMask(WebGLContext._depthMask);
        gl.depthFunc(WebGLContext._depthFunc);
        WebGLContext._blend ? gl.enable(WebGLContext.BLEND) : gl.disable(WebGLContext.BLEND);
        gl.blendFunc(WebGLContext._sFactor, WebGLContext._dFactor);
        WebGLContext._cullFace ? gl.enable(WebGLContext.CULL_FACE) : gl.disable(WebGLContext.CULL_FACE);
        gl.cullFace(WebGLContext['_cullFaceMode']);
        gl.frontFace(WebGLContext._frontFace);

        gl.bindBuffer(WebGLContext.ARRAY_BUFFER, WebGLContext['_arrayBuffer']);
        gl.bindBuffer(WebGLContext.ELEMENT_ARRAY_BUFFER, WebGLContext['_elementArrayBuffer']);
        gl.bindFramebuffer(WebGLContext.FRAMEBUFFER, WebGLContext['_frameBuffer']);
        gl.bindRenderbuffer(WebGLContext.RENDERBUFFER, WebGLContext['_renderBuffer']);

        gl.useProgram(WebGLContext._useProgram);

        gl.activeTexture(WebGLContext._activedTextureID);
    }

}