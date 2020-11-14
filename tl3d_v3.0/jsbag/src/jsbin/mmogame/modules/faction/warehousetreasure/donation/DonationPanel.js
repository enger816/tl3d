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
var donation;
(function (donation) {
    var DonationPanel = /** @class */ (function (_super) {
        __extends(DonationPanel, _super);
        function DonationPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            //控件a_17的偏移量
            _this._tx1 = 10;
            //控件b_txt的偏移量
            _this._tx2 = 4;
            _this._lastMouseX = 0;
            _this._lastMcX = 0;
            _this._percentage = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            //添加好友面板渲染器
            _this._AbgRender = new UIRenderComponent;
            _this.addRender(_this._AbgRender);
            _this._AbottomRender = new UIRenderComponent;
            _this.addRender(_this._AbottomRender);
            _this._AbaseRender = new UIRenderComponent;
            _this.addRender(_this._AbaseRender);
            _this._AtopRender1 = new UIRenderComponent;
            _this.addRender(_this._AtopRender1);
            _this._AtopRender2 = new UIRenderComponent;
            _this.addRender(_this._AtopRender2);
            _this._AtopRender3 = new UIRenderComponent;
            _this.addRender(_this._AtopRender3);
            return _this;
        }
        DonationPanel.prototype.dispose = function () {
            this._AbgRender.dispose();
            this._AbgRender = null;
            this._AbottomRender.dispose();
            this._AbottomRender = null;
            this._AbaseRender.dispose();
            this._AbaseRender = null;
            this._AtopRender1.dispose();
            this._AtopRender1 = null;
            this._AtopRender2.dispose();
            this._AtopRender2 = null;
            this._AtopRender3.dispose();
            this._AtopRender3 = null;
        };
        DonationPanel.prototype.applyLoad = function () {
            var _this = this;
            this._AbgRender.uiAtlas = new UIAtlas;
            this._AbgRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/donation/donation.xml", "ui/uidata/faction/warehousetreasure/donation/donation.png", function () { _this.loadUiatalsFinsish(); }, "ui/uidata/faction/warehousetreasure/warehouseuse.png");
        };
        DonationPanel.prototype.loadUiatalsFinsish = function () {
            this.init(this._AbgRender.uiAtlas);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        DonationPanel.prototype.init = function ($uiAtlas) {
            this._AbgRender.uiAtlas = $uiAtlas;
            this._AbottomRender.uiAtlas = $uiAtlas;
            this._AbaseRender.uiAtlas = $uiAtlas;
            this._AtopRender1.uiAtlas = $uiAtlas;
            this._AtopRender2.uiAtlas = $uiAtlas;
            this._AtopRender3.uiAtlas = $uiAtlas;
            this.loadConfigCom();
        };
        DonationPanel.prototype.loadConfigCom = function () {
            var renderLevel = this._AtopRender1;
            this.addChild(this._AbottomRender.getComponent("g_bg_9"));
            this.addChild(this._AbaseRender.getComponent("g_bg_10"));
            this.b_bg9_1 = this.addEvntBut("b_bg9_1", this._AbgRender);
            this.addUIList(["a_21_2", "a_59", "a_71", "a_72", "a8_51", "a8_34"], this._AtopRender1);
            this.needcost = this.addChild(this._AtopRender1.getComponent("a_74"));
            this.mymoney = this.addChild(this._AtopRender1.getComponent("a_75"));
            this.minTimes = this.addChild(this._AtopRender1.getComponent("a_35_1"));
            this.maxTimes = this.addChild(this._AtopRender1.getComponent("a_36_1"));
            this.otherTimes = this.addChild(this._AtopRender1.getComponent("a_73"));
            this.a_26_1 = this.addChild(this._AtopRender2.getComponent("a_26_1"));
            this.a_27_1 = this.addChild(this._AtopRender1.getComponent("a_27_1"));
            this.a_25_1 = this.addEvntBut("a_25_1", this._AtopRender3);
            this.a_33_1 = this.addChild(this._AtopRender2.getComponent("a_33_1"));
            this.a_32_1 = this.addChild(this._AtopRender2.getComponent("a_32_1"));
            this.b_btn8bg_qr = this.addEvntBut("b_btn8bg_qr", this._AbaseRender);
            this.b_btn8bg_qx = this.addEvntBut("b_btn8bg_qx", this._AbaseRender);
            this.b_close4 = this.addEvntBut("b_close4", this._AbaseRender);
            this.f_1 = this.addChild(this._AtopRender1.getComponent("f_1"));
        };
        DonationPanel.prototype.initData = function () {
            this._tabelary = tb.Tb_faction_donation.get_Tb_faction_donation();
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender1.uiAtlas, this.minTimes.skinName, String(1), ArtFont.num10, TextAlign.CENTER);
            this.setMyMoney();
            var $tabelvo = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (this._type == 1) {
                //银币
                this.f_1.goToAndStop(1);
            }
            else {
                //元宝
                this.f_1.goToAndStop(0);
            }
            var residueTimes = this.getresidueTimes(this._type);
            //设置剩余次数
            this.setMaxTimes(residueTimes);
            this._currentYB = 1;
            this._percentage = 0;
            this.drawProbar(this._percentage);
            this.setPercentage(this._currentYB);
            this.setcoordinates();
            this.setNeedCost();
            this.resize();
        };
        DonationPanel.prototype.setMyMoney = function () {
            var mymoney = this.getMyMoney();
            var aaa = this._type == 1 ? 3 : 1;
            UiDraw.drawRewardIconAndtxt(this.mymoney, [aaa, mymoney], false, TextAlign.LEFT);
        };
        DonationPanel.prototype.setNeedCost = function () {
            var num;
            if (this._type == 1) {
                num = this._currentYB * this._tabelary[0].cost[0][1];
            }
            else {
                num = this._currentYB * this._tabelary[1].cost[0][1];
            }
            this._needCost = num;
            var aaa = this._type == 1 ? 3 : 1;
            UiDraw.drawRewardIconAndtxt(this.needcost, [aaa, num], false, TextAlign.LEFT);
        };
        DonationPanel.prototype.getresidueTimes = function ($type) {
            var $total;
            var $viplev = GuidData.player.getVipLevel();
            var $tabelvo = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            var $basenum;
            var $useTimes;
            if ($type == 1) {
                //银币
                $basenum = $tabelvo.golddonation;
                $useTimes = GuidData.faction.goldDonation;
            }
            else {
                //元宝
                $basenum = $tabelvo.ybdonation;
                $useTimes = GuidData.faction.ybDonation;
            }
            if (GuidData.player.getIsVIP()) {
                var tabeldata = tb.TB_vip_base.get_TB_vip_baseById($viplev);
                var currenttype = $type == 1 ? tabeldata.factiondonation : tabeldata.factionybdonation;
                $total = $basenum + currenttype;
            }
            else {
                $total = $basenum;
            }
            return ($total - $useTimes);
        };
        DonationPanel.prototype.setMaxTimes = function ($num) {
            // if ($num == -1) {
            //     $num = this.getresidueTimes(this._type);
            // }
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender1.uiAtlas, this.maxTimes.skinName, String($num), ArtFont.num10, TextAlign.CENTER);
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender1.uiAtlas, this.otherTimes.skinName, String($num), ArtFont.num10, TextAlign.CENTER);
        };
        DonationPanel.prototype.resize = function () {
            this.b_bg9_1.top = 0;
            this.b_bg9_1.left = 0;
            this.b_bg9_1.y = 0;
            this.b_bg9_1.x = 0;
            this.b_bg9_1.height = Scene_data.stageHeight / UIData.Scale;
            this.b_bg9_1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        DonationPanel.prototype.show = function ($data) {
            this._type = $data;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.initData();
                //console.log("添加到舞台上来")
            }
        };
        DonationPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        DonationPanel.prototype.setcoordinates = function () {
            //最大宽度
            var $w2 = this.a_27_1.width - this.a_25_1.width;
            this.a_25_1.x = this._percentage * $w2 + this.a_27_1.x;
            this.a_32_1.x = this.a_25_1.x - this._tx1;
            this.a_33_1.x = this.a_25_1.x - this._tx2;
        };
        DonationPanel.prototype.A_left_bg_MouseDown = function (evt) {
            this._lastMouseX = evt.x;
            this._lastMcX = this.a_25_1.x;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        DonationPanel.prototype.A_left_bg_MouseMove = function (evt) {
            //移动的时候重绘圆形的坐标，但是要判断其是否超出范围
            //起始位置
            var $posx = this.a_27_1.x;
            //终点位置
            var $disx = this.a_27_1.x + this.a_27_1.width - this.a_25_1.width;
            //按钮当前位置
            var $distion = this._lastMcX + (evt.x - this._lastMouseX) / UIData.Scale;
            //最大宽度
            var $w2 = this.a_27_1.width - this.a_25_1.width;
            if ($disx > $distion
                && $posx < $distion) {
                this.a_25_1.x = $distion;
                this.a_32_1.x = $distion - this._tx1;
                this.a_33_1.x = $distion - this._tx2;
            }
            else {
                if (this.a_25_1.x < $posx) {
                    this.a_25_1.x = $posx;
                    this.a_32_1.x = $posx - this._tx1;
                    this.a_33_1.x = $posx - this._tx2;
                }
                if (this.a_25_1.x > $disx) {
                    this.a_25_1.x = $disx;
                    this.a_32_1.x = $disx - this._tx1;
                    this.a_33_1.x = $disx - this._tx2;
                }
            }
            var residueTimes = this.getresidueTimes(this._type);
            //绘制进度
            this._percentage = (this.a_25_1.x - this.a_27_1.x) / $w2;
            this.drawProbar(this._percentage);
            this._currentYB = Math.ceil(this._percentage * residueTimes);
            this.setPercentage(this._currentYB);
            this.setNeedCost();
        };
        DonationPanel.prototype.drawProbar = function ($ratio) {
            var $rec = this._AtopRender2.uiAtlas.getRec(this.a_26_1.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var progress_bar = this._AtopRender2.uiAtlas.getRec("progress_bar");
            ctx.drawImage(this._AtopRender2.uiAtlas.useImg, progress_bar.pixelX, progress_bar.pixelY, progress_bar.pixelWitdh * $ratio, progress_bar.pixelHeight, 0, 0, 329 * $ratio, 11);
            this._AtopRender2.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        DonationPanel.prototype.A_left_bg_MouseUp = function (evt) {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        DonationPanel.prototype.setPercentage = function ($num) {
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender2.uiAtlas, this.a_33_1.skinName, String($num), ArtFont.num3, TextAlign.CENTER);
        };
        DonationPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_25_1:
                    //拖动条事件
                    this.A_left_bg_MouseDown(evt);
                    break;
                case this.b_close4:
                case this.b_btn8bg_qx:
                    this.hide();
                    break;
                case this.b_bg9_1:
                    break;
                case this.b_btn8bg_qr:
                    if (this._needCost > this.getMyMoney()) {
                        msgtip.MsgTipManager.outStrById(22, 29);
                        return;
                    }
                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, this._type, this._currentYB, "", "");
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        DonationPanel.prototype.getMyMoney = function () {
            var mymoney;
            if (this._type == 1) {
                mymoney = GuidData.player.getSilver();
            }
            else {
                mymoney = GuidData.player.getGoldIngot();
            }
            return mymoney;
        };
        return DonationPanel;
    }(UIPanel));
    donation.DonationPanel = DonationPanel;
})(donation || (donation = {}));
//# sourceMappingURL=DonationPanel.js.map