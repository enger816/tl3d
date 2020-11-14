var faction;
(function (faction) {
    var FactionLeagueModel = /** @class */ (function () {
        function FactionLeagueModel() {
        }
        FactionLeagueModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FactionLeagueModel();
            }
            return this._instance;
        };
        /**
         * 返回当前属于哪个阶段
         */
        FactionLeagueModel.prototype.getCurStage = function () {
            var stage = GuidData.globelValue.getFactionLeagueStage();
            var $obj = TableData.getInstance().getData(TableData.tb_faction_match_phase, stage);
            var id = 0;
            if ($obj) {
                id = $obj["script"];
            }
            return id;
        };
        /**
         * 返回当前属于哪个模块
         */
        FactionLeagueModel.prototype.getCurModul = function () {
            var stage = GuidData.globelValue.getFactionLeagueStage();
            var $obj = TableData.getInstance().getData(TableData.tb_faction_match_phase, stage);
            var id = 0;
            if ($obj) {
                id = $obj["script"];
            }
            return this.retModul(id);
        };
        FactionLeagueModel.prototype.retModul = function ($script) {
            switch ($script) {
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_INIT:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_UPDATE:
                    //生成对战列表阶段
                    return 2;
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_DECIDE_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_SECOND:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_SECOND:
                    //比赛阶段
                    return 0;
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_SECOND:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_NONE:
                    //结束
                    return 1;
            }
        };
        FactionLeagueModel.prototype.readData = function () {
            var list = new Array;
            var curmodul = this.getCurModul();
            if (curmodul == 1) {
                this._modullist.sort(function (a, b) {
                    return a.rank - b.rank;
                });
            }
            for (var i = 0; i < 5; i++) {
                var cell = new faction.LeagueItem;
                cell.items = new Array;
                cell.type = curmodul;
                for (var k = 0; k < 4; k++) {
                    var idx = i * 4 + k;
                    if (this._modullist.length > idx) {
                        cell.items.push(this._modullist[idx]);
                    }
                    else {
                        cell.items.push(null);
                    }
                }
                list.push(cell);
            }
            //console.log("---list-----", list);
            return list;
        };
        FactionLeagueModel.prototype.writeData = function ($vo) {
            this._modullist = $vo.list;
        };
        //获取是否有我家族参赛资格
        FactionLeagueModel.prototype.getMyFaction = function () {
            if (!GuidData.faction) {
                return null;
            }
            for (var i = 0; i < this._modullist.length; i++) {
                if (this._modullist[i].guid == GuidData.faction.getGuid()) {
                    return this._modullist[i];
                }
            }
            return null;
        };
        return FactionLeagueModel;
    }());
    faction.FactionLeagueModel = FactionLeagueModel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionLeagueModel.js.map