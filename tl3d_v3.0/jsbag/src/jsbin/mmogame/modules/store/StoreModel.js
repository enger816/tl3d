var store;
(function (store) {
    var StoreModel = /** @class */ (function () {
        function StoreModel() {
            this.getBaseList();
        }
        StoreModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new StoreModel();
            }
            return this._instance;
        };
        StoreModel.prototype.getBaseList = function () {
            this._activityary = new Array();
            var tabary = tb.TB_shop.get_TB_shop();
            for (var i = 0; i < tabary.length; i++) {
                var aa = new StoreItemVo();
                aa.data = tabary[i];
                if (aa.canBuy()) {
                    this._activityary.push(aa);
                }
            }
            //console.log("----this._activityary-----", this._activityary);
        };
        /**
         *
         * @param  获取二级从属页签
         */
        StoreModel.prototype.getPage = function ($tab) {
            if ($tab == SharedDef.MODULE_MALL_SCORE && GuidData.faction) {
                return 1;
            }
            for (var i = 0; i < this._activityary.length; i++) {
                var element = this._activityary[i];
                if ($tab == element.data.tab) {
                    return element.data.type;
                }
            }
        };
        /**
         * getList
         */
        StoreModel.prototype.getList = function ($tabid) {
            // var $finalary: Array<StoreItemVo>;
            // //未选中二级页签时，处理逻辑
            // var page:number;
            // if($type.length > 1){
            //     page = $type[1]
            // }else{
            //     page = this.getPage($type[0]);
            // }
            // //获取家族数据和其他数据的区分
            // if($type[0] == SharedDef.MODULE_MALL_SCORE &&　page　== 1){
            //     $finalary = this.getFactionList();
            // }else{
            //     $finalary = this.getrecommendList($type[0],page);
            // }
            // //console.log("--$finalary--", $finalary);
            // return $finalary;
            //默认情况下，填表的二级分类页签不会共用的逻辑
            var $finalary;
            //获取家族数据和其他数据的区分
            if ($tabid == 1) {
                $finalary = this.getFactionList();
            }
            else {
                $finalary = this.getrecommendList($tabid);
            }
            // console.log("--$finalary--", $finalary);
            return $finalary;
        };
        StoreModel.prototype.getItemVo = function ($itemid) {
            for (var i = 0; i < this._activityary.length; i++) {
                var element = this._activityary[i];
                if ($itemid == element.data.itemId) {
                    return element;
                }
            }
            return null;
        };
        //普通商店列表
        StoreModel.prototype.getrecommendList = function ($page) {
            var $recommendList = new Array;
            for (var i = 0; i < this._activityary.length; i++) {
                var element = this._activityary[i];
                if ($page == element.data.type) {
                    $recommendList.push(this._activityary[i]);
                }
            }
            return $recommendList;
        };
        //家族商店列表
        StoreModel.prototype.getFactionList = function () {
            var $featsList = new Array;
            var $shopListVo = GuidData.faction.getShopList();
            for (var i = 0; i < $shopListVo.length; i++) {
                var factionshopdvo = new StoreItemVo();
                factionshopdvo.data1 = $shopListVo[i];
                factionshopdvo.data2 = this.getfactionshopnumVo($shopListVo[i].id);
                $featsList.push(factionshopdvo);
            }
            return $featsList;
        };
        StoreModel.prototype.getfactionshopnumVo = function ($id) {
            var $factionShopNumList = GuidData.player.getFactionShopNumList();
            for (var i = 0; i < $factionShopNumList.length; i++) {
                if ($factionShopNumList[i].id == $id) {
                    return $factionShopNumList[i];
                }
            }
            return $factionShopNumList[$factionShopNumList.length - 1];
        };
        StoreModel.prototype.getTablist = function ($tab) {
            var aaa = new Array;
            if ($tab == SharedDef.MODULE_MALL_SCORE && GuidData.faction) {
                aaa.push(1);
            }
            for (var i = 0; i < this._activityary.length; i++) {
                if (this._activityary[i].data.tab == $tab) {
                    if (this.completeAB(aaa, this._activityary[i].data.type)) {
                        aaa.push(this._activityary[i].data.type);
                    }
                }
            }
            return aaa;
        };
        StoreModel.prototype.completeAB = function ($ary, $type) {
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i] == $type) {
                    return false;
                }
            }
            return true;
        };
        return StoreModel;
    }());
    store.StoreModel = StoreModel;
    var StoreItemVo = /** @class */ (function () {
        function StoreItemVo() {
            this.isnewprop = false;
        }
        StoreItemVo.prototype.canBuy = function () {
            if (this.data.time && this.data.time.length > 0) {
                if (!this.compareTime(this.data.time[0], this.data.time[1] - 1, this.data.time[2]) && this.compareTime(this.data.time[3], this.data.time[4] - 1, this.data.time[5])) {
                    //正处于上架中
                    var $ts = GameInstance.getServerNow();
                    var $sever = new Date($ts * 1000);
                    var time = $sever.getTime() - this.getTime(this.data.time[0], this.data.time[1], this.data.time[2]);
                    var time1 = this.getTime(2017, 1, 2) - this.getTime(2017, 1, 5);
                    if (time < time1) {
                        this.isnewprop = true;
                    }
                    return true;
                }
                else {
                    //未上架
                    return false;
                }
            }
            else {
                //常驻道具
                return true;
            }
        };
        /**
         * 剩余可购买个数
         */
        StoreItemVo.prototype.getNum = function () {
            var num = -1;
            if (this.data.limtype != 0) {
                var num1 = this.data.limdata;
                var num2 = GuidData.player.getLimShopNum(this.data.id);
                num = num1 - num2;
            }
            return num;
        };
        StoreItemVo.prototype.compareTime = function ($year, $month, $day) {
            //服务器当前标准时间
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts * 1000);
            var $play = new Date($ts * 1000);
            $play.setFullYear($year);
            $play.setMonth($month);
            $play.setDate($day);
            $play.setHours(0);
            $play.setMinutes(0);
            $play.setSeconds(0);
            //时间未到 true 时间到了 false
            return $sever.getTime() < $play.getTime();
        };
        StoreItemVo.prototype.getTime = function ($year, $month, $day) {
            //服务器当前标准时间
            var $ts = GameInstance.getServerNow();
            var $play = new Date($ts * 1000);
            $play.setFullYear($year);
            $play.setMonth($month);
            $play.setDate($day);
            $play.setHours(0);
            $play.setMinutes(0);
            $play.setSeconds(0);
            return $play.getTime();
        };
        return StoreItemVo;
    }());
    store.StoreItemVo = StoreItemVo;
})(store || (store = {}));
//# sourceMappingURL=StoreModel.js.map