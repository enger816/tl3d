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
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super.call(this) || this;
        _this._contentX = 0;
        _this._contentY = 0;
        _this._needScoller = false;
        _this.lastcontentY = 0;
        _this.addEventListener(InteractiveEvent.Down, _this.onDown, _this);
        _this.addEventListener(InteractiveEvent.Up, _this.onListUp, _this);
        return _this;
    }
    List.prototype.applyAbsolutePoint = function () {
        if (this.parent) {
            this.absoluteX = (this._x * this.scale + this._contentX) * UIData.Scale + this.parent.x;
            this.absoluteY = (this._y * this.scale + this._contentY) * UIData.Scale + this.parent.y;
            this.absoluteWidth = this.width * UIData.Scale;
            this.absoluteHeight = this.height * UIData.Scale;
            this.applyRenderSize();
        }
    };
    Object.defineProperty(List.prototype, "contentX", {
        get: function () {
            return this._contentX;
        },
        set: function (value) {
            this._contentX = value;
            this.applyAbsolutePoint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "contentY", {
        get: function () {
            return this._contentY;
        },
        set: function (value) {
            this._contentY = value;
            this.applyAbsolutePoint();
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.testPoint = function ($x, $y) {
        if ($x > this.absoluteX
            && $x < (this.absoluteX + this._showWidth * UIData.Scale)
            && $y > this.absoluteY
            && $y < (this.absoluteY + this._showHeight * UIData.Scale)) {
            return true;
        }
        else {
            return false;
        }
    };
    List.prototype.setData = function ($data, ItemRender, itemWidth, itemHeight, contentWidth, contentHeight, $width, $height) {
        if ($width === void 0) { $width = 256; }
        if ($height === void 0) { $height = 300; }
        if (this.uiRender.uiAtlas) {
            this.uiRender.uiAtlas.dispose();
        }
        this.width = contentWidth;
        this.height = contentHeight;
        this._showWidth = $width;
        this._showHeight = $height;
        this._itemWidth = itemWidth;
        this._itemHeight = itemHeight;
        this.data = $data;
        var atlas = new ListAtlas();
        this.uiRender.setAtlas(atlas);
        atlas.setData(contentWidth, contentHeight, itemWidth, itemHeight, $data.length);
        this._itemRenderAry = new Array;
        for (var i = 0; i < $data.length; i++) {
            var listItemRender = new ItemRender();
            listItemRender.setData($data[i], atlas, atlas.configData[i]);
            this._itemRenderAry.push(listItemRender);
        }
        this._oHeight = itemHeight * $data.length;
        if (this._oHeight > this._showHeight) {
            this._needScoller = true;
        }
        else {
            this._needScoller = false;
        }
        this.uiRender.applyObjData();
    };
    List.prototype.refresh = function () {
        for (var i = 0; this._itemRenderAry && i < this._itemRenderAry.length; i++) {
            this._itemRenderAry[i].draw();
        }
    };
    List.prototype.pushVaData = function (objData, i, beginIndex) {
        if (!this._itemRenderAry) {
            return 0;
        }
        for (var j = 0; j < this._itemRenderAry.length; j++) {
            var rec = this._itemRenderAry[j].uvData;
            objData.vertices.push(0, -rec.y, 0, 1, -rec.y, 0);
            objData.uvs.push(0, rec.y, i, 1, rec.y, i);
        }
        objData.vertices.push(0, -1, 0, 1, -1, 0);
        objData.uvs.push(0, 1, i, 1, 1, i);
        for (var j = 0; j < this._itemRenderAry.length; j++) {
            objData.indexs.push(beginIndex + 2 * j, 1 + beginIndex + 2 * j, 3 + beginIndex + 2 * j, beginIndex + 2 * j, 3 + beginIndex + 2 * j, 2 + beginIndex + 2 * j);
        }
        return beginIndex + (this._itemRenderAry.length + 1) * 2;
    };
    List.prototype.onDown = function (event) {
        this._ypos = event.y;
        ////console.log("down" + this._ypos);
        //FpsMc.tipStr = "mouseDown";
        this.lastcontentY = this.contentY;
        if (this._needScoller) {
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
        }
    };
    List.prototype.onListUp = function (event) {
        if (this.uiRender.mask) {
            if (this.uiRender.mask.testPoint(event.x, event.y)) {
                this.testItemClick(event.x, event.y);
            }
        }
        else {
            if (Math.abs(this.contentY - this.lastcontentY) < 1) {
                var ty = (event.y - this.absoluteY + this.contentY) / UIData.Scale;
                if (ty >= 0 && ty < this._showHeight) {
                    this.testItemClick(event.x, event.y);
                }
            }
        }
    };
    List.prototype.testItemClick = function ($xPos, $ypos) {
        var xpos = $xPos - this.absoluteX;
        var ypos = $ypos - this.absoluteY;
        var itemH = this._itemHeight * UIData.Scale;
        var index = Math.floor(ypos / itemH);
        if (index >= this._itemRenderAry.length || index < 0) {
            return;
        }
        this._itemRenderAry[index].click(xpos, ypos - (itemH * (index)));
    };
    List.prototype.onMove = function (event) {
        ////console.log("move" + this._ypos + "," + event.y + "," + this._contentY);
        //FpsMc.tipStr = event.x + "," + event.y;
        this.contentY -= this._ypos - event.y;
        if (this.contentY > 0) {
            this.contentY = 0;
        }
        else if (this.contentY < this._showHeight * this.scale - this._oHeight * this.scale) {
            this.contentY = this._showHeight * this.scale - this._oHeight * this.scale;
        }
        ////console.log(this._contentY);
        this._ypos = event.y;
    };
    List.prototype.onUp = function (event) {
        Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
        Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
    };
    return List;
}(UICompenent));
var ListAtlas = /** @class */ (function (_super) {
    __extends(ListAtlas, _super);
    function ListAtlas() {
        return _super.call(this) || this;
    }
    ListAtlas.prototype.setData = function ($width, $height, itemWidth, itemHeight, itemNum) {
        this.ctx = UIManager.getInstance().getContext2D($width, $height, false);
        //UIManager.getInstance().showCanvas(0,0);
        //this.ctx.fillStyle = "#6600ff";
        // this.ctx.fillRect(0, 0, $width, $height);
        this.textureRes = TextureManager.getInstance().getCanvasTexture(this.ctx);
        this.configData = new Array;
        for (var i = 0; i < itemNum; i++) {
            var rec = new Object;
            rec.ox = 0;
            rec.oy = i * itemHeight;
            rec.ow = itemWidth;
            rec.oh = itemHeight;
            rec.x = 0;
            rec.y = i * itemHeight / $height;
            rec.width = itemWidth / $width;
            rec.height = itemHeight / $height;
            rec.name = i.toString();
            this.configData.push(rec);
        }
    };
    return ListAtlas;
}(UIAtlas));
var ListItemData = /** @class */ (function () {
    function ListItemData() {
    }
    return ListItemData;
}());
var ListItemRender = /** @class */ (function () {
    function ListItemRender() {
    }
    ListItemRender.prototype.setData = function ($listItemData, $atlas, $uvData) {
        this._listItemData = $listItemData;
        this._listItemData.itemRender = this;
        this.uvData = $uvData;
        this.atlas = $atlas;
        this.draw();
    };
    Object.defineProperty(ListItemRender.prototype, "listItemData", {
        get: function () {
            return this._listItemData;
        },
        enumerable: true,
        configurable: true
    });
    ListItemRender.prototype.setNewData = function ($data) {
    };
    Object.defineProperty(ListItemRender.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
        },
        enumerable: true,
        configurable: true
    });
    ListItemRender.prototype.draw = function () {
    };
    ListItemRender.prototype.redraw = function () {
    };
    ListItemRender.prototype.click = function (xpos, ypos) {
        if (this._listItemData.clickFun) {
            //判断是否有指定按钮区域
            if (this._listItemData.clickRect) {
                if (!this._listItemData.clickRect.isHitByPoint(xpos / UIData.Scale, ypos / UIData.Scale)) {
                    return;
                }
            }
            this._listItemData.clickFun(this._listItemData);
        }
    };
    return ListItemRender;
}());
//# sourceMappingURL=List.js.map