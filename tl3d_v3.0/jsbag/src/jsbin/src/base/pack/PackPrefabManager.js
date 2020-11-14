var pack;
(function (pack) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var Pan3dByteArray = Pan3d.Pan3dByteArray;
    var PrefabStaticMesh = pack.PrefabStaticMesh;
    var TextureManager = Pan3d.TextureManager;
    var DynamicBaseConstItem = Pan3d.DynamicBaseConstItem;
    var DynamicBaseTexItem = Pan3d.DynamicBaseTexItem;
    var PackPrefabManager = /** @class */ (function () {
        function PackPrefabManager() {
            this.dic = {};
            this.loadDic = {};
        }
        PackPrefabManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PackPrefabManager();
            }
            return this._instance;
        };
        PackPrefabManager.prototype.playBfun = function ($prefab, $url) {
            if (!this.dic[$url]) {
                this.dic[$url] = $prefab;
            }
            while (this.loadDic[$url].length) {
                this.loadDic[$url].pop()($prefab);
            }
        };
        PackPrefabManager.prototype.makeMaterialBaseParam = function (materialParam, paramInfo) {
            materialParam.dynamicConstList = [];
            materialParam.dynamicTexList = [];
            for (var i = 0; paramInfo && i < paramInfo.length; i++) {
                var tempInfo = paramInfo[i];
                if (tempInfo.type == "tex") {
                    this.mekeParamTexture(tempInfo, materialParam);
                }
                else {
                    this.makeParamValue(tempInfo, materialParam);
                }
            }
        };
        PackPrefabManager.prototype.makeParamValue = function (obj, materialParam) {
            var constList = materialParam.material.constList;
            var targetName = obj.paramName;
            var target = null;
            for (var j = 0; j < constList.length; j++) {
                if (targetName == constList[j].paramName0
                    || targetName == constList[j].paramName1
                    || targetName == constList[j].paramName2
                    || targetName == constList[j].paramName3) {
                    target = constList[j];
                    break;
                }
            }
            var constItem = new DynamicBaseConstItem();
            constItem.setTargetInfo(target, targetName, obj.type);
            switch (obj.type) {
                case "vec3":
                    constItem.setCurrentVal(obj.data.x, obj.data.y, obj.data.z);
                    break;
                case "vec2":
                    constItem.setCurrentVal(obj.data.x, obj.data.y);
                    break;
                case "float":
                    constItem.setCurrentVal(obj.data);
                    break;
            }
            materialParam.dynamicConstList.push(constItem);
        };
        PackPrefabManager.prototype.mekeParamTexture = function (obj, materialParam) {
            var texList = materialParam.material.texList;
            var texItem = new DynamicBaseTexItem();
            texItem.paramName = obj.paramName;
            for (var i = 0; i < texList.length; i++) {
                if (texItem.paramName == texList[i].paramName) {
                    texItem.target = texList[i];
                    break;
                }
            }
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + obj.data, function ($textres) {
                texItem.textureRes = $textres;
            });
            materialParam.dynamicTexList.push(texItem);
        };
        PackPrefabManager.prototype.getPrefabByUrl = function ($url, bfun) {
            var _this = this;
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url]);
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun];
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, function ($byte) {
                    var $obj = JSON.parse(new Pan3dByteArray($byte).readUTF());
                    var $prefab = new PrefabStaticMesh();
                    for (var key in $obj) {
                        $prefab[key] = $obj[key];
                    }
                    $prefab.url = $url;
                    if ($prefab.objsurl) {
                        pack.PackObjDataManager.getInstance().getObjDataByUrl($prefab.objsurl, function (value) {
                            $prefab.objData = value;
                            if ($prefab.textureurl) {
                                pack.PackMaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, function ($materialTree) {
                                    $prefab.material = $materialTree;
                                    //    console.log("prefab加载完成", $prefab.url)
                                    _this.playBfun($prefab, $url);
                                });
                            }
                        });
                    }
                    else {
                        console.log("没有模型地址");
                        if ($prefab.textureurl) {
                            pack.PackMaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, function ($materialTree) {
                                $prefab.material = $materialTree;
                                _this.playBfun($prefab, $url);
                            });
                        }
                        else {
                            console.log("没有材质地址");
                        }
                    }
                });
            }
            else {
                this.loadDic[$url].push(bfun);
            }
        };
        return PackPrefabManager;
    }());
    pack.PackPrefabManager = PackPrefabManager;
})(pack || (pack = {}));
//# sourceMappingURL=PackPrefabManager.js.map