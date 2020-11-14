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
var EquipmentEvent = /** @class */ (function (_super) {
    __extends(EquipmentEvent, _super);
    function EquipmentEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EquipmentEvent.INIT_EQU_EVENT = "init_equ_event";
    EquipmentEvent.SHOW_EQU_EVENT = "show_equ_event";
    EquipmentEvent.HIDE_EQU_EVENT = "hide_equ_event";
    return EquipmentEvent;
}(BaseEvent));
//# sourceMappingURL=EquipmentEvent.js.map