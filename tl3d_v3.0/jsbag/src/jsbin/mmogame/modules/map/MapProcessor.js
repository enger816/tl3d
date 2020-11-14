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
    var MapEvent = /** @class */ (function (_super) {
        __extends(MapEvent, _super);
        function MapEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapEvent.SHOW_MAP_EVENT = "SHOW_MAP_EVENT"; //显示面板
        MapEvent.HIDE_MAP_EVENT = "HIDE_MAP_EVENT"; //显示面板
        return MapEvent;
    }(BaseEvent));
    map.MapEvent = MapEvent;
    var MapModule = /** @class */ (function (_super) {
        __extends(MapModule, _super);
        function MapModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapModule.prototype.getModuleName = function () {
            return "MapModule";
        };
        MapModule.prototype.listProcessors = function () {
            return [new MapProcessor()];
        };
        return MapModule;
    }(Module));
    map.MapModule = MapModule;
    var MapProcessor = /** @class */ (function (_super) {
        __extends(MapProcessor, _super);
        function MapProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapProcessor.prototype.getName = function () {
            return "MapProcessor";
        };
        MapProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MapEvent) {
                var $comandEvent = $event;
                if ($comandEvent.type == MapEvent.SHOW_MAP_EVENT) {
                    this.showPanel();
                }
                if ($comandEvent.type == MapEvent.HIDE_MAP_EVENT) {
                    this.hidePanel();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._mapPanel) {
                    this._mapPanel.dispose();
                    this._mapPanel = null;
                    //console.log("释放面板 _mapPanel")
                }
            }
        };
        MapProcessor.prototype.hidePanel = function () {
        };
        MapProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this._mapPanel) {
                this._mapPanel = new map.MapPanel();
            }
            this._mapPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this._mapPanel);
                SceneManager.getInstance().render = false;
                _this._mapPanel.addTime();
                _this._mapPanel.refresh();
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
            });
        };
        MapProcessor.prototype.smsgSendMapLine = function ($byte) {
            var $vo = new s2c_send_map_line();
            s2c_send_map_line.read($vo, $byte);
            map.MapModel.getInstance().mapLineData = $vo;
            this._mapPanel.refreshLine();
        };
        MapProcessor.prototype.isHasXianFuBaoXiang = function ($name) {
            var nameStrAry = GuidData.map.getXianFuPlayerGuidList();
            for (var i = 0; i < nameStrAry.length; i++) {
                if (GuidData.map.getXianFuPlayerScore(i) > 0 && $name.search(nameStrAry[i]) != -1) {
                    return true;
                }
            }
            return false;
        };
        MapProcessor.prototype.smsgKuafuXianFuMiniMap = function ($byte) {
            var $arr = new Array;
            var len = $byte.readUint16();
            for (var i = 0; i < len; i++) {
                var $vo = new map.MapServerVo();
                $vo.name = $byte.readUTF(); //玩家
                $vo.pos = new Vector2D();
                $vo.pos.x = $byte.readUint16();
                $vo.pos.y = $byte.readUint16();
                if (this.isHasXianFuBaoXiang($vo.name)) {
                    $vo.type = 7;
                }
                else {
                    $vo.type = 1;
                }
                if ($vo.name.search(GuidData.player.getGuid()) == -1) {
                    $arr.push($vo);
                }
                else {
                    ////console.log($vo.name, GuidData.player.getGuid())
                }
            }
            var len = $byte.readUint16();
            for (var i = 0; i < len; i++) {
                var $vo = new map.MapServerVo();
                $byte.readUint16();
                $vo.name = "生物";
                $vo.pos = new Vector2D();
                $vo.pos.x = $byte.readUint16();
                $vo.pos.y = $byte.readUint16();
                $vo.type = 2;
                $arr.push($vo);
            }
            var len = $byte.readUint16();
            for (var i = 0; i < len; i++) {
                var $vo = new map.MapServerVo();
                $byte.readUint16();
                $vo.name = "采集物品";
                $vo.pos = new Vector2D();
                $vo.pos.x = $byte.readUint16();
                $vo.pos.y = $byte.readUint16();
                $vo.type = 5;
                $arr.push($vo);
            }
            if (this._mapPanel && this._mapPanel.hasStage) {
                //console.log($arr)
                this._mapPanel.mapCetentPanel.showSeverMapInfo($arr);
            }
        };
        /*
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SEND_MAP_LINE] = ($byte: ByteArray) => { this.smsgSendMapLine($byte) };
            obj[Protocols.SMSG_KUAFU_XIANFU_MINIMAP_INFO] = ($byte: ByteArray) => { this.smsgKuafuXianFuMiniMap($byte) };
            return obj;

            
        }
        */
        MapProcessor.prototype.listenModuleEvents = function () {
            return [
                new MapEvent(MapEvent.SHOW_MAP_EVENT),
                new MapEvent(MapEvent.HIDE_MAP_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return MapProcessor;
    }(BaseProcessor));
    map.MapProcessor = MapProcessor;
})(map || (map = {}));
//# sourceMappingURL=MapProcessor.js.map