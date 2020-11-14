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
var LoginEvent = /** @class */ (function (_super) {
    __extends(LoginEvent, _super);
    function LoginEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginEvent.LOGIN_CONNET_EVENT = "login_connet_event";
    LoginEvent.CREAT_LOGIN_UI_EVENT = "creat_login_ui_event";
    LoginEvent.REMOVE_LOGIN_UI_EVENT = "remove_login_ui_event";
    LoginEvent.LOGIN_RECONNET_EVENT = "login_reconnet_event";
    LoginEvent.LOGIN_OUTLINE_RECONNET_EVENT = "login_outline_reconnet_event";
    LoginEvent.LOGIN_ENTER_EVENT = "login_enter_event";
    return LoginEvent;
}(BaseEvent));
//# sourceMappingURL=LoginEvent.js.map