var Pan3d;
(function (Pan3d) {
    var Vector3D = /** @class */ (function () {
        function Vector3D($x, $y, $z, $w) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            if ($w === void 0) { $w = 1; }
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
            this.x = $x;
            this.y = $y;
            this.z = $z;
            this.w = $w;
        }
        Vector3D.prototype.normalize = function () {
            var le = this.length;
            if (le == 0) {
                return;
            }
            this.scaleBy(1 / le);
        };
        Object.defineProperty(Vector3D.prototype, "length", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            },
            enumerable: true,
            configurable: true
        });
        Vector3D.prototype.scaleBy = function (value) {
            this.x *= value;
            this.y *= value;
            this.z *= value;
            this.w *= value;
        };
        Vector3D.prototype.divideScalar = function (value) {
            if (value != 0) {
                this.x = this.x / value;
                this.y = this.y / value;
                this.z = this.z / value;
            }
            else {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }
        };
        Vector3D.prototype.distanceToSquared = function (v) {
            return Vector3D.distance(this, v);
        };
        Vector3D.prototype.scaleByW = function () {
            this.x *= this.w;
            this.y *= this.w;
            this.z *= this.w;
        };
        Vector3D.prototype.add = function (value) {
            return new Vector3D(this.x + value.x, this.y + value.y, this.z + value.z);
        };
        Vector3D.prototype.subtract = function (value) {
            return new Vector3D(this.x - value.x, this.y - value.y, this.z - value.z);
        };
        Vector3D.prototype.addByNum = function ($x, $y, $z, $w) {
            if ($w === void 0) { $w = 0; }
            this.x += $x;
            this.y += $y;
            this.z += $z;
            this.w += $w;
        };
        Vector3D.prototype.setTo = function ($x, $y, $z) {
            this.x = $x;
            this.y = $y;
            this.z = $z;
        };
        Vector3D.prototype.setByte = function (byte) {
            this.x = byte.readFloat();
            this.y = byte.readFloat();
            this.z = byte.readFloat();
        };
        Vector3D.prototype.cross = function (value) {
            return new Vector3D(this.y * value.z - this.z * value.y, this.z * value.x - this.x * value.z, this.x * value.y - this.y * value.x);
        };
        Vector3D.prototype.dot = function (value) {
            return this.x * value.x + this.y * value.y + this.z * value.z;
        };
        Vector3D.prototype.clone = function () {
            return new Vector3D(this.x, this.y, this.z);
        };
        Vector3D.distance = function (v1, v2) {
            var x1 = v1.x - v2.x;
            var y1 = v1.y - v2.y;
            var z1 = v1.z - v2.z;
            return Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
        };
        Vector3D.prototype.toString = function () {
            return "Vector3D(" + String(this.x) + "," + String(this.y) + "," + String(this.z) + "," + String(this.w) + ")";
        };
        Vector3D.dotMulVector = function (a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        };
        Vector3D.getNrmByTwoVect = function (v0, v1) {
            var nrm3d = v1.subtract(v0);
            nrm3d.normalize();
            return nrm3d;
        };
        Vector3D.calTriNormal = function (v0, v1, v2, isNormallize) {
            if (isNormallize === void 0) { isNormallize = false; }
            var p1 = v1.subtract(v0);
            var p2 = v2.subtract(v1);
            var nrmVec = p1.cross(p2);
            if (isNormallize) {
                nrmVec.normalize();
            }
            return nrmVec;
        };
        /**
         *  根据三个点确定的平面球 另外一点在面的垂足
         * @param targetPoint
         * @param a
         * @param b
         * @param c
         * @return
         *
         */
        Vector3D.getPointPedalInPlane = function (targetPoint, a, b, c) {
            var planeNomal = this.calTriNormal(a, b, c, true);
            var plane = [];
            plane.push(a, b, c);
            return this.getProjPosition(planeNomal, targetPoint, plane);
        };
        /**
         * p点在三角形b确定的平面内的投影坐标点
         * @param bNomal
         * @param p
         * @param b
         * @return
         *
         */
        Vector3D.getProjPosition = function (bNomal, targetPoint, bTriPlane) {
            var checkPoint = targetPoint;
            var pedal = (bNomal.x * (bTriPlane[0].x - checkPoint.x) + bNomal.y * (bTriPlane[0].y - checkPoint.y) + bNomal.z * (bTriPlane[0].z - checkPoint.z)) / (bNomal.x * bNomal.x + bNomal.y * bNomal.y + bNomal.z * bNomal.z);
            var pedalVector3d = new Vector3D(checkPoint.x + pedal * bNomal.x, checkPoint.y + pedal * bNomal.y, checkPoint.z + pedal * bNomal.z);
            return pedalVector3d;
        };
        Vector3D.X_AXIS = new Vector3D(1, 0, 0);
        Vector3D.Y_AXIS = new Vector3D(0, 1, 0);
        Vector3D.Z_AXIS = new Vector3D(0, 0, 1);
        return Vector3D;
    }());
    Pan3d.Vector3D = Vector3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Vector3D.js.map