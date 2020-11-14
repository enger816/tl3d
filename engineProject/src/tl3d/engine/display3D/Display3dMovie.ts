namespace tl3d {
    export class Display3dMovie extends Display3DSprite implements IBind {
        private _meshUrl: string;
        protected _skinMesh: SkinMesh;
        protected _animDic: Object;
        protected _preLoadActionDic: Object;
        protected _waitLoadActionDic: Object;
        protected _completeState: number = 0;
        protected _completecb: Function;
        protected _optCbTime: number = 1;//回调触发次数
        protected _optCbCurTime: number = 0;//回调当前次数
        protected _defaultAction: string = "stand";
        protected _comboBackAction: string;
        private _curentAction: string;
        protected _curentFrame: number = 0;
        protected _actionTime: number = 0;
        public isBreak: boolean = true;//动作是否可以被打断


        protected _partDic: Object;

        protected _partUrl: Object;

        private _capsule: CapsuleVo;
        public showCapsule: boolean;
        protected _enablePhysics: boolean;
        protected _shadow: Shadow;

        protected _fileScale: number = 1;
        private _roleRes: RoleRes;
        public _hasDestory: boolean = false;

        private _curMeshUrl: string;
        private _curMeshLoadCom: boolean;

        /**正在播放的技能*/

        public _isSinging: boolean = false;

        public get isSinging(): boolean {
            return this._isSinging;
        }
        public set isSinging(value: boolean) {
            this._isSinging = value;
            //console.log(" this._isSinging",this._isSinging)
        }

        public meshVisible: boolean = true;

        constructor() {
            super();
            this._animDic = new Object;
            this._partDic = new Object;
            this._partUrl = new Object;
            this._preLoadActionDic = new Object;
            this._waitLoadActionDic = new Object;
            this.showCapsule = false;

            this._enablePhysics = false;
        }
        public get curentAction(): string {
            return this._curentAction;
        }
        public set curentAction(value: string) {
            this._curentAction = value;
        }
        public fixAstartData(pos: Vector2D): void { }

        public setRoleUrl(value: string, $cb?: Function): void {
            if (value === this._curMeshUrl) return;
            // console.log("---加载 ----",value);
            this._curMeshUrl = value;
            this._curMeshLoadCom = false;
            this.clearMesh();
            // let time: number = Date.now();
            MeshDataManager.getInstance().getMeshData(value, ($skinMesh: SkinMesh) => {
                // logyhj("加载耗时：", (Date.now() - time));
                if (this._hasDestory) {
                    $skinMesh.useNum--;
                    return;
                }

                // console.log("---value , this._curMeshUrl ----",value,this._curMeshUrl);
                if (value !== this._curMeshUrl) {
                    $skinMesh.useNum--;
                    // console.log("-----------------mesh 已经被替换-------------");
                    return;
                }

                if (this._curMeshLoadCom) {
                    $skinMesh.useNum--;
                    // console.log("%s 被重复加载",value);
                    return;
                }

                this._curMeshLoadCom = true;

                this._skinMesh = $skinMesh;
                this.fileScale = $skinMesh.fileScale;
                if (this.onStage) {
                    this.addSkinMeshParticle();
                }
                this._animDic = $skinMesh.animDic;
                this.onMeshLoaded();
                if ($cb) {
                    $cb();
                }
                // logyhj("加载耗时1：", (Date.now() - time));
            });

        }

        public onMeshLoaded(): void {
            this.dispatchEvent(new BaseEvent(BaseEvent.COMPLETE));
        }

        public clearMesh(): void {
            this.removeSkinMeshParticle();

            if (this._skinMesh) {
                this._skinMesh.useNum--;
            }

            this._skinMesh = null;
            this._animDic = new Object;
        }

        public addSkinMeshParticle(): void {
            if (!this._skinMesh) {
                return;
            }
            var dicAry: Array<CombineParticle> = new Array;
            this._partDic["mesh"] = dicAry;

            var meshAry: Array<MeshData> = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i: number = 0; i < meshAry.length; i++) {
                var particleAry: Array<BindParticle> = meshAry[i].particleAry;
                for (var j: number = 0; j < particleAry.length; j++) {
                    var bindPartcle: BindParticle = particleAry[j];

                    var particle: CombineParticle;

                    particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);

                    if (!particle.sourceData) {
                        console.log("particle.sourceData error", particle, bindPartcle);
                    }

                    particle.dynamic = true;

                    particle.bindSocket = bindPartcle.socketName;

                    dicAry.push(particle);

                    particle.bindTarget = this;

                    this._scene.addParticle(particle);

                }
            }
        }

        public removeSkinMeshParticle(): void {
            if (!this._partDic) this._partDic = new Object;
            var dicAry: Array<CombineParticle> = this._partDic["mesh"];

            if (!dicAry) {
                return;
            }

            for (var i: number = 0; i < dicAry.length; i++) {
                this._scene.removeParticle(dicAry[i]);
                dicAry[i].destory();
            }

            this._partDic["mesh"] = null;
        }

        private roleResCom($roleRes: RoleRes, $batchNum: number): void {
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

        }

        public setMeshUrl(value: string, $batchNum: number = 1): void {
            this._meshUrl = Scene_data.fileRoot + value;

            MeshDataManager.getInstance().getMeshData(this._meshUrl, ($skinMesh: SkinMesh) => {
                this._skinMesh = $skinMesh;
                if ($batchNum != 1) {
                    this._skinMesh.type = 1;
                }

                for (var key in this._animDic) {
                    this.processAnimByMesh(this._animDic[key]);
                }

                $skinMesh.loadMaterial(($m: Material) => { this.loadMaterialCom($m) });
                //$skinMesh.loadParticle(this);

                this.fileScale = $skinMesh.fileScale;


            }, $batchNum);

        }
        private _nextScale: number = 1;
        public set scale(value: number) {
            this._nextScale = value;
            this._scaleX = value * this._fileScale;
            this._scaleY = value * this._fileScale;
            this._scaleZ = value * this._fileScale;
            this.updateMatrix();
        }

        public get scale(): number {
            return this._nextScale;
        }

        public set fileScale(value: number) {

            this._fileScale = value;
            this._scaleX = this._nextScale * value;
            this._scaleY = this._nextScale * value;
            this._scaleZ = this._nextScale * value;
            this.updateMatrix();
        }

        public set shadow(value: boolean) {
            if (value) {
                if (!this._shadow) {
                    this._shadow = ShadowManager.getInstance().addShadow();
                }
            } else {
                if (this._shadow) {
                    ShadowManager.getInstance().removeShadow(this._shadow);
                }
            }
        }

        public setShadowSize(value: number): void {
            if (this._shadow) {
                this._shadow.size = value;
            }
        }

        public addStage(): void {
            super.addStage();
            this.addSkinMeshParticle();
            if (this._shadow) {
                this._shadow.visible = true;
            }
        }

        public removeStage(): void {
            super.removeStage();
            this._curMeshUrl = null;
            if (this._shadow) {
                ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary: Array<any> = this._partDic[key];

                for (var i: number = 0; i < ary.length; i++) {

                    if (ary[i] instanceof CombineParticle) {
                        this._scene.removeParticle(ary[i]);
                    } else if (ary[i] instanceof Display3DSprite) {
                        this._scene.removeSpriteDisplay(ary[i]);
                    }

                }

            }


        }



        public loadMaterialCom($material: Material): void {
            if ($material.lightProbe) {
                this.lightProbe = true;
            }
        }

        public setCollision($radius: number, $height: number): void {

        }

        public applyVisible(): void {

        }

        public removePart($key: string): void {
            var ary: Array<any> = this._partDic[$key];

            if (!ary) {
                return;
            }

            for (var i: number = 0; i < ary.length; i++) {

                if (ary[i] instanceof CombineParticle) {
                    this._scene.removeParticle(ary[i]);
                    (<CombineParticle>ary[i]).destory();
                } else if (ary[i] instanceof Display3DSprite) {
                    this._scene.removeSpriteDisplay(ary[i]);
                    (<Display3DSprite>ary[i]).destory();
                }

            }

            this._partDic[$key] = null;
            this._partUrl[$key] = null;

            delete this._partDic[$key];
            delete this._partUrl[$key];
        }

        /**
            部位，路径，类型 1为粒子 0为其他
        */
        public addPart($key: string, $bindSocket: string, $url: string): void {
            if (this._partUrl[$key] == $url) {//如果相同则返回
                return;
            } else if (this._partUrl[$key]) {//如果不同则先移除
                this.removePart($key);
            }

            if (!this._partDic[$key]) {
                this._partDic[$key] = new Array;
            }

            this._partUrl[$key] = $url;
            var ary: Array<any> = this._partDic[$key];

            this._scene.groupDataMgr.getGroupData(Scene_data.fileRoot + $url, (groupRes: GroupRes) => {
                this.loadPartRes($bindSocket, groupRes, ary)
            })
            //var groupRes: GroupRes = new GroupRes;
            //groupRes.load(Scene_data.fileRoot +  $url, () => { this.loadPartRes($bindSocket,groupRes,ary) });
        }

        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void {
            if (this._hasDestory) {
                return;
            }
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];

                var posV3d: Vector3D;
                var rotationV3d: Vector3D;
                var scaleV3d: Vector3D;
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }

                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    this._scene.addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                } else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display: Display3DSprite = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    this._scene.addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }

                }

            }

            this.applyVisible();

        }
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

        public getSocket(socketName: string, resultMatrix: Matrix3D): void {
            try {
                resultMatrix.identity();

                if (!this._skinMesh) {
                    //resultMatrix.appendTranslation(this._x,this._y,this._z);
                    resultMatrix.append(this.posMatrix);
                    return;
                } else if (!this._skinMesh.boneSocketDic[socketName]) {
                    if (socketName = "none") {
                        resultMatrix.appendTranslation(this._x, this._y, this._z);
                    } else {
                        resultMatrix.append(this.posMatrix);
                    }
                    return;

                }

                var boneSocketData: BoneSocketData = this._skinMesh.boneSocketDic[socketName];

                //if (!boneSocketData) {
                //    resultMatrix.append(this.posMatrix);
                //    return;
                //}

                var testmatix: Matrix3D;
                var index: number = boneSocketData.index;

                testmatix = this.getFrameMatrix(index);

                resultMatrix.appendScale(1 / this._scaleX, 1 / this._scaleY, 1 / this._scaleZ);

                resultMatrix.appendRotation(boneSocketData.rotationX, Vector3D.X_AXIS);
                resultMatrix.appendRotation(boneSocketData.rotationY, Vector3D.Y_AXIS);
                resultMatrix.appendRotation(boneSocketData.rotationZ, Vector3D.Z_AXIS);
                resultMatrix.appendTranslation(boneSocketData.x, boneSocketData.y, boneSocketData.z);

                if (testmatix) {
                    resultMatrix.append(this._skinMesh.meshAry[this._skinMesh.meshAry.length - 1].bindPosInvertMatrixAry[index]);

                    resultMatrix.append(testmatix);
                }

                resultMatrix.append(this.posMatrix);
            } catch (error) {
                console.error("出错啦", error);
            }
        }

        public getSunType(): number {
            return 0;
        }



        protected getFrameMatrix(index: number): Matrix3D {

            if (this._animDic[this.curentAction]) {
                var animData: AnimData = this._animDic[this.curentAction];
                if (this._curentFrame >= animData.matrixAry.length) {
                    return animData.matrixAry[0][index];
                }
                return animData.matrixAry[this._curentFrame][index];
            } else if (this._animDic[this._defaultAction]) {
                var animData: AnimData = this._animDic[this._defaultAction];
                return animData.matrixAry[this._curentFrame][index];
            }

            return null;
        }

        public addAction(name: string, url: string, needPerLoad: boolean = false): void {
            this._preLoadActionDic[name] = url;

            if (name == this._defaultAction || name == this.curentAction) {
                this.setAnimUrl(name, url);
            } else if (needPerLoad) {
                this.setAnimUrl(name, url);
            }

        }


        public setAnimUrl(name: string, url: string): void {
            this._waitLoadActionDic[name] = true;
            AnimManager.getInstance().getAnimData(url, ($animData: AnimData) => {
                this._animDic[name] = $animData;
                this.processAnimByMesh($animData);
                this._waitLoadActionDic[name] = false;
            })
        }

        public randomPlayAction() {
            let keys = Object.keys(this._animDic);
            let idx = Util.random(keys.length);
            let action = keys[idx];
            this.play(action, 2);
        }

        public play($action: string, $completeState: number = 0, needFollow: boolean = true, comboBackAction?: string, cb?: Function): boolean {
            //FpsMc.tipStr = "1" + $action + "," + this._curentAction;
            if (!this.isBreak) return;
            if (this.curentAction == $action) {
                return;
            }
            this._completecb = cb;
            this._optCbCurTime = 0;
            //FpsMc.tipStr = "2";
            this.curentAction = $action;
            this._comboBackAction = comboBackAction || this._defaultAction;
            this._completeState = $completeState;
            this._actionTime = 0;
            this.updateFrame(0);
            //FpsMc.tipStr = "3";
            if (this._animDic.hasOwnProperty($action)) {
                //FpsMc.tipStr = "4";
                return true;
            } else {
                //FpsMc.tipStr = "5";
                if (!this._waitLoadActionDic[$action] && this._preLoadActionDic[$action]) {
                    //FpsMc.tipStr = "6";
                    this.setAnimUrl($action, this._preLoadActionDic[$action]);
                }
                return false;
            }
        }

        private processAnimByMesh($animData: AnimData): void {
            if (!this._skinMesh) {
                return;
            }

            if ($animData.hasProcess) {
                return;
            }

            for (var i: number = 0; i < $animData.matrixAry.length; i++) {
                var frameAry: Array<Matrix3D> = $animData.matrixAry[i];

                for (var j: number = 0; j < frameAry.length; j++) {
                    frameAry[j].prepend(this._skinMesh.meshAry[0].bindPosMatrixAry[j]);
                }

            }
            $animData.hasProcess = true;

        }

        public update(): void {
            if (!this._skinMesh) {
                return;
            }

            if (this.lightProbe) {
                this.resultSHVec = LightProbeManager.getInstance().getData(new Vector3D(this.x, this.y + 10, this.z));
            }

            // if(this.name == "老鹰"){
            //  //console.log(this.name);  
            // }
            this.updateBind();

            if (this.meshVisible) {
                for (var i: number = 0; this._skinMesh && this._skinMesh.meshAry && i < this._skinMesh.meshAry.length; i++) {
                    this.updateMaterialMesh(this._skinMesh.meshAry[i]);
                }
            }

            if (this.showCapsule) {
                this.updateShowCapsule();
            }

        }

        public updateFrame(t: number): void {

            this._actionTime += t;
            var actionKey: string;
            if (this.curentAction && this._animDic[this.curentAction]) {
                actionKey = this.curentAction;
            } else if (this._animDic[this._defaultAction]) {
                actionKey = this._defaultAction;
            } else {
                return;
            }

            var animData: AnimData = this._animDic[actionKey];
            this._curentFrame = Util.float2int(this._actionTime / (Scene_data.frameTime * 2));
            if (this._curentFrame >= animData.matrixAry.length) {
                //动作播放结束
                if (this._completecb && this._optCbCurTime < this._optCbTime) {
                    this._optCbCurTime++;
                    this._completecb();
                }
                if (this._completeState == 0) {
                    this._actionTime = 0;
                    this._curentFrame = 0;
                } else if (this._completeState == 1) {
                    this._curentFrame = animData.matrixAry.length - 1;
                } else if (this._completeState == 2) {
                    this._curentFrame = 0;
                    this._completeState = 0;
                    this.changeAction(this._defaultAction);
                } else if (this._completeState == 3) {
                    //播放指定动作1次,然后回到待机动作
                    this._curentFrame = 0;
                    this._completeState = 0;
                    this.changeAction(this._comboBackAction)
                    this._completeState = 2;
                }
            }
        }
        protected changeAction($action: string): void {
            this.curentAction = $action;
        }

        public destory(): void {
            super.destory();
            if (this._skinMesh) {
                this._skinMesh.useNum--;
            }
            for (var key in this._partDic) {
                var ary: Array<any> = this._partDic[key];
                for (var i: number = 0; ary && i < ary.length; i++) {
                    if (ary[i] instanceof CombineParticle) {
                        (<CombineParticle>ary[i]).destory();
                    } else if (ary[i] instanceof Display3DSprite) {
                        (<Display3DSprite>ary[i]).destory();
                    }
                }
            }
            this._partDic = null;
            this._hasDestory = true;
        }


        private capsuleLineSprite: LineDisplaySprite;
        public updateShowCapsule(): void {
            if (this.capsuleLineSprite) {
                this.capsuleLineSprite.x = this.x
                this.capsuleLineSprite.y = this.y + this._capsule.radius
                this.capsuleLineSprite.z = this.z

                this.capsuleLineSprite.update();

            } else {
                this.capsuleLineSprite = new LineDisplaySprite();
                this.capsuleLineSprite.clear();
                this.capsuleLineSprite.baseColor = new Vector3D(1, 0, 0, 1);
                this.drawCylinder(this._capsule.radius, this._capsule.height);
                this.drawBall(this._capsule.radius);
                this.capsuleLineSprite.upToGpu()

            }
        }
        private drawBall($r: number): void {

            var radiusNum100: number = $r;
            var num: number = 12;
            var p: Vector3D
            var m: Matrix3D
            var lastPos: Vector3D;
            var i: number;
            var j: number;
            var bm: Matrix3D
            var bp: Vector3D



            for (j = 0; j <= num; j++) {

                lastPos = null;
                for (i = num / 2; i < num; i++) {
                    p = new Vector3D(radiusNum100, 0, 0)
                    m = new Matrix3D;
                    m.appendRotation((360 / num) * i, Vector3D.Z_AXIS)
                    p = m.transformVector(p)
                    bm = new Matrix3D;
                    bm.appendRotation((360 / num) * j, Vector3D.Y_AXIS)
                    p = bm.transformVector(p)
                    if (lastPos) {
                        this.capsuleLineSprite.makeLineMode(lastPos, p)
                    }

                    lastPos = p.clone();
                }
            }


            for (j = 1; j <= 4; j++) {
                bm = new Matrix3D;
                bm.appendRotation(j * -20, Vector3D.Z_AXIS);
                bp = bm.transformVector(new Vector3D(radiusNum100, 0, 0))


                lastPos = null;
                for (i = 0; i < num; i++) {
                    p = bp.clone();
                    m = new Matrix3D;
                    m.appendRotation((360 / num) * i, Vector3D.Y_AXIS)
                    p = m.transformVector(p)
                    if (lastPos) {
                        this.capsuleLineSprite.makeLineMode(lastPos, p)
                    }
                    if (i == num - 1) {
                        this.capsuleLineSprite.makeLineMode(bp, p)
                    }
                    lastPos = p.clone();
                }
            }
        }
        private drawCylinder($w: number, $h: number): void {
            var w: number = $w;
            var h: number = $h;

            var jindu: number = 12;
            var lastA: Vector3D;
            var lastB: Vector3D;
            var i: number


            for (i = 0; i < jindu; i++) {
                var a: Vector3D = new Vector3D(w, 0, 0);
                var b: Vector3D = new Vector3D(w, +h, 0);
                var m: Matrix3D = new Matrix3D;
                m.appendRotation(i * (360 / jindu), Vector3D.Y_AXIS);

                var A: Vector3D = m.transformVector(a);
                var B: Vector3D = m.transformVector(b);

                this.capsuleLineSprite.makeLineMode(A, B)

                //this.capsuleLineSprite.makeLineMode(A, new Vector3D(0, 0, 0))
                this.capsuleLineSprite.makeLineMode(B, new Vector3D(0, +h, 0))


                if (i == (jindu - 1)) {
                    this.capsuleLineSprite.makeLineMode(A, a)
                    this.capsuleLineSprite.makeLineMode(B, b)
                }

                if (lastA || lastB) {
                    this.capsuleLineSprite.makeLineMode(A, lastA)
                    this.capsuleLineSprite.makeLineMode(B, lastB)
                }

                lastA = A.clone();
                lastB = B.clone();

            }


        }

        public setVcMatrix($mesh: MeshData): void {
            //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Scene_data.context3D.setVpMatrix($mesh.material.shader, Scene_data.vpMatrix.m);
            Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrix3D", this.posMatrix.m);
            //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
        }

        public setVa($mesh: MeshData): void {
            if ($mesh.compressBuffer) {
                this.setVaCompress($mesh);
            } else {
                this.setVaIndependent($mesh);
            }
        }

        public setVaIndependent($mesh: MeshData): void {
            Scene_data.context3D.setVa(0, 3, $mesh.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, $mesh.uvBuffer);
            Scene_data.context3D.setVa(2, 4, $mesh.boneIdBuffer);
            Scene_data.context3D.setVa(3, 4, $mesh.boneWeightBuffer);

            if ($mesh.material.usePbr) {
                Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
                Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                if ($mesh.material.useNormal) {
                    Scene_data.context3D.setVa(5, 4, $mesh.tangentBuffer);
                    Scene_data.context3D.setVa(6, 4, $mesh.bitangentBuffer);
                }
            } else {
                if ($mesh.material.lightProbe || $mesh.material.directLight) {
                    Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
                    Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                }
            }

        }

        public setVaCompress($mesh: MeshData): void {
            var tf: boolean = Scene_data.context3D.pushVa($mesh.vertexBuffer);
            if (tf) {
                ////console.log('cccccc')
                return;
            }

            Scene_data.context3D.setVaOffset(0, 3, $mesh.stride, 0);
            Scene_data.context3D.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
            Scene_data.context3D.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
            Scene_data.context3D.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);


            if ($mesh.material.usePbr) {
                Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.normalsOffsets);
                Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                if ($mesh.material.useNormal) {
                    Scene_data.context3D.setVaOffset(5, 3, $mesh.stride, $mesh.tangentsOffsets);
                    Scene_data.context3D.setVaOffset(6, 3, $mesh.stride, $mesh.bitangentsOffsets);
                }
            } else {
                if ($mesh.material.lightProbe || $mesh.material.directLight) {
                    Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.normalsOffsets);
                    Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                }
            }
        }

        public clearVa(): void {
            Scene_data.context3D.clearVa(2);
            Scene_data.context3D.clearVa(3);
            Scene_data.context3D.clearVa(4);
            Scene_data.context3D.clearVa(5);
            Scene_data.context3D.clearVa(6);
        }

        public updateMaterialMesh($mesh: MeshData): void {
            if (!$mesh.material) {
                return;
            }

            Scene_data.context3D.setProgram($mesh.material.program);


            // Scene_data.context3D.cullFaceBack($mesh.material.backCull);
            Scene_data.context3D.cullFaceBack(false);

            Scene_data.context3D.setBlendParticleFactors($mesh.material.blendMode);
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

            Scene_data.context3D.drawCall($mesh.indexBuffer, $mesh.treNum);

        }

        public setLightProbeVc($material: Material): void {
            if ($material.lightProbe) {
                for (var i: number = 0; i < this.resultSHVec.length; i++) {
                    Scene_data.context3D.setVc3fv($material.shader, "sh[" + i + "]", [this.resultSHVec[i].x, this.resultSHVec[i].y, this.resultSHVec[i].z]);
                }
            }
        }
        private locationDic: any = new Object;

        public setMeshVc($mesh: MeshData): void {
            var animData: AnimData
            if (this._animDic[this.curentAction]) {
                animData = this._animDic[this.curentAction];
            } else if (this._animDic[this._defaultAction]) {
                animData = this._animDic[this._defaultAction];
            } else {
                return;
            }
            var $dualQuatFrame: DualQuatFloat32Array = animData.getBoneQPAryByMesh($mesh)[$mesh.uid][this._curentFrame];
            if (!$dualQuatFrame) {
                return;
            }
            Scene_data.context3D.setVc4fv($mesh.material.shader, "boneQ", $dualQuatFrame.quat); //旋转
            Scene_data.context3D.setVc3fv($mesh.material.shader, "boneD", $dualQuatFrame.pos);  //所有的位移
        }


        public setPos($v3d: Vector3D): void {
            ////console.log($v3d);
            super.setPos($v3d);
            if (this._shadow) {
                this._shadow.x = $v3d.x;
                this._shadow.y = $v3d.y + 8;
                this._shadow.z = $v3d.z;
            }
        }

        public set x(value: number) {
            this._x = value;
            this.updateMatrix();
            if (this._shadow) {
                this._shadow.x = value;
            }
            this.changePos();
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.updateMatrix();
            if (this._shadow) {
                this._shadow.y = value;
            }
            this.changePos();
        }
        public get y(): number {
            return this._y
        }
        public set z(value: number) {
            this._z = value;
            this.updateMatrix();
            if (this._shadow) {
                this._shadow.z = value;
            }
            this.changePos();
        }
        public get z(): number {
            return this._z
        }

        public changePos(): void {

        }

    }
}