var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var RoationUIShader = /** @class */ (function (_super) {
        __extends(RoationUIShader, _super);
        function RoationUIShader() {
            return _super.call(this) || this;
        }
        RoationUIShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        RoationUIShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform vec4 ui[40];" +
                "uniform vec4 ui2[40];" +
                "uniform vec2 paix[40];" + //偏移
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
                "}";
            return $str;
        };
        RoationUIShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        RoationUIShader.RoationUiShader = "RoationUiShader";
        return RoationUIShader;
    }(Pan3d.Shader3D));
    Pan3d.RoationUIShader = RoationUIShader;
    var RoationUIRenderComponent = /** @class */ (function (_super) {
        __extends(RoationUIRenderComponent, _super);
        function RoationUIRenderComponent() {
            return _super.call(this) || this;
        }
        RoationUIRenderComponent.prototype.update = function () {
            if (!this.visible || this._uiList.length == 0) {
                //  FpsMc.tipStr = "显示数:0";
                return;
            }
            Pan3d.Scene_data.context3D.setBlendParticleFactors(0);
            Pan3d.Scene_data.context3D.setProgram(this.program);
            for (var i = 0; i < this._uiList.length; i++) {
                this._uiList[i].update();
                this._uiList[i].setVc(this.shader, i);
            }
            //  FpsMc.tipStr = "显示数:" + (this._uiList.length)
            Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Pan3d.Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            if (this.uiAtlas) {
                Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
            }
            else {
                Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
            }
            Pan3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        };
        RoationUIRenderComponent.prototype.initData = function () {
            this._uiList = new Array;
            this.objData = new Pan3d.ObjData();
            Pan3d.ProgrmaManager.getInstance().registe(RoationUIShader.RoationUiShader, new RoationUIShader);
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(RoationUIShader.RoationUiShader);
            this.program = this.shader.program;
            this.uiProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "ui2");
            this.alphaLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "rotation");
        };
        RoationUIRenderComponent.prototype.creatBaseComponent = function ($skinName) {
            var ui = new RoationUICompenent();
            ui.skinName = $skinName;
            var rec = this.uiAtlas.getRec($skinName);
            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;
            ui.uiRender = this;
            return ui;
        };
        return RoationUIRenderComponent;
    }(Pan3d.UIRenderComponent));
    var RoationUICompenent = /** @class */ (function (_super) {
        __extends(RoationUICompenent, _super);
        function RoationUICompenent() {
            var _this = _super.call(this) || this;
            _this.rotation = 0.0;
            _this.aotuRotation = 0.0;
            _this.paix = new Pan3d.Vector2D(0, 0);
            return _this;
        }
        RoationUICompenent.prototype.setVc = function (program, index) {
            this.rotation += this.aotuRotation;
            Pan3d.Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Pan3d.Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
            Pan3d.Scene_data.context3D.setVc2fv(program, "paix[" + index + "]", [this.paix.x, this.paix.y]);
            Pan3d.Scene_data.context3D.setVc1fv(program, "rotation[" + index + "]", [this.rotation * Math.PI / 180]);
            Pan3d.Scene_data.context3D.setVc1fv(program, "sc", [Pan3d.Scene_data.stageWidth / Pan3d.Scene_data.stageHeight]);
        };
        return RoationUICompenent;
    }(Pan3d.UICompenent));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=RoationUiContianer.js.map