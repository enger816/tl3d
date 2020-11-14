module Pan3d {
    export class Object3D extends EventDispatcher {
        protected _x: number;
        protected _y: number;
        protected _z: number;

        public rx: number;
        public ry: number;
        public rz: number;

        protected _scaleX: number;
        protected _scaleY: number;
        protected _scaleZ: number;

        protected _rotationX: number;
        protected _rotationY: number;
        protected _rotationZ: number;

        public posMatrix: Matrix3D;

        constructor($x: number = 0, $y: number = 0, $z: number = 0) {
            super();
            this._x = $x;
            this._y = $y;
            this._z = $z;
            this._scaleX = 1;
            this._scaleY = 1;
            this._scaleZ = 1;
            this._rotationX = 0;
            this._rotationY = 0;
            this._rotationZ = 0;
            this.posMatrix = new Matrix3D;
        }
        public toStringout(): String {
            return "Object3D(" + String(this._x) + "," + String(this._y) + "," + String(this._z) + ")";
        }
        public set x(value: number) {
            this._x = value;
            this.updateMatrix()
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.updateMatrix()
        }
        public get y(): number {
            return this._y
        }
        public set z(value: number) {
            this._z = value;
            this.updateMatrix()
        }
        public get z(): number {
            return this._z
        }

        public set scale(value: number) {
            this._scaleX = this._scaleY = this._scaleZ = value;
            this.updateMatrix();


        }

        public set scaleX(value: number) {
            this._scaleX = value;
            this.updateMatrix()
        }
        public get scaleX(): number {
            return this._scaleX
        }
        public set scaleY(value: number) {
            this._scaleY = value;
            this.updateMatrix()
        }
        public get scaleY(): number {
            return this._scaleY
        }
        public set scaleZ(value: number) {
            this._scaleZ = value;
            this.updateMatrix()
        }
        public get scaleZ(): number {
            return this._scaleZ
        }

        public set rotationX(value: number) {
            this._rotationX = value;
            this.updateMatrix();
            this.updateRotationMatrix();
        }
        public get rotationX(): number {
            return this._rotationX
        }
        public set rotationY(value: number) {
            this._rotationY = value;
            this.updateMatrix();
            this.updateRotationMatrix();
        }
        public get rotationY(): number {
            return this._rotationY
        }
        public set rotationZ(value: number) {
            this._rotationZ = value;
            this.updateMatrix();
            this.updateRotationMatrix();
        }
        public get rotationZ(): number {
            return this._rotationZ;
        }

        public get px(): number { return 0; }
        public set px(val: number) { }
        public get py(): number { return 0; }
        public set py(val: number) { }
        public get pz(): number { return 0; }
        public set pz(val: number) { }

        public updateMatrix(): void {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
            this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS)
            this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS)
            this.posMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS)
            this.posMatrix.appendTranslation(this._x, this._y, this._z);
        }

        public updateRotationMatrix(): void {

        }

    }






}