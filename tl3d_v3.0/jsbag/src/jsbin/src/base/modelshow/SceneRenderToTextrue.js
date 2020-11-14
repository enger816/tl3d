var left;
(function (left) {
    var Scene_data = Pan3d.Scene_data;
    var FBO = Pan3d.FBO;
    var MathClass = Pan3d.MathClass;
    var Engine = Pan3d.Engine;
    var SceneRenderToTextrue = /** @class */ (function () {
        function SceneRenderToTextrue() {
            this.fw = 1024;
            this.fh = 1024;
            this.viweLHnumber = 1000;
        }
        SceneRenderToTextrue.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneRenderToTextrue();
            }
            return this._instance;
        };
        SceneRenderToTextrue.prototype.getFBO = function () {
            this.fw = 2048;
            this.fh = 2048;
            this.renderContext = Scene_data.context3D.renderContext;
            var gl = Scene_data.context3D.renderContext;
            var fbo = new FBO();
            fbo.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, fbo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.fw, this.fh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            fbo.frameBuffer = gl.createFramebuffer();
            fbo.depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.fw, this.fh);
            return fbo;
        };
        SceneRenderToTextrue.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
        };
        SceneRenderToTextrue.prototype.resetViewMatrx3D = function () {
            Scene_data.viewMatrx3D.identity();
            Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, this.viweLHnumber);
        };
        SceneRenderToTextrue.prototype.renderToTexture = function ($item) {
            if (!this.fbo) {
                this.fbo = this.getFBO(); //512*512
            }
            this.updateDepthTexture(this.fbo);
            this.renderContext.viewport(0, 0, this.fw, this.fh);
            this.renderContext.clearColor(20 / 255, 20 / 255, 20 / 255, 1.0);
            this.renderContext.clearDepth(1.0);
            this.renderContext.clearStencil(0.0);
            this.renderContext.depthMask(true);
            this.renderContext.frontFace(this.renderContext.CW);
            this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);
            this.resetViewMatrx3D();
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            for (var i = 0; i < $item.length; i++) {
                $item[i].update();
            }
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            Engine.resetSize();
        };
        return SceneRenderToTextrue;
    }());
    left.SceneRenderToTextrue = SceneRenderToTextrue;
})(left || (left = {}));
//# sourceMappingURL=SceneRenderToTextrue.js.map