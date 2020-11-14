var CannoSoundManager = /** @class */ (function () {
    function CannoSoundManager() {
        this._volume = 1.0;
        this.lastcontactsNum = 0;
        this.changeTm = 0;
        this.audio = this.makeBaseSound(Pan3d.Scene_data.fileRoot + "basesound.mp3");
    }
    CannoSoundManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new CannoSoundManager();
        }
        return this._instance;
    };
    CannoSoundManager.prototype.makeBaseSound = function (value) {
        var temp = new Audio(value);
        temp.loop = true;
        temp.play();
        return temp;
    };
    CannoSoundManager.prototype.playHitSound = function (value) {
        console.log("声音大小", value);
    };
    CannoSoundManager.prototype.collidehit = function () {
        if (Pan3d.TimeUtil.getTimer() >= this.changeTm + 200) {
            //当前时间大于上次碰撞变化的100ms
            this.playHitSound(1);
        }
    };
    CannoSoundManager.prototype.updata = function () {
        var $body = CanonModelCheckpoint.getInstance().centenBall.body;
        var velocity = new Pan3d.Vector3D($body.velocity.x, $body.velocity.y, $body.velocity.z);
        var $isHitSound = false;
        for (var i = 0; i < canonkey.Physics.world.contacts.length; i++) {
            var $vo = canonkey.Physics.world.contacts[i];
            if ($vo.bi == $body || $vo.bj == $body) {
                $isHitSound = true;
            }
        }
        if (this.lastcontactsNum != canonkey.Physics.world.contacts.length) {
            this.lastcontactsNum = canonkey.Physics.world.contacts.length;
            this.changeTm = Pan3d.TimeUtil.getTimer();
        }
        if ($isHitSound) {
            var $dis = velocity.dot(velocity);
            $dis = Math.min(1, Math.max(0, Math.sqrt($dis) / 30));
            this.audio.volume = $dis;
        }
        else {
            this.audio.volume = 0;
        }
        if (this.audio.paused) {
            this.audio.play();
            console.log("重新开起");
        }
    };
    return CannoSoundManager;
}());
//# sourceMappingURL=CannoSoundManager.js.map