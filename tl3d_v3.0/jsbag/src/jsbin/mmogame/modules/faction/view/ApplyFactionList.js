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
var faction;
(function (faction) {
    var ApplyFactionListVo = /** @class */ (function () {
        function ApplyFactionListVo() {
        }
        return ApplyFactionListVo;
    }());
    faction.ApplyFactionListVo = ApplyFactionListVo;
    var ApplyFactionList = /** @class */ (function (_super) {
        __extends(ApplyFactionList, _super);
        function ApplyFactionList() {
            var _this = _super.call(this) || this;
            _this.left = 305;
            _this.top = 174;
            return _this;
        }
        ApplyFactionList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        ApplyFactionList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, ApplyFactionRender, 357, 243, 0, 42, 5, 256, 512, 1, 8);
        };
        /**
         * refreshData
         */
        ApplyFactionList.prototype.refreshDataByNewData = function () {
            var $ary = GuidData.faction.getApplyList();
            var $sListItemData = this.getData($ary);
            this.refreshData($sListItemData);
        };
        ApplyFactionList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var applyFactionListVo = new ApplyFactionListVo();
                applyFactionListVo.data = $ary[i];
                var item = new SListItemData;
                item.data = applyFactionListVo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        ApplyFactionList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshDataByNewData();
            }
        };
        ApplyFactionList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return ApplyFactionList;
    }(SList));
    faction.ApplyFactionList = ApplyFactionList;
    var ApplyFactionRender = /** @class */ (function (_super) {
        __extends(ApplyFactionRender, _super);
        function ApplyFactionRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        ApplyFactionRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.I2zhanli = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2zhanli", 185, 11, 88, 20);
            $container.addChild(this.I2zhanli);
            this.I2name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2name", 5, 12, 100, 20);
            $container.addChild(this.I2name);
            this.I2vip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2vip", 106, 14, 29, 14);
            $container.addChild(this.I2vip);
            this.I2lev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2lev", 143, 12, 35, 20);
            $container.addChild(this.I2lev);
            this.I2btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2btn", 277, 2, 78, 37);
            $container.addChild(this.I2btn);
            this.I2bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "I2bg", 0, 0, 357, 42);
            $container.addChild(this.I2bg);
        };
        ApplyFactionRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo = $data.data;
                this.I2btn.addEventListener(InteractiveEvent.Down, this.butClik, this);
                if (!($data.id % 2)) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.I2bg.skinName, "bg");
                }
                //名字
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2name.skinName, getBaseName(vo.data.name), 16, TextAlign.CENTER, ColorType.Orange853d07);
                // //vip等级
                // social.SocialUitl.drawVip(this.uiAtlas, this.I2vip.skinName, vo.data.vipLev ? vo.data.vipLev : 15);
                this.uiAtlas.upDataPicToTexture(getVipIconUrl(vo.data.vipLev), this.I2vip.skinName);
                //等级
                // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.I2lev.skinName, String(vo.data.level), ArtFont.num10, TextAlign.CENTER)
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2lev.skinName, String(vo.data.level), 16, TextAlign.CENTER, ColorType.Orange853d07);
                //战力
                // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.I2zhanli.skinName, String(vo.data.force), ArtFont.num10, TextAlign.CENTER)
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2zhanli.skinName, String(vo.data.force), 16, TextAlign.CENTER, ColorType.Orange853d07);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.I2btn.skinName, "btn_ok");
            }
            else {
                this.I2btn.removeEventListener(InteractiveEvent.Down, this.butClik, this);
                this.setnull();
            }
        };
        ApplyFactionRender.prototype.setnull = function () {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2zhanli.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2name.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2vip.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2lev.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2btn.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2bg.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
        };
        ApplyFactionRender.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.I2btn:
                    if (this.itdata) {
                        // //console.log("同意");
                        this.sureJoin(this.itdata.data.data.guid);
                    }
                    break;
                default:
                    break;
            }
        };
        ApplyFactionRender.prototype.sureJoin = function (guid) {
            //同意入帮
            NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_AGREE_JOIN, 0, 0, guid, "");
        };
        return ApplyFactionRender;
    }(SListItem));
    faction.ApplyFactionRender = ApplyFactionRender;
})(faction || (faction = {}));
//# sourceMappingURL=ApplyFactionList.js.map