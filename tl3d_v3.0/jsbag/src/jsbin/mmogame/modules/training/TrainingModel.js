var training;
(function (training) {
    var TaskVo = /** @class */ (function () {
        function TaskVo() {
        }
        return TaskVo;
    }());
    training.TaskVo = TaskVo;
    var TrainingModel = /** @class */ (function () {
        function TrainingModel() {
        }
        TrainingModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TrainingModel();
            }
            return this._instance;
        };
        TrainingModel.prototype.getTaskvo = function () {
            if (!this.tasklist) {
                this.tasklist = this.getTaskAry();
                this.refreshTaskAry();
            }
            return this.tasklist;
        };
        TrainingModel.prototype.refreshTaskAry = function () {
            if (!this.tasklist) {
                this.tasklist = this.getTaskAry();
            }
            for (var i = 0; i < this.tasklist.length; i++) {
                this.tasklist[i].questData = this.hasTrainingVo(this.tasklist[i].tab_adventure.quest_id);
            }
        };
        TrainingModel.prototype.getTaskAry = function () {
            var finary = new Array;
            var tabary = tb.TB_quest_adventure_base.get_TB_quest_adventure_base();
            for (var i = 0; i < tabary.length; i++) {
                var aaa = new TaskVo();
                aaa.tab_adventure = tabary[i];
                aaa.tab_quest = tb.TB_quest.getTbById(tabary[i].quest_id);
                finary.push(aaa);
            }
            return finary;
        };
        TrainingModel.prototype.hasTrainingVo = function ($taskid) {
            var $arr = GuidData.quest.getTrainingTaskList();
            for (var i = 0; i < $arr.length; i++) {
                if ($taskid == $arr[i].id) {
                    return $arr[i];
                }
            }
            return null;
        };
        TrainingModel.prototype.getprev_limitflag = function ($prev) {
            switch ($prev[0]) {
                case 1:
                    //幻境通关
                    var $tb = adventure.AdventureModel.getInstance().getCurTb();
                    return $tb.id > $prev[1];
                case 2:
                    //击杀某只怪
                    return false;
                case 3:
                    //战力达到
                    return GuidData.player.getForce() >= $prev[1];
                case 4:
                    //人物达到等级
                    return GuidData.player.getLevel() >= $prev[1];
                case 5:
                    //翅膀达到
                    var lev = false;
                    var star = false;
                    if (GuidData.grow.getWingIsActive()) {
                        var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
                        lev = targetData.rank >= $prev[1];
                        star = true;
                        if (targetData.rank == $prev[1]) {
                            star = targetData.star >= $prev[2];
                        }
                    }
                    return lev && star;
                case 6:
                    //坐骑达到
                    var lev = GuidData.grow.getMountLevel() >= $prev[1];
                    var star = true;
                    if (GuidData.grow.getMountLevel() == $prev[1]) {
                        star = GuidData.grow.getMountStart() >= $prev[2];
                    }
                    return lev && star;
                default:
                    return false;
            }
        };
        TrainingModel.prototype.getprev_limitstr = function ($prev) {
            switch ($prev[0]) {
                case 1:
                    //幻境通关
                    var $tb = tb.TB_risk_data.get_TB_risk_data($prev[1]);
                    return "幻境通关至" + $tb.name + "可升级";
                case 2:
                    //击杀某只怪
                    return "击杀某只怪物";
                case 3:
                    //战力达到
                    return "战力达到" + Snum($prev[1]) + "可升级";
                case 4:
                    //人物达到等级
                    return "人物达到" + $prev[1] + "级可升级";
                case 5:
                    //翅膀达到
                    return "翅膀达到" + $prev[1] + "阶" + $prev[2] + "星可升级";
                case 6:
                    //坐骑达到
                    return "坐骑达到" + $prev[1] + "阶" + $prev[2] + "星可升级";
                default:
                    return "";
            }
        };
        return TrainingModel;
    }());
    training.TrainingModel = TrainingModel;
})(training || (training = {}));
//# sourceMappingURL=TrainingModel.js.map