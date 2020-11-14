var GameMouseManager = /** @class */ (function () {
    function GameMouseManager() {
        this.ready = false;
        this.resetPos = new Vector2D(150, 400);
        this.bindPos = new Vector2D();
        this.useMouseEvent = true;
        this.lastMouseEvetTime = 0;
        this.nextSendTime = 0;
        this.skipNum = 0;
        this.isFristTouchMove = true;
        this.yaoganIdentifier = -1;
        //寻路结束后回调用是否有传送点
        this.collectionType = 0;
    }
    GameMouseManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameMouseManager();
        }
        return this._instance;
    };
    GameMouseManager.prototype.setBtn = function ($a, $b) {
        this.b_yaogan_bar = $a;
        this.b_yaogan_bg = $b;
        this.ready = true;
    };
    GameMouseManager.prototype.addMouseEvent = function () {
        var _this = this;
        if (Scene_data.isPc) {
            document.addEventListener(MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
        }
        else {
            document.addEventListener(MouseType.TouchMove, function ($evt) { _this.onTouchMove($evt); });
            document.addEventListener(MouseType.TouchEnd, function ($evt) { _this.onTouchEnd($evt); });
            document.addEventListener(MouseType.TouchStart, function ($evt) { _this.onTouchStart($evt); });
        }
        this.bindPos.x = this.resetPos.x;
        this.bindPos.y = this.resetPos.y;
        this.updataFun = function (t) { _this.updata(t); };
    };
    GameMouseManager.prototype.onMouseWheel = function ($evt) {
        AstarUtil.sceneVectList = null;
        Scene_data.gameAngle += $evt.wheelDelta / 100;
    };
    GameMouseManager.prototype.isCanUseMouseEvent = function () {
        return this.useMouseEvent;
    };
    GameMouseManager.prototype.onMouse = function ($e) {
        if (!this.isCanUseMouseEvent()) {
            return;
        }
        var evt;
        var point = new Vector2D();
        if ($e instanceof MouseEvent) {
            if ($e.type == MouseType.MouseDown) {
                evt = new InteractiveEvent(InteractiveEvent.Down);
            }
            else if ($e.type == MouseType.MouseUp) {
                evt = new InteractiveEvent(InteractiveEvent.Up);
            }
            else if ($e.type == MouseType.MouseMove) {
                evt = new InteractiveEvent(InteractiveEvent.Move);
            }
            else if ($e.type == MouseType.MouseClick) {
            }
            point.x = $e.pageX;
            point.y = $e.pageY;
        }
        this.makeMouseEvent(evt, point);
    };
    GameMouseManager.prototype.makeMouseEvent = function (evt, point) {
        this.lastMouseEvetTime = TimeUtil.getTimer();
        var temp = UIManager.getInstance().mouseEvetData(evt, point);
        if (evt.type == InteractiveEvent.Move) {
            return;
        }
        if (GuidData.map && GuidData.map.is1V1()) {
            if (this.lastMouseEvetTime < TimeUtil.getTimer()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                this.lastMouseEvetTime = TimeUtil.getTimer() + 3000;
            }
            return;
        }
        if (evt.type == InteractiveEvent.Up && this.canTestClikGroundMove && !temp) {
            if (this.isSkillAer(point)) {
                AotuSkillManager.getInstance().aotuBattle = false;
                AotuSkillManager.getInstance().aotuWalk = false;
                AotuSkillManager.getInstance().timeoutAuto();
                this.canTestClikGroundMove.x = point.x;
                this.canTestClikGroundMove.y = point.y;
                this.onSceneMouseDown(this.canTestClikGroundMove);
                //evt.x = point.x;
                //evt.y = point.y;
                //this.onSceneMouseDown(evt);
                this.canTestClikGroundMove = null;
            }
        }
        if (!temp && evt.type == InteractiveEvent.Down) {
            evt.x = point.x;
            evt.y = point.y;
            this.canTestClikGroundMove = evt;
        }
        else {
            this.canTestClikGroundMove = null;
        }
    };
    GameMouseManager.prototype.isSkillAer = function (point) {
        var $basePos;
        if (document.body.clientWidth > document.body.clientHeight) {
            $basePos = new Vector2D(document.body.clientWidth, document.body.clientHeight);
        }
        else {
            $basePos = new Vector2D(0, document.body.clientHeight);
        }
        //    //console.log("====",Vector2D.distance($basePos, point) ,(250 * UIData.Scale))
        return Vector2D.distance($basePos, point) > (250 * UIData.Scale);
    };
    GameMouseManager.prototype.mouseToEvent = function ($touchEvent) {
        var evt;
        var point = new Vector2D();
        if ($touchEvent.type == MouseType.TouchStart) {
            evt = new InteractiveEvent(InteractiveEvent.Down);
        }
        else if ($touchEvent.type == MouseType.TouchEnd) {
            evt = new InteractiveEvent(InteractiveEvent.Up);
            point.x = $touchEvent.changedTouches[0].pageX;
            point.y = $touchEvent.changedTouches[0].pageY;
        }
        else if ($touchEvent.type == MouseType.TouchMove) {
            evt = new InteractiveEvent(InteractiveEvent.Move);
        }
        if ($touchEvent.touches.length) {
            point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
            point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
        }
        this.makeMouseEvent(evt, point);
        return evt;
    };
    GameMouseManager.prototype.cantClikGround = function ($mousePos) {
        if (GameInstance.useYaoGan) {
            return false;
        }
        if (!GameInstance.mainChar) {
            return false;
        }
        if (!SceneManager.getInstance().render) {
            return false;
        }
        if (GameInstance.mainChar.isDeath) {
            return false;
        }
        if (GuidData.map.is1V1()) {
            if (this.lastMouseEvetTime < TimeUtil.getTimer()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                this.lastMouseEvetTime = TimeUtil.getTimer() + 3000;
            }
            return false;
        }
        var kpos = new Vector2D($mousePos.x / UIData.Scale, $mousePos.y / UIData.Scale);
        var dis = Vector2D.distance($mousePos, this.bindPos);
        // //console.log($mousePos, this.bindPos, dis)
        return true;
    };
    //判断是否在左右下角区域，将不给于寻路
    GameMouseManager.prototype.inYaoganButRound = function ($evt, $disNum) {
        if ($disNum === void 0) { $disNum = 100; }
        if (Scene_data.isPc && !this.ready && !SceneManager.getInstance().ready) {
            return false;
        }
        var $mousePos = new Vector2D;
        if (!Scene_data.verticalScene) {
            $mousePos.x = $evt.x / UIData.Scale;
            $mousePos.y = $evt.y / UIData.Scale;
        }
        else {
            $mousePos.x = $evt.y / UIData.Scale;
            $mousePos.y = (Scene_data.stageHeight - $evt.x) / UIData.Scale;
        }
        $mousePos.x = $evt.x / UIData.Scale; //重置
        $mousePos.y = $evt.y / UIData.Scale; //重置 
        //var kk: UIConatiner = this.b_yaogan_bg.parent
        //var $txy: Vector2D = new Vector2D()
        //$txy.x = $mousePos.x - this.b_yaogan_bar.width / 2;
        //$txy.y = $mousePos.y - this.b_yaogan_bar.height / 2 - kk.y;
        var disA = Vector2D.distance($mousePos, new Vector2D(0, Scene_data.stageHeight / UIData.Scale));
        //    var disB: number = Vector2D.distance($mousePos, new Vector2D(960, Scene_data.stageHeight / UIData.Scale)) //右下角技能区域
        if (disA < 300) {
            return true;
        }
        else {
            return false;
        }
    };
    GameMouseManager.prototype.onSceneMouseDown = function ($evt) {
        if (this.ready && this.inYaoganButRound($evt)) {
            return;
        }
        var $mousePos = new Vector2D;
        if (!Scene_data.verticalScene) {
            $mousePos.x = $evt.x;
            $mousePos.y = $evt.y;
        }
        else {
            $mousePos.x = $evt.y;
            $mousePos.y = Scene_data.stageHeight - $evt.x;
        }
        // //console.log("---diban",this.cantClikGround($mousePos), GuidData.player);
        if (this.cantClikGround($mousePos) && GuidData.player) {
            if (GameInstance.questMoveVo) {
                GameInstance.questMoveVo = null;
            }
            var $fieldNotoriety = GuidData.player.getUnitFieldNotoriety(); //战斗模式
            var $selectChar = this.findHitChat(new Vector2D($evt.x, $evt.y));
            if ($selectChar && !$selectChar.isDeath) {
                var $toDis = Vector2D.distance($selectChar.getAstarPos(), GameInstance.mainChar.getAstarPos());
                console.log("距离", $toDis);
                if ($toDis > 5) {
                    console.log("需要走过去");
                    this.walkNeeDToClik($selectChar, $mousePos);
                }
                else {
                    this.clikSceneChar($selectChar, $mousePos);
                }
            }
            else {
                if (GameInstance.attackTarget) {
                    if (GameInstance.attackTarget.unit.isPlayer()) {
                    }
                    else {
                        GameInstance.attackTarget = null;
                    }
                }
                if (!AotuSkillManager.getInstance().aotuBattle) {
                    this.lastMousePos = $mousePos;
                    if (GameInstance.mainChar.isSinging) {
                        if (GameInstance.mainChar.skillVo.tbSkillId) {
                            if (tb.TB_skill_base.get_TB_skill_base(GameInstance.mainChar.skillVo.tbSkillId).can_move == 0) {
                                GameInstance.mainChar.msgSpellStop();
                            }
                        }
                    }
                    this.findMoveTo();
                    //  //console.log("地面寻路")
                }
            }
        }
    };
    GameMouseManager.prototype.walkNeeDToClik = function ($selectChar, $mousePos) {
        var _this = this;
        var $nrm = GameInstance.mainChar.getCurrentPos().subtract($selectChar.getCurrentPos());
        $nrm.normalize();
        $nrm.scaleBy(30);
        var item = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $selectChar.getCurrentPos().add($nrm));
        if (item) {
            MainCharControlModel.getInstance().setWalkPathFun(item, function () {
                _this.clikSceneChar($selectChar, $mousePos);
            });
        }
    };
    GameMouseManager.prototype.clikSceneChar = function ($selectChar, $mousePos) {
        if ($selectChar && !$selectChar.isDeath) {
            if ($selectChar.unit.isPlayer()) {
                if (RelationManager.getInstance().inAttackItemByChar($selectChar)) {
                    GameInstance.attackTarget = $selectChar;
                    //console.log("选人为攻击对象");
                }
                else {
                    //console.log("不在攻击队列中");
                }
            }
            if ($selectChar.unit.isMonster()) {
                GameInstance.attackTarget = $selectChar;
            }
            if ($selectChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT) {
                if ($selectChar instanceof ScenePortal) {
                    var $xcenePortal = $selectChar;
                    if ($xcenePortal.tb.judge == 0) {
                        if (GuidData.map.isFactionFuben()) {
                            if ($selectChar.unit.getEntry() == 101 && GuidData.map.getMyFactionFlag() == 1) {
                                return;
                            }
                            if ($selectChar.unit.getEntry() == 102 && GuidData.map.getMyFactionFlag() == 2) {
                                return;
                            }
                        }
                        quest.QuestModel.getInstance().use_gameobject($selectChar);
                        //console.log("采集对象")
                    }
                    else {
                        this.lastMousePos = $mousePos;
                        this.findMoveTo();
                    }
                }
            }
            if ($selectChar.unit.isNpc()) {
                this.talk_with_npc($selectChar.unit.getEntry());
            }
        }
    };
    GameMouseManager.prototype.talk_with_npc = function ($entryId) {
        var $k = new dialog.DialogueEvent(dialog.DialogueEvent.SHOW_DIALOGUE_PANEL);
        $k.entryId = $entryId;
        ModuleEventManager.dispatchEvent($k); //
    };
    GameMouseManager.prototype.findMoveTo = function () {
        var _this = this;
        if (this.lastMousePos) {
            var bsc = GameInstance.mainChar;
            if (MainCharControlModel.getInstance().isWalkOrStand()) {
                this.sendWalkToPos(this.lastMousePos);
                this.lastMousePos = null;
            }
            else {
                TimeUtil.addTimeOut(100, function () {
                    _this.findMoveTo();
                });
            }
            if (bottomui.Progress_line.getInstance()) {
                bottomui.Progress_line.getInstance().hide();
            }
        }
    };
    GameMouseManager.prototype.findHitChat = function ($evt) {
        var $pos = new Vector2D;
        if (!Scene_data.verticalScene) {
            $pos.x = $evt.x;
            $pos.y = $evt.y;
        }
        else {
            $pos.x = $evt.y;
            $pos.y = Scene_data.stageHeight - $evt.x;
        }
        var $hitPos = AstarUtil.getScenePos($pos.x, $pos.y);
        if ($hitPos) {
            var $camVec = new Vector3D;
            $camVec.x = Scene_data.cam3D.x;
            $camVec.y = Scene_data.cam3D.y;
            $camVec.z = Scene_data.cam3D.z;
            var $slect;
            $slect = this.mouseClikScenePortal($camVec, $hitPos);
            if ($slect) {
                return $slect;
            }
            else {
                return this.mouseClikSceneChar($camVec, $hitPos);
            }
        }
        return null;
    };
    //点角色
    GameMouseManager.prototype.mouseClikSceneChar = function ($camVec, $hitPos) {
        for (var i = 0; i < GameInstance.roleList.length; i++) {
            if (!(GameInstance.roleList[i] instanceof ScenePortal || GameInstance.roleList[i] instanceof SceneLoot)) {
                var $sceneChar = GameInstance.roleList[i];
                var flag = $sceneChar.unit.isMain;
                if ($sceneChar.mouseClik($camVec, $hitPos) && !flag && $sceneChar.visible) {
                    return $sceneChar;
                }
            }
        }
        return null;
    };
    //采集物品
    GameMouseManager.prototype.mouseClikScenePortal = function ($camVec, $hitPos) {
        for (var i = 0; i < GameInstance.roleList.length; i++) {
            if (GameInstance.roleList[i] instanceof ScenePortal) {
                var $sceneChar = GameInstance.roleList[i];
                if ($sceneChar.mouseClik($camVec, $hitPos) && $sceneChar.visible) {
                    return $sceneChar;
                }
            }
        }
        return null;
    };
    GameMouseManager.prototype.sendWalkToPos = function ($pos) {
        var $hitPos = AstarUtil.getScenePos($pos.x, $pos.y);
        if ($hitPos) {
            var $v2d = AstarUtil.getGrapIndexByPos($hitPos);
            if ($v2d) {
                if (AstarUtil.getJumpDataByV2d($v2d.x, $v2d.y)) {
                    $hitPos = this.findNearJumpCharPos();
                    if (!$hitPos) {
                        return;
                    }
                }
                // var item: Array<Vector2D> = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
                var item = AstarUtil.findPath2D(this.findMainCharNearCanWalkVe2(), AstarUtil.getGrapIndexByPos($hitPos));
                if (item) {
                    MainCharControlModel.getInstance().setWalkPathFun(item, function () { GameMouseManager.getInstance().walkPathComplete(); });
                }
            }
        }
    };
    GameMouseManager.prototype.findMainCharNearCanWalkVe2 = function () {
        var $baseV2d = GameInstance.mainChar.getAstarPos();
        if (AstarUtil.isGridCanWalk($baseV2d)) {
            return $baseV2d;
        }
        else {
            console.log("不可以的", $baseV2d);
        }
        var $n = 1;
        while (true) {
            if (AstarUtil.isGridCanWalk(new Vector2D($baseV2d.x + $n, $baseV2d.y))) {
                $baseV2d = new Vector2D($baseV2d.x + $n, $baseV2d.y);
                break;
            }
            if (AstarUtil.isGridCanWalk(new Vector2D($baseV2d.x - $n, $baseV2d.y))) {
                $baseV2d = new Vector2D($baseV2d.x - $n, $baseV2d.y);
                break;
            }
            if (AstarUtil.isGridCanWalk(new Vector2D($baseV2d.x, $baseV2d.y + $n))) {
                $baseV2d = new Vector2D($baseV2d.x, $baseV2d.y + $n);
                break;
            }
            if (AstarUtil.isGridCanWalk(new Vector2D($baseV2d.x, $baseV2d.y - $n))) {
                $baseV2d = new Vector2D($baseV2d.x, $baseV2d.y - $n);
                break;
            }
            $n++;
            if ($n > 10) {
                break;
            }
        }
        if (AstarUtil.isGridCanWalk($baseV2d)) {
            console.log("可以的", $baseV2d);
        }
        AstarUtil.getWorldPosByStart2D($baseV2d);
        return $baseV2d;
    };
    GameMouseManager.prototype.findNearJumpCharPos = function () {
        var $displayList = GameInstance.roleList;
        var $dis;
        var $selectChar;
        for (var i = 0; i < $displayList.length; i++) {
            if ($displayList[i] instanceof ScenePortal) {
                var $tempChar = $displayList[i];
                if ($tempChar.tb.judge == 4) {
                    $selectChar = $tempChar;
                }
            }
        }
        if ($selectChar) {
            return $selectChar.getCurrentPos();
        }
        else {
            return null;
        }
    };
    GameMouseManager.prototype.onTouchStart = function ($e) {
        if (!this.isCanUseMouseEvent()) {
            return;
        }
        this.mouseToEvent($e);
    };
    GameMouseManager.prototype.onTouchEnd = function ($e) {
        GameMouseManager.moveQuestCell = false;
        if (!this.isCanUseMouseEvent()) {
            return;
        }
        if (GameInstance.useYaoGan) {
            var hasYaoGan = false;
            for (var i = 0; i < $e.touches.length; i++) {
                if ($e.touches[i].identifier == this.yaoganIdentifier) {
                    hasYaoGan = true;
                }
            }
            if (!hasYaoGan) {
                this.bindPos.x = this.resetPos.x;
                this.bindPos.y = this.resetPos.y;
                TimeUtil.removeFrameTick(this.updataFun);
                this.canTestClikGroundMove = null; //
                GameInstance.useYaoGan = false;
                this.setBasePostion();
                GameInstance.mainChar.stopMove();
                GameMouseManager.getInstance().walkPathComplete();
                this.yaoganIdentifier = -1;
                AotuSkillManager.getInstance().timeoutAuto();
            }
        }
        this.mouseToEvent($e);
    };
    GameMouseManager.prototype.setBasePostion = function () {
        this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2;
        this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2;
        //console.log(this.b_yaogan_bar.y)
        this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2;
    };
    GameMouseManager.prototype.onTouchMove = function ($e) {
        // alert("--MOve--");
        if (!this.isCanUseMouseEvent()) {
            return;
        }
        if (this.b_yaogan_bar && SceneManager.getInstance().ready) {
            var $evt = this.mouseToEvent($e);
            if (GameMouseManager.moveQuestCell) {
                return;
            }
            // //console.log("--GameInstance.useYaoGan--",GameInstance.useYaoGan)
            if (!GameInstance.useYaoGan) {
                if (this.canTestClikGroundMove || this.inYaoganButRound($evt)) {
                    if (GuidData.map.is1V1()) {
                        if (this.lastMouseEvetTime < TimeUtil.getTimer()) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                            this.lastMouseEvetTime = TimeUtil.getTimer() + 3000;
                        }
                        return;
                    }
                    this.beginYaogan($e);
                    console.log("摇杆开始");
                    this.isFristTouchMove = true;
                }
                // return
            }
            else {
                if (GameMouseManager.moveQuestCell) {
                    return;
                }
                this.isFristTouchMove = false;
                //GameInstance.mainUi.bottomRightSystem.changeBaskSkillIcon(0);
                var mousePos;
                for (var i = 0; i < $e.touches.length; i++) {
                    if ($e.touches[i].identifier == this.yaoganIdentifier) {
                        var temp = this.getMouseDownPos($e.touches[i]);
                        if (mousePos) {
                            if (Vector2D.distance(mousePos, this.bindPos) > Vector2D.distance(temp, this.bindPos)) {
                                mousePos = temp;
                            }
                        }
                        else {
                            mousePos = temp;
                        }
                    }
                }
                //此处为技能播放与寻路判断，暂时改为+400.正确情况应该是去掉该层判断，并修改技能表的self_cd值。
                // if (TimeUtil.getTimer() > AotuSkillManager.lastPlaySkillTime+400){
                this.changeBingPostion(new Vector2D(mousePos.x, mousePos.y));
                // }
            }
        }
    };
    GameMouseManager.prototype.changeBingPostion = function (mousePos) {
        var dis = Vector2D.distance(mousePos, this.bindPos);
        if (dis > 50) {
            var $nrm = new Vector2D(this.bindPos.x - mousePos.x, this.bindPos.y - mousePos.y);
            $nrm.normalize();
            $nrm.scaleBy(50);
            this.bindPos.x = mousePos.x + $nrm.x;
            this.bindPos.y = mousePos.y + $nrm.y;
        }
        var kk = this.b_yaogan_bg.parent;
        var v2d = new Vector2D(mousePos.x - this.bindPos.x, mousePos.y - this.bindPos.y);
        v2d.normalize();
        this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2 + v2d.x * 20;
        this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2 + v2d.y * 20 - kk.y;
        this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2 - kk.y;
        var kAngly = 30; //度
        var $a = Math.atan2(v2d.y, v2d.x) * 180 / Math.PI;
        if (this._lastV2dNrm) {
            var $b = Math.atan2(this._lastV2dNrm.y, this._lastV2dNrm.x) * 180 / Math.PI;
            if (Math.abs($a - $b) < kAngly) {
                return;
            }
        }
        this._lastV2dNrm = new Vector2D(v2d.x, v2d.y);
        var ma = new Matrix3D();
        ma.appendRotation(-Scene_data.focus3D.rotationY, Vector3D.Y_AXIS);
        this._speedDirect = ma.transformVector(new Vector3D(v2d.x, 0, -v2d.y));
        this.changeMainChar();
        // //console.log("修改摇杆")
    };
    GameMouseManager.prototype.changeMainChar = function () {
        if (this.isCanChangeRole) {
            MainCharControlModel.getInstance().setSpeedDirect(this._speedDirect);
            this.sendYaoGanPath();
        }
        else {
            TimeUtil.addTimeOut(100, function () {
                //    this.changeMainChar();
            });
        }
    };
    GameMouseManager.prototype.sendYaoGanPath = function () {
        if (GameMouseManager.moveQuestCell) {
            return;
        }
        if (this.isCanChangeRole) {
            if (AotuSkillManager.getInstance().aotuBattle) {
                AotuSkillManager.getInstance().aotuBattle = false;
            }
            if (AotuSkillManager.getInstance().aotuWalk) {
                AotuSkillManager.getInstance().aotuWalk = false;
            }
            if (this._speedDirect && !GameInstance.mainChar.isDeath) {
                if (!MainCharControlModel.getInstance().isWalk()) {
                    return;
                }
                var $toPos = GameInstance.mainChar.getCurrentPos();
                $toPos.x = $toPos.x + this._speedDirect.x * 20;
                $toPos.z = $toPos.z + this._speedDirect.z * 20;
                $toPos = AstarUtil.findNearLinePoint(GameInstance.mainChar.getCurrentPos(), $toPos);
                var a = GameInstance.mainChar.getAstarPos();
                var b = AstarUtil.getGrapIndexByPos($toPos);
                this.nextSendTime = TimeUtil.getTimer() + 300;
                if (!GameInstance.useYaoGan) {
                    this._speedDirect = null;
                }
                if ((a.x == b.x && a.y == b.y)) {
                    //    this.getNearFiledRoad();
                }
                else {
                    GameInstance.questMoveVo = null;
                    if (AstarUtil.isGridCanWalk(a)) {
                        if (AstarUtil.isGridCanWalk(b)) {
                            MainCharControlModel.getInstance().sendPath([a, b]);
                        }
                        else {
                            MainCharControlModel.getInstance().sendPath([a, a]);
                        }
                    }
                    else {
                        if (AstarUtil.isGridCanWalk(b)) {
                            MainCharControlModel.getInstance().sendPath([b, b]);
                        }
                        else {
                            //console.log("移动的两个位置都不可移动。需要优化")
                        }
                    }
                }
            }
        }
    };
    GameMouseManager.prototype.getNearFiledRoad = function () {
        var a = GameInstance.mainChar.getAstarPos();
        var $tx = a.x;
        var $ty = a.y;
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
        //console.log($outStr)
        //console.log("-----------------------------")
    };
    Object.defineProperty(GameMouseManager.prototype, "isCanChangeRole", {
        get: function () {
            if (JumpModel.isTestJumpNow()) {
                return false;
            }
            var $curentAction = GameInstance.mainChar.curentAction;
            // //console.log("-- $curentAction--", $curentAction);
            if (GameInstance.mainChar.isSinging || $curentAction == CharAction.WALK || $curentAction == CharAction.STANAD || $curentAction == CharAction.STAND_MOUNT || $curentAction == CharAction.WALK_MOUNT) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    GameMouseManager.prototype.beginYaogan = function ($e) {
        for (var i = 0; i < $e.touches.length; i++) {
            var tempPos = this.getMouseDownPos($e.touches[i]);
            if (tempPos.x < Scene_data.stageWidth / 4) {
                if (!GameInstance.useYaoGan) {
                    this.bindPos.x = tempPos.x;
                    this.bindPos.y = tempPos.y;
                    TimeUtil.addFrameTick(this.updataFun);
                    GameInstance.useYaoGan = true;
                    FpsMc.tipStr = String($e.touches[i].identifier);
                    this.yaoganIdentifier = $e.touches[i].identifier;
                }
            }
        }
    };
    GameMouseManager.prototype.updata = function (t) {
        if (TimeUtil.getTimer() > this.nextSendTime && this.isCanChangeRole) {
            if (!this.isFristTouchMove && GameInstance.mainChar) {
                if (GameInstance.mainChar.curentAction == CharAction.STANAD) {
                    this.changeMainChar();
                }
                this.sendYaoGanPath();
            }
        }
    };
    GameMouseManager.prototype.getMouseDownPos = function ($touch) {
        var $mousePos = new Vector2D;
        if (!Scene_data.verticalScene) {
            $mousePos.x = $touch.pageX / UIData.Scale;
            $mousePos.y = $touch.pageY / UIData.Scale;
        }
        else {
            $mousePos.x = $touch.pageY / UIData.Scale;
            $mousePos.y = (Scene_data.stageHeight - $touch.pageX) / UIData.Scale;
        }
        $mousePos.y += (Scene_data.stageHeight / UIData.Scale - 540);
        return $mousePos;
    };
    GameMouseManager.prototype.walkPathComplete = function () {
        var $displayList = GameInstance.roleList;
        this.collectionType = 0; //默认为0攻击图标
        for (var i = 0; $displayList && i < $displayList.length; i++) {
            var $tempChar = $displayList[i];
            if (!$tempChar.unit) {
                continue;
            }
            if ($tempChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT) {
                if (this.teleportToScene($tempChar)) {
                    break;
                }
            }
            else if ($tempChar.unit.isNpc()) {
                ////console.log($tempChar.math_distance(GameInstance.mainChar));
                if (GameInstance.mainChar.math_distance($tempChar) < 80) {
                    this.collectionType = 1; //和NPC对话1
                    break;
                }
            }
        }
        //  GameInstance.mainUi.bottomRightSystem.changeBaskSkillIcon(this.collectionType);
        if (GameInstance.attackTarget) {
            if (GameInstance.attackTarget.unit.isPlayer()) {
                GameInstance.attackTarget = null;
            }
        }
    };
    //检测特殊对象
    GameMouseManager.prototype.isCatchSceneCharDis = function ($tempChar) {
        if ($tempChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT) {
            var $tb_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template($tempChar.unit.getEntry());
            var a = GameInstance.mainChar.getAstarPos();
            var b = $tempChar.getAstarPos();
            if (a && b && Math.abs(a.x - b.x) < $tb_gameobject_template.trigger_width && Math.abs(a.y - b.y) < $tb_gameobject_template.trigger_height) {
                return true;
            }
        }
        return false;
    };
    /**检测掉落 */
    GameMouseManager.prototype.isCatchSceneLoot = function (loot) {
        var g1 = loot.getOwnderGuid();
        //var g2:string = GameInstance.mainChar.unit.getPlayerGUID();
        ////console.log(g1,g2)
        if (g1 == "" || g1 == GameInstance.mainChar.unit.getPlayerGUID()) {
            var a = GameInstance.mainChar.getAstarPos();
            var b = loot.getAstarPos();
            if (a && b && Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1) {
                return true;
            }
        }
        return false;
    };
    GameMouseManager.prototype.teleportToScene = function ($tempChar) {
        if ($tempChar instanceof SceneCollection) {
            return false;
        }
        if (this.isCatchSceneCharDis($tempChar)) {
            var $tb_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template($tempChar.unit.getEntry());
            if ($tb_gameobject_template.id == 6) {
                NetManager.getInstance().protocolos.teleport($tempChar.unit.uintGuid);
                this.collectionType = 0;
            }
            else {
                this.collectionType = $tb_gameobject_template.style;
            }
            return true;
        }
        return false;
    };
    GameMouseManager.moveQuestCell = false; //不和任务移动冲突
    return GameMouseManager;
}());
//# sourceMappingURL=GameMouseManager.js.map