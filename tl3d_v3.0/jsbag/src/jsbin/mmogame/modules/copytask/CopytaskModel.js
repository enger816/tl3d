var copytask;
(function (copytask) {
    var TeamCopyItemVo = /** @class */ (function () {
        function TeamCopyItemVo() {
        }
        return TeamCopyItemVo;
    }());
    copytask.TeamCopyItemVo = TeamCopyItemVo;
    var ResItemvo = /** @class */ (function () {
        function ResItemvo() {
        }
        return ResItemvo;
    }());
    copytask.ResItemvo = ResItemvo;
    var CopytaskModel = /** @class */ (function () {
        function CopytaskModel() {
        }
        CopytaskModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new CopytaskModel();
            }
            return this._instance;
        };
        /**
          * getList
          */
        CopytaskModel.prototype.getList = function () {
            var firstflagary = GuidData.player.getteamflag();
            var $finalary = new Array;
            var tabary = tb.TB_group_instance_base.getItem();
            for (var i = 0; i < tabary.length; i++) {
                var itemvo = new TeamCopyItemVo();
                if (tabary[i].limLev > GuidData.player.getLevel()) {
                    itemvo.state = 3;
                }
                else {
                    if (firstflagary[tabary[i].id]) {
                        itemvo.state = 2;
                    }
                    else {
                        itemvo.state = 1;
                    }
                }
                itemvo.tabvo = tabary[i];
                $finalary.push(itemvo);
            }
            // $finalary.sort(
            //     function (a: TeamCopyItemVo, b: TeamCopyItemVo): number {
            //         if (a.state == b.state) {
            //             return a.tabvo.id - b.tabvo.id;
            //         } else {
            //             return a.state - b.state;
            //         }
            //     }
            // )
            //console.log("--$finalary--", $finalary);
            return $finalary;
        };
        CopytaskModel.prototype.getResItems = function ($type) {
            var finiary = new Array;
            var kk = GuidData.instanceData.getInstanceIntFieldResSatrt();
            var $obj = TableData.getInstance().getTableByName(TableData.tb_instance_res);
            for (var $key in $obj.data) {
                if ($type == $obj.data[$key]["type"]) {
                    var cell = new ResItemvo;
                    cell.tab = $obj.data[$key];
                    var idx = cell.tab["id"];
                    var type = cell.tab["type"];
                    if (kk[idx]) {
                        cell.passed = kk[idx - 1].passed;
                        cell.receive = kk[idx - 1].recive;
                        cell.num = cell.tab["times"] - kk[type - 1].num;
                    }
                    else {
                        //console.log("---后端的数据未存在----");
                        cell.passed = 0;
                        cell.receive = 0;
                        cell.num = 0;
                    }
                    finiary.push(cell);
                }
            }
            //console.log("----finiary---",finiary);
            return finiary;
        };
        return CopytaskModel;
    }());
    copytask.CopytaskModel = CopytaskModel;
})(copytask || (copytask = {}));
//# sourceMappingURL=CopytaskModel.js.map