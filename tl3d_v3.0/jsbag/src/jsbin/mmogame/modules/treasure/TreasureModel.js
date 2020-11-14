var treasure;
(function (treasure) {
    var TreasureItemVo = /** @class */ (function () {
        function TreasureItemVo() {
        }
        return TreasureItemVo;
    }());
    treasure.TreasureItemVo = TreasureItemVo;
    var TreasureModel = /** @class */ (function () {
        function TreasureModel() {
        }
        TreasureModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TreasureModel();
            }
            return this._instance;
        };
        TreasureModel.prototype.hasWearItem = function ($ary, $id) {
            for (var index = 0; index < $ary.length; index++) {
                if ($ary[index].state == 1) {
                    if ($ary[index].treasureid == $id) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
          * getList
          */
        TreasureModel.prototype.getList = function () {
            var $finalary = new Array;
            var tabary = tb.TB_talisman_base.get_TB_talisman_base();
            var talismanslotlist = GuidData.grow.gettalismanslotlist();
            for (var i = 0; i < tabary.length; i++) {
                var itemvo = new TreasureItemVo();
                itemvo.id = i;
                itemvo.wear = this.hasWearItem(talismanslotlist, tabary[i].id);
                var recallvo = this.compareAB(tabary[i].id);
                if (recallvo == null) {
                    itemvo.state = 2;
                }
                else {
                    itemvo.state = 1;
                }
                itemvo.tabvo = tabary[i];
                itemvo.activityvo = recallvo;
                $finalary.push(itemvo);
            }
            $finalary.sort(function (a, b) {
                if (a.state == b.state) {
                    return a.tabvo.id - b.tabvo.id;
                }
                else {
                    return a.state - b.state;
                }
            });
            return $finalary;
        };
        TreasureModel.prototype.compareAB = function ($id) {
            var $arr = GuidData.grow.getTreasureList();
            for (var i = 0; i < $arr.length; i++) {
                if ($arr[i].id == $id) {
                    return $arr[i];
                }
            }
            return null;
        };
        TreasureModel.prototype.getTreasureList = function () {
            var finary = new Array;
            var ary = GuidData.grow.getTreasureList();
            for (var i = 0; i < ary.length; i++) {
                if (!this.hasItem(ary[i].id)) {
                    finary.push(ary[i]);
                }
            }
            return finary;
        };
        TreasureModel.prototype.hasItem = function ($id) {
            var slotlist = GuidData.grow.gettalismanslotlist();
            for (var k = 0; k < slotlist.length; k++) {
                if (slotlist[k].treasureid == $id) {
                    return true;
                }
            }
            return false;
        };
        return TreasureModel;
    }());
    treasure.TreasureModel = TreasureModel;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureModel.js.map