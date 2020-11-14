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
var stronger;
(function (stronger) {
    var StrongerTabList = /** @class */ (function (_super) {
        __extends(StrongerTabList, _super);
        function StrongerTabList() {
            var _this = _super.call(this) || this;
            _this.left = 56;
            _this.top = 164;
            return _this;
        }
        StrongerTabList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        StrongerTabList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, StrongerTabRender, 152, 340, 0, 50, 7, 256, 512, 1, 8);
        };
        /**
         * refreshData
         */
        StrongerTabList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        };
        StrongerTabList.prototype.getData = function () {
            var ary = new Array;
            for (var i = 0; i < 7; i++) {
                var item = new SListItemData;
                // item.data = i;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        StrongerTabList.prototype.show = function ($type) {
            this._type = $type;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        };
        StrongerTabList.prototype.refreshAndselectIndex = function () {
            this.refreshDataByNewData();
            this.setSelectIndex(this._type - 1);
        };
        StrongerTabList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return StrongerTabList;
    }(SList));
    stronger.StrongerTabList = StrongerTabList;
    var StrongerTabRender = /** @class */ (function (_super) {
        __extends(StrongerTabRender, _super);
        function StrongerTabRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StrongerTabRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Tab = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tab", 0, 0, 152, 48);
            $container.addChild(this.Tab);
        };
        Object.defineProperty(StrongerTabRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
                if (val) {
                    var bb = new stronger.StrongerEvent(stronger.StrongerEvent.SELECTTAB_Stronger_EVENT);
                    bb.data = this.itdata.id + 1;
                    ModuleEventManager.dispatchEvent(bb);
                }
            },
            enumerable: true,
            configurable: true
        });
        StrongerTabRender.prototype.drawTab = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.Tab.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_1");
            }
            else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_0");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        StrongerTabRender.prototype.applyrender = function () {
            if (this.itdata) {
                this.drawTab();
            }
        };
        StrongerTabRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.Tab.addEventListener(InteractiveEvent.Down, this.equClick, this);
            }
            else {
                this.Tab.removeEventListener(InteractiveEvent.Down, this.equClick, this);
                this.setnull();
            }
        };
        StrongerTabRender.prototype.equClick = function () {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            this.setSelect();
        };
        StrongerTabRender.prototype.setnull = function () {
            LabelTextFont.clearLabel(this.uiAtlas, this.Tab.skinName);
        };
        return StrongerTabRender;
    }(SListItem));
    stronger.StrongerTabRender = StrongerTabRender;
})(stronger || (stronger = {}));
//# sourceMappingURL=StrongerTabList.js.map