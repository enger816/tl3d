module Pan3d {
    export class UIMask {

        //设定相对坐标
        protected _x: number = 0;
        protected _y: number = 0;
        protected _width: number = 0;
        protected _height: number = 0;
        //设定绝对坐标
        public absoluteX: number = 0;
        public absoluteY: number = 0;
        public absoluteWidth: number = 0;
        public absoluteHeight: number = 0;

        public objData: ObjData;
        public program: WebGLProgram;
        public shader: Shader3D;
        public renderData: Array<number>;
        public parent: UIConatiner;
        public scale: number = 1

        public level: number = 2;
        public constructor() {
            this.initData();
            this.renderData = [0, 0, 0, 0];
        }

        protected initData(): void {
            this.objData = new ObjData();
            this.shader = ProgrmaManager.getInstance().getProgram(UIMaskShader.UI_MASK_SHADER);
            this.program = this.shader.program;
            this.applyObjData();
        }

        public applyAbsolutePoint(): void {
            if (this.parent) {
                this.absoluteX = this._x * this.scale * UIData.Scale + this.parent.x;
                this.absoluteY = this._y * this.scale * UIData.Scale + this.parent.y;

                this.absoluteWidth = this._width * UIData.Scale * this.scale;
                this.absoluteHeight = this._height * UIData.Scale * this.scale;
                this.applyRenderSize();
            }
        }

        public testPoint($x: number, $y: number): boolean {
            if ($x > this.absoluteX && $x < (this.absoluteX + this.absoluteWidth) && $y > this.absoluteY && $y < (this.absoluteY + this.absoluteHeight)) {
                return true;
            } else {
                return false;
            }
        }

        public applyRenderSize(): void {
            if (!this.parent) {
                return;
            }

            this.renderData[0] = this.absoluteX / Scene_data.stageWidth;
            this.renderData[1] = this.absoluteY / Scene_data.stageHeight;
            this.renderData[2] = this.absoluteWidth / Scene_data.stageWidth;
            this.renderData[3] = this.absoluteHeight / Scene_data.stageHeight;


        }

        public applyObjData(): void {
            this.objData.vertices.length = 0;
            this.objData.uvs.length = 0;
            this.objData.indexs.length = 0;

            this.objData.vertices.push(
                0, 0, 0,
                1, 0, 0,
                1, -1, 0,
                0, -1, 0);
            this.objData.indexs.push(0, 1, 2, 0, 2, 3);

            this.objData.treNum = this.objData.indexs.length;

            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);

        }

        public update(): void {
            Scene_data.context3D.setBlendParticleFactors(0);
            Scene_data.context3D.setProgram(this.program);

            //for (var i: number = 0; i < this._uiList.length; i++) {
            //    this._uiList[i].update();
            //    this._uiList[i].setVc(this.program, i);
            //}

            Scene_data.context3D.setVc4fv(this.shader, "ui", this.renderData);

            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);

            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        }

        public set x(value: number) {
            this._x = value;
            this.applyAbsolutePoint();
        }
        public get x() {
            return this._x;
        }

        public set y(value: number) {
            this._y = value;
            this.applyAbsolutePoint();
        }
        public get y() {
            return this._y;
        }

        public set width(value: number) {
            this._width = value;
            this.applyAbsolutePoint();
        }
        public get width() {
            return this._width;
        }
        public set height(value: number) {
            this._height = value;
            this.applyAbsolutePoint();
        }
        public get height() {
            return this._height;
        }
        private _hasDisposed: boolean = false;
        public dispose(): void {
            if (this._hasDisposed) {
                return;
            }
            this.objData.destory();
            this.objData = null;
            this.program = null;
            this.shader = null;
            this.renderData = null;
            this.parent = null;
            this._hasDisposed = true;
        }



    }
}