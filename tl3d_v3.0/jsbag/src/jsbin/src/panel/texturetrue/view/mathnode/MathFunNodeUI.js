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
    var MathFunNodeUI = /** @class */ (function (_super) {
        __extends(MathFunNodeUI, _super);
        function MathFunNodeUI() {
            var _this = _super.call(this) || this;
            _this.left = 600;
            _this.top = 300;
            _this.nodeTree = new materialui.NodeTreeFun;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.FUN;
            _this.drawTitleToFrame("函数(Fun*)");
            _this.gap = 20;
            _this.width = 162;
            _this.height = 30;
            _this.resetBgSize();
            _this.inPutFunStr();
            return _this;
        }
        /*
        public onKeyDown($evt: KeyboardEvent): void {
            document.addEventListener(MouseType.KeyDown, ($evt: KeyboardEvent) => { this.onKeyDown($evt) })
            if ($evt.keyCode == KeyboardType.G) {
                var $agalStr: string = "vec3 ic(vec3 lightuv,float size){\n" +
                    "return lightuv*size;\n" +
                    "}\n";

                this.inPutFunStr($agalStr)
            }
        }
        */
        MathFunNodeUI.prototype.inPutFunStr = function ($baseStr) {
            if ($baseStr === void 0) { $baseStr = null; }
            var $agalStr = "vec3 die(vec3 lightuv,vec3 movePos){\n" +
                "return vec3(1,0,1);\n" +
                "}\n";
            if ($baseStr) {
                $agalStr = $baseStr;
            }
            var $funName = materialui.NodeTreeFun.getMathFunName($agalStr);
            var $returnType = materialui.NodeTreeFun.getMathFunReturnType($agalStr);
            var $arr = materialui.NodeTreeFun.getDataMathFunArr($agalStr);
            this.nodeTree.funStr = $agalStr;
            this.nodeTree.funName = $funName;
            this.clearNode();
            for (var i = 0; i < $arr.length; i++) {
                var $temp = new materialui.ItemMaterialUI($arr[i].name, $arr[i].type);
                this.addItems($temp);
                this.addEvents($temp);
                this.addDisEvent($temp);
            }
            this.outItem = new materialui.ItemMaterialUI("out", $returnType, false);
            this.addItems(this.outItem);
            this.addEvents(this.outItem);
            this.addDisEvent(this.outItem);
            this.resetBgSize();
            this.drawTitleToFrame("函数(" + $funName + ")");
        };
        MathFunNodeUI.prototype.clearNode = function () {
            this.removeAllNodeLine();
            while (this.inPutItemVec.length) {
                this.removeItem(this.inPutItemVec.pop());
            }
            while (this.outPutItemVec.length) {
                this.removeItem(this.outPutItemVec.pop());
            }
        };
        MathFunNodeUI.prototype.resetBgSize = function () {
            this.height = this.inPutItemVec.length * 30;
            _super.prototype.resetBgSize.call(this);
        };
        MathFunNodeUI.prototype.addEvents = function ($nodeUI) {
            $nodeUI.addEventListener("Connect", this.onConnect, this);
        };
        MathFunNodeUI.prototype.addDisEvent = function ($nodeUI) {
            $nodeUI.addEventListener("DisConnect", this.disConnect, this);
        };
        MathFunNodeUI.prototype.removeEvents = function ($nodeUI) {
            $nodeUI.removeEventListener("Connect", this.onConnect, this);
        };
        MathFunNodeUI.prototype.removeDisEvent = function ($nodeUI) {
            $nodeUI.removeEventListener("DisConnect", this.disConnect, this);
        };
        MathFunNodeUI.prototype.disConnect = function (event) {
            this.checkItem();
        };
        MathFunNodeUI.prototype.onConnect = function (event) {
            var target = event.target;
            var typets = target.typets;
            target.changeType(typets);
            this.checkItem();
        };
        MathFunNodeUI.prototype.checkItem = function () {
            // console.log("checkItem")
            this.resetBgSize();
        };
        MathFunNodeUI.prototype.setData = function (obj) {
            _super.prototype.setData.call(this, obj);
            this.nodeTree.funStr = obj.funStr;
            this.inPutFunStr(this.nodeTree.funStr);
        };
        MathFunNodeUI.prototype.getData = function () {
            var obj = _super.prototype.getData.call(this);
            obj.funStr = this.nodeTree.funStr;
            return obj;
        };
        MathFunNodeUI.prototype.setInItemByData = function (ary) {
            _super.prototype.setInItemByData.call(this, ary);
            // console.log("setInItemByData")
        };
        MathFunNodeUI.prototype.setOutItemByData = function (ary) {
            _super.prototype.setOutItemByData.call(this, ary);
            //  console.log("setOutItemByData")
        };
        return MathFunNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.MathFunNodeUI = MathFunNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MathFunNodeUI.js.map