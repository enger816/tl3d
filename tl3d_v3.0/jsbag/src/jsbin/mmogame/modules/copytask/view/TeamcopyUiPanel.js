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
var copytask;
(function (copytask) {
    var TeamcopyUiPanel = /** @class */ (function (_super) {
        __extends(TeamcopyUiPanel, _super);
        function TeamcopyUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bigPic = new UIRenderOnlyPicComponent();
            _this.addRender(_this._bigPic);
            _this._winmidRender = new UIRenderComponent;
            _this.addRender(_this._winmidRender);
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        TeamcopyUiPanel.prototype.dispose = function () {
            this._topRender.dispose();
            this._topRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.treasureList) {
                this.treasureList.dispose();
                this.treasureList = null;
            }
        };
        TeamcopyUiPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas, $winmidRender) {
            this._bigPic.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._winmidRender = $winmidRender;
            this.initView();
        };
        TeamcopyUiPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            //大背景
            this.addChild(this._bigPic.getComponent("b_pic"));
            var cnew_bg_yellow = this._winmidRender.getComponent("cnew_bg_yellow");
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._baseRender);
            var cnew_right_bg_top = this._winmidRender.getComponent("cnew_right_bg_top");
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            var cnew_right_bg_bottom = this._winmidRender.getComponent("cnew_right_bg_bottom");
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);
            this._winmidRender.applyObjData();
            this.bguiary = new Array;
            this.bguiary.push(cnew_bg_yellow);
            this.bguiary.push(cnew_right_bg_top);
            this.bguiary.push(cnew_right_bg_bottom);
            this.a_listindex = this.addChild(renderLevel.getComponent("a_listindex"));
            // this.b_pic = this.addChild(renderLevel.getComponent("b_pic"));
            this.b_info = this.addChild(renderLevel.getComponent("b_info"));
            this.b_neednum = this.addChild(renderLevel.getComponent("b_neednum"));
            this.b_recomforce = this.addChild(renderLevel.getComponent("b_recomforce"));
            this.b_taskname = this.addChild(renderLevel.getComponent("b_taskname"));
            this.b_vip_add = this.addChild(renderLevel.getComponent("b_vip_add"));
            this.b_buynum = this.addEvntBut("b_buynum", renderLevel);
            this.b_desc = this.addChild(renderLevel.getComponent("b_desc"));
            this.addUIList(["b_title", "b_recomforcetxt", "b_neednumtxt", "b_bgleft", "b_bg1", "b_bg_center", "b_bg2", "b_bgright", "b_btntxt", "b_btntxt0", "b_btntxt1"], renderLevel);
            this.addChild(this._topRender.getComponent("b_titletxt"));
            this.b_rewardtitle = this.addChild(this._topRender.getComponent("b_rewardtitle"));
            this.rewarduiary = new Array;
            this.rewardtxtuiary = new Array;
            for (var i = 0; i < 4; i++) {
                this.rewarduiary.push(this._topRender.getComponent("b_reward" + i));
                this.rewardtxtuiary.push(this._topRender.getComponent("b_rewardtxt" + i));
            }
            this.autoplay = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.autoplay, "btnBg", renderLevel);
            this.teamplay = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.teamplay, "btnBg0", renderLevel);
            this.singleplay = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.singleplay, "btnBg1", renderLevel);
            this._publicRender.applyObjData();
        };
        TeamcopyUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.treasureList) {
                this.treasureList.left = this.a_listindex.parent.x / UIData.Scale + this.a_listindex.x;
                this.treasureList.top = this.a_listindex.parent.y / UIData.Scale + this.a_listindex.y;
            }
        };
        TeamcopyUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.treasureList) {
                this.treasureList = new TeamCopyList();
                this.treasureList.init(this._baseRender.uiAtlas);
            }
            // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_vip_add.skinName, getvipadd("groupReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            this.setUiListVisibleByItem(this.bguiary, true);
            this.treasureList.show();
            this.drawBuynum();
            this.resize();
        };
        TeamcopyUiPanel.prototype.hide = function () {
            this.setUiListVisibleByItem(this.bguiary, false);
            UIManager.getInstance().removeUIContainer(this);
            if (this.treasureList) {
                this.treasureList.hide();
            }
        };
        TeamcopyUiPanel.prototype.resetData = function ($data) {
            this._itdata = $data;
            this._bigPic.setImgUrl(getTeamcopyIconUrl($data.tabvo.map_pic));
            // this._baseRender.uiAtlas.upDataPicToTexture(getTeamcopyIconUrl($data.tabvo.map_pic), this.b_pic.skinName);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_taskname.skinName, $data.tabvo.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_neednum.skinName, $data.tabvo.need_Num + "人", 14, TextAlign.LEFT, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_recomforce.skinName, String($data.tabvo.recom_force), 14, TextAlign.LEFT, GuidData.player.getForce() >= $data.tabvo.recom_force ? ColorType.Green2ca937 : ColorType.colorcd2000);
            var rewardvoary = new Array;
            if ($data.state == 2) {
                this.b_desc.goToAndStop(0);
                this.b_rewardtitle.goToAndStop(1);
            }
            else {
                this.b_desc.goToAndStop(1);
                this.b_rewardtitle.goToAndStop(0);
            }
            LabelTextFont.writeText(this._baseRender.uiAtlas, this.b_info.skinName, 0, 0, $data.tabvo.info, 14, ColorType.color9a683f, 155, true);
            var rewardlist = this.getrewardAry($data.state, $data.tabvo);
            for (var i = 0; i < 4; i++) {
                if (i >= rewardlist.length) {
                    //清空绘制
                    this.setUiListVisibleByItem([this.rewarduiary[i], this.rewardtxtuiary[i]], false);
                }
                else {
                    this.setUiListVisibleByItem([this.rewarduiary[i], this.rewardtxtuiary[i]], true);
                    IconManager.getInstance().drawItemIcon60(this.rewarduiary[i], rewardlist[i][0], rewardlist[i][1]);
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.rewardtxtuiary[i].skinName, GameData.getPropName(rewardlist[i][0]), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                }
            }
        };
        TeamcopyUiPanel.prototype.drawBuynum = function () {
            var tab = tb.TB_group_instance_buy.getTempVo(1);
            var $rec = this._baseRender.uiAtlas.getRec(this.b_buynum.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
            UiDraw.cxtDrawImg(ctx, PuiData.BTNADD, new Rectangle(112, 2, 30, 30), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, "挑战次数:" + GuidData.instanceData.getTeamCopyNum() + "/" + tab.daily_reset, 14, 8, 7, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        //获得奖励列表
        TeamcopyUiPanel.prototype.getrewardAry = function ($state, $tab) {
            var c = new Array;
            var a;
            var b;
            if ($state == 2) {
                a = $tab.passRewardId;
                b = $tab.passRewardCnt;
            }
            else {
                a = $tab.fpRewardId;
                b = $tab.fpRewardCnt;
            }
            for (var i = 0; i < a.length; i++) {
                c.push([a[i], b[i]]);
            }
            return c;
        };
        TeamcopyUiPanel.prototype.butClik = function (evt) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.autoplay:
                    //匹配
                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            if (GuidData.team.getTeamMemberNum() == 3) {
                                msgtip.MsgTipManager.outStr("[ff0000]队伍已满员", 99);
                            }
                            else {
                                var teamtab = this.gotoTeamModul();
                                //先设置队伍类型，再自动匹配
                                NetManager.getInstance().protocolos.group_change_config(teamtab.tab.tab.id, teamtab.minlev, teamtab.maxlev, 1);
                                NetManager.getInstance().protocolos.auto_group_match(teamtab.tab.tab.id);
                            }
                        }
                        else {
                            msgtip.MsgTipManager.outStr("[ff0000]您当前不是队长", 99);
                        }
                    }
                    else {
                        this.gotoTeamModul();
                    }
                    break;
                case this.b_buynum:
                    //购买次数
                    this.showbuypanel();
                    break;
                case this.singleplay:
                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            //队长
                            msgtip.MsgTipManager.outStr("[ff0000]请点击<队伍进入>按钮进入副本挑战", 99);
                        }
                        else {
                            msgtip.MsgTipManager.outStr("[ff0000]当前处于队伍中，无法操作", 99);
                        }
                        return;
                    }
                    if (this._itdata.state < 3) {
                        if (GuidData.instanceData.getTeamCopyNum() > 0 || this._itdata.state == 1) {
                            NetManager.getInstance().protocolos.group_instance_match(this._itdata.tabvo.id, 0);
                        }
                        else {
                            //次数不足
                            AlertUtil.show("挑战次数不足，是否前往购买？", "提示", function (a) {
                                if (a == 1) {
                                    _this.showbuypanel();
                                }
                            }, 2, ["前往购买", "取消"]);
                        }
                    }
                    else {
                        //未开启
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "未解锁", 99);
                    }
                    break;
                case this.teamplay:
                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            //队长
                            if (GuidData.team.getTeamMemberNum() <= 1) {
                                AlertUtil.show("当前队伍只有一个人，是否进入副本？", "提示", function (a) {
                                    if (a == 1) {
                                        NetManager.getInstance().protocolos.group_instance_match(_this._itdata.tabvo.id, 0);
                                    }
                                }, 2, ["是", "否"]);
                            }
                            else {
                                NetManager.getInstance().protocolos.group_instance_match(this._itdata.tabvo.id, 1);
                            }
                        }
                        else {
                            msgtip.MsgTipManager.outStr("[ff0000]只有队长可以发起挑战", 99);
                        }
                    }
                    else {
                        AlertUtil.show("不在队伍中，是否前往创建或寻找队伍？", "提示", function (a) {
                            if (a == 1) {
                                _this.gotoTeamModul();
                            }
                        }, 2, ["是", "否"]);
                    }
                    break;
                default:
                    break;
            }
        };
        TeamcopyUiPanel.prototype.gotoTeamModul = function () {
            ModuleEventManager.dispatchEvent(new fb.ExpEvent(fb.ExpEvent.HIDE_EXP_PANEL));
            var tabvo = new team.TabVo;
            // tabvo.id = 0;
            tabvo.tab = team.TeamModel.getInstance().getTabVoByType(this._itdata.tabvo.id * 65536 + 12);
            tabvo.maxlev = tabvo.tab.tab.max_lev[1];
            tabvo.minlev = tabvo.tab.tab.min_lev[0];
            ModulePageManager.openPanel(SharedDef.MODULE_TEAM, tabvo);
            return tabvo;
        };
        /** 获取当前vip等级以后的vip提升对象 */
        TeamcopyUiPanel.prototype.getNextVip = function () {
            var $curobj = TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel());
            for (var i = 1; i < 16; i++) {
                var $vipobj = TableData.getInstance().getData(TableData.tb_vip_base, (GuidData.player.getVipLevel() + i));
                if ($vipobj) {
                    if ($vipobj["groupInstanceBuyTimes"] > $curobj["groupInstanceBuyTimes"]) {
                        return $vipobj;
                    }
                }
                else {
                    return null;
                }
            }
        };
        /** 获取当前vip等级对象 */
        // private getCurVip(): any {
        //     for (let i = 0; i < 15; i++) {
        //         var $vipobj: any = TableData.getInstance().getData(TableData.tb_vip_base, (GuidData.player.getVipLevel() - i));
        //         if ($vipobj) {
        //             if ($vipobj["groupInstanceBuyTimes"] > 0) {
        //                 return $vipobj;
        //             }
        //         }
        //     }
        //     return TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel());
        // }
        TeamcopyUiPanel.prototype.showbuypanel = function () {
            var $expobj = TableData.getInstance().getData(TableData.tb_group_instance_buy, 1);
            if (GuidData.instanceData.getTeamCopyNum() < $expobj["daily_reset"]) {
                var $vipobj = TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel());
                var idx = GuidData.instanceData.getBuyTeamCopyNum();
                var num = $vipobj["groupInstanceBuyTimes"] - idx;
                var $nextvipobj = this.getNextVip();
                if (num <= 0) {
                    if ($nextvipobj) {
                        var num = $nextvipobj["groupInstanceBuyTimes"] - GuidData.instanceData.getBuyTeamCopyNum();
                        var str = ColorType.Brown7a2f21 + "当前vip可购买等级已达上限，提升至" + ColorType.Redd92200 + "VIP" + $nextvipobj["id"] + ColorType.Brown7a2f21 + "后，今日还可购买" + num + "次,是否前往提升vip等级？";
                        AlertUtil.show(str, "", function ($data) {
                            if ($data == 1) {
                                ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                            }
                        }, 2, ["是", "否"]);
                    }
                    else {
                        msgtip.MsgTipManager.outStr("[ff0000]今日购买次数已达上限", 99);
                    }
                }
                else {
                    var $evt = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPVIPBUY_PANEL);
                    var typeary = $expobj["buy_type"];
                    var priceary = $expobj["buy_price"];
                    var ary = [typeary[idx], priceary[idx]];
                    $evt.resoureItem = [ary];
                    $evt.cutNum = num;
                    if ($nextvipobj) {
                        $evt.Info1 = ColorType.Brownd662c0d + "每日可购买" + ColorType.Green2ca937 + $nextvipobj["groupInstanceBuyTimes"] + ColorType.Brownd662c0d + "次";
                    }
                    $evt.data = $nextvipobj;
                    $evt.SubmitFun = function (value) {
                        //console.log("---value---",value);
                        NetManager.getInstance().protocolos.buy_group_instance_times(value);
                        ModuleEventManager.dispatchEvent(new popbuy.PopBuyEvent(popbuy.PopBuyEvent.HIDE_POPVIPBUY_PANEL));
                    };
                    ModuleEventManager.dispatchEvent($evt);
                }
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数已满", 99);
            }
        };
        return TeamcopyUiPanel;
    }(UIVirtualContainer));
    copytask.TeamcopyUiPanel = TeamcopyUiPanel;
    var TeamCopyList = /** @class */ (function (_super) {
        __extends(TeamCopyList, _super);
        function TeamCopyList() {
            var _this = _super.call(this) || this;
            _this.left = 47;
            _this.top = 83;
            return _this;
        }
        TeamCopyList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        TeamCopyList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, TeamCopyListRender, 223, 435, 0, 81, 5, 256, 1024, 1, 8, 2);
        };
        TeamCopyList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData(copytask.CopytaskModel.getInstance().getList());
            this.refreshData($sListItemData);
            this.setSelectIndex(0);
        };
        TeamCopyList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        TeamCopyList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        };
        TeamCopyList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return TeamCopyList;
    }(SList));
    copytask.TeamCopyList = TeamCopyList;
    var TeamCopyListRender = /** @class */ (function (_super) {
        __extends(TeamCopyListRender, _super);
        function TeamCopyListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamCopyListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var cententRender = this._customRenderAry[0];
            var topRender = this._customRenderAry[1];
            this.UnlockBg = this.creatGrid9SUI(cententRender, this.parentTarget.baseAtlas, "UnlockBg", 0, 0, 223, 76, 15, 15);
            $container.addChild(this.UnlockBg);
            this.Sname = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Sname", 71, 15, 100, 20);
            $container.addChild(this.Sname);
            this.Slev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Slev", 176, 17, 40, 18);
            $container.addChild(this.Slev);
            this.Sselect = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Sselect", 0, 0, 223, 76, 15, 15);
            $container.addChild(this.Sselect);
            this.Sselect.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Spass = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Spass", 163, 44, 45, 18);
            $container.addChild(this.Spass);
            this.Spic = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Spic", 0, 2, 220, 72);
            $container.addChild(this.Spic);
        };
        TeamCopyListRender.prototype.drawIcon = function () {
            var _this = this;
            var $vo = this.itdata.data;
            IconManager.getInstance().getIcon(getTeamcopyIconUrl($vo.tabvo.map_pic + "_b"), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.Spic.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 3, 1, $rec.pixelWitdh, $rec.pixelHeight);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        Object.defineProperty(TeamCopyListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyrender();
                }
                if (val) {
                    var $evt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SELECT_ITEM_EVENT);
                    $evt.data = this.itdata;
                    ModuleEventManager.dispatchEvent($evt);
                }
            },
            enumerable: true,
            configurable: true
        });
        TeamCopyListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                if (this.selected) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_select);
                }
                else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_nselect);
                }
                this.drawIcon();
                if ($vo.state == 3) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.limLev + "级解锁", 16, TextAlign.RIGHT, ColorType.Yellowffecc6);
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.UnlockBg.skinName, UIData.publicUi, PuiData.MASK);
                    LabelTextFont.clearLabel(this.uiAtlas, this.Slev.skinName);
                    LabelTextFont.clearLabel(this.uiAtlas, this.Spass.skinName);
                }
                else {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                    LabelTextFont.clearLabel(this.uiAtlas, this.UnlockBg.skinName);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Slev.skinName, $vo.tabvo.limLev + "级", 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                    var passstr = "已通关";
                    var passcolor = ColorType.Green2ca937;
                    if ($vo.state == 1) {
                        passstr = "未通关";
                        passcolor = ColorType.colorcd2000;
                    }
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Spass.skinName, passstr, 14, TextAlign.RIGHT, passcolor);
                }
            }
        };
        TeamCopyListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        TeamCopyListRender.prototype.equClick = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                var $vo = this.itdata.data;
                if ($vo.state == 3) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "未解锁", 99);
                    return;
                }
                this.setSelect();
            }
        };
        TeamCopyListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.UnlockBg);
            UiDraw.clearUI(this.Sname);
            UiDraw.clearUI(this.Slev);
            UiDraw.clearUI(this.Spass);
            UiDraw.clearUI(this.Sselect);
            UiDraw.clearUI(this.Spic);
        };
        return TeamCopyListRender;
    }(SListItem));
    copytask.TeamCopyListRender = TeamCopyListRender;
})(copytask || (copytask = {}));
//# sourceMappingURL=TeamcopyUiPanel.js.map