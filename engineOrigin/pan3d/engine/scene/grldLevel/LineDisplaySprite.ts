module Pan3d {
    export class LineDisplaySprite extends Display3D {

        constructor() {
            super();
            this.objData = new ObjData;
            this.shader = ProgrmaManager.getInstance().getProgram(LineDisplayShader.LineShader);
            this.program = this.shader.program;
            this.makeLineMode(new Vector3D(0, 0, 0), new Vector3D(100, 0, 0), new Vector3D());
            this.makeLineMode(new Vector3D(0, 0, 0), new Vector3D(100, 0, 100), new Vector3D());
            this.makeLineMode(new Vector3D(100, 0, 0), new Vector3D(100, 0, 100), new Vector3D());
            this.upToGpu();

        }
        public lineVecPos: Array<number>;
        public lineColor: Array<number>
        public lineIndex: Array<number>
        public baseColor: Vector3D = new Vector3D(1, 0, 0)
        public makeLineMode(a: Vector3D, b: Vector3D, $color: Vector3D = null): void {
            if (!this.lineVecPos || !this.lineIndex) {
                this.clear()
            }
            if ($color) {
                this.baseColor = $color
            }
            this.lineVecPos.push(a.x, a.y, a.z);
            this.lineVecPos.push(b.x, b.y, b.z);

            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z)
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z)

            this.lineIndex.push(this.lineIndex.length + 0, this.lineIndex.length + 1)

        }
        public clear(): void {
            this.lineVecPos = new Array;
            this.lineIndex = new Array
            this.lineColor = new Array

            if (this.objData.indexBuffer) {
                this.objData.indexBuffer = null
            }
        }
        public upToGpu(): void {
            if (this.lineIndex.length) {
                //console.log("A星长度", this.lineIndex.length)
                this.objData.treNum = this.lineIndex.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.lineVecPos);
                this.objData.normalsBuffer = Scene_data.context3D.uploadBuff3D(this.lineColor);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.lineIndex);
            }
        }
        public update(): void {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
                Scene_data.context3D.drawLine(this.objData.indexBuffer, this.objData.treNum);

            }


        }



    }
    export class MulLineSprite extends LineDisplaySprite {
        constructor() {

            super();
            if (!this.itemSprite) {
                this.itemSprite = new Array
            }
        }
        private itemSprite: Array<LineDisplaySprite>
        public makeLineMode(a: Vector3D, b: Vector3D, $color: Vector3D = null): void {
            super.makeLineMode(a, b, $color);
            var $dic: LineDisplaySprite = this.getSprite();
            $dic.makeLineMode(a, b, $color);
        }
        private getSprite(): LineDisplaySprite {
            var $id: number = Math.floor(this.lineIndex.length / 10000);
            if (!this.itemSprite[$id]) {
                var $temp: LineDisplaySprite = new LineDisplaySprite
                $temp.clear();
                $temp.baseColor = this.baseColor;
                this.itemSprite.push($temp);
            }
            return this.itemSprite[$id]
        }
        public update(): void {
            for (var i: number = 0; i < this.itemSprite.length; i++) {
                this.itemSprite[i].posMatrix = this.posMatrix
                this.itemSprite[i].update()
            }
        }
        public upToGpu(): void {
            for (var i: number = 0; i < this.itemSprite.length; i++) {
                this.itemSprite[i].upToGpu()
            }
        }
        public clear(): void {
            super.clear();
            if (!this.itemSprite) {
                this.itemSprite = new Array
            }
            for (var i: number = 0; this.itemSprite && i < this.itemSprite.length; i++) {
                this.itemSprite[i].clear()
            }

        }
    }
    export class GridLineSprite extends LineDisplaySprite {
        constructor() {
            super();
            this.makeGridData()

        }
        private makeGridData(): void {

            var w: number = 100;
            var n: number = 10;
            var skeep: number = w / n;
            this.clear();
            var a: Vector3D;
            var b: Vector3D;
            a = new Vector3D(0, 0, +w);
            b = new Vector3D(0, 0, -w);
            this.makeLineMode(a, b, new Vector3D(0, 0, 1, 1))
            a = new Vector3D(+w, 0, 0);
            b = new Vector3D(-w, 0, 0);
            this.makeLineMode(a, b, new Vector3D(1, 0, 0, 1))

            this.baseColor = new Vector3D(128 / 255, 128 / 255, 128 / 255, 1);
            for (var i = 1; i <= n; i++) {
                a = new Vector3D(+i * skeep, 0, +w);
                b = new Vector3D(+i * skeep, 0, -w);
                this.makeLineMode(a, b)
                a = new Vector3D(-i * skeep, 0, +w);
                b = new Vector3D(-i * skeep, 0, -w);
                this.makeLineMode(a, b)

                a = new Vector3D(+w, 0, +i * skeep);
                b = new Vector3D(-w, 0, +i * skeep);
                this.makeLineMode(a, b)
                a = new Vector3D(+w, 0, -i * skeep);
                b = new Vector3D(-w, 0, -i * skeep);
                this.makeLineMode(a, b)
            }

            this.upToGpu();

        }
    }
}