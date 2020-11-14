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
var md5list;
(function (md5list) {
    var Shader3D = Pan3d.Shader3D;
    var Display3DSprite = Pan3d.Display3DSprite;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var UIManager = Pan3d.UIManager;
    var DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var TextureManager = Pan3d.TextureManager;
    var Quaternion = Pan3d.Quaternion;
    var Md5MeshShader = /** @class */ (function (_super) {
        __extends(Md5MeshShader, _super);
        function Md5MeshShader() {
            return _super.call(this) || this;
        }
        Md5MeshShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "pos");
            $context.bindAttribLocation(this.program, 1, "v2Uv");
            $context.bindAttribLocation(this.program, 2, "boneID");
            $context.bindAttribLocation(this.program, 3, "boneWeight");
        };
        Md5MeshShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 pos;" +
                "attribute vec2 v2Uv;" +
                "attribute vec4 boneID;" +
                "attribute vec4 boneWeight;" +
                "varying vec2 v0;" +
                "uniform vec4 boneQ[70];" +
                "uniform vec3 boneD[70];" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "vec4 qdv(vec4 q, vec3 d, vec3 v ){" +
                "   vec3 t = 2.0 * cross(q.xyz, v);" +
                "   vec3 f = v + q.w * t + cross(q.xyz, t);" +
                "   return vec4(f.x + d.x, f.y + d.y, f.z + d.z, 1.0);" +
                " }" +
                "vec4 getQDdata(vec3 vdata){" +
                "   vec4 tempnum = qdv(boneQ[int(boneID.x)], boneD[int(boneID.x)], vdata) * boneWeight.x;" +
                "   tempnum += qdv(boneQ[int(boneID.y)], boneD[int(boneID.y)], vdata) * boneWeight.y;" +
                "   tempnum += qdv(boneQ[int(boneID.z)], boneD[int(boneID.z)], vdata) * boneWeight.z;" +
                "   tempnum += qdv(boneQ[int(boneID.w)], boneD[int(boneID.w)], vdata) * boneWeight.w;" +
                "   tempnum.x = tempnum.x * -1.0;" +
                "   return tempnum;" +
                " }" +
                "vec4 qdvNrm(vec4 q, vec3 v ){" +
                "      vec3 t = 2.0 * cross(q.xyz, v);" +
                "      vec3 f = v + q.w * t + cross(q.xyz, t);" +
                "      return vec4(f.x, f.y, f.z, 1.0);\n" +
                "}" +
                " vec4 getQDdataNrm(vec3 vdata){" +
                "    vec4 tempnum = qdvNrm(boneQ[int(boneID.x)], vdata) * boneWeight.x;" +
                "    tempnum += qdvNrm(boneQ[int(boneID.y)], vdata) * boneWeight.y;" +
                "    tempnum += qdvNrm(boneQ[int(boneID.z)], vdata) * boneWeight.z;" +
                "    tempnum += qdvNrm(boneQ[int(boneID.w)], vdata) * boneWeight.w;" +
                "    tempnum.x = tempnum.x * -1.0;" +
                "    tempnum.xyz = normalize(tempnum.xyz);" +
                "    return tempnum;" +
                "}" +
                " void main(void){" +
                "    v0 = v2Uv;" +
                "    vec4 vt0 = getQDdata(vec3(pos.x, pos.y, pos.z));" +
                "    vt0.xyz = vt0.xyz * 1.0;" +
                "    vt0 = posMatrix3D * vt0;" +
                "    vt0 = vpMatrix3D * vt0;" +
                "    gl_Position = vt0;\n" +
                "  }";
            return $str;
        };
        Md5MeshShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "varying vec2 v0;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(fs0, v0.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        Md5MeshShader.Md5MeshShader = "Md5MeshShader";
        return Md5MeshShader;
    }(Shader3D));
    md5list.Md5MeshShader = Md5MeshShader;
    var Md5MeshSprite = /** @class */ (function (_super) {
        __extends(Md5MeshSprite, _super);
        function Md5MeshSprite() {
            var _this = _super.call(this) || this;
            ProgrmaManager.getInstance().registe(Md5MeshShader.Md5MeshShader, new Md5MeshShader);
            _this.md5shader = ProgrmaManager.getInstance().getProgram(Md5MeshShader.Md5MeshShader);
            _this.loadTexture();
            return _this;
        }
        Md5MeshSprite.prototype.setMd5BodyUrl = function ($url) {
            this.loadBodyMesh($url);
        };
        Md5MeshSprite.prototype.loadBodyMesh = function ($url) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE, function ($str) {
                var $md5Analysis = new md5list.Md5Analysis();
                _this._md5MeshData = $md5Analysis.addMesh($str);
                new md5list.MeshImportSort().processMesh(_this._md5MeshData);
                _this.md5objData = new md5list.MeshToObjUtils().getObj(_this._md5MeshData);
            });
        };
        Md5MeshSprite.prototype.loadTexture = function () {
            var _this = this;
            var $ctx = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,0,0)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + "x_f_武当_01.jpg", function ($texture) {
                _this._uvTextureRes = $texture;
            });
            //   shuangdaonv.jpg
        };
        Md5MeshSprite.prototype.updateMaterialMesh = function ($mesh) {
        };
        Md5MeshSprite.prototype.update = function () {
            if (this.md5objData) {
                this.updateMaterialMeshCopy();
            }
        };
        Md5MeshSprite.prototype.updateMaterialMeshCopy = function () {
            this.baseShder = this.md5shader;
            Scene_data.context3D.setProgram(this.baseShder.program);
            Scene_data.context3D.setVpMatrix(this.baseShder, Scene_data.vpMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
            Scene_data.context3D.setRenderTexture(this.baseShder, "fc0", this._uvTextureRes.texture, 0);
            Scene_data.context3D.setVa(0, 3, this.md5objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this._md5MeshData.uvBuffer);
            Scene_data.context3D.setVa(2, 4, this._md5MeshData.boneIdBuffer);
            Scene_data.context3D.setVa(3, 4, this._md5MeshData.boneWeightBuffer);
            var newIDBoneArr = this._md5MeshData.boneNewIDAry;
            var baseBone = this.md5objData.bindPosAry;
            var $dualQuatFloat32Array = new DualQuatFloat32Array;
            $dualQuatFloat32Array.quat = new Float32Array(newIDBoneArr.length * 4);
            $dualQuatFloat32Array.pos = new Float32Array(newIDBoneArr.length * 3);
            for (var k = 0; k < newIDBoneArr.length; k++) {
                var $m = baseBone[newIDBoneArr[k]].clone();
                var $minverM = this.md5objData.invertAry[newIDBoneArr[k]].clone();
                $m.prepend($minverM);
                $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
                var $q = new Quaternion();
                $q.fromMatrix($m);
                var $p = $m.position;
                $dualQuatFloat32Array.quat[k * 4 + 0] = $q.x;
                $dualQuatFloat32Array.quat[k * 4 + 1] = $q.y;
                $dualQuatFloat32Array.quat[k * 4 + 2] = $q.z;
                $dualQuatFloat32Array.quat[k * 4 + 3] = $q.w;
                $dualQuatFloat32Array.pos[k * 3 + 0] = $p.x;
                $dualQuatFloat32Array.pos[k * 3 + 1] = $p.y;
                $dualQuatFloat32Array.pos[k * 3 + 2] = $p.z;
            }
            Scene_data.context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
            Scene_data.context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos); //所有的位移
            Scene_data.context3D.drawCall(this._md5MeshData.indexBuffer, this._md5MeshData.treNum);
            console.log(this._md5MeshData.treNum / 3, "boid=>", newIDBoneArr.length);
        };
        return Md5MeshSprite;
    }(Display3DSprite));
    md5list.Md5MeshSprite = Md5MeshSprite;
})(md5list || (md5list = {}));
//# sourceMappingURL=Md5MeshSprite.js.map