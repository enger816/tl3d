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
    var MapNpcListItemRender = /** @class */ (function (_super) {
        __extends(MapNpcListItemRender, _super);
        function MapNpcListItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hasLight = false;
            return _this;
        }
        MapNpcListItemRender.prototype.draw = function () {
            var $vo = this.listItemData.data;
            var $ctx = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            //绘制坐骑头像的底色
            var $bgStr = "S_base_pic";
            if (!$vo.data) {
                if ($vo.menuType == 0) {
                    $bgStr = "S_pic0";
                }
                if ($vo.menuType == 2) {
                    $bgStr = "S_pic2";
                }
                if ($vo.menuType == 3) {
                    $bgStr = "S_pic3";
                }
            }
            else {
                if (this.hasLight) {
                    $bgStr = "S_select_pic";
                }
            }
            var $bgRect = MapNpcListItemRender.uiAtlas.getRec($bgStr);
            $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, $bgRect.pixelX, $bgRect.pixelY, $bgRect.pixelWitdh, $bgRect.pixelHeight, 0, 0, 200, 40);
            if ($vo.data) {
                // var $color: string = this.hasLight?"[00ffff]":"[ffffff]"
                LabelTextFont.writeSingleLabelToCtx($ctx, "[ffffff]" + $vo.data.name, 18, 100, 10, TextAlign.CENTER);
            }
            else {
                var yRtc = MapNpcListItemRender.uiAtlas.getRec($vo.lock ? "S_down" : "S_up");
                $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, yRtc.pixelX, yRtc.pixelY, yRtc.pixelWitdh, yRtc.pixelHeight, 130, 12, 20, 20);
            }
            this.atlas.updateCtx($ctx, this.uvData.ox, this.uvData.oy);
        };
        Object.defineProperty(MapNpcListItemRender.prototype, "selected", {
            set: function (value) {
                if (this.hasLight != value) {
                    this.hasLight = value;
                    this.draw();
                }
            },
            enumerable: true,
            configurable: true
        });
        return MapNpcListItemRender;
    }(ListItemRender));
    map.MapNpcListItemRender = MapNpcListItemRender;
    var MapRightPanel = /** @class */ (function (_super) {
        __extends(MapRightPanel, _super);
        function MapRightPanel() {
            var _this = _super.call(this) || this;
            _this._listItemArr = new Array;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        MapRightPanel.prototype.setRender = function ($bottom, $top, $list) {
            this._bottomRender = $bottom;
            this._topRender = $top;
            this._listRender = $list;
            MapNpcListItemRender.uiAtlas = this._bottomRender.uiAtlas;
            this.loadConfigCom();
        };
        MapRightPanel.prototype.setTabType = function (value) {
            this.setUiListVisibleByItem(this._uiList, value == 0);
            if (value == 0) {
                this.showData();
            }
        };
        MapRightPanel.prototype.refreshLine = function () {
            //console.log(MapModel.getInstance().mapLineData);
            var $vo = map.MapModel.getInstance().mapLineData;
            var $line_info = new line_info();
            $line_info.rate = 0; //默认
            $line_info.lineNo = 1;
            for (var i = 0; i < $vo.info.length; i++) {
                if ($vo.info[i].lineNo == GuidData.map.getLineID()) {
                    $line_info = $vo.info[i];
                }
            }
            if ($line_info) {
                var $uiRect = this._bottomRender.uiAtlas.getRec(this.a_line_label_txt.skinName);
                var $ctx = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
                var $rateStr = "S_yellow";
                if ($line_info.rate < 60) {
                    $rateStr = "S_green";
                }
                if ($line_info.rate > 95) {
                    $rateStr = "S_red";
                }
                var $bgRect = MapNpcListItemRender.uiAtlas.getRec($rateStr);
                $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, $bgRect.pixelX, $bgRect.pixelY, $bgRect.pixelWitdh, $bgRect.pixelHeight, 25, 0, $bgRect.pixelWitdh, $bgRect.pixelHeight);
                ArtFont.getInstance().writeFontToCtxCenten($ctx, String(GuidData.map.getLineID()), ArtFont.num1, 10, 0);
                this._bottomRender.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
            }
        };
        MapRightPanel.prototype.loadConfigCom = function () {
            this._uiList = new Array();
            this.a_list_tittle = this.addEvntBut("a_list_tittle", this._topRender);
            this._uiList.push(this.a_list_tittle);
            this.a_line_label_txt = this.addChild(this._topRender.getComponent("a_line_label_txt"));
            this._uiList.push(this.a_line_label_txt);
            this._uiList.push(this.addChild(this._bottomRender.getComponent("a_line_bg")));
            this.a_win_close = this.addEvntBut("a_win_close", this._topRender);
            this.addList();
        };
        MapRightPanel.prototype.addList = function () {
            var pos = new Vector2D(685, 80);
            this._itemlist = this._listRender.createList();
            this._itemlist.x = pos.x;
            this._itemlist.y = pos.y;
            this.addChild(this._itemlist);
            //遮罩
            this._bgMask = new UIMask();
            this._bgMask.x = pos.x;
            this._bgMask.y = pos.y;
            this._bgMask.width = 200;
            this._bgMask.height = 410;
            this.addMask(this._bgMask);
            this._listRender.mask = this._bgMask;
        };
        MapRightPanel.prototype.showData = function () {
            var _this = this;
            var $arr = map.MapModel.getInstance().getMenuListArr();
            this._listItemArr.length = 0;
            for (var i = 0; i < $arr.length; i++) {
                var $listItemData = new ListItemData;
                $listItemData.data = $arr[i];
                $listItemData.clickFun = function ($listItemData) { _this.itemDataClick($listItemData); };
                this._listItemArr.push($listItemData);
            }
            this._itemlist.setData(this._listItemArr, MapNpcListItemRender, 200, 40, 256, 1024, 200, 410);
            this._itemlist.contentY = 0;
        };
        MapRightPanel.prototype.itemDataClick = function ($listItemData) {
            var $vo = $listItemData.data;
            if ($vo.data) {
                var pos3d = AstarUtil.getWorldPosByStart2D($vo.data.position);
                this.sendWalkToPos(pos3d);
                for (var i = 0; this._listItemArr && i < this._listItemArr.length; i++) {
                    if (this._listItemArr[i] == $listItemData) {
                        this._listItemArr[i].itemRender.selected = true;
                    }
                    else {
                        this._listItemArr[i].itemRender.selected = false;
                    }
                }
            }
            else {
                //console.log($vo.menuType)
                map.MapModel.getInstance().lockItem[$vo.menuType] = !map.MapModel.getInstance().lockItem[$vo.menuType];
                this.showData();
            }
        };
        MapRightPanel.prototype.sendWalkToPos = function ($hitPos) {
            var _this = this;
            var item = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
            if (item) {
                this.parent.mapCetentPanel.meshToWalkLine(item);
                AotuSkillManager.getInstance().aotuWalk = true;
                MainCharControlModel.getInstance().setWalkPathFun(item, function () { _this.walkPathComplete(); });
            }
        };
        MapRightPanel.prototype.walkPathComplete = function () {
            AotuSkillManager.getInstance().aotuWalk = false;
        };
        MapRightPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_win_close:
                    this.parent.close();
                    break;
                case this.a_list_tittle:
                    this.parent.showLinePanel();
                    //console.log("显示")
                    break;
                default:
                    break;
            }
        };
        return MapRightPanel;
    }(UIVirtualContainer));
    map.MapRightPanel = MapRightPanel;
})(map || (map = {}));
//# sourceMappingURL=MapRightPanel.js.map