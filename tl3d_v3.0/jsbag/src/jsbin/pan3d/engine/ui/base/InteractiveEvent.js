var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var InteractiveEvent = /** @class */ (function (_super) {
        __extends(InteractiveEvent, _super);
        function InteractiveEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InteractiveEvent.Down = "down";
        InteractiveEvent.Up = "Up";
        InteractiveEvent.Move = "Move";
        InteractiveEvent.PinchStart = "PinchStart";
        InteractiveEvent.Pinch = "Pinch";
        return InteractiveEvent;
    }(Pan3d.BaseEvent));
    Pan3d.InteractiveEvent = InteractiveEvent;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=InteractiveEvent.js.map