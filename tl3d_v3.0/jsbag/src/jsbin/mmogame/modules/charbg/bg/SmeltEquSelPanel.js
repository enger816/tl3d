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
    var SmeltEquSelPanel = /** @class */ (function (_super) {
        __extends(SmeltEquSelPanel, _super);
        function SmeltEquSelPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            return _this;
        }
        SmeltEquSelPanel.prototype.applyLoad = function () {
            this.applyLoadComplete();
        };
        SmeltEquSelPanel.prototype.setUIAtlas = function ($atlas) {
            if (this._slist) {
                return;
            }
            this._slist = new SmeltEquSelList();
            this._slist.init($atlas, this);
            this._baseRender.uiAtlas = $atlas;
            this.addChild(this._baseRender.getComponent("c_title"));
            var ui = this._baseRender.getComponent("t_smelt_sel_lab1");
            LabelTextFont.writeSingleLabel($atlas, ui.skinName, "点击选择想要熔炼的装备", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.addChild(ui);
            ui = this._baseRender.getComponent("t_sure_btn");
            this.addChild(ui);
            ui.addEventListener(InteractiveEvent.Up, this.onSmelt, this);
            this._selLab = this.addChild(this._baseRender.getComponent("t_smelt_sel_lab2"));
        };
        SmeltEquSelPanel.prototype.onSmelt = function ($e) {
            this.hide();
            this.rootPanel.dataShow(this.baseAry);
        };
        SmeltEquSelPanel.prototype.bagDataChg = function () {
            this._slist.refreshData(this.getDataAry());
        };
        SmeltEquSelPanel.prototype.onRemove = function () {
            if (this._slist) {
                this._slist.hide();
            }
        };
        SmeltEquSelPanel.prototype.show = function ($uiatlas, $srcAry, $panel) {
            this.rootPanel = $panel;
            this.setUIAtlas($uiatlas);
            UIManager.getInstance().addUIContainer(this);
            this._slist.show();
            this.baseAry = $srcAry;
            this._slist.refreshData(this.getDataAry());
            this.drawNum();
        };
        SmeltEquSelPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        SmeltEquSelPanel.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        SmeltEquSelPanel.prototype.getDataAry = function () {
            var ary = new Array();
            var bgData = GuidData.bag.getEquBgData();
            for (var i = 0; i < bgData.length; i++) {
                if (bgData[i]) {
                    var data = new SListItemData();
                    data.data = bgData[i];
                    data.id = this.hasData(bgData[i]);
                    ary.push(data);
                }
            }
            this.srcAry = ary;
            return ary;
        };
        SmeltEquSelPanel.prototype.hasData = function ($bd) {
            for (var i = 0; i < this.baseAry.length; i++) {
                if (this.baseAry[i].id == $bd.id) {
                    return 1;
                }
            }
            return 0;
        };
        SmeltEquSelPanel.prototype.setSelItem = function ($sd) {
            if (this.baseAry.length >= 9) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "熔炉已满", 99);
                return false;
            }
            this.baseAry.push($sd.data);
            this.drawNum();
            return true;
        };
        SmeltEquSelPanel.prototype.unSetSelItem = function ($sd) {
            for (var i = 0; i < this.baseAry.length; i++) {
                if (this.baseAry[i].id == $sd.data.id) {
                    this.baseAry.splice(i, 1);
                    break;
                }
            }
            this.drawNum();
            return true;
        };
        SmeltEquSelPanel.prototype.drawNum = function () {
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._selLab.skinName, "已选中:" + this.baseAry.length + "/" + 9, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        return SmeltEquSelPanel;
    }(WindowMinUi));
    charbg.SmeltEquSelPanel = SmeltEquSelPanel;
    var SmeltEquSelList = /** @class */ (function (_super) {
        __extends(SmeltEquSelList, _super);
        function SmeltEquSelList() {
            return _super.call(this) || this;
        }
        SmeltEquSelList.prototype.init = function ($atlas, $selPanel) {
            SmeltEquSelListItemRender.baseAtlas = $atlas;
            this.selPanel = $selPanel;
            this.initData();
            this.bgMask.level = 10;
        };
        SmeltEquSelList.prototype.initData = function () {
            var ary = new Array();
            var w = 480;
            var h = 256;
            this.setData(ary, SmeltEquSelListItemRender, w, h, 100, 90, 3, 512, 512, 5, 6);
            this.center = 5;
            this.middle = -10;
            this.setShowLevel(4);
        };
        SmeltEquSelList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
        };
        SmeltEquSelList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return SmeltEquSelList;
    }(SList));
    charbg.SmeltEquSelList = SmeltEquSelList;
    var SmeltEquSelListItemRender = /** @class */ (function (_super) {
        __extends(SmeltEquSelListItemRender, _super);
        function SmeltEquSelListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ;
        SmeltEquSelListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatSUI($bgRender, SmeltEquSelListItemRender.baseAtlas, "s_item", 0, 0, 68, 68);
            $container.addChild(this._ibg);
            this._ibg.addEventListener(InteractiveEvent.Down, this.onclick, this);
        };
        SmeltEquSelListItemRender.prototype.onclick = function ($e) {
            if (this.itdata && this.itdata.data) {
                if (this.itdata.id == 0) {
                    var tf = this.parentTarget.selPanel.setSelItem(this.itdata);
                    if (tf) {
                        this.itdata.id = 1;
                        this.applyRender();
                    }
                }
                else {
                    this.parentTarget.selPanel.unSetSelItem(this.itdata);
                    this.itdata.id = 0;
                    this.applyRender();
                }
            }
            else {
            }
        };
        SmeltEquSelListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyRender();
            }
            else {
                this.drawNull(this._ibg);
            }
        };
        SmeltEquSelListItemRender.prototype.applyRender = function () {
            if (this.itdata.data) {
                this.drawSel(this._ibg, this.itdata.data.entry, this.itdata.id == 1);
            }
            else {
                this.drawNull(this._ibg);
            }
        };
        SmeltEquSelListItemRender.prototype.drawSel = function ($ui, id, sel) {
            var obj = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon, function ($img) {
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                if (sel) {
                    UiDraw.cxtDrawImg(ctx, PuiData.HASSEL, new Rectangle(0, 20, 68, 27), UIData.publicUi);
                    LabelTextFont.writeSingleLabelToCtx(ctx, "已选择", 14, 0, 22, TextAlign.CENTER, ColorType.Whiteffffff);
                }
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        SmeltEquSelListItemRender.prototype.drawNull = function ($ui) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return SmeltEquSelListItemRender;
    }(SListItem));
    charbg.SmeltEquSelListItemRender = SmeltEquSelListItemRender;
})(charbg || (charbg = {}));
//# sourceMappingURL=SmeltEquSelPanel.js.map