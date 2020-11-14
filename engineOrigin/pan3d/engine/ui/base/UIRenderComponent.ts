module Pan3d {
    export class UIRenderComponent {

        protected _uiList: Array<UICompenent>;
        public objData: ObjData;
        public program: WebGLProgram;
        public shader: Shader3D;
        public textureRes: TextureRes;


        public container: UIConatiner;

        //public configData: any;
        public uiAtlas: UIAtlas;

        private _rendering: boolean = false;

        public mask: UIMask;

        public modelRenderList: Array<Display3D>;

        public name: string;
        public scale: number = 1;
        public sortnum: number = 0;//排序编号

        public blenderMode: number = 0;


        public constructor() {
            this.initData();
        }

        public set rendering(val: boolean) {
            this._rendering = val;
            if (this._uiList) {
                for (var i: number = 0; i < this._uiList.length; i++) {
                    this._uiList[i].rendering = val;
                }
            }

        }

        public get rendering(): boolean {
            return this._rendering;
        }

        public get texture(): WebGLTexture {
            if (this.textureRes) {
                return this.textureRes.texture;
            } else {
                return null;
            }

        }
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void {
            this._uiList = new Array;
            //   this.container = new UIConatiner();
            this.objData = new ObjData();
            this.shader = ProgrmaManager.getInstance().getProgram(UIShader.UI_SHADER);
            this.program = this.shader.program;

            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui")
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2")



        }

        public resize(): void {

        }

        public setImgUrl($url: string): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + $url, ($texture: TextureRes) => {
                this.textureRes = $texture;
            });

        }

        public setInfo(configUrl: string, imgUrl: string, $fun: Function): void {
            this.uiAtlas = new UIAtlas;
            this.uiAtlas.setInfo(configUrl, imgUrl, () => {
                $fun();
            });
        }


        public setAtlas($atlas: UIAtlas): void {
            this.uiAtlas = $atlas;
        }


        public creatComponent($tx: number, $ty: number, $tw: number, $th: number): UICompenent {
            var ui: UICompenent = new UICompenent();
            ui.tr.sets($tx, $ty, $tw, $th);

            ui.uiRender = this;
            return ui;
        }

        public getComponent($uiName: string): UICompenent {
            var obj: any = this.uiAtlas.getLayoutData($uiName);

            if (obj) {

                var types: number = obj.type;
                if (types == 0) {
                    var ui: UICompenent = this.creatBaseComponent(obj.dataItem[0]);
                    ui.width = obj.rect.width;
                    ui.height = obj.rect.height;
                    ui.x = obj.rect.x;
                    ui.y = obj.rect.y;

                    ui.baseRec = obj.rect;
                    ui.name = $uiName;
                    return ui;
                } else if (types == 1) {
                    var g9ui: Grid9Compenent = this.creatGrid9Component(obj.dataItem[0], obj.rect.width, obj.rect.height);
                    g9ui.x = obj.rect.x;
                    g9ui.y = obj.rect.y;

                    g9ui.baseRec = obj.rect;
                    g9ui.name = $uiName;
                    return g9ui;
                } else if (types == 2) {
                    if (obj.selected) {
                        var sbtn: Button = this.createSelectButton(obj.dataItem[0], obj.dataItem[1]);
                        sbtn.width = obj.rect.width;
                        sbtn.height = obj.rect.height;
                        sbtn.x = obj.rect.x;
                        sbtn.y = obj.rect.y;

                        sbtn.baseRec = obj.rect;
                        sbtn.name = $uiName;
                        return sbtn;
                    } else {
                        var btn: Button = this.creatButton(obj.dataItem[0], obj.dataItem[1]);
                        btn.width = obj.rect.width;
                        btn.height = obj.rect.height;
                        btn.x = obj.rect.x;
                        btn.y = obj.rect.y;

                        btn.baseRec = obj.rect;
                        btn.name = $uiName;
                        return btn;
                    }
                } else if (types == 4) {

                    var sFrame: FrameCompenent = this.createFrame(obj.dataItem[0]);
                    sFrame.width = obj.rect.width;
                    sFrame.height = obj.rect.height;
                    sFrame.x = obj.rect.x;
                    sFrame.y = obj.rect.y;

                    sFrame.baseRec = obj.rect;
                    sFrame.name = $uiName;
                    return sFrame;
                }



            }

            return null;

        }
        public createFrame($upskin: string): FrameCompenent {

            var frameMc: FrameCompenent = new FrameCompenent;
            frameMc.skinName = $upskin;
            var rec: UIRectangle = this.uiAtlas.getRec($upskin);
            frameMc.setFrameData(rec);
            frameMc.uiRender = this;
            return frameMc;
        }

        public creatBaseComponent($skinName: string): UICompenent {
            var ui: UICompenent = new UICompenent();
            ui.skinName = $skinName;
            var rec: UIRectangle = this.uiAtlas.getRec($skinName);

            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;

            ui.uiRender = this;
            return ui;
        }

        public creatGrid9Component($skinName: string, $width: number, $height: number): Grid9Compenent {
            var ui: Grid9Compenent = new Grid9Compenent();
            ui.skinName = $skinName;
            var rec: UIGridRentangle = this.uiAtlas.getGridRec($skinName)
            ui.tr.setRec(rec);
            ui.ogw = rec.ogw;
            ui.ogh = rec.ogh;
            ui.gw = ui.ogw / rec.pixelWitdh;
            ui.gh = ui.ogh / rec.pixelHeight;
            ui.width = $width;
            ui.height = $height;

            ui.uiRender = this;
            return ui;
        }

        public creatButton($upskin: string, $downskin: string): Button {
            if (!this.uiAtlas.hasData) {
                return null;
            }

            var btn: Button = new Button;

            var rec: UIRectangle = this.uiAtlas.getRec($upskin)

            btn.tr.setRec(rec);
            btn.trDown.setRec(this.uiAtlas.getRec($downskin));

            btn.width = rec.pixelWitdh;
            btn.height = rec.pixelHeight;

            btn.uiRender = this;
            return btn;
        }

        public createSelectButton($upskin: string, $selectedskin: string): SelectButton {
            if (!this.uiAtlas.hasData) {
                return null;
            }

            var btn: SelectButton = new SelectButton;

            var rec: UIRectangle = this.uiAtlas.getRec($upskin)

            btn.tr.setRec(rec);
            btn.trDown.setRec(this.uiAtlas.getRec($selectedskin));

            btn.width = rec.pixelWitdh;
            btn.height = rec.pixelHeight;

            btn.uiRender = this;
            return btn;
        }





        public addRenderUI(ui: UICompenent): void {

            if (this._uiList.length >= 50) {
                //console.log("UIRenderComponent超限制51")
                alert("UIRenderComponent超限制51")
                return;
            }
            this._uiList.push(ui);
            ui.rendering = this.rendering;
            //this._uiList.sort((a: UICompenent, b: UICompenent) => { return a.z > b.z ? -1 : 1 });
            this.applyObjData();
        }

        public removeRenderUI(ui: UICompenent): void {
            var index: number = this._uiList.indexOf(ui);
            if (index != -1) {
                this._uiList.splice(index, 1);
            }
            ui.rendering = false;
            this.applyObjData();
        }

        public applyObjData(): void {
            this.objData.vertices.length = 0;
            this.objData.uvs.length = 0;
            this.objData.indexs.length = 0;

            //var wh: number = 20;
            var beginIndex: number = 0;
            for (var i: number = 0; i < this._uiList.length; i++) {
                var ui: UICompenent = this._uiList[i];
                if (ui.isVirtual) {
                    continue;
                }
                //this.objData.vertices.push(
                //    0, 0, 0, 
                //    1, 0, 0,
                //    1, -1, 0,
                //    0, -1, 0);
                //this.objData.uvs.push(
                //    0, 0, i,
                //    1, 0, i,
                //    1, 1, i,
                //    0, 1, i);
                //this.objData.indexs.push(i * 4, 1 + i * 4, 2 + i * 4, i * 4, 2 + i * 4, 3 + i * 4);
                beginIndex = ui.pushVaData(this.objData, i, beginIndex);
            }

            this.objData.treNum = this.objData.indexs.length;

            if (this.objData.vertexBuffer) {
                Scene_data.context3D.uploadBuff3DByBuffer(this.objData.vertexBuffer, this.objData.vertices);
                Scene_data.context3D.uploadBuff3DByBuffer(this.objData.uvBuffer, this.objData.uvs);
                Scene_data.context3D.uploadIndexBuff3DByBuffer(this.objData.indexBuffer, this.objData.indexs);
            } else {
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
            if (this.mask) {
                this.mask.scale = this.scale;
                this.mask.applyAbsolutePoint()
            }

            this.makeRenderDataVc(-1);
        }

        protected renderData: Float32Array = new Float32Array(0)
        protected renderData2: Float32Array = new Float32Array(0)
        //-1为所有都需要更新;
        public makeRenderDataVc($vcId: number): void {
            if (!this.renderData || (this.renderData && this.renderData.length != this._uiList.length * 4)) {
                //if (this.renderData.length != this._uiList.length * 4) {
                //  //console.log(this.renderData.length, this._uiList.length * 4, "$vcId", $vcId)
                //}
                this.renderData = new Float32Array(this._uiList.length * 4);
                this.renderData2 = new Float32Array(this._uiList.length * 4);
            }

            if ($vcId == -1) {
                for (var i: number = 0; this._uiList && i < this._uiList.length; i++) {
                    this._uiList[i].vcId = i;
                    this.renderData[i * 4 + 0] = this._uiList[i].renderData[0];
                    this.renderData[i * 4 + 1] = this._uiList[i].renderData[1];
                    this.renderData[i * 4 + 2] = this._uiList[i].renderData[2];
                    this.renderData[i * 4 + 3] = this._uiList[i].renderData[3];

                    this.renderData2[i * 4 + 0] = this._uiList[i].renderData2[0];
                    this.renderData2[i * 4 + 1] = this._uiList[i].renderData2[1];
                    this.renderData2[i * 4 + 2] = this._uiList[i].renderData2[2];
                    this.renderData2[i * 4 + 3] = this._uiList[i].renderData2[3];

                }
            } else {
                if ($vcId < this._uiList.length) {
                    this.renderData[$vcId * 4 + 0] = this._uiList[$vcId].renderData[0];
                    this.renderData[$vcId * 4 + 1] = this._uiList[$vcId].renderData[1];
                    this.renderData[$vcId * 4 + 2] = this._uiList[$vcId].renderData[2];
                    this.renderData[$vcId * 4 + 3] = this._uiList[$vcId].renderData[3];

                    this.renderData2[$vcId * 4 + 0] = this._uiList[$vcId].renderData2[0];
                    this.renderData2[$vcId * 4 + 1] = this._uiList[$vcId].renderData2[1];
                    this.renderData2[$vcId * 4 + 2] = this._uiList[$vcId].renderData2[2];
                    this.renderData2[$vcId * 4 + 3] = this._uiList[$vcId].renderData2[3];
                }
            }

        }
        private num: number = 0
        public visible: boolean = true
        public update(): void {


            if (!this.visible || this._uiList.length == 0) {
                if (this.modelRenderList && this.modelRenderList.length) {

                } else {
                    return
                }

            }

            if (this.mask) {
                var renderContext: WebGLRenderingContext = Scene_data.context3D.renderContext;
                renderContext.enable(renderContext.STENCIL_TEST);
                renderContext.stencilMask(0xFF);
                renderContext.stencilFunc(renderContext.NEVER, this.mask.level, 0xFF);
                renderContext.stencilOp(renderContext.REPLACE, renderContext.REPLACE, renderContext.REPLACE);
                this.mask.update();
                renderContext.stencilFunc(renderContext.LESS, this.mask.level - 1, 0xFF);
                renderContext.stencilOp(renderContext.KEEP, renderContext.KEEP, renderContext.KEEP);
            }

            Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
            ////console.log(this.shader.name);
            Scene_data.context3D.setProgram(this.program);

            this.setVc()
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);

            this.setTextureToGpu()

            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            if (this.mask) {
                Scene_data.context3D.renderContext.disable(Scene_data.context3D.renderContext.STENCIL_TEST);
            }
            if (this.modelRenderList) {
                for (var i: number = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }

        }
        protected setTextureToGpu(): void {
            if (this.uiAtlas) {
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
            } else {
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
            }

        }
        public setVc(): void {

            // for (var i: number = 0; i < this._uiList.length; i++) {
            //     this._uiList[i].update();
            //     this._uiList[i].setVc(this.program, i);
            // }

            for (var i: number = 0; i < this._uiList.length; i++) {
                this._uiList[i].update();
                if (this._uiList[i].vcId != i) {

                    // //console.log(this._uiList[i].vcId , i)
                }

            }
            Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData)
            Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2)

        }
        public addModel($display: Display3D): void {
            if (!this.modelRenderList) {
                this.modelRenderList = new Array;
            }
            var idx: number = this.modelRenderList.indexOf($display);
            if (idx != -1) {
                return;
            }
            this.modelRenderList.push($display);
        }
        public removeModel($display: Display3D): void {
            var idx: number = this.modelRenderList.indexOf($display);
            if (idx != -1) {
                this.modelRenderList.splice(idx, 1);
            }
        }
        public insetUi($e: Vector2D): UICompenent {

            for (var i: number = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].testPoint($e.x, $e.y)) {
                    return this._uiList[i]

                }
            }
            return null

        }
        public interactiveEvent($e: InteractiveEvent): boolean {
            if (this.mask) {
                if (!this.mask.testPoint($e.x, $e.y)) {
                    return false;
                }
            }
            var tf: boolean = false;
            for (var i: number = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].interactiveEvent($e) && UIManager.cando) {
                    tf = true;
                    UIManager.cando = false
                    return true

                }
            }
            return tf;
        }

        public dispose(): void {

            this.objData.destory();
            this.objData = null;

            if (this.uiAtlas) {
                this.uiAtlas.dispose();
                this.uiAtlas = null;
            }


            if (this.mask) {
                this.mask.dispose();
                this.mask = null;
            }

            this.renderData = null;
            this.renderData2 = null;

        }


    }
}