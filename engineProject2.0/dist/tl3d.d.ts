declare  module tl3d{  export  class BaseProcessor extends Processor {
}
export  class CharAction {
    static STANAD: string;
    static WALK: string;
    static DEATH: string;
    static JUMP: string;
    static SIT: string;
    static ATTACK_01: string;
    static ATTACK_02: string;
    static ATTACK_03: string;
    static ATTACK_04: string;
    static ATTACK_05: string;
    static ATTACK_06: string;
    static ATTACK_010: string;
    static ATTACK_020: string;
    static STAND_MOUNT: string;
    static WALK_MOUNT: string;
    static s_attack_01: string;
}
export  class MountChar extends SceneBaseChar {
    setData($rank: number, $iid: number): void;
}
export  class SceneBaseChar extends Display3dMovie {
    private _avatar;
    _visible: boolean;
    get visible(): boolean;
    set visible(value: boolean);
    setAvatar(num: number): void;
    update(): void;
    protected getSceneCharAvatarUrl(num: number): string;
    protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
}
export  class SceneChar extends SceneBaseChar {
    _speedDirect: Vector3D;
    speedTX: number;
    life: number;
    protected _walkPath: Array<Vector3D>;
    private _astarDirect;
    private _astatTopos;
    skillitem: Array<Skill>;
    mountChar: MountChar;
    isMount: boolean;
    static WEAPON_PART: string;
    static WEAPON_DEFAULT_SLOT: string;
    static MOUNT_SLOT: string;
    static WING_SLOT: string;
    static SEL_PART: string;
    static QUEST_ICON: string;
    static NONE_SLOT: string;
    protected _px: number;
    protected _py: number;
    protected _pz: number;
    private _pRotationY;
    private _isBoss;
    private _optimization;
    constructor();
    get isDeath(): boolean;
    get isBoss(): boolean;
    set isBoss(val: boolean);
    get px(): number;
    set px(val: number);
    get py(): number;
    set py(val: number);
    get pz(): number;
    set pz(val: number);
    /**强制角度 */
    set forceRotationY(val: number);
    get pRotationY(): number;
    set pRotationY(val: number);
    play($action: string, $completeState?: number, needFollow?: boolean): boolean;
    getCurrentAction(): string;
    protected getSceneCharAvatarUrl(num: number): string;
    static Defaul_Man_Avatar: number;
    static Defaul_WoMan_Avater: number;
    setMount(): void;
    private _weaponNum;
    setWeapon(num: number): void;
    setWeaponByAvatar(avatar: number, $suffix?: string): void;
    private _wingID;
    protected _wingDisplay: SceneBaseChar;
    addTestWeapon(): void;
    tittleHeight: number;
    onMeshLoaded(): void;
    set walkPath($wp: Array<Vector3D>);
    fixAstartData(pos: Vector2D): void;
    applyWalk($item: Array<Vector2D>): void;
    set moveToPos2D($v2d: Vector2D);
    private stopToPos;
    private moveTile;
    refreshY(): void;
    refreshHP(): void;
    protected rotationToNew(value: number, num?: number): void;
    set speedUseTime(value: number);
    refreshSpeed(): void;
    private lastPos;
    protected walkAstar(t: number): void;
    protected walkComplete(): void;
    walkCompleteBackFun: Function;
    protected setTarget(): void;
    setAstarNrmAndRotation(): void;
    toRotationY: number;
    protected mathAngle(x1: number, y1: number, x2: number, y2: number): number;
    setSpeedDirect(value: Vector3D): void;
    stopMove(): void;
    getEndWalkPathPos(): Vector3D;
    watch($obj: Display3D, $syn?: boolean): void;
    getCurrentPos(): Vector3D;
    getAstarPos(): Vector2D;
    protected changeAction($action: string): void;
    skillVo: Skill;
    playSkill($skill: Skill): void;
    msgSpellStop(): void;
    destory(): void;
    removeStage(): void;
    addStage(): void;
    math_distance($other: Display3dMovie): number;
    set visible(value: boolean);
    get visible(): boolean;
    set optimization(value: boolean);
    get optimization(): boolean;
    private _resultVisible;
    get resultVisible(): boolean;
    applyVisible(): void;
    private lineSprite;
    update(): void;
    private _showHitBox;
    private triIndex;
    private hitBox2DItem;
    mouseClik($lineA: Vector3D, $lineB: Vector3D): boolean;
}
export  class BitMapData {
    width: number;
    height: number;
    imgData: ImageData;
    constructor($w: number, $h: number);
    private getIndexByPos;
    setRgb($tx: number, $ty: number, $ve: Vector3D): void;
    getRgb($tx: number, $ty: number): Vector3D;
}
export  class Camera3D extends Object3D {
    cameraMatrix: Matrix3D;
    private _distance;
    offset: Vector3D;
    constructor();
    get distance(): number;
    set distance(value: number);
}
export  class ColorType {
    static Orange7a2f21: string;
    static Orange9a683f: string;
    static Orange853d07: string;
    static Brown6a4936: string;
    static Brown623424: string;
    static Brownac8965: string;
    static Reddb4051: string;
    static Redd92200: string;
    static Redff0000: string;
    static Brownd8d49c: string;
    static color843b11: string;
    static colorb96d49: string;
    static colorcd2000: string;
    static colorfef3d7: string;
    static color9a683f: string;
    static Brown7a2f21: string;
    static Brown40120a: string;
    static Brown491207: string;
    static Brown541616: string;
    static Brown5a2610: string;
    static Browndf9a68: string;
    static Browndb39264: string;
    static Brownd662c0d: string;
    static colorefe4c4: string;
    static color802626: string;
    static color9f7b4d: string;
    static color4b0808: string;
    static color5f5c59: string;
    static color903713: string;
    static colorfdf6da: string;
    static color73301c: string;
    static colorffeeb5: string;
    static Green98ec2c: string;
    static Green56da35: string;
    static Green20a200: string;
    static Greenadff00: string;
    static Green2ca937: string;
    static Green464b11: string;
    static Green54db36: string;
    static Yellowf7d253: string;
    static Yellowffecc6: string;
    static Yellowffd500: string;
    static Yellowffe9b4: string;
    static Yellowedce7e: string;
    static color4c1c07: string;
    static Whiteffffff: string;
    static Whitefffce6: string;
    static Whitefff7db: string;
    static White9A683F: string;
    static Black000000: string;
    static Whitefff4d6: string;
    static Whiteffeed0: string;
    static Whiteffeec9: string;
    static Whiteffe9b4: string;
    static Whitefff0b4: string;
    static Coffeeff9200: string;
    static Coffeefee87b: string;
    static color2daa35: string;
    static color4392ff: string;
    static colorb759ff: string;
    static colorff7200: string;
    static colorce0a00: string;
    static coloraa874a: string;
    static colorffecc6: string;
    static colorfde87e: string;
    static colord6e7ff: string;
    static colord27262e: string;
    static colorffe9b4: string;
    static color9c9b9b: string;
    static colorfff2d3: string;
    static color451800: string;
}
export  class Dictionary implements IDictionary {
    _keys: string[];
    _values: any[];
    constructor(init: {
        key: string;
        value: any;
    }[]);
    add(key: string, value: any): void;
    has(key: string): boolean;
    remove(key: string): void;
    keys(): string[];
    values(): any[];
    containsKey(key: string): boolean;
    toLookup(): IDictionary;
}
interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}
export {};
export  class GC {
    destory(): void;
}
export  class MeshData extends ObjData {
    boneIDAry: Array<number>;
    boneWeightAry: Array<number>;
    boneWeightBuffer: WebGLBuffer;
    boneIdBuffer: WebGLBuffer;
    boneNewIDAry: Array<number>;
    materialUrl: string;
    materialParamData: Array<any>;
    materialParam: MaterialBaseParam;
    material: Material;
    particleAry: Array<BindParticle>;
    uid: number;
    boneIDOffsets: number;
    boneWeightOffsets: number;
    bindPosAry: Array<Array<number>>;
    bindPosMatrixAry: Array<Matrix3D>;
    bindPosInvertMatrixAry: Array<Matrix3D>;
    getBindPosMatrix(): void;
    destory(): void;
}
export  class BindParticle {
    url: string;
    socketName: string;
    constructor($url: string, $socketName: string);
}
export  class ObjData extends ResCount {
    vertices: Array<number>;
    uvs: Array<number>;
    indexs: Array<number>;
    lightuvs: Array<number>;
    normals: Array<number>;
    tangents: Array<number>;
    bitangents: Array<number>;
    collision: CollisionItemVo;
    treNum: number;
    vertexBuffer: WebGLBuffer;
    uvBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    lightUvBuffer: WebGLBuffer;
    normalsBuffer: WebGLBuffer;
    tangentBuffer: WebGLBuffer;
    bitangentBuffer: WebGLBuffer;
    /**顶点 uv lightuv normal 合成一个 va */
    compressBuffer: boolean;
    uvsOffsets: number;
    lightuvsOffsets: number;
    normalsOffsets: number;
    tangentsOffsets: number;
    bitangentsOffsets: number;
    stride: number;
    hasdispose: boolean;
    constructor();
    destory(): void;
}
export  class Object3D extends EventDispatcher {
    protected _x: number;
    protected _y: number;
    protected _z: number;
    rx: number;
    ry: number;
    rz: number;
    protected _scaleX: number;
    protected _scaleY: number;
    protected _scaleZ: number;
    protected _rotationX: number;
    protected _rotationY: number;
    protected _rotationZ: number;
    posMatrix: Matrix3D;
    constructor($x?: number, $y?: number, $z?: number);
    toStringout(): String;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    set scale(value: number);
    set scaleX(value: number);
    get scaleX(): number;
    set scaleY(value: number);
    get scaleY(): number;
    set scaleZ(value: number);
    get scaleZ(): number;
    set rotationX(value: number);
    get rotationX(): number;
    set rotationY(value: number);
    get rotationY(): number;
    set rotationZ(value: number);
    get rotationZ(): number;
    get px(): number;
    set px(val: number);
    get py(): number;
    set py(val: number);
    get pz(): number;
    set pz(val: number);
    updateMatrix(): void;
    updateRotationMatrix(): void;
}
export  class ResCount extends GC {
    protected _useNum: number;
    idleTime: number;
    static GCTime: number;
    get useNum(): number;
    set useNum(n: number);
    clearUseNum(): void;
}
export  class ResGC {
    _dic: Object;
    constructor();
    gc(): void;
}
export  class Context3D {
    renderContext: Laya.WebGLContext;
    _contextSetTest: ContextSetTest;
    init($caves: HTMLCanvasElement): void;
    resetSize($width: number, $height: number): void;
    uploadBuff3D($jsData: any): WebGLBuffer;
    uploadBuff3DArrayBuffer($jsData: ArrayBuffer): WebGLBuffer;
    uploadBuff3DByBuffer($buffData: WebGLBuffer, $jsData: Array<number>): void;
    uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer;
    uploadIndexBuff3DByBuffer($iBuffer: WebGLBuffer, $iStrData: Array<number>): void;
    clearContext(): void;
    updateFBO(fbo: FBO): void;
    setDepthTest(tf: boolean): void;
    setWriteDepth(tf: boolean): void;
    setBlendParticleFactors(type: number): void;
    setProgram($program: WebGLProgram): void;
    getLocation($program: WebGLProgram, $name: string): WebGLUniformLocation;
    /** ***************************setvc */
    setVcMatrix3fv($program: Shader3D, $name: string, $m: Float32Array): void;
    setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array): void;
    setVpMatrix($program: Shader3D, $m: Float32Array): void;
    setVc4fv($program: Shader3D, $name: string, $m: any): void;
    setVc1fv($program: Shader3D, $name: string, $m: any): void;
    setVc3fv($program: Shader3D, $name: string, $m: any): void;
    setVc2fv($program: Shader3D, $name: string, $m: any): void;
    setVcFloat($program: Shader3D, $name: string, $m: any): void;
    /** ******************************************* end setvc */
    setuniform3f($program: Shader3D, $name: string, a: number, b: number, c: number): void;
    setVcMatrix4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
    setVc2f($program: Shader3D, $name: string, a: number, b: number): void;
    setVcMatrix2fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
    setVc4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
    setVa(dataId: number, dataWidth: number, dataBuffer: WebGLBuffer): void;
    pushVa(dataBuffer: WebGLBuffer): boolean;
    setVaOffset(dataId: number, dataWidth: number, stride: number, offset: number): void;
    clearVa(dataId: number): void;
    drawCall($iBuffer: WebGLBuffer, $numTri: number): void;
    drawLine($iBuffer: WebGLBuffer, $numTri: number): void;
    private setTextureNum;
    private setProgramNum;
    setRenderTexture($program: Shader3D, $name: string, $textureObject: WebGLTexture, $level: number, test?: boolean): void;
    clearTexture(): void;
    setRenderTextureCube($program: WebGLProgram, $name: string, $textureObject: WebGLTexture, $level: number): void;
    updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, $img: any): void;
    getTexture($img: any, $wrap?: number, $filter?: number, $mipmap?: number): WebGLTexture;
    creatTexture($width: number, $height: number, $wrap?: number): WebGLTexture;
    createFramebuffer(): WebGLFramebuffer;
    deleteBuffer(buffer: WebGLBuffer): void;
    deleteTexture(texture: WebGLTexture): void;
    deleteShader(shader: Shader3D): void;
    cullFaceBack(tf: boolean): void;
    getFBO(): FBO;
    clearTest(): void;
}
export  class FBO {
    static fw: number;
    static fh: number;
    frameBuffer: WebGLFramebuffer;
    depthBuffer: WebGLRenderbuffer;
    texture: WebGLRenderbuffer;
}
export  class ContextSetTest {
    private _textureDic;
    private _program;
    enableVaAry: Array<boolean>;
    vaAry: Array<boolean>;
    private _vabuffer;
    private _blendType;
    private _cullType;
    private _zbufferType;
    private _vpMatrix;
    testTexture($name: string, $textureObject: WebGLTexture): boolean;
    testProgram($program: WebGLProgram): boolean;
    testVa(dataBuffer: WebGLBuffer): boolean;
    clear(): void;
    testBlend($type: number): boolean;
    testCull($type: boolean): boolean;
    testZbuffer($type: boolean): boolean;
    testVp(): boolean;
}
export  class Scene_data {
    static isPanGm: boolean;
    static isPc: boolean;
    static isIos: boolean;
    static context3D: Context3D;
    static canvas3D: HTMLCanvasElement;
    static stageWidth: number;
    static stageHeight: number;
    static sceneViewHW: number;
    static fileRoot: string;
    static verticalScene: boolean;
    static effectsLev: number;
    static cam3D: Camera3D;
    static focus3D: Object3D;
    private static _viewMatrx3D;
    static vpMatrix: Matrix3D;
    static camFar: number;
    static skyCubeMap: Array<WebGLTexture>;
    static pubLut: WebGLTexture;
    static frameTime: number;
    static MAX_NUMBER: number;
    static user: number;
    static light: LightVo;
    static scaleLight: Array<number>;
    static useByte: Boolean;
    static fogColor: Array<number>;
    static fogData: Array<number>;
    static gameAngle: number;
    static sceneNumId: number;
    static fbo: FBO;
    static set viewMatrx3D(value: Matrix3D);
    static get viewMatrx3D(): Matrix3D;
    static supportBlob: boolean;
    /**
     * z平面放大倍数
     */
    static SCALE_Z: number;
}
export  class BaseDiplay3dShader extends Shader3D {
    static BaseDiplay3dShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class BaseDiplay3dSprite extends Display3D {
    constructor();
    protected initData(): void;
    private loadTexture;
    _uvTextureRes: TextureRes;
    upToGpu(): void;
    update(): void;
}
export  class Display3D extends Object3D {
    objData: ObjData;
    program: WebGLProgram;
    shader: Shader3D;
    beginTime: number;
    type: number;
    protected _onStage: boolean;
    sceneVisible: boolean;
    protected _hasDestory: boolean;
    _scene: SceneManager;
    constructor();
    update(): void;
    get onStage(): boolean;
    addStage(): void;
    removeStage(): void;
    resize(): void;
    destory(): void;
}
export  class Display3dBatchMovie extends Display3dMovie {
    batchNum: number;
    batchPos: Array<Movie3D>;
    constructor();
    set fileScale(value: number);
    addSun($obj: Movie3D): void;
    setVcMatrix($mesh: MeshData): void;
    setLightProbeVc($material: Material): void;
    setVa($mesh: MeshData): void;
    addStage(): void;
    removeStage(): void;
}
export  class Movie3D extends Object3D {
    private _shadow;
    posData: Array<number>;
    retinueShadowFix: Vector3D;
    target: Vector3D;
    hasReach: boolean;
    set shadow(value: boolean);
    _fileScale: number;
    set fileScale(value: number);
    set scale(value: number);
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    add(): void;
    remove(): void;
}
export  class Display3dMovie extends Display3DSprite implements IBind {
    private _meshUrl;
    protected _skinMesh: SkinMesh;
    protected _animDic: Object;
    protected _preLoadActionDic: Object;
    protected _waitLoadActionDic: Object;
    protected _completeState: number;
    /** 待机动作 */
    protected _defaultAction: string;
    private _curentAction;
    protected _curentFrame: number;
    protected _actionTime: number;
    protected _partDic: Object;
    protected _partUrl: Object;
    private _capsule;
    showCapsule: boolean;
    protected _enablePhysics: boolean;
    protected _shadow: Shadow;
    protected _fileScale: number;
    private _roleRes;
    _hasDestory: boolean;
    /**正在播放的技能*/
    _isSinging: boolean;
    get isSinging(): boolean;
    set isSinging(value: boolean);
    meshVisible: boolean;
    constructor();
    get curentAction(): string;
    set curentAction(value: string);
    fixAstartData(pos: Vector2D): void;
    setRoleUrl(value: string): void;
    onMeshLoaded(): void;
    clearMesh(): void;
    addSkinMeshParticle(): void;
    removeSkinMeshParticle(): void;
    private roleResCom;
    setMeshUrl(value: string, $batchNum?: number): void;
    private _nextScale;
    set scale(value: number);
    get scale(): number;
    set fileScale(value: number);
    set shadow(value: boolean);
    setShadowSize(value: number): void;
    addStage(): void;
    removeStage(): void;
    loadMaterialCom($material: Material): void;
    setCollision($radius: number, $height: number): void;
    applyVisible(): void;
    removePart($key: string): void;
    /**
        部位，路径，类型 1为粒子 0为其他
    */
    addPart($key: string, $bindSocket: string, $url: string): void;
    protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
    getSocket(socketName: string, resultMatrix: Matrix3D): void;
    getSunType(): number;
    protected getFrameMatrix(index: number): Matrix3D;
    addAction(name: string, url: string, needPerLoad?: boolean): void;
    setAnimUrl(name: string, url: string): void;
    play($action: string, $completeState?: number, needFollow?: boolean): boolean;
    private processAnimByMesh;
    update(): void;
    updateFrame(t: number): void;
    protected changeAction($action: string): void;
    destory(): void;
    private capsuleLineSprite;
    updateShowCapsule(): void;
    private drawBall;
    private drawCylinder;
    setVcMatrix($mesh: MeshData): void;
    setVa($mesh: MeshData): void;
    setVaIndependent($mesh: MeshData): void;
    setVaCompress($mesh: MeshData): void;
    clearVa(): void;
    updateMaterialMesh($mesh: MeshData): void;
    setLightProbeVc($material: Material): void;
    private locationDic;
    setMeshVc($mesh: MeshData): void;
    setPos($v3d: Vector3D): void;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    changePos(): void;
}
export  class Display3dShadow extends Display3D {
    static texture: WebGLTexture;
    shadowList: Array<Shadow>;
    needUpdate: boolean;
    private posProLocation;
    constructor();
    addShadow($shdow: Shadow): void;
    removeShadow($shdow: Shadow): void;
    stateChage(): void;
    hasIdle(): boolean;
    applyObjData(): void;
    private locationFloat32;
    update(): void;
}
export  class Display3DSky extends Display3D {
    objurl: string;
    cubeTextList: Array<WebGLTexture>;
    constructor();
    setObjUrl(value: string): void;
    setCubeUrl(value: string): void;
    update(): void;
}
export  class Display3DSprite extends Display3D {
    isPerspective: boolean;
    name: string;
    id: number;
    objurl: string;
    picUrl: string;
    materialUrl: string;
    materialInfoArr: Array<any>;
    material: Material;
    materialParam: MaterialBaseParam;
    time: number;
    lightMapTextureRes: TextureRes;
    protected _rotationMatrix: Matrix3D;
    _rotationData: Float32Array;
    bindMatrix: Matrix3D;
    bindTarget: IBind;
    bindSocket: string;
    private _isInGroup;
    private _groupPos;
    private _groupRotation;
    private _groupScale;
    groupMatrix: Matrix3D;
    groupRotationMatrix: Matrix3D;
    private _lightProbe;
    protected resultSHVec: Array<Vector3D>;
    aabb: QuadTreeNode;
    dynamic: boolean;
    constructor();
    private _aabbVect;
    get aabbVect(): Array<Vector3D>;
    setObjUrl(value: string): void;
    baseTexture: TextureRes;
    setPicUrl($str: string): void;
    setLightMapUrl(value: string): void;
    get lightMapTexture(): WebGLTexture;
    setMaterialUrl(value: string, $paramData?: Array<any>): void;
    get lightProbe(): boolean;
    set lightProbe(value: boolean);
    update(): void;
    updateMaterial(): void;
    setMaterialVa(): void;
    setMaterialVaIndependent(): void;
    setMaterialVaCompress(): void;
    setDirectLight($material: Material): void;
    setCam(): void;
    setBind($bindTarget: IBind, $bindSocket: string): void;
    setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void;
    updateBind(): void;
    protected setBaseMaterialVc($material: Material): void;
    setCamPos($material: Material): void;
    setMaterialVc($material: Material, $mp?: MaterialBaseParam): void;
    setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
    checkMaterialTexture($material: Material): boolean;
    updateRotationMatrix(): void;
    setPos($v3d: Vector3D): void;
    destory(): void;
}
export  class Display3DUISprite extends Display3DSprite {
    private uiMatrix;
    private uiViewMatrix;
    private modelRes;
    constructor();
    private loadRes;
    loadResComFinish(): void;
    loadGroup($name: string): void;
    private loadPartRes;
    resize(): void;
    setCam(): void;
    update(): void;
}
export interface IBind {
    getSocket(socketName: String, resultMatrix: Matrix3D): void;
    getSunType(): number;
}
export interface IMulBind {
    getMulSocket(ary: Array<Vector3D>): void;
}
export  class GroundDataMesh {
    tx: number;
    ty: number;
    idBitmap: BitMapData;
    infoBitmap: BitMapData;
    sixurl: string;
    private mekeUseTexture;
    calibration(): void;
    static meshAllgroundData($byte: Pan3dByteArray): Array<GroundDataMesh>;
}
export  class TerrainDisplay3DSprite extends Display3DSprite {
    private groundShader;
    private baseSixteenRes;
    private idMapPicDataTexture;
    private infoMapPicDataTexture;
    constructor();
    update(): void;
    private upDataToDraw;
    setGrounDataMesh($groundDataMesh: GroundDataMesh): void;
}
export  class Engine {
    static init($caves: HTMLCanvasElement): void;
    static needVertical: Boolean;
    static needInputTxt: boolean;
    static resetSize(a?: number, b?: number): void;
    static sceneCamScale: number;
    static resetViewMatrx3D(): void;
    static unload(): void;
}
export  class BaseEvent {
    type: string;
    target: EventDispatcher;
    constructor($type: string);
    static COMPLETE: string;
}
export  class EventDispatcher {
    protected _eventsMap: Object;
    addEventListener(types: string, listener: Function, thisObject: any): void;
    removeEventListener(type: string, listener: Function, thisObject: any): void;
    dispatchEvent(event: BaseEvent): boolean;
}
export  class FpsMc {
    drawNum: number;
    fpsStr: string;
    static addFps: number;
    static fpsNowNum: number;
    static tipStr: string;
    constructor();
    static update(): void;
    getStr(): string;
}
export  class FpsStage {
    private static _instance;
    static getInstance(): FpsStage;
    constructor();
    canvas2D: any;
    loadCav: any;
    loadCtx: CanvasRenderingContext2D;
    init($cadves: any, $loadCav: any): void;
    showLoadInfo(str: string): void;
    removeShowLoad(): void;
    private fps;
    private canvasUi;
    static showFps: boolean;
    private lastTime;
    upData(): void;
    private makeXyzLine;
    private cPos;
    private drawLine;
    resetSize(): void;
}
export  class ConstItem {
    private _id;
    name: string;
    value: Vector3D;
    vecNum: Float32Array;
    paramName0: string;
    param0Type: number;
    param0Index: number;
    paramName1: string;
    param1Type: number;
    param1Index: number;
    paramName2: string;
    param2Type: number;
    param2Index: number;
    paramName3: string;
    param3Type: number;
    param3Index: number;
    isDynamic: Boolean;
    offset: number;
    set id(value: number);
    get id(): number;
    creat($vc: Float32Array): void;
    setData(obj: any): void;
    setDynamicOffset($dynamic: DynamicBaseConstItem): void;
    setDynamicDirect($ary: Array<number>, $offset: any): void;
    setDynamic($dynamic: DynamicBaseConstItem): void;
}
export  class DynamicBaseConstItem {
    target: ConstItem;
    paramName: string;
    currentValue: Array<number>;
    targetOffset: number;
    protected _type: number;
    update(t?: number): void;
    get type(): number;
    set type(value: number);
    setTargetInfo($target: ConstItem, $paramName: string, $type: number): void;
    setCurrentVal(...args: any[]): void;
}
export  class DynamicBaseTexItem {
    target: TexItem;
    paramName: string;
    textureRes: TextureRes;
    destory(): void;
    get texture(): WebGLTexture;
}
export  class DynamicConstItem extends DynamicBaseConstItem {
    curve: Curve;
    update(t?: number): void;
    set type(value: number);
}
export  class DynamicTexItem extends DynamicBaseTexItem {
    url: string;
    private _textureDynamic;
    isParticleColor: boolean;
    curve: Curve;
    private _life;
    constructor();
    destory(): void;
    initCurve($type: number): void;
    get texture(): WebGLTexture;
    creatTextureByCurve(): void;
    get life(): number;
    set life(value: number);
}
export  class Material extends ResCount {
    url: string;
    shaderStr: string;
    texList: Array<TexItem>;
    constList: Array<ConstItem>;
    hasTime: boolean;
    timeSpeed: number;
    blendMode: number;
    backCull: boolean;
    killNum: number;
    hasVertexColor: boolean;
    usePbr: boolean;
    useNormal: boolean;
    roughness: number;
    program: WebGLProgram;
    shader: Shader3D;
    writeZbuffer: boolean;
    hasFresnel: boolean;
    useDynamicIBL: boolean;
    normalScale: number;
    lightProbe: boolean;
    useKill: boolean;
    directLight: boolean;
    noLight: boolean;
    scaleLightMap: boolean;
    fogMode: number;
    fcNum: number;
    fcIDAry: Array<number>;
    hasParticleColor: boolean;
    locationDic: Object;
    fcData: Float32Array;
    sceneNumId: number;
    update(t: number): void;
    updateTime(t: number): void;
    updateCam(x: number, y: number, z: number): void;
    updateScene(): void;
    initFcData(): void;
    setCompileData(_compileData: any): void;
    setByteData(byte: Pan3dByteArray): void;
    private readConstLis;
    private readTexList;
    destory(): void;
}
export  class MaterialBaseParam extends GC {
    material: Material;
    dynamicTexList: Array<any>;
    dynamicConstList: Array<any>;
    destory(): void;
    update(): void;
    setData($material: Material, $ary: Array<any>): void;
}
export  class MaterialManager extends ResGC {
    private _loadDic;
    private _resDic;
    private _regDic;
    constructor();
    private static _instance;
    static getInstance(): MaterialManager;
    /**
    public getMaterial($url: string, $fun: Function, $info: Object = null, $autoReg: boolean = false, $regName: string = null, $shader3D: Shader3D = null): void {

        if (this._dic[$url]) {
            if ($info) {
                $fun(this._dic[$url], $info);
            } else {
                $fun(this._dic[$url]);
            }
            return;
        }

        var materialLoad: MaterialLoad = new MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3D);
        if (this._loadDic[$url]) {
            var ary: Array<MaterialLoad> = this._loadDic[$url];
            ary.push(materialLoad);
            return;
        }

        this._loadDic[$url] = new Array;
        this._loadDic[$url].push(materialLoad);

        if (this._resDic[$url]) {
            this.loadMaterialCom(this._resDic[$url], materialLoad);
        } else {
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE, ($data: string, _info: MaterialLoad) => { this.loadMaterialCom($data, _info) }, materialLoad);
        }
    }
     */
    getMaterialByte($url: string, $fun: Function, $info?: Object, $autoReg?: boolean, $regName?: string, $shader3DCls?: any): void;
    private meshByteMaterialByt;
    loadMaterialByteCom($data: ArrayBuffer, _info: MaterialLoad): void;
    addResByte($url: string, $data: Pan3dByteArray): void;
    registerUrl($url: string): void;
    releaseUrl($url: string): void;
    /**
    public loadMaterialCom($data: string, _info: MaterialLoad): void {
        var obj = JSON.parse($data);
        
        var material: Material = new Material();
        material.setCompileData(obj);
        material.url = _info.url;

        this.loadMaterial(material);

        if (_info.autoReg){
            material.program = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
        }

        var ary: Array<TextureLoad> = this._loadDic[_info.url];
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i].info) {
                ary[i].fun(material, ary[i].info);
            } else {
                ary[i].fun(material);
            }
        }
        
        delete this._loadDic[_info.url];

        this._dic[_info.url] = material;

    }
    */
    private loadMaterial;
    loadDynamicTexUtil(material: MaterialParam): void;
    gc(): void;
}
 class MaterialLoad {
    fun: Function;
    info: any;
    url: string;
    autoReg: boolean;
    regName: string;
    shader3D: any;
    constructor($fun: Function, $info: any, $url: string, $autoReg: boolean, $regName: string, $shader3D: any);
}
export {};
export  class MaterialParam extends MaterialBaseParam {
    materialUrl: string;
    program: WebGLProgram;
    shader: Shader3D;
    constructor();
    destory(): void;
    setMaterial($materialTree: Material): void;
    setLife($life: number): void;
    setTexList(): void;
    setConstList(): void;
    setTextObj(ary: Array<any>): void;
    setConstObj(ary: Array<any>): void;
}
export  class TexItem {
    private _id;
    url: string;
    textureRes: TextureRes;
    isDynamic: boolean;
    paramName: string;
    isParticleColor: boolean;
    isMain: boolean;
    /**
     * 0 为默认
     * 1 lightmap
     * 2 lutmap
     * 3 cubemap
     * 4 heightMap;
     */
    type: number;
    name: string;
    wrap: number;
    filter: number;
    mipmap: number;
    permul: boolean;
    destory(): void;
    set id(value: number);
    get id(): number;
    get texture(): WebGLTexture;
    static LIGHTMAP: number;
    static LTUMAP: number;
    static CUBEMAP: number;
    static HEIGHTMAP: number;
    static REFRACTIONMAP: number;
}
export  class TextureCube {
}
export  class TextureManager extends ResGC {
    private _loadDic;
    private _resDic;
    defaultLightMap: WebGLTexture;
    constructor();
    private static _instance;
    static getInstance(): TextureManager;
    hasTexture($url: string): boolean;
    getTexture($url: string, $fun: Function, $wrapType?: number, $info?: any, $filteType?: number, $mipmapType?: number): void;
    getImageData($url: string, $fun: Function): void;
    getImgResByurl($url: string): any;
    addRes($url: string, $img: any): void;
    addImgRes($url: string, $img: any): void;
    getCanvasTexture(ctx: CanvasRenderingContext2D): TextureRes;
    getImageDataTexture(imgdata: any): WebGLTexture;
    getTextureRes($img: any): TextureRes;
    updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void;
    loadCubeTexture($url: string, $fun: Function): void;
    loadTextureCom($img: any, _info: TextureLoad): void;
    initDefaultLightMapTexture(): void;
    gc(): void;
}
export  class TextureLoad {
    fun: Function;
    info: any;
    url: string;
    wrap: number;
    filter: number;
    mipmap: number;
    constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number);
}
export  class CubemapLoad {
    private ary;
    private fun;
    private flagNum;
    loadCube($url: string, $fun: Function): void;
    loadCom($img: HTMLImageElement, $info: any): void;
}
export  class TextureRes extends ResCount {
    texture: WebGLTexture;
    width: number;
    height: number;
    destory(): void;
}
export  class ObjectMath {
    a: number;
    b: number;
    c: number;
    d: number;
}
export  class Calculation {
    constructor();
    static _PanelEquationFromThreePt(p1: Vector3D, p2: Vector3D, p3: Vector3D): ObjectMath;
    static calPlaneLineIntersectPoint(planeVector: Vector3D, planePoint: Vector3D, linePointA: Vector3D, linePointB: Vector3D): Vector3D;
}
export  class Circle {
    _x: number;
    _y: number;
    radius: number;
    constructor($x?: number, $y?: number, $radius?: number);
    setData($x: number, $y: number, $radius: number): void;
    setPos($x: number, $y: number): void;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    setRadius($radius: number): void;
    testPoint($point: Vector2D): boolean;
}
export  class Groundposition {
    constructor();
    private static _plantObjectMath;
    private static _plantnormal;
    private static _plane_a;
    static getGroundPos($x: number, $y: number): Vector3D;
}
export  class MathClass {
    constructor();
    static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array;
    static updateVp(): void;
    static viewBoxVecItem: Array<Vector3D>;
    static GetViewHitBoxDataCopy($dis: number): void;
    private static gettempPos;
    static math_distance(x1: number, y1: number, x2: number, y2: number): number;
}
export  class MathUtil {
    /**
     * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
     * @param $point  2d位置是场景的坐标，
     * @param $depht  默认深度为500,
     * @return  3D的坐标
     *
     */
    static mathDisplay2Dto3DWorldPos($point: Vector2D, $depht?: number): Vector3D;
    private static gettempPos;
    static math3DWorldtoDisplay2DPos($pos: Vector3D): Vector2D;
    static argbToHex(a: number, r: number, g: number, b: number): number;
    static hexToArgb(expColor: number): Vector3D;
    /**
     * 空间一条射线和平面的交点
     * @param linePoint_a  过直线的一点
     * @param linePoint_b  过直线另一点
     * @param planePoint   过平面一点
     * @param planeNormal  平面的法线
     * @return
     *
     */
    private static getLineAndPlaneIntersectPoint;
    static lookAt(eyePos: Vector3D, lookAt: Vector3D): Matrix3D;
    /**
     *  功能:根据两个点返回角度
     *  参数:
     **/
    static getTowPointsAngle2(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * 返回两点的夹角
     * @param $p0
     * @param $p1
     * @return
     */
    static getTowPointsAngle($p0: Laya.Point, $p1: Laya.Point): number;
    /** 返回两个点的距离
     *  **/
    static getDisSquare(x1: number, y1: number, x2: number, y2: number): number;
}
export  class Matrix3D {
    m: Float32Array;
    isIdentity: boolean;
    constructor();
    static tempM: Matrix3D;
    clone($target?: Matrix3D): Matrix3D;
    get position(): Vector3D;
    copyTo($target: Matrix3D): void;
    identity(): void;
    invert(): void;
    invertToMatrix($target: Matrix3D): void;
    appendTranslation(x: number, y: number, z: number): void;
    prependTranslation(x: number, y: number, z: number): void;
    transformVector($p: Vector3D): Vector3D;
    append($matrx3d: Matrix3D): void;
    prepend($matrx3d: Matrix3D): void;
    appendRotation(rad: number, axis: Vector3D): void;
    tomat3(): Float32Array;
    getRotaion(b: Float32Array): void;
    identityPostion(): void;
    get x(): number;
    get y(): number;
    get z(): number;
    prependRotation(rad: number, axis: Vector3D): Float32Array;
    prependScale(x: number, y: number, z: number): Float32Array;
    appendScale(x: number, y: number, z: number): void;
    perspectiveFieldOfViewLH(fieldOfViewY: number, aspectRatio: number, zNear: number, zFar: number): void;
    fromVtoV($basePos: Vector3D, $newPos: Vector3D): void;
    buildLookAtLH(eyePos: Vector3D, lookAt: Vector3D, up: Vector3D): void;
    static mul(a: any, b: any, c: any): any;
    toEulerAngles(target?: Vector3D): Vector3D;
}
export  class Endian {
    /**
     * 表示多字节数字的最低有效字节位于字节序列的最前面。
     * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
     * @constant {string} egret.Endian.LITTLE_ENDIAN
     */
    static LITTLE_ENDIAN: string;
    /**
     * 表示多字节数字的最高有效字节位于字节序列的最前面。
     * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
     * @constant {string} egret.Endian.BIG_ENDIAN
     */
    static BIG_ENDIAN: string;
}
/**
 * @class ByteArray
 * @classdesc
 * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
 * 注意：ByteArray 类适用于需要在字节层访问数据的高级 开发人员。
 */
export  class Pan3dByteArray {
    private static SIZE_OF_BOOLEAN;
    private static SIZE_OF_INT8;
    private static SIZE_OF_INT16;
    private static SIZE_OF_INT32;
    private static SIZE_OF_UINT8;
    private static SIZE_OF_UINT16;
    private static SIZE_OF_UINT32;
    private static SIZE_OF_FLOAT32;
    private static SIZE_OF_FLOAT64;
    private BUFFER_EXT_SIZE;
    private data;
    private _position;
    private write_position;
    /**
     * 更改或读取数据的字节顺序；egret.Endian.BIG_ENDIAN 或 egret.Endian.LITTLE_ENDIAN。
     * @default egret.Endian.BIG_ENDIAN
     * @member ByteArray#endian
     */
    endian: string;
    /**
     * 创建一个 ByteArray 对象以引用指定的 ArrayBuffer 对象
     * @param buffer {ArrayBuffer} 数据源
     */
    constructor(buffer?: ArrayBuffer);
    private _setArrayBuffer;
    setdata(srcByte: Pan3dByteArray): void;
    get buffer(): ArrayBuffer;
    /**
     * @private
     */
    set buffer(value: ArrayBuffer);
    get dataView(): DataView;
    /**
     * @private
     */
    set dataView(value: DataView);
    /**
     * @private
     */
    get bufferOffset(): number;
    getByte(i: number): number;
    setByte(i: number, num: number): void;
    /**
     * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
     * @member {number} ByteArray#position
     */
    get position(): number;
    set position(value: number);
    reset(): void;
    optcode: number;
    /**
     * ByteArray 对象的长度（以字节为单位）。
     * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
     * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
     * @member {number} ByteArray#length
     */
    get length(): number;
    set length(value: number);
    /**
     * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
     * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
     * @member {number} ByteArray#bytesAvailable
     */
    get bytesAvailable(): number;
    /**
     * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
     * @method ByteArray#clear
     */
    clear(): void;
    /**
     * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
     * @return 如果字节不为零，则返回 true，否则返回 false
     * @method ByteArray#readBoolean
     */
    readBoolean(): boolean;
    /**
     * 从字节流中读取带符号的字节
     * @return 介于 -128 和 127 之间的整数
     * @method ByteArray#readByte
     */
    readByte(): number;
    /**
     * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
     * @param bytes 要将数据读入的 ByteArray 对象
     * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
     * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
     * @method ByteArray#readBytes
     */
    readBytes(bytes: Pan3dByteArray, offset?: number, length?: number): void;
    /**
     * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
     * @return 双精度（64 位）浮点数
     * @method ByteArray#readDouble
     */
    readDouble(): number;
    /**
     * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
     * @return 单精度（32 位）浮点数
     * @method ByteArray#readFloat
     */
    readFloat(): number;
    /**
     * 从字节流中读取一个带符号的 32 位整数
     * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
     * @method ByteArray#readFloat
     */
    readInt(): number;
    getInt(): number;
    readInt32(): number;
    /**
     * 使用指定的字符集从字节流中读取指定长度的多字节字符串
     * @param length 要从字节流中读取的字节数
     * @param charSet 表示用于解释字节的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
     * @return UTF-8 编码的字符串
     * @method ByteArray#readMultiByte
     */
    /**
     * 从字节流中读取一个带符号的 16 位整数
     * @return 介于 -32768 和 32767 之间的 16 位带符号整数
     * @method ByteArray#readShort
     */
    readShort(): number;
    readFloatTwoByte($scaleNum: number): number;
    readFloatOneByte(): number;
    /**
     * 从字节流中读取无符号的字节
     * @return 介于 0 和 255 之间的 32 位无符号整数
     * @method ByteArray#readUnsignedByte
     */
    readUnsignedByte(): number;
    readUint8(): number;
    readInt8(): number;
    /**
     * 从字节流中读取一个无符号的 32 位整数
     * @return 介于 0 和 4294967295 之间的 32 位无符号整数
     * @method ByteArray#readUnsignedInt
     */
    readUnsignedInt(): number;
    readUint32(): number;
    readUint64(): number;
    /**
     * 从字节流中读取一个无符号的 16 位整数
     * @return 介于 0 和 65535 之间的 16 位无符号整数
     * @method ByteArray#readUnsignedShort
     */
    readUnsignedShort(): number;
    readUint16(): number;
    /**
     * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
     * @return UTF-8 编码的字符串
     * @method ByteArray#readUTF
     */
    readUTF(): string;
    readString(): string;
    /**
     * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
     * @param length 指明 UTF-8 字节长度的无符号短整型数
     * @return 由指定长度的 UTF-8 字节组成的字符串
     * @method ByteArray#readUTFBytes
     */
    readUTFBytes(length: number): string;
    readStringByLen(len: number): string;
    /**
     * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
     * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
     * @method ByteArray#writeBoolean
     */
    writeBoolean(value: boolean): void;
    /**
     * 在字节流中写入一个字节
     * 使用参数的低 8 位。忽略高 24 位
     * @param value 一个 32 位整数。低 8 位将被写入字节流
     * @method ByteArray#writeByte
     */
    writeByte(value: number): void;
    writeUint8(value: number): void;
    writeInt8(value: number): void;
    /**
     * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
     * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
     * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
     * @param bytes ByteArray 对象
     * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
     * @param length 一个无符号整数，表示在缓冲区中的写入范围
     * @method ByteArray#writeBytes
     */
    writeBytes(bytes: Pan3dByteArray, offset?: number, length?: number): void;
    /**
     * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
     * @param value 双精度（64 位）浮点数
     * @method ByteArray#writeDouble
     */
    writeDouble(value: number): void;
    /**
     * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
     * @param value 单精度（32 位）浮点数
     * @method ByteArray#writeFloat
     */
    writeFloat(value: number): void;
    /**
     * 在字节流中写入一个带符号的 32 位整数
     * @param value 要写入字节流的整数
     * @method ByteArray#writeInt
     */
    writeInt(value: number): void;
    writeInt32(value: number): void;
    /**
     * 使用指定的字符集将多字节字符串写入字节流
     * @param value 要写入的字符串值
     * @param charSet 表示要使用的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
     * @method ByteArray#writeMultiByte
     */
    /**
     * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
     * @param value 32 位整数，该整数的低 16 位将被写入字节流
     * @method ByteArray#writeShort
     */
    writeUnsignedShort(value: number): void;
    writeUint16(value: number): void;
    writeUint64(value: number): void;
    writeShort(value: number): void;
    /**
     * 在字节流中写入一个无符号的 32 位整数
     * @param value 要写入字节流的无符号整数
     * @method ByteArray#writeUnsignedInt
     */
    writeUnsignedInt(value: number): void;
    writeUint32(value: number): void;
    /**
     * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
     * @param value 要写入的字符串值
     * @method ByteArray#writeUTF
     */
    writeUTF(value: string): void;
    writeString(value: string): void;
    writeStringByLen(value: string, len: number): void;
    readVector3D($w?: boolean): Vector3D;
    /**
     * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
     * @param value 要写入的字符串值
     * @method ByteArray#writeUTFBytes
     */
    writeUTFBytes(value: string): void;
    toString(): string;
    /**
     * 将 Uint8Array 写入字节流
     * @param bytes 要写入的Uint8Array
     * @param validateBuffer
     */
    _writeUint8Array(bytes: Uint8Array, validateBuffer?: boolean): void;
    /**
     * @private
     */
    validate(len: number): boolean;
    /**********************/
    /**********************/
    private validateBuffer;
    /**
     * UTF-8 Encoding/Decoding
     */
    private encodeUTF8;
    private decodeUTF8;
    private encoderError;
    private decoderError;
    private EOF_byte;
    private EOF_code_point;
    private inRange;
    private div;
    private stringToCodePoints;
}
export  class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor($x?: number, $y?: number, $z?: number, $w?: number);
    print(): void;
    toEulerAngles(target?: Vector3D): Vector3D;
    toMatrix3D($matrix3d?: Matrix3D): Matrix3D;
    fromAxisAngle(axis: Vector3D, angle: number): void;
    normalize(val?: number): void;
    fromMatrix($matrix: Matrix3D): void;
    setMd5W(): void;
    slerp(qa: Quaternion, qb: Quaternion, t: number): void;
}
export  class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor($x?: number, $y?: number, $width?: number, $height?: number);
    sets($x: number, $y: any, $width: number, $height: any): void;
    setRec($rec: Rectangle): void;
    isHitByPoint(tx: number, ty: number): boolean;
}
export  class TestTriangle {
    static baseTri: TestTriangle;
    p1: Vector2D;
    p2: Vector2D;
    p3: Vector2D;
    precision: number;
    constructor($p1?: Vector2D, $p2?: Vector2D, $p3?: Vector2D, $precision?: number);
    setAllPoint($p1: Vector2D, $p2: Vector2D, $p3: Vector2D): void;
    checkPointIn(tp: Vector2D): Boolean;
    getArea(): number;
    static getAreaByPoints(p1: Vector2D, p2: Vector2D, p3: Vector2D): number;
}
export  class Vector2D {
    x: number;
    y: number;
    constructor($x?: number, $y?: number);
    normalize(): void;
    get length(): number;
    scaleBy(value: number): void;
    sub(val: Vector2D): Vector2D;
    add(val: Vector2D): Vector2D;
    toString(): String;
    static distance(p1: Vector2D, p2: Vector2D): number;
    subtract(value: Vector2D): Vector2D;
}
export  class Vector3D {
    x: number;
    y: number;
    z: number;
    w: number;
    static X_AXIS: Vector3D;
    static Y_AXIS: Vector3D;
    static Z_AXIS: Vector3D;
    constructor($x?: number, $y?: number, $z?: number, $w?: number);
    normalize(): void;
    get length(): number;
    scaleBy(value: number): void;
    divideScalar(value: number): void;
    distanceToSquared(v: Vector3D): number;
    scaleByW(): void;
    add(value: Vector3D): Vector3D;
    subtract(value: Vector3D): Vector3D;
    addByNum($x: number, $y: number, $z: number, $w?: number): void;
    setTo($x: number, $y: number, $z: number): void;
    setByte(byte: Pan3dByteArray): void;
    cross(value: Vector3D): Vector3D;
    dot(value: Vector3D): number;
    clone(): Vector3D;
    static distance(v1: Vector3D, v2: Vector3D): number;
    toString(): String;
}
export  class Display3DBallPartilce extends Display3DParticle {
    constructor();
    get balldata(): ParticleBallData;
    creatData(): void;
    setVa(): void;
    setVaCompress(): void;
    resetVa(): void;
    setVc(): void;
    updateWatchCaramMatrix(): void;
    updateAllRotationMatrix(): void;
    get particleBallData(): ParticleBallGpuData;
}
export  class Display3DBallShader extends Shader3D {
    static Display3D_Ball_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        modelMatrix: number;
        watheye: number;
        rotationMatrix: number;
    };
    static shader_vec4: {
        time: number[];
        scale: number[];
        scaleCtrl: number[];
        force: number[];
        worldPos: number[];
        camPos: number[];
        animCtrl: number[];
        uvCtrl: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class ParticleBallData extends ParticleData {
    _totalNum: number;
    _acceleration: number;
    _toscale: number;
    _shootAngly: Vector3D;
    _shootSpeed: number;
    _isRandom: boolean;
    _isSendRandom: boolean;
    _isSendAngleRandom: boolean;
    _paticleMaxScale: number;
    _paticleMinScale: number;
    _addforce: Vector3D;
    _lixinForce: Vector3D;
    _waveform: Vector3D;
    _round: Vector3D;
    _is3Dlizi: boolean;
    _speed: number;
    _isLoop: boolean;
    _closeSurface: boolean;
    _halfCircle: boolean;
    _isEven: boolean;
    _basePositon: Vector3D;
    _baseRandomAngle: number;
    _shapeType: number;
    _lockX: boolean;
    _lockY: boolean;
    _textureRandomColorInfo: any;
    _islixinAngly: boolean;
    _particleRandomScale: Vector3D;
    _playSpeed: number;
    _beginScale: number;
    facez: Boolean;
    _needSelfRotation: boolean;
    _needRandomColor: boolean;
    _needScale: boolean;
    _needAddSpeed: boolean;
    _uvType: number;
    _timeVec: Array<number>;
    _addSpeedVec: Array<number>;
    _wordPosVec: Array<number>;
    _caramPosVec: Array<number>;
    _scaleVec: Array<number>;
    _scaleCtrlVec: Array<number>;
    _animCtrlVec: Array<number>;
    _uvCtrlVec: Array<number>;
    _allRotationMatrix: Matrix3D;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    private readRandomColor;
    get objBallData(): ParticleBallGpuData;
    uploadGpu(): void;
    private initBaseData;
    makeRectangleData(verterList: Array<number>, uvAry: Array<number>, width: number, height: number, offsetX?: number, offsetY?: number, isUV?: boolean, isU?: boolean, isV?: boolean, animLine?: number, animRow?: number, indexID?: number): void;
    initBasePos(): void;
    initSpeed(): void;
    initSelfRotaion(): void;
    initBaseColor(): void;
    protected pushToGpu(): void;
    private compressVertex;
    setFloat32Vec(key: string, ary: Array<number>): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
    initVcData(): void;
    regShader(): void;
    getShaderParam(): Array<number>;
}
export  class ParticleBallGpuData extends ParticleGpuData {
    basePos: Array<number>;
    basePosBuffer: WebGLBuffer;
    beMove: Array<number>;
    beMoveBuffer: WebGLBuffer;
    randomColor: Array<number>;
    randomColorBuffer: WebGLBuffer;
    randomOffset: number;
    baseRotation: Array<number>;
    baseRotationBuffer: WebGLBuffer;
    destory(): void;
}
export  class Display3DBoneShader extends Shader3D {
    static Display3DBoneShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        posMatrix3D: number;
    };
    getMat4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class Display3DBonePartilce extends Display3DParticle {
    constructor();
    get modeldata(): ParticleBoneData;
    creatData(): void;
    update(): void;
    private skipNum;
    setVc(): void;
    setVa(): void;
    resetVa(): void;
}
export  class ParticleBoneData extends ParticleData {
    _maxAnimTime: number;
    getParticle(): Display3DParticle;
    destory(): void;
    meshData: MeshData;
    animData: AnimData;
    objScale: number;
    setAllByteInfo($byte: Pan3dByteArray): void;
    initVcData(): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
    private readFrameQua;
    uploadGpu(): void;
    private uploadMesh;
    regShader(): void;
}
export  class CombineParticle extends EventDispatcher {
    sourceData: CombineParticleData;
    url: string;
    private _displayAry;
    private _time;
    private _maxTime;
    type: number;
    bindMatrix: Matrix3D;
    bindVecter3d: Vector3D;
    bindScale: Vector3D;
    invertBindMatrix: Matrix3D;
    private _bindTarget;
    private _bindSocket;
    private _rotationX;
    private _rotationY;
    private _rotationZ;
    private _isInGroup;
    private _groupPos;
    private _groupRotation;
    private _groupScale;
    groupMatrix: Matrix3D;
    groupRotationMatrix: Matrix3D;
    hasMulItem: boolean;
    sceneVisible: boolean;
    dynamic: boolean;
    hasDestory: boolean;
    constructor();
    get displayAry(): Array<Display3DParticle>;
    set displayAry(value: Array<Display3DParticle>);
    set maxTime(value: number);
    set bindTarget(value: IBind);
    set bindSocket(value: string);
    set x(value: number);
    set y(value: number);
    set z(value: number);
    get x(): number;
    get y(): number;
    get z(): number;
    setPos($xpos: number, $ypos: number, $zpos: number): void;
    setMulPos(ary: Array<Array<Array<number>>>): void;
    set scaleX(value: number);
    set scaleY(value: number);
    set scaleZ(value: number);
    set rotationX(value: number);
    set rotationY(value: number);
    set rotationZ(value: number);
    applyRotation(): void;
    setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void;
    setDataByte(byte: Pan3dByteArray): void;
    addPrticleItem($dis: Display3DParticle): void;
    private getDisplay3DById;
    updateTime(t: number): void;
    updateBind(): void;
    reset(): void;
    update(): void;
    updateItem(idx: number): void;
    get size(): number;
    private getDisplay3D;
    destory(): void;
}
export  class CombineParticleData extends ResCount {
    maxTime: number;
    dataAry: Array<ParticleData>;
    destory(): void;
    getCombineParticle(): CombineParticle;
    setDataByte(byte: Pan3dByteArray): void;
    private getParticleDataType;
}
export  class AxisMove extends BaseAnim {
    axis: Vector3D;
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
}
export  class AxisRotaion extends BaseAnim {
    axis: Vector3D;
    axisPos: Vector3D;
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
}
export  class BaseAnim {
    baseNum: number;
    num: number;
    time: number;
    speed: number;
    aSpeed: number;
    beginTime: number;
    lastTime: number;
    baseTime: number;
    protected _isActiva: boolean;
    protected _isDeath: boolean;
    BaseAnim(): void;
    update(t: number): void;
    coreCalculate(): void;
    reset(): void;
    depthReset(): void;
    set data(value: Array<any>);
    get isDeath(): boolean;
    set isDeath(value: boolean);
    getAllNum(allTime: number): void;
}
export  class KeyFrame {
    frameNum: number;
    animData: Array<any>;
    baseValue: Array<any>;
    constructor();
}
export  class ScaleAnim extends BaseAnim {
    scaleAry: Array<any>;
    beginScale: number;
    scaleNum: number;
    private _currentTarget;
    private flag;
    private numAry;
    constructor();
    update(t: number): void;
    coreCalculate(): void;
    reset(): void;
    depthReset(): void;
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
    getAllNum(allTime: number): void;
}
export  class ScaleChange extends BaseAnim {
    maxNum: number;
    minNum: number;
    constructor();
    coreCalculate(): void;
    /**
     *
     * @param value
     *
     */
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
    getAllNum(allTime: number): void;
    reset(): void;
    depthReset(): void;
}
export  class ScaleNoise extends BaseAnim {
    amplitude: number;
    coreCalculate(): void;
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
    getAllNum(allTime: number): void;
}
export  class SelfRotation extends BaseAnim {
    set data(value: Array<any>);
    dataByte(va: Array<any>, arr: Array<any>): void;
}
export  class TimeLine extends EventDispatcher {
    private _keyFrameAry;
    maxFrameNum: number;
    private _currentKeyFrame;
    private _currentFrameNum;
    private _time;
    private targetFlag;
    visible: boolean;
    beginTime: number;
    private _selfRotaion;
    private _axisRotaion;
    private _axisMove;
    private _scaleChange;
    private _scaleAnim;
    private _scaleNosie;
    constructor();
    updateMatrix(posMatrix: Matrix3D, $particle: Display3DParticle): void;
    inverAxisRotation($targetMatrix: Matrix3D): void;
    applySelfRotation($targetMatrix: Matrix3D, $axis: Vector3D): void;
    addKeyFrame(num: number): KeyFrame;
    updateTime(t: number): void;
    private getTarget;
    enterKeyFrame(ary: Array<any>, baseTime?: number, baseValueAry?: Array<number>): void;
    reset(): void;
    private isByteData;
    setAllByteInfo($byte: Pan3dByteArray, $allObj: any): void;
    setAllDataInfo($data: TimeLineData): void;
    private setBaseTimeByte;
    private getByteDataTemp;
    /**
     * 获取最大的帧数
     * @return 最大帧数
     *
     */
    getMaxFrame(): number;
    dispose(): void;
}
export  class TimeLineData {
    dataAry: Array<any>;
    maxFrameNum: number;
    beginTime: number;
    destory(): void;
    setByteData($byte: Pan3dByteArray): void;
    addKeyFrame(num: number): KeyFrame;
    private getByteDataTemp;
}
export  class Display3DParticle extends Object3D {
    visible: boolean;
    timeline: TimeLine;
    protected _time: number;
    private _beginTime;
    data: ParticleData;
    bindMatrix: Matrix3D;
    bindVecter3d: Vector3D;
    bindScale: Vector3D;
    invertBindMatrix: Matrix3D;
    groupMatrix: Matrix3D;
    protected _rotationMatrix: Matrix3D;
    modelMatrix: Matrix3D;
    isInGroup: boolean;
    groupPos: Vector3D;
    groupScale: Vector3D;
    groupRotation: Vector3D;
    constructor();
    onCreated(): void;
    setBind($pos: Vector3D, $rotation: Matrix3D, $scale: Vector3D, $invertRotation: Matrix3D, $groupMatrix: Matrix3D): void;
    getMulBindList(): Array<Vector3D>;
    updateMatrix(): void;
    private get cantUseEffectsLev();
    updateTime(t: number): void;
    reset(): void;
    clearAllAnim(): void;
    update(): void;
    setVc(): void;
    pushVc(): void;
    setVa(): void;
    resetVa(): void;
    setMaterialVc(): void;
    setMaterialTexture(): void;
    inverBind(): void;
    resetPos(): void;
    resetMulPos(ary: Array<Array<Array<number>>>): void;
    getVector3DByObject(obj: any): Vector3D;
    clone(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray, version?: number): void;
    creatData(): void;
    setTimeLine($tl: TimeLine): void;
    destory(): void;
}
export  class Display3DFacetParticle extends Display3DParticle {
    private _lifeVisible;
    private _resultUvVec;
    constructor();
    get facetdata(): ParticleFacetData;
    creatData(): void;
    update(): void;
    reset(): void;
    setVc(): void;
    setVa(): void;
    updateRotaionMatrix(): void;
    updateUV(): void;
}
export  class Display3DFacetShader extends Shader3D {
    static Display3D_Facet_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        rotationMatrix3D: number;
        posMatrix3D: number;
    };
    static shader_vec4: {
        uvMove: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class ParticleFacetData extends ParticleData {
    _maxAnimTime: number;
    _lockx: boolean;
    _locky: boolean;
    _isCycle: boolean;
    setAllByteInfo($byte: Pan3dByteArray): void;
    getParticle(): Display3DParticle;
    uploadGpu(): void;
    private makeRectangleData;
    initVcData(): void;
    setFloat32Vec(key: string, ary: Array<number>): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
    regShader(): void;
}
export  class Display3DFollowPartilce extends Display3DBallPartilce {
    private _bindMatrixAry;
    private _bindFlagAry;
    private flag;
    constructor();
    get followdata(): ParticleFollowData;
    creatData(): void;
    onCreated(): void;
    setVc(): void;
    private initBingMatrixAry;
    updateBind(): void;
    updateMatrix(): void;
    updateAllRotationMatrix(): void;
    reset(): void;
    updateWatchCaramMatrix(): void;
}
export  class Display3DFollowShader extends Shader3D {
    static Display3D_Follow_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        modelMatrix: number;
        watheye: number;
        rotationMatrix: number;
    };
    static shader_vec4: {
        time: number[];
        scale: number[];
        scaleCtrl: number[];
        force: number[];
        worldPos: number[];
        camPos: number[];
        animCtrl: number[];
        uvCtrl: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class ParticleFollowData extends ParticleBallData {
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    regShader(): void;
}
export  class Display3DFollowLocusPartilce extends Display3DParticle {
    protected _bindPosAry: Array<Array<number>>;
    protected _gpuVc: Float32Array;
    protected _caramPosVec: Array<number>;
    constructor();
    get followlocusdata(): ParticleFollowLocusData;
    creatData(): void;
    onCreated(): void;
    protected initBindMatrixAry(): void;
    setVa(): void;
    setVc(): void;
    setBindPosVc(): void;
    reset(): void;
    updateMatrix(): void;
    resetPos(): void;
    protected flag: number;
    static waitCdTime: number;
    updateBind(): void;
}
export  class Display3DFollowLocusShader extends Shader3D {
    static Display3D_FollowLocus_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
    };
    static shader_vec4: {
        camPos: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class ParticleFollowLocusData extends ParticleData {
    _fenduanshu: number;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    uploadGpu(): void;
    protected pushToGpu(): void;
    initVcData(): void;
    regShader(): void;
}
export  class Display3DLocusPartilce extends Display3DParticle {
    constructor();
    get locusdata(): ParticleLocusData;
    creatData(): void;
    setVa(): void;
    setVc(): void;
    updateUV(): void;
}
export  class Display3DLocusShader extends Shader3D {
    static Display3D_Locus_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        posMatrix3D: number;
    };
    static shader_vec4: {
        uvMove: number[];
        camPos: number[];
        isUv: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class ParticleLocusData extends ParticleData {
    _speed: number;
    _isLoop: boolean;
    _density: number;
    _isEnd: boolean;
    _resultUvVec: Array<number>;
    _caramPosVec: Array<number>;
    _changUv: boolean;
    _uvVec: Array<number>;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    initUV(): void;
    uploadGpu(): void;
    regShader(): void;
    initVcData(): void;
    setFloat32Vec(key: string, ary: Array<number>): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
}
export  class Display3DLocusBallPartilce extends Display3DBallPartilce {
    constructor();
    creatData(): void;
}
export  class ParticleLocusballData extends ParticleBallData {
    protected _posAry: Array<number>;
    protected _angleAry: Array<number>;
    protected _tangentAry: Array<number>;
    protected _tangentSpeed: number;
    getParticle(): Display3DParticle;
    initBasePos(): void;
    initSpeed(): void;
    setAllByteInfo($byte: Pan3dByteArray): void;
}
export  class Display3dModelAnimParticle extends Display3DModelPartilce {
    constructor();
    updateUV(): void;
}
export  class Display3DModelObjParticle extends Display3DModelPartilce {
    protected _depthMode: boolean;
    constructor();
    update(): void;
}
export  class Display3DModelPartilce extends Display3DParticle {
    protected _resultUvVec: Array<number>;
    constructor();
    get modeldata(): ParticleModelData;
    creatData(): void;
    setVc(): void;
    setVa(): void;
    updateWatchCaramMatrix(): void;
    updateUV(): void;
}
export  class ParticleModelData extends ParticleData {
    _maxAnimTime: number;
    _depthMode: number;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    initVcData(): void;
    uploadGpu(): void;
    regShader(): void;
    setFloat32Vec(key: string, ary: Array<number>): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
}
export  class ParticleData {
    version: number;
    _beginTime: number;
    _delayedTime: number;
    _width: number;
    _height: number;
    _widthFixed: boolean;
    _heightFixed: boolean;
    _tileMode: boolean;
    _originWidthScale: number;
    _originHeightScale: number;
    _eyeDistance: number;
    _alphaMode: number;
    _uSpeed: number;
    _vSpeed: number;
    _animLine: number;
    _animRow: number;
    _animInterval: number;
    _renderPriority: number;
    _distortion: boolean;
    _isUV: boolean;
    _isU: boolean;
    _isV: boolean;
    _life: number;
    _watchEye: boolean;
    _ziZhuanAngly: Vector3D;
    _isZiZhuan: boolean;
    _center: Vector3D;
    overAllScale: number;
    _materialUrl: string;
    materialParam: MaterialParam;
    materialParamData: any;
    objData: ObjData;
    timelineData: TimeLineData;
    rotationV3d: Vector3D;
    center: Vector3D;
    vcmatData: Float32Array;
    destory(): void;
    uploadGpu(): void;
    regShader(): void;
    initVcData(): void;
    creatPartilce(): Display3DParticle;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    private set materialByteUrl(value);
    private onMaterialLoad;
    private readMaterialPara;
    private readTempCurve;
    private readItems;
    private makeCurveData;
    private getBzData;
    private drawbezier;
    private mathmidpoint;
    private readMaterialParaConAry;
    setFloat32Vec(key: string, ary: Array<number>): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
}
export  class ParticleGpuData extends ObjData {
}
export  class ParticleManager extends ResGC {
    static _instance: ParticleManager;
    static getInstance(): ParticleManager;
    private _particleList;
    private _time;
    constructor();
    getParticleByte($url: string): CombineParticle;
    registerUrl($url: string): void;
    releaseUrl($url: string): void;
    addResByte($url: string, $data: Pan3dByteArray): void;
    update(): void;
    clearPaticleVa(): void;
    setHide(): void;
    get particleList(): Array<CombineParticle>;
    updateTime(): void;
    private renderDic;
    private addRenderDic;
    private removeRenderDic;
    private updateRenderDic;
    addParticle($particle: CombineParticle): void;
    removeParticle($particle: CombineParticle): void;
    gc(): void;
}
export  class BuildShader extends Shader3D {
    static buildShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class Display3DShadowShader extends Shader3D {
    static Display3DShadowShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class MaterialAnimShader extends Shader3D {
    static MATERIAL_ANIM_SHADER: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static getMd5M44Str(): string;
    static getMd5M44NrmStr(): string;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class MaterialBatchAnimShader extends Shader3D {
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class MaterialShader extends Shader3D {
    static MATERIAL_SHADER: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    outstr(str: string): void;
    getFragmentShaderString(): string;
}
export  class ProgramManager extends ResGC {
    private static _instance;
    constructor();
    static getInstance(): ProgramManager;
    getProgram($str: string): Shader3D;
    registe($str: any, $shader3D: Shader3D): void;
    getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
    outShader($str: string): void;
    gc(): void;
}
export  class Shader3D extends ResCount implements IShader {
    vertex: string;
    fragment: string;
    name: string;
    program: WebGLProgram;
    vShader: WebGLShader;
    fShader: WebGLShader;
    paramAry: Array<any>;
    localDic: Object;
    constructor();
    encode(): boolean;
    getWebGLUniformLocation($name: string): WebGLUniformLocation;
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
    destory(): void;
}
interface IShader {
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
    encode($context: Laya.WebGLContext): void;
    binLocation($context: Laya.WebGLContext): void;
}
export {};
export  class SkyShader extends Shader3D {
    static Sky_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class TerrainDisplay3DShader extends Shader3D {
    static TerrainDisplay3DShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class LineDisplayShader extends Shader3D {
    static LineShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class LineDisplaySprite extends Display3D {
    constructor();
    lineVecPos: Array<number>;
    lineColor: Array<number>;
    lineIndex: Array<number>;
    baseColor: Vector3D;
    makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
    clear(): void;
    upToGpu(): void;
    update(): void;
}
export  class MulLineSprite extends LineDisplaySprite {
    constructor();
    private itemSprite;
    makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
    private getSprite;
    update(): void;
    upToGpu(): void;
    clear(): void;
}
export  class GridLineSprite extends LineDisplaySprite {
    constructor();
    private makeGridData;
}
export  class SceneManager {
    static _instance: any;
    static getInstance(): SceneManager;
    get displayList(): Array<Display3D>;
    protected _displayList: Array<Display3D>;
    protected _display2DList: Array<Display3D>;
    protected _displaySpriteList: Array<Display3DSprite>;
    protected _displayRoleList: Array<Display3dMovie>;
    protected _sceneParticleList: Array<CombineParticle>;
    protected _time: number;
    protected _ready: boolean;
    render: boolean;
    private _sceneDic;
    private _sceneQuadTree;
    viewFrustum: ViewFrustum;
    private _currentUrl;
    constructor();
    get displayRoleList(): Array<Display3dMovie>;
    get displaySpriteList(): Array<Display3DSprite>;
    clearScene(): void;
    clearStaticScene(): void;
    testUrl($url: string): boolean;
    loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void;
    getDisplayByID($type: number, $id: number): any;
    fixAstart(pos: Vector2D): void;
    loadSceneConfigCom(obj: any): void;
    private getGroundSprite;
    private makeCollisioin;
    set ready($value: boolean);
    get ready(): boolean;
    private getBuildSprite;
    private getParticleSprite;
    private initScene;
    addDisplay($display: Display3D): void;
    removeDisplay($display: Display3D): void;
    /**
     * 动态添加的staticMesh 物件例如武器等
    */
    addSpriteDisplay($display: Display3DSprite): void;
    removeSpriteDisplay($display: Display3DSprite): void;
    /**
     * 动态添加的骨骼动画角色
     */
    addMovieDisplay($display: Display3dMovie): void;
    addMovieDisplayTop($display: Display3dMovie): void;
    removeMovieDisplay($display: Display3dMovie): void;
    private setParticleVisible;
    addDisplay2DList($dis: Display3D): void;
    private mathCamFar;
    protected updateStaticDiplay(): void;
    protected updateStaticBind(): void;
    protected updateSpriteDisplay(): void;
    protected updateMovieDisplay(): void;
    protected updateMovieFrame(): void;
}
export  class SceneRes extends BaseRes {
    static sceneConfigData: any;
    private _completeFun;
    private _readDataFun;
    protected _progressFun: Function;
    sceneData: any;
    load($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): void;
    loadZipMap(name: string, size: number): void;
    isNeedReload(): boolean;
    loadComplete($byte: ArrayBuffer): void;
    applyByteArray(): void;
    readNext(): void;
    readScene(): void;
    private _terrainDataItem;
    private readTerrainIdInfoBitmapData;
    private _astarDataMesh;
    private readAstat;
    private readAstarFromByte;
}
export  class QuadTreeNode {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    depth: number;
    data: Array<any>;
    target: any;
    sun: Array<QuadTreeNode>;
    id: number;
    constructor($x: number, $y: number, $z: number, $width: number, $height: number, $depth: number);
    testViewFrustum(face: Array<Vector3D>, ray: Ray): void;
    testViewFrustumResult(face: Array<Vector3D>): boolean;
    testRay(ray: Ray): boolean;
}
export  class Ray {
    o: Vector3D;
    d: Vector3D;
    baseT: number;
    setPos(x: number, y: number, z: number): void;
    setTarget(x: number, y: number, z: number): void;
}
export  class SceneQuadTree {
    private _sceneDic;
    private _rootNode;
    private _circle;
    private _lastx;
    private _lastz;
    needUpdata: boolean;
    private panleAry;
    private _ray;
    init(obj: any, $dic: Object): void;
    getNode(obj: any): QuadTreeNode;
    setCircle($x: number, $z: number, $radius: number): void;
    update(): void;
    private getPanelByVec;
    private capsuleLineSprite;
    updateDraw(): void;
    private drawCylinder;
}
export  class ViewFrustum {
    private capsuleLineSprite;
    private panleAry;
    private dataAry;
    constructor();
    init(): void;
    setCam(): void;
    private getPanle;
    private getPanelByVec;
    setData(obj: any): void;
    setViewFrustum(): void;
}
export  class SkillEffect extends SkillKey {
    active: Object3D;
    addToRender(): void;
    protected onPlayCom(event?: Event): void;
}
export  class SkillBugBind implements IBind {
    bindMatrix: Matrix3D;
    getSocket(socketName: string, resultMatrix: Matrix3D): void;
    getSunType(): number;
}
export  class SkillFixEffect extends SkillEffect {
    pos: Vector3D;
    rotation: Vector3D;
    outPos: Vector3D;
    hasSocket: boolean;
    socket: string;
    setInfo(obj: SkillKeyVo): void;
    addToRender(): void;
}
export  class SkillKey {
    time: number;
    particle: CombineParticle;
    removeCallFun: Function;
    constructor();
    addToRender(): void;
    setInfo(obj: SkillKeyVo): void;
    reset(): void;
    destory(): void;
}
export  class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
    activeList: Array<Object3D>;
    currentPosList: Array<Vector3D>;
    pathMul: SkillMulPath;
    update(t: number): void;
    getSunType(): number;
    addToRender(): void;
    setMulPlayData($activeList: Array<Object3D>, $target: Object3D, $removeCallFun: Function, types?: number): void;
    getMulSocket(ary: Array<Vector3D>): void;
}
export  class SkillTrajectory extends SkillKey implements IBind {
    active: Object3D;
    target: Object3D;
    data: SkillTrajectoryTargetKeyVo;
    protected _currentPos: Vector3D;
    rotationMatrix: Matrix3D;
    protected _socketMaxrix: Matrix3D;
    protected _currentTargetPos: Vector3D;
    endParticle: CombineParticle;
    protected path: SkillPath;
    constructor();
    update(t: number): void;
    reset(): void;
    endPlayFun(e?: BaseEvent): void;
    setCurrentPos(): boolean;
    addToRender(): void;
    getSocket(socketName: string, resultMatrix: Matrix3D): void;
    getSunType(): number;
    setInfo(obj: SkillKeyVo): void;
    setPlayData($active: Object3D, $target: Object3D, $removeCallFun: Function, types?: number, $bloodFun?: Function): void;
    destory(): void;
}
export  class PathManager {
    private static dic;
    static reg(types: number, cls: any): void;
    static getNewPath(types: number): any;
    static init(): void;
}
export  class SkillMulPath extends SkillPath {
    private skillMul;
    private currentPosAry;
    private alltime;
    private lastTime;
    private maxV3d;
    private allTimeList;
    resultAry: Array<Array<Array<number>>>;
    setInitCurrentPos(ary: Array<Vector3D>): void;
    private directAry;
    add(): void;
    setAllData(): void;
    update(t: number): void;
    setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D): void;
    applyData(ary: Array<Vector3D>): void;
    reset(): void;
}
export  class SkillPath {
    currentPos: Vector3D;
    currentTargetPos: Vector3D;
    rotationMatrix: Matrix3D;
    time: number;
    /**
    * 是否已经到达
    */
    protected hasReached: boolean;
    endTime: number;
    /**
    * 当前方向
    */
    protected _currentDirect: Vector3D;
    speed: number;
    skillTrajectory: SkillTrajectory;
    endFun: Function;
    bloodFun: Function;
    types: number;
    update(t: number): void;
    setRotationMatrix($newPos: Vector3D): void;
    arrive(): void;
    applyArrive(): void;
    reset(): void;
    add(): void;
    setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D, $bloodFun: Function): void;
}
export  class SkillSinPath extends SkillPath {
    private alltime;
    private lastTime;
    protected basePos: Vector3D;
    add(): void;
    update(t: number): void;
    setApplyPos($offset: Vector3D): void;
    getOffset(ypos: number): Vector3D;
    reset(): void;
}
export  class SkillCosPath extends SkillSinPath {
    getOffset(ypos: number): Vector3D;
}
export  class Skill extends ResCount {
    protected skillVo: SkillVo;
    name: string;
    key: string;
    isDeath: boolean;
    keyAry: Array<SkillKey>;
    completeNum: number;
    src: boolean;
    active: Object3D;
    completeFun: Function;
    time: number;
    static MaxTime: number;
    targetFlag: number;
    targetShockFlag: number;
    trajectoryAry: Array<SkillTrajectory>;
    protected _skillData: SkillData;
    batterObj: any;
    tbSkillId: number;
    soundPlay: boolean;
    needSound: boolean;
    hasDestory: boolean;
    actionEnd: boolean;
    constructor();
    setData($data: any, $skillData: SkillData): void;
    getBloodTime(): number;
    play(): void;
    setKeyAry(): void;
    removeKey($key: SkillKey): void;
    /**强制移除技能 */
    removeSkillForce(): void;
    skillComplete(): void;
    reset(): void;
    update(t: number): void;
    updateTrajector(t: number): void;
    private getKeyTarget;
    private getShockTarget;
    private getSound;
    configFixEffect($active: Object3D, $completeFun?: Function, $posObj?: Array<Vector3D>): void;
    configTrajectory($active: Object3D, $target: Object3D, $completeFun?: Function, types?: number, $bloodFun?: Function): void;
    configMulTrajectory($activeList: Array<Object3D>, $active: Object3D, $target: Object3D, $completeFun?: Function): void;
    removeTrajectory($skilltra: SkillTrajectory): void;
    destory(): void;
}
export  class SkillData extends ResCount {
    data: any;
    private srcList;
    srcOutAry: Array<Skill>;
    addSrcSkill($skill: Skill): void;
    destory(): void;
    testDestory(): boolean;
}
export  class SkillManager extends ResGC {
    _skillDic: Object;
    _loadDic: Object;
    _preLoadDic: Object;
    _skillAry: Array<Skill>;
    protected _time: number;
    private static _instance;
    constructor();
    static getInstance(): SkillManager;
    update(): void;
    preLoadSkill($url: string): void;
    getSkill($url: string, $name: string, $callback?: Function): Skill;
    protected loadSkillCom($url: string, $skillRes: SkillRes): void;
    addSrc($url: string, skillData: SkillData): void;
    playSkill($skill: Skill): void;
    removeSkill($skill: Skill): void;
    gcSkill(skill: Skill): void;
    gc(): void;
}
export  class ShockUtil {
    private static _instance;
    static getInstance(): ShockUtil;
    constructor();
    private upFun;
    private time;
    private amp;
    private ctime;
    private update;
    shock(time: number, amp: number): void;
}
export  class SkillKeyVo {
    frame: number;
    url: string;
    setData($data: any): void;
}
export  class SkillShockVo {
    time: number;
    lasttime: number;
    amp: number;
    setData($data: any): void;
}
export  class SkillFixEffectKeyVo extends SkillKeyVo {
    pos: Vector3D;
    rotation: Vector3D;
    hasSocket: boolean;
    socket: string;
    setData($data: any): void;
}
export  class SkillTrajectoryTargetKeyVo extends SkillKeyVo {
    beginType: number;
    beginSocket: string;
    beginPos: Vector3D;
    hitSocket: string;
    endParticleUrl: string;
    speed: number;
    multype: number;
    setData($data: any): void;
}
export  class SkillVo {
    action: string;
    skillname: string;
    keyAry: Array<SkillKeyVo>;
    shockAry: Array<SkillShockVo>;
    types: number;
    bloodTime: number;
    static defaultBloodTime: number;
    sound: SkillKeyVo;
    setData($info: any): void;
    private getShockAry;
    private getFixEffect;
    private getTrajectoryDynamicTarget;
}
export  class SkillType {
    static TrajectoryDynamicTarget: number;
    static FixEffect: number;
    static TrajectoryDynamicPoint: number;
}
export  class TextAlign {
    static LEFT: string;
    static CENTER: string;
    static RIGHT: string;
    static TOP: string;
    static MIDDLE: string;
    static BOTTOM: string;
}
export  class UIManager {
    static cando: boolean;
    static popClikNameFun: Function;
    private static _instance;
    static getInstance(): UIManager;
    static uiClikName($name: string, $id: number): void;
    private _ctx;
    private _canvas;
    constructor();
    getContext2D($width: number, $height: number, alianDefault?: boolean): CanvasRenderingContext2D;
    getGrayImageDatabyImg($img: any): ImageData;
    makeCtxToGray($ctx: CanvasRenderingContext2D, $rect: Rectangle): void;
    showCanvas($x?: number, $y?: number): void;
}
export  class AnimManager {
    private _dic;
    constructor();
    private static _instance;
    static getInstance(): AnimManager;
    getAnimData($url: string, $fun: Function): void;
    getAnimDataImmediate($url: string): AnimData;
    clearAnim($url: string): void;
    readData(byte: Pan3dByteArray, $url: any): AnimData;
    private readFrameData;
    private readFrameTypeData;
    private processFrame;
    frameToBone(frameData: Array<number>, hierarchyList: Array<ObjectBone>): Array<ObjectBaseBone>;
    private setFrameToMatrix;
    private getW;
}
 class ObjectBaseBone {
    father: number;
    name: string;
    tx: number;
    ty: number;
    tz: number;
    tw: number;
    qx: number;
    qy: number;
    qz: number;
    qw: number;
}
 class ObjectBone extends ObjectBaseBone {
    changtype: number;
    startIndex: number;
    matrix: Matrix3D;
    clone(): ObjectBone;
}
export {};
export  class AstarUtil {
    constructor();
    static navmeshData: any;
    private static heightItem;
    private static jumpItem;
    private static aPos;
    static midu: number;
    private static astarWidth;
    private static astarHeight;
    static areaRect: Rectangle;
    static setData($tempNavMesh: any): void;
    private static _sceneVectList;
    private static _frist;
    static set sceneVectList(value: Array<Vector3D>);
    static getJumpDataByV2d($tx: number, $ty: number): boolean;
    static minMapRect: Rectangle;
    private static mathMinMapRect;
    private static mathAreaRect;
    private static _bakData;
    static clear(): void;
    static porcessBak(tf: boolean): void;
    static getHeightByPos($pos: Vector3D): number;
    static getBaseHeightByBitmapdata($xpos: number, $ypos: number): number;
    private static getBitmapDataHight;
    static findPath($a: Vector3D, $b: Vector3D): Array<Vector3D>;
    static Path2dTo3d(result: Array<Vector2D>): Array<Vector3D>;
    static getWorldPosByStart2D(a: Vector2D): Vector3D;
    static findPath3D($a: Vector3D, $b: Vector3D): Array<Vector2D>;
    private static findStraightLine;
    static isGridCanWalk(p: Vector2D): boolean;
    static findPath2D(gridVec2DA: Vector2D, gridVec2DB: Vector2D): Array<Vector2D>;
    private static turnLineAstar;
    private static simplifyAstar;
    static findNearLinePoint($a: Vector3D, $b: Vector3D): Vector3D;
    private static moveA2B;
    static getPosIsCanMove($pos: Vector3D): boolean;
    static canwalkItem: Array<Vector2D>;
    static makeStarGraph($arr: Array<Array<number>>): void;
    static blockAry(ary: Array<Array<number>>): void;
    static blockList(ary: Array<Array<Vector2D>>): void;
    static blockPoint(p1: Vector2D, p2: Vector2D): void;
    static blockBakData: Array<Array<any>>;
    static blockRec($rec: Rectangle): void;
    static unblock(): void;
    static graphData: any;
    static getGrapIndexByPos($pos: Vector3D): Vector2D;
    static getScenePos($x: number, $y: number): Vector3D;
    static getLookAtPos($hit3D: Vector3D): Vector3D;
}
export  class Base64 {
    static chars: string;
    static encode: (arraybuffer: any) => string;
    static decode: (base64: any) => ArrayBuffer;
}
export  class ColorTransition {
    private _canvas;
    private _cxt;
    private _gnt;
    private static _instance;
    static getInstance(): ColorTransition;
    constructor();
    getImageData($data: any): ImageData;
    getImageDataByVec($data: any, $lenght: number): ImageData;
    setData(): void;
}
export  class Curve {
    type: number;
    valueVec: Array<Array<number>>;
    private valueV3d;
    begintFrame: number;
    maxFrame: number;
    constructor();
    getValue($t: number): Array<number>;
    setData(obj: any): void;
}
export  class GroupDataManager extends ResGC {
    protected _loadDic: Object;
    private static _instance;
    static getInstance(): GroupDataManager;
    getGroupData($url: string, $fun: Function): void;
}
export  class KeyboardType {
    static A: number;
    static B: number;
    static C: number;
    static D: number;
    static E: number;
    static F: number;
    static G: number;
    static H: number;
    static I: number;
    static J: number;
    static K: number;
    static L: number;
    static M: number;
    static N: number;
    static O: number;
    static P: number;
    static Q: number;
    static R: number;
    static S: number;
    static T: number;
    static U: number;
    static V: number;
    static W: number;
    static X: number;
    static Y: number;
    static Z: number;
    static Left: number;
    static Up: number;
    static Right: number;
    static Down: number;
    static Delete: number;
    static F1: number;
    static F2: number;
}
export  class LightProbeManager {
    private static _instance;
    static getInstance(): LightProbeManager;
    private _dataAry;
    private _defaultVec;
    constructor();
    setLightProbeData($arr: Array<any>): void;
    clear(): void;
    getData($pos: Vector3D): Array<Vector3D>;
    testPoint(lightArea: any, $pos: Vector3D): Boolean;
    getResultData(ary: Array<any>, x: number, z: number, y: number, bNum: Number, $pos: Vector3D): Array<Vector3D>;
}
export  class LoadManager {
    static BYTE_TYPE: string;
    static IMG_TYPE: string;
    static XML_TYPE: string;
    private static _instance;
    static getInstance(): LoadManager;
    static getVersion(vkey: any): string;
    private _loadThreadList;
    private _waitLoadList;
    constructor();
    load($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function): void;
    loadWaitList(): void;
}
export  class LoaderThread {
    private _xhr;
    private _img;
    private _loadInfo;
    idle: boolean;
    private _url;
    constructor();
    load(loadInfo: LoadInfo): void;
    loadError(): void;
    loadByteXML(): void;
    loadByteImg(): void;
    loadImg(): void;
}
export  class LoadInfo {
    url: string;
    type: string;
    fun: Function;
    info: any;
    progressFun: Function;
    version: string;
    constructor($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function);
    get vurl(): string;
}
export  class MeshDataManager extends ResGC {
    private _loadDic;
    constructor();
    private static _instance;
    static getInstance(): MeshDataManager;
    getMeshData($url: string, $fun: Function, $batchNum?: number): void;
    private roleResCom;
    gc(): void;
    readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
    private readBindPosByte;
    readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void;
    private cloneMeshData;
    private uploadMesh;
    uploadPbrMesh($mesh: MeshData, $useNormal: boolean): void;
    preLoad($url: string): void;
}
export  class ObjDataManager extends ResGC {
    private _loadList;
    constructor();
    private static _instance;
    static getInstance(): ObjDataManager;
    getObjData($url: string, $fun: Function): void;
    registerUrl($url: string): void;
    releaseUrl($url: string): void;
    gc(): void;
    readFloatNrm(byte: Pan3dByteArray, vertices: Array<number>): void;
    private readcollisionItem;
    private getFloadNum;
    loadObjCom($byte: ArrayBuffer, $url: string): ObjData;
    readObj2OneBuffer(byte: Pan3dByteArray, $objData: ObjData): void;
    creatTBNBuffer($objData: ObjData): void;
}
export  class BaseRes extends ResCount {
    static IMG_TYPE: number;
    static OBJS_TYPE: number;
    static MATERIAL_TYPE: number;
    static PARTICLE_TYPE: number;
    static SCENE_TYPE: number;
    static ZIP_OBJS_TYPE: number;
    static PREFAB_TYPE: number;
    static SCENE_PARTICLE_TYPE: number;
    protected _byte: Pan3dByteArray;
    protected imgNum: number;
    protected imgLoadNum: number;
    protected _imgComplete: boolean;
    protected _progressFun: Function;
    version: number;
    _imgFun: Function;
    private allImgBytes;
    read($imgFun?: Function): void;
    readZipObj(): void;
    readImg(): void;
    readJpngImg($url: string): void;
    readImgLow(): void;
    loadImg(img: any): void;
    addImg($url: string, img: any): void;
    countImg(): void;
    readObj($srcByte: Pan3dByteArray): void;
    readMaterial(): void;
    readParticle(): void;
    readMaterialInfo(): Array<any>;
    static readFloatTwoByte(byte: Pan3dByteArray, vertices: Array<number>): void;
    static readFloatOneByte(byte: Pan3dByteArray, vertices: Array<number>): void;
    static readIntForTwoByte(byte: Pan3dByteArray, indexs: Array<number>): void;
    static readIntForOneByte(byte: Pan3dByteArray, indexs: Array<number>): void;
    /**
     * $readType
     * 0 readFloatTwoByte
     * 1 readFloatOneByte
     * 2 readIntForOneByte
     *  */
    static readBytes2ArrayBuffer($byte: Pan3dByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType?: number): void;
    static readMaterialParamData(byte: Pan3dByteArray): Array<any>;
    allResCom(): void;
}
export  class GroupRes extends BaseRes {
    private _fun;
    dataAry: Array<GroupItem>;
    private _objDic;
    private _particleDic;
    private _materialDic;
    load(url: string, $fun: Function): void;
    loadComplete($byte: ArrayBuffer): void;
    private readNext;
    private readItem;
    initReg(): void;
    destory(): void;
}
export  class GroupItem extends Object3D {
    objUrl: string;
    materialUrl: string;
    particleUrl: string;
    materialInfoArr: Array<any>;
    isGroup: boolean;
    types: number;
}
export  class ModelRes extends BaseRes {
    private _fun;
    objUrl: string;
    light: LightVo;
    materialUrl: string;
    load(url: string, $fun: Function): void;
    loadComplete($byte: ArrayBuffer): void;
    private readNexte;
}
export  class ResManager extends ResGC {
    private static _instance;
    static getInstance(): ResManager;
    loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void;
    loadSkillRes(url: string, $fun: Function): void;
    loadSceneRes($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): SceneRes;
    clearSceneUse(curRes: SceneRes): void;
    gc(): void;
}
export  class RoleRes extends BaseRes {
    roleUrl: string;
    actionAry: Array<string>;
    private actionByte;
    private actionNum;
    private actionIndex;
    private _fun;
    meshBatchNum: number;
    ambientLightColor: Vector3D;
    ambientLightIntensity: number;
    sunLigthColor: Vector3D;
    sunLigthIntensity: number;
    nrmDircet: Vector3D;
    protected resState: string;
    NONE: string;
    READ_MESH: string;
    READ_ACTION: string;
    READ_IMAGE: string;
    READ_IMAGE_LOADING: string;
    READ_MATERIAL: string;
    READ_PARTICLE: string;
    READ_COMPLETE: string;
    constructor();
    load(url: string, $fun: Function): void;
    updateState(): void;
    updateTick: () => void;
    loadComplete($byte: ArrayBuffer): void;
    readMesh(): void;
    /**读取动作*/
    private readActions;
    /**读取单个动作*/
    private readAction;
    /**图片读取完毕*/
    allResCom(): void;
    /**读取材质*/
    readMaterial(): void;
    /**读取粒子*/
    readParticle(): void;
}
export  class RoleResLow extends RoleRes {
}
export  class SkillRes extends BaseRes {
    skillUrl: string;
    private _fun;
    meshBatchNum: number;
    data: any;
    constructor();
    load(url: string, $fun: Function): void;
    loadComplete($byte: ArrayBuffer): void;
    private readNext;
    private readData;
    readV3d($byte: Pan3dByteArray): Vector3D;
}
export  class Shadow {
    _visible: boolean;
    display: Display3dShadow;
    data: Array<number>;
    constructor();
    set visible(value: boolean);
    get visible(): boolean;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    set size(value: number);
    get size(): number;
}
export  class ShadowManager {
    private static _instance;
    static getInstance(): ShadowManager;
    private _displayList;
    constructor();
    addShadow(): Shadow;
    removeShadow(sd: Shadow): void;
    update(): void;
    private getIdleShadow;
}
export  class SoundManager {
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
export  class TimeUtil {
    static START_TIME: number;
    static funAry: Array<Function>;
    static timefunAry: Array<TimeFunTick>;
    static outTimeFunAry: Array<TimeFunOut>;
    static time: number;
    static getTimer(): number;
    static getTimerSecond(): number;
    private static lastTime;
    static saveNowTime(): void;
    static getUseTime(): number;
    static getZeroTime(nS: number): number;
    /**
    * YYYY-mm-DD HH:MM
    **/
    static getLocalTime(nS: number): string;
    /**
    * YYYY-mm-DD
    **/
    static getLocalTime0(nS: number): string;
    /**
    * YYYY-mm-DD HH:MM:SS
    **/
    static getLocalTime1(nS: number): string;
    /**
     * HH:MM:SS
    **/
    static getLocalTime2(nS: number): string;
    /**
     * HH:MM
    **/
    static getLocalTime6(nS: number): string;
    /**
     * MM:SS
    **/
    static getLocalTime3(nS: number): string;
    /**
     * MM分SS秒
     */
    static getLocalTime4(nS: number): string;
    /**
     * HH时MM分SS秒
     */
    static getLocalTime5(nS: number): string;
    static dayTime: number;
    static HourTime: number;
    static MinuteTime: number;
    /**
     * 时间差转换
     * DD天HH时MM分SS秒
     */
    static getDiffTime1(nS: number): string;
    /**
     * HH:MM:SS
    **/
    static getDiffTime2(nS: number): string;
    static zeroStr(num: number): string;
    static getDelayTimeStr($hourtime: number): string;
    static compareTime($hour: number, $min: number): boolean;
    static init(): void;
    static addTimeTick($time: number, $fun: Function, $beginTime?: number): void;
    static removeTimeTick($fun: Function): void;
    static addTimeOut($time: number, $fun: Function): void;
    static removeTimeOut($fun: Function): void;
    static hasTimeOut($fun: Function): boolean;
    static addFrameTick($fun: Function): void;
    static hasFrameTick($fun: Function): boolean;
    static removeFrameTick($fun: Function): void;
    static update(): void;
}
 class TimeFunTick {
    alltime: number;
    time: number;
    fun: Function;
    update(t: number): void;
}
 class TimeFunOut {
    alltime: number;
    time: number;
    fun: Function;
    update(t: number): boolean;
}
export {};
export  class Util {
    static float2int(value: any): number;
    static radian2angle(value: number): number;
    static angle2radian(value: number): number;
    static keyChi: Array<string>;
    /**阿拉伯数字转换成中文数字 */
    static getChiNum($id: number): string;
    static hexToArgb(expColor: number, is32?: boolean, color?: Vector3D): Vector3D;
    static hexToArgbNum(expColor: number, is32?: boolean, color?: Vector3D): Vector3D;
    static getBaseUrl(): string;
    /**描边路径 */
    static strokeFilter(ctx: CanvasRenderingContext2D, width: number, height: number, color: number): void;
    static trim(s: any): String;
    static trimLeft(s: any): String;
    static trimRight(s: any): String;
    static TweenMoveTo(taget: any, t: number, vars: any): void;
    static getScencdStr(timeNum: number): string;
    static random($num: number): number;
    static randomByItem(arr: Array<any>): any;
    static makeArray(a: Array<any>, b: Array<any>): void;
    static unZip($aryBuf: ArrayBuffer): ArrayBuffer;
    static getZipByte($byte: Pan3dByteArray): Pan3dByteArray;
    static getUrlParam(name: string): string;
    static copy2clipboard(val: string): void;
    static getBit($num: number, offset: number): boolean;
}
export  class CapsuleVo {
    radius: number;
    height: number;
    constructor($radius: number, $height: number);
}
export  class CollisionVo extends Object3D {
    type: number;
    name: string;
    polygonUrl: string;
    data: any;
    radius: number;
    colorInt: number;
    constructor($x?: number, $y?: number, $z?: number);
}
export  class CollisionItemVo {
    friction: number;
    restitution: number;
    isField: boolean;
    collisionItem: Array<CollisionVo>;
}
export  class CollisionType {
    static Polygon: number;
    static BOX: number;
    static BALL: number;
    static Cylinder: number;
    static Cone: number;
}
export  class LightVo {
    sunDirect: Array<number>;
    sunColor: Array<number>;
    ambientColor: Array<number>;
    setData(sd: any, sc: any, ac: any): void;
}
export  class DualQuatFloat32Array {
    quat: Float32Array;
    pos: Float32Array;
}
export  class AnimData {
    inLoop: number;
    inter: Array<number>;
    bounds: Array<Vector3D>;
    nameHeight: number;
    posAry: Array<Vector3D>;
    matrixAry: Array<Array<Matrix3D>>;
    boneQPAry: Array<Array<DualQuatFloat32Array>>;
    hasProcess: boolean;
    processMesh($skinMesh: SkinMesh): void;
    private meshBoneQPAryDic;
    private makeArrBoneQPAry;
    getBoneQPAryByMesh($mesh: MeshData): Array<Array<DualQuatFloat32Array>>;
    private conleMatrixArr;
    private makeFrameDualQuatFloatArray;
}
export  class BoneSocketData {
    name: string;
    boneName: string;
    index: number;
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
}
export  class SkinMesh extends ResCount {
    meshAry: Array<MeshData>;
    boneSocketDic: Object;
    fileScale: number;
    tittleHeight: number;
    hitBox: Vector2D;
    type: number;
    animDic: Object;
    ready: boolean;
    animUrlAry: Array<string>;
    lightData: Array<Array<number>>;
    hitPosItem: Array<Vector3D>;
    allParticleDic: Object;
    url: string;
    hasDestory: boolean;
    makeHitBoxItem(): void;
    addMesh($mesh: MeshData): void;
    loadParticle(): void;
    loadMaterial($fun?: Function): void;
    private loadByteMeshDataMaterial;
    setAction(actionAry: Array<string>, roleUrl: string): void;
    destory(): void;
}
export {};
export  class ModuleEventManager {
    private static _instance;
    static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void;
    static dispatchEvent($event: BaseEvent): void;
}
export  class Processor {
    constructor();
    getName(): string;
    /**
    * 解析事件，之后交给处理函数
    * @param $notification
    */
    protected receivedModuleEvent($event: BaseEvent): void;
    /**
    * 监听的事件类的集合
    * 请注意：返回为事件的CLASS(这些CLASS必须继承自ModuleEvent)的数组
    * @return
    *
    */
    protected listenModuleEvents(): Array<BaseEvent>;
    registerEvents(): void;
    getHanderMap(): Object;
}
export  class UnitFunction {
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
export  class mainpan3d {
    static canvas: HTMLCanvasElement;
}
export  class CanvasPostionModel {
    /**
     * 2.5d旋转角度
     */
    static SCENE_2D_ROTATION_45: number;
    tureMoveV2d: Vector2D;
    private static _instance;
    static getInstance(): CanvasPostionModel;
    constructor();
    resetSize(): void;
}
export  class Override2dEngine extends OverrideEngine {
    constructor();
    static resetSize(width?: number, height?: number): void;
    static init($caves: HTMLCanvasElement): void;
    static resetViewMatrx3D(): void;
}
export  class OverrideEngine extends Engine {
    constructor();
    static resetSize(width?: number, height?: number): void;
    static init($caves: HTMLCanvasElement): void;
}
export  class OverrideSceneManager extends SceneManager {
    fbo: FBO;
    light: LightVo;
    constructor();
    static initConfig(): void;
    update(): void;
}
export  class CharModelShow {
    constructor();
    private addModelChar;
}
export  class CharSkillPlayModel {
    constructor();
    private initSkillPlay;
    private paramId;
    private makeUrlParam;
    private attackTarget;
    private makeAttackChar;
    private skillFileName;
    private charIdstr;
    private weaponNum;
    private makeMainChar;
    private textPlaySkillFun;
    private mainChar;
    private skipId;
    private skillEffectItem;
    private playSkill;
}
export  class ModelSceneChar extends SceneChar {
    setWeaponByAvatar(avatar: number, $suffix?: string): void;
    setWingByID($wingId: number): void;
    setMountById($mountId: number): void;
}
export  class SkillSceneChar extends SceneChar {
    onMeshLoaded(): void;
    loadFinishFun: Function;
    changeActionFun: Function;
    changeAction($action: string): void;
    setWeaponByAvatar(avatar: number, $suffix?: string): void;
}
export  class DirectShadowDisplay3DShader extends Shader3D {
    static DirectShadowDisplay3DShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class DirectShadowDisplay3DSprite extends Display3DSprite {
    constructor();
    needScanShadow: boolean;
    protected initData(): void;
    protected modelShder: Shader3D;
    setObjUrl(value: string): void;
    private nrmFlag;
    protected _uvTextureRes: TextureRes;
    update(): void;
    protected drawTemp($dis: Display3DSprite): void;
    updateRotationMatrix(): void;
    setPicUrl($str: string): void;
    groupItem: Array<Display3DSprite>;
    setModelById($str: string): void;
}
export  class BaseShadowShader extends Shader3D {
    static BaseShadowShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export  class ShadowModel {
    private static _instance;
    static getInstance(): ShadowModel;
    static shadowViewMatx3D: Matrix3D;
    private renderContext;
    getFBO(): FBO;
    private _uvTextureRes;
    updateDepthTexture(fbo: FBO): void;
    private sunRotationX;
    sunRotationY: number;
    private sunDistens100;
    private makeUseShadowView;
    private isNeedMake;
    private _visible;
    setShowdowVisible(value: boolean): void;
    updateDepth($scene: SceneManager): void;
    private drawTempSprite;
}
export  class BaseLaya3dSprite extends LayaInsideSprite {
    constructor();
    protected upFrame(): void;
}
export  class Pan3dInSideLaya {
    static inited: boolean;
    static overrideMethods(): void;
}
export  class LayaInsideSprite extends Laya.Sprite {
    private static _list;
    private static add;
    private static forEach;
    testRenderPan3d(index: number): void;
    protected _layaRenderIndex: number;
    tscene: LayaOverride2dSceneManager;
    constructor();
    protected initData(): void;
    init(texture: Laya.Texture, vb?: Array<any>, ib?: Array<any>): void;
    protected upFrame(): void;
    static saveLayaWebGLContext(): void;
    static revertLayaWebGLContext(): void;
}
export  class LayaSceneBaseChar extends Display3dMovie {
    private _avatar;
    _visible: boolean;
    get visible(): boolean;
    set visible(value: boolean);
    changeColor: Array<number>;
    constructor();
    set alpha(value: number);
    private _alpha;
    get alpha(): number;
    updateMaterialMesh($mesh: MeshData): void;
    setMaterialTextureAlpha($material: Material, $mp?: MaterialBaseParam): void;
    private static alphaShader;
    private makeAlphaShader;
    setAvatar(num: number): void;
    update(): void;
    protected getSceneCharAvatarUrl(num: number): string;
    protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
    /**
     * 是否包含动作
     * @param motion
     * @return
     *
     */
    hasAnimation(motion: string): boolean;
    /**
     * 返回动作时间 毫秒
     * @param motion 动作名
     * @return
     */
    getAnimationTotalDuration(motion: string): number;
    isPlaying(): boolean;
    protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
    removeStage(): void;
    get px(): number;
    set px(value: number);
    get py(): number;
    set py(value: number);
    get pz(): number;
    set pz(value: number);
    addSkinMeshParticle(): void;
}
export  class LayaSceneChar extends LayaSceneBaseChar {
    static BLOOD_COLOR_HP: number;
    static BLOOD_COLOR_ANGER: number;
    skillitem: Array<Skill>;
    isMount: boolean;
    static Defaul_Man_Avatar: number;
    static Defaul_WoMan_Avater: number;
    static WEAPON_PART: string;
    static WEAPON_DEFAULT_SLOT: string;
    static MOUNT_SLOT: string;
    static WING_SLOT: string;
    static SEL_PART: string;
    static QUEST_ICON: string;
    static NONE_SLOT: string;
    protected _px: number;
    protected _py: number;
    protected _pz: number;
    private _pRotationY;
    toRotationY: number;
    private _pScale;
    tittleHeight: number;
    private _optimization;
    constructor();
    /**强制角度 */
    set forceRotationY(val: number);
    get pRotationY(): number;
    set pRotationY(val: number);
    get pScale(): number;
    set pScale(v: number);
    protected _mountChar: LayaSceneBaseChar;
    setMount(v: number): boolean;
    private _wingDisplay;
    setWing(v: number): void;
    private _weaponNum;
    setWeapon(num: number): void;
    setWeaponByAvatar(avatar: number, $suffix?: string): void;
    protected getSceneCharAvatarUrl(num: number): string;
    onMeshLoaded(): void;
    play($action: string, $completeState?: number, needFollow?: boolean): boolean;
    getCurrentAction(): string;
    protected rotationToNew(value: number, num?: number): void;
    stopMove(): void;
    watch($obj: Display3D, $syn?: boolean): void;
    getCurrentPos(): Vector3D;
    skillVo: Skill;
    msgSpellStop(): void;
    destory(): void;
    set visible(value: boolean);
    get visible(): boolean;
    set optimization(value: boolean);
    get optimization(): boolean;
    private _resultVisible;
    get resultVisible(): boolean;
    applyVisible(): void;
    protected _isCamera2D: boolean;
    set isCamera2D(v: boolean);
    updateBind(): void;
    private updateWeaponScale;
    get px(): number;
    set px(value: number);
    get pz(): number;
    set pz(value: number);
    private lineSprite;
    update(): void;
    math_distance($other: Display3dMovie): number;
    get2dPos(): Vector2D;
    set2dPos($x: number, $y: number): void;
    private _showHitBox;
    protected _triIndex: Array<number>;
    protected _hitBox2DItem: Array<Vector2D>;
    mouseClik(lineA: Vector3D, lineB: Vector3D): boolean;
    removeStage(): void;
    addStage(): void;
}
export  class LayaOverride2dEngine extends OverrideEngine {
    constructor();
    static initConfig(): void;
}
export  class LayaOverride2dParticleManager extends ParticleManager {
    constructor();
    getParticleByte($url: string): CombineParticle;
    registerUrl($url: string): void;
    releaseUrl($url: string): void;
    addResByte($url: string, $data: Pan3dByteArray): void;
}
export  class LayaOverride2dSceneManager extends OverrideSceneManager {
    private static sceneNum;
    constructor();
    groupDataManager: LayaOverrideGroupDataManager;
    skillManager: LayaOverride2dSkillManager;
    particleManager: LayaOverride2dParticleManager;
    static initConfig(): void;
    update(): void;
    addMovieDisplay($display: Display3dMovie): void;
    loadSceneConfigCom(obj: any): void;
    playLyf($url: string, $pos: Vector3D, $r?: number): void;
    private onPlayCom;
    cameraMatrix: Matrix3D;
    viewMatrx3D: Matrix3D;
    upFrame(): void;
}
export  class LayaOverride2dSkillManager extends SkillManager {
    sceneManager: LayaOverride2dSceneManager;
    constructor($sceneManager: LayaOverride2dSceneManager);
    addSrc($url: string, skillData: SkillData): void;
    playSkill($skill: OverrideSkill): void;
    getSkill($url: string, $name: string, $callback?: Function): OverrideSkill;
    protected loadSkillCom($url: string, $skillRes: SkillRes): void;
}
export  class LayaGroupRes extends GroupRes {
    constructor();
    scene: LayaOverride2dSceneManager;
    readParticle(): void;
}
export  class LayaOverrideGroupDataManager extends GroupDataManager {
    scene: LayaOverride2dSceneManager;
    getGroupData($url: string, $fun: Function): void;
}
export  class LayaScene2dInit {
    static isConfig: boolean;
    static initData(): void;
    static sceneItem: Array<LayaOverride2dSceneManager>;
}
export  class OverrideSkill extends Skill {
    skillManager: LayaOverride2dSkillManager;
    baseName: string;
    constructor($skillManager?: LayaOverride2dSkillManager);
    skillComplete(): void;
    setData($data: any, $skillData: SkillData): void;
    setKeyAry(): void;
}
export  class OverrideSkillFixEffect extends SkillFixEffect {
    skill: OverrideSkill;
    constructor($skillvo: OverrideSkill);
    protected onPlayCom(event?: Event): void;
    addToRender(): void;
}
export  class OverrideSkillTrajectory extends SkillTrajectory {
    skill: OverrideSkill;
    reset(): void;
    addToRender(): void;
    endPlayFun(e?: BaseEvent): void;
    setInfo(obj: SkillKeyVo): void;
}
}