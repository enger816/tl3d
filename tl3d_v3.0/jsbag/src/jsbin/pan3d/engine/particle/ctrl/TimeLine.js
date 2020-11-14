var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var TimeLine = /** @class */ (function (_super) {
        __extends(TimeLine, _super);
        function TimeLine() {
            var _this = _super.call(this) || this;
            _this._time = 0; //播放时间
            _this.targetFlag = -1;
            _this.beginTime = 0;
            _this.isByteData = false;
            _this.targetFlag = -1;
            _this.visible = false;
            _this.maxFrameNum = 0;
            _this._time = 0;
            _this._keyFrameAry = new Array;
            return _this;
        }
        TimeLine.prototype.updateMatrix = function (posMatrix, $particle) {
            if (this._axisMove) {
                posMatrix.prependTranslation(this._axisMove.axis.x * this._axisMove.num, this._axisMove.axis.y * this._axisMove.num, this._axisMove.axis.z * this._axisMove.num);
            }
            if (this._axisRotaion) {
                posMatrix.prependRotation(this._axisRotaion.num, this._axisRotaion.axis);
            }
            posMatrix.prependTranslation($particle.data.center.x, $particle.data.center.y, $particle.data.center.z);
            if (this._scaleChange) {
                //processScale();
                posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleChange.num, $particle.data._heightFixed ? 1 : this._scaleChange.num, $particle.data._widthFixed ? 1 : this._scaleChange.num);
            }
            else if (this._scaleNosie) {
                //processNosie();
                posMatrix.prependScale($particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num), $particle.data._heightFixed ? 1 : (1 + this._scaleNosie.num), $particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num));
            }
            else if (this._scaleAnim) {
                //processScaleAnim();
                posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleAnim.num, $particle.data._heightFixed ? 1 : this._scaleAnim.num, $particle.data._widthFixed ? 1 : this._scaleAnim.num);
                ////console.log(this._scaleAnim.num);
            }
            posMatrix.prependRotation($particle.data.rotationV3d.z, Pan3d.Vector3D.Z_AXIS);
            posMatrix.prependRotation($particle.data.rotationV3d.y, Pan3d.Vector3D.Y_AXIS);
            posMatrix.prependRotation($particle.data.rotationV3d.x, Pan3d.Vector3D.X_AXIS);
        };
        TimeLine.prototype.inverAxisRotation = function ($targetMatrix) {
            if (this._axisRotaion) {
                $targetMatrix.prependRotation(-this._axisRotaion.num, this._axisRotaion.axis);
            }
        };
        TimeLine.prototype.applySelfRotation = function ($targetMatrix, $axis) {
            if (this._selfRotaion) {
                $targetMatrix.prependRotation(this._selfRotaion.num, $axis);
            }
        };
        TimeLine.prototype.addKeyFrame = function (num) {
            var keyframe = new Pan3d.KeyFrame();
            keyframe.frameNum = num;
            this._keyFrameAry.push(keyframe);
            return keyframe;
        };
        TimeLine.prototype.updateTime = function (t) {
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
            }
            else if (this._scaleNosie) {
                this._scaleNosie.update(this._time);
            }
            else if (this._scaleAnim) {
                this._scaleAnim.update(this._time);
            }
        };
        TimeLine.prototype.getTarget = function () {
            var flag = -1;
            for (var i = 0; i < this._keyFrameAry.length; i++) {
                if (this._keyFrameAry[i].frameNum * Pan3d.Scene_data.frameTime < this._time) {
                    flag = i;
                }
                else {
                    break;
                }
            }
            if (flag != this.targetFlag) {
                this._currentKeyFrame = this._keyFrameAry[flag];
                this.targetFlag = flag;
                if (flag >= (this._keyFrameAry.length - 1) || !this._currentKeyFrame) {
                    this.visible = false;
                    this._currentKeyFrame = null;
                }
                else {
                    this.visible = true;
                    this.enterKeyFrame(this._currentKeyFrame.animData, this._currentKeyFrame.frameNum * Pan3d.Scene_data.frameTime, this._currentKeyFrame.baseValue);
                }
            }
        };
        TimeLine.prototype.enterKeyFrame = function (ary, baseTime, baseValueAry) {
            if (baseTime === void 0) { baseTime = 0; }
            if (baseValueAry === void 0) { baseValueAry = null; }
            if (baseValueAry == null) {
                return;
            }
            for (var i = 0; i < 10; i++) {
                if (!baseValueAry[i]) {
                    continue;
                }
                switch (i) {
                    case 1:
                        if (!this._selfRotaion)
                            this._selfRotaion = new Pan3d.SelfRotation;
                        this._selfRotaion.num = this._selfRotaion.baseNum = baseValueAry[i];
                        break;
                    case 2:
                        if (!this._axisRotaion)
                            this._axisRotaion = new Pan3d.AxisRotaion;
                        this._axisRotaion.num = this._axisRotaion.baseNum = baseValueAry[i];
                        break;
                    case 6:
                        if (!this._scaleChange)
                            this._scaleChange = new Pan3d.ScaleChange;
                        this._scaleChange.num = this._scaleChange.baseNum = baseValueAry[i];
                        break;
                    case 7:
                        if (!this._scaleAnim)
                            this._scaleAnim = new Pan3d.ScaleAnim;
                        this._scaleAnim.num = this._scaleAnim.baseNum = baseValueAry[i];
                        break;
                    case 8:
                        if (!this._scaleNosie)
                            this._scaleNosie = new Pan3d.ScaleNoise;
                        this._scaleNosie.num = this._scaleNosie.baseNum = baseValueAry[i];
                        break;
                    case 9:
                        if (!this._axisMove)
                            this._axisMove = new Pan3d.AxisMove;
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
            this.setBaseTimeByte(ary, baseTime, baseValueAry);
        };
        TimeLine.prototype.reset = function () {
            this._time = 0;
            this._currentKeyFrame = this._keyFrameAry[0];
            this.visible = false;
            this.targetFlag = -1;
        };
        TimeLine.prototype.setAllByteInfo = function ($byte, $allObj) {
            this.isByteData = true;
            var len = $byte.readFloat();
            for (var i = 0; i < len; i++) {
                var frameNum = $byte.readFloat();
                var key = this.addKeyFrame(frameNum);
                key.frameNum = frameNum;
                key.baseValue = new Array();
                for (var j = 0; j < 10; j++) {
                    key.baseValue.push($byte.readFloat());
                }
                var animLen = $byte.readFloat();
                key.animData = new Array;
                if (animLen > 0) {
                    for (var k = 0; k < animLen; k++) {
                        key.animData.push(this.getByteDataTemp($byte));
                    }
                }
            }
            this.maxFrameNum = this._keyFrameAry[this._keyFrameAry.length - 1].frameNum;
            this.beginTime = this._keyFrameAry[0].frameNum * Pan3d.Scene_data.frameTime;
            this._currentKeyFrame = this._keyFrameAry[0];
        };
        TimeLine.prototype.setAllDataInfo = function ($data) {
            this.isByteData = true;
            var len = $data.dataAry.length;
            for (var i = 0; i < len; i++) {
                var key = this.addKeyFrame($data.dataAry[i].frameNum);
                key.baseValue = $data.dataAry[i].baseValue;
                key.animData = $data.dataAry[i].animData;
            }
            this.maxFrameNum = $data.maxFrameNum;
            this.beginTime = $data.beginTime;
            this._currentKeyFrame = this._keyFrameAry[0];
        };
        TimeLine.prototype.setBaseTimeByte = function (ary, baseTime, baseValueAry) {
            if (baseTime === void 0) { baseTime = 0; }
            if (baseValueAry === void 0) { baseValueAry = null; }
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].type == 1) {
                    if (!this._selfRotaion) {
                        this._selfRotaion = new Pan3d.SelfRotation;
                    }
                    else {
                        this._selfRotaion.reset();
                    }
                    // this._selfRotaion.data = (ary[i].data);
                    this._selfRotaion.dataByte(ary[i].data, ary[i].dataByte);
                    this._selfRotaion.baseTime = baseTime;
                }
                else if (ary[i].type == 2) {
                    if (!this._axisRotaion) {
                        this._axisRotaion = new Pan3d.AxisRotaion;
                    }
                    else {
                        this._axisRotaion.reset();
                    }
                    this._axisRotaion.dataByte(ary[i].data, ary[i].dataByte);
                    this._axisRotaion.baseTime = baseTime;
                }
                else if (ary[i].type == 6) {
                    if (!this._scaleChange) {
                        this._scaleChange = new Pan3d.ScaleChange;
                    }
                    else {
                        this._scaleChange.reset();
                    }
                    //this._scaleChange.data = (ary[i].data);
                    this._scaleChange.dataByte(ary[i].data, ary[i].dataByte);
                    this._scaleChange.baseTime = baseTime;
                }
                else if (ary[i].type == 7) {
                    if (!this._scaleAnim) {
                        this._scaleAnim = new Pan3d.ScaleAnim;
                    }
                    else {
                        this._scaleAnim.reset();
                    }
                    // this._scaleAnim.data = (ary[i].data);
                    this._scaleAnim.dataByte(ary[i].data, ary[i].dataByte);
                    this._scaleAnim.baseTime = baseTime;
                }
                else if (ary[i].type == 8) {
                    if (!this._scaleNosie) {
                        this._scaleNosie = new Pan3d.ScaleNoise;
                    }
                    else {
                        this._scaleNosie.reset();
                    }
                    //this._scaleNosie.data = (ary[i].data);
                    this._scaleNosie.dataByte(ary[i].data, ary[i].dataByte);
                    this._scaleNosie.baseTime = baseTime;
                }
                else if (ary[i].type == 9) {
                    if (!this._axisMove) {
                        this._axisMove = new Pan3d.AxisMove;
                    }
                    else {
                        this._axisMove.reset();
                    }
                    // this._axisMove.data = (ary[i].data);
                    this._axisMove.dataByte(ary[i].data, ary[i].dataByte);
                    this._axisMove.baseTime = baseTime;
                }
            }
        };
        TimeLine.prototype.getByteDataTemp = function ($byte) {
            var obj = new Object;
            var animType = $byte.readInt();
            var dataLen = $byte.readInt();
            obj.data = new Array;
            obj.dataByte = new Array;
            for (var i = 0; i < dataLen; i++) {
                var ko = new Object;
                ko.type = $byte.readInt();
                //  ko.value = $byte.readUTF();
                // obj.data.push(ko);
                if (ko.type == 1) {
                    var num = $byte.readFloat();
                    obj.dataByte.push(num);
                }
                if (ko.type == 2) {
                    var v = new Pan3d.Vector3D();
                    v.x = $byte.readFloat();
                    v.y = $byte.readFloat();
                    v.z = $byte.readFloat();
                    obj.dataByte.push(v);
                }
            }
            obj.type = animType;
            return obj;
        };
        /**
         * 获取最大的帧数
         * @return 最大帧数
         *
         */
        TimeLine.prototype.getMaxFrame = function () {
            return this._keyFrameAry[this._keyFrameAry.length - 1].frameNum;
        };
        TimeLine.prototype.dispose = function () {
            //this._keyFrameAry = null;
            //this._display3D.clear();
            //this._display3D = null;
            //this._currentKeyFrame = null;
        };
        return TimeLine;
    }(Pan3d.EventDispatcher));
    Pan3d.TimeLine = TimeLine;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=TimeLine.js.map