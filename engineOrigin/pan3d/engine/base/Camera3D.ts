module Pan3d {
    export class Camera3D extends Object3D {
        public cameraMatrix: Matrix3D;
        private _distance: number = 500;
        public lookAtTarget: Object3D;
        private _astarRect: Rectangle;
        public offset: Vector3D = new Vector3D();
        constructor() {
            super()
            this.cameraMatrix = new Matrix3D;

        }

        public get distance(): number {
            return this._distance;
        }

        public set distance(value: number) {
            this._distance = value;
        }

        public lookAt($target: Object3D): void {
            this.lookAtTarget = $target;
        }
        private _midPos: Vector3D;
        private _scaleVec: Vector3D;
        public set astarRect(value: Rectangle) {

            this._astarRect = new Rectangle();
            this._astarRect.x = value.x;
            this._astarRect.y = value.y;
            this._astarRect.width = value.width;
            this._astarRect.height = value.height;

            this._midPos = new Vector3D();
            this._midPos.x = this._astarRect.x + this._astarRect.width / 2
            this._midPos.z = this._astarRect.y + this._astarRect.height / 2


            this._scaleVec = new Vector3D();
            this._scaleVec.x = (this._astarRect.width - 100) / this._astarRect.width
            this._scaleVec.z = (this._astarRect.height - 100) / this._astarRect.height



        }
        private lastFoucs3D: Vector3D = new Vector3D
        public needChange: boolean = true
        public update(): void {
            if (this.lookAtTarget) {
                var ty: number = 28;
                if (this._astarRect && this._astarRect.width < 600) {
                    var $toPos: Vector3D = new Vector3D;
                    $toPos.x = ((this.lookAtTarget.px - this._midPos.x) * this._scaleVec.x) + this._midPos.x;
                    $toPos.z = ((this.lookAtTarget.pz - this._midPos.z) * this._scaleVec.z) + this._midPos.z;
                    $toPos.y = this.lookAtTarget.py;

                    Scene_data.focus3D.x = $toPos.x;
                    Scene_data.focus3D.y = $toPos.y + ty;
                    Scene_data.focus3D.z = $toPos.z;

                } else {
                    Scene_data.focus3D.x = this.lookAtTarget.px;
                    Scene_data.focus3D.y = this.lookAtTarget.py + ty;
                    Scene_data.focus3D.z = this.lookAtTarget.pz;
                }

                if (this.lastFoucs3D.x != Scene_data.focus3D.x || this.lastFoucs3D.y != Scene_data.focus3D.y || this.lastFoucs3D.z != Scene_data.focus3D.z) {
                    this.lastFoucs3D.x = Scene_data.focus3D.x;
                    this.lastFoucs3D.y = Scene_data.focus3D.y;
                    this.lastFoucs3D.z = Scene_data.focus3D.z;
                    this.needChange = true;
                } else {
                    this.needChange = false;
                }
                // Scene_data.focus3D.rotationY = Scene_data.gameAngle;
            }
        }


        public get postion(): Vector3D {
            return new Vector3D(this.x, this.y, this.z)
        }
    }
}