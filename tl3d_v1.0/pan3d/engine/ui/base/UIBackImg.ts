module Pan3d {
    export class UIBackImg extends UIRenderComponent {
        public constructor() {
            super();
        }
        private _width: number;
        private _height: number;
        private _wScale: number;
        private _hScale: number;
        private _scaleData: Array<number> = [1, 1];
        private _isFBO: boolean = false;
        public alpha: number = 1.0;

        protected initData(): void {
            this.objData = new ObjData();
            this.shader = ProgrmaManager.getInstance().getProgram(UIImageShader.UI_IMG_SHADER);
            this.program = this.shader.program;

            this.objData.vertices.push(
                -1, 1, 0,
                1, 1, 0,
                1, -1, 0,
                -1, -1, 0);
            this.objData.uvs.push(
                0, 0,
                1, 0,
                1, 1,
                0, 1);
            this.objData.indexs.push(0, 1, 2, 0, 2, 3);

            this.objData.treNum = 6;

            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);

        }

        public resize(): void {
            this.appleyPos();
        }

        public setImgInfo($url: string, $width: number, $height: number): void {
            this.setImgUrl($url);
            this._width = $width;
            this._height = $height;

        }

        public appleyPos(): void {
            var widthScale: number = this._width / Scene_data.stageWidth;
            var heightScale: number = this._height / Scene_data.stageHeight;

            if (widthScale < heightScale) {
                this._scaleData[0] = 1
                this._scaleData[1] = (this._height / Scene_data.stageHeight) / widthScale;

            } else {
                this._scaleData[0] = (this._width / Scene_data.stageWidth) / heightScale;
                this._scaleData[1] = 1;
            }


        }

        public setFbo(): void {
            this._isFBO = true;
        }

        public update(): void {

            var hasTexture: boolean = false;
            if (this._isFBO) {
                if (Scene_data.fbo) {
                    hasTexture = true;
                }

                Scene_data.context3D.clearContext();
                Scene_data.context3D.setDepthTest(false);
            } else {
                if (this.texture) {
                    hasTexture = true;
                }
            }

            if (this.objData && hasTexture) {
                Scene_data.context3D.setBlendParticleFactors(0);
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setVc2fv(this.shader, "scale", this._scaleData);

                if (this._isFBO) {
                    Scene_data.context3D.setVc2fv(this.shader, "scale", [1, -1]);
                    Scene_data.context3D.setRenderTexture(this.shader, "s_texture", Scene_data.fbo.texture, 0);
                } else {
                    Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
                }

                Scene_data.context3D.setVcFloat(this.shader, "alpha", [this.alpha]);

                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }

        }

        public interactiveEvent($e: InteractiveEvent): boolean {
            return true;
        }

    }

    export  class UIRenderOnlyPicComponent extends UIRenderComponent {
        public constructor() {
            super();
        }
        public makeRenderDataVc($vcId: number): void {
            super.makeRenderDataVc($vcId);
            for (var i: number = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 1;
                this.renderData2[i * 4 + 1] = 1;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;
            }
        }
        public update(): void {
            if (this.texture) {
                super.update()
            }
        }

        protected setTextureToGpu(): void {
            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
        }
        /*
           var _bigPic: UIRenderOnlyPicComponent = new UIRenderOnlyPicComponent();  
                this.addRender(_bigPic);
                _bigPic.uiAtlas = this._midRender.uiAtlas;
                _bigPic.setImgUrl("ui/uidata/basebg/skillbg.png");
                this.addChild(_bigPic.getComponent("ccav"));  
    
        */

        public dispose(): void {
            super.dispose();
            if (this.textureRes) {
                this.textureRes.clearUseNum();
            }
        }
    }
}