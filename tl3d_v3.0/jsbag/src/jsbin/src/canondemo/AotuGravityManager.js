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
var canonkey;
(function (canonkey) {
    var GravityVo = /** @class */ (function (_super) {
        __extends(GravityVo, _super);
        function GravityVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 0;
            return _this;
        }
        return GravityVo;
    }(Pan3d.Object3D));
    canonkey.GravityVo = GravityVo;
    var AotuGravityManager = /** @class */ (function () {
        function AotuGravityManager() {
        }
        AotuGravityManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new AotuGravityManager();
            }
            return this._instance;
        };
        AotuGravityManager.prototype.clear = function () {
            this._gravityItem = new Array();
            this.isAotuTrue = false;
            this.isLevelFinish = false;
            console.log("清理连接下落");
        };
        AotuGravityManager.prototype.addPointByObj = function (value) {
            var $gravityVo = new GravityVo();
            $gravityVo.x = value.x;
            $gravityVo.y = value.y;
            $gravityVo.z = value.z;
            $gravityVo.type = 1;
            switch (value.name) {
                case "sign_begin":
                    $gravityVo.type = 1;
                    break;
                case "sign_end":
                    $gravityVo.type = 2;
                    break;
                case "level_finish":
                    $gravityVo.type = 3;
                    break;
                default:
                    console.log("注意还没有这个类型");
                    break;
            }
            this._gravityItem.push($gravityVo);
        };
        AotuGravityManager.prototype.jumpToNextLevel = function () {
            uiview.TopMenuView.getInstance().showLevelUp();
        };
        AotuGravityManager.prototype.showJumddd = function () {
        };
        AotuGravityManager.prototype.showJumpText = function ($scene, $pos) {
            var $jumpVo = new Pan3d.TextJumpUiVo();
            $jumpVo.str = String("1");
            $jumpVo.pos = new Pan3d.Vector3D();
            $jumpVo.pos.x = $pos.x;
            $jumpVo.pos.z = $pos.z;
            $jumpVo.pos.y = $pos.y;
            $jumpVo.type = 1;
            $jumpVo.starttime = Pan3d.TimeUtil.getTimer();
            $jumpVo.endtime = Pan3d.TimeUtil.getTimer() + 1200;
            $scene.bloodManager.setJumpNum($jumpVo);
        };
        AotuGravityManager.prototype.upFrame = function (value) {
            if (this.isLevelFinish) {
                return;
            }
            if (!this.isAotuTrue) {
                //检测是否在连接结束点
                for (var i = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                    var $dis = Pan3d.Vector3D.distance(new Pan3d.Vector3D(value.x, value.y, value.z), new Pan3d.Vector3D(this._gravityItem[i].x, this._gravityItem[i].y, this._gravityItem[i].z));
                    if (this._gravityItem[i].type == 1) {
                        if ($dis < 10) {
                            this.isAotuTrue = true;
                            this.nextGravityVo = this.getNextToVo(new Pan3d.Vector3D(value.x, value.y, value.z));
                            if (this.nextGravityVo) {
                                //   value.x = this._gravityItem[i].x;
                                //   value.y = this._gravityItem[i].y;
                                //   value.z = this._gravityItem[i].z;
                                value.body.sleep();
                                value.body.wakeUp();
                                console.log("连接点开始自动&&&&&&&&&&&");
                            }
                            return;
                        }
                    }
                    if (this._gravityItem[i].type == 3) {
                        if ($dis < 12) {
                            value.body.sleep();
                            console.log("等级完成");
                            this.isLevelFinish = true;
                            this.jumpToNextLevel();
                            return;
                        }
                    }
                }
            }
            else {
                //  console.log("开始自己下落")
                if (this.nextGravityVo) {
                    var aa = new Pan3d.Vector3D(value.x, value.y, value.z);
                    var bb = new Pan3d.Vector3D(this.nextGravityVo.x, this.nextGravityVo.y, this.nextGravityVo.z);
                    var cc = bb.subtract(aa);
                    if (Math.abs(value.y - this.nextGravityVo.y) < 10) {
                        cc.normalize();
                        cc.scaleBy(canonkey.Physics.gravity980);
                        value.x = this.nextGravityVo.x;
                        value.y = this.nextGravityVo.y;
                        value.z = this.nextGravityVo.z;
                        this.isAotuTrue = false;
                        this.nextGravityVo = null;
                        value.body.sleep();
                        value.body.wakeUp();
                        console.log("下落到结点");
                        this.showJumpText(value._scene, new Pan3d.Vector3D(value.x, value.y, value.z));
                    }
                    else {
                        cc.normalize();
                        cc.scaleBy(canonkey.Physics.gravity980);
                        canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(cc);
                    }
                }
            }
        };
        AotuGravityManager.prototype.getNextToVo = function ($v3d) {
            var $vo;
            var minh;
            for (var i = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                var disk = $v3d.y - this._gravityItem[i].y;
                if (this._gravityItem[i].type == 2 && disk > 0) {
                    if (isNaN(minh)) {
                        $vo = this._gravityItem[i];
                        minh = disk;
                    }
                    else {
                        if (minh > disk) {
                            $vo = this._gravityItem[i];
                            minh = disk;
                        }
                    }
                }
            }
            return $vo;
        };
        return AotuGravityManager;
    }());
    canonkey.AotuGravityManager = AotuGravityManager;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=AotuGravityManager.js.map