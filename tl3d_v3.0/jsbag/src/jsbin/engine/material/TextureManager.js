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
var TextureManager = /** @class */ (function (_super) {
    __extends(TextureManager, _super);
    function TextureManager() {
        var _this = _super.call(this) || this;
        _this._loadDic = new Object();
        _this._resDic = new Object();
        _this.initDefaultLightMapTexture();
        return _this;
    }
    TextureManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new TextureManager();
        }
        return this._instance;
    };
    TextureManager.prototype.hasTexture = function ($url) {
        if (this._dic[$url]) {
            return true;
        }
        return false;
    };
    TextureManager.prototype.getTexture = function ($url, $fun, $wrapType, $info, $filteType, $mipmapType) {
        // if ($url.indexOf("zc_deng_00.png") != -1) {
        //    //console.log("22222");
        // }
        var _this = this;
        if ($wrapType === void 0) { $wrapType = 0; }
        if ($info === void 0) { $info = null; }
        if ($filteType === void 0) { $filteType = 0; }
        if ($mipmapType === void 0) { $mipmapType = 0; }
        if (this._dic[$url]) {
            if ($info) {
                $fun(this._dic[$url], $info);
            }
            else {
                $fun(this._dic[$url]);
            }
            this._dic[$url].useNum++;
            return;
        }
        var textureLoad = new TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType);
        if (this._loadDic[$url]) {
            var ary = this._loadDic[$url];
            ary.push(textureLoad);
            return;
        }
        this._loadDic[$url] = new Array;
        this._loadDic[$url].push(textureLoad);
        if (this._resDic[$url]) {
            this.loadTextureCom(this._resDic[$url], textureLoad);
            delete this._resDic[$url];
        }
        else {
            LoadManager.getInstance().load($url, LoadManager.IMG_TYPE, function ($img, _info) {
                _this.loadTextureCom($img, _info);
            }, textureLoad);
        }
    };
    TextureManager.prototype.getImageData = function ($url, $fun) {
        LoadManager.getInstance().load($url, LoadManager.IMG_TYPE, function ($img) {
            var ctx = UIManager.getInstance().getContext2D($img.width, $img.height, false);
            ctx.drawImage($img, 0, 0, $img.width, $img.height);
            var imgData = ctx.getImageData(0, 0, $img.width, $img.height);
            $fun(imgData);
        });
    };
    TextureManager.prototype.addRes = function ($url, $img) {
        if (!this._dic[$url] && !this._resDic[$url]) {
            this._resDic[$url] = $img;
        }
    };
    TextureManager.prototype.getCanvasTexture = function (ctx) {
        var tres = new TextureRes;
        var texture = Scene_data.context3D.getTexture(ctx.canvas, 0, 0);
        tres.texture = texture;
        return tres;
    };
    TextureManager.prototype.getImageDataTexture = function (imgdata) {
        var texture = Scene_data.context3D.getTexture(imgdata, 0, 0);
        return texture;
    };
    TextureManager.prototype.getTextureRes = function ($img) {
        var tres = new TextureRes;
        var texture = Scene_data.context3D.getTexture($img, 0, 0);
        tres.texture = texture;
        return tres;
    };
    TextureManager.prototype.updateTexture = function ($texture, $offsetx, $offsety, ctx) {
        Scene_data.context3D.updateTexture($texture, $offsetx, $offsety, ctx.canvas);
    };
    TextureManager.prototype.loadCubeTexture = function ($url, $fun) {
        var cubeMapLoad = new CubemapLoad();
        cubeMapLoad.loadCube($url, function ($cubeList) { $fun($cubeList); });
    };
    TextureManager.prototype.loadTextureCom = function ($img, _info) {
        var texture = Scene_data.context3D.getTexture($img, _info.wrap, _info.filter, _info.mipmap);
        var textres = new TextureRes();
        textres.texture = texture;
        textres.width = $img.width;
        textres.height = $img.height;
        var ary = this._loadDic[_info.url];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i].info) {
                ary[i].fun(textres, ary[i].info);
            }
            else {
                ary[i].fun(textres);
            }
            textres.useNum++;
        }
        delete this._loadDic[_info.url];
        this._dic[_info.url] = textres;
    };
    TextureManager.prototype.initDefaultLightMapTexture = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 32;
        canvas.height = 32;
        ctx.fillStyle = "rgb(" + 255 / 5 + "," + 255 / 5 + "," + 255 / 5 + ")";
        ctx.fillRect(0, 0, 32, 32);
        this.defaultLightMap = Scene_data.context3D.getTexture(canvas);
    };
    TextureManager.prototype.gc = function () {
        _super.prototype.gc.call(this);
    };
    return TextureManager;
}(ResGC));
var TextureLoad = /** @class */ (function () {
    function TextureLoad($fun, $info, $url, $wrap, $filter, $mipmap) {
        this.fun = $fun;
        this.info = $info;
        this.url = $url;
        this.wrap = $wrap;
        this.filter = $filter;
        this.mipmap = $mipmap;
    }
    return TextureLoad;
}());
var CubemapLoad = /** @class */ (function () {
    function CubemapLoad() {
        this.ary = new Array(6);
        this.flagNum = 0;
    }
    CubemapLoad.prototype.loadCube = function ($url, $fun) {
        var _this = this;
        this.fun = $fun;
        for (var i = 0; i < 6; i++) {
            var itemUrl = $url + "0" + (i + 1) + ".jpg";
            LoadManager.getInstance().load(itemUrl, LoadManager.IMG_TYPE, function ($img, $info) { _this.loadCom($img, $info); }, { "id": i });
        }
    };
    CubemapLoad.prototype.loadCom = function ($img, $info) {
        var wh = $img.width / 4;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = wh;
        canvas.height = wh;
        var renderContext = Scene_data.context3D.renderContext;
        var texture = renderContext.createTexture();
        renderContext.bindTexture(renderContext.TEXTURE_CUBE_MAP, texture);
        ctx.drawImage($img, wh * 2, wh, wh, wh, 0, 0, wh, wh); //right
        renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
        ctx.drawImage($img, 0, wh, wh, wh, 0, 0, wh, wh); //left
        renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
        ctx.drawImage($img, wh, 0, wh, wh, 0, 0, wh, wh); //top
        renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
        ctx.drawImage($img, wh, wh * 2, wh, wh, 0, 0, wh, wh); //bottom
        renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
        ctx.drawImage($img, wh, wh, wh, wh, 0, 0, wh, wh); //front
        renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
        ctx.drawImage($img, wh * 3, wh, wh, wh, 0, 0, wh, wh); //back
        renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
        renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
        this.ary[$info.id] = texture;
        this.flagNum++;
        if (this.flagNum == 6) {
            this.fun(this.ary);
        }
    };
    return CubemapLoad;
}());
//# sourceMappingURL=TextureManager.js.map