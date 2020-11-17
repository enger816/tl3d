import { Scene_data } from "../../tl3d/engine/context/Scene_data";
import WebGLContext = Laya.WebGLContext;
import { LayaOverride2dSceneManager } from "./overridebase/LayaOverride2dSceneManager";

/*
自定义着色器
*/


export interface ISubmit {
    renderSubmit(): number;
    getRenderType(): number;
    releaseRender(): void;
}

/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
export class LayaInsideSprite extends Laya.Sprite implements ISubmit {

    /** @internal */
    _key: Laya.SubmitKey = new Laya.SubmitKey();

    protected _layaRenderIndex: number = -1;
    public tscene: LayaOverride2dSceneManager;


    constructor() {
        super();

        this.tscene = new LayaOverride2dSceneManager();
        this.tscene.ready = true
    }

    /**
 * @inheritDoc
 * @override
 * @internal
 */
    render(ctx: Laya.Context, x: number, y: number): void {
        //TODO:外层应该设计为接口调用
        ctx["_curSubmit"] = Laya.SubmitBase.RENDERBASE;//打断2D合并的renderKey
        ctx.addRenderObject(this);
    }

    renderSubmit(): number {

        this._layaRenderIndex = -1;
        LayaInsideSprite.saveLayaWebGLContext();
        this.upFrame();
        Scene_data.context3D.setWriteDepth(false);
        Scene_data.context3D.setDepthTest(false);
        LayaInsideSprite.revertLayaWebGLContext();


        return 1;
    }
    getRenderType(): number {
        return 0;
    }
    releaseRender(): void {

    }

    protected upFrame(): void {


    }


    // static lastBuffer: any;

    // 保存WebGLContext laya的渲染状态
    static saveLayaWebGLContext(): void {
        let gl = Scene_data.context3D.renderContext;
/*         LayaInsideSprite.lastBuffer = Laya.Buffer._bindedVertexBuffer;
        WebGLContext["_depthTest"] = Boolean(gl.isEnabled(gl.DEPTH_TEST));
        WebGLContext["_depthMask"] = gl.getParameter(gl.DEPTH_WRITEMASK);
        WebGLContext["_depthFunc"] = gl.getParameter(gl.DEPTH_FUNC)
        WebGLContext["_blend"] = Boolean(gl.isEnabled(gl.BLEND));
        WebGLContext["_sFactor"] = gl.getParameter(gl.BLEND_SRC_RGB);
        WebGLContext["_dFactor"] = gl.getParameter(gl.BLEND_DST_RGB);
        WebGLContext["_cullFace"] = Boolean(gl.isEnabled(gl.CULL_FACE));
        WebGLContext['_cullFaceMode'] = gl.getParameter(gl.CULL_FACE_MODE);

        WebGLContext['_arrayBuffer'] = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
        WebGLContext['_arrayBuffer'] && gl.bindBuffer(gl.ARRAY_BUFFER, null);
        WebGLContext['_elementArrayBuffer'] = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
        WebGLContext['_elementArrayBuffer'] && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        WebGLContext['_frameBuffer'] = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        WebGLContext['_frameBuffer'] && gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        WebGLContext['_renderBuffer'] = gl.getParameter(gl.RENDERBUFFER_BINDING);
        WebGLContext['_renderBuffer'] && gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        WebGLContext['_bindTextureCubeMap'] = gl.getParameter(gl.TEXTURE_BINDING_CUBE_MAP); */
        WebGLContext['_activeTexture'] = gl.getParameter(gl.ACTIVE_TEXTURE);

    }

    // 还原WebGLContext到laya之前的渲染状态
    static revertLayaWebGLContext(): void {
        let gl = Scene_data.context3D.renderContext;
/*         WebGLContext["_depthTest"] ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
        gl.depthMask(WebGLContext["_depthMask"]);
        gl.depthFunc(WebGLContext["_depthFunc"]);
        WebGLContext["_blend"] ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
        gl.blendFunc(WebGLContext["_sFactor"], WebGLContext["_dFactor"]);
        WebGLContext["_cullFace"] ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);
        gl.cullFace(WebGLContext['_cullFaceMode']);
        gl.frontFace(WebGLContext["_frontFace"]);

        gl.bindBuffer(gl.ARRAY_BUFFER, gl['_arrayBuffer']);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl['_elementArrayBuffer']);
        gl.bindFramebuffer(gl.FRAMEBUFFER, gl['_frameBuffer']);
        gl.bindRenderbuffer(gl.RENDERBUFFER, gl['_renderBuffer']); */

        WebGLContext["_useProgram"] = null;

        gl.activeTexture(WebGLContext["_activedTextureID"]);

        Laya.Buffer._bindedVertexBuffer = null;
        Laya.Buffer._bindedIndexBuffer = null;

        Laya.BufferStateBase["_curBindedBufferState"] = null;

        Laya.Context.set2DRenderConfig();//还原2D配置
    }

}