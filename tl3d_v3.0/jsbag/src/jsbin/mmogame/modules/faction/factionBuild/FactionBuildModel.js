var faction;
(function (faction) {
    var FactionBuildModel = /** @class */ (function () {
        function FactionBuildModel() {
        }
        FactionBuildModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FactionBuildModel();
            }
            return this._instance;
        };
        /**
         * getList
         */
        FactionBuildModel.prototype.getList = function () {
            var $type = -100;
            // var $index: number = 0;
            var $finalary = new Array;
            var tabary = tb.TB_faction_building.get_TB_faction_building();
            var arynum = GuidData.faction.getHaveBuild();
            for (var i = 0; i < arynum.length; i++) {
                if (arynum[i] > 0) {
                    var vo = new FBuildItemVo();
                    vo.data = tb.TB_faction_building.get_TB_faction_buildingById(arynum[i]);
                    if (GuidData.faction.getBuildCur() == arynum[i]) {
                        vo.state = 1;
                    }
                    else {
                        vo.state = 3;
                    }
                    $finalary.push(vo);
                }
            }
            for (var i = 0; i < tabary.length; i++) {
                if (tabary[i].type != $type && !this.hasItem(tabary[i], $finalary)) {
                    var vo = new FBuildItemVo();
                    vo.data = tabary[i];
                    vo.state = 2;
                    $finalary.push(vo);
                }
                $type = tabary[i].type;
            }
            return $finalary;
        };
        FactionBuildModel.prototype.hasItem = function ($tabvo, $completeary) {
            for (var i = 0; i < $completeary.length; i++) {
                if ($completeary[i].getType() == $tabvo.type) {
                    return true;
                }
            }
            return false;
        };
        FactionBuildModel.prototype.getTime = function ($overtime) {
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
        FactionBuildModel.prototype.comPareTime = function ($overtime) {
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts);
            var a = $overtime - $sever.getTime();
            if (a < 0) {
                return false;
            }
            return true;
        };
        FactionBuildModel.prototype.getTabvo = function ($buildtype) {
            var havebuildlist = GuidData.faction.getHaveBuild();
            for (var i = 0; i < havebuildlist.length; i++) {
                if (havebuildlist[i] > 0) {
                    var a = havebuildlist[i];
                    var b = Math.floor(a / 100);
                    if (b == $buildtype) {
                        return tb.TB_faction_building.get_TB_faction_buildingById(a);
                    }
                }
            }
            return null;
        };
        return FactionBuildModel;
    }());
    faction.FactionBuildModel = FactionBuildModel;
    var FBuildItemVo = /** @class */ (function () {
        function FBuildItemVo() {
        }
        FBuildItemVo.prototype.getType = function () {
            return (this.data.id - this.data.level) / 100;
        };
        return FBuildItemVo;
    }());
    faction.FBuildItemVo = FBuildItemVo;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBuildModel.js.map