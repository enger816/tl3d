module Pan3d {
    export class FrameUIRender extends UIRenderComponent {
        public constructor() {
            super();
        }

        public setImg(url: string, wNum: number, hNum: number, fun: Function, num: number = 1): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + url, ($texture: TextureRes) => {
                var ui: UIAtlas = new UIAtlas;
                ui.textureRes = $texture;
                this.uiAtlas = ui;
                if (num == 1) {
                    fun(this.getFrameTipComponent(wNum, hNum));
                } else {
                    var ary: Array<FrameTipCompenent> = new Array;
                    for (var i: number = 0; i < num; i++) {
                        ary.push(this.getFrameTipComponent(wNum, hNum));
                    }
                    fun(ary);
                }

            });
        }

        public update(): void {
            super.update();
            for (var i: number = this._uiList.length - 1; i >= 0; i--) {
                if (this._uiList[i] instanceof FrameTipCompenent) {
                    (<FrameTipCompenent>this._uiList[i]).updateEnd();
                }
            }
        }

        public getFrameTipComponent(wNum: number, hNum: number): FrameTipCompenent {
            var frameTipCom: FrameTipCompenent = new FrameTipCompenent;

            var rec: UIRectangle = new UIRectangle;
            rec.x = 0;
            rec.y = 0;
            rec.width = 1;
            rec.height = 1;
            rec.pixelWitdh = this.uiAtlas.textureRes.width;
            rec.pixelHeight = this.uiAtlas.textureRes.height;
            rec.pixelX = 0;
            rec.pixelY = 0;
            rec.type = 2;
            rec.cellX = wNum;
            rec.cellY = hNum;

            frameTipCom.setFrameData(rec);
            frameTipCom.uiRender = this;

            var rect: any = new Object;
            rect.width = this.uiAtlas.textureRes.width / wNum;
            rect.height = this.uiAtlas.textureRes.height / hNum;
            rect.x = 0;
            rect.y = 0;

            frameTipCom.width = rect.width;
            frameTipCom.height = rect.height;
            frameTipCom.x = rect.x;
            frameTipCom.y = rect.y;
            frameTipCom.baseRec = rect;

            return frameTipCom;
        }

    }

    export  class FrameTipCompenent extends FrameCompenent {
        public constructor() {
            super();
        }
        public playOne($container: UIConatiner): void {
            if (!this.parent) {
                $container.addChild(this);
            }
            this.endFlag = false;
            this.goToAndPlay(0);
        }

        public updateEnd(): void {
            if (this.endFlag) {
                this.parent.removeChild(this);
            }
        }

    }
}