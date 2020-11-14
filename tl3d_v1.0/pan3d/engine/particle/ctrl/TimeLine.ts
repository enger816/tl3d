module Pan3d {
    export class TimeLine extends EventDispatcher {
        private _keyFrameAry: Array<KeyFrame>;
        public maxFrameNum: number;
        private _currentKeyFrame: KeyFrame;//当前操作的关键帧
        private _currentFrameNum: number;//当前帧数
        private _time: number = 0;//播放时间
        private targetFlag: number = -1;
        public visible: boolean;
        public beginTime: number = 0;

        private _selfRotaion: SelfRotation;
        private _axisRotaion: AxisRotaion;
        private _axisMove: AxisMove;
        private _scaleChange: ScaleChange;
        private _scaleAnim: ScaleAnim;
        private _scaleNosie: ScaleNoise;

        public constructor() {
            super();
            this.targetFlag = -1;
            this.visible = false;
            this.maxFrameNum = 0;
            this._time = 0;
            this._keyFrameAry = new Array;
        }

        public updateMatrix(posMatrix: Matrix3D, $particle: Display3DParticle): void {

            if (this._axisMove) {
                posMatrix.prependTranslation(this._axisMove.axis.x * this._axisMove.num, this._axisMove.axis.y * this._axisMove.num, this._axisMove.axis.z * this._axisMove.num);
            }
            if (this._axisRotaion) {
                posMatrix.prependRotation(this._axisRotaion.num, this._axisRotaion.axis);
            }

            posMatrix.prependTranslation($particle.data.center.x, $particle.data.center.y, $particle.data.center.z);


            if (this._scaleChange) {
                //processScale();
                posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleChange.num, $particle.data._heightFixed ? 1 : this._scaleChange.num,
                    $particle.data._widthFixed ? 1 : this._scaleChange.num);
            } else if (this._scaleNosie) {
                //processNosie();
                posMatrix.prependScale($particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num), $particle.data._heightFixed ? 1 : (1 + this._scaleNosie.num),
                    $particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num));
            } else if (this._scaleAnim) {
                //processScaleAnim();
                posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleAnim.num, $particle.data._heightFixed ? 1 : this._scaleAnim.num,
                    $particle.data._widthFixed ? 1 : this._scaleAnim.num);
                ////console.log(this._scaleAnim.num);
            }
            posMatrix.prependRotation($particle.data.rotationV3d.z, Vector3D.Z_AXIS);
            posMatrix.prependRotation($particle.data.rotationV3d.y, Vector3D.Y_AXIS);
            posMatrix.prependRotation($particle.data.rotationV3d.x, Vector3D.X_AXIS);


        }

        public inverAxisRotation($targetMatrix: Matrix3D): void {
            if (this._axisRotaion) {
                $targetMatrix.prependRotation(-this._axisRotaion.num, this._axisRotaion.axis);
            }
        }

        public applySelfRotation($targetMatrix: Matrix3D, $axis: Vector3D): void {
            if (this._selfRotaion) {
                $targetMatrix.prependRotation(this._selfRotaion.num, $axis);
            }
        }

        public addKeyFrame(num: number): KeyFrame {
            var keyframe: KeyFrame = new KeyFrame();
            keyframe.frameNum = num;
            this._keyFrameAry.push(keyframe);
            return keyframe;
        }


        public updateTime(t: number): void {
            if (!this._currentKeyFrame) {
                return;
            }
            this._time = t;
            this.getTarget();


            if (this._axisRotaion) {
                this._axisRotaion.update(this._time);
            }

            if (this._selfRotaion) {
                this._selfRotaion.update(this._time);
            }

            if (this._axisMove) {
                this._axisMove.update(this._time);
            }

            if (this._scaleChange) {
                this._scaleChange.update(this._time);
            } else if (this._scaleNosie) {
                this._scaleNosie.update(this._time);
            } else if (this._scaleAnim) {
                this._scaleAnim.update(this._time);
            }

        }


        private getTarget(): void {
            var flag: number = -1;
            for (var i: number = 0; i < this._keyFrameAry.length; i++) {
                if (this._keyFrameAry[i].frameNum * Scene_data.frameTime < this._time) {
                    flag = i;
                } else {
                    break;
                }
            }
            if (flag != this.targetFlag) {
                this._currentKeyFrame = this._keyFrameAry[flag];
                this.targetFlag = flag;

                if (flag >= (this._keyFrameAry.length - 1) || !this._currentKeyFrame) {
                    this.visible = false;
                    this._currentKeyFrame = null;
                } else {
                    this.visible = true;
                    this.enterKeyFrame(this._currentKeyFrame.animData, this._currentKeyFrame.frameNum * Scene_data.frameTime, this._currentKeyFrame.baseValue);
                }

            }
        }


        public enterKeyFrame(ary: Array<any>, baseTime: number = 0, baseValueAry: Array<number> = null): void {
            if (baseValueAry == null) {
                return;
            }
            for (var i: number = 0; i < 10; i++) {

                if (!baseValueAry[i]) {
                    continue;
                }

                switch (i) {
                    case 1:
                        if (!this._selfRotaion)
                            this._selfRotaion = new SelfRotation;
                        this._selfRotaion.num = this._selfRotaion.baseNum = baseValueAry[i];
                        break;
                    case 2:
                        if (!this._axisRotaion)
                            this._axisRotaion = new AxisRotaion;
                        this._axisRotaion.num = this._axisRotaion.baseNum = baseValueAry[i];
                        break;
                    case 6:
                        if (!this._scaleChange)
                            this._scaleChange = new ScaleChange;
                        this._scaleChange.num = this._scaleChange.baseNum = baseValueAry[i];
                        break;
                    case 7:
                        if (!this._scaleAnim)
                            this._scaleAnim = new ScaleAnim;
                        this._scaleAnim.num = this._scaleAnim.baseNum = baseValueAry[i];
                        break;
                    case 8:
                        if (!this._scaleNosie)
                            this._scaleNosie = new ScaleNoise;
                        this._scaleNosie.num = this._scaleNosie.baseNum = baseValueAry[i];
                        break;
                    case 9:
                        if (!this._axisMove)
                            this._axisMove = new AxisMove;
                        this._axisMove.num = this._axisMove.baseNum = baseValueAry[i];
                        break;
                }

            }

            if (this._selfRotaion)
                this._selfRotaion.isDeath = true;
            if (this._axisRotaion)
                this._axisRotaion.isDeath = true;
            if (this._scaleChange)
                this._scaleChange.isDeath = true;
            if (this._scaleAnim)
                this._scaleAnim.isDeath = true;
            if (this._scaleNosie)
                this._scaleNosie.isDeath = true;
            if (this._axisMove)
                this._axisMove.isDeath = true;

            if (!ary) {
                return;
            }

            this.setBaseTimeByte(ary, baseTime, baseValueAry)



        }



        public reset(): void {
            this._time = 0;
            this._currentKeyFrame = this._keyFrameAry[0];
            this.visible = false;
            this.targetFlag = -1;
        }
        private isByteData: boolean = false
        public setAllByteInfo($byte: Pan3dByteArray, $allObj: any): void {
            this.isByteData = true
            var len: number = $byte.readFloat();
            for (var i: number = 0; i < len; i++) {
                var frameNum: number = $byte.readFloat();
                var key: KeyFrame = this.addKeyFrame(frameNum);
                key.frameNum = frameNum;
                key.baseValue = new Array();
                for (var j: number = 0; j < 10; j++) {
                    key.baseValue.push($byte.readFloat());
                }
                var animLen: number = $byte.readFloat();
                key.animData = new Array
                if (animLen > 0) {
                    for (var k: number = 0; k < animLen; k++) {

                        key.animData.push(this.getByteDataTemp($byte))

                    }
                }
            }
            this.maxFrameNum = this._keyFrameAry[this._keyFrameAry.length - 1].frameNum;
            this.beginTime = this._keyFrameAry[0].frameNum * Scene_data.frameTime;
            this._currentKeyFrame = this._keyFrameAry[0];



        }

        public setAllDataInfo($data: TimeLineData): void {
            this.isByteData = true;
            var len: number = $data.dataAry.length;
            for (var i: number = 0; i < len; i++) {
                var key: KeyFrame = this.addKeyFrame($data.dataAry[i].frameNum);
                key.baseValue = $data.dataAry[i].baseValue;
                key.animData = $data.dataAry[i].animData;
            }

            this.maxFrameNum = $data.maxFrameNum;
            this.beginTime = $data.beginTime;
            this._currentKeyFrame = this._keyFrameAry[0];

        }
        private setBaseTimeByte(ary: Array<any>, baseTime: number = 0, baseValueAry: Array<number> = null): void {

            for (var i: number = 0; i < ary.length; i++) {

                if (ary[i].type == 1) {
                    if (!this._selfRotaion) {
                        this._selfRotaion = new SelfRotation;
                    } else {
                        this._selfRotaion.reset();
                    }
                    // this._selfRotaion.data = (ary[i].data);
                    this._selfRotaion.dataByte(ary[i].data, ary[i].dataByte);
                    this._selfRotaion.baseTime = baseTime;
                } else if (ary[i].type == 2) {
                    if (!this._axisRotaion) {
                        this._axisRotaion = new AxisRotaion;
                    } else {
                        this._axisRotaion.reset();
                    }
                    this._axisRotaion.dataByte(ary[i].data, ary[i].dataByte);
                    this._axisRotaion.baseTime = baseTime;
                } else if (ary[i].type == 6) {
                    if (!this._scaleChange) {
                        this._scaleChange = new ScaleChange;
                    } else {
                        this._scaleChange.reset();
                    }
                    //this._scaleChange.data = (ary[i].data);
                    this._scaleChange.dataByte(ary[i].data, ary[i].dataByte);
                    this._scaleChange.baseTime = baseTime;
                } else if (ary[i].type == 7) {
                    if (!this._scaleAnim) {
                        this._scaleAnim = new ScaleAnim;
                    } else {
                        this._scaleAnim.reset();
                    }
                    // this._scaleAnim.data = (ary[i].data);
                    this._scaleAnim.dataByte(ary[i].data, ary[i].dataByte);
                    this._scaleAnim.baseTime = baseTime;
                } else if (ary[i].type == 8) {
                    if (!this._scaleNosie) {
                        this._scaleNosie = new ScaleNoise;
                    } else {
                        this._scaleNosie.reset();
                    }
                    //this._scaleNosie.data = (ary[i].data);
                    this._scaleNosie.dataByte(ary[i].data, ary[i].dataByte);
                    this._scaleNosie.baseTime = baseTime;
                } else if (ary[i].type == 9) {
                    if (!this._axisMove) {
                        this._axisMove = new AxisMove;
                    } else {
                        this._axisMove.reset();
                    }
                    // this._axisMove.data = (ary[i].data);
                    this._axisMove.dataByte(ary[i].data, ary[i].dataByte);
                    this._axisMove.baseTime = baseTime;
                }
            }
        }
        private getByteDataTemp($byte: Pan3dByteArray): any {
            var obj: any = new Object;
            var animType: number = $byte.readInt()
            var dataLen: number = $byte.readInt()
            obj.data = new Array;
            obj.dataByte = new Array;
            for (var i: number = 0; i < dataLen; i++) {
                var ko: any = new Object;
                ko.type = $byte.readInt();
                //  ko.value = $byte.readUTF();
                // obj.data.push(ko);
                if (ko.type == 1) {
                    var num: number = $byte.readFloat()
                    obj.dataByte.push(num);
                }
                if (ko.type == 2) {
                    var v: Vector3D = new Vector3D();
                    v.x = $byte.readFloat();
                    v.y = $byte.readFloat();
                    v.z = $byte.readFloat();
                    obj.dataByte.push(v);
                }

            }
            obj.type = animType;
            return obj;
        }





        /**
         * 获取最大的帧数 
         * @return 最大帧数
         * 
         */
        public getMaxFrame(): number {
            return this._keyFrameAry[this._keyFrameAry.length - 1].frameNum;
        }


        public dispose(): void {
            //this._keyFrameAry = null;
            //this._display3D.clear();
            //this._display3D = null;
            //this._currentKeyFrame = null;
        }

    }
}