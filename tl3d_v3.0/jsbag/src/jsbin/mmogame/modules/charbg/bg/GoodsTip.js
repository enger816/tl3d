var GoodsTip = /** @class */ (function () {
    function GoodsTip() {
        var _this = this;
        //private _showType:boolean;
        this._hasInit = false;
        this._btnType = -1;
        //this._uiAtlas = new UIAtlas();
        //this._uiAtlas.setInfo("ui/uidata/charbg/tip.xml", "ui/uidata/charbg/tip.png", () => { this.loadConfigCom() }, "ui/uidata/charbg/tipuse.png");
        this.atlasAry = new Array;
        this.atlasAry.push(new UIAtlas(), new UIAtlas());
        var atlasUtil = new TipAtlasUtil();
        atlasUtil.setInfo("ui/uidata/charbg/tip.xml", "ui/uidata/charbg/tip.png", function () { _this.loadConfigCom(); }, null, this.atlasAry);
    }
    GoodsTip.getInstance = function () {
        if (!this._instance) {
            this._instance = new GoodsTip();
        }
        return this._instance;
    };
    GoodsTip.prototype.init = function () {
    };
    GoodsTip.prototype.loadConfigCom = function () {
        this._equTip = new EquTip();
        this._equTip.setUIAtlas(this.atlasAry[1]);
        this._itemTip = new ItemTip();
        this._itemTip.setUIAtlas(this.atlasAry[0]);
        this._equItemTip = new EquItemTip();
        this._equItemTip.setUIAtlas(this.atlasAry[0]);
        this._skillTip = new SkillTip();
        this._skillTip.setUIAtlas(this.atlasAry[0]);
        this._hasInit = true;
        if (this._data) {
            this.show(this._data, this._btnType);
        }
    };
    /**
    -1纯信息 1装备栏装备 2背包物品 3背包对比装备 4家族仓库中物品 5上交家族装备 6 他人装备 7 技能tip
     */
    GoodsTip.prototype.show = function ($data, btnType) {
        if (btnType === void 0) { btnType = 0; }
        //console.log("当前物品GUID:", $data.guid)
        if (!this._hasInit) {
            this._data = $data;
            this._btnType = btnType;
            return;
        }
        if (btnType == 1 || btnType == 6) {
            this._equTip.show($data, btnType);
            this._equTip.center = -150;
            //this._equTip.setBtnVisible(true);
            var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
            $scenePange.data = SharedDef.MODULE_BAG;
            ModuleEventManager.dispatchEvent($scenePange);
            return;
        }
        else if (btnType == 2 || btnType == 4 || btnType == 5) {
            if (this.isEqu($data)) {
                var equData = this.getEquPosData($data.entryData.pos);
                if (equData) {
                    this._equTip.show(equData, 3);
                    this._equTip.center = -195;
                    this._equItemTip.center = 175;
                }
                else {
                    this._equItemTip.center = -115;
                }
                this._equItemTip.show($data, btnType);
            }
            else {
                this._itemTip.show($data, btnType);
            }
        }
        else if (btnType == -1) {
            this._itemTip.show($data, btnType);
        }
        else if (btnType == 7) {
            this._skillTip.show($data);
        }
    };
    /**
     * 隐藏所有tips
     */
    GoodsTip.prototype.hideAllTip = function () {
        this._itemTip.hide();
        this._equItemTip.hide();
        this._equTip.hide();
        this._skillTip.hide();
    };
    GoodsTip.prototype.isEqu = function ($data) {
        return Number($data.entryData.type_c) == SharedDef.ITEM_TYPE_EQUIP;
    };
    GoodsTip.prototype.getEquPosData = function (pos) {
        return GuidData.bag.getEquByPart(pos);
    };
    return GoodsTip;
}());
var TipAtlasUtil = /** @class */ (function () {
    function TipAtlasUtil() {
    }
    TipAtlasUtil.prototype.setInfo = function (configUrl, imgUrl, $fun, useImgUrl, $ary) {
        var _this = this;
        if (useImgUrl === void 0) { useImgUrl = null; }
        this._ary = $ary;
        this._useImgUrl = useImgUrl;
        this._completeFun = $fun;
        LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, function ($str) {
            var obj = JSON.parse($str);
            _this.configData = obj.uiArr;
            _this.layoutData = obj.panelArr;
            _this.loadImgUrl(imgUrl);
        });
    };
    TipAtlasUtil.prototype.loadImgUrl = function (imgUrl) {
        var _this = this;
        this._baseImg = new Image();
        this._baseImg.onload = function () {
            if (_this._useImgUrl) {
                _this.loadUseImg();
            }
            else {
                _this.applyEnd();
            }
        };
        this._baseImg.src = Scene_data.fileRoot + imgUrl;
    };
    TipAtlasUtil.prototype.loadUseImg = function () {
        var _this = this;
        this.useImg = new Image();
        this.useImg.onload = function () {
            _this.applyEnd();
        };
        this.useImg.src = Scene_data.fileRoot + this._useImgUrl;
    };
    TipAtlasUtil.prototype.applyEnd = function () {
        for (var i = 0; i < this._ary.length; i++) {
            var als = this._ary[i];
            als.textureRes = TextureManager.getInstance().getTextureRes(this._baseImg);
            als.configData = this.configData;
            als.layoutData = this.layoutData;
            als.useImg = this.useImg;
        }
        this._completeFun();
    };
    return TipAtlasUtil;
}());
//# sourceMappingURL=GoodsTip.js.map