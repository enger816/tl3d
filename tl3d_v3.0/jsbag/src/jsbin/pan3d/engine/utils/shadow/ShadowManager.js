var Pan3d;
(function (Pan3d) {
    var ShadowManager = /** @class */ (function () {
        function ShadowManager() {
            this._displayList = new Array;
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.Display3DShadowShader.Display3DShadowShader, new Pan3d.Display3DShadowShader());
        }
        ShadowManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ShadowManager();
            }
            return this._instance;
        };
        ShadowManager.prototype.addShadow = function () {
            var display = this.getIdleShadow();
            var sd = new Pan3d.Shadow();
            display.addShadow(sd);
            return sd;
        };
        ShadowManager.prototype.removeShadow = function (sd) {
            sd.display.removeShadow(sd);
        };
        ShadowManager.prototype.update = function () {
            if (this._displayList.length) {
                Pan3d.Scene_data.context3D.setWriteDepth(false);
                for (var i = 0; i < this._displayList.length; i++) {
                    this._displayList[i].update();
                }
                Pan3d.Scene_data.context3D.setWriteDepth(true);
            }
        };
        ShadowManager.prototype.getIdleShadow = function () {
            for (var i = 0; i < this._displayList.length; i++) {
                if (this._displayList[i].hasIdle()) {
                    return this._displayList[i];
                }
            }
            var display = new Pan3d.Display3dShadow();
            this._displayList.push(display);
            return display;
        };
        return ShadowManager;
    }());
    Pan3d.ShadowManager = ShadowManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ShadowManager.js.map