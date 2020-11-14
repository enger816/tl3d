var Pan3d;
(function (Pan3d) {
    var GameMouseManager = /** @class */ (function () {
        function GameMouseManager() {
            this.ready = false;
            this.resetPos = new Pan3d.Vector2D(150, 400);
            this.bindPos = new Pan3d.Vector2D();
            this.useMouseEvent = true;
            this.lastMouseEvetTime = 0;
            this.nextSendTime = 0;
            this.skipNum = 0;
            this.isFristTouchMove = true;
            this.yaoganIdentifier = -1;
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
            if (Pan3d.Scene_data.isPc) {
                document.addEventListener(Pan3d.MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(Pan3d.MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(Pan3d.MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(Pan3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
            }
            else {
                document.addEventListener(Pan3d.MouseType.TouchMove, function ($evt) { _this.onTouchMove($evt); });
                document.addEventListener(Pan3d.MouseType.TouchEnd, function ($evt) { _this.onTouchEnd($evt); });
                document.addEventListener(Pan3d.MouseType.TouchStart, function ($evt) { _this.onTouchStart($evt); });
            }
            this.bindPos.x = this.resetPos.x;
            this.bindPos.y = this.resetPos.y;
            this.updataFun = function (t) { _this.updata(t); };
        };
        GameMouseManager.prototype.onMouseWheel = function ($evt) {
            Pan3d.AstarUtil.sceneVectList = null;
            Pan3d.Scene_data.gameAngle += $evt.wheelDelta / 100;
        };
        GameMouseManager.prototype.isCanUseMouseEvent = function () {
            return this.useMouseEvent;
        };
        GameMouseManager.prototype.onMouse = function ($e) {
            if (!this.isCanUseMouseEvent()) {
                return;
            }
            if ($e.button == 2) {
                return;
            }
            var evt;
            var point = new Pan3d.Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == Pan3d.MouseType.MouseDown) {
                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
                }
                else if ($e.type == Pan3d.MouseType.MouseUp) {
                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
                }
                else if ($e.type == Pan3d.MouseType.MouseMove) {
                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
                }
                else if ($e.type == Pan3d.MouseType.MouseClick) {
                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            if (evt) {
                evt.mouseEvent = $e;
            }
            this.makeMouseEvent(evt, point);
        };
        GameMouseManager.prototype.makeMouseEvent = function (evt, point) {
            this.lastMouseEvetTime = Pan3d.TimeUtil.getTimer();
            var temp = win.LayerManager.getInstance().mouseEvetData(evt, point);
            if (evt.type == Pan3d.InteractiveEvent.Move) {
                return;
            }
        };
        GameMouseManager.prototype.mouseToEvent = function ($touchEvent) {
            var evt;
            var point = new Pan3d.Vector2D();
            if ($touchEvent.type == Pan3d.MouseType.TouchStart) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
            }
            else if ($touchEvent.type == Pan3d.MouseType.TouchEnd) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            }
            else if ($touchEvent.type == Pan3d.MouseType.TouchMove) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);
            return evt;
        };
        GameMouseManager.prototype.cantClikGround = function ($mousePos) {
            if (Pan3d.GameInstance.useYaoGan) {
                return false;
            }
            if (!Pan3d.GameInstance.mainChar) {
                return false;
            }
            if (!Pan3d.SceneManager.getInstance().render) {
                return false;
            }
            if (Pan3d.GameInstance.mainChar.isDeath) {
                return false;
            }
            return true;
        };
        GameMouseManager.prototype.onSceneMouseDown = function ($evt) {
            if (this.ready) {
                return;
            }
            var $mousePos = new Pan3d.Vector2D;
            if (!Pan3d.Scene_data.verticalScene) {
                $mousePos.x = $evt.x;
                $mousePos.y = $evt.y;
            }
            else {
                $mousePos.x = $evt.y;
                $mousePos.y = Pan3d.Scene_data.stageHeight - $evt.x;
            }
        };
        GameMouseManager.prototype.onTouchStart = function ($e) {
            if (!this.isCanUseMouseEvent()) {
                return;
            }
            this.mouseToEvent($e);
        };
        GameMouseManager.prototype.onTouchEnd = function ($e) {
            if (!this.isCanUseMouseEvent()) {
                return;
            }
            if (Pan3d.GameInstance.useYaoGan) {
                var hasYaoGan = false;
                for (var i = 0; i < $e.touches.length; i++) {
                    if ($e.touches[i].identifier == this.yaoganIdentifier) {
                        hasYaoGan = true;
                    }
                }
                if (!hasYaoGan) {
                    this.bindPos.x = this.resetPos.x;
                    this.bindPos.y = this.resetPos.y;
                    Pan3d.TimeUtil.removeFrameTick(this.updataFun);
                    this.canTestClikGroundMove = null; //
                    Pan3d.GameInstance.useYaoGan = false;
                    this.setBasePostion();
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
        };
        GameMouseManager.prototype.updata = function (t) {
        };
        GameMouseManager.prototype.getMouseDownPos = function ($touch) {
            var $mousePos = new Pan3d.Vector2D;
            if (!Pan3d.Scene_data.verticalScene) {
                $mousePos.x = $touch.pageX / Pan3d.UIData.Scale;
                $mousePos.y = $touch.pageY / Pan3d.UIData.Scale;
            }
            else {
                $mousePos.x = $touch.pageY / Pan3d.UIData.Scale;
                $mousePos.y = (Pan3d.Scene_data.stageHeight - $touch.pageX) / Pan3d.UIData.Scale;
            }
            $mousePos.y += (Pan3d.Scene_data.stageHeight / Pan3d.UIData.Scale - 540);
            return $mousePos;
        };
        return GameMouseManager;
    }());
    Pan3d.GameMouseManager = GameMouseManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GameMouseManager.js.map