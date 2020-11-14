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
    var MathDynamicNodeUI = /** @class */ (function (_super) {
        __extends(MathDynamicNodeUI, _super);
        function MathDynamicNodeUI() {
            var _this = _super.call(this) || this;
            _this.gap = 20;
            _this.width = 162;
            _this.height = 60;
            _this.resetBgSize();
            return _this;
        }
        MathDynamicNodeUI.prototype.initItem = function () {
            this.intAItem = new materialui.ItemMaterialUI("a", materialui.MaterialItemType.UNDEFINE);
            this.intBItem = new materialui.ItemMaterialUI("b", materialui.MaterialItemType.UNDEFINE);
            this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.UNDEFINE, false);
            this.outRItem = new materialui.ItemMaterialUI("r", materialui.MaterialItemType.FLOAT, false);
            this.outGItem = new materialui.ItemMaterialUI("g", materialui.MaterialItemType.FLOAT, false);
            this.outBItem = new materialui.ItemMaterialUI("b", materialui.MaterialItemType.FLOAT, false);
            this.outXYItem = new materialui.ItemMaterialUI("xy", materialui.MaterialItemType.VEC2, false);
            this.outRGBItem = new materialui.ItemMaterialUI("rgb", materialui.MaterialItemType.VEC3, false);
            this.outAItem = new materialui.ItemMaterialUI("a", materialui.MaterialItemType.FLOAT, false);
            this.addItems(this.intAItem);
            this.addItems(this.intBItem);
            this.addItems(this.outItem);
            this.addEvents(this.intAItem);
            this.addEvents(this.intBItem);
            this.addEvents(this.outItem);
            this.addDisEvent(this.intAItem);
            this.addDisEvent(this.intBItem);
            this.addDisEvent(this.outItem);
            this.addDisEvent(this.outRItem);
            this.addDisEvent(this.outGItem);
            this.addDisEvent(this.outBItem);
            this.addDisEvent(this.outXYItem);
            this.addDisEvent(this.outRGBItem);
            this.addDisEvent(this.outAItem);
        };
        MathDynamicNodeUI.prototype.addEvents = function ($nodeUI) {
            $nodeUI.addEventListener("Connect", this.onConnect, this);
        };
        MathDynamicNodeUI.prototype.addDisEvent = function ($nodeUI) {
            $nodeUI.addEventListener("DisConnect", this.disConnect, this);
        };
        MathDynamicNodeUI.prototype.disConnect = function (event) {
            this.checkItem();
        };
        MathDynamicNodeUI.prototype.onConnect = function (event) {
            var target = event.target;
            var typets = target.typets;
            target.changeType(typets);
            this.checkItem();
            if (this.intAItem.typets != materialui.MaterialItemType.UNDEFINE && this.intBItem.typets != materialui.MaterialItemType.UNDEFINE) {
                if (this.intAItem.typets != materialui.MaterialItemType.FLOAT && this.intBItem.typets != materialui.MaterialItemType.FLOAT) {
                    if (this.intAItem.typets != this.intBItem.typets) {
                        target.removeAllLine();
                    }
                }
            }
        };
        MathDynamicNodeUI.prototype.checkItem = function () {
            if (!this.intAItem.hasConnet) {
                this.intAItem.changeType(materialui.MaterialItemType.UNDEFINE);
            }
            if (!this.intBItem.hasConnet) {
                this.intBItem.changeType(materialui.MaterialItemType.UNDEFINE);
            }
            if (!this.outItem.hasConnet) {
                this.outItem.changeType(materialui.MaterialItemType.UNDEFINE);
            }
            if (this.outItem.typets == materialui.MaterialItemType.VEC3) {
                if (this.intAItem.typets == materialui.MaterialItemType.FLOAT) {
                    if (this.intBItem.typets == materialui.MaterialItemType.UNDEFINE) {
                        this.intBItem.changeType(materialui.MaterialItemType.VEC3);
                    }
                }
                if (this.intBItem.typets == materialui.MaterialItemType.FLOAT) {
                    if (this.intAItem.typets == materialui.MaterialItemType.UNDEFINE) {
                        this.intAItem.changeType(materialui.MaterialItemType.VEC3);
                    }
                }
            }
            else if (this.outItem.typets == materialui.MaterialItemType.VEC4) {
                if (this.intAItem.typets == materialui.MaterialItemType.FLOAT) {
                    if (this.intBItem.typets == materialui.MaterialItemType.UNDEFINE) {
                        this.intBItem.changeType(materialui.MaterialItemType.VEC4);
                    }
                }
                if (this.intBItem.typets == materialui.MaterialItemType.FLOAT) {
                    if (this.intAItem.typets == materialui.MaterialItemType.UNDEFINE) {
                        this.intAItem.changeType(materialui.MaterialItemType.VEC4);
                    }
                }
            }
            else if (this.outItem.typets == materialui.MaterialItemType.VEC2) {
                if (this.intAItem.typets == materialui.MaterialItemType.FLOAT) {
                    if (this.intBItem.typets == materialui.MaterialItemType.UNDEFINE) {
                        this.intBItem.changeType(materialui.MaterialItemType.VEC2);
                    }
                }
                if (this.intBItem.typets == materialui.MaterialItemType.FLOAT) {
                    if (this.intAItem.typets == materialui.MaterialItemType.UNDEFINE) {
                        this.intAItem.changeType(materialui.MaterialItemType.VEC2);
                    }
                }
            }
            else if (this.outItem.typets == materialui.MaterialItemType.FLOAT) {
                if (this.intAItem.typets == materialui.MaterialItemType.UNDEFINE) {
                    this.intAItem.changeType(materialui.MaterialItemType.FLOAT);
                }
                if (this.intBItem.typets == materialui.MaterialItemType.UNDEFINE) {
                    this.intBItem.changeType(materialui.MaterialItemType.FLOAT);
                }
            }
            else if (this.outItem.typets == materialui.MaterialItemType.UNDEFINE) {
                if (this.intAItem.typets == materialui.MaterialItemType.VEC4 || this.intBItem.typets == materialui.MaterialItemType.VEC4) {
                    this.outItem.changeType(materialui.MaterialItemType.VEC4);
                }
                else if (this.intAItem.typets == materialui.MaterialItemType.VEC3 || this.intBItem.typets == materialui.MaterialItemType.VEC3) {
                    this.outItem.changeType(materialui.MaterialItemType.VEC3);
                }
                else if (this.intAItem.typets == materialui.MaterialItemType.VEC2 || this.intBItem.typets == materialui.MaterialItemType.VEC2) {
                    this.outItem.changeType(materialui.MaterialItemType.VEC2);
                }
                else if (this.intAItem.typets == materialui.MaterialItemType.FLOAT && this.intBItem.typets == materialui.MaterialItemType.FLOAT) {
                    this.outItem.changeType(materialui.MaterialItemType.FLOAT);
                }
            }
            if (this.outItem.typets == materialui.MaterialItemType.VEC4) {
                this.addItems(this.outRItem);
                this.addItems(this.outGItem);
                this.addItems(this.outBItem);
                this.addItems(this.outXYItem);
                this.addItems(this.outRGBItem);
                this.addItems(this.outAItem);
                this.height = 180;
            }
            else if (this.outItem.typets == materialui.MaterialItemType.VEC3) {
                this.addItems(this.outRItem);
                this.addItems(this.outGItem);
                this.addItems(this.outBItem);
                this.addItems(this.outXYItem);
                this.height = 140;
                this.removeItem(this.outRGBItem);
                this.outRGBItem.removeAllLine();
                this.removeItem(this.outAItem);
                this.outAItem.removeAllLine();
            }
            else {
                this.removeItem(this.outRItem);
                this.outRItem.removeAllLine();
                this.removeItem(this.outGItem);
                this.outGItem.removeAllLine();
                this.removeItem(this.outBItem);
                this.outBItem.removeAllLine();
                this.removeItem(this.outXYItem);
                this.outXYItem.removeAllLine();
                this.removeItem(this.outRGBItem);
                this.outRGBItem.removeAllLine();
                this.removeItem(this.outAItem);
                this.outAItem.removeAllLine();
                this.height = 80;
            }
            this.resetBgSize();
        };
        MathDynamicNodeUI.prototype.setInItemByData = function (ary) {
            _super.prototype.setInItemByData.call(this, ary);
            this.intAItem.changeType(ary[0].type);
            this.intBItem.changeType(ary[1].type);
        };
        MathDynamicNodeUI.prototype.setOutItemByData = function (ary) {
            _super.prototype.setOutItemByData.call(this, ary);
            this.outItem.changeType(ary[0].type);
            if (ary.length >= 2) {
                this.addItems(this.outRItem);
                this.addItems(this.outGItem);
                this.addItems(this.outBItem);
                this.addItems(this.outXYItem);
            }
            if (ary.length >= 6) {
                this.addItems(this.outRGBItem);
                this.addItems(this.outAItem);
            }
        };
        return MathDynamicNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.MathDynamicNodeUI = MathDynamicNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MathDynamicNodeUI.js.map