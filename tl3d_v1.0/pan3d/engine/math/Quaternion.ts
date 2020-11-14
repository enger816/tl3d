module Pan3d {
    export class Quaternion {
        x: number = 0;
        y: number = 0;
        z: number = 0;
        w: number = 1;
        constructor($x: number = 0, $y: number = 0, $z: number = 0, $w: number = 1) {
            this.x = $x;
            this.y = $y;
            this.z = $z;
            this.w = $w;
        }
        public print(): void {
            alert(String(this.x) + " " + String(this.y) + " " + String(this.z) + " " + String(this.w))
        }
        public toEulerAngles(target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D
            }
            var x: number = this.x, y: number = this.y, z: number = this.z, w: number = this.w;
            target.x = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
            target.y = Math.asin(2 * (w * y - z * x));
            target.z = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));
            return target;




        }
        public toMatrix3D($matrix3d: Matrix3D = null): Matrix3D {
            if (!$matrix3d) {
                $matrix3d = new Matrix3D;
            }

            var out: any = $matrix3d.m
            var x: number = this.x, y: number = this.y, z: number = this.z, w: number = this.w,
                x2: number = x + x,
                y2: number = y + y,
                z2: number = z + z,

                xx: number = x * x2,
                yx: number = y * x2,
                yy: number = y * y2,
                zx: number = z * x2,
                zy: number = z * y2,
                zz: number = z * z2,
                wx: number = w * x2,
                wy: number = w * y2,
                wz: number = w * z2;

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

            return $matrix3d
        }

        public fromAxisAngle(axis: Vector3D, angle: number): void {
            var sin_a: number = Math.sin(angle / 2);
            var cos_a: number = Math.cos(angle / 2);

            this.x = axis.x * sin_a;
            this.y = axis.y * sin_a;
            this.z = axis.z * sin_a;
            this.w = cos_a;
            this.normalize();
        }

        public normalize(val: number = 1): void {
            var mag: number = val / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

            this.x *= mag;
            this.y *= mag;
            this.z *= mag;
            this.w *= mag;
        }

        public fromMatrix($matrix: Matrix3D): void {

            var m: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            m[0] = $matrix.m[0]
            m[1] = $matrix.m[1]
            m[2] = $matrix.m[2]

            m[3] = $matrix.m[4]
            m[4] = $matrix.m[5]
            m[5] = $matrix.m[6]


            m[6] = $matrix.m[8]
            m[7] = $matrix.m[9]
            m[8] = $matrix.m[10]



            var fTrace: number = m[0] + m[4] + m[8];
            var fRoot: number;
            var out: any = [0, 0, 0, 0];

            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0);  // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;  // 1/(4w)
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            } else {
                // |w| <= 1/2
                var i: number = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                var j: number = (i + 1) % 3;
                var k: number = (i + 2) % 3;

                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }

            this.x = out[0]
            this.y = out[1]
            this.z = out[2]
            this.w = out[3]

        }

        public setMd5W(): void {
            this.w = 1 - (this.x * this.x + this.y * this.y + this.z * this.z);
            if (this.w < 0) {
                this.w = 0
            } else {
                this.w = -Math.sqrt(this.w);
            }

        }

        public slerp(qa: Quaternion, qb: Quaternion, t: number): void {
            var w1: number = qa.w, x1: number = qa.x, y1: number = qa.y, z1: number = qa.z;
            var w2: number = qb.w, x2: number = qb.x, y2: number = qb.y, z2: number = qb.z;
            var dot: number = w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2;

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
                var angle: number = Math.acos(dot);
                var s: number = 1 / Math.sin(angle);
                var s1: number = Math.sin(angle * (1 - t)) * s;
                var s2: number = Math.sin(angle * t) * s;
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
                var len: number = 1.0 / Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
                this.w *= len;
                this.x *= len;
                this.y *= len;
                this.z *= len;
            }
        }

    }
}