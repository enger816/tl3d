var drag;
(function (drag) {
    var TempDrawManager = /** @class */ (function () {
        function TempDrawManager() {
        }
        TempDrawManager.prototype.doDrag = function (dragInitiator, dragSource, mouseEvent) {
            console.log(dragInitiator, dragSource, mouseEvent);
        };
        return TempDrawManager;
    }());
    drag.TempDrawManager = TempDrawManager;
    var DragManager = /** @class */ (function () {
        function DragManager() {
        }
        DragManager.doDragdoDrag = function (dragInitiator, node) {
            this.dragSource = node;
            Pan3d.ModuleEventManager.dispatchEvent(new drag.PanDragEvent(drag.PanDragEvent.DRAG_SHOW));
        };
        DragManager.NONE = "none";
        DragManager.COPY = "copy";
        DragManager.MOVE = "move";
        DragManager.LINK = "link";
        return DragManager;
    }());
    drag.DragManager = DragManager;
})(drag || (drag = {}));
//# sourceMappingURL=DragManager.js.map