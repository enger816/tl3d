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
var ranking;
(function (ranking) {
    var Avo = /** @class */ (function () {
        function Avo() {
        }
        return Avo;
    }());
    ranking.Avo = Avo;
    var CurrentServerRanking = /** @class */ (function (_super) {
        __extends(CurrentServerRanking, _super);
        function CurrentServerRanking() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._winmidelRender = new UIRenderComponent;
            _this.addRender(_this._winmidelRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        CurrentServerRanking.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            if (this.currentRankingCenterPanel) {
                this.currentRankingCenterPanel.dispose();
                this.currentRankingCenterPanel = null;
            }
            if (this.currentRankingrightPanel) {
                this.currentRankingrightPanel.dispose();
                this.currentRankingrightPanel = null;
            }
        };
        CurrentServerRanking.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas, $winmidrender) {
            this._winmidelRender = $winmidrender;
            this._roleRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $publicuiAtlas;
            var renderLevel = this._topRender;
            this.initView(renderLevel);
        };
        CurrentServerRanking.prototype.initView = function (renderLevel) {
            var renderLevel = this._baseRender;
            this.currentRankingCenterPanel = new CurrentRankingCenterPanel();
            this.currentRankingCenterPanel.setRender(this._bottomRender, this._baseRender, this._topRender);
            this.addVirtualContainer(this.currentRankingCenterPanel);
            this.currentRankingrightPanel = new CurrentRankingRightPanel();
            this.currentRankingrightPanel.setRender(this._publicRender, this._roleRender, this._baseRender, this._topRender);
            this.currentRankingrightPanel.parent = this;
            this.addVirtualContainer(this.currentRankingrightPanel);
            var bg = this.addChild(this._winmidelRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "coffeeBg", renderLevel);
            var cnew_right_bg_top = this.addChild(this._winmidelRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            var cnew_right_bg_bottom = this.addChild(this._winmidelRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);
            this._winmidelRender.applyObjData();
            this.b_info = this.addChild(renderLevel.getComponent("b_info"));
            this._tab_zhanli = this.addEvntBut("tab_zhanli", renderLevel);
            this._tab_zhanli.data = ranking.RankingType.RANK_TYPE_POWER;
            this._tab_lev = this.addEvntBut("tab_lev", renderLevel);
            this._tab_lev.data = ranking.RankingType.RANK_TYPE_LEVEL;
            this._tab_faction = this.addEvntBut("tab_faction", renderLevel);
            this._tab_faction.data = ranking.RankingType.RANK_TYPE_FACTION;
            this._tab_wing = this.addEvntBut("tab_wing", renderLevel);
            this._tab_wing.data = ranking.RankingType.RANK_TYPE_WINGS;
            this._tab_zuoqi = this.addEvntBut("tab_zuoqi", renderLevel);
            this._tab_zuoqi.data = ranking.RankingType.RANK_TYPE_MOUNT;
            this._tab_pws = this.addEvntBut("tab_pws", renderLevel);
            this._tab_pws.data = ranking.RankingType.RANK_TYPE_SINGLE_PVP;
            this._selectButtonAry = new Array;
            this._selectButtonAry.push(this._tab_zhanli);
            this._selectButtonAry.push(this._tab_lev);
            this._selectButtonAry.push(this._tab_faction);
            this._selectButtonAry.push(this._tab_wing);
            this._selectButtonAry.push(this._tab_zuoqi);
            this._selectButtonAry.push(this._tab_pws);
            this.resize();
        };
        CurrentServerRanking.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        //设置是否有排行数据的ui显示
        CurrentServerRanking.prototype.seInfoState = function ($flag) {
            this.setUiListVisibleByItem([this.b_info], $flag);
        };
        CurrentServerRanking.prototype.show = function ($value) {
            UIManager.getInstance().addUIContainer(this);
            this.selecttab(this._selectButtonAry[$value]);
            this.currentRankingCenterPanel.currentServerRankingList.show();
        };
        CurrentServerRanking.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.currentRankingCenterPanel.currentServerRankingList.hide();
        };
        CurrentServerRanking.prototype.butClik = function (evt) {
            this.selecttab(evt.target);
        };
        CurrentServerRanking.prototype.selecttab = function ($uicomponent) {
            //选中状态重置
            for (var i = 0; i < this._selectButtonAry.length; i++) {
                if (this._selectButtonAry[i] == $uicomponent) {
                    this._selectButtonAry[i].selected = true;
                }
                else {
                    this._selectButtonAry[i].selected = false;
                }
            }
            if (this._last == $uicomponent) {
                return;
            }
            this._last = $uicomponent;
            //切换页签时，重置每页的currentpage
            this.currentRankingCenterPanel.setUiTitle($uicomponent.data);
            // this.currentRankingCenterPanel.currentpage = 1;
            this.currentRankingCenterPanel.currentServerRankingList.clearAryData();
            this.currentRankingCenterPanel.currentServerRankingList.sendrequest($uicomponent.data);
        };
        return CurrentServerRanking;
    }(UIVirtualContainer));
    ranking.CurrentServerRanking = CurrentServerRanking;
    var CurrentRankingCenterPanel = /** @class */ (function (_super) {
        __extends(CurrentRankingCenterPanel, _super);
        function CurrentRankingCenterPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        CurrentRankingCenterPanel.prototype.dispose = function () {
            if (this.currentServerRankingList) {
                this.currentServerRankingList.dispose();
                this.currentServerRankingList = null;
            }
        };
        CurrentRankingCenterPanel.prototype.setRender = function ($bottomRender, $base, $topRender) {
            // this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._topRender = $topRender;
            this._baseRender = $base;
            this.loadConfigCom();
        };
        CurrentRankingCenterPanel.prototype.loadConfigCom = function () {
            var facname = this._topRender.getComponent("c_7_1");
            var playername = this._topRender.getComponent("c_12_1");
            var zhiye = this._topRender.getComponent("c_7_2");
            this._titleAry_faction = new Array;
            this._titleAry_faction.push(facname);
            this._titleAry_faction.push(this._topRender.getComponent("c_5_1"));
            this._titleAry_faction.push(this._topRender.getComponent("c_3_1"));
            this._titleAry_wing = new Array;
            this._titleAry_wing.push(playername);
            this._titleAry_wing.push(this._topRender.getComponent("c_8_1"));
            this._titleAry_wing.push(this._topRender.getComponent("c_10_1"));
            this._titleAry_mount = new Array;
            this._titleAry_mount.push(playername);
            this._titleAry_mount.push(this._topRender.getComponent("c_6"));
            this._titleAry_mount.push(this._topRender.getComponent("c_2"));
            this._titleAry_Lev = new Array;
            this._titleAry_Lev.push(playername);
            this._titleAry_Lev.push(zhiye);
            this._titleAry_Lev.push(this._topRender.getComponent("c_1_1"));
            this._titleAry_zhanli = new Array;
            this._titleAry_zhanli.push(playername);
            this._titleAry_zhanli.push(zhiye);
            this._titleAry_zhanli.push(this._topRender.getComponent("c_4_1"));
            this._titleAry_pws = new Array;
            this._titleAry_pws.push(playername);
            this._titleAry_pws.push(zhiye);
            this._titleAry_pws.push(this._topRender.getComponent("c_11"));
            var t_myranktitlebg = this.addChild(this._bottomRender.getComponent("t_myranktitlebg1"));
            t_myranktitlebg.isU = true;
            this.RankNum = this.addChild(this._baseRender.getComponent("nanknum"));
            this.name1 = this.addChild(this._baseRender.getComponent("info1"));
            this.name2 = this.addChild(this._baseRender.getComponent("info2"));
            this.name3 = this.addChild(this._baseRender.getComponent("info3"));
            this.currentServerRankingList = new ranking.CurrentServerRankingList();
            this.currentServerRankingList.init(this._baseRender.uiAtlas);
            this.slistIndex = this.addChild(this._topRender.getComponent("slistIndex"));
            this.t_norank = this._topRender.getComponent("t_norank");
            this.addUIList(["t_myranktitlebg", "b_bg5_3"], this._bottomRender);
            this.addUIList(["line_1_1", "line_1_2", "line_1_4", "a_8", "t_myranktitle", "line_2"], this._topRender);
            this.resize();
        };
        CurrentRankingCenterPanel.prototype.resetData = function ($data) {
            this._data = $data;
            if ($data.allNum > 0) {
                this.drawMyRank($data.rank);
            }
            else {
                UiDraw.clearUI(this.name1);
                UiDraw.clearUI(this.name2);
                UiDraw.clearUI(this.name3);
                UiDraw.clearUI(this.RankNum);
                this.setUiListVisibleByItem([this.t_norank], false);
            }
            // this.setCurrentNum($data.allNum);
        };
        CurrentRankingCenterPanel.prototype.drawMyRank = function ($rank) {
            this.setUiListVisibleByItem([this.t_norank], false);
            switch (this._type) {
                case ranking.RankingType.RANK_TYPE_POWER:
                    this.drawPowerRank();
                    break;
                case ranking.RankingType.RANK_TYPE_LEVEL:
                    this.drawLevRank();
                    break;
                case ranking.RankingType.RANK_TYPE_FACTION:
                    var factionId = GuidData.player.getFactionID();
                    if (!factionId || factionId.length == 0) {
                        UiDraw.clearUI(this.name1);
                        UiDraw.clearUI(this.name2);
                        UiDraw.clearUI(this.name3);
                        UiDraw.clearUI(this.RankNum);
                        this.setUiListVisibleByItem([this.t_norank], true);
                        this.t_norank.goToAndStop(0);
                        return;
                    }
                    this.drawFactionRank();
                    // this.drawMoneyRank();
                    break;
                case ranking.RankingType.RANK_TYPE_WINGS:
                    var wingID = GuidData.grow.getWingID();
                    if (wingID == 0) {
                        UiDraw.clearUI(this.name1);
                        UiDraw.clearUI(this.name2);
                        UiDraw.clearUI(this.name3);
                        UiDraw.clearUI(this.RankNum);
                        this.setUiListVisibleByItem([this.t_norank], true);
                        this.t_norank.goToAndStop(2);
                        return;
                    }
                    var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, wingID);
                    var wingInfo = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
                    this.drawWingsRank(wingInfo.id, wingInfo.name);
                    break;
                case ranking.RankingType.RANK_TYPE_MOUNT:
                    var num = GuidData.player.getMountLevel();
                    if (!num || num == 0) {
                        UiDraw.clearUI(this.name1);
                        UiDraw.clearUI(this.name2);
                        UiDraw.clearUI(this.name3);
                        UiDraw.clearUI(this.RankNum);
                        this.setUiListVisibleByItem([this.t_norank], true);
                        this.t_norank.goToAndStop(1);
                        return;
                    }
                    this.drawMountRank();
                    break;
                case ranking.RankingType.RANK_TYPE_SINGLE_PVP:
                    this.drawPWSRank();
                    break;
                default:
                    break;
            }
            //名次
            if ($rank == -1 || $rank == 0) {
                //未上榜
                UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.RankNum.skinName, "NoRank", 0, 9, false);
                // CurrentRankingCenterPanel.SharedDraw(this._topRender.uiAtlas, this.RankNum.skinName, "NoRank", 0, 6);
            }
            else if ($rank < 4) {
                //前三名
                UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.RankNum.skinName, String($rank), 10, 0, false);
                // CurrentRankingCenterPanel.SharedDraw(this._topRender.uiAtlas, this.RankNum.skinName, String($rank), 10, 0);
            }
            else {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.RankNum.skinName, String($rank), 16, TextAlign.CENTER, ColorType.Brown7a2f21, "", 7);
            }
        };
        CurrentRankingCenterPanel.prototype.drawPowerRank = function () {
            //战力数据
            this.drawNameAndVip(this.name1, 1);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, getProfessional(GameInstance.mainChar.unit.getCharType()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        CurrentRankingCenterPanel.prototype.drawPWSRank = function () {
            //排位赛
            this.drawNameAndVip(this.name1, 1);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, getProfessional(GameInstance.mainChar.unit.getCharType()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var qs = GuidData.player.getQualifyScore();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(qs), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        CurrentRankingCenterPanel.prototype.drawLevRank = function () {
            //等级数据
            this.drawNameAndVip(this.name1, 1);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, getProfessional(GameInstance.mainChar.unit.getCharType()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, String(GuidData.player.getLevel()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        CurrentRankingCenterPanel.prototype.drawMoneyRank = function () {
            //财富数据
            this.drawNameAndVip(this.name1, 1);
            // var x: number = Math.ceil(this.KeyWidth[this._type][2]);
            // this.writeTxtByXY(this._topRender.uiAtlas, this.name2.skinName, GuidData.player.getFactionName() ? getBaseName(GuidData.player.getFactionName()) : "暂无帮派", 16, x, 0, "#d6e7ff");
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, GuidData.player.getFactionName() ? getBaseName(GuidData.player.getFactionName()) : "暂无帮派", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            // var x: number = Math.ceil(this.KeyWidth[this._type][3]) / 2;
            var silver = GuidData.player.getSilver();
            if (silver) {
                // this.writeArtFontByXY(this._topRender.uiAtlas, this.name3.skinName, String(float2int(silver)), ArtFont.num3, x, 0);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(silver), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        };
        CurrentRankingCenterPanel.prototype.drawWingsRank = function ($num, $name) {
            //神羽数据
            this.drawNameAndVip(this.name1, 1);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, $name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, getChiNum($num) + "阶", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        CurrentRankingCenterPanel.prototype.drawMountRank = function () {
            //坐骑数据
            this.drawNameAndVip(this.name1, 1);
            var mountlevel = GuidData.grow.getMountLevel();
            var mounttabvo = tb.TB_mount_base_vo.get_TB_mount_base_vo(mountlevel);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, mounttabvo.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, getChiNum(mountlevel) + "阶" + GuidData.grow.getMountStart() + "星", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        CurrentRankingCenterPanel.prototype.drawFactionRank = function () {
            //家族数据
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name1.skinName, GuidData.player.getFactionName() ? getBaseName(GuidData.player.getFactionName()) : "暂无帮派", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, String(GuidData.faction.getLev()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        /**
         * $key:对应KeyWidth中的索引
         */
        CurrentRankingCenterPanel.prototype.drawNameAndVip = function ($ui, $key) {
            IconManager.getInstance().getIcon(getVipIconUrl(GuidData.player.getVipLevel()), function ($img) {
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                var x;
                var name;
                if ($key == 1) {
                    name = GuidData.player.getName();
                }
                else {
                    name = GuidData.faction.getManagerName();
                }
                if (name && name.length > 0) {
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Brown7a2f21 + getBaseName(name), 16, 57, 0);
                }
                ctx.drawImage($img, 0, 0, 29, 14, 108, 4, 29, 14);
                // social.SocialUitl.drawVipToCtx(ctx, GuidData.player.getVipLevel(), x + 1);
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        CurrentRankingCenterPanel.prototype.setUiTitle = function ($type) {
            this._type = $type;
            if (this._last) {
                this.setUiListVisibleByItem(this._last, false);
            }
            switch ($type) {
                case ranking.RankingType.RANK_TYPE_POWER:
                    this.setUiListVisibleByItem(this._titleAry_zhanli, true);
                    this._last = this._titleAry_zhanli;
                    break;
                case ranking.RankingType.RANK_TYPE_LEVEL:
                    this.setUiListVisibleByItem(this._titleAry_Lev, true);
                    this._last = this._titleAry_Lev;
                    break;
                case ranking.RankingType.RANK_TYPE_FACTION:
                    this.setUiListVisibleByItem(this._titleAry_faction, true);
                    this._last = this._titleAry_faction;
                    break;
                case ranking.RankingType.RANK_TYPE_WINGS:
                    this.setUiListVisibleByItem(this._titleAry_wing, true);
                    this._last = this._titleAry_wing;
                    break;
                case ranking.RankingType.RANK_TYPE_MOUNT:
                    this.setUiListVisibleByItem(this._titleAry_mount, true);
                    this._last = this._titleAry_mount;
                    break;
                case ranking.RankingType.RANK_TYPE_SINGLE_PVP:
                    this.setUiListVisibleByItem(this._titleAry_pws, true);
                    this._last = this._titleAry_pws;
                    break;
                default:
                    break;
            }
        };
        CurrentRankingCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.currentServerRankingList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y;
            this.currentServerRankingList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x;
        };
        return CurrentRankingCenterPanel;
    }(UIVirtualContainer));
    ranking.CurrentRankingCenterPanel = CurrentRankingCenterPanel;
    var CurrentRankingRightPanel = /** @class */ (function (_super) {
        __extends(CurrentRankingRightPanel, _super);
        function CurrentRankingRightPanel() {
            var _this = _super.call(this) || this;
            _this._lastMouseX = 0;
            _this._lastRoleRotatioinY = 0;
            _this._lastnum = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        CurrentRankingRightPanel.prototype.dispose = function () {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.destory();
                this.mountRoleSprite = null;
            }
            if (this.wingDisplay) {
                this.wingDisplay.destory();
                this.wingDisplay = null;
            }
        };
        CurrentRankingRightPanel.prototype.setRender = function ($publicRender, $roleRender, $base, $topRender) {
            this._bgRender = $roleRender;
            this._roleRender = $base;
            this._topRender = $topRender;
            this._baseRender = $publicRender;
            this.loadConfigCom();
        };
        CurrentRankingRightPanel.prototype.loadConfigCom = function () {
            // this.b_btnreward = this.addEvntButUp("b_btn2", this._topRender);
            this.b_btnsocial = this.addEvntButUp("b_btn3", this._topRender);
            this.b_bg_role = this.addEvntBut("b_bg_role", this._bgRender);
            this._uiaryUI = new Array;
            this._uiaryUI.push(this._bgRender.getComponent("b_bg2"));
            this._uiaryUI.push(this._bgRender.getComponent("a_namebg"));
            this.t_curname = this.addChild(this._topRender.getComponent("t_curname"));
            this.t_curvip = this.addChild(this._topRender.getComponent("t_curvip"));
            this.t_curtitle = this.addChild(this._topRender.getComponent("t_curtitle"));
            this._uiaryUI.push(this.t_curname);
            this._uiaryUI.push(this.t_curvip);
            this._uiaryUI.push(this.t_curtitle);
            this._aryUI = new Array;
            this._aryUI.push(this.b_btnsocial);
            // this._aryUI.push(this.b_btnreward);
            this._BtnaryUI = new Array;
            var btn = this._baseRender.getComponent("cnew_but_yes");
            this.setSizeForPanelUiCopy(btn, "b_btn1", this._roleRender);
            btn.addEventListener(InteractiveEvent.Up, this.zanClik, this);
            this._BtnaryUI.push(btn);
            this._BtnaryUI.push(this._topRender.getComponent("b_mbtxt"));
            this._BtnaryUI.push(this._topRender.getComponent("b_ymb"));
            this._BtnaryUI.push(this._topRender.getComponent("a_17"));
            this._BtnaryUI.push(this._roleRender.getComponent("a_7"));
            this.mountRoleSprite = new Person2DChar();
            this._bgRender.addModel(this.mountRoleSprite);
            this._scale = 4;
            this._rotationY = 0;
            this._posY = -110;
            this._bgRender.applyObjData();
            this.resize();
        };
        CurrentRankingRightPanel.prototype.A_left_bg_MouseDown = function (evt) {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.mountRoleSprite.rotationY;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        CurrentRankingRightPanel.prototype.A_left_bg_MouseMove = function (evt) {
            this.mountRoleSprite.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        };
        CurrentRankingRightPanel.prototype.A_left_bg_MouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        CurrentRankingRightPanel.prototype.rotationRole = function () {
            this.mountRoleSprite.rotationY -= 0.5;
        };
        CurrentRankingRightPanel.prototype.setAvatar = function ($num, $name) {
            if ($name === void 0) { $name = ""; }
            this.mountRoleSprite.setAvatar($num);
            // this.mountRoleSprite.rotationY = 45
            // LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, "B_name_0", $name, 20, TextAlign.CENTER, "#ff00ff")
        };
        CurrentRankingRightPanel.prototype.setWeapon = function (num) {
            this.mountRoleSprite.setWeapon(num);
        };
        CurrentRankingRightPanel.prototype.resizeRole = function () {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = this._scale * UIData.Scale;
                this.mountRoleSprite.rotationY = this._rotationY;
                this.mountRoleSprite.x = -200 * UIData.Scale;
                this.mountRoleSprite.y = this._posY * UIData.Scale;
            }
            if (this.wingDisplay) {
                this.wingDisplay.resize();
                this.wingDisplay.scale = this._scale * UIData.Scale;
            }
        };
        CurrentRankingRightPanel.prototype.resetData = function ($data) {
            var vo = $data.data;
            this._data = $data;
            this.likenum = vo.data.like;
            var $flag = vo.type == ranking.RankingType.RANK_TYPE_MOUNT || vo.type == ranking.RankingType.RANK_TYPE_WINGS;
            this.setUiListVisibleByItem(this._aryUI, !$flag);
            //设置模型
            if ($flag) {
                this._bgRender.removeModel(this.wingDisplay);
                var $curname;
                if (vo.type == ranking.RankingType.RANK_TYPE_MOUNT) {
                    //坐骑
                    var $tb_mount_base_vo = tb.TB_mount_base_vo.get_TB_mount_base_vo(vo.data.mountLev);
                    this.mountRoleSprite.needUIUrl = true;
                    this.setAvatar($tb_mount_base_vo.mountID);
                    $curname = $tb_mount_base_vo.name;
                    this._scale = 3;
                    this._rotationY = 30;
                    this._posY = -110;
                }
                else {
                    //翅膀
                    var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, vo.data.level);
                    var wingInfo = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
                    this.mountRoleSprite.needUIUrl = false;
                    this.setAvatar(wingInfo.model);
                    $curname = wingInfo.name;
                    this._scale = 4;
                    this._rotationY = 0;
                    this._posY = -50;
                }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_curname.skinName, getBaseName($curname), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.t_curtitle);
                UiDraw.clearUI(this.t_curvip);
                this.setWeapon(0);
                this.setUiListVisibleByItem(this._BtnaryUI, false);
            }
            else {
                //人物
                this._scale = 4;
                this._rotationY = 0;
                this._posY = -110;
                this.mountRoleSprite.needUIUrl = true;
                //console.log("---vo.data.weapon---", vo.data.coat, vo.data.weapon);
                this.mountRoleSprite.setBaseRoleAvatar(vo.data.coat, vo.data.gender);
                this.mountRoleSprite.setBaseRoleWeapon(vo.data.weapon, vo.data.gender);
                this.setWing(vo.data.wingid);
                //排名前三，有点赞功能
                if (vo.data.rank <= 3) {
                    this.setNum(vo.data.like);
                }
                else {
                    this.setUiListVisibleByItem(this._BtnaryUI, false);
                }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_curname.skinName, getBaseName(vo.data.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this._topRender.uiAtlas.upDataPicToTexture(getVipIconUrl(vo.data.vip), this.t_curvip.skinName);
                if (vo.data.title > 0) {
                    this._topRender.uiAtlas.upDataPicToTexture(getUItittleUrl(String(vo.data.title)), this.t_curtitle.skinName);
                }
                else {
                    UiDraw.clearUI(this.t_curtitle);
                }
            }
            this.resizeRole();
        };
        CurrentRankingRightPanel.prototype.setVisiable = function ($num) {
            if (this._lastnum == $num) {
                return;
            }
            this._lastnum = $num;
            var $flag = $num > 0;
            this.setUiListVisibleByItem(this._aryUI, $flag);
            this.setUiListVisibleByItem(this._BtnaryUI, $flag);
            this.setUiListVisibleByItem(this._uiaryUI, $flag);
            if (this.wingDisplay) {
                this.wingDisplay.visible = $flag;
            }
            if (this.mountRoleSprite) {
                this.mountRoleSprite.visible = $flag;
            }
            // if($flag){
            // }else{
            //     this.mountRoleSprite.visible = false;
            //     this.wingDisplay.visible = false;
            // }
        };
        CurrentRankingRightPanel.prototype.setWing = function ($wingid) {
            if ($wingid && $wingid > 0) {
                if (!this.wingDisplay) {
                    this.wingDisplay = new Person2DChar();
                    this.wingDisplay.needUIUrl = false;
                    this.wingDisplay.setBind(this.mountRoleSprite, SceneChar.WING_SLOT);
                }
                this._bgRender.addModel(this.wingDisplay);
                //console.log("---$wingid---", $wingid);
                var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, $wingid);
                var wingInfo = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
                if (wingInfo.model) {
                    this.wingDisplay.setAvatar(wingInfo.model);
                }
            }
            else {
                this._bgRender.removeModel(this.wingDisplay);
            }
        };
        CurrentRankingRightPanel.prototype.setBtnZan = function () {
            var vo = this._data.data;
            var stateary = GuidData.player.getRankLikeState();
            var index = vo.typeShareDef * 3 + vo.data.rank - 1;
            if (stateary[index]) {
                //已经点赞了
                this.setUiListVisibleByItem([this._BtnaryUI[0], this._BtnaryUI[1]], false);
                this.setUiListVisibleByItem([this._BtnaryUI[2], this._BtnaryUI[3], this._BtnaryUI[4]], true);
            }
            else {
                this.setUiListVisibleByItem([this._BtnaryUI[0], this._BtnaryUI[1], this._BtnaryUI[3], this._BtnaryUI[4]], true);
                this.setUiListVisibleByItem([this._BtnaryUI[2]], false);
            }
        };
        CurrentRankingRightPanel.prototype.setNum = function ($like) {
            this._data.data.data.like = $like;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._BtnaryUI[3].skinName, "被膜拜次数：" + $like, 16, TextAlign.CENTER, ColorType.Whitefff7db);
            this.setBtnZan();
        };
        CurrentRankingRightPanel.prototype.resize = function () {
            this.resizeRole();
            _super.prototype.resize.call(this);
        };
        CurrentRankingRightPanel.prototype.butClik = function (evt) {
            var vo = this._data.data;
            switch (evt.target) {
                case this.b_bg_role:
                    this.A_left_bg_MouseDown(evt);
                    break;
                // case this.b_btnreward:
                //     UiTweenScale.getInstance().changeButSize(evt.target);
                //     var ttt = new RankingEvent(RankingEvent.REWARD_RANK_PANLE);
                //     ttt.data = vo.typeShareDef;
                //     ModuleEventManager.dispatchEvent(ttt);
                //     break
                case this.b_btnsocial:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    NetManager.getInstance().protocolos.get_player_overview(vo.data.guid);
                    break;
                default:
                    break;
            }
        };
        CurrentRankingRightPanel.prototype.zanClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            NetManager.getInstance().protocolos.rank_add_like(this._data.data.typeShareDef, this._data.data.data.guid);
        };
        return CurrentRankingRightPanel;
    }(UIVirtualContainer));
    ranking.CurrentRankingRightPanel = CurrentRankingRightPanel;
})(ranking || (ranking = {}));
//# sourceMappingURL=CurrentServerRanking.js.map