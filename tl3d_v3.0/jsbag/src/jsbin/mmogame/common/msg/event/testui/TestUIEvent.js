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
var TestUIEvent = /** @class */ (function (_super) {
    __extends(TestUIEvent, _super);
    function TestUIEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestUIEvent.CREAT_TESTUI_EVENT = "creat_testui_event";
    TestUIEvent.ADD_TESTUI_EVENT = "add_testui_event";
    TestUIEvent.HIDE_TESTUI_EVENT = "hide_testui_event";
    return TestUIEvent;
}(BaseEvent));
//# sourceMappingURL=TestUIEvent.js.map