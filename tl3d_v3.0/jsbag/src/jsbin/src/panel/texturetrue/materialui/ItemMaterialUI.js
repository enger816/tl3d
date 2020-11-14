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
    var EventDispatcher = Pan3d.EventDispatcher;
    var BaseEvent = Pan3d.BaseEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Vector2D = Pan3d.Vector2D;
    var ItemMaterialUI = /** @class */ (function (_super) {
        __extends(ItemMaterialUI, _super);
        function ItemMaterialUI(name, $type, $inOut) {
            if ($inOut === void 0) { $inOut = true; }
            var _this = _super.call(this) || this;
            _this.outLineList = new Array;
            _this.titleLabeltext = name;
            _this.inOut = $inOut;
            if (_this.inOut) {
                _this.nodeTreeItem = new materialui.NodeTreeInputItem;
            }
            else {
                _this.nodeTreeItem = new materialui.NodeTreeOutoutItem;
            }
            _this.nodeTreeItem.name = name;
            _this.typets = $type;
            _this.drawSp();
            return _this;
        }
        ItemMaterialUI.prototype.removeOut = function ($line) {
            for (var i = 0; i < this.outLineList.length; i++) {
                if (this.outLineList[i] == $line) {
                    this.outLineList.splice(i, 1);
                    break;
                }
            }
            if (!this.inOut && this.outLineList.length == 0) {
                this.hasConnet = false;
                this.dispatchEvent(new BaseEvent("DisConnect"));
            }
        };
        ItemMaterialUI.prototype.removeIn = function () {
            this._inLine = null;
            if (this.inOut) {
                this.hasConnet = false;
                this.dispatchEvent(new BaseEvent("DisConnect"));
            }
        };
        ItemMaterialUI.prototype.setConnect = function () {
            this.hasConnet = true;
            this.dispatchEvent(new BaseEvent("Connect"));
        };
        ItemMaterialUI.prototype.removeAllLine = function () {
            var evt;
            for (var i = this.outLineList.length - 1; i >= 0; i--) {
                evt = new materialui.MEvent_Material_Connect(materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE);
                evt.line = this.outLineList[i];
                ModuleEventManager.dispatchEvent(evt);
            }
            if (this._inLine) {
                evt = new materialui.MEvent_Material_Connect(materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE);
                evt.line = this._inLine;
                ModuleEventManager.dispatchEvent(evt);
            }
        };
        Object.defineProperty(ItemMaterialUI.prototype, "typets", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
                this.nodeTreeItem.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemMaterialUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.pointframe.x = this._x;
                if (this.inOut) {
                    this.labelframe.x = this._x + 20;
                }
                else {
                    this.labelframe.x = this._x - 80;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemMaterialUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.pointframe.y = this._y;
                this.labelframe.y = this._y - 2;
            },
            enumerable: true,
            configurable: true
        });
        ItemMaterialUI.prototype.getStagePoint = function () {
            return new Vector2D(this.pointframe.x + this.pointframe.parent.left + 10, this.pointframe.y + this.pointframe.parent.top + 10);
        };
        ItemMaterialUI.prototype.changeType = function ($type) {
            this.typets = $type;
            this.drawSp();
        };
        ItemMaterialUI.prototype.drawSp = function () {
            if (this.pointframe) {
                if (this._type == materialui.MaterialItemType.FLOAT) {
                    this.pointframe.goToAndStop(2);
                }
                else if (this._type == materialui.MaterialItemType.VEC2) {
                    this.pointframe.goToAndStop(3);
                }
                else if (this._type == materialui.MaterialItemType.VEC3) {
                    this.pointframe.goToAndStop(0);
                }
                else if (this._type == materialui.MaterialItemType.VEC4) {
                    this.pointframe.goToAndStop(1);
                }
                else if (this._type == materialui.MaterialItemType.UNDEFINE) {
                    this.pointframe.goToAndStop(4);
                }
            }
        };
        Object.defineProperty(ItemMaterialUI.prototype, "inLine", {
            get: function () {
                return this._inLine;
            },
            set: function (value) {
                this._inLine = value;
                //NodeTreeInputItem(nodeTreeItem) = _inLine.fromNode.nodeTreeItem;
            },
            enumerable: true,
            configurable: true
        });
        ItemMaterialUI.prototype.drawLine = function () {
            for (var i = 0; i < this.outLineList.length; i++) {
                this.outLineList[i].draw();
            }
            if (this._inLine) {
                this._inLine.draw();
            }
        };
        return ItemMaterialUI;
    }(EventDispatcher));
    materialui.ItemMaterialUI = ItemMaterialUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=ItemMaterialUI.js.map