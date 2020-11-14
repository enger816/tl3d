var IconManager = /** @class */ (function () {
    function IconManager() {
        this._dic = new Object;
        this._loadDic = new Object;
    }
    IconManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new IconManager();
        }
        return this._instance;
    };
    IconManager.prototype.getIconName = function (name, $fun, $info) {
        if ($info === void 0) { $info = null; }
        this.getIcon(geteqiconIconUrl(name), $fun, $info);
    };
    IconManager.prototype.getIcon = function (url, $fun, $info) {
        var _this = this;
        if ($info === void 0) { $info = null; }
        var uri = Scene_data.fileRoot + url;
        if (this._dic[uri]) {
            if ($info) {
                $fun(this._dic[uri], $info);
            }
            else {
                $fun(this._dic[uri]);
            }
            return;
        }
        else if (!this._loadDic[uri]) {
            this._loadDic[uri] = new Array;
            this._loadDic[uri].push({ fun: $fun, info: $info });
            var _img = new Image();
            _img.onload = function () {
                var loadList = _this._loadDic[uri];
                for (var i = 0; i < loadList.length; i++) {
                    var obj = loadList[i];
                    if (obj.info) {
                        obj.fun(_img, obj.info);
                    }
                    else {
                        obj.fun(_img);
                    }
                    //loadList[i](_img);
                }
                delete _this._loadDic[uri];
                _this._dic[uri] = _img;
            };
            _img.src = uri;
        }
        else {
            this._loadDic[uri].push({ fun: $fun, info: $info });
        }
    };
    IconManager.prototype.drawLoadImg = function ($ui, $url) {
    };
    /**绘制原型图标
     * type 0 野怪 1 法宝 2 技能 3角色
     *
    */
    IconManager.prototype.drawCircleIcon = function ($ui, $type, $id, gray, $data, $select) {
        if (gray === void 0) { gray = false; }
        if ($data === void 0) { $data = null; }
        if ($select === void 0) { $select = false; }
        var url = "";
        if ($type == 0) {
            var obj = tb.TB_item_template.get_TB_item_template($id);
            url = geteqiconIconUrl(obj.icon);
        }
        else if ($type == 1) {
            var objTrea = TableData.getInstance().getData(TableData.tb_talisman_base, $id);
            url = getTreasureIconUrl(objTrea.icon);
        }
        else if ($type == 2) {
            var objskill = tb.TB_skill_base.get_TB_skill_base($id);
            url = getSkillIconUrl(String(objskill.icon));
        }
        else if ($type == 3) {
            url = getRoleIconUrl("1");
        }
        IconManager.getInstance().getIcon(url, function ($img) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);
            if (gray) {
                UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68));
            }
            if ($select) {
                UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            }
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
        if ($type == 2 && $data > 0) {
            var skillObj = new Object;
            skillObj.baseData = objskill;
            skillObj.levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, objskill.uplevel_id[0] + $data - 1);
            skillObj.lev = $data;
            $ui.data = skillObj;
            $ui.addEventListener(InteractiveEvent.Up, this.itemSkillClick, this);
        }
    };
    /**
     * 绘制坐骑头像74*74
     * @param  $ui
     * @param  $id
     * @param gray
     * @param select
     */
    IconManager.prototype.drawMountIcon = function ($ui, $id, gray, select) {
        // var objskill: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
        // var url: string = getSkillIconUrl(String(objskill.icon))
        if (gray === void 0) { gray = false; }
        if (select === void 0) { select = false; }
        IconManager.getInstance().getIcon(getMountIconUrl(String($id)), function ($img) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(3, 3, 68, 68), UIData.publicUi);
            ctx.drawImage($img, 0, 0, $img.width, $img.height, 6, 6, 62, 62);
            if (gray) {
                UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 74, 74));
                UiDraw.cxtDrawImg(ctx, PuiData.A_CHAIN, new Rectangle(4, 4, 65, 65), UIData.publicUi);
            }
            if (select) {
                UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(0, 0, 74, 74), UIData.publicUi);
            }
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
    };
    /**
     * 绘制58*58的技能图标
     */
    IconManager.prototype.drawMinSkillIcon = function ($ui, $id, gray, lev) {
        if (gray === void 0) { gray = false; }
        if (lev === void 0) { lev = 1; }
        var objskill = TableData.getInstance().getData(TableData.tb_skill_base, $id);
        var url = getSkillIconUrl(String(objskill.icon));
        IconManager.getInstance().getIcon(url, function ($img) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG58, new Rectangle(0, 0, 58, 58), UIData.publicUi);
            ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 50, 50);
            if (gray) {
                UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 58, 58));
            }
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
        var skillObj = new Object;
        skillObj.baseData = objskill;
        skillObj.levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, objskill.uplevel_id[0] + lev - 1);
        skillObj.lev = lev;
        $ui.data = skillObj;
        $ui.addEventListener(InteractiveEvent.Up, this.itemSkillClick, this);
    };
    IconManager.prototype.drawCircleBossIcon = function ($ui, $id, $type) {
        var obj = tb.TB_creature_template.get_TB_creature_template($id);
        var url = getRoleIconUrl(String(obj.avatar));
        IconManager.getInstance().getIcon(url, function ($img) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            if ($type == 1) {
                UiDraw.cxtDrawImg(ctx, PuiData.BOSSBG76, new Rectangle(0, 0, 76, 76), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 8, 8, 60, 60);
            }
            else {
                UiDraw.cxtDrawImg(ctx, PuiData.BOSSBG64, new Rectangle(0, 0, 72, 72), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 8, 8, 56, 56);
            }
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
    };
    IconManager.prototype.drawTxtLabel = function ($ui, $str) {
        var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
        var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
        UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
        LabelTextFont.writeSingleLabelToCtx(ctx, $str, 16, $rec.pixelWitdh - ctx.measureText($str).width - 15, 5, TextAlign.LEFT, ColorType.Orange7a2f21);
        $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
    };
    IconManager.prototype.drawCostTxtLabel = function ($ui, $str) {
    };
    IconManager.prototype.drawSkillIcon = function ($ui) {
    };
    IconManager.prototype.clearItemEvent = function ($ui) {
        $ui.data = null;
        $ui.removeEventListener(InteractiveEvent.Up, this.itemClick, this);
    };
    IconManager.prototype.drawItemIcon60 = function ($ui, id, num, gray, hasTips) {
        if (num === void 0) { num = 0; }
        if (gray === void 0) { gray = false; }
        if (hasTips === void 0) { hasTips = true; }
        if (id > 0) {
            var obj = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon, function ($img) {
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                if (obj.type == 1) {
                    UiDraw.cxtDrawImg(ctx, "A_JJ" + obj.realmbreak_level, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                    //ArtFont.getInstance().writeFontToCtxCenten(ctx,String(obj.level),ArtFont.num63,18,4,4);
                }
                if (num > 1) {
                    var strNum = Snum(num);
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, strNum, 16, 64, 45, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                }
                if (gray) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68));
                }
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
            if (hasTips) {
                $ui.data = obj;
                $ui.addEventListener(InteractiveEvent.Up, this.itemClick, this);
            }
        }
        else {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }
    };
    IconManager.prototype.drawItemIcon40 = function ($ui, id, num, gray, hasTips) {
        if (num === void 0) { num = 0; }
        if (gray === void 0) { gray = false; }
        if (hasTips === void 0) { hasTips = true; }
        if (id > 0) {
            var obj = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon, function ($img) {
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 48, 48), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 48, 48), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 40, 40);
                if (num > 1) {
                    var strNum = Snum(num);
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, strNum, 12, 44, 30, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                }
                if (gray) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 48, 48));
                }
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
            if (hasTips) {
                $ui.data = obj;
                $ui.addEventListener(InteractiveEvent.Up, this.itemClick, this);
            }
        }
        else {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 48, 48), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }
    };
    IconManager.prototype.drawVip = function ($ui, vip) {
        IconManager.getInstance().getIcon(getVipIconUrl(vip), function ($img) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $img.width, $img.height);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
    };
    IconManager.prototype.itemClick = function ($e) {
        var itemData = $e.target.data;
        var bag = new BagItemData();
        bag.entryData = itemData;
        var evt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        evt.data = bag;
        evt.buttonType = -1;
        ModuleEventManager.dispatchEvent(evt);
    };
    IconManager.prototype.itemSkillClick = function ($e) {
        var skillData = $e.target.data;
        var evt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        evt.data = skillData;
        evt.buttonType = 7;
        ModuleEventManager.dispatchEvent(evt);
    };
    return IconManager;
}());
//# sourceMappingURL=IconManager.js.map