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
var StrengGuidObject = /** @class */ (function (_super) {
    __extends(StrengGuidObject, _super);
    function StrengGuidObject(g) {
        if (g === void 0) { g = ""; }
        var _this = _super.call(this) || this;
        //this.AddListen(4, (binlog: BinLogStru) => { this.dataChg(binlog) });
        _this.AddListen(200, function (binlog) { _this.dataChg(binlog); });
        return _this;
        //this.AddListen(201, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListen(202, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListen(203, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListen(204, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListenString(4, (binlog: BinLogStru) => { this.dataChgStr(binlog) });
        // this._after_update = (obj, flags, intMask, strMask) => { this.after_update(obj, flags, intMask, strMask) };
    }
    StrengGuidObject.prototype.after_update = function (obj, flags, intMask, strMask) {
        // //console.log("更新代号：" + flags);
        if (flags == SyncEvent.OBJ_OPT_BINLOG) {
            for (var i = 0; i < 8; i++) {
                var partIndex = SharedDef.APPD_LOGICAL_INFO_INT_FIELD_STRENGTH_START + SharedDef.EQUIP_PART_OPT_TYPE_ONE_PART_INFO_LENGTH * i;
                if (intMask.GetBit(partIndex)) {
                    // //console.log("强化部位：" + i + " 等级：" + this.GetUInt32(partIndex));
                }
            }
        }
    };
    StrengGuidObject.prototype.dataChg = function (binlog) {
        // //console.log("强化结果：index:" + binlog.index + "opt:" + binlog.opt + "type:" + binlog.typ + "value:" + binlog.value);
        if (binlog.index == 203) {
            // //console.log("float :" + this.GetFloat(binlog.index));
        }
    };
    StrengGuidObject.prototype.dataChgStr = function (binlog) {
        //traceInfo("强化结果str：" + binlog.index + ":" + binlog._value_str);
    };
    return StrengGuidObject;
}(GuidObject));
//# sourceMappingURL=StrengGuidObject.js.map