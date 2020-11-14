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
var welfare;
(function (welfare) {
    var WelfareSevenDay = /** @class */ (function (_super) {
        __extends(WelfareSevenDay, _super);
        function WelfareSevenDay() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._bigPic = new UIRenderOnlyPicComponent();
            _this.addRender(_this._bigPic);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        WelfareSevenDay.prototype.dispose = function () {
            this._bigPic.dispose();
            this._bigPic = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        WelfareSevenDay.prototype.initUiAtlas = function ($uiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._bigPic.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        WelfareSevenDay.prototype.initView = function () {
            var renderLevel = this._baseRender;
            //大背景
            this.addChild(this._bigPic.getComponent("c_pic"));
            this._bigPic.setImgUrl("ui/uidata/welfare/sevendaybg.png");
            this.b_role = this.addChild(this._baseRender.getComponent("b_role"));
            this.titleary = new Array;
            this.nameary = new Array;
            this.btnary = new Array;
            for (var i = 0; i < 7; i++) {
                this.addChild(this._baseRender.getComponent("b_titlebg" + i));
                this.titleary.push(this.addChild(this._topRender.getComponent("b_title" + i)));
                this.nameary.push(this.addChild(this._topRender.getComponent("b_name" + i)));
                var btn = this.addChild(this._topRender.getComponent("b_btn" + i));
                btn.addEventListener(InteractiveEvent.Up, this.receiveClik, this);
                this.btnary.push(btn);
            }
            this.iconary = new Array;
            for (var j = 0; j < 6; j++) {
                this.iconary.push(this.addChild(this._topRender.getComponent("b_prop" + j)));
                this.addChild(this._bottomRender.getComponent("b_bg" + j));
            }
            this.mountRoleSprite = new Person2DChar();
            this.mountRoleSprite.needUIUrl = false;
            // this.mountRoleSprite.showAvatarVisibel = false
            // this.mountRoleSprite.setAvatar(6013);
            this._baseRender.addModel(this.mountRoleSprite);
        };
        WelfareSevenDay.prototype.setAvatar = function ($avatar) {
            //console.log("---$avatar--", $avatar);
            this.mountRoleSprite.setAvatar($avatar);
        };
        WelfareSevenDay.prototype.resizeRole = function () {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 4 * UIData.Scale;
                this.mountRoleSprite.rotationY = 0;
                this.mountRoleSprite.x = -203 * UIData.Scale;
                this.mountRoleSprite.y = -90 * UIData.Scale;
            }
        };
        WelfareSevenDay.prototype.resize = function () {
            this.resizeRole();
            _super.prototype.resize.call(this);
        };
        WelfareSevenDay.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        };
        WelfareSevenDay.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        WelfareSevenDay.prototype.resetData = function () {
            var a = GuidData.quest.getSevenDayList();
            for (var i = 0; i < a.length; i++) {
                this.btnary[i].data = a[i];
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.titleary[i].skinName, "登陆" + a[i].data.id + "天可领取", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                this.btnary[i].goToAndStop(a[i].state);
                if (i < a.length - 1) {
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.nameary[i].skinName, GameData.getPropName(a[i].data.item[0][0]), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                    IconManager.getInstance().drawItemIcon60(this.iconary[i], a[i].data.item[0][0], a[i].data.item[0][1], false, true);
                }
                else {
                    //console.log("---a[i].data.show--", a[i].data.show, i, a[i]);
                    UiDraw.clearUI(this.nameary[i]);
                    this.setAvatar(a[i].data.show);
                }
            }
            this.resize();
        };
        WelfareSevenDay.prototype.receiveClik = function (evt) {
            var data = evt.target.data;
            //console.log("---data",data);
            if (data && data.state == 1) {
                NetManager.getInstance().protocolos.welfare_get_sevenday_reward(data.data.id);
                //console.log("---data.data.id");
            }
        };
        return WelfareSevenDay;
    }(UIVirtualContainer));
    welfare.WelfareSevenDay = WelfareSevenDay;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareSevenDay.js.map