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
var msgtip;
(function (msgtip) {
    var MsgTipEvent = /** @class */ (function (_super) {
        __extends(MsgTipEvent, _super);
        function MsgTipEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MsgTipEvent.SHOW_MSG_PIC_DATA = "SHOW_MSG_PIC_DATA";
        MsgTipEvent.SHOW_EFFECTS_DATA = "SHOW_EFFECTS_DATA";
        MsgTipEvent.SHOW_SKILL_TIP_DATA = "SHOW_SKILL_TIP_DATA";
        MsgTipEvent.SHOW_EQU_MOVE_DATA = "SHOW_EQU_MOVE_DATA";
        MsgTipEvent.SHOW_SMSG_ITEM_NOTICE = "SHOW_SMSG_ITEM_NOTICE";
        MsgTipEvent.OPEN_SKILL_SLOT = "OPEN_SKILL_SLOT";
        MsgTipEvent.SHOW_GUIDE_POP_VIEW = "SHOW_GUIDE_POP_VIEW";
        MsgTipEvent.SHOW_PAGE_POP_VIEW = "SHOW_PAGE_POP_VIEW";
        MsgTipEvent.REFRISH_SYS_AND_UI_CHANGE = "REFRISH_SYS_AND_UI_CHANGE";
        return MsgTipEvent;
    }(BaseEvent));
    msgtip.MsgTipEvent = MsgTipEvent;
    var MsgTipModule = /** @class */ (function (_super) {
        __extends(MsgTipModule, _super);
        function MsgTipModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MsgTipModule.prototype.getModuleName = function () {
            return "MsgTipModule";
        };
        MsgTipModule.prototype.listProcessors = function () {
            return [new MsgTipProcessor()];
        };
        return MsgTipModule;
    }(Module));
    msgtip.MsgTipModule = MsgTipModule;
    var MsgTipProcessor = /** @class */ (function (_super) {
        __extends(MsgTipProcessor, _super);
        function MsgTipProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nextCanShowOpenSysTM = 0;
            _this.zhanliNearTime = 0;
            return _this;
        }
        MsgTipProcessor.prototype.getName = function () {
            return "MsgTipProcessor";
        };
        MsgTipProcessor.prototype.receivedModuleEvent = function ($event) {
            if (GuidData.map) {
                if (Scene_data.isPanGm) {
                    //   return
                }
                if ($event instanceof MsgTipEvent) {
                    var $MsgTipEvent = $event;
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_MSG_PIC_DATA) {
                        this.showMsgTopCenterPic($MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_EFFECTS_DATA) {
                        this.showEffectsMove($MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_SKILL_TIP_DATA) {
                        this.showSkillTip(Number($MsgTipEvent.data));
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_EQU_MOVE_DATA) {
                        this.showEquMoveTip(Number($MsgTipEvent.data));
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_SMSG_ITEM_NOTICE) {
                        this.showSmsgItemNotice($MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.OPEN_SKILL_SLOT) {
                        this.showOpenSkill($MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.REFRISH_SYS_AND_UI_CHANGE) {
                        this.refrishSysUi();
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_GUIDE_POP_VIEW) {
                        // Scene_data.isPanGm
                        if (GuidData.map && SceneManager.getInstance().render) {
                            msgtip.GuideModel.getInstance().showMainUIGuidePopView(); //主UI引导
                        }
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_PAGE_POP_VIEW) {
                        msgtip.GuideModel.getInstance().showModuleOptionalPage($MsgTipEvent.data);
                        if (GuidData.player.needGuididPop) {
                            msgtip.GuideModel.getInstance().showModuleGuidePage($MsgTipEvent.data);
                        }
                    }
                }
                if ($event instanceof EngineEvent) {
                    var $engineEvent = $event;
                    if ($engineEvent.type == EngineEvent.PLAYER_FIELD_FORCE) {
                        if (GuidData.player.lastForceNum != GuidData.player.getForce() && GuidData.player.lastForceNum > 0) {
                            this.showMsgZhanliPanel();
                        }
                        GuidData.player.lastForceNum = GuidData.player.getForce();
                    }
                    if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                        this.playerFieldLevel();
                    }
                    this.nextCanShowOpenSysTM = TimeUtil.getTimer() + 1000;
                }
            }
        };
        MsgTipProcessor.prototype.refrishSysUi = function () {
            GuidData.player.resetSystemItem();
            if (SceneManager.getInstance().render) {
                // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.RESET_SKILL_ICON));
                ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.REFRESH_HOME_UI_PANEL));
                ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.SHOW_TOP_UI_PANEL));
                ModuleEventManager.dispatchEvent(new rightui.RightUiEvent(rightui.RightUiEvent.SHOW_RIGHT_UI_PANEL));
                ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_GUIDE_POP_VIEW));
                ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.SHOW_LEFT_UI_PANEL));
            }
            GameMouseManager.getInstance().useMouseEvent = true;
        };
        MsgTipProcessor.prototype.showOpenSkill = function ($vo) {
            var $tb = new tb.TB_system_icon({ list: [], bindactive: [] });
            $tb.id = $vo.id;
            $tb.move = 1;
            $tb.position = 99;
            $tb.index = $vo.slot;
            $tb.text = tb.TB_skill_base.get_TB_skill_base($vo.id).name;
            //console.log($tb)
            //console.log($vo)
            this.showSystemOpenPanel($tb);
        };
        MsgTipProcessor.prototype.playerFieldLevel = function () {
            var $obj = new msgtip.MsgPicData;
            $obj.type = 1; //升级
            $obj.info = GuidData.player.getLevel();
            var $MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA);
            $MsgTipEvent.data = $obj;
            ModuleEventManager.dispatchEvent($MsgTipEvent);
            AttackEffectsManager.playLyf(getModelUrl("jueseshengji"), GameInstance.mainChar);
        };
        MsgTipProcessor.prototype.showMsgZhanliPanel = function () {
            var _this = this;
            var $temp = new Vector2D(GuidData.player.lastForceNum, GuidData.player.getForce());
            if (!this._msgZhanliPanel) {
                this._msgZhanliPanel = new msgtip.MsgZhanliPanel();
            }
            this._msgZhanliPanel.load(function () {
                _this._msgZhanliPanel.setData($temp);
                UIManager.getInstance().addUIContainer(_this._msgZhanliPanel);
            }, false);
        };
        MsgTipProcessor.prototype.showSystemOpenPanel = function ($tb) {
            var _this = this;
            if (GuidData.map && SceneManager.getInstance().render) {
                if ($tb.showmodel) {
                    if (!this._systemOpenShow) {
                        this._systemOpenShow = new msgtip.SystemOpenShow();
                    }
                    this._systemOpenShow.load(function () {
                        UIManager.getInstance().addUIContainer(_this._systemOpenShow);
                        _this._systemOpenShow.setModelByID($tb);
                    }, false);
                    return;
                }
                var $ktim = this.nextCanShowOpenSysTM - TimeUtil.getTimer();
                ModuleEventManager.dispatchEvent(new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT));
                TimeUtil.addTimeOut($ktim, function () {
                    //  MainCharControlModel.getInstance().sendStop()
                    if (SceneManager.getInstance().render) {
                        ModuleEventManager.dispatchEvent(new dialog.DialogueEvent(dialog.DialogueEvent.HIDE_DIALOGUE_PANEL)); //
                        ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.HIDE_CHAT_EVENT)); //
                    }
                    else {
                        UIManager.getInstance().removeAll();
                        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT)); //
                    }
                    if (!_this._systemOpenPanel) {
                        _this._systemOpenPanel = new msgtip.SystemOpenPanel();
                    }
                    _this._systemOpenPanel.load(function () {
                        _this._systemOpenPanel.setData($tb);
                        UIManager.getInstance().addUIContainer(_this._systemOpenPanel);
                    }, false);
                });
            }
            else {
                GuidData.player.resetSystemItem();
            }
        };
        MsgTipProcessor.prototype.showSmsgItemNotice = function ($vo) {
            //console.log("---$vo---",$vo);
            for (var i = 0; i < $vo.list.length; i++) {
                var $item_reward_info = $vo.list[i];
                //如果是获得境界经验，则特殊处理
                if ($item_reward_info.item_id == 107) {
                    var $evt = new stateup.StateUpEvent(stateup.StateUpEvent.SHOW_EFFECT_PANEL);
                    $evt.data = $item_reward_info;
                    ModuleEventManager.dispatchEvent($evt);
                    continue;
                }
                var $temp = tb.TB_item_template.get_TB_item_template($item_reward_info.item_id);
                if ($temp.money_type > 0) {
                    for (var i = 0; i < Math.min($item_reward_info.num, 20); i++) {
                        this.showEffectsMovetoBg($vo.showType, $temp.money_type - 1);
                    }
                }
                else {
                    msgtip.MsgEquMoveToBag.show($temp.id);
                }
            }
        };
        MsgTipProcessor.prototype.showEquMoveTip = function ($id) {
            msgtip.MsgEquMoveToBag.show($id);
        };
        MsgTipProcessor.prototype.showSkillTip = function ($id) {
            msgtip.MsgSkillTipPanel.show($id);
        };
        //大类 panelType,moneyType
        MsgTipProcessor.prototype.showEffectsMovetoBg = function ($panelType, $moneyType) {
            //panelType==1为左任务
            var $data = new msgtip.MsgEffectsMoveData();
            var $pos = new Vector2D(UIData.designWidth / 2, UIData.designHeight / 2);
            switch ($panelType) {
                case 1:
                    $pos = UiTweenVo.getPosByPanel(new Vector2D(50, 150), { width: UIData.designWidth, height: UIData.designHeight, left: 0, middle: 0 });
                    break;
                default:
                    break;
            }
            $data.startTM = TimeUtil.getTimer() + random(200);
            $data.endTM = $data.startTM + 500;
            $data.pos = $pos;
            $data.bezierPos = new Vector2D($pos.x + Math.random() * 400 - 200, $pos.y + Math.random() * 400 - 200);
            var $toPos = UiTweenVo.getPosByPanel(new Vector2D(277, 476), { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom: 0 });
            switch ($moneyType) {
                case 2:
                    $toPos = UiTweenVo.getPosByPanel(new Vector2D(617, 478), { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom: 0 });
                    break;
                default:
                    break;
            }
            $data.toPos = $toPos;
            $data.MONEY_TYPE = $moneyType; //SharedDef.MONEY_TYPE_SILVER
            var $MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_EFFECTS_DATA);
            $MsgTipEvent.data = $data;
            ModuleEventManager.dispatchEvent($MsgTipEvent);
        };
        MsgTipProcessor.prototype.showMsgTopCenterPic = function ($obj) {
            msgtip.MsgTopCenterPic.show($obj);
        };
        MsgTipProcessor.prototype.showEffectsMove = function ($obj) {
            msgtip.MsgEffectsManager.getInstance().setPopMsgVo($obj);
        };
        MsgTipProcessor.prototype.smsgAtiribute = function ($byte) {
            var $len = $byte.readUint16();
            var $arr = new Array;
            for (var i = 0; i < $len; i++) {
                var $id = $byte.readUint16();
                var $num = $byte.readDouble();
                $arr.push(new Vector2D($id, $num));
            }
            if ($arr.length) {
                this.showMsgZhanliInfoPanel($arr);
            }
        };
        MsgTipProcessor.prototype.showMsgZhanliInfoPanel = function ($arr) {
            /*
            if (SceneManager.getInstance().render) {
                if (!this._msgZhanliInfoPanel) {
                    this._msgZhanliInfoPanel = new MsgZhanliInfoPanel();
                }
                this._msgZhanliInfoPanel.load(() => {
                    this._msgZhanliInfoPanel.setData($arr);
                    UIManager.getInstance().addUIContainer(this._msgZhanliInfoPanel);
                }, false)
            }

            */
            var $size = 28 * UIData.Scale;
            for (var i = 0; i < $arr.length; i++) {
                var v2d = new Vector2D((Scene_data.stageWidth / 3), (Scene_data.stageHeight / 2));
                var showvalue = Math.floor($arr[i].y / 100);
                var $str = ColorType.Green20a200 + getKeyProById($arr[i].x);
                $str += showvalue > 0 ? "+" + showvalue : showvalue;
                var $colorstr = $arr[i].y > 0 ? ColorType.Green56da35 : ColorType.Redd92200;
                //    msgtip.MsgTipManager.outStr($colorstr + $str, msgtip.PopMsgVo.type7, v2d);
                //   v2d.y +=(i % 2)*30*UIData.Scale
                this.showZhanliTip($colorstr + $str, msgtip.PopMsgVo.type7, v2d);
            }
        };
        MsgTipProcessor.prototype.showZhanliTip = function ($str, $type, $v2d) {
            var t = 0;
            if (this.zhanliNearTime >= TimeUtil.getTimer()) {
                t = (this.zhanliNearTime - TimeUtil.getTimer()) + 500;
                t = Math.max(t, 500);
            }
            this.zhanliNearTime = TimeUtil.getTimer() + t;
            TimeUtil.addTimeOut(t, function () {
                msgtip.MsgTipManager.outStr($str, $type, $v2d);
            });
        };
        MsgTipProcessor.prototype.smsgModuleActiv = function ($byte) {
            var $systemPanelId = $byte.readUint32();
            var $tb_system_base = tb.TB_system_base.getTempVo($systemPanelId);
            if ($tb_system_base.show) {
                var $baseId = Math.floor($tb_system_base.id / 10);
                var $tb_system_icon = tb.TB_system_icon.getTempVo($baseId);
                if ($tb_system_icon.move) {
                    switch ($tb_system_icon.id) {
                        /*
                        case 202://神兵;
                            this.showActivityTittle(tb.TB_system_preview.getTempVo(1))
                            break
                        case 210: //坐骑;
                            this.showActivityTittle(tb.TB_system_preview.getTempVo(2))
                            break
                            */
                        default:
                            this.showSystemOpenPanel($tb_system_icon);
                            break;
                    }
                }
                else {
                    if (GuidData.player) {
                        GuidData.player.resetSystemItem();
                        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.REFRESH_MAINUI_PANEL));
                    }
                }
            }
        };
        // private showActivityTittle($tb: tb.TB_system_preview): void {
        //     var a: vec3DshowVo = new vec3DshowVo();
        //     a.info = $tb.p_info;
        //     a.name = $tb.p_name;
        //     a.type = $tb.type;
        //     a.id = $tb.id;
        //     if ($tb.p_model[0].length > 1) {
        //         if (GuidData.player.getCharType() == 1) {
        //             a.modelid = $tb.p_model[0][0];
        //         } else {
        //             a.modelid = $tb.p_model[0][1];
        //         }
        //     } else {
        //         a.modelid = $tb.p_model[0][0];
        //     }
        //     a.state = 0;
        //     Vec3DshowPanel.getInstance().show(a);
        // }
        MsgTipProcessor.prototype.listenModuleEvents = function () {
            return [
                new MsgTipEvent(MsgTipEvent.SHOW_MSG_PIC_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_EFFECTS_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_SKILL_TIP_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_EQU_MOVE_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_SMSG_ITEM_NOTICE),
                new MsgTipEvent(MsgTipEvent.OPEN_SKILL_SLOT),
                new MsgTipEvent(MsgTipEvent.SHOW_GUIDE_POP_VIEW),
                new MsgTipEvent(MsgTipEvent.SHOW_PAGE_POP_VIEW),
                new MsgTipEvent(MsgTipEvent.REFRISH_SYS_AND_UI_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        };
        MsgTipProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_ATTRIBUTE_CHANGED] = function ($byte) { _this.smsgAtiribute($byte); };
            obj[Protocols.SMSG_MODULE_ACTIVE] = function ($byte) { _this.smsgModuleActiv($byte); };
            return obj;
        };
        return MsgTipProcessor;
    }(BaseProcessor));
    msgtip.MsgTipProcessor = MsgTipProcessor;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgTipProcessor.js.map