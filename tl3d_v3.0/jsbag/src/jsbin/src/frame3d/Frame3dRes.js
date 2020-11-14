var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var frame3d;
(function (frame3d) {
    var Object3D = Pan3d.Object3D;
    var BaseRes = Pan3d.BaseRes;
    var LoadManager = Pan3d.LoadManager;
    var Pan3dByteArray = Pan3d.Pan3dByteArray;
    var Vector3D = Pan3d.Vector3D;
    var Quaternion = Pan3d.Quaternion;
    var Matrix3D = Pan3d.Matrix3D;
    var FrameLinePointVo = /** @class */ (function (_super) {
        __extends(FrameLinePointVo, _super);
        function FrameLinePointVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FrameLinePointVo.prototype.writeObject = function ($obj) {
            this.time = $obj.time;
            this.id = $obj.id;
            this.iskeyFrame = $obj.iskeyFrame;
            this.isAnimation = $obj.isAnimation;
            this.x = $obj.x / 10;
            this.y = $obj.y / 10;
            this.z = $obj.z / 10;
            this.scaleX = $obj.scaleX / 10;
            this.scaleY = $obj.scaleY / 10;
            this.scaleZ = $obj.scaleZ / 10;
            this.rotationX = $obj.rotationX;
            this.rotationY = $obj.rotationY;
            this.rotationZ = $obj.rotationZ;
            this.data = $obj.data;
            FrameLinePointVo.maxTime = Math.max(this.time, FrameLinePointVo.maxTime);
        };
        FrameLinePointVo.maxTime = 0;
        return FrameLinePointVo;
    }(Object3D));
    frame3d.FrameLinePointVo = FrameLinePointVo;
    var FrameNodeVo = /** @class */ (function () {
        function FrameNodeVo() {
        }
        FrameNodeVo.prototype.writeObject = function ($obj) {
            this.id = $obj.id;
            this.name = $obj.name;
            this.url = $obj.url;
            this.pointitem = new Array;
            for (var j = 0; j < $obj.pointitem.length; j++) {
                var $FrameLinePointVo = new FrameLinePointVo();
                $FrameLinePointVo.writeObject($obj.pointitem[j]);
                this.pointitem.push($FrameLinePointVo);
            }
            this.resurl = $obj.resurl;
            if (this.url.search(".prefab") != -1) {
                this.materialInfoArr = new Array;
                for (var i = 0; $obj.materialInfoArr && i < $obj.materialInfoArr.length; i++) {
                    this.materialInfoArr.push($obj.materialInfoArr[i]);
                }
                this.noLight = $obj.noLight;
                this.directLight = $obj.directLight;
                this.receiveShadow = $obj.receiveShadow;
                if (this.noLight == false) {
                    this.lighturl = $obj.lighturl;
                }
                this.materialurl = $obj.materialurl;
                this.type = 1;
            }
            if (this.url.search(".lyf") != -1) {
                this.type = 2;
            }
            if (this.url.search(".zzw") != -1) {
                this.type = 3;
            }
        };
        return FrameNodeVo;
    }());
    frame3d.FrameNodeVo = FrameNodeVo;
    var Frame3dRes = /** @class */ (function (_super) {
        __extends(Frame3dRes, _super);
        function Frame3dRes() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.frameNum = 1;
            return _this;
        }
        Frame3dRes.prototype.load = function ($url, $completeFun) {
            var _this = this;
            this._completeFun = $completeFun;
            if (Frame3dRes._dic[$url]) {
                this.loadComplete(Frame3dRes._dic[$url]);
            }
            else {
                LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, function ($byte) {
                    Frame3dRes._dic[$url] = $byte;
                    _this.loadComplete(Frame3dRes._dic[$url]);
                }, null);
            }
        };
        Frame3dRes.prototype.loadComplete = function ($byte) {
            var _this = this;
            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            if (this.version >= 31) {
            }
            var $str = this._byte.readUTF();
            var $itemstr = $str.split("/");
            Frame3dRes.sceneFileroot = $str.replace($itemstr[$itemstr.length - 1], "");
            Frame3dRes.fileName = $itemstr[$itemstr.length - 1];
            Frame3dRes.frameSpeedNum = this._byte.readInt();
            //     console.log("版本", this.version, "frameSpeedNum", Frame3dRes.frameSpeedNum)
            this.readSceneInfo();
            this.read(function () { _this.readNext(); }); //img
        };
        Frame3dRes.prototype.toVect4 = function ($num) {
            var temp = Math.floor(65536 * $num);
            var a = Math.floor(temp / 256);
            var b = Math.floor(temp - a * 256);
            return new Vector3D(a / 256, b / 256, 0, 1);
        };
        Frame3dRes.prototype.toNum = function (vect) {
            var $a = vect.x * 256;
            var $b = vect.y * 256;
            var $bnum = ($a * 256 + $b) / 65536;
            console.log("$bnum", $bnum);
            return ($a * 256 + $b) / 65536;
        };
        //收获环境参数
        Frame3dRes.prototype.readSceneInfo = function () {
            var size = this._byte.readInt();
            var $obj = JSON.parse(this._byte.readUTFBytes(size));
        };
        Frame3dRes.prototype.readNext = function () {
            this.read(); //obj
            this.read(); //material
            this.read(); //particle;
            this.readFrame3dScene();
        };
        Frame3dRes.prototype.readFrame3dScene = function () {
            this.frameItem = new Array;
            var size = this._byte.readInt();
            var $scene = JSON.parse(this._byte.readUTFBytes(size));
            for (var i = 0; i < $scene.length; i++) {
                var $frameNodeVo = new FrameNodeVo();
                $frameNodeVo.writeObject($scene[i]);
                this.frameItem.push($frameNodeVo);
            }
            this._completeFun();
        };
        Frame3dRes._dic = {};
        return Frame3dRes;
    }(BaseRes));
    frame3d.Frame3dRes = Frame3dRes;
    var FrameFileNode = /** @class */ (function (_super) {
        __extends(FrameFileNode, _super);
        function FrameFileNode() {
            return _super.call(this) || this;
        }
        FrameFileNode.prototype.setFrameNodeVo = function ($vo) {
            this.frameNodeVo = $vo;
            if (this.frameNodeVo.type == 1) {
            }
        };
        FrameFileNode.prototype.update = function (frameNum) {
            this.sceneVisible = this.isVisible(frameNum);
            if (this.sceneVisible) {
                this.setModelSprite(this.playFrameVoByTime(frameNum));
            }
        };
        FrameFileNode.prototype.playFrameVoByTime = function ($time) {
            var $keyC;
            var $a = this.getPreFrameLinePointVoByTime($time);
            var $b = this.getNextFrameLinePointVoByTime($time);
            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time == $time) {
                    $keyC = this.frameNodeVo.pointitem[i];
                }
            }
            if ($keyC) {
                if ($keyC.iskeyFrame) {
                    return $keyC;
                }
            }
            else {
                if ($a && !$a.isAnimation) {
                    return $a;
                }
                else if ($a && $b) {
                    return this.setModelData($a, $b, $time);
                }
            }
            return null;
        };
        FrameFileNode.prototype.getNextFrameLinePointVoByTime = function ($time) {
            var $next;
            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time >= $time) {
                    if (!$next || $next.time > this.frameNodeVo.pointitem[i].time) {
                        $next = this.frameNodeVo.pointitem[i];
                    }
                }
            }
            return $next;
        };
        FrameFileNode.prototype.isVisible = function ($num) {
            var $min = this.frameNodeVo.pointitem[0].time;
            var $max = this.frameNodeVo.pointitem[this.frameNodeVo.pointitem.length - 1].time;
            var dd = this.getPreFrameLinePointVoByTime($num);
            if ($num >= $min && $num <= $max && dd) {
                return dd.iskeyFrame;
            }
            else {
                return false;
            }
        };
        FrameFileNode.prototype.getPreFrameLinePointVoByTime = function ($time) {
            var $pre;
            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time <= $time) {
                    if (!$pre || $pre.time < this.frameNodeVo.pointitem[i].time) {
                        $pre = this.frameNodeVo.pointitem[i];
                    }
                }
            }
            return $pre;
        };
        FrameFileNode.prototype.setModelData = function ($a, $b, $time) {
            var $num = ($time - $a.time) / ($b.time - $a.time);
            var $obj = new FrameLinePointVo;
            $obj.x = $a.x + ($b.x - $a.x) * $num;
            $obj.y = $a.y + ($b.y - $a.y) * $num;
            $obj.z = $a.z + ($b.z - $a.z) * $num;
            $obj.scaleX = $a.scaleX + ($b.scaleX - $a.scaleX) * $num;
            $obj.scaleY = $a.scaleY + ($b.scaleY - $a.scaleY) * $num;
            $obj.scaleZ = $a.scaleZ + ($b.scaleZ - $a.scaleZ) * $num;
            var $eulerAngle = this.qtoq($a, $b, $num);
            $obj.rotationX = $eulerAngle.x;
            $obj.rotationY = $eulerAngle.y;
            $obj.rotationZ = $eulerAngle.z;
            $obj.data = $a.data; //存前面一个的数所有 
            if (!$b.iskeyFrame) {
                return $a;
            }
            else {
                return $obj;
            }
        };
        FrameFileNode.prototype.setModelSprite = function ($obj) {
            if (this.sprite) {
                this.sprite.x = $obj.x;
                this.sprite.y = $obj.y;
                this.sprite.z = $obj.z;
                this.sprite.scaleX = $obj.scaleX;
                this.sprite.scaleY = $obj.scaleY;
                this.sprite.scaleZ = $obj.scaleZ;
                this.sprite.rotationX = $obj.rotationX;
                this.sprite.rotationY = $obj.rotationY;
                this.sprite.rotationZ = $obj.rotationZ;
            }
        };
        FrameFileNode.prototype.qtoq = function ($a, $b, $time) {
            var $m0 = new Matrix3D();
            $m0.appendRotation($a.rotationX, Vector3D.X_AXIS);
            $m0.appendRotation($a.rotationY, Vector3D.Y_AXIS);
            $m0.appendRotation($a.rotationZ, Vector3D.Z_AXIS);
            var q0 = new Quaternion();
            q0.fromMatrix($m0);
            var $m1 = new Matrix3D();
            $m1.appendRotation($b.rotationX, Vector3D.X_AXIS);
            $m1.appendRotation($b.rotationY, Vector3D.Y_AXIS);
            $m1.appendRotation($b.rotationZ, Vector3D.Z_AXIS);
            var q1 = new Quaternion();
            q1.fromMatrix($m1);
            var resultQ = new Quaternion;
            resultQ.slerp(q0, q1, $time);
            var $ve = resultQ.toEulerAngles();
            $ve.scaleBy(180 / Math.PI);
            if (isNaN($ve.x) || isNaN($ve.y) || isNaN($ve.z)) {
                $ve.x = $a.rotationX;
                $ve.y = $a.rotationY;
                $ve.z = $a.rotationZ;
            }
            return $ve;
        };
        return FrameFileNode;
    }(Vector3D));
    frame3d.FrameFileNode = FrameFileNode;
})(frame3d || (frame3d = {}));
//# sourceMappingURL=Frame3dRes.js.map