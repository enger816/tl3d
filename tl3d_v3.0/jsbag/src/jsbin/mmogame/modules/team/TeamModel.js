var team;
(function (team) {
    var groupTypeVo = /** @class */ (function () {
        function groupTypeVo() {
        }
        return groupTypeVo;
    }());
    team.groupTypeVo = groupTypeVo;
    var ApplyCell = /** @class */ (function () {
        function ApplyCell() {
        }
        return ApplyCell;
    }());
    team.ApplyCell = ApplyCell;
    var InviRequestCell = /** @class */ (function () {
        function InviRequestCell() {
        }
        return InviRequestCell;
    }());
    team.InviRequestCell = InviRequestCell;
    var InvitationCell = /** @class */ (function () {
        function InvitationCell() {
        }
        return InvitationCell;
    }());
    team.InvitationCell = InvitationCell;
    var TeamModel = /** @class */ (function () {
        function TeamModel() {
        }
        TeamModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TeamModel();
            }
            return this._instance;
        };
        TeamModel.prototype.getAutoList = function () {
            var finary = new Array;
            for (var i = 0; i < 3; i++) {
                var vo = new TeamMemberVo;
                vo.guid = "";
                vo.items = [];
                finary.push(vo);
            }
            return finary;
        };
        TeamModel.prototype.getGroupTypeAry = function () {
            var tbary = new Array;
            var index = 0;
            var ary = tb.TB_group_type.get_TB_group_type();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].lv <= GuidData.player.getLevel()) {
                    var vo = new groupTypeVo;
                    vo.tab = ary[i];
                    tbary.push(vo);
                }
            }
            tbary.sort(function (a, b) {
                return a.tab.sort - b.tab.sort;
            });
            for (var k = 0; k < tbary.length; k++) {
                index++;
                tbary[k].idx = index;
            }
            return tbary;
        };
        TeamModel.prototype.loadRolePic = function ($sex, $ui, $isonline) {
            var $url = getTouPic($sex);
            $ui.uiRender.uiAtlas.upDataPicToTexture($url, $ui.skinName);
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE, function ($img) {
                var rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                // UiDraw.cxtDrawImg(this._baseRender.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                if (!$isonline) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight));
                }
                $ui.uiRender.uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            });
        };
        TeamModel.prototype.getExp = function () {
            var exp = 0;
            if (GuidData.team) {
                var factorA = TableData.getInstance().getData(TableData.tb_group_exp, 1)["factorA"];
                var groupCnt = 0;
                var itemary = GuidData.team.getTeamItemAry();
                for (var i = 0; i < itemary.length; i++) {
                    if (itemary[i].guid != "" && itemary[i].state != SharedDef.GROUP_MEMBER_STATE_OFFLINE) {
                        groupCnt += 1;
                    }
                }
                exp = factorA / 100 * (groupCnt - 1);
            }
            return exp;
        };
        TeamModel.prototype.getTabVoByType = function ($type) {
            var aaa = this.getGroupTypeAry();
            for (var i = 0; i < aaa.length; i++) {
                if ($type == aaa[i].tab.id) {
                    return aaa[i];
                }
            }
            return null;
        };
        TeamModel.prototype.getdefaultTabVo = function () {
            var tabvo = new team.TabVo;
            if (GuidData.team) {
                tabvo.tab = this.getTabVoByType(GuidData.team.getTeamType());
                // tabvo.id = tabvo.tab.sort - 1;
                tabvo.maxlev = GuidData.team.getTeamLevScope()[1];
                tabvo.minlev = GuidData.team.getTeamLevScope()[0];
            }
            else {
                // tabvo.id = 0;
                tabvo.tab = this.getTabVoByType(101);
                tabvo.maxlev = tabvo.tab.tab.max_lev[1];
                tabvo.minlev = tabvo.tab.tab.min_lev[0];
            }
            return tabvo;
        };
        TeamModel.prototype.getTeamMemberNum = function () {
            var num = 0;
            if (!GuidData.team) {
                return 0;
            }
            var ary = GuidData.team.getTeamItemAry();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid != "") {
                    num++;
                }
            }
            return num;
        };
        TeamModel.prototype.addapplyList = function (vo) {
            if (!this._applylist) {
                this._applylist = new Array;
            }
            for (var i = 0; i < this._applylist.length; i++) {
                if (vo.guid == this._applylist[i].guid) {
                    return;
                }
            }
            this._applylist.push(vo);
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        };
        TeamModel.prototype.popapplyList = function ($vo) {
            if (!this._applylist) {
                this._applylist = new Array;
            }
            var idx = this._applylist.indexOf($vo);
            if (idx != -1) {
                this._applylist.splice(idx, 1);
            }
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        };
        TeamModel.prototype.removeAllApply = function () {
            if (!this._applylist) {
                this._applylist = new Array;
            }
            else {
                //拒绝组队请求时，会返回给发送人提示
                for (var i = 0; i < this._applylist.length; i++) {
                    NetManager.getInstance().protocolos.group_join_denied(this._applylist[i].guid);
                }
                this._applylist = new Array;
            }
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        };
        TeamModel.prototype.getApplyList = function () {
            if (!this._applylist) {
                this._applylist = new Array;
            }
            return this._applylist;
        };
        TeamModel.prototype.getInvireqList = function () {
            if (!this._invitationlist) {
                this._invitationlist = new Array;
            }
            return this._invitationlist;
        };
        TeamModel.prototype.addInvireqList = function (vo) {
            if (!this._invitationlist) {
                this._invitationlist = new Array;
            }
            for (var i = 0; i < this._invitationlist.length; i++) {
                if (vo.teamGuid == this._invitationlist[i].teamGuid) {
                    return;
                }
            }
            this._invitationlist.push(vo);
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        };
        TeamModel.prototype.popInvireqList = function ($vo) {
            if (!this._invitationlist) {
                this._invitationlist = new Array;
            }
            var idx = this._invitationlist.indexOf($vo);
            if (idx != -1) {
                this._invitationlist.splice(idx, 1);
            }
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        };
        TeamModel.prototype.removeAllInvitation = function () {
            if (!this._invitationlist) {
                this._invitationlist = new Array;
            }
            else {
                //拒绝组队请求时，会返回给发送人提示
                // for (let i = 0; i < this._invitationlist.length; i++) {
                //     NetManager.getInstance().protocolos.group_join_denied(this._applylist[i].guid);
                // }
                this._invitationlist = new Array;
            }
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        };
        TeamModel.prototype.getNearList = function () {
            var nearAry = new Array;
            if (GameInstance.roleList) {
                for (var i = 0; i < GameInstance.roleList.length; i++) {
                    var $tempChar = GameInstance.roleList[i];
                    if ($tempChar.unit && $tempChar.unit.isPlayer() && !$tempChar.unit.isMain) {
                        var vo = new InvitationCell;
                        vo.guid = $tempChar.unit.getPlayerGUID();
                        vo.icon = $tempChar.unit.getCharType();
                        vo.lev = $tempChar.unit.getLevel();
                        vo.name = $tempChar.unit.getName();
                        vo.online = true;
                        vo.isflag = false;
                        nearAry.push(vo);
                    }
                }
            }
            console.log("----nearAry---", nearAry);
            return nearAry;
        };
        TeamModel.prototype.getFriendList = function () {
            var friendAry = new Array;
            if (GuidData.social) {
                var ary = GuidData.social.getFriendList();
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i].guid != GuidData.player.getGuid()) {
                        var vo = new InvitationCell;
                        vo.guid = ary[i].guid;
                        vo.icon = ary[i].gender;
                        vo.lev = ary[i].level;
                        vo.name = ary[i].name;
                        vo.online = ary[i].inOnline;
                        vo.isflag = false;
                        friendAry.push(vo);
                    }
                }
            }
            console.log("----friendAry---", friendAry);
            return friendAry;
        };
        TeamModel.prototype.getFactionList = function () {
            var factionAry = new Array;
            if (GuidData.faction) {
                var ary = GuidData.faction.getFactionList();
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i].guid != GuidData.player.getGuid()) {
                        var vo = new InvitationCell;
                        vo.guid = ary[i].guid;
                        vo.icon = ary[i].gender;
                        vo.lev = ary[i].level;
                        vo.name = ary[i].name;
                        vo.online = ary[i].isOnline;
                        vo.isflag = false;
                        factionAry.push(vo);
                    }
                }
            }
            console.log("----factionAry---", factionAry);
            return factionAry;
        };
        TeamModel.prototype.getInvitationList = function ($type) {
            var retary;
            switch ($type) {
                case 0:
                    //附近
                    retary = this.getNearList();
                    break;
                case 1:
                    //好友
                    retary = this.getFriendList();
                    break;
                case 2:
                    //家族
                    retary = this.getFactionList();
                    break;
                default:
                    retary = new Array;
                    break;
            }
            return retary;
        };
        TeamModel.prototype.enterTask = function ($tab) {
            var curNum = this.getTeamMemberNum();
            var issingle = curNum <= 1;
            switch ($tab.tab.tab.id & 65535) {
                case 5:
                    // if (issingle) {
                    //     NetManager.getInstance().protocolos.kuafu_3v3_match();
                    // } else {
                    //     NetManager.getInstance().protocolos.kuafu_3v3_match();
                    // }
                    if (curNum < 3) {
                        msgtip.MsgTipManager.outStr("[ff0000]人数不足无法进行副本", 99);
                    }
                    else {
                        NetManager.getInstance().protocolos.kuafu_3v3_group_match();
                    }
                    break;
                case 20:
                    if (issingle) {
                        NetManager.getInstance().protocolos.enter_group_exp(0);
                    }
                    else {
                        NetManager.getInstance().protocolos.enter_group_exp(1);
                    }
                    break;
                case 101:
                    //野外打怪
                    msgtip.MsgTipManager.outStr("[ff0000]目标不是副本类型", 99);
                    break;
                case 12:
                    //组队副本
                    if (issingle) {
                        NetManager.getInstance().protocolos.group_instance_match($tab.tab.tab.id >> 16, 0);
                    }
                    else {
                        NetManager.getInstance().protocolos.group_instance_match($tab.tab.tab.id >> 16, 1);
                    }
                    break;
                default:
                    break;
            }
        };
        return TeamModel;
    }());
    team.TeamModel = TeamModel;
})(team || (team = {}));
//# sourceMappingURL=TeamModel.js.map