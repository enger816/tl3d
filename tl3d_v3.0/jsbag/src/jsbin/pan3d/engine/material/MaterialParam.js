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
    var MaterialParam = /** @class */ (function (_super) {
        __extends(MaterialParam, _super);
        //public dynamicTexList:Array<DynamicTexItem>;
        //public dynamicConstList:Array<DynamicConstItem>;
        function MaterialParam() {
            return _super.call(this) || this;
        }
        MaterialParam.prototype.destory = function () {
            //this.material.useNum--;
            this.material.useNum--;
            this.shader.useNum--;
            // if(this.material.url.indexOf("m_ef_ver_byte.txt") != -1){
            //     //console.log("bbbbbbbbbbbbbbbbbbb",this.material.useNum)
            // }
            //for (var i: number = 0; i < this.dynamicTexList.length; i++){
            //    this.dynamicTexList[i].destory();
            //}
            //this.dynamicTexList = null;
            //this.dynamicConstList = null;
            _super.prototype.destory.call(this);
        };
        MaterialParam.prototype.setMaterial = function ($materialTree) {
            this.material = $materialTree;
            this.materialUrl = $materialTree.url;
            this.dynamicTexList = new Array;
            this.dynamicConstList = new Array;
            this.setTexList();
            this.setConstList();
        };
        MaterialParam.prototype.setLife = function ($life) {
            for (var i = 0; i < this.dynamicTexList.length; i++) {
                if (this.dynamicTexList[i].isParticleColor) {
                    this.dynamicTexList[i].life = $life;
                }
            }
        };
        MaterialParam.prototype.setTexList = function () {
            var texList = this.material.texList;
            for (var i = 0; i < texList.length; i++) {
                var dyTex;
                if (texList[i].isParticleColor) {
                    dyTex = new Pan3d.DynamicTexItem;
                    dyTex.target = texList[i];
                    dyTex.paramName = texList[i].paramName;
                    dyTex.initCurve(4);
                    this.dynamicTexList.push(dyTex);
                    dyTex.isParticleColor = true;
                }
                else if (texList[i].isDynamic) {
                    dyTex = new Pan3d.DynamicTexItem;
                    dyTex.target = texList[i];
                    dyTex.paramName = texList[i].paramName;
                    this.dynamicTexList.push(dyTex);
                }
            }
        };
        MaterialParam.prototype.setConstList = function () {
            var constList = this.material.constList;
            for (var i = 0; i < constList.length; i++) {
                var constItem = constList[i];
                var dyCon;
                if (constItem.param0Type != 0) {
                    dyCon = new Pan3d.DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName0;
                    // dyCon.type = constItem.param0Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName0, constItem.param0Type);
                    this.dynamicConstList.push(dyCon);
                }
                if (constItem.param1Type != 0) {
                    dyCon = new Pan3d.DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName1;
                    // dyCon.type = constItem.param1Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName1, constItem.param1Type);
                    this.dynamicConstList.push(dyCon);
                }
                if (constItem.param2Type != 0) {
                    dyCon = new Pan3d.DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName2;
                    // dyCon.type = constItem.param2Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName2, constItem.param2Type);
                    this.dynamicConstList.push(dyCon);
                }
                if (constItem.param3Type != 0) {
                    dyCon = new Pan3d.DynamicConstItem;
                    // dyCon.target = constItem;
                    // dyCon.paramName = constItem.paramName3;
                    // dyCon.type = constItem.param3Type;
                    dyCon.setTargetInfo(constItem, constItem.paramName3, constItem.param3Type);
                    this.dynamicConstList.push(dyCon);
                }
            }
        };
        MaterialParam.prototype.setTextObj = function (ary) {
            for (var i = 0; i < ary.length; i++) {
                var obj = ary[i];
                for (var j = 0; j < this.dynamicTexList.length; j++) {
                    if (this.dynamicTexList[j].paramName == obj.paramName) {
                        if (this.dynamicTexList[j].isParticleColor) {
                            this.dynamicTexList[j].curve.setData(obj.curve);
                        }
                        else {
                            this.dynamicTexList[j].url = obj.url;
                        }
                        break;
                    }
                }
            }
        };
        MaterialParam.prototype.setConstObj = function (ary) {
            for (var i = 0; i < ary.length; i++) {
                var obj = ary[i];
                for (var j = 0; j < this.dynamicConstList.length; j++) {
                    if (this.dynamicConstList[j].paramName == obj.paramName) {
                        this.dynamicConstList[j].curve.setData(obj.curve);
                        break;
                    }
                }
            }
        };
        return MaterialParam;
    }(Pan3d.MaterialBaseParam));
    Pan3d.MaterialParam = MaterialParam;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MaterialParam.js.map