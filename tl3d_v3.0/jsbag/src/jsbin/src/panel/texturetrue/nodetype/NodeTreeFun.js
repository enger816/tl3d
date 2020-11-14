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
    var DataMathFunNode = /** @class */ (function () {
        function DataMathFunNode($name, $type) {
            this.name = $name;
            this.type = $type;
        }
        return DataMathFunNode;
    }());
    materialui.DataMathFunNode = DataMathFunNode;
    var NodeTreeFun = /** @class */ (function (_super) {
        __extends(NodeTreeFun, _super);
        function NodeTreeFun() {
            return _super.call(this) || this;
        }
        NodeTreeFun.isNeedChangePanel = function ($a, $b) {
            var sortID = $a.split(materialui.CompileTwo.LN)[0].indexOf($b.split(materialui.CompileTwo.LN)[0]);
            return sortID == -1;
        };
        NodeTreeFun.getMathFunName = function ($agalStr) {
            var $tittlestr = $agalStr.split(materialui.CompileTwo.LN)[0];
            var $funName = $tittlestr.split(materialui.CompileTwo.SPACE)[1].split(materialui.CompileTwo.LEFT_PARENTH)[0]; //函数名
            return $funName;
        };
        NodeTreeFun.getMathFunReturnType = function ($agalStr) {
            var $tittlestr = $agalStr.split(materialui.CompileTwo.LN)[0];
            var $returnType = $tittlestr.split(materialui.CompileTwo.SPACE)[0]; //返回类型
            return $returnType;
        };
        NodeTreeFun.getDataMathFunArr = function ($agalStr) {
            var $tittlestr = $agalStr.split(materialui.CompileTwo.LN)[0];
            var left = $tittlestr.indexOf(materialui.CompileTwo.LEFT_PARENTH);
            var right = $tittlestr.indexOf(materialui.CompileTwo.RIGHT_PARENTH);
            var $kv = $tittlestr.substring(left + 1, right).split(materialui.CompileTwo.COMMA);
            var $arr = new Array();
            ;
            for (var i = 0; i < $kv.length; i++) {
                if ($kv[i].split(materialui.CompileTwo.LN).length != 2) {
                    var atype = $kv[i].split(materialui.CompileTwo.SPACE)[0];
                    var aname = $kv[i].split(materialui.CompileTwo.SPACE)[1];
                    // console.log(atype, aname);
                    $arr.push(new DataMathFunNode(aname, atype));
                }
                else {
                    console.log("有错");
                }
            }
            return $arr;
        };
        return NodeTreeFun;
    }(materialui.NodeTreeDynamic));
    materialui.NodeTreeFun = NodeTreeFun;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeFun.js.map