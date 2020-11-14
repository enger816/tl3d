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
var msgtip;
(function (msgtip) {
    var MsgPicData = /** @class */ (function () {
        function MsgPicData() {
        }
        return MsgPicData;
    }());
    msgtip.MsgPicData = MsgPicData;
    var MsgPicVo = /** @class */ (function () {
        function MsgPicVo() {
        }
        return MsgPicVo;
    }());
    msgtip.MsgPicVo = MsgPicVo;
    var FrameTipUi = /** @class */ (function () {
        function FrameTipUi($cs) {
            this.container = $cs;
            this.bottomRender = new MoveFrameComponent();
            this.topRender = new MovePicComponent();
            this.container.addRender(this.bottomRender);
            this.container.addRender(this.topRender);
        }
        FrameTipUi.prototype.loadPic = function ($msgPicData) {
            var _this = this;
            this.bottomRender.endFun = function () { _this.playEndFun(); };
            var a = "ui/load/toptip/ui_sj.png";
            var b;
            if ($msgPicData.type == 2) {
                b = String($msgPicData.info);
            }
            else {
                b = "ui/load/toptip/leveluptxtnew.png";
            }
            this.bottomRender.scale = 1.5;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + a, function ($aaaa) {
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + b, function ($bbbb) {
                    _this.bottomRender.setTextureTo($aaaa);
                    _this.topRender.setTextureTo($bbbb, $msgPicData);
                });
            });
        };
        FrameTipUi.prototype.playEndFun = function () {
            var _this = this;
            TimeUtil.addTimeOut(1, function () {
                _this.container.removeRender(_this.bottomRender);
                _this.container.removeRender(_this.topRender);
            });
        };
        return FrameTipUi;
    }());
    msgtip.FrameTipUi = FrameTipUi;
    var MovePicComponent = /** @class */ (function (_super) {
        __extends(MovePicComponent, _super);
        function MovePicComponent() {
            var _this = _super.call(this) || this;
            _this.uiAtlas = new UIAtlas();
            _this.uiAtlas.configData = new Array();
            return _this;
        }
        MovePicComponent.prototype.setTextureTo = function ($textureRes, $msgPicData) {
            this.uiAtlas.configData = new Array();
            this.uiAtlas.textureRes = $textureRes;
            if ($msgPicData.type == 1) {
                this.makeLevelUpPic($msgPicData.info);
            }
            else {
                this.makeSamplePic();
            }
        };
        MovePicComponent.prototype.makeLevelUpPic = function ($lev) {
            var $levStr = String($lev);
            var $rect = new Rectangle(0, 0, $levStr.length * 20 + 90);
            var $basePos = new Vector2D(UIData.designWidth / 2, 100);
            $basePos.x -= $rect.width / 2;
            this.uiAtlas.configData.push(this.uiAtlas.getObject("leftSkin", 1, 31, 60, 28, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.uiAtlas.configData.push(this.uiAtlas.getObject("rightSkin", 61, 31, 30, 28, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.uiAtlas.configData.push(this.uiAtlas.getObject("frameskill", 2, 4, 170, 25, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, 10, 1));
            for (var i = 0; i < $levStr.length; i++) {
                var $numFrameUi = this.createFrame("frameskill");
                $numFrameUi.width = 17;
                $numFrameUi.height = 25;
                $numFrameUi.x = i * 20 + $basePos.x + 60;
                $numFrameUi.y = $basePos.y - 0;
                $numFrameUi.goToAndStop(Number($levStr.charAt(i)));
                this.container.addChild($numFrameUi);
            }
            var $leftUi = this.creatBaseComponent("leftSkin");
            //$leftUi.width = 80;
            //$leftUi.height = 64;
            $leftUi.x = $basePos.x;
            $leftUi.y = $basePos.y;
            this.container.addChild($leftUi);
            var $rightUi = this.creatBaseComponent("rightSkin");
            //$rightUi.width = 40;
            //$rightUi.height = 64;
            $rightUi.x = $basePos.x + ($rect.width - $rightUi.width);
            $rightUi.y = $basePos.y;
            this.container.addChild($rightUi);
            this.container.resize();
        };
        MovePicComponent.prototype.makeSamplePic = function () {
            this.uiAtlas.configData.push(this.uiAtlas.getObject("picSkin", 0, 0, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.picUi = this.creatBaseComponent("picSkin");
            var $basePos = new Vector2D(UIData.designWidth / 2, 100);
            this.picUi.width = this.uiAtlas.textureRes.width;
            this.picUi.height = this.uiAtlas.textureRes.height;
            this.picUi.x = -this.picUi.width / 2 + $basePos.x;
            this.picUi.y = -this.picUi.height / 2 + $basePos.y;
            this.container.addChild(this.picUi);
        };
        return MovePicComponent;
    }(UIRenderComponent));
    msgtip.MovePicComponent = MovePicComponent;
    var MoveFrameComponent = /** @class */ (function (_super) {
        __extends(MoveFrameComponent, _super);
        function MoveFrameComponent() {
            var _this = _super.call(this) || this;
            _this.uiAtlas = new UIAtlas();
            _this.uiAtlas.configData = new Array();
            return _this;
        }
        MoveFrameComponent.prototype.setTextureTo = function ($img) {
            var cellx = 2;
            var celly = 8;
            var $imgRect = new Rectangle(0, 0, $img.width, $img.height);
            var $textureRect = new Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));
            this.uiAtlas.textureRes = $img;
            this.uiAtlas.configData = new Array();
            this.uiAtlas.configData.push(this.uiAtlas.getObject("frameskill", 0, 0, $imgRect.width, $imgRect.height, $textureRect.width, $textureRect.height, cellx, celly));
            this.moveUi = this.createFrame("frameskill");
            this.moveUi.width = $imgRect.width / cellx * this.scale;
            this.moveUi.height = $imgRect.height / celly * this.scale;
            var $basePos = new Vector2D(UIData.designWidth / 2, 100);
            this.moveUi.x = -this.moveUi.width / 2 + $basePos.x;
            this.moveUi.y = -this.moveUi.height / 2 + $basePos.y;
            this.moveUi.speed = 2;
            this.container.addChild(this.moveUi);
            this.applyObjData();
        };
        MoveFrameComponent.prototype.update = function () {
            if (this.moveUi) {
                if (this.moveUi.current >= this.moveUi.totalcurrent - 2) {
                    if (this.endFun) {
                        this.endFun();
                    }
                }
                else {
                    _super.prototype.update.call(this);
                }
            }
        };
        MoveFrameComponent.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.moveUi = null;
        };
        return MoveFrameComponent;
    }(UIRenderComponent));
    msgtip.MoveFrameComponent = MoveFrameComponent;
    var MsgTopCenterPic = /** @class */ (function (_super) {
        __extends(MsgTopCenterPic, _super);
        function MsgTopCenterPic() {
            var _this = _super.call(this) || this;
            _this.frameItem = new Array;
            _this._msgPicVoItem = new Array;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.frameUpFun = function (t) { _this.upData(t); };
            TimeUtil.addFrameTick(_this.frameUpFun);
            return _this;
        }
        MsgTopCenterPic.prototype.upData = function (t) {
            if (this.renderList.length <= 0) {
                this.close();
            }
        };
        MsgTopCenterPic.prototype.pushData = function (value) {
            var $FrameTipUi = new FrameTipUi(this);
            $FrameTipUi.loadPic(value);
            this.frameItem.push($FrameTipUi);
        };
        MsgTopCenterPic.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.dispose();
        };
        MsgTopCenterPic.prototype.dispose = function () {
            TimeUtil.removeFrameTick(this.frameUpFun);
            this.frameUpFun = null;
            MsgTopCenterPic._msgTopCenterPic = null;
        };
        MsgTopCenterPic.show = function (value) {
            if (!this._msgTopCenterPic) {
                this._msgTopCenterPic = new MsgTopCenterPic();
            }
            this._msgTopCenterPic.pushData(value);
            UIManager.getInstance().addUIContainer(this._msgTopCenterPic);
        };
        return MsgTopCenterPic;
    }(UIConatiner));
    msgtip.MsgTopCenterPic = MsgTopCenterPic;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgTopCenterPic.js.map