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
var TeamData = /** @class */ (function (_super) {
    __extends(TeamData, _super);
    function TeamData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._MemberNum = -1;
        return _this;
    }
    TeamData.prototype.onBaseCreated = function () {
        var _this = this;
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        this.AddListen(SharedDef.GROUP_INT_FIELD_STATE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.AUTOMATCH_TEAM_PANEL));
        });
        this.AddListen(SharedDef.GROUP_INT_FIELD_TARGET_INST, function ($binlog) {
            console.log("----收到弹窗申请——----", _this.getTeamTargetInst());
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.TARGET_INST_TEAM_PANEL));
        });
        this.AddListen(SharedDef.GROUP_INT_FIELD_TYPE, function ($binlog) {
            //队伍类型变化了
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_TEAMTYPE_PANEL));
        });
        this.AddListen(SharedDef.GROUP_INT_FIELD_LEVEL_RANGE, function ($binlog) {
            //队伍限制等级变化了
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_TEAMTYPE_PANEL));
        });
        //    this.AddListen(SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP, ($binlog: any) => { this.spellIntFieldMeridExpChg() });
        this.changeGroup();
    };
    TeamData.prototype.dispose = function () {
        //对象消失
        GuidData.team = null;
        this.changeGroup();
        _super.prototype.dispose.call(this);
    };
    TeamData.prototype.changeGroup = function () {
        ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.REFRESH_GROUP_EVENT));
        ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.JOIN_EXIT_TEAM_PANEL));
    };
    TeamData.prototype.dataUpdate = function ($intMask, $strMask) {
        // if ($intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP]) {
        //     ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.REFRISH_MERIDIAL_PANEL))
        // }
        // if ($intMask[SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MOUNT_TRAIN_EXP]) {
        //     //console.log("---经验和等级变化--");
        //     ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT));
        // }
        //队伍成员数据变化
        var $teamChangeBoole = false;
        for (var i = SharedDef.GROUP_INT_FIELD_MEMBER_INFO_START; i < SharedDef.GROUP_INT_FIELD_MEMBER_INFO_END; i++) {
            //     if ($intMask[i]) {
            //         $jichuChangeBoole = true;
            //         if (this._skillLevDic) {
            //             var id: number = GuidData.grow.GetUInt16(i, 0);
            //             var lev: number = GuidData.grow.GetUInt16(i, 1);
            //             this._skillLevDic[id] = lev;
            //         }
            //     }
            $teamChangeBoole = true;
        }
        for (var j = SharedDef.GROUP_STR_FIELD_MEMBER_INFO_START; j < SharedDef.GROUP_STR_FIELD_MEMBER_INFO_END; j++) {
            $teamChangeBoole = true;
        }
        if ($teamChangeBoole) {
            //变化了
            this._itemary = this.refreshTeamItemAry();
            this._MemberNum = this.chgTeamMemberNum();
            this.changeGroup();
        }
    };
    // 组队类型
    TeamData.prototype.getTeamType = function () {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_TYPE);
    };
    // 组队等级范围
    TeamData.prototype.getTeamLevScope = function () {
        return [this.GetUInt16(SharedDef.GROUP_INT_FIELD_LEVEL_RANGE, 0), this.GetUInt16(SharedDef.GROUP_INT_FIELD_LEVEL_RANGE, 1)];
    };
    // 队长GUID
    TeamData.prototype.getTeamLeaderGuid = function () {
        return this.GetStr(SharedDef.GROUP_STR_FIELD_CAPTAIN_GUID);
    };
    // 队伍自动匹配状态
    TeamData.prototype.getTeamAutoMatch = function () {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_STATE);
    };
    // 队伍确认面板
    TeamData.prototype.getTeamTargetInst = function () {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_TARGET_INST);
    };
    // 队伍自动接受申请
    TeamData.prototype.getTeamAutoAccept = function () {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_AUTO_ACCEPT_FLAG);
    };
    TeamData.prototype.chgTeamMemberNum = function () {
        var iteamAry = this.getTeamItemAry();
        var num = 0;
        for (var i = 0; i < iteamAry.length; i++) {
            if (iteamAry[i].guid != "") {
                num = num + 1;
            }
        }
        return num;
    };
    TeamData.prototype.getTeamMemberNum = function () {
        if (this._MemberNum == -1) {
            this._MemberNum = this.chgTeamMemberNum();
        }
        return this._MemberNum;
    };
    TeamData.prototype.getTeamItemAry = function () {
        if (!this._itemary) {
            this._itemary = this.refreshTeamItemAry();
        }
        return this._itemary;
    };
    TeamData.prototype.refreshTeamItemAry = function () {
        var finary = new Array;
        console.log("refreshTeamItemAry");
        //int数据
        for (var i = SharedDef.GROUP_INT_FIELD_MEMBER_INFO_START; i < SharedDef.GROUP_INT_FIELD_MEMBER_INFO_END; i += SharedDef.MAX_GROUP_MEMBER_INFO_INT_COUNT) {
            var vo = new TeamMemberVo;
            vo.icon = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_ICON);
            vo.lev = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_LEVEL);
            vo.state = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_STATE);
            vo.response = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_RESPONSE_STATE);
            var mapline = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_MAPID_LINENO);
            vo.mapid = mapline >> 16;
            vo.lineid = mapline & 65535;
            finary.push(vo);
        }
        //str数据
        for (var k = SharedDef.GROUP_STR_FIELD_MEMBER_INFO_START; k < SharedDef.GROUP_STR_FIELD_MEMBER_INFO_END; k += SharedDef.MAX_GROUP_MEMBER_INFO_STR_COUNT) {
            var idx = (k - SharedDef.GROUP_STR_FIELD_MEMBER_INFO_START) / SharedDef.MAX_GROUP_MEMBER_INFO_STR_COUNT;
            finary[idx].posidx = idx;
            finary[idx].guid = this.GetStr(k + SharedDef.GROUP_MEMBER_STR_GUID);
            finary[idx].name = this.GetStr(k + SharedDef.GROUP_MEMBER_STR_NAME);
        }
        return finary;
    };
    return TeamData;
}(GuidObject));
var TeamMemberVo = /** @class */ (function () {
    function TeamMemberVo() {
    }
    return TeamMemberVo;
}());
//# sourceMappingURL=TeamData.js.map