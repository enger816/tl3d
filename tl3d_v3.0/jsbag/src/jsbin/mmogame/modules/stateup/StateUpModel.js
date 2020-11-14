var stateup;
(function (stateup) {
    var TaskCell = /** @class */ (function () {
        function TaskCell() {
        }
        return TaskCell;
    }());
    stateup.TaskCell = TaskCell;
    var StateUpModel = /** @class */ (function () {
        function StateUpModel() {
        }
        StateUpModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new StateUpModel();
            }
            return this._instance;
        };
        StateUpModel.prototype.getTaskAry = function () {
            if (!this._taskAry) {
                this.refreshTaskAry();
            }
            //console.log("-------境界突破中的成就------",this._taskAry);
            return this._taskAry;
        };
        StateUpModel.prototype.setTaskAry = function () {
            var ary = new Array;
            var $arr = GuidData.quest.getStateUpTaskList();
            for (var i = 0; i < $arr.length; i++) {
                var vo = new TaskCell;
                vo.qusdata = $arr[i];
                vo.tb_quest = tb.TB_quest.getTbById(vo.qusdata.id);
                ary.push(vo);
            }
            return ary;
        };
        StateUpModel.prototype.refreshTaskAry = function () {
            this._taskAry = this.setTaskAry();
        };
        StateUpModel.prototype.getRecommend = function () {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_realmbreak_base);
            var lengstr;
            //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                lengstr = $key;
            }
            for (var i = Number(lengstr); i >= 0; i--) {
                if ($obj.data[String(i)]["level"] <= GuidData.player.getLevel()) {
                    return $obj.data[String(i)];
                }
            }
            return null;
        };
        return StateUpModel;
    }());
    stateup.StateUpModel = StateUpModel;
})(stateup || (stateup = {}));
//# sourceMappingURL=StateUpModel.js.map