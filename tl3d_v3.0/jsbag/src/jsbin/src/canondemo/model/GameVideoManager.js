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
var game;
(function (game) {
    var Matrix3D = Pan3d.Matrix3D;
    var Vector3D = Pan3d.Vector3D;
    var Object3D = Pan3d.Object3D;
    var Quaternion = Pan3d.Quaternion;
    var PandaMeshData = rightpanda.PandaMeshData;
    var VideoFrameVo = /** @class */ (function (_super) {
        __extends(VideoFrameVo, _super);
        function VideoFrameVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return VideoFrameVo;
    }(Object3D));
    game.VideoFrameVo = VideoFrameVo;
    var GameVideoManager = /** @class */ (function () {
        function GameVideoManager() {
        }
        GameVideoManager.starVideo = function () {
            if (this.canSaveVideo) {
                GameVideoManager.ItemFrameByte = new Pan3d.Pan3dByteArray();
            }
        };
        GameVideoManager.finishVideo = function () {
            var $byte = new Pan3d.Pan3dByteArray();
            var time = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
            $byte.writeInt(GameData.version);
            $byte.writeInt(time);
            $byte.writeInt(game.GameDataModel.levelStartTm);
            $byte.writeInt(GameVideoManager.ItemFrameByte.length);
            $byte.writeBytes(GameVideoManager.ItemFrameByte);
            if (time < 1000 * 60) {
                //if (GameData.severinfo.upVideo) {
                //    GameData.WEB_SAVE_VIDEO_FILE("upload_record", $byte, time, (res: any) => { })
                //} else {
                //    console.log("没开启上传成功视屏")
                //}
            }
            else {
                console.log("录像超时不在提交");
            }
            GameVideoManager.ItemFrameByte = null;
        };
        GameVideoManager.getPreFrameLinePointVoByTime = function ($time) {
            var $pre = GameVideoManager.videoData[0];
            for (var i = 0; i < GameVideoManager.videoData.length; i++) {
                if (GameVideoManager.videoData[i].time <= $time) {
                    if (!$pre || $pre.time < GameVideoManager.videoData[i].time) {
                        $pre = GameVideoManager.videoData[i];
                    }
                    ;
                }
                ;
            }
            ;
            return $pre;
        };
        GameVideoManager.getNextFrameLinePointVoByTime = function ($time) {
            var $next;
            for (var i = 0; i < GameVideoManager.videoData.length; i++) {
                if (GameVideoManager.videoData[i].time >= $time) {
                    if (!$next || $next.time > GameVideoManager.videoData[i].time) {
                        $next = GameVideoManager.videoData[i];
                    }
                }
            }
            return $next;
        };
        GameVideoManager.fineInsideVo = function ($time) {
            var $a = GameVideoManager.getPreFrameLinePointVoByTime($time);
            var $b = GameVideoManager.getNextFrameLinePointVoByTime($time);
            if ($a && $b) {
                return GameVideoManager.setModelData($a, $b, $time);
            }
            return null;
        };
        GameVideoManager.setModelData = function ($a, $b, $time) {
            var $num = ($time - $a.time) / ($b.time - $a.time);
            var $obj = {};
            $obj.x = $a.x + ($b.x - $a.x) * $num;
            $obj.y = $a.y + ($b.y - $a.y) * $num;
            $obj.z = $a.z + ($b.z - $a.z) * $num;
            $obj.Volume = $a.Volume + ($b.Volume - $a.Volume) * $num;
            $obj.scaleX = $a.scaleX + ($b.scaleX - $a.scaleX) * $num;
            $obj.scaleY = $a.scaleY + ($b.scaleY - $a.scaleY) * $num;
            $obj.scaleZ = $a.scaleZ + ($b.scaleZ - $a.scaleZ) * $num;
            var $eulerAngle = GameVideoManager.qtoq($a, $b, $num);
            $obj.rotationX = $eulerAngle.x;
            $obj.rotationY = $eulerAngle.y;
            $obj.rotationZ = $eulerAngle.z;
            if (!$b.iskeyFrame) {
                return $a;
            }
            else {
                return $obj;
            }
        };
        GameVideoManager.qtoq = function ($a, $b, $time) {
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
        GameVideoManager.playFrame = function () {
            if (GameVideoManager.videoData) {
                var time = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
                var vo = GameVideoManager.fineInsideVo(time);
                if (vo) {
                    if (game.GameDataModel.centenBall) {
                        game.GameDataModel.centenBall.x = vo.x;
                        game.GameDataModel.centenBall.y = vo.y;
                        game.GameDataModel.centenBall.z = vo.z;
                        game.GameDataModel.centenBall.rotationX = vo.rotationX;
                        game.GameDataModel.centenBall.rotationY = vo.rotationY;
                        game.GameDataModel.centenBall.rotationZ = vo.rotationZ;
                        game.GameSoundManager.getInstance().setBgVolume(vo.Volume);
                        game.GameDataModel.centenBall.update();
                        game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                        if (time < 100) {
                            game.GameDataModel.centenBall.resetParticlePos();
                        }
                    }
                }
                else {
                    GameVideoManager.videoData = null;
                    if (this.isWinOrLost) {
                        this.showFinishEfict();
                        rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key102);
                        Pan3d.TimeUtil.addTimeOut(2000, function () {
                            msgalert.AlertUtil.show("播放结束.确定重新开始", "提示", function (value) {
                                canonkey.Physics.ready = false;
                                GameData.isPlayVideo = false;
                                GameData.dispatchToLevel(game.GameDataModel.levelNum);
                            }, 2);
                        });
                    }
                    else {
                        rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key103);
                        Pan3d.ModuleEventManager.dispatchEvent(new resetplay.ResetPlayEvent(resetplay.ResetPlayEvent.SHOW_RESET_PLAY_PANEL));
                    }
                }
            }
        };
        GameVideoManager.submitBugToSave = function () {
            var $byte = new Pan3d.Pan3dByteArray();
            var time = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
            $byte.writeInt(GameData.version);
            $byte.writeInt(time);
            $byte.writeInt(game.GameDataModel.levelStartTm);
            $byte.writeInt(GameVideoManager.ItemFrameByte.length);
            $byte.writeBytes(GameVideoManager.ItemFrameByte);
            msgalert.AlertUtil.show("确定提交本次的记录，核实后给于奖励", "提示", function (value) {
                if (value == 1) {
                    GameData.WEB_SAVE_VIDEO_FILE("upload_error", $byte, time, function (res) { });
                }
            }, 2);
        };
        GameVideoManager.showFinishEfict = function () {
            var $v3d = new Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z);
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SHOW_SPECIAL_EFFECT), { pos: $v3d, name: "levelup" });
            game.GameSoundManager.getInstance().playSoundByName(Pan3d.Scene_data.fileRoot + "sound/" + "pass" + ".mp3");
        };
        GameVideoManager.playReaplayVideo = function () {
            var $time = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
            if ($time > 60 * 1000) {
                msgalert.AlertUtil.show("时间太长超过了1分钟，就没计下来了.", "提示");
                return;
            }
            var itemByte = GameVideoManager.ItemFrameByte;
            var $itemVo = new Array;
            itemByte.position = 0;
            while (itemByte.position < itemByte.length) {
                $itemVo.push(this.readItemVoByByte(itemByte));
            }
            GameData.isPlayVideo = true;
            this.isWinOrLost = false;
            this.videoData = $itemVo;
            game.GameDataModel.levelStartTm = Pan3d.TimeUtil.getTimer();
            PandaMeshData.showCentenTxtInfoType(PandaMeshData.key103, "正在回看录像");
        };
        GameVideoManager.loadVideoXml = function (value) {
            var _this = this;
            LoadManager.getInstance().load("https://api.h5key.com/static/upload/" + value.record_file, LoadManager.BYTE_TYPE, function ($byte) {
                var videoByte = new Pan3d.Pan3dByteArray($byte);
                var version = videoByte.readInt();
                var time = videoByte.readInt();
                var levelStartTm = videoByte.readInt();
                var len = videoByte.readInt();
                var itemByte = new Pan3d.Pan3dByteArray();
                itemByte.length = len;
                videoByte.readBytes(itemByte, 0, len);
                var $itemVo = new Array;
                while (itemByte.position < itemByte.length) {
                    $itemVo.push(_this.readItemVoByByte(itemByte));
                }
                GameData.isPlayVideo = true;
                Pan3d.TimeUtil.addTimeOut(500, function () {
                    _this.isWinOrLost = true;
                    _this.videoData = $itemVo;
                    game.GameDataModel.levelStartTm = Pan3d.TimeUtil.getTimer();
                    PandaMeshData.showCentenTxtInfoType(PandaMeshData.key102, "正在播放录像");
                });
            }, {
                failfun: function () {
                    console.log("读取视屏出错");
                }
            });
        };
        GameVideoManager.readItemVoByByte = function ($byte) {
            var $vo = new VideoFrameVo();
            $vo.time = $byte.readInt();
            $vo.x = $byte.readInt();
            $vo.y = $byte.readInt();
            $vo.z = $byte.readInt();
            $vo.rotationX = $byte.readInt();
            $vo.rotationY = $byte.readInt();
            $vo.rotationZ = $byte.readInt();
            $vo.Volume = $byte.readInt() / 100;
            return $vo;
        };
        GameVideoManager.upFrame = function ($dis) {
            /*
            var $time: number = Pan3d.TimeUtil.getTimer() - GameDataModel.levelStartTm;
            if (GameVideoManager.ItemFrameByte && $time<1000*60 ) {
                var $vo: VideoFrameVo = new VideoFrameVo();
                $vo.time = $time;
                $vo.x = Math.floor($dis.x);
                $vo.y = Math.floor($dis.y);
                $vo.z = Math.floor($dis.z);
                $vo.rotationX = Math.floor($dis.rotationX);
                $vo.rotationY = Math.floor($dis.rotationY);
                $vo.rotationZ = Math.floor($dis.rotationZ);
                $vo.Volume = Math.floor(GameSoundManager.getInstance().getBgVolume() * 100);
 
                GameVideoManager.ItemFrameByte.writeInt($vo.time)
                GameVideoManager.ItemFrameByte.writeInt($vo.x)
                GameVideoManager.ItemFrameByte.writeInt($vo.y)
                GameVideoManager.ItemFrameByte.writeInt($vo.z)
                GameVideoManager.ItemFrameByte.writeInt($vo.rotationX);
                GameVideoManager.ItemFrameByte.writeInt($vo.rotationY);
                GameVideoManager.ItemFrameByte.writeInt($vo.rotationZ);
                GameVideoManager.ItemFrameByte.writeInt($vo.Volume);
            }
            */
        };
        GameVideoManager.canSaveVideo = true;
        return GameVideoManager;
    }());
    game.GameVideoManager = GameVideoManager;
})(game || (game = {}));
//# sourceMappingURL=GameVideoManager.js.map