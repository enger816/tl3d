var Chat;
(function (Chat) {
    var WhisperToVo = /** @class */ (function () {
        function WhisperToVo() {
        }
        return WhisperToVo;
    }());
    Chat.WhisperToVo = WhisperToVo;
    var CharUiVo = /** @class */ (function () {
        function CharUiVo() {
        }
        return CharUiVo;
    }());
    Chat.CharUiVo = CharUiVo;
    var SendSeverCmd = /** @class */ (function () {
        function SendSeverCmd() {
        }
        SendSeverCmd.talkToNpc = function ($entryId, $quid) {
            //console.log("talk", $entryId, $quid)
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                if (GameInstance.roleList[i].unit.getEntry() == $entryId) {
                    //console.log("发送", GameInstance.roleList[i].unit.getUintGuid(), $quid)
                    NetManager.getInstance().protocolos.talk_with_npc(GameInstance.roleList[i].unit.getUintGuid(), $quid);
                    return;
                }
            }
        };
        SendSeverCmd.sendStr = function (str) {
            var $arr = str.split(" ");
            if ($arr.length) {
                var $id = 0;
                if ($arr.length > 1) {
                    $id = Number($arr[1]);
                }
                switch ($arr[0]) {
                    case "#raise":
                        NetManager.getInstance().protocolos.raise_base_spell(SharedDef.RAISE_BASE_SKILL, $id);
                        //console.log("send raise=>" + $id)
                        break;
                    case "#upgrade":
                        NetManager.getInstance().protocolos.upgrade_anger_spell($id);
                        //console.log("send upgrade=>" + $id)
                        break;
                    case "#RMount":
                        //培养
                        NetManager.getInstance().protocolos.raise_mount();
                        //console.log("send raise_mount=>")
                        break;
                    //祝福
                    case "#UMount":
                        NetManager.getInstance().protocolos.upgrade_mount(0);
                        //console.log("send upgrade_mount=>")
                        break;
                    case "#Talk":
                    case "#talk":
                        SendSeverCmd.talkToNpc(Number($arr[1]), Number($arr[2]));
                        break;
                    //直接完成
                    case "#UMounts":
                        NetManager.getInstance().protocolos.upgrade_mount_one_step(0);
                        //console.log("send upgrade_mount_one_step=>")
                        break;
                    case "#IlluActive":
                        //激活
                        NetManager.getInstance().protocolos.illusion_mount_active($id);
                        //console.log("send illusion_mount_active=>" + $id)
                        break;
                    //幻化
                    case "#Illu":
                        NetManager.getInstance().protocolos.illusion_mount($id);
                        //console.log("send Illu=>" + $id)
                        break;
                    case "#Ride":
                        NetManager.getInstance().protocolos.upgrade_anger_spell($id);
                        //console.log("send upgrade_anger_spell=>" + $id)
                        break;
                    case "#a":
                        NetManager.getInstance().protocolos.upgrade_anger_spell($id);
                        //console.log("send upgrade=>" + $id)
                        break;
                    case "#submitDaily":
                        NetManager.getInstance().protocolos.submit_quest_daily2();
                        //console.log("send upgrade=>" + "#submitDaily")
                        break;
                    case "#evi"://        #evi id
                        NetManager.getInstance().protocolos.enter_vip_instance($id, 1);
                        //console.log("send enter_vip_instance=>" + $id)
                        break;
                    case "#CL"://        #evi id
                        NetManager.getInstance().protocolos.change_line($id);
                        //console.log("#CL lineNo>" + $id)
                        break;
                    case "#doujiantai"://        #evi id
                        NetManager.getInstance().protocolos.doujiantai_fight($id);
                        //console.log("#doujiantai>" + $id)
                        break;
                    case "#r"://        #evi id
                        Scene_data.gameAngle = Number($id);
                        break;
                    case "#200"://        #evi id
                        NetManager.getInstance().protocolos.use_broadcast_gameobject($id);
                        //console.log("#200", $id)
                        break;
                    case "#move"://        #evi id
                        var $arr = str.split(" ");
                        var $toPos = new Vector2D(Number($arr[1]), Number($arr[2]));
                        GameInstance.mainChar.moveToPos2D = $toPos;
                        break;
                    case "#add"://        #evi id
                        var $arr = str.split(" ");
                        //  NetManager.getInstance().protocolos.add_para(Number($arr[1]), Number($arr[2]));
                        //console.log("12#add", Number($arr[1]), Number($arr[2]))
                        break;
                    case "#全民boss"://           #全民boss id
                        var $arr = str.split(" ");
                        //  NetManager.getInstance().protocolos.add_para(Number($arr[1]), Number($arr[2]));
                        NetManager.getInstance().protocolos.try_mass_boss(Number($arr[1]));
                        //console.log("#全民boss", Number($arr[1]));
                        break;
                    case "#经脉"://           #全民boss id
                        //console.log("#经脉", Number($arr[1]));
                        NetManager.getInstance().protocolos.meridian_practise();
                        break;
                    case "#经脉经验"://           #全民boss id
                        //console.log("#经脉经验", Number($arr[1]));
                        NetManager.getInstance().protocolos.add_meridian_exp(Number($arr[1]));
                        break;
                    case "#排位赛"://           #全民boss id
                        //console.log("#排位赛", Number($arr[1]));
                        NetManager.getInstance().protocolos.match_single_pvp();
                        break;
                    case "#改名"://           #全民boss id
                        //console.log("#改名", String($arr[1]));
                        NetManager.getInstance().protocolos.rename(String($arr[1]));
                        break;
                    default:
                        //console.log("没有对应消息")
                        break;
                }
            }
        };
        return SendSeverCmd;
    }());
    Chat.SendSeverCmd = SendSeverCmd;
    var ChatLinkJasonVo = /** @class */ (function () {
        function ChatLinkJasonVo() {
        }
        return ChatLinkJasonVo;
    }());
    Chat.ChatLinkJasonVo = ChatLinkJasonVo;
    var ChatVo = /** @class */ (function () {
        function ChatVo() {
        }
        ChatVo.prototype.makeJasonStr = function () {
            //    	public static CHAT_TYPE_SYSTEM: number = 0;	// 系统
            //public static CHAT_TYPE_WORLD: number = 1;	// 世界
            //public static CHAT_TYPE_FACTION: number = 2;	// 帮派
            //public static CHAT_TYPE_CURRENT: number = 3;	// 当前(场景)
            //public static CHAT_TYPE_HORM: number = 4;	// 喇叭
            //public static CHAT_TYPE_GROUP: number = 5;	// 队伍
            //public static CHAT_TYPE_WHISPER: number = 6;	// 私聊
            this.contentTxt = this.toJasonStr(this.s2c_send_chat.content);
            var $color = "[]";
            switch (this.s2c_send_chat.channel) {
                case SharedDef.CHAT_TYPE_SYSTEM:// 系统
                    $color = "[]";
                    break;
                case SharedDef.CHAT_TYPE_WORLD:// 世界
                    break;
                case SharedDef.CHAT_TYPE_FACTION:// 帮派
                    break;
                case SharedDef.CHAT_TYPE_CURRENT:// 当前(场景)
                    break;
                case SharedDef.CHAT_TYPE_HORM:// 喇叭
                    break;
                case SharedDef.CHAT_TYPE_GROUP:// 队伍
                    break;
                case SharedDef.CHAT_TYPE_WHISPER:// 私聊
                    break;
                default:
                    break;
            }
        };
        ChatVo.prototype.toJasonStr = function ($str) {
            // var $str: string = "asdsad{\"T\":1,\"M\":1,\"L\":1,\"X\":3,\"Y\":2}eeed{\"T\":1,\"M\":1,\"L\":1,\"X\":3,\"Y\":2}eea"
            var q = new Array;
            //console.log("解析toJasonStr", $str);
            var $stack = new Array;
            for (var i = 0; i < $str.length; i++) {
                if ($str.charAt(i) == '{') {
                    $stack.push(i);
                }
                else if ($str.charAt(i) == '}') {
                    if ($stack.length > 0) {
                        var $a = $stack.pop();
                        var $len = i - $a + 1;
                        var $jsonString = $str.substr($a, $len);
                        try {
                            var $obj = JSON.parse($jsonString);
                            if (this.needChangeStr($obj)) {
                                var $strType = Number($obj["T"]);
                                this.jasonlink = new ChatLinkJasonVo();
                                this.jasonlink.T = $obj.T;
                                if ($strType == SharedDef.TEXT_TYPE_POSITION) {
                                    //  < 临安城(68, 14) >
                                    var bbb = "<{NAME}({X},{Y})>";
                                    // bbb = bbb.replace("{NAME}", $obj.M)
                                    var mapVO = tb.TB_map.getTB_map(Number($obj.M));
                                    bbb = bbb.replace("{NAME}", mapVO.name);
                                    bbb = bbb.replace("{X}", $obj.X);
                                    bbb = bbb.replace("{Y}", $obj.Y);
                                    bbb = "[00ff00]" + bbb + "[]";
                                    q.push({ obj: $obj, replace: bbb, st: $a, ed: i + 1 });
                                    this.jasonlink.M = $obj.M;
                                    this.jasonlink.L = $obj.L;
                                    this.jasonlink.X = $obj.X;
                                    this.jasonlink.Y = $obj.Y;
                                }
                                if ($strType == SharedDef.TEXT_TYPE_GROUP) {
                                    var bbb = "<{NAME}>";
                                    bbb = bbb.replace("{NAME}", "加入队伍");
                                    bbb = "[00ff00]" + bbb + "[]";
                                    q.push({ obj: $obj, replace: bbb, st: $a, ed: i + 1 });
                                    this.jasonlink.G = $obj.G;
                                }
                            }
                        }
                        catch (e) {
                            //console.log(e);
                            return $str;
                        }
                    }
                }
            }
            var tt = "";
            var st = 0;
            for (var j = 0; j < q.length; ++j) {
                var ed = q[j].st;
                var len = ed - st;
                if (st < ed) {
                    tt = tt + $str.substr(st, len);
                }
                tt = tt + q[j].replace;
                st = q[j].ed;
            }
            if (st < $str.length) {
                tt = tt + $str.substr(st, $str.length - st);
            }
            if (tt == "") {
                tt = $str;
            }
            return tt;
        };
        ChatVo.prototype.needChangeStr = function ($obj) {
            if (!$obj["T"]) {
                return false;
            }
            var $a = Number($obj["T"]);
            if ($a == SharedDef.TEXT_TYPE_POSITION) {
                if (isNaN($obj["M"]) || isNaN($obj["L"]) || isNaN($obj["X"]) || isNaN($obj["Y"])) {
                    return false;
                }
                else {
                    return true;
                }
            }
            if ($a == SharedDef.TEXT_TYPE_GROUP) {
                if (($obj["G"])) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        };
        return ChatVo;
    }());
    Chat.ChatVo = ChatVo;
    var ChatModel = /** @class */ (function () {
        function ChatModel() {
            this.chatItem = new Array;
            this.chatTypeDic = new Object;
            this.nameItem = ["潘佳治", "欧阳拿来", "得宜", "色", "dse52", "乖巧", "不得了"];
            //   this.makeBaseChatHositry()
        }
        /*
        *私聊接口
        */
        ChatModel.toWhisper = function ($name, $guid) {
            ChatModel.showType = SharedDef.CHAT_TYPE_WHISPER;
            ChatModel.whisperGuid = new WhisperToVo;
            ChatModel.whisperGuid.name = $name;
            ChatModel.whisperGuid.guid = $guid;
            ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON, $guid);
        };
        Object.defineProperty(ChatModel, "showType", {
            get: function () {
                return this._showType;
            },
            set: function (value) {
                this._showType = value;
            },
            enumerable: true,
            configurable: true
        });
        ChatModel.prototype.makeBaseChatHositry = function () {
            for (var i = 0; i < 20; i++) {
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_SYSTEM);
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_WORLD);
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_FACTION);
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_CURRENT);
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_HORM);
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_GROUP);
                //  this.addBaseHositryByType(SharedDef.CHAT_TYPE_WHISPER)
            }
            for (var i = 0; i < 5; i++) {
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_WHISPER);
            }
        };
        //public static CHAT_TYPE_SYSTEM: number = 0;	// 系统
        //public static CHAT_TYPE_WORLD: number = 1;	// 世界
        //public static CHAT_TYPE_FACTION: number = 2;	// 帮派
        //public static CHAT_TYPE_CURRENT: number = 3;	// 当前(场景)
        //public static CHAT_TYPE_HORM: number = 4;	// 喇叭
        //public static CHAT_TYPE_GROUP: number = 5;	// 队伍
        //public static CHAT_TYPE_WHISPER: number = 6;	// 私聊
        ChatModel.prototype.addBaseHositryByType = function (value) {
            var $chatVo = this.getTempVo();
            $chatVo.s2c_send_chat.channel = value;
            $chatVo.s2c_send_chat.guid = $chatVo.s2c_send_chat.name;
            $chatVo.s2c_send_chat.lvl = random(99);
            $chatVo.s2c_send_chat.vip = random(15);
            this.chatItem.push($chatVo);
            if (SharedDef.CHAT_TYPE_SYSTEM == value && Math.random() > 0.5) {
                $chatVo.s2c_send_chat.content = "[000000]恭喜[ff0000]玩家名字[000000]获得神器[00ff00]霸王枪";
            }
            else {
                $chatVo.s2c_send_chat.content = "[000000]" + $chatVo.s2c_send_chat.content;
            }
            //   $chatVo.s2c_send_chat.content = "/大笑[000000]恭喜/大笑[ff0000]玩家名字[]获得神器[00ff00]霸王枪"
            //  $chatVo.s2c_send_chat.content = "[00FF00]<临安城(86,63)>"
            //  $chatVo.s2c_send_chat.content = "{T=1,M=1,L=1,X=3,Y=2}"
            // $chatVo.s2c_send_chat.content = this.toJasonStr($chatVo.s2c_send_chat.content);
            // $chatVo.s2c_send_chat.content = "习近平主持政治局民主生活会并发表表"
            //  $chatVo.s2c_send_chat.content = "习近平主持政治局民主"
            //  $chatVo.s2c_send_chat.content = "习近平"
            $chatVo.makeJasonStr();
        };
        ChatModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChatModel();
            }
            return this._instance;
        };
        //最后三条消息
        ChatModel.prototype.getLastThreeChatVo = function () {
            //      var $text = " [ffc13a]【世界】李逍遥获得了绝世神兵\n[00b1f1]【家族】赵灵儿加入了家族\n[ffffff]【组队】林月如退出了队伍";
            var $arr = new Array;
            for (var i = this.chatItem.length - 1; i >= 0 && $arr.length < 3; i--) {
                // var contxt: string = GameInstance.toserverName(this.chatItem[i].s2c_send_chat.name) + ":" + this.chatItem[i].contentTxt
                var $vo = this.chatItem[i].s2c_send_chat;
                if ($vo.channel == SharedDef.CHAT_TYPE_WORLD || $vo.channel == SharedDef.CHAT_TYPE_FACTION || $vo.channel == SharedDef.CHAT_TYPE_CURRENT || $vo.channel == SharedDef.CHAT_TYPE_SYSTEM) {
                    $arr.push(this.chatItem[i]);
                }
            }
            //console.log($arr)
            var $vvv = new Array;
            for (var i = 0; i < $arr.length; i++) {
                $vvv.push($arr[$arr.length - i - 1]);
            }
            return $vvv;
        };
        //来新的消息
        ChatModel.prototype.pushNewMes = function ($s2c_send_chat) {
            var $item = ChatModel.getInstance().getChatBlockItem(false);
            for (var i = 0; i < $item.length; i++) {
                if ($item[i].guid == $s2c_send_chat.guid) {
                    //console.log("已被屏蔽")
                    return;
                }
            }
            var $chatVo = new ChatVo();
            $chatVo.s2c_send_chat = $s2c_send_chat;
            if ($chatVo.s2c_send_chat.guid == GuidData.player.getGuid()) {
                $chatVo.isSelf = true;
            }
            else {
                $chatVo.isSelf = false;
            }
            $chatVo.makeJasonStr();
            var $ts = GameInstance.getServerNow();
            $chatVo.time = TimeUtil.getLocalTime2($ts);
            this.chatItem.push($chatVo);
        };
        ChatModel.prototype.pushNewSysInfo = function ($str) {
            var $chatVo = new ChatVo();
            $chatVo.s2c_send_chat = new s2c_send_chat();
            $chatVo.s2c_send_chat.name = "";
            $chatVo.s2c_send_chat.content = $str;
            $chatVo.contentTxt = $chatVo.s2c_send_chat.content;
            $chatVo.s2c_send_chat.channel = SharedDef.CHAT_TYPE_SYSTEM;
            var $ts = GameInstance.getServerNow();
            $chatVo.time = TimeUtil.getLocalTime2($ts);
            this.chatItem.push($chatVo);
        };
        ChatModel.prototype.getHaveNewChatInfo = function () {
            for (var j = 0; j < this.chatItem.length; j++) {
                var vo = this.chatItem[j];
                if (!vo.showLast && vo.s2c_send_chat.channel == SharedDef.CHAT_TYPE_WHISPER) {
                    return true;
                }
            }
            return false;
        };
        ChatModel.prototype.getChatItemByType = function (value) {
            var $arr = new Array;
            for (var i = 0; i < this.chatItem.length; i++) {
                if (this.chatItem[i].s2c_send_chat.channel == value) {
                    $arr.push(this.chatItem[i]);
                }
            }
            return $arr;
        };
        /**
         * 获得和某好友的聊天记录
         * @param value
         */
        ChatModel.prototype.getChatItemByToGuid = function ($toguid) {
            var $arr = new Array;
            var $arrwhisper = this.getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
            var myGuid = GuidData.player.getGuid();
            for (var i = 0; i < $arrwhisper.length; i++) {
                if ($arrwhisper[i].s2c_send_chat.guid == $toguid && $arrwhisper[i].s2c_send_chat.to_guid == myGuid) {
                    $arrwhisper[i].showLast = true;
                    $arr.push($arrwhisper[i]);
                }
                if ($arrwhisper[i].s2c_send_chat.guid == myGuid && $arrwhisper[i].s2c_send_chat.to_guid == $toguid) {
                    $arrwhisper[i].showLast = true;
                    $arr.push($arrwhisper[i]);
                }
            }
            return $arr;
        };
        ChatModel.prototype.getChatNameByGuid = function ($guid) {
            for (var i = 0; i < this.chatItem.length; i++) {
                if (this.chatItem[i].s2c_send_chat.guid == $guid) {
                    return this.chatItem[i].s2c_send_chat.name;
                }
            }
            return "没找到";
        };
        ChatModel.prototype.getWhisperByGuid = function () {
            var $showArr = new Array;
            var $arr = this.getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
            for (var i = 0; i < $arr.length; i++) {
                if (ChatModel.whisperGuid) {
                    if ($arr[i].s2c_send_chat.guid == ChatModel.whisperGuid.guid || $arr[i].s2c_send_chat.to_guid == ChatModel.whisperGuid.guid) {
                        $showArr.push($arr[i]);
                    }
                }
            }
            return $showArr;
        };
        ChatModel.prototype.getTempVo = function () {
            var $vo = new ChatVo();
            $vo.s2c_send_chat = new s2c_send_chat();
            $vo.s2c_send_chat.name = randomByItem(this.nameItem);
            $vo.s2c_send_chat.name = "A,B," + $vo.s2c_send_chat.name;
            $vo.s2c_send_chat.content = "";
            var num = random(50) + 5;
            var str = "中共第中央委员会第六次全会公报";
            for (var i = 0; i < num; i++) {
                $vo.s2c_send_chat.content += str.substr(random(str.length - 1), 1);
                if (Math.random() > 0.9) {
                    $vo.s2c_send_chat.content += "/脸i";
                }
            }
            if (Math.random() > 0.5) {
                $vo.s2c_send_chat.guid = GuidData.player.getGuid();
                $vo.isSelf = true;
            }
            else {
                $vo.isSelf = false;
            }
            return $vo;
        };
        ChatModel.prototype.sendCharInfo = function ($str) {
            if ($str.length) {
                var $index = $str.search("#");
                if ($index == -1) {
                    //NetManager.getInstance().protocolos.chat_world(GuidData.player.getGuid(), 0, GuidData.player.getName(), str);
                    var $type = ChatModel.showType;
                    //  str = str.replace("[位置]", "{\"T\":1,\"M\":1,\"L\":1,\"X\":3,\"Y\":2}");
                    $str = $str.replace("[位置]", "{T=1}");
                    if (ChatModel.showType == SharedDef.CHAT_TYPE_WHISPER) {
                        NetManager.getInstance().protocolos.chat_whisper(ChatModel.whisperGuid.guid, $str);
                    }
                    else {
                        NetManager.getInstance().protocolos.chat_by_channel($type, $str);
                    }
                    //console.log("发送编码", $str);
                }
                else {
                    SendSeverCmd.sendStr($str);
                }
                if (GameStart.GM) {
                    this.saveChatStr($str);
                }
            }
        };
        ChatModel.prototype.saveChatStr = function ($str) {
            var $temp = localStorage.getItem("GMITEM");
            var $gmitem = new Array();
            if ($temp) {
                $gmitem = JSON.parse($temp);
                if ($gmitem.length > 5) {
                    $gmitem.shift();
                }
            }
            var $needAdd = true;
            for (var i = 0; i < $gmitem.length; i++) {
                if ($gmitem[i] == $str) {
                    $gmitem.splice(i, 1);
                    break;
                }
            }
            $gmitem.push($str);
            localStorage.setItem("GMITEM", JSON.stringify($gmitem));
        };
        ChatModel.prototype.sendToChar = function (str) {
            var $displayList = GameInstance.roleList;
            var $nearChar;
            var $dis = 100000;
            for (var i = 0; $displayList && i < $displayList.length; i++) {
                var $tempChar = $displayList[i];
                if ($tempChar.unit.isPlayer() && !$tempChar.unit.isMain) {
                    var $temptis = GameInstance.mainChar.math_distance($tempChar);
                    if ($dis > $temptis) {
                        $dis = $temptis;
                        $nearChar = $tempChar;
                    }
                }
            }
            if ($nearChar) {
                //console.log($nearChar.unit.getName(), $nearChar.unit.getPlayerGUID(), str)
                NetManager.getInstance().protocolos.chat_whisper($nearChar.unit.getPlayerGUID(), str);
            }
        };
        ChatModel.prototype.ismyfriends = function ($guid) {
            var list = GuidData.social.getFriendList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].guid == $guid) {
                    return true;
                }
            }
            return false;
        };
        ChatModel.prototype.getPopMenuItemByGuid = function ($vo) {
            var $arr = new Array;
            //密聊
            if (this.ismyfriends($vo.guid)) {
                $arr.push(8);
            }
            else {
                $arr.push(7);
            }
            //查看消息
            $arr.push(0);
            //家族邀请
            if (GuidData.player.getFactionID() && !Boolean($vo.faction_guid)) {
                $arr.push(1);
            }
            //申请好友
            //申请入队
            //邀请入队
            //赠送礼物
            //屏蔽消息
            if (!this.getBlockByGuid($vo.guid)) {
                //  $arr.push(6)
            }
            return $arr;
        };
        ChatModel.prototype.getBlockByGuid = function ($guid) {
            var $item = ChatModel.getInstance().getChatBlockItem();
            for (var i = 0; i < $item.length; i++) {
                if ($item[i].guid == $guid) {
                    //console.log("已被屏蔽")
                    return true;
                }
            }
            return false;
        };
        ChatModel.prototype.getChatBlockItem = function (value) {
            if (value === void 0) { value = true; }
            if (!value && this.blockItem) {
                return this.blockItem;
            }
            if (!this.blockItem) {
                this.blockItem = new Array;
            }
            this.blockItem.length = 0;
            var $strItem = GuidData.player.getPlayChatBlock();
            for (var i = 0; i < $strItem.length; i++) {
                if ($strItem[i]) {
                    var tempArr = $strItem[i].split("|");
                    var $vo = new BlockVo();
                    $vo.gender = Number(tempArr[0]);
                    $vo.level = Number(tempArr[1]);
                    $vo.name = String(tempArr[2]);
                    $vo.vip = Number(tempArr[3]);
                    $vo.factionName = String(tempArr[4]);
                    $vo.guid = String(tempArr[5]);
                    $vo.indx = i;
                    //console.log($vo.indx)
                    this.blockItem.push($vo);
                }
            }
            return this.blockItem;
        };
        ChatModel.writeMultiFaceLineToCtx = function ($ctx, $str, fontsize, $tx, $ty) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
            return this.wrapFaceText($ctx, $str, "[]", $tx, $ty, ChatModel._textWidth, fontsize + 5);
        };
        ChatModel.getTextHeight = function ($ctx, $str, fontsize, $tx, $ty) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
            return this.wrapFaceText($ctx, $str, "[]", $tx, $ty, ChatModel._textWidth, fontsize + 5, false);
        };
        ChatModel.getNextWords = function ($str, indx) {
            var $iconId = -1;
            if ($str[indx] == "/" && $str.length > (indx + 2)) {
                var tempA = $str[indx + 0] + $str[indx + 1] + $str[indx + 2];
                for (var i = 0; i < UIData.faceItem.length; i++) {
                    if (UIData.faceItem[i] == tempA) {
                        return i + 1;
                    }
                }
            }
            return $iconId;
        };
        ChatModel.wrapFaceText = function ($ctx, text, baseColor, x, y, maxWidth, lineHeight, $wirte) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (maxWidth === void 0) { maxWidth = 500; }
            if (lineHeight === void 0) { lineHeight = 10; }
            if ($wirte === void 0) { $wirte = true; }
            TextRegExp.pushStr(text);
            var words = text;
            var line = "";
            var ty = 0;
            var $lineNum = 1; //行数
            for (var n = 0; n < words.length; n++) {
                if (TextRegExp.isColor(n, $ctx)) {
                    continue;
                }
                var metrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId = this.getNextWords(words, n);
                if ($faceId == -1) {
                    if (metrics.width > maxWidth || words[n] == "\n") {
                        ty += lineHeight;
                        line = "";
                        if (words[n] != "\n") {
                            if ($wirte) {
                                $ctx.fillText(words[n], x, y + ty);
                            }
                        }
                        $lineNum++;
                    }
                    else {
                        if ($wirte) {
                            $ctx.fillText(words[n], x + metrics.width * 1.0, y + ty);
                        }
                    }
                    line += words[n];
                }
                else {
                    var $rect = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - 5, 35, 35);
                    if (metrics.width > maxWidth) {
                        ty += lineHeight;
                        line = "";
                        $lineNum++;
                        $rect = new Rectangle(x + 0, y + ty - 5, 35, 35);
                    }
                    if ($wirte) {
                        this.drawFaceIcon($ctx, $rect, $faceId);
                    }
                    n = n + 2;
                    line += "大1";
                }
            }
            return $lineNum;
        };
        ChatModel.drawFaceIcon = function (ctx, $rect, $faceId) {
            UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
        };
        ChatModel.uiHeight = 60;
        ChatModel._showType = 1;
        ChatModel._textWidth = 360;
        return ChatModel;
    }());
    Chat.ChatModel = ChatModel;
    var BlockVo = /** @class */ (function () {
        function BlockVo() {
        }
        return BlockVo;
    }());
    Chat.BlockVo = BlockVo;
})(Chat || (Chat = {}));
//# sourceMappingURL=ChatModel.js.map