module Pan3d {
    export class FrameCompenent extends UICompenent {

        public constructor() {
            super();

        }

        public setFrameData($rect: UIRectangle): void {

            this._frameData = $rect

            this.totalcurrent = this._frameData.cellX * this._frameData.cellY

        }
        public applyRenderSize(): void {
            if (!this.parent) {
                return;
            }

            this.renderX = this.absoluteX / Scene_data.stageWidth;
            this.renderY = this.absoluteY / Scene_data.stageHeight;

            this.renderWidth = this.absoluteWidth / Scene_data.stageWidth;
            this.renderHeight = this.absoluteHeight / Scene_data.stageHeight;

            this.renderData[0] = this.renderX;
            this.renderData[1] = this.renderY;
            this.renderData[2] = this.renderWidth * this._uvScale;
            this.renderData[3] = this.renderHeight;

            var cellX: number = this._frameData.cellX;
            var cellY: number = this._frameData.cellY;
            var tw: number = (this._frameData.width / cellX)
            var th: number = (this._frameData.height / cellY)
            var rect: Rectangle = new Rectangle(0, 0, tw, th)
            var tempNum: number = this.current % (cellX * cellY);
            rect.x = (tempNum % cellX * tw)
            rect.y = (float2int(tempNum / cellX) * th)

            this.renderData2[0] = rect.width * this._uvScale;
            this.renderData2[1] = rect.height;
            this.renderData2[2] = rect.x + this._frameData.x
            this.renderData2[3] = rect.y + this._frameData.y

            this.uiRender.makeRenderDataVc(this.vcId)
        }

        public getSkinCtxRect(): Rectangle {
            var $uiRec: UIRectangle = this._frameData
            var $toRect: Rectangle = new Rectangle;
            $toRect.width = $uiRec.pixelWitdh / $uiRec.cellX;
            $toRect.height = $uiRec.pixelHeight / $uiRec.cellY;
            $toRect.x = ((this.current) % $uiRec.cellX) * $toRect.width;
            $toRect.y = Math.floor((this.current) / $uiRec.cellX) * $toRect.height;
            return $toRect;
        }
        public drawToCtx($uiAtlas: UIAtlas, $ctx: CanvasRenderingContext2D): void {
            var $uiRec: UIRectangle = this._frameData;;
            var $toRect: Rectangle = this.getSkinCtxRect();
            $uiAtlas.updateCtx($ctx, $uiRec.pixelX + $toRect.x, $uiRec.pixelY + $toRect.y);
        }

        private _frameData: UIRectangle
        private isTrue: boolean = false
        public current: number = 0;
        public totalcurrent: number = 0
        public speed: number = 6;
        public endFlag: boolean = false;
        public update(): void {

            if (!this._frameData) {
                return
            }
            if (this.stopStatic == 2) {
                return
            }
            this.applyRenderSize()

            this.speedNum++
            if (this.speedNum > this.speed) {
                this.current++
                this.speedNum = 0
            }
            var cellX: number = this._frameData.cellX;
            var cellY: number = this._frameData.cellY;
            if (this.current > (cellX * cellY - 1)) {
                if (this.stopStatic == 1) {
                    this.stopStatic = 2
                    this.endFlag = true;
                } else {
                    this.current = 0
                }

            }
        }
        public goToAndPlay($num: number): void {
            this.stopStatic = 1;
            this.current = $num;
        }
        public goToAndStop($num: number): void {
            this.stopEnd();
            this.current = $num;
            this.applyRenderSize()
        }
        public Invisible(): void {
            if (this.renderData[2] != 0 && this.renderData[3] != 0) {  //这里特殊规避重复设置 高宽不为0
                this.stopEnd()
                this.renderData[0] = 0
                this.renderData[1] = 0;
                this.renderData[2] = 0;
                this.renderData[3] = 0;
                this.uiRender.makeRenderDataVc(this.vcId)
            }

        }
        public play(): void {
            this.stopStatic = 0;
        }
        public stopEnd(): void {
            this.stopStatic = 2
            var cellX: number = this._frameData.cellX;
            var cellY: number = this._frameData.cellY;
            this.current = cellX * cellY - 1
            this.applyRenderSize()
        }
        public stopStatic: number = 0
        public speedNum: number = 0

    }
}