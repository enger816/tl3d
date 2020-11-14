module Pan3d {
    export class List extends UICompenent {

        protected _itemRenderAry: Array<ListItemRender>;
        private _contentX: number = 0;
        private _contentY: number = 0;
        protected _showHeight: number;
        protected _showWidth: number;
        protected _oHeight: number;
        protected _needScoller: boolean = false;
        protected _itemWidth: number;
        protected _itemHeight: number;
        public constructor() {
            super();
            this.addEventListener(InteractiveEvent.Down, this.onDown, this);
            this.addEventListener(InteractiveEvent.Up, this.onListUp, this);
        }


        public applyAbsolutePoint(): void {
            if (this.parent) {
                this.absoluteX = (this._x * this.scale + this._contentX) * UIData.Scale + this.parent.x
                this.absoluteY = (this._y * this.scale + this._contentY) * UIData.Scale + this.parent.y

                this.absoluteWidth = this.width * UIData.Scale;
                this.absoluteHeight = this.height * UIData.Scale;
                this.applyRenderSize();
            }
        }

        public set contentX(value: number) {
            this._contentX = value;
            this.applyAbsolutePoint();
        }

        public get contentX(): number {
            return this._contentX;
        }

        public set contentY(value: number) {
            this._contentY = value;
            this.applyAbsolutePoint();
        }

        public get contentY(): number {
            return this._contentY;
        }

        public testPoint($x: number, $y: number): boolean {
            if ($x > this.absoluteX
                && $x < (this.absoluteX + this._showWidth * UIData.Scale)
                && $y > this.absoluteY
                && $y < (this.absoluteY + this._showHeight * UIData.Scale)) {
                return true;
            } else {
                return false;
            }
        }
        public setData($data: Array<ListItemData>, ItemRender: any,
            itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number,
            $width: number = 256, $height: number = 300): void {
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

            var atlas: ListAtlas = new ListAtlas();
            this.uiRender.setAtlas(atlas);
            atlas.setData(contentWidth, contentHeight, itemWidth, itemHeight, $data.length);
            this._itemRenderAry = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var listItemRender: ListItemRender = new ItemRender();
                listItemRender.setData($data[i], atlas, atlas.configData[i]);
                this._itemRenderAry.push(listItemRender);
            }

            this._oHeight = itemHeight * $data.length;
            if (this._oHeight > this._showHeight) {
                this._needScoller = true;
            } else {
                this._needScoller = false;
            }

            this.uiRender.applyObjData();
        }
        public refresh(): void {
            for (var i: number = 0; this._itemRenderAry && i < this._itemRenderAry.length; i++) {
                (<ListItemRender>this._itemRenderAry[i]).draw();
            }
        }

        public pushVaData(objData: ObjData, i: number, beginIndex: number): number {
            if (!this._itemRenderAry) {
                return 0;
            }
            for (var j: number = 0; j < this._itemRenderAry.length; j++) {
                var rec: any = this._itemRenderAry[j].uvData;
                objData.vertices.push(
                    0, -rec.y, 0,
                    1, -rec.y, 0);
                objData.uvs.push(
                    0, rec.y, i,
                    1, rec.y, i);
            }

            objData.vertices.push(
                0, -1, 0,
                1, -1, 0);
            objData.uvs.push(
                0, 1, i,
                1, 1, i);

            for (var j: number = 0; j < this._itemRenderAry.length; j++) {
                objData.indexs.push(beginIndex + 2 * j, 1 + beginIndex + 2 * j, 3 + beginIndex + 2 * j,
                    beginIndex + 2 * j, 3 + beginIndex + 2 * j, 2 + beginIndex + 2 * j);
            }

            return beginIndex + (this._itemRenderAry.length + 1) * 2;
        }

        private _ypos: number;
        protected onDown(event: InteractiveEvent): void {
            this._ypos = event.y;
            ////console.log("down" + this._ypos);
            //FpsMc.tipStr = "mouseDown";
            this.lastcontentY = this.contentY
            if (this._needScoller) {
                Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
                Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
            }

        }

        protected onListUp(event: InteractiveEvent): void {

            if (this.uiRender.mask) {
                if (this.uiRender.mask.testPoint(event.x, event.y)) {
                    this.testItemClick(event.x, event.y);
                }
            } else {
                if (Math.abs(this.contentY - this.lastcontentY) < 1) {
                    var ty: number = (event.y - this.absoluteY + this.contentY) / UIData.Scale;
                    if (ty >= 0 && ty < this._showHeight) {
                        this.testItemClick(event.x, event.y);
                    }
                }
            }
        }


        protected testItemClick($xPos: number, $ypos: number): void {
            var xpos: number = $xPos - this.absoluteX;
            var ypos: number = $ypos - this.absoluteY;
            var itemH: number = this._itemHeight * UIData.Scale;
            var index: number = Math.floor(ypos / itemH);
            if (index >= this._itemRenderAry.length || index < 0) {
                return;
            }
            this._itemRenderAry[index].click(xpos, ypos - (itemH * (index)));

        }
        private lastcontentY: number = 0
        protected onMove(event: InteractiveEvent): void {

            ////console.log("move" + this._ypos + "," + event.y + "," + this._contentY);
            //FpsMc.tipStr = event.x + "," + event.y;
            this.contentY -= this._ypos - event.y;



            if (this.contentY > 0) {
                this.contentY = 0;
            } else if (this.contentY < this._showHeight * this.scale - this._oHeight * this.scale) {
                this.contentY = this._showHeight * this.scale - this._oHeight * this.scale;
            }
            ////console.log(this._contentY);
            this._ypos = event.y;

        }

        protected onUp(event: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        }

    }

    export class ListAtlas extends UIAtlas {
        public constructor() {
            super();
        }

        public setData($width: number, $height: number, itemWidth: number, itemHeight: number, itemNum: number): void {
            this.ctx = UIManager.getInstance().getContext2D($width, $height, false);
            //UIManager.getInstance().showCanvas(0,0);
            //this.ctx.fillStyle = "#6600ff";
            // this.ctx.fillRect(0, 0, $width, $height);


            this.textureRes = TextureManager.getInstance().getCanvasTexture(this.ctx)
            this.configData = new Array;

            for (var i: number = 0; i < itemNum; i++) {
                var rec: any = new Object;
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


        }

    }

    export  class ListItemData {
        public id: number;
        public data: any;
        public clickFun: Function;
        public clickRect: Rectangle;
        public itemRender: ListItemRender;
    }

    export  class ListItemRender {
        public height: number;
        public widht: number;
        protected _listItemData: ListItemData;
        public uvData: any;
        public atlas: ListAtlas;
        public _selected: boolean;

        public setData($listItemData: ListItemData, $atlas: ListAtlas, $uvData: any): void {
            this._listItemData = $listItemData;
            this._listItemData.itemRender = this;

            this.uvData = $uvData;
            this.atlas = $atlas;

            this.draw();
        }

        public get listItemData(): ListItemData {
            return this._listItemData;
        }

        public setNewData($data: any): void {

        }

        public set selected(value: boolean) {
            this._selected = value;
        }

        public get selected(): boolean {
            return this._selected;
        }

        public draw(): void {

        }

        public redraw(): void {

        }

        public click(xpos: number, ypos: number): void {
            if (this._listItemData.clickFun) {
                //判断是否有指定按钮区域
                if (this._listItemData.clickRect) {
                    if (!this._listItemData.clickRect.isHitByPoint(xpos / UIData.Scale, ypos / UIData.Scale)) {
                        return
                    }

                }
                this._listItemData.clickFun(this._listItemData);
            }
        }


    }
}