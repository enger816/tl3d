var Pan3d;
(function (Pan3d) {
    var Matrix3D = /** @class */ (function () {
        function Matrix3D() {
            this.isIdentity = true;
            var mk = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            this.m = new Float32Array(mk);
        }
        Matrix3D.prototype.clone = function ($target) {
            if ($target === void 0) { $target = null; }
            //var $target: Matrix3D = new Matrix3D;
            if (!$target) {
                $target = new Matrix3D;
            }
            $target.m[0] = this.m[0];
            $target.m[1] = this.m[1];
            $target.m[2] = this.m[2];
            $target.m[3] = this.m[3];
            $target.m[4] = this.m[4];
            $target.m[5] = this.m[5];
            $target.m[6] = this.m[6];
            $target.m[7] = this.m[7];
            $target.m[8] = this.m[8];
            $target.m[9] = this.m[9];
            $target.m[10] = this.m[10];
            $target.m[11] = this.m[11];
            $target.m[12] = this.m[12];
            $target.m[13] = this.m[13];
            $target.m[14] = this.m[14];
            $target.m[15] = this.m[15];
            return $target;
        };
        Object.defineProperty(Matrix3D.prototype, "position", {
            get: function () {
                return new Pan3d.Vector3D(this.m[12], this.m[13], this.m[14], this.m[15]);
            },
            enumerable: true,
            configurable: true
        });
        Matrix3D.prototype.copyTo = function ($target) {
            $target.m[0] = this.m[0];
            $target.m[1] = this.m[1];
            $target.m[2] = this.m[2];
            $target.m[3] = this.m[3];
            $target.m[4] = this.m[4];
            $target.m[5] = this.m[5];
            $target.m[6] = this.m[6];
            $target.m[7] = this.m[7];
            $target.m[8] = this.m[8];
            $target.m[9] = this.m[9];
            $target.m[10] = this.m[10];
            $target.m[11] = this.m[11];
            $target.m[12] = this.m[12];
            $target.m[13] = this.m[13];
            $target.m[14] = this.m[14];
            $target.m[15] = this.m[15];
        };
        Matrix3D.prototype.identity = function () {
            this.m[0] = 1;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
            this.m[4] = 0;
            this.m[5] = 1;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = 1;
            this.m[11] = 0;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        };
        Matrix3D.prototype.invert = function () {
            var a = this.m;
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, 
            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            this.m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            this.m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            this.m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            this.m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            this.m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            this.m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            this.m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            this.m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            this.m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            this.m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            this.m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            this.m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            this.m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            this.m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            this.m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            this.m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        };
        Matrix3D.prototype.invertToMatrix = function ($target) {
            var a = this.m;
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, 
            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            $target.m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            $target.m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            $target.m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            $target.m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            $target.m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            $target.m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            $target.m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            $target.m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            $target.m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            $target.m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            $target.m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            $target.m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            $target.m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            $target.m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            $target.m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            $target.m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        };
        Matrix3D.prototype.appendTranslation = function (x, y, z) {
            Matrix3D.tempM.identity();
            Matrix3D.tempM.prependTranslation(x, y, z);
            this.append(Matrix3D.tempM);
        };
        Matrix3D.prototype.prependTranslation = function (x, y, z) {
            var out = this.m;
            out[12] = out[0] * x + out[4] * y + out[8] * z + out[12];
            out[13] = out[1] * x + out[5] * y + out[9] * z + out[13];
            out[14] = out[2] * x + out[6] * y + out[10] * z + out[14];
            out[15] = out[3] * x + out[7] * y + out[11] * z + out[15];
        };
        Matrix3D.prototype.transformVector = function ($p) {
            var out = new Pan3d.Vector3D;
            out.x = this.m[0] * $p.x + this.m[4] * $p.y + this.m[8] * $p.z + this.m[12] * $p.w;
            out.y = this.m[1] * $p.x + this.m[5] * $p.y + this.m[9] * $p.z + this.m[13] * $p.w;
            out.z = this.m[2] * $p.x + this.m[6] * $p.y + this.m[10] * $p.z + this.m[14] * $p.w;
            out.w = this.m[3] * $p.x + this.m[7] * $p.y + this.m[11] * $p.z + this.m[15] * $p.w;
            return out;
        };
        Matrix3D.prototype.append = function ($matrx3d) {
            Matrix3D.tempM.m[0] = $matrx3d.m[0];
            Matrix3D.tempM.m[1] = $matrx3d.m[1];
            Matrix3D.tempM.m[2] = $matrx3d.m[2];
            Matrix3D.tempM.m[3] = $matrx3d.m[3];
            Matrix3D.tempM.m[4] = $matrx3d.m[4];
            Matrix3D.tempM.m[5] = $matrx3d.m[5];
            Matrix3D.tempM.m[6] = $matrx3d.m[6];
            Matrix3D.tempM.m[7] = $matrx3d.m[7];
            Matrix3D.tempM.m[8] = $matrx3d.m[8];
            Matrix3D.tempM.m[9] = $matrx3d.m[9];
            Matrix3D.tempM.m[10] = $matrx3d.m[10];
            Matrix3D.tempM.m[11] = $matrx3d.m[11];
            Matrix3D.tempM.m[12] = $matrx3d.m[12];
            Matrix3D.tempM.m[13] = $matrx3d.m[13];
            Matrix3D.tempM.m[14] = $matrx3d.m[14];
            Matrix3D.tempM.m[15] = $matrx3d.m[15];
            Matrix3D.tempM.prepend(this);
            this.m[0] = Matrix3D.tempM.m[0];
            this.m[1] = Matrix3D.tempM.m[1];
            this.m[2] = Matrix3D.tempM.m[2];
            this.m[3] = Matrix3D.tempM.m[3];
            this.m[4] = Matrix3D.tempM.m[4];
            this.m[5] = Matrix3D.tempM.m[5];
            this.m[6] = Matrix3D.tempM.m[6];
            this.m[7] = Matrix3D.tempM.m[7];
            this.m[8] = Matrix3D.tempM.m[8];
            this.m[9] = Matrix3D.tempM.m[9];
            this.m[10] = Matrix3D.tempM.m[10];
            this.m[11] = Matrix3D.tempM.m[11];
            this.m[12] = Matrix3D.tempM.m[12];
            this.m[13] = Matrix3D.tempM.m[13];
            this.m[14] = Matrix3D.tempM.m[14];
            this.m[15] = Matrix3D.tempM.m[15];
            /*
            var $mat: Matrix3D = $matrx3d.clone();
            $mat.prepend(this);
    
            this.m[0] = $mat.m[0];
            this.m[1] = $mat.m[1];
            this.m[2] = $mat.m[2];
            this.m[3] = $mat.m[3];
            this.m[4] = $mat.m[4];
            this.m[5] = $mat.m[5];
            this.m[6] = $mat.m[6];
            this.m[7] = $mat.m[7];
            this.m[8] = $mat.m[8];
            this.m[9] = $mat.m[9];
            this.m[10] = $mat.m[10];
            this.m[11] = $mat.m[11];
            this.m[12] = $mat.m[12];
            this.m[13] = $mat.m[13];
            this.m[14] = $mat.m[14];
            this.m[15] = $mat.m[15];
            */
        };
        Matrix3D.prototype.prepend = function ($matrx3d) {
            var b = $matrx3d.m;
            var out = this.m;
            var a = this.m;
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            // Cache only the current line of the second matrix
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        };
        Matrix3D.prototype.appendRotation = function (rad, axis) {
            Matrix3D.tempM.identity();
            Matrix3D.tempM.prependRotation(rad, axis);
            this.append(Matrix3D.tempM);
        };
        Matrix3D.prototype.tomat3 = function () {
            var mk = Array.prototype.concat.apply([], arguments);
            mk = [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ];
            var b = new Float32Array(mk);
            b[0] = this.m[0];
            b[1] = this.m[1];
            b[2] = this.m[2];
            b[3] = this.m[4];
            b[4] = this.m[5];
            b[5] = this.m[6];
            b[6] = this.m[8];
            b[7] = this.m[9];
            b[8] = this.m[10];
            return b;
        };
        Matrix3D.prototype.getRotaionM33 = function (b) {
            b[0] = this.m[0];
            b[1] = this.m[1];
            b[2] = this.m[2];
            b[3] = this.m[4];
            b[4] = this.m[5];
            b[5] = this.m[6];
            b[6] = this.m[8];
            b[7] = this.m[9];
            b[8] = this.m[10];
        };
        Matrix3D.prototype.identityScale = function () {
            /*
                  var M: Matrix3D = new Matrix3D
                  var ro: Vector3D = this.toEulerAngles();
                  M.appendRotation(ro.x , Vector3D.X_AXIS);
                  M.appendRotation(ro.y , Vector3D.Y_AXIS);
                  M.appendRotation(ro.z , Vector3D.Z_AXIS);
                  M.appendTranslation(this.position.x,this.position.y, this.position.z)
                  this.m = M.m;
               */
        };
        Matrix3D.prototype.identityPostion = function () {
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
        };
        Object.defineProperty(Matrix3D.prototype, "x", {
            get: function () {
                return this.m[12];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3D.prototype, "y", {
            get: function () {
                return this.m[13];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3D.prototype, "z", {
            get: function () {
                return this.m[14];
            },
            enumerable: true,
            configurable: true
        });
        Matrix3D.prototype.prependRotation = function (rad, axis) {
            var out = this.m;
            var a = this.m;
            var x = axis.x, y = axis.y, z = axis.z, len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
            if (Math.abs(len) < 0.000001) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad * Math.PI / 180);
            c = Math.cos(rad * Math.PI / 180);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) { // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        };
        Matrix3D.prototype.prependScale = function (x, y, z) {
            var a = this.m;
            var out = this.m;
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };
        ;
        Matrix3D.prototype.appendScale = function (x, y, z) {
            Matrix3D.tempM.identity();
            Matrix3D.tempM.prependScale(x, y, z);
            this.append(Matrix3D.tempM);
        };
        Matrix3D.prototype.perspectiveFieldOfViewLH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var xScale = yScale / aspectRatio;
            var out = this.m;
            out[0] = xScale;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = yScale;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = zFar / (zFar - zNear);
            out[11] = 1;
            out[12] = 0;
            out[13] = 0;
            out[14] = (zNear * zFar) / (zNear - zFar);
            out[15] = 0;
            /*
              public function perspectiveFieldOfViewLH(fieldOfViewY:Number,
                                                     aspectRatio:Number,
                                                     zNear:Number,
                                                     zFar:Number):void {
                var yScale:Number = 1.0/Math.tan(fieldOfViewY/2.0);
                var xScale:Number = yScale / aspectRatio;
                this.copyRawDataFrom(Vector.<Number>([
                    xScale, 0.0, 0.0, 0.0,
                    0.0, yScale, 0.0, 0.0,
                    0.0, 0.0, zFar/(zFar-zNear), 1.0,
                    0.0, 0.0, (zNear*zFar)/(zNear-zFar), 0.0
                ]));
            }
    
            */
        };
        Matrix3D.prototype.fromVtoV = function ($basePos, $newPos) {
            var axis = $basePos.cross($newPos);
            axis.normalize();
            var angle = Math.acos($basePos.dot($newPos));
            var q = new Pan3d.Quaternion();
            q.fromAxisAngle(axis, angle);
            q.toMatrix3D(this);
        };
        Matrix3D.prototype.buildLookAtLH = function (eyePos, lookAt, up) {
            var out = this.m;
            var zaxis = new Pan3d.Vector3D;
            zaxis.x = lookAt.x - eyePos.x;
            zaxis.y = lookAt.y - eyePos.y;
            zaxis.z = lookAt.z - eyePos.z;
            zaxis.normalize();
            var xaxis = up.cross(zaxis);
            xaxis.normalize();
            var yaxis = zaxis.cross(xaxis);
            out[0] = xaxis.x;
            out[1] = yaxis.x;
            out[2] = zaxis.x;
            out[3] = 0.0;
            out[4] = xaxis.y;
            out[5] = yaxis.y;
            out[6] = zaxis.y;
            out[7] = 0.0;
            out[8] = xaxis.z;
            out[9] = yaxis.z;
            out[10] = zaxis.z;
            out[11] = 0.0;
            out[12] = -xaxis.dot(eyePos);
            out[13] = -yaxis.dot(eyePos);
            out[14] = -zaxis.dot(eyePos);
            out[15] = 1.0;
        };
        Matrix3D.mul = function (a, b, c) {
            var d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], k = b[5], l = b[6], m = b[7], n = b[8], r = b[9], p = b[10], q = b[11], u = b[12], s = b[13], z = b[14];
            b = b[15];
            var t = c[0], v = c[1], w = c[2], x = c[3];
            a[0] = t * d + v * h + w * n + x * u;
            a[1] = t * e + v * k + w * r + x * s;
            a[2] = t * f + v * l + w * p + x * z;
            a[3] = t * g + v * m + w * q + x * b;
            t = c[4];
            v = c[5];
            w = c[6];
            x = c[7];
            a[4] = t * d + v * h + w * n + x * u;
            a[5] = t * e + v * k + w * r + x * s;
            a[6] = t * f + v * l + w * p + x * z;
            a[7] = t * g + v * m + w * q + x * b;
            t = c[8];
            v = c[9];
            w = c[10];
            x = c[11];
            a[8] = t * d + v * h + w * n + x * u;
            a[9] = t * e + v * k + w * r + x * s;
            a[10] = t * f + v * l + w * p + x * z;
            a[11] =
                t * g + v * m + w * q + x * b;
            t = c[12];
            v = c[13];
            w = c[14];
            x = c[15];
            a[12] = t * d + v * h + w * n + x * u;
            a[13] = t * e + v * k + w * r + x * s;
            a[14] = t * f + v * l + w * p + x * z;
            a[15] = t * g + v * m + w * q + x * b;
            return a;
        };
        Matrix3D.prototype.toEulerAngles = function () {
            var $q = new Pan3d.Quaternion();
            $q.fromMatrix(this);
            var v3d = $q.toEulerAngles();
            v3d.scaleBy(180 / Math.PI);
            return v3d;
        };
        Matrix3D.prototype.getRotationing = function () {
            var out = [0, 0, 0, 0];
            var scaling = this.getScaling();
            var is1 = 1 / scaling.x;
            var is2 = 1 / scaling.y;
            var is3 = 1 / scaling.z;
            var sm11 = this.m[0] * is1;
            var sm12 = this.m[1] * is2;
            var sm13 = this.m[2] * is3;
            var sm21 = this.m[4] * is1;
            var sm22 = this.m[5] * is2;
            var sm23 = this.m[6] * is3;
            var sm31 = this.m[8] * is1;
            var sm32 = this.m[9] * is2;
            var sm33 = this.m[10] * is3;
            var ccav = sm11 + sm22 + sm33;
            var S = 0;
            if (ccav > 0) {
                S = Math.sqrt(ccav + 1.0) * 2;
                out[3] = 0.25 * S;
                out[0] = (sm23 - sm32) / S;
                out[1] = (sm31 - sm13) / S;
                out[2] = (sm12 - sm21) / S;
            }
            else if ((sm11 > sm22) && (sm11 > sm33)) {
                S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
                out[3] = (sm23 - sm32) / S;
                out[0] = 0.25 * S;
                out[1] = (sm12 + sm21) / S;
                out[2] = (sm31 + sm13) / S;
            }
            else if (sm22 > sm33) {
                S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
                out[3] = (sm31 - sm13) / S;
                out[0] = (sm12 + sm21) / S;
                out[1] = 0.25 * S;
                out[2] = (sm23 + sm32) / S;
            }
            else {
                S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
                out[3] = (sm12 - sm21) / S;
                out[0] = (sm31 + sm13) / S;
                out[1] = (sm23 + sm32) / S;
                out[2] = 0.25 * S;
            }
            return new Pan3d.Vector3D(out[0], out[1], out[2], out[3]);
        };
        Matrix3D.prototype.getScaling = function () {
            //   http://glmatrix.net/
            var m11 = this.m[0];
            var m12 = this.m[1];
            var m13 = this.m[2];
            var m21 = this.m[4];
            var m22 = this.m[5];
            var m23 = this.m[6];
            var m31 = this.m[8];
            var m32 = this.m[9];
            var m33 = this.m[10];
            var a = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
            var b = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
            var c = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
            return new Pan3d.Vector3D(a, b, c);
        };
        Matrix3D.tempM = new Matrix3D();
        return Matrix3D;
    }());
    Pan3d.Matrix3D = Matrix3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Matrix3D.js.map