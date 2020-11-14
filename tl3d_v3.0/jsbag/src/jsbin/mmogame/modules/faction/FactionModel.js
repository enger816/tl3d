var faction;
(function (faction) {
    var FactionUitl = /** @class */ (function () {
        function FactionUitl() {
        }
        FactionUitl.getNameByGuid = function ($guid) {
            var ary = GuidData.faction.getFactionList();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == $guid) {
                    return ary[i];
                }
            }
            return null;
        };
        FactionUitl.parsingToOneitemlist = function ($itemstr) {
            var parsing2 = $itemstr.split("\2");
            var ary1 = new Array();
            for (var j = 0; j < parsing2.length; j++) {
                ary1.push(parsing2[j]);
            }
            return ary1;
        };
        //通过道具id获得道具名
        FactionUitl.getPropNameByItemID = function ($itemid) {
            var tabvo = tb.TB_item_template.get_TB_item_template($itemid);
            return tabvo.getColorName();
        };
        FactionUitl.getRestTime = function ($msgtime) {
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts * 1000);
            //今日日期
            var currentday = $sever.toLocaleDateString().replace(/\//g, "-");
            var $play = new Date($msgtime * 1000);
            //发帖日期
            var completeday = $play.toLocaleDateString().replace(/\//g, "-");
            //console.log("==", currentday, completeday);
            var timestr = completeday;
            if (currentday == completeday) {
                //如果相等，取分时，字符串
                timestr = $play.toTimeString().substr(0, 5);
            }
            return timestr;
        };
        return FactionUitl;
    }());
    faction.FactionUitl = FactionUitl;
    var FactionModel = /** @class */ (function () {
        function FactionModel() {
        }
        FactionModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FactionModel();
            }
            return this._instance;
        };
        FactionModel.prototype.getInvitationList = function () {
            if (!this._invitationList) {
                this._invitationList = new Array;
            }
            return this._invitationList;
        };
        FactionModel.prototype.chgInvitationList_add = function ($data) {
            if (!this._invitationList) {
                this._invitationList = new Array;
            }
            //判断是否已经存在
            for (var i = 0; i < this._invitationList.length; i++) {
                if (this._invitationList[i].guid == $data.guid && this._invitationList[i].faction_guid == $data.faction_guid) {
                    return;
                }
            }
            //往第一个索引添加
            this._invitationList.unshift($data);
        };
        FactionModel.prototype.chgInvitationList_remove = function ($data) {
            if (!this._invitationList) {
                this._invitationList = new Array;
            }
            //判断是否已经存在
            for (var i = 0; i < this._invitationList.length; i++) {
                if (this._invitationList[i].guid == $data.guid && this._invitationList[i].faction_guid == $data.faction_guid) {
                    this._invitationList.splice(i, 1);
                    break;
                }
            }
        };
        FactionModel.prototype.chgInvitationList_clear = function () {
            if (!this._invitationList) {
                this._invitationList = new Array;
            }
            else {
                while (this._invitationList.length > 0) {
                    this._invitationList.pop();
                }
            }
        };
        return FactionModel;
    }());
    faction.FactionModel = FactionModel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionModel.js.map