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
var H5UIConatiner = /** @class */ (function (_super) {
    __extends(H5UIConatiner, _super);
    function H5UIConatiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
        _super.prototype.setInfo.call(this, configUrl, imgUrl, $fun, useImgUrl);
        LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, function ($str) {
        }, {
            failfun: function () {
                console.log("没加载成功XML");
                _this.isLoadError = true;
            }
        });
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
    return H5UIAtlas;
}(Pan3d.UIAtlas));
//# sourceMappingURL=H5UIConatiner.js.map