var win;
(function (win) {
    var Scene_data = Pan3d.Scene_data;
    var GameUIInstance = /** @class */ (function () {
        function GameUIInstance() {
        }
        return GameUIInstance;
    }());
    win.GameUIInstance = GameUIInstance;
    var LayerManager = /** @class */ (function () {
        function LayerManager() {
        }
        LayerManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new LayerManager();
            }
            return this._instance;
        };
        LayerManager.prototype.initData = function () {
            this.children = [];
        };
        LayerManager.prototype.addPanel = function ($panel, $level, $isOnly) {
            if ($isOnly === void 0) { $isOnly = false; }
            $panel.layer = $level;
            if ($isOnly) {
                for (var i = this.children.length - 1; i >= 0; i--) {
                    if (this.children[i].layer == $level) {
                        this.removePanel(this.children[i]);
                    }
                }
            }
            var index = this.children.indexOf($panel);
            if (index == -1) {
                this.children.push($panel);
                this.children.sort(function (aa, bb) {
                    return aa.layer - bb.layer;
                });
            }
        };
        LayerManager.prototype.removePanel = function ($panel) {
            var index = this.children.indexOf($panel);
            if (index != -1) {
                this.children.splice(index, 1);
            }
        };
        LayerManager.prototype.update = function () {
            Pan3d.Scene_data.context3D.setDepthTest(false);
            for (var i = 0; this.children && i < this.children.length; i++) {
                this.children[i].update();
            }
        };
        LayerManager.prototype.resize = function () {
            for (var i = 0; this.children && i < this.children.length; i++) {
                this.children[i].resize();
            }
        };
        LayerManager.prototype.getObjectsUnderPoint = function (evt) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var temp = this.children[i].getObjectsUnderPoint(evt);
                if (temp) {
                    return temp;
                }
            }
            return null;
        };
        LayerManager.prototype.mouseEvetData = function (evt, point) {
            if (LayerManager.isHideMouseEvent) {
                return;
            }
            var tf = false;
            for (var i = this.children.length - 1; i >= 0; i--) {
                if (!tf) {
                    tf = this.children[i].mouseEvetData(evt, point);
                }
            }
            var $uistageTemp = Scene_data.uiStage.interactiveEvent(evt);
            if (!tf) {
                Scene_data.uiBlankStage.interactiveEvent(evt);
                return $uistageTemp;
            }
            else {
                return true;
            }
        };
        return LayerManager;
    }());
    win.LayerManager = LayerManager;
})(win || (win = {}));
//# sourceMappingURL=LayerManager.js.map