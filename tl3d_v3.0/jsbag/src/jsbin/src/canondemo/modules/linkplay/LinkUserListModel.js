var linkplay;
(function (linkplay) {
    var Vector3D = Pan3d.Vector3D;
    var TimeUtil = Pan3d.TimeUtil;
    var GameDataModel = game.GameDataModel;
    var GameSoundManager = game.GameSoundManager;
    var MoveInfoVo = /** @class */ (function () {
        function MoveInfoVo() {
            this.type = 100; //消息号
        }
        MoveInfoVo.prototype.getSring = function () {
            var obj = {};
            obj.type = this.type;
            obj.tm = this.tm;
            obj.position = this.position;
            obj.velocity = this.velocity;
            obj.quaternion = this.quaternion;
            obj.angularVelocity = this.angularVelocity;
            obj.bodyfouce = this.bodyfouce;
            return JSON.stringify(obj);
        };
        MoveInfoVo.prototype.meshObj = function (obj) {
            this.type = obj.type;
            this.tm = obj.tm;
            this.position = new Vector3D(obj.position.x, obj.position.y, obj.position.z);
            this.quaternion = new Vector3D(obj.quaternion.x, obj.quaternion.y, obj.quaternion.z, obj.quaternion.w);
            this.velocity = new Vector3D(obj.velocity.x, obj.velocity.y, obj.velocity.z);
            this.angularVelocity = new Vector3D(obj.angularVelocity.x, obj.angularVelocity.y, obj.angularVelocity.z);
            this.bodyfouce = new Vector3D(obj.bodyfouce.x, obj.bodyfouce.y, obj.bodyfouce.z);
        };
        return MoveInfoVo;
    }());
    linkplay.MoveInfoVo = MoveInfoVo;
    var LinkUserListModel = /** @class */ (function () {
        function LinkUserListModel() {
            this.lastSendTm = 0;
        }
        LinkUserListModel.getInstance = function () {
            if (!LinkUserListModel._instance) {
                LinkUserListModel._instance = new LinkUserListModel();
            }
            return LinkUserListModel._instance;
        };
        LinkUserListModel.prototype.makeUserListBall = function () {
            this._scene = GameDataModel.scene;
            GameDataModel.centenBall.destory();
            GameDataModel.centenBall = null;
            for (var i = 0; i < MsEngine.getInstance().roomUserInfoList.length; i++) {
                var $balldis = linkplay.LinkPlayCanonPrefabSprite.addMoveOhterUser(12, this._scene);
                $balldis.roomUserVo = MsEngine.getInstance().roomUserInfoList[i];
                $balldis.x = 0;
                $balldis.z = 0;
                $balldis.y = 15;
                if ($balldis.roomUserVo.pos) {
                    $balldis.x = $balldis.roomUserVo.pos.x;
                    $balldis.y = $balldis.roomUserVo.pos.y;
                    $balldis.z = $balldis.roomUserVo.pos.z;
                }
                $balldis.resetParticlePos();
                console.log($balldis.roomUserVo.msRoomUserInfo.userProfile);
                var skinType = JSON.parse($balldis.roomUserVo.msRoomUserInfo.userProfile).skinType;
                $balldis.changeSkinById(skinType);
                $balldis.roomUserVo.dis = $balldis;
                //var selfBall: LinkPlayCanonPrefabSprite = LinkPlayCanonPrefabSprite.addMoveOhterUser(12, this._scene)
                //GameDataModel.centenBall = selfBall
                //GameDataModel.centenBall.y = 20
                //GameDataModel.centenBall.changeSkinById(GameData.getStorageSyncNumber("skinType"))
                //GameDataModel.centenBall.body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2 | GameDataModel.GROUP3;
                if ($balldis.roomUserVo.msRoomUserInfo.userID == MsEngine.getInstance().msRegistRsp.userID) {
                    GameDataModel.centenBall = $balldis;
                    this.addCentenBallEvent();
                }
            }
        };
        LinkUserListModel.prototype.addCentenBallEvent = function () {
            var _this = this;
            GameDataModel.centenBall.body.addEventListener("collide", function (evt) {
                var $body = evt.body;
                if ($body) {
                    if ($body.type == 1) {
                        console.log("碰到其它球，发送坐标");
                        // this.sendMoveToSocket()
                        _this.lastSendTm = TimeUtil.getTimer() + 10; //这里只是用于测试
                    }
                    var $pos = GameDataModel.centenBall.getPostionV3d();
                    if (_this.lastMainBodyHitV3d) {
                        var $dis = Vector3D.distance(_this.lastMainBodyHitV3d, $pos);
                        if ($dis > 10 || Math.abs(_this.lastMainBodyHitV3d.y - $pos.y) > 5) {
                            var velocity = new Vector3D(GameDataModel.centenBall.body.velocity.x, GameDataModel.centenBall.body.velocity.y, GameDataModel.centenBall.body.velocity.z);
                            var $vspeed = Math.sqrt(velocity.dot(velocity));
                            if ($vspeed > 5) {
                                GameSoundManager.getInstance().collidehit();
                            }
                        }
                    }
                    _this.lastMainBodyHitV3d = $pos;
                }
            });
        };
        LinkUserListModel.prototype.removeCentenBallEvent = function () {
            GameDataModel.centenBall.body.removeEventListener("collide", function (evt) { });
        };
        LinkUserListModel.prototype.sendMoveToSocket = function () {
            var $ball = GameDataModel.centenBall;
            if ($ball.beginGravityVo) {
                //当前正在下落就不再发送请求了
                return;
            }
            var vo = new MoveInfoVo;
            vo.type = 100;
            vo.tm = TimeUtil.getTimer() - GameDataModel.levelStartTm;
            vo.bodyfouce = $ball.bodyfouce;
            var $body = $ball.body;
            vo.velocity = new Vector3D($body.velocity.x, $body.velocity.y, $body.velocity.z);
            vo.position = new Vector3D($body.position.x, $body.position.y, $body.position.z);
            vo.angularVelocity = new Vector3D($body.angularVelocity.x, $body.angularVelocity.y, $body.angularVelocity.z);
            vo.quaternion = new Vector3D($body.quaternion.x, $body.quaternion.y, $body.quaternion.z, $body.quaternion.w);
            MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 100, data: vo.getSring() }));
            this.lastSendTm = TimeUtil.getTimer() + 1000;
        };
        LinkUserListModel.prototype.clearUser = function () {
            while (MsEngine.getInstance().roomUserInfoList.length) {
                var $dis = MsEngine.getInstance().roomUserInfoList.pop();
                $dis.dis.destory();
            }
            GameDataModel.centenBall = null;
        };
        LinkUserListModel.prototype.setEventNotyfy = function (value) {
            var ddd = JSON.parse(value.cpProto);
            switch (ddd.type) {
                case 100:
                    var vo = new MoveInfoVo();
                    vo.meshObj(JSON.parse(ddd.data));
                    var eeee = MsEngine.getInstance().getUserByuserId(value.srcUserID);
                    eeee.dis.pushVO(vo);
                    var $selfTm = TimeUtil.getTimer() - GameDataModel.levelStartTm; //我的时间
                    if ($selfTm < vo.tm) {
                        console.log("时间同步并进行调整调整了", vo.tm - $selfTm - 15, "毫秒");
                        GameDataModel.levelStartTm = TimeUtil.getTimer() - vo.tm - 15; //设定了一个15的网络延时
                    }
                    break;
                case 2:
                    var $vo = MsEngine.getInstance().getUserByuserId(value.srcUserId);
                    $vo.ready = ddd.current == 1;
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT));
                    break;
                case 3:
                    console.log("更新坐标信息");
                    this.meshFristPos(ddd.data);
                    break;
                case 4:
                    var eeee = MsEngine.getInstance().getUserByuserId(value.srcUserID);
                    var bpos = new Vector3D(ddd.pos.x, ddd.pos.y, ddd.pos.z);
                    var ball = eeee.dis;
                    ball.moveInfoVoItem.length = 0;
                    ball.body.sleep();
                    ball.aotuFallDownTm = TimeUtil.getTimer();
                    ball.beginGravityVo = linkplay.LinkPlayGravityManager.getInstance().getBeing(bpos);
                    ball.endGravityVo = linkplay.LinkPlayGravityManager.getInstance().getNextTo(bpos);
                    break;
                case 5:
                    var soundUrl = ddd.data;
                    console.log("播放声音", soundUrl);
                    game.GameSoundManager.getInstance().playSoundByName(soundUrl);
                    break;
                default:
                    console.log("无信息分支", value);
                    break;
            }
        };
        LinkUserListModel.prototype.meshFristPos = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                var $data = arr[i];
                var vo = MsEngine.getInstance().getUserByuserId($data.userID);
                vo.pos = new Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
                if (vo.dis) {
                    vo.dis.x = vo.pos.x;
                    vo.dis.y = vo.pos.y;
                    vo.dis.z = vo.pos.z;
                }
            }
        };
        return LinkUserListModel;
    }());
    linkplay.LinkUserListModel = LinkUserListModel;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkUserListModel.js.map