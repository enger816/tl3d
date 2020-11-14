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
    var Display3DSprite = Pan3d.Display3DSprite;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var LoadManager = Pan3d.LoadManager;
    var Quaternion = Pan3d.Quaternion;
    var DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
    var UIManager = Pan3d.UIManager;
    var TextureManager = Pan3d.TextureManager;
    var Scene_data = Pan3d.Scene_data;
    var Md5MoveSprite = /** @class */ (function (_super) {
        __extends(Md5MoveSprite, _super);
        function Md5MoveSprite() {
            var _this = _super.call(this) || this;
            _this.lastTm = 0;
            _this._actionTime = 0;
            _this.skipNum = 0;
            ProgrmaManager.getInstance().registe(md5list.Md5MeshShader.Md5MeshShader, new md5list.Md5MeshShader);
            _this.md5shader = ProgrmaManager.getInstance().getProgram(md5list.Md5MeshShader.Md5MeshShader);
            _this.loadTexture();
            return _this;
        }
        Md5MoveSprite.prototype.loadBodyMesh = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + this.bodyUrl, LoadManager.XML_TYPE, function ($str) {
                _this.md5MeshData = new md5list.Md5Analysis().addMesh($str);
                new md5list.MeshImportSort().processMesh(_this.md5MeshData);
                _this.md5objData = new md5list.MeshToObjUtils().getObj(_this.md5MeshData);
                _this.loadAnimFrame();
            });
        };
        Md5MoveSprite.prototype.setMd5url = function ($bodyurl, $animurl, $picurl) {
            var _this = this;
            if ($picurl === void 0) { $picurl = null; }
            this.bodyUrl = $bodyurl;
            this.animUrl = $animurl;
            if ($picurl) {
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + $picurl, function ($texture) {
                    _this.uvTextureRes = $texture;
                });
            }
            this.loadBodyMesh();
        };
        Md5MoveSprite.prototype.loadAnimFrame = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + this.animUrl, LoadManager.XML_TYPE, function ($str) {
                var $matrixAry = new md5list.Md5animAnalysis().addAnim($str);
                _this.frameQuestArr = new Array;
                for (var i = 0; i < $matrixAry.length; i++) {
                    var $frameAry = $matrixAry[i];
                    for (var j = 0; j < $frameAry.length; j++) {
                        $frameAry[j].prepend(_this.md5objData.invertAry[j]);
                    }
                    _this.frameQuestArr.push(_this.makeDualQuatFloat32Array($matrixAry[i]));
                }
            });
        };
        Md5MoveSprite.prototype.makeDualQuatFloat32Array = function ($frameAry) {
            var newIDBoneArr = this.md5MeshData.boneNewIDAry;
            var baseBone = $frameAry;
            var $tempDq = new DualQuatFloat32Array;
            $tempDq.quat = new Float32Array(newIDBoneArr.length * 4);
            $tempDq.pos = new Float32Array(newIDBoneArr.length * 3);
            for (var k = 0; k < newIDBoneArr.length; k++) {
                var $m = baseBone[newIDBoneArr[k]].clone();
                $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
                var $q = new Quaternion();
                $q.fromMatrix($m);
                var $p = $m.position;
                $tempDq.quat[k * 4 + 0] = $q.x;
                $tempDq.quat[k * 4 + 1] = $q.y;
                $tempDq.quat[k * 4 + 2] = $q.z;
                $tempDq.quat[k * 4 + 3] = $q.w;
                $tempDq.pos[k * 3 + 0] = $p.x;
                $tempDq.pos[k * 3 + 1] = $p.y;
                $tempDq.pos[k * 3 + 2] = $p.z;
            }
            return $tempDq;
        };
        Md5MoveSprite.prototype.loadTexture = function () {
            var $ctx = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,0,0)";
            $ctx.fillRect(0, 0, 128, 128);
            this.uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
        };
        Md5MoveSprite.prototype.update = function () {
            if (this.md5objData && this.frameQuestArr) {
                this.updateMaterialMeshCopy();
            }
        };
        Md5MoveSprite.prototype.updateMaterialMeshCopy = function () {
            this.baseShder = this.md5shader;
            Scene_data.context3D.setProgram(this.baseShder.program);
            Scene_data.context3D.setVpMatrix(this.baseShder, Scene_data.vpMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
            Scene_data.context3D.setRenderTexture(this.baseShder, "fc0", this.uvTextureRes.texture, 0);
            Scene_data.context3D.setVa(0, 3, this.md5objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.md5MeshData.uvBuffer);
            Scene_data.context3D.setVa(2, 4, this.md5MeshData.boneIdBuffer);
            Scene_data.context3D.setVa(3, 4, this.md5MeshData.boneWeightBuffer);
            var t = Pan3d.TimeUtil.getTimer() - this.lastTm;
            this.lastTm = Pan3d.TimeUtil.getTimer();
            this._actionTime += t;
            var _curentFrame = float2int(this._actionTime / (Scene_data.frameTime * 2));
            var $len = this.frameQuestArr.length;
            var $dualQuatFloat32Array = this.frameQuestArr[_curentFrame % $len];
            Scene_data.context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
            Scene_data.context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos); //所有的位移
            Scene_data.context3D.drawCall(this.md5MeshData.indexBuffer, this.md5MeshData.treNum);
        };
        return Md5MoveSprite;
    }(Display3DSprite));
    md5list.Md5MoveSprite = Md5MoveSprite;
})(md5list || (md5list = {}));
//# sourceMappingURL=Md5MoveSprite.js.map