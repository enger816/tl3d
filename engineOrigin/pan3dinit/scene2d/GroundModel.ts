module scene2d {

    export class Ground2dBaseShader extends Pan3d.Shader3D {
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

    export class Ground2dBaseSprite extends Pan3d.Display3D {

        constructor() {
            super();
            this.x = 0;
            this.y = 0;
            this.width = 100;
            this.height = 100;
            this.initData()
        }
        protected initData(): void {
            Pan3d.ProgrmaManager.getInstance().registe(Ground2dBaseShader.Ground2dBaseShader, new Ground2dBaseShader);
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Ground2dBaseShader.Ground2dBaseShader);
            this.program = this.shader.program;

            this.objData = new Pan3d.ObjData;
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
            var $ctx: CanvasRenderingContext2D = Pan3d.UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,255,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = Pan3d. TextureManager.getInstance().getCanvasTexture($ctx)


      
        }
        public setPicUrl($url: string): void {
          //  var $url: string = Scene_data.fileRoot + "pan/zymap2d/scene/1007/maps/0_0.jpg"
            Pan3d.TextureManager.getInstance().getTexture($url, ($texture: Pan3d. TextureRes) => {
                this._uvTextureRes = $texture;
            });
        }
        public _uvTextureRes: Pan3d.TextureRes

        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Pan3d. Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Pan3d. Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }
        public update(): void {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Pan3d.  Scene_data.context3D.setProgram(this.program);
                Pan3d. Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Pan3d. Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Pan3d. Scene_data.context3D.setVc4fv(this.shader, "movesize", this.getMoveSizeData());
                Pan3d.  Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Pan3d.   Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        }
        public width: number;
        public height: number;
        public static perentpos: Pan3d.Vector2D = new Pan3d.Vector2D()
        private getMoveSizeData(): Array<number> {
            
            var $tx: number = (this.x + Ground2dBaseSprite.perentpos.x) / (Pan3d.Scene_data.stageWidth / 2) - 1;
            var $ty: number = 1 - (this.y + Ground2dBaseSprite.perentpos.y) / (Pan3d.Scene_data.stageHeight / 2);
            var $tw: number = this.width / (Pan3d.Scene_data.stageWidth / 2);
            var $th: number = this.height / (Pan3d.Scene_data.stageHeight / 2);
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

            Pan3d.Scene_data.context3D.setWriteDepth(false);
            Pan3d.Scene_data.context3D.setDepthTest(false);
            for (var i: number = 0; i < this._groundItem.length; i++) {
                this._groundItem[i].update();
            }

        }
        public addGroundPicByeUrl($url: string = null, $rect: Pan3d.Rectangle = null): Ground2dBaseSprite {

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
}
