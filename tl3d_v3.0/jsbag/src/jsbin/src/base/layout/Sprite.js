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
var win;
(function (win) {
    var Rectangle = Pan3d.Rectangle;
    var Sprite = /** @class */ (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            var _this = _super.call(this) || this;
            _this.rect = new Rectangle(0, 0, 250, 250);
            _this.children = [];
            return _this;
        }
        Object.defineProperty(Sprite.prototype, "rect", {
            get: function () {
                return this._rect;
            },
            set: function (value) {
                this._rect = value;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.onAdd = function () { };
        Sprite.prototype.onRemove = function () { };
        Sprite.prototype.addChild = function (value) {
            value.perent = this;
            value.onAdd();
            this.children.push(value);
        };
        Sprite.prototype.removeChild = function (value) {
            var idx = this.children.indexOf(value);
            if (idx != -1) {
                value.onRemove();
                this.children.splice(idx, 1);
            }
        };
        Sprite.prototype.update = function () {
            _super.prototype.update.call(this);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].update();
            }
        };
        Sprite.prototype.resize = function () {
            _super.prototype.resize.call(this);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].resize();
            }
        };
        Object.defineProperty(Sprite.prototype, "x", {
            get: function () {
                return this.rect.x;
            },
            set: function (value) {
                this.rect.x = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "y", {
            get: function () {
                return this.rect.y;
            },
            set: function (value) {
                this.rect.y = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "width", {
            get: function () {
                return this.rect.width;
            },
            set: function (value) {
                this.rect.width = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "height", {
            get: function () {
                return this.rect.height;
            },
            set: function (value) {
                this.rect.height = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.getObjectsUnderPoint = function (evt) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var temp = this.children[i].getObjectsUnderPoint(evt);
                if (temp) {
                    return temp;
                }
            }
            for (var j = this.uiList.length - 1; j >= 0; j--) {
                if (this.uiList[j]) {
                    if (this.uiList[j] && this.uiList[j].insetUi(evt)) {
                        return this.uiList[j].insetUi(evt);
                    }
                }
            }
            return null;
        };
        Sprite.prototype.mouseEvetData = function (evt, point) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var temp = this.children[i].mouseEvetData(evt, point);
                if (temp) {
                    return temp;
                }
            }
            return _super.prototype.mouseEvetData.call(this, evt, point);
        };
        Sprite.prototype.changeSize = function () {
        };
        return Sprite;
    }(win.LayUIManager));
    win.Sprite = Sprite;
})(win || (win = {}));
//# sourceMappingURL=Sprite.js.map