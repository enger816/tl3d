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
var activity;
(function (activity) {
    var RewardVo = /** @class */ (function () {
        function RewardVo() {
        }
        return RewardVo;
    }());
    activity.RewardVo = RewardVo;
    var ActivityUiPanel = /** @class */ (function (_super) {
        __extends(ActivityUiPanel, _super);
        function ActivityUiPanel() {
            var _this = _super.call(this) || this;
            _this._KeyLocation = [225, 361, 495, 630, 765];
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        ActivityUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            if (this.everydayActivityList) {
                this.everydayActivityList.dispose();
                this.everydayActivityList = null;
            }
            if (this._redPointRender) {
                this._redPointRender.dispose();
                this._redPointRender = null;
            }
            _super.prototype.dispose.call(this);
        };
        ActivityUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/activity/activity.xml", "ui/uidata/activity/activity.png", function () { _this.loadConfigCom(); }, "ui/uidata/activity/activitypc.png");
        };
        ActivityUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            var renderLevel = this._baseRender;
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._topRender);
            this.winmidRender.applyObjData();
            this.TabAry = new Array;
            for (var i = 0; i < 2; i++) {
                var b = this.addChild(this._bgRender.getComponent("tab" + i));
                // a.data = SharedDef.MODULE_MIX_STRENGTH + i;
                b.data = activity.ActivityType.DAILY + i;
                b.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(b);
                this._redPointRender.getRedPointUI(this, 129 + i, new Vector2D(b.x + b.width - 5, b.y));
            }
            this._fraary = new Array;
            this._fraary.push(this.addChild(this._topRender.getComponent("a_1_0")));
            this._fraary.push(this.addChild(this._topRender.getComponent("a_1_1")));
            this._fraary.push(this.addChild(this._topRender.getComponent("a_1_2")));
            this._fraary.push(this.addChild(this._topRender.getComponent("a_1_3")));
            this._fraary.push(this.addChild(this._topRender.getComponent("a_1_4")));
            this.addUIList(["a_3", "a_bg", "a_line_bg", "a_line", "a_title", "b_bg"], this._bgRender);
            this.b_time = this.addChild(renderLevel.getComponent("b_time"));
            this.b_btn = this.addEvntButUp("b_btn", renderLevel);
            this.addChild(this._baseRender.getComponent("b_line"));
            this.slistIndex = this.addChild(renderLevel.getComponent("slistIndex"));
            this._Uiary = new Array;
            this.pro_base = this.addChild(renderLevel.getComponent("a_line_base"));
            this.currentNum = this.addChild(renderLevel.getComponent("a_2"));
            var $tabAryReward = tb.TB_activity_reward.get_TB_activity_reward();
            var $num = 0;
            for (var i = 0; i < $tabAryReward.length; i++) {
                var a = this.addChild(renderLevel.getComponent("a_active" + i));
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a.skinName, String($tabAryReward[i].active), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                var flag = false;
                if ($tabAryReward[i].vipreward.length > 0) {
                    flag = true;
                }
                //绘制普通奖励
                var baseui = this.initUI($tabAryReward[i], i * 2, i, false);
                //绘制vip
                if (flag) {
                    var vipui = this.initUI($tabAryReward[i], i * 2 + 1, i, true);
                    //设置位置
                    vipui.x = this._KeyLocation[i] + 51;
                    baseui.x = this._KeyLocation[i];
                }
                else {
                    //没有vip奖励时，居中显示
                    baseui.x = this._KeyLocation[i] + 26;
                }
            }
            this.buildFram();
            this.setProgressAndAchievement(GuidData.instanceData.getActivity());
            this.applyLoadComplete();
        };
        ActivityUiPanel.prototype.initUI = function ($tabvo, $num, $index, $hasvip) {
            var rewardvo = new RewardVo();
            rewardvo.data = $tabvo;
            rewardvo.hasvip = $hasvip;
            rewardvo.index = $index;
            var prop = this.addChild(this._topRender.getComponent("prop_" + $num));
            prop.data = rewardvo;
            prop.addEventListener(InteractiveEvent.Up, this.PropClik, this);
            this._Uiary.push(prop);
            this.Receivereward(prop);
            return prop;
        };
        ActivityUiPanel.prototype.resetRewardState = function () {
            for (var i = 0; i < this._Uiary.length; i++) {
                this.Receivereward(this._Uiary[i]);
            }
            this.playEff();
        };
        ActivityUiPanel.prototype.click = function (evt) {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        };
        ActivityUiPanel.prototype.selectedTab = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            this.showTabPage($value);
        };
        ActivityUiPanel.prototype.showTabPage = function ($type) {
            if (!this.everydayActivityList) {
                this.everydayActivityList = new activity.EverydayActivityList();
                this.everydayActivityList.init(this._baseRender.uiAtlas);
            }
            this.everydayActivityList.show($type);
        };
        ActivityUiPanel.prototype.Receivereward = function ($ui) {
            var $rewardState = GuidData.instanceData.getActivityRewardState();
            var $data = $ui.data;
            if (GuidData.instanceData.getActivity() >= $data.data.active) {
                $data.conditionsok = true;
                if ($data.hasvip) {
                    $data.hasreceive = $rewardState[$data.index * 2 + 1];
                }
                else {
                    $data.hasreceive = $rewardState[$data.index * 2];
                }
            }
            else {
                $data.conditionsok = false;
            }
            $ui.data = $data;
            this.drawProp($ui);
        };
        ActivityUiPanel.prototype.drawProp = function ($ui) {
            var _this = this;
            var $data = $ui.data;
            var icon;
            var rewardnum;
            var $vo;
            if ($data.hasvip) {
                $vo = tb.TB_item_template.get_TB_item_template($data.data.vipreward[0][0]);
                rewardnum = $data.data.vipreward[0][1];
            }
            else {
                $vo = tb.TB_item_template.get_TB_item_template($data.data.reward[0][0]);
                rewardnum = $data.data.reward[0][1];
            }
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(1, 0, 48, 48), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(3, 2, 44, 44), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 5, 4, 40, 40);
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + String(rewardnum), 14, 44, 30, TextAlign.CENTER);
                if ($data.hasvip) {
                    UiDraw.cxtDrawImg(ctx, PuiData.A_V, new Rectangle(5, 29, 22, 19), UIData.publicUi);
                }
                if ($data.conditionsok) {
                    //可领取   
                    if ($data.hasreceive) {
                        //已领取
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 50, 48));
                        var imgUseRect1 = _this._topRender.uiAtlas.getRec("receive");
                        ctx.drawImage(_this._baseRender.uiAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 12, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
                    }
                    else {
                        //未领取
                        // UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(2, 1, 46, 46), UIData.publicUi);
                        if ($data.hasvip) {
                            if (GuidData.player.getIsVIP()) {
                                UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(33, 0, 17, 16), UIData.publicUi);
                            }
                        }
                        else {
                            UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(33, 0, 17, 16), UIData.publicUi);
                        }
                    }
                }
                else {
                    //不可领取
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 50, 48));
                }
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        ActivityUiPanel.prototype.setProgressAndAchievement = function ($num) {
            this.currentAchievementNum($num);
            var anum = $num / this.getTotal();
            this.pro_base.uvScale = anum > 1 ? 1 : anum;
            var tabary = tb.TB_activity_reward.get_TB_activity_reward();
            for (var i = 0; i < this._fraary.length; i++) {
                if ($num < tabary[i].active) {
                    this._fraary[i].goToAndStop(1);
                }
                else {
                    this._fraary[i].goToAndStop(0);
                }
            }
        };
        ActivityUiPanel.prototype.currentAchievementNum = function ($num) {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.currentNum.skinName, $num + "/" + this.getTotal(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        ActivityUiPanel.prototype.getTotal = function () {
            var tabary = tb.TB_activity_reward.get_TB_activity_reward();
            return tabary[tabary.length - 1].active;
        };
        ActivityUiPanel.prototype.buildFram = function () {
            var _this = this;
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, function ($ary) {
                    _this.effAry = $ary;
                    for (var i = 0; i < _this.effAry.length; i++) {
                        _this.effAry[i].x = _this._Uiary[i].x - 20;
                        _this.effAry[i].y = _this._Uiary[i].y - 20;
                        _this.effAry[i].width = _this.effAry[i].baseRec.width * 0.7;
                        _this.effAry[i].height = _this.effAry[i].baseRec.height * 0.7;
                        _this.effAry[i].speed = 3;
                    }
                    _this.playEff();
                }, this._Uiary.length);
            }
        };
        ActivityUiPanel.prototype.playEff = function () {
            if (!this.effAry) {
                return;
            }
            for (var i = 0; i < this._Uiary.length; i++) {
                var vo = this._Uiary[i].data;
                if (vo && vo.conditionsok && !vo.hasreceive) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                }
                else {
                    this.removeChild(this.effAry[i]);
                }
            }
        };
        ActivityUiPanel.prototype.PropClik = function (evt) {
            var $data = evt.target.data;
            if ($data.conditionsok && !$data.hasreceive) {
                //可以领取
                var flag = false;
                if ($data.hasvip && GuidData.player.getIsVIP()) {
                    flag = true;
                }
                else if (!$data.hasvip) {
                    flag = true;
                }
                else {
                    AlertUtil.show("充值vip即可领取", "领取提示", function (a) {
                        if (a == 1) {
                            //购买vip
                            ModulePageManager.openPanel(SharedDef.MODULE_MALL, [2]);
                        }
                    }, 2, ["前往充值", "取消"]);
                }
                if (flag) {
                    // //console.log("领取奖励", $data.index, $data.hasvip);
                    NetManager.getInstance().protocolos.get_activity_reward($data.index + 1, $data.hasvip ? 1 : 0);
                }
            }
            else {
                //查看奖励信息
                var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                if ($data.hasvip) {
                    aa.id = $data.data.vipreward[0][0];
                }
                else {
                    aa.id = $data.data.reward[0][0];
                }
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        ActivityUiPanel.prototype.resetData = function () {
            this.resetRewardState();
            this.setProgressAndAchievement(GuidData.instanceData.getActivity());
            this.refreshTime();
        };
        ActivityUiPanel.prototype.refreshTime = function () {
            var str = "离线挂机时间剩余: " + Math.floor(GuidData.player.getHangUpTime() / 60) + "时" + GuidData.player.getHangUpTime() % 60 + "分";
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_time.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        ActivityUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selectedTab(activity.ActivityType.DAILY);
            this.resetData();
            this.resize();
        };
        ActivityUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.everydayActivityList) {
                this.everydayActivityList.hide();
            }
            ModulePageManager.hideResTittle();
        };
        ActivityUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.everydayActivityList) {
                this.everydayActivityList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x;
                this.everydayActivityList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y;
            }
        };
        ActivityUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.HIDE_ACTIVITY_EVENT));
                    break;
                case this.b_btn:
                    var itemlist = GuidData.bag.getOutLineItemList();
                    if (itemlist.length > 0) {
                        var $e = new activity.ActivityEvent(activity.ActivityEvent.USEEXPCARD_EVENT);
                        $e.data = itemlist[0].id;
                        ModuleEventManager.dispatchEvent($e);
                    }
                    else {
                        AlertUtil.show(ColorType.Brown7a2f21 + "是否跳转至商城购买离线卡？", "", function (val) {
                            if (val == 1) {
                                ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_GOLD, 1]);
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
        };
        return ActivityUiPanel;
    }(WindowUi));
    activity.ActivityUiPanel = ActivityUiPanel;
})(activity || (activity = {}));
//# sourceMappingURL=ActivityUiPanel.js.map