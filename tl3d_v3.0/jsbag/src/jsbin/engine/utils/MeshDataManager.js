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
var MeshDataManager = /** @class */ (function (_super) {
    __extends(MeshDataManager, _super);
    function MeshDataManager() {
        var _this = _super.call(this) || this;
        _this._loadDic = new Object();
        return _this;
    }
    MeshDataManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new MeshDataManager();
        }
        return this._instance;
    };
    MeshDataManager.prototype.getMeshData = function ($url, $fun, $batchNum) {
        var _this = this;
        if ($batchNum === void 0) { $batchNum = 1; }
        if (this._dic[$url] && this._dic[$url].ready) {
            $fun(this._dic[$url]);
            this._dic[$url].useNum++;
            return;
        }
        if (this._loadDic[$url]) {
            this._loadDic[$url].push($fun);
            return;
        }
        this._loadDic[$url] = new Array;
        this._loadDic[$url].push($fun);
        ResManager.getInstance().loadRoleRes(Scene_data.fileRoot + $url, function ($roleRes) {
            _this.roleResCom($roleRes, $fun);
        }, $batchNum);
    };
    MeshDataManager.prototype.roleResCom = function ($roleRes, $fun) {
        var url = $roleRes.roleUrl;
        var skinMesh = this._dic[url];
        skinMesh.loadMaterial();
        //skinMesh.loadParticle();
        skinMesh.setAction($roleRes.actionAry, url);
        skinMesh.url = url;
        if ($roleRes.ambientLightColor) {
            skinMesh.lightData = [[$roleRes.ambientLightColor.x, $roleRes.ambientLightColor.y, $roleRes.ambientLightColor.z],
                [$roleRes.nrmDircet.x, $roleRes.nrmDircet.y, $roleRes.nrmDircet.z],
                [$roleRes.sunLigthColor.x, $roleRes.sunLigthColor.y, $roleRes.sunLigthColor.z]];
        }
        for (var i = 0; i < this._loadDic[url].length; i++) {
            this._loadDic[url][i](skinMesh);
            skinMesh.useNum++;
        }
        delete this._loadDic[url];
        skinMesh.ready = true;
        //this._dic[$roleRes.roleUrl] = skinMesh;
        //$fun(skinMesh);
        //var meshUrl: string = $roleRes.roleUrl;
        //MeshDataManager.getInstance().getMeshData(meshUrl, ($skinMesh: SkinMesh) => {
        //    if ($batchNum != 1) {
        //        $roleRes.type = 1;
        //    }
        //    for (var key in this._animDic) {
        //        this.processAnimByMesh(this._animDic[key]);
        //    }
        //    $skinMesh.loadMaterial(($m: Material) => { this.loadMaterialCom($m) });
        //    $skinMesh.loadParticle(this);
        //    this.fileScale = $skinMesh.fileScale;
        //}, $batchNum);
        //var actionAry: Array<string> = this._roleRes.actionAry;
        //for (var i: number = 0; i < actionAry.length; i++) {
        //    this.addAction(actionAry[i], this._roleRes.roleUrl + actionAry[i]);
        //}
    };
    MeshDataManager.prototype.gc = function () {
        _super.prototype.gc.call(this);
    };
    MeshDataManager.prototype.readData = function (byte, $batchNum, $url, $version) {
        var $skinMesh = new SkinMesh();
        $skinMesh.fileScale = byte.readFloat();
        if ($version >= 19) {
            $skinMesh.tittleHeight = byte.readFloat();
        }
        else {
            $skinMesh.tittleHeight = 50;
        }
        $skinMesh.hitBox = new Vector2D(20, 20);
        if ($version >= 23) {
            $skinMesh.hitBox.x = byte.readFloat();
            $skinMesh.hitBox.y = byte.readFloat();
        }
        $skinMesh.makeHitBoxItem();
        var meshNum = byte.readInt();
        var allParticleDic = new Object;
        for (var i = 0; i < meshNum; i++) {
            var meshData = new MeshData;
            if ($version >= 21) {
                this.readMesh2OneBuffer(byte, meshData);
            }
            else {
                BaseRes.readFloatTwoByte(byte, meshData.vertices);
                BaseRes.readFloatTwoByte(byte, meshData.tangents);
                BaseRes.readFloatTwoByte(byte, meshData.bitangents);
                BaseRes.readFloatTwoByte(byte, meshData.normals);
                BaseRes.readFloatTwoByte(byte, meshData.uvs);
                BaseRes.readIntForOneByte(byte, meshData.boneIDAry);
                BaseRes.readFloatOneByte(byte, meshData.boneWeightAry);
                BaseRes.readIntForTwoByte(byte, meshData.indexs);
                BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);
                this.uploadMesh(meshData);
            }
            meshData.treNum = meshData.indexs.length;
            // if ($batchNum != 1) {
            //     this.cloneMeshData(meshData, $batchNum);
            // }
            meshData.materialUrl = byte.readUTF();
            meshData.materialParamData = BaseRes.readMaterialParamData(byte);
            var particleNum = byte.readInt();
            for (var j = 0; j < particleNum; j++) {
                var bindParticle = new BindParticle(byte.readUTF(), byte.readUTF());
                meshData.particleAry.push(bindParticle);
                allParticleDic[bindParticle.url] = true;
            }
            $skinMesh.addMesh(meshData);
        }
        for (var key in allParticleDic) {
            ParticleManager.getInstance().registerUrl(key);
        }
        $skinMesh.allParticleDic = allParticleDic;
        var bindPosLength = byte.readInt();
        var bindPosAry = new Array;
        for (var j = 0; j < bindPosLength; j++) {
            var ary = new Array(byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat());
            bindPosAry.push(ary);
        }
        this.getBindPosMatrix(bindPosAry, $skinMesh);
        var sokcetLenght = byte.readInt();
        $skinMesh.boneSocketDic = new Object();
        for (var j = 0; j < sokcetLenght; j++) {
            var boneData = new BoneSocketData();
            boneData.name = byte.readUTF();
            boneData.boneName = byte.readUTF();
            boneData.index = byte.readInt();
            boneData.x = byte.readFloat();
            boneData.y = byte.readFloat();
            boneData.z = byte.readFloat();
            boneData.rotationX = byte.readFloat();
            boneData.rotationY = byte.readFloat();
            boneData.rotationZ = byte.readFloat();
            $skinMesh.boneSocketDic[boneData.name] = boneData;
        }
        this._dic[$url] = $skinMesh;
        return $skinMesh;
    };
    MeshDataManager.prototype.readMesh2OneBuffer = function (byte, meshData) {
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
        if (typeItem[2]) {
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
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
        BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
        BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneIDOffsets, dataWidth, 2); //boneIDAry
        BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneWeightOffsets, dataWidth, 1); //boneWeightAry
        // BaseRes.readFloatTwoByte(byte, meshData.vertices);
        // BaseRes.readFloatTwoByte(byte, meshData.uvs);
        // BaseRes.readFloatTwoByte(byte, meshData.normals);
        // BaseRes.readFloatTwoByte(byte, meshData.tangents);
        // BaseRes.readFloatTwoByte(byte, meshData.bitangents);
        // BaseRes.readIntForOneByte(byte, meshData.boneIDAry);
        // BaseRes.readFloatOneByte(byte, meshData.boneWeightAry);
        BaseRes.readIntForTwoByte(byte, meshData.indexs);
        BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);
        meshData.compressBuffer = true;
        meshData.uvsOffsets = uvsOffsets * 4;
        meshData.normalsOffsets = normalsOffsets * 4;
        meshData.tangentsOffsets = tangentsOffsets * 4;
        meshData.bitangentsOffsets = bitangentsOffsets * 4;
        meshData.boneIDOffsets = boneIDOffsets * 4;
        meshData.boneWeightOffsets = boneWeightOffsets * 4;
        meshData.stride = dataWidth * 4;
        meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
        meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(meshData.indexs);
    };
    MeshDataManager.prototype.cloneMeshData = function (meshData, num) {
        var vertices = meshData.vertices;
        var normals = meshData.normals;
        var uvs = meshData.uvs;
        var bonetIDAry = meshData.boneIDAry;
        var boneWeightAry = meshData.boneWeightAry;
        var indexs = meshData.indexs;
        meshData.vertices = new Array;
        meshData.normals = new Array;
        meshData.uvs = new Array;
        meshData.boneIDAry = new Array;
        meshData.boneWeightAry = new Array;
        meshData.indexs = new Array;
        var vesNum = vertices.length / 3;
        for (var i = 0; i < num; i++) {
            meshData.vertices = meshData.vertices.concat(vertices);
            meshData.normals = meshData.normals.concat(normals);
            meshData.boneIDAry = meshData.boneIDAry.concat(bonetIDAry);
            meshData.boneWeightAry = meshData.boneWeightAry.concat(boneWeightAry);
            for (var j = 0; j < uvs.length; j += 2) {
                meshData.uvs.push(uvs[j], uvs[j + 1], i);
            }
            for (var j = 0; j < indexs.length; j++) {
                meshData.indexs.push(indexs[j] + i * vesNum);
            }
        }
        meshData.treNum = meshData.indexs.length;
    };
    MeshDataManager.prototype.getBindPosMatrix = function (bindPosAry, $skinMesh) {
        var ary = new Array;
        var invertAry = new Array;
        for (var i = 0; i < bindPosAry.length; i++) {
            var objbone = bindPosAry[i];
            var OldQ = new Quaternion(objbone[0], objbone[1], objbone[2]);
            OldQ.setMd5W();
            var newM = OldQ.toMatrix3D();
            newM.appendTranslation(objbone[3], objbone[4], objbone[5]);
            invertAry.push(newM.clone());
            newM.invert();
            ary.push(newM);
        }
        $skinMesh.bindPosMatrixAry = ary;
        $skinMesh.bindPosInvertMatrixAry = invertAry;
    };
    MeshDataManager.prototype.uploadMesh = function ($mesh) {
        $mesh.vertexBuffer = Scene_data.context3D.uploadBuff3D($mesh.vertices);
        $mesh.uvBuffer = Scene_data.context3D.uploadBuff3D($mesh.uvs);
        $mesh.boneIdBuffer = Scene_data.context3D.uploadBuff3D($mesh.boneIDAry);
        $mesh.boneWeightBuffer = Scene_data.context3D.uploadBuff3D($mesh.boneWeightAry);
        $mesh.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($mesh.indexs);
    };
    MeshDataManager.prototype.uploadPbrMesh = function ($mesh, $useNormal) {
        $mesh.normalsBuffer = Scene_data.context3D.uploadBuff3D($mesh.normals);
        if ($useNormal) {
            $mesh.tangentBuffer = Scene_data.context3D.uploadBuff3D($mesh.tangents);
            $mesh.bitangentBuffer = Scene_data.context3D.uploadBuff3D($mesh.bitangents);
        }
    };
    MeshDataManager.prototype.preLoad = function ($url) {
        this.getMeshData($url, function ($skinMesh) {
            $skinMesh.loadMaterial();
        });
    };
    return MeshDataManager;
}(ResGC));
//# sourceMappingURL=MeshDataManager.js.map