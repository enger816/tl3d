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
var DataSlist = /** @class */ (function (_super) {
    __extends(DataSlist, _super);
    function DataSlist() {
        var _this = _super.call(this) || this;
        _this.pageId = -1;
        _this._requestTimes = true;
        _this.listResoureArr = new Array;
        _this.backFun = function (a, b, val) { _this.moveEndFun(a, b, val); };
        NetManager.getInstance().reg(_this);
        return _this;
    }
    DataSlist.prototype.pushDataToList = function ($SListItemData) {
        var $needAdd = true;
        var $index;
        for (var i = 0; i < this.listResoureArr.length; i++) {
            if (this.listResoureArr[i].id == $SListItemData.id) {
                $needAdd = false;
                $index = i;
                break;
            }
        }
        //如果数据不存在就添加，存在就替换
        if ($needAdd) {
            this.listResoureArr.push($SListItemData);
            this.pageId = Math.floor($SListItemData.id / this.contextNum) + 1;
            //console.log("--同步页数--", this.pageId, $SListItemData.id, this.contextNum);
        }
        else {
            this.listResoureArr.splice($index, 1, $SListItemData);
        }
    };
    DataSlist.prototype.moveEndFun = function (a, b, val) {
        var _this = this;
        if (this._requestTimes) {
            //可见区域第一条数据索引
            var topItemIndex = Math.floor(Math.abs(this.p_scrollY) / this.p_itemHeight);
            //可见区域最后一条数据索引
            var bottomItemIndex = Math.floor((Math.abs(this.p_scrollY) + this._height) / this.p_itemHeight);
            if (val > 0) {
                if (topItemIndex == (this.pageId - 1) * this.contextNum) {
                    //console.log("--上一页--");
                    this._requestTimes = false;
                    if (this.pageId == 1) {
                        this.sendPageByNum(this.pageId, this.typeId);
                    }
                    else {
                        this.sendPageByNum(this.pageId - 1, this.typeId);
                    }
                }
            }
            if (val < 0) {
                if (bottomItemIndex == (this.pageId * this.contextNum - 1)) {
                    //console.log("--下一页--");
                    this._requestTimes = false;
                    this.sendPageByNum(this.pageId + 1, this.typeId);
                }
                else if (!b) {
                    //console.log("--当前页--");
                    this._requestTimes = false;
                    this.sendPageByNum(this.pageId, this.typeId);
                }
            }
        }
        if (!this._requestTimes) {
            TimeUtil.addTimeOut(3000, function () {
                _this._requestTimes = true;
            });
        }
    };
    DataSlist.prototype.sendPageByNum = function (value, $type) {
        if ($type === void 0) { $type = 0; }
        this.pageId = value;
        this.typeId = $type;
        this.toSeversUrl();
    };
    DataSlist.prototype.getSeverFunData = function (byte) {
        var $frist = this.listResoureArr.length == 0;
        //console.log("---555--",this.listResoureArr);
        this.meshSeverData(byte);
        if ($frist) {
            this.refreshData(this.listResoureArr);
        }
        else {
            this.changeMinScrollY();
        }
    };
    DataSlist.prototype.changeMinScrollY = function () {
        this.listResoureArr.sort(function (a, b) {
            return a.id - b.id;
        });
        _super.prototype.changeMinScrollY.call(this);
    };
    DataSlist.prototype.getHanderMap = function () {
        return null;
    };
    DataSlist.prototype.toSeversUrl = function () {
    };
    DataSlist.prototype.meshSeverData = function (byte) {
    };
    DataSlist.prototype.clearAryData = function () {
        while (this.listResoureArr.length > 0) {
            this.listResoureArr.pop();
        }
    };
    return DataSlist;
}(SList));
//# sourceMappingURL=DataSlist.js.map