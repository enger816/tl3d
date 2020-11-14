module Pan3d {
    export class Display2DSprite extends Display3D {

        public batchPos: Array<Sprite> = new Array;
        public watchCaramMatrix: Matrix3D;

        private _imgAtlas: UIAtlas;

        constructor() {
            super();
            this.objData = new ObjData();
            this.watchCaramMatrix = new Matrix3D;
            this.shader = ProgrmaManager.getInstance().getProgram(Sprite2DShader.SPRITE2D_SHADER);
            this.program = this.shader.program;
        }

        public setInfo($configurl: string, $imgurl: string, $fun: Function): void {
            if (!this._imgAtlas) {
                this._imgAtlas = new UIAtlas;
            }
            this._imgAtlas.setInfo($configurl, $imgurl, $fun);
        }

        public getSprite($name: string): Sprite {
            var obj: Sprite = new Sprite();
            obj.uvData = this._imgAtlas.getRec($name);
            return obj;

        }

        public addSprite(...spriteAry: Sprite[]): void {
            for (var i: number = 0; i < spriteAry.length; i++) {
                this.batchPos.push(spriteAry[i]);
            }
            this.applyData();
        }

        public applyData(): void {

            this.objData.vertices.length = 0;
            this.objData.uvs.length = 0;
            this.objData.indexs.length = 0;

            for (var i: number = 0; i < this.batchPos.length; i++) {
                var uv: UIRectangle = this.batchPos[i].uvData;
                var whscale: number = uv.pixelHeight / uv.pixelWitdh;
                this.objData.vertices.push(
                    -0.5 * uv.width, 1 * whscale * uv.width, 0,
                    0.5 * uv.width, 1 * whscale * uv.width, 0,
                    0.5 * uv.width, 0, 0,
                    -0.5 * uv.width, 0, 0);
                this.objData.uvs.push(
                    uv.x, uv.y, i,
                    uv.x + uv.width, uv.y, i,
                    uv.x + uv.width, uv.y + uv.height, i,
                    uv.x, uv.y + uv.height, i);
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

        public update(): void {

            if (this.batchPos.length == 0) {
                return;
            }

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


            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._imgAtlas.texture, 0);
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

        }


    }

    class Sprite extends Object3D {
        public posData: Array<number> = [0, 0, 0, 100];
        public uvData: UIRectangle;

        public setPos(xpos: number, ypos: number, zpos: number): void {
            this.x = xpos;
            this.y = ypos;
            this.z = zpos;
        }

        public set scale(value: number) {
            this._scaleX = value;
            this.posData[3] = 100 * value;
        }

        public get scale(): number {
            return this._scaleX;
        }

        public set x(value: number) {
            this._x = value;
            this.posData[0] = value;
        }


        public set y(value: number) {
            this._y = value;
            this.posData[1] = value;

        }

        public set z(value: number) {
            this._z = value;
            this.posData[2] = value;

        }


    }

}