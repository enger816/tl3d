var pack;
(function (pack) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var PackSkillManager = /** @class */ (function () {
        function PackSkillManager() {
            this.dic = {};
            this.loadDic = {};
        }
        PackSkillManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PackSkillManager();
            }
            return this._instance;
        };
        PackSkillManager.prototype.playBfun = function ($prefab, $url) {
            if (!this.dic[$url]) {
                this.dic[$url] = $prefab;
            }
            while (this.loadDic[$url].length) {
                this.loadDic[$url].pop()($prefab);
            }
        };
        PackSkillManager.prototype.getPrefabByUrl = function ($url, bfun) {
            var _this = this;
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url]);
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun];
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE, function ($str) {
                    var $obj = JSON.parse($str);
                    var $skillmesh = new pack.SkillStatcMesh();
                    for (var key in $obj) {
                        $skillmesh[key] = $obj[key];
                    }
                    $skillmesh.url = $url;
                    _this.playBfun($skillmesh, $url);
                });
            }
            else {
                this.loadDic[$url].push(bfun);
            }
        };
        return PackSkillManager;
    }());
    pack.PackSkillManager = PackSkillManager;
})(pack || (pack = {}));
//# sourceMappingURL=PackSkillManager.js.map