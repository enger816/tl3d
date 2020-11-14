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
var adventuremap;
(function (adventuremap) {
    var MapClikVo = /** @class */ (function () {
        function MapClikVo() {
        }
        MapClikVo.prototype.draw = function ($uiAtlas) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.tb_world_map.mapid) + ".png", LoadManager.IMG_TYPE, function ($img) {
                var $toRect = _this.pic.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, ($toRect.width - $img.width) / 2, ($toRect.height - $img.height) / 2, $img.width, $img.height);
                if (_this.tb_map.levellimit > GuidData.player.getLevel()) {
                    UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                }
                _this.pic.drawToCtx($uiAtlas, $ctx);
            });
            this.drawLabel($uiAtlas);
        };
        MapClikVo.prototype.drawLabel = function ($uiAtlas) {
            //地图名
            var $toRect = this.w_title.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.colorffe9b4 + this.tb_map.name, 16);
            this.w_title.drawToCtx($uiAtlas, $ctx);
            //活动名
            var $toRect = this.w_info.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtxByVertical($ctx, ColorType.colorffe9b4 + this.tb_world_map.info, 14);
            this.w_info.drawToCtx($uiAtlas, $ctx);
            if (this.tb_map.levellimit > GuidData.player.getLevel()) {
                var $toRect = this.w_openlev.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whiteffffff + "LV" + this.tb_map.levellimit + "解锁", 16);
                this.w_openlev.drawToCtx($uiAtlas, $ctx);
            }
        };
        MapClikVo.prototype.getSelectTbname = function () {
            var $strName = "";
            for (var i = 0; i < this.tb_world_map.info.length; i++) {
                $strName += this.tb_world_map.info.substr(i, 1);
                $strName += "\n";
            }
            if (this.tb_world_map.info.length < 4) {
                $strName = "\n" + $strName;
            }
            //console.log($strName);
            return $strName;
        };
        return MapClikVo;
    }());
    adventuremap.MapClikVo = MapClikVo;
    var MapWorldPanel = /** @class */ (function (_super) {
        __extends(MapWorldPanel, _super);
        function MapWorldPanel() {
            var _this = _super.call(this) || this;
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
            return _this;
        }
        MapWorldPanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        MapWorldPanel.prototype.initUiAtlas = function ($uiAtlas) {
            var _this = this;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._curUi = this.addChild(this._topRender.getComponent("w_cur"));
            this.resetPicData();
            this._updateFun = function () {
                _this.updateY();
            };
        };
        MapWorldPanel.prototype.resetPicData = function () {
            var $uiPosList = tb.TB_world_map.getItem();
            this.wIconItem = new Array();
            for (var i = 0; i < $uiPosList.length; i++) {
                var $vo = new MapClikVo();
                $vo.tb_world_map = $uiPosList[i];
                $vo.tb_map = tb.TB_map.getTB_map($uiPosList[i].mapid);
                $vo.id = i;
                $vo.w_titlebg = this._bottomRender.getComponent("w_titlebg");
                $vo.w_titlebg.goToAndStop($vo.tb_map.is_PK);
                this.addChild($vo.w_titlebg);
                $vo.pic = this.addEvntButUp("w_icon", this._bottomRender);
                $vo.pic.data = $vo;
                $vo.pic.goToAndStop(i);
                $vo.w_title = this.addChild(this._midRender.getComponent("w_title"));
                $vo.w_title.goToAndStop(i);
                $vo.w_infobg = this.addChild(this._bottomRender.getComponent("w_infobg"));
                $vo.w_info = this.addChild(this._midRender.getComponent("w_info"));
                $vo.w_info.goToAndStop(i);
                $vo.pic.x = $vo.tb_world_map.x * 0.95 - 35;
                $vo.pic.y = $vo.tb_world_map.y * 0.95 - 40;
                $vo.w_titlebg.x = $vo.pic.x + 22;
                $vo.w_titlebg.y = $vo.pic.y + $vo.pic.height;
                $vo.w_title.x = $vo.w_titlebg.x + 18;
                $vo.w_title.y = $vo.w_titlebg.y + 1;
                $vo.w_infobg.x = $vo.pic.x + $vo.pic.width - 10;
                $vo.w_infobg.y = $vo.pic.y;
                $vo.w_info.x = $vo.w_infobg.x + 5;
                $vo.w_info.y = $vo.w_infobg.y;
                if ($vo.tb_map.levellimit > GuidData.player.getLevel()) {
                    $vo.w_openlev = this.addChild(this._topRender.getComponent("w_openlev"));
                    $vo.w_openlev.goToAndStop(i);
                    $vo.w_openbg = this.addChild(this._midRender.getComponent("w_openbg"));
                    $vo.w_openbg.x = $vo.pic.x + 38;
                    $vo.w_openbg.y = $vo.pic.y + 31;
                    $vo.w_openlev.x = $vo.w_openbg.x + 4;
                    $vo.w_openlev.y = $vo.w_openbg.y + 5;
                }
                this.wIconItem.push($vo);
            }
        };
        MapWorldPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                default:
                    if (evt.target.data instanceof MapClikVo) {
                        var $vo = evt.target.data;
                        if ($vo.tb_world_map.mapid != GuidData.map.tbMapVo.id && $vo.tb_map.levellimit <= GuidData.player.getLevel()) {
                            if ($vo.tb_map.is_PK) {
                                AlertUtil.show(ColorType.Brown7a2f21 + "当前前往地图为PVP地图，可能会被家族外的其他玩家攻击，是否继续前往？", "提示", function (a) {
                                    if (a == 1) {
                                        ModuleEventManager.dispatchEvent(new adventuremap.AdventureMapEvent(adventuremap.AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL));
                                        NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                                    }
                                }, 2, ["是", "否"]);
                            }
                            else {
                                ModuleEventManager.dispatchEvent(new adventuremap.AdventureMapEvent(adventuremap.AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL));
                                NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                            }
                        }
                        else {
                            //console.log("当前地图不传")
                        }
                    }
                    break;
            }
        };
        MapWorldPanel.prototype.hide = function () {
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
        };
        MapWorldPanel.prototype.show = function () {
            this.setUiListVisibleByItem([this._curUi], false);
            for (var i = 0; i < this.wIconItem.length; i++) {
                this.wIconItem[i].draw(this._topRender.uiAtlas);
                if (this.wIconItem[i].tb_map.id == GuidData.map.tbMapVo.id) {
                    this.setUiListVisibleByItem([this._curUi], true);
                    this._curUi.x = this.wIconItem[i].pic.x + 51;
                    this._curUi.y = this.wIconItem[i].pic.y;
                    this._lastY = this._curUi.y;
                    TimeUtil.addFrameTick(this._updateFun);
                }
            }
            UIManager.getInstance().addUIContainer(this);
            var ui = this.parent.loadBigPicByUrl("ui/load/map/bigworld.jpg");
            ui.width = 826;
            ui.height = 451;
        };
        MapWorldPanel.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
        };
        MapWorldPanel.prototype.updateY = function () {
            var ypos = Math.sin(TimeUtil.getTimer() / 250) * 5;
            if (!this._curUi) {
                return;
            }
            this._curUi.y = this._lastY + ypos;
        };
        return MapWorldPanel;
    }(UIVirtualContainer));
    adventuremap.MapWorldPanel = MapWorldPanel;
})(adventuremap || (adventuremap = {}));
//# sourceMappingURL=MapWorldPanel.js.map