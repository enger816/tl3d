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
var LoginModule = /** @class */ (function (_super) {
    __extends(LoginModule, _super);
    function LoginModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginModule.prototype.getModuleName = function () {
        return "LoginModule";
    };
    LoginModule.prototype.listProcessors = function () {
        return [new LoginProcessor()];
    };
    return LoginModule;
}(Module));
//# sourceMappingURL=LoginModule.js.map