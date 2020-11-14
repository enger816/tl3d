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
var special;
(function (special) {
    var SList = Pan3d.SList;
    var UIManager = Pan3d.UIManager;
    var SListItem = Pan3d.SListItem;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var Vector2D = Pan3d.Vector2D;
    var TextureManager = Pan3d.TextureManager;
    var UiDraw = Pan3d.UiDraw;
    var Rectangle = Pan3d.Rectangle;
    var SpecialMeshVo = /** @class */ (function () {
        function SpecialMeshVo() {
        }
        return SpecialMeshVo;
    }());
    special.SpecialMeshVo = SpecialMeshVo;
    var SpecialUiList = /** @class */ (function (_super) {
        __extends(SpecialUiList, _super);
        function SpecialUiList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -0;
            _this._maskLevel = 7;
            return _this;
        }
        SpecialUiList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        SpecialUiList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, SpecialViewRender, 445, 135 * 4, 0, 135, 4, 512, 1024, 1, 6);
        };
        SpecialUiList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        SpecialUiList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return SpecialUiList;
    }(SList));
    special.SpecialUiList = SpecialUiList;
    var SpecialViewRender = /** @class */ (function (_super) {
        __extends(SpecialViewRender, _super);
        function SpecialViewRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lookAtFinishVideoTm = 0;
            _this._num = 1;
            return _this;
        }
        SpecialViewRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            //this.Special_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Special_bg", 0, 0, 400, 64);
            this.Special_bg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_bg", 0, 0, 300, 120);
            $container.addChild(this.Special_bg);
            this.Special_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_info", 300, 0, 120, 75);
            $container.addChild(this.Special_info);
            this.Special_pass = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_pass", 100, 30, 95, 60);
            $container.addChild(this.Special_pass);
            this.Special_but = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_but", 310, 80, 110, 40);
            $container.addChild(this.Special_but);
            this.Special_but.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.Special_but.addEventListener(InteractiveEvent.Up, this.butUp, this);
        };
        SpecialViewRender.prototype.butDown = function (evt) {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y);
            this.downTarget = evt.target;
        };
        SpecialViewRender.prototype.butUp = function (evt) {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $specialMeshVo = this.itdata.data;
                this.loadSpecialSceneData($specialMeshVo.mapname);
                var $selfMaxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
                if ($specialMeshVo.openlevel <= $selfMaxLevel) {
                    if (GameData.isCanUseLookVideoBut) {
                        this.toLookAdAndPlay($specialMeshVo);
                    }
                    else {
                        if (GameData.severinfo.special.needshare) {
                            this.shareBut_Clik($specialMeshVo);
                        }
                        else {
                            this.isLoadFinish = true;
                            this.tobePlay($specialMeshVo);
                        }
                    }
                }
            }
        };
        SpecialViewRender.prototype.loadSpecialSceneData = function (mapStr) {
            var _this = this;
            this.isLoadFinish = false;
            var sceneRes = new Pan3d.SceneRes;
            sceneRes.load(mapStr, function () { }, function () { }, function ($data) {
                console.log("预备加载特殊场景", mapStr);
                _this.isLoadFinish = true;
            });
        };
        SpecialViewRender.prototype.shareBut_Clik = function ($specialMeshVo) {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    _this.tobePlay($specialMeshVo);
                }
                else {
                    msgalert.AlertUtil.show("需要分享成功才能继续挑战", "提示", function (value) {
                        if (value == 1) {
                            _this.shareBut_Clik($specialMeshVo);
                        }
                    }, 2);
                }
            }, AllShareMeshVo.type9));
        };
        SpecialViewRender.prototype.tobePlay = function ($specialMeshVo) {
            if (this.isLoadFinish) {
                Pan3d.ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.HIDE_SPECIAL_PANEL));
                GameData.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SELECT_SPECIAL_LEVEL), $specialMeshVo);
            }
            else {
                msgalert.AlertUtil.show("网络中断，无法加载场景", "提示", function (value) {
                }, 2);
            }
        };
        SpecialViewRender.prototype.toLookAdAndPlay = function ($specialMeshVo) {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                if (value == 0) {
                }
                else if (value == 1) {
                    _this.tobePlay($specialMeshVo);
                }
                else if (value == 2) {
                    msgalert.AlertUtil.show("需要看完视屏才能挑战\n是否还继续观看", "提示", function (value) {
                        if (value == 1) {
                            _this.toLookAdAndPlay($specialMeshVo);
                        }
                    }, 2);
                }
            });
        };
        SpecialViewRender.prototype.render = function ($data) {
            this.itdata = $data;
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_info.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_bg.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_but.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_pass.skinName);
            if ($data && $data.data) {
                var $taskMeshVo = $data.data;
                var $textColor = ColorType.Black000000;
                this.drawRankCell(this.Special_info, $taskMeshVo.ranklist);
                var $selfMaxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
                if ($taskMeshVo.openlevel <= $selfMaxLevel) {
                    this.drawPicAndTxt(this.Special_but, "But_base_1", "挑战排名", new Vector2D(0, 10), TextAlign.CENTER);
                }
                else {
                    this.drawPicAndTxt(this.Special_but, "But_base_2", $taskMeshVo.openlevel + "关开启", new Vector2D(0, 10), TextAlign.CENTER);
                }
                this.uiAtlas.upDataPicToTexture("panelui/special/bg/" + $taskMeshVo.picurl, this.Special_bg.skinName);
                if ($taskMeshVo.isPass) {
                    this.uiAtlas.upDataPicToTexture("panelui/special/bg/ispasstxt.png", this.Special_pass.skinName);
                }
            }
        };
        SpecialViewRender.prototype.drawRankCell = function ($ui, $arr) {
            var $rect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            for (var i = 0; i < $arr.length; i++) {
                var $pos = new Vector2D(0, i * 25);
                UiDraw.cxtDrawImg(this.uiAtlas.ctx, "List_id_rank" + (1 + i), new Rectangle(0, $pos.y, 30, 25), UIData.textlist);
                LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, Pan3d.ColorType.Black000000 + $arr[i].name, 16, 35, $pos.y + 5, TextAlign.LEFT);
            }
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        };
        SpecialViewRender.prototype.drawPicAndTxt = function ($ui, puslicname, txt, pos, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $rect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 16, pos.x, pos.y, $align);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        };
        SpecialViewRender.prototype.fileColor = function ($iconName, $color) {
            var rec = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color;
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        };
        return SpecialViewRender;
    }(SListItem));
    special.SpecialViewRender = SpecialViewRender;
})(special || (special = {}));
//# sourceMappingURL=SpecialLiseView.js.map