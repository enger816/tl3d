var LoadManager = /** @class */ (function () {
    function LoadManager() {
        this._loadThreadList = new Array;
        this._waitLoadList = new Array;
        for (var i = 0; i < 10; i++) {
            this._loadThreadList.push(new LoaderThread());
        }
    }
    LoadManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new LoadManager();
        }
        return this._instance;
    };
    LoadManager.prototype.load = function ($url, $type, $fun, $info, $progressFun) {
        if ($info === void 0) { $info = null; }
        if ($progressFun === void 0) { $progressFun = null; }
        if (!$url || $url.length < 1 || $url.search("undefined") != -1) {
            //console.log("加载地址不能为空")
            return;
        }
        var vkey = "/" + $url.replace(Scene_data.fileRoot, "");
        var version = GameVersion.getVersion(vkey);
        if (!version || version == "") {
            version = "0";
        }
        else {
            //console.log(vkey,version);
        }
        //GameInstance.mapName
        var loadInfo = new LoadInfo($url, $type, $fun, $info, $progressFun);
        loadInfo.version = version;
        for (var i = 0; i < this._loadThreadList.length; i++) {
            if (this._loadThreadList[i].idle) {
                this._loadThreadList[i].load(loadInfo);
                return;
            }
        }
        this._waitLoadList.push(loadInfo);
    };
    LoadManager.prototype.loadWaitList = function () {
        if (this._waitLoadList.length <= 0) {
            return;
        }
        for (var i = 0; i < this._loadThreadList.length; i++) {
            if (this._loadThreadList[i].idle) {
                this._loadThreadList[i].load(this._waitLoadList.shift());
                return;
            }
        }
    };
    LoadManager.BYTE_TYPE = "BYTE_TYPE";
    LoadManager.IMG_TYPE = "IMG_TYPE";
    LoadManager.XML_TYPE = "XML_TYPE";
    return LoadManager;
}());
var LoaderThread = /** @class */ (function () {
    function LoaderThread() {
        var _this = this;
        this._xhr = new XMLHttpRequest();
        this._xhr.onreadystatechange = function () {
            if (_this._xhr.status == 200 && _this._xhr.readyState == 4) {
                _this.loadByteXML();
            }
        };
        this._xhr.onprogress = function (e) {
            if (_this._loadInfo.progressFun) {
                _this._loadInfo.progressFun(e.loaded / e.total);
            }
        };
        this._xhr.onerror = function () {
            _this.loadError();
        };
        this._img = new Image();
        this._img.onload = function () {
            _this.loadImg();
        };
        this._img.onerror = function () {
            _this.loadError();
        };
        this.idle = true;
    }
    LoaderThread.prototype.load = function (loadInfo) {
        this._loadInfo = loadInfo;
        this.idle = false;
        this._url = loadInfo.url;
        if (this._loadInfo.type == LoadManager.BYTE_TYPE) {
            this._xhr.open("GET", loadInfo.vurl, true);
            this._xhr.responseType = "arraybuffer";
            this._xhr.send();
        }
        else if (this._loadInfo.type == LoadManager.XML_TYPE) {
            this._xhr.open("GET", loadInfo.vurl, true);
            this._xhr.responseType = "text";
            this._xhr.send();
        }
        else if (this._loadInfo.type == LoadManager.IMG_TYPE) {
            if (this._img.url == loadInfo.vurl) {
                this.loadImg();
            }
            else {
                this._img.url = loadInfo.vurl;
                this._img.src = loadInfo.vurl;
            }
        }
    };
    LoaderThread.prototype.loadError = function () {
        this.idle = true;
        this._loadInfo = null;
        LoadManager.getInstance().loadWaitList();
    };
    LoaderThread.prototype.loadByteXML = function () {
        // if(this.idle){
        //     //console.log("加载完成*****************************"+this._url );
        // }
        if (this._loadInfo.info) {
            this._loadInfo.fun(this._xhr.response, this._loadInfo.info);
        }
        else {
            this._loadInfo.fun(this._xhr.response);
        }
        this.idle = true;
        this._loadInfo = null;
        LoadManager.getInstance().loadWaitList();
    };
    LoaderThread.prototype.loadByteImg = function () {
        var blob = new Blob([this._xhr.response], { type: "application/octet-binary" });
        this._img.src = URL.createObjectURL(blob);
    };
    LoaderThread.prototype.loadImg = function () {
        if (this._loadInfo.info) {
            this._loadInfo.fun(this._img, this._loadInfo.info);
        }
        else {
            this._loadInfo.fun(this._img);
        }
        this.idle = true;
        this._loadInfo = null;
        LoadManager.getInstance().loadWaitList();
    };
    return LoaderThread;
}());
var LoadInfo = /** @class */ (function () {
    function LoadInfo($url, $type, $fun, $info, $progressFun) {
        if ($info === void 0) { $info = null; }
        if ($progressFun === void 0) { $progressFun = null; }
        this.url = $url;
        this.type = $type;
        this.fun = $fun;
        this.info = $info;
        this.progressFun = $progressFun;
    }
    Object.defineProperty(LoadInfo.prototype, "vurl", {
        get: function () {
            return this.url + "?v=" + this.version;
        },
        enumerable: true,
        configurable: true
    });
    return LoadInfo;
}());
//# sourceMappingURL=LoadManager.js.map