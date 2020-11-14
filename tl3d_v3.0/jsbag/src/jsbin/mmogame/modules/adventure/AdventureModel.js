var adventure;
(function (adventure) {
    var AdventureModel = /** @class */ (function () {
        function AdventureModel() {
            this.initData();
        }
        AdventureModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new AdventureModel();
            }
            return this._instance;
        };
        AdventureModel.prototype.initData = function () {
        };
        AdventureModel.prototype.getPlayCurId = function () {
            var $playCur = 0;
            var $id = GuidData.player.getPlayerIntFieldTrialFinishedSectionid();
            if ($id == 0) {
                $playCur = tb.TB_risk_base.get_TB_risk_base(1).firstSection;
            }
            else {
                var $tb = tb.TB_risk_data.get_TB_risk_data($id);
                if ($tb.nextId > 0) {
                    $playCur = $tb.nextId;
                }
                else {
                    $playCur = $tb.id;
                }
            }
            return $playCur;
        };
        AdventureModel.prototype.getCurTb = function () {
            return tb.TB_risk_data.get_TB_risk_data(this.getPlayCurId());
        };
        AdventureModel.prototype.getCurBossTb = function () {
            return tb.TB_risk_data.get_TB_risk_data(this.getPlayCurId() + 1000000);
        };
        return AdventureModel;
    }());
    adventure.AdventureModel = AdventureModel;
})(adventure || (adventure = {}));
//# sourceMappingURL=AdventureModel.js.map