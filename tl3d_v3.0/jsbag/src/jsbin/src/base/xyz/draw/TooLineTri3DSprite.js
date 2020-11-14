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
    var TooLineTri3DShader = /** @class */ (function (_super) {
        __extends(TooLineTri3DShader, _super);
        function TooLineTri3DShader() {
            return _super.call(this) || this;
        }
        TooLineTri3DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "nrmPosition");
        };
        TooLineTri3DShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec3 nrmPosition;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec3 v3_nrm;" +
                "void main(void)" +
                "{" +
                "   v3_nrm = nrmPosition;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        TooLineTri3DShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec3 v3_nrm;" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =vec4(v3_nrm,1.0);\n" +
                "}";
            return $str;
        };
        TooLineTri3DShader.TooLineTri3DShader = "TooLineTri3DShader";
        return TooLineTri3DShader;
    }(Shader3D));
    xyz.TooLineTri3DShader = TooLineTri3DShader;
    var TooLineTri3DSprite = /** @class */ (function (_super) {
        __extends(TooLineTri3DSprite, _super);
        function TooLineTri3DSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.updateMatrix;
            return _this;
        }
        TooLineTri3DSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(TooLineTri3DShader.TooLineTri3DShader, new TooLineTri3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TooLineTri3DShader.TooLineTri3DShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            var hitBox = new xyz.TooObjectHitBox(0, 0, 0);
            var size = 0.1;
            hitBox.beginx = -0;
            hitBox.beginy = -size;
            hitBox.beginz = -size;
            hitBox.endx = 20;
            hitBox.endy = size;
            hitBox.endz = size;
            this.objData = this.makeBoxTampData(hitBox, 1);
            //this.makeBoxObjdata(new Vector3D(1,1,1))
            this.upToGpu();
        };
        TooLineTri3DSprite.prototype.makeBoxObjdata = function (color) {
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0);
            this.objData.vertices.push(100, 0, 0);
            this.objData.vertices.push(100, 0, 100);
            this.objData.normals = new Array();
            this.objData.normals.push(color.x, color.y, color.z);
            this.objData.normals.push(color.x, color.y, color.z);
            this.objData.normals.push(color.x, color.y, color.z);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
        };
        TooLineTri3DSprite.prototype.makeBoxTampData = function (hitbox, scale) {
            if (scale === void 0) { scale = 1; }
            var tempObj = new ObjData;
            var Vitem = new Array();
            var w = Math.max(Math.abs(hitbox.beginx), Math.abs(hitbox.endx)) * scale;
            var h = Math.max(Math.abs(hitbox.beginz), Math.abs(hitbox.endz)) * scale;
            var bx = -10;
            var by = -10;
            var bz = -10;
            var ex = 10;
            var ey = 10;
            var ez = 10;
            bx = hitbox.beginx;
            ex = hitbox.endx;
            by = hitbox.beginy;
            ey = hitbox.endy;
            bz = hitbox.beginz;
            ez = hitbox.endz;
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
            Iitem.push(4, 5, 6);
            Iitem.push(4, 6, 7);
            Iitem.push(5, 1, 2);
            Iitem.push(5, 2, 6);
            Iitem.push(6, 2, 3);
            Iitem.push(6, 3, 7);
            Iitem.push(4, 0, 1);
            Iitem.push(4, 1, 5);
            Iitem.push(4, 3, 0);
            Iitem.push(4, 7, 3);
            tempObj.vertices = new Array;
            tempObj.normals = new Array;
            tempObj.indexs = new Array;
            for (var i = 0; i < Iitem.length; i++) {
                var P = Vitem[Iitem[i]];
                tempObj.vertices.push(P.x, P.y, P.z);
                tempObj.normals.push(1, 1, 0);
                tempObj.indexs.push(i);
            }
            return tempObj;
        };
        TooLineTri3DSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.normalsBuffer = Scene_data.context3D.uploadBuff3D(this.objData.normals);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        TooLineTri3DSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return TooLineTri3DSprite;
    }(Display3D));
    xyz.TooLineTri3DSprite = TooLineTri3DSprite;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooLineTri3DSprite.js.map