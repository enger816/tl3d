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
    var SkillRes = /** @class */ (function (_super) {
        __extends(SkillRes, _super);
        function SkillRes() {
            var _this = _super.call(this) || this;
            _this.meshBatchNum = 1;
            return _this;
        }
        SkillRes.prototype.load = function (url, $fun) {
            var _this = this;
            this._fun = $fun;
            Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                _this.loadComplete($byte);
            });
        };
        SkillRes.prototype.loadComplete = function ($byte) {
            var _this = this;
            this._byte = new Pan3d.Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            this.skillUrl = this._byte.readUTF();
            ////console.log("aaaaaaaaaaaaaa " + $byte.byteLength + "," + this._byte.length);
            this.read(function () { _this.readNext(); }); //readimg 
        };
        SkillRes.prototype.readNext = function () {
            this.read(); //readmaterial
            this.read(); //readparticle;
            if (this.version < 27) {
                var str = this._byte.readUTF();
            }
            this.data = this.readData(this._byte);
            this._fun();
        };
        SkillRes.prototype.readData = function ($byte) {
            var len = $byte.readInt();
            var byteData = new Object;
            for (var i = 0; i < len; i++) {
                var $obj = new Object;
                var $name = $byte.readUTF();
                var $action = $byte.readUTF();
                $obj.skillname = $name;
                $obj.action = $action;
                $obj.type = $byte.readFloat();
                if (this.version >= 26) {
                    $obj.blood = $byte.readInt();
                    if ($obj.blood == 0) {
                        $obj.blood = Pan3d.SkillVo.defaultBloodTime;
                    }
                }
                else {
                    $obj.blood = Pan3d.SkillVo.defaultBloodTime;
                }
                if (this.version >= 32) {
                    var soundTime = $byte.readInt();
                    if (soundTime > 0) {
                        var soundName = $byte.readUTF();
                        $obj.sound = { time: soundTime, name: soundName };
                    }
                }
                if (this.version >= 33) {
                    var shockLen = $byte.readInt();
                    if (shockLen) {
                        var shockAry = new Array;
                        for (var k = 0; k < shockLen; k++) {
                            var shobj = new Object;
                            shobj.time = $byte.readInt();
                            shobj.lasttime = $byte.readInt();
                            shobj.amp = $byte.readFloat();
                            shockAry.push(shobj);
                        }
                        $obj.shock = shockAry;
                    }
                }
                // $obj.data=JSON.parse($byte.readUTF())
                $obj.data = new Array;
                var dLen = $byte.readInt();
                for (var j = 0; j < dLen; j++) {
                    var dataObj = new Object;
                    dataObj.url = $byte.readUTF();
                    dataObj.frame = $byte.readFloat();
                    switch ($obj.type) {
                        case 1:
                            dataObj.beginType = $byte.readInt();
                            if (dataObj.beginType == 0) {
                                dataObj.beginPos = new Pan3d.Vector3D();
                                dataObj.beginPos.x = $byte.readFloat();
                                dataObj.beginPos.y = $byte.readFloat();
                                dataObj.beginPos.z = $byte.readFloat();
                            }
                            else if (dataObj.beginType == 1) {
                                dataObj.beginSocket = $byte.readUTF();
                            }
                            dataObj.hitSocket = $byte.readUTF();
                            dataObj.endParticle = $byte.readUTF();
                            dataObj.multype = $byte.readInt();
                            dataObj.speed = $byte.readFloat();
                            break;
                        case 3:
                            dataObj.beginSocket = $byte.readUTF();
                            dataObj.beginType = $byte.readFloat();
                            dataObj.multype = $byte.readFloat();
                            dataObj.speed = $byte.readFloat();
                            break;
                        case 4:
                            if (this.version >= 27) {
                                var hasSocket = $byte.readBoolean();
                                dataObj.hasSocket = hasSocket;
                                if (hasSocket) {
                                    dataObj.socket = $byte.readUTF();
                                }
                                else {
                                    dataObj.pos = this.readV3d($byte);
                                    dataObj.rotation = this.readV3d($byte);
                                }
                            }
                            else {
                                dataObj.hasSocket = false;
                                dataObj.pos = this.readV3d($byte);
                                dataObj.rotation = this.readV3d($byte);
                            }
                            break;
                        default:
                            alert("没有类型readData");
                            break;
                    }
                    $obj.data.push(dataObj);
                }
                byteData[$name] = $obj;
            }
            return byteData;
        };
        SkillRes.prototype.readV3d = function ($byte) {
            var v3d = new Pan3d.Vector3D;
            v3d.x = $byte.readFloat();
            v3d.y = $byte.readFloat();
            v3d.z = $byte.readFloat();
            v3d.w = $byte.readFloat();
            return v3d;
        };
        return SkillRes;
    }(Pan3d.BaseRes));
    Pan3d.SkillRes = SkillRes;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillRes.js.map