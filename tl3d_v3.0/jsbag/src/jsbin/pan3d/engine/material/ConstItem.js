/**
*
*
* pramaType 0 表示无类型 1表示 float 2表示 vec2 3表示vec3
*/
var Pan3d;
(function (Pan3d) {
    var ConstItem = /** @class */ (function () {
        function ConstItem() {
            this.value = new Pan3d.Vector3D;
            this.offset = 0;
        }
        Object.defineProperty(ConstItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
                this.name = "fc" + value;
                this.offset = value * 4;
            },
            enumerable: true,
            configurable: true
        });
        ConstItem.prototype.creat = function ($vc) {
            this.vecNum = $vc;
            this.vecNum[0 + this.offset] = this.value.x;
            this.vecNum[1 + this.offset] = this.value.y;
            this.vecNum[2 + this.offset] = this.value.z;
            this.vecNum[3 + this.offset] = this.value.w;
        };
        ConstItem.prototype.setData = function (obj) {
            this.id = obj.id;
            this.value = new Pan3d.Vector3D(obj.value.x, obj.value.y, obj.value.z, obj.value.w);
            this.paramName0 = obj.paramName0;
            this.param0Type = obj.param0Type;
            this.param0Index = obj.param0Index;
            this.paramName1 = obj.paramName1;
            this.param1Type = obj.param1Type;
            this.param1Index = obj.param1Index;
            this.paramName2 = obj.paramName2;
            this.param2Type = obj.param2Type;
            this.param2Index = obj.param2Index;
            this.paramName3 = obj.paramName3;
            this.param3Type = obj.param3Type;
            this.param3Index = obj.param3Index;
        };
        ConstItem.prototype.setDynamicOffset = function ($dynamic) {
            if (this.paramName0 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param0Index + this.offset;
            }
            else if (this.paramName1 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param1Index + this.offset;
            }
            else if (this.paramName2 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param2Index + this.offset;
            }
            else if (this.paramName3 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param3Index + this.offset;
            }
        };
        ConstItem.prototype.setDynamicDirect = function ($ary, $offset) {
            this.vecNum.set($ary, $offset);
        };
        ConstItem.prototype.setDynamic = function ($dynamic) {
            try {
                this.vecNum.set($dynamic.currentValue, $dynamic.targetOffset);
            }
            catch (err) {
                //console.log("在此处理错误2");
            }
            /**
            if (this.paramName0 == $dynamic.paramName) {
                if (this.param0Type == 1) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param0Type == 2) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param0Type == 3) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param0Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param0Type == 4) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param0Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param0Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
            } else if (this.paramName1 == $dynamic.paramName) {
                if (this.param1Type == 1) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param1Type == 2) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param1Type == 3) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param1Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param1Type == 4) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param1Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param1Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
            } else if (this.paramName2 == $dynamic.paramName) {
                if (this.param2Type == 1) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param2Type == 2) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param2Type == 3) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param2Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param2Type == 4) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param2Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param2Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
            } else if (this.paramName3 == $dynamic.paramName) {
                if (this.param3Type == 1) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param3Type == 2) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param3Type == 3) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param3Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param3Type == 4) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param3Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param3Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
    
            }
             */
        };
        return ConstItem;
    }());
    Pan3d.ConstItem = ConstItem;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ConstItem.js.map