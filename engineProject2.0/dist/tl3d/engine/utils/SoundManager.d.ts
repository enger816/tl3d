export declare class SoundManager {
    constructor();
    private static _instance;
    static getInstance(): SoundManager;
    private init;
    private audio;
    private _volume;
    playSound(): void;
    initSound(): void;
    stopSound(): void;
    setVolume(val: number): void;
    setSkillVolume(val: number): void;
    private _skillSoundDic;
    private _skillVolume;
    playSkillSound($name: string): void;
}
