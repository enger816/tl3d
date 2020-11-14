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
    var MapClikVo = /** @class */ (function () {
        function MapClikVo() {
        }
        MapClikVo.prototype.draw = function ($uiAtlas) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.tb_world_map.mapid) + ".png", LoadManager.IMG_TYPE, function ($img) {
                var $toRect = _this.pic.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, ($toRect.width - $img.width) / 2, ($toRect.height - $img.height) / 2, $img.width, $img.height);
                var $mapobj = TableData.getInstance().getData(TableData.tb_map, _this.tb_world_map.mapid);
                _this.isOpen = $mapobj["levellimit"] <= GuidData.player.getLevel();
                if (!_this.isOpen) {
                    UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                }
                _this.pic.drawToCtx($uiAtlas, $ctx);
            });
            this.drawLabel($uiAtlas);
        };
        MapClikVo.prototype.drawLabel = function ($uiAtlas) {
            var $toRect = this.txt.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var $mapobj = TableData.getInstance().getData(TableData.tb_map, this.tb_world_map.mapid);
            var str = $mapobj["name"];
            if (!$mapobj["levellimit"]) {
                str += "·" + $mapobj["types"];
            }
            else {
                str += "·" + $mapobj["levellimit"] + "级";
            }
            LabelTextFont.writeSingleLabelToCtxSetAnchor($ctx, ColorType.Whiteffe9b4 + str, 16, $toRect.width / 2, 0, TextAlign.CENTER);
            this.txt.drawToCtx($uiAtlas, $ctx);
        };
        return MapClikVo;
    }());
    mapnew.MapClikVo = MapClikVo;
    var WorldMap = /** @class */ (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bigPic = new UIRenderOnlyPicComponent();
            _this.addRender(_this._bigPic);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        WorldMap.prototype.initUiAtlas = function ($uiAtlas) {
            var _this = this;
            this._bigPic.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
            this._updateFun = function () {
                _this.updateY();
            };
        };
        WorldMap.prototype.initView = function () {
            this.addChild(this._bigPic.getComponent("b_world_map_pic"));
            this._bigPic.setImgUrl("ui/load/map/bigworld.jpg");
            this._curUi = this.addChild(this._topRender.getComponent("b_curarrow"));
            this.resetPicData();
        };
        WorldMap.prototype.resetPicData = function () {
            var $uiPosList = tb.TB_world_map.getItem();
            this.wIconItem = new Array();
            for (var i = 0; i < $uiPosList.length; i++) {
                var $vo = new MapClikVo();
                $vo.tb_world_map = $uiPosList[i];
                $vo.id = i;
                $vo.txtbg = this.addChild(this._bottomRender.getComponent("b_mapnamebg"));
                $vo.txt = this._midRender.getComponent("w_label");
                $vo.txt.goToAndStop(i);
                this.addChild($vo.txt);
                $vo.pic = this.addEvntButUp("w_icon", this._midRender);
                $vo.pic.data = $vo;
                $vo.pic.goToAndStop(i);
                $vo.pic.x = $vo.tb_world_map.x;
                $vo.pic.y = $vo.tb_world_map.y;
                $vo.txtbg.x = $vo.pic.x - 8;
                $vo.txtbg.y = $vo.pic.y + 78;
                $vo.txt.x = $vo.txtbg.x + 1;
                $vo.txt.y = $vo.txtbg.y + 4;
                this.wIconItem.push($vo);
            }
        };
        WorldMap.prototype.butClik = function (evt) {
            if (evt.target.data instanceof MapClikVo) {
                var $vo = evt.target.data;
                if ($vo.tb_world_map.mapid == GuidData.map.tbMapVo.id && $vo.isOpen) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "已在此地图中", 99);
                }
                else if (!$vo.isOpen) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "该地图未解锁", 99);
                }
                else {
                    NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                    ModuleEventManager.dispatchEvent(new mapnew.MapNewEvent(mapnew.MapNewEvent.HIDE_MAP_FORM_MINI));
                }
            }
        };
        WorldMap.prototype.hide = function () {
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
        };
        WorldMap.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.refreshUi();
        };
        WorldMap.prototype.refreshUi = function () {
            this.setUiListVisibleByItem([this._curUi], false);
            for (var i = 0; i < this.wIconItem.length; i++) {
                this.wIconItem[i].draw(this._topRender.uiAtlas);
                if (this.wIconItem[i].tb_world_map.mapid == GuidData.map.tbMapVo.id) {
                    this.setUiListVisibleByItem([this._curUi], true);
                    this._curUi.x = this.wIconItem[i].pic.x + 32;
                    this._curUi.y = this.wIconItem[i].pic.y;
                    this._lastY = this._curUi.y;
                    TimeUtil.addFrameTick(this._updateFun);
                }
            }
        };
        WorldMap.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
        };
        WorldMap.prototype.updateY = function () {
            var ypos = Math.sin(TimeUtil.getTimer() / 250) * 5;
            if (!this._curUi) {
                return;
            }
            this._curUi.y = this._lastY + ypos;
        };
        return WorldMap;
    }(UIPanel));
    mapnew.WorldMap = WorldMap;
})(mapnew || (mapnew = {}));
//# sourceMappingURL=WorldMap.js.map