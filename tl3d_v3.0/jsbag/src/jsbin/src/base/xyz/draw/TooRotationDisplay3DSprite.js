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
var cctv;
(function (cctv) {
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
    cctv.TooJianTouDisplay3DShader = TooJianTouDisplay3DShader;
    var TooRotationDisplay3DSprite = /** @class */ (function (_super) {
        __extends(TooRotationDisplay3DSprite, _super);
        function TooRotationDisplay3DSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.colorVect = new Vector3D(1, 1, 1, 1);
            return _this;
        }
        TooRotationDisplay3DSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(TooJianTouDisplay3DShader.TooJianTouDisplay3DShader, new TooJianTouDisplay3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TooJianTouDisplay3DShader.TooJianTouDisplay3DShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            var numLen = 0.2;
            var $num50 = 2 * (numLen) * 2;
            var $wSize = 5 * (numLen) * 2;
            this.objData = this.mathRoundTri(2);
            this.upToGpu();
        };
        TooRotationDisplay3DSprite.prototype.mathRoundTri = function ($scale) {
            if ($scale === void 0) { $scale = 1; }
            var $objData = new ObjData;
            $objData.vertices = [];
            $objData.uvs = [];
            $objData.indexs = [];
            var $num50 = 10;
            var _disNum360 = 360;
            var $wSize = 1 * ($num50 / 50) * $scale;
            var A = new Vector3D(+$wSize, $num50, 0);
            var B = new Vector3D(-$wSize, $num50, 0);
            var $m = new Matrix3D;
            var $p0;
            var $p1;
            var $num;
            var $indexLen = 0;
            for (var i = 0; i < _disNum360; i++) {
                $m.identity();
                $m.appendRotation(i, Vector3D.X_AXIS);
                $p0 = $m.transformVector(A);
                $p1 = $m.transformVector(B);
                $objData.vertices.push($p0.x, $p0.y, $p0.z);
                $objData.vertices.push($p1.x, $p1.y, $p1.z);
                $objData.uvs.push(0, 0);
                $objData.uvs.push(0, 0);
                if (i != 0) {
                    $num = i - 1;
                    $objData.indexs.push($indexLen + $num * 2 + 0, $indexLen + $num * 2 + 1, $indexLen + $num * 2 + 2);
                    $objData.indexs.push($indexLen + $num * 2 + 2, $indexLen + $num * 2 + 1, $indexLen + $num * 2 + 3);
                }
            }
            return $objData;
        };
        TooRotationDisplay3DSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        TooRotationDisplay3DSprite.prototype.update = function () {
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
        return TooRotationDisplay3DSprite;
    }(Display3D));
    cctv.TooRotationDisplay3DSprite = TooRotationDisplay3DSprite;
})(cctv || (cctv = {}));
//# sourceMappingURL=TooRotationDisplay3DSprite.js.map