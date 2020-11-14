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
var Pan3d;
(function (Pan3d) {
    var UICompenent = /** @class */ (function (_super) {
        __extends(UICompenent, _super);
        function UICompenent() {
            var _this = _super.call(this) || this;
            //设定相对坐标
            _this._x = 0;
            _this._y = 0;
            _this._width = 0;
            _this._height = 0;
            _this.z = 0;
            //设定绝对坐标
            _this.absoluteX = 0;
            _this.absoluteY = 0;
            _this.absoluteWidth = 0;
            _this.absoluteHeight = 0;
            _this.enable = true;
            _this._left = 0;
            _this._right = 0;
            _this._center = 0;
            _this._xType = -1;
            _this._top = 0;
            _this._bottom = 0;
            _this._middle = 0;
            _this._yType = -1;
            //实际渲染坐标
            _this.renderX = 0;
            _this.renderY = 0;
            _this.renderWidth = 0;
            _this.renderHeight = 0;
            _this.scale = 1;
            _this.isVirtual = false;
            _this.vcId = 0;
            _this._uvScale = 1; // UV显示比例
            _this._rendering = false;
            _this.isU = false;
            _this.isV = false;
            _this.tr = new Pan3d.Rectangle;
            _this.mouseEnable = true;
            return _this;
        }
        Object.defineProperty(UICompenent.prototype, "rendering", {
            get: function () {
                return this._rendering;
            },
            set: function (val) {
                this._rendering = val;
            },
            enumerable: true,
            configurable: true
        });
        UICompenent.prototype.addStage = function () {
            this.renderData = [0, 0, 0, 0];
            this.renderData2 = [1, 1, 0, 0];
            this.applyAbsolutePoint();
            this.uiRender.addRenderUI(this);
        };
        UICompenent.prototype.removeStage = function () {
            this.uiRender.removeRenderUI(this);
        };
        UICompenent.prototype.pushVaData = function (objData, i, beginIndex) {
            objData.vertices.push(0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0);
            objData.uvs.push(this.isU ? 1 : 0, this.isV ? 1 : 0, i, this.isU ? 0 : 1, this.isV ? 1 : 0, i, this.isU ? 0 : 1, this.isV ? 0 : 1, i, this.isU ? 1 : 0, this.isV ? 0 : 1, i);
            objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);
            return beginIndex + 4;
            /*
            objData.vertices.push(
                0, 0, 0,
                1, 0, 0,
                1, -1, 0,
                0, -1, 0);
            objData.uvs.push(
                0, 0, i,
                1, 0, i,
                1, 1, i,
                0, 1, i);
            objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);
            return beginIndex + 4;
            */
        };
        UICompenent.prototype.setVc = function (program, index) {
            Pan3d.Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Pan3d.Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
        };
        UICompenent.prototype.update = function () {
        };
        UICompenent.prototype.applyRenderSize = function () {
            if (!this.parent) {
                return;
            }
            this.renderX = this.absoluteX / Pan3d.Scene_data.stageWidth;
            this.renderY = this.absoluteY / Pan3d.Scene_data.stageHeight;
            this.renderWidth = this.absoluteWidth / Pan3d.Scene_data.stageWidth;
            this.renderHeight = this.absoluteHeight / Pan3d.Scene_data.stageHeight;
            if (this._uvScale >= 0) {
                //this.renderX + this.renderWidth * this.scale - this.renderWidth * this.scale * this._uvScale;
                this.renderData[0] = this.renderX;
                this.renderData[1] = this.renderY;
                this.renderData[2] = this.renderWidth * this.scale * this._uvScale;
                this.renderData[3] = this.renderHeight * this.scale;
                //this.tr.x +this.tr.width - this.tr.width * this._uvScale
                this.renderData2[0] = this.tr.width * this._uvScale;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x;
                this.renderData2[3] = this.tr.y;
            }
            else {
                var $vt = Math.abs(this._uvScale);
                this.renderData[0] = this.renderX + this.renderWidth * (1 - $vt);
                this.renderData[1] = this.renderY;
                this.renderData[2] = this.renderWidth * this.scale * $vt;
                this.renderData[3] = this.renderHeight * this.scale;
                this.renderData2[0] = this.tr.width * $vt;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x + (this.tr.width * (1 - $vt));
                this.renderData2[3] = this.tr.y;
            }
            this.uiRender.makeRenderDataVc(this.vcId);
            // 
        };
        Object.defineProperty(UICompenent.prototype, "uvScale", {
            get: function () {
                return this._uvScale;
            },
            set: function (value) {
                this._uvScale = value;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        UICompenent.prototype.setScale = function (num) {
            this.scale = num;
            this.applyAbsolutePoint();
        };
        UICompenent.prototype.applyAbsolutePoint = function () {
            if (this.parent) {
                var uiscale = Pan3d.UIData.Scale * this.parent.uiScale;
                if (this._xType == -1) {
                    this.absoluteX = this._x * uiscale * this.scale + this.parent.x;
                }
                else if (this._xType == 0) {
                    this.absoluteX = this._left * uiscale;
                }
                else if (this._xType == 1) {
                    this.absoluteX = Pan3d.Scene_data.stageWidth - this._right * uiscale - this.width * uiscale;
                }
                else if (this._xType == 2) {
                    this.absoluteX = this._center * uiscale + Pan3d.Scene_data.stageWidth / 2 - this.width * uiscale / 2;
                }
                if (this._yType == -1) {
                    this.absoluteY = this._y * uiscale * this.scale + this.parent.y;
                }
                else if (this._yType == 0) {
                    this.absoluteY = this._top * uiscale;
                }
                else if (this._yType == 1) {
                    this.absoluteY = Pan3d.Scene_data.stageHeight - this._bottom * uiscale - this.height * uiscale;
                }
                else if (this._yType == 2) {
                    this.absoluteY = this._middle * uiscale + Pan3d.Scene_data.stageHeight / 2 - this.height * uiscale / 2;
                }
                this.absoluteWidth = this.width * uiscale;
                this.absoluteHeight = this.height * uiscale;
                this.applyRenderSize();
            }
        };
        Object.defineProperty(UICompenent.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                if (value != this._x) {
                    this._x = value;
                    this.applyAbsolutePoint();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                if (value != this._y) {
                    this._y = value;
                    this.applyAbsolutePoint();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                if (value != this._width) {
                    this._width = value;
                    this.applyAbsolutePoint();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                if (value != this._height) {
                    this._height = value;
                    this.applyAbsolutePoint();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "left", {
            set: function (value) {
                this._left = value;
                this._xType = 0;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "right", {
            set: function (value) {
                this._right = value;
                this._xType = 1;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "center", {
            set: function (value) {
                this._center = value;
                this._xType = 2;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "top", {
            set: function (value) {
                this._top = value;
                this._yType = 0;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "bottom", {
            set: function (value) {
                this._bottom = value;
                this._yType = 1;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICompenent.prototype, "middle", {
            set: function (value) {
                this._middle = value;
                this._yType = 2;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        UICompenent.prototype.testPoint = function ($x, $y) {
            if ($x > this.absoluteX && $x < (this.absoluteX + this.absoluteWidth) && $y > this.absoluteY && $y < (this.absoluteY + this.absoluteHeight)) {
                return true;
            }
            else {
                return false;
            }
        };
        UICompenent.prototype.setPos = function ($x, $y) {
            this.x = $x;
            this.y = $y;
        };
        UICompenent.prototype.interactiveEvent = function (e) {
            if (!this.enable) {
                return false;
            }
            var evtType = e.type;
            var eventMap = this._eventsMap;
            if (!eventMap) {
                return false;
            }
            var list = eventMap[e.type];
            if (!list) {
                return false;
            }
            if (!this.testPoint(e.x, e.y)) {
                return false;
            }
            var length = list.length;
            if (length == 0) {
                return false;
            }
            e.target = this;
            //for (var i: number = 0; i < length; i++) {
            //    var eventBin: any = list[i];
            //    eventBin.listener.call(eventBin.thisObject, e);
            //}
            for (var i = length - 1; i >= 0; i--) {
                var eventBin = list[i];
                //console.log("uiname", this.name)
                eventBin.listener.call(eventBin.thisObject, e);
            }
            return true;
        };
        UICompenent.prototype.preShow = function () {
            if (this.preParent) {
                this.preParent.addChild(this);
            }
        };
        UICompenent.prototype.preHide = function () {
            if (this.preParent) {
                this.preParent.removeChild(this);
            }
        };
        return UICompenent;
    }(Pan3d.EventDispatcher));
    Pan3d.UICompenent = UICompenent;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UICompenent.js.map