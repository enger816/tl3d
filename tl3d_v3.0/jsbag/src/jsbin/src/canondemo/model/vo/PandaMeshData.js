var rightpanda;
(function (rightpanda) {
    var PandaMeshData = /** @class */ (function () {
        function PandaMeshData() {
            PandaMeshData.speenid++;
            this.id = PandaMeshData.speenid;
        }
        PandaMeshData.showCentenTxtInfoType = function ($key, $txt, $data) {
            if ($data === void 0) { $data = null; }
            var $pandaMeshData = new PandaMeshData();
            $pandaMeshData.key = $key;
            $pandaMeshData.txt = $txt;
            $pandaMeshData.data = $data;
            GameData.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.SHOW_CENTEN_INFO_TXT), $pandaMeshData);
        };
        PandaMeshData.showRightPanda = function ($key, $url, $evt) {
            if ($evt === void 0) { $evt = null; }
            var obj = new PandaMeshData();
            obj.url = $url;
            obj.key = $key;
            obj.type = PandaMeshData.type1;
            obj.data = $evt;
            GameData.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_PANDA_INFO), obj);
        };
        PandaMeshData.hideCentenTxtInfoType2 = function ($key) {
            var $pandaMeshData = new PandaMeshData();
            $pandaMeshData.key = $key;
            GameData.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.HIDE_CENTEN_INFO_TXT), $pandaMeshData);
        };
        PandaMeshData.type1 = 1;
        //public static type2: number = 2;
        PandaMeshData.key1 = 1; //帮助列表
        PandaMeshData.key2 = 2; //被别人帮助 
        PandaMeshData.key3 = 3; //皮肤
        PandaMeshData.key4 = 4; //邀请分享好友列表
        PandaMeshData.key5 = 5; //点击请求帮助
        PandaMeshData.key6 = 6; //全榜列表
        PandaMeshData.key7 = 7; //特殊关卡
        PandaMeshData.key8 = 8; //视屏奖励
        PandaMeshData.key9 = 9; //领取分享奖励
        PandaMeshData.key10 = 10; //给于的奖励需要点击领取
        PandaMeshData.key11 = 11; //无尽模式
        PandaMeshData.key13 = 13; //联机夺宝
        PandaMeshData.key14 = 14; //任务系统
        PandaMeshData.key15 = 15; //抽奖
        PandaMeshData.key16 = 16; //宝箱
        PandaMeshData.key17 = 17; //特效皮肤
        PandaMeshData.key101 = 101; //请求帮助
        PandaMeshData.key102 = 102; //正在播放录像
        PandaMeshData.key103 = 103; //正在回放录像
        PandaMeshData.key104 = 104; //引导提示
        PandaMeshData.key105 = 105; //在正帮助别人
        PandaMeshData.key106 = 106; //等待好友加入获取魔法
        PandaMeshData.speenid = 0;
        return PandaMeshData;
    }());
    rightpanda.PandaMeshData = PandaMeshData;
})(rightpanda || (rightpanda = {}));
//# sourceMappingURL=PandaMeshData.js.map