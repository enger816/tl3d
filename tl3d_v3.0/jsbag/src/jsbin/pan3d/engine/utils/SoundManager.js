var Pan3d;
(function (Pan3d) {
    var SoundManager = /** @class */ (function () {
        function SoundManager() {
            this.init = false;
            this._volume = 1.0;
            this._skillSoundDic = new Object;
            this._skillVolume = 1.0;
        }
        SoundManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new SoundManager();
            }
            return this._instance;
        };
        SoundManager.prototype.playSound = function () {
            this.initSound();
            this.audio.play();
        };
        SoundManager.prototype.initSound = function () {
            if (this.init) {
                return;
            }
            this.audio = new Audio(Pan3d.Scene_data.fileRoot + "sound/sound_3521.mp3");
            this.audio.loop = true;
            this.audio.volume = this._volume;
            this.audio.play();
            this.init = true;
        };
        SoundManager.prototype.stopSound = function () {
            if (this.audio) {
                this.audio.pause();
            }
        };
        SoundManager.prototype.setVolume = function (val) {
            this._volume = val;
            if (this._volume > 0) {
                this.playSound();
            }
            else {
                this.stopSound();
            }
            if (this.audio) {
                this.audio.volume = this._volume;
            }
        };
        SoundManager.prototype.setSkillVolume = function (val) {
            this._skillVolume = val;
            for (var key in this._skillSoundDic) {
                this._skillSoundDic[key].volume = this._skillVolume;
            }
        };
        SoundManager.prototype.playSkillSound = function ($name) {
            ////console.log($name);
            if (this._skillVolume <= 0) {
                return;
            }
            if (this._skillSoundDic[$name]) {
                this._skillSoundDic[$name].play();
            }
            else {
                var audio = new Audio(Pan3d.Scene_data.fileRoot + "skill/sound/" + $name);
                audio.loop = false;
                audio.volume = this._skillVolume;
                audio.play();
                this._skillSoundDic[$name] = audio;
            }
        };
        return SoundManager;
    }());
    Pan3d.SoundManager = SoundManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SoundManager.js.map