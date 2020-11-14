var materialui;
(function (materialui) {
    var MaterialCompile = /** @class */ (function () {
        function MaterialCompile() {
            this.maxPriority = 0;
        }
        MaterialCompile.getInstance = function () {
            if (!this._instance) {
                this._instance = new MaterialCompile();
            }
            return this._instance;
        };
        MaterialCompile.prototype.compile = function ($list, $materialTree) {
            this._compileGlslServer = new materialui.CompileTwo();
            this.nodeList = $list;
            this.resetCompile($list);
            this.resetPriority();
            var opNode = this.getOpNode();
            opNode.priority = 0;
            this.setPriority(opNode);
            this.priorityList = new Array;
            for (var i = 0; i <= this.maxPriority; i++) {
                this.priorityList.push(new Array);
            }
            for (i = 0; i < this.nodeList.length; i++) {
                if (this.nodeList[i].priority < 0) {
                    continue;
                }
                if (!this.nodeList[i].checkInput()) {
                    console.log(this.nodeList[i]);
                    alert("不完整的输入" + this.nodeList[i].type);
                    return;
                }
            }
            for (i = 0; i < this.nodeList.length; i++) {
                if (this.nodeList[i].priority < 0) {
                    continue;
                }
                this.priorityList[this.nodeList[i].priority].push(this.nodeList[i]);
            }
            this._compileGlslServer.compile(this.priorityList, $materialTree);
            left.ModelShowModel.getInstance().outShaderStr($materialTree);
        };
        MaterialCompile.prototype.setPriority = function ($node) {
            var inputVec = $node.inputVec;
            for (var i = 0; i < inputVec.length; i++) {
                var parentNodeItem = inputVec[i].parentNodeItem;
                if (parentNodeItem) {
                    var pNode = parentNodeItem.node;
                    if (pNode.priority < ($node.priority + 1)) {
                        pNode.priority = ($node.priority + 1);
                    }
                    this.maxPriority = Math.max(this.maxPriority, pNode.priority);
                    this.setPriority(pNode);
                }
            }
        };
        MaterialCompile.prototype.getOpNode = function () {
            for (var i = 0; i < this.nodeList.length; i++) {
                if (this.nodeList[i].type == materialui.NodeTree.OP) {
                    return this.nodeList[i];
                }
            }
            return null;
        };
        MaterialCompile.prototype.resetCompile = function ($list) {
            for (var i = 0; i < $list.length; i++) {
                var inputVec = $list[i].inputVec;
                for (var j = 0; j < inputVec.length; j++) {
                    inputVec[j].hasCompiled = false;
                }
            }
        };
        MaterialCompile.prototype.resetPriority = function () {
            for (var i = 0; i < this.nodeList.length; i++) {
                if (this.nodeList[i].type != materialui.NodeTree.OP) {
                    this.nodeList[i].priority = -1;
                }
                else {
                    this.nodeList[i].priority = 0;
                }
            }
        };
        return MaterialCompile;
    }());
    materialui.MaterialCompile = MaterialCompile;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialCompile.js.map