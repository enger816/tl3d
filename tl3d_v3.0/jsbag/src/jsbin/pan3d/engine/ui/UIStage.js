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
    var UIStage = /** @class */ (function (_super) {
        __extends(UIStage, _super);
        function UIStage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UIStage.prototype.interactiveEvent = function (e) {
            var evtType = e.type;
            var eventMap = this._eventsMap;
            if (!eventMap) {
                return false;
            }
            var list = eventMap[evtType];
            if (!list) {
                return false;
            }
            var length = list.length;
            if (length == 0) {
                return false;
            }
            //for (var i: number = 0; i < length; i++) {
            //    var eventBin: any = list[i];
            //    eventBin.listener.call(eventBin.thisObject, e);
            //}
            for (var i = length - 1; i >= 0; i--) {
                var eventBin = list[i];
                eventBin.listener.call(eventBin.thisObject, e);
            }
            return true;
        };
        return UIStage;
    }(Pan3d.EventDispatcher));
    Pan3d.UIStage = UIStage;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIStage.js.map