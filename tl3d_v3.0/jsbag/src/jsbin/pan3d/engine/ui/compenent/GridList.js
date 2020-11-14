var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var GridList = /** @class */ (function (_super) {
        __extends(GridList, _super);
        function GridList() {
            return _super.call(this) || this;
        }
        GridList.prototype.testPoint = function ($x, $y) {
            if ($x > this.absoluteX
                && $x < (this.absoluteX + this._showWidth * Pan3d.UIData.Scale)
                && $y > this.absoluteY
                && $y < (this.absoluteY + this._oHeight * Pan3d.UIData.Scale)) {
                return true;
            }
            else {
                return false;
            }
        };
        GridList.prototype.setGridData = function ($data, ItemRender, $wNum, itemWidth, itemHeight, contentWidth, contentHeight, $width, $height) {
            if ($width === void 0) { $width = 256; }
            if ($height === void 0) { $height = 300; }
            if (this.uiRender.uiAtlas) {
                this.uiRender.uiAtlas.dispose();
            }
            this.width = contentWidth;
            this.height = contentHeight;
            this._showWidth = $width;
            this._showHeight = $height;
            this.data = $data;
            this.wNum = $wNum;
            this._itemWidth = itemWidth;
            this._itemHeight = itemHeight;
            var atlas = new GridListAtlas();
            this.uiRender.setAtlas(atlas);
            atlas.setGridData(contentWidth, contentHeight, itemWidth, itemHeight, $wNum, $data.length);
            this._itemRenderAry = new Array;
            for (var i = 0; i < $data.length; i++) {
                var listItemRender = new ItemRender();
                listItemRender.setData($data[i], atlas, atlas.configData[i]);
                this._itemRenderAry.push(listItemRender);
            }
            this._oHeight = itemHeight * Math.ceil(this._itemRenderAry.length / this.wNum);
            if (this._oHeight > this._showHeight) {
                this._needScoller = true;
            }
            else {
                this._needScoller = false;
            }
            this.uiRender.applyObjData();
        };
        GridList.prototype.setGridItemData = function ($data, $idx) {
            var tf = this._itemRenderAry[$idx].listItemData.data ? true : false;
            this._itemRenderAry[$idx].setNewData($data);
            return tf;
        };
        GridList.prototype.setGridItemFun = function ($fun, $idx) {
            this._itemRenderAry[$idx].listItemData.clickFun = $fun;
        };
        GridList.prototype.clearItemByIndex = function ($idx) {
            for (var i = 0; i < this._itemRenderAry.length; i++) {
                if (this._itemRenderAry[i].listItemData.data && this._itemRenderAry[i].listItemData.data.dataIndex == $idx) {
                    this._itemRenderAry[i].setNewData(null);
                    this._itemRenderAry[i].listItemData.clickFun = null;
                }
            }
        };
        GridList.prototype.clearItemByPos = function ($pos) {
            this._itemRenderAry[$pos].setNewData(null);
            this._itemRenderAry[$pos].listItemData.clickFun = null;
        };
        GridList.prototype.redraw = function () {
            for (var i = 0; i < this._itemRenderAry.length; i++) {
                this._itemRenderAry[i].redraw();
            }
        };
        GridList.prototype.testItemClick = function ($xPos, $ypos) {
            var xpos = $xPos - this.absoluteX;
            var ypos = $ypos - this.absoluteY;
            var itemH = this._itemHeight * Pan3d.UIData.Scale;
            var itemW = this._itemWidth * Pan3d.UIData.Scale;
            var indexW = float2int(xpos / itemW);
            var indexH = float2int(ypos / itemH);
            var index = indexH * this.wNum + indexW;
            if (index >= this._itemRenderAry.length) {
                return;
            }
            this._itemRenderAry[index].click(xpos - (itemW * (indexW - 1)), ypos - (itemH * (indexH - 1)));
        };
        GridList.prototype.pushVaData = function (objData, i, beginIndex) {
            if (!this._itemRenderAry) {
                return 0;
            }
            var hNum = Math.ceil(this._itemRenderAry.length / this.wNum);
            var xitem = this._itemWidth / this.width;
            var yitem = this._itemHeight / this.height;
            for (var i = 0; i < hNum + 1; i++) {
                for (var j = 0; j < this.wNum + 1; j++) {
                    objData.vertices.push(j * xitem, -i * yitem, 0);
                    objData.uvs.push(j * xitem, i * yitem, 0);
                }
            }
            var allNum = (hNum) * (this.wNum);
            for (var j = 0; j < allNum; j++) {
                var num = j % this.wNum + float2int(j / this.wNum) * (this.wNum + 1);
                var i1 = num + beginIndex;
                var i2 = num + 1 + beginIndex;
                var i3 = num + this.wNum + 1 + beginIndex;
                var i4 = num + 1 + this.wNum + 1 + beginIndex;
                objData.indexs.push(i1, i2, i4, i1, i4, i3);
            }
            return beginIndex + (this._itemRenderAry.length + 1) * 2;
        };
        return GridList;
    }(Pan3d.List));
    Pan3d.GridList = GridList;
    var GridListAtlas = /** @class */ (function (_super) {
        __extends(GridListAtlas, _super);
        function GridListAtlas() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GridListAtlas.prototype.getAlphaImg = function ($width, $height) {
            var $ImageData = this.ctx.createImageData($width, $height);
            for (var i = 0; i < $ImageData.data.length; i++) {
                $ImageData.data[i] = 0;
            }
            return $ImageData;
        };
        GridListAtlas.prototype.setGridData = function ($width, $height, itemWidth, itemHeight, wNum, itemNum) {
            this.ctx = Pan3d.UIManager.getInstance().getContext2D($width, $height, false);
            this.ctx.fillStyle = "rgba(0,0,0,0.0)";
            this.ctx.fillRect(0, 0, $width, $height);
            this.textureRes = Pan3d.TextureManager.getInstance().getCanvasTexture(this.ctx);
            this.configData = new Array;
            var hNum = Math.ceil(itemNum / wNum);
            var flag = 0;
            for (var i = 0; i < hNum; i++) {
                for (var j = 0; j < wNum; j++) {
                    flag = i * wNum + j;
                    var rec = new Object;
                    rec.ox = j * itemWidth;
                    rec.oy = i * itemHeight;
                    rec.ow = itemWidth;
                    rec.oh = itemHeight;
                    rec.x = j * itemWidth / $width;
                    rec.y = i * itemHeight / $height;
                    rec.width = itemWidth / $width;
                    rec.height = itemHeight / $height;
                    rec.name = flag.toString();
                    this.configData.push(rec);
                }
            }
        };
        return GridListAtlas;
    }(Pan3d.ListAtlas));
    Pan3d.GridListAtlas = GridListAtlas;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GridList.js.map