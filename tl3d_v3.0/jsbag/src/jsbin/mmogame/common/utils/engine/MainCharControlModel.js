var MainCharControlModel = /** @class */ (function () {
    function MainCharControlModel() {
        this.singingToPos = new Vector2D;
        this.lastOutStr = "";
    }
    MainCharControlModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new MainCharControlModel();
        }
        return this._instance;
    };
    MainCharControlModel.prototype.movoToMapAndpos = function ($mapid, $v2d, $autoplay) {
        if ($autoplay === void 0) { $autoplay = false; }
        var $moveV2d;
        if ($mapid == GuidData.map.getMapID()) {
            $moveV2d = $v2d;
        }
        else {
            GameInstance.questMoveVo = new QuestMoveVo();
            GameInstance.questMoveVo.pos = $v2d;
            GameInstance.questMoveVo.autoplay = $autoplay;
            $moveV2d = GuidData.map.tbMapVo.getTeleportmap($mapid);
        }
        if ($moveV2d) {
            MainCharControlModel.getInstance().setWalkPathFun(AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), $moveV2d), function () {
                GameMouseManager.getInstance().walkPathComplete();
                if ($autoplay) {
                    AotuSkillManager.getInstance().aotuBattle = true;
                }
            });
        }
        else {
            // bottomui.Progress_line.getInstance().show(1000, () => {
            //     NetManager.getInstance().protocolos.teleport_map($mapid, GuidData.map.getLineID());
            // });
            NetManager.getInstance().protocolos.teleport_map($mapid, GuidData.map.getLineID());
        }
    };
    MainCharControlModel.prototype.update = function (t) {
        var $mainChar = GameInstance.mainChar;
        if ($mainChar.jumpItem) {
        }
        else if ($mainChar._speedDirect) {
            if ($mainChar.curentAction == CharAction.WALK || $mainChar.curentAction == CharAction.WALK_MOUNT || $mainChar.isSinging) {
                this.walkDirect(t);
            }
            $mainChar.refreshY();
        }
    };
    MainCharControlModel.prototype.ride_mount = function (value) {
        var $mainChar = GameInstance.mainChar;
        console.log(value == 1, $mainChar.isSinging);
        if (value == 1 && $mainChar.isSinging) {
        }
        else {
            NetManager.getInstance().protocolos.ride_mount(value);
        }
    };
    MainCharControlModel.prototype.frameUpData = function () {
        var $mainChar = GameInstance.mainChar;
        if ($mainChar.isDeath) {
            return true;
        }
        if (GameInstance.useYaoGan) {
            return true;
        }
        if (!AotuSkillManager.getInstance().aotuBattle) {
            if (GameInstance.attackTarget) {
                if (GameInstance.attackTarget.unit.isPlayer()) {
                    return true;
                }
                if (!GameInstance.attackTarget.onStage) {
                    GameInstance.attackTarget = null;
                }
            }
            else {
                return true;
            }
        }
        else {
            if ($mainChar.isSinging && GameInstance.mainChar.skillVo && tb.TB_skill_base.get_TB_skill_base(GameInstance.mainChar.skillVo.tbSkillId).can_move == 1) {
                if (GameInstance.attackTarget) {
                    if (!GameInstance.attackTarget.onStage) {
                        GameInstance.attackTarget = null;
                    }
                }
                else {
                    //console.log("没有对像")
                    //  AotuSkillManager.getInstance().findNearAttackTaget()
                    GameInstance.attackTarget = RelationManager.getInstance().findNearCanAttackScene();
                }
                if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
                    var $to2D = GameInstance.attackTarget.getAstarPos();
                    $to2D = this.getV2dToV2dDis($to2D, $mainChar.getAstarPos(), 6);
                    if (Vector2D.distance($to2D, this.singingToPos) >= 1) {
                        this.singingToPos = $to2D;
                        console.log("移动条件");
                        var item = AstarUtil.findPath2D($mainChar.getAstarPos(), $to2D);
                        if (item && item.length) {
                            MainCharControlModel.getInstance().setWalkPathFun(item);
                        }
                    }
                }
                return true;
            }
        }
        return false;
    };
    MainCharControlModel.prototype.getV2dToV2dDis = function (a, b, c) {
        if (Vector2D.distance(a, b) > c) {
            ;
            var u = new Vector2D(b.x - a.x, b.y - a.y);
            var temp = Math.sqrt(u.x * u.x + u.y * u.y);
            u.x = u.x / temp;
            u.y = u.y / temp;
            u.x = u.x * c;
            u.y = u.y * c;
            a.x += Math.floor(u.x);
            a.y += Math.floor(u.y);
            return a;
        }
        return b;
    };
    MainCharControlModel.prototype.setSpeedDirect = function (value) {
        var mainChar = GameInstance.mainChar;
        if (!mainChar.isDeath) {
            mainChar.setSpeedDirect(value);
        }
    };
    MainCharControlModel.prototype.sendStop = function () {
        var $mainChar = GameInstance.mainChar;
        $mainChar.stopMove();
        if ($mainChar.unit) {
            var $arr = [$mainChar.getAstarPos(), $mainChar.getAstarPos()];
            // console.log($arr)
            $mainChar.unit.sendPath($arr);
        }
    };
    MainCharControlModel.prototype.sendPath = function ($ary) {
        var mainChar = GameInstance.mainChar;
        if (mainChar.unit && $ary) {
            mainChar.unit.sendPath($ary);
            // //console.log("发送移动线路--------------",TimeUtil.getTimer())
        }
    };
    MainCharControlModel.prototype.setWalkPathFun = function ($item, $bfun) {
        if ($bfun === void 0) { $bfun = null; }
        if (SceneManager.getInstance().ready) {
            var mainChar = GameInstance.mainChar;
            this.sendPath($item);
            $item.shift();
            mainChar.applyWalk($item);
            mainChar.walkCompleteBackFun = $bfun;
        }
    };
    MainCharControlModel.prototype.clikEat = function () {
        var $cdTime = tb.SkillData.getCdMeshBySkillId(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD);
        if (isNaN($cdTime) || ($cdTime - TimeUtil.getTimer()) < 0) {
            var $leveCdtb = tb.TB_restore_potion_base.get_TB_restore_potion_base(GuidData.player.getLevel()).cd;
            tb.SkillData.setCdMeshData(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD, $leveCdtb * 1000);
            NetManager.getInstance().protocolos.use_restore_potion();
            //  //console.log("发送吃药")
        }
        else {
            //  //console.log("clikEatCd中")
        }
    };
    MainCharControlModel.prototype.downMount = function () {
        var mainChar = GameInstance.mainChar;
        if (mainChar.isMount) {
            mainChar.unit.setDownMount(); //修改下坐骑的U数据
            mainChar.setMount(); //刷新
        }
    };
    MainCharControlModel.prototype.isWalkOrStand = function () {
        var mainChar = GameInstance.mainChar;
        var $buff = mainChar.unit.buffUnit;
        for (var $keystr in $buff.item) {
            if (Number($keystr) == 152) {
                //console.log("有吟唱buff时可移动");
                return true;
            }
        }
        if (mainChar.isMount) {
            return true;
        }
        var $action = mainChar.getCurrentAction();
        if ($action == CharAction.WALK || $action == CharAction.STANAD) {
            return true;
        }
        else {
            return false;
        }
    };
    MainCharControlModel.prototype.isWalk = function () {
        var mainChar = GameInstance.mainChar;
        var $action = mainChar.getCurrentAction();
        if ($action == CharAction.WALK || $action == CharAction.WALK_MOUNT || mainChar.isSinging) {
            return true;
        }
        else {
            return false;
        }
    };
    MainCharControlModel.prototype.walkDirect = function (t) {
        t = Math.min(Math.max((1000 / 60), t), 30); //特殊限制摇杆移动
        var $mainChar = GameInstance.mainChar;
        if (this.nextAstartNoCanWalk) {
            var $nextPos = this.getNearFiledRoad();
            if ($nextPos) {
                this.walkToNearPosBy2D($nextPos, t);
            }
            return;
        }
        var sn = t * $mainChar.speedTX;
        var nextPos = new Vector3D();
        var tx = $mainChar._speedDirect.x * sn;
        var ty = $mainChar._speedDirect.z * sn;
        $mainChar.toRotationY = -Math.atan2(ty, tx) * 180 / Math.PI + 90;
        nextPos.x = $mainChar.px + tx;
        nextPos.z = $mainChar.pz + ty;
        if (AstarUtil.getPosIsCanMove(nextPos)) {
            $mainChar.px = nextPos.x;
            $mainChar.pz = nextPos.z;
        }
        if (bottomui.Progress_line.getInstance()) {
            bottomui.Progress_line.getInstance().hide();
        }
    };
    MainCharControlModel.prototype.walkToNearPosBy2D = function ($v2d, t) {
        var $mainChar = GameInstance.mainChar;
        var sn = t * $mainChar.speedTX;
        var a = $mainChar.getCurrentPos();
        var b = AstarUtil.getWorldPosByStart2D($v2d);
        var nrm = b.subtract(a);
        nrm.y = 0;
        nrm.normalize();
        nrm.scaleBy(sn);
        var $anglynum = 0;
        var $nextPos = new Vector3D($mainChar.px, $mainChar.py, $mainChar.pz);
        var $m = new Matrix3D;
        var $testPosV3D;
        while ($anglynum < 60) {
            $m.identity();
            $m.appendRotation(0 + $anglynum, Vector3D.Y_AXIS);
            $testPosV3D = $m.transformVector(nrm);
            $testPosV3D.x = $mainChar.px + $testPosV3D.x;
            $testPosV3D.z = $mainChar.pz + $testPosV3D.z;
            if (AstarUtil.getPosIsCanMove($testPosV3D)) {
                $nextPos = $testPosV3D;
                break;
            }
            else {
                $m.identity();
                $m.appendRotation(0 - $anglynum, Vector3D.Y_AXIS);
                $testPosV3D = $m.transformVector(nrm);
                $testPosV3D.x = $mainChar.px + $testPosV3D.x;
                $testPosV3D.z = $mainChar.pz + $testPosV3D.z;
                if (AstarUtil.getPosIsCanMove($testPosV3D)) {
                    $nextPos = $testPosV3D;
                    break;
                }
            }
            $anglynum++;
        }
        if (AstarUtil.getPosIsCanMove($nextPos)) {
            $mainChar.px = $nextPos.x;
            $mainChar.pz = $nextPos.z;
        }
        else {
            // //console.log("不在可行走格子里", $nextPos)
        }
    };
    MainCharControlModel.prototype.getNearFiledRoad = function () {
        var $mainChar = GameInstance.mainChar;
        var a = $mainChar.getAstarPos();
        if (!a) {
            return null;
        }
        var $tx = a.x;
        var $ty = a.y;
        var $anglyItem = new Array;
        var $item = new Array;
        $item.push(new Vector2D($tx - 1, $ty - 1));
        $item.push(new Vector2D($tx, $ty - 1));
        $item.push(new Vector2D($tx + 1, $ty - 1));
        $item.push(new Vector2D($tx - 1, $ty));
        $item.push(new Vector2D($tx, $ty));
        $item.push(new Vector2D($tx + 1, $ty));
        $item.push(new Vector2D($tx - 1, $ty + 1));
        $item.push(new Vector2D($tx, $ty + 1));
        $item.push(new Vector2D($tx + 1, $ty + 1));
        $anglyItem.push($item[5]);
        $anglyItem.push($item[8]);
        $anglyItem.push($item[7]);
        $anglyItem.push($item[6]);
        $anglyItem.push($item[3]);
        $anglyItem.push($item[0]);
        $anglyItem.push($item[1]);
        $anglyItem.push($item[2]);
        var $outStr = "";
        for (var i = 0; i < $item.length; i++) {
            if (AstarUtil.isGridCanWalk($item[i])) {
                $outStr += "1,";
            }
            else {
                $outStr += "0,";
            }
            if (i % 3 == 2) {
                $outStr += "\n";
            }
        }
        var $needOutput = this.lastOutStr.length != $outStr.length;
        for (var k = 0; k < this.lastOutStr.length; k++) {
            if (this.lastOutStr[k] != $outStr[k]) {
                $needOutput = true;
            }
        }
        if ($needOutput) {
            //    //console.log($outStr)
            //    //console.log("-----------------------------", TimeUtil.getTimer());
        }
        //var rrr: number = -Math.atan2(this._speedDirect.z, this._speedDirect.x) * 180 / Math.PI + 90;
        ////console.log(Math.floor((rrr % 360 + 360) % 360));
        var rrr = -Math.atan2($mainChar._speedDirect.z, $mainChar._speedDirect.x) * 180 / Math.PI;
        rrr = (rrr % 360 + 360) % 360;
        var disR = 360 / 8;
        var $id = Math.floor((rrr + disR / 2) / disR);
        // //console.log(Math.floor(rrr), $id)
        var $turnNum = 1;
        while ($turnNum < 3) {
            var aleft = ($id + $turnNum + 8) % 8;
            var aright = ($id - $turnNum + 8) % 8;
            var leftPos = $anglyItem[aleft];
            var rightPos = $anglyItem[aright];
            if (!AstarUtil.isGridCanWalk(leftPos) && !AstarUtil.isGridCanWalk(rightPos)) {
                $turnNum++;
            }
            else {
                if (AstarUtil.isGridCanWalk(leftPos) && AstarUtil.isGridCanWalk(rightPos)) {
                    ////console.log("两边都可选")
                }
                else {
                    if (AstarUtil.isGridCanWalk(leftPos)) {
                        // //console.log(aleft, "左");
                        return leftPos;
                    }
                    else if (AstarUtil.isGridCanWalk(rightPos)) {
                        //  //console.log(aright, "右");
                        return rightPos;
                    }
                }
                $turnNum = 3;
                break;
            }
        }
        this.lastOutStr = $outStr;
        return null;
    };
    Object.defineProperty(MainCharControlModel.prototype, "nextAstartNoCanWalk", {
        //指定方向下一个不可走
        get: function () {
            var $mainChar = GameInstance.mainChar;
            var tx = $mainChar._speedDirect.x * 5;
            var ty = $mainChar._speedDirect.z * 5;
            var nextPos = new Vector3D();
            nextPos.x = $mainChar.px + tx;
            nextPos.z = $mainChar.pz + ty;
            if (AstarUtil.getPosIsCanMove(nextPos)) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    return MainCharControlModel;
}());
//# sourceMappingURL=MainCharControlModel.js.map