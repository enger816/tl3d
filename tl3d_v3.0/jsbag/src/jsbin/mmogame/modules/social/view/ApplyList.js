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
    var ApplyList = /** @class */ (function (_super) {
        __extends(ApplyList, _super);
        function ApplyList() {
            var _this = _super.call(this) || this;
            _this.left = 184;
            _this.top = 140;
            _this.setShowLevel(4);
            return _this;
        }
        ApplyList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        ApplyList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, ApplyItemRender, 593, 264, 0, 82, 3, 256, 512, 1, 5);
        };
        /**
         * refreshData
         */
        ApplyList.prototype.refreshDataByNewData = function () {
            var $ary = GuidData.social.getApplyList();
            var $sListItemData = this.getData($ary);
            this.refreshData($sListItemData);
        };
        ApplyList.prototype.getApplyList = function () {
            var $ary = GuidData.social.getApplyList();
            var flag = GuidData.social.getApplyFlag();
            var list = new Array;
            for (var i = flag; i < $ary.length; i++) {
                list.push($ary[i]);
            }
            for (var i = 0; i < flag; i++) {
                list.push($ary[i]);
            }
            return list;
        };
        ApplyList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var data = $ary[i];
                if (data) {
                    var item = new SListItemData;
                    item.data = data;
                    item.id = i;
                    ary.push(item);
                }
            }
            return ary;
        };
        ApplyList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshDataByNewData();
            }
        };
        ApplyList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return ApplyList;
    }(SList));
    social.ApplyList = ApplyList;
    var ApplyItemRender = /** @class */ (function (_super) {
        __extends(ApplyItemRender, _super);
        function ApplyItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        ApplyItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
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
            this.btn2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ibtn", 499, 19, 72, 46);
            $container.addChild(this.btn2);
            this.btn2.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.bg1 = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Ibg", 0, 0, 593, 82);
            $container.addChild(this.bg1);
            // this.bg1.addEventListener(InteractiveEvent.Down, this.butClik, this);
        };
        ApplyItemRender.prototype.render = function ($data) {
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
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.btn2.skinName, "agreed");
            }
            else {
                this.setnull();
            }
        };
        ApplyItemRender.prototype.setnull = function () {
            UiDraw.clearUI(this.bg1);
            UiDraw.clearUI(this.icon1);
            UiDraw.clearUI(this.vip1);
            UiDraw.clearUI(this.name1);
            UiDraw.clearUI(this.fam1);
            UiDraw.clearUI(this.btn2);
        };
        ApplyItemRender.prototype.setIcon = function ($obj) {
            var _this = this;
            //console.log("---$obj--", $obj);
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
        ApplyItemRender.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.btn2:
                    if (this.itdata) {
                        this.sureApplyFriend();
                    }
                    break;
                default:
                    break;
            }
        };
        ApplyItemRender.prototype.isfriend = function ($itdata) {
            var ary = GuidData.social.getFriendList();
            for (var i = 0; i < ary.length; i++) {
                if ($itdata.guid == ary[i].guid) {
                    return true;
                }
            }
            return false;
        };
        ApplyItemRender.prototype.sureApplyFriend = function () {
            var ary = GuidData.social.getApplyList();
            if (ary.length) {
                NetManager.getInstance().protocolos.social_sureadd_friend(this.itdata.data.guid);
            }
        };
        return ApplyItemRender;
    }(SListItem));
    social.ApplyItemRender = ApplyItemRender;
})(social || (social = {}));
//# sourceMappingURL=ApplyList.js.map