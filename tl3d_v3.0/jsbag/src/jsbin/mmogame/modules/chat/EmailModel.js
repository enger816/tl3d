var email;
(function (email) {
    var EmailVo = /** @class */ (function () {
        function EmailVo() {
        }
        return EmailVo;
    }());
    email.EmailVo = EmailVo;
    var EmailModel = /** @class */ (function () {
        function EmailModel() {
            this._emailItem = new Array;
            this.lastGetEmailTipTime = 0;
        }
        EmailModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new EmailModel();
            }
            return this._instance;
        };
        EmailModel.prototype.getEmailArr = function () {
            this._emailItem.length = 0;
            var $baseList = GuidData.giftPacks.getGiftDataItem();
            for (var i = 0; i < $baseList.length; i++) {
                var $vo = new EmailVo();
                $vo.giftBaseVo = $baseList[i];
                this._emailItem.push($vo);
            }
            return this._emailItem;
        };
        EmailModel.prototype.getHaveNewEmailInfo = function () {
            this.getEmailArr();
            var $ts = GameInstance.getServerNow();
            if (!this.lastGetEmailTipTime) {
                this.lastGetEmailTipTime = GameInstance.getServerNow();
            }
            var $sever = new Date($ts * 1000);
            for (var i = 0; i < this._emailItem.length; i++) {
                var $vo = this._emailItem[i];
                if ($vo.giftBaseVo.isRead == false) {
                    var $t = new Date($vo.giftBaseVo.startTime * 1000);
                    if ($vo.giftBaseVo.startTime > this.lastGetEmailTipTime) {
                        return true;
                    }
                }
            }
            return false;
        };
        EmailModel.prototype.getEmailVoByIdex = function ($idex) {
            for (var i = 0; i < this._emailItem.length; i++) {
                if (this._emailItem[i].giftBaseVo.indx == $idex) {
                    return this._emailItem[i];
                }
            }
            return null;
        };
        EmailModel.prototype.i_dele_read_clik = function () {
            var $cando = false;
            for (var i = 0; i < this._emailItem.length; i++) {
                if (this._emailItem[i].giftBaseVo.isRead && !this._emailItem[i].giftBaseVo.item) {
                    $cando = true;
                }
            }
            if ($cando) {
                NetManager.getInstance().protocolos.remove_mail_one_step();
            }
        };
        EmailModel.prototype.i_get_item_clik = function () {
            NetManager.getInstance().protocolos.pick_mail_one_step();
        };
        return EmailModel;
    }());
    email.EmailModel = EmailModel;
})(email || (email = {}));
//# sourceMappingURL=EmailModel.js.map