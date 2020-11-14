var Pan3d;
(function (Pan3d) {
    var ModuleEventManager = /** @class */ (function () {
        function ModuleEventManager() {
        }
        ModuleEventManager.addEvents = function (ary, $fun, $thisObj) {
            for (var i = 0; i < ary.length; i++) {
                ModuleEventManager._instance.addEventListener(ary[i].type, $fun, $thisObj);
            }
        };
        ModuleEventManager.dispatchEvent = function ($event, $data) {
            if ($data === void 0) { $data = null; }
            if ($data) {
                $event.data = $data;
            }
            ModuleEventManager._instance.dispatchEvent($event);
        };
        ModuleEventManager._instance = new Pan3d.EventDispatcher();
        return ModuleEventManager;
    }());
    Pan3d.ModuleEventManager = ModuleEventManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ModuleEventManager.js.map