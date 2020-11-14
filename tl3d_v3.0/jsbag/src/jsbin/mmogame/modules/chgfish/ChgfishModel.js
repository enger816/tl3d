var chgfish;
(function (chgfish) {
    var ChgfishModel = /** @class */ (function () {
        function ChgfishModel() {
        }
        ChgfishModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChgfishModel();
            }
            return this._instance;
        };
        ChgfishModel.prototype.addItem = function ($node) {
            if (!this._itemAry) {
                this._itemAry = new Array;
            }
            if ($node.id) {
                var tabred = tb.TB_red_point.get_TB_red_pointById($node.id);
                if (tabred && tabred.tip == 1) {
                    if (!this.hasitem($node.id)) {
                        $node.tab = tabred;
                        this._itemAry.push($node);
                        ModuleEventManager.dispatchEvent(new chgfish.ChgfishEvent(chgfish.ChgfishEvent.REFRESH_Chgfish_EVENT));
                    }
                }
            }
        };
        ChgfishModel.prototype.removeItem = function ($node) {
            if (!this._itemAry) {
                this._itemAry = new Array;
                return;
            }
            if ($node.id) {
                var tabred = tb.TB_red_point.get_TB_red_pointById($node.id);
                if (tabred && tabred.tip == 1) {
                    var idx = this._itemAry.indexOf($node);
                    // //console.log("--------------删除节点----------",idx,$node,this._itemAry);
                    if (idx != -1) {
                        this._itemAry.splice(idx, 1);
                        ModuleEventManager.dispatchEvent(new chgfish.ChgfishEvent(chgfish.ChgfishEvent.REFRESH_Chgfish_EVENT));
                    }
                }
            }
        };
        ChgfishModel.prototype.hasitem = function ($id) {
            if (!this._itemAry) {
                return false;
            }
            for (var i = 0; i < this._itemAry.length; i++) {
                if (this._itemAry[i].id == $id) {
                    return true;
                }
            }
            return false;
        };
        /**
         * getList
         */
        ChgfishModel.prototype.getList = function () {
            if (!this._itemAry) {
                this._itemAry = new Array;
            }
            return this._itemAry;
        };
        return ChgfishModel;
    }());
    chgfish.ChgfishModel = ChgfishModel;
})(chgfish || (chgfish = {}));
//# sourceMappingURL=ChgfishModel.js.map