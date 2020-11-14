var ModuleEventManager = /** @class */ (function () {
    function ModuleEventManager() {
    }
    ModuleEventManager.addEvents = function (ary, $fun, $thisObj) {
        for (var i = 0; i < ary.length; i++) {
            ModuleEventManager._instance.addEventListener(ary[i].type, $fun, $thisObj);
        }
    };
    ModuleEventManager.dispatchEvent = function ($event) {
        ModuleEventManager._instance.dispatchEvent($event);
    };
    ModuleEventManager._instance = new EventDispatcher();
    return ModuleEventManager;
}());
//# sourceMappingURL=ModuleEventManager.js.map