var pass;
(function (pass) {
    var PassModel = /** @class */ (function () {
        function PassModel() {
        }
        PassModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new PassModel();
            }
            return this._instance;
        };
        return PassModel;
    }());
    pass.PassModel = PassModel;
})(pass || (pass = {}));
//# sourceMappingURL=PassModel.js.map