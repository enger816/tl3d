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
    var Matrix3D = Pan3d.Matrix3D;
    var Scene_data = Pan3d.Scene_data;
    var TooJianTouDisplay3DShader = /** @class */ (function (_super) {
        __extends(TooJianTouDisplay3DShader, _super);
        function TooJianTouDisplay3DShader() {
            return _super.call(this) || this;
        }
        TooJianTouDisplay3DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
        };
        TooJianTouDisplay3DShader.prototype.getVertexShaderString = function () {
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
        TooJianTouDisplay3DShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec4 colorv4;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =colorv4;\n" +
                "}";
            return $str;
        };
        TooJianTouDisplay3DShader.TooJianTouDisplay3DShader = "TooJianTouDisplay3DShader";
        return TooJianTouDisplay3DShader;
    }(Shader3D));
    xyz.TooJianTouDisplay3DShader = TooJianTouDisplay3DShader;
    var TooJianTouDisplay3DSprite = /** @class */ (function (_super) {
        __extends(TooJianTouDisplay3DSprite, _super);
        function TooJianTouDisplay3DSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.colorVect = new Vector3D(1, 1, 1, 1);
            return _this;
        }
        TooJianTouDisplay3DSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(TooJianTouDisplay3DShader.TooJianTouDisplay3DShader, new TooJianTouDisplay3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TooJianTouDisplay3DShader.TooJianTouDisplay3DShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            var numLen = 0.2;
            var $num50 = 2 * (numLen) * 2;
            var $wSize = 5 * (numLen) * 2;
            this.makeObjData(this.objData, new Vector3D(+$wSize, 0, 0), new Vector3D(-$wSize, $num50, 0), Vector3D.X_AXIS, 12);
            this.upToGpu();
        };
        TooJianTouDisplay3DSprite.prototype.makeObjData = function ($objData, A, B, $axis, $colorId) {
            var $m = new Matrix3D;
            var $p0;
            var $p1;
            var $num;
            for (var i = 0; i < 359; i++) {
                $m.identity();
                $m.appendRotation(i, $axis);
                $p0 = $m.transformVector(A);
                $p1 = $m.transformVector(B);
                $objData.vertices.push($p0.x, $p0.y, $p0.z);
                $objData.vertices.push($p1.x, $p1.y, $p1.z);
                $objData.uvs.push($colorId, $colorId);
                $objData.uvs.push($colorId, $colorId);
                if (i != 0) {
                    $num = i - 1;
                    $objData.indexs.push($num * 2 + 2, $num * 2 + 1, $num * 2 + 3);
                }
            }
        };
        TooJianTouDisplay3DSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        TooJianTouDisplay3DSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVc4fv(this.shader, "baseColorVect4", [this.colorVect.x, this.colorVect.y, this.colorVect.z, this.colorVect.w]);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return TooJianTouDisplay3DSprite;
    }(Display3D));
    xyz.TooJianTouDisplay3DSprite = TooJianTouDisplay3DSprite;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooJianTouDisplay3DSprite.js.map