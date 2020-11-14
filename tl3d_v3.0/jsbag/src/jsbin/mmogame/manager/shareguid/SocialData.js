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
var SocialData = /** @class */ (function (_super) {
    __extends(SocialData, _super);
    function SocialData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyredstate = false;
        return _this;
    }
    SocialData.prototype.onBaseCreated = function () {
        var _this = this;
        // //console.log("创建社交对象");
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        //  //console.log("好友数据刷新")
        //  //console.log("--申请-------------------");
        //this.traceList(this.getApplyList());
        //   //console.log("--好友-------------------");
        //this.traceList(this.getFriendList());
        //   //console.log("--仇人-------------------");
        //this.traceList(this.getEnemyList());
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    SocialData.prototype.dataUpdate = function ($intMask, $strMask) {
        var indexAry = new Array;
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SOCIAL_FRIEND_START && keyNum < SharedDef.SOCIAL_APPLY_END) {
                var idx = keyNum - SharedDef.SOCIAL_FRIEND_START;
                if (idx % SharedDef.MAX_FRIENT_COUNT != 0) {
                    keyNum--;
                }
                if (indexAry.indexOf(keyNum) == -1) {
                    indexAry.push(keyNum);
                }
            }
        }
        for (var key in $strMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SOCIAL_FRIEND_START && keyNum < SharedDef.SOCIAL_APPLY_END) {
                var idx = keyNum - SharedDef.SOCIAL_FRIEND_START;
                if (idx % SharedDef.MAX_FRIENT_COUNT != 0) {
                    keyNum--;
                }
                if (indexAry.indexOf(keyNum) == -1) {
                    indexAry.push(keyNum);
                }
            }
        }
        var obj = new Object;
        for (var i = 0; i < indexAry.length; i++) {
            var r = this.refreshData(indexAry[i]);
            obj[r] = true;
        }
        for (var key in obj) {
            var keyNum = Number(key);
            if (keyNum == 1) {
                if (this._friendList && this._friendList.length > 1) {
                    this.sortList(this._friendList);
                }
                ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHFRIENDlIST_EVENT));
                ModuleEventManager.dispatchEvent(new whisper.WhisperUiEvent(whisper.WhisperUiEvent.REFRESHFRIENDlIST_EVENT));
            }
            else if (keyNum == 2) {
                ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REVENGE_PANEL_EVENT));
            }
            else if (keyNum == 3) {
                // if(this._applyList){
                //     this.sortList(this._applyList);
                // }
                var $aaa = new social.SocialUiEvent(social.SocialUiEvent.REFRESHAPPLYlIST_EVENT);
                if (this._applyList.length > 0) {
                    $aaa.isvisiable = true;
                }
                else {
                    $aaa.isvisiable = false;
                }
                ModuleEventManager.dispatchEvent($aaa);
            }
        }
        // //console.log("好友数据刷新")
        // //console.log("--申请-------------------");
        // this.traceList(this.getApplyList());
        // //console.log("--好友-------------------");
        // this.traceList(this.getFriendList());
        // //console.log("--仇人-------------------");
        // this.traceList(this.getEnemyList());
    };
    SocialData.prototype.getItemName = function ($index) {
        return this._str_values[$index];
    };
    SocialData.prototype.getInfo = function ($index) {
        return this._str_values[$index + 1];
    };
    SocialData.prototype.refreshData = function ($index) {
        var isRemove = false;
        if ($index < SharedDef.SOCIAL_FRIEND_END) {
            if (!this._friendList) {
                return;
            }
            for (var i = 0; i < this._friendList.length; i++) {
                if (this._friendList[i].index == $index) {
                    //this._friendList[i] = this.getData($index);
                    var dat = this.getData($index);
                    if (dat) {
                        if (!this._friendList[i].inOnline && dat.inOnline) {
                            //console.log("好友：" + dat.name + "上线了")
                        }
                        else if (this._friendList[i].inOnline && !dat.inOnline) {
                            //console.log("好友：" + dat.name + "下线了")
                        }
                        this._friendList[i] = dat;
                        // 朋友列表 第i个变化 
                    }
                    else {
                        this._friendList.splice(i, 1);
                        isRemove = true;
                        // 朋友列表 第i个删除
                    }
                    //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHFRIENDlIST_EVENT));
                    //ModuleEventManager.dispatchEvent(new giving.GivingUiEvent(giving.GivingUiEvent.REFRESHFRIENDlIST_EVENT));
                    break;
                }
            }
            if (i == this._friendList.length && !isRemove) {
                var data = this.getData($index);
                if (data) {
                    this._friendList.push(data);
                }
                //朋友列表第i个增加
                //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHFRIENDlIST_EVENT));
                //ModuleEventManager.dispatchEvent(new giving.GivingUiEvent(giving.GivingUiEvent.REFRESHFRIENDlIST_EVENT));
            }
            return 1;
        }
        else if ($index < SharedDef.SOCIAL_ENEMY_END) {
            if (!this._enemyList) {
                return;
            }
            for (var i = 0; i < this._enemyList.length; i++) {
                if (this._enemyList[i].index == $index) {
                    var dat = this.getData($index);
                    if (dat) {
                        this._enemyList[i] = dat;
                        //敌人列表 第i个变化
                    }
                    else {
                        this._enemyList.splice(i, 1);
                        isRemove = true;
                        //敌人列表 第i个删除
                    }
                    break;
                }
            }
            if (i == this._enemyList.length && !isRemove) {
                var aaa = this.getData($index);
                if (aaa) {
                    this._enemyList.push(aaa);
                }
                //敌人列表 第i个增加
                this.enemyredstate = true;
                //console.log("---列表增加");
            }
            return 2;
        }
        else if ($index < SharedDef.SOCIAL_APPLY_END) {
            if (!this._applyList) {
                return;
            }
            for (var i = 0; i < this._applyList.length; i++) {
                if (this._applyList[i].index == $index) {
                    var dat = this.getData($index);
                    if (dat) {
                        this._applyList[i] = dat;
                        //申请列表 第i个变化
                    }
                    else {
                        this._applyList.splice(i, 1);
                        isRemove = true;
                        //申请列表 第i个删除
                    }
                    //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHAPPLYlIST_EVENT));
                    break;
                }
            }
            if (i == this._applyList.length && !isRemove) {
                var aaa = this.getData($index);
                if (aaa) {
                    this._applyList.push(aaa);
                }
                //申请列表 第i个增加
                //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHAPPLYlIST_EVENT));
            }
            return 3;
        }
    };
    SocialData.prototype.traceList = function (ary) {
        //console.log("--ary-", ary);
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i];
            console.log("item " + item.index + "," + item.guid + "," + item.name + ",等级" + item.level + ","
                + item.familiayLev + "," + item.familiayExp + "," + (item.inOnline ? "在线" : "离线"));
        }
    };
    SocialData.prototype.getData = function ($index) {
        if (!this.getItemName($index) || !this.getInfo($index) || this.getItemName($index) == "" || this.getInfo($index) == "") {
            return null;
        }
        var data = new SocialItemData;
        data.id = $index;
        data.index = $index;
        data.guid = this.getItemName($index);
        var infoStr = this.getInfo($index);
        //console.log("==infoStr==", infoStr)
        var ary = infoStr.split("\1");
        data.name = ary[0];
        data.faction = ary[1];
        data.gender = this.GetByte($index, 0);
        data.vip = this.GetByte($index, 1);
        data.level = this.GetUInt16($index, 1);
        data.familiayExp = this.GetUInt16($index + 1, 0);
        data.familiayLev = this.GetByte($index + 1, 2);
        data.inOnline = this.GetByte($index + 1, 3) == 1 ? true : false;
        data.force = this.GetDouble($index + 2);
        return data;
    };
    SocialData.prototype.sortList = function ($list) {
        $list.sort(function (a, b) {
            if (a.inOnline && !b.inOnline) {
                return -1;
            }
            else if (!a.inOnline && b.inOnline) {
                return 1;
            }
            else if (a.inOnline && b.inOnline) {
                if (a.familiayLev > b.familiayLev) {
                    return -1;
                }
                else if (a.familiayLev == b.familiayLev) {
                    if (a.familiayExp > b.familiayExp) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            }
            else {
                return 0;
            }
        });
    };
    SocialData.prototype.getFriendList = function () {
        if (this._friendList) {
            return this._friendList;
        }
        var ary = new Array;
        var end = Math.min(this._str_values.length, SharedDef.SOCIAL_FRIEND_END);
        for (var i = SharedDef.SOCIAL_FRIEND_START; i < end; i += SharedDef.MAX_FRIENT_COUNT) {
            var data = this.getData(i);
            if (data) {
                ary.push(data);
            }
        }
        this.sortList(ary);
        this._friendList = ary;
        return this._friendList;
    };
    SocialData.prototype.getApplyList = function () {
        if (!this._applyList) {
            var ary = new Array;
            var end = Math.min(this._str_values.length, SharedDef.SOCIAL_APPLY_END);
            for (var i = SharedDef.SOCIAL_APPLY_START; i < end; i += SharedDef.MAX_FRIENT_COUNT) {
                var data = this.getData(i);
                if (data) {
                    ary.push(data);
                }
            }
            this._applyList = ary;
        }
        return this._applyList;
    };
    SocialData.prototype.getApplyFlag = function () {
        return this.GetUInt32(SharedDef.SOCIAL_APPLY_CLEAR_FLAG);
    };
    SocialData.prototype.getEnemyList = function () {
        if (this._enemyList) {
            return this._enemyList;
        }
        var ary = new Array;
        var end = Math.min(this._str_values.length, SharedDef.SOCIAL_ENEMY_END);
        for (var i = SharedDef.SOCIAL_ENEMY_START; i < end; i += SharedDef.MAX_FRIENT_COUNT) {
            var data = this.getData(i);
            if (data) {
                ary.push(data);
            }
        }
        this.sortList(ary);
        this._enemyList = ary;
        return this._enemyList;
    };
    return SocialData;
}(GuidObject));
var SocialItemData = /** @class */ (function () {
    function SocialItemData() {
    }
    return SocialItemData;
}());
//# sourceMappingURL=SocialData.js.map