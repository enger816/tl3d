module Pan3d {
    export class UICompenent extends EventDispatcher {
        //设定相对坐标
        protected _x: number = 0;
        protected _y: number = 0;
        protected _width: number = 0;
        protected _height: number = 0;
        public z: number = 0;
        public data: any;
        //设定绝对坐标
        public absoluteX: number = 0;
        public absoluteY: number = 0;
        public absoluteWidth: number = 0;
        public absoluteHeight: number = 0;
        public enable: boolean = true

        protected _left: number = 0;
        protected _right: number = 0;
        protected _center: number = 0;
        protected _xType: number = -1;

        protected _top: number = 0;
        protected _bottom: number = 0;
        protected _middle: number = 0;
        protected _yType: number = -1;

        public name: string;

        public tr: Rectangle;

        //实际渲染坐标
        public renderX: number = 0;
        public renderY: number = 0;
        public renderWidth: number = 0;
        public renderHeight: number = 0;

        public uiRender: UIRenderComponent;
        public parent: UIConatiner;
        public preParent: UIConatiner;

        public renderData: Array<number>;
        public renderData2: Array<number>;

        public mouseEnable: boolean;

        public scale: number = 1;

        public skinName: string;

        public baseRec: any;

        public isVirtual: boolean = false;

        public vcId: number = 0;

        protected _uvScale: number = 1;  // UV显示比例

        private _rendering: boolean = false;

        public constructor() {
            super();
            this.tr = new Rectangle;
            this.mouseEnable = true;
        }

        public onRenderingFun: Function;
        public unRenderingFun: Function;
        public set rendering(val: boolean) {
            this._rendering = val;
        }

        public get rendering(): boolean {
            return this._rendering;
        }



        public addStage(): void {
            this.renderData = [0, 0, 0, 0];
            this.renderData2 = [1, 1, 0, 0];
            this.applyAbsolutePoint();
            this.uiRender.addRenderUI(this);

        }

        public removeStage(): void {
            this.uiRender.removeRenderUI(this);

        }
        public isU: boolean = false;
        public isV: boolean = false;
        public pushVaData(objData: ObjData, i: number, beginIndex: number): number {
            objData.vertices.push(
                0, 0, 0,
                1, 0, 0,
                1, -1, 0,
                0, -1, 0);
            objData.uvs.push(
                this.isU ? 1 : 0, this.isV ? 1 : 0, i,
                this.isU ? 0 : 1, this.isV ? 1 : 0, i,
                this.isU ? 0 : 1, this.isV ? 0 : 1, i,
                this.isU ? 1 : 0, this.isV ? 0 : 1, i);
            objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);
            return beginIndex + 4;

            /*
            objData.vertices.push(
                0, 0, 0,
                1, 0, 0,
                1, -1, 0,
                0, -1, 0);
            objData.uvs.push(
                0, 0, i,
                1, 0, i,
                1, 1, i,
                0, 1, i);
            objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);
            return beginIndex + 4;
            */
        }


        public setVc(program: any, index: number): void {
            Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
        }

        public update(): void {

        }

        public applyRenderSize(): void {
            if (!this.parent) {
                return;
            }

            this.renderX = this.absoluteX / Scene_data.stageWidth;
            this.renderY = this.absoluteY / Scene_data.stageHeight;

            this.renderWidth = this.absoluteWidth / Scene_data.stageWidth;
            this.renderHeight = this.absoluteHeight / Scene_data.stageHeight;


            if (this._uvScale >= 0) {
                //this.renderX + this.renderWidth * this.scale - this.renderWidth * this.scale * this._uvScale;
                this.renderData[0] = this.renderX;
                this.renderData[1] = this.renderY;
                this.renderData[2] = this.renderWidth * this.scale * this._uvScale;
                this.renderData[3] = this.renderHeight * this.scale;

                //this.tr.x +this.tr.width - this.tr.width * this._uvScale
                this.renderData2[0] = this.tr.width * this._uvScale;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x;
                this.renderData2[3] = this.tr.y;
            } else {
                var $vt: number = Math.abs(this._uvScale);
                this.renderData[0] = this.renderX + this.renderWidth * (1 - $vt);
                this.renderData[1] = this.renderY;
                this.renderData[2] = this.renderWidth * this.scale * $vt;
                this.renderData[3] = this.renderHeight * this.scale;

                this.renderData2[0] = this.tr.width * $vt;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x + (this.tr.width * (1 - $vt));
                this.renderData2[3] = this.tr.y;
            }


            this.uiRender.makeRenderDataVc(this.vcId)

            // 
        }
        public set uvScale(value) {
            this._uvScale = value
            this.applyAbsolutePoint();
        }
        public get uvScale(): number {
            return this._uvScale;
        }

        public setScale(num: number): void {
            this.scale = num;
            this.applyAbsolutePoint();
        }

        public applyAbsolutePoint(): void {
            if (this.parent) {
                //this.absoluteX = this._x * UIData.Scale + this.parent.x;
                //this.absoluteY = this._y * UIData.Scale + this.parent.y;
                if (this._xType == -1) {
                    this.absoluteX = this._x * UIData.Scale * this.scale + this.parent.x;
                } else if (this._xType == 0) {
                    this.absoluteX = this._left * UIData.Scale;
                } else if (this._xType == 1) {
                    this.absoluteX = Scene_data.stageWidth - this._right * UIData.Scale - this.width * UIData.Scale;
                } else if (this._xType == 2) {
                    this.absoluteX = this._center * UIData.Scale + Scene_data.stageWidth / 2 - this.width * UIData.Scale / 2;
                }

                if (this._yType == -1) {
                    this.absoluteY = this._y * UIData.Scale * this.scale + this.parent.y;
                } else if (this._yType == 0) {
                    this.absoluteY = this._top * UIData.Scale;
                } else if (this._yType == 1) {
                    this.absoluteY = Scene_data.stageHeight - this._bottom * UIData.Scale - this.height * UIData.Scale;
                } else if (this._yType == 2) {
                    this.absoluteY = this._middle * UIData.Scale + Scene_data.stageHeight / 2 - this.height * UIData.Scale / 2;
                }

                this.absoluteWidth = this.width * UIData.Scale;
                this.absoluteHeight = this.height * UIData.Scale;
                this.applyRenderSize();
            }
        }

        public set x(value: number) {
            if (value != this._x) {
                this._x = value;
                this.applyAbsolutePoint();
            }
        }
        public get x() {
            return this._x;
        }

        public set y(value: number) {
            if (value != this._y) {
                this._y = value;
                this.applyAbsolutePoint();
            }
        }
        public get y() {
            return this._y;
        }
        public set width(value: number) {
            if (value != this._width) {
                this._width = value;
                this.applyAbsolutePoint();
            }
        }
        public get width() {
            return this._width;
        }
        public set height(value: number) {
            if (value != this._height) {
                this._height = value;
                this.applyAbsolutePoint();
            }
        }
        public get height() {
            return this._height;
        }

        public set left(value: number) {
            this._left = value;
            this._xType = 0;
            this.applyAbsolutePoint();
        }

        public set right(value: number) {
            this._right = value;
            this._xType = 1;
            this.applyAbsolutePoint();
        }

        public set center(value: number) {
            this._center = value;
            this._xType = 2;
            this.applyAbsolutePoint();
        }

        public set top(value: number) {
            this._top = value;
            this._yType = 0;
            this.applyAbsolutePoint();
        }

        public set bottom(value: number) {
            this._bottom = value;
            this._yType = 1;
            this.applyAbsolutePoint();
        }

        public set middle(value: number) {
            this._middle = value;
            this._yType = 2;
            this.applyAbsolutePoint();
        }

        public testPoint($x: number, $y: number): boolean {
            if ($x > this.absoluteX && $x < (this.absoluteX + this.absoluteWidth) && $y > this.absoluteY && $y < (this.absoluteY + this.absoluteHeight)) {
                return true;
            } else {
                return false;
            }
        }

        public setPos($x: number, $y: number) {
            this.x = $x;
            this.y = $y;
        }

        public interactiveEvent(e: InteractiveEvent): boolean {
            if (!this.enable) {
                return false
            }
            var evtType: string = e.type;

            var eventMap: Object = this._eventsMap;
            if (!eventMap) {
                return false;
            }

            var list: Array<any> = eventMap[e.type];
            if (!list) {
                return false;
            }

            if (!this.testPoint(e.x, e.y)) {
                return false;
            }

            var length: number = list.length;
            if (length == 0) {
                return false;
            }

            e.target = this;

            //for (var i: number = 0; i < length; i++) {
            //    var eventBin: any = list[i];
            //    eventBin.listener.call(eventBin.thisObject, e);
            //}

            for (var i: number = length - 1; i >= 0; i--) {
                var eventBin: any = list[i];
                //console.log("uiname", this.name)
                eventBin.listener.call(eventBin.thisObject, e);
            }

            return true;
        }

        public preShow(): void {
            if (this.preParent) {
                this.preParent.addChild(this);
            }

        }
        public preHide(): void {
            if (this.preParent) {
                this.preParent.removeChild(this);
            }
        }

    }
}