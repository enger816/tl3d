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
var prop;
(function (prop) {
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var MathFunMeshPanel = /** @class */ (function (_super) {
        __extends(MathFunMeshPanel, _super);
        function MathFunMeshPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MathFunMeshPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.TEXT, Label: "名字:", FunKey: "tittleStr", target: this, Category: "函数" },
                { Type: prop.ReflectionData.MaterialFunContentUI, Label: "窗口:", FunKey: "nodeUI", target: this, Category: "程序" },
            ];
            return ary;
        };
        Object.defineProperty(MathFunMeshPanel.prototype, "tittleStr", {
            get: function () {
                return this.mathFunNodeUI.tittleStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathFunMeshPanel.prototype, "data", {
            get: function () {
                console.log(this.mathFunNodeUI);
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.mathFunNodeUI = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        MathFunMeshPanel.prototype.changeFile = function (evt) {
            /*
            if (materialui.NodeTreeFun.isNeedChangePanel($agalStr, (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr)) {
                this.mathFunNodeUI.inPutFunStr($agalStr)
            } else {
                (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr = $agalStr
                this.changeData();
            }
            */
        };
        MathFunMeshPanel.prototype.destory = function () {
            _super.prototype.destory.call(this);
        };
        Object.defineProperty(MathFunMeshPanel.prototype, "nodeUI", {
            get: function () {
                return this.mathFunNodeUI;
            },
            set: function (value) {
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        MathFunMeshPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return MathFunMeshPanel;
    }(prop.MetaDataView));
    prop.MathFunMeshPanel = MathFunMeshPanel;
})(prop || (prop = {}));
//# sourceMappingURL=MathFunMeshPanel.js.map