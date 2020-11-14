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
    var SceneChar = /** @class */ (function (_super) {
        __extends(SceneChar, _super);
        function SceneChar() {
            var _this = _super.call(this) || this;
            _this.speedTX = 1.5 / 20;
            _this.life = 0;
            _this.isMount = false;
            _this._px = 0;
            _this._py = 0;
            _this._pz = 0;
            _this._pRotationY = 0;
            _this._isBoss = false;
            _this._optimization = false; //当优化为true的时候 不显示
            _this._weaponNum = -1;
            _this._wingID = -1;
            _this.lastBloodcolorType = 0;
            _this.tittleHeight = 50;
            _this.toRotationY = 0;
            _this._resultVisible = true;
            _this._showHitBox = false;
            // private triIndex: Array<number> = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]
            // private triIndex: Array<number> = [0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0]
            _this.triIndex = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0];
            _this.shadow = true;
            _this.skillitem = new Array();
            return _this;
        }
        Object.defineProperty(SceneChar.prototype, "isDeath", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "isBoss", {
            get: function () {
                return this._isBoss;
            },
            set: function (val) {
                this._isBoss = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "px", {
            get: function () {
                return this._px;
            },
            set: function (val) {
                this._px = val;
                if (this.isMount) {
                    this.mountChar.x = val;
                    if (this._shadow) {
                        this._shadow.x = val;
                    }
                }
                else {
                    this.x = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "py", {
            get: function () {
                return this._py;
            },
            set: function (val) {
                this._py = val;
                if (this.isMount) {
                    this.mountChar.y = val;
                    if (this._shadow) {
                        this._shadow.y = val;
                    }
                }
                else {
                    this.y = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "pz", {
            get: function () {
                return this._pz;
            },
            set: function (val) {
                this._pz = val;
                if (this.isMount) {
                    this.mountChar.z = val;
                    if (this._shadow) {
                        this._shadow.z = val;
                    }
                }
                else {
                    this.z = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "forceRotationY", {
            /**强制角度 */
            set: function (val) {
                this.pRotationY = val;
                this.rotationY = val;
                this.toRotationY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "pRotationY", {
            get: function () {
                return this._pRotationY;
            },
            set: function (val) {
                this._pRotationY = val;
                if (this.isMount) {
                    this.mountChar.rotationY = val;
                }
                else {
                    this.rotationY = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        SceneChar.prototype.play = function ($action, $completeState, needFollow) {
            if ($completeState === void 0) { $completeState = 0; }
            if (needFollow === void 0) { needFollow = true; }
            if (this.isSinging) {
                $completeState = 0; //吟唱时动作状态成为2;
                if ($action == Pan3d.CharAction.WALK || $action == Pan3d.CharAction.STANAD) {
                    return true;
                }
            }
            if (this.isMount) {
                this.mountChar.visible = Boolean($action != Pan3d.CharAction.JUMP);
                if ($action == Pan3d.CharAction.STANAD) {
                    _super.prototype.play.call(this, Pan3d.CharAction.STAND_MOUNT);
                }
                else if ($action == Pan3d.CharAction.WALK) {
                    _super.prototype.play.call(this, Pan3d.CharAction.WALK_MOUNT);
                }
                else {
                    if (this.mountChar.visible) {
                        _super.prototype.play.call(this, Pan3d.CharAction.STAND_MOUNT);
                    }
                    else {
                        _super.prototype.play.call(this, Pan3d.CharAction.JUMP);
                    }
                }
                return this.mountChar.play($action, $completeState, needFollow);
            }
            else {
                return _super.prototype.play.call(this, $action, $completeState, needFollow);
            }
            // if (this.unit && this.unit.isMain) {
            //     if (this.isMount) {
            //         //console.log("有坐骑")
            //     } else {
            //         //console.log("无坐骑") 
            //     }
            // }
        };
        SceneChar.prototype.getCurrentAction = function () {
            if (this.isMount) {
                return this.mountChar.curentAction;
            }
            else {
                return this.curentAction;
            }
        };
        SceneChar.prototype.getSceneCharAvatarUrl = function (num) {
            var $tempNum = String(num);
            if (num == 0) {
                //console.log("衣服为0")
                throw new Error("衣服为getSceneCharAvatarUrl");
            }
            var $url = getRoleUrl($tempNum);
            return $url;
        };
        SceneChar.prototype.setMount = function () {
        };
        SceneChar.prototype.setWeapon = function (num) {
            if (this._weaponNum == num) {
                return;
            }
            this._weaponNum = num;
            if (num <= 0) { //移除武器
                this.removePart(SceneChar.WEAPON_PART);
            }
            else {
            }
        };
        SceneChar.prototype.setWeaponByAvatar = function (avatar, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
        };
        SceneChar.prototype.addTestWeapon = function () {
            this.addPart("test" + Math.random(), SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(Math.random() > 0.5 ? 5202 : 5201));
        };
        SceneChar.prototype.refreshTittle = function () {
            this.refreshPos();
        };
        SceneChar.prototype.showName = function ($color) {
            if ($color === void 0) { $color = null; }
            var nameAry = this.unit.getName().split(",");
            var $baseName = nameAry[nameAry.length - 1];
            $color = "[00ff00]";
            var $colorName = $color + $baseName;
            if (!this._charNameVo) {
                this._charNameVo = Pan3d.BloodManager.getInstance().getCharNameMeshVo($colorName);
            }
            else {
                this._charNameVo.name = $colorName;
            }
            this.refreshPos();
        };
        SceneChar.prototype.showBlood = function ($colorType) {
            if ($colorType === void 0) { $colorType = 0; }
            //添加显示血条 -FIXME--0
            this.lastBloodcolorType = $colorType;
            if (!this._charBloodVo) {
                this._charBloodVo = Pan3d.BloodManager.getInstance().getBloodLineMeshVo();
                this._charBloodVo.colortype = $colorType;
            }
            else {
                this._charBloodVo.colortype = $colorType;
            }
            this.refreshPos();
        };
        SceneChar.prototype.onMeshLoaded = function () {
            if (this._skinMesh) {
                this.tittleHeight = this._skinMesh.tittleHeight;
            }
        };
        SceneChar.prototype.refreshPos = function () {
            //处理血条和名字位置 -FIXME--0
            if (this._charBloodVo) {
                this._charBloodVo.pos.x = this.px;
                if (this.isMount) {
                    this._charBloodVo.pos.y = this.py + this.tittleHeight - 6 + 20;
                }
                else {
                    this._charBloodVo.pos.y = this.py + this.tittleHeight - 6;
                }
                this._charBloodVo.pos.z = this.pz;
                this._charBloodVo.visible = this._resultVisible;
            }
            if (this._charNameVo) {
                this._charNameVo.pos.x = this.px;
                if (this.isMount) {
                    this._charNameVo.pos.y = this.py + this.tittleHeight + 20;
                }
                else {
                    this._charNameVo.pos.y = this.py + this.tittleHeight;
                }
                this._charNameVo.pos.z = this.pz;
                this._charNameVo.visible = this._resultVisible;
            }
            if (this._charTitleVo) {
                this._charTitleVo.pos.x = this.px;
                if (this.isMount) {
                    this._charTitleVo.pos.y = this.py + this.tittleHeight + 20 + 10;
                }
                else {
                    this._charTitleVo.pos.y = this.py + this.tittleHeight + 10;
                }
                this._charTitleVo.pos.z = this.pz;
                this._charTitleVo.visible = this._resultVisible;
            }
        };
        Object.defineProperty(SceneChar.prototype, "walkPath", {
            set: function ($wp) {
                if ($wp.length == 0) {
                    return;
                }
                // //console.log("收到寻路信息",$wp,  TimeUtil.getTimer())
                if (this.curentAction == Pan3d.CharAction.STANAD || this.curentAction == Pan3d.CharAction.STAND_MOUNT) {
                    this.play(Pan3d.CharAction.WALK);
                }
                this._walkPath = $wp;
                this.setTarget();
                this._speedDirect = null;
            },
            enumerable: true,
            configurable: true
        });
        /*
        public set walkPath2D($item: Array<Vector2D>) {
            //if (this.unit) {
            //    this.unit.sendPath($item);
            //}
          //  $item.splice(0, 1);
            $item.shift()
            this.applyWalk($item)
        }
        private setWalkPathFun($item: Array<Vector2D>, $bfun: Function = null): void {
    
            this.walkPath2D = $item;
            this.walkCompleteBackFun = $bfun
    
        }
        */
        //得到A星数据后重新刷坐标
        SceneChar.prototype.fixAstartData = function (pos) {
            if (this._walkPath) {
                for (var i = 0; i < this._walkPath.length; i++) {
                    this._walkPath[i].x += pos.x;
                    this._walkPath[i].z = pos.y - this._walkPath[i].z;
                    this._walkPath[i].y = Pan3d.AstarUtil.getHeightByPos(this._walkPath[i]);
                }
            }
            this.px += pos.x;
            this.pz = pos.y - this.pz;
            if (this._astatTopos) {
                this._astatTopos.x += pos.x;
                this._astatTopos.z = pos.y - this._astatTopos.z;
                this.setAstarNrmAndRotation();
            }
            this.refreshY();
        };
        SceneChar.prototype.applyWalk = function ($item) {
            if ($item && $item.length == 2) {
                //排除是停止的路径将不处理
                if ($item[0].x == $item[1].x && $item[0].y == $item[1].y) {
                    this._speedDirect = null;
                    this._walkPath = null;
                    if (this.curentAction == Pan3d.CharAction.WALK) {
                        this.play(Pan3d.CharAction.STANAD);
                    }
                    var $k = Pan3d.AstarUtil.getWorldPosByStart2D($item[0]);
                    this.px = $k.x;
                    this.pz = $k.z;
                    return;
                }
            }
            this.walkPath = Pan3d.AstarUtil.Path2dTo3d($item);
        };
        Object.defineProperty(SceneChar.prototype, "moveToPos2D", {
            set: function ($v2d) {
                // $v2d=new Vector2D(154,87)
                this._walkPath = null;
                this.play(this._defaultAction);
                var pos = Pan3d.AstarUtil.getWorldPosByStart2D($v2d);
                this.px = pos.x;
                this.pz = pos.z;
                this.refreshY();
            },
            enumerable: true,
            configurable: true
        });
        SceneChar.prototype.stopToPos = function ($v2d) {
            var pos = Pan3d.AstarUtil.getWorldPosByStart2D($v2d);
            var arr = new Array;
            arr.push(pos);
            this.walkPath = arr;
        };
        SceneChar.prototype.moveTile = function (xt, yt) {
            this.moveToPos2D = new Pan3d.Vector2D(xt, yt);
        };
        SceneChar.prototype.updateFrame = function (t) {
            _super.prototype.updateFrame.call(this, t);
        };
        SceneChar.prototype.refreshY = function () {
            this.py = Pan3d.AstarUtil.getHeightByPos(this.getCurrentPos());
            this.refreshPos();
        };
        SceneChar.prototype.refreshHP = function () {
        };
        //平滑num=1为直接
        SceneChar.prototype.rotationToNew = function (value, num) {
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
        Object.defineProperty(SceneChar.prototype, "speedUseTime", {
            //设计毫秒走每个格子，
            set: function (value) {
                // this.speed = 0.01 * (1000 / (value))
                this.speedTX = 0.01 * (value / 10);
                ////console.log(this.speedTX )
            },
            enumerable: true,
            configurable: true
        });
        SceneChar.prototype.refreshSpeed = function () {
            this.speedUseTime = 1;
        };
        SceneChar.prototype.walkAstar = function (t) {
            if (this.unit && this.unit.isMain) {
            }
            var $wk = Math.min(t, 50);
            var distance = Pan3d.Vector3D.distance(new Pan3d.Vector3D(this.px, 0, this.pz), this._astatTopos);
            if (distance > 5) {
                var sn = $wk * this.speedTX;
                if (sn > distance) {
                    this.px = this._astatTopos.x;
                    this.pz = this._astatTopos.z;
                    var tempT = (sn - distance) / this.speedTX;
                    this.walkAstar(tempT);
                }
                else {
                    this.px += this._astarDirect.x * sn;
                    this.pz += this._astarDirect.z * sn;
                }
            }
            else {
                this.setTarget();
                if (!this._walkPath) { //已结束
                    this.px = this._astatTopos.x;
                    this.pz = this._astatTopos.z;
                    this.walkComplete();
                }
                else {
                    this.walkAstar(t);
                }
            }
        };
        SceneChar.prototype.walkComplete = function () {
            if (this.walkCompleteBackFun) {
                this.walkCompleteBackFun();
            }
        };
        SceneChar.prototype.setTarget = function () {
            if (!this._walkPath) {
                return;
            }
            if (this._walkPath.length == 0) {
                this._walkPath = null;
                this.play(Pan3d.CharAction.STANAD);
                return;
            }
            this._astatTopos = this._walkPath.shift();
            this.setAstarNrmAndRotation();
        };
        //计算移动角度和寻路方向 
        SceneChar.prototype.setAstarNrmAndRotation = function () {
            if (this._astatTopos) {
                this._astarDirect = this._astatTopos.subtract(this.getCurrentPos());
                this._astarDirect.y = 0;
                this._astarDirect.normalize();
                if (Pan3d.Vector3D.distance(this.getCurrentPos(), this._astatTopos) > 10) {
                    this.toRotationY = this.mathAngle(this._astatTopos.z, this._astatTopos.x, this.pz, this.px) + 180;
                }
            }
        };
        SceneChar.prototype.mathAngle = function (x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        };
        SceneChar.prototype.setSpeedDirect = function (value) {
            if (this.isDeath) {
                return;
            }
            this._speedDirect = value;
            if (this.curentAction == Pan3d.CharAction.STANAD || this.curentAction == Pan3d.CharAction.STAND_MOUNT) {
                this.play(Pan3d.CharAction.WALK);
            }
            this._walkPath = null;
        };
        SceneChar.prototype.stopMove = function () {
            this._speedDirect = null;
            this._walkPath = null;
            this.play(Pan3d.CharAction.STANAD);
        };
        SceneChar.prototype.getEndWalkPathPos = function () {
            if (this._walkPath) {
                return this._walkPath[this._walkPath.length - 1];
            }
            else {
                return null;
            }
        };
        SceneChar.prototype.watch = function ($obj, $syn) {
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
        SceneChar.prototype.getCurrentPos = function () {
            return new Pan3d.Vector3D(this.px, this.py, this.pz);
        };
        SceneChar.prototype.getAstarPos = function () {
            return Pan3d.AstarUtil.getGrapIndexByPos(this.getCurrentPos());
        };
        SceneChar.prototype.changeAction = function ($action) {
            if (this.unit && this.unit.isMain) {
                switch ($action) {
                    case Pan3d.CharAction.ATTACK_01:
                        this.play(Pan3d.CharAction.ATTACK_010, 2);
                        break;
                    case Pan3d.CharAction.ATTACK_02:
                        this.play(Pan3d.CharAction.ATTACK_020, 2);
                        break;
                    default:
                        _super.prototype.changeAction.call(this, $action);
                        break;
                }
            }
            else {
                _super.prototype.changeAction.call(this, $action);
            }
        };
        SceneChar.prototype.playSkill = function ($skill) {
            this._walkPath = null;
            Pan3d.SkillManager.getInstance().playSkill($skill);
            this.skillVo = $skill;
        };
        SceneChar.prototype.msgSpellStop = function () {
            if (this.skillVo) {
                ////console.log("停止技能播放");
                this.skillVo.removeSkillForce();
                this.changeAction(this._defaultAction);
                this.skillVo = null;
            }
            this.isSinging = false;
        };
        //清理等待播放的连击技能
        SceneChar.prototype.destory = function () {
            if (this._hasDestory) {
                return;
            }
            _super.prototype.destory.call(this);
            this.destoryName();
            if (this._isBoss) {
            }
            if (this.skillVo) {
                this.skillVo.removeSkillForce();
                this.skillVo = null;
            }
            if (this._wingDisplay) {
                this._wingDisplay.destory();
            }
            this._hasDestory = true;
        };
        SceneChar.prototype.destoryName = function () {
            //清理血条和名称 -FIXME-0
            if (this._charNameVo) {
                this._charNameVo.destory();
                this._charNameVo = null;
            }
            if (this._charBloodVo) {
                this._charBloodVo.destory();
                this._charBloodVo = null;
            }
            if (this._charTitleVo) {
                this._charTitleVo.destory();
                this._charTitleVo = null;
            }
        };
        SceneChar.prototype.removeStage = function () {
            _super.prototype.removeStage.call(this);
            if (this._charNameVo) {
                this._charNameVo.visible = false;
            }
            if (this._charBloodVo) {
                this._charBloodVo.visible = false;
            }
            if (this.mountChar) {
                Pan3d.SceneManager.getInstance().removeMovieDisplay(this.mountChar);
            }
            if (this._wingDisplay) {
                Pan3d.SceneManager.getInstance().removeMovieDisplay(this._wingDisplay);
            }
        };
        SceneChar.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            if (this._charNameVo) {
                this._charNameVo.visible = true;
            }
            if (this._charBloodVo) {
                this._charBloodVo.visible = true;
            }
            if (this.mountChar) {
                Pan3d.SceneManager.getInstance().addMovieDisplay(this.mountChar);
            }
            if (this._wingDisplay) {
                Pan3d.SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
            }
        };
        SceneChar.prototype.math_distance = function ($other) {
            return Pan3d.MathClass.math_distance(this.px, this.pz, $other.x, $other.z);
        };
        Object.defineProperty(SceneChar.prototype, "visible", {
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
        Object.defineProperty(SceneChar.prototype, "optimization", {
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
        Object.defineProperty(SceneChar.prototype, "resultVisible", {
            get: function () {
                return this._resultVisible;
            },
            enumerable: true,
            configurable: true
        });
        SceneChar.prototype.applyVisible = function () {
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
                if (this._partDic[SceneChar.WEAPON_PART]) {
                    for (var _i = 0, _a = this._partDic[SceneChar.WEAPON_PART]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        obj.sceneVisible = value;
                    }
                }
            }
            if (this._wingDisplay) {
                this._wingDisplay.visible = value;
            }
            /*
            if (this._charBloodVo) {
                this._charBloodVo.visible = value
            }
            if (this._charNameVo) {
                this._charNameVo.visible = value
            }
            if (this._factionNameVo) {
                this._factionNameVo.visible = value
            }
            if (this._charTitleVo) {
                this._charTitleVo.visible = value
            }
            */
            if (!value) {
                this.destoryName();
            }
            this.shadow = value;
            this._resultVisible = value;
        };
        SceneChar.prototype.update = function () {
            if (!this._skinMesh) {
                return;
            }
            if (this._optimization) {
                return;
            }
            _super.prototype.update.call(this);
            if (this._showHitBox) {
                if (!this.lineSprite) {
                    Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
                    this.lineSprite = new Pan3d.LineDisplaySprite();
                    this.lineSprite.clear();
                    for (var i = 0; i < this.triIndex.length / 3; i++) {
                        var a = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 0]];
                        var b = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 1]];
                        var c = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 2]];
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
        SceneChar.prototype.mouseClik = function ($lineA, $lineB) {
            var $pos = Pan3d.Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos());
            if ($pos.z < Pan3d.Scene_data.cam3D.distance / 3) { //在Z后面
                return null;
            }
            var hitVec2 = Pan3d.MathUtil.math3DWorldtoDisplay2DPos($lineB);
            if (this._skinMesh) {
                if (!this.hitBox2DItem) {
                    this.hitBox2DItem = new Array;
                }
                this.hitBox2DItem.length = 0;
                for (var j = 0; j < this._skinMesh.hitPosItem.length; j++) {
                    var temppp = this.posMatrix.transformVector(this._skinMesh.hitPosItem[j]);
                    this.hitBox2DItem.push(Pan3d.MathUtil.math3DWorldtoDisplay2DPos(temppp));
                }
                for (var i = 0; i < this.triIndex.length / 3; i++) {
                    Pan3d.TestTriangle.baseTri.p1 = this.hitBox2DItem[this.triIndex[i * 3 + 0]];
                    Pan3d.TestTriangle.baseTri.p2 = this.hitBox2DItem[this.triIndex[i * 3 + 1]];
                    Pan3d.TestTriangle.baseTri.p3 = this.hitBox2DItem[this.triIndex[i * 3 + 2]];
                    if (Pan3d.TestTriangle.baseTri.checkPointIn(hitVec2)) {
                        return true;
                    }
                }
            }
            else {
                if (Pan3d.Vector2D.distance(hitVec2, Pan3d.MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position)) < 20) {
                    return true;
                }
            }
            return false;
        };
        SceneChar.WEAPON_PART = "weapon";
        SceneChar.WEAPON_DEFAULT_SLOT = "w_01";
        SceneChar.MOUNT_SLOT = "mount_01";
        SceneChar.WING_SLOT = "wing_01";
        SceneChar.SEL_PART = "select";
        SceneChar.QUEST_ICON = "questicon";
        SceneChar.NONE_SLOT = "none";
        SceneChar.Defaul_Man_Avatar = 2002; //男
        SceneChar.Defaul_WoMan_Avater = 2012; //女
        return SceneChar;
    }(Pan3d.SceneBaseChar));
    Pan3d.SceneChar = SceneChar;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SceneChar.js.map