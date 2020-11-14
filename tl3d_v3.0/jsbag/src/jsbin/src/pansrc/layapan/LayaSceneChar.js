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
/**
* name
*/
var layapan_me;
(function (layapan_me) {
    var Display3DSprite = Pan3d.Display3DSprite;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Vector3D = Pan3d.Vector3D;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var MathClass = Pan3d.MathClass;
    var TestTriangle = Pan3d.TestTriangle;
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var LineDisplaySprite = Pan3d.LineDisplaySprite;
    var CombineParticle = Pan3d.CombineParticle;
    var CharAction = Pan3d.CharAction;
    var BaseRes = Pan3d.BaseRes;
    var ParticleManager = Pan3d.ParticleManager;
    var LayaSceneChar = /** @class */ (function (_super) {
        __extends(LayaSceneChar, _super);
        function LayaSceneChar() {
            var _this = _super.call(this) || this;
            _this.isMount = false;
            _this._px = 0;
            _this._py = 0;
            _this._pz = 0;
            _this._pRotationY = 0;
            _this.toRotationY = 0;
            _this._pScale = 1;
            _this.tittleHeight = 50;
            _this._optimization = false; //当优化为true的时候 不显示
            _this._weaponNum = -1;
            _this._resultVisible = true;
            _this._hpRatio = 0;
            // 是否显示血条
            _this._bloodEnable = false;
            _this._angerRatio = 0;
            // 是否显示怒气
            _this._angerEnable = false;
            // 是否显示名字
            _this._nameEnable = false;
            _this._showHitBox = false;
            // private triIndex: Array<number> = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]
            // private triIndex: Array<number> = [0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0]
            _this._triIndex = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0];
            // this.shadow = true;
            _this.skillitem = new Array();
            _this._bloodColor = LayaSceneChar.BLOOD_COLOR_HP;
            _this._angerColor = LayaSceneChar.BLOOD_COLOR_ANGER;
            return _this;
        }
        Object.defineProperty(LayaSceneChar.prototype, "forceRotationY", {
            /**强制角度 */
            set: function (val) {
                this.pRotationY = val;
                this.rotationY = val;
                this.toRotationY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "pRotationY", {
            get: function () {
                return this._pRotationY;
            },
            set: function (val) {
                this._pRotationY = val;
                if (this.isMount) {
                    this._mountChar.rotationY = val;
                }
                else {
                    this.rotationY = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "pScale", {
            get: function () {
                return this._pScale;
            },
            set: function (v) {
                this._pScale = v;
                this._mountChar && (this._mountChar.scale = v);
                this._wingDisplay && (this._wingDisplay.scale = v);
                this.scale = v;
                if (this._skinMesh) {
                    this.tittleHeight = this._skinMesh.tittleHeight * v;
                }
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneChar.prototype.setMount = function (v) {
            this.isMount = (v && v.length != 0);
            if (this.isMount) {
                if (!this._mountChar) {
                    this._mountChar = new layapan_me.LayaSceneBaseChar();
                    this._mountChar.scale = this._pScale;
                }
                this._mountChar.setRoleUrl(getRoleUrl(v));
                this.setBind(this._mountChar, LayaSceneChar.MOUNT_SLOT);
                this._mountChar._scene = this._scene;
                this._scene && this._scene.addMovieDisplay(this._mountChar);
            }
            else {
                this.setBind(null, null);
                if (this._mountChar) {
                    this._mountChar = null;
                }
            }
            return this.isMount;
        };
        LayaSceneChar.prototype.setWing = function (v) {
            if (v && v.length) {
                if (!this._wingDisplay) {
                    this._wingDisplay = new layapan_me.LayaSceneBaseChar();
                    this._wingDisplay.scale = this._pScale;
                }
                this._wingDisplay.setRoleUrl(getRoleUrl(v));
                this._wingDisplay.setBind(this, LayaSceneChar.WING_SLOT);
                this._wingDisplay._scene = this._scene;
                this._scene && this._scene.addMovieDisplay(this._wingDisplay);
            }
            else {
                if (this._wingDisplay) {
                    this._wingDisplay.setBind(null, null);
                    //this._wingDisplay.removeSelf();
                    this._wingDisplay = null;
                }
            }
        };
        LayaSceneChar.prototype.setWeapon = function (num) {
            if (this._weaponNum == num) {
                return;
            }
            this._weaponNum = num;
            if (num <= 0) { //移除武器
                this.removePart(LayaSceneChar.WEAPON_PART);
            }
            else {
                this.setWeaponByAvatar(this._weaponNum);
            }
        };
        LayaSceneChar.prototype.setWeaponByAvatar = function (avatar, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            this.addPart(LayaSceneChar.WEAPON_PART, LayaSceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        };
        LayaSceneChar.prototype.addPart = function ($key, $bindSocket, $url) {
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
            this._scene.groupDataManager.scene = this._scene;
            this._scene.groupDataManager.getGroupData(Scene_data.fileRoot + $url, function (groupRes) {
                console.log($bindSocket, groupRes, ary);
                _this.loadPartRes($bindSocket, groupRes, ary);
            });
        };
        LayaSceneChar.prototype.addPartToPos = function ($key, $url, $pos) {
            var _this = this;
            if ($pos === void 0) { $pos = null; }
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
            this._scene.groupDataManager.scene = this._scene;
            this._scene.groupDataManager.getGroupData(Scene_data.fileRoot + $url, function (groupRes) {
                _this.loadPartToPos(groupRes, ary, $pos);
            });
        };
        LayaSceneChar.prototype.loadPartToPos = function (groupRes, ary, $pos) {
            if (this._hasDestory) {
                return;
            }
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                var posV3d = new Vector3D($pos.x, $pos.y, $pos.z);
                var rotationV3d = new Vector3D(0, 0, 0);
                var scaleV3d = new Vector3D(1, 1, 1);
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x + $pos.x, item.y + $pos.y, item.z + $pos.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = Pan3d.SceneChar.NONE_SLOT;
                    particle.dynamic = true;
                    this._scene.particleManager.addParticle(particle);
                    particle.setGroup(posV3d, rotationV3d, scaleV3d);
                }
                else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, Pan3d.SceneChar.NONE_SLOT);
                    this._scene.addSpriteDisplay(display);
                    display.setGroup(posV3d, rotationV3d, scaleV3d);
                }
            }
            this.applyVisible();
        };
        LayaSceneChar.prototype.removePart = function ($key) {
            var ary = this._partDic[$key];
            if (!ary) {
                return;
            }
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] instanceof CombineParticle) {
                    this._scene.particleManager.removeParticle(ary[i]);
                    ary[i].destory();
                }
                else if (ary[i] instanceof Display3DSprite) {
                    this._scene.removeSpriteDisplay(ary[i]);
                    ary[i].destory();
                }
            }
            this._partDic[$key] = null;
            this._partUrl[$key] = null;
            delete this._partDic[$key];
            delete this._partUrl[$key];
        };
        LayaSceneChar.prototype.getSceneCharAvatarUrl = function (num) {
            var $tempNum = String(num);
            if (num == 0) {
                //console.log("衣服为0")
                throw new Error("衣服为getSceneCharAvatarUrl");
            }
            var $url = getRoleUrl($tempNum);
            return $url;
        };
        LayaSceneChar.prototype.onMeshLoaded = function () {
            if (this._skinMesh) {
                this.tittleHeight = this._skinMesh.tittleHeight * this._pScale;
            }
        };
        LayaSceneChar.prototype.play = function ($action, $completeState, needFollow) {
            if ($completeState === void 0) { $completeState = 0; }
            if (needFollow === void 0) { needFollow = true; }
            if (this.isMount) {
                this._mountChar.visible = Boolean($action != CharAction.JUMP);
                if ($action == CharAction.STANAD) {
                    _super.prototype.play.call(this, CharAction.STAND_MOUNT);
                }
                else if ($action == CharAction.WALK) {
                    _super.prototype.play.call(this, CharAction.WALK_MOUNT);
                }
                else {
                    if (this._mountChar.visible) {
                        _super.prototype.play.call(this, CharAction.STAND_MOUNT);
                    }
                    else {
                        _super.prototype.play.call(this, CharAction.JUMP);
                    }
                }
                return this._mountChar.play($action, $completeState, needFollow);
            }
            else {
                return _super.prototype.play.call(this, $action, $completeState, needFollow);
            }
        };
        LayaSceneChar.prototype.getCurrentAction = function () {
            if (this.isMount) {
                return this._mountChar.curentAction;
            }
            else {
                return this.curentAction;
            }
        };
        //平滑num=1为直接
        LayaSceneChar.prototype.rotationToNew = function (value, num) {
            if (num === void 0) { num = 1; }
            var anum = value - this.pRotationY;
            if (anum == 0) {
                return;
            }
            if (anum < 1) {
                this.pRotationY = value;
                return;
            }
            var a = ((value - this.pRotationY) % 360 + 360) % 360;
            if (a > 180) {
                this.pRotationY -= (360 - a) / num;
            }
            else {
                this.pRotationY += a / num;
            }
        };
        LayaSceneChar.prototype.stopMove = function () {
            this.play(CharAction.STANAD);
        };
        LayaSceneChar.prototype.watch = function ($obj, $syn) {
            if ($syn === void 0) { $syn = false; }
            if (!$obj) {
                //console.log("面向对象无")
                return;
            }
            var xx = $obj.x - this.px;
            var yy = $obj.z - this.pz;
            var distance = Math.sqrt(xx * xx + yy * yy);
            xx /= distance;
            yy /= distance;
            var angle = Math.asin(xx) / Math.PI * 180;
            if (yy <= 0) {
                angle = 180 - angle;
            }
            if (!isNaN(angle)) {
                this.forceRotationY = angle;
            }
        };
        LayaSceneChar.prototype.getCurrentPos = function () {
            return new Vector3D(this.px, this.py, this.pz);
        };
        /*
        playSkill($skill: Skill): void {
            if (!this._scene) {
                return;
            }
            this._scene.skillManager.playSkill($skill);
            this.skillVo = $skill;
        }
        */
        LayaSceneChar.prototype.msgSpellStop = function () {
            if (this.skillVo) {
                ////console.log("停止技能播放");
                this.skillVo.removeSkillForce();
                this.changeAction(this._defaultAction);
                this.skillVo = null;
            }
            this.isSinging = false;
        };
        /*
        setScene(scene: Pan3d.SceneManager): void {
            super.setScene(scene);
            if (this._scene) {
                this._mountChar && this._scene.addMovieDisplay(this._mountChar);
                this._wingDisplay && this._scene.addMovieDisplay(this._wingDisplay);
            }
            this._bloodManager = this._scene instanceof PanScene ? this._scene.bloodManager : null;
            this.nameEnable = this._nameEnable;
            this.bloodEnable = this._bloodEnable;
            this.angerEnable = this._angerEnable;
        }

        removeSelf(): void {
            if (this._mountChar) {
                this._mountChar.removeSelf();
            }
            if (this._wingDisplay) {
                this._wingDisplay.removeSelf();
            }
            if (this._charNameVo) {
                this._charNameVo.visible = false;
            }
            if (this._charBloodVo) {
                this._charBloodVo.visible = false;
            }
            if (this._charAngerVo) {
                this._charAngerVo.visible = false;
            }
            super.removeSelf();
        }
        */
        LayaSceneChar.prototype.destory = function () {
            if (this._hasDestory) {
                return;
            }
            if (this.skillVo) {
                this.skillVo.removeSkillForce();
                this.skillVo = null;
            }
            if (this._mountChar) {
                this._mountChar.destory();
                this._mountChar = null;
            }
            if (this._wingDisplay) {
                this._wingDisplay.destory();
                this._wingDisplay = null;
            }
            if (this._charNameVo) {
                this._charNameVo.destory();
                this._charNameVo = null;
            }
            if (this._charBloodVo) {
                this._charBloodVo.destory();
                this._charBloodVo = null;
            }
            if (this._charAngerVo) {
                this._charAngerVo.destory();
                this._charAngerVo = null;
            }
            this._hasDestory = true;
            _super.prototype.destory.call(this);
        };
        Object.defineProperty(LayaSceneChar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                this.applyVisible();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "optimization", {
            get: function () {
                return this._optimization;
            },
            set: function (value) {
                this._optimization = value;
                this.applyVisible();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "resultVisible", {
            get: function () {
                return this._resultVisible;
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneChar.prototype.applyVisible = function () {
            var value = this._visible;
            if (this._visible) {
                if (this._optimization) {
                    value = false;
                }
                else {
                    value = true;
                }
            }
            else {
                value = false;
            }
            if (this._partDic) {
                if (this._partDic[LayaSceneChar.WEAPON_PART]) {
                    for (var _i = 0, _a = this._partDic[LayaSceneChar.WEAPON_PART]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        obj.sceneVisible = value;
                    }
                }
            }
            // this._mountChar && (this._mountChar.sceneVisible = value);
            // this._wingDisplay && (this._wingDisplay.sceneVisible = value);
            this._resultVisible = value;
        };
        Object.defineProperty(LayaSceneChar.prototype, "isCamera2D", {
            set: function (v) {
                this._isCamera2D = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "bloodColor", {
            set: function (v) {
                this._bloodColor = v;
                this._charBloodVo && (this._charBloodVo.colortype = this._bloodColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "hpRatio", {
            get: function () {
                return this._hpRatio;
            },
            set: function (v) {
                this._hpRatio = v;
                this._charBloodVo && (this._charBloodVo.num = this._hpRatio);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "bloodEnable", {
            set: function (v) {
                this._bloodEnable = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "angerColor", {
            set: function (v) {
                this._angerColor = v;
                this._charAngerVo && (this._charAngerVo.colortype = this._angerColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "angerRatio", {
            get: function () {
                return this._angerRatio;
            },
            set: function (v) {
                this._angerRatio = v;
                this._charAngerVo && (this._charAngerVo.num = this._angerRatio);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "angerEnable", {
            set: function (v) {
                this._angerEnable = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "charName", {
            get: function () {
                return this._charName || "";
            },
            set: function (v) {
                if (this._charName == v)
                    return;
                this._charName = v;
                this._charNameVo && (this._charNameVo.name = this._charName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "nameEnable", {
            set: function (v) {
                this._nameEnable = v;
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneChar.prototype.updateBind = function () {
            _super.prototype.updateBind.call(this);
            this.updateWeaponScale();
            this.refreshPos();
        };
        LayaSceneChar.prototype.updateWeaponScale = function () {
            if (this._partDic.hasOwnProperty(LayaSceneChar.WEAPON_PART)) {
                var ary = this._partDic[LayaSceneChar.WEAPON_PART];
                if (ary instanceof Array) {
                    for (var i = 0; i < ary.length; i++) {
                        var item = ary[i];
                        if (item instanceof Display3DSprite) {
                            item.scale = this._pScale;
                        }
                    }
                }
            }
        };
        LayaSceneChar.prototype.refreshPos = function () {
            var posY = this.py + this.tittleHeight;
            if (this.isMount) {
                posY += 20;
            }
            //处理怒气条位置
            if (this._charAngerVo) {
                this._charAngerVo.pos.x = this.px;
                this._charAngerVo.pos.y = posY;
                this._charAngerVo.pos.z = this.pz;
                this._charAngerVo.visible = this._resultVisible;
                posY += (this._isCamera2D ? 5 : 5);
            }
            //处理血条和名字位置 -FIXME--0
            if (this._charBloodVo) {
                this._charBloodVo.pos.x = this.px;
                this._charBloodVo.pos.y = posY;
                this._charBloodVo.pos.z = this.pz;
                this._charBloodVo.visible = this._resultVisible;
                posY += (this._isCamera2D ? 10 : 10);
            }
            if (this._charNameVo) {
                this._charNameVo.pos.x = this.px;
                this._charNameVo.pos.y = posY;
                this._charNameVo.pos.z = this.pz;
                this._charNameVo.visible = this._resultVisible;
                // posY += 6;
            }
        };
        Object.defineProperty(LayaSceneChar.prototype, "px", {
            get: function () {
                return this._px;
            },
            set: function (value) {
                this._px = value;
                if (this._mountChar) {
                    this._mountChar.x = this._px;
                }
                else {
                    this.x = this.px;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "pz", {
            get: function () {
                return this._pz;
            },
            set: function (value) {
                this._pz = value;
                if (this._mountChar) {
                    this._mountChar.z = this._pz;
                }
                else {
                    this.z = this.pz;
                }
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneChar.prototype.update = function () {
            if (!this._skinMesh) {
                return;
            }
            if (this._optimization) {
                return;
            }
            _super.prototype.update.call(this);
            if (this._showHitBox) {
                if (!this.lineSprite) {
                    ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
                    this.lineSprite = new LineDisplaySprite();
                    this.lineSprite.clear();
                    for (var i = 0; i < this._triIndex.length / 3; i++) {
                        var a = this._skinMesh.hitPosItem[this._triIndex[i * 3 + 0]];
                        var b = this._skinMesh.hitPosItem[this._triIndex[i * 3 + 1]];
                        var c = this._skinMesh.hitPosItem[this._triIndex[i * 3 + 2]];
                        this.lineSprite.makeLineMode(a, b);
                        this.lineSprite.makeLineMode(b, c);
                        this.lineSprite.makeLineMode(c, a);
                    }
                    this.lineSprite.upToGpu();
                }
                this.lineSprite.posMatrix = this.posMatrix.clone();
                this.lineSprite.update();
            }
        };
        LayaSceneChar.prototype.math_distance = function ($other) {
            return MathClass.math_distance(this.px, this.pz, $other.x, $other.z);
        };
        LayaSceneChar.prototype.get2dPos = function () {
            var $v2d = new Vector2D;
            var $nScale = 0.25 / scene2d_me.Override2dEngine.htmlScale;
            if (this._mountChar) {
                $v2d.x = this._mountChar.px;
                $v2d.y = this._mountChar.pz;
            }
            else {
                $v2d.x = this.px;
                $v2d.y = this.pz;
            }
            $v2d.x = $v2d.x / $nScale;
            $v2d.y = $v2d.y / -1 * (Math.sin(45 * Math.PI / 180)) / $nScale;
            return $v2d;
        };
        LayaSceneChar.prototype.set2dPos = function ($x, $y) {
            var $nScale = 0.25 / scene2d_me.Override2dEngine.htmlScale;
            var $tx = $x * $nScale;
            var $tz = $y * $nScale / (Math.sin(45 * Math.PI / 180)) * -1;
            this._px = $tx;
            this._pz = $tz;
            if (this._mountChar) {
                this._mountChar.x = $tx;
                this._mountChar.z = $tz;
            }
            else {
                this.x = $tx;
                this.z = $tz;
            }
        };
        LayaSceneChar.prototype.math3DWorldtoDisplay2DPos = function ($pos) {
            var $scene = this._scene;
            var m = $scene.cameraMatrix.clone();
            m.append($scene.viewMatrx3D.clone());
            var fovw = Scene_data.stageWidth;
            var fovh = Scene_data.stageHeight;
            var p = m.transformVector($pos);
            var b = new Vector2D;
            b.x = ((p.x / p.w) + 1) * (fovw / 2);
            b.y = ((-p.y / p.w) + 1) * (fovh / 2);
            return b;
        };
        LayaSceneChar.prototype.mouseClik = function (lineA, $lineB) {
            var $scene = this._scene;
            var $pos = $scene.cameraMatrix.transformVector(this.getCurrentPos());
            if ($pos.z < 10) { //在Z后面
                return false;
            }
            var hitVec2 = this.math3DWorldtoDisplay2DPos($lineB);
            if (this._skinMesh) {
                if (!this._hitBox2DItem) {
                    this._hitBox2DItem = new Array;
                }
                this._hitBox2DItem.length = 0;
                for (var j = 0; j < this._skinMesh.hitPosItem.length; j++) {
                    var temppp = this.posMatrix.transformVector(this._skinMesh.hitPosItem[j]);
                    this._hitBox2DItem.push(this.math3DWorldtoDisplay2DPos(temppp));
                }
                for (var i = 0; i < this._triIndex.length / 3; i++) {
                    TestTriangle.baseTri.p1 = this._hitBox2DItem[this._triIndex[i * 3 + 0]];
                    TestTriangle.baseTri.p2 = this._hitBox2DItem[this._triIndex[i * 3 + 1]];
                    TestTriangle.baseTri.p3 = this._hitBox2DItem[this._triIndex[i * 3 + 2]];
                    if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
                        console.log(this._hitBox2DItem);
                        return true;
                    }
                }
            }
            else {
                if (Vector2D.distance(hitVec2, this.math3DWorldtoDisplay2DPos(this.posMatrix.position)) < 20) {
                    return true;
                }
            }
            return false;
            //var $pos: Vector3D = Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos())
            //          if ($pos.z < Scene_data.cam3D.distance / 3) { //在Z后面
            //              return false
            //          }
            //          var hitVec2: Vector2D = MathUtil.math3DWorldtoDisplay2DPos($lineB)
            //          if (this._skinMesh) {
            //              if (!this._hitBox2DItem) {
            //                  this._hitBox2DItem = new Array;
            //              }
            //              this._hitBox2DItem.length = 0
            //              for (var j: number = 0; j < this._skinMesh.hitPosItem.length; j++) {
            //                  var temppp: Vector3D = this.posMatrix.transformVector(this._skinMesh.hitPosItem[j])
            //                  this._hitBox2DItem.push(MathUtil.math3DWorldtoDisplay2DPos(temppp))
            //              }
            //              for (var i: number = 0; i < this._triIndex.length / 3; i++) {
            //                  TestTriangle.baseTri.p1 = this._hitBox2DItem[this._triIndex[i * 3 + 0]];
            //                  TestTriangle.baseTri.p2 = this._hitBox2DItem[this._triIndex[i * 3 + 1]];
            //                  TestTriangle.baseTri.p3 = this._hitBox2DItem[this._triIndex[i * 3 + 2]];
            //                  if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
            //                      console.log(this._hitBox2DItem)
            //                      return true
            //                  }
            //              }
            //          } else {
            //              if (Vector2D.distance(hitVec2, MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position)) < 20) {
            //                  return true
            //              }
            //          }
            //          return false
        };
        LayaSceneChar.prototype.removeStage = function () {
            _super.prototype.removeStage.call(this);
            if (this._charNameVo) {
                this._charNameVo.visible = false;
            }
            if (this._charBloodVo) {
                this._charBloodVo.visible = false;
            }
            if (this._mountChar) {
                this._scene.removeMovieDisplay(this._mountChar);
            }
            if (this._wingDisplay) {
                this._scene.removeMovieDisplay(this._wingDisplay);
            }
        };
        LayaSceneChar.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            if (this._charNameVo) {
                this._charNameVo.visible = true;
            }
            if (this._charBloodVo) {
                this._charBloodVo.visible = true;
            }
            if (this._mountChar) {
                this._scene.addMovieDisplay(this._mountChar);
            }
            if (this._wingDisplay) {
                this._scene.addMovieDisplay(this._wingDisplay);
            }
        };
        // 血条颜色 对应素材 res_3d\ui\load\blood.png
        LayaSceneChar.BLOOD_COLOR_HP = 0;
        LayaSceneChar.BLOOD_COLOR_ANGER = 1;
        LayaSceneChar.Defaul_Man_Avatar = 2002; //男
        LayaSceneChar.Defaul_WoMan_Avater = 2012; //女
        LayaSceneChar.WEAPON_PART = "weapon";
        LayaSceneChar.WEAPON_DEFAULT_SLOT = "w_01";
        LayaSceneChar.MOUNT_SLOT = "mount_01";
        LayaSceneChar.WING_SLOT = "wing_01";
        LayaSceneChar.SEL_PART = "select";
        LayaSceneChar.QUEST_ICON = "questicon";
        LayaSceneChar.NONE_SLOT = "none";
        return LayaSceneChar;
    }(layapan_me.LayaSceneBaseChar));
    layapan_me.LayaSceneChar = LayaSceneChar;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=LayaSceneChar.js.map