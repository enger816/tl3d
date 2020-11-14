var Pan3d;
(function (Pan3d) {
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
            this._eventsMap = null;
        }
        EventDispatcher.prototype.addEventListener = function (types, listener, thisObject) {
            if (!this._eventsMap) {
                this._eventsMap = new Object;
            }
            var list = this._eventsMap[types];
            if (!list) {
                list = this._eventsMap[types] = [];
            }
            var eventBin = { listener: listener, thisObject: thisObject };
            for (var i = 0; i < list.length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject) {
                    return;
                }
            }
            list.push(eventBin);
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener, thisObject) {
            if (this._eventsMap == null) {
                return;
            }
            var list = this._eventsMap[type];
            for (var i = 0; list && i < list.length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject) {
                    list.splice(i, 1);
                    return;
                }
            }
        };
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var eventMap = this._eventsMap;
            if (!eventMap) {
                return true;
            }
            var list = eventMap[event.type];
            if (!list) {
                return true;
            }
            var length = list.length;
            if (length == 0) {
                return true;
            }
            event.target = this;
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                eventBin.listener.call(eventBin.thisObject, event);
            }
        };
        return EventDispatcher;
    }());
    Pan3d.EventDispatcher = EventDispatcher;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=EventDispatcher.js.map