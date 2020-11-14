var game;
(function (game) {
    var Scene_data = Pan3d.Scene_data;
    var TimeUtil = Pan3d.TimeUtil;
    var GameSoundManager = /** @class */ (function () {
        function GameSoundManager() {
            this._volume = 1.0;
            this.lastcontactsNum = 0;
            this.contactsLinkTm = 0;
            this.resetAudio();
            this.musicDid = {};
        }
        GameSoundManager.getInstance = function () {
            if (!GameSoundManager._instance) {
                GameSoundManager._instance = new GameSoundManager();
            }
            return GameSoundManager._instance;
        };
        GameSoundManager.prototype.makeBaseSound = function (value) {
            var temp = new Audio(value);
            temp.loop = true;
            temp.play();
            return temp;
        };
        GameSoundManager.prototype.playSoundByName = function (value) {
            if (!GameData.getStorageSync("o_volume_but")) {
                if (!this.musicDid[value]) {
                    var $url = value;
                    $url = GameData.getLoadFileIsLocalUrl($url);
                    var temp_1 = new Audio($url);
                    temp_1.onerror = function () {
                        Pan3d.TimeUtil.addTimeOut(2000, function () {
                            temp_1.src = $url;
                        });
                    };
                    this.musicDid[value] = temp_1;
                }
                this.musicDid[value].play();
            }
        };
        GameSoundManager.prototype.playHitSound = function (value) {
        };
        GameSoundManager.prototype.collidehit = function () {
            //当前时间大于上次碰撞变化的100ms
            if (TimeUtil.getTimer() > this.contactsLinkTm) {
                this.contactsLinkTm = TimeUtil.getTimer() + 200;
                if (!GameData.getStorageSync("o_shake_but")) {
                    this.playHitSound(1);
                    console.log("碰到", this.lastcontactsNum, TimeUtil.getTimer());
                }
            }
        };
        GameSoundManager.prototype.resetAudio = function () {
            var $url = Scene_data.fileRoot + "sound/bgm001.mp3";
            $url = GameData.getLoadFileIsLocalUrl($url);
            if (!this.audio) {
                this.audio = this.makeBaseSound($url);
            }
            else {
                this.changeBgUrl();
            }
            if (GameData.getStorageSync("o_volume_but")) {
                this.audio.volume = 0;
            }
            else {
                this.audio.volume = 0.8;
            }
        };
        GameSoundManager.prototype.changeBgUrl = function () {
            if (this.audio) {
                var $soundItem = new Array;
                $soundItem.push("sound/bgm001.mp3");
                $soundItem.push("sound/bgm002.mp3");
                var $url = Scene_data.fileRoot + $soundItem[random($soundItem.length)];
                this.audio.src = GameData.getLoadFileIsLocalUrl($url);
                if (GameData.getStorageSync("o_volume_but")) {
                    this.audio.volume = 0;
                }
                else {
                    this.audio.volume = 0.8;
                }
            }
        };
        GameSoundManager.prototype.getBgVolume = function () {
            if (this.audio) {
                return this.audio.volume;
            }
            else {
                return 0;
            }
        };
        GameSoundManager.prototype.setBgVolume = function (value) {
            if (this.audio) {
                this.audio.volume = value;
            }
        };
        GameSoundManager.prototype.upFrame = function () {
            /*
            if (GameData.getStorageSync("o_volume_but")) {
                this.audio.volume = 0
            } else {

                var $mainBody: CANNON.Body = GameDataModel.centenBall.body;
                var $velocity: Vector3D = new Vector3D($mainBody.velocity.x, $mainBody.velocity.y, $mainBody.velocity.z);
                var $isHitSound: boolean = false;

                for (var i: number = 0; i < canonkey.Physics.world.contacts.length; i++) {
                    var $vo: CANNON.ContactEquation = canonkey.Physics.world.contacts[i];
                    if ($vo.bi == $mainBody || $vo.bj == $mainBody) {
                        $isHitSound = true;
                        GameDataModel.lastMainHitTm = TimeUtil.getTimer();
                    }
                }
                if (this.lastcontactsNum != canonkey.Physics.world.contacts.length) {
                    this.lastcontactsNum = canonkey.Physics.world.contacts.length;
                    this.contactsLinkTm = TimeUtil.getTimer()+150
                }
                if ($isHitSound) {
                    var $dis: number = $velocity.dot($velocity);
                    $dis = Math.min(1, Math.max(0, Math.sqrt($dis) / 30));
                    this.audio.volume = $dis*0.5
                } else {
                    this.audio.volume = 0
                }
               // this.audio.volume=1
            
            }
            */
        };
        return GameSoundManager;
    }());
    game.GameSoundManager = GameSoundManager;
})(game || (game = {}));
//# sourceMappingURL=GameSoundManager.js.map