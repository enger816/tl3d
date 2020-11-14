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
var selectserver;
(function (selectserver) {
    var Ssxuanfu = /** @class */ (function (_super) {
        __extends(Ssxuanfu, _super);
        function Ssxuanfu() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            // this._bottomRender = new UIRenderComponent;
            // this.addRender(this._bottomRender)
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        Ssxuanfu.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.ssTabList) {
                this.ssTabList.dispose();
                this.ssTabList = null;
            }
            if (this.xuanfulist) {
                this.xuanfulist.dispose();
                this.xuanfulist = null;
            }
        };
        Ssxuanfu.prototype.initUiAtlas = function ($uiAtlas) {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        Ssxuanfu.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.addChild(renderLevel.getComponent("c_bg0"));
            this.addChild(renderLevel.getComponent("c_bg1"));
            this.addChild(renderLevel.getComponent("a_title"));
            this.addChild(renderLevel.getComponent("c_info"));
            this.a_index = this.addChild(renderLevel.getComponent("a_index"));
            this.a_index0 = this.addChild(renderLevel.getComponent("a_index0"));
        };
        Ssxuanfu.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.ssTabList) {
                this.ssTabList.left = this.a_index.parent.x / UIData.Scale + this.a_index.x;
                this.ssTabList.top = this.a_index.parent.y / UIData.Scale + this.a_index.y;
            }
            if (this.xuanfulist) {
                this.xuanfulist.left = this.a_index0.parent.x / UIData.Scale + this.a_index0.x;
                this.xuanfulist.top = this.a_index0.parent.y / UIData.Scale + this.a_index0.y;
            }
        };
        Ssxuanfu.prototype.refreshData = function ($data) {
            if (!this.xuanfulist) {
                this.xuanfulist = new selectserver.xuanfuList();
                this.xuanfulist.init(this._baseRender.uiAtlas);
            }
            this.xuanfulist.show($data);
        };
        Ssxuanfu.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            if (!this.ssTabList) {
                this.ssTabList = new SsTabList();
                this.ssTabList.init(this._baseRender.uiAtlas);
            }
            this.ssTabList.show();
            this.resize();
        };
        Ssxuanfu.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.ssTabList) {
                this.ssTabList.hide();
            }
            if (this.xuanfulist) {
                this.xuanfulist.hide();
            }
        };
        return Ssxuanfu;
    }(UIVirtualContainer));
    selectserver.Ssxuanfu = Ssxuanfu;
    /**
     * 左侧tablist
     */
    var SsTabList = /** @class */ (function (_super) {
        __extends(SsTabList, _super);
        function SsTabList() {
            var _this = _super.call(this) || this;
            _this.left = 111;
            _this.top = 98;
            return _this;
        }
        SsTabList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        SsTabList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, SsTabListRender, 152, 354, 0, 48, 7, 256, 512, 1, 10);
        };
        SsTabList.prototype.refreshDataByNewData = function () {
            var aaa = selectserver.SelectServerModel.getInstance().getFinalList();
            this._itemDataList = this.getData(aaa);
            this.refreshData(this._itemDataList);
            var i = 0;
            if (!selectserver.SelectServerModel.getInstance().hasCurVo()) {
                i = aaa.length - 1;
            }
            this.scrollIdx(i);
            this.setSelectIndex(i);
        };
        SsTabList.prototype.getData = function ($aary) {
            var ary = new Array;
            for (var i = 0; i < $aary.length; i++) {
                var item = new SListItemData;
                item.data = $aary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        SsTabList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        };
        SsTabList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return SsTabList;
    }(SList));
    selectserver.SsTabList = SsTabList;
    var SsTabListRender = /** @class */ (function (_super) {
        __extends(SsTabListRender, _super);
        function SsTabListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // private RedPoint: UICompenent;
        SsTabListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Tabbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tabbg", 0, 0, 152, 48);
            $container.addChild(this.Tabbg);
            this.Tabbg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Tabname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tabname", 26, 14, 100, 20);
            $container.addChild(this.Tabname);
            // this.RedPoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RedPoint", 136, 0, 17, 16);
            // this.RedPoint.preParent = $container;
            // UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RedPoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        Object.defineProperty(SsTabListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
                if (val) {
                    var bb = new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SELECT_TAB_EVENT);
                    bb.data = this.itdata.data.serverary;
                    ModuleEventManager.dispatchEvent(bb);
                }
            },
            enumerable: true,
            configurable: true
        });
        SsTabListRender.prototype.drawTab = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.Tabbg.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("btn_select");
            }
            else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("btn_noselect");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        SsTabListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.tabname && vo.tabname.length > 0) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, vo.tabname, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                }
                else {
                    var str;
                    var a = vo.serverary[0].id;
                    var b = vo.serverary[vo.serverary.length - 1].id;
                    if (a > b) {
                        str = b + " - " + a + "服";
                    }
                    else {
                        str = a + " - " + b + "服";
                    }
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                }
                this.drawTab();
            }
        };
        SsTabListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        SsTabListRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        };
        SsTabListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Tabbg);
            UiDraw.clearUI(this.Tabname);
            //    this.RedPoint.preHide();
        };
        return SsTabListRender;
    }(SListItem));
    selectserver.SsTabListRender = SsTabListRender;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=Ssxuanfu.js.map