var win;
(function (win) {
    var Scene_data = Pan3d.Scene_data;
    var UIManager = Pan3d.UIManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var MouseType = Pan3d.MouseType;
    var Vector2D = Pan3d.Vector2D;
    var MathClass = Pan3d.MathClass;
    var LayUIManager = /** @class */ (function () {
        function LayUIManager() {
            this.lastTime = 0;
            this._uiList = [];
            this._containerList = [];
        }
        Object.defineProperty(LayUIManager.prototype, "uiList", {
            get: function () {
                return this._uiList;
            },
            enumerable: true,
            configurable: true
        });
        LayUIManager.prototype.addUI = function ($ui) {
            var $id = 0;
            for (var i = this._uiList.length - 1; i >= 0; i--) {
                if (this._uiList[i].sortnum <= $ui.sortnum) {
                    $id = i + 1;
                    break;
                }
            }
            this._uiList.splice($id, 0, $ui);
            $ui.rendering = true;
        };
        LayUIManager.prototype.removeUI = function ($ui) {
            var index = this._uiList.indexOf($ui);
            $ui.rendering = false;
            if (index != -1) {
                this._uiList.splice(index, 1);
            }
        };
        LayUIManager.prototype.addUIContainer = function ($container) {
            if ($container.hasStage) {
                return;
            }
            $container.perent = this;
            this._containerList.push($container);
            $container.resize();
            for (var i = 0; i < $container.renderList.length; i++) {
                this.addUI($container.renderList[i]);
            }
            $container.hasStage = true;
        };
        LayUIManager.prototype.removeAll = function () {
            while (this._containerList.length) {
                ////console.log("this._containerList.length",this._containerList.length)
                this.removeUIContainer(this._containerList[this._containerList.length - 1]);
            }
        };
        LayUIManager.prototype.removeUIContainer = function ($container) {
            if (!$container.hasStage) {
                return;
            }
            var index = this._containerList.indexOf($container);
            $container.hasStage = false;
            $container.perent = null;
            if (index != -1) {
                this._containerList.splice(index, 1);
            }
            for (var i = 0; i < $container.renderList.length; i++) {
                this.removeUI($container.renderList[i]);
            }
        };
        LayUIManager.prototype.hasWindowUI = function () {
            return false;
        };
        LayUIManager.prototype.removeNoInterfaceUI = function () {
            for (var i = (this._containerList.length - 1); i >= 0; i--) {
                if (!this._containerList[i].interfaceUI) { //非主界面的时候
                    this.removeUIContainer(this._containerList[i]);
                }
            }
        };
        LayUIManager.prototype.resize = function () {
            if (!this._uiList) {
                return;
            }
            for (var i = 0; i < this._uiList.length; i++) {
                this._uiList[i].resize();
            }
            for (var i = 0; i < this._containerList.length; i++) {
                this._containerList[i].resize();
            }
        };
        LayUIManager.prototype.upBgGroundZero = function () {
            for (var i = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].container.layer == -1 || this._uiList[i].sortnum == -1) {
                    this._uiList[i].update();
                }
            }
        };
        LayUIManager.prototype.update = function () {
            for (var i = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].container.layer >= 0 && this._uiList[i].sortnum != -1) {
                    this._uiList[i].update();
                }
            }
        };
        //private _touch: any;
        LayUIManager.prototype.regEvent = function ($touce) {
        };
        LayUIManager.prototype.onTouch = function ($e) {
            this.interactiveEvent($e);
        };
        LayUIManager.prototype.onMouse = function ($e) {
            this.interactiveEvent($e);
        };
        LayUIManager.prototype.interactiveEvent = function ($e) {
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
                //evt.x = $e.pageX;
                //evt.y = $e.pageY;
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            else {
                if ($e.type == MouseType.TouchStart) {
                    //$e.preventDefault();
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                    if ($e.touches.length > 1) {
                        // evt = new InteractiveEvent(InteractiveEvent.PinchStart);
                        // this.lastSwipeDis = MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY);
                        // this.lastSwipeRot = Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX);
                        point.x = $e.touches[$e.touches.length - 1].pageX;
                        point.y = $e.touches[$e.touches.length - 1].pageY;
                    }
                    else {
                        point.x = $e.pageX;
                        point.y = $e.pageY;
                    }
                }
                else if ($e.type == MouseType.TouchEnd) {
                    //alert("touseend");
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                    point.x = $e.changedTouches[0].pageX;
                    point.y = $e.changedTouches[0].pageY;
                }
                else if ($e.type == MouseType.TouchMove) {
                    //$e.preventDefault();
                    if ($e.touches.length > 1) {
                        evt = new InteractiveEvent(InteractiveEvent.Pinch);
                        evt.data = MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY) / this.lastSwipeDis;
                        evt.roation = (Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX) - this.lastSwipeRot) * 180 / Math.PI;
                    }
                    else {
                        evt = new InteractiveEvent(InteractiveEvent.Move);
                    }
                    point.x = $e.pageX;
                    point.y = $e.pageY;
                }
                if ($e.touches.length) {
                    for (var i = 0; i < $e.touches.length; i++) {
                        point.x = $e.touches[i].clientX;
                        point.y = $e.touches[i].clientY;
                    }
                }
            }
            ////console.log(point.x, point.y);
            this.mouseEvetData(evt, point);
        };
        LayUIManager.prototype.disMoveNnum = function (v2d, $num) {
            return Vector2D.distance(v2d, this.lastMousePos) < $num;
        };
        LayUIManager.prototype.mouseEvetData = function (evt, point) {
            UIManager.cando = true;
            if (Scene_data.verticalScene) {
                evt.x = point.y;
                evt.y = Scene_data.stageHeight - point.x;
            }
            else {
                evt.x = point.x;
                evt.y = point.y;
            }
            var tf = false;
            if (!tf) {
                for (var i = this._uiList.length - 1; i >= 0; i--) {
                    if (this._uiList[i]) {
                        if (this._uiList[i] && this._uiList[i].interactiveEvent(evt)) {
                            tf = true;
                            break;
                        }
                    }
                }
            }
            return tf;
            /*
        
  
            */
        };
        return LayUIManager;
    }());
    win.LayUIManager = LayUIManager;
})(win || (win = {}));
//# sourceMappingURL=LayUIManager.js.map