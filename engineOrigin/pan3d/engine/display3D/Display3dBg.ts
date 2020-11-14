module Pan3d {
    export class Display3dBg extends Display3D {

        protected texture: WebGLTexture;

        constructor() {
            super();
            this.shader = ProgrmaManager.getInstance().getProgram(UIImageShader.UI_IMG_SHADER);
            this.program = this.shader;
            this.initData();
        }

        private _width: number;
        private _height: number;
        private _wScale: number;
        private _hScale: number;
        private _scaleData: Array<number> = [1, 1];

        protected initData(): void {
            this.objData = new ObjData();


            this.objData.vertices.push(
                -1, 1, 0.99,
                1, 1, 0.99,
                1, -1, 0.99,
                -1, -1, 0.99);
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

        public setImgUrl($url: string): void {
            //TextureManager.getInstance().getTexture(Scene_data.fileRoot + $url, ($texture: WebGLTexture) => {
            //    this.texture = $texture;
            //});
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

        public update(): void {

            this.appleyPos();

            Scene_data.context3D.setBlendParticleFactors(0);
            Scene_data.context3D.setProgram(this.program);

            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);

            Scene_data.context3D.setVc2fv(this.shader, "scale", this._scaleData);

            Scene_data.context3D.setVcFloat(this.shader, "alpha", [1.0]);

            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);

            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

        }

    }
}