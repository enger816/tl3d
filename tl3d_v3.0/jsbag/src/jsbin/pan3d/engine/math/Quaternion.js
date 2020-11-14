var Pan3d;
(function (Pan3d) {
    var Quaternion = /** @class */ (function () {
        function Quaternion($x, $y, $z, $w) {
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
        Quaternion.prototype.print = function () {
            alert(String(this.x) + " " + String(this.y) + " " + String(this.z) + " " + String(this.w));
        };
        Quaternion.prototype.toEulerAngles = function (target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Pan3d.Vector3D;
            }
            var x = this.x, y = this.y, z = this.z, w = this.w;
            target.x = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
            target.y = Math.asin(2 * (w * y - z * x));
            target.z = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));
            return target;
        };
        Quaternion.prototype.toMatrix3D = function ($matrix3d) {
            if ($matrix3d === void 0) { $matrix3d = null; }
            if (!$matrix3d) {
                $matrix3d = new Pan3d.Matrix3D;
            }
            var out = $matrix3d.m;
            var x = this.x, y = this.y, z = this.z, w = this.w, x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, yx = y * x2, yy = y * y2, zx = z * x2, zy = z * y2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;
            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;
            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return $matrix3d;
        };
        Quaternion.prototype.fromAxisAngle = function (axis, angle) {
            var sin_a = Math.sin(angle / 2);
            var cos_a = Math.cos(angle / 2);
            this.x = axis.x * sin_a;
            this.y = axis.y * sin_a;
            this.z = axis.z * sin_a;
            this.w = cos_a;
            this.normalize();
        };
        Quaternion.prototype.normalize = function (val) {
            if (val === void 0) { val = 1; }
            var mag = val / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            this.x *= mag;
            this.y *= mag;
            this.z *= mag;
            this.w *= mag;
        };
        Quaternion.prototype.fromMatrix = function ($matrix) {
            var m = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            m[0] = $matrix.m[0];
            m[1] = $matrix.m[1];
            m[2] = $matrix.m[2];
            m[3] = $matrix.m[4];
            m[4] = $matrix.m[5];
            m[5] = $matrix.m[6];
            m[6] = $matrix.m[8];
            m[7] = $matrix.m[9];
            m[8] = $matrix.m[10];
            var fTrace = m[0] + m[4] + m[8];
            var fRoot;
            var out = [0, 0, 0, 0];
            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0); // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot; // 1/(4w)
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            }
            else {
                // |w| <= 1/2
                var i = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                var j = (i + 1) % 3;
                var k = (i + 2) % 3;
                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }
            this.x = out[0];
            this.y = out[1];
            this.z = out[2];
            this.w = out[3];
        };
        Quaternion.prototype.setMd5W = function () {
            this.w = 1 - (this.x * this.x + this.y * this.y + this.z * this.z);
            if (this.w < 0) {
                this.w = 0;
            }
            else {
                this.w = -Math.sqrt(this.w);
            }
        };
        Quaternion.prototype.slerp = function (qa, qb, t) {
            var w1 = qa.w, x1 = qa.x, y1 = qa.y, z1 = qa.z;
            var w2 = qb.w, x2 = qb.x, y2 = qb.y, z2 = qb.z;
            var dot = w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2;
            // shortest direction
            if (dot < 0) {
                dot = -dot;
                w2 = -w2;
                x2 = -x2;
                y2 = -y2;
                z2 = -z2;
            }
            if (dot < 0.95) {
                // interpolate angle linearly
                var angle = Math.acos(dot);
                var s = 1 / Math.sin(angle);
                var s1 = Math.sin(angle * (1 - t)) * s;
                var s2 = Math.sin(angle * t) * s;
                this.w = w1 * s1 + w2 * s2;
                this.x = x1 * s1 + x2 * s2;
                this.y = y1 * s1 + y2 * s2;
                this.z = z1 * s1 + z2 * s2;
            }
            else {
                // nearly identical angle, interpolate linearly
                this.w = w1 + t * (w2 - w1);
                this.x = x1 + t * (x2 - x1);
                this.y = y1 + t * (y2 - y1);
                this.z = z1 + t * (z2 - z1);
                var len = 1.0 / Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
                this.w *= len;
                this.x *= len;
                this.y *= len;
                this.z *= len;
            }
        };
        return Quaternion;
    }());
    Pan3d.Quaternion = Quaternion;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Quaternion.js.map