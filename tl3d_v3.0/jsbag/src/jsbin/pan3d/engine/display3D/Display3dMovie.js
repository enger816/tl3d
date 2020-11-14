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
var Pan3d;
(function (Pan3d) {
    var Display3dMovie = /** @class */ (function (_super) {
        __extends(Display3dMovie, _super);
        function Display3dMovie() {
            var _this = _super.call(this) || this;
            _this._completeState = 0;
            _this._defaultAction = "stand";
            _this._curentFrame = 0;
            _this._actionTime = 0;
            _this._fileScale = 1;
            _this._hasDestory = false;
            /**正在播放的技能*/
            _this._isSinging = false;
            _this.meshVisible = true;
            _this._nextScale = 1;
            _this.locationDic = new Object;
            _this._animDic = new Object;
            _this._partDic = new Object;
            _this._partUrl = new Object;
            _this._preLoadActionDic = new Object;
            _this._waitLoadActionDic = new Object;
            _this.showCapsule = false;
            _this._enablePhysics = false;
            return _this;
        }
        Object.defineProperty(Display3dMovie.prototype, "isSinging", {
            get: function () {
                return this._isSinging;
            },
            set: function (value) {
                this._isSinging = value;
                //console.log(" this._isSinging",this._isSinging)
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display3dMovie.prototype, "curentAction", {
            get: function () {
                return this._curentAction;
            },
            set: function (value) {
                this._curentAction = value;
            },
            enumerable: true,
            configurable: true
        });
        Display3dMovie.prototype.fixAstartData = function (pos) { };
        Display3dMovie.prototype.setRoleUrl = function (value) {
            var _this = this;
            this.clearMesh();
            Pan3d.MeshDataManager.getInstance().getMeshData(value, function ($skinMesh) {
                if (_this._hasDestory) {
                    $skinMesh.useNum--;
                    return;
                }
                _this._skinMesh = $skinMesh;
                _this.fileScale = $skinMesh.fileScale;
                if (_this.onStage) {
                    _this.addSkinMeshParticle();
                }
                _this._animDic = $skinMesh.animDic;
                _this.onMeshLoaded();
            });
        };
        Display3dMovie.prototype.onMeshLoaded = function () {
            this.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
        };
        Display3dMovie.prototype.clearMesh = function () {
            this.removeSkinMeshParticle();
            if (this._skinMesh) {
                this._skinMesh.useNum--;
            }
            this._skinMesh = null;
            this._animDic = new Object;
        };
        Display3dMovie.prototype.addSkinMeshParticle = function () {
            if (!this._skinMesh) {
                return;
            }
            var dicAry = new Array;
            this._partDic["mesh"] = dicAry;
            var meshAry = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i = 0; i < meshAry.length; i++) {
                var particleAry = meshAry[i].particleAry;
                for (var j = 0; j < particleAry.length; j++) {
                    var bindPartcle = particleAry[j];
                    var particle;
                    particle = Pan3d.ParticleManager.getInstance().getParticleByte(Pan3d.Scene_data.fileRoot + bindPartcle.url);
                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }
                    particle.dynamic = true;
                    particle.bindSocket = bindPartcle.socketName;
                    dicAry.push(particle);
                    particle.bindTarget = this;
                    Pan3d.ParticleManager.getInstance().addParticle(particle);
                }
            }
        };
        Display3dMovie.prototype.removeSkinMeshParticle = function () {
            var dicAry = this._partDic["mesh"];
            if (!dicAry) {
                return;
            }
            for (var i = 0; i < dicAry.length; i++) {
                Pan3d.ParticleManager.getInstance().removeParticle(dicAry[i]);
                dicAry[i].destory();
            }
            this._partDic["mesh"] = null;
        };
        Display3dMovie.prototype.roleResCom = function ($roleRes, $batchNum) {
            //this._roleRes = $roleRes;
            //this._roleRes.useNum++;
            //this._meshUrl = this._roleRes.roleUrl;
            //MeshDataManager.getInstance().getMeshData(this._meshUrl, ($skinMesh: SkinMesh) => {
            //    this._skinMesh = $skinMesh;
            //    if ($batchNum != 1) {
            //        this._skinMesh.type = 1;
            //    }
            //    for (var key in this._animDic) {
            //        this.processAnimByMesh(this._animDic[key]);
            //    }
            //    $skinMesh.loadMaterial(($m: Material) => { this.loadMaterialCom($m) });
            //    $skinMesh.loadParticle(this);
            //    this.fileScale = $skinMesh.fileScale;
            //}, $batchNum);
            //var actionAry: Array<string> = this._roleRes.actionAry;
            //for (var i: number = 0; i<actionAry.length;i++){
            //    this.addAction(actionAry[i], this._roleRes.roleUrl + actionAry[i]);
            //}
        };
        Display3dMovie.prototype.setMeshUrl = function (value, $batchNum) {
            var _this = this;
            if ($batchNum === void 0) { $batchNum = 1; }
            this._meshUrl = Pan3d.Scene_data.fileRoot + value;
            Pan3d.MeshDataManager.getInstance().getMeshData(this._meshUrl, function ($skinMesh) {
                _this._skinMesh = $skinMesh;
                if ($batchNum != 1) {
                    _this._skinMesh.type = 1;
                }
                for (var key in _this._animDic) {
                    _this.processAnimByMesh(_this._animDic[key]);
                }
                $skinMesh.loadMaterial(function ($m) { _this.loadMaterialCom($m); });
                //$skinMesh.loadParticle(this);
                _this.fileScale = $skinMesh.fileScale;
            }, $batchNum);
        };
        Object.defineProperty(Display3dMovie.prototype, "scale", {
            get: function () {
                return this._nextScale;
            },
            set: function (value) {
                this._nextScale = value;
                this._scaleX = value * this._fileScale;
                this._scaleY = value * this._fileScale;
                this._scaleZ = value * this._fileScale;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display3dMovie.prototype, "fileScale", {
            set: function (value) {
                this._fileScale = value;
                this._scaleX = this._nextScale * value;
                this._scaleY = this._nextScale * value;
                this._scaleZ = this._nextScale * value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display3dMovie.prototype, "shadow", {
            set: function (value) {
                if (value) {
                    if (!this._shadow) {
                        this._shadow = Pan3d.ShadowManager.getInstance().addShadow();
                    }
                }
                else {
                    if (this._shadow) {
                        Pan3d.ShadowManager.getInstance().removeShadow(this._shadow);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Display3dMovie.prototype.setShadowSize = function (value) {
            if (this._shadow) {
                this._shadow.size = value;
            }
        };
        Display3dMovie.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            this.addSkinMeshParticle();
            if (this._shadow) {
                this._shadow.visible = true;
            }
        };
        Display3dMovie.prototype.removeStage = function () {
            _super.prototype.removeStage.call(this);
            if (this._shadow) {
                Pan3d.ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary = this._partDic[key];
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i] instanceof Pan3d.CombineParticle) {
                        Pan3d.ParticleManager.getInstance().removeParticle(ary[i]);
                    }
                    else if (ary[i] instanceof Pan3d.Display3DSprite) {
                        Pan3d.SceneManager.getInstance().removeSpriteDisplay(ary[i]);
                    }
                }
            }
        };
        Display3dMovie.prototype.loadMaterialCom = function ($material) {
            if ($material.lightProbe) {
                this.lightProbe = true;
            }
        };
        Display3dMovie.prototype.setCollision = function ($radius, $height) {
        };
        Display3dMovie.prototype.applyVisible = function () {
        };
        Display3dMovie.prototype.removePart = function ($key) {
            var ary = this._partDic[$key];
            if (!ary) {
                return;
            }
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] instanceof Pan3d.CombineParticle) {
                    Pan3d.ParticleManager.getInstance().removeParticle(ary[i]);
                    ary[i].destory();
                }
                else if (ary[i] instanceof Pan3d.Display3DSprite) {
                    Pan3d.SceneManager.getInstance().removeSpriteDisplay(ary[i]);
                    ary[i].destory();
                }
            }
            this._partDic[$key] = null;
            this._partUrl[$key] = null;
            delete this._partDic[$key];
            delete this._partUrl[$key];
        };
        /**
            部位，路径，类型 1为粒子 0为其他
        */
        Display3dMovie.prototype.addPart = function ($key, $bindSocket, $url) {
            var _this = this;
            if (this._partUrl[$key] == $url) { //如果相同则返回
                return;
            }
            else if (this._partUrl[$key]) { //如果不同则先移除
                this.removePart($key);
            }
            if (!this._partDic[$key]) {
                this._partDic[$key] = new Array;
            }
            this._partUrl[$key] = $url;
            var ary = this._partDic[$key];
            Pan3d.GroupDataManager.getInstance().getGroupData(Pan3d.Scene_data.fileRoot + $url, function (groupRes) {
                _this.loadPartRes($bindSocket, groupRes, ary);
            });
            //var groupRes: GroupRes = new GroupRes;
            //groupRes.load(Scene_data.fileRoot +  $url, () => { this.loadPartRes($bindSocket,groupRes,ary) });
        };
        Display3dMovie.prototype.loadPartRes = function ($bindSocket, groupRes, ary) {
            if (this._hasDestory) {
                return;
            }
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                var posV3d;
                var rotationV3d;
                var scaleV3d;
                if (item.isGroup) {
                    posV3d = new Pan3d.Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Pan3d.Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Pan3d.Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }
                if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle = Pan3d.ParticleManager.getInstance().getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    Pan3d.ParticleManager.getInstance().addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
                else if (item.types == Pan3d.BaseRes.PREFAB_TYPE) {
                    var display = new Pan3d.Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    Pan3d.SceneManager.getInstance().addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
            }
            this.applyVisible();
        };
        // public reset(): void
        // {
        //     for (var key in this._partDic) {
        //         var ary: Array<any> = this._partDic[key];
        //         for (var i: number = 0; i < ary.length; i++) {
        //             if (ary[i] instanceof CombineParticle) {
        //                 ParticleManager.getInstance().addParticle(<CombineParticle>ary[i])
        //             } else if (ary[i] instanceof Display3DSprite) {
        //                 SceneManager.getInstance().addDisplay(<Display3DSprite>ary[i])
        //             }
        //         }
        //     }
        // }
        // private loadPartInfoCom($byte: ArrayBuffer, $bindSocket: string, ary: Array<any> ): void {
        //     var byte: ByteArray = new ByteArray($byte);
        //     var length: number = byte.readInt();
        //     for (var i: number = 0; i < length; i++){
        //         var types: number = byte.readInt();
        //         var url: string = byte.readUTF();
        //         var url2: string;
        //         if (types == 1) {
        //             url2 = byte.readUTF();
        //         } 
        //         var isGroup: boolean = byte.readBoolean();
        //         var posV3d: Vector3D;
        //         var rotationV3d: Vector3D;
        //         var scaleV3d: Vector3D;
        //         if (isGroup) {
        //             posV3d = byte.readVector3D()
        //             rotationV3d = byte.readVector3D()
        //             scaleV3d = byte.readVector3D()
        //         }
        //         if (types == 0) {
        //         } else if (types == 1){
        //             var display: Display3DSprite = new Display3DSprite();
        //             display.setObjUrl(url);
        //             display.setMaterialUrl(url2);
        //             ary.push(display);
        //             display.setBind(this, $bindSocket);
        //             SceneManager.getInstance().addDisplay(display);
        //             if (isGroup){
        //                 display.setGroup(posV3d, rotationV3d, scaleV3d);
        //             }
        //         }
        //     }
        // }
        Display3dMovie.prototype.getSocket = function (socketName, resultMatrix) {
            resultMatrix.identity();
            if (!this._skinMesh) {
                //resultMatrix.appendTranslation(this._x,this._y,this._z);
                resultMatrix.append(this.posMatrix);
                return;
            }
            else if (!this._skinMesh.boneSocketDic[socketName]) {
                if (socketName = "none") {
                    resultMatrix.appendTranslation(this._x, this._y, this._z);
                }
                else {
                    resultMatrix.append(this.posMatrix);
                }
                return;
            }
            var boneSocketData = this._skinMesh.boneSocketDic[socketName];
            //if (!boneSocketData) {
            //    resultMatrix.append(this.posMatrix);
            //    return;
            //}
            var testmatix;
            var index = boneSocketData.index;
            testmatix = this.getFrameMatrix(index);
            resultMatrix.appendScale(1 / this._scaleX, 1 / this._scaleY, 1 / this._scaleZ);
            resultMatrix.appendRotation(boneSocketData.rotationX, Pan3d.Vector3D.X_AXIS);
            resultMatrix.appendRotation(boneSocketData.rotationY, Pan3d.Vector3D.Y_AXIS);
            resultMatrix.appendRotation(boneSocketData.rotationZ, Pan3d.Vector3D.Z_AXIS);
            resultMatrix.appendTranslation(boneSocketData.x, boneSocketData.y, boneSocketData.z);
            if (testmatix) {
                resultMatrix.append(this._skinMesh.meshAry[this._skinMesh.meshAry.length - 1].bindPosInvertMatrixAry[index]);
                resultMatrix.append(testmatix);
            }
            resultMatrix.append(this.posMatrix);
        };
        Display3dMovie.prototype.getSunType = function () {
            return 0;
        };
        Display3dMovie.prototype.getFrameMatrix = function (index) {
            if (this._animDic[this.curentAction]) {
                var animData = this._animDic[this.curentAction];
                if (this._curentFrame >= animData.matrixAry.length) {
                    return animData.matrixAry[0][index];
                }
                return animData.matrixAry[this._curentFrame][index];
            }
            else if (this._animDic[this._defaultAction]) {
                var animData = this._animDic[this._defaultAction];
                return animData.matrixAry[this._curentFrame][index];
            }
            return null;
        };
        Display3dMovie.prototype.addAction = function (name, url, needPerLoad) {
            if (needPerLoad === void 0) { needPerLoad = false; }
            this._preLoadActionDic[name] = url;
            if (name == this._defaultAction || name == this.curentAction) {
                this.setAnimUrl(name, url);
            }
            else if (needPerLoad) {
                this.setAnimUrl(name, url);
            }
        };
        Display3dMovie.prototype.setAnimUrl = function (name, url) {
            var _this = this;
            this._waitLoadActionDic[name] = true;
            Pan3d.AnimManager.getInstance().getAnimData(url, function ($animData) {
                _this._animDic[name] = $animData;
                _this.processAnimByMesh($animData);
                _this._waitLoadActionDic[name] = false;
            });
        };
        Display3dMovie.prototype.play = function ($action, $completeState, needFollow) {
            if ($completeState === void 0) { $completeState = 0; }
            if (needFollow === void 0) { needFollow = true; }
            //FpsMc.tipStr = "1" + $action + "," + this._curentAction;
            if (this.curentAction == $action) {
                return;
            }
            //FpsMc.tipStr = "2";
            this.curentAction = $action;
            this._completeState = $completeState;
            this._actionTime = 0;
            this.updateFrame(0);
            //FpsMc.tipStr = "3";
            if (this._animDic.hasOwnProperty($action)) {
                //FpsMc.tipStr = "4";
                return true;
            }
            else {
                //FpsMc.tipStr = "5";
                if (!this._waitLoadActionDic[$action] && this._preLoadActionDic[$action]) {
                    //FpsMc.tipStr = "6";
                    this.setAnimUrl($action, this._preLoadActionDic[$action]);
                }
                return false;
            }
        };
        Display3dMovie.prototype.processAnimByMesh = function ($animData) {
            if (!this._skinMesh) {
                return;
            }
            if ($animData.hasProcess) {
                return;
            }
            for (var i = 0; i < $animData.matrixAry.length; i++) {
                var frameAry = $animData.matrixAry[i];
                for (var j = 0; j < frameAry.length; j++) {
                    frameAry[j].prepend(this._skinMesh.meshAry[0].bindPosMatrixAry[j]);
                }
            }
            $animData.hasProcess = true;
        };
        Display3dMovie.prototype.update = function () {
            if (!this._skinMesh) {
                return;
            }
            if (this.lightProbe) {
                this.resultSHVec = Pan3d.LightProbeManager.getInstance().getData(new Pan3d.Vector3D(this.x, this.y + 10, this.z));
            }
            // if(this.name == "老鹰"){
            //  //console.log(this.name);  
            // }
            this.updateBind();
            if (this.meshVisible) {
                for (var i = 0; i < this._skinMesh.meshAry.length; i++) {
                    this.updateMaterialMesh(this._skinMesh.meshAry[i]);
                }
            }
            if (this.showCapsule) {
                this.updateShowCapsule();
            }
        };
        Display3dMovie.prototype.updateFrame = function (t) {
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
            this._curentFrame = float2int(this._actionTime / (Pan3d.Scene_data.frameTime * 2));
            if (this._curentFrame >= animData.matrixAry.length) {
                if (this._completeState == 0) {
                    this._actionTime = 0;
                    this._curentFrame = 0;
                }
                else if (this._completeState == 1) {
                    this._curentFrame = animData.matrixAry.length - 1;
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
        Display3dMovie.prototype.changeAction = function ($action) {
            this.curentAction = this._defaultAction;
        };
        Display3dMovie.prototype.destory = function () {
            _super.prototype.destory.call(this);
            if (this._skinMesh) {
                this._skinMesh.useNum--;
            }
            for (var key in this._partDic) {
                var ary = this._partDic[key];
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i] instanceof Pan3d.CombineParticle) {
                        ary[i].destory();
                    }
                    else if (ary[i] instanceof Pan3d.Display3DSprite) {
                        ary[i].destory();
                    }
                }
            }
            this._partDic = null;
            this._hasDestory = true;
        };
        Display3dMovie.prototype.updateShowCapsule = function () {
            if (this.capsuleLineSprite) {
                this.capsuleLineSprite.x = this.x;
                this.capsuleLineSprite.y = this.y + this._capsule.radius;
                this.capsuleLineSprite.z = this.z;
                this.capsuleLineSprite.update();
            }
            else {
                this.capsuleLineSprite = new Pan3d.LineDisplaySprite();
                this.capsuleLineSprite.clear();
                this.capsuleLineSprite.baseColor = new Pan3d.Vector3D(1, 0, 0, 1);
                this.drawCylinder(this._capsule.radius, this._capsule.height);
                this.drawBall(this._capsule.radius);
                this.capsuleLineSprite.upToGpu();
            }
        };
        Display3dMovie.prototype.drawBall = function ($r) {
            var radiusNum100 = $r;
            var num = 12;
            var p;
            var m;
            var lastPos;
            var i;
            var j;
            var bm;
            var bp;
            for (j = 0; j <= num; j++) {
                lastPos = null;
                for (i = num / 2; i < num; i++) {
                    p = new Pan3d.Vector3D(radiusNum100, 0, 0);
                    m = new Pan3d.Matrix3D;
                    m.appendRotation((360 / num) * i, Pan3d.Vector3D.Z_AXIS);
                    p = m.transformVector(p);
                    bm = new Pan3d.Matrix3D;
                    bm.appendRotation((360 / num) * j, Pan3d.Vector3D.Y_AXIS);
                    p = bm.transformVector(p);
                    if (lastPos) {
                        this.capsuleLineSprite.makeLineMode(lastPos, p);
                    }
                    lastPos = p.clone();
                }
            }
            for (j = 1; j <= 4; j++) {
                bm = new Pan3d.Matrix3D;
                bm.appendRotation(j * -20, Pan3d.Vector3D.Z_AXIS);
                bp = bm.transformVector(new Pan3d.Vector3D(radiusNum100, 0, 0));
                lastPos = null;
                for (i = 0; i < num; i++) {
                    p = bp.clone();
                    m = new Pan3d.Matrix3D;
                    m.appendRotation((360 / num) * i, Pan3d.Vector3D.Y_AXIS);
                    p = m.transformVector(p);
                    if (lastPos) {
                        this.capsuleLineSprite.makeLineMode(lastPos, p);
                    }
                    if (i == num - 1) {
                        this.capsuleLineSprite.makeLineMode(bp, p);
                    }
                    lastPos = p.clone();
                }
            }
        };
        Display3dMovie.prototype.drawCylinder = function ($w, $h) {
            var w = $w;
            var h = $h;
            var jindu = 12;
            var lastA;
            var lastB;
            var i;
            for (i = 0; i < jindu; i++) {
                var a = new Pan3d.Vector3D(w, 0, 0);
                var b = new Pan3d.Vector3D(w, +h, 0);
                var m = new Pan3d.Matrix3D;
                m.appendRotation(i * (360 / jindu), Pan3d.Vector3D.Y_AXIS);
                var A = m.transformVector(a);
                var B = m.transformVector(b);
                this.capsuleLineSprite.makeLineMode(A, B);
                //this.capsuleLineSprite.makeLineMode(A, new Vector3D(0, 0, 0))
                this.capsuleLineSprite.makeLineMode(B, new Pan3d.Vector3D(0, +h, 0));
                if (i == (jindu - 1)) {
                    this.capsuleLineSprite.makeLineMode(A, a);
                    this.capsuleLineSprite.makeLineMode(B, b);
                }
                if (lastA || lastB) {
                    this.capsuleLineSprite.makeLineMode(A, lastA);
                    this.capsuleLineSprite.makeLineMode(B, lastB);
                }
                lastA = A.clone();
                lastB = B.clone();
            }
        };
        Display3dMovie.prototype.setVcMatrix = function ($mesh) {
            //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Pan3d.Scene_data.context3D.setVpMatrix($mesh.material.shader, Pan3d.Scene_data.vpMatrix.m);
            Pan3d.Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrix3D", this.posMatrix.m);
            //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
        };
        Display3dMovie.prototype.setVa = function ($mesh) {
            if ($mesh.compressBuffer) {
                this.setVaCompress($mesh);
            }
            else {
                this.setVaIndependent($mesh);
            }
        };
        Display3dMovie.prototype.setVaIndependent = function ($mesh) {
            Pan3d.Scene_data.context3D.setVa(0, 3, $mesh.vertexBuffer);
            Pan3d.Scene_data.context3D.setVa(1, 2, $mesh.uvBuffer);
            Pan3d.Scene_data.context3D.setVa(2, 4, $mesh.boneIdBuffer);
            Pan3d.Scene_data.context3D.setVa(3, 4, $mesh.boneWeightBuffer);
            if ($mesh.material.usePbr) {
                Pan3d.Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
                Pan3d.Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                if ($mesh.material.useNormal) {
                    Pan3d.Scene_data.context3D.setVa(5, 4, $mesh.tangentBuffer);
                    Pan3d.Scene_data.context3D.setVa(6, 4, $mesh.bitangentBuffer);
                }
            }
            else {
                if ($mesh.material.lightProbe || $mesh.material.directLight) {
                    Pan3d.Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
                    Pan3d.Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                }
            }
        };
        Display3dMovie.prototype.setVaCompress = function ($mesh) {
            var tf = Pan3d.Scene_data.context3D.pushVa($mesh.vertexBuffer);
            if (tf) {
                ////console.log('cccccc')
                return;
            }
            Pan3d.Scene_data.context3D.setVaOffset(0, 3, $mesh.stride, 0);
            Pan3d.Scene_data.context3D.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
            Pan3d.Scene_data.context3D.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
            Pan3d.Scene_data.context3D.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);
            if ($mesh.material.usePbr) {
                Pan3d.Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.normalsOffsets);
                Pan3d.Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                if ($mesh.material.useNormal) {
                    Pan3d.Scene_data.context3D.setVaOffset(5, 3, $mesh.stride, $mesh.tangentsOffsets);
                    Pan3d.Scene_data.context3D.setVaOffset(6, 3, $mesh.stride, $mesh.bitangentsOffsets);
                }
            }
            else {
                if ($mesh.material.lightProbe || $mesh.material.directLight) {
                    Pan3d.Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.normalsOffsets);
                    Pan3d.Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                }
            }
        };
        Display3dMovie.prototype.clearVa = function () {
            Pan3d.Scene_data.context3D.clearVa(2);
            Pan3d.Scene_data.context3D.clearVa(3);
            Pan3d.Scene_data.context3D.clearVa(4);
            Pan3d.Scene_data.context3D.clearVa(5);
            Pan3d.Scene_data.context3D.clearVa(6);
        };
        Display3dMovie.prototype.updateMaterialMesh = function ($mesh) {
            if (!$mesh.material) {
                return;
            }
            Pan3d.Scene_data.context3D.setProgram($mesh.material.shader.program);
            // Scene_data.context3D.cullFaceBack($mesh.material.backCull);
            Pan3d.Scene_data.context3D.cullFaceBack(false);
            Pan3d.Scene_data.context3D.setBlendParticleFactors($mesh.material.blendMode);
            // Scene_data.context3D.setBlendParticleFactors(-1);
            this.setVcMatrix($mesh);
            //this.setBaseMaterialVc($mesh.material);
            this.setMaterialVc($mesh.material, $mesh.materialParam);
            ////console.log($mesh.material.fcData);
            this.setMaterialTexture($mesh.material, $mesh.materialParam);
            this.setVa($mesh);
            //this.setLightProbeVc($mesh.material);
            this.setDirectLight($mesh.material);
            this.setMeshVc($mesh);
            Pan3d.Scene_data.context3D.drawCall($mesh.indexBuffer, $mesh.treNum);
        };
        Display3dMovie.prototype.setLightProbeVc = function ($material) {
            if ($material.lightProbe) {
                for (var i = 0; i < this.resultSHVec.length; i++) {
                    Pan3d.Scene_data.context3D.setVc3fv($material.shader, "sh[" + i + "]", [this.resultSHVec[i].x, this.resultSHVec[i].y, this.resultSHVec[i].z]);
                }
            }
        };
        Display3dMovie.prototype.setMeshVc = function ($mesh) {
            var animData;
            if (this._animDic[this.curentAction]) {
                animData = this._animDic[this.curentAction];
            }
            else if (this._animDic[this._defaultAction]) {
                animData = this._animDic[this._defaultAction];
            }
            else {
                return;
            }
            var $dualQuatFrame = animData.getBoneQPAryByMesh($mesh)[$mesh.uid][this._curentFrame];
            if (!$dualQuatFrame) {
                return;
            }
            Pan3d.Scene_data.context3D.setVc4fv($mesh.material.shader, "boneQ", $dualQuatFrame.quat); //旋转
            Pan3d.Scene_data.context3D.setVc3fv($mesh.material.shader, "boneD", $dualQuatFrame.pos); //所有的位移
        };
        Display3dMovie.prototype.setPos = function ($v3d) {
            ////console.log($v3d);
            _super.prototype.setPos.call(this, $v3d);
            if (this._shadow) {
                this._shadow.x = $v3d.x;
                this._shadow.y = $v3d.y + 8;
                this._shadow.z = $v3d.z;
            }
        };
        Object.defineProperty(Display3dMovie.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.updateMatrix();
                if (this._shadow) {
                    this._shadow.x = value;
                }
                this.changePos();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display3dMovie.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.updateMatrix();
                if (this._shadow) {
                    this._shadow.y = value;
                }
                this.changePos();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display3dMovie.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                this._z = value;
                this.updateMatrix();
                if (this._shadow) {
                    this._shadow.z = value;
                }
                this.changePos();
            },
            enumerable: true,
            configurable: true
        });
        Display3dMovie.prototype.changePos = function () {
        };
        return Display3dMovie;
    }(Pan3d.Display3DSprite));
    Pan3d.Display3dMovie = Display3dMovie;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3dMovie.js.map