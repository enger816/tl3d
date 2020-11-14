(function () {
    'use strict';

    var View = Laya.View;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class CameraUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadUI("Camera");
            }
        }
        ui.CameraUI = CameraUI;
        REG("ui.CameraUI", CameraUI);
        class HudUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadUI("Hud");
            }
        }
        ui.HudUI = HudUI;
        REG("ui.HudUI", HudUI);
    })(ui || (ui = {}));

    class CameraView extends ui.CameraUI {
        constructor() {
            super();
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Camera.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = false;
    GameConfig.init();

    class GameEntity {
        constructor(entityKey) {
            this.components = [];
            this.entityType = -1;
            this.entityChildType = -1;
            this.isDrama = false;
            this.isCameraObj = false;
            this.isNeedControl = false;
            this.changeSceneDestroy = true;
            this._isTransparent = false;
            this._curAlpha = 1;
            this._isHide = false;
            this.disBoolean = false;
            this._childList = [];
            this.alreadyPickUP = false;
            this._isCanCollect = true;
            this.key = entityKey;
        }
        isDestroy() {
            return this.key == null;
        }
        addComponent(componentType) {
            return null;
        }
        removeComponent(componentType) {
            if (this.hasComponent(componentType)) {
                var component = this.getComponent(componentType);
                component.destroy();
                component.destroyKey();
                delete this.components[componentType];
            }
        }
        hasComponent(componentType) {
            return this.components[componentType];
        }
        getComponent(componentType, allowCreate = false) {
            var component = this.components[componentType];
            if (component) {
                return component;
            }
            if (allowCreate) {
                return this.addComponent(componentType);
            }
            return null;
        }
        setTransParent(value) {
            this._isTransparent = value;
        }
        destroy() {
            if (this.isDestroy())
                return;
            for (var comp of this.components) {
                if (comp) {
                    comp.destroy();
                    comp.destroyKey();
                }
            }
            this.components.length = 0;
            this.isDrama = false;
            this.key = null;
            this._childList.length = 0;
            this._childList = null;
        }
    }

    class EntityType {
        static isStoryLine(type) {
            return false;
        }
    }
    EntityType.PLAYER = 0;
    EntityType.MONSTER = 1;
    EntityType.HERO = 2;
    EntityType.TRAP = 3;
    EntityType.GATHER = 4;
    EntityType.GOODS = 10;
    EntityType.NPC = 11;
    EntityType.TELEPORT = 12;
    EntityType.STATIC = 13;
    EntityType.STATIC_ATTACK = 14;
    EntityType.EFFECT = 51;
    EntityType.WEAPON = 52;
    EntityType.HORSE = 53;
    EntityType.GHOST = 54;
    EntityType.WING = 55;
    EntityType.SHADOW = 56;
    EntityType.HELPEDPEOPLE = 59;
    EntityType.UI = 100;
    EntityType.UI_PARTICLE = 200;
    EntityType.UI_WEAPON = 300;
    EntityType.GENSUI = 400;
    EntityType.DEVIL = 401;
    EntityType.BAOWU = 501;
    EntityType.ROBOTPLAYER = 409;
    EntityType.STORY_LINE_PLAYER = 600;
    EntityType.STORY_LINE_MONSTER = 601;
    EntityType.STORY_LINE_NPC = 602;
    EntityType.STORY_LINE_EFFECT = 603;

    class EntityMgr {
        constructor() {
            this.entityList = {};
            this.laterDestoryKey = [];
        }
        set mainCharKey(value) {
            this._mainCharKey = value;
        }
        get mainCharKey() {
            return this._mainCharKey;
        }
        createEntity(entityKey, isMainChar = false) {
            if (isMainChar) {
                this.mainCharKey = entityKey;
            }
            console.assert(!this.hasEntity(entityKey), "The entity is existing! key=" + entityKey);
            var entity = this.entityList[entityKey] = new GameEntity(entityKey);
            return entity;
        }
        isMainChar($gameEntity) {
            return $gameEntity.key == this.mainCharKey;
        }
        getMainChar() {
            return this.entityList[this.mainCharKey];
        }
        getEntity(entityKey, allowCreate = false) {
            if (allowCreate && !this.hasEntity(entityKey))
                return this.createEntity(entityKey);
            return this.entityList[entityKey];
        }
        getAllEntitys() {
            return this.entityList;
        }
        removeEntity(entityKey, later = false) {
            console.assert(this.hasEntity(entityKey), "There is no entity! key=" + entityKey);
            console.assert(entityKey != this.mainCharKey, "怎么移除了主角");
            if (later) {
                if (this.laterDestoryKey.indexOf(entityKey) == -1)
                    this.laterDestoryKey.push(entityKey);
                return null;
            }
            var entity = this.entityList[entityKey];
            if (entity) {
                if (entity.entityType == EntityType.PLAYER) {
                }
                entity.destroy();
            }
            delete this.entityList[entityKey];
            return entity;
        }
        safeRemoveEntity(entityKey, later = false) {
            if (!this.hasEntity(entityKey))
                return null;
            var entity = this.removeEntity(entityKey, later);
            return entity;
        }
        hasEntity(entityKey) {
            return this.entityList[entityKey] != null;
        }
        getEntityHasDamageList() {
            var entitys = [];
            return entitys;
        }
        getEntitySize() {
            var num;
            for (var key in this.entityList)
                num++;
            return num;
        }
        getCameraEntity() {
            for (var key in this.entityList) {
                let entity = this.entityList[key];
                if (entity.isCameraObj)
                    return entity;
            }
            return null;
        }
        setEntityVisible(entity, visible, headVisble = true) {
        }
        destroy() {
            for (var entity of this.entityList) {
                if (entity.changeSceneDestroy && entity.entityType != EntityType.UI)
                    this.removeEntity(entity.key);
            }
        }
        laterDestroy() {
            var index = 0;
            while (this.laterDestoryKey.length) {
                var entityKey = this.laterDestoryKey.shift();
                if (this.hasEntity(entityKey)) {
                    this.removeEntity(entityKey);
                    return;
                }
            }
        }
    }

    class TApp {
    }
    TApp.entityMgr = new EntityMgr();

    class Base2dScene extends tl3d.BaseLaya3dSprite {
        constructor() {
            super();
        }
    }

    var Scene_data = tl3d.Scene_data;
    class GroundPosLaya {
        static getGroundPos($x, $y, $cam3D, $rect, $m) {
            this.cam3D = $cam3D;
            this.windowRect = $rect;
            this.viewMatrx3D = $m;
            var $ty = -0;
            if (!this._plantObjectMath) {
                var A = new tl3d.Vector3D(0, $ty, 500);
                var B = new tl3d.Vector3D(-500, $ty, 0);
                var C = new tl3d.Vector3D(500, $ty, 0);
                this._plantObjectMath = tl3d.Calculation._PanelEquationFromThreePt(A, B, C);
                this._plantnormal = new tl3d.Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
                this._plantnormal.normalize();
                this._plane_a = new tl3d.Vector3D(A.x, A.y, A.z);
            }
            var line_a = this.mathDisplay2Dto3DWorldPos(new tl3d.Vector2D($x, $y), 500);
            var line_b = new tl3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z);
            var crossPoint = tl3d.Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
            return crossPoint;
        }
        static mathDisplay2Dto3DWorldPos($point, $depht = 300) {
            var sceneViewHW;
            if (Scene_data.stageWidth > Scene_data.stageHeight) {
                sceneViewHW = Math.max(Scene_data.stageWidth, Scene_data.stageHeight);
            }
            else {
                sceneViewHW = Math.min(Scene_data.stageWidth, Scene_data.stageHeight);
            }
            var $disNum = $depht / (sceneViewHW / 2);
            var $far = sceneViewHW / 2 * $disNum;
            var fovw = this.windowRect.width;
            var fovh = this.windowRect.height;
            var m = new tl3d.Matrix3D;
            m.prependRotation(-this.cam3D.rotationY, tl3d.Vector3D.Y_AXIS);
            m.prependRotation(-this.cam3D.rotationX, tl3d.Vector3D.X_AXIS);
            var uc = this.viewMatrx3D.transformVector(new tl3d.Vector3D(500, 0, 500));
            var zScale = uc.x / uc.w;
            var fw = (fovw / 2 / zScale) * $disNum;
            var fh = (fovh / 2 / zScale) * $disNum;
            var tx = (($point.x / fovw) * fw) * 2;
            var ty = (($point.y / fovh) * fh) * 2;
            var p = this.gettempPos(new tl3d.Vector3D(-fw + tx, +fh - ty, $far), m);
            return p;
        }
        static gettempPos(a, m) {
            var b = m.transformVector(a);
            b = b.add(new tl3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z));
            return b;
        }
    }

    var Scene_data$1 = tl3d.Scene_data;
    class Base3dScene extends Base2dScene {
        constructor() {
            super();
            this.rx = -10;
            this.ry = 0;
            this.rz = 0;
            this.camFar2 = 100;
            this.focus3d = new tl3d.Object3D;
            this.camDistance = 700;
            this.camRotationX = -35;
            this.camRotationY = 0;
            this.camPositionX = 0;
            this.camPositionY = 0;
            this.camPositionZ = 0;
            this.camViewLH = 1.10;
            this.camFar = 10000;
            this.camAotuMove = false;
            this._windowRect = new tl3d.Rectangle(0, 0, Scene_data$1.stageWidth, Scene_data$1.stageHeight);
        }
        upFrame() {
            Scene_data$1.context3D.setWriteDepth(true);
            Scene_data$1.context3D.setDepthTest(true);
            tl3d.TimeUtil.update();
            Scene_data$1.focus3D.rotationY = this.ry;
            Scene_data$1.focus3D.rotationX = this.rx;
            Scene_data$1.focus3D.rotationZ = this.rz;
            Scene_data$1.cam3D.distance = this.camFar2;
            tl3d.CanvasPostionModel.getInstance().tureMoveV2d = new tl3d.Vector2D(this.x, this.y);
            tl3d.CanvasPostionModel.getInstance().resetSize();
            Scene_data$1.context3D.renderContext.clear(WebGLRenderingContext.DEPTH_BUFFER_BIT);
            tl3d.MathClass.getCamView(Scene_data$1.cam3D, Scene_data$1.focus3D);
            Scene_data$1.context3D._contextSetTest.clear();
            this.tscene.upFrame();
        }
        getGroundPos($x, $y) {
            var $pos = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D);
            return $pos;
        }
        makeNewMatrix() {
            this._windowRect.x = this.x + this._windowRect.width / 2;
            this._windowRect.y = this.y + this._windowRect.height / 2;
            var fovw = Scene_data$1.stageWidth;
            var fovh = Scene_data$1.stageHeight;
            var sceneViewHW = Math.max(fovw, fovh);
            Scene_data$1.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 50, this.camFar);
            Scene_data$1.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
            this.copyViewMatrx3D = Scene_data$1.viewMatrx3D.clone();
            if (this.camAotuMove) {
                if (this.camMoveFun) {
                    this.camMoveFun();
                }
            }
            Scene_data$1.cam3D.distance = this.camDistance;
            this.focus3d.rotationX = this.camRotationX;
            this.focus3d.rotationY = this.camRotationY;
            this.focus3d.x = this.camPositionX;
            this.focus3d.y = this.camPositionY;
            this.focus3d.z = this.camPositionZ;
            Scene_data$1.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Scene_data$1.stageWidth) * 2, 1 - (this._windowRect.y / Scene_data$1.stageHeight) * 2, 0);
            tl3d.MathClass.getCamView(Scene_data$1.cam3D, this.focus3d);
            this.cloneCam3d(Scene_data$1.cam3D);
        }
        setLook(tag) {
            this.focus3d.rotationX = tag.rotationX;
            this.focus3d.rotationY = tag.rotationY;
            this.focus3d.x = tag.x;
            this.focus3d.y = tag.y;
            this.focus3d.z = tag.z;
        }
        cloneCam3d($temp) {
            this.copyCam3d = new tl3d.Camera3D;
            this.copyCam3d.x = $temp.x;
            this.copyCam3d.y = $temp.y;
            this.copyCam3d.z = $temp.z;
            this.copyCam3d.rotationX = $temp.rotationX;
            this.copyCam3d.rotationY = $temp.rotationY;
            this.copyCam3d.rotationZ = $temp.rotationZ;
        }
        onExit() {
            this.scene.clearStaticScene();
        }
    }

    class GameView3d {
        constructor() {
            this.cameraLock = false;
            this.scene = new Base3dScene();
            Laya.stage.addChild(this.scene);
        }
        resetSize() {
        }
        getViewRect() {
            return null;
        }
        getCameraTopRect() {
            return null;
        }
        initScene() {
            this.scene.tscene.loadScene("10000_base", (comp) => { }, (process) => { }, (anly) => { });
            TApp.mainChar = this.createChar("role/3001_base.txt", 300, -400);
            this.createChar("role/3003_base.txt", 400, -400);
            this.createChar("role/3004_base.txt", 400, -600);
            Laya.stage.on(Laya.Event.MOUSE_WHEEL, this, this.onWheel);
            TApp.cameraView.rotationX.changeHandler = Laya.Handler.create(this, this.onRXChange, null, false);
            TApp.cameraView.rotationY.changeHandler = Laya.Handler.create(this, this.onRYChange, null, false);
            TApp.cameraView.posX.changeHandler = Laya.Handler.create(this, this.onPoXChange, null, false);
            TApp.cameraView.posY.changeHandler = Laya.Handler.create(this, this.onPoYChange, null, false);
            TApp.cameraView.posZ.changeHandler = Laya.Handler.create(this, this.onPoZChange, null, false);
            TApp.cameraView.rotationY.value = this.scene.camDistance;
        }
        onWheel(e) {
            this.scene.camDistance += e.delta;
        }
        onRXChange() {
            this.scene.camRotationX = TApp.cameraView.rotationX.value;
            console.log("this.scene3d.rx:", this.scene.camRotationX);
        }
        onRYChange() {
            this.scene.camDistance = TApp.cameraView.rotationY.value;
            console.log("this.scene3d.ry:", this.scene.camDistance);
        }
        onPoXChange() {
            this.scene.camPositionX = TApp.cameraView.posX.value;
            console.log("this.scene3d.PosX:", this.scene.camPositionX);
        }
        onPoYChange() {
            this.scene.camPositionY = TApp.cameraView.posY.value;
            console.log("this.scene3d.posY:", this.scene.camPositionY);
        }
        onPoZChange() {
            this.scene.camPositionZ = TApp.cameraView.posZ.value;
            console.log("this.scene3d.posZ:", this.scene.camPositionZ);
        }
        createChar(url, px, py) {
            var mchar = new tl3d.ModelSceneChar();
            mchar.setRoleUrl(url);
            mchar.x = px;
            mchar.z = py;
            mchar.scale = 5;
            mchar.rotationY = 180;
            mchar.isEnableAnimPlanarShadow = true;
            this.addMovieDisplay(mchar);
            return mchar;
        }
        onPlayerMoveint(px, py) {
            if (this.cameraLock)
                return;
        }
        syncMap(mapX, mapY) {
            this.onPlayerMoveint(mapX, mapY);
        }
        addMovieDisplay(char) {
            this.scene.tscene.addMovieDisplay(char);
        }
        removeMovieDisplay(char) {
            this.scene.tscene.removeMovieDisplay(char);
        }
    }

    class Component {
        constructor(entityKey) {
            this.entityKey = entityKey;
            console.assert(entityKey != null, "异常异常");
        }
        destroy() {
        }
        destroyKey() {
            this.isDisposed = true;
            this.entityKey = null;
        }
        get type() {
            throw new Error("Component this.type 未定义！");
        }
        get entity() {
            var gameEnity = TApp.entityMgr.getEntity(this.entityKey);
            return gameEnity;
        }
        getComponent(componentType, allowCreate = false) {
            var gameEnity = this.entity;
            var getCom = gameEnity.getComponent(componentType, allowCreate);
            return getCom;
        }
    }

    class MoveComponent extends Component {
        constructor(entityKey) {
            super(entityKey);
            this.jumpEndFunc = [];
        }
        get moveCallback() {
            return this._moveCallback;
        }
        setMoveCallback(value, log) {
            this._moveCallback = value;
            console.log("主角技能", "设置移动回调:" + log);
        }
        get movePathArr() {
            return this._movePathArr;
        }
        set movePathArr(value) {
            this._movePathArr = value;
        }
        get isJumping() {
            return this._isJumping;
        }
        set isJumping(value) {
            if (value == true) {
                value;
            }
            if (this._isJumping == true && value == false) {
                this._isJumping = value;
                for (var i = 0; i < this.jumpEndFunc.length; i++) {
                    this.jumpEndFunc[i][0].apply(null, this.jumpEndFunc[i][1]);
                    this.jumpEndFunc[i].length = 0;
                }
                this.jumpEndFunc.length = 0;
            }
            else {
                this._isJumping = value;
            }
        }
        get autoMapPath() {
            return this._autoMapPath;
        }
        set autoMapPath(value) {
            this._autoMapPath = value;
        }
        getNextTarget() {
            if (this.movePathArr && this.movePathArr.length > 0)
                return this.movePathArr[this.movePathArr.length - 1];
            return null;
        }
        clear() {
            this.movePathArr = null;
            this.autoMapPath = null;
            this.isMoving = false;
        }
        setMovePath(paths, delFirst = true) {
            if (paths.length <= 1)
                return;
            if (delFirst)
                paths.shift();
            this.movePathArr = paths;
            this.isMoving = true;
        }
        sendNextPath(nextPathArr) {
        }
        clearPath() {
            if (this.movePathArr)
                this.movePathArr.length = 0;
            this.isMoving = false;
        }
        get isArrive() {
            if (this.autoMapPath && this.autoMapPath.length > 0)
                return false;
            if (this.movePathArr && this.movePathArr.length > 0)
                return false;
            return true;
        }
        onStop() {
            if (this.moveCallback)
                this.moveCallback.onStop(this.entity);
        }
        onThrough() {
            if (this.moveCallback) {
                this.moveCallback.onThrough(this.entity);
            }
        }
        onArrive() {
            if (this.isArrive) {
                this.isMoving = false;
            }
        }
        removePathCurrPoint() {
        }
        checkMainCharNextMoveTarget() {
        }
        destroy() {
            this.clearPath();
            if (this.moveCallback) {
                console.log("主角技能", "停止回调:,组件销毁");
                this.moveCallback.onStop(this.entity);
            }
            this.setMoveCallback(null, ",组件销毁");
            super.destroy();
        }
    }

    class MapConst {
    }
    MapConst.TILE_SIZE = 25;
    MapConst.CHUNK_SIZE = 512;
    MapConst.MAP_BLOCK_WIDTH = 800;
    MapConst.MAP_BLOCK_HEIGHT = 500;

    class EnumMotion {
    }
    EnumMotion.SOUNDS = ["jump_100", "jump_101", "jump_102", "jump_103", "jump_104", "jump_105", "run_3", "run_5", "run_6", "run_water", "run", "run_0"];
    EnumMotion.RUNS = ["run", "run_0"];
    EnumMotion.IDLE = "idle";
    EnumMotion.IDLE_0 = "idle_0";
    EnumMotion.IDLE_2 = "idle_2";
    EnumMotion.IDLE_4 = "idle_4";
    EnumMotion.IDLE_5 = "idle_5";
    EnumMotion.IDLE_6 = "idle_6";
    EnumMotion.IDLE_8 = "idle_8";
    EnumMotion.IDLE_9 = "idle_9";
    EnumMotion.IDLE_10 = "idle_10";
    EnumMotion.IDLE_WATER = "idle_water";
    EnumMotion.STAND_1 = "stand_1";
    EnumMotion.STUN = "stun";
    EnumMotion.RUN = "run";
    EnumMotion.RUN_0 = "run_0";
    EnumMotion.RUN_9 = "run_9";
    EnumMotion.WALK = "walk";
    EnumMotion.WALK_0 = "walk_0";
    EnumMotion.WALK_1 = "walk_1";
    EnumMotion.RUN_WATER = "run_water";
    EnumMotion.RUN_SANDY = "run_3";
    EnumMotion.RUN_4 = "run_4";
    EnumMotion.RUN_5 = "run_5";
    EnumMotion.RUN_6 = "run_6";
    EnumMotion.RUN_7 = "run_7";
    EnumMotion.RUN_8 = "run_8";
    EnumMotion.IDLE_IN_SANDSTORM = "idle_InStandstorm";
    EnumMotion.WALK_IN_SANDSTORM = "walk_InSandstorm";
    EnumMotion.DIE = "die";
    EnumMotion.DEATH = "death";
    EnumMotion.ATTACK = "attack";
    EnumMotion.ATTACK_2 = "attack_2";
    EnumMotion.ATTACK_0 = "attack_0";
    EnumMotion.ATTACK_1 = "attack_1";
    EnumMotion.ATTACK_12 = "attack_12";
    EnumMotion.FLY = "fly";
    EnumMotion.JUMP_1 = "jump_101_start";
    EnumMotion.JUMP_3 = "jump_101";
    EnumMotion.JUMP_4 = "jump_101_end";
    EnumMotion.GATHER_DOWN = "gather_down";
    EnumMotion.GATHER = "gather";
    EnumMotion.GATHER_UP = "gather_up";
    EnumMotion.IDLE_RIDE = "idle_ride";
    EnumMotion.UP = "up";
    EnumMotion.SIT = "sit";
    EnumMotion.HITFLY_RISE = "hitfly_rise";
    EnumMotion.HITFLY = "hitfly";
    EnumMotion.HITFLY_FALL = "hitfly_fall";
    EnumMotion.HITFLY_LIE = "hitfly_lie";
    EnumMotion.HITFLY_STANDUP = "hitfly_standup";
    EnumMotion.INJURED = "injured";
    EnumMotion.DANCE = "dance";
    EnumMotion.BADLY_HURT_DIE = "badly_hurt_die";
    EnumMotion.BADLY_HURT_DEATH = "badly_hurt_death";
    EnumMotion.GAWU = "gawu";
    EnumMotion.WABAO = "gather_3";
    EnumMotion.CHUCHANG = "chuchang";
    EnumMotion.RECOVER = "recover";

    var MathUtil = tl3d.MathUtil;
    class MoveSystem {
        run(entity, tickTime, rect) {
            if (!this.entityMove(entity, tickTime))
                return;
            var px = entity.x;
            var py = entity.z;
            this.checkOtherCurrTile(entity, rect);
        }
        checkOtherCurrTile(entity, rect) {
            if (!entity)
                return;
            var px = entity.x;
            var py = entity.z;
            var newBlockX = px / MapConst.MAP_BLOCK_WIDTH | 0;
            var newBlockY = py / MapConst.MAP_BLOCK_HEIGHT | 0;
            if (this.lastBlockX != newBlockX || this.lastBlockY != newBlockY) {
                this.lastBlockX = newBlockX;
                this.lastBlockY = newBlockY;
            }
        }
        entityMove(entity, duration) {
            var moveCom = SystemMgr.singleton.moveComp;
            var nextPoint = moveCom.movePathArr[0];
            if (!nextPoint) {
                return false;
            }
            var angle = TApp.mainChar.rotationY;
            var px = TApp.mainChar.px;
            var py = TApp.mainChar.py;
            var isMain = true;
            var currPoint = new Laya.Point(px, py);
            var nextPixel = new Laya.Point(nextPoint.x * MapConst.TILE_SIZE + MapConst.TILE_SIZE / 2, nextPoint.y * MapConst.TILE_SIZE + MapConst.TILE_SIZE / 2);
            var angle = MathUtil.getTowPointsAngle2(currPoint.x, currPoint.y, nextPixel.x, nextPixel.y) + 90;
            var mSpeed = 10;
            var distance = currPoint.distance(nextPixel.x, nextPixel.y);
            var move = duration * mSpeed / 1000;
            var value = angle;
            value = (value % 360 + 360) % 360;
            angle = (angle % 360 + 360) % 360;
            if (move < distance) {
                var radian = MathUtil.getTowPointsAngle(currPoint, nextPixel) * (Math.PI / 180);
                if (!isMain) {
                    console.log("移动", "cx" + Number(currPoint.x) + "cy" + Number(currPoint.y) + " tx" + Number(nextPixel.x) + "ty" + Number(nextPixel.y) + " angle:" + angle);
                }
                currPoint.x += move * Math.cos(radian);
                currPoint.y += move * Math.sin(radian);
                TApp.mainChar.x = currPoint.x;
                TApp.mainChar.z = currPoint.y;
                var disAngle;
                var dis1;
                var dis2;
                var speed = MoveSystem.ROT_SPEED;
                if (value > angle) {
                    dis1 = value - angle;
                    dis2 = angle + 360 - value;
                    if (dis1 > dis2) {
                        disAngle = dis2;
                    }
                    else {
                        speed = -MoveSystem.ROT_SPEED;
                        disAngle = dis1;
                    }
                }
                else {
                    dis1 = angle - value;
                    dis2 = value + 360 - angle;
                    if (dis1 > dis2) {
                        disAngle = dis2;
                        speed = -MoveSystem.ROT_SPEED;
                    }
                    else {
                        disAngle = dis1;
                    }
                }
                if (disAngle > 5) {
                    TApp.mainChar.rotationY = value + disAngle / 4 * (speed / MoveSystem.ROT_SPEED);
                }
            }
            else {
                TApp.mainChar.rotationY = angle;
                TApp.mainChar.x = nextPixel.x;
                TApp.mainChar.y = nextPixel.y;
                var crossTile = moveCom.movePathArr.shift();
            }
            if (moveCom.isArrive) {
                TApp.mainChar.play(EnumMotion.IDLE);
            }
            else {
            }
            if (isMain) {
            }
            return true;
        }
        stopMove(entityKey, debug, isChangeMap = false, needChangeMotion = true) {
            if (TApp.mainChar)
                TApp.mainChar.play(EnumMotion.IDLE);
        }
    }
    MoveSystem.ROT_SPEED = 10.0;

    class SystemMgr {
        constructor() {
            this.ready = false;
            this.moveSystem = new MoveSystem();
            this.moveComp = new MoveComponent("");
            if (SystemMgr._singleton) {
                throw new Error("SystemManager: only one instance!");
            }
        }
        static get singleton() {
            return this._singleton;
        }
        run(time) {
            if (!this.ready)
                return;
            if (this.lastTime == 0)
                this.lastTime = time;
            let duration = time - this.lastTime;
            this.Time = this.lastTime = time;
            var rect = TApp.gameView.getViewRect();
            this.moveSystem.run(TApp.mainChar, duration, rect);
        }
    }
    SystemMgr._singleton = new SystemMgr();

    class Main {
        constructor() {
            let cv = Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            tl3d.mainpan3d.canvas = cv;
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(false);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onULoad));
        }
        onULoad() {
            Laya.loader.load("ui.json", Laya.Handler.create(this, this.onLoadImages));
        }
        onLoadImages(data) {
            Laya.View.uiMap = data;
            Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/common/tab.atlas"], Laya.Handler.create(this, this.onConfigLoaded), null, Laya.Loader.ATLAS);
        }
        onConfigLoaded() {
            tl3d.VertexElementFormat.__init__();
            tl3d.LayaScene2dInit.initData();
            TApp.gameView = new GameView3d();
            TApp.cameraView = new CameraView();
            Laya.stage.addChild(TApp.cameraView);
            Laya.stage.addChild(new ui.HudUI());
            TApp.gameView.initScene();
            this.start();
        }
        start() {
            Laya.timer.frameLoop(1, this, this.onEnterFrame);
        }
        stop() {
            Laya.timer.clear(this, this.onEnterFrame);
        }
        onEnterFrame() {
            this.time = Laya.timer.currTimer;
            SystemMgr.singleton.run(this.time);
        }
    }
    new Main();

}());
