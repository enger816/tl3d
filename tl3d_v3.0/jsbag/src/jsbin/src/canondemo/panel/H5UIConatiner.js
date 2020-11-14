var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scene_data = Pan3d.Scene_data;
var LoadManager = Pan3d.LoadManager;
var TextureManager = Pan3d.TextureManager;
var TextureRes = Pan3d.TextureRes;
var UICompenent = Pan3d.UICompenent;
var UIData = Pan3d.UIData;
var H5UIConatiner = /** @class */ (function (_super) {
    __extends(H5UIConatiner, _super);
    function H5UIConatiner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._winUiScale = 1;
        return _this;
    }
    Object.defineProperty(H5UIConatiner.prototype, "winUiScale", {
        get: function () {
            return this._winUiScale;
        },
        set: function (value) {
            this._winUiScale = value;
            var temp = Pan3d.UIData.Scale;
            Pan3d.UIData.Scale = this._winUiScale;
            this.resize();
            Pan3d.UIData.Scale = temp;
        },
        enumerable: true,
        configurable: true
    });
    H5UIConatiner.prototype.TweenLiteScale = function ($begin, $end, $time, $onComplete) {
        if ($time === void 0) { $time = 0.3; }
        if ($onComplete === void 0) { $onComplete = null; }
        this.winUiScale = $begin;
        TweenLite.to(this, $time, { winUiScale: $end, ease: Back.easeInOut, onComplete: $onComplete });
    };
    H5UIConatiner.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.uiLoadComplte && this.win_tip_bg) {
            this.win_tip_bg.top = 0;
            this.win_tip_bg.left = 0;
            this.win_tip_bg.height = Scene_data.stageHeight / UIData.Scale;
            this.win_tip_bg.width = Scene_data.stageWidth / UIData.Scale;
        }
    };
    return H5UIConatiner;
}(Pan3d.UIConatiner));
var H5UIAtlas = /** @class */ (function (_super) {
    __extends(H5UIAtlas, _super);
    function H5UIAtlas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    H5UIAtlas.prototype.setInfo = function (configUrl, imgUrl, $fun, useImgUrl) {
        var _this = this;
        if (useImgUrl === void 0) { useImgUrl = null; }
        this.last = {};
        this.last.configUrl = configUrl;
        this.last.imgUrl = imgUrl;
        this.last.$fun = $fun;
        this.last.useImgUrl = useImgUrl;
        this.isLoadError = false;
        this._useImgUrl = useImgUrl;
        if (H5UIAtlas.configxmlDic[configUrl]) {
            this.configData = H5UIAtlas.configxmlDic[configUrl].uiArr;
            this.layoutData = H5UIAtlas.configxmlDic[configUrl].panelArr;
            this.loadImgUrl(imgUrl, $fun);
        }
        else {
            LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, function ($str) {
                H5UIAtlas.configxmlDic[configUrl] = JSON.parse($str);
                _this.configData = H5UIAtlas.configxmlDic[configUrl].uiArr;
                _this.layoutData = H5UIAtlas.configxmlDic[configUrl].panelArr;
                _this.loadImgUrl(imgUrl, $fun);
            }, {
                failfun: function () {
                    console.log("没加载成功XML");
                    _this.isLoadError = true;
                }
            });
        }
    };
    H5UIAtlas.prototype.testLoading = function () {
        if (this.isLoadError) {
            console.log("上次加载时网络中断，现在重新玩");
            this.setInfo(this.last.configUrl, this.last.imgUrl, this.last.$fun, this.last.useImgUrl);
        }
    };
    H5UIAtlas.prototype.loadImgUrl = function (imgUrl, $fun) {
        var _this = this;
        _super.prototype.loadImgUrl.call(this, imgUrl, $fun);
        LoadManager.getInstance().load(Scene_data.fileRoot + imgUrl, LoadManager.IMG_TYPE, function ($img) {
        }, {
            failfun: function () {
                console.log("纹理没加载成功");
                _this.isLoadError = true;
            }
        });
    };
    H5UIAtlas.configxmlDic = {}; //用来记录原来的ui配置文件
    return H5UIAtlas;
}(Pan3d.UIAtlas));
//# sourceMappingURL=H5UIConatiner.js.map