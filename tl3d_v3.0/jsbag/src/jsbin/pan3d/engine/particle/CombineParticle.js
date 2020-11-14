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
    var CombineParticle = /** @class */ (function (_super) {
        __extends(CombineParticle, _super);
        function CombineParticle() {
            var _this = _super.call(this) || this;
            _this._maxTime = 1000000;
            _this._rotationX = 0;
            _this._rotationY = 0;
            _this._rotationZ = 0;
            _this.hasMulItem = false;
            _this.sceneVisible = true;
            _this.dynamic = false;
            _this.hasDestory = false;
            _this._displayAry = new Array;
            _this._time = 0;
            _this.bindMatrix = new Pan3d.Matrix3D;
            _this.invertBindMatrix = new Pan3d.Matrix3D;
            _this.bindVecter3d = new Pan3d.Vector3D();
            _this.bindScale = new Pan3d.Vector3D(1, 1, 1);
            _this.groupMatrix = new Pan3d.Matrix3D();
            _this.groupRotationMatrix = new Pan3d.Matrix3D();
            return _this;
            //this.groupBindMatrix = new Matrix3D();
        }
        Object.defineProperty(CombineParticle.prototype, "displayAry", {
            get: function () {
                return this._displayAry;
            },
            set: function (value) {
                this._displayAry = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "maxTime", {
            set: function (value) {
                this._maxTime = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "bindTarget", {
            set: function (value) {
                this._bindTarget = value;
                this.invertBindMatrix.isIdentity = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "bindSocket", {
            set: function (value) {
                this._bindSocket = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "x", {
            get: function () {
                return this.bindVecter3d.x;
            },
            set: function (value) {
                this.bindVecter3d.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "y", {
            get: function () {
                return this.bindVecter3d.y;
            },
            set: function (value) {
                this.bindVecter3d.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "z", {
            get: function () {
                return this.bindVecter3d.z;
            },
            set: function (value) {
                this.bindVecter3d.z = value;
            },
            enumerable: true,
            configurable: true
        });
        CombineParticle.prototype.setPos = function ($xpos, $ypos, $zpos) {
            this.bindVecter3d.setTo($xpos, $ypos, $zpos);
            for (var i = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].resetPos();
            }
        };
        CombineParticle.prototype.setMulPos = function (ary) {
            for (var i = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].resetMulPos(ary);
            }
        };
        Object.defineProperty(CombineParticle.prototype, "scaleX", {
            set: function (value) {
                this.bindScale.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "scaleY", {
            set: function (value) {
                this.bindScale.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "scaleZ", {
            set: function (value) {
                this.bindScale.z = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "rotationX", {
            set: function (value) {
                this._rotationX = value;
                this.applyRotation();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "rotationY", {
            set: function (value) {
                this._rotationY = value;
                this.applyRotation();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CombineParticle.prototype, "rotationZ", {
            set: function (value) {
                this._rotationZ = value;
                this.applyRotation();
            },
            enumerable: true,
            configurable: true
        });
        CombineParticle.prototype.applyRotation = function () {
            this.bindMatrix.identity();
            this.bindMatrix.appendRotation(this._rotationX, Pan3d.Vector3D.X_AXIS);
            this.bindMatrix.appendRotation(this._rotationY, Pan3d.Vector3D.Y_AXIS);
            this.bindMatrix.appendRotation(this._rotationZ, Pan3d.Vector3D.Z_AXIS);
            this.bindMatrix.copyTo(this.invertBindMatrix);
            this.invertBindMatrix.invert();
            this.invertBindMatrix.isIdentity = false;
        };
        CombineParticle.prototype.setGroup = function ($pos, $rotaion, $scale) {
            this._isInGroup = true;
            this._groupPos = $pos;
            this._groupRotation = $rotaion;
            this._groupScale = $scale;
            this.groupMatrix.isIdentity = false;
            this.groupMatrix.identity();
            this.groupMatrix.appendScale($scale.x, $scale.y, $scale.z);
            this.groupMatrix.appendRotation($rotaion.x, Pan3d.Vector3D.X_AXIS);
            this.groupMatrix.appendRotation($rotaion.y, Pan3d.Vector3D.Y_AXIS);
            this.groupMatrix.appendRotation($rotaion.z, Pan3d.Vector3D.Z_AXIS);
            this.groupMatrix.appendTranslation($pos.x, $pos.y, $pos.z);
            this.groupRotationMatrix.isIdentity = false;
            this.groupRotationMatrix.identity();
            this.groupRotationMatrix.prependRotation($rotaion.z, Pan3d.Vector3D.Z_AXIS);
            this.groupRotationMatrix.prependRotation($rotaion.y, Pan3d.Vector3D.Y_AXIS);
            this.groupRotationMatrix.prependRotation($rotaion.x, Pan3d.Vector3D.X_AXIS);
        };
        CombineParticle.prototype.setDataByte = function (byte) {
            byte.position = 0;
            var version = byte.readInt();
            var len = byte.readInt();
            //this._sourceComNum = 0;
            this._maxTime = 0;
            //this._sourceAllNum = len;
            this._displayAry = new Array;
            for (var i = 0; i < len; i++) {
                var $particleType = byte.readInt();
                var display3D = this.getDisplay3DById($particleType);
                display3D.setAllByteInfo(byte, version);
                display3D.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
                this._displayAry.push(display3D);
                if (display3D.timeline.maxFrameNum > this._maxTime) {
                    this._maxTime = display3D.timeline.maxFrameNum;
                }
            }
            this._maxTime *= Pan3d.Scene_data.frameTime;
        };
        CombineParticle.prototype.addPrticleItem = function ($dis) {
            $dis.visible = false;
            $dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
            this._displayAry.push($dis);
        };
        CombineParticle.prototype.getDisplay3DById = function (particleType) {
            var diaplayInfo = new Object;
            diaplayInfo.particleType = particleType;
            return this.getDisplay3D(diaplayInfo);
        };
        CombineParticle.prototype.setData = function (ary) {
            //this._sourceComNum = 0;
            //this._sourceAllNum = ary.length; 
            this._displayAry = new Array;
            this._maxTime = 0;
            for (var i = 0; i < ary.length; i++) {
                var diaplayInfo = ary[i].display;
                var display3D = this.getDisplay3D(diaplayInfo);
                //display3D.setAllInfo(ary[i]);
                display3D.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
                //display3D.addEventListener(EngineEvent.COMPLETE, this.onSourceLoadCom, this);
                //display3D.bindTarget = _bindTarget;
                //display3D.bindSocket = _bindSocket;
                //display3D.setAllInfo(diaplayInfo);
                //display3D.priority = priority;
                //display3D.outVisible = this._visible;
                //display3D.isInGroup = _isInGroup;
                //display3D.groupPos = _groupPos;
                //display3D.groupRotation = _groupRotation;
                //display3D.groupScale = _groupScale;
                this._displayAry.push(display3D);
                if (display3D.timeline.maxFrameNum > this._maxTime) {
                    this._maxTime = display3D.timeline.maxFrameNum;
                }
            }
            this._maxTime *= Pan3d.Scene_data.frameTime;
            //updateMatrix();
            //updateBind();
            //if (_hasStage) {
            //    addToRender();
            //}
            //maxTime = getMaxNum();
            //_hasData = true;
            //if (_cloneList) {//如果有对应的克隆队列
            //    for (i = 0; i < _cloneList.length; i++) {
            //        _cloneList[i].cloneData(this);
            //    }
            //    _cloneList.length = 0;
            //    _cloneList = null;
            //}
            //if (_hasRealDispose) {
            //    realDispose();
            //}
        };
        CombineParticle.prototype.updateTime = function (t) {
            this._time += t;
            if (!this._displayAry) {
                return;
            }
            for (var i = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].updateTime(this._time);
            }
            this.updateBind();
            if (this._time >= this._maxTime) {
                this.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
            }
        };
        CombineParticle.prototype.updateBind = function () {
            if (this._bindTarget) {
                this._bindTarget.getSocket(this._bindSocket, this.bindMatrix);
                this.bindVecter3d.setTo(this.bindMatrix.x, this.bindMatrix.y, this.bindMatrix.z);
                this.bindMatrix.identityPostion();
                if (!this.groupRotationMatrix.isIdentity) {
                    this.bindMatrix.copyTo(this.invertBindMatrix);
                    this.invertBindMatrix.prepend(this.groupRotationMatrix);
                    this.invertBindMatrix.invert();
                }
                else {
                    this.bindMatrix.invertToMatrix(this.invertBindMatrix);
                }
                //if (this.hasMulItem){
                //    if (this._bindTarget.getSunType() == 1){
                //        var bt: any = this._bindTarget;
                //        if (typeof bt.getMulSocket == 'function') {
                //            for (var i: number = 0; i < this._displayAry.length; i++) {
                //                bt.getMulSocket(this._displayAry[i].getMulBindList());
                //            }
                //        }
                //    }
                //}
            }
        };
        CombineParticle.prototype.reset = function () {
            this._time = 0;
            for (var i = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].reset();
            }
        };
        CombineParticle.prototype.update = function () {
            if (!this.sceneVisible) {
                return;
            }
            if (!this._displayAry) {
                return;
            }
            for (var i = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].update();
            }
        };
        CombineParticle.prototype.updateItem = function (idx) {
            if (!this.sceneVisible) {
                return;
            }
            if (this.hasDestory) {
                return;
            }
            this._displayAry[idx].update();
        };
        Object.defineProperty(CombineParticle.prototype, "size", {
            get: function () {
                if (!this._displayAry) {
                    return 0;
                }
                return this._displayAry.length;
            },
            enumerable: true,
            configurable: true
        });
        //private onSourceLoadCom(event: BaseEvent): void {
        //    //console.log(event.type);
        //    event.target.removeEventListener(BaseEvent.COMPLETE, this.onSourceLoadCom, this);
        //}
        CombineParticle.prototype.getDisplay3D = function (obj) {
            var types = obj.particleType;
            var display3D;
            switch (types) {
                case 1:
                    {
                        display3D = new Pan3d.Display3DFacetParticle();
                        break;
                    }
                case 18:
                    {
                        display3D = new Pan3d.Display3DBallPartilce();
                        break;
                    }
                case 3:
                    {
                        display3D = new Pan3d.Display3DLocusPartilce();
                        break;
                    }
                case 14:
                    {
                        display3D = new Pan3d.Display3DLocusBallPartilce();
                        break;
                    }
                case 9:
                    {
                        display3D = new Pan3d.Display3DModelObjParticle();
                        break;
                    }
                case 4:
                    {
                        display3D = new Pan3d.Display3DModelPartilce();
                        break;
                    }
                case 7:
                    {
                        display3D = new Pan3d.Display3dModelAnimParticle();
                        break;
                    }
                case 8:
                    {
                        display3D = new Pan3d.Display3DFollowPartilce();
                        break;
                    }
                // case 12:
                //     {
                //         display3D = new Display3DFollowLocusPartilce();
                //         break;
                //     }
                //case 22:
                //    {
                //        display3D = new Display3DFollowMulLocusParticle();
                //        this.hasMulItem = true;
                //        break;
                //    }
            }
            display3D.visible = false;
            return display3D;
        };
        CombineParticle.prototype.destory = function () {
            if (this.sourceData) {
                this.sourceData.useNum--;
            }
            for (var i = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].destory();
            }
            this._displayAry.length = 0;
            this._displayAry = null;
            this.bindMatrix = null;
            this.bindVecter3d = null;
            this.bindScale = null;
            this.invertBindMatrix = null;
            this._bindTarget = null;
            this._bindSocket = null;
            this._groupPos = null;
            this._groupRotation = null;
            this._groupScale = null;
            this.groupMatrix = null;
            this.groupRotationMatrix = null;
            this.hasDestory = true;
        };
        return CombineParticle;
    }(Pan3d.EventDispatcher));
    Pan3d.CombineParticle = CombineParticle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=CombineParticle.js.map