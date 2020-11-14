var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EngineModule = /** @class */ (function (_super) {
    __extends(EngineModule, _super);
    function EngineModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineModule.prototype.getModuleName = function () {
        return "EngineModule";
    };
    EngineModule.prototype.listProcessors = function () {
        return [new EngineProcessor(),
            new NetBaseProcessor()
        ];
    };
    return EngineModule;
}(Module));
//# sourceMappingURL=EngineModule.js.map