var game;
(function (game) {
    var Module = Pan3d.Module;
    var ModuleList = /** @class */ (function () {
        function ModuleList() {
        }
        ModuleList.getModuleList = function () {
            //所有的需要注册的模块  都写在这里
            var $arr = [
                new game.SceneModule(),
                new topmenu.TopMenuModule(),
                new rightpanda.RightPandaModule(),
                new platform.PlatFormModule(),
                new mainui.MainuiModule(),
                new help.HelpModule(),
                new selectlevel.SelectLevelModule(),
                new resetplay.ResetPlayModule(),
                new skinui.SkinListModule(),
                new topstart.TopStartModule(),
                new menuselectpan.MenuSelectModule(),
                new leveluppan.LevelUpModule(),
                new invitation.InvitationModule(),
                new setupui.SetupWinModule(),
                new rank.RankModule(),
                new friendrank.FriendRankModule(),
                new task.TaskModule(),
                new special.SpecialModule(),
                new megame.MeGameModule(),
                new baoxiang.BaoxiangModule(),
                new offline.OffLineModule(),
                new skineffict.SkineffictModule(),
                new concern.ConcernModule(),
                new vip.VipModule(),
                new endless.EndLessStartModule(),
                new endless.EndLessModule(),
                new online.OnlineStartModule(),
                new online.OnlineModule(),
                new linkplay.LinkRoomModule(),
            ];
            return $arr;
        };
        /**
         * 启动所有模块
         */
        ModuleList.startup = function () {
            var allModules = ModuleList.getModuleList();
            for (var i = 0; i < allModules.length; i++) {
                Module.registerModule(allModules[i]);
            }
        };
        return ModuleList;
    }());
    game.ModuleList = ModuleList;
})(game || (game = {}));
//# sourceMappingURL=ModuleList.js.map