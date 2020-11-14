module Pan3d {
    export class Context3D {
        public renderContext: WebGLRenderingContext;
        public _contextSetTest: ContextSetTest;
        public init($caves: HTMLCanvasElement): void {
            //this.renderContext = $caves.getContext("experimental-webgl");

            var gl: any = $caves.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
                || $caves.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false });
            this.renderContext = gl;

            this._contextSetTest = new ContextSetTest();
        }


        public resetSize($width: number, $height: number): void {
            this.renderContext.viewport(0, 0, $width, $height);

        }

        public uploadBuff3D($jsData: any): WebGLBuffer {
            var $buffData: WebGLBuffer = this.renderContext.createBuffer();
            this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, $buffData);
            this.renderContext.bufferData(this.renderContext.ARRAY_BUFFER, new Float32Array($jsData), this.renderContext.STATIC_DRAW);
            return $buffData;
        }

        public uploadBuff3DArrayBuffer($jsData: ArrayBuffer): WebGLBuffer {
            var $buffData: WebGLBuffer = this.renderContext.createBuffer();
            this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, $buffData);
            this.renderContext.bufferData(this.renderContext.ARRAY_BUFFER, $jsData, this.renderContext.STATIC_DRAW);
            return $buffData;
        }


        public uploadBuff3DByBuffer($buffData: WebGLBuffer, $jsData: Array<number>): void {
            this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, $buffData);
            this.renderContext.bufferData(this.renderContext.ARRAY_BUFFER, new Float32Array($jsData), this.renderContext.STATIC_DRAW);
        }

        public uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer {
            var $iBuffer: WebGLBuffer = this.renderContext.createBuffer();
            this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.bufferData(this.renderContext.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), this.renderContext.STATIC_DRAW);
            return $iBuffer;
        }

        public uploadIndexBuff3DByBuffer($iBuffer: WebGLBuffer, $iStrData: Array<number>): void {
            this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.bufferData(this.renderContext.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), this.renderContext.STATIC_DRAW);
        }

        //public num_setProgram:number = 0;

        public clearContext(): void {
            this.renderContext.depthMask(true);
            this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);
        }

        public update(): void {
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

        }

        public updateFBO(fbo: FBO): void {
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
        }

        public setDepthTest(tf: boolean): void {

            if (tf) {
                this.renderContext.enable(this.renderContext.DEPTH_TEST);
            } else {
                this.renderContext.disable(this.renderContext.DEPTH_TEST);
            }
        }

        public setWriteDepth(tf: boolean): void {
            if (this._contextSetTest.testZbuffer(tf)) {
                return;
            }
            this.renderContext.depthMask(tf);
        }

        public setBlendParticleFactors(type: number): void {

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
        }

        public setProgram($program: WebGLProgram): void {
            if (this._contextSetTest.testProgram($program)) {
                return;
            }
            this.renderContext.useProgram($program);
            this.setProgramNum++;
        }

        public getLocation($program: WebGLProgram, $name: string): WebGLUniformLocation {
            return this.renderContext.getUniformLocation($program, $name);
        }

        //public locationDic: any = new Object();

        /** ***************************setvc */
        public setVcMatrix3fv($program: Shader3D, $name: string, $m: Float32Array) {
            this.renderContext.uniformMatrix3fv($program.getWebGLUniformLocation($name), false, $m);
        }
        public setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array) {
            this.renderContext.uniformMatrix4fv($program.getWebGLUniformLocation($name), false, $m);
        }
        public setVpMatrix($program: Shader3D, $m: Float32Array) {
            if (this._contextSetTest.testVp()) {
                return;
            }
            this.renderContext.uniformMatrix4fv($program.getWebGLUniformLocation("vpMatrix3D"), false, $m);
        }

        public setVc4fv($program: Shader3D, $name: string, $m: any) {
            this.renderContext.uniform4fv($program.getWebGLUniformLocation($name), $m);
        }
        public setVc1fv($program: Shader3D, $name: string, $m: any) {
            this.renderContext.uniform1fv($program.getWebGLUniformLocation($name), $m);
        }

        public setVc3fv($program: Shader3D, $name: string, $m: any) {
            this.renderContext.uniform3fv($program.getWebGLUniformLocation($name), $m);
        }

        public setVc2fv($program: Shader3D, $name: string, $m: any) {
            this.renderContext.uniform2fv($program.getWebGLUniformLocation($name), $m);
        }

        public setVcFloat($program: Shader3D, $name: string, $m: any) {
            this.renderContext.uniform1fv($program.getWebGLUniformLocation($name), $m);
        }

        /** ******************************************* end setvc */
        public setuniform3f($program: Shader3D, $name: string, a: number, b: number, c: number) {
            this.renderContext.uniform3f($program.getWebGLUniformLocation($name), a, b, c);
        }

        public setVcMatrix4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void {
            this.renderContext.uniformMatrix4fv($location, false, $m);
        }
        public setVc2f($program: Shader3D, $name: string, a: number, b: number) {
            this.renderContext.uniform2f($program.getWebGLUniformLocation($name), a, b);
        }
        public setVcMatrix2fvLocation($location: WebGLUniformLocation, $m: Float32Array): void {
            this.renderContext.uniformMatrix2fv($location, false, $m);
        }
        //  public static maxLen:number=0
        public setVc4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void {

            //if (Context3D.maxLen < $m.length) {
            //    //console.log("在此处有变化renderContext",$m.length);
            //    Context3D.maxLen = $m.length;
            //}

            this.renderContext.uniform4fv($location, $m);
        }

        public setVa(dataId: number, dataWidth: number, dataBuffer: WebGLBuffer): void {
            this._contextSetTest.testVa(dataBuffer);

            this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, dataBuffer);
            this.renderContext.enableVertexAttribArray(dataId);
            this.renderContext.vertexAttribPointer(dataId, dataWidth, this.renderContext.FLOAT, false, 0, 0);
        }

        public pushVa(dataBuffer: WebGLBuffer): boolean {
            if (!this._contextSetTest.testVa(dataBuffer)) {
                this.renderContext.bindBuffer(this.renderContext.ARRAY_BUFFER, dataBuffer);
                return false;
            } else {
                return true;
            }
        }
        public setVaOffset(dataId: number, dataWidth: number, stride: number, offset: number): void {
            if (!this._contextSetTest.enableVaAry[dataId]) {
                this.renderContext.enableVertexAttribArray(dataId);
                this._contextSetTest.enableVaAry[dataId] = true;
            }

            this.renderContext.vertexAttribPointer(dataId, dataWidth, this.renderContext.FLOAT, false, stride, offset);
        }

        public clearVa(dataId: number): void {
            //this._contextSetTest.testVa(null);
            this._contextSetTest.enableVaAry[dataId] = false;
            this.renderContext.disableVertexAttribArray(dataId);
        }

        public drawCall($iBuffer: WebGLBuffer, $numTri: number) {

            this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.drawElements(this.renderContext.TRIANGLES, $numTri, this.renderContext.UNSIGNED_SHORT, 0);

            // var errorID = this.renderContext.getError();
            // if (errorID != 0) {
            //     //console.log(errorID);
            // }
        }
        public drawLine($iBuffer: WebGLBuffer, $numTri: number): void {
            this.renderContext.bindBuffer(this.renderContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.drawElements(this.renderContext.LINES, $numTri, this.renderContext.UNSIGNED_SHORT, 0);
        }
        private setTextureNum: number = 0;
        private setProgramNum: number = 0;
        public setRenderTexture($program: Shader3D, $name: string, $textureObject: WebGLTexture, $level: number, test: boolean = true) {

            if (test && this._contextSetTest.testTexture($name, $textureObject)) {
                return;
            }

            if ($level == 0) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE0);
            } else if ($level == 1) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE1);
            } else if ($level == 2) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE2);
            } else if ($level == 3) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE3);
            } else if ($level == 4) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE4);
            } else if ($level == 5) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE5);
            } else if ($level == 6) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE6);
            }
            this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, $textureObject);
            this.renderContext.uniform1i($program.getWebGLUniformLocation($name), $level);
            this.setTextureNum++;
        }

        public setRenderTextureCube($program: WebGLProgram, $name: string, $textureObject: WebGLTexture, $level: number) {
            if ($level == 0) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE0);
            } else if ($level == 1) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE1);
            } else if ($level == 2) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE2);
            } else if ($level == 3) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE3);
            } else if ($level == 4) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE4);
            } else if ($level == 5) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE5);
            } else if ($level == 6) {
                this.renderContext.activeTexture(this.renderContext.TEXTURE6);
            }
            this.renderContext.bindTexture(this.renderContext.TEXTURE_CUBE_MAP, $textureObject);
            this.renderContext.uniform1i(this.renderContext.getUniformLocation($program, $name), $level);
        }

        public updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, $img: any): void {
            this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, $texture);
            this.renderContext.texSubImage2D(this.renderContext.TEXTURE_2D, 0, $offsetx, $offsety, this.renderContext.RGBA, this.renderContext.UNSIGNED_BYTE, $img);
        }

        public getTexture($img: any, $wrap: number = 0, $filter: number = 0, $mipmap: number = 0): WebGLTexture {
            // $mipmap=0
            var $textureRect: Rectangle = new Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));
            if ($textureRect.width != $img.width || $textureRect.height != $img.height) {
                //console.log("图片尺寸不为2幂")
                //alert("图片尺寸不为2幂")
                var $ctx = UIManager.getInstance().getContext2D($textureRect.width, $textureRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $textureRect.width, $textureRect.height);
                return this.getTexture($ctx.canvas, 0, 0)
            }
            var textureObject: WebGLTexture = this.renderContext.createTexture();
            this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, textureObject);
            this.renderContext.texImage2D(this.renderContext.TEXTURE_2D, 0, this.renderContext.RGBA, this.renderContext.RGBA, this.renderContext.UNSIGNED_BYTE, $img);

            var filterNum: number;
            if ($filter == 0) {
                filterNum = this.renderContext.LINEAR;
            } else {
                filterNum = this.renderContext.NEAREST;
            }

            var mipNum: number;
            if ($filter == 0) {
                if ($mipmap == 0) {
                    mipNum = this.renderContext.LINEAR;
                } else if ($mipmap == 1) {
                    mipNum = this.renderContext.LINEAR_MIPMAP_LINEAR;

                } else if ($mipmap == 2) {
                    mipNum = this.renderContext.LINEAR_MIPMAP_NEAREST;
                }
            } else {
                if ($mipmap == 0) {
                    mipNum = this.renderContext.NEAREST;
                } else if ($mipmap == 1) {
                    mipNum = this.renderContext.NEAREST_MIPMAP_LINEAR;
                } else if ($mipmap == 2) {
                    mipNum = this.renderContext.NEAREST_MIPMAP_NEAREST;
                }
            }

            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MAG_FILTER, filterNum);
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MIN_FILTER, mipNum);

            if ($wrap == 0) {
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.REPEAT);
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.REPEAT);
            } else {
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.CLAMP_TO_EDGE);
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.CLAMP_TO_EDGE);
            }

            if ($mipmap != 0) {
                this.renderContext.generateMipmap(this.renderContext.TEXTURE_2D);
            }
            // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
            return textureObject;
        }
        public creatTexture($width: number, $height: number, $wrap: number = 0): WebGLTexture {
            var $texture: WebGLTexture = this.renderContext.createTexture();
            this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, $texture);

            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MAG_FILTER, this.renderContext.LINEAR);
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MIN_FILTER, this.renderContext.LINEAR);
            if ($wrap == 0) {
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.REPEAT);
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.REPEAT);
            } else {
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_S, this.renderContext.CLAMP_TO_EDGE);
                this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_WRAP_T, this.renderContext.CLAMP_TO_EDGE);
            }
            this.renderContext.texImage2D(this.renderContext.TEXTURE_2D, 0, this.renderContext.RGB, $width, $height, 0, this.renderContext.RGB, this.renderContext.UNSIGNED_BYTE, null);

            return $texture;
        }
        public createFramebuffer(): WebGLFramebuffer {
            var fboBuffer: WebGLFramebuffer = this.renderContext.createFramebuffer();
            this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, fboBuffer);
            return fboBuffer
        }

        public deleteBuffer(buffer: WebGLBuffer): void {
            if (!buffer) {
                //console.log("aaa12");
            }
            //var ooo:any = buffer;
            //ooo.destory = true;
            this.renderContext.deleteBuffer(buffer);
            if (this.renderContext.getError() != 0) {
                //console.log("aaa12");
            }

        }

        public deleteTexture(texture: WebGLTexture): void {
            //return;
            //var ooo:any = texture;
            //ooo.destory = true;
            this.renderContext.deleteTexture(texture);

        }

        public deleteShader(shader: Shader3D): void {
            //return;
            this.renderContext.deleteShader(shader.vShader);
            this.renderContext.deleteShader(shader.fShader);
            this.renderContext.deleteProgram(shader.program);

        }

        public cullFaceBack(tf: boolean): void {
            if (this._contextSetTest.testCull(tf)) {
                return;
            }
            if (tf) {
                this.renderContext.enable(this.renderContext.CULL_FACE);
                this.renderContext.cullFace(this.renderContext.FRONT);
            } else {
                this.renderContext.disable(this.renderContext.CULL_FACE);
            }
        }

        public getFBO(): FBO {
            var fw: number = FBO.fw;
            var fh: number = FBO.fh;

            var frameBuffer: WebGLFramebuffer = this.renderContext.createFramebuffer();

            this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, frameBuffer);

            var depthRenderBuffer: WebGLRenderbuffer = this.renderContext.createRenderbuffer();
            this.renderContext.bindRenderbuffer(this.renderContext.RENDERBUFFER, depthRenderBuffer);

            this.renderContext.renderbufferStorage(this.renderContext.RENDERBUFFER, this.renderContext.DEPTH_COMPONENT16, fw, fh);

            this.renderContext.framebufferRenderbuffer(this.renderContext.FRAMEBUFFER, this.renderContext.DEPTH_ATTACHMENT, this.renderContext.RENDERBUFFER, depthRenderBuffer);

            var fTexture: WebGLTexture = this.renderContext.createTexture();

            this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, fTexture);

            this.renderContext.texImage2D(this.renderContext.TEXTURE_2D, 0, this.renderContext.RGBA, fw, fh, 0, this.renderContext.RGBA, this.renderContext.UNSIGNED_BYTE, null);

            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MAG_FILTER, this.renderContext.LINEAR);
            this.renderContext.texParameteri(this.renderContext.TEXTURE_2D, this.renderContext.TEXTURE_MIN_FILTER, this.renderContext.LINEAR);

            this.renderContext.framebufferTexture2D(this.renderContext.FRAMEBUFFER, this.renderContext.COLOR_ATTACHMENT0, this.renderContext.TEXTURE_2D, fTexture, 0);

            this.renderContext.bindTexture(this.renderContext.TEXTURE_2D, null);
            this.renderContext.bindRenderbuffer(this.renderContext.RENDERBUFFER, null);
            this.renderContext.bindFramebuffer(this.renderContext.FRAMEBUFFER, null);

            var fbo: FBO = new FBO();
            fbo.frameBuffer = frameBuffer;
            fbo.depthBuffer = depthRenderBuffer;
            fbo.texture = fTexture;
            return fbo;
        }

        public clearTest(): void {
            this._contextSetTest.clear();
        }




    }

    export  class FBO {
        public static fw: number = 512;
        public static fh: number = 512;
        public frameBuffer: WebGLFramebuffer;
        public depthBuffer: WebGLRenderbuffer;
        public texture: WebGLRenderbuffer;
    }

    export   class ContextSetTest {

        private _textureDic: Object;
        private _program: WebGLProgram;
        public enableVaAry: Array<boolean> = new Array;
        public vaAry: Array<boolean> = new Array;
        private _vabuffer: WebGLBuffer;
        private _blendType: number = -1000;
        private _cullType: boolean = false;
        private _zbufferType: boolean = true;
        private _vpMatrix: boolean = false;


        public testTexture($name: string, $textureObject: WebGLTexture): boolean {
            if (this._textureDic[$name] == $textureObject) {
                return true;
            } else {
                this._textureDic[$name] = $textureObject;
                return false;
            }
        }

        public testProgram($program: WebGLProgram): boolean {
            if (this._program == $program) {
                return true;
            } else {
                this._program = $program;
                this._textureDic = new Object();
                this._vpMatrix = false;
                return false;
            }

        }

        public testVa(dataBuffer: WebGLBuffer): boolean {
            if (this._vabuffer == dataBuffer) {
                return true;
            } else {
                this._vabuffer = dataBuffer;
                return false;
            }

        }

        public clear(): void {
            this._blendType = -1000;
            this._cullType = false;
            this._vpMatrix = false;
            this._program = null;
            this._vabuffer = null
        }

        public testBlend($type: number): boolean {
            if (this._blendType == $type) {
                return true;
            } else {
                this._blendType = $type;
                return false;
            }
        }

        public testCull($type: boolean): boolean {
            if (this._cullType == $type) {
                return true;
            } else {
                this._cullType = $type;
                return false;
            }
        }

        public testZbuffer($type: boolean): boolean {
            if (this._zbufferType == $type) {
                return true;
            } else {
                this._zbufferType = $type;
                return false;
            }
        }

        public testVp(): boolean {
            if (this._vpMatrix) {
                return true;
            } else {
                this._vpMatrix = true;
                return false;
            }
        }





    }
}