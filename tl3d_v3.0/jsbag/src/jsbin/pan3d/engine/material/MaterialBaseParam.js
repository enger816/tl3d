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
    var MaterialBaseParam = /** @class */ (function (_super) {
        __extends(MaterialBaseParam, _super);
        function MaterialBaseParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialBaseParam.prototype.destory = function () {
            for (var i = 0; i < this.dynamicTexList.length; i++) {
                this.dynamicTexList[i].destory();
            }
            this.dynamicTexList = null;
            this.dynamicConstList = null;
        };
        MaterialBaseParam.prototype.update = function () {
            if (this.material && this.dynamicConstList) {
                for (var i = 0; i < this.dynamicConstList.length; i++) {
                    this.dynamicConstList[i].update();
                }
            }
        };
        MaterialBaseParam.prototype.setData = function ($material, $ary) {
            this.material = $material;
            this.dynamicConstList = new Array;
            this.dynamicTexList = new Array;
            var constList = $material.constList;
            var texList = $material.texList;
            for (var i = 0; i < $ary.length; i++) {
                var obj = $ary[i];
                if (obj.type == 0) {
                    var texItem = new Pan3d.DynamicBaseTexItem();
                    texItem.paramName = obj.name;
                    for (var j = 0; j < texList.length; j++) {
                        if (texItem.paramName == texList[j].paramName) {
                            texItem.target = texList[j];
                            break;
                        }
                    }
                    var mipmap = 0;
                    if (texItem.target) {
                        mipmap = texItem.target.mipmap;
                    }
                    mipmap = 0;
                    Pan3d.TextureManager.getInstance().getTexture(Pan3d.Scene_data.fileRoot + obj.url, function ($textres) {
                        texItem.textureRes = $textres;
                    }, 0, null, 0, mipmap);
                    this.dynamicTexList.push(texItem);
                }
                else {
                    var targetName = obj.name;
                    var target = null;
                    for (var j = 0; j < constList.length; j++) {
                        if (targetName == constList[j].paramName0
                            || targetName == constList[j].paramName1
                            || targetName == constList[j].paramName2
                            || targetName == constList[j].paramName3) {
                            target = constList[j];
                            break;
                        }
                    }
                    var constItem = new Pan3d.DynamicBaseConstItem();
                    constItem.setTargetInfo(target, targetName, obj.type);
                    if (obj.type == 1) {
                        constItem.setCurrentVal(obj.x);
                    }
                    else if (obj.type == 2) {
                        constItem.setCurrentVal(obj.x, obj.y);
                    }
                    else {
                        constItem.setCurrentVal(obj.x, obj.y, obj.z);
                    }
                    this.dynamicConstList.push(constItem);
                }
            }
        };
        return MaterialBaseParam;
    }(Pan3d.GC));
    Pan3d.MaterialBaseParam = MaterialBaseParam;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MaterialBaseParam.js.map