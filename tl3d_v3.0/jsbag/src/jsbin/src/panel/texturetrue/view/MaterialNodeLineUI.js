var materialui;
(function (materialui) {
    var Vector2D = Pan3d.Vector2D;
    var BezierClasszip = /** @class */ (function () {
        function BezierClasszip() {
        }
        BezierClasszip.drawbezier = function (_array, _time) {
            var _newarray = new Array();
            for (var i = 0; i < _array.length; i++) {
                _newarray.push(new Vector2D(_array[i].x, _array[i].y));
            }
            while (_newarray.length > 1) {
                for (var j = 0; j < _newarray.length - 1; j++) {
                    this.mathmidpoint(_newarray[j], _newarray[j + 1], _time);
                }
                _newarray.pop();
            }
            return _newarray[0];
        };
        BezierClasszip.mathmidpoint = function (a, b, t) {
            var _nx, _ny, _nz;
            _nx = a.x + (b.x - a.x) * t;
            _ny = a.y + (b.y - a.y) * t;
            a.x = _nx;
            a.y = _ny;
        };
        return BezierClasszip;
    }());
    materialui.BezierClasszip = BezierClasszip;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var MaterialNodeLineUI = /** @class */ (function () {
        function MaterialNodeLineUI() {
            this.lineRender = new materialui.NodeLineLinkComponent;
        }
        MaterialNodeLineUI.prototype.setFromNode = function ($node) {
            if ($node.inOut) {
                this.endNode = $node;
            }
            else {
                this.fromNode = $node;
            }
            this.currentHasNode = $node;
            this.needNodeType = !$node.inOut;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
        };
        MaterialNodeLineUI.prototype.onMove = function ($e) {
            this.mousePos = $e;
            this.draw();
        };
        MaterialNodeLineUI.prototype.setEndNode = function ($node) {
            if ($node.inOut) {
                this.endNode = $node;
            }
            else {
                this.fromNode = $node;
            }
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            this.draw();
            this.setNodeLine();
        };
        MaterialNodeLineUI.prototype.setNodeLine = function () {
            if (this.endNode.inLine) {
                var evt = new materialui.MEvent_Material_Connect(materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE);
                evt.line = this.endNode.inLine;
                ModuleEventManager.dispatchEvent(evt);
            }
            if (this.endNode.typets == materialui.MaterialItemType.UNDEFINE) {
                this.endNode.changeType(this.fromNode.typets);
            }
            this.fromNode.outLineList.push(this);
            this.endNode.inLine = this;
            this.fromNode.setConnect();
            this.endNode.setConnect();
            this.endNode.nodeTreeItem.parentNodeItem = this.fromNode.nodeTreeItem;
            this.fromNode.nodeTreeItem.pushSunNode(this.endNode.nodeTreeItem);
        };
        MaterialNodeLineUI.prototype.removeStage = function () {
            if (this.parent) {
                if (this.parent) {
                    Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
                }
                this.parent.removeRender(this.lineRender);
                this.parent = null;
            }
        };
        MaterialNodeLineUI.prototype.draw = function () {
            if (this.fromNode) {
                this.startPoint = this.parent.globalToLocal(this.fromNode.getStagePoint());
            }
            else {
                this.startPoint = this.parent.getMouse(this.mousePos);
            }
            if (this.endNode) {
                this.endPoint = this.parent.globalToLocal(this.endNode.getStagePoint());
            }
            else {
                this.endPoint = this.parent.getMouse(this.mousePos);
            }
            var $arr = new Array();
            $arr.push(this.startPoint);
            $arr.push(new Vector2D(this.startPoint.x + 100, this.startPoint.y));
            $arr.push(new Vector2D(this.endPoint.x - 100, this.endPoint.y));
            $arr.push(this.endPoint);
            var bzitem = new Array;
            for (var i = 0; i < 100; i++) {
                bzitem.push(BezierClasszip.drawbezier($arr, i / 100));
            }
            this.lineRender.makeLineUiItem(bzitem);
        };
        MaterialNodeLineUI.prototype.remove = function () {
            this.removeStage();
            if (this.fromNode) {
                this.fromNode.removeOut(this);
                this.fromNode.nodeTreeItem.removeSunNode(this.endNode.nodeTreeItem);
            }
            if (this.endNode) {
                this.endNode.removeIn();
                this.endNode.nodeTreeItem.parentNodeItem = null;
            }
        };
        return MaterialNodeLineUI;
    }());
    materialui.MaterialNodeLineUI = MaterialNodeLineUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialNodeLineUI.js.map