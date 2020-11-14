module Pan3d {
    export class SList extends UIVirtualContainer {

        protected _baseX: number;
        protected _baseY: number;

        protected _contentX: number;
        protected _contentY: number;

        protected p_scrollY: number = 0;
        protected p_scrollX: number = 0;
        protected _itemList: Array<SListItem>;
        protected p_itemHeight: number;
        protected p_itemWidth: number;
        protected _showIndexList: Array<number>;
        protected _dataAry: Array<SListItemData>;

        protected _showItemNum: number = 0;
        protected _allItemNum: number = 0;

        protected _topSize: number = 0;
        protected _bottomSize: number = 0;
        protected _outSize: number = 0;

        protected _showDataIndex: number = 0;

        protected _bgRender: SListBgRender;
        protected _baseRender: SlistFrontRender;
        protected customRenderAry: Array<UIRenderComponent>;

        protected _sAtlas: SListAtlas;
        public baseAtlas: UIAtlas;

        protected bgMask: UIMask;

        protected scrollLock: boolean = false;

        protected _minScrollY: number = 0;

        protected _maskLevel: number = 2;

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
        public setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number,
            contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum: number = 0): void {
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

            this.bgMask = new UIMask();
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
                for (var i: number = 0; i < customRenderNum; i++) {
                    var cRender: SlistFrontRender = new SlistFrontRender();
                    cRender.uiAtlas = this._sAtlas;
                    this.addRender(cRender);
                    cRender.mask = this.bgMask;
                    this.customRenderAry.push(cRender);
                }
            }

            this._itemList = new Array;


            for (var i: number = 0; i < this._allItemNum; i++) {
                var item: SListItem = new UItemRender();
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
            } else {
                this.scrollLock = false;
            }
            this.initComplte();
        }

        public initComplte(): void {

        }


        /**显示层级 */
        public setShowLevel($num: number): void {
            this._maskLevel = $num;
            if (this.bgMask) {
                this.bgMask.level = this._maskLevel;
            }
        }

        private _currentSelIdx: number;
        public setSelect($item: SListItem): void {
            for (var i: number = 0; i < this._itemList.length; i++) {
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
                } else {
                    if (this._itemList[i].selected) {
                        this._itemList[i].selected = false;
                    }
                }
            }
        }

        public setSelectIndex($index: number): void {
            //console.log("--选中哪个---", $index);
            this._currentSelIdx = $index;
            for (var i: number = 0; i < this._itemList.length; i++) {
                if (this._itemList[i].itdata && this._itemList[i].itdata.id == $index) {
                    // if (!this._itemList[i].selected) {
                    this._itemList[i].selected = true;
                    // }
                } else {
                    if (this._itemList[i].selected) {
                        this._itemList[i].selected = false;
                    }
                }
            }
        }

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


        public getCurrentSelectIndex(): number {
            if (!this._currentSelIdx) {
                this._currentSelIdx = 0;
            }
            return this._currentSelIdx;
        }

        public changeMinScrollY(): void {
            this._minScrollY = this._height - Math.ceil(this._dataAry.length / this._contentX) * this.p_itemHeight;

        }
        public refreshData($data: Array<SListItemData>): void {
            this._dataAry = $data;
            this._showIndexList = new Array;
            for (var i: number = 0; i < this._itemList.length; i++) {
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
            } else {
                this.scrollLock = false;
            }
        }

        public setItemData($data: any, $idx: number): void {
            this._dataAry[$idx].data = $data;
            // var tf: boolean = this._itemRenderAry[$idx].listItemData.data ? true : false;
            // this._itemRenderAry[$idx].setNewData($data);
            for (var i: number = 0; i < this._itemList.length; i++) {
                if (this._itemList[i].itdata == this._dataAry[$idx]) {
                    this._itemList[i].refreshDraw();
                    break;
                }
            }
        }

        public clearItemByPos($idx: number): void {
            this._dataAry[$idx].data = null;
            // var tf: boolean = this._itemRenderAry[$idx].listItemData.data ? true : false;
            // this._itemRenderAry[$idx].setNewData($data);
            for (var i: number = 0; i < this._itemList.length; i++) {
                if (this._itemList[i].itdata == this._dataAry[$idx]) {
                    this._itemList[i].refreshDraw();
                    break;
                }
            }
        }

        public getDataSize(): number {
            return this._dataAry.length;
        }

        public refreshDraw(): void {
            for (var i: number = 0; i < this._itemList.length; i++) {
                this._itemList[i].refreshDraw();
            }
        }

        public scroll(): void {

        }

        public interactiveEvent($e: InteractiveEvent): boolean {
            if ($e.type == InteractiveEvent.Down) {
                if (this.bgMask.testPoint($e.x, $e.y)) {
                    this._mouseY = $e.y;
                    if (!this.scrollLock || this._dragFlag) {
                        Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
                        Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
                    }
                    return true;
                } else {
                    return false;
                }
            } else if ($e.type == InteractiveEvent.Up) {
                return this.bgMask.testPoint($e.x, $e.y);
            }
            return false;
        }
        private _mouseY: number = 0;
        public onMove($e: InteractiveEvent): void {
            var delatY: number = $e.y - this._mouseY;
            this._mouseY = $e.y;
            if (delatY < 0 && this.scrollLock) {
                return;
            }
            this.scrollY(delatY);
        }

        public onUp($e: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
            if (this._dragFlag) {

                if (this._dragY < 0) {
                    if (this._dragDownFun) {
                        this._dragDownFun();
                    }
                } else if (this._dragY > 0) {
                    if (this._dragUpFun) {
                        this._dragUpFun();
                    }
                }

                if (this._dragY != 0) {
                    TweenMoveTo(this, 0.5, { dragY: 0, onUpdate: () => { this.refreshResultPos() } })
                }

            }
        }


        public backFun: Function
        protected _topflag: boolean;
        protected _bottomflag: boolean;

        /**拖动刷新 */
        protected _dragFlag: boolean = false;
        protected _dragY: number = 0;
        protected _dragMaxY: number = 100;
        protected _dragUpFun: Function;
        protected _dragDownFun: Function;

        /**设置翻页拖动 */
        public setDragFun(upFun: Function, downFun: Function): void {
            this._dragUpFun = upFun;
            this._dragDownFun = downFun;
            if (upFun || downFun) {
                this._dragFlag = true;
            } else {
                this._dragFlag = false;
                this._dragY = 0;
            }
        }

        public set dragY(val: number) {
            this._dragY = val;
        }

        public get dragY(): number {
            return this._dragY;
        }

        public scrollIdx(idx: number): void {
            //console.log("--滑动几个--", idx);
            var targetY: number = -this.p_itemHeight * idx;
            var sizeY: number = targetY - this.p_scrollY;
            var num: number = Math.ceil(Math.abs(sizeY) / this.p_itemHeight);
            sizeY = sizeY / num;
            for (var i: number = 0; i < num; i++) {
                this.scrollY(sizeY);
            }
        }

        public getIdxY(idx: number): number {
            return this.p_itemHeight * idx;
        }
        public getIdxX(idx: number): number {
            return this.p_itemWidth * idx;
        }

        public scrollY(val: number) {
            // //console.log("cur val", val, this.p_scrollY)
            this._topSize -= val;
            this._bottomSize += val;
            if (this._topSize <= 0) {//下拉
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

                } else {
                    var firstID: number = this._showIndexList[0];
                    var topY: number = this._itemList[firstID].baseY - this.p_itemHeight;
                    for (var i: number = 0; i < this._contentX; i++) {
                        var id: number = this._showIndexList.pop();
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
            } else if (this._bottomSize <= 0) {//上拉
                this._topflag = true;
                if ((this._showDataIndex + this._allItemNum) >= this._dataAry.length) {
                    //到最底了
                    this._bottomSize = 0;
                    this._topSize = this._outSize;
                    this.p_scrollY = -(Math.ceil(this._dataAry.length / this._contentX) - this._showItemNum) * this.p_itemHeight;
                    this._bottomflag = false;
                } else {
                    this._bottomflag = true;
                    var lastID: number = this._showIndexList[this._showIndexList.length - 1];
                    var lastY: number = this._itemList[lastID].baseY + this.p_itemHeight
                    for (var i: number = 0; i < this._contentX; i++) {
                        var id: number = this._showIndexList.shift();
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

            } else if (this._showItemNum >= this._dataAry.length) {
                this._topflag = false;
                this._bottomflag = false;
                this.p_scrollY = 0;
            } else {
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

        }

        public refreshResultPos(): void {
            for (var i: number = 0; i < this._itemList.length; i++) {
                this._itemList[i].setY(this.p_scrollY + this._dragY);
            }
        }

        public dispose(): void {
            this._bgRender.dispose();
            this._baseRender.dispose();
            if (this.customRenderAry) {
                for (var i: number = 0; i < this.customRenderAry.length; i++) {
                    this.customRenderAry[i].dispose();
                }
            }
            this.bgMask.dispose();
        }



    }
    export  class SListItem {
        private _height: number = 10;
        public itdata: SListItemData;
        private _list: Array<UICompenent> = new Array;
        public index: number = 0;
        public baseY: number = 0;
        public baseX: number = 0;
        public uiAtlas: SListAtlas;
        protected _selected: boolean = false;
        public parentTarget: SList;
        public _bgRender: UIRenderComponent;
        public _baseRender: UIRenderComponent;
        public _customRenderAry: Array<UIRenderComponent>;

        public addUI($ui: UICompenent): void {
            this._list.push($ui);
        }


        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            this._bgRender = $bgRender;
            this._baseRender = $baseRender;
            this._customRenderAry = $customizeRenderAry;

        }

        public render($data: SListItemData): void {

        }
        //新加重新绘制
        public refreshDraw(): void {

        }

        public setSelect(): void {
            this.parentTarget.setSelect(this);
        }

        public unSetSelect(): void {
            this.selected = false;
        }

        public set selected(val: boolean) {
            this._selected = val;
        }

        public get selected(): boolean {
            return this._selected;
        }

        public creatSUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string,
            x: number, y: number, width: number, height: number): UICompenent {
            var obj: any = baseAtlas.getLayoutData($name);
            var key: string = $name + this.index;
            this.uiAtlas.addConfig(key, this.index, obj.rect);

            var ui: UICompenent = render.creatBaseComponent(key);

            var obj: any = new Object;
            ui.name = $name
            ui.x = obj.x = x;
            ui.y = obj.y = y;
            ui.width = obj.width = width;
            ui.height = obj.height = height;
            ui.baseRec = obj;

            this._list.push(ui);
            return ui;
        }

        private creatGrid9Component(render: UIRenderComponent, $skinName: string, WW: number, WH: number): UICompenent {
            var ui: Grid9Compenent = new Grid9Compenent();
            var $gridRect: UIGridRentangle = this.uiAtlas.getGridRec($skinName)
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
        }
        //WH为9宫格参数
        public creatGrid9SUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string,
            x: number, y: number, width: number, height: number, WW: number = 5, WH: number = 5): UICompenent {

            var obj: any = baseAtlas.getLayoutData($name);
            var key: string = $name + this.index;
            this.uiAtlas.addConfig(key, this.index, obj.rect);

            var ui: UICompenent = this.creatGrid9Component(render, key, WW, WH);

            var obj: any = new Object;
            ui.name = $name
            ui.x = obj.x = x;
            ui.y = obj.y = y;
            ui.width = obj.width = width;
            ui.height = obj.height = height;
            ui.baseRec = obj;

            this._list.push(ui);
            return ui;
        }

        public getHeight(): number {
            return this._height;
        }

        public setItemUiX(ui: UICompenent, xpos: number): void {
            ui.baseRec.x = xpos;
            this.setY(this._sy);
        }

        public _sy: number;
        public setY($sy: number): void {
            this._sy = $sy;
            var offset: number = $sy + this.baseY;

            for (var i: number = 0; i < this._list.length; i++) {
                this._list[i].y = this._list[i].baseRec.y + offset;
                this._list[i].x = this._list[i].baseRec.x + this.baseX;
            }
        }

        public _sx: number;
        public setX($sx: number): void {
            this._sx = $sx;
            var offset: number = $sx + this.baseX;

            for (var i: number = 0; i < this._list.length; i++) {
                this._list[i].y = this._list[i].baseRec.y + this.baseY;
                this._list[i].x = this._list[i].baseRec.x + offset;
            }
        }

    }

    export class SListItemData {
        public data: any;
        public resdata: any
        public id: number;
        //是否选中
        public selected: boolean = false;
        public click: Function;
    }

    export class SListBgRender extends UIRenderComponent {
        public slist: SList;
        public interactiveEvent($e: InteractiveEvent): boolean {
            super.interactiveEvent($e);
            var tf: boolean = this.slist.interactiveEvent($e);
            return tf;
        }
    }

    export  class SlistFrontRender extends UIRenderComponent {
        // public slist: SList;
        public interactiveEvent($e: InteractiveEvent): boolean {
            return super.interactiveEvent($e);
            //return false;
        }

    }


    export class SListAtlas extends UIAtlas {
        public constructor() {
            super();
        }
        public xNum: number;
        public yNum: number;
        public width: number;
        public height: number;
        public itemHeight: number;
        public itemWidth: number;
        public setData($width: number, $height: number, $xnum: number, $ynum: number): void {
            this.ctx = UIManager.getInstance().getContext2D($width, $height, false);
            this.width = $width;
            this.height = $height;
            this.textureRes = TextureManager.getInstance().getCanvasTexture(this.ctx);
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

        }
        public addConfig($name: string, $index: number, $baseRec: any): void {
            var rec: any = new Object;
            var bx: number = ($index % this.xNum) * this.itemWidth;
            var by: number = float2int($index / this.xNum) * this.itemHeight;
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
        }
    }

    /**
     * 带特效的list
     */
    export class EffectSlist extends SList {
        private _effRender: FrameUIRender = new FrameUIRender();

        public effList: Array<FrameTipCompenent>
        public setEffectUrl($name: string, $wnum: number, $hNum: number, num: number = 1): void {
            if (this.effList && this.effList.length > 0) {
                this.effectComplte();
            } else {
                this._effRender.setImg(getEffectUIUrl($name), $wnum, $hNum, ($ary: any) => {
                    if (num == 1) {
                        this.effList = new Array
                        this.effList.push($ary);
                    } else {
                        this.effList = $ary;
                    }
                    this.effectComplte();
                }, num)
            }
        }

        public initComplte(): void {
            this.addRender(this._effRender);
            this._effRender.mask = this.bgMask;
        }

        public effectComplte(): void {
        }

        public refreshResultPos(): void {
            super.refreshResultPos();
            if (this.effList) {
                for (var i: number = 0; i < this.effList.length; i++) {
                    this.effList[i].y = this.effList[i].baseRec.y + this.p_scrollY;
                    this.effList[i].x = this.effList[i].baseRec.x + this.p_scrollX;
                }
            }

        }

        public playEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed: number = 3): void {
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
        }

        public effplay($effui: FrameTipCompenent) {
            if (!$effui.parent) {
                this.addChild($effui);
                $effui.play();
            }
        }

        public showEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed: number = 3): void {
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
        }

        //0表示全部隐藏
        public hideEffect($id: number = -1): void {
            if (this.effList && this.effList.length > 0) {
                if ($id == -1) {
                    for (var i = 0; i < this.effList.length; i++) {
                        if (this.effList[i].parent) {
                            this.effList[i].parent.removeChild(this.effList[i]);
                        }
                    }
                } else {
                    if ($id < this.effList.length && $id >= 0) {
                        if (this.effList[$id].parent) {
                            this.effList[$id].parent.removeChild(this.effList[$id]);
                        }
                    }
                }
            }
        }

        public dispose(): void {
            super.dispose();
            this._effRender.dispose();
        }

    }



    /**
     * 横向单行滑动的Slist
     */
    export class TransverseSList extends EffectSlist {

        private _minScrollX: number = 0;

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
        public setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number,
            contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum: number = 0): void {
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

            this.bgMask = new UIMask();
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
            var customRenderAry: Array<UIRenderComponent>;
            if (customRenderNum != 0) {
                customRenderAry = new Array;
                for (var i: number = 0; i < customRenderNum; i++) {
                    var cRender: SlistFrontRender = new SlistFrontRender();
                    cRender.uiAtlas = this._sAtlas;
                    this.addRender(cRender);
                    cRender.mask = this.bgMask;
                    customRenderAry.push(cRender);
                }
            }

            this._itemList = new Array;


            for (var i: number = 0; i < this._allItemNum; i++) {
                var item: SListItem = new UItemRender();
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

        }



        public changeMinScrollX(): void {
            this._minScrollX = this.width - float2int(this._dataAry.length / this._contentY) * this.p_itemWidth;
        }

        public refreshData($data: Array<SListItemData>): void {
            this._dataAry = $data;
            this._showIndexList = new Array;
            for (var i: number = 0; i < this._itemList.length; i++) {
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
            } else {
                this.scrollLock = false;
            }
        }

        public interactiveEvent($e: InteractiveEvent): boolean {
            if ($e.type == InteractiveEvent.Down) {
                if (this.bgMask.testPoint($e.x, $e.y)) {
                    this._mouseX = $e.x;
                    if (!this.scrollLock) {
                        Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
                        Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
                    }
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }
        private _mouseX: number = 0;
        public onMove($e: InteractiveEvent): void {
            var delatX: number = $e.x - this._mouseX;
            this._mouseX = $e.x;
            if (delatX < 0 && this.scrollLock) {
                return;
            }
            this.scrollX(delatX);
        }

        public onUp($e: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        }

        public scrollX(val: number) {
            this._topSize -= val;
            this._bottomSize += val;
            if (this._topSize <= 0) {//下拉
                this._bottomflag = true;
                if (this._showDataIndex == 0) {
                    //到最顶了
                    this._topSize = 0;
                    this._bottomSize = this._outSize;
                    this.p_scrollX = 0;
                    this._topflag = false;
                } else {
                    var firstID: number = this._showIndexList[0];
                    var topX: number = this._itemList[firstID].baseX - this.p_itemWidth;
                    for (var i: number = 0; i < this._contentY; i++) {
                        var id: number = this._showIndexList.pop();
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
            } else if (this._bottomSize <= 0) {//上拉
                this._topflag = true;
                if ((this._showDataIndex + this._allItemNum) >= this._dataAry.length) {
                    //到最底了
                    this._bottomSize = 0;
                    this._topSize = this._outSize;
                    this.p_scrollX = -(Math.ceil(this._dataAry.length / this._contentY) - this._showItemNum) * this.p_itemWidth;
                    this._bottomflag = false;
                } else {
                    this._bottomflag = true;
                    var lastID: number = this._showIndexList[this._showIndexList.length - 1];
                    var lastX: number = this._itemList[lastID].baseX + this.p_itemWidth
                    for (var i: number = 0; i < this._contentY; i++) {
                        var id: number = this._showIndexList.shift();
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

            } else if (this._showItemNum >= this._dataAry.length) {
                this._topflag = false;
                this._bottomflag = false;
                this.p_scrollX = 0;
            } else {
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

        }

        public scrollIdx(idx: number): void {
            var targetX: number = -this.p_itemWidth * idx;
            var sizeX: number = targetX - this.p_scrollX;
            var num: number = Math.ceil(Math.abs(sizeX) / this.p_itemWidth);
            sizeX = sizeX / num;
            for (var i: number = 0; i < num; i++) {
                this.scrollX(sizeX);
            }
        }

        public refreshResultPos(): void {
            for (var i: number = 0; i < this._itemList.length; i++) {
                this._itemList[i].setX(this.p_scrollX);
            }

            //特效存在的时候，特殊处理位置刷新
            if (this.effList) {
                for (var i: number = 0; i < this.effList.length; i++) {
                    // this.effList[i].y = this.effList[i].baseRec.y + this.p_scrollY;
                    this.effList[i].x = this.effList[i].baseRec.x + this.p_scrollX;
                }
            }
        }
    }

}