var kuafu;
(function (kuafu) {
    var KuaFu3v3Model = /** @class */ (function () {
        function KuaFu3v3Model() {
            //MERGE_TYPE_GAME_TO_PK
            // this.tb_kuafu3v3_base = tb.TB_kuafu3v3_base.getItem()[0];
        }
        KuaFu3v3Model.getInstance = function () {
            if (!this._instance) {
                this._instance = new KuaFu3v3Model();
            }
            return this._instance;
        };
        KuaFu3v3Model.frameUpData = function () {
            if (GuidData.map.is3V3() || GuidData.map.isWorldBoss()) {
                if (this.nextCatchTime < TimeUtil.getTimer()) {
                    var $displayList = GameInstance.roleList;
                    for (var i = 0; $displayList && i < $displayList.length; i++) {
                        var $tempChar = $displayList[i];
                        if (GameMouseManager.getInstance().isCatchSceneCharDis($tempChar)) {
                            NetManager.getInstance().protocolos.use_gameobject($tempChar.unit.getUintGuid());
                            this.nextCatchTime = TimeUtil.getTimer() + 1000;
                        }
                    }
                }
                if (TimeUtil.getTimer() > this.lastTm) {
                    RelationManager.getInstance().refresh();
                    this.lastTm = TimeUtil.getTimer() + 1000;
                }
            }
        };
        KuaFu3v3Model.prototype.get_month_reward_item = function () {
            var $item = tb.TB_kuafu3v3_month_reward.getItem();
            var $score = GuidData.player.get3V3Score(); //总积分
            var $vo;
            for (var i = 0; i < $item.length; i++) {
                if ($score >= $item[i].score) {
                    $vo = $item[i];
                }
            }
            return $vo;
        };
        KuaFu3v3Model.prototype.mergeTypeGameToPk = function () {
            var $sendByte = new ByteArray();
            $sendByte.endian = Endian.LITTLE_ENDIAN;
            $sendByte.optcode = 124;
            $sendByte.writeUint16(124);
            $sendByte.writeBytes(this.worldWarByte);
            NetManager.getInstance().send($sendByte);
        };
        KuaFu3v3Model.prototype.refreshKufuData = function ($vo) {
            if ($vo === void 0) { $vo = null; }
            this.kuafuItem = GuidData.map.getKuafu3V3DataItem();
            this.killTittleTxt = new Vector2D();
            this.killTittleTxt.x = Math.floor(this.kuafuItem.length / 2);
            this.killTittleTxt.y = Math.floor(this.kuafuItem.length / 2);
            for (var i = 0; i < this.kuafuItem.length; i++) {
                if (this.kuafuItem[i].name == GuidData.player.getName()) {
                    this.selfVo = this.kuafuItem[i];
                }
                if (this.kuafuItem[i].dieState == 1) {
                    if (this.kuafuItem[i].group == 1) {
                        this.killTittleTxt.x--;
                    }
                    else {
                        this.killTittleTxt.y--;
                    }
                }
            }
        };
        Object.defineProperty(KuaFu3v3Model.prototype, "isSelfDie", {
            get: function () {
                if (this.selfVo && this.selfVo.dieState == 1) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        KuaFu3v3Model.nextCatchTime = 0;
        KuaFu3v3Model.lastTm = 0;
        return KuaFu3v3Model;
    }());
    kuafu.KuaFu3v3Model = KuaFu3v3Model;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3Model.js.map