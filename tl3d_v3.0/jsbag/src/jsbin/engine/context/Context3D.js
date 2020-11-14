var Context3D = /** @class */ (function () {
    function Context3D() {
        this.setTextureNum = 0;
        this.setProgramNum = 0;
    }
    Context3D.prototype.init = function ($caves) {
        //this.renderContext = $caves.getContext("experimental-webgl");
        var gl = $caves.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
            || $caves.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false });
        this.renderContext = gl;
        this._contextSetTest = new ContextSetTest();
    };
    Context3D.prototype.resetSize = function ($width, $height) {
        this.renderContext.viewport(0, 0, $width, $height);
    };
    Context3D.prototype.uploadBuff3D = function ($jsData) {
        var $buffData = this.renderContext.createBuffer();
        this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, $buffData);
        this.renderContext.bufferData(this.renderContext.ARRAY_BUFFER, new Float32Array($jsData), this.renderContext.STATIC_DRAW);
        return $buffData;
    };
    Context3D.prototype.uploadBuff3DArrayBuffer = function ($jsData) {
        var $buffData = this.renderContext.createBuffer();
        this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, $buffData);
        this.renderContext.bufferData(this.renderContext.ARRAY_BUFFER, $jsData, this.renderContext.STATIC_DRAW);
        return $buffData;
    };
    Context3D.prototype.uploadBuff3DByBuffer = function ($buffData, $jsData) {
        this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, $buffData);
        this.renderContext.bufferData(this.renderContext.ARRAY_BUFFER, new Float32Array($jsData), this.renderContext.STATIC_DRAW);
    };
    Context3D.prototype.uploadIndexBuff3D = function ($iStrData) {
        var $iBuffer = this.renderContext.createBuffer();
        this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
        this.renderContext.bufferData(this.renderContext.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), this.renderContext.STATIC_DRAW);
        return $iBuffer;
    };
    Context3D.prototype.uploadIndexBuff3DByBuffer = function ($iBuffer, $iStrData) {
        this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
        this.renderContext.bufferData(this.renderContext.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), this.renderContext.STATIC_DRAW);
    };
    //public num_setProgram:number = 0;
    Context3D.prototype.clearContext = function () {
        this.renderContext.depthMask(true);
        this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);
    };
    Context3D.prototype.update = function () {
        this._contextSetTest.clear();
        this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, null);
        this.renderContext.clearColor(63 / 255, 63 / 255, 63 / 255, 1.0);
        this.renderContext.clearDepth(1.0);
        this.renderContext.clearStencil(0.0);
        this.renderContext.enable(this.renderContext.DEPTH_TEST);
        this.renderContext.depthMask(true);
        this.renderContext.enable(this.renderContext.BLEND);
        this.renderContext.frontFace(this.renderContext.CW);
        this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);
        //this.renderContext.blendFunc(this.renderContext.SRC_ALPHA, this.renderContext.ONE_MINUS_SRC_ALPHA);
        this.setBlendParticleFactors(0);
        this.renderContext.disable(this.renderContext.CULL_FACE);
        ////console.log("program设置次数：" + this.setProgramNum + "纹理设置次数：" + this.setTextureNum);
        this.setTextureNum = 0;
        this.setProgramNum = 0;
    };
    Context3D.prototype.updateFBO = function (fbo) {
        this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, fbo.frameBuffer);
        this.renderContext.clearColor(63 / 255, 63 / 255, 63 / 255, 1.0);
        this.renderContext.clearDepth(1.0);
        this.renderContext.clearStencil(0.0);
        this.renderContext.enable(this.renderContext.DEPTH_TEST);
        this.renderContext.depthMask(true);
        this.renderContext.enable(this.renderContext.BLEND);
        this.renderContext.frontFace(this.renderContext.CW);
        this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);
        //this.renderContext.blendFunc(this.renderContext.SRC_ALPHA, this.renderContext.ONE_MINUS_SRC_ALPHA);
        this.setBlendParticleFactors(0);
        this.renderContext.disable(this.renderContext.CULL_FACE);
    };
    Context3D.prototype.setDepthTest = function (tf) {
        if (tf) {
            this.renderContext.enable(this.renderContext.DEPTH_TEST);
        }
        else {
            this.renderContext.disable(this.renderContext.DEPTH_TEST);
        }
    };
    Context3D.prototype.setWriteDepth = function (tf) {
        if (this._contextSetTest.testZbuffer(tf)) {
            return;
        }
        this.renderContext.depthMask(tf);
    };
    Context3D.prototype.setBlendParticleFactors = function (type) {
        if (this._contextSetTest.testBlend(type)) {
            return;
        }
        switch (type) {
            case 0:
                this.renderContext.blendFunc(this.renderContext.ONE, this.renderContext.ONE_MINUS_SRC_ALPHA);
                break;
            case 1:
                this.renderContext.blendFunc(this.renderContext.ONE, this.renderContext.ONE);
                break;
            case 2:
                this.renderContext.blendFunc(this.renderContext.DST_COLOR, this.renderContext.ZERO);
                break;
            case 3:
                this.renderContext.blendFunc(this.renderContext.ONE, this.renderContext.ONE_MINUS_SRC_COLOR);
                break;
            case 4:
                this.renderContext.blendFunc(this.renderContext.SRC_ALPHA, this.renderContext.ONE);
                break;
            case -1:
                this.renderContext.blendFunc(this.renderContext.SRC_ALPHA, this.renderContext.ONE_MINUS_SRC_ALPHA);
                break;
        }
    };
    Context3D.prototype.setProgram = function ($program) {
        if (this._contextSetTest.testProgram($program)) {
            return;
        }
        this.renderContext.useProgram($program);
        this.setProgramNum++;
    };
    Context3D.prototype.getLocation = function ($program, $name) {
        return this.renderContext.getUniformLocation($program, $name);
    };
    //public locationDic: any = new Object();
    /** ***************************setvc */
    Context3D.prototype.setVcMatrix3fv = function ($program, $name, $m) {
        this.renderContext.uniformMatrix3fv($program.getWebGLUniformLocation($name), false, $m);
    };
    Context3D.prototype.setVcMatrix4fv = function ($program, $name, $m) {
        this.renderContext.uniformMatrix4fv($program.getWebGLUniformLocation($name), false, $m);
    };
    Context3D.prototype.setVpMatrix = function ($program, $m) {
        if (this._contextSetTest.testVp()) {
            return;
        }
        this.renderContext.uniformMatrix4fv($program.getWebGLUniformLocation("vpMatrix3D"), false, $m);
    };
    Context3D.prototype.setVc4fv = function ($program, $name, $m) {
        this.renderContext.uniform4fv($program.getWebGLUniformLocation($name), $m);
    };
    Context3D.prototype.setVc1fv = function ($program, $name, $m) {
        this.renderContext.uniform1fv($program.getWebGLUniformLocation($name), $m);
    };
    Context3D.prototype.setVc3fv = function ($program, $name, $m) {
        this.renderContext.uniform3fv($program.getWebGLUniformLocation($name), $m);
    };
    Context3D.prototype.setVc2fv = function ($program, $name, $m) {
        this.renderContext.uniform2fv($program.getWebGLUniformLocation($name), $m);
    };
    Context3D.prototype.setVcFloat = function ($program, $name, $m) {
        this.renderContext.uniform1fv($program.getWebGLUniformLocation($name), $m);
    };
    /** ******************************************* end setvc */
    Context3D.prototype.setuniform3f = function ($program, $name, a, b, c) {
        this.renderContext.uniform3f($program.getWebGLUniformLocation($name), a, b, c);
    };
    Context3D.prototype.setVcMatrix4fvLocation = function ($location, $m) {
        this.renderContext.uniformMatrix4fv($location, false, $m);
    };
    Context3D.prototype.setVc2f = function ($program, $name, a, b) {
        this.renderContext.uniform2f($program.getWebGLUniformLocation($name), a, b);
    };
    Context3D.prototype.setVcMatrix2fvLocation = function ($location, $m) {
        this.renderContext.uniformMatrix2fv($location, false, $m);
    };
    //  public static maxLen:number=0
    Context3D.prototype.setVc4fvLocation = function ($location, $m) {
        //if (Context3D.maxLen < $m.length) {
        //    //console.log("在此处有变化renderContext",$m.length);
        //    Context3D.maxLen = $m.length;
        //}
        this.renderContext.uniform4fv($location, $m);
    };
    Context3D.prototype.setVa = function (dataId, dataWidth, dataBuffer) {
        this._contextSetTest.testVa(dataBuffer);
        this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, dataBuffer);
        this.renderContext.enableVertexAttribArray(dataId);
        this.renderContext.vertexAttribPointer(dataId, dataWidth, this.renderContext.FLOAT, false, 0, 0);
    };
    Context3D.prototype.pushVa = function (dataBuffer) {
        if (!this._contextSetTest.testVa(dataBuffer)) {
            this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, dataBuffer);
            return false;
        }
        else {
            return true;
        }
    };
    Context3D.prototype.setVaOffset = function (dataId, dataWidth, stride, offset) {
        if (!this._contextSetTest.enableVaAry[dataId]) {
            this.renderContext.enableVertexAttribArray(dataId);
            this._contextSetTest.enableVaAry[dataId] = true;
        }
        this.renderContext.vertexAttribPointer(dataId, dataWidth, this.renderContext.FLOAT, false, stride, offset);
    };
    Context3D.prototype.clearVa = function (dataId) {
        //this._contextSetTest.testVa(null);
        this._contextSetTest.enableVaAry[dataId] = false;
        this.renderContext.disableVertexAttribArray(dataId);
    };
    Context3D.prototype.drawCall = function ($iBuffer, $numTri) {
        this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
        this.renderContext.drawElements(this.renderContext.TRIANGLES, $numTri, this.renderContext.UNSIGNED_SHORT, 0);
        // var errorID = this.renderContext.getError();
        // if (errorID != 0) {
        //     //console.log(errorID);
        // }
    };
    Context3D.prototype.drawLine = function ($iBuffer, $numTri) {
        this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
        this.renderContext.drawElements(this.renderContext.LINES, $numTri, this.renderContext.UNSIGNED_SHORT, 0);
    };
    Context3D.prototype.setRenderTexture = function ($program, $name, $textureObject, $level, test) {
        if (test === void 0) { test = true; }
        if (test && this._contextSetTest.testTexture($name, $textureObject)) {
            return;
        }
        if ($level == 0) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE0);
        }
        else if ($level == 1) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE1);
        }
        else if ($level == 2) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE2);
        }
        else if ($level == 3) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE3);
        }
        else if ($level == 4) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE4);
        }
        else if ($level == 5) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE5);
        }
        else if ($level == 6) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE6);
        }
        this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, $textureObject);
        this.renderContext.uniform1i($program.getWebGLUniformLocation($name), $level);
        this.setTextureNum++;
    };
    Context3D.prototype.setRenderTextureCube = function ($program, $name, $textureObject, $level) {
        if ($level == 0) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE0);
        }
        else if ($level == 1) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE1);
        }
        else if ($level == 2) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE2);
        }
        else if ($level == 3) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE3);
        }
        else if ($level == 4) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE4);
        }
        else if ($level == 5) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE5);
        }
        else if ($level == 6) {
            this.renderContext.activeTexture(this.renderContext.TEXTURE6);
        }
        this.renderContext.bindTexture(this.renderContext.TEXTURE_CUBE_MAP, $textureObject);
        this.renderContext.uniform1i(this.renderContext.getUniformLocation($program, $name), $level);
    };
    Context3D.prototype.updateTexture = function ($texture, $offsetx, $offsety, $img) {
        this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, $texture);
        this.renderContext.texSubImage2D(this.renderContext.TEXTURE_2D, 0, $offsetx, $offsety, this.renderContext.RGBA, this.renderContext.UNSIGNED_BYTE, $img);
    };
    Context3D.prototype.getTexture = function ($img, $wrap, $filter, $mipmap) {
        if ($wrap === void 0) { $wrap = 0; }
        if ($filter === void 0) { $filter = 0; }
        if ($mipmap === void 0) { $mipmap = 0; }
        // $mipmap=0
        var $textureRect = new Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));
        if ($textureRect.width != $img.width || $textureRect.height != $img.height) {
            //console.log("图片尺寸不为2幂")
            //alert("图片尺寸不为2幂")
            var $ctx = UIManager.getInstance().getContext2D($textureRect.width, $textureRect.height, false);
            $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $textureRect.width, $textureRect.height);
            return this.getTexture($ctx.canvas, 0, 0);
        }
        var textureObject = this.renderContext.createTexture();
        this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, textureObject);
        this.renderContext.texImage2D(this.renderContext.TEXTURE_2D, 0, this.renderContext.RGBA, this.renderContext.RGBA, this.renderContext.UNSIGNED_BYTE, $img);
        var filterNum;
        if ($filter == 0) {
            filterNum = this.renderContext.LINEAR;
        }
        else {
            filterNum = this.renderContext.NEAREST;
        }
        var mipNum;
        if ($filter == 0) {
            if ($mipmap == 0) {
                mipNum = this.renderContext.LINEAR;
            }
            else if ($mipmap == 1) {
                mipNum = this.renderContext.LINEAR_MIPMAP_LINEAR;
            }
            else if ($mipmap == 2) {
                mipNum = this.renderContext.LINEAR_MIPMAP_NEAREST;
            }
        }
        else {
            if ($mipmap == 0) {
                mipNum = this.renderContext.NEAREST;
            }
            else if ($mipmap == 1) {
                mipNum = this.renderContext.NEAREST_MIPMAP_LINEAR;
            }
            else if ($mipmap == 2) {
                mipNum = this.renderContext.NEAREST_MIPMAP_NEAREST;
            }
        }
        this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MAG_FILTER, filterNum);
        this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MIN_FILTER, mipNum);
        if ($wrap == 0) {
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.REPEAT);
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.REPEAT);
        }
        else {
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.CLAMP_TO_EDGE);
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.CLAMP_TO_EDGE);
        }
        if ($mipmap != 0) {
            this.renderContext.generateMipmap(this.renderContext.TEXTURE_2D);
        }
        // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
        return textureObject;
    };
    Context3D.prototype.creatTexture = function ($width, $height, $wrap) {
        if ($wrap === void 0) { $wrap = 0; }
        var $texture = this.renderContext.createTexture();
        this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, $texture);
        this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MAG_FILTER, this.renderContext.LINEAR);
        this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MIN_FILTER, this.renderContext.LINEAR);
        if ($wrap == 0) {
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.REPEAT);
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.REPEAT);
        }
        else {
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.CLAMP_TO_EDGE);
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.CLAMP_TO_EDGE);
        }
        this.renderContext.texImage2D(this.renderContext.TEXTURE_2D, 0, this.renderContext.RGB, $width, $height, 0, this.renderContext.RGB, this.renderContext.UNSIGNED_BYTE, null);
        return $texture;
    };
    Context3D.prototype.createFramebuffer = function () {
        var fboBuffer = this.renderContext.createFramebuffer();
        this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, fboBuffer);
        return fboBuffer;
    };
    Context3D.prototype.deleteBuffer = function (buffer) {
        if (!buffer) {
            //console.log("aaa12");
        }
        //var ooo:any = buffer;
        //ooo.destory = true;
        this.renderContext.deleteBuffer(buffer);
        if (this.renderContext.getError() != 0) {
            //console.log("aaa12");
        }
    };
    Context3D.prototype.deleteTexture = function (texture) {
        //return;
        //var ooo:any = texture;
        //ooo.destory = true;
        this.renderContext.deleteTexture(texture);
    };
    Context3D.prototype.deleteShader = function (shader) {
        //return;
        this.renderContext.deleteShader(shader.vShader);
        this.renderContext.deleteShader(shader.fShader);
        this.renderContext.deleteProgram(shader.program);
    };
    Context3D.prototype.cullFaceBack = function (tf) {
        if (this._contextSetTest.testCull(tf)) {
            return;
        }
        if (tf) {
            this.renderContext.enable(this.renderContext.CULL_FACE);
            this.renderContext.cullFace(this.renderContext.BACK);
        }
        else {
            this.renderContext.disable(this.renderContext.CULL_FACE);
        }
    };
    Context3D.prototype.getFBO = function () {
        var fw = FBO.fw;
        var fh = FBO.fh;
        var frameBuffer = this.renderContext.createFramebuffer();
        this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, frameBuffer);
        var depthRenderBuffer = this.renderContext.createRenderbuffer();
        this.renderContext.bindRenderbuffer(this.renderContext.RENDERBUFFER, depthRenderBuffer);
        this.renderContext.renderbufferStorage(this.renderContext.RENDERBUFFER, this.renderContext.DEPTH_COMPONENT16, fw, fh);
        this.renderContext.framebufferRenderbuffer(this.renderContext.FRAMEBUFFER, this.renderContext.DEPTH_ATTACHMENT, this.renderContext.RENDERBUFFER, depthRenderBuffer);
        var fTexture = this.renderContext.createTexture();
        this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, fTexture);
        this.renderContext.texImage2D(this.renderContext.TEXTURE_2D, 0, this.renderContext.RGBA, fw, fh, 0, this.renderContext.RGBA, this.renderContext.UNSIGNED_BYTE, null);
        this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MAG_FILTER, this.renderContext.LINEAR);
        this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MIN_FILTER, this.renderContext.LINEAR);
        this.renderContext.framebufferTexture2D(this.renderContext.FRAMEBUFFER, this.renderContext.COLOR_ATTACHMENT0, this.renderContext.TEXTURE_2D, fTexture, 0);
        this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, null);
        this.renderContext.bindRenderbuffer(this.renderContext.RENDERBUFFER, null);
        this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, null);
        var fbo = new FBO();
        fbo.frameBuffer = frameBuffer;
        fbo.depthBuffer = depthRenderBuffer;
        fbo.texture = fTexture;
        return fbo;
    };
    Context3D.prototype.clearTest = function () {
        this._contextSetTest.clear();
    };
    return Context3D;
}());
var FBO = /** @class */ (function () {
    function FBO() {
    }
    FBO.fw = 512;
    FBO.fh = 512;
    return FBO;
}());
var ContextSetTest = /** @class */ (function () {
    function ContextSetTest() {
        this.enableVaAry = new Array;
        this.vaAry = new Array;
        this._blendType = -1000;
        this._cullType = false;
        this._zbufferType = true;
        this._vpMatrix = false;
    }
    ContextSetTest.prototype.testTexture = function ($name, $textureObject) {
        if (this._textureDic[$name] == $textureObject) {
            return true;
        }
        else {
            this._textureDic[$name] = $textureObject;
            return false;
        }
    };
    ContextSetTest.prototype.testProgram = function ($program) {
        if (this._program == $program) {
            return true;
        }
        else {
            this._program = $program;
            this._textureDic = new Object();
            this._vpMatrix = false;
            return false;
        }
    };
    ContextSetTest.prototype.testVa = function (dataBuffer) {
        if (this._vabuffer == dataBuffer) {
            return true;
        }
        else {
            this._vabuffer = dataBuffer;
            return false;
        }
    };
    ContextSetTest.prototype.clear = function () {
        this._blendType = -1000;
        this._cullType = false;
        this._vpMatrix = false;
        this._program = null;
    };
    ContextSetTest.prototype.testBlend = function ($type) {
        if (this._blendType == $type) {
            return true;
        }
        else {
            this._blendType = $type;
            return false;
        }
    };
    ContextSetTest.prototype.testCull = function ($type) {
        if (this._cullType == $type) {
            return true;
        }
        else {
            this._cullType = $type;
            return false;
        }
    };
    ContextSetTest.prototype.testZbuffer = function ($type) {
        if (this._zbufferType == $type) {
            return true;
        }
        else {
            this._zbufferType = $type;
            return false;
        }
    };
    ContextSetTest.prototype.testVp = function () {
        if (this._vpMatrix) {
            return true;
        }
        else {
            this._vpMatrix = true;
            return false;
        }
    };
    return ContextSetTest;
}());
//# sourceMappingURL=Context3D.js.map