var Pan3d;
(function (Pan3d) {
    var QuadTreeNode = /** @class */ (function () {
        //public pointList: Array<Vector2D>;
        function QuadTreeNode($x, $y, $z, $width, $height, $depth) {
            this.x = $x;
            this.y = $y;
            this.z = $z;
            this.width = $width;
            this.height = $height;
            this.depth = $depth;
            //this.pointList = new Array;
            //this.pointList.push(new Vector2D(this.x, this.y));
            //this.pointList.push(new Vector2D(this.x + this.width, this.y));
            //this.pointList.push(new Vector2D(this.x + this.width, this.y + this.height));
            //this.pointList.push(new Vector2D(this.x, this.y + this.height));
        }
        QuadTreeNode.prototype.testViewFrustum = function (face, ray) {
            if (this.sun && this.sun.length == 1) {
                this.sun[0].testViewFrustum(face, ray);
                return;
            }
            if (this.testViewFrustumResult(face)) {
                if (this.target) {
                    if (this.target.isPerspective) {
                        if (!this.testRay(ray)) {
                            this.target.sceneVisible = true;
                        }
                    }
                    else {
                        this.target.sceneVisible = true;
                    }
                }
                if (this.sun) {
                    for (var i = 0; i < this.sun.length; i++) {
                        this.sun[i].testViewFrustum(face, ray);
                    }
                }
            }
        };
        QuadTreeNode.prototype.testViewFrustumResult = function (face) {
            var pos = new Pan3d.Vector3D(this.x, this.y, this.z);
            var whd = new Pan3d.Vector3D(this.width, this.height, this.depth);
            var bInSide = true;
            for (var j = 0; j < face.length; j++) {
                var vcMin = pos;
                var vcMax = pos.add(whd);
                var _vcMax = new Pan3d.Vector3D();
                // var _vcMin: Vector3D = new Vector3D();
                if (face[j].x > 0) {
                    _vcMax.x = vcMax.x;
                    //_vcMin.x = vcMin.x;
                }
                else {
                    //_vcMin.x = vcMax.x;
                    _vcMax.x = vcMin.x;
                }
                if (face[j].y > 0) {
                    _vcMax.y = vcMax.y;
                    //_vcMin.y = vcMin.y;
                }
                else {
                    //_vcMin.y = vcMax.y;
                    _vcMax.y = vcMin.y;
                }
                if (face[j].z > 0) {
                    _vcMax.z = vcMax.z;
                    //_vcMin.z = vcMin.z;
                }
                else {
                    //_vcMin.z = vcMax.z;
                    _vcMax.z = vcMin.z;
                }
                var num = face[j].dot(_vcMax) + face[j].w;
                if (num < 0) {
                    bInSide = false;
                    break;
                }
            }
            return bInSide;
        };
        QuadTreeNode.prototype.testRay = function (ray) {
            var ox = ray.o.x;
            var oy = ray.o.y;
            var oz = ray.o.z;
            var dx = ray.d.x;
            var dy = ray.d.y;
            var dz = ray.d.z;
            var tx_min, ty_min, tz_min;
            var tx_max, ty_max, tz_max;
            var x0 = this.x;
            var y0 = this.y;
            var z0 = this.z;
            var x1 = this.x + this.width;
            var y1 = this.y + this.height;
            var z1 = this.z + this.depth;
            var a = 1.0 / dx;
            if (a >= 0) {
                tx_min = (x0 - ox) * a;
                tx_max = (x1 - ox) * a;
            }
            else {
                tx_min = (x1 - ox) * a;
                tx_max = (x0 - ox) * a;
            }
            var b = 1.0 / dy;
            if (b >= 0) {
                ty_min = (y0 - oy) * b;
                ty_max = (y1 - oy) * b;
            }
            else {
                ty_min = (y1 - oy) * b;
                ty_max = (y0 - oy) * b;
            }
            var c = 1.0 / dz;
            if (c >= 0) {
                tz_min = (z0 - oz) * c;
                tz_max = (z1 - oz) * c;
            }
            else {
                tz_min = (z1 - oz) * c;
                tz_max = (z0 - oz) * c;
            }
            var t0, t1;
            // find largest entering t value
            if (tx_min > ty_min)
                t0 = tx_min;
            else
                t0 = ty_min;
            if (tz_min > t0)
                t0 = tz_min;
            // find smallest exiting t value
            if (tx_max < ty_max)
                t1 = tx_max;
            else
                t1 = ty_max;
            if (tz_max < t1)
                t1 = tz_max;
            var kEpsilon = 0.0001;
            var tmin = 0;
            if (t0 < t1 && t1 > kEpsilon) { // condition for a hit
                if (t0 > kEpsilon) {
                    tmin = t0; // ray hits outside surface
                }
                else {
                    tmin = t1; // ray hits inside surface
                }
                if (tmin < ray.baseT) {
                    return true;
                }
            }
            else
                return false;
        };
        return QuadTreeNode;
    }());
    Pan3d.QuadTreeNode = QuadTreeNode;
    var Ray = /** @class */ (function () {
        function Ray() {
            this.o = new Pan3d.Vector3D;
            this.d = new Pan3d.Vector3D;
            this.baseT = 500;
        }
        Ray.prototype.setPos = function (x, y, z) {
            this.o.x = x;
            this.o.y = y;
            this.o.z = z;
        };
        Ray.prototype.setTarget = function (x, y, z) {
            this.d.x = x - this.o.x;
            this.d.y = y - this.o.y;
            this.d.z = z - this.o.z;
            this.d.normalize();
        };
        return Ray;
    }());
    Pan3d.Ray = Ray;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=QuadTreeNode.js.map