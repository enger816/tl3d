var Pan3d;
(function (Pan3d) {
    var IconManager = /** @class */ (function () {
        function IconManager() {
            this._dic = new Object;
            this._loadDic = new Object;
        }
        IconManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new IconManager();
            }
            return this._instance;
        };
        return IconManager;
    }());
    Pan3d.IconManager = IconManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=IconManager.js.map