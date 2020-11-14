module Pan3d {
    export class QuadTreeNode {
        public x: number;
        public y: number;
        public z: number;
        public width: number;
        public height: number;
        public depth: number;
        public data: Array<any>;
        public target: any;
        public sun: Array<QuadTreeNode>;
        public id: number;

        //public pointList: Array<Vector2D>;

        public constructor($x: number, $y: number, $z: number, $width: number, $height: number, $depth: number) {
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

        public testViewFrustum(face: Array<Vector3D>, ray: Ray): void {
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
                    } else {
                        this.target.sceneVisible = true;
                    }
                }

                if (this.sun) {
                    for (var i: number = 0; i < this.sun.length; i++) {
                        this.sun[i].testViewFrustum(face, ray);
                    }
                }

            }
        }

        public testViewFrustumResult(face: Array<Vector3D>): boolean {

            var pos: Vector3D = new Vector3D(this.x, this.y, this.z);
            var whd: Vector3D = new Vector3D(this.width, this.height, this.depth);
            var bInSide: boolean = true;
            for (var j: number = 0; j < face.length; j++) {
                var vcMin: Vector3D = pos;
                var vcMax: Vector3D = pos.add(whd);
                var _vcMax: Vector3D = new Vector3D();
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

                var num: Number = face[j].dot(_vcMax) + face[j].w;
                if (num < 0) {
                    bInSide = false;
                    break;
                }

            }

            return bInSide;
        }

        public testRay(ray: Ray): boolean {
            var ox = ray.o.x; var oy = ray.o.y; var oz = ray.o.z;
            var dx = ray.d.x; var dy = ray.d.y; var dz = ray.d.z;

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

            var kEpsilon = 0.0001
            var tmin = 0
            if (t0 < t1 && t1 > kEpsilon) {  // condition for a hit
                if (t0 > kEpsilon) {
                    tmin = t0;  			// ray hits outside surface
                }
                else {
                    tmin = t1;				// ray hits inside surface
                }

                if (tmin < ray.baseT) {
                    return true
                }
            }
            else
                return false;

        }

        //public testCam(): void {
        //    if (this.testCamResult()) {

        //        if (this.target) {
        //            this.target.sceneVisible = true;
        //        }

        //        if (this.sun) {
        //            for (var i: number = 0; i < this.sun.length; i++) {
        //                this.sun[i].testCamResult();
        //            }
        //        }

        //    }
        //}

        //public testCircle($circle:Circle): void {
        //    if (this.testResult($circle)){

        //        if (this.target){
        //            this.target.sceneVisible = true;
        //        }

        //        if (this.sun){
        //            for (var i: number = 0; i < this.sun.length; i++){
        //                this.sun[i].testCircle($circle);
        //            }
        //        }

        //    }
        //}

        //public testCamResult(): boolean {

        //    for (var i: number = 0; i < this.pointList.length; i++) {
        //        var v3d: Vector3D = new Vector3D(this.pointList[i].x, 0, this.pointList[i].y,1);
        //        v3d = Scene_data.cam3D.cameraMatrix.transformVector(v3d);
        //        v3d = Scene_data.viewMatrx3D.transformVector(v3d);
        //        v3d.scaleBy(1/v3d.w);

        //        if (v3d.x >-1 && v3d.y < 1 && v3d.x > -1 && v3d.y < 1){
        //            return true;
        //        }
        //    }

        //    return false;
        //}

        //public testResult($circle: Circle): boolean {
        //    ////console.log(this.x,this.y,this.width,this.height);
        //    for (var i: number = 0; i<this.pointList.length;i++){
        //        if ($circle.testPoint(this.pointList[i])) {
        //            return true;
        //        }
        //    }

        //    if ($circle.x > this.x && $circle.x < this.x + this.width
        //        && $circle.y > this.y && $circle.y < this.y + this.height) {
        //        return true;
        //    }

        //    var cp: Vector2D = new Vector2D($circle.x, $circle.y);
        //    if (this.pointToLine(this.pointList[0],this.pointList[1],cp) < $circle.radius){
        //        return true;
        //    }

        //    if (this.pointToLine(this.pointList[1], this.pointList[2], cp) < $circle.radius) {
        //        return true;
        //    }

        //    if (this.pointToLine(this.pointList[2], this.pointList[3], cp) < $circle.radius) {
        //        return true;
        //    }

        //    if (this.pointToLine(this.pointList[3], this.pointList[0], cp) < $circle.radius) {
        //        return true;
        //    }

        //    return false;

        //}


        //private pointToLine(p1: Vector2D, p2: Vector2D, p:Vector2D):number{
        //    var ans:number = 0;
        //    var a: number;
        //    var b: number;
        //    var c: number;
        //    a = Vector2D.distance(p1, p2);
        //    b = Vector2D.distance(p1, p);
        //    c = Vector2D.distance(p2, p);
        //    if (c + b == a) {//点在线段上
        //        ans = 0;
        //        return ans;
        //    }
        //    if (a <= 0.00001) {//不是线段，是一个点
        //        ans = b;
        //        return ans;
        //    }
        //    if (c * c >= a * a + b * b) { //组成直角三角形或钝角三角形，p1为直角或钝角
        //        ans = b;
        //        return ans;
        //    }
        //    if (b * b >= a * a + c * c) {// 组成直角三角形或钝角三角形，p2为直角或钝角
        //        ans = c;
        //        return ans;
        //    }
        //    // 组成锐角三角形，则求三角形的高
        //    var p0:number = (a + b + c) / 2;// 半周长
        //    var s:number = Math.sqrt(p0 * (p0 - a) * (p0 - b) * (p0 - c));// 海伦公式求面积
        //    ans = 2 * s / a;// 返回点到线的距离（利用三角形面积公式求高）
        //    return ans;
        //}

    }

    export class Ray {
        public o: Vector3D = new Vector3D;
        public d: Vector3D = new Vector3D;
        public baseT: number = 500;

        public setPos(x: number, y: number, z: number): void {
            this.o.x = x;
            this.o.y = y;
            this.o.z = z;
        }
        public setTarget(x: number, y: number, z: number): void {
            this.d.x = x - this.o.x;
            this.d.y = y - this.o.y;
            this.d.z = z - this.o.z;

            this.d.normalize();
        }
    }
}