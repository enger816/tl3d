var ShadowManager = /** @class */ (function () {
    function ShadowManager() {
        this._displayList = new Array;
        ProgrmaManager.getInstance().registe(Display3DShadowShader.Display3DShadowShader, new Display3DShadowShader());
    }
    ShadowManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new ShadowManager();
        }
        return this._instance;
    };
    ShadowManager.prototype.addShadow = function () {
        var display = this.getIdleShadow();
        var sd = new Shadow();
        display.addShadow(sd);
        return sd;
    };
    ShadowManager.prototype.removeShadow = function (sd) {
        sd.display.removeShadow(sd);
    };
    ShadowManager.prototype.update = function () {
        if (this._displayList.length) {
            Scene_data.context3D.setWriteDepth(false);
            for (var i = 0; i < this._displayList.length; i++) {
                this._displayList[i].update();
            }
            Scene_data.context3D.setWriteDepth(true);
        }
    };
    ShadowManager.prototype.getIdleShadow = function () {
        for (var i = 0; i < this._displayList.length; i++) {
            if (this._displayList[i].hasIdle()) {
                return this._displayList[i];
            }
        }
        var display = new Display3dShadow();
        this._displayList.push(display);
        return display;
    };
    return ShadowManager;
}());
//# sourceMappingURL=ShadowManager.js.map