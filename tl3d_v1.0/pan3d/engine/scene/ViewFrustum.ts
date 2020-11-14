module Pan3d {
    export class ViewFrustum {

        private capsuleLineSprite: LineDisplaySprite;

        private panleAry: Array<Vector3D>;
        private dataAry: Array<any>;

        public constructor() {

        }

        public init(): void {
            this.capsuleLineSprite = new LineDisplaySprite();
            SceneManager.getInstance().addDisplay(this.capsuleLineSprite);

        }

        public setCam(): void {
            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
            m.append(Scene_data.viewMatrx3D);
            var a: Float32Array = m.m;

            var a11 = a[0], a12 = a[1], a13 = a[2], a14 = a[3],
                a21 = a[4], a22 = a[5], a23 = a[6], a24 = a[7],
                a31 = a[8], a32 = a[9], a33 = a[10], a34 = a[11],
                a41 = a[12], a42 = a[13], a43 = a[14], a44 = a[15];

            this.panleAry = new Array;

            var farp: Vector3D = this.getPanle(
                -a31 + a41,
                -a32 + a42,
                -a33 + a43,
                -a34 + a44);
            var bottom: Vector3D = this.getPanle(
                a21 + a41,
                a22 + a42,
                a23 + a43,
                a24 + a44);
            var top: Vector3D = this.getPanle(
                -a21 + a41,
                -a22 + a42,
                -a23 + a43,
                -a24 + a44);
            var left: Vector3D = this.getPanle(
                a11 + a41,
                a12 + a42,
                a13 + a43,
                a14 + a44);
            var right: Vector3D = this.getPanle(
                -a11 + a41,
                -a12 + a42,
                -a13 + a43,
                -a14 + a44);

            //this.panleAry.push(top,right,bottom,left);

            ////console.log("------------");
            //for (var i: number = 0; i < this.panleAry.length; i++){
            //    var p: Vector3D = this.panleAry[i];
            //    //p.normalize();
            //    var num: number = p.x * Scene_data.cam3D.x + p.y * Scene_data.cam3D.y + p.z * Scene_data.cam3D.z;
            //    num = num - p.w;
            //    //console.log(num); 
            //}
        }



        private getPanle(a: number, b: number, c: number, d: number): Vector3D {
            var normal: Vector3D = new Vector3D(a, b, c, d);
            normal.normalize();
            return normal;
        }

        private getPanelByVec(v1: Vector3D, v2: Vector3D, v3: Vector3D): Vector3D {
            var a1: Vector3D = v2.subtract(v1);
            var a2: Vector3D = v3.subtract(v1);
            a1 = a1.cross(a2);
            a1.normalize();
            a1.w = -a1.dot(v1)
            return a1;
        }

        public setData(obj: any): void {
            this.dataAry = obj;
        }

        public setViewFrustum(): void {
            if (!this.capsuleLineSprite) {
                this.init();
            }

            this.setCam();

            this.capsuleLineSprite.clear();
            this.capsuleLineSprite.baseColor = new Vector3D(0, 0, 1, 1);

            MathClass.GetViewHitBoxDataCopy(Scene_data.cam3D.distance);
            var cam: Vector3D = new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z);
            var vc: Array<Vector3D> = MathClass.viewBoxVecItem;

            this.panleAry.push(this.getPanelByVec(cam, vc[0], vc[1]));
            this.panleAry.push(this.getPanelByVec(cam, vc[1], vc[2]));
            this.panleAry.push(this.getPanelByVec(cam, vc[2], vc[3]));
            this.panleAry.push(this.getPanelByVec(cam, vc[3], vc[0]));

            /*
            for (var i: number = 0; i < vc.length; i++){
                this.capsuleLineSprite.makeLineMode(cam, vc[i]);
            }
            */

            for (var i: number = 0; i < this.dataAry.length; i++) {
                var obj: any = this.dataAry[i];
                var pos: Vector3D = new Vector3D(obj.x, obj.y, obj.z);
                var whd: Vector3D = new Vector3D(obj.width, obj.height, obj.depth);
                var bOutSide: boolean = false;
                for (var j: number = 0; j < this.panleAry.length; j++) {
                    var vcMin: Vector3D = pos;
                    var vcMax: Vector3D = pos.add(whd);
                    var _vcMax: Vector3D = new Vector3D();
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

                    var num: Number = this.panleAry[j].dot(_vcMax) + this.panleAry[j].w;
                    if (num < 0) {
                        bOutSide = true;
                        break;
                    }

                }

                if (bOutSide) {
                    this.capsuleLineSprite.baseColor = new Vector3D(1, 0, 0, 1);
                } else {
                    this.capsuleLineSprite.baseColor = new Vector3D(0, 0, 1, 1);
                }

                this.capsuleLineSprite.makeLineMode(pos, new Vector3D(pos.x + whd.x, pos.y, pos.z));
                this.capsuleLineSprite.makeLineMode(pos, new Vector3D(pos.x, pos.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x + whd.x, pos.y, pos.z), new Vector3D(pos.x + whd.x, pos.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x, pos.y, pos.z + whd.z), new Vector3D(pos.x + whd.x, pos.y, pos.z + whd.z));

                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x, pos.y + whd.y, pos.z), new Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x, pos.y + whd.y, pos.z), new Vector3D(pos.x, pos.y + whd.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z), new Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x, pos.y + whd.y, pos.z + whd.z), new Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z + whd.z));

                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x, pos.y, pos.z), new Vector3D(pos.x, pos.y + whd.y, pos.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x + whd.x, pos.y, pos.z), new Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x, pos.y, pos.z + whd.z), new Vector3D(pos.x, pos.y + whd.y, pos.z + whd.z));
                this.capsuleLineSprite.makeLineMode(new Vector3D(pos.x + whd.x, pos.y, pos.z + whd.z), new Vector3D(pos.x + whd.x, pos.y + whd.y, pos.z + whd.z));

            }


            this.capsuleLineSprite.upToGpu();
        }

        //public updateDraw(): void {
        //    this.capsuleLineSprite.update();
        //}

    }
}