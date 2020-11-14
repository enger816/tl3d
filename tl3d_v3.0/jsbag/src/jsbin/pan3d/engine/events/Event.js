var Pan3d;
(function (Pan3d) {
    var BaseEvent = /** @class */ (function () {
        function BaseEvent($type) {
            this.type = $type;
        }
        BaseEvent.COMPLETE = "complete";
        return BaseEvent;
    }());
    Pan3d.BaseEvent = BaseEvent;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Event.js.map