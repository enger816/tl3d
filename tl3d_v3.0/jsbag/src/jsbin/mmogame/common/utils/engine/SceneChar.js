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
        _this.jumpEndTime = 0;
        _this.lastJumpDan = -1;
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
            return this.unit.getAlivestate() != SharedDef.DEATH_STATE_ALIVE;
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
            if ($action == CharAction.WALK || $action == CharAction.STANAD) {
                return true;
            }
        }
        if (this.isMount) {
            this.mountChar.visible = Boolean($action != CharAction.JUMP);
            if ($action == CharAction.STANAD) {
                _super.prototype.play.call(this, CharAction.STAND_MOUNT);
            }
            else if ($action == CharAction.WALK) {
                _super.prototype.play.call(this, CharAction.WALK_MOUNT);
            }
            else {
                if (this.mountChar.visible) {
                    _super.prototype.play.call(this, CharAction.STAND_MOUNT);
                }
                else {
                    _super.prototype.play.call(this, CharAction.JUMP);
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
        if (this.unit.hasMount()) {
            this.isMount = true;
            var rk = this.unit.getMountRank();
            var iid = this.unit.getMountIllusionID();
            if (!this.mountChar) {
                this.mountChar = new MountChar();
            }
            this.mountChar.x = this.px;
            this.mountChar.y = this.py;
            this.mountChar.z = this.pz;
            this.mountChar.rotationY = this._pRotationY;
            this.mountChar.setData(rk, iid);
            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
            if (this.onStage && !this.mountChar.onStage) {
                SceneManager.getInstance().addMovieDisplay(this.mountChar);
                this.play(this.curentAction);
            }
        }
        else {
            this.isMount = false;
            if (this.mountChar && this.mountChar.onStage) {
                SceneManager.getInstance().removeMovieDisplay(this.mountChar);
                if (this.curentAction == CharAction.WALK_MOUNT) {
                    this.play(CharAction.WALK);
                }
                else {
                    this.play(CharAction.STANAD);
                }
            }
            this.bindTarget = null;
            this.x = this.px;
            this.z = this.pz;
            this.y = this.py;
            this.rotationY = this._pRotationY;
        }
        this.refreshPos();
        if (this.unit && this.unit.isMain) {
            if (this.isMount) {
                //console.log("有坐骑1")
            }
            else {
                //console.log("无坐骑1")
            }
        }
    };
    SceneChar.prototype.setWeaponDivine = function () {
        this.setBaseRoleWeapon(this.unit.getDivine(), this.unit.getCharType());
    };
    SceneChar.prototype.setAvatarExterior = function () {
        this.setBaseRoleAvatar(this.unit.getAvatar(), this.unit.getCharType());
    };
    SceneChar.prototype.setBaseRoleAvatar = function ($exterior, $charType) {
        var num = 0;
        if ($exterior == 0) {
            num = tb.TB_char_info.getTempVo($charType).avatar;
        }
        else {
            num = tb.TB_appearance_info.getTempVo($exterior).avatar;
        }
        this.setAvatar(num);
    };
    SceneChar.prototype.setBaseRoleWeapon = function ($exterior, $charType) {
        if ($charType === void 0) { $charType = 1; }
        if ($exterior) {
            this.setWeaponByAvatar(tb.TB_appearance_info.getTempVo($exterior).avatar);
        }
        else {
            this.setWeaponByAvatar(tb.TB_char_info.getTempVo($charType).weapon);
        }
    };
    SceneChar.prototype.setWeapon = function (num) {
        if (this._weaponNum == num) {
            return;
        }
        this._weaponNum = num;
        if (num <= 0) {
            this.removePart(SceneChar.WEAPON_PART);
        }
        else {
            var $tb = tb.TB_item_template.get_TB_item_template(num);
            if ($tb) {
                this.setWeaponByAvatar($tb.avatar);
            }
        }
    };
    SceneChar.prototype.setWeaponByAvatar = function (avatar, $suffix) {
        if ($suffix === void 0) { $suffix = ""; }
        var so = tb.TB_item_slot.getTempVo(avatar);
        if (so) {
            this.addPart(SceneChar.WEAPON_PART, so.slot, this.getSceneCharWeaponUrl(avatar, $suffix));
        }
        else {
            this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        }
    };
    SceneChar.prototype.setWing = function () {
        var curWing = this.unit.getWing();
        if (curWing == 0 || curWing == this._wingID) {
            return;
        }
        var obj = TableData.getInstance().getData(TableData.tb_wings_base, curWing);
        if (!obj) {
            return;
        }
        this._wingID = curWing;
        if (!this._wingDisplay) {
            this._wingDisplay = new SceneBaseChar();
        }
        this._wingDisplay.setRoleUrl(getRoleUrl(obj.model));
        this._wingDisplay.setBind(this, SceneChar.WING_SLOT);
        if (this.onStage && !this._wingDisplay.onStage) {
            SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        }
    };
    SceneChar.prototype.addTestWeapon = function () {
        this.addPart("test" + Math.random(), SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(Math.random() > 0.5 ? 5202 : 5201));
    };
    SceneChar.prototype.refreshIllusion = function () {
        var $IllusionId = this.unit.getIllusionId();
        if ($IllusionId > 0) {
            var $tb = tb.TB_item_illusion.get_TB_item_illusion($IllusionId);
            this.setAvatar($tb.avatar);
            this.setWeaponByAvatar($tb.divine);
        }
        if (this.unit.isMain) {
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.RESET_SKILL_ICON));
        }
    };
    SceneChar.prototype.getCharAvatarNum = function () {
        var $IllusionId = this.unit.getIllusionId();
        if ($IllusionId > 0) {
            var $tb = tb.TB_item_illusion.get_TB_item_illusion($IllusionId);
            return $tb.avatar;
        }
        else {
            var $exterior = this.unit.getAvatar();
            if ($exterior == 0) {
                return tb.TB_char_info.getTempVo(this.unit.getCharType()).avatar;
            }
            else {
                return tb.TB_appearance_info.getTempVo($exterior).avatar;
            }
        }
    };
    SceneChar.prototype.refreshTittle = function () {
        //添加显示称号 -FIXME--0
        var $titleNum = this.unit.getCharTittle();
        if (this.unit.getUintFieldBossOwnFlag()) {
            $titleNum = 777;
        }
        var $id = 0;
        if ($titleNum != 0) {
            $id = $titleNum;
        }
        if (this.unit.getXianfuBaoXiang() > 0) {
            $id = 999;
        }
        var $type = this.unit.getAnger();
        switch ($type) {
            case SharedDef.QUEST_ESCORT_STATE_NORMAL:
                $id = 888;
                break;
            case SharedDef.QUEST_ESCORT_STATE_ROB:
                $id = 888;
                break;
        }
        if ($id == 0) {
            if (this._charTitleVo) {
                this._charTitleVo.destory();
                this._charTitleVo = null;
            }
        }
        else {
            if (!this._charTitleVo) {
                this._charTitleVo = BloodManager.getInstance().getCharTitleMeshVo($id);
            }
            else {
                this._charTitleVo.num = $id;
            }
        }
        this.refreshPos();
    };
    SceneChar.prototype.showName = function ($color) {
        if ($color === void 0) { $color = null; }
        if (this.unit.isSkillNpc()) {
            return;
        }
        var nameAry = this.unit.getName().split(",");
        var $baseName = nameAry[nameAry.length - 1];
        if (!$color) {
            switch (this.unit.getTypeID()) {
                case SharedDef.TYPEID_OBJECT:
                    $color = "[00ff00]";
                    break;
                case SharedDef.TYPEID_UNIT:
                    $color = "[ffffff]";
                    break;
                case SharedDef.TYPEID_PLAYER:
                    $color = "[ffffff]";
                    break;
                case SharedDef.TYPEID_GAMEOBJECT:
                    $color = "[00ff00]";
                    break;
                case SharedDef.MAX_CLIENT_OBJECT_TYPES:
                    $color = "[00ff00]";
                    break;
                default:
                    break;
            }
        }
        var daoStr = "";
        if (this.unit.isPlayer()) {
            var dao = this.unit.getDao();
            var obj = TableData.getInstance().getData(TableData.tb_realmbreak_base, dao);
            if (obj) {
                daoStr = getColorQua(obj.qua) + "[" + obj.name + "]";
            }
        }
        var entryStr = "";
        if (this.unit.getEntry() && !GameStart.outNet) {
            entryStr = "(" + String(this.unit.getEntry()) + ")";
        }
        var $colorName = daoStr + $color + $baseName + entryStr;
        if (!this._charNameVo) {
            this._charNameVo = BloodManager.getInstance().getCharNameMeshVo($colorName);
        }
        else {
            this._charNameVo.name = $colorName;
        }
        this.refreshPos();
        this.showFactionVo();
    };
    SceneChar.prototype.showFactionVo = function () {
        if (this.unit.getUnitStringFieldFactionGuid() && GuidData.faction) {
            var $nameStr = getBaseName(this.unit.getFactionName());
            var $colorStr = this.unit.getUnitStringFieldFactionGuid() == GuidData.faction.guid ? ColorType.Green20a200 : ColorType.Redd92200;
            $nameStr = $colorStr + "【" + $nameStr + "】";
            if (!this._factionNameVo) {
                this._factionNameVo = BloodManager.getInstance().getCharNameMeshVo($nameStr);
            }
            else {
                this._factionNameVo.name = $nameStr;
            }
            this.refreshPos();
        }
    };
    SceneChar.prototype.showBlood = function ($colorType) {
        if ($colorType === void 0) { $colorType = 0; }
        //添加显示血条 -FIXME--0
        this.lastBloodcolorType = $colorType;
        if (!this._charBloodVo) {
            if (this.unit.isPlayer() || this.unit.isMonster()) {
                if (!this.unit.isSkillNpc()) {
                    this._charBloodVo = BloodManager.getInstance().getBloodLineMeshVo();
                    this._charBloodVo.colortype = $colorType;
                }
            }
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
        if (this._factionNameVo) {
            this._factionNameVo.pos.x = this.px;
            if (this.isMount) {
                this._factionNameVo.pos.y = this.py + this.tittleHeight + 20;
            }
            else {
                this._factionNameVo.pos.y = this.py + this.tittleHeight;
            }
            this._factionNameVo.pos.y += 7;
            this._factionNameVo.pos.z = this.pz;
            this._factionNameVo.visible = this._resultVisible;
        }
        if (this._charTitleVo) {
            this._charTitleVo.pos.x = this.px;
            if (this.isMount) {
                this._charTitleVo.pos.y = this.py + this.tittleHeight + 20 + 10;
            }
            else {
                this._charTitleVo.pos.y = this.py + this.tittleHeight + 10;
            }
            if (this._factionNameVo) {
                this._charTitleVo.pos.y += 7;
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
            if (this.curentAction == CharAction.STANAD || this.curentAction == CharAction.STAND_MOUNT) {
                this.play(CharAction.WALK);
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
                this._walkPath[i].y = AstarUtil.getHeightByPos(this._walkPath[i]);
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
                if (this.curentAction == CharAction.WALK) {
                    this.play(CharAction.STANAD);
                }
                var $k = AstarUtil.getWorldPosByStart2D($item[0]);
                this.px = $k.x;
                this.pz = $k.z;
                return;
            }
        }
        this.walkPath = AstarUtil.Path2dTo3d($item);
    };
    SceneChar.prototype.applyJump = function ($arr, $t) {
        if (this.unit.isMain) {
            JumpModel.jumpNow = true;
        }
        this.jumpNeedTime = $t;
        this.jumpEndTime = TimeUtil.getTimer() + this.jumpNeedTime;
        this.jumpItem = $arr;
        this.stopMove();
        this.play(CharAction.JUMP);
    };
    SceneChar.prototype.refreshJump = function () {
        if (this.jumpItem) {
            var th75 = this.unit.isMain ? 75 : 40;
            var $nTime = this.jumpEndTime - TimeUtil.getTimer(); //1.5
            var $d = this.jumpItem.length - 1; //段数   3
            var $lenT = this.jumpNeedTime / $d; //每一个周期的时间    //1秒
            var $k = Math.floor($nTime / $lenT); //剩余段数  //   1
            var $e = $d - $k; //当前进行到的段数
            $e = Math.max($e, 1);
            var jumpStat = this.jumpItem[$e - 1];
            var jumpTo = this.jumpItem[$e];
            if (this.lastJumpDan != $e) {
                this.lastJumpDan = $e;
                this._actionTime = 0;
                if (jumpTo) {
                    var faceTo = new Display3D();
                    faceTo.x = jumpTo.x;
                    faceTo.y = jumpTo.y;
                    faceTo.z = jumpTo.z;
                    this.watch(faceTo);
                }
            }
            if ($nTime < 0) {
                this.px = this.jumpItem[$d].x;
                this.py = this.jumpItem[$d].y;
                this.pz = this.jumpItem[$d].z;
                this.jumpItem = null;
                this.stopMove();
                if (this.jumpEndFun) {
                    this.jumpEndFun();
                }
            }
            else {
                var kscale = 1 - (($nTime % $lenT) / $lenT);
                var addpos = jumpTo.subtract(jumpStat);
                addpos.scaleBy(kscale);
                var nextPos = jumpStat.add(addpos);
                this.px = nextPos.x;
                this.pz = nextPos.z;
                var baseY = jumpStat.y + (jumpTo.y - jumpStat.y) * (kscale);
                this.py = baseY + Math.sin(kscale * Math.PI) * th75;
                this.refreshPos();
                if (this._shadow) {
                    this._shadow.y = baseY;
                }
            }
        }
    };
    Object.defineProperty(SceneChar.prototype, "moveToPos2D", {
        set: function ($v2d) {
            // $v2d=new Vector2D(154,87)
            this._walkPath = null;
            this.play(this._defaultAction);
            var pos = AstarUtil.getWorldPosByStart2D($v2d);
            this.px = pos.x;
            this.pz = pos.z;
            this.refreshY();
        },
        enumerable: true,
        configurable: true
    });
    SceneChar.prototype.stopToPos = function ($v2d) {
        var pos = AstarUtil.getWorldPosByStart2D($v2d);
        var arr = new Array;
        arr.push(pos);
        this.walkPath = arr;
    };
    SceneChar.prototype.moveTile = function (xt, yt) {
        this.moveToPos2D = new Vector2D(xt, yt);
    };
    SceneChar.prototype.updateFrame = function (t) {
        _super.prototype.updateFrame.call(this, t);
        if (this.jumpItem) {
            this.refreshJump();
        }
        else if (this._walkPath) {
            if (this.curentAction != CharAction.WALK) {
                this.play(CharAction.WALK);
            }
            this.walkAstar(t);
            this.refreshY();
        }
        if (this._rotationMatrix) {
            this.rotationToNew(this.toRotationY, 2);
        }
    };
    SceneChar.prototype.refreshY = function () {
        this.py = AstarUtil.getHeightByPos(this.getCurrentPos());
        this.refreshPos();
    };
    SceneChar.prototype.refreshHP = function () {
        this.refreshLifeNum();
    };
    SceneChar.prototype.refreshUnitFieldByte = function () {
        //DEATH_STATE_ALIVE = 0,		//活着
        //DEATH_STATE_CORPSE = 1,		//尸体，在客户端可见尸体
        //DEATH_STATE_DEAD = 2,		//死亡，在客户端尸体消失
        var $staticNum = this.unit.getAlivestate();
        if ($staticNum == SharedDef.DEATH_STATE_ALIVE) {
            this.play(CharAction.STANAD, 2);
            this.visible = true;
            //this.setHp(this.unit.getMaxHp())
            //      //console.log(this.unit.getHp())
            //       //console.log("复活DEATH_STATE_ALIVE ", this.unit.getGuid(), this.unit.getName());
        }
        else if ($staticNum == SharedDef.DEATH_STATE_CORPSE) {
            this.play(CharAction.DEATH, 1);
            this.visible = true;
            //    //console.log("死亡!!!!!!!DEATH_STATE_CORPSE ", this.unit.getGuid(), this.unit.getName());
        }
        else if ($staticNum == SharedDef.DEATH_STATE_DEAD) {
            this.visible = false;
            //     //console.log("消失@@@@@@@@@@@@@ DEATH_STATE_DEAD ", this.unit.getGuid(), this.unit.getName());
        }
        this.refreshLifeNum();
        this.refreshPos();
    };
    SceneChar.prototype.unitFieldByteChg = function () {
        var $staticNum = this.unit.getAlivestate();
        if ($staticNum == SharedDef.DEATH_STATE_ALIVE) {
            this.play(CharAction.STANAD, 2);
            this.visible = true;
            this.destoryName();
            this.showName();
            this.showBlood(this.lastBloodcolorType);
        }
        else if ($staticNum == SharedDef.DEATH_STATE_CORPSE) {
            //this.play(CharAction.DEATH, 1)
            this.visible = true;
        }
        else if ($staticNum == SharedDef.DEATH_STATE_DEAD) {
            this.visible = false;
        }
        this.refreshLifeNum();
        this.refreshPos();
    };
    SceneChar.prototype.setHp = function (val) {
        var curHp = this.unit.getHp();
        this.unit.setHp(val);
        if (this.unit.isMain) {
            ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_LEFT_BLOOD));
        }
        return val - curHp;
    };
    //血量数据已改，这只是刷新血条，用于延时显示
    SceneChar.prototype.refreshLifeNum = function () {
        if (this.unit.isMain) {
            //console.log("血量", this.unit.getHp(), this.unit.getMaxHp());
        }
        this.life = this.unit.getHp() / this.unit.getMaxHp() * 100;
        if (this._charBloodVo) {
            this._charBloodVo.num = this.life;
            //if (this.unit.isMain && GameInstance.mainUi) {
            //    GameInstance.mainUi.topLeftPanel.changeBloodData()
            //}
        }
        if (this._isBoss) {
            var num = this.life / 100;
            var evt = new boss.BossEvent(boss.BossEvent.BOSS_HP_CHANGE_EVENT);
            evt.data = { num: num, id: this.unit.getEntry() };
            ModuleEventManager.dispatchEvent(evt);
        }
    };
    SceneChar.prototype.refreshOwner = function () {
        var evt = new boss.BossEvent(boss.BossEvent.BOSS_OWNER_CHANGE_EVENT);
        //evt.data = { num: num, id: this.unit.getEntry()};
        ModuleEventManager.dispatchEvent(evt);
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
        this.speedUseTime = this.unit.getSpeed();
    };
    SceneChar.prototype.walkAstar = function (t) {
        if (this.unit && this.unit.isMain) {
        }
        var $wk = Math.min(t, 50);
        var distance = Vector3D.distance(new Vector3D(this.px, 0, this.pz), this._astatTopos);
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
            if (!this._walkPath) {
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
            this.play(CharAction.STANAD);
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
            if (Vector3D.distance(this.getCurrentPos(), this._astatTopos) > 10) {
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
        if (this.curentAction == CharAction.STANAD || this.curentAction == CharAction.STAND_MOUNT) {
            this.play(CharAction.WALK);
        }
        this._walkPath = null;
    };
    SceneChar.prototype.stopMove = function () {
        this._speedDirect = null;
        this._walkPath = null;
        this.play(CharAction.STANAD);
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
        return new Vector3D(this.px, this.py, this.pz);
    };
    SceneChar.prototype.getAstarPos = function () {
        return AstarUtil.getGrapIndexByPos(this.getCurrentPos());
    };
    SceneChar.prototype.changeAction = function ($action) {
        if (this.unit.isMain) {
            switch ($action) {
                case CharAction.ATTACK_01:
                    this.play(CharAction.ATTACK_010, 2);
                    break;
                case CharAction.ATTACK_02:
                    this.play(CharAction.ATTACK_020, 2);
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
        SkillManager.getInstance().playSkill($skill);
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
            //console.log("---隐藏111--");
            ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.HIDE_BOSSHP_EVENT));
            if (GuidData.map && GuidData.map.tbMapVo && GuidData.map.isFamilyScene()) {
                ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.HIDE_OFTENRANK_PANEL));
            }
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
        if (this._factionNameVo) {
            this._factionNameVo.destory();
            this._factionNameVo = null;
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
            SceneManager.getInstance().removeMovieDisplay(this.mountChar);
        }
        if (this._wingDisplay) {
            SceneManager.getInstance().removeMovieDisplay(this._wingDisplay);
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
            SceneManager.getInstance().addMovieDisplay(this.mountChar);
        }
        if (this._wingDisplay) {
            SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        }
    };
    SceneChar.prototype.math_distance = function ($other) {
        return MathClass.math_distance(this.px, this.pz, $other.x, $other.z);
    };
    Object.defineProperty(SceneChar.prototype, "visible", {
        get: function () {
            if (this.unit && this.unit.isInvishibel() && !this.unit.isMain) {
                return false;
            }
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
                ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
                this.lineSprite = new LineDisplaySprite();
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
        var $pos = Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos());
        if ($pos.z < Scene_data.cam3D.distance / 3) {
            return null;
        }
        var hitVec2 = MathUtil.math3DWorldtoDisplay2DPos($lineB);
        if (this._skinMesh) {
            if (!this.hitBox2DItem) {
                this.hitBox2DItem = new Array;
            }
            this.hitBox2DItem.length = 0;
            for (var j = 0; j < this._skinMesh.hitPosItem.length; j++) {
                var temppp = this.posMatrix.transformVector(this._skinMesh.hitPosItem[j]);
                this.hitBox2DItem.push(MathUtil.math3DWorldtoDisplay2DPos(temppp));
            }
            for (var i = 0; i < this.triIndex.length / 3; i++) {
                TestTriangle.baseTri.p1 = this.hitBox2DItem[this.triIndex[i * 3 + 0]];
                TestTriangle.baseTri.p2 = this.hitBox2DItem[this.triIndex[i * 3 + 1]];
                TestTriangle.baseTri.p3 = this.hitBox2DItem[this.triIndex[i * 3 + 2]];
                if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
                    return true;
                }
            }
        }
        else {
            if (Vector2D.distance(hitVec2, MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position)) < 20) {
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
}(SceneBaseChar));
//# sourceMappingURL=SceneChar.js.map