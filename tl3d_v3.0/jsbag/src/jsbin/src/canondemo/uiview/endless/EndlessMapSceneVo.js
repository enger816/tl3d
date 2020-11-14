var endless;
(function (endless) {
    var SceneRes = Pan3d.SceneRes;
    var EndlessMapSceneVo = /** @class */ (function () {
        function EndlessMapSceneVo() {
        }
        EndlessMapSceneVo.prototype.initData = function ($fun) {
            var _this = this;
            this.sceneRes = new SceneRes;
            this.sceneRes.load(String(this.mapuid), this.mainSceneComplete, this.mainSceneProgress, function ($str) {
                _this.isfinish = true;
                $fun();
            }, {
                failfun: function () {
                    console.log("加载失败了");
                }
            });
        };
        EndlessMapSceneVo.prototype.mainSceneComplete = function () {
        };
        EndlessMapSceneVo.prototype.mainSceneProgress = function (num) {
        };
        return EndlessMapSceneVo;
    }());
    endless.EndlessMapSceneVo = EndlessMapSceneVo;
})(endless || (endless = {}));
//# sourceMappingURL=EndlessMapSceneVo.js.map