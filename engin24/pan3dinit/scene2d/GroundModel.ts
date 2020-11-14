import {Shader3D} from "../../pan3d/engine/program/Shader3D"
import {Display3D} from "../../pan3d/engine/display3D/Display3D"
import {Vector2D} from "../../pan3d/engine/math/Vector2D"
import {ProgrmaManager} from "../../pan3d/engine/program/ProgramManager"
import {ObjData} from "../../pan3d/engine/base/ObjData"
import {UIManager} from "../../pan3d/engine/ui/UIManager"
import {TextureManager} from "../../pan3d/engine/material/TextureManager"
import {TextureRes} from "../../pan3d/engine/material/TextureRes"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {Rectangle} from "../../pan3d/engine/math/Rectangle"


    export class Ground2dBaseShader extends Shader3D {
        static Ground2dBaseShader: string = "Ground2dBaseShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +

                "uniform vec4 movesize;" +

                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0.xy*=movesize.zw;" +
                "   vt0.xy+=movesize.xy;" +
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
                "gl_FragColor =infoUv;\n" +
                "}"
            return $str

        }

    }

    export class Ground2dBaseSprite extends Display3D {

        constructor() {
            super();
            this.x = 0;
            this.y = 0;
            this.width = 100;
            this.height = 100;
            this.initData()
        }
        protected initData(): void {
            ProgrmaManager.getInstance().registe(Ground2dBaseShader.Ground2dBaseShader, new Ground2dBaseShader);
            this.shader = ProgrmaManager.getInstance().getProgram(Ground2dBaseShader.Ground2dBaseShader);
            this.program = this.shader.program;

            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, -1, 0);
            this.objData.vertices.push(1, -1, 0);
            this.objData.vertices.push(1, 0, 0);
            this.objData.vertices.push(0, 0, 0);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 1);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 0);

            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);

            this.loadTexture();
            this.upToGpu();
        }
        private loadTexture(): void {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,255,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes =  TextureManager.getInstance().getCanvasTexture($ctx)


      
        }
        public setPicUrl($url: string): void {
          //  var $url: string = Scene_data.fileRoot + "pan/zymap2d/scene/1007/maps/0_0.jpg"
            TextureManager.getInstance().getTexture($url, ($texture:  TextureRes) => {
                this._uvTextureRes = $texture;
            });
        }
        public _uvTextureRes: TextureRes

        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer =  Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer =  Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }
        public update(): void {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                  Scene_data.context3D.setProgram(this.program);
                 Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                 Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                 Scene_data.context3D.setVc4fv(this.shader, "movesize", this.getMoveSizeData());
                  Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                   Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        }
        public width: number;
        public height: number;
        public static perentpos: Vector2D = new Vector2D()
        private getMoveSizeData(): Array<number> {
            
            var $tx: number = (this.x + Ground2dBaseSprite.perentpos.x) / (Scene_data.stageWidth / 2) - 1;
            var $ty: number = 1 - (this.y + Ground2dBaseSprite.perentpos.y) / (Scene_data.stageHeight / 2);
            var $tw: number = this.width / (Scene_data.stageWidth / 2);
            var $th: number = this.height / (Scene_data.stageHeight / 2);
            return [$tx, $ty, $tw, $th]
        }
    }

    export class GroundModel {
        private static _instance: GroundModel;
        public static getInstance(): GroundModel {
            if (!this._instance) {
                this._instance = new GroundModel();
            }
            return this._instance;
        }
        constructor() {
            this._groundItem = new Array();
        }
        public update(): void {

            Scene_data.context3D.setWriteDepth(false);
            Scene_data.context3D.setDepthTest(false);
            for (var i: number = 0; i < this._groundItem.length; i++) {
                this._groundItem[i].update();
            }

        }
        public addGroundPicByeUrl($url: string = null, $rect: Rectangle = null): Ground2dBaseSprite {

            var $dis: Ground2dBaseSprite = new Ground2dBaseSprite();
            if ($url) {
                $dis.setPicUrl($url);
            }
            if ($rect) {
                $dis.x = $rect.x;
                $dis.y = $rect.y;
                $dis.width = $rect.width;
                $dis.height = $rect.height;
            }
            this._groundItem.push($dis);
            return $dis;
        }
       
        private _groundItem: Array<Ground2dBaseSprite>;

    }

