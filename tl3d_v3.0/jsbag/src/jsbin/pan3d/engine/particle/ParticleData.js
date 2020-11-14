var Pan3d;
(function (Pan3d) {
    var ParticleData = /** @class */ (function () {
        function ParticleData() {
            this._delayedTime = 0;
            this._width = 100; //宽度
            this._height = 100; //高度
            this._originWidthScale = 0.5; //原点宽度比例
            this._originHeightScale = 0.5; //原点高度比例
            this._eyeDistance = 0; //距离视点距离
            this._watchEye = false; //是否面向视点
            this._isZiZhuan = false;
            this.overAllScale = 1;
        }
        //public vcData:Float32Array;
        ParticleData.prototype.destory = function () {
            if (this.objData) {
                this.objData.destory();
            }
            this.materialParam.destory();
            this.timelineData.destory();
            this.timelineData = null;
        };
        ParticleData.prototype.uploadGpu = function () {
        };
        ParticleData.prototype.regShader = function () {
        };
        ParticleData.prototype.initVcData = function () {
        };
        ParticleData.prototype.creatPartilce = function () {
            var particle = this.getParticle();
            particle.data = this;
            var tl = new Pan3d.TimeLine();
            tl.setAllDataInfo(this.timelineData);
            particle.setTimeLine(tl);
            particle.onCreated();
            return particle;
        };
        ParticleData.prototype.getParticle = function () {
            return null;
        };
        ParticleData.prototype.setAllByteInfo = function ($byte) {
            this.timelineData = new Pan3d.TimeLineData();
            this.timelineData.setByteData($byte);
            this._beginTime = this.timelineData.beginTime;
            if (this.version >= 15) {
                this._delayedTime = $byte.readFloat();
            }
            this._width = $byte.readFloat();
            this._height = $byte.readFloat();
            this._widthFixed = $byte.readBoolean();
            this._heightFixed = $byte.readBoolean();
            this._originWidthScale = $byte.readFloat();
            this._originHeightScale = $byte.readFloat();
            this._eyeDistance = $byte.readFloat();
            this._alphaMode = $byte.readFloat();
            this._uSpeed = $byte.readFloat();
            this._vSpeed = $byte.readFloat();
            this._animLine = $byte.readFloat();
            this._animRow = $byte.readFloat();
            this._animInterval = $byte.readFloat();
            this._renderPriority = $byte.readFloat();
            this._distortion = $byte.readBoolean();
            this._isUV = $byte.readBoolean();
            this._isU = $byte.readBoolean();
            this._isV = $byte.readBoolean();
            this._life = $byte.readFloat();
            this._life = this._life > 10000 ? Pan3d.Scene_data.MAX_NUMBER : this._life;
            this._watchEye = $byte.readBoolean();
            this._ziZhuanAngly = new Pan3d.Vector3D();
            this._ziZhuanAngly.x = $byte.readFloat();
            this._ziZhuanAngly.y = $byte.readFloat();
            this._ziZhuanAngly.z = $byte.readFloat();
            this._ziZhuanAngly.w = $byte.readFloat();
            this.rotationV3d = new Pan3d.Vector3D;
            this.rotationV3d.x = $byte.readFloat();
            this.rotationV3d.y = $byte.readFloat();
            this.rotationV3d.z = $byte.readFloat();
            this.center = new Pan3d.Vector3D();
            this.center.x = $byte.readFloat();
            this.center.y = $byte.readFloat();
            this.center.z = $byte.readFloat();
            this.center.w = $byte.readFloat();
            this.overAllScale = $byte.readFloat();
            //var materialParamStr: string = $byte.readUTF();
            //this.materialParamData = JSON.parse(materialParamStr);
            if (this._ziZhuanAngly && (this._ziZhuanAngly.x != 0 || this._ziZhuanAngly.y != 0 || this._ziZhuanAngly.z != 0)) {
                this._isZiZhuan = true;
            }
            this.readMaterialPara($byte);
            var strMaterialUrl = $byte.readUTF();
            strMaterialUrl = strMaterialUrl.replace("_byte.txt", ".txt");
            strMaterialUrl = strMaterialUrl.replace(".txt", "_byte.txt");
            this.materialByteUrl = strMaterialUrl;
        };
        Object.defineProperty(ParticleData.prototype, "materialByteUrl", {
            set: function (value) {
                var _this = this;
                if (this._materialUrl == value) {
                    return;
                }
                this._materialUrl = value;
                Pan3d.MaterialManager.getInstance().getMaterialByte(Pan3d.Scene_data.fileRoot + value, function ($matrial) { _this.onMaterialLoad($matrial); });
            },
            enumerable: true,
            configurable: true
        });
        ParticleData.prototype.onMaterialLoad = function ($matrial) {
            this.materialParam = new Pan3d.MaterialParam;
            this.materialParam.setMaterial($matrial);
            this.materialParam.setLife(this._life);
            if (this.materialParamData) {
                this.materialParam.setTextObj(this.materialParamData.texAry);
                this.materialParam.setConstObj(this.materialParamData.conAry);
            }
            Pan3d.MaterialManager.getInstance().loadDynamicTexUtil(this.materialParam);
            this.regShader();
        };
        ParticleData.prototype.readMaterialPara = function ($byte) {
            this.materialParamData = new Object();
            var $materlUrl = $byte.readUTF();
            //  this.materialParamData.materialUrl = materialUrl;
            var texAryLen = $byte.readInt();
            this.materialParamData.texAry = new Array;
            for (var i = 0; i < texAryLen; i++) {
                var temp = new Object;
                temp.isParticleColor = $byte.readBoolean();
                temp.paramName = $byte.readUTF();
                temp.url = $byte.readUTF();
                if (temp.isParticleColor) {
                    temp.curve = new Object;
                    this.readTempCurve($byte, temp.curve);
                }
                this.materialParamData.texAry.push(temp);
            }
            this.readMaterialParaConAry($byte);
        };
        ParticleData.prototype.readTempCurve = function ($byte, curve) {
            curve.values = new Array();
            var has = false;
            if (this.version >= 12) {
                var valuesLen = $byte.readInt();
                if (valuesLen > 0) {
                    var scaleNum = $byte.readFloat();
                }
                for (var j = 0; j < valuesLen; j++) {
                    var rgbLen = $byte.readInt();
                    var valuesArr = new Array;
                    for (var k = 0; k < rgbLen; k++) {
                        valuesArr.push($byte.readByte() / 127 * scaleNum);
                    }
                    curve.values.push(valuesArr);
                }
                has = true;
            }
            curve.type = $byte.readFloat();
            curve.maxFrame = $byte.readFloat();
            curve.sideType = $byte.readBoolean();
            curve.speedType = $byte.readBoolean();
            curve.useColorType = $byte.readBoolean();
            curve.items = this.readItems($byte);
            if (!has) {
                this.makeCurveData(curve);
            }
        };
        ParticleData.prototype.readItems = function ($byte) {
            var items = new Array();
            var itemsLen = $byte.readInt();
            for (var u = 0; u < itemsLen; u++) {
                var $obj = new Object;
                $obj.frame = $byte.readInt();
                $obj.vec3 = $byte.readVector3D(true);
                $obj.rotation = $byte.readVector3D(true);
                $obj.rotationLeft = $byte.readVector3D(true);
                items.push($obj);
            }
            return items;
        };
        ParticleData.prototype.makeCurveData = function ($curve) {
            var arr = $curve.items;
            var r = new Array;
            var g = new Array;
            var b = new Array;
            var a = new Array;
            for (var i = 0; i < arr.length; i++) {
                if (i == (arr.length - 1)) { //最后一个
                    r.push(arr[i].vec3.x);
                    g.push(arr[i].vec3.y);
                    b.push(arr[i].vec3.z);
                    a.push(arr[i].vec3.w);
                }
                else {
                    var $speedNum = arr[i + 1].frame - arr[i].frame;
                    var $A = arr[i].vec3;
                    var $B = arr[i + 1].vec3;
                    var $a = $curve.items[i].rotation;
                    var $b = $curve.items[i + 1].rotationLeft;
                    r = r.concat(this.getBzData($A.x, $B.x, $a.x, $b.x, $speedNum));
                    g = g.concat(this.getBzData($A.y, $B.y, $a.y, $b.y, $speedNum));
                    b = b.concat(this.getBzData($A.z, $B.z, $a.z, $b.z, $speedNum));
                    a = a.concat(this.getBzData($A.w, $B.w, $a.w, $b.w, $speedNum));
                }
            }
            $curve.values = new Array();
            $curve.values[0] = r;
            $curve.values[1] = g;
            $curve.values[2] = b;
            $curve.values[3] = a;
        };
        ParticleData.prototype.getBzData = function ($ax, $bx, ar, br, $speedNum) {
            var num80 = 10;
            var a = new Pan3d.Vector2D(0, $ax * num80);
            var d = new Pan3d.Vector2D($speedNum, $bx * num80);
            var m = new Pan3d.Matrix3D;
            var p = new Pan3d.Vector3D;
            m.identity();
            m.appendRotation(-ar, Pan3d.Vector3D.Z_AXIS);
            p = m.transformVector(new Pan3d.Vector3D($speedNum / 2, 0, 0));
            var b = new Pan3d.Vector2D($speedNum / 2, a.y + p.y);
            m.identity();
            m.appendRotation(-br, Pan3d.Vector3D.Z_AXIS);
            p = m.transformVector(new Pan3d.Vector3D(-$speedNum / 2, 0, 0));
            var c = new Pan3d.Vector2D($speedNum / 2, d.y + p.y);
            var ary = [a, b, c, d];
            var posAry = new Array;
            var baseW = 3;
            for (var i = 1; i < $speedNum * 3; i++) {
                posAry.push(this.drawbezier(ary, i / ($speedNum * 3)));
            }
            var _valueVec = new Array;
            for (i = 0; i < $speedNum; i++) {
                for (var j = 0; j < posAry.length; j++) {
                    if (posAry[j].x >= i) {
                        _valueVec.push(posAry[j].y / num80);
                        break;
                    }
                }
            }
            return _valueVec;
        };
        ParticleData.prototype.drawbezier = function (_array, _time) {
            var _newarray = new Array();
            if (_array.length == 0) {
                return new Pan3d.Vector2D();
            }
            for (var i in _array) {
                _newarray.push(new Pan3d.Vector2D(_array[i].x, _array[i].y));
            }
            while (_newarray.length > 1) {
                for (var j = 0; j < _newarray.length - 1; j++) {
                    this.mathmidpoint(_newarray[j], _newarray[j + 1], _time);
                }
                _newarray.pop();
            }
            return _newarray[0];
        };
        ParticleData.prototype.mathmidpoint = function (a, b, t) {
            var _nx, _ny;
            _nx = a.x + (b.x - a.x) * t;
            _ny = a.y + (b.y - a.y) * t;
            a.x = _nx;
            a.y = _ny;
        };
        ParticleData.prototype.readMaterialParaConAry = function ($byte) {
            var arr = new Array;
            var conAryLen = $byte.readInt();
            for (var i = 0; i < conAryLen; i++) {
                var obj = new Object;
                obj.type = $byte.readFloat();
                obj.indexID = $byte.readFloat();
                obj.paramName = $byte.readUTF();
                obj.curve = new Object();
                this.readTempCurve($byte, obj.curve);
                arr.push(obj);
            }
            this.materialParamData.conAry = arr;
        };
        ParticleData.prototype.setFloat32Vec = function (key, ary) {
        };
        ParticleData.prototype.setFloat32Mat = function (key, ary) {
        };
        return ParticleData;
    }());
    Pan3d.ParticleData = ParticleData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleData.js.map