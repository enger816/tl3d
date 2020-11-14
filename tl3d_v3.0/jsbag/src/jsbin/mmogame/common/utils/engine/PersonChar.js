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
var PersonChar = /** @class */ (function (_super) {
    __extends(PersonChar, _super);
    function PersonChar() {
        return _super.call(this) || this;
    }
    return PersonChar;
}(SceneChar));
var Display3DSprite2DBind = /** @class */ (function (_super) {
    __extends(Display3DSprite2DBind, _super);
    function Display3DSprite2DBind() {
        var _this = _super.call(this) || this;
        _this.vpMatrix = new Matrix3D;
        return _this;
    }
    Display3DSprite2DBind.prototype.setCam = function () {
        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "viewMatrix3D", this.uiViewMatrix.m);
        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "camMatrix3D", this.uiMatrix.m);
        this.vpMatrix.identity();
        this.vpMatrix.prepend(this.uiViewMatrix);
        this.vpMatrix.prepend(this.uiMatrix);
        Scene_data.context3D.setVpMatrix(this.material.shader, this.vpMatrix.m);
    };
    Display3DSprite2DBind.prototype.updateBind = function () {
        if (this.bindTarget) {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
            this.bindTarget.getSocket(this.bindSocket, this.bindMatrix);
            this.posMatrix.append(this.bindMatrix);
            this.bindMatrix.copyTo(this._rotationMatrix);
            this._rotationMatrix.identityPostion();
            if (this._rotationData) {
                this._rotationMatrix.getRotaion(this._rotationData);
            }
        }
    };
    Display3DSprite2DBind.prototype.setCamPos = function ($material) {
        //var p: Vector3D = new Vector3D(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z, 1.0);
        //Scene_data.context3D.setVc4fv($material.shader, "fc2", [p.x, p.y, p.z, p.w]);
        $material.updateCam(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z);
    };
    Display3DSprite2DBind.prototype.setDirectLight = function ($material) {
        if ($material.directLight && this.lightData) {
            Scene_data.context3D.setVc3fv($material.shader, "ambientColor", this.lightData[0]);
            Scene_data.context3D.setVc3fv($material.shader, "sunDirect", this.lightData[1]);
            Scene_data.context3D.setVc3fv($material.shader, "sunColor", this.lightData[2]);
        }
    };
    return Display3DSprite2DBind;
}(Display3DSprite));
var TestModel = /** @class */ (function () {
    function TestModel() {
        this.objData = new ObjData();
        var vertices = [];
        var uvs = [];
        var lightuvs = [];
        var normals = [];
        var index = [];
        this.objData.indexs = new Array;
        this.objData.uvs = new Array;
        this.objData.lightuvs = new Array;
        this.objData.normals = new Array;
        this.objData.indexs = new Array;
        var i = 0;
        for (i = 0; i < vertices.length; i++) {
            this.objData.vertices.push(vertices[i]);
        }
        for (i = 0; i < uvs.length; i++) {
            this.objData.uvs.push(uvs[i]);
        }
        for (i = 0; i < lightuvs.length; i++) {
            this.objData.lightuvs.push(lightuvs[i]);
        }
        for (i = 0; i < normals.length / 3; i++) {
            this.objData.normals.push(normals[i * 3 + 0] * +1);
            this.objData.normals.push(normals[i * 3 + 2] * -1);
            this.objData.normals.push(normals[i * 3 + 1] * +1);
        }
        for (i = 0; i < index.length; i++) {
            this.objData.indexs.push(index[i]);
        }
        this.upToGpu();
    }
    TestModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new TestModel();
        }
        return this._instance;
    };
    TestModel.prototype.upToGpu = function () {
        var $objData = this.objData;
        $objData.treNum = $objData.indexs.length;
        $objData.vertexBuffer = Scene_data.context3D.uploadBuff3D($objData.vertices);
        $objData.uvBuffer = Scene_data.context3D.uploadBuff3D($objData.uvs);
        $objData.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objData.lightuvs);
        $objData.normalsBuffer = Scene_data.context3D.uploadBuff3D($objData.normals);
        $objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objData.indexs);
    };
    return TestModel;
}());
var Person2DChar = /** @class */ (function (_super) {
    __extends(Person2DChar, _super);
    function Person2DChar() {
        var _this = _super.call(this) || this;
        _this.vpMatrix = new Matrix3D;
        _this._camRx = 0;
        _this._camRy = 0;
        _this.needUIUrl = true;
        _this.bindZero = false;
        _this.showAvatarVisibel = true; //是否显示角色模型， 区别于显示唯一武器时
        _this.uishow = false;
        _this.trueMove = new Vector2D(0.5, 0.5);
        _this.deltTime = 0;
        _this.uiMatrix = new Matrix3D;
        _this.uiMatrix.prependTranslation(0, 0, 600);
        _this.uiMatrix.prependRotation(-10, Vector3D.X_AXIS);
        _this.uiMatrix.prependRotation(180, Vector3D.Y_AXIS);
        var $m = _this.uiMatrix.clone();
        $m.invert();
        _this.uiCamPos = $m.position;
        _this.uiViewMatrix = new Matrix3D;
        _this.resize();
        _this.addStage();
        return _this;
    }
    Person2DChar.prototype.setCamData = function (rx, ry, distance) {
        this.uiMatrix = new Matrix3D;
        this.uiMatrix.prependTranslation(0, 0, distance);
        this.uiMatrix.prependRotation(rx, Vector3D.X_AXIS);
        this.uiMatrix.prependRotation(ry, Vector3D.Y_AXIS);
        var $m = this.uiMatrix.clone();
        $m.invert();
        this.uiCamPos = $m.position;
        this.resize();
        this._camRx = rx;
        this._camRy = ry;
    };
    Person2DChar.prototype.updateMaterialMesh = function ($mesh) {
        if (this.showAvatarVisibel) {
            _super.prototype.updateMaterialMesh.call(this, $mesh);
        }
    };
    Person2DChar.prototype.setWeaponByAvatar = function (avatar, $suffix) {
        if ($suffix === void 0) { $suffix = ""; }
        var so = tb.TB_item_slot.getTempVo(avatar);
        if (so) {
            this.addPart(SceneChar.WEAPON_PART, this.uishow ? so.uislot : so.slot, this.getSceneCharWeaponUrl(avatar, $suffix));
        }
        else {
            this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        }
    };
    // public updateBind(): void {
    //     super.updateBind()
    //     if (this.bindTarget) {
    //         this.posMatrix.identity();
    //         this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ)
    //         this.bindTarget.getSocket(this.bindSocket, this.bindMatrix)
    //         this.posMatrix.append(this.bindMatrix);
    //         this.bindMatrix.copyTo(this._rotationMatrix);
    //         this._rotationMatrix.identityPostion();
    //         if (this._rotationData) {
    //             this._rotationMatrix.getRotaion(this._rotationData);
    //         }
    //     }
    // }
    Person2DChar.prototype.resize = function () {
        this.uiViewMatrix.identity();
        var $scr = 3 / 1000;
        this.uiViewMatrix.appendScale($scr, $scr, 1 / 1000);
        this.uiViewMatrix.appendScale(1000 / Scene_data.stageWidth, 1000 / Scene_data.stageHeight, 1);
        this.uiViewMatrix.appendTranslation(-1 + this.trueMove.x * 2, 1 - this.trueMove.y * 2, 0);
    };
    Person2DChar.prototype.onMeshLoaded = function () {
        if (this._skinMesh.lightData) {
            for (var i = 0; this._displayItem && i < this._displayItem.length; i++) {
                this._displayItem[i].lightData = this._skinMesh.lightData;
            }
        }
    };
    //  用于加载UI里的角色和武器
    Person2DChar.prototype.getSceneCharAvatarUrl = function (num) {
        if (this.needUIUrl) {
            return getRoleUIUrl(String(num));
        }
        else {
            return _super.prototype.getSceneCharAvatarUrl.call(this, num);
        }
    };
    Person2DChar.prototype.getSceneCharWeaponUrl = function (num, $suffix) {
        if ($suffix === void 0) { $suffix = ""; }
        return getModelUIUrl(String(num));
    };
    Person2DChar.prototype.removePart = function ($key) {
        for (var i = 0; this._displayItem && i < this._displayItem.length; i++) {
            this._displayItem[i].destory();
        }
        for (var j = 0; this._particleItem && j < this._particleItem.length; j++) {
            this._particleItem[j].destory();
        }
        this._displayItem = new Array;
        this._particleItem = new Array;
        this._partUrl = new Object;
    };
    Person2DChar.prototype.getSocket = function (socketName, resultMatrix) {
        if (this.bindZero) {
            _super.prototype.getSocket.call(this, socketName, resultMatrix);
            return;
        }
        if (!this._skinMesh) {
            resultMatrix.identity();
            resultMatrix.appendTranslation(0, 100000, 0);
        }
        else {
            _super.prototype.getSocket.call(this, socketName, resultMatrix);
        }
    };
    Person2DChar.prototype.addPart = function ($key, $bindSocket, $url) {
        var _this = this;
        if (this._partUrl[$key] == $url) {
            if (this.loadPartComFun) {
                this.loadPartComFun();
            }
            return;
        }
        else if (this._partUrl[$key]) {
            this.removePart($key);
        }
        this._partUrl[$key] = $url;
        var ary = new Array;
        var groupRes = new GroupRes;
        groupRes.load(Scene_data.fileRoot + $url, function () { _this.loadPartResA($bindSocket, groupRes, ary); });
    };
    Person2DChar.prototype.loadPartResA = function ($bindSocket, groupRes, ary) {
        this._displayItem = new Array;
        this._particleItem = new Array;
        for (var i = 0; i < groupRes.dataAry.length; i++) {
            var item = groupRes.dataAry[i];
            var posV3d;
            var rotationV3d;
            var scaleV3d;
            if (item.isGroup) {
                posV3d = new Vector3D(item.x, item.y, item.z);
                rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
            }
            if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                var particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                ary.push(particle);
                particle.bindTarget = this;
                particle.bindSocket = $bindSocket;
                particle.dynamic = true;
                this._particleItem.push(particle);
                if (item.isGroup) {
                    particle.setGroup(posV3d, rotationV3d, scaleV3d);
                }
            }
            if (item.types == BaseRes.PREFAB_TYPE) {
                var display = new Display3DSprite2DBind();
                display.uiCamPos = this.uiCamPos;
                if (this._skinMesh) {
                    display.lightData = this._skinMesh.lightData;
                }
                else if (this.lightData) {
                    display.lightData = this.lightData;
                }
                display.setObjUrl(item.objUrl);
                // display.objData=TestModel.getInstance().objData
                display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                display.dynamic = true;
                ary.push(display);
                display.setBind(this, $bindSocket);
                this._displayItem.push(display);
                if (item.isGroup) {
                    display.setGroup(posV3d, rotationV3d, scaleV3d);
                }
            }
        }
        if (this.loadPartComFun) {
            this.loadPartComFun();
        }
    };
    Person2DChar.prototype.addSkinMeshParticle = function () {
        if (!this._skinMesh) {
            return;
        }
        var meshAry = this._skinMesh.meshAry;
        if (!meshAry) {
            return;
        }
        for (var i = 0; i < meshAry.length; i++) {
            var particleAry = meshAry[i].particleAry;
            for (var j = 0; j < particleAry.length; j++) {
                var bindPartcle = particleAry[j];
                var particle;
                particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);
                particle.dynamic = true;
                particle.bindSocket = bindPartcle.socketName;
                this._particleItem.push(particle);
                particle.bindTarget = this;
            }
        }
    };
    Person2DChar.prototype.removeSkinMeshParticle = function () {
        this.removePart("mesh");
    };
    Person2DChar.prototype.addCharParticle = function ($particle) {
        this._particleItem.push($particle);
    };
    Person2DChar.prototype.updataBindDis = function (t) {
        for (var i = 0; this._displayItem && i < this._displayItem.length; i++) {
            this._displayItem[i].uiViewMatrix = this.uiViewMatrix;
            this._displayItem[i].uiMatrix = this.uiMatrix;
            this._displayItem[i].scale = this.scale * 0.8;
            this._displayItem[i].update();
        }
        Scene_data.context3D.setDepthTest(true);
        Scene_data.context3D.setWriteDepth(false);
        // Scene_data.cam3D.rotationY
        // 
        var tempx = Scene_data.cam3D.rotationX;
        var tempy = Scene_data.cam3D.rotationY;
        Scene_data.cam3D.rotationX = this._camRx;
        Scene_data.cam3D.rotationY = this._camRy;
        for (var j = 0; this._particleItem && j < this._particleItem.length; j++) {
            this._particleItem[j].scaleX = this.scale * 0.8;
            this._particleItem[j].scaleY = this.scale * 0.8;
            this._particleItem[j].scaleZ = this.scale * 0.8;
            this.upParticleData(this._particleItem[j], t);
        }
        Scene_data.cam3D.rotationX = tempx;
        Scene_data.cam3D.rotationY = tempy;
    };
    Person2DChar.prototype.upParticleData = function (particle, t) {
        particle.updateTime(t);
        for (var i = 0; i < particle.displayAry.length; i++) {
            var temp = particle.displayAry[i];
            Scene_data.context3D.setBlendParticleFactors(temp.data._alphaMode);
            Scene_data.context3D.cullFaceBack(temp.data.materialParam.material.backCull);
            if (temp.data.materialParam) {
                Scene_data.context3D.setProgram(temp.data.materialParam.program);
            }
            temp.updateMatrix();
            temp.setVc();
            //Scene_data.context3D.setVcMatrix4fv(temp.data.materialParam.shader, "viewMatrix3D", this.uiViewMatrix.m);
            temp.data.setFloat32Mat("viewMatrix3D", this.uiViewMatrix.m);
            //Scene_data.context3D.setVcMatrix4fv(temp.data.materialParam.shader, "camMatrix3D", this.uiMatrix.m);
            temp.data.setFloat32Mat("camMatrix3D", this.uiMatrix.m);
            temp.pushVc();
            temp.setVa();
            temp.resetVa();
        }
    };
    Person2DChar.prototype.setVcMatrix = function ($mesh) {
        this.vpMatrix.identity();
        this.vpMatrix.prepend(this.uiViewMatrix);
        this.vpMatrix.prepend(this.uiMatrix);
        Scene_data.context3D.setVpMatrix($mesh.material.shader, this.vpMatrix.m);
        //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "viewMatrix3D", this.uiViewMatrix.m);
        //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "camMatrix3D", this.uiMatrix.m);
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrix3D", this.posMatrix.m);
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
    };
    Person2DChar.prototype.refreshY = function () {
    };
    Person2DChar.prototype.rotationToNew = function (value, num) {
        if (num === void 0) { num = 1; }
    };
    Person2DChar.prototype.setCamPos = function ($material) {
        // var p: Vector3D = new Vector3D(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z, 1.0);
        //Scene_data.context3D.setVc4fv($material.shader, "fc2", [p.x, p.y, p.z, p.w]);
        $material.updateCam(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z);
    };
    Person2DChar.prototype.setDirectLight = function ($material) {
        if ($material.directLight && this._skinMesh) {
            if (this._skinMesh.lightData) {
                Scene_data.context3D.setVc3fv($material.shader, "ambientColor", this._skinMesh.lightData[0]);
                Scene_data.context3D.setVc3fv($material.shader, "sunDirect", this._skinMesh.lightData[1]);
                Scene_data.context3D.setVc3fv($material.shader, "sunColor", this._skinMesh.lightData[2]);
            }
        }
    };
    Person2DChar.prototype.update = function () {
        if (!this.visible) {
            return;
        }
        if (!this._skinMesh) {
            return;
        }
        var t = TimeUtil.getTimer() - this.deltTime;
        this.updateFrame(t);
        Scene_data.context3D.setDepthTest(true);
        Scene_data.context3D.setWriteDepth(true);
        _super.prototype.update.call(this);
        this.updataBindDis(t);
        Scene_data.context3D.setDepthTest(false);
        Scene_data.context3D.setWriteDepth(false);
        this.deltTime = TimeUtil.getTimer();
        this.clearVa();
    };
    return Person2DChar;
}(SceneChar));
var MonsterUIChar = /** @class */ (function (_super) {
    __extends(MonsterUIChar, _super);
    function MonsterUIChar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonsterUIChar.prototype.getSceneCharAvatarUrl = function (num) {
        return getRoleUrl(String(num));
    };
    MonsterUIChar.prototype.getSceneCharWeaponUrl = function (num) {
        return getModelUrl(String(num));
    };
    return MonsterUIChar;
}(Person2DChar));
var DialogueUIChar = /** @class */ (function (_super) {
    __extends(DialogueUIChar, _super);
    function DialogueUIChar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiRoleScale = 1;
        _this.num1000 = 960; //UIData.designWidth==960
        _this.uiRole = false;
        return _this;
    }
    DialogueUIChar.prototype.onMeshLoaded = function () {
        _super.prototype.onMeshLoaded.call(this);
        if (this._skinMesh) {
            var $roleH = 0;
            for (var j = 0; j < this._skinMesh.hitPosItem.length; j++) {
                $roleH = Math.max(this._skinMesh.hitPosItem[j].y, $roleH);
            }
            this.uiRoleScale = 50 / $roleH;
        }
        if (this.loadFinishFun) {
            this.loadFinishFun(); //加载完后回调
        }
    };
    DialogueUIChar.prototype.updateMatrix = function () {
        this.posMatrix.identity();
        this.posMatrix.appendScale(this._scaleX * this.uiRoleScale, this._scaleY * this.uiRoleScale, this._scaleZ * this.uiRoleScale);
        this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS);
        this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
        this.posMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS);
        var tx = this.num1000 / 3 * UIData.Scale - (this.x * (2 / 3)) * UIData.Scale;
        var ty = 540 / 3 * UIData.Scale - (this.y * (2 / 3)) * UIData.Scale; //UIData.designWidth==540
        this.posMatrix.appendTranslation(tx, ty, 0);
    };
    DialogueUIChar.prototype.resize = function () {
        this.uiViewMatrix.identity();
        var $num1000 = this.num1000;
        var $scr = 3 / $num1000;
        this.uiViewMatrix.appendScale($scr, $scr, 1 / $num1000);
        this.uiViewMatrix.appendScale($num1000 / Scene_data.stageWidth, $num1000 / Scene_data.stageHeight, 1);
    };
    DialogueUIChar.prototype.getSceneCharAvatarUrl = function (num) {
        if (this.uiRole) {
            return getRoleUIUrl(String(num));
        }
        return getRoleUrl(String(num));
    };
    DialogueUIChar.prototype.setAvatarUI = function (num) {
        this.uiRole = true;
        _super.prototype.setAvatar.call(this, num);
    };
    return DialogueUIChar;
}(MonsterUIChar));
//# sourceMappingURL=PersonChar.js.map