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
    var MapClikVo = /** @class */ (function () {
        function MapClikVo() {
        }
        MapClikVo.prototype.draw = function ($uiAtlas) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.id + 1) + ".png", LoadManager.IMG_TYPE, function ($img) {
                var $toRect = _this.pic.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                if (true) {
                    UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                }
                _this.pic.drawToCtx($uiAtlas, $ctx);
            });
        };
        return MapClikVo;
    }());
    map.MapClikVo = MapClikVo;
    var NpcNameAndIcon = /** @class */ (function () {
        function NpcNameAndIcon() {
        }
        NpcNameAndIcon.prototype.draw = function ($vo, $uiAtlas) {
            var $id = this.id;
            this.txtUI.goToAndStop(this.id);
            this.txtUI.x = this.pointUi.x - 40;
            this.txtUI.y = this.pointUi.y + 20;
            this.pointUi.goToAndStop($vo.data.type);
            var $toRect = this.txtUI.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, "[000000]" + $vo.data.name, 15, $toRect.width / 2, 0, TextAlign.CENTER);
            this.txtUI.drawToCtx($uiAtlas, $ctx);
        };
        return NpcNameAndIcon;
    }());
    map.NpcNameAndIcon = NpcNameAndIcon;
    var MapCetentPanel = /** @class */ (function (_super) {
        __extends(MapCetentPanel, _super);
        function MapCetentPanel() {
            var _this = _super.call(this) || this;
            _this.severList = new Array;
            _this.npcSpriteList = new Array;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        MapCetentPanel.prototype.setRender = function ($bottom, $mid, $top, $point) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this._pointRender = $point;
            this.loadConfigCom();
        };
        MapCetentPanel.prototype.loadConfigCom = function () {
            this.addUIList(["w_big_0", "w_big_1", "w_big_2"], this._bottomRender);
            this.w_mapA = this.addChild(this._midRender.getComponent("w_mapA"));
            this.w_mapB = this.addEvntBut("w_mapB", this._midRender);
            this.c_red = this.addChild(this._pointRender.getComponent("c_red"));
            this.a_map_name_bg = this.addChild(this._pointRender.getComponent("a_map_name_bg"));
            this.a_map_name = this.addChild(this._pointRender.getComponent("a_map_name"));
            this.a_bottom_mask = this.addChild(this._topRender.getComponent("a_bottom_mask"));
            this.a_bottom_mask.isV = true;
            this.a_top_mask = this.addChild(this._topRender.getComponent("a_top_mask"));
            var $uiPosList = tb.TB_world_map.getItem();
            this.wIconItem = new Array();
            for (var i = 0; i < $uiPosList.length; i++) {
                var $vo = new MapClikVo();
                $vo.tb_world_map = $uiPosList[i];
                $vo.id = i;
                $vo.txt = this._topRender.getComponent("w_label");
                $vo.txt.goToAndStop($vo.id);
                $vo.pic = this.addEvntBut("w_icon", this._topRender);
                $vo.pic.data = $vo;
                $vo.pic.goToAndStop(i);
                $vo.pic.x = $vo.tb_world_map.x;
                $vo.pic.y = $vo.tb_world_map.y;
                $vo.txt.x = $vo.tb_world_map.x;
                $vo.txt.y = $vo.tb_world_map.y + $vo.pic.height;
                $vo.draw(this._topRender.uiAtlas);
                this.wIconItem.push($vo);
            }
        };
        MapCetentPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_mapB:
                    var hitv2 = new Vector2D;
                    //console.log(this.w_mapB.x, this.w_mapB.y)
                    //console.log(this.x, this.y)
                    //console.log("---------------")
                    hitv2.x = evt.x / UIData.Scale - this.x / UIData.Scale;
                    hitv2.y = evt.y / UIData.Scale - this.y / UIData.Scale;
                    var hitV3 = this.uiPosToWorldPos(hitv2);
                    this.sendWalkToPos(hitV3);
                    break;
                default:
                    if (evt.target.data instanceof MapClikVo) {
                        var $vo = evt.target.data;
                        NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                    }
                    break;
            }
        };
        MapCetentPanel.prototype.sendWalkToPos = function ($hitPos) {
            var _this = this;
            var $item = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
            if ($item) {
                for (var i = 0; i < $item.length; i++) {
                    //console.log($item[i], AstarUtil.isGridCanWalk($item[i]));
                }
                ////console.log($item);
                this.meshToWalkLine($item);
                AotuSkillManager.getInstance().aotuWalk = true;
                MainCharControlModel.getInstance().setWalkPathFun($item, function () { _this.walkPathComplete(); });
            }
        };
        MapCetentPanel.prototype.meshToWalkLine = function ($arr) {
            var $walkItem = new Array();
            for (var i = 0; $arr && i < $arr.length; i++) {
                var pos3d = AstarUtil.getWorldPosByStart2D($arr[i]);
                var pos2d = this.worldPosToUiPos(pos3d);
                $walkItem.push(pos2d);
            }
            this.parent.mapWalkLineComponent.makeLineUiItem($walkItem);
        };
        MapCetentPanel.prototype.walkPathComplete = function () {
            this.meshToWalkLine(null);
            AotuSkillManager.getInstance().aotuWalk = false;
        };
        MapCetentPanel.prototype.setTabType = function (value) {
            this._bottomRender.uiAtlas.clearCtxTextureBySkilname(this.w_mapA.skinName); //清空一下，便加载图片时不显示其它
            this.mathMinMapRect();
            if (map.MapModel.tabType == 0) {
                this.loadMapById();
                this.setUiListVisibleByItem([this.w_mapA], false);
                this.setUiListVisibleByItem([this.w_mapB], true);
                this.clearNpc();
                this.makeNpcSprite();
                this.a_top_mask.width = 566;
                this.a_bottom_mask.width = 566;
            }
            else {
                this.setUiListVisibleByItem([this.w_mapA], true);
                this.setUiListVisibleByItem([this.w_mapB], false);
                // this._topRender.uiAtlas.upDataPicToTexture("ui/load/map/worldmap.jpg", this.w_mapA.skinName)
                this.drawWorldMapImg();
                this.a_top_mask.width = 790;
                this.a_bottom_mask.width = 790;
            }
            var $visible = map.MapModel.tabType != 0;
            for (var i = 0; i < this.wIconItem.length; i++) {
                this.setUiListVisibleByItem([this.wIconItem[i].pic], $visible);
                this.setUiListVisibleByItem([this.wIconItem[i].txt], $visible);
            }
        };
        MapCetentPanel.prototype.drawWorldMapImg = function () {
            var $uiAtlas = this._midRender.uiAtlas;
            var rec = $uiAtlas.getRec(this.w_mapA.skinName);
            var $ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            $ctx.drawImage(map.MapModel.worldMapImg, 0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this._bottomRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $ctx);
        };
        MapCetentPanel.prototype.showSeverMapInfo = function ($arr) {
            if (!$arr || $arr.length == 0) {
                $arr = this.getTestData();
            }
            if (map.MapModel.tabType == 0) {
                while (this.severList.length > $arr.length) {
                    var tempUi = this.severList.pop();
                    this.removeChild(tempUi);
                }
                for (var i = 0; i < $arr.length; i++) {
                    var pos3d = AstarUtil.getWorldPosByStart2D($arr[i].pos);
                    var pos2d = this.worldPosToUiPos(pos3d);
                    var $ui;
                    if (i >= this.severList.length) {
                        $ui = this.addChild(this._pointRender.getComponent("f_icon"));
                        this.severList.push($ui);
                        $ui.x = pos2d.x - $ui.width / 2;
                        $ui.y = pos2d.y - $ui.height / 2;
                    }
                    $ui = this.severList[i];
                    $ui.goToAndStop($arr[i].type);
                    $ui.data = pos2d;
                }
            }
        };
        MapCetentPanel.prototype.getTestData = function () {
            var $arr = new Array;
            var len = random(8) + 1;
            for (var i = 0; i < len; i++) {
                var $vo = new map.MapServerVo();
                $vo.type = random(3);
                $vo.pos = new Vector2D();
                $vo.pos.x = 80;
                $vo.pos.y = 80;
                $arr.push($vo);
            }
            return $arr;
        };
        MapCetentPanel.prototype.makeNpcSprite = function () {
            var $arr = map.MapModel.getInstance().getxmlList();
            for (var i = 0; i < $arr.length; i++) {
                var $vo = $arr[i];
                var $ui = this.addChild(this._pointRender.getComponent("f_icon"));
                $vo.pos3d = AstarUtil.getWorldPosByStart2D($vo.data.position);
                var pos2d = this.worldPosToUiPos($vo.pos3d);
                $ui.x = pos2d.x - $ui.width / 2;
                $ui.y = pos2d.y - $ui.height / 2;
                var $tempVo = new NpcNameAndIcon();
                $tempVo.id = i;
                $tempVo.pointUi = $ui;
                $tempVo.txtUI = this.addChild(this._pointRender.getComponent("t_npcname"));
                $tempVo.draw($vo, this._pointRender.uiAtlas);
                this.npcSpriteList.push($tempVo);
            }
            this.removeChild(this.c_red); //为了排在最后面
            this.addChild(this.c_red);
        };
        MapCetentPanel.prototype.worldPosToUiPos = function (pos) {
            var $num512 = this.w_mapB.width;
            var tx = this.w_mapB.x + $num512 / 2;
            var ty = this.w_mapB.y + $num512 / 2;
            tx = tx + (pos.x / this.minMapRect.width * $num512) / 2;
            ty = ty - (pos.z / this.minMapRect.width * $num512) / 2;
            return new Vector2D(tx, ty);
        };
        MapCetentPanel.prototype.uiPosToWorldPos = function ($v2) {
            var $num512 = this.w_mapB.width;
            var tx = this.w_mapB.x + $num512 / 2;
            var ty = this.w_mapB.y + $num512 / 2;
            var pos = new Vector3D;
            pos.x = (($v2.x - tx) * 2) / $num512 * this.minMapRect.width;
            pos.z = ((ty - $v2.y) * 2) / $num512 * this.minMapRect.width;
            return pos;
        };
        MapCetentPanel.prototype.clearNpc = function () {
            while (this.npcSpriteList.length) {
                var $tempVo = this.npcSpriteList.pop();
                this.removeChild($tempVo.pointUi);
                this.removeChild($tempVo.txtUI);
            }
        };
        MapCetentPanel.prototype.upData = function () {
            if (this.minMapRect) {
                this.resetPostion();
                for (var i = 0; this.severList && i < this.severList.length; i++) {
                    var $ui = this.severList[i];
                    var pos2d = $ui.data;
                    var toPos = new Vector2D();
                    toPos.x = pos2d.x - $ui.width / 2;
                    toPos.y = pos2d.y - $ui.height / 2;
                    var $dis = Vector2D.distance(toPos, new Vector2D($ui.x, $ui.y));
                    if ($dis > 1 && $dis < 40) {
                        var kk = new Vector2D(toPos.x - $ui.x, toPos.y - $ui.y);
                        kk.normalize();
                        kk.scaleBy(0.5);
                        $ui.x += kk.x;
                        $ui.y += kk.y;
                    }
                    else {
                        $ui.x = toPos.x;
                        $ui.y = toPos.y;
                    }
                }
            }
        };
        MapCetentPanel.prototype.resetPostion = function () {
            //
            var pos = GameInstance.mainChar.getCurrentPos();
            var pos2d = this.worldPosToUiPos(pos);
            this.c_red.x = pos2d.x - this.c_red.width / 2;
            this.c_red.y = pos2d.y - this.c_red.height / 2;
        };
        MapCetentPanel.prototype.mathMinMapRect = function () {
            var midu = AstarUtil.navmeshData.midu;
            var mapW = AstarUtil.navmeshData.astarItem[0].length;
            var mapH = AstarUtil.navmeshData.astarItem.length;
            var tw = AstarUtil.navmeshData.aPos.x + mapW * AstarUtil.navmeshData.midu;
            var th = AstarUtil.navmeshData.aPos.z + mapH * AstarUtil.navmeshData.midu;
            tw = Math.max(Math.abs(AstarUtil.navmeshData.aPos.x), Math.abs(tw));
            th = Math.max(Math.abs(AstarUtil.navmeshData.aPos.z), Math.abs(th));
            var bsew = Math.max(tw, th);
            bsew += 100;
            bsew = Math.round(bsew);
            var $infoRect = new Rectangle();
            $infoRect.x = -bsew;
            $infoRect.y = -bsew;
            $infoRect.width = bsew * 2;
            $infoRect.height = bsew * 2;
            $infoRect.x -= 1;
            $infoRect.y -= 1;
            $infoRect.width += 2;
            $infoRect.height += 2;
            $infoRect.width /= 2;
            $infoRect.height /= 2;
            this.minMapRect = $infoRect;
        };
        MapCetentPanel.prototype.loadMapById = function () {
            this._topRender.uiAtlas.upDataPicToTexture("ui/load/map/" + GuidData.map.getMapID() + ".png", this.w_mapB.skinName);
            var vo = tb.TB_map.getTB_map(GuidData.map.getMapID());
            LabelTextFont.writeSingleLabel(this._pointRender.uiAtlas, this.a_map_name.skinName, "[ff0000]" + vo.name, 18);
        };
        return MapCetentPanel;
    }(UIVirtualContainer));
    map.MapCetentPanel = MapCetentPanel;
})(map || (map = {}));
//# sourceMappingURL=MapCetentPanel.js.map