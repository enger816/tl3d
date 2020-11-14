var linkplay;
(function (linkplay) {
    var Display3D = Pan3d.Display3D;
    var Vector3D = Pan3d.Vector3D;
    var TimeUtil = Pan3d.TimeUtil;
    var LinkPlayGravityManager = /** @class */ (function () {
        function LinkPlayGravityManager() {
        }
        LinkPlayGravityManager.getInstance = function () {
            if (!LinkPlayGravityManager._instance) {
                LinkPlayGravityManager._instance = new LinkPlayGravityManager();
            }
            return LinkPlayGravityManager._instance;
        };
        LinkPlayGravityManager.prototype.clear = function () {
            this._gravityItem = new Array();
        };
        LinkPlayGravityManager.prototype.addPointByObj = function (value) {
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
        //处理掉落起始点
        LinkPlayGravityManager.prototype.moveToPosByDis = function (value, $GravityVo, $dis) {
            var bb = new Vector3D($GravityVo.x, $GravityVo.y, $GravityVo.z);
            var aa = new Vector3D(value.x, value.y, value.z);
            var cc = bb.subtract(aa);
            cc.normalize();
            cc.scaleBy(1);
            value.x += cc.x;
            value.y += cc.y;
            value.z += cc.z;
            value.body.velocity.x = 0;
            value.body.velocity.y = 0;
            value.body.velocity.z = 0;
        };
        LinkPlayGravityManager.prototype.removeGravity = function ($vo) {
            var index = this._gravityItem.indexOf($vo);
            if (index != -1) {
                this._gravityItem.splice(index, 1);
            }
        };
        LinkPlayGravityManager.prototype.upFrame = function (ball) {
            if (!ball.beginGravityVo) {
                var selfPos = ball.getPostionV3d();
                for (var i = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                    var $dis = Display3D.distance(selfPos, this._gravityItem[i]);
                    if (this._gravityItem[i].type == 1) {
                        if ($dis < 12) {
                            ball.body.sleep();
                            ball.aotuFallDownTm = TimeUtil.getTimer();
                            ball.beginGravityVo = this._gravityItem[i];
                            ball.endGravityVo = this.getNextTo(selfPos);
                            MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 4, pos: { x: selfPos.x, y: selfPos.y, z: selfPos.z } }));
                        }
                    }
                }
            }
        };
        LinkPlayGravityManager.prototype.getBeing = function (selfPos) {
            var $to;
            var $minDis;
            for (var i = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                if (this._gravityItem[i].type == 1) {
                    var $dis = Display3D.distance(selfPos, this._gravityItem[i]);
                    if (!$to || $minDis > $dis) {
                        $to = this._gravityItem[i];
                        $minDis = $dis;
                    }
                }
            }
            return $to;
        };
        LinkPlayGravityManager.prototype.getNextTo = function (selfPos) {
            var $to;
            var $minDis;
            for (var i = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                if (this._gravityItem[i].type == 2) {
                    var $dis = Display3D.distance(selfPos, this._gravityItem[i]);
                    if (!$to || $minDis > $dis) {
                        $to = this._gravityItem[i];
                        $minDis = $dis;
                    }
                }
            }
            return $to;
        };
        LinkPlayGravityManager.prototype.getNextToVo = function ($v3d) {
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
        return LinkPlayGravityManager;
    }());
    linkplay.LinkPlayGravityManager = LinkPlayGravityManager;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayGravityManager.js.map