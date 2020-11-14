var moneytree;
(function (moneytree) {
    var MoneyTreeGiftVo = /** @class */ (function () {
        function MoneyTreeGiftVo() {
        }
        return MoneyTreeGiftVo;
    }());
    moneytree.MoneyTreeGiftVo = MoneyTreeGiftVo;
    var MoneyTreeBaseVo = /** @class */ (function () {
        function MoneyTreeBaseVo() {
        }
        return MoneyTreeBaseVo;
    }());
    moneytree.MoneyTreeBaseVo = MoneyTreeBaseVo;
    var MoneyTreeModel = /** @class */ (function () {
        function MoneyTreeModel() {
        }
        MoneyTreeModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MoneyTreeModel();
            }
            return this._instance;
        };
        MoneyTreeModel.prototype.getGiftAry = function () {
            var finshary = new Array;
            var tabary = tb.TB_moneytree_gift.get_TB_moneytree_gift();
            for (var i = 0; i < tabary.length; i++) {
                var data = new MoneyTreeGiftVo;
                data.tab = tabary[i];
                if (GuidData.player.getMoneyTreeNum() >= tabary[i].count) {
                    data.state = GuidData.player.getMoneyTreeState(i) ? 2 : 1;
                }
                else {
                    data.state = 0;
                }
                finshary.push(data);
            }
            return finshary;
        };
        MoneyTreeModel.prototype.getCurVo = function () {
            var tabary = tb.TB_moneytree_base.get_TB_moneytree_base();
            var times = GuidData.player.getMoneyTreeNum() >= tabary.length ? (tabary.length - 1) : GuidData.player.getMoneyTreeNum();
            var tablv = tb.TB_moneytree_lv.get_TB_moneytree_lvById(GuidData.player.getLevel());
            var basevo = new MoneyTreeBaseVo;
            basevo.tab = tabary[times];
            basevo.state = 0;
            if (basevo.tab.cost && basevo.tab.cost.length > 0) {
                basevo.state = 1;
            }
            basevo.money = Snum(Math.floor(tablv.reward[1] * basevo.tab.rate / 10000));
            return basevo;
        };
        return MoneyTreeModel;
    }());
    moneytree.MoneyTreeModel = MoneyTreeModel;
})(moneytree || (moneytree = {}));
//# sourceMappingURL=MoneyTreeModel.js.map