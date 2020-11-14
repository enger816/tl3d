var GameControlManager = /** @class */ (function () {
    function GameControlManager() {
        var _this = this;
        this._lastMousePos = new Vector3D;
        this._lastFocus = new Vector3D;
        this._isMouseDown = false;
        this._lock = false;
        document.addEventListener(MouseType.KeyDown, function ($evt) { _this.onKeyDown($evt); });
    }
    GameControlManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameControlManager();
        }
        return this._instance;
    };
    GameControlManager.prototype.init = function () {
        //if (Scene_data.user == 1) {
        //    return 
        //} 
        //Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        //Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
        //Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
        //document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) })
        //document.addEventListener(MouseType.KeyUp, ($evt: KeyboardEvent) => { this.onKeyUp($evt) })
    };
    GameControlManager.prototype.onMouseMove = function ($evt) {
        if (this._isMouseDown) {
            Scene_data.focus3D.rotationY = this._lastFocus.y - ($evt.x - this._lastMousePos.x) / 10;
        }
    };
    GameControlManager.prototype.onMouseDown = function ($evt) {
        this._lastMousePos.x = $evt.x;
        this._lastFocus.y = Scene_data.focus3D.rotationY;
        this._isMouseDown = true;
    };
    GameControlManager.prototype.onMouseUp = function ($evt) {
        this._isMouseDown = false;
    };
    GameControlManager.oneByone = function () {
        var _this = this;
        if (this.waitGmItem.length) {
            var $str = this.waitGmItem[0];
            //console.log("gm", SharedDef.CHAT_TYPE_WORLD, $str);
            NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_WORLD, $str);
            TimeUtil.addTimeOut(1500, function () {
                _this.waitGmItem.shift();
                _this.oneByone();
            });
        }
    };
    GameControlManager.sendGmCom = function ($str) {
        this.waitGmItem.push($str);
        if (this.waitGmItem.length <= 1) {
            this.oneByone();
        }
        ////console.log("gm", SharedDef.CHAT_TYPE_WORLD, $str);
        //NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_WORLD, $str)
    };
    GameControlManager.prototype.onKeyDown = function ($evt) {
        if (GameStart.outNet) {
            return;
        }
        if (!$evt.shiftKey) {
            if ($evt.keyCode == KeyboardType.G) {
                GameControlManager.sendGmCom("@完成当前主线");
                //  AotuSkillManager.getInstance().jumpTo();
                // MainCharControlModel.getInstance().setSpeedDirect(new Vector3D(1, 0, 0));
                // MainCharControlModel.getInstance().setSpeedDirect(new Vector3D(1, 0, 0));
                //var bsc: SceneChar = GameInstance.mainChar;
                //BloodManager.getInstance().setJumpNum(new Vector3D(bsc.x + random(50) - 25, bsc.y + 30, bsc.z + random(50) - 25),999);
                //var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SYSTEM_OPEN_DATA)
                //$MsgTipEvent.data = PanelClass.SHOW_FUBEN_EVENT
                //ModuleEventManager.dispatchEvent($MsgTipEvent);
                // this.showTopCenterPic()
            }
            if ($evt.keyCode == KeyboardType.F) {
                UIManager.getInstance().removeNoInterfaceUI();
            }
            if ($evt.keyCode == KeyboardType.B) {
                ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.INVIREQUEST_TEAM_PANEL));
            }
            if ($evt.keyCode == KeyboardType.T) {
                // ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.AAA));
                // ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.SHOW_MOUNT_EVENT));
                // ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SHOW_TREASURE_EVENT));
                // ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.SHOW_STATEUP_PANEL));
                // ModulePageManager.openNpcPanel(SharedDef.MODULE_TEAMINSTANCE); 
                // ModulePageManager.openPanel(SharedDef.MODULE_STRENGTH,2); 
                ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.OPEN_GG_EVENT));
                // ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
            }
            if ($evt.keyCode == KeyboardType.Z) {
                // this.showEffectsMove()
                // ModulePageManager.openPanel(SharedDef.MODULE_MAP);
            }
            if ($evt.keyCode == KeyboardType.R) {
                for (var i = 0; i < 1; i++) {
                    if (Math.random() > 0.5) {
                        Chat.ChatModel.getInstance().pushNewSysInfo("级可装备境界:空冥道士100级可装备境界:空冥道士100级可装备");
                    }
                    else {
                        Chat.ChatModel.getInstance().pushNewSysInfo("境界:空冥道士100级可装备境界");
                    }
                }
                ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_CHAT_INFO));
            }
            if ($evt.keyCode == KeyboardType.U) {
                console.log(GameInstance.mainChar.getAstarPos());
                console.log(GameInstance.mainChar.getCurrentPos());
                console.log(AstarUtil.navmeshData);
            }
            if ($evt.keyCode == KeyboardType.Up) {
                Scene_data.cam3D.distance--;
            }
            if ($evt.keyCode == KeyboardType.Down) {
                Scene_data.cam3D.distance++;
            }
            if ($evt.keyCode == KeyboardType.Left) {
                Engine.sceneCamScale += 0.03;
                Engine.resetViewMatrx3D();
            }
            if ($evt.keyCode == KeyboardType.Right) {
                Engine.sceneCamScale -= 0.03;
                Engine.resetViewMatrx3D();
            }
            //console.log("距离", Scene_data.cam3D.distance, "张口", Engine.sceneCamScale);
            return;
        }
        if ($evt.keyCode == KeyboardType.Up) {
            msgtip.GuideModel.getInstance().hideGuidePop();
        }
        else if ($evt.keyCode == KeyboardType.B) {
            var evt = new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_CHAR_BG_PANEL);
            evt.showType = 2; //1为背包 2为熔炉
            ModuleEventManager.dispatchEvent(evt);
        }
        else if ($evt.keyCode == KeyboardType.R) {
            GameControlManager.sendGmCom("@Script");
        }
        else if ($evt.keyCode == KeyboardType.Q) {
            // ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.SHOW_STRENGTHGEM_PANEL));
        }
        else if ($evt.keyCode == KeyboardType.X) {
            // ModuleEventManager.dispatchEvent(new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT));
            ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.HIDE_JOINGAME_EVENT));
        }
        else if ($evt.keyCode == KeyboardType.Z) {
            //福利系统
            // var a = new kuafu.KuafuPanelModuleEvent(kuafu.KuafuPanelModuleEvent.SHOW_POWERPROMPT_DJ_EVENT);
            // a.data = [999,9999];//[我的战力，敌方战力]
            // ModuleEventManager.dispatchEvent(a);
            // ModuleEventManager.dispatchEvent(new kuafu.DJModuleEvent(kuafu.DJModuleEvent.SHOW_DJREWARD_EVENT));
            // ModuleEventManager.dispatchEvent(new kuafu.KuafuPanelModuleEvent(kuafu.KuafuPanelModuleEvent.SHOW_BUYNUM_DJ_EVENT));
            // ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.SHOW_Stronger_EVENT));
            // ModulePageManager.openPanel(PanelClass.SHOW_bianqiang_PANEL);
            // ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.SHOW_BOSS_EVENT));
            //ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
            // GameControlManager.sendGmCom("@假充值 1")
            //AstarUtil.unblock();
            NetManager.getInstance().protocolos.buy_inspiration(0);
        }
        else if ($evt.keyCode == KeyboardType.E) {
            // AstarUtil.blockList([[new Vector2D(132, 50), new Vector2D(143, 47)],
            //                      [new Vector2D(120, 40), new Vector2D(141, 31)],     
            //                     ]);
            //NetManager.getInstance().protocolos.init_title(10);
            //NetManager.getInstance().protocolos.welfare_shouchong_reward();
            //每日签到领奖
            //    NetManager.getInstance().protocolos.welfare_checkin();
            //累计签到领奖
            //NetManager.getInstance().protocolos.welfare_checkin_all(3);
            //升级奖励领取
            //NetManager.getInstance().protocolos.welfare_level(1);
            //找回请求 1是完美，0是普通
            //   NetManager.getInstance().protocolos.welfare_active_getback(1,1,2);
            //福利所有奖励列表 1是完美，0是普通
            // NetManager.getInstance().protocolos.welfare_getalllist_getback(1);
            //一件领取所有福利 1是完美，0是普通
            // NetManager.getInstance().protocolos.welfare_getall_getback(1)
            //NetManager.getInstance().protocolos.kuafu_3v3_buytimes(2);
            //NetManager.getInstance().protocolos.kuafu_3v3_dayreward(2);
            //NetManager.getInstance().protocolos.kuafu_3v3_getranlist()
            //NetManager.getInstance().protocolos.kuafu_3v3_getmyrank();
            //ModuleEventManager.dispatchEvent(new kuafu.XianFuEvent(kuafu.XianFuEvent.SHOW_XIANFU_SCENEPANEL_EVENT));
            //NetManager.getInstance().protocolos.doujiantai_buytime(1);
            //NetManager.getInstance().protocolos.doujiantai_first_reward(20);
            //NetManager.getInstance().protocolos.doujiantai_get_rank(1,10);
            //NetManager.getInstance().protocolos.bag_exchange_pos(-1, 101, 0, 0);
            // GameInstance.clearRoleList();
            // SceneManager.getInstance().clearScene();
            // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
            // GameInstance.mainChar = new SceneChar();
            // for(var i:number=0;i<120;i++){
            //     GameInstance.mainChar.addTestWeapon();
            // }
            //NetManager.getInstance().close();
            //copy2clipboard("http://192.168.88.16/arpg/index.html?p=s.998sc");
            //ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_QUEEN_RANK_PANEL_EVENT));
            //ModuleEventManager.dispatchEvent(new faction.GiftreceiveEvent(faction.GiftreceiveEvent.RECEIVE_THANK_GIFT_EVENT));
            //ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.SHOW_WING_PANEL_EVENT));
            //DeathPanel.show(1,10,30);
            //ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT));
            //ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT));
            //ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT));
            //ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_COPYTASK_EVENT));
            //ModuleEventManager.dispatchEvent(new email.MailEvent(email.MailEvent.SHOW_MAIL_PANEL_EVENT));
            //ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_VIP_EVENT));
            // var node:RedPointNode = RedPointManager.getInstance().getNodeByID(21);
            // node.show = !node.show;
            //ModuleEventManager.dispatchEvent(new kaifu.KaiFuEvent(kaifu.KaiFuEvent.SHOW_KAIFU_PANEL_EVENT));
            ////console.log(GuidData.player.getGuid())
            //GameControlManager.sendGmCom("@完成当前主线");
            //GameControlManager.sendGmCom("@全图秒杀");
            // NetManager.getInstance().close();
            // TableData.getInstance().tb = null;
            // SceneManager.getInstance().clearStaticScene();
            // SceneManager.getInstance().test = true;
            // GameInstance.mainChar.destory();
            // AstarUtil.graphData = null;
            //GameControlManager.sendGmCom("@制造 2002 1");
            // var itemAry:Array<number> = [2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
            // //var itemAry:Array<number> = [2711,2712,2713,2714,2715,2716,2717,2718,2719,2720];
            // for(var i:number = 0;i<itemAry.length;i++){
            //     GameControlManager.sendGmCom("@制造 " + itemAry[i] + " 1");
            // }            
            //ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SHOW_SKILLUI_EVENT));
            //ModulePageManager.openPanel(503,0);
            //ModulePageManager.openPanel(SharedDef.MODULE_MAIL);
            // TimeUtil.addFrameTick(()=>{
            //     GameInstance.mainChar.py++;
            //     GameInstance.mainChar.refreshPos()
            // })
            // var base:number = GameInstance.mainChar.py;
            // var obj:any = GameInstance.mainChar;
            // var upfun = ()=>{GameInstance.mainChar.refreshPos()};
            // TweenLite.to(obj,1.5,{py:base + 200,onComplete:()=>{
            //     TweenLite.to(obj,1.5,{py:base,onUpdate:upfun});
            // },onUpdate:upfun});
            //GameInstance.mainChar.stopMove();
            //ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT));
            //AttackEffectsManager.playLyf(getModelUrl("jueseshengji"), GameInstance.mainChar);
            //ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTION_HONOR_EVENT));
            //ModulePageManager.openNpcPanel(SharedDef.MODULE_ARENA, [SharedDef.MODULE_ARENA_XIANMO, SharedDef.MODULE_ARENA_DOUJIANTAI, SharedDef.MODULE_ARENA_RANK]);
            // var tip:treasure.TreasureTip = new treasure.TreasureTip();
            // tip.show(1,0); 
            //TestSceneMemory.getInstance().start();
            //GamePay.pay(0.01, 10, "test");
            //ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.SHOW_LOTTERY_EVENT));
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.WBOSS_MORE_REWARD));
        }
        else if ($evt.keyCode == KeyboardType.F1) {
            var $fps = document.getElementById('FpsTipsCanvas');
            if ($fps.style["z-index"] == 0) {
                $fps.style["z-index"] = 2;
            }
            else {
                $fps.style["z-index"] = 0;
            }
        }
        if ($evt.keyCode == KeyboardType.P) {
            var aa = GameInstance.roleList;
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                //console.log(GameInstance.roleList[i].unit.getName(), GameInstance.roleList[i].unit.getGuid(), GameInstance.roleList[i].isDeath)
            }
        }
        return;
    };
    GameControlManager.prototype.showTopCenterPic = function () {
        var $obj = new msgtip.MsgPicData;
        $obj.type = 1; //升级
        $obj.info = random(99);
        if (Math.random() > 0.5) {
            $obj.type = 2; //加载图片
            $obj.info = "ui/load/toptip/success.png";
        }
        //msgtip.MsgTopCenterPic.show($obj);
        var $MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA);
        $MsgTipEvent.data = $obj;
        ModuleEventManager.dispatchEvent($MsgTipEvent);
    };
    GameControlManager.prototype.showEffectsMove = function () {
        var $data = new msgtip.MsgEffectsMoveData();
        var $pos = new Vector2D(UIData.designWidth / 2, UIData.designHeight / 2);
        $data.startTM = TimeUtil.getTimer() + random(200);
        $data.endTM = $data.startTM + 500;
        $data.pos = $pos;
        $data.MONEY_TYPE = 1;
        $data.bezierPos = new Vector2D($pos.x + Math.random() * 400 - 200, $pos.y + Math.random() * 400 - 200);
        $data.toPos = new Vector2D(150, 178);
        var $MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_EFFECTS_DATA);
        $MsgTipEvent.data = $data;
        ModuleEventManager.dispatchEvent($MsgTipEvent);
    };
    GameControlManager.prototype.upPopTxt = function () {
        // AlertUtil.show("你确定要购买这样的东西么","就是这样子")
        var $s2c_send_chat = new s2c_send_chat();
        $s2c_send_chat.content = "[ffffff]玩家名字[00ff00]获得[ffffff][ffffff]玩家名字[00ff00]获得[ffffff]玩家名字[00ff00][ffffff]玩家名字[00ff00]获得[ffffff]bbcc[00ff00]";
        //   $s2c_send_chat.content = "我哭着对你说，熊猫住得比我好太多……";
        // $s2c_send_chat.content = $s2c_send_chat.content.substr(0, random($s2c_send_chat.content.length - 11) + 10);
        $s2c_send_chat.channel = SharedDef.CHAT_TYPE_HORM;
        var $MsgTipEvent = new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO);
        $MsgTipEvent.data = $s2c_send_chat;
        ModuleEventManager.dispatchEvent($MsgTipEvent);
    };
    GameControlManager.prototype.backFun = function (a) {
        //console.log(a)
    };
    GameControlManager.prototype.makeTBvo = function () {
        var aa = "id, name, info, output_info, zhuangbility, icon, avatar, level, rank, bind_type, type, type_c, type_name, pos, quality, sex, price, is_transaction, max_overlap, is_slather, output, use_result, isdoubleclick, double_click, basic_properties, suit_id, using_effect, category, category_cooldown, cooldown, goods_id, arrange, expend_data, use_object, quest, forge_pro_max, is_auction, auction_money";
        var bb = "int, string, string, string, string, string, int, int, int, int, int, int, string, int, int, int, int, int, int, int, array, int, int, array, array, array, array, int, int, int, int, int, int, int, int, array, int, int";
        var a = aa.split(",");
        var b = bb.split(",");
        //console.log("-------##############--------")
        for (var i = 0; i < a.length; i++) {
            a[i] = a[i].replace(" ", "");
            b[i] = b[i].replace(" ", "");
            var tStr = b[i].replace(" ", "");
            var classStr = "";
            switch (tStr) {
                case "int":
                    classStr = "number;";
                    break;
                case "string":
                    classStr = "string;";
                    break;
                case "array":
                    classStr = "Array<any>;";
                    break;
                default:
                    break;
            }
            //console.log("public " + a[i] + ":" + classStr)
        }
        //console.log("-----------------")
        for (var i = 0; i < a.length; i++) {
            var tStr = b[i].replace(" ", "");
            switch (tStr) {
                case "array":
                    //console.log("this." + a[i] + "=new Array;")
                    //console.log("makeArray($obj." + a[i] + ",this." + a[i] + ");")
                    break;
                default:
                    //console.log("this." + a[i] + "=$obj." + a[i] + ";")
                    break;
            }
        }
        //console.log("--#########################----")
    };
    GameControlManager.prototype.test = function () {
        //console.log("回城回城")
        NetManager.getInstance().protocolos.teleport_main_city(); //回城
        var aotu = true; //AotuSkillManager.getInstance().aotu
        var hangUpResurrection = true; // GuidData.player.getHangUpResurrection()
        var useA = true; //AotuSkillManager.hangupdata[8]
        var useB = true; //AotuSkillManager.hangupdata[9]
        var kId = tb.TB_hook_hp_item_Vo.get_TB_hook_hp_item_Vo(2).items[0];
        var $unit = GameInstance.mainChar.unit;
        var n = $unit.getHp() / $unit.getMaxHp();
        if (!hangUpResurrection) {
            useA = false;
            useB = false;
        }
        //console.log(GuidData.player.getHangupdata())
        var $dagItemData = GuidData.bag.getItemByEntry(kId);
        if (aotu) {
            var aa = this.useItem(kId); // 选中的自动吃的物品
            if (!aa) {
                var $tb_shop = tb.TB_shop.get_TB_shopById(kId);
                if (useA || useB) {
                    var needMoneyNum = $tb_shop.costResource[0][1];
                    if ($tb_shop && GuidData.player.getBindGold() >= needMoneyNum) {
                        //console.log("使用绑定元宝")
                    }
                    else if (useB) {
                        if ($tb_shop && GuidData.player.getGoldIngot() >= needMoneyNum) {
                            //console.log("使用非绑元宝")
                        }
                        else {
                            //console.log("无钱购买")
                        }
                    }
                }
            }
            else {
                //console.log("从背包中得到复活丹")
            }
        }
    };
    GameControlManager.prototype.useItem = function ($id) {
        if (GuidData.bag.hasItem($id, 1)) {
            var $dagItemData = GuidData.bag.getItemByEntry($id);
            NetManager.getInstance().protocolos.bag_item_user($dagItemData.guid, 1);
            //console.log("吃药了")
            return true;
        }
        else {
            return false;
        }
    };
    GameControlManager.waitGmItem = new Array;
    return GameControlManager;
}());
var TestSceneMemory = /** @class */ (function () {
    function TestSceneMemory() {
        this.flag = 0;
        this.targetAry = [
            [1003, 12, 200],
            [1001, 155, 21], [1001, 66, 60], [1001, 92, 13], [1001, 94, 96],
            [1, 140, 229],
            [1002, 108, 169], [1002, 69, 136], [1002, 26, 65], [1002, 126, 30],
            [1003, 89, 203], [1003, 79, 127], [1003, 155, 157], [1003, 169, 45]
        ];
        this.stopFlag = true;
    }
    TestSceneMemory.getInstance = function () {
        if (!this.instance) {
            this.instance = new TestSceneMemory();
        }
        return this.instance;
    };
    TestSceneMemory.prototype.start = function () {
        this.stopFlag = !this.stopFlag;
        if (this.stopFlag) {
            MainCharControlModel.getInstance().movoToMapAndpos(this.targetAry[0][0], new Vector2D(this.targetAry[0][1], this.targetAry[0][2]), false);
            return;
        }
        this.applyTick();
    };
    TestSceneMemory.prototype.applyTick = function () {
        var _this = this;
        if (this.stopFlag) {
            return;
        }
        if (this.flag >= this.targetAry.length) {
            this.flag = 0;
        }
        AotuSkillManager.getInstance().aotuBattle = false;
        var targetPos = this.targetAry[this.flag];
        MainCharControlModel.getInstance().movoToMapAndpos(targetPos[0], new Vector2D(targetPos[1], targetPos[2]), true);
        this.flag++;
        TimeUtil.addTimeOut(15000, function () { _this.applyTick(); });
    };
    return TestSceneMemory;
}());
//# sourceMappingURL=GameControlManager.js.map