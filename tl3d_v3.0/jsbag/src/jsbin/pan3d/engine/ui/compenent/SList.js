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
    var SList = /** @class */ (function (_super) {
        __extends(SList, _super);
        function SList() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.p_scrollY = 0;
            _this.p_scrollX = 0;
            _this._showItemNum = 0;
            _this._allItemNum = 0;
            _this._topSize = 0;
            _this._bottomSize = 0;
            _this._outSize = 0;
            _this._showDataIndex = 0;
            _this.scrollLock = false;
            _this._minScrollY = 0;
            _this._maskLevel = 2;
            _this._mouseY = 0;
            /**拖动刷新 */
            _this._dragFlag = false;
            _this._dragY = 0;
            _this._dragMaxY = 100;
            return _this;
        }
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        SList.prototype.setData = function ($data, UItemRender, $width, $height, $itemWidth, $itemHeight, $showItemNum, contentWidth, contentHeight, contentX, contentY, customRenderNum) {
            if (customRenderNum === void 0) { customRenderNum = 0; }
            //  //console.log("$data", $data);
            this.width = $width;
            this._height = $height;
            this.p_itemHeight = $itemHeight;
            this.p_itemWidth = $itemWidth;
            this._showIndexList = new Array;
            this._dataAry = $data;
            this._showItemNum = $showItemNum;
            this._allItemNum = contentX * contentY;
            this._contentX = contentX;
            this._contentY = contentY;
            this._outSize = (contentY - this._showItemNum) * $itemHeight;
            this._topSize = 0;
            this._bottomSize = this._outSize;
            this._showDataIndex = 0;
            this._sAtlas = new SListAtlas();
            this._sAtlas.setData(contentWidth, contentHeight, contentX, contentY);
            this.bgMask = new Pan3d.UIMask();
            this.bgMask.x = 0;
            this.bgMask.y = 0;
            this.bgMask.width = $width;
            this.bgMask.height = $height;
            this.bgMask.level = this._maskLevel;
            this.addMask(this.bgMask);
            this._bgRender = new SListBgRender();
            this._bgRender.uiAtlas = this._sAtlas;
            this._bgRender.slist = this;
            this.addRender(this._bgRender);
            this._baseRender = new SlistFrontRender();
            this._baseRender.uiAtlas = this._sAtlas;
            this.addRender(this._baseRender);
            this._bgRender.mask = this.bgMask;
            this._baseRender.mask = this.bgMask;
            if (customRenderNum != 0) {
                this.customRenderAry = new Array;
                for (var i = 0; i < customRenderNum; i++) {
                    var cRender = new SlistFrontRender();
                    cRender.uiAtlas = this._sAtlas;
                    this.addRender(cRender);
                    cRender.mask = this.bgMask;
                    this.customRenderAry.push(cRender);
                }
            }
            this._itemList = new Array;
            for (var i = 0; i < this._allItemNum; i++) {
                var item = new UItemRender();
                //item.itdata = $data[i];
                item.baseY = float2int(i / contentX) * $itemHeight;
                item.baseX = (i % contentX) * $itemWidth;
                item.uiAtlas = this._sAtlas;
                item.index = i;
                item.parentTarget = this;
                item.create(this, this._bgRender, this._baseRender, this.customRenderAry);
                item.render($data[i]);
                this._itemList.push(item);
                this._showIndexList.push(i);
            }
            this._minScrollY = this._height - float2int(this._dataAry.length / this._contentX) * this.p_itemHeight;
            this.scrollY(0);
            if (Math.ceil($data.length / this._contentX) <= this._showItemNum) {
                this.scrollLock = true;
            }
            else {
                this.scrollLock = false;
            }
            this.initComplte();
        };
        SList.prototype.initComplte = function () {
        };
        /**显示层级 */
        SList.prototype.setShowLevel = function ($num) {
            this._maskLevel = $num;
            if (this.bgMask) {
                this.bgMask.level = this._maskLevel;
            }
        };
        SList.prototype.setSelect = function ($item) {
            for (var i = 0; i < this._itemList.length; i++) {
                if (this._itemList[i] == $item) {
                    this._currentSelIdx = this._dataAry.indexOf(this._itemList[i].itdata);
                    //console.log("--选中---", this._currentSelIdx);
                    // if (!this._itemList[i].selected) {
                    //刷新时，需要重复选中
                    this._itemList[i].selected = true;
                    // if (this._itemList[i].itdata && this._itemList[i].itdata.data) {
                    //     this.currentSelIdx = this._itemList[i].itdata.data.id;
                    // }
                    // }
                }
                else {
                    if (this._itemList[i].selected) {
                        this._itemList[i].selected = false;
                    }
                }
            }
        };
        SList.prototype.setSelectIndex = function ($index) {
            //console.log("--选中哪个---", $index);
            this._currentSelIdx = $index;
            for (var i = 0; i < this._itemList.length; i++) {
                if (this._itemList[i].itdata && this._itemList[i].itdata.id == $index) {
                    // if (!this._itemList[i].selected) {
                    this._itemList[i].selected = true;
                    // }
                }
                else {
                    if (this._itemList[i].selected) {
                        this._itemList[i].selected = false;
                    }
                }
            }
        };
        //记录当前选中的位置
        //private _lastSelectIndex: number;
        // public setSelectIndexCopy($index: number): void {
        //     //console.log("--$index-",$index);
        //     this.currentSelIdx = $index;
        //     for (var i: number = 0; i < this._itemList.length; i++) {
        //         if (this._itemList[i].itdata && this._itemList[i].itdata.data.id == $index) {
        //             // if (!this._itemList[i].selected) {
        //             this._itemList[i].selected = true;
        //             //this._lastSelectIndex = $index;
        //             // }
        //         } else {
        //             if (this._itemList[i].selected) {
        //                 this._itemList[i].selected = false;
        //             }
        //         }
        //     }
        // }
        SList.prototype.getCurrentSelectIndex = function () {
            if (!this._currentSelIdx) {
                this._currentSelIdx = 0;
            }
            return this._currentSelIdx;
        };
        SList.prototype.changeMinScrollY = function () {
            this._minScrollY = this._height - Math.ceil(this._dataAry.length / this._contentX) * this.p_itemHeight;
        };
        SList.prototype.refreshData = function ($data) {
            this._dataAry = $data;
            this._showIndexList = new Array;
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].render($data[i]);
                this._itemList[i].baseY = float2int(i / this._contentX) * this.p_itemHeight;
                this._showIndexList.push(i);
            }
            this._outSize = (this._contentY - this._showItemNum) * this.p_itemHeight;
            this._topSize = 0;
            this._bottomSize = this._outSize;
            this._showDataIndex = 0;
            this._minScrollY = this._height - Math.ceil(this._dataAry.length / this._contentX) * this.p_itemHeight;
            this.scrollY(0);
            if (Math.ceil($data.length / this._contentX) <= this._showItemNum) {
                this.scrollLock = true;
            }
            else {
                this.scrollLock = false;
            }
        };
        SList.prototype.setItemData = function ($data, $idx) {
            this._dataAry[$idx].data = $data;
            // var tf: boolean = this._itemRenderAry[$idx].listItemData.data ? true : false;
            // this._itemRenderAry[$idx].setNewData($data);
            for (var i = 0; i < this._itemList.length; i++) {
                if (this._itemList[i].itdata == this._dataAry[$idx]) {
                    this._itemList[i].refreshDraw();
                    break;
                }
            }
        };
        SList.prototype.clearItemByPos = function ($idx) {
            this._dataAry[$idx].data = null;
            // var tf: boolean = this._itemRenderAry[$idx].listItemData.data ? true : false;
            // this._itemRenderAry[$idx].setNewData($data);
            for (var i = 0; i < this._itemList.length; i++) {
                if (this._itemList[i].itdata == this._dataAry[$idx]) {
                    this._itemList[i].refreshDraw();
                    break;
                }
            }
        };
        SList.prototype.getDataSize = function () {
            return this._dataAry.length;
        };
        SList.prototype.refreshDraw = function () {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].refreshDraw();
            }
        };
        SList.prototype.scroll = function () {
        };
        SList.prototype.interactiveEvent = function ($e) {
            if ($e.type == Pan3d.InteractiveEvent.Down) {
                if (this.bgMask.testPoint($e.x, $e.y)) {
                    this._mouseY = $e.y;
                    if (!this.scrollLock || this._dragFlag) {
                        Pan3d.Scene_data.uiStage.addEventListener(Pan3d.InteractiveEvent.Move, this.onMove, this);
                        Pan3d.Scene_data.uiStage.addEventListener(Pan3d.InteractiveEvent.Up, this.onUp, this);
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else if ($e.type == Pan3d.InteractiveEvent.Up) {
                return this.bgMask.testPoint($e.x, $e.y);
            }
            return false;
        };
        SList.prototype.onMove = function ($e) {
            var delatY = $e.y - this._mouseY;
            this._mouseY = $e.y;
            if (delatY < 0 && this.scrollLock) {
                return;
            }
            this.scrollY(delatY);
        };
        SList.prototype.onUp = function ($e) {
            var _this = this;
            Pan3d.Scene_data.uiStage.removeEventListener(Pan3d.InteractiveEvent.Move, this.onMove, this);
            Pan3d.Scene_data.uiStage.removeEventListener(Pan3d.InteractiveEvent.Up, this.onUp, this);
            if (this._dragFlag) {
                if (this._dragY < 0) {
                    if (this._dragDownFun) {
                        this._dragDownFun();
                    }
                }
                else if (this._dragY > 0) {
                    if (this._dragUpFun) {
                        this._dragUpFun();
                    }
                }
                if (this._dragY != 0) {
                    TweenMoveTo(this, 0.5, { dragY: 0, onUpdate: function () { _this.refreshResultPos(); } });
                }
            }
        };
        /**设置翻页拖动 */
        SList.prototype.setDragFun = function (upFun, downFun) {
            this._dragUpFun = upFun;
            this._dragDownFun = downFun;
            if (upFun || downFun) {
                this._dragFlag = true;
            }
            else {
                this._dragFlag = false;
                this._dragY = 0;
            }
        };
        Object.defineProperty(SList.prototype, "dragY", {
            get: function () {
                return this._dragY;
            },
            set: function (val) {
                this._dragY = val;
            },
            enumerable: true,
            configurable: true
        });
        SList.prototype.scrollIdx = function (idx) {
            //console.log("--滑动几个--", idx);
            var targetY = -this.p_itemHeight * idx;
            var sizeY = targetY - this.p_scrollY;
            var num = Math.ceil(Math.abs(sizeY) / this.p_itemHeight);
            sizeY = sizeY / num;
            for (var i = 0; i < num; i++) {
                this.scrollY(sizeY);
            }
        };
        SList.prototype.getIdxY = function (idx) {
            return this.p_itemHeight * idx;
        };
        SList.prototype.getIdxX = function (idx) {
            return this.p_itemWidth * idx;
        };
        SList.prototype.scrollY = function (val) {
            // //console.log("cur val", val, this.p_scrollY)
            this._topSize -= val;
            this._bottomSize += val;
            if (this._topSize <= 0) { //下拉
                this._bottomflag = true;
                if (this._showDataIndex == 0) {
                    //到最顶了
                    this._topSize = 0;
                    this._bottomSize = this._outSize;
                    this.p_scrollY = 0;
                    this._topflag = false;
                    if (this._dragFlag) {
                        if (Math.abs(this._dragY) < this._dragMaxY) {
                            this._dragY += val;
                        }
                    }
                }
                else {
                    var firstID = this._showIndexList[0];
                    var topY = this._itemList[firstID].baseY - this.p_itemHeight;
                    for (var i = 0; i < this._contentX; i++) {
                        var id = this._showIndexList.pop();
                        this._showIndexList.unshift(id);
                        this._itemList[id].baseY = topY;
                        this._itemList[id].render(this._dataAry[this._showDataIndex - 1]);
                        this._itemList[id].selected = (this.getCurrentSelectIndex() == (this._showDataIndex - 1));
                        this._showDataIndex--;
                    }
                    this._bottomSize -= this.p_itemHeight;
                    this._topSize += this.p_itemHeight;
                    this.p_scrollY += val;
                    this._topflag = true;
                }
            }
            else if (this._bottomSize <= 0) { //上拉
                this._topflag = true;
                if ((this._showDataIndex + this._allItemNum) >= this._dataAry.length) {
                    //到最底了
                    this._bottomSize = 0;
                    this._topSize = this._outSize;
                    this.p_scrollY = -(Math.ceil(this._dataAry.length / this._contentX) - this._showItemNum) * this.p_itemHeight;
                    this._bottomflag = false;
                }
                else {
                    this._bottomflag = true;
                    var lastID = this._showIndexList[this._showIndexList.length - 1];
                    var lastY = this._itemList[lastID].baseY + this.p_itemHeight;
                    for (var i = 0; i < this._contentX; i++) {
                        var id = this._showIndexList.shift();
                        this._showIndexList.push(id);
                        this._itemList[id].baseY = lastY;
                        this._itemList[id].render(this._dataAry[this._showDataIndex + this._allItemNum]);
                        this._itemList[id].selected = (this.getCurrentSelectIndex() == (this._showDataIndex + this._allItemNum));
                        this._showDataIndex++;
                    }
                    this._bottomSize += this.p_itemHeight;
                    this._topSize -= this.p_itemHeight;
                    this.p_scrollY += val;
                }
            }
            else if (this._showItemNum >= this._dataAry.length) {
                this._topflag = false;
                this._bottomflag = false;
                this.p_scrollY = 0;
            }
            else {
                this._topflag = true;
                this._bottomflag = true;
                this.p_scrollY += val;
            }
            //如果到底部无法滚动，则重置状态
            if (this.p_scrollY <= this._minScrollY && this._minScrollY < 0) {
                this.p_scrollY = this._minScrollY;
                this._topSize += val;
                this._bottomSize -= val;
                this._topflag = true;
                this._bottomflag = false;
                if (this._dragFlag) {
                    if (Math.abs(this._dragY) < this._dragMaxY) {
                        this._dragY += val;
                    }
                }
            }
            this.refreshResultPos();
            //回调函数
            if (this.backFun) {
                this.backFun(this._topflag, this._bottomflag, val);
            }
        };
        SList.prototype.refreshResultPos = function () {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].setY(this.p_scrollY + this._dragY);
            }
        };
        SList.prototype.dispose = function () {
            this._bgRender.dispose();
            this._baseRender.dispose();
            if (this.customRenderAry) {
                for (var i = 0; i < this.customRenderAry.length; i++) {
                    this.customRenderAry[i].dispose();
                }
            }
            this.bgMask.dispose();
        };
        return SList;
    }(Pan3d.UIVirtualContainer));
    Pan3d.SList = SList;
    var SListItem = /** @class */ (function () {
        function SListItem() {
            this._height = 10;
            this._list = new Array;
            this.index = 0;
            this.baseY = 0;
            this.baseX = 0;
            this._selected = false;
        }
        SListItem.prototype.addUI = function ($ui) {
            this._list.push($ui);
        };
        SListItem.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            this._bgRender = $bgRender;
            this._baseRender = $baseRender;
            this._customRenderAry = $customizeRenderAry;
        };
        SListItem.prototype.render = function ($data) {
        };
        //新加重新绘制
        SListItem.prototype.refreshDraw = function () {
        };
        SListItem.prototype.setSelect = function () {
            this.parentTarget.setSelect(this);
        };
        SListItem.prototype.unSetSelect = function () {
            this.selected = false;
        };
        Object.defineProperty(SListItem.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
            },
            enumerable: true,
            configurable: true
        });
        SListItem.prototype.creatSUI = function (render, baseAtlas, $name, x, y, width, height) {
            var obj = baseAtlas.getLayoutData($name);
            var key = $name + this.index;
            this.uiAtlas.addConfig(key, this.index, obj.rect);
            var ui = render.creatBaseComponent(key);
            var obj = new Object;
            ui.name = $name;
            ui.x = obj.x = x;
            ui.y = obj.y = y;
            ui.width = obj.width = width;
            ui.height = obj.height = height;
            ui.baseRec = obj;
            this._list.push(ui);
            return ui;
        };
        SListItem.prototype.creatGrid9Component = function (render, $skinName, WW, WH) {
            var ui = new Pan3d.Grid9Compenent();
            var $gridRect = this.uiAtlas.getGridRec($skinName);
            $gridRect.ogw = WW;
            $gridRect.ogh = WH;
            ui.tr.setRec($gridRect);
            ui.ogw = $gridRect.ogw;
            ui.ogh = $gridRect.ogh;
            ui.gw = ui.ogw / $gridRect.pixelWitdh;
            ui.gh = ui.ogh / $gridRect.pixelHeight;
            ui.tr.setRec($gridRect);
            ui.skinName = $skinName;
            ui.uiRender = render;
            return ui;
        };
        //WH为9宫格参数
        SListItem.prototype.creatGrid9SUI = function (render, baseAtlas, $name, x, y, width, height, WW, WH) {
            if (WW === void 0) { WW = 5; }
            if (WH === void 0) { WH = 5; }
            var obj = baseAtlas.getLayoutData($name);
            var key = $name + this.index;
            this.uiAtlas.addConfig(key, this.index, obj.rect);
            var ui = this.creatGrid9Component(render, key, WW, WH);
            var obj = new Object;
            ui.name = $name;
            ui.x = obj.x = x;
            ui.y = obj.y = y;
            ui.width = obj.width = width;
            ui.height = obj.height = height;
            ui.baseRec = obj;
            this._list.push(ui);
            return ui;
        };
        SListItem.prototype.getHeight = function () {
            return this._height;
        };
        SListItem.prototype.setItemUiX = function (ui, xpos) {
            ui.baseRec.x = xpos;
            this.setY(this._sy);
        };
        SListItem.prototype.setY = function ($sy) {
            this._sy = $sy;
            var offset = $sy + this.baseY;
            for (var i = 0; i < this._list.length; i++) {
                this._list[i].y = this._list[i].baseRec.y + offset;
                this._list[i].x = this._list[i].baseRec.x + this.baseX;
            }
        };
        SListItem.prototype.setX = function ($sx) {
            this._sx = $sx;
            var offset = $sx + this.baseX;
            for (var i = 0; i < this._list.length; i++) {
                this._list[i].y = this._list[i].baseRec.y + this.baseY;
                this._list[i].x = this._list[i].baseRec.x + offset;
            }
        };
        return SListItem;
    }());
    Pan3d.SListItem = SListItem;
    var SListItemData = /** @class */ (function () {
        function SListItemData() {
            //是否选中
            this.selected = false;
        }
        return SListItemData;
    }());
    Pan3d.SListItemData = SListItemData;
    var SListBgRender = /** @class */ (function (_super) {
        __extends(SListBgRender, _super);
        function SListBgRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SListBgRender.prototype.interactiveEvent = function ($e) {
            _super.prototype.interactiveEvent.call(this, $e);
            var tf = this.slist.interactiveEvent($e);
            return tf;
        };
        return SListBgRender;
    }(Pan3d.UIRenderComponent));
    Pan3d.SListBgRender = SListBgRender;
    var SlistFrontRender = /** @class */ (function (_super) {
        __extends(SlistFrontRender, _super);
        function SlistFrontRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // public slist: SList;
        SlistFrontRender.prototype.interactiveEvent = function ($e) {
            return _super.prototype.interactiveEvent.call(this, $e);
            //return false;
        };
        return SlistFrontRender;
    }(Pan3d.UIRenderComponent));
    Pan3d.SlistFrontRender = SlistFrontRender;
    var SListAtlas = /** @class */ (function (_super) {
        __extends(SListAtlas, _super);
        function SListAtlas() {
            return _super.call(this) || this;
        }
        SListAtlas.prototype.setData = function ($width, $height, $xnum, $ynum) {
            this.ctx = Pan3d.UIManager.getInstance().getContext2D($width, $height, false);
            this.width = $width;
            this.height = $height;
            this.textureRes = Pan3d.TextureManager.getInstance().getCanvasTexture(this.ctx);
            this.xNum = $xnum;
            this.yNum = $ynum;
            this.itemWidth = $width / this.xNum;
            this.itemHeight = $height / this.yNum;
            this.configData = new Array;
            // for (var i: number = 0; i < itemNum; i++){
            //     var rec: any = new Object;
            //     rec.ox = 0;
            //     rec.oy = i * itemHeight;
            //     rec.ow = itemWidth;
            //     rec.oh = itemHeight;
            //     rec.x = 0;
            //     rec.y = i * itemHeight / $height;
            //     rec.width = itemWidth / $width;
            //     rec.height = itemHeight / $height;
            //     rec.name = i.toString();
            //     this.configData.push(rec);
            // }
        };
        SListAtlas.prototype.addConfig = function ($name, $index, $baseRec) {
            var rec = new Object;
            var bx = ($index % this.xNum) * this.itemWidth;
            var by = float2int($index / this.xNum) * this.itemHeight;
            rec.ox = bx + $baseRec.x;
            rec.oy = by + $baseRec.y;
            rec.ow = $baseRec.width;
            rec.oh = $baseRec.height;
            rec.x = rec.ox / this.width;
            rec.y = rec.oy / this.height;
            rec.width = rec.ow / this.width;
            rec.height = rec.oh / this.height;
            rec.name = $name;
            this.configData.push(rec);
        };
        return SListAtlas;
    }(Pan3d.UIAtlas));
    Pan3d.SListAtlas = SListAtlas;
    /**
     * 带特效的list
     */
    var EffectSlist = /** @class */ (function (_super) {
        __extends(EffectSlist, _super);
        function EffectSlist() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._effRender = new Pan3d.FrameUIRender();
            return _this;
        }
        EffectSlist.prototype.setEffectUrl = function ($name, $wnum, $hNum, num) {
            var _this = this;
            if (num === void 0) { num = 1; }
            if (this.effList && this.effList.length > 0) {
                this.effectComplte();
            }
            else {
                this._effRender.setImg(getEffectUIUrl($name), $wnum, $hNum, function ($ary) {
                    if (num == 1) {
                        _this.effList = new Array;
                        _this.effList.push($ary);
                    }
                    else {
                        _this.effList = $ary;
                    }
                    _this.effectComplte();
                }, num);
            }
        };
        EffectSlist.prototype.initComplte = function () {
            this.addRender(this._effRender);
            this._effRender.mask = this.bgMask;
        };
        EffectSlist.prototype.effectComplte = function () {
        };
        EffectSlist.prototype.refreshResultPos = function () {
            _super.prototype.refreshResultPos.call(this);
            if (this.effList) {
                for (var i = 0; i < this.effList.length; i++) {
                    this.effList[i].y = this.effList[i].baseRec.y + this.p_scrollY;
                    this.effList[i].x = this.effList[i].baseRec.x + this.p_scrollX;
                }
            }
        };
        EffectSlist.prototype.playEffect = function ($id, $x, $y, $scaleW, $scaleH, $speed) {
            if ($speed === void 0) { $speed = 3; }
            if (this.effList && this.effList.length > 0) {
                this.effList[$id].x = $x;
                this.effList[$id].baseRec.y = $y;
                this.effList[$id].baseRec.x = $x;
                this.effList[$id].y = $y + this.p_scrollY;
                this.effList[$id].width = this.effList[$id].baseRec.width * $scaleW;
                this.effList[$id].height = this.effList[$id].baseRec.height * $scaleH;
                this.effList[$id].speed = $speed;
                this.effList[$id].playOne(this);
            }
        };
        EffectSlist.prototype.effplay = function ($effui) {
            if (!$effui.parent) {
                this.addChild($effui);
                $effui.play();
            }
        };
        EffectSlist.prototype.showEffect = function ($id, $x, $y, $scaleW, $scaleH, $speed) {
            if ($speed === void 0) { $speed = 3; }
            if (this.effList && this.effList.length > 0) {
                this.effList[$id].x = $x;
                this.effList[$id].baseRec.y = $y;
                this.effList[$id].baseRec.x = $x;
                this.effList[$id].y = $y + this.p_scrollY;
                this.effList[$id].width = this.effList[$id].baseRec.width * $scaleW;
                this.effList[$id].height = this.effList[$id].baseRec.height * $scaleH;
                this.effList[$id].speed = $speed;
                this.effplay(this.effList[$id]);
            }
        };
        //0表示全部隐藏
        EffectSlist.prototype.hideEffect = function ($id) {
            if ($id === void 0) { $id = -1; }
            if (this.effList && this.effList.length > 0) {
                if ($id == -1) {
                    for (var i = 0; i < this.effList.length; i++) {
                        if (this.effList[i].parent) {
                            this.effList[i].parent.removeChild(this.effList[i]);
                        }
                    }
                }
                else {
                    if ($id < this.effList.length && $id >= 0) {
                        if (this.effList[$id].parent) {
                            this.effList[$id].parent.removeChild(this.effList[$id]);
                        }
                    }
                }
            }
        };
        EffectSlist.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._effRender.dispose();
        };
        return EffectSlist;
    }(SList));
    Pan3d.EffectSlist = EffectSlist;
    /**
     * 横向单行滑动的Slist
     */
    var TransverseSList = /** @class */ (function (_super) {
        __extends(TransverseSList, _super);
        function TransverseSList() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._minScrollX = 0;
            _this._mouseX = 0;
            return _this;
        }
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        TransverseSList.prototype.setData = function ($data, UItemRender, $width, $height, $itemWidth, $itemHeight, $showItemNum, contentWidth, contentHeight, contentX, contentY, customRenderNum) {
            if (customRenderNum === void 0) { customRenderNum = 0; }
            //  //console.log("$data", $data);
            this.width = $width;
            this._height = $height;
            this.p_itemWidth = $itemWidth;
            this.p_itemHeight = $itemHeight;
            this._showIndexList = new Array;
            this._dataAry = $data;
            this._showItemNum = $showItemNum;
            this._allItemNum = contentX * contentY;
            this._contentX = contentX;
            this._contentY = contentY;
            this._outSize = (contentX - this._showItemNum) * $itemWidth;
            this._topSize = 0;
            this._bottomSize = this._outSize;
            this._showDataIndex = 0;
            this._sAtlas = new SListAtlas();
            this._sAtlas.setData(contentWidth, contentHeight, contentX, contentY);
            this.bgMask = new Pan3d.UIMask();
            this.bgMask.x = 0;
            this.bgMask.y = 0;
            this.bgMask.width = $width;
            this.bgMask.height = $height;
            this.bgMask.level = this._maskLevel;
            this.addMask(this.bgMask);
            this._bgRender = new SListBgRender();
            this._bgRender.uiAtlas = this._sAtlas;
            this._bgRender.slist = this;
            this.addRender(this._bgRender);
            this._baseRender = new SlistFrontRender();
            this._baseRender.uiAtlas = this._sAtlas;
            this.addRender(this._baseRender);
            this._bgRender.mask = this.bgMask;
            this._baseRender.mask = this.bgMask;
            //创建render
            var customRenderAry;
            if (customRenderNum != 0) {
                customRenderAry = new Array;
                for (var i = 0; i < customRenderNum; i++) {
                    var cRender = new SlistFrontRender();
                    cRender.uiAtlas = this._sAtlas;
                    this.addRender(cRender);
                    cRender.mask = this.bgMask;
                    customRenderAry.push(cRender);
                }
            }
            this._itemList = new Array;
            for (var i = 0; i < this._allItemNum; i++) {
                var item = new UItemRender();
                //item.itdata = $data[i];
                //基础位置
                item.baseX = float2int(i / contentY) * $itemWidth;
                item.baseY = (i % contentY) * $itemHeight;
                item.uiAtlas = this._sAtlas;
                item.index = i;
                item.parentTarget = this;
                item.create(this, this._bgRender, this._baseRender, customRenderAry);
                item.render(this._dataAry[i]);
                this._itemList.push(item);
                this._showIndexList.push(i);
            }
            this._minScrollX = this.width - float2int(this._dataAry.length / this._contentY) * this.p_itemWidth;
            this.scrollX(0);
            this.initComplte();
        };
        TransverseSList.prototype.changeMinScrollX = function () {
            this._minScrollX = this.width - float2int(this._dataAry.length / this._contentY) * this.p_itemWidth;
        };
        TransverseSList.prototype.refreshData = function ($data) {
            this._dataAry = $data;
            this._showIndexList = new Array;
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].render(this._dataAry[i]);
                this._itemList[i].baseX = float2int(i / this._contentY) * this.p_itemWidth;
                this._showIndexList.push(i);
            }
            this._outSize = (this._contentX - this._showItemNum) * this.p_itemWidth;
            this._topSize = 0;
            this._bottomSize = this._outSize;
            this._showDataIndex = 0;
            this._minScrollX = this.width - float2int(this._dataAry.length / this._contentY) * this.p_itemWidth;
            this.scrollX(0);
            if (Math.ceil($data.length / this._contentY) <= this._showItemNum) {
                this.scrollLock = true;
            }
            else {
                this.scrollLock = false;
            }
        };
        TransverseSList.prototype.interactiveEvent = function ($e) {
            if ($e.type == Pan3d.InteractiveEvent.Down) {
                if (this.bgMask.testPoint($e.x, $e.y)) {
                    this._mouseX = $e.x;
                    if (!this.scrollLock) {
                        Pan3d.Scene_data.uiStage.addEventListener(Pan3d.InteractiveEvent.Move, this.onMove, this);
                        Pan3d.Scene_data.uiStage.addEventListener(Pan3d.InteractiveEvent.Up, this.onUp, this);
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        };
        TransverseSList.prototype.onMove = function ($e) {
            var delatX = $e.x - this._mouseX;
            this._mouseX = $e.x;
            if (delatX < 0 && this.scrollLock) {
                return;
            }
            this.scrollX(delatX);
        };
        TransverseSList.prototype.onUp = function ($e) {
            Pan3d.Scene_data.uiStage.removeEventListener(Pan3d.InteractiveEvent.Move, this.onMove, this);
            Pan3d.Scene_data.uiStage.removeEventListener(Pan3d.InteractiveEvent.Up, this.onUp, this);
        };
        TransverseSList.prototype.scrollX = function (val) {
            this._topSize -= val;
            this._bottomSize += val;
            if (this._topSize <= 0) { //下拉
                this._bottomflag = true;
                if (this._showDataIndex == 0) {
                    //到最顶了
                    this._topSize = 0;
                    this._bottomSize = this._outSize;
                    this.p_scrollX = 0;
                    this._topflag = false;
                }
                else {
                    var firstID = this._showIndexList[0];
                    var topX = this._itemList[firstID].baseX - this.p_itemWidth;
                    for (var i = 0; i < this._contentY; i++) {
                        var id = this._showIndexList.pop();
                        this._showIndexList.unshift(id);
                        this._itemList[id].baseX = topX;
                        this._itemList[id].render(this._dataAry[this._showDataIndex - 1]);
                        this._itemList[id].selected = (this.getCurrentSelectIndex() == (this._showDataIndex - 1));
                        this._showDataIndex--;
                    }
                    this._bottomSize -= this.p_itemWidth;
                    this._topSize += this.p_itemWidth;
                    this.p_scrollX += val;
                    this._topflag = true;
                }
            }
            else if (this._bottomSize <= 0) { //上拉
                this._topflag = true;
                if ((this._showDataIndex + this._allItemNum) >= this._dataAry.length) {
                    //到最底了
                    this._bottomSize = 0;
                    this._topSize = this._outSize;
                    this.p_scrollX = -(Math.ceil(this._dataAry.length / this._contentY) - this._showItemNum) * this.p_itemWidth;
                    this._bottomflag = false;
                }
                else {
                    this._bottomflag = true;
                    var lastID = this._showIndexList[this._showIndexList.length - 1];
                    var lastX = this._itemList[lastID].baseX + this.p_itemWidth;
                    for (var i = 0; i < this._contentY; i++) {
                        var id = this._showIndexList.shift();
                        this._showIndexList.push(id);
                        this._itemList[id].baseX = lastX;
                        this._itemList[id].render(this._dataAry[this._showDataIndex + this._allItemNum]);
                        this._itemList[id].selected = (this.getCurrentSelectIndex() == (this._showDataIndex + this._allItemNum));
                        this._showDataIndex++;
                    }
                    this._bottomSize += this.p_itemWidth;
                    this._topSize -= this.p_itemWidth;
                    this.p_scrollX += val;
                }
            }
            else if (this._showItemNum >= this._dataAry.length) {
                this._topflag = false;
                this._bottomflag = false;
                this.p_scrollX = 0;
            }
            else {
                this._topflag = true;
                this._bottomflag = true;
                this.p_scrollX += val;
            }
            //如果到底部无法滚动，则重置状态
            if (this.p_scrollX <= this._minScrollX && this._minScrollX < 0) {
                this.p_scrollX = this._minScrollX;
                this._topSize += val;
                this._bottomSize -= val;
                this._topflag = true;
                this._bottomflag = false;
            }
            this.refreshResultPos();
            //回调函数
            if (this.backFun) {
                this.backFun(this._topflag, this._bottomflag, val);
            }
        };
        TransverseSList.prototype.scrollIdx = function (idx) {
            var targetX = -this.p_itemWidth * idx;
            var sizeX = targetX - this.p_scrollX;
            var num = Math.ceil(Math.abs(sizeX) / this.p_itemWidth);
            sizeX = sizeX / num;
            for (var i = 0; i < num; i++) {
                this.scrollX(sizeX);
            }
        };
        TransverseSList.prototype.refreshResultPos = function () {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].setX(this.p_scrollX);
            }
            //特效存在的时候，特殊处理位置刷新
            if (this.effList) {
                for (var i = 0; i < this.effList.length; i++) {
                    // this.effList[i].y = this.effList[i].baseRec.y + this.p_scrollY;
                    this.effList[i].x = this.effList[i].baseRec.x + this.p_scrollX;
                }
            }
        };
        return TransverseSList;
    }(EffectSlist));
    Pan3d.TransverseSList = TransverseSList;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SList.js.map