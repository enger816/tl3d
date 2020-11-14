module Pan3d {
    export class BitMapData {
        public width: number;
        public height: number;
        public imgData: ImageData
        constructor($w: number, $h: number) {
            this.width = $w;
            this.height = $h;
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(this.width, this.height, false);
            this.imgData = $ctx.getImageData(0, 0, this.width, this.height);

            for (var k = 0; k < this.imgData.data.length; k += 4) {
                this.imgData.data[k + 0] = 255;
                this.imgData.data[k + 1] = 255;
                this.imgData.data[k + 2] = 255;
                this.imgData.data[k + 3] = 255;
            }
        }
        private getIndexByPos($tx, $ty): number {
            var a: number = $ty * this.width + $tx
            return 4 * a;
        }
        public setRgb($tx: number, $ty: number, $ve: Vector3D): void {
            $tx = Math.round($tx)
            $ty = Math.round($ty)
            var $idx: number = this.getIndexByPos($tx, $ty);
            this.imgData.data[$idx + 0] = $ve.x * 255;
            this.imgData.data[$idx + 1] = $ve.y * 255;
            this.imgData.data[$idx + 2] = $ve.z * 255;
            this.imgData.data[$idx + 3] = 255;
        }
        public getRgb($tx: number, $ty: number): Vector3D {
            $tx = Math.round($tx)
            $ty = Math.round($ty)
            var $v: Vector3D = new Vector3D()
            var $idx: number = this.getIndexByPos($tx, $ty);
            $v.x = this.imgData.data[$idx + 0] / 255;
            $v.y = this.imgData.data[$idx + 1] / 255;
            $v.z = this.imgData.data[$idx + 2] / 255;
            $v.w = 1;

            return $v;
        }

    }
}