import { Rectangle } from "../math/Rectangle";
import { Shader3D } from "../program/Shader3D";
import { UIManager } from "../ui/UIManager";
import WebGLContext=Laya.WebGLContext;

    export class Context3D {
        // public renderContext: WebGLRenderingContext;
        public renderContext: Laya.WebGLContext;
        public _contextSetTest: ContextSetTest;
        public init($caves: HTMLCanvasElement): void {
            //this.renderContext = $caves.getContext("experimental-webgl");
            // this.renderContext =  Laya.LayaGL.instance;
           
            this.renderContext = Laya.WebGL.mainContext;
           
/*             var gl: any = $caves.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
                || $caves.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false }); */

           
        /*     var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            var vendorExt = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            var rendererExt = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

            let vendor:any = gl.getParameter(laya.webgl.WebGLContext.VENDOR);
            let version:any = gl.getParameter(laya.webgl.WebGLContext.VERSION);
            let render:any = gl.getParameter(laya.webgl.WebGLContext.RENDERER);
       
            let max_texture_units:any = gl.getParameter(laya.webgl.WebGLContext.MAX_TEXTURE_IMAGE_UNITS);
            let max_texture_size:any = gl.getParameter(laya.webgl.WebGLContext.MAX_TEXTURE_SIZE);
            let max_cube_texture_size:any = gl.getParameter(laya.webgl.WebGLContext.MAX_CUBE_MAP_TEXTURE_SIZE);
            let max_vertex_attribs:any = gl.getParameter(laya.webgl.WebGLContext.MAX_VERTEX_ATTRIBS);
            let max_vertex_uniform_vectors:any = gl.getParameter(laya.webgl.WebGLContext.MAX_VERTEX_UNIFORM_VECTORS);
            

            console.log(`VENDOR:`,vendor);
            console.log(`VERSION:`,version);
            console.log(`RENDERER:`,render);
            console.log(`VENDOR_EXT:`,vendorExt);
            console.log(`RENDERER_EXT:`,rendererExt);
            console.log(`MAX_TEXTURE_IMAGE_UNITS:`,max_texture_units);
            console.log(`MAX_TEXTURE_SIZE:`,max_texture_size);
            console.log(`MAX_CUBE_MAP_TEXTURE_SIZE:`,max_cube_texture_size);
            console.log(`MAX_VERTEX_ATTRIBS:`,max_vertex_attribs);
            console.log(`MAX_VERTEX_UNIFORM_VECTORS:`,max_vertex_uniform_vectors); */

  

            this._contextSetTest = new ContextSetTest();
        }


        public resetSize($width: number, $height: number): void {
            // this.renderContext.viewport(0, 0, $width, $height);

        }

        public uploadBuff3D($jsData: any): WebGLBuffer {
            var $buffData: WebGLBuffer = this.renderContext.createBuffer();
            this.renderContext.bindBuffer(WebGLContext.ARRAY_BUFFER, $buffData);
            this.renderContext.bufferData(WebGLContext.ARRAY_BUFFER, new Float32Array($jsData), WebGLContext.STATIC_DRAW);
            return $buffData;
        }

        public uploadBuff3DArrayBuffer($jsData: ArrayBuffer): WebGLBuffer {
            var $buffData: WebGLBuffer = this.renderContext.createBuffer();
            this.renderContext.bindBuffer(WebGLContext.ARRAY_BUFFER, $buffData);
            this.renderContext.bufferData(WebGLContext.ARRAY_BUFFER, $jsData, WebGLContext.STATIC_DRAW);
            return $buffData;
        }


        public uploadBuff3DByBuffer($buffData: WebGLBuffer, $jsData: Array<number>): void {
            this.renderContext.bindBuffer(WebGLContext.ARRAY_BUFFER, $buffData);
            this.renderContext.bufferData(WebGLContext.ARRAY_BUFFER, new Float32Array($jsData), WebGLContext.STATIC_DRAW);
        }

        public uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer {
            var $iBuffer: WebGLBuffer = this.renderContext.createBuffer();
            this.renderContext.bindBuffer(WebGLContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.bufferData(WebGLContext.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), WebGLContext.STATIC_DRAW);
            return $iBuffer;
        }

        public uploadIndexBuff3DByBuffer($iBuffer: WebGLBuffer, $iStrData: Array<number>): void {
            this.renderContext.bindBuffer(WebGLContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.bufferData(WebGLContext.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), WebGLContext.STATIC_DRAW);
        }

        //public num_setProgram:number = 0;

        public clearContext(): void {
            this.renderContext.depthMask(true);
            this.renderContext.clear(WebGLContext.COLOR_BUFFER_BIT | WebGLContext.DEPTH_BUFFER_BIT | WebGLContext.STENCIL_BUFFER_BIT);
        }

 /*        public update(): void {
            this._contextSetTest.clear();
            this.renderContext.bindFramebuffer(WebGLContext.FRAMEBUFFER, null);
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

        } */

        public updateFBO(fbo: FBO): void {
            this.renderContext.bindFramebuffer(WebGLContext.FRAMEBUFFER, fbo.frameBuffer);
            this.renderContext.clearColor(63 / 255, 63 / 255, 63 / 255, 1.0);
            this.renderContext.clearDepth(1.0);
            this.renderContext.clearStencil(0.0);
            this.renderContext.enable(WebGLContext.DEPTH_TEST);
            this.renderContext.depthMask(true);
            this.renderContext.enable(WebGLContext.BLEND);
            this.renderContext.frontFace(WebGLContext.CW);

            this.renderContext.clear(WebGLContext.COLOR_BUFFER_BIT | WebGLContext.DEPTH_BUFFER_BIT | WebGLContext.STENCIL_BUFFER_BIT);
            //this.renderContext.blendFunc(this.renderContext.SRC_ALPHA, this.renderContext.ONE_MINUS_SRC_ALPHA);
            this.setBlendParticleFactors(0);
            this.renderContext.disable(WebGLContext.CULL_FACE);
        }

        public setDepthTest(tf: boolean): void {

            if (tf) {
                this.renderContext.enable(WebGLContext.DEPTH_TEST);
            } else {
                this.renderContext.disable(WebGLContext.DEPTH_TEST);
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
                    this.renderContext.blendFunc(WebGLContext.ONE, WebGLContext.ONE_MINUS_SRC_ALPHA);
                    break;
                case 1:
                    this.renderContext.blendFunc(WebGLContext.ONE, WebGLContext.ONE);
                    break;
                case 2:
                    this.renderContext.blendFunc(WebGLContext.DST_COLOR, WebGLContext.ZERO);
                    break;
                case 3:
                    this.renderContext.blendFunc(WebGLContext.ONE, WebGLContext.ONE_MINUS_SRC_COLOR);
                    break;
                case 4:
                    this.renderContext.blendFunc(WebGLContext.SRC_ALPHA, WebGLContext.ONE);
                    break;
                case -1:
                    this.renderContext.blendFunc(WebGLContext.SRC_ALPHA, WebGLContext.ONE_MINUS_SRC_ALPHA);
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

            this.renderContext.bindBuffer(WebGLContext.ARRAY_BUFFER, dataBuffer);
            if(dataBuffer)
            {
                this.renderContext.enableVertexAttribArray(dataId);
                this.renderContext.vertexAttribPointer(dataId, dataWidth, WebGLContext.FLOAT, false, 0, 0);
            }
        }

        public pushVa(dataBuffer: WebGLBuffer): boolean {
            if (!this._contextSetTest.testVa(dataBuffer)) {
                this.renderContext.bindBuffer(WebGLContext.ARRAY_BUFFER, dataBuffer);
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

            this.renderContext.vertexAttribPointer(dataId, dataWidth, WebGLContext.FLOAT, false, stride, offset);
        }

        public clearVa(dataId: number): void {
            //this._contextSetTest.testVa(null);
            this._contextSetTest.enableVaAry[dataId] = false;
            this.renderContext.disableVertexAttribArray(dataId);
        }

        public drawCall($iBuffer: WebGLBuffer, $numTri: number) {

            this.renderContext.bindBuffer(WebGLContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.drawElements(WebGLContext.TRIANGLES, $numTri, WebGLContext.UNSIGNED_SHORT, 0);
            laya.utils.Stat.drawCall += 1;

            // var errorID = this.renderContext.getError();
            // if (errorID != 0) {
            //     //console.log(errorID);
            // }
        }
        public drawLine($iBuffer: WebGLBuffer, $numTri: number): void {
            this.renderContext.bindBuffer(WebGLContext.ELEMENT_ARRAY_BUFFER, $iBuffer);
            this.renderContext.drawElements(WebGLContext.LINES, $numTri, WebGLContext.UNSIGNED_SHORT, 0);
        }
        private setTextureNum: number = 0;
        private setProgramNum: number = 0;
        public setRenderTexture($program: Shader3D, $name: string, $textureObject: WebGLTexture, $level: number, test: boolean = true) {

            if (test && this._contextSetTest.testTexture($name, $textureObject)) {
                return;
            }

            if ($level == 0) {
                WebGLContext.activeTexture(this.renderContext,WebGLContext.TEXTURE0);
            } else if ($level == 1) {
                WebGLContext.activeTexture(this.renderContext,WebGLContext.TEXTURE1);
            } else if ($level == 2) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE2);
            } else if ($level == 3) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE3);
            } else if ($level == 4) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE4);
            } else if ($level == 5) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE5);
            } else if ($level == 6) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE6);
            }
            this.renderContext.bindTexture(WebGLContext.TEXTURE_2D, $textureObject);
            this.renderContext.uniform1i($program.getWebGLUniformLocation($name), $level);
            this.setTextureNum++;
        }

        public clearTexture():void{
            // this.renderContext.activeTexture(WebGLContext.TEXTURE0);
            // this.renderContext.bindTexture(WebGLContext.TEXTURE_2D, null);
        }

        public setRenderTextureCube($program: WebGLProgram, $name: string, $textureObject: WebGLTexture, $level: number) {
            if ($level == 0) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE0);
            } else if ($level == 1) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE1);
            } else if ($level == 2) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE2);
            } else if ($level == 3) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE3);
            } else if ($level == 4) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE4);
            } else if ($level == 5) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE5);
            } else if ($level == 6) {
                this.renderContext.activeTexture(WebGLContext.TEXTURE6);
            }
            this.renderContext.bindTexture(WebGLContext.TEXTURE_CUBE_MAP, $textureObject);
            this.renderContext.uniform1i(this.renderContext.getUniformLocation($program, $name), $level);
        }

        public updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, $img: any): void {
            this.renderContext.bindTexture(WebGLContext.TEXTURE_2D, $texture);
            this.renderContext.texSubImage2D(WebGLContext.TEXTURE_2D, 0, $offsetx, $offsety, WebGLContext.RGBA, WebGLContext.UNSIGNED_BYTE, $img);
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
            this.renderContext.bindTexture(WebGLContext.TEXTURE_2D, textureObject);
            this.renderContext.texImage2D(WebGLContext.TEXTURE_2D, 0, WebGLContext.RGBA, WebGLContext.RGBA, WebGLContext.UNSIGNED_BYTE, $img);

            var filterNum: number;
            if ($filter == 0) {
                filterNum = WebGLContext.LINEAR;
            } else {
                filterNum = WebGLContext.NEAREST;
            }

            var mipNum: number;
            if ($filter == 0) {
                if ($mipmap == 0) {
                    mipNum = WebGLContext.LINEAR;
                } else if ($mipmap == 1) {
                    mipNum = WebGLContext.LINEAR_MIPMAP_LINEAR;

                } else if ($mipmap == 2) {
                    mipNum = WebGLContext.LINEAR_MIPMAP_NEAREST;
                }
            } else {
                if ($mipmap == 0) {
                    mipNum = WebGLContext.NEAREST;
                } else if ($mipmap == 1) {
                    mipNum = WebGLContext.NEAREST_MIPMAP_LINEAR;
                } else if ($mipmap == 2) {
                    mipNum = WebGLContext.NEAREST_MIPMAP_NEAREST;
                }
            }

            this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_MAG_FILTER, WebGLContext.LINEAR);
            this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_MIN_FILTER, WebGLContext.LINEAR);

            if ($wrap == 0) {
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_S, WebGLContext.REPEAT);
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_T, WebGLContext.REPEAT);
            } else {
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_S, WebGLContext.CLAMP_TO_EDGE);
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_T, WebGLContext.CLAMP_TO_EDGE);
            }

            if ($mipmap != 0) {
                this.renderContext.generateMipmap(WebGLContext.TEXTURE_2D);
            }
            // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
            return textureObject;
        }
        public creatTexture($width: number, $height: number, $wrap: number = 0): WebGLTexture {
            var $texture: WebGLTexture = this.renderContext.createTexture();
            this.renderContext.bindTexture(WebGLContext.TEXTURE_2D, $texture);

            this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_MAG_FILTER, WebGLContext.LINEAR);
            this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_MIN_FILTER, WebGLContext.LINEAR);
            if ($wrap == 0) {
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_S, WebGLContext.REPEAT);
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_T, WebGLContext.REPEAT);
            } else {
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_S, WebGLContext.CLAMP_TO_EDGE);
                this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_WRAP_T, WebGLContext.CLAMP_TO_EDGE);
            }
            this.renderContext.texImage2D(WebGLContext.TEXTURE_2D, 0, WebGLContext.RGB, $width, $height, 0, WebGLContext.RGB, WebGLContext.UNSIGNED_BYTE, null);

            return $texture;
        }
        public createFramebuffer(): WebGLFramebuffer {
            var fboBuffer: WebGLFramebuffer = this.renderContext.createFramebuffer();
            this.renderContext.bindFramebuffer(WebGLContext.FRAMEBUFFER, fboBuffer);
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
                this.renderContext.enable(WebGLContext.CULL_FACE);
                this.renderContext.cullFace(WebGLContext.BACK);
            } else {
                this.renderContext.disable(WebGLContext.CULL_FACE);
            }
        }

        public getFBO(): FBO {
            var fw: number = FBO.fw;
            var fh: number = FBO.fh;

            var frameBuffer: WebGLFramebuffer = this.renderContext.createFramebuffer();

            this.renderContext.bindFramebuffer(WebGLContext.FRAMEBUFFER, frameBuffer);

            var depthRenderBuffer: WebGLRenderbuffer = this.renderContext.createRenderbuffer();
            this.renderContext.bindRenderbuffer(WebGLContext.RENDERBUFFER, depthRenderBuffer);

            this.renderContext.renderbufferStorage(WebGLContext.RENDERBUFFER, WebGLContext.DEPTH_COMPONENT16, fw, fh);

            this.renderContext.framebufferRenderbuffer(WebGLContext.FRAMEBUFFER, WebGLContext.DEPTH_ATTACHMENT, WebGLContext.RENDERBUFFER, depthRenderBuffer);

            var fTexture: WebGLTexture = this.renderContext.createTexture();

            this.renderContext.bindTexture(WebGLContext.TEXTURE_2D, fTexture);

            this.renderContext.texImage2D(WebGLContext.TEXTURE_2D, 0, WebGLContext.RGBA, fw, fh, 0, WebGLContext.RGBA, WebGLContext.UNSIGNED_BYTE, null);

            this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_MAG_FILTER, WebGLContext.LINEAR);
            this.renderContext.texParameteri(WebGLContext.TEXTURE_2D, WebGLContext.TEXTURE_MIN_FILTER, WebGLContext.LINEAR);

            this.renderContext.framebufferTexture2D(WebGLContext.FRAMEBUFFER, WebGLContext.COLOR_ATTACHMENT0, WebGLContext.TEXTURE_2D, fTexture, 0);

            this.renderContext.bindTexture(WebGLContext.TEXTURE_2D, null);
            this.renderContext.bindRenderbuffer(WebGLContext.RENDERBUFFER, null);
            this.renderContext.bindFramebuffer(WebGLContext.FRAMEBUFFER, null);

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