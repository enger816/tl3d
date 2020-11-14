module Pan3d {
    export class BaseButton extends UICompenent {
        //按钮按下纹理坐标
        public trDown: Rectangle;
        protected _state: number;
        protected _currentState: number;


        public constructor() {
            super();
            this.trDown = new Rectangle;
            this._state = 0;
            this._currentState = 0;

        }

        public update(): void {

            if (this._currentState != this._state) {
                this.applyRenderSize();
                this._currentState = this._state;
            }

        }
        public applyRenderSize(): void {
            super.applyRenderSize()
            if (this._state == 0) {
                this.renderData2[0] = this.tr.width;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x;
                this.renderData2[3] = this.tr.y;
            } else if (this._state == 1) {
                this.renderData2[0] = this.trDown.width;
                this.renderData2[1] = this.trDown.height;
                this.renderData2[2] = this.trDown.x;
                this.renderData2[3] = this.trDown.y;
            }
            this.uiRender.makeRenderDataVc(this.vcId)
        }

    }
}