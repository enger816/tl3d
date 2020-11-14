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
var GiftPacksData = /** @class */ (function (_super) {
    __extends(GiftPacksData, _super);
    function GiftPacksData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._dataState = 0;
        return _this;
    }
    GiftPacksData.prototype.onBaseCreated = function () {
        var _this = this;
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    GiftPacksData.prototype.dataUpdate = function ($intMask, $strMask) {
        var $dic = new Object();
        for (var k in $intMask) {
            var kNum = Number(k);
            if (kNum < SharedDef.GIFTPACKS_INT_FIELD_BEGIN)
                continue;
            // //console.log("int", kNum)
            var giftIndx = Math.floor((kNum - SharedDef.GIFTPACKS_INT_FIELD_BEGIN) / SharedDef.MAX_GIFTPACKS_INFO_INT);
            if (!$dic[giftIndx]) {
                $dic[giftIndx] = 1;
            }
        }
        for (var k in $strMask) {
            var kNum = Number(k);
            if (kNum < SharedDef.GIFTPACKS_STRING_FIELD_BEGIN)
                continue;
            // //console.log("str", kNum)
            var giftIndx = Math.floor((kNum - SharedDef.GIFTPACKS_STRING_FIELD_BEGIN) / SharedDef.MAX_GIFTPACKS_INFO_STRING);
            if (!$dic[giftIndx]) {
                $dic[giftIndx] = 1;
            }
        }
        this._dataState = 0;
        for (var $key in $dic) {
            this.changeGiftDataByKey(Number($key));
        }
        if (this._dataState > 0) {
            var evt = new email.MailEvent(email.MailEvent.MAIL_CHG_EVENT);
            evt.data = this._dataState;
            ModuleEventManager.dispatchEvent(evt);
        }
    };
    GiftPacksData.prototype.changeGiftDataByKey = function (indx) {
        var intStart = SharedDef.GIFTPACKS_INT_FIELD_BEGIN + indx * SharedDef.MAX_GIFTPACKS_INFO_INT;
        var strStart = SharedDef.GIFTPACKS_STRING_FIELD_BEGIN + indx * SharedDef.MAX_GIFTPACKS_INFO_STRING;
        var $vo = new GiftBaseVo();
        $vo.makeData(this, intStart, strStart, indx);
        this.refreshGiftList($vo);
        //ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.REFRESH_EMAIL_LIST));
        ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
    };
    GiftPacksData.prototype.getGiftDataItem = function () {
        // //console.log("----------------")
        if (this._giftList) {
            return this._giftList;
        }
        var $arr = new Array();
        for (var i = 0; i < SharedDef.MAX_GIFTPACKS_INFO_COUNT; i++) {
            var intStart = SharedDef.GIFTPACKS_INT_FIELD_BEGIN + i * SharedDef.MAX_GIFTPACKS_INFO_INT;
            var strStart = SharedDef.GIFTPACKS_STRING_FIELD_BEGIN + i * SharedDef.MAX_GIFTPACKS_INFO_STRING;
            var $vo = new GiftBaseVo();
            $vo.makeData(this, intStart, strStart, i);
            if (!$vo.isDele && $vo.startTime != 0) {
                $arr.push($vo);
            }
        }
        //  //console.log("邮件数", $arr.length)
        //   //console.log( $arr)
        this._giftList = $arr;
        return $arr;
    };
    GiftPacksData.prototype.refreshGiftList = function ($vo) {
        if (!this._giftList) {
            return;
        }
        for (var i = 0; i < this._giftList.length; i++) {
            if ($vo.indx == this._giftList[i].indx) {
                if ($vo.isDele || $vo.startTime == 0) {
                    this._giftList.splice(i, 1);
                    this._dataState = 2;
                    return;
                }
                this._giftList[i].isGetItem = $vo.isGetItem;
                this._giftList[i].isRead = $vo.isRead;
                this._giftList[i].item = $vo.item;
                this._dataState = 1;
                return;
            }
        }
        this._dataState = 2;
        this._giftList.push($vo);
    };
    return GiftPacksData;
}(GuidObject));
var GiftBaseVo = /** @class */ (function () {
    function GiftBaseVo() {
    }
    //GIFTPACKS_INFO_INT_ID = 0,	//礼包ID
    //GIFTPACKS_INFO_INT_START_TIME = 1,	//发放时间
    //GIFTPACKS_INFO_INT_END_TIME = 2,	//结束时间
    //GIFTPACKS_INFO_INT_BYTE = 3,	//0,礼包类型，1，领取状态,2 已阅读,3是否删除
    //MAX_GIFTPACKS_INFO_INT,
    //GIFTPACKS_INFO_STRING_GIFT_NAME = 0,	//礼包名称
    //GIFTPACKS_INFO_STRING_GIFT_DESC = 1,	//礼包说明
    //GIFTPACKS_INFO_STRING_GIFT_FROM = 2,	//礼包出处，当玩家赠送时填写玩家名字，默认为空，系统赠送
    //GIFTPACKS_INFO_STRING_GIFT_ITEM = 3,	//礼包物品集合
    //MAX_GIFTPACKS_INFO_STRING,
    GiftBaseVo.prototype.makeData = function ($pake, intStart, strStart, indx) {
        this.id = $pake.GetInt32(intStart + SharedDef.GIFTPACKS_INFO_INT_ID);
        this.indx = indx;
        this.startTime = $pake.GetInt32(intStart + SharedDef.GIFTPACKS_INFO_INT_START_TIME);
        this.endTime = $pake.GetInt32(intStart + SharedDef.GIFTPACKS_INFO_INT_END_TIME);
        this.type = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 0);
        this.isGetItem = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 1) == 1;
        this.isRead = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 2) == 1;
        this.isDele = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 3) == 1;
        this.name = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_NAME);
        this.desc = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_DESC);
        this.from = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_FROM);
        this.item = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_ITEM);
    };
    return GiftBaseVo;
}());
//# sourceMappingURL=GiftPacksData.js.map