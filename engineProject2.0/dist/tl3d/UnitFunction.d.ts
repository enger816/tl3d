export declare class UnitFunction {
    static getUItittleUrl(name: string): string;
    static getSkillUrl(name: string): string;
    static getModelUrl(name: string): string;
    static getModelUIUrl(name: string): string;
    static getMapUrl(name: string): string;
    /**
     * 返回角色模型的url
     * @param name
     */
    static getRoleUrl(name: number): string;
    static getZipMapUrl(name: string): string;
    /**标准化数字 */
    static Snum($num: number): string;
    static getEffectUIUrl(name: string): string;
    static getKeyProById($id: number): string;
}
