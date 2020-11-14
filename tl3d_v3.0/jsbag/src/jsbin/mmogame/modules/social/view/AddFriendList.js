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
var social;
(function (social) {
    var AddFriendList = /** @class */ (function (_super) {
        __extends(AddFriendList, _super);
        function AddFriendList() {
            var _this = _super.call(this) || this;
            _this.left = 184;
            _this.top = 140;
            _this.setShowLevel(4);
            return _this;
        }
        AddFriendList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        AddFriendList.prototype.recommend = function () {
            NetManager.getInstance().protocolos.social_recommend_friend();
        };
        AddFriendList.prototype.initData = function () {
            this._ary = new Array();
            this.setData(this._ary, AddFriendItemRender, 593, 264, 0, 82, 3, 256, 512, 1, 5);
        };
        /**
         * refreshData
         */
        AddFriendList.prototype.refreshDataByNewData = function ($ary) {
            this._ary = this.getData($ary);
            this.refreshData(this._ary);
        };
        AddFriendList.prototype.refreshDataByindex = function ($index) {
            this._ary.splice($index, 1);
            for (var i = 0; i < this._ary.length; i++) {
                this._ary[i].id = i;
            }
            this.refreshData(this._ary);
        };
        AddFriendList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var data = $ary[i];
                var item = new SListItemData;
                item.data = data;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        AddFriendList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                // this.recommend();
            }
        };
        AddFriendList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return AddFriendList;
    }(SList));
    social.AddFriendList = AddFriendList;
    var AddFriendItemRender = /** @class */ (function (_super) {
        __extends(AddFriendItemRender, _super);
        function AddFriendItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        AddFriendItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.icon1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Icon", 9, 6, 68, 68);
            $container.addChild(this.icon1);
            this.icon1.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.fam1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ifac", 299, 30, 100, 20);
            $container.addChild(this.fam1);
            this.name1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Iname", 93, 30, 100, 20);
            $container.addChild(this.name1);
            this.vip1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ivip", 199, 33, 29, 14);
            $container.addChild(this.vip1);
            this.btn1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ibtn", 499, 19, 72, 46);
            $container.addChild(this.btn1);
            this.btn1.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.bg1 = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Ibg", 0, 0, 593, 82);
            $container.addChild(this.bg1);
            // this.bg1.addEventListener(InteractiveEvent.Down, this.butClik, this);
        };
        AddFriendItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                if (!($data.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.bg1.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                this.setIcon($data.data);
                // //vip等级
                this.uiAtlas.upDataPicToTexture(getVipIconUrl($data.data.vip), this.vip1.skinName);
                // ArtFont.getInstance().writeFontToSkinName(this._bgRender.uiAtlas, this.vip1.skinName, $data.data.vip, ArtFont.num21)
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.name1.skinName, getBaseName($data.data.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.fam1.skinName, $data.data.faction == "" ? "暂无家族" : getBaseName($data.data.faction), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.btn1.skinName, "add");
            }
            else {
                this.setnull();
            }
        };
        AddFriendItemRender.prototype.setnull = function () {
            UiDraw.clearUI(this.bg1);
            UiDraw.clearUI(this.icon1);
            UiDraw.clearUI(this.vip1);
            UiDraw.clearUI(this.name1);
            UiDraw.clearUI(this.fam1);
            UiDraw.clearUI(this.btn1);
        };
        AddFriendItemRender.prototype.setIcon = function ($obj) {
            var _this = this;
            IconManager.getInstance().getIcon(getTouPic($obj.gender), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.icon1.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                //绘制底色
                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                //绘制头像
                ctx.drawImage($img, 0, 0, 82, 82, 3, 3, 62, 62);
                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_LEV_BG, new Rectangle(15, 50, 53, 18), UIData.publicUi);
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + String($obj.level), 14, 42, 50, TextAlign.CENTER);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        AddFriendItemRender.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.btn1:
                    if (this.itdata) {
                        // //console.log("申请");
                        this.addFriend();
                    }
                    break;
                default:
                    break;
            }
        };
        AddFriendItemRender.prototype.addFriend = function () {
            NetManager.getInstance().protocolos.social_add_friend(this.itdata.data.guid);
            var $evt = new social.SocialUiEvent(social.SocialUiEvent.REFRESHADDlIST_EVENT);
            $evt.index = this.itdata.id;
            ModuleEventManager.dispatchEvent($evt);
        };
        return AddFriendItemRender;
    }(SListItem));
    social.AddFriendItemRender = AddFriendItemRender;
})(social || (social = {}));
//# sourceMappingURL=AddFriendList.js.map