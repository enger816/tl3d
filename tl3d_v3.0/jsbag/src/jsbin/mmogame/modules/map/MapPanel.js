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
var map;
(function (map) {
    var MapPanel = /** @class */ (function (_super) {
        __extends(MapPanel, _super);
        function MapPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this.mapWalkLineComponent = new map.MapWalkLineComponent;
            _this.addRender(_this.mapWalkLineComponent);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._pointRender = new UIRenderComponent();
            _this.addRender(_this._pointRender);
            _this._lineRender = new UIRenderComponent();
            // this.addRender(this._lineRender);
            _this._listRender = new UIListRenderComponent;
            _this.addRender(_this._listRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        MapPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._pointRender.dispose();
            this._pointRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._lineRender.dispose();
            this._lineRender = null;
            this._listRender.dispose();
            this._listRender = null;
            this.mapWalkLineComponent.dispose();
            this.mapWalkLineComponent = null;
        };
        MapPanel.prototype.applyLoad = function () {
            var _this = this;
            var img = new Image();
            img.onload = function () {
                map.MapModel.worldMapImg = img;
                _this._midRender.uiAtlas.setInfo("ui/uidata/map/map.xml", "ui/uidata/map/map.png", function () { _this.loadConfigCom(); }, "ui/uidata/map/mapuse.png");
            };
            img.src = Scene_data.fileRoot + "ui/load/map/worldmap.jpg";
        };
        MapPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._pointRender.uiAtlas = this._midRender.uiAtlas;
            this._lineRender.uiAtlas = this._midRender.uiAtlas;
            this.mapLeftPanel = new map.MapLeftPanel();
            this.mapLeftPanel.setRender(this._bottomRender, this._midRender);
            this.addVirtualContainer(this.mapLeftPanel);
            this.mapCetentPanel = new map.MapCetentPanel();
            this.mapCetentPanel.setRender(this._bottomRender, this._midRender, this._topRender, this._pointRender);
            this.addVirtualContainer(this.mapCetentPanel);
            this.mapRightPanel = new map.MapRightPanel();
            this.mapRightPanel.setRender(this._bottomRender, this._midRender, this._listRender);
            this.addVirtualContainer(this.mapRightPanel);
            this.mapLinePanel = new map.MapLinePanel();
            this.mapLinePanel.setRender(this._topRender, this._lineRender);
            this.addVirtualContainer(this.mapLinePanel);
            this.upFun = function () { _this.upData(); };
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        MapPanel.prototype.upData = function () {
            this.mapCetentPanel.upData();
        };
        MapPanel.prototype.addTime = function () {
            TimeUtil.addTimeTick(10, this.upFun);
        };
        MapPanel.prototype.removeTime = function () {
            TimeUtil.removeTimeTick(this.upFun);
        };
        MapPanel.prototype.setTabType = function (value) {
            map.MapModel.tabType = value;
            map.MapModel.getInstance().refresh();
            this.mapLeftPanel.setTabType(value);
            this.mapCetentPanel.setTabType(value);
            this.mapRightPanel.setTabType(value);
            this.renderSetVisibel([this.mapWalkLineComponent], value == 0);
            this.renderSetVisibel([this._pointRender, this._listRender], value == 0);
        };
        MapPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MapPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                this.mapWalkLineComponent.makeLineUiItem(null);
                NetManager.getInstance().protocolos.show_map_line();
                this.setTabType(map.MapModel.tabType);
            }
        };
        MapPanel.prototype.refreshLine = function () {
            this.mapRightPanel.refreshLine();
        };
        MapPanel.prototype.showLinePanel = function () {
            if (this._lineRender.rendering) {
                this.removeRender(this._lineRender);
            }
            else {
                this.addRender(this._lineRender);
                this.mapLinePanel.showLinePanel();
            }
        };
        MapPanel.prototype.close = function () {
            this.removeTime();
            UIManager.getInstance().removeUIContainer(this);
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        return MapPanel;
    }(UIPanel));
    map.MapPanel = MapPanel;
})(map || (map = {}));
//# sourceMappingURL=MapPanel.js.map