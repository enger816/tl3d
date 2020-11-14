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
var materialui;
(function (materialui) {
    var BaseEvent = Pan3d.BaseEvent;
    var MEvent_Material_Connect = /** @class */ (function (_super) {
        __extends(MEvent_Material_Connect, _super);
        function MEvent_Material_Connect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STARTDRAG = "MEvent_Material_Connect_startDrag";
        MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STOPDRAG = "MEvent_Material_Connect_stopDrag";
        MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE = "MEvent_Material_Connect_removeLine";
        MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_DOUBLUELINE = "MEvent_Material_Connect_doublueLine";
        return MEvent_Material_Connect;
    }(BaseEvent));
    materialui.MEvent_Material_Connect = MEvent_Material_Connect;
})(materialui || (materialui = {}));
//# sourceMappingURL=MEvent_Material_Connect.js.map