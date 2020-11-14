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
    var MapnewLisDataMesh = /** @class */ (function () {
        function MapnewLisDataMesh() {
        }
        return MapnewLisDataMesh;
    }());
    mapnew.MapnewLisDataMesh = MapnewLisDataMesh;
    var MapnewListRender = /** @class */ (function (_super) {
        __extends(MapnewListRender, _super);
        function MapnewListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapnewListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.G_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "G_BG", 0, 0, 175, 35, 5);
            $container.addChild(this.G_BG);
            this.G_BG.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.G_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_NAME", 0, 7, 175, 20);
            $container.addChild(this.G_NAME);
        };
        MapnewListRender.prototype.butClik = function (evt) {
            if (this.itdata && this.itdata.data) {
                //console.log("----evt-----", this.itdata.data);
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                // this.setSelect();
                var $MapNewEvent = new mapnew.MapNewEvent(mapnew.MapNewEvent.SELECT_MAP_NEW_CELL);
                $MapNewEvent.data = this.itdata.data;
                ModuleEventManager.dispatchEvent($MapNewEvent);
            }
        };
        MapnewListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        MapnewListRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.G_BG.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.G_NAME.skinName);
        };
        Object.defineProperty(MapnewListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyRender();
                if (val) {
                    if (this.itdata && this.itdata.data) {
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        MapnewListRender.prototype.applyRender = function () {
            if (this.itdata && this.itdata.data) {
                var $MapnewLisDataMesh = this.itdata.data;
                if (this.itdata.id % 2 == 1) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.G_BG.skinName, UIData.publicUi, PuiData.LISTITEMBG);
                }
                else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.G_BG.skinName);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_NAME.skinName, $MapnewLisDataMesh.txt, 16, TextAlign.CENTER);
            }
        };
        return MapnewListRender;
    }(SListItem));
    mapnew.MapnewListRender = MapnewListRender;
    var MapNewList = /** @class */ (function (_super) {
        __extends(MapNewList, _super);
        function MapNewList() {
            return _super.call(this) || this;
        }
        MapNewList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        MapNewList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, MapnewListRender, 175, 322, 175, 35, 9, 256, 1024, 1, 12);
        };
        MapNewList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        MapNewList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return MapNewList;
    }(SList));
    mapnew.MapNewList = MapNewList;
    var MiniMap = /** @class */ (function (_super) {
        __extends(MiniMap, _super);
        function MiniMap() {
            var _this = _super.call(this) || this;
            _this.useSceneCut = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this.mapWalkLineComponent = new map.MapWalkLineComponent;
            _this.addRender(_this.mapWalkLineComponent);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.upDataFun = function () { _this.upDataFrame(); };
            return _this;
        }
        MiniMap.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas, $winmidRender) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this.mapWalkLineComponent.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        MiniMap.prototype.initView = function () {
            this.addChild(this._topRender.getComponent("a_map_name_bg"));
            this.a_map_pic = this.addEvntBut("a_map_pic", this._midRender);
            this.a_map_name_txt = this.addChild(this._topRender.getComponent("a_map_name_txt"));
            this.a_self_pos_point = this.addChild(this._topRender.getComponent("a_self_pos_point"));
            this.a_right_tab_0 = this.addEvntButUp("a_right_tab_0", this._midRender);
            this.a_right_tab_1 = this.addEvntButUp("a_right_tab_1", this._midRender);
            this.a_tab_name0 = this.addChild(this._topRender.getComponent("a_tab_name0"));
            this.a_tab_name1 = this.addChild(this._topRender.getComponent("a_tab_name1"));
            this.a_right_list_bg = this.addChild(this._bottomRender.getComponent("a_right_list_bg"));
            this.initList();
        };
        MiniMap.prototype.initList = function () {
            this.mapNewList = new MapNewList;
            this.mapNewList.init(this._midRender.uiAtlas);
        };
        MiniMap.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.mapNewList.show();
            this.refrish();
            this.setTabType(0);
            NetManager.getInstance().protocolos.show_map_line();
            TimeUtil.addTimeTick(50, this.upDataFun);
        };
        MiniMap.prototype.refrish = function () {
            this.mapWalkLineComponent.makeLineUiItem(null);
            this.mathMinMapRect();
            this.addFactionMathView();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name_txt.skinName, ColorType.Yellowffe9b4 + GuidData.map.tbMapVo.name, 16);
            this._topRender.uiAtlas.upDataPicToTexture("ui/load/map/" + GuidData.map.tbMapVo.mapres + ".jpg", this.a_map_pic.skinName);
        };
        MiniMap.prototype.setTabType = function (value) {
            if (this.typeNum == value) {
                return;
            }
            this.typeNum = value;
            this.mapNewList.refreshData(new Array());
            if (value == 0) {
                this.a_right_tab_0.goToAndStop(1);
                this.a_right_tab_1.goToAndStop(0);
                this.a_right_tab_1.y = 455;
                this.a_right_list_bg.y = 132;
                NetManager.getInstance().protocolos.show_map_line();
            }
            else {
                this.a_right_tab_0.goToAndStop(0);
                this.a_right_tab_1.goToAndStop(1);
                this.a_right_tab_1.y = 133;
                this.a_right_list_bg.y = 169;
                this.getMapCharList();
            }
            this.a_tab_name0.y = this.a_right_tab_0.y + 8;
            this.a_tab_name1.y = this.a_right_tab_1.y + 8;
            this.resize();
        };
        MiniMap.prototype.getMapCharList = function () {
            var $mapId = GuidData.map.getMapID();
            var $itemArr = new Array();
            var $tb_map_navigation = tb.TB_map_navigation.get_TB_map_navigation($mapId);
            if (!$tb_map_navigation) {
                return;
            }
            for (var i = 0; i < $tb_map_navigation.navi.length; i++) {
                var $tb_map_object = tb.TB_map_object.get_TB_map_object($tb_map_navigation.navi[i]);
                var $cellVo = new SListItemData;
                var $temp = new MapnewLisDataMesh();
                $temp.txt = ColorType.Brown7a2f21 + $tb_map_object.name;
                $temp.type = 1;
                $temp.data = $tb_map_object;
                $cellVo.data = $temp;
                $cellVo.id = i;
                $itemArr.push($cellVo);
            }
            this.mapNewList.refreshData($itemArr);
        };
        MiniMap.prototype.selectmapOBJ = function ($tb) {
            //console.log("就是这个地方", $tb);
            var pos3d = AstarUtil.getWorldPosByStart2D($tb.position);
            this.sendWalkToPos(pos3d);
        };
        MiniMap.prototype.refreshLine = function ($vo) {
            var $line_info = new line_info();
            $line_info.rate = 0; //默认
            $line_info.lineNo = 1;
            for (var i = 0; i < $vo.info.length; i++) {
                if ($vo.info[i].lineNo == GuidData.map.getLineID()) {
                    $line_info = $vo.info[i];
                }
            }
            var $showStr = ColorType.Brown5a2610 + $line_info.lineNo + "线" + "(" + this.getRateStr($line_info.rate) + ")";
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_tab_name0.skinName, $showStr, 18);
            if (this.typeNum == 0) {
                this.mapNewList.refreshData(this.getLineData($vo));
            }
        };
        MiniMap.prototype.getRateStr = function (value) {
            var $rateStr = "繁忙";
            if (value < 60) {
                $rateStr = "顺畅";
            }
            if (value > 95) {
                $rateStr = "拥挤";
            }
            return $rateStr;
        };
        MiniMap.prototype.getLineData = function ($vo) {
            var $itemArr = new Array();
            for (var i = 0; i < 10; i++) {
                if ($vo.info[i] || i < 4) {
                    var rate = 0;
                    if ($vo.info[i]) {
                        rate = $vo.info[i].rate;
                    }
                    var $cellVo = new SListItemData;
                    var $temp = new MapnewLisDataMesh();
                    $temp.txt = ColorType.Brown5a2610 + (i + 1) + "线" + "(" + this.getRateStr(rate) + ")";
                    $temp.type = 0;
                    $temp.data = i + 1;
                    $cellVo.data = $temp;
                    $cellVo.id = i;
                    $itemArr.push($cellVo);
                }
            }
            return $itemArr;
        };
        MiniMap.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.mapNewList) {
                this.mapNewList.left = this.a_right_list_bg.parent.x / UIData.Scale + this.a_right_list_bg.x;
                this.mapNewList.top = this.a_right_list_bg.parent.y / UIData.Scale + this.a_right_list_bg.y;
            }
        };
        MiniMap.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_right_tab_0:
                    this.setTabType(0);
                    break;
                case this.a_right_tab_1:
                    this.setTabType(1);
                    break;
                case this.a_map_pic:
                    var hitv2 = new Vector2D;
                    //console.log(this.a_map_pic.x, this.a_map_pic.y)
                    //console.log(this.x, this.y)
                    //console.log("---------------")
                    hitv2.x = evt.x / UIData.Scale - this.x / UIData.Scale;
                    hitv2.y = evt.y / UIData.Scale - this.y / UIData.Scale;
                    var hitV3 = this.uiPosToWorldPos(hitv2);
                    this.sendWalkToPos(hitV3);
                    AotuSkillManager.getInstance().aotuBattle = false;
                    break;
            }
        };
        MiniMap.prototype.sendWalkToPos = function ($hitPos) {
            var _this = this;
            var $item = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
            if ($item) {
                for (var i = 0; i < $item.length; i++) {
                    //console.log($item[i], AstarUtil.isGridCanWalk($item[i]));
                }
                ////console.log($item);
                this.meshToWalkLine($item);
                MainCharControlModel.getInstance().setWalkPathFun($item, function () { _this.walkPathComplete(); });
            }
        };
        MiniMap.prototype.walkPathComplete = function () {
            this.meshToWalkLine(null);
            //console.log("---自动战斗设置-----");
            AotuSkillManager.getInstance().aotuBattle = true;
        };
        MiniMap.prototype.meshToWalkLine = function ($arr) {
            var $walkItem = new Array();
            for (var i = 0; $arr && i < $arr.length; i++) {
                var pos3d = AstarUtil.getWorldPosByStart2D($arr[i]);
                var pos2d = this.worldPosToUiPos(pos3d);
                $walkItem.push(pos2d);
            }
            this.mapWalkLineComponent.makeLineUiItem($walkItem);
        };
        MiniMap.prototype.uiPosToWorldPos = function ($v2) {
            var $num512 = this.a_map_pic.width;
            var tx = this.a_map_pic.x + $num512 / 2;
            var ty = this.a_map_pic.y + $num512 / 2;
            var pos = new Vector3D;
            if (this.useSceneCut) {
                var addPos = new Vector3D();
                addPos.x = $v2.x - tx;
                addPos.z = ty - $v2.y;
                var $m = new Matrix3D;
                $m.appendRotation(this.trunRoation, Vector3D.Y_AXIS);
                addPos = $m.transformVector(addPos);
                pos.x = addPos.x / $num512 * this.trunSize;
                pos.z = addPos.z / $num512 * this.trunSize;
                pos = pos.add(this.trunPos);
            }
            else {
                pos.x = ($v2.x - tx) / $num512 * this.miniMapSize;
                pos.z = (ty - $v2.y) / $num512 * this.miniMapSize;
            }
            return pos;
        };
        MiniMap.prototype.upDataFrame = function () {
            if (!this.hasStage) {
                TimeUtil.removeTimeTick(this.upDataFun);
            }
            else {
                this.resetPostion();
            }
        };
        MiniMap.prototype.mathMinMapRect = function () {
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
            this.useSceneCut = false;
            this.miniMapSize = $infoRect.width * 2;
            var $data = GuidData.map.tbMapVo.minimapinfo;
            if ($data && $data.length == 4) {
                this.useSceneCut = true;
                this.trunPos = new Vector3D($data[0], 0, $data[1]);
                this.trunSize = $data[2];
                this.trunRoation = $data[3];
            }
        };
        MiniMap.prototype.resetPostion = function () {
            var pos = GameInstance.mainChar.getCurrentPos();
            var pos2d = this.worldPosToUiPos(pos);
            this.a_self_pos_point.x = pos2d.x - this.a_self_pos_point.width / 2;
            this.a_self_pos_point.y = pos2d.y - this.a_self_pos_point.height / 2;
        };
        MiniMap.prototype.worldPosToUiPos = function (pos) {
            //  pos = new Vector3D(0,0,0)
            var $num512 = this.a_map_pic.width;
            var tx = this.a_map_pic.x + $num512 / 2;
            var ty = this.a_map_pic.y + $num512 / 2;
            if (this.useSceneCut) {
                pos = pos.subtract(this.trunPos);
                var addPos = new Vector3D();
                addPos.x = pos.x / this.trunSize * $num512;
                addPos.z = pos.z / this.trunSize * $num512;
                var $m = new Matrix3D;
                $m.appendRotation(-this.trunRoation, Vector3D.Y_AXIS);
                addPos = $m.transformVector(addPos);
                tx = tx + addPos.x;
                ty = ty - addPos.z;
            }
            else {
                tx = tx + (pos.x / this.miniMapSize * $num512);
                ty = ty - (pos.z / this.miniMapSize * $num512);
            }
            return new Vector2D(tx, ty);
        };
        MiniMap.prototype.hide = function () {
            this.mapNewList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        //private _factionCamp1: UICompenent;
        //private _factionCamp2: UICompenent;
        MiniMap.prototype.initFactionMatchView = function () {
            if (this._factionFlagAry) {
                return;
            }
            this._factionFlagAry = new Array();
            var obj = tb.TB_faction_match_base.getTempVo(1);
            for (var i = 0; i < 5; i++) {
                var fr = this._topRender.getComponent("f_icon" + i);
                fr.goToAndStop(2);
                this._factionFlagAry.push(fr);
                var $v3d = AstarUtil.getWorldPosByStart2D(new Vector2D(obj.flag_pos[i][0], obj.flag_pos[i][1]));
                var $v2d = this.worldPosToUiPos($v3d);
                fr.x = $v2d.x - fr.width / 2;
                fr.y = $v2d.y - fr.height / 2;
                this.setPosByUi(fr, new Vector2D(obj.flag_pos[i][0], obj.flag_pos[i][1]));
            }
            //this._factionCamp1 = this._topRender.getComponent("b_curarrow");
            //this._factionCamp2 = this._topRender.getComponent("b_curarrow");
            //this.setPosByUi(this._factionCamp1, new Vector2D(obj.born_1[0], obj.born_1[1]))
            //this.setPosByUi(this._factionCamp2, new Vector2D(obj.born_2[0], obj.born_2[1]))
        };
        MiniMap.prototype.setPosByUi = function ($ui, $v2dstar) {
            var $v3d = AstarUtil.getWorldPosByStart2D($v2dstar);
            var $v2d = this.worldPosToUiPos($v3d);
            $ui.x = $v2d.x - $ui.width / 2;
            $ui.y = $v2d.y - $ui.height / 2;
        };
        MiniMap.prototype.addFactionMathView = function () {
            this.removeFactionMathView();
            if (!GuidData.map.isFactionFuben()) {
                return;
            }
            this.initFactionMatchView();
            for (var i = 0; i < this._factionFlagAry.length; i++) {
                this.addChild(this._factionFlagAry[i]);
            }
            //this.addChild(this._factionCamp1);
            //this.addChild(this._factionCamp2);
            this.refreshFaction();
        };
        MiniMap.prototype.removeFactionMathView = function () {
            if (!this._factionFlagAry) {
                return;
            }
            for (var i = 0; i < this._factionFlagAry.length; i++) {
                this.removeChild(this._factionFlagAry[i]);
            }
            //this.removeChild(this._factionCamp1);
            //this.removeChild(this._factionCamp2);
            this._factionFlagAry = null;
            //this._factionCamp1 = null;
            //this._factionCamp2 = null;
        };
        MiniMap.prototype.refreshFaction = function () {
            var ary = GuidData.map.getFactionFlagInfo();
            for (var i = 0; i < this._factionFlagAry.length; i++) {
                this._factionFlagAry[i].goToAndStop(ary[i]);
            }
        };
        return MiniMap;
    }(UIPanel));
    mapnew.MiniMap = MiniMap;
})(mapnew || (mapnew = {}));
//# sourceMappingURL=MiniMap.js.map