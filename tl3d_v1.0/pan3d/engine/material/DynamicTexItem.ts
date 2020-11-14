module Pan3d {
    export class DynamicTexItem extends DynamicBaseTexItem {
        public url: string;
        //public target: TexItem;
        //public paramName: string;
        private _textureDynamic: WebGLTexture;
        //public textureRes:TextureRes;
        public isParticleColor: boolean;
        public curve: Curve;
        private _life: number;

        public constructor() {
            super();
        }

        public destory(): void {
            super.destory();

            if (this._textureDynamic) {
                Scene_data.context3D.deleteTexture(this._textureDynamic);
            }

            //if (this.textureRes){
            //    this.textureRes.useNum--;
            //}

            this.target = null;
            //this.curve = null;
        }

        public initCurve($type: number): void {
            this.curve = new Curve
            this.curve.type = $type;
        }

        public get texture(): WebGLTexture {
            if (this._textureDynamic) {
                return this._textureDynamic;
            } else {
                if (this.textureRes) {
                    return this.textureRes.texture;
                } else {
                    return null;
                }
            }

        }

        public creatTextureByCurve(): void {
            var i: number = 0;
            var endVecIndex: number = this.curve.valueVec.length - 1;
            var imgNumVec: Array<number> = new Array;
            for (var i: number = 0; i < this.life; i++) {
                if (i < this.curve.begintFrame) {

                    imgNumVec.push(this.curve.valueVec[0][0] * 0xff, this.curve.valueVec[0][1] * 0xff, this.curve.valueVec[0][2] * 0xff, this.curve.valueVec[0][3] * 0xff);
                } else if (i > this.curve.maxFrame) {
                    if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    } else {
                        imgNumVec.push(this.curve.valueVec[endVecIndex][0] * 0xff, this.curve.valueVec[endVecIndex][1] * 0xff, this.curve.valueVec[endVecIndex][2] * 0xff, this.curve.valueVec[endVecIndex][3] * 0xff);
                    }

                } else {
                    if (this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    } else {
                        var index: number = i - this.curve.begintFrame;

                        imgNumVec.push(this.curve.valueVec[index][0] * 0xff, this.curve.valueVec[index][1] * 0xff, this.curve.valueVec[index][2] * 0xff, this.curve.valueVec[index][3] * 0xff);
                    }

                }
            }


            var img: ImageData = ColorTransition.getInstance().getImageDataByVec(imgNumVec, this.life);
            this._textureDynamic = Scene_data.context3D.getTexture(img);

        }

        //public argbToHex(r: Number, g: Number, b: Number, a: Number): uint {
        //    var expColor: uint = uint(a * 0xff) << 24 | uint(r * 0xff) << 16 | uint(g * 0xff) << 8 | uint(b * 0xff);

        //    return expColor;
        //}

        public get life(): number {
            return this._life;
        }

        public set life(value: number) {
            this._life = value;
        }


    }
}