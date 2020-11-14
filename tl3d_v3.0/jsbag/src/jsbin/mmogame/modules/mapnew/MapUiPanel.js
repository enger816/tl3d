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
var mapnew;
(function (mapnew) {
    var MapUiPanel = /** @class */ (function (_super) {
        __extends(MapUiPanel, _super);
        function MapUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this.addWinUiPanel();
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        MapUiPanel.prototype.dispose = function () {
            if (this.winbgRender) {
                this.winbgRender.uiAtlas = null;
                this.winbgRender.dispose();
            }
            if (this.winBlackBgRender) {
                this.winBlackBgRender.uiAtlas = null;
                this.winBlackBgRender.dispose();
            }
            if (this.winmidRender) {
                this.winmidRender.uiAtlas = null;
                this.winmidRender.dispose();
            }
            if (this.wintopRender) {
                this.wintopRender.uiAtlas = null;
                this.wintopRender.dispose();
            }
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            if (this.minimap) {
                this.minimap.dispose();
                this.minimap = null;
            }
            if (this.worldmap) {
                this.worldmap.dispose();
                this.worldmap = null;
            }
            _super.prototype.dispose.call(this);
        };
        MapUiPanel.prototype.addWinUiPanel = function () {
            this.winbgRender = new UIRenderComponent;
            this.addRender(this.winbgRender);
            this.winmidRender = new UIRenderComponent;
            this.addRender(this.winmidRender);
            this.wintopRender = new UIRenderComponent;
            this.addRender(this.wintopRender);
        };
        MapUiPanel.prototype.addBlackBg = function () {
            this.winBlackBgRender = new UIRenderComponent;
            this.winBlackBgRender.uiAtlas = this._roleRender.uiAtlas;
            this.addRenderAt(this.winBlackBgRender, 0);
            this._blackBgUI = this.winBlackBgRender.getComponent("b_bg");
            this.addChild(this._blackBgUI);
            this._blackBgUI.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            this._blackBgUI.addEventListener(InteractiveEvent.Up, function (v) { }, this);
        };
        MapUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._roleRender.uiAtlas.setInfo("ui/uidata/mapnew/mapnew.xml", "ui/uidata/mapnew/mapnew.png", function () { _this.loadConfigCom(); });
        };
        MapUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._roleRender.uiAtlas;
            this.wintopRender.uiAtlas = this._roleRender.uiAtlas;
            this.winbgRender.uiAtlas = this._roleRender.uiAtlas;
            this.winComplete();
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        MapUiPanel.prototype.winComplete = function () {
            this.addChild(this.winbgRender.getComponent("b_basebg"));
            var b_titlebg1 = this.addChild(this._bgRender.getComponent("b_titlebg1"));
            b_titlebg1.isU = true;
            var b_verticalline1 = this.addChild(this.wintopRender.getComponent("b_verticalline1"));
            b_verticalline1.isU = true;
            this.addChild(this.winmidRender.getComponent("b_rightbg"));
            this.addChild(this._bgRender.getComponent("b_titlebg0"));
            this.addChild(this.wintopRender.getComponent("b_verticalline0"));
            this.addChild(this.wintopRender.getComponent("b_horizontalline"));
            this.e_close = this.addEvntButUp("b_closebtn", this._roleRender);
            this.addBlackBg();
        };
        MapUiPanel.prototype.initData = function () {
            //添加UI控件初始化
            this.addChild(this._bgRender.getComponent("a_title"));
            //this.winmidRender.applyObjData();
            this.TabAry = new Array;
            for (var i = 0; i < 2; i++) {
                var a = this.addEvntBut("tab" + i, this._roleRender);
                a.data = SharedDef.MODULE_MAP_REGION + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }
            this.addChild(this._roleRender.getComponent("b_line"));
        };
        MapUiPanel.prototype.selecttype = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            if ($value == SharedDef.MODULE_MAP_REGION) {
                this.showTab1pnael();
            }
            else if ($value == SharedDef.MODULE_MAP_WORLD) {
                this.showTab0pnael();
            }
        };
        MapUiPanel.prototype.click = function (evt) {
            UIManager.popClikNameFun(evt.target.name);
            this.selecttype(evt.target.data);
        };
        MapUiPanel.prototype.showTab0pnael = function () {
            if (this.minimap) {
                this.minimap.hide();
            }
            if (!this.worldmap) {
                this.worldmap = new mapnew.WorldMap();
                this.worldmap.initUiAtlas(this._roleRender.uiAtlas);
            }
            this.worldmap.show();
        };
        MapUiPanel.prototype.showTab1pnael = function () {
            if (this.worldmap) {
                this.worldmap.hide();
            }
            if (!this.minimap) {
                this.minimap = new mapnew.MiniMap();
                this.minimap.initUiAtlas(this._roleRender.uiAtlas, this.winmidRender.uiAtlas, this.winmidRender);
            }
            this.minimap.show();
        };
        MapUiPanel.prototype.hidealltab = function () {
            if (this.minimap) {
                this.minimap.hide();
            }
            if (this.worldmap) {
                this.worldmap.hide();
            }
        };
        MapUiPanel.prototype.refreshRes = function () {
            // if (this.resCopyTaskPanel && this.resCopyTaskPanel.hasStage) {
            //     this.resCopyTaskPanel.refreshRes();
            // }
        };
        MapUiPanel.prototype.refreshTower = function () {
            // if (this.towerCopyTaskPanel && this.towerCopyTaskPanel.hasStage) {
            //     this.towerCopyTaskPanel.refreshSweep();
            // }
        };
        MapUiPanel.prototype.resize = function () {
            if (this._blackBgUI) {
                this._blackBgUI.left = 0;
                this._blackBgUI.top = 0;
                this._blackBgUI.height = Scene_data.stageHeight / UIData.Scale;
                this._blackBgUI.width = Scene_data.stageWidth / UIData.Scale;
            }
            _super.prototype.resize.call(this);
        };
        //只能默认选中第一个。如果需要设定选中哪个，则自己调整Tab顺序
        MapUiPanel.prototype.show = function ($selTab) {
            UIManager.getInstance().addUIContainer(this);
            this.selecttype($selTab);
            this.resize();
        };
        MapUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.hidealltab();
        };
        MapUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    ModuleEventManager.dispatchEvent(new mapnew.MapNewEvent(mapnew.MapNewEvent.HIDE_MAP_FORM_MINI));
                    break;
                default:
                    break;
            }
        };
        return MapUiPanel;
    }(UIPanel));
    mapnew.MapUiPanel = MapUiPanel;
})(mapnew || (mapnew = {}));
//# sourceMappingURL=MapUiPanel.js.map