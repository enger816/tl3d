var Pan3d;
(function (Pan3d) {
    var ViewFrustum = /** @class */ (function () {
        function ViewFrustum() {
        }
        ViewFrustum.prototype.init = function () {
            this.capsuleLineSprite = new Pan3d.LineDisplaySprite();
            Pan3d.SceneManager.getInstance().addDisplay(this.capsuleLineSprite);
        };
        ViewFrustum.prototype.setCam = function () {
            var m = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
            m.append(Pan3d.Scene_data.viewMatrx3D);
            var a = m.m;
            var a11 = a[0], a12 = a[1], a13 = a[2], a14 = a[3], a21 = a[4], a22 = a[5], a23 = a[6], a24 = a[7], a31 = a[8], a32 = a[9], a33 = a[10], a34 = a[11], a41 = a[12], a42 = a[13], a43 = a[14], a44 = a[15];
            this.panleAry = new Array;
            var farp = this.getPanle(-a31 + a41, -a32 + a42, -a33 + a43, -a34 + a44);
            var bottom = this.getPanle(a21 + a41, a22 + a42, a23 + a43, a24 + a44);
            var top = this.getPanle(-a21 + a41, -a22 + a42, -a23 + a43, -a24 + a44);
            var left = this.getPanle(a11 + a41, a12 + a42, a13 + a43, a14 + a44);
            var right = this.getPanle(-a11 + a41, -a12 + a42, -a13 + a43, -a14 + a44);
            //this.panleAry.push(top,right,bottom,left);
            ////console.log("------------");
            //for (var i: number = 0; i < this.panleAry.length; i++){
            //    var p: Vector3D = this.panleAry[i];
            //    //p.normalize();
            //    var num: number = p.x * Scene_data.cam3D.x + p.y * Scene_data.cam3D.y + p.z * Scene_data.cam3D.z;
            //    num = num - p.w;
            //    //console.log(num); 
            //}
        };
        ViewFrustum.prototype.getPanle = function (a, b, c, d) {
            var normal = new Pan3d.Vector3D(a, b, c, d);
            normal.normalize();
            return normal;
        };
        ViewFrustum.prototype.getPanelByVec = function (v1, v2, v3) {
            var a1 = v2.subtract(v1);
            var a2 = v3.subtract(v1);
            a1 = a1.cross(a2);
            a1.normalize();
            a1.w = -a1.dot(v1);
            return a1;
        };
        ViewFrustum.prototype.setData = function (obj) {
            this.dataAry = obj;
        };
        ViewFrustum.prototype.setViewFrustum = function () {
            if (!this.capsuleLineSprite) {
                this.init();
            }
            this.setCam();
            this.capsuleLineSprite.clear();
            this.capsuleLineSprite.baseColor = new Pan3d.Vector3D(0, 0, 1, 1);
            Pan3d.MathClass.GetViewHitBoxDataCopy(Pan3d.Scene_data.cam3D.distance);
            var cam = new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z);
            var vc = Pan3d.MathClass.viewBoxVecItem;
            this.panleAry.push(this.getPanelByVec(cam, vc[0], vc[1]));
            this.panleAry.push(this.getPanelByVec(cam, vc[1], vc[2]));
            this.panleAry.push(this.getPanelByVec(cam, vc[2], vc[3]));
            this.panleAry.push(this.getPanelByVec(cam, vc[3], vc[0]));
            /*
            for (var i: number = 0; i < vc.length; i++){
                this.capsuleLineSprite.makeLineMode(cam, vc[i]);
            }
            */
            for (var i = 0; i < this.dataAry.length; i++) {
                var obj = this.dataAry[i];
                var pos = new Pan3d.Vector3D(obj.x, obj.y, obj.z);
                var whd = new Pan3d.Vector3D(obj.width, obj.height, obj.depth);
                var bOutSide = false;
                for (var j = 0; j < this.panleAry.length; j++) {
                    var vcMin = pos;
                    var vcMax = pos.add(whd);
                    var _vcMax = new Pan3d.Vector3D();
                    // var _vcMin: Vector3D = new Vector3D();
                    if (this.panleAry[j].x > 0) {
                        _vcMax.x = vcMax.x;
                        //_vcMin.x = vcMin.x;
                    }
                    else {
                        //_vcMin.x = vcMax.x;
                        _vcMax.x = vcMin.x;
                    }
                    if (this.panleAry[j].y > 0) {
                        _vcMax.y = vcMax.y;
                        //_vcMin.y = vcMin.y;
                    }
                    else {
                        //_vcMin.y = vcMax.y;
                        _vcMax.y = vcMin.y;
                    }
                    if (this.panleAry[j].z > 0) {
                        _vcMax.z = vcMax.z;
                        //_vcMin.z = vcMin.z;
                    }
                    else {
                        //_vcMin.z = vcMax.z;
                        _vcMax.z = vcMin.z;
                    }
                    var num = this.panleAry[j].dot(_vcMax) + this.panleAry[j].w;
                    if (num < 0) {
                        bOutSide = true;
                        break;
                    }
                }
                if (bOutSide) {
                    this.capsuleLineSprite.baseColor = new Pan3d.Vector3D(1, 0, 0, 1);
                }
                else {
                    this.capsuleLineSprite.baseColor = new Pan3d.Vector3D(0, 0, 1, 1);
                }
                this.capsuleLineSprite.makeLineMode(pos, new Pan3d.Vector3D(pos.x + whd.x, pos.y, pos.z));
                this.capsuleLineSprite.makeLineMode(pos, new Pan3d.Vector3D(pos.x, pos.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x + whd.x, pos.y, pos.z), new Pan3d.Vector3D(pos.x + whd.x, pos.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x, pos.y, pos.z + whd.z), new Pan3d.Vector3D(pos.x + whd.x, pos.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x, pos.y + whd.y, pos.z), new Pan3d.Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x, pos.y + whd.y, pos.z), new Pan3d.Vector3D(pos.x, pos.y + whd.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z), new Pan3d.Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x, pos.y + whd.y, pos.z + whd.z), new Pan3d.Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x, pos.y, pos.z), new Pan3d.Vector3D(pos.x, pos.y + whd.y, pos.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x + whd.x, pos.y, pos.z), new Pan3d.Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x, pos.y, pos.z + whd.z), new Pan3d.Vector3D(pos.x, pos.y + whd.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Pan3d.Vector3D(pos.x + whd.x, pos.y, pos.z + whd.z), new Pan3d.Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z + whd.z));
            }
            this.capsuleLineSprite.upToGpu();
        };
        return ViewFrustum;
    }());
    Pan3d.ViewFrustum = ViewFrustum;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ViewFrustum.js.map