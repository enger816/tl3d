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
var fb;
(function (fb) {
    var ExpTaskPanel = /** @class */ (function (_super) {
        __extends(ExpTaskPanel, _super);
        function ExpTaskPanel() {
            var _this = _super.call(this) || this;
            _this._canclick = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        ExpTaskPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
        };
        ExpTaskPanel.prototype.initUiAtlas = function ($uiAtlas, $winUiatlas) {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $winUiatlas;
            this.initView();
        };
        ExpTaskPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.addUIList(["a_line", "a_infobg", "a_infobg1"], this._bgRender);
            this.addUIList(["a_infotitle", "a_info1", "a_singletxt", "a_teamtxt", "a_autotxt"], renderLevel);
            this.a_buybtn = this.addEvntButUp("a_buybtn", renderLevel);
            var levtxt = this.addChild(renderLevel.getComponent("a_info0"));
            var $obj = TableData.getInstance().getData(TableData.tb_system_base, SharedDef.MODULE_TEAMINSTANCE * 10 + SharedDef.MODULE_TEAMINSTANCE_EXP);
            var aaa = "等级限制 : " + $obj["level"] + "级以上";
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, levtxt.skinName, aaa, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.a_numtxt = this.addChild(renderLevel.getComponent("a_numtxt"));
            this.btn_single = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn_single, "t_btn1", this._bgRender);
            this.btn_team = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn_team, "t_btn2", this._bgRender);
            this.btn_auto = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.btn_auto, "t_btn3", this._bgRender);
            this._bgRender.applyObjData();
            var $obj = TableData.getInstance().getData(TableData.tb_instance_group_exp, 1);
            var rewardary = $obj["Reward"];
            for (var i = 0; i < rewardary.length; i++) {
                if (i < 3) {
                    var icon = this.addChild(renderLevel.getComponent("a_reward" + i));
                    IconManager.getInstance().drawItemIcon60(icon, rewardary[i][0], rewardary[i][1]);
                }
            }
        };
        ExpTaskPanel.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        ExpTaskPanel.prototype.refreshNum = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_instance_group_exp, 1);
            var str = "每日刷本次数 : " + GuidData.instanceData.getExptaskTimes() + "/" + $obj["dailyTimes"];
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_numtxt.skinName, str, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        };
        ExpTaskPanel.prototype.drawBg = function () {
            var bgui = this.parent.loadBigPicByUrl("ui/uidata/fuben/exp/expbg.png");
            bgui.x = 53;
            bgui.y = 80;
            bgui.width = 807;
            bgui.height = 331;
            this.parent.addBigPic();
        };
        ExpTaskPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.drawBg();
            this.refreshNum();
            this.resize();
        };
        ExpTaskPanel.prototype.hide = function () {
            this.parent.removeBigPic();
            UIManager.getInstance().removeUIContainer(this);
        };
        ExpTaskPanel.prototype.butClik = function (evt) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                // case this.uplevbtn:
                //     if (this._canclick) {
                //         this._canclick = false;
                //         TimeUtil.addTimeOut(500, () => {
                //             this._canclick = true;
                //         });
                //         if (this.uplevbtn.current == 1) {
                //             //console.log("---this._curCell.data.baskData.goto[0]---", this._curCell.data.baskData.goto[0]);
                //             this.meshQuestTargets(this._curCell.data.baskData.goto[0]);
                //         } else {
                //             if (this._canuplev) {
                //                 NetManager.getInstance().protocolos.raise_adventurespell(this._curCell.data.id);
                //             } else {
                //                 var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                //                 $aaa.data = this._needcost[0]
                //                 ModuleEventManager.dispatchEvent($aaa);
                //             }
                //         }
                //     }
                // break;
                case this.a_buybtn:
                    this.showBuyNumPanel();
                    break;
                case this.btn_auto:
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
                case this.btn_team:
                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            //队长
                            if (GuidData.team.getTeamMemberNum() <= 1) {
                                AlertUtil.show("当前队伍只有一个人，是否进入副本？", "提示", function (a) {
                                    if (a == 1) {
                                        NetManager.getInstance().protocolos.enter_group_exp(0);
                                    }
                                }, 2, ["是", "否"]);
                            }
                            else {
                                NetManager.getInstance().protocolos.enter_group_exp(1);
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
                case this.btn_single:
                    //console.log("---进入经验副本----");
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
                    var num = GuidData.instanceData.getExptaskTimes();
                    if (num > 0) {
                        NetManager.getInstance().protocolos.enter_group_exp(0);
                    }
                    else {
                        msgtip.MsgTipManager.outStr("[ff0000]次数不足，无法挑战", 99);
                    }
                    break;
                default:
                    break;
            }
        };
        ExpTaskPanel.prototype.gotoTeamModul = function () {
            ModuleEventManager.dispatchEvent(new fb.ExpEvent(fb.ExpEvent.HIDE_EXP_PANEL));
            var tabvo = new team.TabVo;
            // tabvo.id = 0;
            tabvo.tab = team.TeamModel.getInstance().getTabVoByType(20);
            tabvo.maxlev = tabvo.tab.tab.max_lev[1];
            tabvo.minlev = tabvo.tab.tab.min_lev[0];
            ModulePageManager.openPanel(SharedDef.MODULE_TEAM, tabvo);
            return tabvo;
        };
        /** 获取当前vip等级以后的vip提升对象 */
        ExpTaskPanel.prototype.getNextVip = function () {
            var $curobj = TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel());
            for (var i = 1; i < 16; i++) {
                var $vipobj = TableData.getInstance().getData(TableData.tb_vip_base, (GuidData.player.getVipLevel() + i));
                if ($vipobj) {
                    if ($vipobj["groupExpBuyTimes"] > $curobj["groupExpBuyTimes"]) {
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
        //             if ($vipobj["groupExpBuyTimes"] > 0) {
        //                 return $vipobj;
        //             }
        //         }
        //     }
        //     return TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel());
        // }
        ExpTaskPanel.prototype.showBuyNumPanel = function () {
            var $expobj = TableData.getInstance().getData(TableData.tb_instance_group_exp, 1);
            if (GuidData.instanceData.getExptaskTimes() < $expobj["dailyTimes"]) {
                var $vipobj = TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel());
                var idx = GuidData.instanceData.getExpBuyNum();
                var num = $vipobj["groupExpBuyTimes"] - idx;
                var $nextvipobj = this.getNextVip();
                if (num <= 0) {
                    if ($nextvipobj) {
                        var num = $nextvipobj["groupExpBuyTimes"] - GuidData.instanceData.getExpBuyNum();
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
                        $evt.Info1 = ColorType.Brownd662c0d + "每日可购买" + ColorType.Green2ca937 + $nextvipobj["groupExpBuyTimes"] + ColorType.Brownd662c0d + "次";
                    }
                    $evt.data = $nextvipobj;
                    $evt.SubmitFun = function (value) {
                        //console.log("---value---",value);
                        NetManager.getInstance().protocolos.buy_group_exp_times(value);
                        ModuleEventManager.dispatchEvent(new popbuy.PopBuyEvent(popbuy.PopBuyEvent.HIDE_POPVIPBUY_PANEL));
                    };
                    ModuleEventManager.dispatchEvent($evt);
                }
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数已满", 99);
            }
        };
        return ExpTaskPanel;
    }(UIVirtualContainer));
    fb.ExpTaskPanel = ExpTaskPanel;
})(fb || (fb = {}));
//# sourceMappingURL=ExpTaskPanel.js.map