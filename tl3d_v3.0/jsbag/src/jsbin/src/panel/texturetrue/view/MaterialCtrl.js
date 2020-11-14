var materialui;
(function (materialui) {
    var MaterialCtrl = /** @class */ (function () {
        function MaterialCtrl() {
            this.initData();
        }
        MaterialCtrl.getInstance = function () {
            if (!this._instance) {
                this._instance = new MaterialCtrl();
            }
            return this._instance;
        };
        MaterialCtrl.prototype.initData = function () {
            this.nodeList = new Array;
            this.uiList = new Array;
            this._materialTree = new materialui.MaterialTree;
        };
        MaterialCtrl.prototype.addNodeUI = function (ui) {
            var node = ui.nodeTree;
            if (node.id == -1) {
                if (this.nodeList.length) {
                    node.id = this.nodeList[this.nodeList.length - 1].id + 1;
                }
                else {
                    node.id = 0;
                }
            }
            this.nodeList.push(node);
            this.uiList.push(ui);
            this.addUIContainer(ui);
        };
        MaterialCtrl.prototype.addUIContainer = function (value) {
            this.nodeUiPanel.addUIContainer(value);
        };
        MaterialCtrl.prototype.removeUI = function (ui) {
            for (var i = 0; i < this.uiList.length; i++) {
                if (this.uiList[i] == ui) {
                    this.uiList.splice(i, 1);
                    break;
                }
            }
        };
        MaterialCtrl.prototype.getObj = function () {
            var ary = new Array;
            for (var i = 0; i < this.uiList.length; i++) {
                var $temp = this.uiList[i];
                if ($temp) {
                    var obj = $temp.getObj();
                    ary.push(obj);
                }
            }
            return ary;
        };
        return MaterialCtrl;
    }());
    materialui.MaterialCtrl = MaterialCtrl;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialCtrl.js.map