var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bet;
(function (bet) {
    var Shader3D = Pan3d.Shader3D;
    var Display3D = Pan3d.Display3D;
    var ObjData = Pan3d.ObjData;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Scene_data = Pan3d.Scene_data;
    var BaseDiplay3dShader = /** @class */ (function (_super) {
        __extends(BaseDiplay3dShader, _super);
        function BaseDiplay3dShader() {
            return _super.call(this) || this;
        }
        BaseDiplay3dShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
        };
        BaseDiplay3dShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "varying vec3 posv3d;" +
                "void main(void)" +
                "{" +
                "   posv3d= v3Position;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        BaseDiplay3dShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform vec3 colortop;" +
                "uniform vec3 colorbottom;" +
                "varying vec3 posv3d;" +
                "void main(void)\n" +
                "{\n" +
                "vec3 tempcolor=colortop;" +
                "tempcolor=colortop+(colorbottom-colortop)*(posv3d.y+1.0)/2.0;" +
                "gl_FragColor =vec4(tempcolor,1.0);\n" +
                "}";
            return $str;
        };
        BaseDiplay3dShader.BaseDiplay3dShader = "BaseDiplay3dShader";
        return BaseDiplay3dShader;
    }(Shader3D));
    bet.BaseDiplay3dShader = BaseDiplay3dShader;
    var GameBgSprite = /** @class */ (function (_super) {
        __extends(GameBgSprite, _super);
        function GameBgSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            return _this;
        }
        GameBgSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(BaseDiplay3dShader.BaseDiplay3dShader, new BaseDiplay3dShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BaseDiplay3dShader.BaseDiplay3dShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-1, -1, 0.999);
            this.objData.vertices.push(1, -1, 0.999);
            this.objData.vertices.push(1, 1, 0.999);
            this.objData.vertices.push(-1, 1, 0.999);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.upToGpu();
        };
        GameBgSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        GameBgSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVc3fv(this.shader, "colortop", [GunqiuModel.useColor.bgTop.x, GunqiuModel.useColor.bgTop.y, GunqiuModel.useColor.bgTop.z]);
                Scene_data.context3D.setVc3fv(this.shader, "colorbottom", [GunqiuModel.useColor.bgBottom.x, GunqiuModel.useColor.bgBottom.y, GunqiuModel.useColor.bgBottom.z]);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return GameBgSprite;
    }(Display3D));
    bet.GameBgSprite = GameBgSprite;
})(bet || (bet = {}));
//# sourceMappingURL=GameBgSprite.js.map