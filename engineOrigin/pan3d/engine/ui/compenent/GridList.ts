module Pan3d {
    export class GridList extends List {
        private wNum: number
        public constructor() {
            super();
        }

        public testPoint($x: number, $y: number): boolean {
            if ($x > this.absoluteX
                && $x < (this.absoluteX + this._showWidth * UIData.Scale)
                && $y > this.absoluteY
                && $y < (this.absoluteY + this._oHeight * UIData.Scale)) {
                return true;
            } else {
                return false;
            }
        }

        public setGridData($data: Array<ListItemData>, ItemRender: any, $wNum: number,
            itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number,
            $width: number = 256, $height: number = 300): void {

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

            var atlas: GridListAtlas = new GridListAtlas();
            this.uiRender.setAtlas(atlas);
            atlas.setGridData(contentWidth, contentHeight, itemWidth, itemHeight, $wNum, $data.length);
            this._itemRenderAry = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var listItemRender: ListItemRender = new ItemRender();
                listItemRender.setData($data[i], atlas, atlas.configData[i]);
                this._itemRenderAry.push(listItemRender);
            }

            this._oHeight = itemHeight * Math.ceil(this._itemRenderAry.length / this.wNum);
            if (this._oHeight > this._showHeight) {
                this._needScoller = true;
            } else {
                this._needScoller = false;
            }

            this.uiRender.applyObjData();

        }

        public setGridItemData($data: any, $idx: number): boolean {
            var tf: boolean = this._itemRenderAry[$idx].listItemData.data ? true : false;
            this._itemRenderAry[$idx].setNewData($data);
            return tf;
        }

        public setGridItemFun($fun: Function, $idx: number): void {
            this._itemRenderAry[$idx].listItemData.clickFun = $fun;
        }

        public clearItemByIndex($idx: number): void {
            for (var i: number = 0; i < this._itemRenderAry.length; i++) {
                if (this._itemRenderAry[i].listItemData.data && this._itemRenderAry[i].listItemData.data.dataIndex == $idx) {
                    this._itemRenderAry[i].setNewData(null);
                    this._itemRenderAry[i].listItemData.clickFun = null;
                }
            }
        }

        public clearItemByPos($pos: number): void {
            this._itemRenderAry[$pos].setNewData(null);
            this._itemRenderAry[$pos].listItemData.clickFun = null;
        }

        public redraw(): void {
            for (var i: number = 0; i < this._itemRenderAry.length; i++) {
                this._itemRenderAry[i].redraw();
            }
        }


        protected testItemClick($xPos: number, $ypos: number): void {
            var xpos: number = $xPos - this.absoluteX;
            var ypos: number = $ypos - this.absoluteY;

            var itemH: number = this._itemHeight * UIData.Scale;
            var itemW: number = this._itemWidth * UIData.Scale;

            var indexW: number = float2int(xpos / itemW);
            var indexH: number = float2int(ypos / itemH);
            var index: number = indexH * this.wNum + indexW;

            if (index >= this._itemRenderAry.length) {
                return;
            }

            this._itemRenderAry[index].click(xpos - (itemW * (indexW - 1)), ypos - (itemH * (indexH - 1)));

        }

        public pushVaData(objData: ObjData, i: number, beginIndex: number): number {
            if (!this._itemRenderAry) {
                return 0;
            }

            var hNum: number = Math.ceil(this._itemRenderAry.length / this.wNum);

            var xitem: number = this._itemWidth / this.width;
            var yitem: number = this._itemHeight / this.height;
            for (var i: number = 0; i < hNum + 1; i++) {
                for (var j: number = 0; j < this.wNum + 1; j++) {
                    objData.vertices.push(j * xitem, -i * yitem, 0);
                    objData.uvs.push(j * xitem, i * yitem, 0);
                }
            }

            var allNum: number = (hNum) * (this.wNum);

            for (var j: number = 0; j < allNum; j++) {
                var num: number = j % this.wNum + float2int(j / this.wNum) * (this.wNum + 1);
                var i1: number = num + beginIndex;
                var i2: number = num + 1 + beginIndex;
                var i3: number = num + this.wNum + 1 + beginIndex;
                var i4: number = num + 1 + this.wNum + 1 + beginIndex;

                objData.indexs.push(i1, i2, i4, i1, i4, i3);
            }

            return beginIndex + (this._itemRenderAry.length + 1) * 2;
        }

    }

    export  class GridListAtlas extends ListAtlas {
        private getAlphaImg($width: number, $height: number): ImageData {

            var $ImageData: ImageData = this.ctx.createImageData($width, $height);
            for (var i: number = 0; i < $ImageData.data.length; i++) {
                $ImageData.data[i] = 0
            }
            return $ImageData
        }
        public setGridData($width: number, $height: number, itemWidth: number,
            itemHeight: number, wNum: number, itemNum: number): void {

            this.ctx = UIManager.getInstance().getContext2D($width, $height, false);
            this.ctx.fillStyle = "rgba(0,0,0,0.0)";
            this.ctx.fillRect(0, 0, $width, $height);
            this.textureRes = TextureManager.getInstance().getCanvasTexture(this.ctx)
            this.configData = new Array;
        
            var hNum: number = Math.ceil(itemNum / wNum);


            var flag: number = 0;

            for (var i: number = 0; i < hNum; i++) {
                for (var j: number = 0; j < wNum; j++) {
                    flag = i * wNum + j;

                    var rec: any = new Object;
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

        }
    }
}