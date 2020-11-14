var faction;
(function (faction) {
    var FactionBossModel = /** @class */ (function () {
        function FactionBossModel() {
            this.isneedcountdown = false;
        }
        FactionBossModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FactionBossModel();
            }
            return this._instance;
        };
        /**
         * getList
         */
        FactionBossModel.prototype.getList = function () {
            var $finalary = new Array;
            var tabary = tb.TB_faction_boss.get_TB_faction_boss();
            var isflag = false;
            for (var i = 0; i < tabary.length; i++) {
                var fBossItemVo = new FBossItemVo();
                fBossItemVo.state = 2;
                fBossItemVo.state1 = 2;
                // if ("当前挑战id == i") {
                if (GuidData.faction.getBosschallengeidCur() == tabary[i].id) {
                    if (this.comPareTime(GuidData.faction.getBosschallengeStartTime() + tabary[i].wait_time)) {
                        //等待时间
                        fBossItemVo.state = 3;
                        fBossItemVo.time = this.getTime(GuidData.faction.getBosschallengeStartTime() + tabary[i].wait_time);
                    }
                    else {
                        fBossItemVo.state = 1;
                        fBossItemVo.time = this.getTime(GuidData.faction.getBosschallengeStartTime() + tabary[i].wait_time + tabary[i].time);
                    }
                    isflag = true;
                }
                else {
                    // if ("当前通关id >= i") {
                    if (GuidData.faction.getBosschallengeidMax() >= tabary[i].id) {
                        fBossItemVo.state1 = 1;
                    }
                    else if ((GuidData.faction.getBosschallengeidMax() + 1) == tabary[i].id && GuidData.faction.getLev() >= tabary[i].faction_lv_limit) {
                        fBossItemVo.state1 = 2;
                    }
                    else {
                        fBossItemVo.state1 = 3;
                    }
                }
                fBossItemVo.data = tabary[i];
                fBossItemVo.data1 = tb.TB_creature_template.get_TB_creature_template(tabary[i].entry);
                $finalary.push(fBossItemVo);
            }
            //存在 正在挑战中的信息，置状态值
            this.isneedcountdown = isflag;
            return $finalary;
        };
        /**
         * 获取选中索引
         */
        FactionBossModel.prototype.getIndex = function () {
            var listitem = this.getList();
            var idx = 0;
            for (var i = 0; i < listitem.length; i++) {
                if (listitem[i].state != 2) {
                    return i;
                }
                else if (listitem[i].state1 != 3) {
                    idx = i;
                }
            }
            return idx;
        };
        FactionBossModel.prototype.getTime = function ($overtime) {
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts);
            var a = $overtime - $sever.getTime();
            var min;
            var s;
            if (a < 60) {
                min = 0;
                s = a;
            }
            else {
                min = Math.floor(a / 60);
                s = a - min * 60;
            }
            return [min, s];
        };
        FactionBossModel.prototype.comPareTime = function ($overtime) {
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts);
            var a = $overtime - $sever.getTime();
            if (a < 0) {
                return false;
            }
            return true;
        };
        FactionBossModel.prototype.getRankList = function ($bossid) {
            var testvoary = new Array;
            var ary = GuidData.faction.getRankList();
            for (var i = 0; i < ary.length; i++) {
                var vo = this.getcurvo(ary[i].guid);
                if (vo) {
                    var a = new RankVo();
                    a.rankid = i + 1;
                    a.name = vo.name;
                    a.title = "头衔名字" + i;
                    a.output = ary[i].output;
                    a.ratio = this.getTotaloutput(a.output, ary);
                    a.rewardary = this.getReward($bossid, a.rankid);
                    if (vo.guid == GuidData.player.getGuid()) {
                        a.isme = true;
                    }
                    testvoary.push(a);
                }
            }
            return testvoary;
        };
        FactionBossModel.prototype.getTotaloutput = function ($cur, $ary) {
            var totaloutput = 0;
            for (var i = 0; i < $ary.length; i++) {
                totaloutput += $ary[i].output;
            }
            var ratio = Math.floor($cur / totaloutput * 100);
            return ratio;
        };
        FactionBossModel.prototype.getReward = function ($bossid, $rankid) {
            var ary = tb.TB_faction_boss_reward.get_TB_faction_boss_reward();
            var ary1 = new Array;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].monster_id == $bossid) {
                    ary1.push(ary[i]);
                }
            }
            for (var i = 0; i < ary1.length; i++) {
                if ($rankid >= ary1[i].rank[0] && $rankid <= ary1[i].rank[1]) {
                    return ary1[i];
                }
            }
            return null;
        };
        FactionBossModel.prototype.getcurvo = function ($guid) {
            var ary = GuidData.faction.getFactionList();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == $guid) {
                    return ary[i];
                }
            }
            return null;
        };
        FactionBossModel.prototype.getBossStart = function ($bossLev) {
            // BOSS星级：（BOSS等级*0.1）-帮会等级=a；a≤0=1星；0<a≤0.2=2星；0.2<a≤0.5=3星；0.5<a≤0.7=4星；0.7<a=5星
            var a = ($bossLev * 0.1) - GuidData.faction.getLev();
            var startnum;
            if (a <= 0) {
                startnum = 1;
            }
            else if (a <= 0.2) {
                startnum = 2;
            }
            else if (a <= 0.5) {
                startnum = 3;
            }
            else if (a <= 0.7) {
                startnum = 4;
            }
            else {
                startnum = 5;
            }
            return startnum;
        };
        return FactionBossModel;
    }());
    faction.FactionBossModel = FactionBossModel;
    var FBossItemVo = /** @class */ (function () {
        function FBossItemVo() {
        }
        return FBossItemVo;
    }());
    faction.FBossItemVo = FBossItemVo;
    var RankVo = /** @class */ (function () {
        function RankVo() {
            this.isme = false;
        }
        return RankVo;
    }());
    faction.RankVo = RankVo;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBossModel.js.map