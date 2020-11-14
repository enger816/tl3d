

module Pan3d {
    export class Disp2DBaseText {
        public ui: UICompenent;
        public textureStr: string;  //在材质中的位置对应名字
        public parent: UIRenderComponent;
        public voRect: Rectangle;
        protected dtime: number = -1
        protected time: number = 0
        protected _data: any;
        protected lastKey: any; //这个用于标记上次提交到纹理中的数据
        protected oldPos: Vector2D = new Vector2D()
        public constructor() {
        }
        protected needUpData($pos: Vector3D): boolean {
            if (this.oldPos.x != $pos.x || this.oldPos.y != $pos.y || Scene_data.cam3D.needChange) {
                this.oldPos.x = $pos.x
                this.oldPos.y = $pos.y
                return true
            }
            return false
        }
        public set data(value: any) {
            this._data = value;
            this.makeData();
            this.time = 0;
            this.update();
        }
        public get data(): any {
            return this._data;
        }
        public makeData(): void {
        }
        public update(): void {
        }
        //这需要优化矩阵不必要每次都更新
        public Vector3DToVector2D($pos): Vector2D {
            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
            m.append(Scene_data.viewMatrx3D.clone());
            var p: Vector3D = m.transformVector($pos)
            var v2d: Vector2D = new Vector2D()
            v2d.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
            v2d.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
            return v2d;
        }
        public isEqualLastKey(value: any): boolean {
            return false
        }

    }

    //用于显示同屏2D容器，
    export   class Dis2DUIContianerPanel extends Dis2DUIContianerBase {
        protected _baseRender: UIRenderComponent;
        public constructor($classVo: any, $rect: Rectangle, $num: number) {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.creatBaseRender()
            this.addRender(this._baseRender);
            this.initData($classVo, $rect, $num)
        }
        protected creatBaseRender(): void {
            this._baseRender = new UIRenderComponent;

        }
        //显示单元类, 尺寸，数量
        private initData($classVo: any, $rect: Rectangle, $num: number): void {
            this._voNum = Math.floor($num)
            this._voRect = $rect;
            this._textureRect = new Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($rect.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($rect.height * this._voNum) / Math.log(2))));

            this._baseRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._baseRender.uiAtlas;
            $uiAtlas.configData = new Array();
            $uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            $uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx);
            this.makeBaseUi($classVo);
            ;
        }

        private _textureRect: Rectangle;//纹理尺寸
        private _voNum: number;//最大同屏数量
        private _voRect: Rectangle;//单元尺寸
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<Pan3d.baseMeshVo>;//没有上传成功的

        //根据数量创建单元格UICompenent 并存在数组中，待需要时应用
        private makeBaseUi($classVo: any): void {
            var $uiAtlas: UIAtlas = this._baseRender.uiAtlas;
            this._uiItem = new Array();
            this._lostItem = new Array();

            for (var i: number = 0; i < this._voNum; i++) {
                var $disp2DBaseText: Disp2DBaseText = new $classVo()
                this._uiItem.push($disp2DBaseText);
                $disp2DBaseText.parent = this._baseRender;
                $disp2DBaseText.voRect = this._voRect;
                $disp2DBaseText.textureStr = "id" + i;
                $uiAtlas.configData.push($uiAtlas.getObject($disp2DBaseText.textureStr, 0, i * this._voRect.height, this._voRect.width, this._voRect.height, this._textureRect.width, this._textureRect.height));
                $disp2DBaseText.ui = <UICompenent>this._baseRender.creatBaseComponent($disp2DBaseText.textureStr);
                $disp2DBaseText.ui.width *= 1.0;
                $disp2DBaseText.ui.height *= 1.0;
            }
        }
        //找到可用的单元 找到后赋值并添加ui到显示队列
        public showTemp($data: any): Disp2DBaseText {
            this.clearLostItem();
            var empty: Disp2DBaseText;
            //找到上一个数据和现在是一样的对象.避免重复更新纹理
            for (var j: number = 0; j < this._uiItem.length; j++) {
                if (this._uiItem[j].data == null && this._uiItem[j].isEqualLastKey($data)) {
                    empty = this._uiItem[j];
                    break
                }
            }
            if (!empty) {
                for (var i: number = 0; i < this._uiItem.length; i++) {
                    if (this._uiItem[i].data == null) {
                        empty = this._uiItem[i];
                        break
                    }
                }
            }
            if (empty) {
                empty.data = $data;
                this.addChild(empty.ui);
            } else {
                this._lostItem.push($data)
            }
            return empty
        }
        private clearLostItem(): void {
            for (var i: number = (this._lostItem.length - 1); i > 0; i--) {
                if (this._lostItem[i].clear) {
                    this._lostItem.splice(i, 1);
                }
            }
        }
        public playLost(): void {
            if (this._lostItem.length) {
                this.showTemp(this._lostItem.pop())
            }

        }
        public clearOneTemp(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (!this._uiItem[i].data) {
                    return;
                }
            }
            this._lostItem.length = 0;
            this.clearTemp(this._uiItem[0].data);


        }
        //清理单元内的内容并需要将对象移出显示队例
        public clearTemp($data: any): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data == $data) {
                    this._uiItem[i].data = null
                    this.removeChild(this._uiItem[i].ui);
                    break
                }
            }
            this.playLost()
        }
        public clearAll(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    this.clearTemp(this._uiItem[i].data)
                }
            }
        }
        private updateFun: Function;
        public update(t: number): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    this._uiItem[i].update();
                }
            }
            /*
            if (this.getUiItemLen() <( this._uiItem.length-1)) {
                this.playLost()
            }
            */

        }
        public getUiItemLen(): number {
            var $num: number = 0;
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    $num++;
                }
            }
            return $num;
        }

    }
}