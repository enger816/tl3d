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
var base;
(function (base) {
    var MouseType = Pan3d.MouseType;
    var LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;
    var LayaScene2D = LayaPan3D.LayaScene2D;
    var AtlasFrameVo = layapan_me.AtlasFrameVo;
    var CanvasScene = /** @class */ (function (_super) {
        __extends(CanvasScene, _super);
        function CanvasScene(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            return _super.call(this, w, h) || this;
        }
        CanvasScene.prototype.initScene = function () {
            _super.prototype.initScene.call(this);
        };
        return CanvasScene;
    }(LayaScene2D));
    base.CanvasScene = CanvasScene;
    var BooldUserSprite = /** @class */ (function (_super) {
        __extends(BooldUserSprite, _super);
        function BooldUserSprite() {
            var _this = _super.call(this) || this;
            _this._bg = new Laya.Image("res/ui/bloodbg.png");
            _this.addChild(_this._bg);
            _this._line = new Laya.Image("res/ui/bloodline.png");
            _this.addChild(_this._line);
            _this._line.scaleX = 0.5;
            return _this;
        }
        return BooldUserSprite;
    }(Laya.Sprite));
    base.BooldUserSprite = BooldUserSprite;
    var AtlasFrameSprite = /** @class */ (function (_super) {
        __extends(AtlasFrameSprite, _super);
        function AtlasFrameSprite() {
            var _this = _super.call(this) || this;
            _this._skipNum = 0;
            _this._speedNum = 1;
            _this.isLoop = true;
            _this.frameLoop(1, _this, _this.updateFrame);
            return _this;
        }
        Object.defineProperty(AtlasFrameSprite.prototype, "speedNum", {
            set: function (value) {
                this._speedNum = value;
            },
            enumerable: true,
            configurable: true
        });
        AtlasFrameSprite.prototype.updateFrame = function () {
            if (this.frameItem && this.frameTexture) {
                var fnum = Math.floor(this._skipNum++ / this._speedNum);
                if (this.isLoop || fnum < this.frameItem.length) { //循环时才会播放
                    var id = fnum % this.frameItem.length;
                    var vo = this.frameItem[id];
                    if (this.lastDrawVo != vo) {
                        this.graphics.clear();
                        var outTexture = Laya.Texture.createFromTexture(this.frameTexture, vo.frame.x, vo.frame.y, vo.frame.w, vo.frame.h);
                        var g = this.graphics;
                        g.drawTexture(outTexture);
                        this.width = vo.frame.w;
                        this.height = vo.frame.h;
                        this.lastDrawVo = vo;
                        this.pivotX = this.width / 2;
                        this.pivotY = this.height / 2;
                    }
                }
            }
        };
        AtlasFrameSprite.prototype.setInfo = function ($data) {
            var _this = this;
            this.frameItem = [];
            for (var key in $data.frames) {
                var $atlasFrameVo = new AtlasFrameVo();
                $atlasFrameVo.meshData($data.frames[key]);
                $atlasFrameVo.key = key;
                this.frameItem.push($atlasFrameVo);
            }
            var picUrl = AtlasFrameSprite.pathUrl + $data.meta.image;
            Laya.loader.load(picUrl, Laya.Handler.create(this, function (value) {
                _this.frameTexture = value;
            }));
        };
        AtlasFrameSprite.pathUrl = "res/frameatlas/";
        return AtlasFrameSprite;
    }(Laya.Sprite));
    base.AtlasFrameSprite = AtlasFrameSprite;
    var SceneLevel = /** @class */ (function (_super) {
        __extends(SceneLevel, _super);
        function SceneLevel(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            var _this = _super.call(this) || this;
            _this._textRect = new Pan3d.Rectangle(0, 0, w, h);
            _this._bottomLayer = new Laya.Box;
            _this._midScene3dPic = new CanvasScene(w, h);
            _this._topLayer = new Laya.Box;
            _this.addChild(_this._bottomLayer);
            _this.addChild(_this._midScene3dPic);
            _this.addChild(_this._topLayer);
            _this._midScene3dPic.rootpos = null;
            _this.setSceneScale(6);
            _this.setSceneCanvas(w, h);
            _this.addEvents();
            return _this;
        }
        //public get rootpos(): Vector2D {
        //    return this._midScene3dPic.rootpos;
        //}
        //public set rootpos(value: Vector2D) {
        //    this._midScene3dPic.rootpos = value;
        //}
        SceneLevel.prototype.addEvents = function () {
            this.on(MouseType.MouseDown, this, this.onMouseDown);
        };
        SceneLevel.prototype.onMouseDown = function (e) {
            var label = this.getNameLabelVo();
            label.x = this.mouseX;
            label.y = this.mouseY;
            var atlasFrameSprite = this.playAnim("10101_1", true);
            atlasFrameSprite.speedNum = 4;
            atlasFrameSprite.isLoop = false;
            atlasFrameSprite.scale(0.5, 0.5);
            atlasFrameSprite.x = label.x;
            atlasFrameSprite.y = label.y;
            var booldUserSprite = this.getBloodVo();
            booldUserSprite.x = label.x;
            booldUserSprite.y = label.y;
            var $baseChar = new LayaScene2dSceneChar();
            this.addMovieDisplay($baseChar);
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            $baseChar.set2dPos(label.x, label.y);
            label.alpha = $baseChar.alpha = 0.2;
            booldUserSprite.alpha = $baseChar.alpha = 0.2;
        };
        SceneLevel.prototype.addMovieDisplay = function ($display) {
            this._midScene3dPic.sceneManager.addMovieDisplay($display);
        };
        //设置背景颜色
        SceneLevel.prototype.setSceneBgColor = function (value) {
            this._midScene3dPic.bgColor = value;
        };
        SceneLevel.prototype.setSceneScale = function (value) {
            this._sceneScale = value;
            this._midScene3dPic.sceneManager.cam3D.scene2dScale = this._sceneScale;
        };
        //设计渲染范围
        SceneLevel.prototype.setSceneCanvas = function (w, h) {
            this._midScene3dPic.scale(w / this._textRect.width, h / this._textRect.height);
            this.width = w;
            this.height = h;
        };
        //获取一个名字Label;
        SceneLevel.prototype.getNameLabelVo = function () {
            var temp = new Laya.Label("名字");
            temp.color = "#ffffff";
            temp.fontSize = 16;
            temp.x = 100;
            temp.y = 100;
            this._topLayer.addChild(temp);
            return temp;
        };
        //获取一个名字Label;
        SceneLevel.prototype.getBloodVo = function () {
            var sp = new BooldUserSprite;
            sp.x = 100;
            sp.y = 100;
            sp.scale(0.3, 0.3);
            this._topLayer.addChild(sp);
            return sp;
        };
        //获取图片动画对象 
        SceneLevel.prototype.getFrameAnimSprite = function (isTop) {
            var sp = new AtlasFrameSprite;
            if (isTop) {
                this._topLayer.addChild(sp);
            }
            else {
                this._bottomLayer.addChild(sp);
            }
            return sp;
        };
        SceneLevel.prototype.playAnim = function (value, isTop) {
            var sp = this.getFrameAnimSprite(isTop);
            Laya.loader.load(AtlasFrameSprite.pathUrl + value + ".atlas", Laya.Handler.create(this, function ($data) {
                sp.setInfo($data);
            }));
            return sp;
        };
        return SceneLevel;
    }(Laya.Box));
    base.SceneLevel = SceneLevel;
})(base || (base = {}));
//# sourceMappingURL=SceneLevel.js.map