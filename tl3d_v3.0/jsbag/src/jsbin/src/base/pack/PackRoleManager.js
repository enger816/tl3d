var pack;
(function (pack) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var RoleStaticMesh = pack.RoleStaticMesh;
    var MeshData = Pan3d.MeshData;
    var AnimData = Pan3d.AnimData;
    var SkinMesh = Pan3d.SkinMesh;
    var DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
    var Dictionary = Pan3d.Dictionary;
    var PackRoleManager = /** @class */ (function () {
        function PackRoleManager() {
            this.dic = {};
            this.loadDic = {};
        }
        PackRoleManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PackRoleManager();
            }
            return this._instance;
        };
        PackRoleManager.prototype.playBfun = function ($prefab, $url) {
            if (!this.dic[$url]) {
                this.dic[$url] = $prefab;
            }
            while (this.loadDic[$url].length) {
                this.loadDic[$url].pop()($prefab);
            }
        };
        PackRoleManager.prototype.makeBufToRole = function (meshData) {
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
        PackRoleManager.prototype.pushToBuff = function (data, arr, dataWidth, offset, stride) {
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
        PackRoleManager.prototype.getFloat32ArrayByArr = function (obj) {
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
        PackRoleManager.prototype.getmeshBoneQPAryDic = function ($arr) {
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
        PackRoleManager.prototype.getRoleZzwByUrl = function ($url, bfun) {
            var _this = this;
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url]);
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun];
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE, function ($str) {
                    var temp = JSON.parse($str);
                    var tempRoleStatemesh = new RoleStaticMesh();
                    tempRoleStatemesh.url = $url;
                    tempRoleStatemesh.animPlayKey = temp.animPlayKey;
                    var $skinMesh = new SkinMesh();
                    $skinMesh.meshAry = new Array();
                    for (var i = 0; i < temp.meshAry.length; i++) {
                        var $meshData = new MeshData();
                        /*
                        $meshData.vertices = temp.meshAry[i].vertices
                        $meshData.uvs = temp.meshAry[i].uvs
                        $meshData.tangents = temp.meshAry[i].tangents
                        $meshData.bitangents = temp.meshAry[i].bitangents
                        $meshData.boneIDAry = temp.meshAry[i].boneIDAry
                        $meshData.boneWeightAry = temp.meshAry[i].boneWeightAry
                        $meshData.normals = temp.meshAry[i].normals
                        $meshData.indexs = temp.meshAry[i].indexs
                        $meshData.stride = temp.meshAry[i].stride;
                        $meshData.uid = temp.meshAry[i].uid;
                        $meshData.treNum = temp.meshAry[i]._treNum;

                        $meshData.uvsOffsets = temp.meshAry[i].uvsOffsets;
                        $meshData.tangentsOffsets = temp.meshAry[i].tangentsOffsets;
                        $meshData.bitangentsOffsets = temp.meshAry[i].bitangentsOffsets;
                        $meshData.normalsOffsets = temp.meshAry[i].normalsOffsets;
                        $meshData.boneIDOffsets = temp.meshAry[i].boneIDOffsets;
                        $meshData.boneWeightOffsets = temp.meshAry[i].boneWeightOffsets;
                        */
                        for (var strKey in temp.meshAry[i]) {
                            $meshData[strKey] = temp.meshAry[i][strKey];
                        }
                        $meshData.material = null;
                        _this.makeBufToRole($meshData);
                        $meshData.compressBuffer = true;
                        $skinMesh.meshAry.push($meshData);
                    }
                    var $animDic = {};
                    for (var key in temp.animDic) {
                        var $animData = new AnimData;
                        $animData.meshBoneQPAryDic = _this.getmeshBoneQPAryDic(temp.animDic[key].meshBoneQPAryDic);
                        $animDic[key] = $animData;
                    }
                    tempRoleStatemesh.skinMesh = $skinMesh;
                    tempRoleStatemesh.animDic = $animDic;
                    if (tempRoleStatemesh.skinMesh.meshAry.length) {
                        for (var i = 0; i < tempRoleStatemesh.skinMesh.meshAry.length; i++) {
                            _this.loadMeshArrBy(tempRoleStatemesh.skinMesh.meshAry, i, function () {
                                _this.playBfun(tempRoleStatemesh, $url);
                            });
                        }
                    }
                    else {
                        _this.playBfun(tempRoleStatemesh, $url); //没有mesh时就不需要处理里面的材质对象
                    }
                });
            }
            else {
                this.loadDic[$url].push(bfun);
            }
        };
        PackRoleManager.prototype.loadMeshArrBy = function (value, i, bfun) {
            if (!value[i].materialUrl) {
                value[i].materialUrl = "assets/base/base.material"; //设计默认材质路径
            }
            pack.PackMaterialManager.getInstance().getMaterialByUrl(value[i].materialUrl, function ($materialTree) {
                $materialTree.shader = $materialTree.roleShader;
                //   $materialTree.program = $materialTree.shader.program;
                value[i].material = $materialTree;
                var isFinish = true;
                for (var j = 0; j < value.length; j++) {
                    if (!value[j].material) {
                        isFinish = false;
                    }
                }
                if (isFinish) {
                    bfun();
                    // console.log("所有材质加载完成,只回一次")
                }
            });
        };
        return PackRoleManager;
    }());
    pack.PackRoleManager = PackRoleManager;
})(pack || (pack = {}));
//# sourceMappingURL=PackRoleManager.js.map