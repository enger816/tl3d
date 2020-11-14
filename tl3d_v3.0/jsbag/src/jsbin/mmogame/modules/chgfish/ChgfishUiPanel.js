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
var chgfish;
(function (chgfish) {
    var ChgfishUiPanel = /** @class */ (function (_super) {
        __extends(ChgfishUiPanel, _super);
        function ChgfishUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.left = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        ChgfishUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.fishTabList) {
                this.fishTabList.dispose();
                this.fishTabList = null;
            }
            _super.prototype.dispose.call(this);
        };
        ChgfishUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/dropmenu/dropmenu.xml", "ui/uidata/dropmenu/dropmenu.png", function () { _this.loadConfigCom(); }, "ui/uidata/dropmenu/dropmenupc.png");
        };
        ChgfishUiPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.c_basebg = this.addChild(this._bgRender.getComponent("c_basebg"));
            this.c_basebg.addEventListener(InteractiveEvent.Up, function () {
            }, this);
            this.c_basebg.addEventListener(InteractiveEvent.Down, function () {
                _this.hide();
            }, this);
            this.c_bg = this.addChild(renderLevel.getComponent("c_bg"));
            this.applyLoadComplete();
        };
        ChgfishUiPanel.prototype.show = function ($ui) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (!this.fishTabList) {
                this.fishTabList = new FishTabList();
                this.fishTabList.init(this._baseRender.uiAtlas);
            }
            this.fishTabList.show();
            this.c_bg.x = $ui.x - 5;
            this.c_bg.y = $ui.y + $ui.height;
            this.fresh();
            this.resize();
        };
        ChgfishUiPanel.prototype.fresh = function () {
        };
        ChgfishUiPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.fishTabList) {
                this.fishTabList.hide();
            }
        };
        ChgfishUiPanel.prototype.resize = function () {
            this.c_basebg.top = 0;
            this.c_basebg.left = 0;
            this.c_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.c_basebg.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
            if (this.fishTabList) {
                this.fishTabList.left = this.c_bg.parent.x / UIData.Scale + this.c_bg.x + 6;
                this.fishTabList.top = this.c_bg.parent.y / UIData.Scale + this.c_bg.y + 17;
            }
        };
        ChgfishUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                // case this.w_close:
                //     ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.HIDE_Stronger_EVENT));
                //     break
                default:
                    break;
            }
        };
        return ChgfishUiPanel;
    }(UIPanel));
    chgfish.ChgfishUiPanel = ChgfishUiPanel;
    var FishTabList = /** @class */ (function (_super) {
        __extends(FishTabList, _super);
        function FishTabList() {
            return _super.call(this) || this;
        }
        FishTabList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        FishTabList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, FishTabRender, 154, 182, 0, 52, 3, 256, 512, 1, 6);
        };
        /**
         * refreshData
         */
        FishTabList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        };
        FishTabList.prototype.getData = function () {
            var ary = new Array;
            var redary = chgfish.ChgfishModel.getInstance().getList();
            for (var i = 0; i < redary.length; i++) {
                var item = new SListItemData;
                item.data = redary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        FishTabList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
            this.setSelectIndex(0);
        };
        FishTabList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return FishTabList;
    }(SList));
    chgfish.FishTabList = FishTabList;
    var FishTabRender = /** @class */ (function (_super) {
        __extends(FishTabRender, _super);
        function FishTabRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FishTabRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.CS_tab = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "CS_tab", 0, 0, 154, 52);
            $container.addChild(this.CS_tab);
            this.CS_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "CS_name", 9, 13, 140, 20);
            $container.addChild(this.CS_name);
        };
        FishTabRender.prototype.drawTab = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.CS_tab.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3 = this.parentTarget.baseAtlas.getRec("Tabbg");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        FishTabRender.prototype.applyrender = function () {
            if (this.itdata) {
                // this.drawTab();
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.CS_tab.skinName, "Tabbg");
                var vo = this.itdata.data;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.CS_name.skinName, vo.tab.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            }
        };
        FishTabRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.CS_tab.addEventListener(InteractiveEvent.Up, this.equClick, this);
            }
            else {
                this.CS_tab.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        };
        FishTabRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                // TimeUtil.addTimeOut(500, () => {
                var vo = this.itdata.data;
                ModuleEventManager.dispatchEvent(new chgfish.ChgfishEvent(chgfish.ChgfishEvent.HIDE_Chgfish_EVENT));
                ModulePageManager.openPanel(vo.tab.link[0], vo.tab.link.slice(1, vo.tab.link.length));
                // })
            }
        };
        FishTabRender.prototype.setnull = function () {
            LabelTextFont.clearLabel(this.uiAtlas, this.CS_tab.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.CS_name.skinName);
        };
        return FishTabRender;
    }(SListItem));
    chgfish.FishTabRender = FishTabRender;
})(chgfish || (chgfish = {}));
//# sourceMappingURL=ChgfishUiPanel.js.map