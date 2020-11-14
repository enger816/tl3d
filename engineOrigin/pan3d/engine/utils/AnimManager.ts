module Pan3d {
    export class AnimManager {
        private _dic: Object;
        constructor() {
            this._dic = new Object();
        }

        private static _instance: AnimManager;
        public static getInstance(): AnimManager {
            if (!this._instance) {
                this._instance = new AnimManager();
            }
            return this._instance;
        }



        public getAnimData($url: string, $fun: Function): void {

            if (this._dic[$url]) {
                $fun(this._dic[$url]);
                return;
            }

            LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer, _fun: Function) => {
                //this.loadObjCom($byte, _fun, $url);
                var animData: AnimData = this.readData(new Pan3dByteArray($byte), $url);
                _fun(animData);
            }, $fun);


        }

        public getAnimDataImmediate($url: string): AnimData {
            return this._dic[$url];
        }

        public clearAnim($url: string): void {
            delete this._dic[$url];
        }

        public readData(byte: Pan3dByteArray, $url): AnimData {
            var hierarchyList: Array<ObjectBone> = new Array;
            var frameAry: Array<Array<number>> = new Array;

            var animData: AnimData = new AnimData();

            animData.inLoop = byte.readInt();

            var numLength: number = byte.readInt();
            for (var i: number = 0; i < numLength; i++) {
                animData.inter.push(byte.readInt());
            }

            numLength = byte.readInt();
            for (var i: number = 0; i < numLength; i++) {
                animData.bounds.push(byte.readVector3D());
            }

            animData.nameHeight = byte.readInt();

            numLength = byte.readInt();

            for (var i: number = 0; i < numLength; i++) {
                var objBone: ObjectBone = new ObjectBone();
                objBone.father = byte.readInt();
                objBone.changtype = byte.readInt();
                objBone.startIndex = byte.readInt();

                objBone.tx = byte.readFloat();
                objBone.ty = byte.readFloat();
                objBone.tz = byte.readFloat();

                objBone.qx = byte.readFloat();
                objBone.qy = byte.readFloat();
                objBone.qz = byte.readFloat();

                hierarchyList.push(objBone);
            }

            this.readFrameData(byte, frameAry);

            numLength = byte.readInt();
            for (var i: number = 0; i < numLength; i++) {
                animData.posAry.push(byte.readVector3D());
            }

            animData.matrixAry = this.processFrame(frameAry, hierarchyList);



            this._dic[$url] = animData;
            return animData;
        }

        private readFrameData(byte: Pan3dByteArray, frameAry: Array<Array<number>>): void {
            var $frameTyeArr: Array<boolean> = this.readFrameTypeData(byte)
            var $isStand: boolean = byte.readBoolean() //是否为站立，这里特殊给站立的旋转设置其权重值不压缩
            var $scaleNum: number = byte.readFloat();
            var numLength: number = byte.readInt();
            for (var i: number = 0; i < numLength; i++) {
                var frameItemAryLength: number = byte.readInt();
                var frameItemAry: Array<number> = new Array;
                frameAry.push(frameItemAry);
                for (var j: number = 0; j < frameItemAryLength; j++) {
                    if ($frameTyeArr[j]) {
                        frameItemAry.push(byte.readFloatTwoByte($scaleNum))
                    } else {
                        if ($isStand) {  //注意这里的特殊，针对站立时的旋转精度用浮点
                            frameItemAry.push(byte.readFloat())
                        } else {
                            frameItemAry.push(byte.readShort() / 32767)
                        }

                    }

                }
            }

        }
        private readFrameTypeData(byte: Pan3dByteArray): Array<boolean> {
            var $arr: Array<boolean> = new Array
            var numLength: number = byte.readInt();
            for (var i: number = 0; i < numLength; i++) {
                $arr.push(byte.readBoolean())
            }
            return $arr
        }

        private processFrame(frameAry: Array<Array<number>>, hierarchyList: Array<ObjectBone>): Array<Array<Matrix3D>> {
            var newFrameAry: Array<Array<ObjectBaseBone>> = new Array;
            for (var i: number = 0; i < frameAry.length; i++) {
                newFrameAry.push(this.frameToBone(frameAry[i], hierarchyList));
            }

            return this.setFrameToMatrix(newFrameAry);
        }

        public frameToBone(frameData: Array<number>, hierarchyList: Array<ObjectBone>): Array<ObjectBaseBone> {
            var _arr: Array<ObjectBaseBone> = new Array;

            for (var i: number = 0; i < hierarchyList.length; i++) {
                var _temp: ObjectBaseBone = new ObjectBaseBone();
                _temp.father = hierarchyList[i].father;

                var k: number = 0;
                if (hierarchyList[i].changtype & 1) {
                    _temp.tx = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                } else {
                    _temp.tx = hierarchyList[i].tx;
                }

                if (hierarchyList[i].changtype & 2) {
                    _temp.ty = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                } else {
                    _temp.ty = hierarchyList[i].ty;
                }

                if (hierarchyList[i].changtype & 4) {
                    _temp.tz = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                } else {
                    _temp.tz = hierarchyList[i].tz;
                }

                if (hierarchyList[i].changtype & 8) {
                    _temp.qx = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                } else {
                    _temp.qx = hierarchyList[i].qx;
                }

                if (hierarchyList[i].changtype & 16) {
                    _temp.qy = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                } else {
                    _temp.qy = hierarchyList[i].qy;
                }

                if (hierarchyList[i].changtype & 32) {
                    _temp.qz = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                } else {
                    _temp.qz = hierarchyList[i].qz;
                }

                _arr.push(_temp);
            }
            return _arr;
        }

        private setFrameToMatrix(frameAry: Array<Array<ObjectBaseBone>>): Array<Array<Matrix3D>> {

            var matrixAry: Array<Array<Matrix3D>> = new Array;

            for (var j: number = 0; j < frameAry.length; j++) {
                var boneAry: Array<ObjectBaseBone> = frameAry[j];

                var Q0: Quaternion = new Quaternion();
                var newM: Matrix3D = new Matrix3D();

                var frameMatrixAry: Array<Matrix3D> = new Array;
                matrixAry.push(frameMatrixAry);

                for (var i: number = 0; i < boneAry.length; i++) {

                    var xyzfarme0: ObjectBaseBone = boneAry[i];
                    Q0 = new Quaternion(xyzfarme0.qx, xyzfarme0.qy, xyzfarme0.qz);
                    Q0.w = this.getW(Q0.x, Q0.y, Q0.z);

                    if (xyzfarme0.father == -1) {
                        newM = Q0.toMatrix3D();
                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                        newM.appendRotation(-90, Vector3D.X_AXIS);
                        //xyzfarme0.matrix = newM;
                        frameMatrixAry.push(newM);
                    } else {
                        var fatherBone: ObjectBaseBone = boneAry[xyzfarme0.father];

                        newM = Q0.toMatrix3D();
                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                        //newM.append(fatherBone.matrix);
                        newM.append(frameMatrixAry[xyzfarme0.father]);
                        frameMatrixAry.push(newM);
                        //xyzfarme0.matrix = newM;

                    }
                }
                for (i = 0; i < frameMatrixAry.length; i++) {
                    frameMatrixAry[i].appendScale(-1, 1, 1);  //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
                    //xyzfarme0.matrix.appendScale(-1, 1, 1);
                }

            }

            return matrixAry;
        }

        private getW(x: number, y: number, z: number): number {
            var t: number = 1 - (x * x + y * y + z * z);
            if (t < 0) {
                t = 0
            } else {
                t = -Math.sqrt(t);
            }
            return t;
        }




    }

    class ObjectBaseBone {
        public father: number;
        public name: string
        public tx: number;
        public ty: number;
        public tz: number;
        public tw: number;

        public qx: number;
        public qy: number;
        public qz: number;
        public qw: number;

    }

    class ObjectBone extends ObjectBaseBone {
        public changtype: number;
        public startIndex: number;
        public matrix: Matrix3D;
        public clone(): ObjectBone {
            var newBone: ObjectBone = new ObjectBone;

            newBone.tx = this.tx;
            newBone.ty = this.ty;
            newBone.tz = this.tz;
            newBone.tw = this.tw;
            newBone.qx = this.qx;
            newBone.qy = this.qy;
            newBone.qz = this.qz;
            newBone.qw = this.qw;
            newBone.changtype = this.changtype;
            newBone.name = this.name;
            newBone.father = this.father;
            newBone.startIndex = this.startIndex;
            newBone.matrix = this.matrix;

            return newBone;
        }

    }
}