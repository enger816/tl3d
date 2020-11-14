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
var charbg;
(function (charbg) {
    var SmeltEquPanel = /** @class */ (function (_super) {
        __extends(SmeltEquPanel, _super);
        function SmeltEquPanel() {
            var _this = _super.call(this) || this;
            /**
             * 一键熔炼状态获取
             */
            _this._info = "";
            _this.lock = false;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            return _this;
        }
        SmeltEquPanel.prototype.applyLoad = function () {
            this.applyLoadComplete();
        };
        SmeltEquPanel.prototype.setUIAtlas = function ($atlas) {
            if (this._slist) {
                return;
            }
            this._slist = new SmeltEquList();
            this._slist.init($atlas, this);
            this._baseRender.uiAtlas = $atlas;
            this.addChild(this._baseRender.getComponent("b_title"));
            var ui = this._baseRender.getComponent("t_smelt_lab1");
            LabelTextFont.writeSingleLabel($atlas, ui.skinName, "默认保留玩家可使用的最高分装备", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.addChild(ui);
            ui = this._baseRender.getComponent("t_smelt_btn");
            this.addChild(ui);
            ui.addEventListener(InteractiveEvent.Up, this.onSmelt, this);
            this.t_smelt_all_btn = this.addChild(this._baseRender.getComponent("t_smelt_all_btn"));
            this.t_smelt_all_btn.addEventListener(InteractiveEvent.Up, this.onSmeltAll, this);
            this._selLab = this.addChild(this._baseRender.getComponent("t_smelt_lab2"));
        };
        SmeltEquPanel.prototype.onSmeltAll = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            //一键熔炼
            var canplay = this.getsmeltallstate();
            if (canplay) {
                var ary = this.getAllDataAry();
                var str = "";
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i]) {
                        str += (ary[i].pos) + "|";
                    }
                }
                str = str.slice(0, str.length - 1);
                this._slist.playEff();
                TimeUtil.addTimeOut(300, function () {
                    NetManager.getInstance().protocolos.smelting_equip(str);
                });
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this._info + "一键熔炼功能", 99);
            }
        };
        SmeltEquPanel.prototype.getsmeltallstate = function () {
            this._info = "";
            var canplay = false;
            var $smeltobj = TableData.getInstance().getData(TableData.tb_vip_uplev, 3);
            var viplev = $smeltobj["viplev"];
            if (viplev && viplev > 0) {
                //vip需求等级
                if (GuidData.player.getVipLevel() >= viplev) {
                    canplay = true;
                }
                else {
                    this._info = "VIP" + viplev;
                }
            }
            if (!canplay) {
                var rolelev = $smeltobj["rolelev"];
                if (rolelev && rolelev > 0) {
                    //角色需求等级
                    if (GuidData.player.getLevel() >= rolelev) {
                        canplay = true;
                    }
                    else {
                        if (viplev && viplev > 0) {
                            this._info += "或";
                        }
                        this._info += "Lv" + rolelev;
                    }
                }
            }
            this._info += "解锁";
            return canplay;
        };
        SmeltEquPanel.prototype.onSmelt = function ($e) {
            var _this = this;
            if (this.lock) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($e.target);
            UIManager.popClikNameFun("t_smelt_btn");
            var str = "";
            for (var i = 0; i < this.srcAry.length; i++) {
                if (this.srcAry[i].data) {
                    str += (this.srcAry[i].data.pos) + "|";
                }
            }
            str = str.slice(0, str.length - 1);
            //console.log(str);
            this._slist.playEff();
            this.lock = true;
            TimeUtil.addTimeOut(300, function () {
                _this.lock = false;
                NetManager.getInstance().protocolos.smelting_equip(str);
            });
        };
        SmeltEquPanel.prototype.bagDataChg = function () {
            this._slist.refreshData(this.getDataAry());
        };
        SmeltEquPanel.prototype.onRemove = function () {
            if (this._slist) {
                this._slist.hide();
            }
        };
        SmeltEquPanel.prototype.dataShow = function (ary) {
            var dataList = new Array;
            for (var i = 0; i < ary.length; i++) {
                var data = new SListItemData();
                data.data = ary[i];
                data.id = i;
                dataList.push(data);
            }
            for (var i = ary.length; i < 9; i++) {
                var data = new SListItemData();
                data.id = i;
                dataList.push(data);
            }
            this._slist.refreshData(dataList);
            this.srcAry = dataList;
            UIManager.getInstance().addUIContainer(this);
            this._slist.show();
        };
        SmeltEquPanel.prototype.drawBtn = function () {
            var $rec = this.t_smelt_all_btn.uiRender.uiAtlas.getRec(this.t_smelt_all_btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var canplay = this.getsmeltallstate();
            var usemsg = canplay ? "btnbgopen" : "unlockbtnbg";
            var imgUseRect1 = this.t_smelt_all_btn.uiRender.uiAtlas.getRec(usemsg);
            ctx.drawImage(this.t_smelt_all_btn.uiRender.uiAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            if (!canplay) {
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, this._info, 14, $rec.pixelWitdh / 2, ($rec.pixelHeight / 2) - (10), TextAlign.CENTER, ColorType.Whitefffce6);
            }
            this.t_smelt_all_btn.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        SmeltEquPanel.prototype.show = function ($uiatlas) {
            if ($uiatlas === void 0) { $uiatlas = null; }
            this.setUIAtlas($uiatlas);
            UIManager.getInstance().addUIContainer(this);
            this.drawBtn();
            this._slist.show();
            this._slist.refreshData(this.getDataAry());
        };
        SmeltEquPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        SmeltEquPanel.prototype.butClik = function (evt) {
            if (evt.target == this.c_close) {
                UIManager.popClikNameFun("c_close");
                this.hide();
            }
        };
        SmeltEquPanel.prototype.testGender = function ($obj) {
            if ($obj.availableGender) {
                var idx = $obj.availableGender.indexOf(GuidData.player.getCharType());
                return (idx != -1);
            }
            return false;
        };
        SmeltEquPanel.prototype.getDataAry = function () {
            var ary = new Array();
            var bgData = GuidData.bag.getEquBgData();
            for (var i = bgData.length - 1; i >= 0; i--) {
                if (bgData[i]) {
                    if (this.testGender(bgData[i].entryData)) {
                        var equitem = GuidData.bag.getEquByPart(bgData[i].entryData.pos);
                        if (equitem) {
                            if (equitem.data.propData.force < bgData[i].data.propData.force) {
                                continue;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                    var data = new SListItemData();
                    data.data = bgData[i];
                    data.id = i;
                    ary.push(data);
                }
                if (ary.length >= 9) {
                    break;
                }
            }
            for (var i = ary.length; i < 9; i++) {
                var data = new SListItemData();
                data.id = i;
                ary.push(data);
            }
            this.srcAry = ary;
            return ary;
        };
        SmeltEquPanel.prototype.getAllDataAry = function () {
            var ary = new Array();
            var bgData = GuidData.bag.getEquBgData();
            for (var i = bgData.length - 1; i >= 0; i--) {
                if (bgData[i]) {
                    if (this.testGender(bgData[i].entryData)) {
                        var equitem = GuidData.bag.getEquByPart(bgData[i].entryData.pos);
                        if (equitem) {
                            if (equitem.data.propData.force < bgData[i].data.propData.force) {
                                continue;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                    ary.push(bgData[i]);
                }
            }
            return ary;
        };
        SmeltEquPanel.prototype.showEquSel = function () {
            var _this = this;
            if (!this._eqlSelPanel) {
                this._eqlSelPanel = new charbg.SmeltEquSelPanel();
            }
            this.hide();
            this._eqlSelPanel.load(function () {
                var ary = new Array;
                for (var i = 0; i < _this.srcAry.length; i++) {
                    if (_this.srcAry[i].data) {
                        ary.push(_this.srcAry[i].data);
                    }
                }
                _this._eqlSelPanel.show(_this._baseRender.uiAtlas, ary, _this);
            });
        };
        return SmeltEquPanel;
    }(WindowCentenMin));
    charbg.SmeltEquPanel = SmeltEquPanel;
    var SmeltEquList = /** @class */ (function (_super) {
        __extends(SmeltEquList, _super);
        function SmeltEquList() {
            return _super.call(this) || this;
        }
        SmeltEquList.prototype.init = function ($atlas, $sp) {
            this.baseAtlas = $atlas;
            this.smeltPanel = $sp;
            this.initData();
        };
        SmeltEquList.prototype.initData = function () {
            var _this = this;
            var ary = new Array();
            var w = 283;
            var h = 256;
            this.setData(ary, SmeltEquListItemRender, w, h, 100, 90, 3, 256, 256, 3, 3);
            this.center = 5;
            this.middle = -10;
            this.setShowLevel(4);
            this._frameRender = new FrameUIRender();
            this.addRender(this._frameRender);
            this._frameRender.setImg(getEffectUIUrl("ui_rl"), 4, 4, function ($ary) {
                _this.effAry = $ary;
                for (var i = 0; i < _this.effAry.length; i++) {
                    var xNum = i % 3;
                    var yNum = float2int(i / 3);
                    _this.effAry[i].x = -30 + xNum * 100;
                    _this.effAry[i].y = -30 + yNum * 90;
                    _this.effAry[i].speed = 3;
                }
            }, 9);
        };
        SmeltEquList.prototype.playEff = function () {
            if (!this.effAry) {
                return;
            }
            for (var i = 0; i < this._dataAry.length; i++) {
                if (this._dataAry[i].data) {
                    this.effAry[i].playOne(this);
                }
            }
        };
        SmeltEquList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
        };
        SmeltEquList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return SmeltEquList;
    }(SList));
    charbg.SmeltEquList = SmeltEquList;
    var SmeltEquListItemRender = /** @class */ (function (_super) {
        __extends(SmeltEquListItemRender, _super);
        function SmeltEquListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SmeltEquListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "s_item", 0, 0, 68, 68);
            $container.addChild(this._ibg);
            this._ibg.addEventListener(InteractiveEvent.Down, this.onclick, this);
        };
        SmeltEquListItemRender.prototype.onclick = function ($e) {
            if (this.itdata.data) {
                this.itdata.data = null;
                this.applyRender();
            }
            else {
                this.parentTarget.smeltPanel.showEquSel();
            }
        };
        SmeltEquListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyRender();
            }
        };
        SmeltEquListItemRender.prototype.applyRender = function () {
            if (this.itdata.data) {
                IconManager.getInstance().drawItemIcon60(this._ibg, this.itdata.data.entry, 1, false, false);
            }
            else {
                this.drawNull(this._ibg);
            }
        };
        SmeltEquListItemRender.prototype.drawNull = function ($ui) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            UiDraw.cxtDrawImg(ctx, PuiData.ADDITEM, new Rectangle(16, 16, 35, 35), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return SmeltEquListItemRender;
    }(SListItem));
    charbg.SmeltEquListItemRender = SmeltEquListItemRender;
})(charbg || (charbg = {}));
//# sourceMappingURL=SmeltEquPanel.js.map