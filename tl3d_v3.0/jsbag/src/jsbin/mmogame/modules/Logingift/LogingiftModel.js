var logingift;
(function (logingift) {
    var LogingiftModel = /** @class */ (function () {
        function LogingiftModel() {
        }
        LogingiftModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new LogingiftModel();
            }
            return this._instance;
        };
        /**获得第一个未领取奖励的展示模型索引 */
        LogingiftModel.prototype.getnearday = function () {
            var aflag = GuidData.player.getLogingiftReward();
            for (var i = 0; i < aflag.length; i++) {
                if (!aflag[i]) {
                    var tab = tb.TB_login_activity_reward.get_TB_login_activity_rewardById(i + 1);
                    return tab.indx;
                }
            }
        };
        LogingiftModel.prototype.getList = function () {
            var arylist = new Array;
            var curday = GuidData.player.getLogingiftDay();
            var arytab = tb.TB_login_activity_reward.get_TB_login_activity_reward();
            var aflag = GuidData.player.getLogingiftReward();
            for (var i = 0; i < arytab.length; i++) {
                var vo = new LogingiftVo();
                vo.data = arytab[i];
                if (curday >= arytab[i].day) {
                    //满足领取条件
                    if (aflag[i]) {
                        //已领取
                        vo.state = 3;
                    }
                    else {
                        //可领取
                        vo.state = 1;
                    }
                }
                else {
                    vo.state = 2;
                }
                arylist.push(vo);
            }
            arylist.sort(function (a, b) {
                if (a.state == b.state) {
                    return a.data.id - b.data.id;
                }
                else {
                    return a.state - b.state;
                }
            });
            return arylist;
        };
        LogingiftModel.prototype.isVisiable = function () {
            var ary = this.getList();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].state != 3) {
                    return true;
                }
            }
            return false;
        };
        return LogingiftModel;
    }());
    logingift.LogingiftModel = LogingiftModel;
    var LogingiftVo = /** @class */ (function () {
        function LogingiftVo() {
        }
        return LogingiftVo;
    }());
    logingift.LogingiftVo = LogingiftVo;
})(logingift || (logingift = {}));
//# sourceMappingURL=LogingiftModel.js.map