var Pan3d;
(function (Pan3d) {
    var QuestMoveVo = /** @class */ (function () {
        function QuestMoveVo() {
            this.autoplay = false;
        }
        return QuestMoveVo;
    }());
    Pan3d.QuestMoveVo = QuestMoveVo;
    var GameInstance = /** @class */ (function () {
        function GameInstance() {
        }
        GameInstance.getGameEndMillisecond = function ($endT) {
            return Pan3d.TimeUtil.getTimer() + ($endT - GameInstance.gameSyncTime.time_now) * 1000;
        };
        GameInstance.getGameSecond = function ($endT) {
            // var $a: number = Math.floor(GameInstance.gameSyncTime.time_now + (TimeUtil.getTimer() - GameInstance.gameSyncClientTime) / 1000);
            var $a = this.getServerNow();
            return $endT - $a;
        };
        GameInstance.getServerNow = function () {
            var $t = (Pan3d.TimeUtil.getTimer() - GameInstance.appSyncClientTime) / 1000 + GameInstance.appSynctTime.time_now;
            return float2int($t);
        };
        Object.defineProperty(GameInstance, "threeBattarId", {
            get: function () {
                return this._threeBattarId;
            },
            set: function (value) {
                this._threeBattarId = value;
                ////console.log("this._threeBattarId", this._threeBattarId)
            },
            enumerable: true,
            configurable: true
        });
        GameInstance.setAttackTargetByName = function ($name) {
            for (var i = 0; i < this.roleList.length; i++) {
                if (this.roleList[i].unit.getName() == $name) {
                    this.attackTarget = this.roleList[i];
                    break;
                }
            }
        };
        GameInstance.init = function () {
            ;
        };
        Object.defineProperty(GameInstance, "attackTarget", {
            set: function (value) {
                if (GameInstance._attackTarget) {
                    GameInstance._attackTarget.removePart(Pan3d.SceneChar.SEL_PART);
                }
                GameInstance._attackTarget = value;
                if (GameInstance._attackTarget) {
                    GameInstance._attackTarget.addPart(Pan3d.SceneChar.SEL_PART, Pan3d.SceneChar.NONE_SLOT, getModelUIUrl("6301"));
                }
            },
            enumerable: true,
            configurable: true
        });
        GameInstance.pingpontm = 9999999;
        GameInstance.pandaVisibel = true;
        GameInstance.canclikFightui = true;
        GameInstance.roleList = new Array;
        GameInstance.bagCdItem = new Object;
        GameInstance.useYaoGan = false;
        GameInstance._threeBattarId = 0; //三连击序号 换场景从0开始
        GameInstance.sceneResEqu = false;
        return GameInstance;
    }());
    Pan3d.GameInstance = GameInstance;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GameInstance.js.map