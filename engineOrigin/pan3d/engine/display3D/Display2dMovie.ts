module Pan3d {
    export class Display2dMovie extends Display3D {
        public batchPos: Array<Movie3D> = new Array;
        public movieTexture: WebGLTexture;
        public watchCaramMatrix: Matrix3D;

        private _time: number = 0;
        private _allFrame: number = 12;
        private _uvData: Array<number> = [0, 0];
        private _uWidth: number = 0;
        private _vWidth: number = 0;
        private _state: number = 0;

        public frameRate: number = 3;


        constructor() {
            super();
            this.objData = new ObjData();
            this.watchCaramMatrix = new Matrix3D;
            this.shader = ProgrmaManager.getInstance().getProgram(Movie2DShader.MOVIE2D_SHADER);
            this.program = this.shader.program;
        }

        public update(): void {

            this.watchCaramMatrix.identity();
            this.watchCaramMatrix.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
            this.watchCaramMatrix.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);

            Scene_data.context3D.setProgram(this.program);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "watchCamMatrix3D", this.watchCaramMatrix.m);

            for (var i: number = 0; i < this.batchPos.length; i++) {
                Scene_data.context3D.setVc4fv(this.shader, "posdata[" + i + "]", this.batchPos[i].posData);
            }

            Scene_data.context3D.setVc2fv(this.shader, "outuv", this._uvData);

            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.movieTexture, 0);
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

        }

        public updateFrame(t: number): void {
            this._time += t;
            var _curentFrame: number = float2int(this._time / (Scene_data.frameTime * 2) / this.frameRate);
            if (_curentFrame >= this._allFrame) {
                if (this._state == 0) {
                    this._time = 0;
                    _curentFrame = 0;
                } else if (this._state == 1) {
                    _curentFrame = this._allFrame - 1;
                } else if (this._state == 2) {
                    this.play("stand")
                    _curentFrame = 0;
                    this._state = 0;
                } else if (this._state == 3) {

                }
            }
            this._uvData[0] = _curentFrame * this._uWidth;



        }

        public play(action: string, state: number = 0): void {
            this._state = state;
            this._time = 0;
            if (action == "walk") {
                this._uvData[1] = this._vWidth;
            } else if (action.indexOf("attack") != -1) {
                this._uvData[1] = this._vWidth * 2;
            } else {
                this._uvData[1] = 0;
            }
        }

        public addSun($obj: Movie3D): void {
            this.batchPos.push($obj);
        }

        public setUrl($url: string): void {
            //TextureManager.getInstance().getTexture(Scene_data.fileRoot + $url, ($text:WebGLTexture) => {this.movieTexture = $text });
        }

        public initData(num: number, scale: number, uscale: number, vscale: number, allFrame: number, random: boolean = false): void {

            this.objData.vertices.length = 0;
            this.objData.uvs.length = 0;
            this.objData.indexs.length = 0;

            this._uWidth = uscale;
            this._vWidth = vscale;
            this._allFrame = allFrame;

            for (var i: number = 0; i < num; i++) {
                this.objData.vertices.push(
                    -0.5 * scale, 1, 0,
                    0.5 * scale, 1, 0,
                    0.5 * scale, 0, 0,
                    -0.5 * scale, 0, 0);

                var upox: number = 0;
                if (random) {
                    upox = float2int(allFrame * Math.random()) * uscale;
                }

                this.objData.uvs.push(
                    0 + upox, 0, i,
                    uscale + upox, 0, i,
                    uscale + upox, 1 * vscale, i,
                    0 + upox, 1 * vscale, i);

                this.objData.indexs.push(i * 4, 1 + i * 4, 2 + i * 4, i * 4, 2 + i * 4, 3 + i * 4);
            }

            this.objData.treNum = this.objData.indexs.length;

            if (this.objData.vertexBuffer) {
                Scene_data.context3D.uploadBuff3DByBuffer(this.objData.vertexBuffer, this.objData.vertices);
                Scene_data.context3D.uploadBuff3DByBuffer(this.objData.uvBuffer, this.objData.uvs);
                Scene_data.context3D.uploadIndexBuff3DByBuffer(this.objData.indexBuffer, this.objData.indexs);
            } else {
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }


        }

        public addStage(): void {
            super.addStage();
            if (this.batchPos.length) {
                for (var i: number = 0; i < this.batchPos.length; i++) {
                    this.batchPos[i].add();
                }
            }
        }

        public removeStage(): void {
            super.removeStage();
            if (this.batchPos.length) {
                for (var i: number = 0; i < this.batchPos.length; i++) {
                    this.batchPos[i].remove();
                }
            }
        }




    }
}