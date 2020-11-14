var TpGame = /** @class */ (function () {
    function TpGame() {
    }
    TpGame.getArrByStr = function (str) {
        var boneNameAry = str.split(/\s+/g);
        for (var i = boneNameAry.length - 1; i >= 0; i--) {
            if (String(boneNameAry[i]).length < 1) {
                boneNameAry.splice(i, 1);
            }
        }
        return boneNameAry;
    };
    return TpGame;
}());
var ModuleList = /** @class */ (function () {
    function ModuleList() {
    }
    ModuleList.getModuleList = function () {
        //所有的需要注册的模块  都写在这里
        var $arr = [
            new materialui.MaterialModule(),
            new colorview.ColorModule(),
            new menutwo.MenuTwoModule(),
            new editscene.EditSceneModule(),
            new maineditor.MainEditorModule(),
            new folder.FolderModule(),
            new xyz.MoveScaleRotatioinModule(),
            new materialleft.MaterialLeftModule(),
            new drag.DragModule(),
        ];
        return $arr;
    };
    /**
     * 启动所有模块
     */
    ModuleList.startup = function () {
        var allModules = ModuleList.getModuleList();
        for (var i = 0; i < allModules.length; i++) {
            Pan3d.Module.registerModule(allModules[i]);
        }
    };
    return ModuleList;
}());
//# sourceMappingURL=ModuleList.js.map