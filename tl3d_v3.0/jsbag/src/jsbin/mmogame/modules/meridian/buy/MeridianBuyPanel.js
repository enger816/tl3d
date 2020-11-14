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
var meridian;
(function (meridian) {
    var MeridianBuyListRender = /** @class */ (function (_super) {
        __extends(MeridianBuyListRender, _super);
        function MeridianBuyListRender() {
            //public static baseAtlas: UIAtlas;
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._canclick = true;
            return _this;
        }
        MeridianBuyListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.BUY_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "BUY_BG", 0, 5, 560, 100 - 10, 10, 10);
            $container.addChild(this.BUY_BG);
            this.BUY_ICON = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_ICON", 15, 15, 68, 68);
            $container.addChild(this.BUY_ICON);
            this.BUY_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_NAME", 90, 23, 80, 18);
            $container.addChild(this.BUY_NAME);
            this.BUY_GET_RES = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_GET_RES", 90, 55, 200, 18);
            $container.addChild(this.BUY_GET_RES);
            this.BUY_HAS_RES = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_HAS_RES", 240, 23, 140, 18);
            $container.addChild(this.BUY_HAS_RES);
            this.BUY_BUT = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "BUY_BUT", 430, 21, 120, 54);
            $container.addChild(this.BUY_BUT);
            this.BUY_BUT.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.BUY_BUT_TXT = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_BUT_TXT", 430 + 20, 21 + 17, 80, 18);
            $container.addChild(this.BUY_BUT_TXT);
        };
        MeridianBuyListRender.prototype.butClik = function (evt) {
            var _this = this;
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this._canclick) {
                this._canclick = false;
                TimeUtil.addTimeOut(500, function () {
                    _this._canclick = true;
                });
                UiTweenScale.getInstance().changeButSize(evt.target);
                if (this.itdata && this.itdata.data) {
                    var $vo = this.itdata.data;
                    var $hasNum = GuidData.bag.getItemCount($vo.itemId);
                    if ($hasNum > 0) {
                        // this.changeHasItemNum($hasNum - 1);
                        NetManager.getInstance().protocolos.add_meridian_exp($vo.id);
                    }
                    else {
                        ModulePageManager.openPanel($vo.goto, $vo.goto_sub);
                    }
                }
            }
            else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        };
        MeridianBuyListRender.prototype.refreshDraw = function () {
            this.render(this.itdata);
        };
        MeridianBuyListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        MeridianBuyListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.BUY_BG);
            UiDraw.clearUI(this.BUY_BUT);
            UiDraw.clearUI(this.BUY_BUT_TXT);
            UiDraw.clearUI(this.BUY_ICON);
            UiDraw.clearUI(this.BUY_HAS_RES);
            UiDraw.clearUI(this.BUY_NAME);
            UiDraw.clearUI(this.BUY_GET_RES);
        };
        MeridianBuyListRender.prototype.applyRender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                IconManager.getInstance().drawItemIcon60(this.BUY_ICON, $vo.itemId, 1);
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.BUY_BG.skinName, UIData.publicUi, PuiData.Slist_nselect);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_NAME.skinName, ColorType.Brown7a2f21 + $vo.name, 16, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_GET_RES.skinName, ColorType.color9a683f + "增加穴位修炼经验" + $vo.exp + "点", 16, TextAlign.LEFT);
                this.changeHasItemNum(GuidData.bag.getItemCount($vo.itemId));
            }
        };
        MeridianBuyListRender.prototype.changeHasItemNum = function (value) {
            var $skinName = "U_BUY_BUT_B";
            var $str = "购买";
            if (value > 0) {
                $skinName = "U_BUY_BUT_A";
                $str = "使用";
            }
            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.BUY_BUT.skinName, $skinName);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_BUT_TXT.skinName, ColorType.Brown7a2f21 + $str, 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_HAS_RES.skinName, ColorType.Brown7a2f21 + "拥有：" + value, 16, TextAlign.LEFT);
        };
        return MeridianBuyListRender;
    }(SListItem));
    meridian.MeridianBuyListRender = MeridianBuyListRender;
    var MeridianBuyList = /** @class */ (function (_super) {
        __extends(MeridianBuyList, _super);
        function MeridianBuyList() {
            return _super.call(this) || this;
        }
        MeridianBuyList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        MeridianBuyList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, MeridianBuyListRender, 560, 100 * 4, 512, 100, 4, 512, 1024, 1, 7);
        };
        MeridianBuyList.prototype.resetData = function () {
            //该方法只初始化时走
            if (!this._tbDataArr) {
                this._tbDataArr = new Array;
                var $item = tb.TB_meridian_item.getItem();
                for (var i = 0; i < $item.length; i++) {
                    var $vo = new SListItemData();
                    $vo.data = $item[i];
                    this._tbDataArr.push($vo);
                }
                this.refreshData(this._tbDataArr);
            }
            else {
                this.refreshVo();
            }
        };
        /**
         * 数据变化刷新数据
         */
        MeridianBuyList.prototype.refreshVo = function () {
            this.refreshDraw();
        };
        MeridianBuyList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();
        };
        MeridianBuyList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return MeridianBuyList;
    }(SList));
    meridian.MeridianBuyList = MeridianBuyList;
    var MeridianBuyPanel = /** @class */ (function (_super) {
        __extends(MeridianBuyPanel, _super);
        function MeridianBuyPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
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
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        MeridianBuyPanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.meridianBuyList) {
                this.meridianBuyList.dispose();
                this.meridianBuyList = null;
            }
            _super.prototype.dispose.call(this);
        };
        MeridianBuyPanel.prototype.applyLoad = function () {
            var _this = this;
            GameData.getPublicUiAtlas(function ($publicbgUiAtlas) {
                _this.winmidRender.uiAtlas = $publicbgUiAtlas;
                _this._midRender.uiAtlas.setInfo("ui/uidata/meridian/meridian.xml", "ui/uidata/meridian/meridian.png", function () { _this.loadConfigCom(); }, "ui/uidata/meridian/meridianuse.png");
            });
        };
        MeridianBuyPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.meridianBuyList.show();
        };
        MeridianBuyPanel.prototype.hide = function () {
            this.meridianBuyList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        MeridianBuyPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.baseBg:
                    this.hide();
                    break;
                case this.e_close:
                    this.hide();
                    break;
            }
        };
        MeridianBuyPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._topRender.getComponent("b_win_tittle"));
            this.b_list_pos = this.addChild(this._topRender.getComponent("b_list_pos"));
            this.initList();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        MeridianBuyPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.meridianBuyList) {
                this.meridianBuyList.left = this.b_list_pos.parent.x / UIData.Scale + this.b_list_pos.x;
                this.meridianBuyList.top = this.b_list_pos.parent.y / UIData.Scale + this.b_list_pos.y;
            }
        };
        MeridianBuyPanel.prototype.initList = function () {
            this.meridianBuyList = new MeridianBuyList;
            this.meridianBuyList.init(this._midRender.uiAtlas);
        };
        return MeridianBuyPanel;
    }(WindowMinUi));
    meridian.MeridianBuyPanel = MeridianBuyPanel;
})(meridian || (meridian = {}));
//# sourceMappingURL=MeridianBuyPanel.js.map