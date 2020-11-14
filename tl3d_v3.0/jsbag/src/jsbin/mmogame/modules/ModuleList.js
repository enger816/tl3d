var ModuleList = /** @class */ (function () {
    function ModuleList() {
    }
    ModuleList.getModuleList = function () {
        //所有的需要注册的模块  都写在这里
        var $arr = [
            new EngineModule(),
            new SceneLoadModule(),
            new mainUi.MainUiModule(),
            new Chat.ChatModule(),
            new Camand.CommandModule(),
            //new EquipmentModule(),    //装备****没开启
            new charbg.CharBgModule(),
            new skillUi.SkillUiModule(),
            new mountui.MountUiModule(),
            new treasure.TreasureUiModule(),
            new Hangup.HangupUiModel(),
            new social.SocialUiModule(),
            new copytask.CopytaskUiModule(),
            new role.RoleUiModule(),
            new ranking.RankingModule(),
            new activity.ActivityModule(),
            new store.StoreModule(),
            new refill.RefillModule(),
            new welfare.WelfareModule(),
            new stronger.StrongerModule(),
            new newbieguide.NewbieguideModule(),
            new logingift.LogingiftModule(),
            new training.TrainingModule(),
            new divinesword.DivineswordModule(),
            new stateup.StateUpModule(),
            new pass.PassModule(),
            new team.TeamModule(),
            new LoginModule(),
            new SceneModule(),
            new fb.FubenModule(),
            new reward.RewardModule(),
            new strengthgem.StrengthGemModule(),
            new faction.FactionModule(),
            new boss.BossModule(),
            new mapnew.MapNewModule(),
            new minmap.MinMapModule(),
            new selectserver.SelectServerModule(),
            new quest.QuestModule(),
            new kuafu.KuafuModule(),
            new moneytree.MoneyTreeModule(),
            new chgfish.ChgfishModule(),
            new dialog.DialogueModule(),
            new msgtip.MsgTipModule(),
        ];
        $arr.push(new wintittle.WindowRestTittleModule());
        $arr.push(new popbuy.PopBuyModule());
        $arr.push(new homeui.HomeUiModule());
        $arr.push(new fightui.FightUiModule());
        $arr.push(new topui.TopUiModule());
        $arr.push(new bottomui.BottomUiModule());
        $arr.push(new leftui.LeftUiModule());
        $arr.push(new rightui.RightUiModule());
        $arr.push(new hornui.HornUiModule());
        $arr.push(new faceui.FaceUiModule());
        $arr.push(new setingui.SetingUiModule());
        $arr.push(new shieldui.ShieldUiModule());
        $arr.push(new whisper.WhisperUiModule());
        $arr.push(new offlinereward.OfflineRewardModule());
        $arr.push(new adventuremap.AdventureMapModule());
        $arr.push(new adventureinfo.AdventureInfoModule());
        $arr.push(new adventuresettlement.AdventureSettlementModule());
        $arr.push(new adventurebang.AdventureBangModule());
        $arr.push(new adventurebossnotice.AdventureBossNoticeModule());
        //  $arr.push(new donation.DonationModule())
        $arr.push(new warehousetreasure.WarehouseTreasureModule());
        $arr.push(new duihuan.DuiHuanModule());
        $arr.push(new turnonwarehouse.TurnonWarehouseModule());
        $arr.push(new gift.GiftModule());
        $arr.push(new sboss.SbossModule());
        $arr.push(new wing.WingModule());
        $arr.push(new email.MailModule());
        $arr.push(new meridian.MeridianModule());
        $arr.push(new exterior.ExteriorModule());
        $arr.push(new kaifu.KaiFuModule());
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
//# sourceMappingURL=ModuleList.js.map