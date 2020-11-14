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
var warehousetreasure;
(function (warehousetreasure) {
    var TreasurePanel = /** @class */ (function (_super) {
        __extends(TreasurePanel, _super);
        function TreasurePanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        TreasurePanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._midRender.dispose();
            this._midRender = null;
            //if (this.treasureList) {
            //    this.treasureList.dispose();
            //    this.treasureList = null;
            //}
        };
        TreasurePanel.prototype.initUiAtlas = function ($uiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            var renderLevel = this._topRender;
            //this.treasureList = new TreasureList();
            //this.treasureList.init($uiAtlas);
            this.initView(renderLevel);
        };
        // private a_txt_bg_1:UICompenent
        TreasurePanel.prototype.initView = function (renderLevel) {
            var renderLevel = this._topRender;
            this.addRoundBg();
            this.a_add_label_num_0 = this.addChild(this._midRender.getComponent("a_add_label_num_0"));
            this.a_add_label_num_1 = this.addChild(this._midRender.getComponent("a_add_label_num_1"));
            var $tabelary = tb.Tb_faction_donation.get_Tb_faction_donation();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_add_label_num_0.skinName, ColorType.color9a683f + "增加贡献" + $tabelary[0].devote[1], 14, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_add_label_num_1.skinName, ColorType.color9a683f + "增加贡献" + $tabelary[1].devote[1], 14, TextAlign.CENTER);
            this.a_duihuanIcon = this.addChild(this._topRender.getComponent("a_duihuanIcon"));
            //捐献种类  1：银币  2：元宝  和配表相符
            this.b_yinbijx = this.addEvntButUp("b_yinbi", this._midRender);
            this.b_yinbijx.data = 1;
            this.b_yuanbaojx = this.addEvntButUp("b_yuanbao", this._midRender);
            this.b_yuanbaojx.data = 2;
            this.addChild(this._midRender.getComponent("a_shenyu_label_txt0"));
            this.addChild(this._midRender.getComponent("a_shenyu_label_txt1"));
            var a_shenyu_label_txt2 = this.addChild(this._midRender.getComponent("a_shenyu_label_txt2"));
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a_shenyu_label_txt2.skinName, ColorType.Orange853d07 + "剩余次数:", 14, TextAlign.CENTER);
            this.a_duihuan_txt = this.addChild(this._midRender.getComponent("a_duihuan_txt"));
            this.a_yuanbao_need_num = this.addChild(this._midRender.getComponent("a_yuanbao_need_num"));
            this.a_yinbi_need_num = this.addChild(this._midRender.getComponent("a_yinbi_need_num"));
            this.a_yinbi_can_num = this.addChild(this._midRender.getComponent("a_yinbi_can_num"));
            this.a_yuanbao_can_num = this.addChild(this._midRender.getComponent("a_yuanbao_can_num"));
            this.a_duanhuan_need_num = this.addChild(this._midRender.getComponent("a_duanhuan_need_num"));
            this.a_duanhuan_has_num = this.addChild(this._midRender.getComponent("a_duanhuan_has_num"));
            this.addChild(this._midRender.getComponent("a_txt2"));
            this.addChild(this._midRender.getComponent("a_txt3"));
            this.a_duanhuan_but = this.addEvntButUp("a_duanhuan_but", this._topRender);
        };
        TreasurePanel.prototype.addRoundBg = function () {
            var a_duihuan_round_bg0 = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg0"));
            var a_duihuan_round_bg1 = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg1"));
            var a_duihuan_round_bg2 = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg2"));
            var a_duihuan_round_bg3 = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg3"));
            a_duihuan_round_bg0.isU = true;
            a_duihuan_round_bg0.isV = true;
            a_duihuan_round_bg1.isV = true;
            a_duihuan_round_bg2.isU = true;
            this._bottomRender.applyObjData();
        };
        TreasurePanel.prototype.refreshFactionMoney = function () {
            var $tabelary = tb.Tb_faction_donation.get_Tb_faction_donation();
            //LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yinbi_need_num.skinName, ColorType.Orange + String($tabelary[0].devote), 14, TextAlign.CENTER)
            //LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yuanbao_need_num.skinName, ColorType.Orange + $tabelary[0].cost[0][1], 14, TextAlign.CENTER)
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_yinbi_need_num.skinName, $tabelary[0].cost[0], ColorType.Orange853d07, 118, 20);
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_yuanbao_need_num.skinName, $tabelary[1].cost[0], ColorType.Orange853d07, 118, 20);
        };
        TreasurePanel.prototype.setdonationByYinBiTimes = function () {
            var $viplev = GuidData.player.getVipLevel();
            var $tabelvo = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (GuidData.player.getIsVIP()) {
                var tabeldata = tb.TB_vip_base.get_TB_vip_baseById($viplev);
                this._totalYinBi = $tabelvo.golddonation + tabeldata.factiondonation;
            }
            else {
                this._totalYinBi = $tabelvo.golddonation;
            }
            this._residueTimesYinBi = this._totalYinBi - GuidData.faction.goldDonation;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yinbi_can_num.skinName, ColorType.Green2ca937 + this._residueTimesYinBi + "/" + this._totalYinBi, 14, TextAlign.CENTER);
        };
        TreasurePanel.prototype.setdonationByYuanBaoTimes = function () {
            var $viplev = GuidData.player.getVipLevel();
            var $tabelvo = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (GuidData.player.getIsVIP()) {
                var tabeldata = tb.TB_vip_base.get_TB_vip_baseById($viplev);
                this._totalYuanBao = $tabelvo.ybdonation + tabeldata.factionybdonation;
            }
            else {
                this._totalYuanBao = $tabelvo.ybdonation;
            }
            this._residueTimesYuanBao = this._totalYuanBao - GuidData.faction.ybDonation;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yuanbao_can_num.skinName, ColorType.Green2ca937 + this._residueTimesYuanBao + "/" + this._totalYuanBao, 14, TextAlign.CENTER);
        };
        TreasurePanel.prototype.refrishDuiHuanTxt = function () {
            var $tb = faction.FactionBuildModel.getInstance().getTabvo(2);
            //console.log($tb);
            var $num = GuidData.player.getPlayerIntFiledFactionDonateGiftExchangeDailyCount();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_duihuan_txt.skinName, ColorType.Green2ca937 + $num + "/" + $tb.params[1], 16);
            // UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_duihuan_txt.skinName, [String(-1), $num + "/" + $tb.params[0]], ColorType.Orange853d07);
            var $aColor = GuidData.player.getResType(6) >= $tb.params[3] ? ColorType.Orange853d07 : ColorType.colorce0a00;
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_duanhuan_need_num.skinName, [String($tb.params[4]), String($tb.params[3])], $aColor, 118, 20);
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_duanhuan_has_num.skinName, [String($tb.params[4]), String(GuidData.player.getResType(6))], ColorType.Brown7a2f21, 118, 20);
            IconManager.getInstance().drawItemIcon60(this.a_duihuanIcon, $tb.params[2]);
        };
        TreasurePanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshFactionMoney();
                this.setdonationByYinBiTimes();
                this.setdonationByYuanBaoTimes();
                this.refrishDuiHuanTxt();
            }
        };
        TreasurePanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        TreasurePanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.b_yinbijx:
                case this.b_yuanbaojx:
                    var residueTimes;
                    if (evt.target.data == 1) {
                        //银币
                        residueTimes = this._residueTimesYinBi;
                        this.showDuihuanYinbiPanel();
                        return;
                    }
                    else {
                        //元宝
                        residueTimes = this._residueTimesYuanBao;
                        this.showDuihuanYanBaoPanel();
                    }
                    if (residueTimes < 1) {
                        msgtip.MsgTipManager.outStrById(22, 19);
                        return;
                    }
                    var $donationEvent = new donation.DonationEvent(donation.DonationEvent.SHOW_DONATION_PANEL);
                    $donationEvent.data = evt.target.data;
                    ModuleEventManager.dispatchEvent($donationEvent);
                    break;
                case this.a_duanhuan_but:
                    this.showDuihuanPanel();
                    break;
                default:
                    break;
            }
        };
        TreasurePanel.prototype.showDuihuanYinbiPanel = function () {
            var $tb = tb.Tb_faction_donation.get_Tb_faction_donationById(1);
            var $evt = new duihuan.DuiHuanEvent(duihuan.DuiHuanEvent.SHOW_DUIHUAN_PANEL);
            $evt.UseResType = $tb.cost[0][0];
            $evt.tittleid = 1;
            $evt.MaxSelectNum = this._residueTimesYinBi;
            $evt.UnitPrice = $tb.cost[0][1];
            $evt.SubmitFun = function (value) {
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 1, value, "", "");
            };
            ModuleEventManager.dispatchEvent($evt);
        };
        TreasurePanel.prototype.showDuihuanYanBaoPanel = function () {
            var $tb = tb.Tb_faction_donation.get_Tb_faction_donationById(2);
            var $evt = new duihuan.DuiHuanEvent(duihuan.DuiHuanEvent.SHOW_DUIHUAN_PANEL);
            $evt.UseResType = $tb.cost[0][0];
            $evt.tittleid = 0;
            $evt.MaxSelectNum = this._residueTimesYuanBao;
            $evt.UnitPrice = $tb.cost[0][1];
            $evt.SubmitFun = function (value) {
                //  NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 1, value, "", "");
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 2, value, "", "");
            };
            ModuleEventManager.dispatchEvent($evt);
        };
        TreasurePanel.prototype.showDuihuanPanel = function () {
            var $tb = faction.FactionBuildModel.getInstance().getTabvo(2);
            var $num = GuidData.player.getPlayerIntFiledFactionDonateGiftExchangeDailyCount();
            if (GuidData.player.getResType(6) >= $tb.params[3]) {
                if (($tb.params[1] - $num) > 0) {
                    var $evt = new duihuan.DuiHuanEvent(duihuan.DuiHuanEvent.SHOW_DUIHUAN_PANEL);
                    $evt.UseResType = 6;
                    $evt.tittleid = 2;
                    $evt.MaxSelectNum = $tb.params[1] - $num;
                    $evt.UnitPrice = $tb.params[3];
                    // $evt.SubmitFun = (value: number) => { this.clikDuanFunction(value) }
                    $evt.SubmitFun = function (value) {
                        NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_DONATE_GIFT_EXCHANGE, value, 0, "", "");
                    };
                    ModuleEventManager.dispatchEvent($evt);
                }
                else {
                    msgtip.MsgTipManager.outStr("[ff0000]今日已全部兑换", 99);
                }
            }
            else {
                // msgtip.MsgTipManager.outStr("[ff0000]拥有的贡献不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = 6;
                ModuleEventManager.dispatchEvent($aaa);
            }
        };
        TreasurePanel.prototype.getListItem = function () {
            var $ary = this.getDataEventList();
            var $sListItemData = this.getData($ary);
            return $sListItemData;
        };
        TreasurePanel.prototype.getDataEventList = function () {
            var $ary = GuidData.faction.getEventList();
            var flag = GuidData.faction.getEventFlag();
            var list = new Array;
            for (var i = flag; i < $ary.length; i++) {
                list.push($ary[i]);
            }
            for (var i = 0; i < flag; i++) {
                list.push($ary[i]);
            }
            return list;
        };
        TreasurePanel.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = $ary.length - 1; i >= 0; i--) {
                var item = new SListItemData;
                item.data = this.getToStr($ary[i]);
                item.id = ary.length;
                ary.push(item);
            }
            return ary;
        };
        TreasurePanel.prototype.getToStr = function ($vo) {
            var $ybstr = ($vo.type == 2 ? "元宝" : "银币");
            var tabelvo = tb.Tb_faction_donation.get_Tb_faction_donationById($vo.type);
            var num = tabelvo.money * $vo.value;
            var $str = "[]" + getBaseName($vo.name) + "使用" + ColorType.Green56da35 + $ybstr + "[]捐献了" + ColorType.Green56da35 + $vo.value + "[]次,家族资金增加了" + ColorType.Green56da35 + num;
            return $str;
        };
        return TreasurePanel;
    }(UIVirtualContainer));
    warehousetreasure.TreasurePanel = TreasurePanel;
})(warehousetreasure || (warehousetreasure = {}));
//# sourceMappingURL=TreasurePanel.js.map