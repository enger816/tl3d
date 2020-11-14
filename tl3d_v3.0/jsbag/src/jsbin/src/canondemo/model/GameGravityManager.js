var game;
(function (game) {
    var TextJumpUiVo = Pan3d.TextJumpUiVo;
    var Vector3D = Pan3d.Vector3D;
    var TimeUtil = Pan3d.TimeUtil;
    var Display3D = Pan3d.Display3D;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameGravityManager = /** @class */ (function () {
        function GameGravityManager() {
        }
        GameGravityManager.getInstance = function () {
            if (!GameGravityManager._instance) {
                GameGravityManager._instance = new GameGravityManager();
            }
            return GameGravityManager._instance;
        };
        GameGravityManager.prototype.clear = function () {
            this._gravityItem = new Array();
            game.GameDataModel.lastRevivePos = null;
            game.GameDataModel.isLevelFinish = false;
            this.needCallEndlessClear = false;
        };
        GameGravityManager.prototype.addPointByObj = function (value) {
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
        GameGravityManager.prototype.showJumpText = function ($scene, $pos) {
            var $jumpVo = new TextJumpUiVo();
            $jumpVo.str = String("1");
            $jumpVo.pos = new Vector3D();
            $jumpVo.pos.x = $pos.x;
            $jumpVo.pos.z = $pos.z;
            $jumpVo.pos.y = $pos.y;
            $jumpVo.type = 1;
            $jumpVo.starttime = TimeUtil.getTimer();
            $jumpVo.endtime = TimeUtil.getTimer() + 1200;
            $scene.bloodManager.setJumpNum($jumpVo);
        };
        GameGravityManager.prototype.getNextToVelocity = function ($body, $GravityVo) {
            var aa = new Vector3D($GravityVo.x, $GravityVo.y, $GravityVo.z);
            var bb = new Vector3D(this.nextGravityVo.x, this.nextGravityVo.y, this.nextGravityVo.z);
            var cc = bb.subtract(aa);
            cc.normalize();
            cc.scaleBy(canonkey.Physics.gravity980 * 2);
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(cc);
            $body.sleep();
            $body.wakeUp();
        };
        //处理掉落起始点
        GameGravityManager.prototype.moveToPosByDis = function (value, $GravityVo, $dis) {
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
        GameGravityManager.prototype.removeGravity = function ($vo) {
            var index = this._gravityItem.indexOf($vo);
            if (index != -1) {
                this._gravityItem.splice(index, 1);
            }
        };
        GameGravityManager.prototype.upFrame = function (value) {
            var ball = value;
            if (game.GameDataModel.isLevelFinish) {
                return;
            }
            if (!ball.beginGravityVo) {
                //检测是否在连接结束点
                var selfPos = ball.getPostionV3d();
                for (var i = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                    var $dis = Display3D.distance(selfPos, this._gravityItem[i]);
                    if (this._gravityItem[i].type == 1) {
                        if ($dis < 12) {
                            if ($dis < 1) {
                                ball.body.sleep();
                                ball.aotuFallDownTm = TimeUtil.getTimer();
                                ball.beginGravityVo = this._gravityItem[i];
                                ball.endGravityVo = this.getNextTo(selfPos);
                                if (GameData.gameType == 2) {
                                    ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_NEED_ADD_SCENE));
                                }
                            }
                            else {
                                this.moveToPosByDis(value, this._gravityItem[i], $dis);
                            }
                        }
                    }
                    if (this._gravityItem[i].type == 3) {
                        if ($dis < 10) {
                            if ($dis < 1) {
                                value.body.sleep();
                                console.log("等级完成", game.GameDataModel.levelNum);
                                game.GameDataModel.isLevelFinish = true;
                                GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.GAME_LEVE_UP), { usetime: TimeUtil.getTimer() - game.GameDataModel.levelStartTm });
                                ModuleEventManager.dispatchEvent(new leveluppan.LevelUpEvent(leveluppan.LevelUpEvent.SHOW_LEVEL_UP_PANEL));
                            }
                            else {
                                this.moveToPosByDis(value, this._gravityItem[i], $dis);
                            }
                        }
                    }
                }
            }
        };
        GameGravityManager.prototype.getNextTo = function (selfPos) {
            var $to;
            var $minDis;
            for (var i = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                if (this._gravityItem[i].type == 2 && this._gravityItem[i].y < selfPos.y - 100) {
                    var $dis = Display3D.distance(selfPos, this._gravityItem[i]);
                    if (!$to || $minDis > $dis) {
                        $to = this._gravityItem[i];
                        $minDis = $dis;
                    }
                }
            }
            return $to;
        };
        GameGravityManager.prototype.getNextToVo = function ($v3d) {
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
        return GameGravityManager;
    }());
    game.GameGravityManager = GameGravityManager;
})(game || (game = {}));
//# sourceMappingURL=GameGravityManager.js.map