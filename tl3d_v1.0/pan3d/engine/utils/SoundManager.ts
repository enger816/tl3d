module Pan3d {
    export class SoundManager {

        constructor() {

        }

        private static _instance: SoundManager;
        public static getInstance(): SoundManager {
            if (!this._instance) {
                this._instance = new SoundManager();
            }
            return this._instance;
        }
        private init: boolean = false;
        private audio: any;
        private _volume: number = 1.0;
        public playSound(): void {
            this.initSound();
            this.audio.play();
        }

        public initSound(): void {
            if (this.init) {
                return;
            }

            this.audio = new Audio(Scene_data.fileRoot + "sound/sound_3521.mp3");
            this.audio.loop = true;
            this.audio.volume = this._volume;
            this.audio.play();

            this.init = true;
        }

        public stopSound(): void {
            if (this.audio) {
                this.audio.pause();
            }
        }

        public setVolume(val: number): void {
            this._volume = val;

            if (this._volume > 0) {
                this.playSound();
            } else {
                this.stopSound();
            }

            if (this.audio) {
                this.audio.volume = this._volume;
            }
        }

        public setSkillVolume(val: number): void {
            this._skillVolume = val;
            for (var key in this._skillSoundDic) {
                this._skillSoundDic[key].volume = this._skillVolume;
            }
        }

        private _skillSoundDic: any = new Object;
        private _skillVolume: number = 1.0;
        public playSkillSound($name: string): void {
            ////console.log($name);
            if (this._skillVolume <= 0) {
                return;
            }
            if (this._skillSoundDic[$name]) {
                this._skillSoundDic[$name].play();
            } else {
                var audio: any = new Audio(Scene_data.fileRoot + "skill/sound/" + $name);
                audio.loop = false;
                audio.volume = this._skillVolume;
                audio.play();
                this._skillSoundDic[$name] = audio;
            }
        }
    }
}