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
var logall;
(function (logall) {
    var WarehouseTreasureLogListRender = /** @class */ (function (_super) {
        __extends(WarehouseTreasureLogListRender, _super);
        function WarehouseTreasureLogListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WarehouseTreasureLogListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.F_log_txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "F_log_txt", 50, 5, 440, 18);
            $container.addChild(this.F_log_txt);
            this.F_log_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "F_log_bg", 0, 0, 430, 38);
            $container.addChild(this.F_log_bg);
        };
        WarehouseTreasureLogListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $str = $data.data;
                if (!($data.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this._baseRender.uiAtlas, this.F_log_bg.skinName, UIData.publicUi, PuiData.BG2);
                }
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.F_log_txt.skinName, $str, 16, TextAlign.LEFT, ColorType.Orange853d07);
            }
            else {
                this.setnull();
            }
        };
        WarehouseTreasureLogListRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.F_log_txt.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.F_log_bg.skinName);
        };
        return WarehouseTreasureLogListRender;
    }(SListItem));
    logall.WarehouseTreasureLogListRender = WarehouseTreasureLogListRender;
    var WarehouseTreasureLogList = /** @class */ (function (_super) {
        __extends(WarehouseTreasureLogList, _super);
        function WarehouseTreasureLogList() {
            var _this = _super.call(this) || this;
            _this.left = 45;
            _this.top = 120;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        WarehouseTreasureLogList.prototype.init = function ($uiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        WarehouseTreasureLogList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, WarehouseTreasureLogListRender, 448, 440, 0, 38, 11, 512, 256, 1, 11);
        };
        /**
         * refreshData
         */
        WarehouseTreasureLogList.prototype.refreshDataByNewData = function () {
            var $backAry = new Array;
            for (var i = 0; i < 10; i++) {
                var item = new SListItemData;
                item.data = "就是这条几率嘎嘎大吃大喝";
                item.id = i;
                $backAry.push(item);
            }
            this.refreshData($backAry);
        };
        WarehouseTreasureLogList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        WarehouseTreasureLogList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return WarehouseTreasureLogList;
    }(SList));
    logall.WarehouseTreasureLogList = WarehouseTreasureLogList;
})(logall || (logall = {}));
//# sourceMappingURL=WarehouseTreasureLogList.js.map