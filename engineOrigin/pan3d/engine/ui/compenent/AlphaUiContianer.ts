module Pan3d {
    export class AlphaUIShader extends Shader3D {
        static AlphaUiShader: string = "AlphaUiShader";
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
                "uniform vec4 ui[40];" +
                "uniform vec4 ui2[40];" +
                "uniform float alpha[40];" +

                "varying vec2 v_texCoord;" +
                "varying float v_alpha;" +

                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v_texCoord = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                "   v_alpha = alpha[int(v2uv.z)];" +

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
                " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "varying float v_alpha;" +

                "void main(void)\n" +
                "{\n" +

                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "infoUv *=v_alpha;\n" +
                "gl_FragColor = infoUv;\n" +


                "}"
            return $str

        }

    }

    export  class AlphaUIRenderComponent extends UIRenderComponent {
        public constructor() {
            super();
        }
        public update(): void {
            if (!this.visible || this._uiList.length == 0) {
                //  FpsMc.tipStr = "显示数:0";
                return;
            }
            Scene_data.context3D.setBlendParticleFactors(0);
            Scene_data.context3D.setProgram(this.program);
            for (var i: number = 0; i < this._uiList.length; i++) {
                this._uiList[i].update();
                this._uiList[i].setVc(this.shader, i);
            }

            //  FpsMc.tipStr = "显示数:" + (this._uiList.length)

            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            if (this.uiAtlas) {
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
            } else {
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
            }
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);


        }
        protected alphaLocation: WebGLUniformLocation;
        protected initData(): void {
            this._uiList = new Array;
            this.objData = new ObjData();
            ProgrmaManager.getInstance().registe(AlphaUIShader.AlphaUiShader, new AlphaUIShader);
            this.shader = ProgrmaManager.getInstance().getProgram(AlphaUIShader.AlphaUiShader);
            this.program = this.shader.program;
            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2");
            this.alphaLocation = Scene_data.context3D.getLocation(this.program, "alpha");
        }
        public creatBaseComponent($skinName: string): AlphaUICompenent {
            var ui: AlphaUICompenent = new AlphaUICompenent();
            ui.skinName = $skinName;
            var rec: UIRectangle = this.uiAtlas.getRec($skinName);

            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;

            ui.uiRender = this;



            return ui;
        }

        public creatGrid9Component($skinName: string, $width: number, $height: number): AlphaGrid9UICompenent {
            var ui: AlphaGrid9UICompenent = new AlphaGrid9UICompenent();
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
        public createFrame($upskin: string): AlphaFrameCompenent {

            var frameMc: AlphaFrameCompenent = new AlphaFrameCompenent;
            frameMc.skinName = $upskin;
            var rec: UIRectangle = this.uiAtlas.getRec($upskin);
            frameMc.setFrameData(rec);
            frameMc.uiRender = this;
            return frameMc;
        }
    }
    export class AlphaFrameCompenent extends FrameCompenent {
        public constructor() {
            super();
        }
        public alpha: number = 1
        public setVc(program: any, index: number): void {
            Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
            Scene_data.context3D.setVc1fv(program, "alpha[" + index + "]", [this.alpha]);
        }
    }
    export class AlphaGrid9UICompenent extends Grid9Compenent {
        public constructor() {
            super();
        }
        public alpha: number = 1
        public setVc(program: any, index: number): void {
            Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
            Scene_data.context3D.setVc1fv(program, "alpha[" + index + "]", [this.alpha]);
        }
    }

    export class AlphaUICompenent extends UICompenent {
        public constructor() {
            super();
        }
        public alpha: number = 1
        public setVc(program: any, index: number): void {
            Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
            Scene_data.context3D.setVc1fv(program, "alpha[" + index + "]", [this.alpha]);
        }

    }

    export  class AlphaUiContianer extends Dis2DUIContianerPanel {
        protected _baseRender: AlphaUIRenderComponent;
        public constructor($classVo: any, $rect: Rectangle, $num: number) {
            super($classVo, $rect, $num);
        }
        protected creatBaseRender(): void {
            this._baseRender = new AlphaUIRenderComponent;
        }
    }

}