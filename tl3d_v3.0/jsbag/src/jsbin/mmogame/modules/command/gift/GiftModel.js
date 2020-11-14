var gift;
(function (gift) {
    var GiftSendVo = /** @class */ (function () {
        function GiftSendVo() {
        }
        return GiftSendVo;
    }());
    gift.GiftSendVo = GiftSendVo;
    var GiftModel = /** @class */ (function () {
        //初始技能数据
        function GiftModel() {
            this.dataResouce = new Array();
            var $arr = tb.TB_faction_gift.get_TB_faction_gift();
            for (var i = 0; i < $arr.length; i++) {
                var $vo = new GiftSendVo();
                $vo.id = i;
                $vo.num = 0;
                $vo.has = 0;
                $vo.tb_faction_gift = $arr[i];
                $vo.tb_item_template = tb.TB_item_template.get_TB_item_template($vo.tb_faction_gift.id);
                this.dataResouce.push($vo);
            }
            this.sortItem();
        }
        GiftModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new GiftModel();
            }
            return this._instance;
        };
        GiftModel.prototype.sortItem = function () {
            for (var i = 0; i < this.dataResouce.length; i++) {
                var $vo = this.dataResouce[i];
                var $k = $vo.id % 10;
                var sortId = ($k * 2) % 10 + Math.floor($k / 5) + Math.floor($vo.id / 10) * 10;
                $vo.id = sortId;
            }
            /*
            this.dataResouce.sort(
                function (a: GiftSendVo, b: GiftSendVo): number {
                    return a.id - b.id;
                }
            )
            */
        };
        GiftModel.prototype.getResouceLen = function () {
            return this.dataResouce.length;
        };
        GiftModel.prototype.refrishResouce = function () {
            for (var i = 0; i < this.dataResouce.length; i++) {
                var $itemID = this.dataResouce[i].tb_item_template.id;
                this.dataResouce[i].has = GuidData.bag.getItemCount($itemID);
                this.dataResouce[i].num = 0;
            }
        };
        //返回即时奖励，有可能会是多个类型;
        GiftModel.prototype.getResouceRewardNow = function () {
            var obj = new Object;
            for (var i = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    for (var j = 0; j < this.dataResouce[i].tb_faction_gift.reward.length; j++) {
                        var $arr = this.dataResouce[i].tb_faction_gift.reward[j];
                        if (!obj[$arr[0]]) {
                            obj[$arr[0]] = 0;
                        }
                        obj[$arr[0]] += $arr[1] * this.dataResouce[i].num;
                    }
                }
            }
            var $str = "×0";
            for (var $key in obj) {
                $str = "";
                //console.log($key, obj[$key]);
                var $tb = tb.TB_item_template.get_TB_item_template(Number($key));
                //   $str += $tb.getColorName();
                $str += "×" + obj[$key];
            }
            return $str;
        };
        //返回即时奖励，有可能会是多个类型;
        GiftModel.prototype.getResouceRewardEx = function () {
            var obj = new Object;
            for (var i = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    for (var j = 0; j < this.dataResouce[i].tb_faction_gift.ex_reward.length; j++) {
                        var $arr = this.dataResouce[i].tb_faction_gift.ex_reward[j];
                        if (!obj[$arr[0]]) {
                            obj[$arr[0]] = 0;
                        }
                        obj[$arr[0]] += $arr[1] * this.dataResouce[i].num;
                    }
                }
            }
            var $str = "×0";
            for (var $key in obj) {
                $str = "";
                //console.log($key, obj[$key]);
                var $tb = tb.TB_item_template.get_TB_item_template(Number($key));
                //   $str += $tb.getColorName();
                $str += "×" + obj[$key];
            }
            return $str;
        };
        GiftModel.prototype.getResouceById = function (value) {
            for (var i = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].id == value) {
                    return this.dataResouce[i];
                }
            }
            return null;
        };
        GiftModel.prototype.isCanAddGiffById = function ($id) {
            var $idArr = new Array;
            for (var i = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    $idArr.push(this.dataResouce[i].id);
                }
            }
            if ($idArr.length < 4) {
                return true;
            }
            else {
                for (var j = 0; j < $idArr.length; j++) {
                    if ($idArr[j] == $id) {
                        return true;
                    }
                }
            }
            return false;
        };
        //   private msg:string = "爱女王一万年么么哒爱女王一万年么么哒爱女王一万年么么哒"
        GiftModel.prototype.sendGiftToServer = function ($str) {
            var $itemlist = new Array;
            for (var i = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    var ary = new item_reward_info;
                    ary.item_id = this.dataResouce[i].tb_item_template.id;
                    ary.num = this.dataResouce[i].num;
                    $itemlist.push(ary);
                }
            }
            if ($itemlist.length) {
                NetManager.getInstance().protocolos.send_faction_gift($itemlist, $str, SharedDef.FACTION_DATA_REPLY_TYPE_TEXT);
                return true;
            }
            else {
                return false;
            }
        };
        return GiftModel;
    }());
    gift.GiftModel = GiftModel;
})(gift || (gift = {}));
//# sourceMappingURL=GiftModel.js.map