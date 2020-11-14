var boss;
(function (boss) {
    var BossModel = /** @class */ (function () {
        function BossModel() {
        }
        BossModel.frameUpData = function () {
            if (!GuidData.map.isBaseMap) {
                return;
            }
            if (this.nextCatchTime < TimeUtil.getTimer()) {
                var $displayList = GameInstance.roleList;
                var needRemoveBoss = true;
                var needRemoveBx = true;
                for (var i = 0; $displayList && i < $displayList.length; i++) {
                    var $tempChar = $displayList[i];
                    if ($tempChar.isBoss) {
                        if (Math.abs($tempChar.x - GameInstance.mainChar.x) < 100 && Math.abs($tempChar.z - GameInstance.mainChar.z) < 100) {
                            if ($tempChar != this._boss) {
                                var evt = new boss.BossEvent(boss.BossEvent.SHOW_BOSSHP_EVENT);
                                evt.data = $tempChar.unit;
                                ModuleEventManager.dispatchEvent(evt);
                                $tempChar.refreshLifeNum();
                                this._boss = $tempChar;
                                this.showhidePandaPanel(false);
                                //家族boss排行榜
                                if (GuidData.map.isFamilyScene()) {
                                    //ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.SHOW_OFTENRANK_PANEL));
                                }
                            }
                            needRemoveBoss = false;
                        }
                    }
                    else if ($tempChar instanceof SceneCollection) {
                        var sc = ($tempChar);
                        if (sc.isBx()) {
                            if (Math.abs($tempChar.x - GameInstance.mainChar.x) < 100 && Math.abs($tempChar.z - GameInstance.mainChar.z) < 100) {
                                if (sc != this._bx) {
                                    var bossInfo = sc.getBossInfo(true);
                                    var evt = new boss.BossEvent(boss.BossEvent.SHOW_CHEST_EVENT);
                                    evt.data = bossInfo;
                                    ModuleEventManager.dispatchEvent(evt);
                                    this._bx = sc;
                                    this.showhidePandaPanel(false);
                                }
                                needRemoveBx = false;
                            }
                            if (Math.abs($tempChar.x - GameInstance.mainChar.x) < 50 && Math.abs($tempChar.z - GameInstance.mainChar.z) < 50) {
                                sc.setOprateState(true);
                            }
                            else {
                                sc.setOprateState(false);
                            }
                        }
                    }
                }
                if ((this._boss && needRemoveBoss)) {
                    //console.log("---隐藏222--",GuidData.map.isFamilyScene());
                    if (GuidData.map.isFamilyScene()) {
                        ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.HIDE_OFTENRANK_PANEL));
                    }
                    ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.HIDE_BOSSHP_EVENT));
                    this._boss = null;
                    this.showhidePandaPanel(true);
                }
                if ((this._bx && needRemoveBx)) {
                    var evt = new boss.BossEvent(boss.BossEvent.HIDE_CHEST_EVENT);
                    ModuleEventManager.dispatchEvent(evt);
                    this._bx = null;
                    this.showhidePandaPanel(true);
                }
                this.nextCatchTime = TimeUtil.getTimer() + 1000;
            }
        };
        BossModel.showhidePandaPanel = function (tf) {
            var $MainUiEvent = new topui.TopUiEvent(topui.TopUiEvent.SHOW_TOP_PANDA_LIST);
            $MainUiEvent.data = tf;
            ModuleEventManager.dispatchEvent($MainUiEvent);
        };
        BossModel.nextCatchTime = 0;
        return BossModel;
    }());
    boss.BossModel = BossModel;
})(boss || (boss = {}));
//# sourceMappingURL=BossModel.js.map