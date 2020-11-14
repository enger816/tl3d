var Hangup;
(function (Hangup) {
    var HangupSettingModel = /** @class */ (function () {
        function HangupSettingModel() {
        }
        HangupSettingModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new HangupSettingModel();
            }
            return this._instance;
        };
        HangupSettingModel.prototype.getTb_hook_quality = function () {
            //读取tb_mount_base
            if (!this._tb_hook_quality_list) {
                this._tb_hook_quality_list = new Array();
            }
            var $obj = TableData.getInstance().getTableByName(TableData.tb_hook_quality);
            for (var $key in $obj.data) {
                var $tb_hook_quality_vo = new tb.TB_hook_quality_Vo($obj.data[$key]);
                this._tb_hook_quality_list.push($tb_hook_quality_vo);
            }
            return this._tb_hook_quality_list;
        };
        HangupSettingModel.prototype.getTb_hook_hp_item = function () {
            //读取tb_mount_base
            if (!this._tb_hook_hp_item_list) {
                this._tb_hook_hp_item_list = new Array();
            }
            var $obj = TableData.getInstance().getTableByName(TableData.tb_hook_hp_item);
            for (var $key in $obj.data) {
                var $tb_hook_hp_item_vo = new tb.TB_hook_hp_item_Vo($obj.data[$key]);
                this._tb_hook_hp_item_list.push($tb_hook_hp_item_vo);
            }
            return this._tb_hook_hp_item_list;
        };
        return HangupSettingModel;
    }());
    Hangup.HangupSettingModel = HangupSettingModel;
})(Hangup || (Hangup = {}));
//# sourceMappingURL=HangupSettingModel.js.map