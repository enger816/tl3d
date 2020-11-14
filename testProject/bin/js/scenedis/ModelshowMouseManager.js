var scenedis;
(function (scenedis) {
    var ModelshowMouseManager = /** @class */ (function () {
        function ModelshowMouseManager() {
        }
        ModelshowMouseManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ModelshowMouseManager();
            }
            return this._instance;
        };
        ModelshowMouseManager.prototype.addMouseEvent = function () {
            var _this = this;
            if (tl3d.Scene_data.isPc) {
                document.addEventListener(tl3d.MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(tl3d.MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(tl3d.MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(tl3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
            }
            else {
                document.addEventListener(tl3d.MouseType.TouchMove, function ($evt) { _this.mouseToEvent($evt); });
                document.addEventListener(tl3d.MouseType.TouchEnd, function ($evt) { _this.mouseToEvent($evt); });
                document.addEventListener(tl3d.MouseType.TouchStart, function ($evt) { _this.mouseToEvent($evt); });
            }
        };
        ModelshowMouseManager.prototype.onMouseWheel = function ($evt) {
        };
        ModelshowMouseManager.prototype.onMouse = function ($e) {
            var evt;
            var point = new tl3d.Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == tl3d.MouseType.MouseDown) {
                    evt = new tl3d.InteractiveEvent(tl3d.InteractiveEvent.Down);
                }
                else if ($e.type == tl3d.MouseType.MouseUp) {
                    evt = new tl3d.InteractiveEvent(tl3d.InteractiveEvent.Up);
                }
                else if ($e.type == tl3d.MouseType.MouseMove) {
                    evt = new tl3d.InteractiveEvent(tl3d.InteractiveEvent.Move);
                }
                else if ($e.type == tl3d.MouseType.MouseClick) {
                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            this.makeMouseEvent(evt, point);
        };
        ModelshowMouseManager.prototype.mouseToEvent = function ($touchEvent) {
            var evt;
            var point = new tl3d.Vector2D();
            if ($touchEvent.type == tl3d.MouseType.TouchStart) {
                evt = new tl3d.InteractiveEvent(tl3d.InteractiveEvent.Down);
            }
            else if ($touchEvent.type == tl3d.MouseType.TouchEnd) {
                evt = new tl3d.InteractiveEvent(tl3d.InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            }
            else if ($touchEvent.type == tl3d.MouseType.TouchMove) {
                evt = new tl3d.InteractiveEvent(tl3d.InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);
        };
        ModelshowMouseManager.prototype.makeMouseEvent = function (evt, point) {
            var temp = tl3d.UIManager.getInstance().mouseEvetData(evt, point);
            if (!temp) {
                if (evt.type == tl3d.InteractiveEvent.Up) {
                    this.clikSceneGround(point);
                }
            }
        };
        ModelshowMouseManager.prototype.clikSceneGround = function ($pos) {
        };
        ModelshowMouseManager.prototype.walkPathComplete = function () {
        };
        return ModelshowMouseManager;
    }());
    scenedis.ModelshowMouseManager = ModelshowMouseManager;
})(scenedis || (scenedis = {}));
//# sourceMappingURL=ModelshowMouseManager.js.map