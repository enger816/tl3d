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
var faction;
(function (faction) {
    var AppointmentPanel = /** @class */ (function (_super) {
        __extends(AppointmentPanel, _super);
        function AppointmentPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            //添加好友面板渲染器
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.cellMask = new UIMask();
            _this.cellMask.x = 298;
            _this.cellMask.y = 133;
            _this.cellMask.width = 365;
            _this.cellMask.height = 290;
            _this.addMask(_this.cellMask);
            //this._bottomRender.mask = this.cellMask;
            _this._midRender.mask = _this.cellMask;
            _this._topRender.mask = _this.cellMask;
            return _this;
        }
        AppointmentPanel.prototype.dispose = function () {
            if (this.cellMask) {
                this.cellMask.dispose();
                this.cellMask = null;
            }
            if (this._bottomRender) {
                this._bottomRender.dispose();
                this._bottomRender = null;
            }
            if (this._midRender) {
                this._midRender.dispose();
                this._midRender = null;
            }
            if (this._topRender) {
                this._topRender.dispose();
                this._topRender = null;
            }
            _super.prototype.dispose.call(this);
        };
        AppointmentPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.setInfo("ui/uidata/faction/zhiwu/appointments.xml", "ui/uidata/faction/zhiwu/appointments.png", function () { _this.loadConfigCom(); });
        };
        AppointmentPanel.prototype.loadConfigCom = function () {
            this.moveCellUi = new Array();
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this.addChild(this._topRender.getComponent("a_57"));
            this.b_btnbg_agree = this.addEvntButUp("cnew_but_yes", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_agree, "b_btnbg_agree", this._midRender);
            this.addUIList(["line_2_10", "line_2_11", "line_2_12", "line_5", "line_6", "a_46", "a_44", "a_45", "a_47", "a_43"], this._bottomRender);
            this.moveCellUi = this.moveCellUi.concat(this.addUIList(["downbg1", "downbg2", "downbg3"], this._bottomRender));
            this.moveCellUi = this.moveCellUi.concat(this.addUIList(["a_38", "a_40", "a_42", "a_39", "a_41"], this._topRender));
            this._rewardary = new Array;
            this._permissionsary = new Array;
            this._numary = new Array;
            this._selectbtnary = new Array;
            var $tabelary = tb.Tb_faction_zhiwei.get_Tb_faction_zhiwei();
            for (var i = 0; i < 3; i++) {
                var aa = this.addChild(this._topRender.getComponent("personreward_" + i));
                aa.addEventListener(InteractiveEvent.Up, this.RewardClik, this);
                aa.data = $tabelary[i].reward;
                this.drawReward(aa.skinName, $tabelary[i].reward);
                this._rewardary.push(aa);
            }
            for (var i = 0; i < 5; i++) {
                var aa = this.addChild(this._topRender.getComponent("personInfo_" + i));
                this._permissionsary.push(aa);
            }
            for (var i = 0; i < 4; i++) {
                this._numary.push(this.addChild(this._topRender.getComponent("personNum_" + i)));
            }
            this.b_select_0 = this.addEvntBut("b_select_0", this._topRender);
            this.b_select_0.data = 0;
            this._selectbtnary.push(this.b_select_0);
            this.b_select_1 = this.addEvntBut("b_select_1", this._topRender);
            this.b_select_1.data = 1;
            this._selectbtnary.push(this.b_select_1);
            this.b_select_2 = this.addEvntBut("b_select_2", this._topRender);
            this.b_select_2.data = 2;
            this._selectbtnary.push(this.b_select_2);
            this.b_select_3 = this.addEvntBut("b_select_3", this._topRender);
            this.b_select_3.data = 3;
            this._selectbtnary.push(this.b_select_3);
            this.b_select_4 = this.addEvntBut("b_select_4", this._topRender);
            this.b_select_4.data = 4;
            this._selectbtnary.push(this.b_select_4);
            this.initBasePos();
            this.applyLoadComplete();
        };
        AppointmentPanel.prototype.initBasePos = function () {
            this.moveCellUi = this.moveCellUi.concat(this._rewardary);
            this.moveCellUi = this.moveCellUi.concat(this._permissionsary);
            this.moveCellUi = this.moveCellUi.concat(this._numary);
            this.moveCellUi = this.moveCellUi.concat(this._selectbtnary);
            this.baseKeyDic = new Object;
            for (var i = 0; i < this.moveCellUi.length; i++) {
                this.baseKeyDic[this.moveCellUi[i].name] = this.moveCellUi[i].y;
            }
        };
        /**
         * 物品奖励框事件回调
         */
        AppointmentPanel.prototype.RewardClik = function (evt) {
            var x = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
            x.id = evt.target.data;
            ModuleEventManager.dispatchEvent(x);
        };
        AppointmentPanel.prototype.drawReward = function ($key, $propid) {
            var _this = this;
            var propvo = TableData.getInstance().getData(TableData.tb_item_template, $propid);
            IconManager.getInstance().getIcon(geteqiconIconUrl(String(propvo.icon)), function ($img) {
                var $rec = _this._topRender.uiAtlas.getRec($key);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 46, 46), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, 60, 60, 3, 3, 40, 40);
                _this._topRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        /**
         * 根据职位返回该职位被任命的人数
         */
        AppointmentPanel.prototype.getNum = function ($identity) {
            var ary = GuidData.faction.getFactionList();
            var num = 0;
            //族长
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].identity == $identity) {
                    num++;
                }
            }
            return num;
        };
        AppointmentPanel.prototype.SelectThisBtn = function ($identity) {
            //console.log($identity)
            for (var i = 0; i < this._selectbtnary.length; i++) {
                var flag = false;
                if (i == $identity) {
                    flag = true;
                }
                this._selectbtnary[i].selected = flag;
            }
        };
        AppointmentPanel.prototype.initData = function () {
            this._currentSelect = this._data.factionItemData.identity - 1;
            this.SelectThisBtn(this._data.factionItemData.identity - 1);
            for (var i = 0; i < this._numary.length; i++) {
                var ui = this._numary[i];
                var tabelvo = tb.Tb_faction_zhiwei.get_Tb_faction_zhiweiById(i + 1);
                var $numstring = this.getNum(i + 1) + "/" + tabelvo.num;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, ui.skinName, $numstring, 16, TextAlign.CENTER, ColorType.Orange853d07);
                // ArtFont.getInstance().writeFontToSkinName(this._AtopRender2.uiAtlas, ui.skinName, $numstring, ArtFont.num10, TextAlign.CENTER)
            }
            this.changePostion();
        };
        AppointmentPanel.prototype.changePostion = function () {
            var ty = 0;
            switch (GuidData.faction.playerIdentity) {
                case 1:
                    ty = 0;
                    break;
                case 2:
                    ty = 78;
                    break;
                case 3:
                    ty = 78 + 60;
                    break;
                case 4:
                    ty = 0;
                    break;
                default:
                    ty = 0;
                    break;
            }
            for (var i = 0; i < this.moveCellUi.length; i++) {
                this.moveCellUi[i].y = this.baseKeyDic[this.moveCellUi[i].name] - ty;
            }
        };
        AppointmentPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        AppointmentPanel.prototype.show = function ($data) {
            this._data = $data.data;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.initData();
        };
        AppointmentPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        AppointmentPanel.prototype.backFun = function (a) {
            if (a == 1) {
                NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_APPOINT, 1, 0, this._data.factionItemData.guid, "");
                this.hide();
            }
        };
        AppointmentPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.b_btnbg_agree:
                    var tabelvo = tb.Tb_faction_zhiwei.get_Tb_faction_zhiweiById(this._currentSelect + 1);
                    if (this._currentSelect == 0) {
                        AlertUtil.show("您将进行族长转移，是否确认此操作？", "提示", function (a) { _this.backFun(a); });
                    }
                    else if (this._currentSelect == (this._data.factionItemData.identity - 1)) {
                        //无变化时
                        this.hide();
                    }
                    else if (this.getNum(this._currentSelect + 1) < tabelvo.num) {
                        NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_APPOINT, (this._currentSelect + 1), 0, this._data.factionItemData.guid, "");
                        this.hide();
                    }
                    else if (this.getNum(this._currentSelect + 1) >= tabelvo.num) {
                        msgtip.MsgTipManager.outStrById(22, 15);
                    }
                    break;
                case this.b_select_0:
                case this.b_select_1:
                case this.b_select_2:
                case this.b_select_3:
                case this.b_select_4:
                    this._currentSelect = evt.target.data;
                    this.SelectThisBtn(evt.target.data);
                    break;
                case this.c_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        return AppointmentPanel;
    }(WindowCentenMin));
    faction.AppointmentPanel = AppointmentPanel;
})(faction || (faction = {}));
//# sourceMappingURL=AppointmentPanel.js.map