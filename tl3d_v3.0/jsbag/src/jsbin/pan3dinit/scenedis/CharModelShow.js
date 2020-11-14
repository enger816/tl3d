var scenedis;
(function (scenedis) {
    var me;
    (function (me) {
        var CharModelShow = /** @class */ (function () {
            function CharModelShow() {
                this.addModelChar();
            }
            CharModelShow.prototype.addModelChar = function () {
                var $sc = new scenedis.me.ModelSceneChar();
                $sc.setRoleUrl(getRoleUrl("50003"));
                $sc.setWingByID("901");
                $sc.setMountById("4103");
                $sc.setWeaponByAvatar(50011);
                $sc.play(Pan3d.CharAction.STAND_MOUNT);
                Pan3d.SceneManager.getInstance().addMovieDisplay($sc);
            };
            return CharModelShow;
        }());
        me.CharModelShow = CharModelShow;
    })(me = scenedis.me || (scenedis.me = {}));
})(scenedis || (scenedis = {}));
//# sourceMappingURL=CharModelShow.js.map