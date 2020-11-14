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
    var ZhaoMuVo = /** @class */ (function () {
        function ZhaoMuVo() {
            this.isok = false;
        }
        return ZhaoMuVo;
    }());
    faction.ZhaoMuVo = ZhaoMuVo;
    var ApplyZhaoMuListPanel = /** @class */ (function (_super) {
        __extends(ApplyZhaoMuListPanel, _super);
        function ApplyZhaoMuListPanel() {
            var _this = _super.call(this) || this;
            _this.left = 43;
            _this.top = 132;
            return _this;
        }
        ApplyZhaoMuListPanel.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            // this.contextNum = 10;
            this.initData();
        };
        ApplyZhaoMuListPanel.prototype.initData = function () {
            var ary = new Array();
            this.setData(ary, ApplyZhaoMuListItemRender, 589, 250, 0, 50, 5, 256, 512, 1, 5, 1);
        };
        ApplyZhaoMuListPanel.prototype.refreshDataByNewData = function ($ary) {
            this._sListItemData = this.getData($ary);
            // this.resetDataByok();
            this.refreshData(this._sListItemData);
            this.setSelectIndex(0);
        };
        ApplyZhaoMuListPanel.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                var $zhaoMuVo = new ZhaoMuVo();
                $zhaoMuVo.vo = $ary[i];
                // if ($index == i) {
                //     item.selected = true;
                // }
                item.data = $zhaoMuVo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        ApplyZhaoMuListPanel.prototype.isokstate = function ($data) {
            if (!this._isokary) {
                this._isokary = new Array;
            }
            this._isokary.push($data);
            this.resetDataByok();
        };
        ApplyZhaoMuListPanel.prototype.resetDataByok = function () {
            if (this._isokary && this._isokary.length > 0) {
                for (var i = 0; i < this._sListItemData.length; i++) {
                    if (this.compareData(this._sListItemData[i])) {
                        this._sListItemData[i].data.isok = true;
                    }
                }
                this.refreshDraw();
            }
        };
        ApplyZhaoMuListPanel.prototype.compareData = function ($data) {
            for (var i = 0; i < this._isokary.length; i++) {
                if ($data.data.vo.faction_guid == this._isokary[i].data.vo.faction_guid) {
                    return true;
                }
            }
            return false;
        };
        // protected toSeversUrl(): void {
        //     //console.log("==页数==",this.pageId);
        //     NetManager.getInstance().protocolos.faction_getlist(this.pageId, this.contextNum, 0);
        // }
        // protected meshSeverData(byte: ByteArray): void {
        //     var faction: s2c_faction_get_list_result = new s2c_faction_get_list_result()
        //     s2c_faction_get_list_result.read(faction, byte);
        //     for (var i: number = 0; i < faction.list.length; i++) {
        //         var $itemDataVo: SListItemData = new SListItemData()
        //         $itemDataVo.id = (faction.curpag - 1) * this.contextNum + i
        //         var $zhaoMuVo: ZhaoMuVo = new ZhaoMuVo();
        //         $zhaoMuVo.vo = faction.list[i]
        //         $itemDataVo.data = $zhaoMuVo
        //         this.pushDataToList($itemDataVo)
        //     }
        // }
        // protected getHanderMap(): Object {
        //     var obj: Object = new Object;
        //     obj[Protocols.SMSG_FACTION_GET_LIST_RESULT] = ($byte: ByteArray) => { this.getSeverFunData($byte) };
        //     return obj;
        // }
        ApplyZhaoMuListPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                // this.sendPageByNum(1);
            }
        };
        ApplyZhaoMuListPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return ApplyZhaoMuListPanel;
    }(SList));
    faction.ApplyZhaoMuListPanel = ApplyZhaoMuListPanel;
    var ApplyZhaoMuListItemRender = /** @class */ (function (_super) {
        __extends(ApplyZhaoMuListItemRender, _super);
        function ApplyZhaoMuListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        ApplyZhaoMuListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var centerRender = this._customRenderAry[0];
            this.bg_0 = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 589, 50);
            $container.addChild(this.bg_0);
            this.b_S_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_S", 11, 8, 30, 30);
            $container.addChild(this.b_S_0);
            this.i_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I", 55, 4, 42, 42);
            $container.addChild(this.i_0);
            this.n_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "N", 121, 16, 98, 20);
            $container.addChild(this.n_0);
            this.lev_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Lev", 240, 16, 40, 20);
            $container.addChild(this.lev_0);
            this.levMax_0 = this.creatSUI(centerRender, this.parentTarget.baseAtlas, "LevMax", 295, 16, 80, 20);
            $container.addChild(this.levMax_0);
            this.zn_0 = this.creatSUI(centerRender, this.parentTarget.baseAtlas, "Zn", 385, 16, 110, 20);
            $container.addChild(this.zn_0);
            this.needLev_0 = this.creatSUI(centerRender, this.parentTarget.baseAtlas, "NeedLev", 520, 16, 45, 20);
            $container.addChild(this.needLev_0);
            this.select_0 = this.creatGrid9SUI(centerRender, this.parentTarget.baseAtlas, "Select", 0, 0, 589, 50, 15, 15);
            $container.addChild(this.select_0);
        };
        Object.defineProperty(ApplyZhaoMuListItemRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyRender();
                }
                if (val) {
                    var $evt = new faction.FactionEvent(faction.FactionEvent.REFRESHAPPLYZHAOMUlIST_EVENT);
                    $evt.data = this.itdata;
                    ModuleEventManager.dispatchEvent($evt);
                }
            },
            enumerable: true,
            configurable: true
        });
        ApplyZhaoMuListItemRender.prototype.refreshDraw = function () {
            if (this.itdata) {
                this.applyRender();
            }
        };
        ApplyZhaoMuListItemRender.prototype.applyRender = function () {
            //console.log("===this.itdata==", this.itdata);
            var $data = this.itdata;
            var $vo = $data.data;
            var $tab = tb.Tb_faction_base.get_Tb_faction_baseById($vo.vo.level);
            this.bg_0.addEventListener(InteractiveEvent.Down, this.equClick, this);
            if (!($data.id % 2)) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.bg_0.skinName, "bg");
            }
            else {
                LabelTextFont.clearLabel(this.uiAtlas, this.bg_0.skinName);
            }
            //勾选框
            if ($vo.isok) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.b_S_0.skinName, UIData.publicUi, PuiData.SELECT_1);
            }
            else {
                LabelTextFont.clearLabel(this.uiAtlas, this.b_S_0.skinName);
            }
            //头像
            this.setIcon($data);
            //家族名
            // var name = $vo.vo.faction_name.split(",");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.n_0.skinName, "[853d07]" + getBaseName($vo.vo.faction_name), 16, TextAlign.CENTER);
            //家族等级
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.lev_0.skinName, "[853d07]" + String($vo.vo.level), 16, TextAlign.CENTER);
            // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.lev_0.skinName, String($vo.vo.level), ArtFont.num1, TextAlign.CENTER);
            //人数
            var bb = $vo.vo.player_count + "/" + $tab.maxnum;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.levMax_0.skinName, "[853d07]" + bb, 16, TextAlign.CENTER);
            // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.levMax_0.skinName, bb, ArtFont.num1, TextAlign.CENTER)
            //帮主名字
            // var bzname = $vo.vo.faction_bz.split(",");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.zn_0.skinName, "[853d07]" + getBaseName($vo.vo.faction_bz), 16, TextAlign.CENTER);
            //最低等级
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.needLev_0.skinName, "[853d07]" + String($vo.vo.minlev), 16, TextAlign.CENTER);
            // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.needLev_0.skinName, String($vo.vo.minlev), ArtFont.num1, TextAlign.CENTER)
            if (this.selected) {
                // this.drawselect();
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.select_0.skinName, UIData.publicUi, PuiData.Select);
            }
            else {
                LabelTextFont.clearLabel(this.uiAtlas, this.select_0.skinName);
            }
        };
        ApplyZhaoMuListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.bg_0.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        };
        ApplyZhaoMuListItemRender.prototype.setnull = function () {
            UiDraw.clearUI(this.bg_0);
            UiDraw.clearUI(this.b_S_0);
            UiDraw.clearUI(this.i_0);
            UiDraw.clearUI(this.n_0);
            UiDraw.clearUI(this.lev_0);
            UiDraw.clearUI(this.levMax_0);
            UiDraw.clearUI(this.zn_0);
            UiDraw.clearUI(this.needLev_0);
            UiDraw.clearUI(this.select_0);
        };
        ApplyZhaoMuListItemRender.prototype.equClick = function (evt) {
            // UIManager.popClikNameFun("ApplyZhaoMuListPanel", SharedDef.MODULE_FACTION);
            //  if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
            //     return;
            // }
            //选中，事件派发
            this.setSelect();
        };
        ApplyZhaoMuListItemRender.prototype.setIcon = function ($obj) {
            var _this = this;
            var $vo = $obj.data;
            var b = $vo.vo.icon == 0 ? 1 : $vo.vo.icon;
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String(b)), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.i_0.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 42, 42), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 1, 1, 40, 40);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        return ApplyZhaoMuListItemRender;
    }(SListItem));
    faction.ApplyZhaoMuListItemRender = ApplyZhaoMuListItemRender;
})(faction || (faction = {}));
//# sourceMappingURL=ApplyZhaoMuListPanel.js.map