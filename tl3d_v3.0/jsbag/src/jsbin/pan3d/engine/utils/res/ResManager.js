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
var Pan3d;
(function (Pan3d) {
    var ResManager = /** @class */ (function (_super) {
        __extends(ResManager, _super);
        function ResManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ResManager();
            }
            return this._instance;
        };
        ResManager.prototype.loadRoleRes = function (url, $fun, $meshBatchNum) {
            //if (this._resDic[url]){
            //    $fun(this._resDic[url]);
            //    return;
            //}
            // if (this._loadDic[url]){
            //     this._loadDic[url].push($fun);
            //     return;
            // }
            // this._loadDic[url] = new Array;
            // this._loadDic[url].push($fun);
            var roleRes = new Pan3d.RoleRes();
            roleRes.meshBatchNum = $meshBatchNum;
            roleRes.load(url, function () {
                $fun(roleRes);
                // for (var i: number = 0; i < this._loadDic[url].length; i++){
                //     this._loadDic[url][i](roleRes);
                // }
                // delete this._loadDic[url];
                //this._resDic[url] = roleRes;
            });
        };
        ResManager.prototype.loadSkillRes = function (url, $fun) {
            //if (this._resDic[url]) {
            //    $fun(this._resDic[url]);
            //    return;
            //}
            // if (this._loadDic[url]) {
            //     this._loadDic[url].push($fun);
            //     return;
            // }
            // this._loadDic[url] = new Array;
            // this._loadDic[url].push($fun);
            var skillRes = new Pan3d.SkillRes();
            skillRes.load(url, function () {
                $fun(skillRes);
                // for (var i: number = 0; i < this._loadDic[url].length; i++) {
                //     this._loadDic[url][i](skillRes);
                // }
                // delete this._loadDic[url];
                //this._resDic[url] = skillRes;
            });
        };
        ResManager.prototype.loadSceneRes = function ($url, $completeFun, $progressFun, $readDataFun) {
            var sceneRes;
            //if (this._resDic[$url]) {
            //    sceneRes = this._resDic[$url];
            //} else {
            //    this._resDic[$url] = sceneRes;
            //}
            if (this._dic[$url]) {
                sceneRes = this._dic[$url];
            }
            else {
                sceneRes = new Pan3d.SceneRes();
                this._dic[$url] = sceneRes;
            }
            sceneRes.load($url, $completeFun, $progressFun, $readDataFun);
            this.clearSceneUse(sceneRes);
            return sceneRes;
        };
        ResManager.prototype.clearSceneUse = function (curRes) {
            for (var key in this._dic) {
                var rc = this._dic[key];
                if (rc.useNum > 0 && rc != curRes) {
                    rc.useNum = 0;
                }
            }
            curRes.useNum = 1;
        };
        ResManager.prototype.gc = function () {
            for (var key in this._dic) {
                var rc = this._dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;
                    if (rc.idleTime >= Pan3d.ResCount.GCTime) {
                        //console.log("清理 -" + key);
                        rc.destory();
                        delete this._dic[key];
                    }
                }
            }
        };
        return ResManager;
    }(Pan3d.ResGC));
    Pan3d.ResManager = ResManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ResManager.js.map