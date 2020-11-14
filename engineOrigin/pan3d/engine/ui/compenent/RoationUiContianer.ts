module Pan3d {
    export class RoationUIShader extends Shader3D {
        static RoationUiShader: string = "RoationUiShader";
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
                "uniform vec2 paix[40];" +  //偏移
                "uniform float rotation[40];" +
                "uniform float sc;" +

                "varying vec2 v_texCoord;" +


                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v_texCoord = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                "   float angle = rotation[int(v2uv.z)];" +
                "   data = ui[int(v2uv.z)];" +

                "vec3 pos = vec3(0.0,0.0,0.0);" +
                /*
                "vec3 ptpos = vec3(v3Pos.x-0.5,v3Pos.y+0.5,0.0);" +
    
                "vec4 np = vec4(sin(angle), cos(angle), 0, 0);\n" +
                "pos.x = np.x * ptpos.y + np.y * ptpos.x;\n" +
                "pos.y = np.y * ptpos.y - np.x * ptpos.x;\n" +
    
                " pos.x = pos.x + 0.5;" +
                " pos.y = pos.y - 0.5;" +
                */

                "pos.x = v3Pos.x;" +
                "pos.y = v3Pos.y ;" +

                "pos.x = pos.x-0.5;" +
                "pos.y = pos.y+0.5 ;" +

                "pos.xy =pos.xy+ paix[int(v2uv.z)].xy;" +

                "pos.xy = pos.xy * data.zw * 2.0;" +
                "pos.y=pos.y/sc;" +

                "vec3 ptpos = pos;" +
                "vec4 np = vec4(sin(angle), cos(angle), 0, 0);\n" +
                "pos.x = np.x * ptpos.y + np.y * ptpos.x;\n" +
                "pos.y = np.y * ptpos.y - np.x * ptpos.x;\n" +


                "pos.y=pos.y*sc;" +


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
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +

                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +


                "}"
            return $str

        }

    }

    class RoationUIRenderComponent extends UIRenderComponent {
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
            ProgrmaManager.getInstance().registe(RoationUIShader.RoationUiShader, new RoationUIShader);
            this.shader = ProgrmaManager.getInstance().getProgram(RoationUIShader.RoationUiShader);
            this.program = this.shader.program;
            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2");
            this.alphaLocation = Scene_data.context3D.getLocation(this.program, "rotation");
        }
        public creatBaseComponent($skinName: string): RoationUICompenent {
            var ui: RoationUICompenent = new RoationUICompenent();
            ui.skinName = $skinName;
            var rec: UIRectangle = this.uiAtlas.getRec($skinName);
            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;
            ui.uiRender = this;
            return ui;
        }


    }


    class RoationUICompenent extends UICompenent {
        public constructor() {
            super();
        }
        public rotation: number = 0.0;
        public aotuRotation: number = 0.0
        public paix: Vector2D = new Vector2D(0, 0);
        public setVc(program: any, index: number): void {
            this.rotation += this.aotuRotation;
            Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
            Scene_data.context3D.setVc2fv(program, "paix[" + index + "]", [this.paix.x, this.paix.y]);
            Scene_data.context3D.setVc1fv(program, "rotation[" + index + "]", [this.rotation * Math.PI / 180]);
            Scene_data.context3D.setVc1fv(program, "sc", [Scene_data.stageWidth / Scene_data.stageHeight]);

        }

    }


}