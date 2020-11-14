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
var maineditor;
(function (maineditor) {
    var HierarchyNodeType = /** @class */ (function () {
        function HierarchyNodeType() {
        }
        HierarchyNodeType.Folder = 0;
        HierarchyNodeType.Prefab = 1;
        HierarchyNodeType.Light = 2;
        HierarchyNodeType.Water = 3;
        HierarchyNodeType.Grass = 4;
        HierarchyNodeType.Capture = 5;
        HierarchyNodeType.Build = 6;
        HierarchyNodeType.Reflection = 7;
        HierarchyNodeType.LightProbe = 8;
        HierarchyNodeType.ParallelLight = 9;
        HierarchyNodeType.Particle = 11;
        HierarchyNodeType.Role = 12;
        HierarchyNodeType.SKILL = 13;
        HierarchyNodeType.Ground = 14;
        return HierarchyNodeType;
    }());
    maineditor.HierarchyNodeType = HierarchyNodeType;
    var HierarchyFileNode = /** @class */ (function (_super) {
        __extends(HierarchyFileNode, _super);
        function HierarchyFileNode() {
            return _super.call(this) || this;
        }
        return HierarchyFileNode;
    }(maineditor.FileNode));
    maineditor.HierarchyFileNode = HierarchyFileNode;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=HierarchyFileNode.js.map