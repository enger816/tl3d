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
var Display3DSprite = /** @class */ (function (_super) {
    __extends(Display3DSprite, _super);
    function Display3DSprite() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.dynamic = false;
        _this._rotationMatrix = new Matrix3D;
        return _this;
        //this.lightMapTexture = TextureManager.getInstance().defaultLightMap;
    }
    Object.defineProperty(Display3DSprite.prototype, "aabbVect", {
        get: function () {
            if (!this._aabbVect) {
                var $aabb = this.aabb;
                var ax = $aabb.x;
                var ay = $aabb.y;
                var az = $aabb.z;
                var bx = $aabb.width;
                var by = $aabb.height;
                var bz = $aabb.depth;
                this._aabbVect = new Array;
                this._aabbVect.push(new Vector3D(ax, ay, az));
                this._aabbVect.push(new Vector3D(ax + bx, ay, az));
                this._aabbVect.push(new Vector3D(ax, ay + by, az));
                this._aabbVect.push(new Vector3D(ax, ay, az + bz));
                this._aabbVect.push(new Vector3D(ax + bx, ay + by, az));
                this._aabbVect.push(new Vector3D(ax + bx, ay, az + bz));
                this._aabbVect.push(new Vector3D(ax, ay + by, az + bz));
                this._aabbVect.push(new Vector3D(ax + bx, ay + by, az + bz));
            }
            return this._aabbVect;
        },
        enumerable: true,
        configurable: true
    });
    Display3DSprite.prototype.setObjUrl = function (value) {
        var _this = this;
        this.objurl = value;
        ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + value, function ($obj) {
            _this.objData = $obj;
            if (_this.material) {
                if (!_this.objData.tangentBuffer) {
                    ObjDataManager.getInstance().creatTBNBuffer(_this.objData);
                }
            }
        });
    };
    Display3DSprite.prototype.setPicUrl = function ($str) {
        var _this = this;
        this.picUrl = $str;
        TextureManager.getInstance().getTexture(Scene_data.fileRoot + $str, function ($texture) {
            _this.baseTexture = $texture;
        });
    };
    Display3DSprite.prototype.setLightMapUrl = function (value) {
        var _this = this;
        if (!value || value == "") {
            return;
        }
        var url = Scene_data.fileRoot + value;
        TextureManager.getInstance().getTexture(url, function ($texture) {
            //this.lightMapTexture = $texture;
            _this.lightMapTextureRes = $texture;
        });
    };
    Object.defineProperty(Display3DSprite.prototype, "lightMapTexture", {
        get: function () {
            if (!this.lightMapTextureRes) {
                //alert("无光照贴图") 
                //console.log("无光照贴图------------------------------------");
            }
            return this.lightMapTextureRes.texture;
        },
        enumerable: true,
        configurable: true
    });
    Display3DSprite.prototype.setMaterialUrl = function (value, $paramData) {
        var _this = this;
        if ($paramData === void 0) { $paramData = null; }
        value = value.replace("_byte.txt", ".txt");
        value = value.replace(".txt", "_byte.txt");
        this.materialUrl = Scene_data.fileRoot + value;
        //var materialshader: MaterialShader = new MaterialShader;
        MaterialManager.getInstance().getMaterialByte(this.materialUrl, function ($material) {
            _this.material = $material;
            if (_this.material.useNormal) {
                if (_this.objData && !_this.objData.tangentBuffer) {
                    ObjDataManager.getInstance().creatTBNBuffer(_this.objData);
                }
            }
            if (_this.material.usePbr || _this.material.directLight) {
                _this._rotationData = new Float32Array(9);
                _this.updateRotationMatrix();
            }
            if ($paramData) {
                _this.materialParam = new MaterialBaseParam();
                _this.materialParam.setData(_this.material, $paramData);
            }
        }, null, true, MaterialShader.MATERIAL_SHADER, MaterialShader);
    };
    Object.defineProperty(Display3DSprite.prototype, "lightProbe", {
        get: function () {
            return this._lightProbe;
        },
        set: function (value) {
            this._lightProbe = value;
            if (this._lightProbe) {
                if (!this.resultSHVec) {
                    this.resultSHVec = new Array;
                    var ary = [0.4444730390920146, -0.3834955622240026, -0.33124467509627725, 0.09365654209093091,
                        -0.05673310882817577, 0.2120523322966496, 0.02945768486978205, -0.04965996229802928, -0.1136529129285836];
                    for (var i = 0; i < 9; i++) {
                        this.resultSHVec.push(new Vector3D(ary[i], ary[i], ary[i]));
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Display3DSprite.prototype.update = function () {
        if (this.dynamic) {
            if (!this.sceneVisible) {
                return;
            }
        }
        this.updateMaterial();
        // return;
        // Scene_data.context3D.setProgram(this.program);
        // Scene_data.context3D.setVcMatrix4fv(this.program, "viewMatrix3D", Scene_data.viewMatrx3D.m);
        // Scene_data.context3D.setVcMatrix4fv(this.program, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
        // Scene_data.context3D.setVcMatrix4fv(this.program, "posMatrix3D", this.posMatrix.m);
        // var mk = [0, 0, 0, 0];
        // Scene_data.context3D.setVc4fv(this.program, "testconst", mk);
        // var mk2 = [1.5, 0, 0, 0];
        // Scene_data.context3D.setVc4fv(this.program, "testconst2", mk2);
        // //if (this.baseTexture) {
        // //    Scene_data.context3D.setRenderTexture(this.program, "s_texture", this.baseTexture,0);
        // //}
        // Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
        // Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
        // Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
    };
    Display3DSprite.prototype.updateMaterial = function () {
        if (!this.material || !this.objData) {
            return;
        }
        Scene_data.context3D.setBlendParticleFactors(this.material.blendMode);
        Scene_data.context3D.cullFaceBack(this.material.backCull);
        this.updateBind();
        ////console.log(this.material.url);
        Scene_data.context3D.setProgram(this.material.program);
        Scene_data.context3D.setWriteDepth(this.material.writeZbuffer);
        Scene_data.context3D.setVcMatrix4fv(this.material.shader, "posMatrix3D", this.posMatrix.m);
        this.setCam();
        //this.setBaseMaterialVc(this.material);
        this.setMaterialVc(this.material, this.materialParam);
        this.setMaterialTexture(this.material, this.materialParam);
        this.setDirectLight(this.material);
        this.setMaterialVa();
        Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
    };
    Display3DSprite.prototype.setMaterialVa = function () {
        if (this.objData.compressBuffer) {
            this.setMaterialVaCompress();
        }
        else {
            this.setMaterialVaIndependent();
        }
    };
    Display3DSprite.prototype.setMaterialVaIndependent = function () {
        Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
        Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
        if (!(this.material.directLight || this.material.noLight)) {
            Scene_data.context3D.setVa(2, 2, this.objData.lightUvBuffer);
        }
        if (this.material.usePbr || this.material.directLight) {
            Scene_data.context3D.setVa(3, 3, this.objData.normalsBuffer);
            Scene_data.context3D.setVcMatrix3fv(this.material.shader, "rotationMatrix3D", this._rotationData);
        }
        if (this.material.useNormal) {
            Scene_data.context3D.setVa(4, 3, this.objData.tangentBuffer);
            Scene_data.context3D.setVa(5, 3, this.objData.bitangentBuffer);
        }
    };
    Display3DSprite.prototype.setMaterialVaCompress = function () {
        var tf = Scene_data.context3D.pushVa(this.objData.vertexBuffer);
        if (tf) {
            return;
        }
        Scene_data.context3D.setVaOffset(0, 3, this.objData.stride, 0);
        Scene_data.context3D.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
        if (!(this.material.directLight || this.material.noLight)) {
            Scene_data.context3D.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
        }
        if (this.material.usePbr || this.material.directLight) {
            Scene_data.context3D.setVaOffset(3, 3, this.objData.stride, this.objData.normalsOffsets);
            Scene_data.context3D.setVcMatrix3fv(this.material.shader, "rotationMatrix3D", this._rotationData);
        }
        if (this.material.useNormal) {
            Scene_data.context3D.setVaOffset(4, 3, this.objData.stride, this.objData.tangentsOffsets);
            Scene_data.context3D.setVaOffset(5, 3, this.objData.stride, this.objData.bitangentsOffsets);
        }
    };
    Display3DSprite.prototype.setDirectLight = function ($material) {
        if ($material.directLight) {
            Scene_data.context3D.setVc3fv($material.shader, "ambientColor", Scene_data.light.ambientColor);
            Scene_data.context3D.setVc3fv($material.shader, "sunDirect", Scene_data.light.sunDirect);
            Scene_data.context3D.setVc3fv($material.shader, "sunColor", Scene_data.light.sunColor);
        }
    };
    Display3DSprite.prototype.setCam = function () {
        // var mvc:Float32Array = new Float32Array(16 * 3);
        // mvc.set(this.posMatrix.m,0);
        // mvc.set(Scene_data.viewMatrx3D.m,16);
        // mvc.set(Scene_data.cam3D.cameraMatrix.m,32);
        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
        //var m:Matrix3D = new Matrix3D;
        //m.prepend(Scene_data.viewMatrx3D);
        // m.prepend(Scene_data.cam3D.cameraMatrix);
        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "vpMatrix3D", Scene_data.vpMatrix.m);
        Scene_data.context3D.setVpMatrix(this.material.shader, Scene_data.vpMatrix.m);
    };
    Display3DSprite.prototype.setBind = function ($bindTarget, $bindSocket) {
        this.bindTarget = $bindTarget;
        this.bindSocket = $bindSocket;
        this.bindMatrix = new Matrix3D();
    };
    Display3DSprite.prototype.setGroup = function ($pos, $rotaion, $scale) {
        this._isInGroup = true;
        this._groupPos = $pos;
        this._groupRotation = $rotaion;
        this._groupScale = $scale;
        this.groupMatrix = new Matrix3D();
        this.groupRotationMatrix = new Matrix3D();
        this.groupMatrix.isIdentity = false;
        this.groupMatrix.identity();
        this.groupMatrix.appendScale($scale.x, $scale.y, $scale.z);
        this.groupMatrix.appendRotation($rotaion.x, Vector3D.X_AXIS);
        this.groupMatrix.appendRotation($rotaion.y, Vector3D.Y_AXIS);
        this.groupMatrix.appendRotation($rotaion.z, Vector3D.Z_AXIS);
        this.groupMatrix.appendTranslation($pos.x, $pos.y, $pos.z);
        this.groupRotationMatrix.isIdentity = false;
        this.groupRotationMatrix.identity();
        this.groupRotationMatrix.prependRotation($rotaion.z, Vector3D.Z_AXIS);
        this.groupRotationMatrix.prependRotation($rotaion.y, Vector3D.Y_AXIS);
        this.groupRotationMatrix.prependRotation($rotaion.x, Vector3D.X_AXIS);
    };
    Display3DSprite.prototype.updateBind = function () {
        if (this.bindTarget) {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
            if (this._isInGroup) {
                this.posMatrix.append(this.groupMatrix);
                //posMatrix.prependTranslation(groupPos.x, groupPos.y, groupPos.z);
                //posMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
                //posMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
                //posMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
                //posMatrix.prependScale(groupScale.x, groupScale.y, groupScale.z);
            }
            this.bindTarget.getSocket(this.bindSocket, this.bindMatrix);
            this.posMatrix.append(this.bindMatrix);
            this.bindMatrix.copyTo(this._rotationMatrix);
            this._rotationMatrix.identityPostion();
            if (this._isInGroup) {
                this._rotationMatrix.prepend(this.groupRotationMatrix);
                //_rotationMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
                //_rotationMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
                //_rotationMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
            }
            this.sceneVisible = this.bindTarget.visible;
        }
    };
    Display3DSprite.prototype.setBaseMaterialVc = function ($material) {
        var t = 0;
        if ($material.hasTime) {
            t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
        }
        if ($material.hasTime || $material.usePbr || $material.useKill) {
            Scene_data.context3D.setVc4fv($material.shader, "fc0", [1, 0, $material.killNum, t]); //sceneEvnScale,null,killNum,time;
        }
        if ($material.scaleLightMap) {
            Scene_data.context3D.setVcFloat($material.shader, "scalelight", Scene_data.scaleLight);
        }
        if ($material.usePbr || $material.fogMode == 1) {
            this.setCamPos($material);
        }
        if ($material.fogMode != 0) {
            Scene_data.context3D.setVc2fv($material.shader, "fogdata", Scene_data.fogData);
            Scene_data.context3D.setVc3fv($material.shader, "fogcolor", Scene_data.fogColor);
        }
    };
    Display3DSprite.prototype.setCamPos = function ($material) {
        // var p: Vector3D = new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z, 1.0);
        // p.scaleBy(1/100)
        // Scene_data.context3D.setVc4fv($material.shader, "fc2", [p.x,p.y,p.z,p.w]);
        $material.updateCam(Scene_data.cam3D.x / 100, Scene_data.cam3D.y / 100, Scene_data.cam3D.z / 100);
    };
    Display3DSprite.prototype.setMaterialVc = function ($material, $mp) {
        if ($mp === void 0) { $mp = null; }
        if ($material.fcNum <= 0) {
            return;
        }
        var t = 0;
        if ($material.hasTime) {
            t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
        }
        $material.update(t);
        this.setCamPos($material);
        if ($mp) {
            $mp.update();
        }
        Scene_data.context3D.setVc4fv($material.shader, "fc", $material.fcData);
        ////console.log($material.fcData);
        // var constVec:Array<ConstItem> = $material.constList;
        // for(var i:number=0;i<constVec.length;i++){
        //     Scene_data.context3D.setVc4fv($material.shader, constVec[i].name, constVec[i].vecNum);
        // }
    };
    Display3DSprite.prototype.setMaterialTexture = function ($material, $mp) {
        if ($mp === void 0) { $mp = null; }
        var texVec = $material.texList;
        for (var i = 0; i < texVec.length; i++) {
            if (texVec[i].type == TexItem.LIGHTMAP) {
                //_context.setTextureAt(texVec[i].id, lightMapTexture);
                Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, this.lightMapTexture, texVec[i].id);
            }
            else if (texVec[i].type == TexItem.LTUMAP && Scene_data.pubLut) {
                Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, Scene_data.pubLut, texVec[i].id);
                //_context.setTextureAt(texVec[i].id, Scene_data.prbLutTexture.texture);
            }
            else if (texVec[i].type == TexItem.CUBEMAP) {
                if ($material.useDynamicIBL) {
                    //_context.setTextureAt(texVec[i].id, _reflectionTextureVo.texture);
                }
                else {
                    var index = Math.floor($material.roughness * 5);
                    if (Scene_data.skyCubeMap) {
                        var cubeTexture = Scene_data.skyCubeMap[index];
                        Scene_data.context3D.setRenderTextureCube($material.program, texVec[i].name, cubeTexture, texVec[i].id);
                    }
                }
            }
            else {
                //_context.setTextureAt(texVec[i].id, texVec[i].texture);
                if (texVec[i].texture) {
                    Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                }
            }
        }
        if ($mp) {
            for (i = 0; i < $mp.dynamicTexList.length; i++) {
                //_context.setTextureAt($mParam.dynamicTexList[i].target.id, $mParam.dynamicTexList[i].texture);
                if ($mp.dynamicTexList[i].target) {
                    Scene_data.context3D.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name, $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                }
            }
        }
    };
    Display3DSprite.prototype.checkMaterialTexture = function ($material) {
        var texVec = $material.texList;
        for (var i = 0; i < texVec.length; i++) {
            if (texVec[i].type == TexItem.LIGHTMAP) {
                if (!this.lightMapTexture) {
                    return false;
                }
            }
            else if (texVec[i].type == TexItem.LTUMAP) {
                if (!Scene_data.pubLut) {
                    return false;
                }
            }
            else if (texVec[i].type == TexItem.CUBEMAP) {
                if ($material.useDynamicIBL) {
                    //_context.setTextureAt(texVec[i].id, _reflectionTextureVo.texture);
                }
                else {
                    if (!Scene_data.skyCubeMap) {
                        return false;
                    }
                }
            }
            else {
                if (!texVec[i].texture) {
                    return false;
                }
            }
        }
        return true;
    };
    Display3DSprite.prototype.updateRotationMatrix = function () {
        try {
            this._rotationMatrix.identity();
            this._rotationMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS);
            this._rotationMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
            this._rotationMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS);
            if (this._rotationData) {
                this._rotationMatrix.getRotaion(this._rotationData);
            }
        }
        catch (err) {
            //console.log("在此处理错误1");
        }
    };
    Display3DSprite.prototype.setPos = function ($v3d) {
        this.x = $v3d.x;
        this.y = $v3d.y + 10;
        this.z = $v3d.z;
    };
    Display3DSprite.prototype.destory = function () {
        _super.prototype.destory.call(this);
        this.name = null;
        this.objurl = null;
        this.picUrl = null;
        this.materialUrl = null;
        if (this.material) {
            this.material.useNum--;
        }
        if (this.materialParam) {
            this.materialParam.destory();
            this.materialParam = null;
        }
        if (this.lightMapTextureRes) {
            this.lightMapTextureRes.clearUseNum();
        }
        this._rotationMatrix = null;
        this._rotationData = null;
        this.bindMatrix = null;
        this.bindTarget = null;
        this.bindSocket = null;
        this._groupPos = null;
        this._groupRotation = null;
        this._groupScale = null;
        this.groupMatrix = null;
        this.groupRotationMatrix = null;
    };
    return Display3DSprite;
}(Display3D));
//# sourceMappingURL=Display3DSprite.js.map