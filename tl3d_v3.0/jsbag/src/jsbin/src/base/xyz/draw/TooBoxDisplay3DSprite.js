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
var xyz;
(function (xyz) {
    var Shader3D = Pan3d.Shader3D;
    var Display3D = Pan3d.Display3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Scene_data = Pan3d.Scene_data;
    var TooBoxDisplay3DShader = /** @class */ (function (_super) {
        __extends(TooBoxDisplay3DShader, _super);
        function TooBoxDisplay3DShader() {
            return _super.call(this) || this;
        }
        TooBoxDisplay3DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
        };
        TooBoxDisplay3DShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "uniform vec4 baseColorVect4;" +
                "varying vec4 colorv4;\n" +
                "void main(void)" +
                "{" +
                "   colorv4 = baseColorVect4 ;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        TooBoxDisplay3DShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec4 colorv4;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =colorv4;\n" +
                "}";
            return $str;
        };
        TooBoxDisplay3DShader.TooBoxDisplay3DShader = "TooBoxDisplay3DShader";
        return TooBoxDisplay3DShader;
    }(Shader3D));
    xyz.TooBoxDisplay3DShader = TooBoxDisplay3DShader;
    var TooBoxDisplay3DSprite = /** @class */ (function (_super) {
        __extends(TooBoxDisplay3DSprite, _super);
        function TooBoxDisplay3DSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.colorVect = new Vector3D(1, 1, 1, 1);
            return _this;
        }
        TooBoxDisplay3DSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(TooBoxDisplay3DShader.TooBoxDisplay3DShader, new TooBoxDisplay3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TooBoxDisplay3DShader.TooBoxDisplay3DShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            this.objData = this.makeBoxTampData(0.1);
            this.upToGpu();
        };
        TooBoxDisplay3DSprite.prototype.makeBoxTampData = function (scale) {
            if (scale === void 0) { scale = 1; }
            var tempObj = new ObjData;
            var Vitem = new Array();
            var bx = -10 * scale;
            var by = -10 * scale;
            var bz = -10 * scale;
            var ex = 10 * scale;
            var ey = 10 * scale;
            var ez = 10 * scale;
            //手工写入一个盒子的模型
            Vitem.push(new Vector3D(bx, by, ez));
            Vitem.push(new Vector3D(bx, by, bz));
            Vitem.push(new Vector3D(ex, by, bz));
            Vitem.push(new Vector3D(ex, by, ez));
            Vitem.push(new Vector3D(bx, ey, ez));
            Vitem.push(new Vector3D(bx, ey, bz));
            Vitem.push(new Vector3D(ex, ey, bz));
            Vitem.push(new Vector3D(ex, ey, ez));
            //不考虑是否是正面
            var Iitem = new Array();
            Iitem.push(0, 1, 2);
            Iitem.push(0, 2, 3);
            Iitem.push(4, 6, 5);
            Iitem.push(4, 7, 6);
            Iitem.push(5, 2, 1);
            Iitem.push(5, 6, 2);
            Iitem.push(6, 3, 2);
            Iitem.push(6, 7, 3);
            Iitem.push(4, 1, 0);
            Iitem.push(4, 5, 1);
            Iitem.push(4, 0, 3);
            Iitem.push(4, 3, 7);
            tempObj.vertices = new Array;
            tempObj.indexs = new Array;
            for (var i = 0; i < Iitem.length; i++) {
                var P = Vitem[Iitem[i]];
                tempObj.vertices.push(P.x, P.y, P.z);
                tempObj.indexs.push(i);
            }
            return tempObj;
        };
        TooBoxDisplay3DSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        TooBoxDisplay3DSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.cullFaceBack(false);
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVc4fv(this.shader, "baseColorVect4", [this.colorVect.x, this.colorVect.y, this.colorVect.z, this.colorVect.w]);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return TooBoxDisplay3DSprite;
    }(Display3D));
    xyz.TooBoxDisplay3DSprite = TooBoxDisplay3DSprite;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooBoxDisplay3DSprite.js.map