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
var moneytree;
(function (moneytree) {
    var MoneyTree = /** @class */ (function (_super) {
        __extends(MoneyTree, _super);
        function MoneyTree() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        MoneyTree.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            if (this._frameRender1) {
                this._frameRender1.dispose();
                this._frameRender1 = null;
            }
            _super.prototype.dispose.call(this);
        };
        MoneyTree.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/moneytree/moneytree.xml", "ui/uidata/moneytree/moneytree.png", function () { _this.loadConfigCom(); });
        };
        MoneyTree.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.addUIList(["a_tiitle"], this._bgRender);
            this.addUIList(["a_info", "a_bg"], this._baseRender);
            this.a_tree = this.addChild(this._bgRender.getComponent("a_tree"));
            this.a_times = this.addChild(this._baseRender.getComponent("a_times"));
            this.a_money = this.addChild(this._midRender.getComponent("a_money"));
            this.a_txt = this.addChild(this._midRender.getComponent("a_txt"));
            this.a_cost = this.addChild(this._midRender.getComponent("a_cost"));
            this._rewardAry = new Array;
            this._infoAry = new Array;
            this._stateAry = new Array;
            this._proAry = new Array;
            this._proAry.push(this.addChild(this._bgRender.getComponent("a_pro0")));
            this._proAry.push(this.addChild(this._bgRender.getComponent("a_pro1")));
            this._rewardAry = new Array;
            for (var i = 0; i < 3; i++) {
                this.addChild(this._bgRender.getComponent("a_rewardbg" + i));
                var btn = this.addChild(this._baseRender.getComponent("a_icon" + i));
                btn.addEventListener(InteractiveEvent.Up, this.rewardClik, this);
                this._rewardAry.push(btn);
                this._infoAry.push(this.addChild(this._baseRender.getComponent("a_timesinfo" + i)));
                this._stateAry.push(this.addChild(this._midRender.getComponent("a_state" + i)));
            }
            this.a_btn = this.addEvntButUp("a_btn", this._midRender);
            this.resize();
            this.buildFram();
        };
        MoneyTree.prototype.buildFram = function () {
            var _this = this;
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, function ($ary) {
                    _this.effAry = $ary;
                    for (var i = 0; i < _this.effAry.length; i++) {
                        _this.effAry[i].x = _this._rewardAry[i].x - 21;
                        _this.effAry[i].y = _this._rewardAry[i].y - 21;
                        _this.effAry[i].width = _this.effAry[i].baseRec.width * 0.7;
                        _this.effAry[i].height = _this.effAry[i].baseRec.height * 0.7;
                        _this.effAry[i].speed = 3;
                    }
                    _this.playEff();
                    _this.applyLoadComplete();
                }, this._rewardAry.length);
            }
        };
        MoneyTree.prototype.playEff = function () {
            if (!this.effAry) {
                return;
            }
            for (var i = 0; i < this._rewardAry.length; i++) {
                var vo = this._rewardAry[i].data;
                if (vo && vo.state == 1) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                }
                else {
                    this.removeChild(this.effAry[i]);
                }
            }
        };
        MoneyTree.prototype.showSkillUpEff = function () {
            var _this = this;
            //console.log("up skill lev");
            if (!this._frameRender1) {
                this._frameRender1 = new FrameUIRender();
                this.addRender(this._frameRender1);
                this._frameRender1.setImg(getEffectUIUrl("ui_yqs"), 4, 4, function ($ui) {
                    _this.upLevEff = $ui;
                    _this.upLevEff.x = _this.a_tree.x + 55;
                    _this.upLevEff.y = _this.a_tree.y + 35;
                    _this.upLevEff.width = _this.upLevEff.baseRec.width * 1.6;
                    _this.upLevEff.height = _this.upLevEff.baseRec.height * 1.6;
                    _this.upLevEff.speed = 3;
                    _this.upLevEff.playOne(_this);
                });
            }
            if (this.upLevEff) {
                this.upLevEff.playOne(this);
            }
        };
        MoneyTree.prototype.showflyword = function ($str) {
            var v21d = new Vector2D(this.a_btn.parent.x / UIData.Scale + this.a_btn.x + this.a_btn.width, this.a_btn.parent.y / UIData.Scale + this.a_btn.y);
            // var v2d: Vector2D = UiTweenVo.getPosByPanel(v21d, { width: 960, height: 540 })
            // var v2d: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(204, 473), { width: 960, height: 540 })
            // v2d.x = v2d.x * UIData.Scale;
            // v2d.y = v2d.y * UIData.Scale;
            var a = $str.split("|");
            msgtip.MsgTipManager.outStr(ColorType.Yellowedce7e + a[1] + "倍暴击", msgtip.PopMsgVo.type8, v21d);
        };
        MoneyTree.prototype.resetData = function () {
            this.residueTime();
            this.drawReward();
            this.drawMoney();
            this.playEff();
        };
        MoneyTree.prototype.drawReward = function () {
            var bbb = moneytree.MoneyTreeModel.getInstance().getGiftAry();
            var $levobj = TableData.getInstance().getData(TableData.tb_moneytree_lv, GuidData.player.getLevel());
            for (var i = 0; i < bbb.length; i++) {
                if (i < this._rewardAry.length) {
                    this._rewardAry[i].data = bbb[i];
                    var reward = $levobj["gift_3"];
                    if (bbb[i].tab.count == 3) {
                        reward = $levobj["gift_1"];
                    }
                    else if (bbb[i].tab.count == 6) {
                        reward = $levobj["gift_2"];
                    }
                    IconManager.getInstance().drawItemIcon40(this._rewardAry[i], reward[0], reward[1], bbb[i].state == 2, false);
                    var reciveStr;
                    var times = bbb[i].tab.count - GuidData.player.getMoneyTreeNum();
                    if (times > 0) {
                        reciveStr = times + "次可领取";
                    }
                    else {
                        reciveStr = "可领取";
                    }
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._infoAry[i].skinName, reciveStr, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                    var state = bbb[i].state != 2 ? 0 : 1;
                    this._stateAry[i].goToAndStop(state);
                }
                if (i < this._proAry.length) {
                    var prosta = bbb[i + 1].state != 0 ? 1 : 0;
                    this._proAry[i].goToAndStop(prosta);
                }
            }
        };
        MoneyTree.prototype.residueTime = function () {
            if (this.a_times) {
                var viptab = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel());
                this._hastimes = viptab.treeTimes - GuidData.player.getMoneyTreeNum();
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_times.skinName, ColorType.color9a683f + "剩余次数：" + ColorType.Green2ca937 + this._hastimes, 14, TextAlign.CENTER);
            }
        };
        MoneyTree.prototype.drawMoney = function () {
            var aaa = moneytree.MoneyTreeModel.getInstance().getCurVo();
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_money.skinName, "本次可获得" + aaa.money, 14, TextAlign.CENTER, ColorType.Whitefff4d6);
            var str;
            if (aaa.state == 0) {
                UiDraw.clearUI(this.a_cost);
                this.a_txt.x = 456;
                str = ColorType.Green2ca937 + "免费";
                this._canbuy = true;
            }
            else {
                this.a_txt.x = 414;
                str = ColorType.color9a683f + "消耗:";
                this._canbuy = UiDraw.drawRewardIconAndtxt(this.a_cost, aaa.tab.cost[0], true, TextAlign.LEFT, 10);
            }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_txt.skinName, str, 14, TextAlign.CENTER);
        };
        MoneyTree.prototype.rewardClik = function (evt) {
            var $data = evt.target.data;
            if ($data) {
                if ($data.state == 1) {
                    //可以领取
                    NetManager.getInstance().protocolos.get_moneytree_gift($data.tab.id);
                }
                else {
                    //查看奖励信息
                    var $levobj = TableData.getInstance().getData(TableData.tb_moneytree_lv, GuidData.player.getLevel());
                    var reward = $levobj["gift_3"];
                    if ($data.tab.count == 3) {
                        reward = $levobj["gift_1"];
                    }
                    else if ($data.tab.count == 6) {
                        reward = $levobj["gift_2"];
                    }
                    var obj = tb.TB_item_template.get_TB_item_template(reward[0]);
                    var bag = new BagItemData();
                    bag.entryData = obj;
                    var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                    aa.data = bag;
                    aa.buttonType = -1;
                    ModuleEventManager.dispatchEvent(aa);
                }
            }
        };
        MoneyTree.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.c_close:
                    ModuleEventManager.dispatchEvent(new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.HIDE_MoneyTree_EVENT));
                    break;
                case this.a_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var aaa = moneytree.MoneyTreeModel.getInstance().getCurVo();
                    var ary = new Array;
                    if (aaa.state == 0) {
                        ary.push(2);
                        ary.push(0);
                    }
                    else {
                        ary = aaa.tab.cost[0];
                    }
                    costRes(ary, function () {
                        if (_this._hastimes > 0) {
                            NetManager.getInstance().protocolos.use_moneytree();
                        }
                        else {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数不足，提升vip等级可增加每日上限哦", 99);
                        }
                    }, function () {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    });
                    // if (this._canbuy) {
                    //     if (this._hastimes > 0) {
                    //         NetManager.getInstance().protocolos.use_moneytree();
                    //     } else {
                    //         msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数不足，提升vip等级可增加每日上限哦", 99);
                    //     }
                    // } else {
                    //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    // }
                    break;
                default:
                    break;
            }
        };
        MoneyTree.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        };
        MoneyTree.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return MoneyTree;
    }(WindowCentenMin));
    moneytree.MoneyTree = MoneyTree;
})(moneytree || (moneytree = {}));
//# sourceMappingURL=MoneyTree.js.map