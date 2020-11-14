var xyz;
(function (xyz) {
    var Matrix3D = Pan3d.Matrix3D;
    var TooXyzPosData = /** @class */ (function () {
        function TooXyzPosData() {
            this.oldscale_x = 1;
            this.oldscale_y = 1;
            this.oldscale_z = 1;
        }
        TooXyzPosData.prototype.changeModelMatrix3d = function () {
            this.updateMatrix();
        };
        TooXyzPosData.prototype.updateMatrix = function () {
            if (!this.modeMatrx3D) {
                this.modeMatrx3D = new Matrix3D;
            }
            this.modeMatrx3D.identity();
            // this.modeMatrx3D.appendScale(this.scaleX, this.scaleY, this.scaleZ);
            this.modeMatrx3D.appendRotation(this.rotationX, Vector3D.X_AXIS);
            this.modeMatrx3D.appendRotation(this.rotationY, Vector3D.Y_AXIS);
            this.modeMatrx3D.appendRotation(this.rotationZ, Vector3D.Z_AXIS);
            this.modeMatrx3D.appendTranslation(this.x, this.y, this.z);
        };
        TooXyzPosData.getTemapXyzPosData = function (_id, _x, _y, _z) {
            var tempXyz = new TooXyzPosData();
            tempXyz.id = _id;
            tempXyz.x = _x;
            tempXyz.y = _y;
            tempXyz.z = _z;
            tempXyz.type = 1;
            return tempXyz;
        };
        TooXyzPosData.prototype.getEulerAngles = function (quat) {
            var x, y, z, qx, qy, qz, qw, a2;
            qx = quat[0];
            qy = quat[1];
            qz = quat[2];
            qw = quat[3];
            a2 = 2 * (qw * qy - qx * qz);
            if (a2 <= -0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = -Math.PI / 2;
                z = 0;
            }
            else if (a2 >= 0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = Math.PI / 2;
                z = 0;
            }
            else {
                x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
                y = Math.asin(a2);
                z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
            }
            return [x, y, z];
        };
        TooXyzPosData.prototype.upRootMatrix3DToItem = function () {
            this.updateMatrix();
            for (var i = 0; i < this.spriteItem.length; i++) {
                this.spriteItem[i].scaleX = this.dataItem[i].scaleX * this.scaleX;
                this.spriteItem[i].scaleY = this.dataItem[i].scaleY * this.scaleY;
                this.spriteItem[i].scaleZ = this.dataItem[i].scaleZ * this.scaleZ;
                //var a: Matrix3D = this.baseMatrix3D.clone();
                //var b: Matrix3D = this.modeMatrx3D.clone();
                //a.invert();
                //var c: Matrix3D = b.clone();
                //c.prepend(a)
                //c.prepend(this.dataItem[i].baseMatrix3D)
                var M = this.modeMatrx3D.clone();
                this.spriteItem[i].x = M.position.x;
                this.spriteItem[i].y = M.position.y;
                this.spriteItem[i].z = M.position.z;
                var r = M.toEulerAngles(); //欧拉角
                this.spriteItem[i].rotationX = r.x;
                this.spriteItem[i].rotationY = r.y;
                this.spriteItem[i].rotationZ = r.z;
                this.dataUpDate();
            }
            console.log("--------------");
        };
        /*
        public upRootMatrix3DToItem(): void {

             this.updateMatrix();
        
            for (var i: number = 0; i < this.spriteItem.length; i++) {
    
                var a: Matrix3D = this.baseMatrix3D.clone();
                var b: Matrix3D = this.modeMatrx3D.clone();
                a.invert();
                var c: Matrix3D = b.clone();
                c.prepend(a)
                c.prepend(this.dataItem[i].baseMatrix3D)

                var M = this.modeMatrx3D.clone();
                var s: Vector3D = M.getScaling();
                this.spriteItem[i].scaleX = s.x
                this.spriteItem[i].scaleY = s.y
                this.spriteItem[i].scaleZ = s.z

                this.spriteItem[i].x = M.position.x;
                this.spriteItem[i].y = M.position.y;
                this.spriteItem[i].z = M.position.z;

                var MR: Matrix3D = M.clone();
        
                MR.appendScale(1/s.x, 1/s.y, 1/s.z);
                MR.appendTranslation(-M.position.x, -M.position.y, -M.position.z)
       
                var r: Vector3D = MR.toEulerAngles(); //欧拉角
                this.spriteItem[i].rotationX = r.x
                this.spriteItem[i].rotationY = r.y
                this.spriteItem[i].rotationZ = r.z
       
 

              this.spriteItem[i].posMatrix = this.modeMatrx3D.clone();

                 this.dataUpDate();
            }
            console.log("--------------")

           
        }

        */
        TooXyzPosData.getBase = function ($arr, isCenten) {
            if (isCenten === void 0) { isCenten = false; }
            var rootData = new TooXyzPosData();
            rootData.scaleX = 1;
            rootData.scaleY = 1;
            rootData.scaleZ = 1;
            rootData.dataItem = [];
            rootData.spriteItem = [];
            //第一个对象
            rootData.x = $arr[0].x;
            rootData.y = $arr[0].y;
            rootData.z = $arr[0].z;
            rootData.scaleX = $arr[0].scaleX;
            rootData.scaleY = $arr[0].scaleY;
            rootData.scaleZ = $arr[0].scaleZ;
            rootData.rotationX = $arr[0].rotationX;
            rootData.rotationY = $arr[0].rotationY;
            rootData.rotationZ = $arr[0].rotationZ;
            //rootData.x = 10
            //rootData.y =10
            //rootData.z =10
            //rootData.scaleX = $arr[0].scaleX
            //rootData.scaleY = $arr[0].scaleY
            //rootData.scaleZ = $arr[0].scaleZ
            //rootData.rotationX =40
            //rootData.rotationY = 40
            //rootData.rotationZ = 40
            rootData.updateMatrix();
            rootData.baseMatrix3D = rootData.modeMatrx3D.clone();
            var inM = rootData.modeMatrx3D.clone();
            inM.invert();
            for (var j = 0; j < $arr.length; j++) {
                var tempData = new TooXyzPosData;
                //  tempData.modeMatrx3D = $arr[j].posMatrix.clone(); //存放相对
                // tempData.modeMatrx3D.prepend(inM);
                tempData.baseMatrix3D = $arr[j].posMatrix.clone();
                tempData.scaleX = $arr[j].scaleX / rootData.scaleX;
                tempData.scaleY = $arr[j].scaleY / rootData.scaleY;
                tempData.scaleZ = $arr[j].scaleZ / rootData.scaleZ;
                tempData.x = $arr[j].x;
                tempData.y = $arr[j].y;
                tempData.z = $arr[j].z;
                tempData.rotationX = $arr[j].rotationX;
                tempData.rotationY = $arr[j].rotationY;
                tempData.rotationZ = $arr[j].rotationZ;
                rootData.dataItem.push(tempData);
                rootData.spriteItem.push($arr[j]);
            }
            return rootData;
        };
        return TooXyzPosData;
    }());
    xyz.TooXyzPosData = TooXyzPosData;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooXyzMoveData.js.map