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
var kuafu;
(function (kuafu) {
    var KuaFuPkCellVo = /** @class */ (function () {
        function KuaFuPkCellVo($bottomRender, $midRender, $topRender, $id) {
            this.headPic = $midRender.getComponent("e_char_cell_" + $id);
            this.uiname = $midRender.getComponent("e_char_cell_name" + $id);
            this.e_char_cell_mask = $topRender.getComponent("e_char_cell_mask");
            this.bar = $midRender.getComponent("e_char_cell_hp");
            this.bg = $bottomRender.getComponent("e_char_cell_hp_bg");
            this.e_char_cell_kill = $topRender.getComponent("e_char_cell_kill");
            var $pos = new Vector2D(this.headPic.x, this.headPic.y + 1);
            this.uiname.y = $pos.y + 8;
            this.bg.y = $pos.y - 5;
            this.bar.y = this.bg.y + 32;
            this.e_char_cell_mask.y = $pos.y - 6;
            this.e_char_cell_mask.x = $pos.x - 4;
            this.e_char_cell_kill.y = this.bg.y + 6;
            this.uiAtlas = $bottomRender.uiAtlas;
        }
        KuaFuPkCellVo.prototype.draw = function ($vo, $prente) {
            var _this = this;
            IconManager.getInstance().getIcon(getTouPic($vo.gender), function ($img) {
                var $skillrec = _this.uiAtlas.getRec(_this.headPic.skinName);
                var $ctx = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                $ctx.drawImage($img, 0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight);
                if ($vo.dieState == 1) {
                    UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight));
                }
                //    ArtFont.getInstance().writeFontToCtxRight($ctx, String($vo.level), ArtFont.num1, 44, 5, 4)
                _this.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
            });
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.uiname.skinName, "[d6e7ff]" + getBaseName($vo.name), 14, TextAlign.LEFT, "#ffffff");
            this.bar.uvScale = $vo.hprate / 100;
            $prente.setUiListVisibleByItem([this.e_char_cell_kill], $vo.dieState == 1);
            $prente.setUiListVisibleByItem([this.headPic, this.uiname, this.bar, this.bg, this.e_char_cell_mask], true);
            this.e_char_cell_mask.goToAndStop(kuafu.KuaFu3v3Model.getInstance().selfVo.group - 1);
        };
        return KuaFuPkCellVo;
    }());
    kuafu.KuaFuPkCellVo = KuaFuPkCellVo;
    var KillInfoUi = /** @class */ (function () {
        function KillInfoUi($perent, $bottom, $top) {
            this._ttyy = 0;
            this.killState = false;
            this._visible = false;
            this.perent = $perent;
            this._bottomRender = $bottom;
            this._topRender = $top;
            this.bg = this._bottomRender.getComponent("e_kill_info");
            this.e_kill_top_pic = this._topRender.getComponent("e_kill_top_pic");
            this.e_kill_info_icon0 = this._bottomRender.getComponent("e_kill_info_icon0");
            this.e_kill_info_icon1 = this._bottomRender.getComponent("e_kill_info_icon1");
            this.e_kill_info_name0 = this._topRender.getComponent("e_kill_info_name0");
            this.e_kill_info_name1 = this._topRender.getComponent("e_kill_info_name1");
            this.e_kill_pic_mask0 = this._topRender.getComponent("e_kill_pic_mask0");
            this.e_kill_pic_mask1 = this._topRender.getComponent("e_kill_pic_mask1");
            this.basePos = new Vector2D(this.bg.x, this.bg.y);
        }
        KillInfoUi.prototype.pushKillData = function ($A, $B) {
            if (!this.infoItem) {
                this.infoItem = new Array();
            }
            this.infoItem.push({ a: $A, b: $B, });
            this.show();
        };
        KillInfoUi.prototype.show = function () {
            var _this = this;
            if (this.visible == false && this.infoItem.length) {
                var obj = this.infoItem.pop();
                var $A = obj.a;
                var $B = obj.b;
                this.killState = $A.group == 1;
                // this.killState = !this.killState
                this.endTime = TimeUtil.getTimer() + 2 * 1000;
                this._bottomRender.uiAtlas.upDataPicToTexture(getTouPic($A.gender), this.e_kill_info_icon0.skinName);
                this._bottomRender.uiAtlas.upDataPicToTexture(getTouPic($B.gender), this.e_kill_info_icon1.skinName);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.e_kill_info_name0.skinName, "[ffe57e]" + getBaseName($A.name), 18, TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.e_kill_info_name1.skinName, "[ffe57e]" + getBaseName($B.name), 18, TextAlign.CENTER);
                this.visible = true;
                this.ttyy = -50;
                TimeUtil.addTimeOut(3000, function () {
                    if (_this.endTime < TimeUtil.getTimer()) {
                        TweenLite.to(_this, 0.1, { ttyy: 50, onComplete: function () { _this.changeMoveOut(); } });
                    }
                });
                TweenLite.to(this, 0.1, { ttyy: 0 });
            }
        };
        KillInfoUi.prototype.changeMoveOut = function () {
            this.visible = false;
            this.show();
        };
        Object.defineProperty(KillInfoUi.prototype, "ttyy", {
            get: function () {
                return this._ttyy;
            },
            set: function (value) {
                this._ttyy = value;
                this.bg.y = this.basePos.y - this._ttyy;
                if (this.killState) {
                    this.bg.goToAndStop(0);
                    this.e_kill_pic_mask0.goToAndStop(0);
                    this.e_kill_pic_mask1.goToAndStop(1);
                }
                else {
                    this.bg.goToAndStop(1);
                    this.e_kill_pic_mask0.goToAndStop(1);
                    this.e_kill_pic_mask1.goToAndStop(0);
                }
                this.e_kill_info_icon0.y = this.bg.y + 10;
                this.e_kill_info_icon1.y = this.bg.y + 10;
                this.e_kill_info_name0.y = this.bg.y + 20;
                this.e_kill_info_name1.y = this.bg.y + 30;
                this.e_kill_top_pic.y = this.bg.y;
                this.e_kill_pic_mask0.y = this.e_kill_info_icon0.y - 8;
                this.e_kill_pic_mask1.y = this.e_kill_info_icon1.y - 8;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KillInfoUi.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                if (this._visible != value) {
                    this._visible = value;
                    this.perent.setUiListVisibleByItem([this.bg, this.e_kill_info_icon0, this.e_kill_info_icon1, this.e_kill_info_name0, this.e_kill_pic_mask0, this.e_kill_pic_mask1, this.e_kill_info_name1, this.e_kill_top_pic], value);
                }
            },
            enumerable: true,
            configurable: true
        });
        return KillInfoUi;
    }());
    kuafu.KillInfoUi = KillInfoUi;
    var KuaFu3v3PkPanel = /** @class */ (function (_super) {
        __extends(KuaFu3v3PkPanel, _super);
        function KuaFu3v3PkPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.left = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            _this.kuaFuPkTopPanel = new kuafu.KuaFu3v3PkTopPanel();
            _this.updateFun = function (t) { _this.update(t); };
            return _this;
        }
        KuaFu3v3PkPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        KuaFu3v3PkPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/kuafupk.xml", "ui/uidata/kuafu/3v3/kuafupk.png", function () { _this.loadConfigCom(); });
        };
        KuaFu3v3PkPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.kuaFuPkTopPanel.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.kuaFuPkTopPanel);
            this.killInfoUi = new KillInfoUi(this, this._bottomRender, this._topRender);
            this.cellUiItem = new Array;
            for (var i = 0; i < 3; i++) {
                this.cellUiItem.push(new KuaFuPkCellVo(this._bottomRender, this._midRender, this._topRender, i));
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();
        };
        KuaFu3v3PkPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                kuafu.KuaFu3v3Model.getInstance().refreshKufuData();
                if (kuafu.KuaFu3v3Model.getInstance().selfVo) {
                    var $num = 0;
                    for (var i = 0; i < kuafu.KuaFu3v3Model.getInstance().kuafuItem.length; i++) {
                        var $vo = kuafu.KuaFu3v3Model.getInstance().kuafuItem[i];
                        if ($vo.group == kuafu.KuaFu3v3Model.getInstance().selfVo.group) {
                            this.cellUiItem[$num].draw($vo, this);
                            $num++;
                        }
                    }
                }
                this.kuaFuPkTopPanel.reeee();
            }
        };
        KuaFu3v3PkPanel.prototype.showKillLastInfo = function (a, b) {
            var $A = kuafu.KuaFu3v3Model.getInstance().kuafuItem[a];
            var $B = kuafu.KuaFu3v3Model.getInstance().kuafuItem[b];
            this.killInfoUi.pushKillData($A, $B);
        };
        KuaFu3v3PkPanel.prototype.butClik = function (evt) {
        };
        KuaFu3v3PkPanel.prototype.update = function (t) {
            if (kuafu.KuaFu3v3Model.getInstance().end) {
                return;
            }
            this.kuaFuPkTopPanel.update(t);
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.updateFun);
            }
        };
        KuaFu3v3PkPanel.prototype.show = function () {
            this.kuaFuPkTopPanel.initTime();
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addFrameTick(this.updateFun);
        };
        KuaFu3v3PkPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return KuaFu3v3PkPanel;
    }(UIPanel));
    kuafu.KuaFu3v3PkPanel = KuaFu3v3PkPanel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3PkPanel.js.map