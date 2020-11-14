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
var left;
(function (left) {
    var Display3dMovie = Pan3d.Display3dMovie;
    var MeshData = Pan3d.MeshData;
    var TexItem = Pan3d.TexItem;
    var AnimData = Pan3d.AnimData;
    var SkinMesh = Pan3d.SkinMesh;
    var BaseEvent = Pan3d.BaseEvent;
    var Scene_data = Pan3d.Scene_data;
    var Dictionary = Pan3d.Dictionary;
    var MaterialRoleSprite = /** @class */ (function (_super) {
        __extends(MaterialRoleSprite, _super);
        function MaterialRoleSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialRoleSprite.prototype.update = function () {
            if (this.sceneVisible) {
                _super.prototype.update.call(this);
            }
        };
        Object.defineProperty(MaterialRoleSprite.prototype, "skinMesh", {
            get: function () {
                return this._skinMesh;
            },
            set: function (value) {
                this._skinMesh = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialRoleSprite.prototype, "animDic", {
            get: function () {
                return this._animDic;
            },
            set: function (value) {
                this._animDic = value;
            },
            enumerable: true,
            configurable: true
        });
        MaterialRoleSprite.prototype.updateFrame = function (t) {
            this._actionTime += t;
            var actionKey;
            if (this.curentAction && this._animDic[this.curentAction]) {
                actionKey = this.curentAction;
            }
            else if (this._animDic[this._defaultAction]) {
                actionKey = this._defaultAction;
            }
            else {
                return;
            }
            var animData = this._animDic[actionKey];
            var cutLen;
            for (var i = 0; i < this._skinMesh.meshAry.length; i++) {
                cutLen = animData.getBoneQPAryByMesh(this._skinMesh.meshAry[i])[0].length;
            }
            this._curentFrame = float2int(this._actionTime / (Scene_data.frameTime * 2));
            if (this._curentFrame >= cutLen) {
                if (this._completeState == 0) {
                    this._actionTime = 0;
                    this._curentFrame = 0;
                }
                else if (this._completeState == 1) {
                    this._curentFrame = cutLen - 1;
                }
                else if (this._completeState == 2) {
                    //this.play(this._defaultAction);
                    this._curentFrame = 0;
                    this._completeState = 0;
                    this.changeAction(this.curentAction);
                }
                else if (this._completeState == 3) {
                }
            }
        };
        MaterialRoleSprite.prototype.setVcMatrix = function ($mesh) {
            Scene_data.context3D.setuniform3f($mesh.material.shader, "cam3DPos", Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z);
            _super.prototype.setVcMatrix.call(this, $mesh);
        };
        MaterialRoleSprite.prototype.updateMaterialMesh = function ($mesh) {
            if ($mesh && $mesh.material) {
                var $materialTree = $mesh.material;
                $materialTree.shader = $materialTree.roleShader;
            }
            _super.prototype.updateMaterialMesh.call(this, $mesh);
        };
        MaterialRoleSprite.prototype.setMaterialTexture = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            var texVec = $material.texList;
            for (var i = 0; i < texVec.length; i++) {
                if (texVec[i].texture) {
                    if (texVec[i].type == TexItem.CUBEMAP) {
                        Scene_data.context3D.setRenderTextureCube($material.shader.program, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
                    else {
                        Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
                }
                else {
                    console.log("还没加载好");
                }
            }
            if ($mp) {
                for (i = 0; i < $mp.dynamicTexList.length; i++) {
                    if ($mp.dynamicTexList[i].target && $mp.dynamicTexList[i].texture) {
                        Scene_data.context3D.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name, $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                    }
                }
            }
        };
        MaterialRoleSprite.prototype.playSkill = function ($skill) {
            var $scene = this._scene;
            this._walkPath = null;
            $scene.skillManager.playSkill($skill);
            this.skillVo = $skill;
        };
        MaterialRoleSprite.prototype.setVaCompress = function ($mesh) {
            var tf = Scene_data.context3D.pushVa($mesh.vertexBuffer);
            if (tf) {
                ////console.log('cccccc')
                return;
            }
            Scene_data.context3D.setVaOffset(0, 3, $mesh.stride, 0);
            Scene_data.context3D.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
            Scene_data.context3D.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
            Scene_data.context3D.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);
            if ($mesh.material.useNormal) {
                // Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.tangentsOffsets);
                Scene_data.context3D.setVaOffset(5, 3, $mesh.stride, $mesh.bitangentsOffsets);
                Scene_data.context3D.setVaOffset(6, 3, $mesh.stride, $mesh.normalsOffsets);
            }
        };
        MaterialRoleSprite.prototype.changeRoleWeb = function (dis) {
            var $skinMesh = new SkinMesh();
            $skinMesh.meshAry = new Array();
            for (var i = 0; i < 1; i++) {
                var $meshData = new MeshData();
                $meshData.vertices = dis.md5objData.vertices;
                $meshData.uvs = dis.md5objData.uvs;
                $meshData.tangents = dis.md5objData.vertices;
                $meshData.bitangents = dis.md5objData.vertices;
                $meshData.normals = dis.md5objData.vertices;
                $meshData.boneIDAry = dis.md5MeshData.boneIDAry;
                $meshData.boneWeightAry = dis.md5MeshData.boneWeightAry;
                $meshData.indexs = dis.md5objData.indexs;
                $meshData.treNum = dis.md5MeshData.treNum;
                $meshData.uid = 0;
                $meshData.stride = 64;
                $meshData.uvsOffsets = 12;
                $meshData.tangentsOffsets = 32;
                $meshData.bitangentsOffsets = 44;
                $meshData.normalsOffsets = 20;
                $meshData.boneIDOffsets = 20;
                $meshData.boneWeightOffsets = 36;
                pack.RoleChangeModel.getInstance().makeBufToRole($meshData);
                $meshData.compressBuffer = true;
                $skinMesh.meshAry.push($meshData);
            }
            var $animDic = {};
            var $animData = new AnimData;
            $animData.meshBoneQPAryDic = this.getmeshBoneQPAryDic(dis.frameQuestArr);
            $animDic["stand"] = $animData;
            this.skinMesh = $skinMesh;
            this.animDic = $animDic;
        };
        MaterialRoleSprite.prototype.getmeshBoneQPAryDic = function ($arr) {
            var item = new Dictionary([]);
            var a1 = new Array;
            a1.push($arr);
            item[0] = a1;
            return item;
        };
        MaterialRoleSprite.prototype.setRoleZwwUrl = function (url) {
            var _this = this;
            pack.PackRoleManager.getInstance().getRoleZzwByUrl(url, function (value) {
                _this.roleStaticMesh = value;
                _this.skinMesh = _this.roleStaticMesh.skinMesh;
                _this.animDic = _this.roleStaticMesh.animDic;
                _this.material = _this.roleStaticMesh.material;
                _this.roleStaticMesh.addEventListener(BaseEvent.COMPLETE, _this.meshParamInfo, _this);
                _this.meshParamInfo();
            });
        };
        MaterialRoleSprite.prototype.meshParamInfo = function () {
            for (var i = 0; i < this.skinMesh.meshAry.length; i++) {
                if (this.skinMesh.meshAry[i].material && this.skinMesh.meshAry[i].paramInfo) {
                    this.skinMesh.meshAry[i].materialParam = new Pan3d.MaterialBaseParam;
                    this.skinMesh.meshAry[i].materialParam.material = this.skinMesh.meshAry[i].material;
                    pack.PackPrefabManager.getInstance().makeMaterialBaseParam(this.skinMesh.meshAry[i].materialParam, this.skinMesh.meshAry[i].paramInfo);
                }
            }
            this.play(this.roleStaticMesh.animPlayKey, 0);
        };
        return MaterialRoleSprite;
    }(Display3dMovie));
    left.MaterialRoleSprite = MaterialRoleSprite;
})(left || (left = {}));
//# sourceMappingURL=MaterialRoleSprite.js.map