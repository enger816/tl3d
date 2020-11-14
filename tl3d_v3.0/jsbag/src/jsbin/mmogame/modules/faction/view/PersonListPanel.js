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
    var PersonListVo = /** @class */ (function () {
        function PersonListVo() {
            this.isok = false;
        }
        return PersonListVo;
    }());
    faction.PersonListVo = PersonListVo;
    var PersonListPanel = /** @class */ (function (_super) {
        __extends(PersonListPanel, _super);
        function PersonListPanel() {
            var _this = _super.call(this) || this;
            _this.left = 43;
            _this.top = 132;
            return _this;
        }
        PersonListPanel.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            this.initData();
        };
        PersonListPanel.prototype.initData = function () {
            var ary = new Array();
            this.setData(ary, PersonListItemRender, 590, 346, 0, 39, 8, 512, 512, 1, 10, 1);
        };
        PersonListPanel.prototype.refreshDataByNewData = function ($ary, $isfirst) {
            var $data = $ary;
            if ($isfirst) {
                for (var i = 0; i < $data.length; i++) {
                    if ($data[i].guid == GuidData.player.getGuid()) {
                        var item = $data[i];
                        $data.splice(i, 1);
                        $data.unshift(item);
                        break;
                    }
                }
            }
            this._sListItemData = this.getData($data);
            this.refreshData(this._sListItemData);
        };
        PersonListPanel.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                var $personlistVo = new PersonListVo();
                $personlistVo.factionItemData = $ary[i];
                $personlistVo.items = this.getItemsAry($ary[i]);
                // if ($index == i) {
                //     item.selected = true;
                // }
                item.data = $personlistVo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        PersonListPanel.prototype.getItemsAry = function ($data) {
            var itemsary = new Array();
            //密聊  规则:是我的好友
            if (this.ismyfriends($data.guid)) {
                itemsary.push(8);
            }
            itemsary.push(0);
            //职务  规则:我的职位为副族长以上
            if (GuidData.faction.playerIdentity < 3
                && $data.identity > GuidData.faction.playerIdentity) {
                itemsary.push(9);
            }
            //申请好友  规则:不是我的好友
            if (!this.ismyfriends($data.guid)) {
                itemsary.push(7);
            }
            //踢出家族   规则:我的职位为长老以上 且该位玩家职务比我底
            if (GuidData.faction.playerIdentity < 4
                && $data.identity > GuidData.faction.playerIdentity) {
                itemsary.push(10);
            }
            return itemsary;
        };
        PersonListPanel.prototype.ismyfriends = function ($guid) {
            var list = GuidData.social.getFriendList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].guid == $guid) {
                    return true;
                }
            }
            return false;
        };
        PersonListPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            // this.refreshDataByNewData(GuidData.faction.getFactionList());
        };
        PersonListPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return PersonListPanel;
    }(SList));
    faction.PersonListPanel = PersonListPanel;
    var PersonListItemRender = /** @class */ (function (_super) {
        __extends(PersonListItemRender, _super);
        function PersonListItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.IdentityKeyName = ["族长", "副族长", "长老", "精英", "成员"];
            return _this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        PersonListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var topRender = this._customRenderAry[0];
            this._Ibg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Ibg", 0, 0, 590, 39);
            $container.addChild(this._Ibg);
            this._Iname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Iname", 5, 10, 100, 20);
            $container.addChild(this._Iname);
            this._IVip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "IVip", 106, 13, 30, 14);
            $container.addChild(this._IVip);
            this._Iidentity_Lev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Iidentity_Lev", 144, 10, 133, 20);
            $container.addChild(this._Iidentity_Lev);
            this._Iforce_contribution = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Iforce_contribution", 283, 10, 162, 20);
            $container.addChild(this._Iforce_contribution);
            this._Iactive_logoutTime = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Iactive_logoutTime", 450, 10, 140, 20);
            $container.addChild(this._Iactive_logoutTime);
        };
        Object.defineProperty(PersonListItemRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyRender();
            },
            enumerable: true,
            configurable: true
        });
        PersonListItemRender.prototype.applyRender = function () {
            var $vo = this.itdata.data;
            // var $tab: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById($vo.vo.level);
            this._Iname.addEventListener(InteractiveEvent.Up, this.equClick, this);
            if (this.itdata.id % 2) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this._Ibg.skinName, "bg");
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._Iname.skinName, getBaseName($vo.factionItemData.name), 16, TextAlign.CENTER, "#853d07");
            this.setvip($vo);
            this.drawIdentityAndLev($vo);
            this.drawForceAndContribution($vo);
            this.drawActiveAndLogoutTime($vo);
            // if (this.selected) {
            //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.select_0.skinName, UIData.publicUi, PuiData.A_HIGHT_F);
            // } else {
            //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.select_0.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            // }
        };
        PersonListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this._Iname.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        };
        PersonListItemRender.prototype.setvip = function ($data) {
            var _this = this;
            IconManager.getInstance().getIcon(getVipIconUrl($data.factionItemData.vipLev), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this._IVip.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                //绘制头像
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $img.width, $img.height);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        PersonListItemRender.prototype.drawIdentityAndLev = function ($data) {
            var $rec = this._baseRender.uiAtlas.getRec(this._Iidentity_Lev.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            //职务
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "[853d07]" + this.IdentityKeyName[$data.factionItemData.identity - 1], 16, 70 / 2, 0);
            //等级
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "[853d07]" + String($data.factionItemData.level), 16, 102, 0);
            // ArtFont.getInstance().writeFontToCtxCenten(ctx, String($data.factionItemData.level), ArtFont.num10, 102, 0)
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        PersonListItemRender.prototype.drawForceAndContribution = function ($data) {
            var $rec = this._baseRender.uiAtlas.getRec(this._Iforce_contribution.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            //战力
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "[853d07]" + Snum($data.factionItemData.force), 16, 27, 0);
            // ArtFont.getInstance().writeFontToCtxCenten(ctx, getNumToUnit($data.factionItemData.force), ArtFont.num10, 35, 0)
            //贡献
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "[853d07]" + Snum($data.factionItemData.contribution), 16, 97, 0);
            // ArtFont.getInstance().writeFontToCtxCenten(ctx, getNumToUnit($data.factionItemData.contribution), ArtFont.num10, 116, 0)
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        PersonListItemRender.prototype.drawActiveAndLogoutTime = function ($data) {
            var $rec = this._baseRender.uiAtlas.getRec(this._Iactive_logoutTime.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            //活跃
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "[853d07]" + String($data.factionItemData.active), 16, 30, 0);
            // ArtFont.getInstance().writeFontToCtxCenten(ctx, String($data.factionItemData.active), ArtFont.num10, 30, 0)
            //最后上线
            var $str = "在线";
            if (!$data.factionItemData.isOnline) {
                // var hourtime:number = Math.floor($data.factionItemData.logoutTime /1000 / 3600)
                var hourtime = GameInstance.getServerNow() - $data.factionItemData.logoutTime;
                hourtime = Math.floor(hourtime / 3600);
                if (hourtime >= 1) {
                    $str = hourtime + "小时前";
                }
                else {
                    $str = "刚刚";
                }
            }
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "[853d07]" + $str, 16, 99, 0);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        PersonListItemRender.prototype.setnull = function () {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._Ibg.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._Iname.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._IVip.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._Iidentity_Lev.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._Iforce_contribution.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._Iactive_logoutTime.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
        };
        PersonListItemRender.prototype.equClick = function (evt) {
            var _this = this;
            //选中，事件派发
            var $vo = this.itdata.data;
            if ($vo.factionItemData.guid != GuidData.player.getGuid()) {
                // this.showPop(evt);
                PopMenuUtil.show(this.itdata, function (value) { _this.popBackFun(value); }, evt.x, evt.y);
            }
        };
        PersonListItemRender.prototype.popBackFun = function (value) {
            var _this = this;
            if (value == 8) {
                //密聊
                ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON, this.itdata.data.factionItemData.guid);
            }
            else if (value == 0) {
                //查看信息
                NetManager.getInstance().protocolos.get_player_overview(this.itdata.data.factionItemData.guid);
            }
            else if (value == 9) {
                //职务任命
                var $aa = new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONAPPOINTMENT_EVENT);
                $aa.data = this.itdata;
                ModuleEventManager.dispatchEvent($aa);
            }
            else if (value == 7) {
                //申请好友
                NetManager.getInstance().protocolos.social_add_friend(this.itdata.data.factionItemData.guid);
            }
            else if (value == 10) {
                //踢出家族
                var a = this.itdata.data.factionItemData.name;
                var b = a.split(",");
                TimeUtil.addTimeOut(30, function () {
                    AlertUtil.show("是否将" + b[2] + "踢出家族？", "提示", function (a) { _this.backFun(a); });
                });
            }
        };
        PersonListItemRender.prototype.backFun = function (a) {
            if (a == 1) {
                NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_KICK, 0, 0, this.itdata.data.factionItemData.guid, "");
            }
        };
        return PersonListItemRender;
    }(SListItem));
    faction.PersonListItemRender = PersonListItemRender;
})(faction || (faction = {}));
//# sourceMappingURL=PersonListPanel.js.map