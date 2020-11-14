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
    var KuafuModule = /** @class */ (function (_super) {
        __extends(KuafuModule, _super);
        function KuafuModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KuafuModule.prototype.getModuleName = function () {
            return "KuafuModule";
        };
        KuafuModule.prototype.listProcessors = function () {
            return [new KuaFuProcessor(),
                // new XianfuProcessor(),
                new kuafu.KuaFu3v3PkProcessor(),
                new kuafu.KuaFu1v1Processor(),
            ];
        };
        return KuafuModule;
    }(Module));
    kuafu.KuafuModule = KuafuModule;
    var KuaFuEvent = /** @class */ (function (_super) {
        __extends(KuaFuEvent, _super);
        function KuaFuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KuaFuEvent.SHOW_KUAFU_PANEL_EVENT = "SHOW_KUAFU_PANEL_EVENT";
        KuaFuEvent.INSTANCE_INT_FIELD_3V3_TIMES = "INSTANCE_INT_FIELD_3V3_TIMES";
        KuaFuEvent.INSTANCE_INT_FIELD_3V3_DAY_REWARD = "INSTANCE_INT_FIELD_3V3_DAY_REWARD";
        KuaFuEvent.KUAFU_1V1_REFRESH = "KUAFU_1V1_REFRESH";
        KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT = "KUAFU_SHOW_ARENA_PANEL_EVENT";
        KuaFuEvent.KUAFU_HIDE_ARENA_PANEL_EVENT = "KUAFU_HIDE_ARENA_PANEL_EVENT";
        KuaFuEvent.KUAFU_ARENA_QUALIFY_REWARD_EVENT = "KUAFU_ARENA_QUALIFY_REWARD_EVENT";
        KuaFuEvent.KUAFU_ARENA_QUALIFY_RANK_EVENT = "KUAFU_ARENA_QUALIFY_RANK_EVENT";
        KuaFuEvent.KUAFU_ARENA_QUALIFY_NUM_EVENT = "KUAFU_ARENA_QUALIFY_NUM_EVENT";
        KuaFuEvent.KUAFU_ARENA_3V3_RANK_EVENT = "KUAFU_ARENA_3V3_RANK_EVENT";
        KuaFuEvent.FIRSTREWARD_DJ_EVENT = "FIRSTREWARD_DJ_EVENT";
        KuaFuEvent.SHOW_DJT_RANK = "SHOW_DJT_RANK";
        return KuaFuEvent;
    }(BaseEvent));
    kuafu.KuaFuEvent = KuaFuEvent;
    var KuaFuProcessor = /** @class */ (function (_super) {
        __extends(KuaFuProcessor, _super);
        function KuaFuProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KuaFuProcessor.prototype.getName = function () {
            return "KuaFuProcessor";
        };
        KuaFuProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof KuaFuEvent) {
                var $kuaFuEvent = $event;
                if ($kuaFuEvent.type == KuaFuEvent.SHOW_KUAFU_PANEL_EVENT) {
                    var $tabId = $kuaFuEvent.data;
                    // this.showKuaFuPanel($tabId);
                }
                else if ($kuaFuEvent.type == KuaFuEvent.INSTANCE_INT_FIELD_3V3_TIMES) {
                    //if (this._kuaFuPanel) {
                    //    this._kuaFuPanel.refresh();
                    //}
                }
                else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_1V1_REFRESH) {
                    //if (this._kuaFuPanel) {
                    //  this._kuaFuPanel.refresh();
                    //}
                    if (this._arenaPanel && this._arenaPanel.hasStage) {
                        this._arenaPanel.djChg();
                    }
                }
                else if ($kuaFuEvent.type == KuaFuEvent.INSTANCE_INT_FIELD_3V3_DAY_REWARD) {
                    this.refresh3V3Reward();
                }
                else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT) {
                    this.showArenaPanel($kuaFuEvent.data, $kuaFuEvent.selTab);
                }
                else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_HIDE_ARENA_PANEL_EVENT) {
                    this.hideArenaPanel();
                }
                else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_ARENA_QUALIFY_REWARD_EVENT || $kuaFuEvent.type == KuaFuEvent.KUAFU_ARENA_QUALIFY_NUM_EVENT) {
                    this.refreshArenaQualifyReward();
                }
                else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_ARENA_QUALIFY_RANK_EVENT) {
                    this.refreshArenaQualifyRank($kuaFuEvent.data);
                }
                else if ($kuaFuEvent.type == KuaFuEvent.FIRSTREWARD_DJ_EVENT) {
                    this.djRewardChg();
                }
                else if ($kuaFuEvent.type == KuaFuEvent.SHOW_DJT_RANK) {
                    this.showRank($kuaFuEvent.data);
                }
                else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_ARENA_3V3_RANK_EVENT) {
                    this.show3V3Rank($kuaFuEvent.data);
                }
            }
            else if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                if (this._arenaPanel) {
                    this._arenaPanel.showTab1();
                }
            }
            if ($event instanceof charbg.CharBgEvent) {
                //if (this._kuaFuPanel) {
                //   this._kuaFuPanel.refresh();
                //}
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                //if (panelEvent.panel == this._kuaFuPanel) {
                //    this._kuaFuPanel.dispose();
                //    this._kuaFuPanel = null;
                //    //console.log("释放面板 _kuaFuPanel")
                //}
                //if (panelEvent.panel == this._xianfuMatchTimePanel) {
                //    this._xianfuMatchTimePanel.dispose();
                //    this._xianfuMatchTimePanel = null;
                //    //console.log("释放面板 _xianfuMatchTimePanel")
                //}
                if (panelEvent.panel == this._kuaFuMatchTimePanel) {
                    this._kuaFuMatchTimePanel.dispose();
                    this._kuaFuMatchTimePanel = null;
                    //console.log("释放面板 _kuaFuMatchTimePanel")
                }
                if (panelEvent.panel == this._kuaFuMatchListPanel) {
                    this._kuaFuMatchListPanel.dispose();
                    this._kuaFuMatchListPanel = null;
                    //console.log("释放面板 _kuaFuMatchListPanel")
                }
            }
        };
        KuaFuProcessor.prototype.show3V3Rank = function ($data) {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.refresh3v3Info($data);
            }
        };
        KuaFuProcessor.prototype.refresh3V3Reward = function () {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.refresh3v3Reward();
            }
        };
        KuaFuProcessor.prototype.showRank = function ($data) {
            var _this = this;
            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list = new Array;
            for (var i = 0; i < $data.list.length; i++) {
                var $guidObject = $data.list[i];
                var $obj = new WindowRankVo();
                var $name = $guidObject.GetStr(SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_NAME);
                if ($name) {
                    $obj.rank = String($guidObject.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_RANKING));
                    $obj.val = Snum($guidObject.GetDouble(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_FORCE));
                    $obj.name = getBaseName($name);
                    list.push($obj);
                }
            }
            var myStr;
            if ($data.self > 0) {
                myStr = "我的排名：" + $data.self;
            }
            else {
                myStr = "我的排名：未上榜";
            }
            this._rankPanle.load(function () {
                _this._rankPanle.show(["排名", "玩家名字", "战力"], list, myStr);
            });
        };
        KuaFuProcessor.prototype.showKuaFuList = function () {
            var _this = this;
            if (!this._kuaFuMatchListPanel) {
                this._kuaFuMatchListPanel = new kuafu.KuaFu3v3MatchListPanel();
            }
            this._kuaFuMatchListPanel.load(function () {
                _this._kuaFuMatchListPanel.show();
            });
        };
        KuaFuProcessor.prototype.showKuafuMatchPanel = function () {
            var _this = this;
            if (!this._kuaFuMatchTimePanel) {
                this._kuaFuMatchTimePanel = new kuafu.KuaFu3v3MatchTimePanel();
            }
            this._kuaFuMatchTimePanel.load(function () {
                _this._kuaFuMatchTimePanel.show();
            }, false);
        };
        KuaFuProcessor.prototype.showArenaPanel = function ($data, $seltab) {
            var _this = this;
            if (!this._arenaPanel) {
                this._arenaPanel = new kuafu.ArenaPanel();
            }
            this._arenaPanel.load(function () {
                SceneManager.getInstance().render = false;
                var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);
                if (!$data) {
                    $data = [SharedDef.MODULE_ARENA_DOUJIANTAI, SharedDef.MODULE_ARENA_RANK, SharedDef.MODULE_ARENA_XIANMO];
                }
                else {
                    if (!($data instanceof Array)) {
                        $data = [$data];
                    }
                }
                if (!$seltab) {
                    $seltab = $data[0];
                }
                else {
                    if ($seltab instanceof Array) {
                        $seltab = $seltab[0];
                    }
                }
                _this._arenaPanel.show($data, $seltab);
            });
        };
        KuaFuProcessor.prototype.hideArenaPanel = function () {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.hide();
            }
        };
        KuaFuProcessor.prototype.djRewardChg = function () {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.djRewardChg();
            }
        };
        KuaFuProcessor.prototype.refreshArenaQualifyReward = function () {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.qualifyDataChg();
            }
        };
        KuaFuProcessor.prototype.refreshArenaQualifyRank = function ($rank) {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.qualifyRankChg($rank);
            }
        };
        KuaFuProcessor.prototype.msgWorldWarScPlayerInfo = function ($byte) {
            kuafu.KuaFu3v3Model.getInstance().worldWarByte = new ByteArray($byte.buffer.slice($byte.position, $byte.length));
            kuafu.KuaFu3v3Model.getInstance().worldWarByte.endian = Endian.LITTLE_ENDIAN;
        };
        //跨服匹配等待数据
        KuaFuProcessor.prototype.smsgKuafu3V3WaitInfo = function ($byte) {
            var $vo = new s2c_kuafu_3v3_wait_info();
            s2c_kuafu_3v3_wait_info.read($vo, $byte);
            kuafu.KuaFu3v3Model.getInstance().wait_info_vo = $vo;
            this.showKuaFuList();
            if (this._kuaFuMatchTimePanel) {
                this._kuaFuMatchTimePanel.hide();
            }
        };
        KuaFuProcessor.prototype.cmsKuafu3V3MatchOpen = function ($byte) {
            //console.log("匹配到人&接受或者拒绝");
        };
        KuaFuProcessor.prototype.smsgKuafuMathchStart = function ($byte) {
            //console.log("开始匹配");
            var matchType = $byte.readByte();
            if (matchType == SharedDef.KUAFU_TYPE_FENGLIUZHEN) {
                this.showKuafuMatchPanel();
            }
            if (matchType == SharedDef.KUAFU_TYPE_XIANFU) {
                //  this.showXianfuMatchTimePanel();
            }
        };
        KuaFuProcessor.prototype.msgKuaFu3V3CancelMatch = function ($byte) {
            if (this._kuaFuMatchTimePanel) {
                this._kuaFuMatchTimePanel.hide();
            }
            //if (this._xianfuMatchTimePanel) {
            //    this._xianfuMatchTimePanel.hide();
            //}
        };
        KuaFuProcessor.prototype.smsgKuafu3V3DeclineMath = function ($byte) {
            AlertUtil.show("有人拒绝了比赛", "提示", function (a) {
                if (a == 1) {
                    NetManager.getInstance().protocolos.kuafu_3v3_match();
                }
            });
            if (this._kuaFuMatchListPanel) {
                this._kuaFuMatchListPanel.hide();
            }
        };
        KuaFuProcessor.prototype.smsgKuafu3V3RankList = function ($byte) {
            //if (this._kuaFuPanel) {
            //    this._kuaFuPanel.setBangData($byte.readUTF())
            //}
        };
        KuaFuProcessor.prototype.smsgKuafu3V3MyRank = function ($byte) {
            var rank = $byte.readByte();
            //console.log("当前排名：" + rank);
            //if (this._kuaFuPanel) {
            //    this._kuaFuPanel.setSelfBangData(rank)
            //}
        };
        KuaFuProcessor.prototype.listenModuleEvents = function () {
            return [
                new KuaFuEvent(KuaFuEvent.SHOW_KUAFU_PANEL_EVENT),
                new KuaFuEvent(KuaFuEvent.INSTANCE_INT_FIELD_3V3_TIMES),
                new KuaFuEvent(KuaFuEvent.INSTANCE_INT_FIELD_3V3_DAY_REWARD),
                new KuaFuEvent(KuaFuEvent.KUAFU_1V1_REFRESH),
                new KuaFuEvent(KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_HIDE_ARENA_PANEL_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_ARENA_QUALIFY_REWARD_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_ARENA_QUALIFY_RANK_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_ARENA_QUALIFY_NUM_EVENT),
                new KuaFuEvent(KuaFuEvent.FIRSTREWARD_DJ_EVENT),
                new KuaFuEvent(KuaFuEvent.SHOW_DJT_RANK),
                new KuaFuEvent(KuaFuEvent.KUAFU_ARENA_3V3_RANK_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        KuaFuProcessor.prototype.smsgKuafuXianfuMathchWait = function ($byte) {
            var $vo = new s2c_kuafu_match_wait();
            s2c_kuafu_match_wait.read($vo, $byte);
            // if (this._xianfuMatchTimePanel) {
            //     this._xianfuMatchTimePanel.setVo($vo)
            // }
            //console.log($vo)
            var $evtt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_WAITJOIN_PANEL);
            $evtt.data = $vo;
            ModuleEventManager.dispatchEvent($evtt);
        };
        KuaFuProcessor.prototype.msgDoujiantaiGetEnemysInfo = function ($byte) {
            this.readRankByte($byte, false);
        };
        KuaFuProcessor.prototype.msgDouJianTaiTop3 = function ($byte) {
            this.readRankByte($byte, true);
        };
        KuaFuProcessor.prototype.readRankByte = function ($byte, $top3) {
            var $arr = new Array;
            var len = $byte.readShort();
            for (var i = 0; i < len; i++) {
                var $vo = new kuafu.KuaFu1v1BangData();
                $vo.postion = $byte.readByte(); //位置
                $vo.rank = $byte.readUint16();
                $vo.name = $byte.readUTF();
                $vo.gender = $byte.readByte();
                $vo.level = $byte.readUint16();
                $vo.weapon = $byte.readUint32();
                $vo.avatar = $byte.readUint32();
                $vo.divine = $byte.readUint32();
                $vo.force = $byte.readDouble();
                $vo.pass = $top3;
                //console.log($vo)
                $arr.push($vo);
            }
            // if (this._kuaFuPanel) {
            //     this._kuaFuPanel.kuafu1v1Panel.set1V1rankData($arr)
            // }
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.djData($arr);
            }
        };
        KuaFuProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.MSG_WORLD_WAR_SC_PLAYER_INFO] = function ($byte) { _this.msgWorldWarScPlayerInfo($byte); };
            obj[Protocols.SMSG_KUAFU_3V3_WAIT_INFO] = function ($byte) { _this.smsgKuafu3V3WaitInfo($byte); };
            obj[Protocols.SMSG_KUAFU_MATCH_START] = function ($byte) { _this.smsgKuafuMathchStart($byte); };
            obj[Protocols.MSG_KUAFU_3V3_CANCEL_MATCH] = function ($byte) { _this.msgKuaFu3V3CancelMatch($byte); };
            obj[Protocols.CMSG_KUAFU_3V3_MATCH_OPER] = function ($byte) { _this.cmsKuafu3V3MatchOpen($byte); };
            obj[Protocols.SMSG_KUAFU_3V3_DECLINE_MATCH] = function ($byte) { _this.smsgKuafu3V3DeclineMath($byte); };
            // obj[Protocols.SMSG_KUAFU_3V3_RANLIST] = ($byte: ByteArray) => { this.smsgKuafu3V3RankList($byte) };
            // obj[Protocols.SMSG_KUAFU_3V3_MYRANK] = ($byte: ByteArray) => { this.smsgKuafu3V3MyRank($byte) };
            obj[Protocols.SMSG_KUAFU_MATCH_WAIT] = function ($byte) { _this.smsgKuafuXianfuMathchWait($byte); };
            obj[Protocols.MSG_DOUJIANTAI_GET_ENEMYS_INFO] = function ($byte) { _this.msgDoujiantaiGetEnemysInfo($byte); };
            obj[Protocols.MSG_DOUJIANTAI_TOP3] = function ($byte) { _this.msgDouJianTaiTop3($byte); };
            return obj;
        };
        return KuaFuProcessor;
    }(BaseProcessor));
    kuafu.KuaFuProcessor = KuaFuProcessor;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFuProcessor.js.map