var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BagData = /** @class */ (function (_super) {
    __extends(BagData, _super);
    function BagData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BagData.prototype.onBaseCreated = function () {
        var _this = this;
        this.readData();
        //this._after_update = ($this: any, $flag: number, $intMask: UpdateMask, $strMask: UpdateMask) => { this.updateData($flag, $intMask, $strMask) }
        this._after_update = function ($flag, $intMask, $strMask) { _this.updateData($intMask, $strMask); };
        this.initData();
    };
    BagData.prototype.readData = function () {
        var str = "";
        for (var i = 9; i <= 23; i++) {
            str += i + ":" + this.GetUInt16(i, 0) + ",";
            str += this.GetUInt16(i, 1) + "\n";
        }
        for (i = 128; i < 180; i++) {
            str += (i + ":" + this.GetUInt32(i)) + "\n";
        }
        ////console.log(str);
        //this.setGmBg();
    };
    BagData.prototype.getBagSize = function ($type) {
        if ($type === void 0) { $type = 0; }
        if ($type == BagData.TYPE_BAG) {
            $type = 0;
        }
        else if ($type == BagData.TYPE_EQU_BG) {
            $type = 2;
        }
        else if ($type == BagData.TYPE_GEM) {
            $type = 3;
        }
        var idx = 9 + float2int($type / 2);
        var offs = $type % 2;
        return this.GetUInt16(idx, offs);
    };
    BagData.prototype.getBagNum = function ($type) {
        if ($type === void 0) { $type = 0; }
        if ($type == BagData.TYPE_BAG) {
            return this.getListSize(this._bgList);
        }
        else if ($type == BagData.TYPE_EQU_BG) {
            return this.getListSize(this._equBgList);
        }
        else if ($type == BagData.TYPE_GEM) {
            return this.getListSize(this._gemBgList);
        }
        else {
            return 0;
        }
    };
    BagData.prototype.getListSize = function ($ary) {
        var num = 0;
        for (var i = 0; i < $ary.length; i++) {
            if ($ary[i]) {
                num++;
            }
        }
        return num;
    };
    BagData.prototype.initData = function () {
        this.getAllBgData();
        this.getEquData();
        this.getEquBgData();
        this.getGemBgData();
        this.processRedPoint();
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    BagData.prototype.getAllBgData = function () {
        if (this._bgList) {
            return this._bgList;
        }
        var ary = new Array;
        for (var key in this._str_values) {
            var keyNum = Number(key);
            if (keyNum >= 128) {
                var itemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos < 1000) {
                    ary[itemData.pos] = itemData;
                }
            }
        }
        this._bgList = ary;
        return ary;
    };
    BagData.prototype.getEquBgData = function () {
        if (this._equBgList) {
            return this._equBgList;
        }
        var ary = new Array;
        for (var key in this._str_values) {
            var keyNum = Number(key);
            if (keyNum >= 128) {
                var itemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos >= 2000 && itemData.pos < 3000) {
                    itemData.pos -= 2000;
                    ary[itemData.pos] = itemData;
                }
            }
        }
        this._equBgList = ary;
        return ary;
    };
    BagData.prototype.getGemBgData = function () {
        if (this._gemBgList) {
            return this._gemBgList;
        }
        var ary = new Array;
        for (var key in this._str_values) {
            var keyNum = Number(key);
            if (keyNum >= 128) {
                var itemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos >= 3000 && itemData.pos < 4000) {
                    itemData.pos -= 3000;
                    ary[itemData.pos] = itemData;
                }
            }
        }
        this._gemBgList = ary;
        return ary;
    };
    BagData.prototype.getBgItemData = function ($pos, $bagType) {
        var ary;
        if ($bagType == BagData.TYPE_BAG) {
            ary = this.getAllBgData();
        }
        else if ($bagType == BagData.TYPE_EQU_BG) {
            ary = this.getEquBgData();
        }
        else if ($bagType == BagData.TYPE_GEM) {
            ary = this.getGemBgData();
        }
        return ary[$pos];
    };
    BagData.prototype.getBagAllItemCount = function () {
        var num = 0;
        for (var key in this._str_values) {
            var keyNum = Number(key);
            if (keyNum >= 128) {
                var itemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos < 1000) {
                    num++;
                }
            }
        }
        return num;
    };
    /**背包中是否有指定的数量的道具  */
    BagData.prototype.hasItem = function ($entry, $count) {
        if ($count === void 0) { $count = 1; }
        var ary = this.getAllBgData();
        var all = 0;
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                all += ary[i].count;
                if (all >= $count) {
                    return true;
                }
            }
        }
        // ary = this.getGemBgData();
        // for (var i: number = 0; i < ary.length; i++) {
        //     if (ary[i] && ary[i].entry == $entry) {
        //         all += ary[i].count;
        //         if (all >= $count) {
        //             return true;
        //         }
        //     }
        // }
        return false;
    };
    /**获取指定道具的数量 */
    BagData.prototype.getItemCount = function ($entry) {
        var ary = this.getAllBgData();
        var all = 0;
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                all += ary[i].count;
            }
        }
        return all;
    };
    BagData.prototype.getItemByEntry = function ($entry) {
        var ary = this.getAllBgData();
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                return ary[i];
            }
        }
        return null;
    };
    BagData.prototype.getItemByEntryCopy = function ($entry) {
        var ary = this.getGemBgData();
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                return ary[i];
            }
        }
        return null;
    };
    BagData.prototype.getEmptyPos = function () {
        var ary = this.getAllBgData();
        var posAry = new Array;
        for (var i = 0; i < ary.length; i++) {
            if (ary[i]) {
                posAry.push(ary[i].pos);
            }
        }
        var maxBg = this.getBagSize();
        for (var i = 0; i < maxBg; i++) {
            if (posAry.indexOf(i) == -1) {
                return i;
            }
        }
        return -1;
    };
    BagData.prototype.getEmptyEquBagPos = function () {
        var ary = this.getEquBgData();
        var posAry = new Array;
        for (var i = 0; i < ary.length; i++) {
            if (ary[i]) {
                posAry.push(ary[i].pos);
            }
        }
        var maxBg = this.getBagSize(2);
        for (var i = 0; i < maxBg; i++) {
            if (posAry.indexOf(i) == -1) {
                return i;
            }
        }
        return -1;
    };
    BagData.prototype.getEquData = function () {
        if (this._equList) {
            return this._equList;
        }
        this.refreshEquData();
        return this._equList;
    };
    BagData.prototype.getEquPart = function ($pos) {
        return this.getEquData()[$pos];
    };
    BagData.prototype.refreshEquData = function () {
        var ary = new Array;
        for (var key in this._str_values) {
            var keyNum = Number(key);
            if (keyNum >= 128) {
                var itemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos >= 1000 && itemData.pos < 2000) {
                    itemData.pos -= 1000;
                    ary[itemData.pos] = itemData;
                }
            }
        }
        this._equList = ary;
    };
    BagData.prototype.refreshBagDataChange = function (intMashObj, maskObj) {
        if (!this._equList || !this._bgList) {
            return;
        }
        var equAry = new Array;
        var bgAry = new Array;
        var equBgAry = new Array;
        var gemBgAry = new Array;
        for (var key in this._str_values) {
            var keyNum = Number(key);
            if (keyNum >= 128) {
                var pos = this.getItemPos(keyNum);
                if (pos >= 0 && pos < 1000) {
                    bgAry[pos] = keyNum;
                }
                else if (pos < 2000) {
                    pos -= 1000;
                    equAry[pos] = keyNum;
                }
                else if (pos < 3000) {
                    pos -= 2000;
                    equBgAry[pos] = keyNum;
                }
                else if (pos < 4000) {
                    pos -= 3000;
                    gemBgAry[pos] = keyNum;
                }
            }
        }
        this.processEquChg(equAry, maskObj);
        this.processBagChg(bgAry, maskObj);
        this.processEquBagChg(equBgAry, maskObj);
        this.processGemBagChg(gemBgAry, maskObj);
    };
    //private clearList($ary: Array<BagItemData>): void {
    // for (var i: number = $ary.length - 1; i >= 0; i--) {
    //     if(!$ary[i]){
    //         $ary.splice(i,1);
    //     }
    // }
    //}
    BagData.prototype.processEquChg = function (equAry, maskObj) {
        var minLeng = Math.max(this._equList.length, equAry.length);
        var equChangeAry = new Array;
        for (var i = 0; i < minLeng; i++) {
            var flag = false;
            if (equAry[i]) {
                if (!this._equList[i]) {
                    flag = true;
                }
                else if (maskObj[this._equList[i].dataIndex]) {
                    flag = true;
                }
                else if (this._equList[i].dataIndex != equAry[i]) {
                    flag = true;
                }
            }
            else {
                if (this._equList[i]) {
                    flag = true;
                }
            }
            if (flag) {
                this._equList[i] = this.getItmeData(equAry[i]);
                if (this._equList[i]) {
                    this._equList[i].pos -= 1000;
                }
                equChangeAry.push(i);
            }
        }
        if (equChangeAry.length) {
            //this.clearList(this._equList);
            var evt = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_EQU;
            evt.data = equChangeAry;
            ModuleEventManager.dispatchEvent(evt);
        }
    };
    BagData.prototype.processBagChg = function (bgAry, maskObj) {
        var minLeng = Math.max(this._bgList.length, bgAry.length);
        var bgChangeAry = new Array;
        var itemChageAry = new Array;
        for (var i = 0; i < minLeng; i++) {
            var flag = false;
            if (bgAry[i]) {
                if (!this._bgList[i]) {
                    flag = true;
                }
                else if (maskObj[this._bgList[i].dataIndex]) {
                    flag = true;
                }
                else if (this._bgList[i].dataIndex != bgAry[i]) {
                    flag = true;
                }
            }
            else {
                if (this._bgList[i]) {
                    flag = true;
                }
            }
            if (flag) {
                this._bgList[i] = this.getItmeData(bgAry[i]);
                bgChangeAry.push(i);
                if (this._bgList[i]) {
                    itemChageAry.push(this._bgList[i].entry);
                }
            }
        }
        if (bgChangeAry.length) {
            //this.clearList(this._bgList);
            var evt = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_BAG;
            evt.data = bgChangeAry;
            evt.change = itemChageAry;
            ModuleEventManager.dispatchEvent(evt);
        }
    };
    BagData.prototype.bindItemFun = function ($id, $fun) {
    };
    BagData.prototype.unBindItemFun = function ($fun) {
    };
    BagData.prototype.processEquBagChg = function (equBgAry, maskObj) {
        var minLeng = Math.max(this._equBgList.length, equBgAry.length);
        var equBgChangeAry = new Array;
        for (var i = 0; i < minLeng; i++) {
            var flag = false;
            if (equBgAry[i]) {
                if (!this._equBgList[i]) {
                    flag = true;
                }
                else if (maskObj[this._equBgList[i].dataIndex]) {
                    flag = true;
                }
                else if (this._equBgList[i].dataIndex != equBgAry[i]) {
                    flag = true;
                }
            }
            else {
                if (this._equBgList[i]) {
                    flag = true;
                }
            }
            if (flag) {
                this._equBgList[i] = this.getItmeData(equBgAry[i]);
                if (this._equBgList[i]) {
                    this._equBgList[i].pos -= 2000;
                }
                equBgChangeAry.push(i);
            }
        }
        if (equBgChangeAry.length) {
            //this.clearList(this._equBgList);
            var evt = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_EQU_BG;
            evt.data = equBgChangeAry;
            ModuleEventManager.dispatchEvent(evt);
            this.processRedPoint();
        }
    };
    BagData.prototype.processRedPoint = function () {
        var num = this.getBagNum(BagData.TYPE_EQU_BG);
        var allNum = this.getBagSize(BagData.TYPE_EQU_BG);
        num = allNum - num;
        if (num <= 5 && allNum > 0) {
            RedPointManager.getInstance().getNodeByID(2).show = true;
        }
        else {
            RedPointManager.getInstance().getNodeByID(2).show = false;
        }
        this.setBagAlert();
    };
    BagData.prototype.setBagAlert = function () {
        var num = this.getBagNum(BagData.TYPE_EQU_BG);
        var allNum = this.getBagSize(BagData.TYPE_EQU_BG);
        num = allNum - num;
        if (GameInstance.first) {
            if (num < 1 && allNum > 0) {
                AlertUtil.show("背包已满，是否前往熔炼？", "", function ($data) {
                    if ($data == 1) {
                        ModulePageManager.openPanel(SharedDef.MODULE_RONGLIAN);
                    }
                }, 2, ["前往熔炼", "取消"]);
            }
        }
    };
    BagData.prototype.processGemBagChg = function (gemBgAry, maskObj) {
        var minLeng = Math.max(this._gemBgList.length, gemBgAry.length);
        var gemBgChangeAry = new Array;
        for (var i = 0; i < minLeng; i++) {
            var flag = false;
            if (gemBgAry[i]) {
                if (!this._gemBgList[i]) {
                    flag = true;
                }
                else if (maskObj[this._gemBgList[i].dataIndex]) {
                    flag = true;
                }
                else if (this._gemBgList[i].dataIndex != gemBgAry[i]) {
                    flag = true;
                }
            }
            else {
                if (this._gemBgList[i]) {
                    flag = true;
                }
            }
            if (flag) {
                this._gemBgList[i] = this.getItmeData(gemBgAry[i]);
                if (this._gemBgList[i]) {
                    this._gemBgList[i].pos -= 3000;
                }
                gemBgChangeAry.push(i);
            }
        }
        if (gemBgChangeAry.length) {
            //this.clearList(this._gemBgList);
            var evt = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_GEM;
            evt.data = gemBgChangeAry;
            ModuleEventManager.dispatchEvent(evt);
        }
    };
    BagData.prototype.getEquByPart = function (part) {
        var ary = this.getEquData();
        return ary[part];
    };
    BagData.prototype.getItemPos = function ($id) {
        var itemStr = this._str_values[$id];
        if (!itemStr || itemStr == "") {
            return -1;
        }
        return this.GetUInt32($id);
    };
    BagData.prototype.getItmeData = function ($id) {
        var itemStr = this._str_values[$id];
        if (!itemStr || itemStr == "") {
            return null;
        }
        var bgItem = BagData.paserItemData(itemStr);
        bgItem.pos = this.GetUInt32($id);
        bgItem.dataIndex = $id;
        return bgItem;
    };
    BagData.paserItemData = function (itemStr) {
        var ary = itemStr.split(";");
        var bgItem = new BagItemData();
        bgItem.id = Number(ary[0]);
        bgItem.entry = Number(ary[1]);
        bgItem.count = Number(ary[2]);
        bgItem.flags = Number(ary[3]);
        var itemData = new ItemData();
        itemData.propData = JSON.parse(ary[4]);
        itemData.AttrData = BagData.getNumFromStr(ary[5]);
        bgItem.data = itemData;
        bgItem.entryData = TableData.getInstance().getData(TableData.tb_item_template, bgItem.entry);
        return bgItem;
    };
    BagData.getNumFromStr = function (str) {
        if (!str) {
            return new Array;
        }
        var ary = str.split(",");
        var r = new Array;
        for (var i = 0; i < ary.length; i++) {
            r.push(Number(ary[i]));
        }
        return r;
    };
    BagData.prototype.getPos = function ($id) {
        return this.GetUInt32($id);
    };
    BagData.prototype.updateData = function ($intMask, $strMask) {
        this.refreshBagDataChange($intMask, $strMask);
        ////console.log("背包数据发生变化------");
        //ModuleEventManager.dispatchEvent(new sb.ShenBingEvent(sb.ShenBingEvent.CHANGE_BAG_DATA_EVENT));
    };
    BagData.prototype.getPlayerGuid = function () {
        return this._str_values[0];
    };
    BagData.prototype.useItem = function ($id) {
        var uid = this.getPlayerGuid() + ";" + $id;
        NetManager.getInstance().protocolos.bag_item_user(uid, 1);
    };
    BagData.prototype.getExpItemList = function () {
        var ary = new Array;
        var list = this.getGemBgData();
        var size = GuidData.bag.getBagSize(BagData.TYPE_GEM);
        for (var i = 0; i < size; i++) {
            if (list[i]) {
                if (list[i].entryData.type_c == 21) {
                    ary.push(list[i]);
                }
            }
        }
        return ary;
    };
    BagData.prototype.getOutLineItemList = function () {
        var ary = new Array;
        var list = this.getGemBgData();
        var size = GuidData.bag.getBagSize(BagData.TYPE_GEM);
        for (var i = 0; i < size; i++) {
            if (list[i]) {
                if (list[i].entryData.type_c == 22) {
                    ary.push(list[i]);
                }
            }
        }
        return ary;
    };
    BagData.TYPE_EQU = 0; //装备
    BagData.TYPE_BAG = 1; //背包
    BagData.TYPE_EQU_BG = 2; //装备背包
    BagData.TYPE_GEM = 3; //其他
    BagData.uipos = new Vector2D();
    return BagData;
}(GuidObject));
var BagItemData = /** @class */ (function () {
    function BagItemData() {
    }
    Object.defineProperty(BagItemData.prototype, "guid", {
        //public tempStr:string;
        get: function () {
            return GuidData.bag.getPlayerGuid() + ";" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    return BagItemData;
}());
var ItemData = /** @class */ (function () {
    function ItemData() {
    }
    return ItemData;
}());
//# sourceMappingURL=BagData.js.map