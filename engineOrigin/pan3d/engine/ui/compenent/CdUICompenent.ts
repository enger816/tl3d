module Pan3d {
    export class CdRenderComponent extends UIRenderComponent {
        public constructor() {
            super();
            this.initProgram()
        }
        public setVc(): void {
            for (var i: number = 0; i < this._uiList.length; i++) {
                this._uiList[i].setVc(this.shader, i);
            }
            super.setVc();
        }
        protected dataTProLocation: WebGLUniformLocation;
        private initProgram(): void {
            ProgrmaManager.getInstance().registe(CdUIShader.CdUIShader, new CdUIShader);
            this.shader = ProgrmaManager.getInstance().getProgram(CdUIShader.CdUIShader);
            this.program = this.shader.program;
            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui")
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2")
            this.dataTProLocation = Scene_data.context3D.getLocation(this.program, "dataT")
        }

        public getComponent($uiName: string): UICompenent {
            var obj: any = this.uiAtlas.getLayoutData($uiName);
            var ui: UICompenent = this.creatBaseComponent(obj.dataItem[0]);
            ui.width = obj.rect.width;
            ui.height = obj.rect.height;
            ui.x = obj.rect.x;
            ui.y = obj.rect.y;
            ui.baseRec = obj.rect;
            ui.name = $uiName;
            return ui;
        }
        public creatBaseComponent($skinName: string): CdUICompenent {
            var ui: CdUICompenent = new CdUICompenent();
            ui.skinName = $skinName;
            var rec: UIRectangle = this.uiAtlas.getRec($skinName);
            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;
            ui.uiRender = this;
            return ui;
        }


    }
    class CdUICompenent extends UICompenent {
        public constructor() {
            super();
            this._skipNum = float2int(Math.random() * 360)
        }
        public cdTotalnum: number = 0;
        public lastTime: number = 0;
        private _skipNum: number = 0;
        //  public colorVer: Array<number> = [1, 0.5, 0, 0.5]
        public isRound: boolean = false
        public visible: boolean = true

        public setCdNum(value: number): void {
            this._skipNum = 360 * value
        }
        public get isFinish(): boolean {
            if (this._skipNum >= 360) {
                return true
            } else {
                return false
            }
        }
        public update(): void {
            if (this.cdTotalnum != 0) {
                var n: number = (TimeUtil.getTimer() - this.lastTime) / this.cdTotalnum;
                if (n < 1) {
                    this.setCdNum(n);
                } else {
                    this.setCdNum(1);
                }
            }
            super.update();
        }
        public clockwise: boolean = true;
        public setVc(program: any, index: number): void {
            var nk: number = ((this._skipNum % 360)) / 180 * Math.PI
            Scene_data.context3D.setVc4fv(program, "dataTime[" + index + "]", [nk, this.clockwise ? 0 : 1, 0, 1]);
        }
    }




    class CdUIShader extends Shader3D {
        static CdUIShader: string = "CdUIShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +

                "uniform vec4 ui[20];" +
                "uniform vec4 ui2[20];" +
                "uniform vec4 dataTime[20];" +

                "varying vec2 v_pos;\n" +
                "varying vec2 u_pos;" +
                "varying vec4 v_dataTime;" +


                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v_dataTime = dataTime[int(v2uv.z)];" +

                "   v_pos = vec2(v3Pos.x ,v3Pos.y);" +
                "   u_pos = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +

                "   data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 u_pos;\n" +
                "varying vec2 v_pos;" +
                "varying vec4 v_dataTime;\n" +

                "void main(void)\n" +
                "{\n" +

                "float alpha =1.0;\n" +
                "float tx =v_pos.x*2.0 - 1.0;\n" +
                "float ty =v_pos.y*2.0 + 1.0;\n" +
                "float atanNum =atan(tx,ty);\n" +

                "vec4 infoUv = texture2D(s_texture, u_pos.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "if (tx>0.0) {\n" +
                "if (v_dataTime.x<atanNum) {\n" +
                "alpha=0.0;\n" +
                "}; \n" +
                "} else {\n" +
                "atanNum =atanNum+6.283;\n" +
                "if (v_dataTime.x<atanNum) {\n" +
                "alpha=0.0;\n" +
                "}; \n" +
                "}; \n" +

                "if (v_dataTime.y==1.0) {\n" +
                "alpha=1.0-alpha;\n" +
                "}; \n" +


                "gl_FragColor = infoUv*alpha;\n" +

                "}"
            return $str

        }

    }


}