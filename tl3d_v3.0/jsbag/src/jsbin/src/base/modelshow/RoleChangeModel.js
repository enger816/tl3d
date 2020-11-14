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
var pack;
(function (pack) {
    var RoleRes = Pan3d.RoleRes;
    var SkinMesh = Pan3d.SkinMesh;
    var BaseRes = Pan3d.BaseRes;
    var MeshData = Pan3d.MeshData;
    var AnimData = Pan3d.AnimData;
    var Dictionary = Pan3d.Dictionary;
    var DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
    var MeshDataManager = Pan3d.MeshDataManager;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var MeshDataChangeManager = /** @class */ (function (_super) {
        __extends(MeshDataChangeManager, _super);
        function MeshDataChangeManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeshDataChangeManager.prototype.readData = function (byte, $batchNum, $url, $version) {
            var $SkinMesh = _super.prototype.readData.call(this, byte, $batchNum, $url, $version);
            return $SkinMesh;
        };
        MeshDataChangeManager.prototype.readMesh2OneBuffer = function (byte, meshData) {
            var len = byte.readInt();
            var typeItem = new Array;
            var dataWidth = 0;
            for (var i = 0; i < 5; i++) {
                var tf = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    if (i == 1) {
                        dataWidth += 2;
                    }
                    else {
                        dataWidth += 3;
                    }
                }
            }
            dataWidth += 8;
            len *= dataWidth * 4;
            var uvsOffsets = 3; // 1
            var normalsOffsets = uvsOffsets + 2; // 2
            var tangentsOffsets = normalsOffsets + 3; //3
            var bitangentsOffsets = tangentsOffsets + 3; //4
            var boneIDOffsets;
            if (typeItem[2]) { //normal
                if (typeItem[4]) {
                    boneIDOffsets = bitangentsOffsets + 3;
                }
                else {
                    boneIDOffsets = normalsOffsets + 3;
                }
            }
            else {
                boneIDOffsets = uvsOffsets + 2;
            }
            var boneWeightOffsets = boneIDOffsets + 4;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            this.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
            this.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
            this.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
            this.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
            this.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
            this.readBytes2ArrayBuffer(byte, data, 4, boneIDOffsets, dataWidth, 2); //boneIDAry
            this.readBytes2ArrayBuffer(byte, data, 4, boneWeightOffsets, dataWidth, 1); //boneWeightAry
            meshData.vertices = this.readChangeBuff(data, 3, 0, dataWidth); //vertices
            meshData.uvs = this.readChangeBuff(data, 2, uvsOffsets, dataWidth); //uvs
            if (typeItem[2]) { //normal  //如果没有就先用顶点顶上
                meshData.normals = this.readChangeBuff(data, 3, normalsOffsets, dataWidth); //normals
            }
            else {
                meshData.normals = meshData.vertices;
            }
            if (typeItem[3]) {
                meshData.tangents = this.readChangeBuff(data, 3, tangentsOffsets, dataWidth); //tangents
            }
            else {
                meshData.tangents = meshData.normals;
            }
            if (typeItem[4]) {
                meshData.bitangents = this.readChangeBuff(data, 3, bitangentsOffsets, dataWidth); //bitangents
            }
            else {
                meshData.bitangents = meshData.normals;
            }
            meshData.boneIDAry = this.readChangeBuff(data, 4, boneIDOffsets, dataWidth); //boneIDAry
            meshData.boneWeightAry = this.readChangeBuff(data, 4, boneWeightOffsets, dataWidth); //boneWeightAry
            BaseRes.readIntForTwoByte(byte, meshData.indexs);
            BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);
            meshData.compressBuffer = true;
            meshData.uvsOffsets = uvsOffsets * 4;
            meshData.normalsOffsets = normalsOffsets * 4;
            meshData.tangentsOffsets = tangentsOffsets * 4;
            meshData.bitangentsOffsets = bitangentsOffsets * 4;
            meshData.boneIDOffsets = boneIDOffsets * 4;
            meshData.boneWeightOffsets = boneWeightOffsets * 4;
            meshData.stride = 16 * 4; //这里强制设置 原来 dataWidth;
            meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(meshData.indexs);
        };
        MeshDataChangeManager.prototype.readChangeBuff = function (data, $dataWidth, $offset, $stride) {
            var $arr = new Array;
            var len = data.byteLength / (4 * $stride);
            for (var i = 0; i < len; i++) {
                var pos = $stride * i + $offset;
                for (var j = 0; j < $dataWidth; j++) {
                    var id = (pos + j) * 4;
                    var num = data.getFloat32(id, true);
                    data.setFloat32(id, num, true);
                    $arr.push(num);
                }
            }
            return $arr;
        };
        MeshDataChangeManager.prototype.readBytes2ArrayBuffer = function ($byte, $data, $dataWidth, $offset, $stride, $readType) {
            if ($readType === void 0) { $readType = 0; }
            var verLength = $byte.readInt();
            if (verLength <= 0) {
                return;
            }
            var scaleNum;
            if ($readType == 0) {
                scaleNum = $byte.readFloat();
            }
            var readNum = verLength / $dataWidth;
            for (var i = 0; i < readNum; i++) {
                var pos = $stride * i + $offset;
                for (var j = 0; j < $dataWidth; j++) {
                    if ($readType == 0) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatTwoByte(scaleNum), true);
                    }
                    else if ($readType == 1) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatOneByte(), true);
                    }
                    else if ($readType == 2) {
                        $data.setFloat32((pos + j) * 4, $byte.readByte(), true);
                    }
                    else if ($readType == 3) {
                        $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);
                    }
                    else if ($readType == 4) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);
                    }
                }
            }
        };
        return MeshDataChangeManager;
    }(MeshDataManager));
    pack.MeshDataChangeManager = MeshDataChangeManager;
    var RoleChangeRes = /** @class */ (function (_super) {
        __extends(RoleChangeRes, _super);
        function RoleChangeRes() {
            var _this = _super.call(this) || this;
            _this.meshDataChangeManager = new MeshDataChangeManager();
            return _this;
        }
        RoleChangeRes.prototype.readNext = function () {
            this.read(); //readmaterial
            this.read(); //readparticle;
        };
        RoleChangeRes.prototype.readMesh = function () {
            this.roleUrl = this._byte.readUTF();
            if (this.version >= 16) { //环境参数
                this.ambientLightColor = new Vector3D;
                this.sunLigthColor = new Vector3D;
                this.nrmDircet = new Vector3D;
                this.ambientLightColor.x = this._byte.readFloat();
                this.ambientLightColor.y = this._byte.readFloat();
                this.ambientLightColor.z = this._byte.readFloat();
                this.ambientLightIntensity = this._byte.readFloat();
                this.ambientLightColor.scaleBy(this.ambientLightIntensity);
                this.sunLigthColor.x = this._byte.readFloat();
                this.sunLigthColor.y = this._byte.readFloat();
                this.sunLigthColor.z = this._byte.readFloat();
                this.sunLigthIntensity = this._byte.readFloat();
                this.sunLigthColor.scaleBy(this.sunLigthIntensity);
                this.nrmDircet.x = this._byte.readFloat();
                this.nrmDircet.y = this._byte.readFloat();
                this.nrmDircet.z = this._byte.readFloat();
            }
            this.meshDataChangeManager.readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);
            this.readAction();
        };
        return RoleChangeRes;
    }(RoleRes));
    pack.RoleChangeRes = RoleChangeRes;
    var RoleChangeModel = /** @class */ (function () {
        function RoleChangeModel() {
        }
        RoleChangeModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new RoleChangeModel();
            }
            return this._instance;
        };
        RoleChangeModel.prototype.changeRoleModel = function (zzwUrl, roleDis) {
            this.materialRoleSprite = roleDis;
            this.loadWebRole(zzwUrl);
        };
        RoleChangeModel.prototype.loadLocalFile = function (arrayBuffer, roleDis) {
            this.materialRoleSprite = roleDis;
            var $roleRes = new RoleChangeRes();
            $roleRes.loadComplete(arrayBuffer);
            this.makeMeshData($roleRes);
            this.loatMaterialTree("base.material");
        };
        RoleChangeModel.prototype.makeBufToRole = function (meshData) {
            var len = (meshData.vertices.length / 3) * meshData.stride;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            this.pushToBuff(data, meshData.vertices, 3, 0, meshData.stride); //vertices
            this.pushToBuff(data, meshData.uvs, 2, meshData.uvsOffsets, meshData.stride); //vertices
            this.pushToBuff(data, meshData.tangents, 3, meshData.tangentsOffsets, meshData.stride); //vertices
            this.pushToBuff(data, meshData.bitangents, 3, meshData.bitangentsOffsets, meshData.stride); //vertices
            this.pushToBuff(data, meshData.normals, 3, meshData.normalsOffsets, meshData.stride); //vertices
            this.pushToBuff(data, meshData.boneIDAry, 4, meshData.boneIDOffsets, meshData.stride); //vertices
            this.pushToBuff(data, meshData.boneWeightAry, 4, meshData.boneWeightOffsets, meshData.stride); //vertices
            meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(meshData.indexs);
        };
        RoleChangeModel.prototype.pushToBuff = function (data, arr, dataWidth, offset, stride) {
            var $len = data.byteLength / stride;
            var arrId = 0;
            for (var i = 0; i < $len; i++) {
                var pos = i * stride + offset;
                for (var j = 0; j < dataWidth; j++) {
                    var $num = arr[arrId++];
                    data.setFloat32(pos + j * 4, $num, true);
                }
            }
        };
        RoleChangeModel.prototype.makeMeshData = function ($roleRes) {
            //比较差的方法存放并修改模型文件
            var $mesh = $roleRes.meshDataChangeManager.getMeshDataByLocalUrl($roleRes.roleUrl);
            var url = $roleRes.roleUrl;
            //  $mesh.loadMaterial();
            $mesh.setAction($roleRes.actionAry, url);
            $mesh.url = url;
            if ($roleRes.ambientLightColor) {
                $mesh.lightData = [[$roleRes.ambientLightColor.x, $roleRes.ambientLightColor.y, $roleRes.ambientLightColor.z],
                    [$roleRes.nrmDircet.x, $roleRes.nrmDircet.y, $roleRes.nrmDircet.z],
                    [$roleRes.sunLigthColor.x, $roleRes.sunLigthColor.y, $roleRes.sunLigthColor.z]];
            }
            $mesh.ready = true;
            this.meshAnimDic($mesh.animDic);
            for (var i = 0; i < $mesh.meshAry.length; i++) {
                var $meshData = new MeshData();
                this.makeBufToRole($mesh.meshAry[i]);
                $meshData.compressBuffer = true;
                $meshData.vertexBuffer = $mesh.meshAry[i].vertexBuffer;
                $meshData.indexBuffer = $mesh.meshAry[i].indexBuffer;
                $meshData.uid = $mesh.meshAry[i].uid;
                $meshData.stride = $mesh.meshAry[i].stride;
                $meshData.treNum = $mesh.meshAry[i].treNum;
                $meshData.uvsOffsets = $mesh.meshAry[i].uvsOffsets;
                $meshData.tangentsOffsets = $mesh.meshAry[i].tangentsOffsets;
                $meshData.bitangentsOffsets = $mesh.meshAry[i].bitangentsOffsets;
                $meshData.normalsOffsets = $mesh.meshAry[i].normalsOffsets;
                $meshData.boneIDOffsets = $mesh.meshAry[i].boneIDOffsets;
                $meshData.boneWeightOffsets = $mesh.meshAry[i].boneWeightOffsets;
            }
            this.materialRoleSprite.skinMesh = $mesh;
        };
        RoleChangeModel.prototype.meshAnimDic = function (animDic) {
            var $dic = {};
            for (var key in animDic) {
                var $temp = animDic[key];
                var $animData = new AnimData;
                $animData.meshBoneQPAryDic = $temp.meshBoneQPAryDic;
                $dic[key] = $animData;
            }
            this.materialRoleSprite.animDic = $dic;
        };
        RoleChangeModel.prototype.getChangeRoleStr = function () {
            if (this.materialRoleSprite.skinMesh) {
                var temp = {};
                temp.meshAry = this.materialRoleSprite.skinMesh.meshAry;
                temp.animDic = this.materialRoleSprite.animDic;
                for (var i = 0; i < temp.meshAry.length; i++) {
                    temp.meshAry[i].materialUrl = "assets/base/base.material";
                }
                var $str = JSON.stringify(temp);
                return $str;
            }
            else {
                return null;
            }
        };
        RoleChangeModel.prototype.getFloat32ArrayByArr = function (obj) {
            var numarr = new Array;
            for (var key in obj) {
                numarr.push(obj[key]);
            }
            var temp = new Float32Array(numarr.length);
            for (var i = 0; i < numarr.length; i++) {
                temp[i] = numarr[i];
            }
            return temp;
        };
        RoleChangeModel.prototype.getmeshBoneQPAryDic = function ($arr) {
            var item = new Dictionary([]);
            for (var key in $arr) {
                var a1 = new Array;
                for (var j = 0; j < $arr[key].length; j++) {
                    var a2 = $arr[key][j];
                    var a3 = new Array();
                    for (var k = 0; k < a2.length; k++) {
                        var a4 = a2[k];
                        var $dbq = new DualQuatFloat32Array();
                        $dbq.quat = this.getFloat32ArrayByArr(a4.quat);
                        $dbq.pos = this.getFloat32ArrayByArr(a4.pos);
                        a3.push($dbq);
                    }
                    a1.push(a3);
                }
                item[key] = a1;
            }
            return item;
        };
        RoleChangeModel.prototype.loatMaterialTree = function (textureurl) {
            var _this = this;
            pack.PackMaterialManager.getInstance().getMaterialByUrl(textureurl, function (materialTree) {
                materialTree.shader = materialTree.roleShader;
                //     materialTree.program = materialTree.shader.program;
                _this.materialRoleSprite.material = materialTree;
            });
        };
        RoleChangeModel.prototype.loadWebRole = function (zzwUrl) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + zzwUrl, LoadManager.XML_TYPE, function ($str) {
                var temp = JSON.parse($str);
                console.log(temp);
                var $skinMesh = new SkinMesh();
                $skinMesh.meshAry = new Array();
                for (var i = 0; i < temp.meshAry.length; i++) {
                    var $meshData = new MeshData();
                    $meshData.vertices = temp.meshAry[i].vertices;
                    $meshData.uvs = temp.meshAry[i].uvs;
                    $meshData.tangents = temp.meshAry[i].tangents;
                    $meshData.bitangents = temp.meshAry[i].bitangents;
                    $meshData.boneIDAry = temp.meshAry[i].boneIDAry;
                    $meshData.boneWeightAry = temp.meshAry[i].boneWeightAry;
                    $meshData.normals = temp.meshAry[i].normals;
                    $meshData.indexs = temp.meshAry[i].indexs;
                    $meshData.stride = temp.meshAry[i].stride;
                    $meshData.uid = temp.meshAry[i].uid;
                    $meshData.treNum = temp.meshAry[i]._treNum;
                    //   $meshData.treNum =400*3
                    $meshData.uvsOffsets = temp.meshAry[i].uvsOffsets;
                    $meshData.tangentsOffsets = temp.meshAry[i].tangentsOffsets;
                    $meshData.bitangentsOffsets = temp.meshAry[i].bitangentsOffsets;
                    $meshData.normalsOffsets = temp.meshAry[i].normalsOffsets;
                    $meshData.boneIDOffsets = temp.meshAry[i].boneIDOffsets;
                    $meshData.boneWeightOffsets = temp.meshAry[i].boneWeightOffsets;
                    _this.makeBufToRole($meshData);
                    $meshData.compressBuffer = true;
                    // this.materialRoleSprite.skinMesh.meshAry[i] = $meshData;
                    $skinMesh.meshAry.push($meshData);
                }
                var $animDic = {};
                for (var key in temp.animDic) {
                    // var $temp: AnimData = temp.animDic[key];
                    var $animData = new AnimData;
                    $animData.meshBoneQPAryDic = _this.getmeshBoneQPAryDic(temp.animDic[key].meshBoneQPAryDic);
                    $animDic[key] = $animData;
                }
                _this.materialRoleSprite.skinMesh = $skinMesh;
                _this.materialRoleSprite.animDic = $animDic;
                _this.loatMaterialTree(temp.textureurl);
            });
        };
        return RoleChangeModel;
    }());
    pack.RoleChangeModel = RoleChangeModel;
})(pack || (pack = {}));
//# sourceMappingURL=RoleChangeModel.js.map