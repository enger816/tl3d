declare module Pan3d {
    class BaseEvent {
        type: string;
        data: any;
        target: EventDispatcher;
        constructor($type: string);
        static COMPLETE: string;
    }
}

declare module Pan3d {
    class EventDispatcher {
        protected _eventsMap: Object;
        addEventListener(types: string, listener: Function, thisObject: any): void;
        removeEventListener(type: string, listener: Function, thisObject: any): void;
        dispatchEvent(event: BaseEvent): boolean;
    }
}

declare module Pan3d {
    class GC {
        destory(): void;
    }
}

declare module Pan3d {
    class ResCount extends GC {
        protected _useNum: number;
        idleTime: number;
        static GCTime: number;
        useNum: number;
        clearUseNum(): void;
    }
}

declare module Pan3d {
    class ResGC {
        _dic: Object;
        constructor();
        gc(): void;
    }
}

declare module Pan3d {
    class Object3D extends EventDispatcher {
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
        x: number;
        y: number;
        z: number;
        scale: number;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        px: number;
        py: number;
        pz: number;
        updateMatrix(): void;
        updateRotationMatrix(): void;
    }
}

declare module Pan3d {
    class Camera3D extends Object3D {
        cameraMatrix: Matrix3D;
        private _distance;
        lookAtTarget: Object3D;
        private _astarRect;
        cavanRect: Rectangle;
        scene2dScale: number;
        sceneViewHW: number;
        offset: Vector3D;
        constructor();
        distance: number;
        lookAt($target: Object3D): void;
        private _midPos;
        private _scaleVec;
        astarRect: Rectangle;
        private lastFoucs3D;
        needChange: boolean;
        update(): void;
        readonly postion: Vector3D;
    }
}

declare module Pan3d {
    class ObjData extends ResCount {
        dataView: DataView;
        vertices: Array<number>;
        uvs: Array<number>;
        indexs: Array<number>;
        lightuvs: Array<number>;
        normals: Array<number>;
        tangents: Array<number>;
        bitangents: Array<number>;
        collision: CollisionItemVo;
        invertAry: Array<Matrix3D>;
        private _treNum;
        treNum: number;
        getMaxSize(): number;
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
}

declare module Pan3d {
    class MeshData extends ObjData {
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
        bindPosAry: Array<any>;
        bindPosMatrixAry: Array<Matrix3D>;
        bindPosInvertMatrixAry: Array<Matrix3D>;
        getBindPosMatrix(): void;
        clone(): MeshData;
        destory(): void;
    }
    class BindParticle {
        url: string;
        socketName: string;
        constructor($url: string, $socketName: string);
    }
}

interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}
declare module Pan3d {
    class Dictionary implements IDictionary {
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
}

declare module Pan3d {
    class ColorType {
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
}

declare module Pan3d {
    class BitMapData {
        width: number;
        height: number;
        imgData: ImageData;
        constructor($w: number, $h: number);
        private getIndexByPos;
        setRgb($tx: number, $ty: number, $ve: Vector3D): void;
        getRgb($tx: number, $ty: number): Vector3D;
    }
}

declare module Pan3d {
    class GlReset {
        static saveBasePrarame(gl: WebGLRenderingContext): void;
        private static GlStencilTest;
        private static GlarrayBuffer;
        private static GlelementArrayBuffer;
        private static GlCullFace;
        private static GlDepthTest;
        private static GlfrontFace;
        private static Glglviewport;
        private static GlcullFaceModel;
        private static GldepthWriteMask;
        private static GlsFactor;
        private static GldFactor;
        private static Glprogram;
        static resetBasePrarame(gl: WebGLRenderingContext): void;
    }
    class Context3D {
        renderContext: WebGLRenderingContext;
        _contextSetTest: ContextSetTest;
        init($caves: HTMLCanvasElement): void;
        resetSize($width: number, $height: number): void;
        uploadBuff3D($jsData: any): WebGLBuffer;
        uploadBuff3DArrayBuffer($jsData: ArrayBuffer): WebGLBuffer;
        uploadBuff3DByBuffer($buffData: WebGLBuffer, $jsData: Array<number>): void;
        uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer;
        uploadIndexBuff3DByBuffer($iBuffer: WebGLBuffer, $iStrData: Array<number>): void;
        clearContext(): void;
        update(): void;
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
        setuniform1f($program: Shader3D, $name: string, a: number): void;
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
        setRenderTextureCube($program: WebGLProgram, $name: string, $textureObject: WebGLTexture, $level: number): void;
        updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, $img: any): void;
        getTexture($img: any, $wrap?: number, $filter?: number, $mipmap?: number): WebGLTexture;
        creatTexture($width: number, $height: number, $wrap?: number): WebGLTexture;
        createFramebuffer(): WebGLFramebuffer;
        deleteBuffer(buffer: WebGLBuffer): void;
        deleteTexture(texture: WebGLTexture): void;
        deleteShader(shader: Shader3D): void;
        cullFaceBack(tf: boolean): void;
        setCullFaceModel(value: number): void;
        clearTest(): void;
    }
    class FBO {
        width: number;
        height: number;
        frameBuffer: WebGLFramebuffer;
        depthBuffer: WebGLRenderbuffer;
        texture: WebGLRenderbuffer;
        color: Vector3D;
        constructor(w?: number, h?: number);
        resetSize(w: number, h: number): void;
        private makeSize;
    }
    class ContextSetTest {
        private _textureDic;
        private _program;
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
}

declare module Pan3d {
    class Scene_data {
        static isPanGm: boolean;
        static isPc: boolean;
        static isIos: boolean;
        static context3D: Context3D;
        static canvas3D: HTMLCanvasElement;
        static stageWidth: number;
        static stageHeight: number;
        static sceneViewHW: number;
        static fileRoot: string;
        static ossRoot: string;
        static fileuiRoot: string;
        static verticalScene: boolean;
        static effectsLev: number;
        static cam3D: Camera3D;
        static focus3D: Object3D;
        private static _viewMatrx3D;
        static vpMatrix: Matrix3D;
        static camFar: number;
        static version: number;
        static skyCubeMap: Array<WebGLTexture>;
        static pubLut: WebGLTexture;
        static frameTime: number;
        static MAX_NUMBER: number;
        static uiStage: UIStage;
        static uiBlankStage: UIStage;
        static user: number;
        static light: LightVo;
        static scaleLight: Array<number>;
        static useByte: Boolean;
        static fogColor: Array<number>;
        static fogData: Array<number>;
        static gameAngle: number;
        static sceneNumId: number;
        static fbo: FBO;
        static viewMatrx3D: Matrix3D;
        static supportBlob: boolean;
    }
}

declare module Pan3d {
    interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
    }
    interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }
}

declare module Pan3d {
    class Display3D extends Object3D {
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        beginTime: number;
        type: number;
        protected _onStage: boolean;
        sceneVisible: boolean;
        protected _hasDestory: boolean;
        _scene: Pan3d.SceneManager;
        constructor();
        update(): void;
        readonly onStage: boolean;
        addStage(): void;
        removeStage(): void;
        resize(): void;
        destory(): void;
    }
}

declare module Pan3d {
    class Display3DSprite extends Display3D implements IBind {
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
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        constructor();
        private _aabbVect;
        readonly aabbVect: Array<Vector3D>;
        setObjUrl(value: string): void;
        baseTexture: TextureRes;
        setPicUrl($str: string): void;
        setLightMapUrl(value: string): void;
        readonly lightMapTexture: WebGLTexture;
        setMaterialUrl(value: string, $paramData?: Array<any>): void;
        lightProbe: boolean;
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
}

declare module Pan3d {
    class Display3DSky extends Display3D {
        objurl: string;
        cubeTextList: Array<WebGLTexture>;
        constructor();
        setObjUrl(value: string): void;
        setCubeUrl(value: string): void;
        update(): void;
    }
}

declare module Pan3d {
    class Display3dMovie extends Display3DSprite {
        private _meshUrl;
        protected _skinMesh: SkinMesh;
        protected _animDic: Object;
        protected _preLoadActionDic: Object;
        protected _waitLoadActionDic: Object;
        protected _completeState: number;
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
        isSinging: boolean;
        meshVisible: boolean;
        constructor();
        curentAction: string;
        fixAstartData(pos: Vector2D): void;
        setRoleUrl(value: string): void;
        onMeshLoaded(): void;
        clearMesh(): void;
        addSkinMeshParticle(): void;
        removeSkinMeshParticle(): void;
        private roleResCom;
        setMeshUrl(value: string, $batchNum?: number): void;
        private _nextScale;
        scale: number;
        fileScale: number;
        shadow: boolean;
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
        x: number;
        y: number;
        z: number;
        changePos(): void;
    }
}

declare module Pan3d {
    class Display3dBatchMovie extends Display3dMovie {
        batchNum: number;
        batchPos: Array<Movie3D>;
        constructor();
        fileScale: number;
        addSun($obj: Movie3D): void;
        setVcMatrix($mesh: MeshData): void;
        setLightProbeVc($material: Material): void;
        setVa($mesh: MeshData): void;
        addStage(): void;
        removeStage(): void;
    }
    class Movie3D extends Object3D {
        private _shadow;
        posData: Array<number>;
        retinueShadowFix: Vector3D;
        target: Vector3D;
        hasReach: boolean;
        shadow: boolean;
        _fileScale: number;
        fileScale: number;
        scale: number;
        x: number;
        y: number;
        z: number;
        add(): void;
        remove(): void;
    }
}

declare module Pan3d {
    class Display3dShadow extends Display3D {
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
}

declare module Pan3d {
    class Display3dBg extends Display3D {
        protected texture: WebGLTexture;
        constructor();
        private _width;
        private _height;
        private _wScale;
        private _hScale;
        private _scaleData;
        protected initData(): void;
        resize(): void;
        setImgInfo($url: string, $width: number, $height: number): void;
        setImgUrl($url: string): void;
        appleyPos(): void;
        update(): void;
    }
}

declare module Pan3d {
    class Display2dMovie extends Display3D {
        batchPos: Array<Movie3D>;
        movieTexture: WebGLTexture;
        watchCaramMatrix: Matrix3D;
        private _time;
        private _allFrame;
        private _uvData;
        private _uWidth;
        private _vWidth;
        private _state;
        frameRate: number;
        constructor();
        update(): void;
        updateFrame(t: number): void;
        play(action: string, state?: number): void;
        addSun($obj: Movie3D): void;
        setUrl($url: string): void;
        initData(num: number, scale: number, uscale: number, vscale: number, allFrame: number, random?: boolean): void;
        addStage(): void;
        removeStage(): void;
    }
}

declare module Pan3d {
    class Display3DUISprite extends Display3DSprite {
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
}

declare module Pan3d {
    class Display2DSprite extends Display3D {
        batchPos: Array<Sprite>;
        watchCaramMatrix: Matrix3D;
        private _imgAtlas;
        constructor();
        setInfo($configurl: string, $imgurl: string, $fun: Function): void;
        getSprite($name: string): Sprite;
        addSprite(...spriteAry: Sprite[]): void;
        applyData(): void;
        update(): void;
    }
    class Sprite extends Object3D {
        posData: Array<number>;
        uvData: UIRectangle;
        setPos(xpos: number, ypos: number, zpos: number): void;
        scale: number;
        x: number;
        y: number;
        z: number;
    }
}

declare module Pan3d {
    class GroundDataMesh {
        tx: number;
        ty: number;
        idBitmap: BitMapData;
        infoBitmap: BitMapData;
        sixurl: string;
        private mekeUseTexture;
        calibration(): void;
        static meshAllgroundData($byte: Pan3dByteArray): Array<GroundDataMesh>;
    }
    class TerrainDisplay3DSprite extends Display3DSprite {
        private groundShader;
        private baseSixteenRes;
        private idMapPicDataTexture;
        private infoMapPicDataTexture;
        constructor();
        update(): void;
        private upDataToDraw;
        setGrounDataMesh($groundDataMesh: GroundDataMesh): void;
    }
}

declare module Pan3d {
    class Engine {
        static init($caves: HTMLCanvasElement): void;
        static resReady(): void;
        static testBlob(): void;
        static initPbr(): void;
        static initShadow(): void;
        static needVertical: Boolean;
        static needInputTxt: boolean;
        static resetSize(a?: number, b?: number): void;
        static sceneCamScale: number;
        static resetViewMatrx3D(): void;
        static update(): void;
        static unload(): void;
    }
}

declare module Pan3d {
    class MathClass {
        constructor();
        static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array;
        static SetShock: boolean;
        private static camOffSetShock;
        static updateVp(): void;
        static MathCam(_Cam: Camera3D): void;
        static viewBoxVecItem: Array<Vector3D>;
        static lastViewScale: Vector2D;
        static GetViewHitBoxData($far: number): void;
        static GetViewHitBoxDataCopy($dis: number): void;
        private static gettempPos;
        static mathmidpoint(a: any, b: any, t: number): void;
        static drawbezier(_array: Array<any>, _time: number): Object;
        static math_distance(x1: number, y1: number, x2: number, y2: number): number;
        static math_angle(x1: number, y1: number, x2: number, y2: number): number;
        static easeIn(t: number, b: number, c: number, d: number): number;
        static easeOut(t: number, b: number, c: number, d: number): number;
        static easeInOut(t: number, b: number, c: number, d: number): number;
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $stage3DVO 为stage3d的坐标信息
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        static mathDisplay2Dto3DWorldPos($stage3DVO: Rectangle, $point: Vector2D, $depht?: number): Vector3D;
    }
}

declare module Pan3d {
    class MathUtil {
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        static mathDisplay2Dto3DWorldPos($point: Vector2D, $depht?: number): Vector3D;
        static getGroundPanelPos($evt: any): Vector3D;
        private static gettempPos;
        static math3DWorldtoDisplay2DPos($pos: Vector3D): Vector2D;
        static pointToLine2dDis(point1: Vector2D, point2: Vector2D, out: Vector2D): number;
        static argbToHex(a: number, r: number, g: number, b: number): number;
        static hexToArgb(expColor: number): Vector3D;
        /**
     *
     * @param linePoint_a  线起点
     * @param linePoint_b  线结点
     * @param planePoint  构成面的三个点
     * @return 交点坐标
     *
     */
        static getLinePlaneInterectPointByTri(linePoint_a: Vector3D, linePoint_b: Vector3D, planePoint: Array<Vector3D>): Vector3D;
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
        static MathCam(_Cam: Camera3D): void;
        private getCamData;
    }
}

declare module Pan3d {
    class Matrix3D {
        m: Float32Array;
        isIdentity: boolean;
        constructor();
        static tempM: Matrix3D;
        clone($target?: Matrix3D): Matrix3D;
        readonly position: Vector3D;
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
        getRotaionM33(b: Float32Array): void;
        identityScale(): void;
        identityPostion(): void;
        readonly x: number;
        readonly y: number;
        readonly z: number;
        prependRotation(rad: number, axis: Vector3D): Float32Array;
        prependScale(x: number, y: number, z: number): Float32Array;
        appendScale(x: number, y: number, z: number): void;
        perspectiveFieldOfViewLH(fieldOfViewY: number, aspectRatio: number, zNear: number, zFar: number): void;
        fromVtoV($basePos: Vector3D, $newPos: Vector3D): void;
        buildLookAtLH(eyePos: Vector3D, lookAt: Vector3D, up: Vector3D): void;
        static mul(a: any, b: any, c: any): any;
        toEulerAngles(): Vector3D;
        getRotationing(): Vector3D;
        getScaling(): Vector3D;
    }
}

declare module Pan3d {
    class Quaternion {
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
}

declare module Pan3d {
    class Vector3D {
        x: number;
        y: number;
        z: number;
        w: number;
        static X_AXIS: Vector3D;
        static Y_AXIS: Vector3D;
        static Z_AXIS: Vector3D;
        constructor($x?: number, $y?: number, $z?: number, $w?: number);
        normalize(): void;
        readonly length: number;
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
        static distance(v1: any, v2: any): number;
        toString(): String;
        static dotMulVector(a: Vector3D, b: Vector3D): number;
        static getNrmByTwoVect(v0: Vector3D, v1: Vector3D): Vector3D;
        static calTriNormal(v0: Vector3D, v1: Vector3D, v2: Vector3D, isNormallize?: boolean): Vector3D;
        /**
         *  根据三个点确定的平面球 另外一点在面的垂足
         * @param targetPoint
         * @param a
         * @param b
         * @param c
         * @return
         *
         */
        static getPointPedalInPlane(targetPoint: Vector3D, a: Vector3D, b: Vector3D, c: Vector3D): Vector3D;
        /**
         * p点在三角形b确定的平面内的投影坐标点
         * @param bNomal
         * @param p
         * @param b
         * @return
         *
         */
        static getProjPosition(bNomal: Vector3D, targetPoint: Vector3D, bTriPlane: Array<Vector3D>): Vector3D;
    }
}

declare module Pan3d {
    class Vector2D {
        x: number;
        y: number;
        constructor($x?: number, $y?: number);
        normalize(): void;
        readonly length: number;
        scaleBy(value: number): void;
        sub(val: Vector2D): Vector2D;
        add(val: Vector2D): Vector2D;
        toString(): String;
        static distance(p1: Vector2D, p2: Vector2D): number;
        subtract(value: Vector2D): Vector2D;
    }
}

declare module Pan3d {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor($x?: number, $y?: number, $width?: number, $height?: number);
        clone(): Rectangle;
        sets($x: number, $y: any, $width: number, $height: any): void;
        setRec($rec: Rectangle): void;
        isHitByPoint(tx: number, ty: number): boolean;
    }
}

declare module Pan3d {
    class Circle {
        _x: number;
        _y: number;
        radius: number;
        constructor($x?: number, $y?: number, $radius?: number);
        setData($x: number, $y: number, $radius: number): void;
        setPos($x: number, $y: number): void;
        x: number;
        y: number;
        setRadius($radius: number): void;
        testPoint($point: Vector2D): boolean;
    }
}

declare module Pan3d {
    class Groundposition {
        constructor();
        private static _plantObjectMath;
        private static _plantnormal;
        private static _plane_a;
        static getGroundPos($x: number, $y: number): Vector3D;
    }
}

declare module Pan3d {
    class ObjectMath {
        a: number;
        b: number;
        c: number;
        d: number;
    }
    class Calculation {
        constructor();
        static _PanelEquationFromThreePt(p1: Vector3D, p2: Vector3D, p3: Vector3D): ObjectMath;
        static calPlaneLineIntersectPoint(planeVector: Vector3D, planePoint: Vector3D, linePointA: Vector3D, linePointB: Vector3D): Vector3D;
    }
}

/**
 * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
 * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
 * @class egret.Endian
 * @classdesc
 */
declare module Pan3d {
    class Endian {
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
    class Pan3dByteArray {
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
        /**
        * @private
        */
        buffer: ArrayBuffer;
        /**
        * @private
        */
        dataView: DataView;
        /**
         * @private
         */
        readonly bufferOffset: number;
        getByte(i: number): number;
        setByte(i: number, num: number): void;
        /**
         * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
         * @member {number} ByteArray#position
         */
        position: number;
        reset(): void;
        optcode: number;
        /**
         * ByteArray 对象的长度（以字节为单位）。
         * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
         * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
         * @member {number} ByteArray#length
         */
        length: number;
        /**
         * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
         * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
         * @member {number} ByteArray#bytesAvailable
         */
        readonly bytesAvailable: number;
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
        readVector3D($w?: boolean): Pan3d.Vector3D;
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
}

declare module Pan3d {
    class TestTriangle {
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
}

declare module Pan3d {
    class ProgrmaManager extends ResGC {
        private static _instance;
        constructor();
        static getInstance(): ProgrmaManager;
        getProgram($str: string): Shader3D;
        registe($str: any, $shader3D: Shader3D): void;
        getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
        outShader($str: string): void;
        gc(): void;
    }
}

interface IShader {
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
    encode(v?: string, f?: string): void;
    binLocation($context: WebGLRenderingContext): void;
}
declare module Pan3d {
    class Shader3D extends ResCount implements IShader {
        vertex: string;
        fragment: string;
        name: string;
        program: WebGLProgram;
        vShader: WebGLShader;
        fShader: WebGLShader;
        paramAry: Array<any>;
        private _paramAry;
        localDic: Object;
        constructor();
        encode(v?: string, f?: string): boolean;
        getWebGLUniformLocation($name: string): WebGLUniformLocation;
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
        destory(): void;
    }
}

declare module Pan3d {
    class BuildShader extends Shader3D {
        static buildShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class MaterialShader extends Shader3D {
        static MATERIAL_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        outstr(str: string): void;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class MaterialAnimShader extends Shader3D {
        static MATERIAL_ANIM_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static getMd5M44Str(): string;
        static getMd5M44NrmStr(): string;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class MaterialBatchAnimShader extends Shader3D {
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class SkyShader extends Shader3D {
        static Sky_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class Display3DShadowShader extends Shader3D {
        static Display3DShadowShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class UIShader extends Shader3D {
        static UI_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class UIImageShader extends Shader3D {
        static UI_IMG_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class UIMaskShader extends Shader3D {
        static UI_MASK_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class Movie2DShader extends Shader3D {
        static MOVIE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class Sprite2DShader extends Shader3D {
        static SPRITE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class TerrainDisplay3DShader extends Shader3D {
        static TerrainDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class CombineParticleData extends ResCount {
        maxTime: number;
        dataAry: Array<ParticleData>;
        destory(): void;
        getCombineParticle(): CombineParticle;
        setDataByte(byte: Pan3dByteArray): void;
        private getParticleDataType;
    }
}

declare module Pan3d {
    class CombineParticle extends EventDispatcher {
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
        displayAry: Array<Display3DParticle>;
        maxTime: number;
        bindTarget: IBind;
        bindSocket: string;
        x: number;
        y: number;
        z: number;
        setPos($xpos: number, $ypos: number, $zpos: number): void;
        setMulPos(ary: Array<Array<Array<number>>>): void;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        applyRotation(): void;
        setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void;
        setDataByte(byte: Pan3dByteArray): void;
        addPrticleItem($dis: Display3DParticle): void;
        private getDisplay3DById;
        setData(ary: Array<any>): void;
        updateTime(t: number): void;
        updateBind(): void;
        reset(): void;
        update(): void;
        updateItem(idx: number): void;
        readonly size: number;
        private getDisplay3D;
        destory(): void;
    }
}

declare module Pan3d {
    class ParticleManager extends ResGC {
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
        readonly particleList: Array<CombineParticle>;
        updateTime(): void;
        private renderDic;
        private addRenderDic;
        private removeRenderDic;
        private updateRenderDic;
        addParticle($particle: CombineParticle): void;
        removeParticle($particle: CombineParticle): void;
        gc(): void;
    }
}

declare module Pan3d {
    class Display3DParticle extends Object3D {
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
        private readonly cantUseEffectsLev;
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
}

declare module Pan3d {
    class ParticleData {
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
        private materialByteUrl;
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
}

declare module Pan3d {
    class ParticleGpuData extends ObjData {
    }
}

declare module Pan3d {
    class Display3DFacetParticle extends Display3DParticle {
        private _lifeVisible;
        private _resultUvVec;
        constructor();
        readonly facetdata: ParticleFacetData;
        creatData(): void;
        update(): void;
        reset(): void;
        setVc(): void;
        setVa(): void;
        updateRotaionMatrix(): void;
        updateUV(): void;
    }
}

declare module Pan3d {
    class Display3DFacetShader extends Shader3D {
        static Display3D_Facet_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
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
}

declare module Pan3d {
    class ParticleFacetData extends ParticleData {
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
}

declare module Pan3d {
    class Display3DBallPartilce extends Display3DParticle {
        constructor();
        readonly balldata: ParticleBallData;
        creatData(): void;
        setVa(): void;
        setVaCompress(): void;
        resetVa(): void;
        setVc(): void;
        updateWatchCaramMatrix(): void;
        updateAllRotationMatrix(): void;
        readonly particleBallData: ParticleBallGpuData;
    }
}

declare module Pan3d {
    class Display3DBallShader extends Shader3D {
        static Display3D_Ball_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
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
}

declare module Pan3d {
    class ParticleBallData extends ParticleData {
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
        readonly objBallData: ParticleBallGpuData;
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
}

declare module Pan3d {
    class ParticleBallGpuData extends ParticleGpuData {
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
}

declare module Pan3d {
    class BaseDiplay3dShader extends Shader3D {
        static BaseDiplay3dShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class BaseDiplay3dSprite extends Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        update(): void;
    }
}

declare module Pan3d {
    class Display3DLocusPartilce extends Display3DParticle {
        constructor();
        readonly locusdata: ParticleLocusData;
        creatData(): void;
        setVa(): void;
        setVc(): void;
        updateUV(): void;
    }
}

declare module Pan3d {
    class Display3DLocusShader extends Shader3D {
        static Display3D_Locus_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
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
}

declare module Pan3d {
    class ParticleLocusData extends ParticleData {
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
}

declare module Pan3d {
    class Display3DLocusBallPartilce extends Display3DBallPartilce {
        constructor();
        creatData(): void;
    }
}

declare module Pan3d {
    class ParticleLocusballData extends ParticleBallData {
        protected _posAry: Array<number>;
        protected _angleAry: Array<number>;
        protected _tangentAry: Array<number>;
        protected _tangentSpeed: number;
        getParticle(): Display3DParticle;
        initBasePos(): void;
        initSpeed(): void;
        setAllByteInfo($byte: Pan3dByteArray): void;
    }
}

declare module Pan3d {
    class Display3DModelPartilce extends Display3DParticle {
        protected _resultUvVec: Array<number>;
        constructor();
        readonly modeldata: ParticleModelData;
        creatData(): void;
        setVc(): void;
        setVa(): void;
        updateWatchCaramMatrix(): void;
        updateUV(): void;
    }
}

declare module Pan3d {
    class Display3DModelObjParticle extends Display3DModelPartilce {
        protected _depthMode: boolean;
        constructor();
        update(): void;
    }
}

declare module Pan3d {
    class Display3dModelAnimParticle extends Display3DModelPartilce {
        constructor();
        updateUV(): void;
    }
}

declare module Pan3d {
    class ParticleModelData extends ParticleData {
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
}

declare module Pan3d {
    class Display3DFollowPartilce extends Display3DBallPartilce {
        private _bindMatrixAry;
        private _bindFlagAry;
        private flag;
        constructor();
        readonly followdata: ParticleFollowData;
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
}

declare module Pan3d {
    class Display3DFollowShader extends Shader3D {
        static Display3D_Follow_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
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
}

declare module Pan3d {
    class ParticleFollowData extends ParticleBallData {
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: Pan3dByteArray): void;
        regShader(): void;
    }
}

declare module Pan3d {
    class Display3DFollowLocusPartilce extends Display3DParticle {
        protected _bindPosAry: Array<Array<number>>;
        protected _gpuVc: Float32Array;
        protected _caramPosVec: Array<number>;
        constructor();
        readonly followlocusdata: ParticleFollowLocusData;
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
}

declare module Pan3d {
    class Display3DFollowLocusShader extends Shader3D {
        static Display3D_FollowLocus_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
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
}

declare module Pan3d {
    class ParticleFollowLocusData extends ParticleData {
        _fenduanshu: number;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: Pan3dByteArray): void;
        uploadGpu(): void;
        protected pushToGpu(): void;
        initVcData(): void;
        regShader(): void;
    }
}

declare module Pan3d {
    class Display3DBoneShader extends Shader3D {
        static Display3DBoneShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
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
    class Display3DBonePartilce extends Display3DParticle {
        constructor();
        readonly modeldata: ParticleBoneData;
        creatData(): void;
        update(): void;
        private skipNum;
        setVc(): void;
        setVa(): void;
        resetVa(): void;
    }
}

declare module Pan3d {
    class ParticleBoneData extends ParticleData {
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
}

declare module Pan3d {
    class KeyFrame {
        frameNum: number;
        animData: Array<any>;
        baseValue: Array<any>;
        constructor();
    }
}

declare module Pan3d {
    class TimeLineData {
        dataAry: Array<any>;
        maxFrameNum: number;
        beginTime: number;
        destory(): void;
        setByteData($byte: Pan3dByteArray): void;
        addKeyFrame(num: number): KeyFrame;
        private getByteDataTemp;
    }
}

declare module Pan3d {
    class TimeLine extends EventDispatcher {
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
}

declare module Pan3d {
    class BaseAnim {
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
        data: Array<any>;
        isDeath: boolean;
        getAllNum(allTime: number): void;
    }
}

declare module Pan3d {
    class AxisMove extends BaseAnim {
        axis: Vector3D;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}

declare module Pan3d {
    class AxisRotaion extends BaseAnim {
        axis: Vector3D;
        axisPos: Vector3D;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}

declare module Pan3d {
    class ScaleAnim extends BaseAnim {
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
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}

declare module Pan3d {
    class ScaleChange extends BaseAnim {
        maxNum: number;
        minNum: number;
        constructor();
        coreCalculate(): void;
        /**
         *
         * @param value
         *
         */
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
        reset(): void;
        depthReset(): void;
    }
}

declare module Pan3d {
    class ScaleNoise extends BaseAnim {
        amplitude: number;
        coreCalculate(): void;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}

declare module Pan3d {
    class SelfRotation extends BaseAnim {
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}

declare module Pan3d {
    class InteractiveEvent extends BaseEvent {
        static Down: string;
        static Up: string;
        static Move: string;
        static PinchStart: string;
        static Pinch: string;
        x: number;
        y: number;
        data: number;
        roation: number;
        target: any;
        mouseEvent: MouseEvent;
    }
}

declare module Pan3d {
    class TextAlign {
        static LEFT: any;
        static CENTER: any;
        static RIGHT: any;
        static TOP: any;
        static MIDDLE: any;
        static BOTTOM: any;
    }
}

declare module Pan3d {
    class UIAtlas {
        textureRes: TextureRes;
        configData: any;
        layoutData: any;
        ctx: CanvasRenderingContext2D;
        protected _useImgUrl: string;
        useImg: any;
        constructor();
        readonly texture: WebGLTexture;
        setInfo(configUrl: string, imgUrl: string, $fun: Function, useImgUrl?: string): void;
        loadConfig(configUrl: string, $fun: Function): void;
        loadImgUrl(imgUrl: string, $fun: Function): void;
        loadUseImg($fun: Function): void;
        getRec($name: string): UIRectangle;
        getLayoutData($name: string): any;
        getGridRec($name: string): UIGridRentangle;
        readonly hasData: boolean;
        getObject($name: string, $x: number, $y: number, $width: number, $height: number, $maxWidth: number, $maxHeight: number, $cellx?: number, $celly?: number): any;
        updateCtx($ctx: any, xpos: number, ypos: number): void;
        upDataPicToTexture($url: string, $iconName: string): void;
        upDataWebPicToTexture($url: string, $iconName: string): void;
        clearCtxTextureBySkilname($iconName: string): void;
        copyPicToTexture($srcSkin: string, $desSkin: string): void;
        /**
         * 渲染文字
         */
        updateLable($key: string, $str: string, fontsize: number, fontColor: string, textBaseline?: CanvasTextBaseline, textAlign?: CanvasTextAlign, bolder?: boolean, maxWidth?: number): void;
        updateArtNum($targetName: string, $srcName: string, num: number): void;
        writeSingleLabel($key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string): void;
        writeSingleLabelToCxt($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number): void;
        /**
         * 未渲染文字。只是绘制到CanvasRenderingContext2D
         * 返回CanvasRenderingContext2D对象
         */
        updateLableCtx($ctx: CanvasRenderingContext2D, $str: string, $x: number, $y: number, $fontsize: number, $textAlign?: CanvasTextAlign, $textBaseline?: CanvasTextBaseline, $textcolor?: string, $textbolder?: string, $maxWidth?: number): void;
        getTextCtx($rec: UIRectangle, $fontsize: number, $fontColor: string, $bolder: boolean, $textBaseline: CanvasTextBaseline, $textAlign: CanvasTextAlign): CanvasRenderingContext2D;
        private getTextxpos;
        private getTextypos;
        private wrapText;
        _hasDispose: boolean;
        dispose(): void;
    }
}

declare module Pan3d {
    class UIRectangle extends Rectangle {
        pixelWitdh: number;
        pixelHeight: number;
        pixelX: number;
        pixelY: number;
        cellX: number;
        cellY: number;
        type: number;
    }
}

declare module Pan3d {
    class UIGridRentangle extends UIRectangle {
        ogw: number;
        ogh: number;
    }
}

declare module Pan3d {
    class UICompenent extends EventDispatcher {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        z: number;
        data: any;
        absoluteX: number;
        absoluteY: number;
        absoluteWidth: number;
        absoluteHeight: number;
        enable: boolean;
        protected _left: number;
        protected _right: number;
        protected _center: number;
        protected _xType: number;
        protected _top: number;
        protected _bottom: number;
        protected _middle: number;
        protected _yType: number;
        name: string;
        tr: Rectangle;
        renderX: number;
        renderY: number;
        renderWidth: number;
        renderHeight: number;
        uiRender: UIRenderComponent;
        parent: UIConatiner;
        preParent: UIConatiner;
        renderData: Array<number>;
        renderData2: Array<number>;
        mouseEnable: boolean;
        scale: number;
        skinName: string;
        baseRec: any;
        isVirtual: boolean;
        vcId: number;
        protected _uvScale: number;
        private _rendering;
        constructor();
        onRenderingFun: Function;
        unRenderingFun: Function;
        rendering: boolean;
        addStage(): void;
        removeStage(): void;
        isU: boolean;
        isV: boolean;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        setVc(program: any, index: number): void;
        update(): void;
        applyRenderSize(): void;
        uvScale: number;
        setScale(num: number): void;
        applyAbsolutePoint(): void;
        x: number;
        y: number;
        width: number;
        height: number;
        left: number;
        right: number;
        center: number;
        top: number;
        bottom: number;
        middle: number;
        testPoint($x: number, $y: number): boolean;
        setPos($x: number, $y: number): void;
        interactiveEvent(e: InteractiveEvent): boolean;
        preShow(): void;
        preHide(): void;
    }
}

declare module Pan3d {
    class UIConatiner {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        protected _left: number;
        protected _right: number;
        protected _center: number;
        protected _xType: number;
        protected _top: number;
        protected _bottom: number;
        protected _middle: number;
        protected _yType: number;
        perent: any;
        protected _list: Array<UICompenent>;
        renderList: Array<UIRenderComponent>;
        protected _maskList: Array<UIMask>;
        private _hasStage;
        virtualContainerList: Array<UIVirtualContainer>;
        private _hasLoad;
        private _completeFun;
        private _isLoading;
        private _needShowLoading;
        private _interfaceUI;
        private _layer;
        private _uiScale;
        uiScale: number;
        layer: number;
        interfaceUI: boolean;
        constructor();
        load($complateFun: Function, $needShowLoading?: boolean): void;
        readonly hasLoad: boolean;
        protected makeBaseWinUi(): void;
        applyLoad(): void;
        uiLoadComplete: boolean;
        applyLoadComplete(): void;
        hasStage: boolean;
        setUiListVisibleByItem($arr: Array<UICompenent>, $flag: boolean): void;
        onAdd(): void;
        onRemove(): void;
        addChild($ui: UICompenent): UICompenent;
        addVirtualContainer($con: UIVirtualContainer): void;
        removeVirtualContainer($con: UIVirtualContainer): void;
        addUIList($ary: Array<string>, $uiRender: UIRenderComponent): Array<UICompenent>;
        getUIList($ary: Array<string>, $uiRender: UIRenderComponent): Array<UICompenent>;
        addEvntBut($name: string, $uiRender: UIRenderComponent): any;
        addEvntButUp($name: string, $uiRender: UIRenderComponent): any;
        protected removeEvntBut($ui: UICompenent): void;
        protected butClik(evt: InteractiveEvent): void;
        protected renderSetVisibel($list: Array<UIRenderComponent>, value: boolean): void;
        removeChild($ui: UICompenent): void;
        removeAll(): void;
        addMask($mask: UIMask): void;
        removeMaks($mask: UIMask): void;
        addRender($uiRender: UIRenderComponent): void;
        addRenderAt($uiRender: UIRenderComponent, $idx: number): void;
        removeRender($uiRender: UIRenderComponent): void;
        readonly panelScale: number;
        resize(): void;
        resizeVirtualList(): void;
        left: number;
        right: number;
        center: number;
        top: number;
        bottom: number;
        middle: number;
        width: number;
        height: number;
        applyChild(): void;
        x: number;
        y: number;
        dispose(): void;
        setSizeForPanelUiCopy($ui: UICompenent, $uiName: string, $uiRender: UIRenderComponent): void;
        protected makeBaseUiatlas(w: number, h: number): UIAtlas;
    }
    class Dis2DUIContianerBase extends UIConatiner {
        constructor();
        update(t: number): void;
        clearOneTemp(): void;
    }
}

declare module Pan3d {
    class UIVirtualContainer extends UIConatiner {
        parent: UIConatiner;
        visible: boolean;
    }
}

declare module Pan3d {
    class MainUiLoad {
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _itemLoad;
        private static loadBaseConfigCom;
        private static loadOkNum;
        private static _dic;
        private static _imgDic;
        private static loadUIdata;
        static loadOkd(): void;
    }
    class UIData {
        static designWidth: number;
        static designHeight: number;
        static font: string;
        static Scale: number;
        static setDesignWH($width: number, $height: number): void;
        static resize(): void;
        static textImg: any;
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _listUIRenderComponent;
        static readonly mainUIAtlas: UIAtlas;
        private static _itemLoad;
        private static loadBaseConfigCom;
        private static loadOkNum;
        static textlist: string;
        static publicUi: string;
        static faceItem: Array<string>;
        private static _dic;
        private static _imgDic;
        private static loadUIdata;
        static loadOkd(): void;
        static getImgByKey($key: string): HTMLImageElement;
        static getUiByName($key: string, $name: string): Object;
        static getUiArrByKey($key: string): any;
    }
    class UiDraw {
        static drawUseImg($ui: UICompenent, $useImgAtlas: UIAtlas, $skinName: string): void;
        static clearUI($ui: UICompenent): void;
        static drawTxtLab($ui: UICompenent, $str: string, $fontsize: number, $align: string, $tx?: number, $ty?: number): void;
        /**属性 - value */
        static drawAttVal($ui: UICompenent, $att: number, $val: number, $align?: string, $needadd?: boolean): void;
        /**绘制未获得属性 - value */
        static drawAttValAdd($ui: UICompenent, $att: number, $val: number): void;
        /**绘制增加属性 向上箭头 */
        static drawAddValTop($ui: UICompenent, $val: number): void;
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        static drawAddValRight($ui: UICompenent, $val: number, $needadd?: boolean, $align?: string): void;
        /**
         * 绘制需 自身有某id的道具多少个和需要多少数量的道具  a/b
         * @param
         * @param
         * @param
         */
        static drawResHasNumAndAllNum($ui: UICompenent, $CostAry: Array<number>, $txt?: string): boolean;
        /**
         * 在ctx上指定位置绘制一个小图标
         * @param
         * @param
         */
        static drawCost($cxt: CanvasRenderingContext2D, $tx: number, $ty: number, $type: number): void;
        static drawCostUI($ui: UICompenent, $tx: number, $ty: number, $type: number): void;
        static cxtDrawImg($cxt: CanvasRenderingContext2D, $name: any, $rect: Rectangle, $key: string): void;
        static uiAtlasDrawImg($uiAtlas: UIAtlas, $skinName: string, $key: string, $shareName: string): void;
        /**
         * 将共享资源图绘制到$uiAtlas纹理对象中
         * $touiAtlas：绘制到的uiAtlas对象
         * $fromuiAtlas: 资源来源的uiAtlas对象
         * $skinName: 绘制对象名
         * $shareName：资源名
         * $tx：偏移量x
         * $ty：偏移量y
         * $fillflag：是否填充整个对象，若填充，则考虑偏移量，否则反之
         */
        static SharedDrawImg($touiAtlas: UIAtlas, $fromuiAtlas: UIAtlas, $skinName: string, $shareName: string, $tx?: number, $ty?: number, $fillflag?: boolean): void;
        static drawToUiAtlasToCtx($ctx: CanvasRenderingContext2D, $fromuiAtlas: UIAtlas, $shareName: string, $posRect: Rectangle): void;
        static RepeatLoadImg($url1: string, $url2: string, $backFuc?: Function): void;
    }
    class UIuitl {
        private static _instance;
        static getInstance(): UIuitl;
        constructor();
        /**
         * 绘制背景图+资源icon+资源数目
         */
        drawCostUI($uiAtlas: UIAtlas, $skinName: string, $costary: Array<any>, $fontcolor?: string, $bgwidth?: number, $bgheight?: number): void;
        costtype($costid: number): string;
    }
}

declare module Pan3d {
    class UIRenderComponent {
        protected _uiList: Array<UICompenent>;
        readonly uiListLen: number;
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        textureRes: TextureRes;
        container: UIConatiner;
        uiAtlas: UIAtlas;
        private _rendering;
        mask: UIMask;
        modelRenderList: Array<Display3D>;
        name: string;
        scale: number;
        sortnum: number;
        blenderMode: number;
        constructor();
        rendering: boolean;
        readonly texture: WebGLTexture;
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void;
        resize(): void;
        setImgUrl($url: string): void;
        setInfo(configUrl: string, imgUrl: string, $fun: Function): void;
        setAtlas($atlas: UIAtlas): void;
        creatComponent($tx: number, $ty: number, $tw: number, $th: number): UICompenent;
        getComponent($uiName: string): UICompenent;
        createFrame($upskin: string): FrameCompenent;
        creatBaseComponent($skinName: string): UICompenent;
        creatGrid9Component($skinName: string, $width: number, $height: number): Grid9Compenent;
        creatButton($upskin: string, $downskin: string): Button;
        createSelectButton($upskin: string, $selectedskin: string): SelectButton;
        addRenderUI(ui: UICompenent): void;
        removeRenderUI(ui: UICompenent): void;
        applyObjData(): void;
        protected renderData: Float32Array;
        protected renderData2: Float32Array;
        makeRenderDataVc($vcId: number): void;
        private num;
        visible: boolean;
        update(): void;
        protected setTextureToGpu(): void;
        setVc(): void;
        addModel($display: Display3D): void;
        removeModel($display: Display3D): void;
        insetUi($e: Vector2D): UICompenent;
        interactiveEvent($e: InteractiveEvent): boolean;
        dispose(): void;
    }
}

declare module Pan3d {
    class UIListRenderComponent extends UIRenderComponent {
        constructor();
        createList(): List;
        createGridList(): GridList;
    }
}

declare module Pan3d {
    class UIBackImg extends UIRenderComponent {
        constructor();
        private _width;
        private _height;
        private _wScale;
        private _hScale;
        private _scaleData;
        private _isFBO;
        alpha: number;
        protected initData(): void;
        resize(): void;
        setImgInfo($url: string, $width: number, $height: number): void;
        appleyPos(): void;
        setFbo(): void;
        update(): void;
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class UIRenderOnlyPicComponent extends UIRenderComponent {
        constructor();
        makeRenderDataVc($vcId: number): void;
        update(): void;
        protected setTextureToGpu(): void;
        dispose(): void;
    }
}

declare module Pan3d {
    class UIMask {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        absoluteX: number;
        absoluteY: number;
        absoluteWidth: number;
        absoluteHeight: number;
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        renderData: Array<number>;
        parent: UIConatiner;
        scale: number;
        level: number;
        constructor();
        protected initData(): void;
        applyAbsolutePoint(): void;
        testPoint($x: number, $y: number): boolean;
        applyRenderSize(): void;
        applyObjData(): void;
        update(): void;
        x: number;
        y: number;
        width: number;
        height: number;
        private _hasDisposed;
        dispose(): void;
    }
}

declare module Pan3d {
    class BaseButton extends UICompenent {
        trDown: Rectangle;
        protected _state: number;
        protected _currentState: number;
        constructor();
        update(): void;
        applyRenderSize(): void;
    }
}

declare module Pan3d {
    class Button extends BaseButton {
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}

declare module Pan3d {
    class SelectButton extends BaseButton {
        private _selected;
        constructor();
        selected: boolean;
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}

declare module Pan3d {
    class Grid9Compenent extends UICompenent {
        ogw: number;
        ogh: number;
        gw: number;
        gh: number;
        constructor();
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
}

declare module Pan3d {
    class FrameCompenent extends UICompenent {
        constructor();
        setFrameData($rect: UIRectangle): void;
        applyRenderSize(): void;
        getSkinCtxRect(): Rectangle;
        drawToCtx($uiAtlas: UIAtlas, $ctx: CanvasRenderingContext2D): void;
        private _frameData;
        private isTrue;
        current: number;
        totalcurrent: number;
        speed: number;
        endFlag: boolean;
        update(): void;
        goToAndPlay($num: number): void;
        goToAndStop($num: number): void;
        Invisible(): void;
        play(): void;
        stopEnd(): void;
        stopStatic: number;
        speedNum: number;
    }
}

declare module Pan3d {
    class List extends UICompenent {
        protected _itemRenderAry: Array<ListItemRender>;
        private _contentX;
        private _contentY;
        protected _showHeight: number;
        protected _showWidth: number;
        protected _oHeight: number;
        protected _needScoller: boolean;
        protected _itemWidth: number;
        protected _itemHeight: number;
        constructor();
        applyAbsolutePoint(): void;
        contentX: number;
        contentY: number;
        testPoint($x: number, $y: number): boolean;
        setData($data: Array<ListItemData>, ItemRender: any, itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number, $width?: number, $height?: number): void;
        refresh(): void;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        private _ypos;
        protected onDown(event: InteractiveEvent): void;
        protected onListUp(event: InteractiveEvent): void;
        protected testItemClick($xPos: number, $ypos: number): void;
        private lastcontentY;
        protected onMove(event: InteractiveEvent): void;
        protected onUp(event: InteractiveEvent): void;
    }
    class ListAtlas extends UIAtlas {
        constructor();
        setData($width: number, $height: number, itemWidth: number, itemHeight: number, itemNum: number): void;
    }
    class ListItemData {
        id: number;
        data: any;
        clickFun: Function;
        clickRect: Rectangle;
        itemRender: ListItemRender;
    }
    class ListItemRender {
        height: number;
        widht: number;
        protected _listItemData: ListItemData;
        uvData: any;
        atlas: ListAtlas;
        _selected: boolean;
        setData($listItemData: ListItemData, $atlas: ListAtlas, $uvData: any): void;
        readonly listItemData: ListItemData;
        setNewData($data: any): void;
        selected: boolean;
        draw(): void;
        redraw(): void;
        click(xpos: number, ypos: number): void;
    }
}

declare module Pan3d {
    class SList extends UIVirtualContainer {
        protected _baseX: number;
        protected _baseY: number;
        protected _contentX: number;
        protected _contentY: number;
        protected p_scrollY: number;
        protected p_scrollX: number;
        protected _itemList: Array<SListItem>;
        protected p_itemHeight: number;
        protected p_itemWidth: number;
        protected _showIndexList: Array<number>;
        protected _dataAry: Array<SListItemData>;
        protected _showItemNum: number;
        protected _allItemNum: number;
        protected _topSize: number;
        protected _bottomSize: number;
        protected _outSize: number;
        protected _showDataIndex: number;
        protected _bgRender: SListBgRender;
        protected _baseRender: SlistFrontRender;
        protected customRenderAry: Array<UIRenderComponent>;
        protected _sAtlas: SListAtlas;
        baseAtlas: UIAtlas;
        protected bgMask: UIMask;
        protected scrollLock: boolean;
        protected _minScrollY: number;
        protected _maskLevel: number;
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number, contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum?: number): void;
        initComplte(): void;
        /**显示层级 */
        setShowLevel($num: number): void;
        private _currentSelIdx;
        setSelect($item: SListItem): void;
        setSelectIndex($index: number): void;
        getCurrentSelectIndex(): number;
        changeMinScrollY(): void;
        refreshData($data: Array<SListItemData>): void;
        setItemData($data: any, $idx: number): void;
        clearItemByPos($idx: number): void;
        getDataSize(): number;
        refreshDraw(): void;
        scroll(): void;
        interactiveEvent($e: InteractiveEvent): boolean;
        private _mouseY;
        onMove($e: InteractiveEvent): void;
        onUp($e: InteractiveEvent): void;
        backFun: Function;
        protected _topflag: boolean;
        protected _bottomflag: boolean;
        /**拖动刷新 */
        protected _dragFlag: boolean;
        protected _dragY: number;
        protected _dragMaxY: number;
        protected _dragUpFun: Function;
        protected _dragDownFun: Function;
        /**设置翻页拖动 */
        setDragFun(upFun: Function, downFun: Function): void;
        dragY: number;
        scrollIdx(idx: number): void;
        getIdxY(idx: number): number;
        getIdxX(idx: number): number;
        scrollY(val: number): void;
        refreshResultPos(): void;
        dispose(): void;
    }
    class SListItem {
        private _height;
        itdata: SListItemData;
        private _list;
        index: number;
        baseY: number;
        baseX: number;
        uiAtlas: SListAtlas;
        protected _selected: boolean;
        parentTarget: SList;
        _bgRender: UIRenderComponent;
        _baseRender: UIRenderComponent;
        _customRenderAry: Array<UIRenderComponent>;
        addUI($ui: UICompenent): void;
        create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry?: Array<UIRenderComponent>): void;
        render($data: SListItemData): void;
        refreshDraw(): void;
        setSelect(): void;
        unSetSelect(): void;
        selected: boolean;
        creatSUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string, x: number, y: number, width: number, height: number): UICompenent;
        private creatGrid9Component;
        creatGrid9SUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string, x: number, y: number, width: number, height: number, WW?: number, WH?: number): UICompenent;
        getHeight(): number;
        setItemUiX(ui: UICompenent, xpos: number): void;
        _sy: number;
        setY($sy: number): void;
        _sx: number;
        setX($sx: number): void;
    }
    class SListItemData {
        data: any;
        resdata: any;
        id: number;
        selected: boolean;
        click: Function;
    }
    class SListBgRender extends UIRenderComponent {
        slist: SList;
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class SlistFrontRender extends UIRenderComponent {
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class SListAtlas extends UIAtlas {
        constructor();
        xNum: number;
        yNum: number;
        width: number;
        height: number;
        itemHeight: number;
        itemWidth: number;
        setData($width: number, $height: number, $xnum: number, $ynum: number): void;
        addConfig($name: string, $index: number, $baseRec: any): void;
    }
    /**
     * 带特效的list
     */
    class EffectSlist extends SList {
        private _effRender;
        effList: Array<FrameTipCompenent>;
        setEffectUrl($name: string, $wnum: number, $hNum: number, num?: number): void;
        initComplte(): void;
        effectComplte(): void;
        refreshResultPos(): void;
        playEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed?: number): void;
        effplay($effui: FrameTipCompenent): void;
        showEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed?: number): void;
        hideEffect($id?: number): void;
        dispose(): void;
    }
    /**
     * 横向单行滑动的Slist
     */
    class TransverseSList extends EffectSlist {
        private _minScrollX;
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number, contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum?: number): void;
        changeMinScrollX(): void;
        refreshData($data: Array<SListItemData>): void;
        interactiveEvent($e: InteractiveEvent): boolean;
        private _mouseX;
        onMove($e: InteractiveEvent): void;
        onUp($e: InteractiveEvent): void;
        scrollX(val: number): void;
        scrollIdx(idx: number): void;
        refreshResultPos(): void;
    }
}

declare module Pan3d {
    class GridList extends List {
        private wNum;
        constructor();
        testPoint($x: number, $y: number): boolean;
        setGridData($data: Array<ListItemData>, ItemRender: any, $wNum: number, itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number, $width?: number, $height?: number): void;
        setGridItemData($data: any, $idx: number): boolean;
        setGridItemFun($fun: Function, $idx: number): void;
        clearItemByIndex($idx: number): void;
        clearItemByPos($pos: number): void;
        redraw(): void;
        protected testItemClick($xPos: number, $ypos: number): void;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
    class GridListAtlas extends ListAtlas {
        private getAlphaImg;
        setGridData($width: number, $height: number, itemWidth: number, itemHeight: number, wNum: number, itemNum: number): void;
    }
}

declare module Pan3d {
    class CdRenderComponent extends UIRenderComponent {
        constructor();
        setVc(): void;
        protected dataTProLocation: WebGLUniformLocation;
        private initProgram;
        getComponent($uiName: string): UICompenent;
        creatBaseComponent($skinName: string): CdUICompenent;
    }
    class CdUICompenent extends UICompenent {
        constructor();
        cdTotalnum: number;
        lastTime: number;
        private _skipNum;
        isRound: boolean;
        visible: boolean;
        setCdNum(value: number): void;
        readonly isFinish: boolean;
        update(): void;
        clockwise: boolean;
        setVc(program: any, index: number): void;
    }
}

declare module Pan3d {
    class Disp2DBaseText {
        ui: UICompenent;
        textureStr: string;
        parent: UIRenderComponent;
        voRect: Rectangle;
        protected dtime: number;
        protected time: number;
        protected _data: any;
        protected lastKey: any;
        protected oldPos: Vector2D;
        constructor();
        protected needUpData($pos: Vector3D): boolean;
        rightTabInfoVo: any;
        makeData(): void;
        update(): void;
        Vector3DToVector2D($pos: any): Vector2D;
        isEqualLastKey(value: any): boolean;
    }
    class Dis2DUIContianerPanel extends Dis2DUIContianerBase {
        protected _baseRender: UIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
        private initData;
        private mathSize;
        private _textureRect;
        private _voNum;
        private _voRect;
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<Pan3d.baseMeshVo>;
        private makeBaseUi;
        showTemp($data: any): Disp2DBaseText;
        private clearLostItem;
        playLost(): void;
        clearOneTemp(): void;
        clearTemp($data: any): void;
        getVoByData(value: any): Disp2DBaseText;
        getVoByUi($ui: UICompenent): Disp2DBaseText;
        clearAll(): void;
        private updateFun;
        update(t: number): void;
        getUiItemLen(): number;
    }
}

declare module Pan3d {
    class AlphaUIShader extends Shader3D {
        static AlphaUiShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class AlphaUIRenderComponent extends UIRenderComponent {
        constructor();
        update(): void;
        protected alphaLocation: WebGLUniformLocation;
        protected initData(): void;
        creatBaseComponent($skinName: string): AlphaUICompenent;
        creatGrid9Component($skinName: string, $width: number, $height: number): AlphaGrid9UICompenent;
        createFrame($upskin: string): AlphaFrameCompenent;
    }
    class AlphaFrameCompenent extends FrameCompenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaGrid9UICompenent extends Grid9Compenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaUICompenent extends UICompenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaUiContianer extends Dis2DUIContianerPanel {
        protected _baseRender: AlphaUIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
    }
}

declare module Pan3d {
    class RoationUIShader extends Shader3D {
        static RoationUiShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class FrameUIRender extends UIRenderComponent {
        constructor();
        setImg(url: string, wNum: number, hNum: number, fun: Function, num?: number): void;
        update(): void;
        getFrameTipComponent(wNum: number, hNum: number): FrameTipCompenent;
    }
    class FrameTipCompenent extends FrameCompenent {
        constructor();
        playOne($container: UIConatiner): void;
        updateEnd(): void;
    }
}

declare module Pan3d {
    class IconManager {
        private static _instance;
        static getInstance(): IconManager;
        private _dic;
        private _loadDic;
        constructor();
    }
}

declare module Pan3d {
    class UiTweenVo {
        private _ui;
        private _scale;
        private _baseRect;
        ui: UICompenent;
        scale: number;
        destory(): void;
        private static baseUIConatiner;
        static getPosByPanel($v2d: Vector2D, $layout?: any, $toUIConatiner?: UIConatiner): Vector2D;
    }
    class UiTweenScale {
        private static _instance;
        static getInstance(): UiTweenScale;
        constructor();
        private _uiTweenVo;
        changeButSize($ui: any): void;
        private changeButScale;
        private changeButEnd;
    }
    class UIManager {
        static cando: boolean;
        static popClikNameFun: Function;
        private static _instance;
        static getInstance(): UIManager;
        static uiClikName($name: string, $id: number): void;
        private _uiList;
        _containerList: Array<UIConatiner>;
        private _ctx;
        private _canvas;
        constructor();
        getContext2D($width: number, $height: number, alianDefault?: boolean): CanvasRenderingContext2D;
        getGrayImageDatabyImg($img: any): ImageData;
        makeCtxToGray($ctx: CanvasRenderingContext2D, $rect: Rectangle): void;
        showCanvas($x?: number, $y?: number): void;
        init(): void;
        addUI($ui: UIRenderComponent): void;
        removeUI($ui: UIRenderComponent): void;
        addUIContainer($container: UIConatiner): void;
        removeAll(): void;
        removeUIContainer($container: UIConatiner): void;
        hasWindowUI(): boolean;
        removeNoInterfaceUI(): void;
        resize(): void;
        upBgGroundZero(): void;
        update(): void;
        regEvent($touce: any): void;
        private onTouch;
        private onMouse;
        private lastSwipeDis;
        private lastSwipeRot;
        interactiveEvent($e: any): void;
        private lastMousePos;
        disMoveNnum(v2d: Vector2D, $num: number): boolean;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
        private _eventItem;
        private setUseMouseEventCon;
        getObjectsUnderPoint(evt: Vector2D): UICompenent;
        private getcurrentList;
        private lastTime;
    }
}

declare module Pan3d {
    class UILoading extends UIConatiner {
        private static _instance;
        static getInstance(): UILoading;
        constructor();
        private _ui;
        private atls;
        private _render;
        initData(): void;
        private loadCom;
        show(): void;
        hide(): void;
    }
}

declare module Pan3d {
    class UIStage extends EventDispatcher {
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}

declare module Pan3d {
    class PuiData {
        /** 方形高亮64*64 */
        static A_HIGHT_F: string;
        /** tab高亮边框10*10 */
        static TAB_HIGHT: string;
        /** 圆形高亮75*75 */
        static A_HIGHT_C: string;
        /** 关闭按钮43*41 */
        static A_DELETEBTN: string;
        /** 真气图标27*27 */
        static A_ZHENQI: string;
        /** 兽灵图标27*27 */
        static A_SHOULING: string;
        /** 精华图标27*27 */
        static A_JINGHUA: string;
        /** 箭头36*44 */
        static A_JIANTOU: string;
        /** 物品框44*44 */
        static A_WUPINKUANG: string;
        /** 圆形黑框69*69 */
        static A_BLACK_C: string;
        /** 方形黑框64*64 */
        static A_BLACK_F: string;
        /** 黑色星星28*28 */
        static A_BLACK_START: string;
        /** 亮色星星28*28 */
        static A_HIGHT_START: string;
        /** 圆形头像底色71*71 */
        static A_BLACK_BASE: string;
        /** 红点17*16 */
        static A_RED_POINT: string;
        /** 银币25*23 */
        static A_YINBI: string;
        /** 元宝25*23 */
        static A_YUANBAO: string;
        /** 帮贡25*25 */
        static A_BANGGONG: string;
        /** 斗魂25*25 */
        static A_DOUHUN: string;
        /** 经验25*25 */
        static A_EXP: string;
        /** 荣誉25*25 */
        static A_HONOR: string;
        /** 绑定元宝25*23 */
        static A_BANGYUAN: string;
        /** 右边括号25*19 */
        static A_RIGHT_XING: string;
        /** 单独一个星字18*19 */
        static A_SSTART: string;
        /** 左边括号8*19 */
        static A_LEFT_XING: string;
        /** 武器紫色62*62 */
        static A_GOODS_PURPLE: string;
        /** 武器蓝色62*62 */
        static A_GOODS_BLUE: string;
        /** 武器红色62*62 */
        static A_GOODS_RED: string;
        /** 武器绿色62*62 */
        static A_GOODS_GREEN: string;
        /** 武器白色62*62 */
        static A_GOODS_WHITE: string;
        /** 武器橙色62*62 */
        static A_GOODS_ORANGE: string;
        /** 金星背景24*23 */
        static A_START_BG: string;
        /** 金星24*23 */
        static A_START: string;
        /** 链条65*65 */
        static A_CHAIN: string;
        /** 已装备26*56 */
        static A_OK: string;
        /** 前往按钮78*46 */
        static A_QIANWANG: string;
        /** T左31*62 */
        static T_LEFT: string;
        /** T中8*62 */
        static T_MID: string;
        /** T右60*62 */
        static T_RIGHT: string;
        /** E左31*62 */
        static E_LEFT: string;
        /** E中8*62 */
        static E_MID: string;
        /** E右60*62 */
        static E_RIGHT: string;
        /** F左31*62 */
        static F_LEFT: string;
        /** F中8*62 */
        static F_MID: string;
        /** F右60*62 */
        static F_RIGHT: string;
        /** 22*22的物品框 */
        static A_F_22: string;
        /** 66*66的人物头像框 */
        static A_BLACK_BASE_66: string;
        /** 66*66的人物头像框亮 */
        static A_HIGHR_C_66: string;
        /** 22*19Vip的V */
        static A_V: string;
        /** 8*8赠送物品格的背景 */
        static A_GIVING_BG: string;
        /** 24*24减号 */
        static B_SUB: string;
        /** 90*90家族头像底框 */
        static A_FACTION_ICON: string;
        /** 30*30选中勾选框 */
        static SELECT_1: string;
        /** 30*30未选中勾选框 */
        static SELECT_0: string;
        /** 15*16排行榜用到的阶字 */
        static A_JIE: string;
        /** 15*16排行榜用到的星字 */
        static A_XING: string;
        /** 系统提示文字北京 */
        static T_tips_txt_bg: string;
        /** Item底51*51 */
        static ITEMBG: string;
        /** 左边任务背景 */
        static A_quest_top: string;
        static A_quest_mid: string;
        static A_quest_bottom: string;
        /** 左边任务<主> */
        static A_quest_ion0: string;
        /** 左边任务<支> */
        static A_quest_ion1: string;
        /** 左边任务<奇> */
        static A_quest_ion2: string;
        /** 左边任务<活> */
        static A_quest_ion3: string;
        /** 左边任务<完成> */
        static A_quest_finish: string;
        static S_sys_tip0: string;
        static S_sys_tip1: string;
        /** 站力文字 */
        static A_zhanli_label: string;
        static A_gou: string;
        static A_cha: string;
        /** 战斗飘字 50*25 */
        static TYPE3: string;
        static TYPE5: string;
        static TYPE9: string;
        static TYPE7: string;
        static B_ZHUFUZHI: string;
        static B_DABAOJI: string;
        static B_XIAOBAOJI: string;
        static B_JINGYAN: string;
        static NewPicBg: string;
        static Select: string;
        static CostBg: string;
        static BG2: string;
        static PropBg40: string;
        static PropBg60: string;
        static PropBg100: string;
        static REWARD_BG1: string;
        static SKILL_BG68: string;
        static SKILL_BG58: string;
        static BG6: string;
        static Slist_nselect: string;
        static Slist_select: string;
        static TXTBG: string;
        static ARROW_TOP: string;
        static ARROW_RIGHT: string;
        static MASK: string;
        static BTNADD: string;
        static BOSSBG76: string;
        static BOSSBG64: string;
        static CIRCL74: string;
        static LISTITEMBG: string;
        static ADDITEM: string;
        static HASSEL: string;
        static SKILL_LEV_BG: string;
        static TITLEBG: string;
        static TITLEHIGHT: string;
        static NEWLISTITEMBG: string;
        static CHATBG: string;
        static ITEMBIGBG: string;
        static I1bg_2: string;
        static I1bg_1: string;
        static ARROWUP: string;
        static ARROWDOWN: string;
        static A_EQULEVBG: string;
        static DISABLE: string;
        static EQUBG: string;
        static RESLISTBG: string;
        static A_CARD_C: string;
        static A_CARD_G: string;
        static A_CARD_B: string;
        static RESBG: string;
        static STATEUP_LISTBG: string;
        static A_LEAGUELISTBG: string;
        static TEAMLISTBG: string;
        static A_JJ0: string;
        static A_JJ1: string;
        static A_JJ2: string;
        static A_JJ3: string;
        static A_JJ4: string;
        static A_JJ5: string;
        static A_JJ6: string;
        static A_JJ7: string;
        static A_JJ8: string;
        static A_JJ9: string;
        static A_JJ10: string;
    }
}

declare module Pan3d {
    class TextureRes extends ResCount {
        texture: WebGLTexture;
        width: number;
        height: number;
        destory(): void;
    }
}

declare module Pan3d {
    class TextureManager extends ResGC {
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
        getCanvasTexture(ctx: CanvasRenderingContext2D, $wrap?: number, $filter?: number, $mipmap?: number): TextureRes;
        getImageDataTexture(imgdata: any): WebGLTexture;
        getTextureRes($img: any): TextureRes;
        updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void;
        loadCubeTexture($url: string, $fun: Function): void;
        loadTextureCom($img: any, _info: TextureLoad): void;
        initDefaultLightMapTexture(): void;
        gc(): void;
    }
    class TextureLoad {
        fun: Function;
        info: any;
        url: string;
        wrap: number;
        filter: number;
        mipmap: number;
        constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number);
    }
    class CubemapLoad {
        private ary;
        private fun;
        private flagNum;
        loadCube($url: string, $fun: Function): void;
        static makeTempCubeTextture($img: HTMLImageElement): WebGLTexture;
        loadCom($img: HTMLImageElement, $info: any): void;
    }
}

/**
*
*
* pramaType 0 表示无类型 1表示 float 2表示 vec2 3表示vec3
*/
declare module Pan3d {
    class ConstItem {
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
        id: number;
        creat($vc: Float32Array): void;
        setData(obj: any): void;
        setDynamicOffset($dynamic: DynamicBaseConstItem): void;
        setDynamicDirect($ary: Array<number>, $offset: any): void;
        setDynamic($dynamic: DynamicBaseConstItem): void;
    }
}

declare module Pan3d {
    class TexItem {
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
        id: number;
        readonly texture: WebGLTexture;
        static LIGHTMAP: number;
        static LTUMAP: number;
        static CUBEMAP: number;
        static HEIGHTMAP: number;
        static REFRACTIONMAP: number;
    }
}

declare module Pan3d {
    class TextureCube extends TexItem {
        cubeTextWebgl: WebGLTexture;
    }
}

declare module Pan3d {
    class Material extends ResCount {
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
}

declare module Pan3d {
    class MaterialManager extends ResGC {
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
}

declare module Pan3d {
    class DynamicBaseConstItem {
        target: ConstItem;
        paramName: string;
        currentValue: Array<number>;
        targetOffset: number;
        protected _type: number;
        update(t?: number): void;
        type: number;
        setTargetInfo($target: ConstItem, $paramName: string, $type: number): void;
        setCurrentVal(...args: any[]): void;
    }
}

declare module Pan3d {
    class DynamicBaseTexItem {
        target: TexItem;
        paramName: string;
        textureRes: TextureRes;
        destory(): void;
        readonly texture: WebGLTexture;
    }
}

declare module Pan3d {
    class MaterialBaseParam extends GC {
        material: Material;
        dynamicTexList: Array<any>;
        dynamicConstList: Array<any>;
        destory(): void;
        update(): void;
        setData($material: Material, $ary: Array<any>): void;
    }
}

declare module Pan3d {
    class MaterialParam extends MaterialBaseParam {
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
}

declare module Pan3d {
    class DynamicConstItem extends DynamicBaseConstItem {
        curve: Curve;
        update(t?: number): void;
        type: number;
    }
}

declare module Pan3d {
    class DynamicTexItem extends DynamicBaseTexItem {
        url: string;
        private _textureDynamic;
        isParticleColor: boolean;
        curve: Curve;
        private _life;
        constructor();
        destory(): void;
        initCurve($type: number): void;
        readonly texture: WebGLTexture;
        creatTextureByCurve(): void;
        life: number;
    }
}

declare module Pan3d {
    class QuadTreeNode {
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
    class Ray {
        o: Vector3D;
        d: Vector3D;
        baseT: number;
        setPos(x: number, y: number, z: number): void;
        setTarget(x: number, y: number, z: number): void;
    }
}

declare module Pan3d {
    class SceneQuadTree {
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
}

declare module Pan3d {
    class ViewFrustum {
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
}

declare module Pan3d {
    class SceneManager {
        cam3D: Camera3D;
        viewMatrx3D: Matrix3D;
        focus3D: Object3D;
        static _instance: any;
        static getInstance(): SceneManager;
        readonly displayList: Array<Display3D>;
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
        readonly displayRoleList: Array<Display3dMovie>;
        readonly displaySpriteList: Array<Display3DSprite>;
        clearScene(): void;
        clearStaticScene(): void;
        testUrl($url: string): boolean;
        loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void;
        private addSceneImgBg;
        getDisplayByID($type: number, $id: number): any;
        fixAstart(pos: Vector2D): void;
        loadSceneConfigCom(obj: any): void;
        private getGroundSprite;
        private makeCollisioin;
        ready: boolean;
        private getBuildSprite;
        private getParticleSprite;
        private initScene;
        addDisplay($display: Display3D, idx?: number): void;
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
        static mapQudaTreeDistance: number;
        test: boolean;
        update(): void;
        addDisplay2DList($dis: Display3D): void;
        private mathCamFar;
        protected updateStaticDiplay(): void;
        protected updateStaticBind(): void;
        protected updateSpriteDisplay(): void;
        protected updateMovieDisplay(): void;
        protected updateMovieFrame(): void;
    }
}

declare module Pan3d {
    class SkillManager extends ResGC {
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
    class ShockUtil {
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
}

declare module Pan3d {
    class Skill extends ResCount {
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
        setendParticleRoation($vect3d: Vector3D): void;
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
}

declare module Pan3d {
    class SkillData extends ResCount {
        data: any;
        private srcList;
        srcOutAry: Array<Skill>;
        addSrcSkill($skill: Skill): void;
        destory(): void;
        testDestory(): boolean;
    }
}

declare module Pan3d {
    class SkillVo {
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
    class SkillType {
        static TrajectoryDynamicTarget: number;
        static FixEffect: number;
        static TrajectoryDynamicPoint: number;
    }
}

declare module Pan3d {
    class SkillKeyVo {
        frame: number;
        url: string;
        setData($data: any): void;
    }
    class SkillShockVo {
        time: number;
        lasttime: number;
        amp: number;
        setData($data: any): void;
    }
    class SkillFixEffectKeyVo extends SkillKeyVo {
        pos: Vector3D;
        rotation: Vector3D;
        hasSocket: boolean;
        socket: string;
        setData($data: any): void;
    }
    class SkillTrajectoryTargetKeyVo extends SkillKeyVo {
        beginType: number;
        beginSocket: string;
        beginPos: Vector3D;
        hitSocket: string;
        endParticleUrl: string;
        speed: number;
        multype: number;
        setData($data: any): void;
    }
}

declare module Pan3d {
    class SkillKey {
        time: number;
        particle: CombineParticle;
        removeCallFun: Function;
        constructor();
        addToRender(): void;
        setInfo(obj: SkillKeyVo): void;
        reset(): void;
        destory(): void;
    }
}

declare module Pan3d {
    class SkillEffect extends SkillKey {
        active: Object3D;
        addToRender(): void;
        protected onPlayCom(event?: Event): void;
    }
}

declare module Pan3d {
    class SkillBugBind implements IBind {
        bindMatrix: Matrix3D;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
    class SkillFixEffect extends SkillEffect {
        pos: Vector3D;
        rotation: Vector3D;
        outPos: Vector3D;
        hasSocket: boolean;
        socket: string;
        setInfo(obj: SkillKeyVo): void;
        addToRender(): void;
    }
}

declare module Pan3d {
    class SkillTrajectory extends SkillKey implements IBind {
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
}

declare module Pan3d {
    class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
        activeList: Array<Object3D>;
        currentPosList: Array<Vector3D>;
        pathMul: SkillMulPath;
        update(t: number): void;
        getSunType(): number;
        addToRender(): void;
        setMulPlayData($activeList: Array<Object3D>, $target: Object3D, $removeCallFun: Function, types?: number): void;
        getMulSocket(ary: Array<Vector3D>): void;
    }
}

declare module Pan3d {
    class SkillPath {
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
}

declare module Pan3d {
    class SkillSinPath extends SkillPath {
        private alltime;
        private lastTime;
        protected basePos: Vector3D;
        add(): void;
        update(t: number): void;
        setApplyPos($offset: Vector3D): void;
        getOffset(ypos: number): Vector3D;
        reset(): void;
    }
    class SkillCosPath extends SkillSinPath {
        getOffset(ypos: number): Vector3D;
    }
}

declare module Pan3d {
    class SkillMulPath extends SkillPath {
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
}

declare module Pan3d {
    class PathManager {
        private static dic;
        static reg(types: number, cls: any): void;
        static getNewPath(types: number): any;
        static init(): void;
    }
}

/**
* base64-arraybuffer
*/
declare module Pan3d {
    class Base64 {
        static chars: string;
        static encode: (arraybuffer: any) => string;
        static decode: (base64: any) => ArrayBuffer;
    }
}

declare module Pan3d {
    class LoadManager {
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
    class LoaderThread {
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
    class LoadInfo {
        url: string;
        type: string;
        fun: Function;
        info: any;
        progressFun: Function;
        version: string;
        constructor($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function);
        readonly vurl: string;
    }
}

declare module Pan3d {
    class ObjDataManager extends ResGC {
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
}

declare module Pan3d {
    class MeshDataManager extends ResGC {
        private _loadDic;
        constructor();
        private static _instance;
        static getInstance(): MeshDataManager;
        getMeshDataByLocalUrl($url: string): any;
        getMeshData($url: string, $fun: Function, $batchNum?: number): void;
        private roleResCom;
        gc(): void;
        readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
        private readBindPosByte;
        readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void;
        private uploadMesh;
        uploadPbrMesh($mesh: MeshData, $useNormal: boolean): void;
        preLoad($url: string): void;
    }
}

declare module Pan3d {
    class AnimManager {
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
}

declare module Pan3d {
    class LightProbeManager {
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
}

declare module Pan3d {
    class GroupDataManager extends ResGC {
        protected _loadDic: Object;
        private static _instance;
        static getInstance(): GroupDataManager;
        getGroupData($url: string, $fun: Function): void;
    }
}

declare module Pan3d {
    class AstarUtil {
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
        static sceneVectList: Array<Vector3D>;
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
}

declare module Pan3d {
    class KeyboardType {
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
}

declare module Pan3d {
    class MouseType {
        static MouseDown: string;
        static MouseUp: string;
        static MouseMove: string;
        static MouseClick: string;
        static KeyDown: string;
        static KeyUp: string;
        static MouseWheel: string;
        static TouchStart: string;
        static TouchMove: string;
        static TouchEnd: string;
        static TouchClick: string;
    }
    class KeyControl {
        private static _instance;
        _keyDic: Object;
        private _lostMousePos;
        private _lastFousce;
        private _isMouseDown;
        private _isUpData;
        constructor();
        static readonly instance: KeyControl;
        static getInstance(): KeyControl;
        init(): void;
        clearAllEvet(): void;
        clearMouseEvent(): void;
        onMouseMove($evt: MouseEvent): void;
        onMouseDown($evt: MouseEvent): void;
        onMouseUp($evt: MouseEvent): void;
        upData(): void;
        speedNum: number;
        tureLeft(): void;
        tureRight(): void;
        tureUp(): void;
        tureDown(): void;
        mathFocus3D($p: Vector3D): void;
        onKeyDown($evt: KeyboardEvent): void;
        onKeyUp($evt: KeyboardEvent): void;
    }
}

declare module Pan3d {
    class TimeUtil {
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
}

declare function float2int(value: any): number;
declare function radian2angle(value: number): number;
declare function angle2radian(value: number): number;
declare function makeImage(): any;
declare var keyChi: Array<string>;
/**阿拉伯数字转换成中文数字 */
declare function getChiNum($id: number): string;
declare function hexToArgb(expColor: number, is32?: boolean, color?: Pan3d.Vector3D): Pan3d.Vector3D;
declare function hexToArgbNum(expColor: number, is32?: boolean, color?: Pan3d.Vector3D): Pan3d.Vector3D;
declare function getBaseUrl(): string;
/**描边路径 */
declare function strokeFilter(ctx: CanvasRenderingContext2D, width: number, height: number, color: number): void;
declare function trim(s: any): String;
declare function trimLeft(s: any): String;
declare function trimRight(s: any): String;
declare function TweenMoveTo(taget: any, t: number, vars: any): void;
declare function getScencdStr(timeNum: number): string;
declare function random($num: number): number;
declare function randomByItem(arr: Array<any>): any;
declare function makeArray(a: Array<any>, b: Array<any>): void;
declare function unZip($aryBuf: ArrayBuffer): ArrayBuffer;
declare function getZipByte($byte: Pan3d.Pan3dByteArray): Pan3d.Pan3dByteArray;
declare function getUrlParam(name: string): string;
declare function copy2clipboard(val: string): void;
declare function getBit($num: number, offset: number): boolean;

declare module Pan3d {
    class ColorTransition {
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
}

declare module Pan3d {
    class ArtFont {
        fontData: Dictionary;
        fontData_Unit: Dictionary;
        constructor();
        static Red: string;
        static Green: string;
        static Blue: string;
        static White: string;
        static Yellow: string;
        static BOSSBIGTXT: string;
        static CN1: string;
        static num101: string;
        static num102: string;
        static BigYellow: string;
        static num99: string;
        static GARY_TXT: string;
        static ORANGE_TXT: string;
        static num1: string;
        static num2: string;
        static num3: string;
        static num4: string;
        static num5: string;
        static num6: string;
        static num7: string;
        static num10: string;
        static num8: string;
        static num9: string;
        static num11: string;
        static num12: string;
        static num13: string;
        static num14: string;
        static num15: string;
        static num16: string;
        static num17: string;
        static num18: string;
        static num19: string;
        static num20: string;
        static num21: string;
        static num22: string;
        static num23: string;
        static num24: string;
        static num25: string;
        static num26: string;
        static num27: string;
        static num28: string;
        static num30: string;
        static num51: string;
        static num52: string;
        static num53: string;
        static num54: string;
        static num55: string;
        static num56: string;
        static num57: string;
        static num58: string;
        static num59: string;
        static num60: string;
        static num61: string;
        static numVip: string;
        static num63: string;
        static num64: string;
        static num65: string;
        static num66: string;
        private static _instance;
        static getInstance(): ArtFont;
        private makeFontRect;
        private getXmlData;
        private makeBase12pxNum;
        writeFontToCtxLeft($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        /**
         * 将美术字写到ctx上 右对齐的
         * $tx:绘制的终点x
         * $ty:绘制的起点Y
         */
        writeFontToCtxRight($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        writeFontToCtxCenten($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        writeFontToSkinName($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string, $txtInterval?: number): number;
        writeFontToSkinNameCenter($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $txtInterval?: number): void;
        getAirFontWidth($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $txtInterval?: number): number;
        private getRect;
        upArtFont($UIAtlas: UIAtlas, $iconName: string, $str: string, $size?: number, $color?: string, $textAlign?: string): void;
        upArtBase($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string): void;
        private getXpos;
        /**
         *计算总宽度和是否绘制
         */
        private getTotalWandDraw;
        getCharId(str: string): number;
    }
}

declare module Pan3d {
    class TextRegVo {
        begin: number;
        end: number;
        color: string;
    }
    class TextRegExp {
        static item: Array<TextRegVo>;
        static defaultColor: string;
        constructor();
        static pushStr($str: string): void;
        /**
         * 将字符串中所有颜色替换为#号 并返回新的字符串
         * @param
         */
        static pushStrCopy($str: string): string;
        static isColor($index: number, $ctx: CanvasRenderingContext2D): boolean;
        static getTextMetrics($ctx: CanvasRenderingContext2D, text: string): TextMetrics;
        static getTextOnlyTxt($ctx: CanvasRenderingContext2D, text: string): string;
        private static getNextWords;
        /**
         * 逐字符写入文本。兼容表情。返回行数
         * @param
         * @param text
         * @param baseColor
         * @param x
         * @param y
         * @param maxWidth
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static wrapText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x?: number, y?: number, maxWidth?: number, lineHeight?: number, fontsize?: number, $filterColor?: string, $filterWidth?: number, $gapScale?: number): number;
        /**
         * 逐字符写入文本。兼容表情。返回行数 竖着写
         * @param
         * @param text
         * @param baseColor
         * @param x
         * @param y
         * @param maxWidth
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static wrapTextVertical($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x?: number, y?: number, maxWidth?: number, lineWidth?: number, fontsize?: number, $filterColor?: string, $filterWidth?: number, $gapScale?: number): number;
        /**
         * 按行写入字符。暂不兼容表情。返回数组行宽行高
         * @param
         * @param text
         * @param baseColor
         * @param
         * @param
         * @param
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static drawText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, $maxWidth?: number, lineHeight?: number, fontsize?: number): Array<number>;
        private static getStartPoint;
        private static drawFaceIcon;
    }
    class TextCell {
        str: string;
        posy: number;
        width: number;
        color: string;
        maxwidth: number;
        constructor($str: string, $posy: number, $width: number, $color: string, $maxWidth: number);
    }
    class LabelTextFont {
        static writeSingleLabelCopy($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): number;
        static writeSingleLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): number;
        static writeTextLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: CanvasTextAlign, $maxWidth?: number, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): Array<number>;
        static writeSingleLabelToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $align?: string, $baseColor?: string, $filterColor?: string, $bolder?: boolean): number;
        static writeSingleLabelToCtxByVertical($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $baseColor?: string, $filterColor?: string, $bolder?: boolean): void;
        static writeSingleLabelToCtxSetAnchor($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $align?: string, $baseColor?: string, $filterColor?: string, $bolder?: boolean): number;
        /**
         * 整行写入文本 不兼容处理颜色
         * @param $x 文本写入时光标所在x位置
         * @param $y 文本写入时光标所在y位置
         * @param fontsize
         * @param fontColor
         * @param bolder
         * @param  $textAlign 对齐方式
         * @readme 如果需要居中对齐显示，则光标所在位置需要传入中心点坐标，对齐方式也需要传入center
         */
        static writeText($uiAtlas: UIAtlas, $key: string, $x: number, $y: number, $str: string, fontsize: number, fontColor: string, $maxWidth?: number, bolder?: boolean, $textAlign?: CanvasTextAlign): Array<number>;
        /**
         * 按行写入文本 带解析颜色。但只能居中对齐
         */
        static writeTextAutoCenterByAnchor($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean, $filterColor?: string): Array<number>;
        static writeTextAutoVerticalCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, $filterColor?: string, bolder?: boolean): void;
        static writeTextAutoCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean): void;
        private static isNewline;
        private static getTextxpos;
        private static wrapText;
        /**已弃用 请使用clearUI */
        static clearLabel($uiAtlas: UIAtlas, $key: string): void;
    }
}

declare module Pan3d {
    class SoundManager {
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
}

declare module Pan3d {
    class TextJumpType {
        static NORMALDAMAGE: number;
        static CRIT: number;
        static DODGE: number;
        static TREATMENT: number;
        static VERTIGO: number;
        static FREEZE: number;
        static ATTACKADD: number;
        static ATTACKREDUCE: number;
        static EXPERIENCE: number;
        static NORMALDAMAGEUP: number;
        static CRITUP: number;
        static MYNORMALDAMAGE: number;
        static MYNORMALDAMAGEUP: number;
        static MISS: number;
    }
    class TextJumpUiVo {
        pos: Vector3D;
        str: string;
        type: number;
        endtime: number;
        starttime: number;
    }
    class ExpTextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width;
        makeData(): void;
        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number;
        protected pos: Vector3D;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        protected _lastchange: Array<number>;
        protected changerules(t: number): Array<number>;
    }
    class TextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width;
        makeData(): void;
        private drawTxtBytext;
        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number;
        private pos;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        private _lastchange;
        private changerules;
    }
    class CharNameUiVo extends Disp2DBaseText {
        private charNameMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class CharTitleUiVo extends Disp2DBaseText {
        private _charTitleMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class baseMeshVo {
        private _visible;
        visibleChange: boolean;
        visible: boolean;
        pos: Vector3D;
        uiScale: number;
        clear: boolean;
        constructor();
    }
}
declare module Pan3d {
    class BloodUIShader extends Shader3D {
        static BloodUIShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class BloodUICompenent extends UICompenent {
        constructor();
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        lifeNum: number;
        colortype: number;
    }
    class BloodDisp2DBaseText extends Disp2DBaseText {
        private bloodLineMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class BloodUIRenderComponent extends UIRenderComponent {
        constructor();
        protected initData(): void;
        private nextTime;
        update(): void;
        creatBaseComponent($skinName: string): BloodUICompenent;
        makeRenderDataVc($vcId: number): void;
    }
    class BloodLineUIConatiner extends UIConatiner {
        private _baseRender;
        constructor();
        private loadBloodTexture;
        protected _uiItem: Array<BloodDisp2DBaseText>;
        update(t: number): void;
        removeChild($ui: UICompenent): void;
        clearOneTemp(): void;
        showTemp($data: any): void;
    }
}
declare module Pan3d {
    class CharTitleMeshVo extends Pan3d.baseMeshVo {
        private _num;
        needDraw: boolean;
        destory(): void;
        num: number;
    }
    class CharNameMeshVo extends Pan3d.baseMeshVo {
        private _name;
        needDraw: boolean;
        name: string;
        destory(): void;
    }
    class BloodLineMeshVo extends Pan3d.baseMeshVo {
        num: number;
        colortype: number;
        destory(): void;
    }
    class JumpTextMeshVo extends Pan3d.baseMeshVo {
        str: string;
        destory(): void;
    }
    class JumpTxtContianerPanel extends Dis2DUIContianerPanel {
        constructor($classVo: any, $rect: Rectangle, $num: number);
    }
    class BloodManager {
        static _instance: BloodManager;
        static getInstance(): BloodManager;
        private _charTitleContianerPanel;
        private _charNameContianerPanel;
        private _jumpTxtContianerPanel;
        private _expjumpTxtContianerPanel;
        private _bloodLineUIConatiner;
        uiContianerItem: Array<Dis2DUIContianerBase>;
        constructor();
        clearOneTemp(): void;
        getCharTitleMeshVo(value?: number): CharTitleMeshVo;
        getCharNameMeshVo(value?: string): CharNameMeshVo;
        getBloodLineMeshVo(): BloodLineMeshVo;
        setJumpNum($textJumpUiVo: Pan3d.TextJumpUiVo): void;
        setExpJumpNum($textJumpUiVo: Pan3d.TextJumpUiVo): void;
        update(): void;
        resize(): void;
    }
}

declare module Pan3d {
    class Curve {
        type: number;
        valueVec: Array<Array<number>>;
        private valueV3d;
        begintFrame: number;
        maxFrame: number;
        constructor();
        getValue($t: number): Array<number>;
        setData(obj: any): void;
    }
}

declare module Pan3d {
    class Shadow {
        _visible: boolean;
        display: Display3dShadow;
        data: Array<number>;
        constructor();
        visible: boolean;
        x: number;
        y: number;
        z: number;
        size: number;
    }
}

declare module Pan3d {
    class ShadowManager {
        private static _instance;
        static getInstance(): ShadowManager;
        private _displayList;
        constructor();
        addShadow(): Shadow;
        removeShadow(sd: Shadow): void;
        update(): void;
        private getIdleShadow;
    }
}

declare module Pan3d {
    class BaseRes extends ResCount {
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
}

declare module Pan3d {
    class ResManager extends ResGC {
        private static _instance;
        static getInstance(): ResManager;
        loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void;
        loadSkillRes(url: string, $fun: Function): void;
        loadSceneRes($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): SceneRes;
        clearSceneUse(curRes: SceneRes): void;
        gc(): void;
    }
}

declare module Pan3d {
    class RoleRes extends BaseRes {
        roleUrl: string;
        actionAry: Array<string>;
        private _fun;
        meshBatchNum: number;
        ambientLightColor: Vector3D;
        ambientLightIntensity: number;
        sunLigthColor: Vector3D;
        sunLigthIntensity: number;
        nrmDircet: Vector3D;
        constructor();
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        readMesh(): void;
        protected readAction(): void;
        protected readNext(): void;
    }
}

declare module Pan3d {
    class SkillRes extends BaseRes {
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
}

declare module Pan3d {
    class ModelRes extends BaseRes {
        private _fun;
        objUrl: string;
        light: LightVo;
        materialUrl: string;
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNexte;
    }
}

declare module Pan3d {
    class GroupRes extends BaseRes {
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
    class GroupItem extends Object3D {
        objUrl: string;
        materialUrl: string;
        particleUrl: string;
        materialInfoArr: Array<any>;
        isGroup: boolean;
        types: number;
    }
}

declare module Pan3d {
    class SceneRes extends BaseRes {
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
}


/**
* 事件分发器,由于本身事件数量肯定不会多
* 所以没有必要使用二分查找算法,直接遍历
* 事件ID与事件回调处于不同的数组，通过相同的数组下标关联
* @author linbc
*/
declare module Pan3d {
    class NetEventDispatcher {
        static KEY_TYPE_INT: number;
        static KEY_TYPE_STRING: number;
        static KEY_TYPE_INT_MASK: number;
        protected _event_key_type: number;
        protected _event_id_int: Array<number>;
        protected _event_id_str: Array<string>;
        protected _event_callback: Array<Function>;
        protected _event_id_int_mask: Array<UpdateMask>;
        protected _callback_index: number;
        private _event_index;
        constructor(type?: number);
        /**
         * 触发该事件的参数
         * @param param
         */
        private DispatchIndex;
        DispatchString(key: string, param: Object): void;
        DispatchInt(key: number, param: Object): void;
        DispatchIntMask(key: UpdateMask, param: Object): void;
        /**
         * 根据规则触发整数回调
         *
         * @param param
         * @param pred 回调格式 pred(index,binlog)->bool
         */
        Dispatch(param: Object, pred: Function): void;
        /**
         * 添加回调监听,监听ID手工指定
         * @param key	事件ID
         * @param f		回调函数闭包,可以支持一个参数(Object)
         */
        AddListenInt(key: number, f: Function): void;
        AddListenString(key: string, f: Function): void;
        AddListenIntMask(key: UpdateMask, f: Function): void;
        /**
         * 移除整型类的回调监听
         * @param key 	事件ID
         * @param f		回调函数闭包,可以支持一个参数(Object)，如果f为空，则移除所有
         */
        removeListenerInt(key: number, f?: Function): void;
        /**
         * 移除字符串类型的回调监听
         * @param key 	事件ID
         * @param f 回调函数闭包,可以支持一个参数(Object)，如果f为空，则移除所有
         */
        removeListenerString(key: string, f?: Function): void;
        /**
         * 移除多下标监听
         * @param key
         * @param f
         */
        removeListenerUpdateMask(key: UpdateMask, f?: Function): void;
        /**
         *  添加回调监听,事件ID自增后并返回
         * @param f	事件支持一个参数,Object
         */
        AddCallback(f: Function): number;
        /**
         * 清空所有已经注册的事件监听
         */
        Clear(): void;
    }
}

declare module Pan3d {
    class UpdateMask {
        private _bytes;
        constructor();
        readonly baseByteArray: Pan3dByteArray;
        Clear(): void;
        /**
        * 获取掩码数据列表，是否发生更新
        * @param pos 索引位置
        * @param len 长度
        * @return
        */
        GetBits(pos: number, len?: number): boolean;
        GetBit(i: number): boolean;
        SetBit(i: number): void;
        WriteTo(bytes: Pan3dByteArray): boolean;
        ReadFrom(bytes: Pan3dByteArray): boolean;
        GetCount(): number;
        SetCount(val: number): void;
        empty(): boolean;
        /**
            * updateMask的或者掩码操作
            * @param other
            */
        or(other: UpdateMask): void;
        /**
            * 两个updatemask并且成功
            * @param other
            * @return
            */
        test(other: UpdateMask): boolean;
        /**
            * 收缩,把byteArray的长度调整到最合理的位置
            */
        private condense;
        /**
            * 判断两个掩码是否相等
            * @param other
            * @return
            */
        equals(other: UpdateMask): boolean;
        /**
            * 掩码克隆函数
            * @return
            */
        clone(): UpdateMask;
    }
}

declare module Pan3d {
    class StringIndexer {
        protected _indexerExp: Array<RegExp>;
        protected _objs: Array<Array<GuidObject>>;
        protected _evFilter: Array<SyncEventFilter>;
        constructor();
        /**
         * 根据正则表达式返回加入的索引，并返回索引编号 如: create("^i\d+") 代表所有的物品
         * @param exp
         * @return
         */
        createIndex(exp: string): number;
        /**
         * 根据正则表达式返回索引
         * @param exp 正则表达式
         * @return 返回索引,如果返回-1就是没找到
         */
        getIndex(exp: string): number;
        /**
         * 释放正则表达式的索引的内容
         * 暂时不支持运行过程中增加和删除索引
         * @param exp
         */
        releaseIndex(exp: string): void;
        /**
         * 根据传入的字符串，验证符合哪个索引
         * @param obj
         * @return
         */
        private test;
        /**
         * 插入对象，遍历所有的正则表达式，如果符合则会插入
         * @param obj
         */
        insert(obj: GuidObject): void;
        /**
         * 根据对象的GUID移除所在的索引
         * @param guid
         */
        remove(guid: string): void;
        /**
         * 根据正则表达式查询对象集合
         * @param exp
         * @return
         */
        query(exp: string): Array<GuidObject>;
        /**
         * 根据索引编号返回所有的对象集合
         * @param indexTyp
         * @return
         */
        get(indexTyp: number): Array<GuidObject>;
        /**
         * 传入对象去匹索引器
         * @param obj
         * @return
         */
        matchObject(obj: GuidObject): SyncEventFilter;
        /**
         * 根据对象筛选的集合触发相应的事件
         * @param exp
         * @param f
         */
        filter(exp: string, f: SyncEventFilter): void;
        Clear(): void;
    }
}

declare module Pan3d {
    class SyncEvent {
        static OBJ_OPT_NEW: number;
        static OBJ_OPT_DELETE: number;
        static OBJ_OPT_UPDATE: number;
        static OBJ_OPT_BINLOG: number;
        static OBJ_OPT_U_GUID: number;
        static OPT_SET: number;
        static OPT_UNSET: number;
        static OPT_ADD: number;
        static OPT_SUB: number;
        static TYPE_UINT32: number;
        static TYPE_UINT16: number;
        static TYPE_UINT8: number;
        static TYPE_BIT: number;
        static TYPE_UINT64: number;
        static TYPE_INT32: number;
        static TYPE_STRING: number;
        static TYPE_INT16: number;
        static TYPE_FLOAT: number;
        static TYPE_DOUBLE: number;
        static ATOMIC_OPT_RESULT_NO: number;
        static ATOMIC_OPT_RESULT_TRY: number;
        static ATOMIC_OPT_RESULT_OK: number;
        static ATOMIC_OPT_RESULT_FAILED: number;
        static tmpValueBytes: Pan3dByteArray;
        constructor();
        static init(): void;
    }
}

declare module Pan3d {
    class BinLogStru extends SyncEvent {
        private static _pool;
        static malloc(): BinLogStru;
        static free(ptr: BinLogStru): void;
        _opt: number;
        _typ: number;
        _index: number;
        _atomic_opt: number;
        _value_u32_buffer: DataView;
        _value_dbe: number;
        _value_str: string;
        _callback_index: number;
        _old_value_u32_buffer: DataView;
        _old_value_dbe: number;
        _old_value_str: string;
        BinLogStru(): void;
        opt: number;
        index: number;
        offset: number;
        typ: number;
        atomic_opt: number;
        callback_idx: number;
        uint32: number;
        int32: number;
        bit: number;
        old_int32: number;
        uint16: number;
        int16: number;
        byte: number;
        double: number;
        float: number;
        str: string;
        old_str: string;
        value: number;
        old_value: number;
        Clear(): void;
        ReadFrom(bytes: Pan3dByteArray): Boolean;
        WriteTo(bytes: Pan3dByteArray): void;
        clone(): BinLogStru;
    }
}

declare module Pan3d {
    class SyncEventRecorder extends SyncEvent {
        /**
         * 用于监听下标变化
         */
        private _events_value;
        /**
         * 用于监听字符下标变化
         */
        private _events_str_values;
        /**
         * 用于触发多下标单回调的情况
         */
        private _events_mask;
        /**
         * 用于事件回调
         */
        private _events_callback;
        protected _uint32_values_len: number;
        protected _uint32_values_buffer: DataView;
        protected _str_values_len: number;
        protected _str_values: Array<string>;
        protected _guid: string;
        /**
         * 从模式下更新事件触发后产生
         * 回调格式  this._after_update(obj:GuidObject,flags:number,intMask:UpdateMask,strMask:UpdateMask):void
         */
        protected _after_update: Function;
        private static addListens_mask;
        private static tmpIntMask;
        private static tmpStrMask;
        private _tmpBinlog;
        guid: string;
        constructor();
        /**
         * 重置整个对象,下标清零
         */
        Reset(): void;
        private clearValues;
        protected checkIntSize(index: number): void;
        protected checkStrSize(index: number): void;
        private OnEventSyncBinLog;
        /**
         * 监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        AddListen(index: number, callback: Function): void;
        /**
         *  监听对象在下标变化
         * @param baseIndex 下标基础
         * @param callback 回调指针
         * @param arg 下标基础之后的列表
         */
        AddListens(baseIndex: number, callback?: Function, ...arg: any[]): void;
        /**
         * 移除监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        removeListene(index: number, callback?: Function): void;
        /**
         *  移除监听对象在下标变化，列表集合
         * @param baseIndex 下标基础
         * @param callback 回调指针
         * @param arg 下标基础之后的列表
         */
        removeListenes(baseIndex: number, callback?: Function, ...arg: any[]): void;
        /**
         * 监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        AddListenString(index: number, callback: Function): void;
        /**
         * 移除监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        removeListeneString(index: number, callback?: Function): void;
        GetDouble(index: number): number;
        GetUInt32(index: number): number;
        GetInt32(index: number): number;
        GetUInt16(index: number, offset: number): number;
        GetInt16(index: number, offset: number): number;
        GetFloat(index: number): number;
        GetByte(index: number, offset: number): number;
        GetUInt8(index: number, offset: number): number;
        GetBit(index: number, offset: number): boolean;
        SetBit(index: number, offset: number, flag: boolean): void;
        GetStr(index: number): string;
        SetDouble(index: number, value: number): void;
        AddDouble(index: number, value: number): void;
        SubDouble(index: number, value: number): void;
        SetUInt32(index: number, value: number): void;
        AddUInt32(index: number, value: number): void;
        SubUInt32(index: number, value: number): void;
        SetInt32(index: number, value: number): void;
        AddInt32(index: number, value: number): void;
        SubInt32(index: number, value: number): void;
        SetUInt16(index: number, offset: number, value: number): void;
        AddUInt16(index: number, offset: number, value: number): void;
        SubUInt16(index: number, offset: number, value: number): void;
        SetInt16(index: number, offset: number, value: number): void;
        AddInt16(index: number, offset: number, value: number): void;
        SubInt16(index: number, offset: number, value: number): void;
        SetFloat(index: number, v: number): void;
        SetByte(index: number, offset: number, value: number): void;
        AddByte(index: number, offset: number, value: number): void;
        SubByte(index: number, offset: number, value: number): void;
        SetStr(index: number, val: string): void;
        private ReadValues;
        private ReadStringValues;
        /**
         * 数字下标创建包掩码
         * @param mask
         */
        private GetCreateMask;
        /**
         * 字符串创建包掩码
         * @param mask
         */
        private GetCreateStringMask;
        private ApplyAtomicBinLog;
        /**
         * 将binlog的操作实施到对象，并且如果就主模式，转换binlog得到
         * 这个函数会把转
         * @param binlog
         */
        private ApplyBinLog;
        private _afterUpdateIntObj;
        private _afterUpdateStrObj;
        clearAfterUpdateObj(): void;
        ReadFrom(flags: number, bytes: Pan3dByteArray, evFilter?: SyncEventFilter, applyNew?: boolean): boolean;
        onBaseCreated(): void;
        GetHashCode(): number;
        Equals(o: SyncEventRecorder): Boolean;
        DeleteThis(): void;
        dispose(): void;
    }
}

declare module Pan3d {
    class GuidObject extends SyncEventRecorder {
        protected _ref: number;
        /**
            * 增加引用计数
            * @param r 计数变量,1/-1
            */
        add_ref(r: number): void;
        /**
            * 当引用计数小于等于0的时候就可以从对象表中被释放了
            */
        readonly ref: number;
        constructor(g?: string);
        getName(): string;
        getGuid(): string;
    }
}

declare module Pan3d {
    class GuidObjectTable extends SyncEvent {
        protected _objs: Object;
        private _newEvent;
        private _delEvent;
        protected _indexer: StringIndexer;
        protected _hashGUID: Function;
        protected _u_2_guid: Object;
        constructor();
        Get(k: string): GuidObject;
        /**
         * 索引器
         */
        readonly indexer: StringIndexer;
        /**
         * 创建对象
         * @param k
         * @return
         */
        CreateObject(k: string): GuidObject;
        /**
         * 释放对象
         * @param o
         */
        ReleaseObject(o: GuidObject): void;
        ReleaseKey(k: string): void;
        AttachObject(o: GuidObject): void;
        DetachObject(o: GuidObject): void;
        msgClientsubscription($byte: Pan3dByteArray): void;
        protected static applyBlock_tmp_obj: GuidObject;
        /**
         * 应用对象更新数据包
         * @param bytes
         */
        ApplyBlock(bytes: Pan3dByteArray): boolean;
        SearchObject(s: string, vec: Array<string>): void;
        ForEachObject(f: Function): void;
        /**
         * 调用远程创建对象，成功的时候回调
         * @param guid
         * @param cb function(o:GuidObject):void
         */
        RegisterCreateEvent(guid: string, cb: Function): void;
        /**
         * 调用远程删除对象,成功时回调
         * @param guid
         * @param cb function(o:GuidObject):void
         */
        RegisterReleaseEvent(guid: string, cb: Function): void;
        private _packet_pool;
        /**
         * 从池中分配新的数据包,如果没有包号就不要写入
         * @param optCode
         * @return
         */
        newPacket(optCode?: number): Pan3dByteArray;
        /**
         * 回收数据包到包池
         * @param pkt
         */
        freePacket(pkt: Pan3dByteArray): void;
        /**
         * 清理对象
         */
        clearObjs(): void;
        protected removeObject(guid: string, obj: GuidObject): void;
        dispose(): void;
    }
}

/**
     * 用于记录所有的同步事件，目前最常用于ui重绘
     * 记录时，先通过testRecorder验证是否是关心的对象，
     * 再调用push将所关心的的binlog用自定义的格式记录下来
     * 现在使用的格式为(数量-short,(index-short,oldValue-unumber)...)
     * 通过pop可以得到当前队列中的所有符合条件的事件消息，并调用相应的处理函数
     * @author linbc
     */
declare module Pan3d {
    class SyncEventFilter extends SyncEvent {
        /**
             * 标识为是个新对象
             */
        static EV_NEW: number;
        /**
         * 标识为对象消失
         */
        static EV_DEL: number;
        /**
         * 对象整型下标发生变化
         */
        static EV_UPDATE_I: number;
        /**
         * 对象字符串下标发生变化
         */
        static EV_UPDATE_S: number;
        private _opening;
        private _curObj;
        private _curEventCount;
        private _eventObjs;
        private _eventParams;
        open(): void;
        /**
         * 关闭对象事件管理
         */
        close(): void;
        /**
         * 初始化
         */
        SyncEventFilter(): void;
        beginPush(obj: GuidObject): Boolean;
        /**
         * 有始有终嘛，修改binlog数量,或者移除符合条件，但是没有记录到事件的对象ID
         */
        endPush(): void;
        private writeParam;
        pushDelete(): void;
        pushNew(): void;
        pushUpdateMask(typ: number, mask: UpdateMask): void;
        /**
         * 对象更新调用该接口进行数据插入,相应的会记录成UI可以理解的数据格式
         * @param binlog
         *
         */
        pushBinlog(binlog: BinLogStru): void;
        /**
         * 开始读之先，置一下，数组的位置
         *
         */
        beginPop(): void;
        /**
         * 开始弹出一个对象的事件,返回空的时候就是没有对象
         * @param params
         * @return 对象的guid
         *
         */
        pop(params: Array<number>): string;
        /**
         * 读完了，清空一下数据
         *
         */
        endPop(): void;
        Clear(): void;
    }
}

declare module Pan3d {
    class ObjectDef {
        static MAP: string;
        static UNIT: string;
        static STRENGTH: string;
        static PLAYER: string;
        static BAG: string;
        static FACTION: string;
        static GROW: string;
        static INSTANCE: string;
        static SOCIAL: string;
        static EMAIL: string;
        static GLOBEL: string;
        static QUEST: string;
        static LOOT: string;
        static TEAM: string;
        static GLOBAL_VALUE: string;
        static GAME_CONFIG: string;
        static getPrefix(s: string): string;
        static getGUIDIndex(s: string): number;
        static testUG(u: string, g: string): boolean;
    }
}

/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/
declare module Pan3d {
    class both_sync_mstime {
        optcode: number;
        static param_count: number;
        static optname: string;
        private static input;
        /**
         * 服务器运行的毫秒数
         */
        mstime_now: number;
        /**
         * 自然时间
         */
        time_now: number;
        /**
         * 自然时间的服务器启动时间
         */
        open_time: number;
        /**
         从输入二进制流中读取结构体
         */
        static read(self: both_sync_mstime, bytes: Pan3dByteArray): void;
    }
    class both_sync_mstime_app {
        optcode: number;
        static param_count: number;
        static optname: string;
        private static input;
        /**
         * 服务器运行的毫秒数
         */
        mstime_now: number;
        /**
         * 自然时间
         */
        time_now: number;
        /**
         * 自然时间的服务器启动时间
         */
        open_time: number;
        /**
         从输入二进制流中读取结构体
         */
        static read(self: both_sync_mstime_app, bytes: Pan3dByteArray): void;
    }
}

/***********************************************************************/
/***************��������Э�鹤���Զ����ɣ������ֶ��޸�****************/
/************************ Э��汾��:#�������ƣ�ע�� ******************************/
/***********************************************************************/
declare module Pan3d {
    class Protocols {
        private _send_func;
        private _stream;
        private _FUNCS;
        constructor(f: Function);
        getFuncName(cmd: number): string;
    }
}

/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/
declare module Pan3d {
    class point {
        /**
         * 坐标X
         */
        pos_x: number;
        /**
         * 坐标Y
         */
        pos_y: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class taxi_menu_info {
        /**
         *
         */
        id: number;
        /**
         * 传送地点名称
         */
        taxi_text: string;
        /**
         * 地图ID
         */
        map_id: number;
        /**
         * 坐标X
         */
        pos_x: number;
        /**
         * 坐标Y
         */
        pos_y: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class char_create_info {
        /**
         * 名称
         */
        name: string;
        /**
         * 阵营
         */
        faction: number;
        /**
         * 性别
         */
        gender: number;
        /**
         * 等级
         */
        level: number;
        /**
         *
         */
        guid: string;
        /**
         * 头像
         */
        head_id: number;
        /**
         * 发型ID
         */
        hair_id: number;
        /**
         * 种族，猛男美女萝莉那些
         */
        race: number;
        /**
         * 邀请的帮派id
         */
        inviteGuid: string;
        /**
         * 创建的帮派名称
         */
        faction_name: string;
        /**
         * 创建的帮派标志
         */
        icon: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class quest_option {
        /**
         * 任务id
         */
        quest_id: number;
        /**
         * 图标
         */
        quest_icon: number;
        /**
         * 任务等级
         */
        quest_level: number;
        /**
         * 任务标题
         */
        quest_title: string;
        /**
         * 标识
         */
        flags: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class quest_canaccept_info {
        /**
         * 任务ID
         */
        quest_id: number;
        /**
         * 任务类别
         */
        quest_type: number;
        /**
         * 标题
         */
        title: string;
        /**
         * 接受任务NPC模板id
         */
        npc_id: number;
        /**
         * 任务等级
         */
        quest_level: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class gossip_menu_option_info {
        /**
         * id
         */
        id: number;
        /**
         * 选项icon图标
         */
        option_icon: number;
        /**
         * 选项文本
         */
        option_title: string;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class item_cooldown_info {
        /**
         * 物品摸版
         */
        item: number;
        /**
         * 冷却时间
         */
        cooldown: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class quest_status {
        /**
         * 任务ID
         */
        quest_id: number;
        /**
         * 任务状态
         */
        status: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class item_reward_info {
        /**
         * 道具id
         */
        item_id: number;
        /**
         * 道具数量
         */
        num: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class social_friend_info {
        /**
         * 好友guid
         */
        guid: string;
        /**
         * 名字
         */
        name: string;
        /**
         * 帮派
         */
        faction: string;
        /**
         * 等级
         */
        level: number;
        /**
         * 头像
         */
        icon: number;
        /**
         * 头像
         */
        vip: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_info {
        /**
         * 帮派guid
         */
        faction_guid: string;
        /**
         * 名字
         */
        faction_name: string;
        /**
         * 帮主名字
         */
        faction_bz: string;
        /**
         * 公告
         */
        faction_gg: string;
        /**
         * 等级
         */
        level: number;
        /**
         * 头像
         */
        icon: number;
        /**
         * 帮派人数
         */
        player_count: number;
        /**
         * 等级限制
         */
        minlev: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class rank_info {
        /**
         * 名字
         */
        name: string;
        /**
         * 伤害百分比
         */
        value: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class line_info {
        /**
         * 分线号
         */
        lineNo: number;
        /**
         * 玩家比率
         */
        rate: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class wait_info {
        /**
         * 名字
         */
        name: string;
        /**
         * 状态
         */
        state: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class cultivation_rivals_info {
        /**
         * 序号
         */
        index: number;
        /**
         * 名字
         */
        name: string;
        /**
         * 等级
         */
        level: number;
        /**
         * 武器
         */
        weapon: number;
        /**
         * 外观
         */
        avatar: number;
        /**
         * 神兵
         */
        divine: number;
        /**
         * 战力
         */
        force: number;
        /**
         * 宝箱
         */
        chest: number;
        /**
         * 性别
         */
        gender: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_gift_info {
        /**
         * 排行
         */
        rank: number;
        /**
         * id
         */
        id: number;
        /**
         * 魅力值
         */
        point: number;
        /**
         * 感谢标识
         */
        thank: number;
        /**
         * 女王回复标识
         */
        reply: number;
        /**
         * 时间
         */
        time: number;
        /**
         * count_id
         */
        count_id: number;
        /**
         * 赠送者guid
         */
        guid: string;
        /**
         * 赠送者留言
         */
        msg: string;
        /**
         * 赠送道具信息
         */
        item_list: string;
        /**
         * 回复信息
         */
        reply_list: string;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_gift_rank_info {
        /**
         * 排行
         */
        rank: number;
        /**
         * 魅力值
         */
        point: number;
        /**
         * 女王名称
         */
        queen_name: string;
        /**
         * 家族名称
         */
        faction_name: string;
        /**
         * 骑士名称
         */
        guard_name: string;
        /**
         * 家族旗子
         */
        faction_flag: number;
        /**
         * 女王vip等级
         */
        queen_vip: number;
        /**
         * 骑士vip等级
         */
        guard_vip: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class mass_boss_info {
        /**
         * 全民boss编号
         */
        id: number;
        /**
         * 全民boss状态
         */
        state: number;
        /**
         * 全民boss刷新时间
         */
        time: number;
        /**
         * boss血量
         */
        percent: number;
        /**
         * 挑战boss人数
         */
        count: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class mass_boss_rank_info {
        /**
         * 名称
         */
        name: string;
        /**
         * 伤害
         */
        dam: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class equip_info {
        /**
         * 装备信息
         */
        equip: string;
        /**
         * 强化
         */
        strength_lv: number;
        /**
         * 精炼阶级
         */
        refine_rank: number;
        /**
         * 精炼星级
         */
        refine_star: number;
        /**
         * 宝石1等级
         */
        gem1_lv: number;
        /**
         * 宝石1等级
         */
        gem2_lv: number;
        /**
         * 宝石1等级
         */
        gem3_lv: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class act_rank_info {
        /**
         * 名称
         */
        name: string;
        /**
         * 数值
         */
        value: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_match_info {
        /**
         * 家族名称
         */
        name: string;
        /**
         * 比赛结果
         */
        result: number;
        /**
         * 本届结果
         */
        rank: number;
        /**
         * 家族id
         */
        guid: string;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class group_search_info {
        /**
         * 队伍guid
         */
        guid: string;
        /**
         * 队长guid
         */
        cap_guid: string;
        /**
         * 队长名称
         */
        cap_name: string;
        /**
         * 家族id
         */
        members: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
}

declare module Pan3d {
    class NetManager {
        private static _instance;
        static getInstance(): NetManager;
        private _socket;
        private _handlerMap;
        protocolos: Protocols;
        private _connetFun;
        connectState: number;
        constructor();
        connect(ip: string, port: number, conntFun: Function): void;
        private onErrorEvent;
        private onopenEvent;
        private onmessageEvent;
        private oncloseEvent;
        reg(netReg: any): void;
        unReg(key: any): void;
        send($byte: Pan3dByteArray): void;
        close(): void;
    }
}

declare module Pan3d {
    class DualQuatFloat32Array {
        quat: Float32Array;
        pos: Float32Array;
    }
    class AnimData {
        inLoop: number;
        inter: Array<number>;
        bounds: Array<Vector3D>;
        nameHeight: number;
        posAry: Array<Vector3D>;
        matrixAry: Array<Array<Matrix3D>>;
        boneQPAry: Array<Array<DualQuatFloat32Array>>;
        hasProcess: boolean;
        processMesh($skinMesh: SkinMesh): void;
        meshBoneQPAryDic: Dictionary;
        private makeArrBoneQPAry;
        getBoneQPAryByMesh($mesh: MeshData): Array<Array<DualQuatFloat32Array>>;
        private conleMatrixArr;
        private makeFrameDualQuatFloatArray;
    }
}

declare module Pan3d {
    class SkinMesh extends ResCount {
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
        clone(): SkinMesh;
    }
}

declare module Pan3d {
    class BoneSocketData {
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
}

declare module Pan3d {
    class CollisionVo extends Object3D {
        type: number;
        name: string;
        polygonUrl: string;
        data: any;
        radius: number;
        colorInt: number;
        constructor($x?: number, $y?: number, $z?: number);
    }
    class CollisionItemVo {
        friction: number;
        restitution: number;
        isField: boolean;
        collisionItem: Array<CollisionVo>;
    }
    class CollisionType {
        static Polygon: number;
        static BOX: number;
        static BALL: number;
        static Cylinder: number;
        static Cone: number;
    }
}

declare module Pan3d {
    class CapsuleVo {
        radius: number;
        height: number;
        constructor($radius: number, $height: number);
    }
}

declare module Pan3d {
    class LightVo {
        sunDirect: Array<number>;
        sunColor: Array<number>;
        ambientColor: Array<number>;
        setData(sd: any, sc: any, ac: any): void;
    }
}

declare module Pan3d {
    class LineDisplayShader extends Shader3D {
        static LineShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module Pan3d {
    class LineDisplaySprite extends Display3D {
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
    class MulLineSprite extends LineDisplaySprite {
        constructor();
        private itemSprite;
        makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
        private getSprite;
        update(): void;
        upToGpu(): void;
        clear(): void;
    }
    class GridLineSprite extends LineDisplaySprite {
        constructor();
        private makeGridData;
    }
}

declare module Pan3d {
    class FpsMc {
        drawNum: number;
        fpsStr: string;
        static addFps: number;
        static fpsNowNum: number;
        static tipStr: string;
        constructor();
        static update(): void;
        getStr(): string;
    }
    class FpsStage {
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
}

declare module Pan3d {
    class Module {
        constructor();
        getModuleName(): string;
        /**
        * 注册的Processor的集合
        * 请注意：返回为Processor的实例数组
        * @return
        *
        */
        protected listProcessors(): Array<Processor>;
        /**
             * processor字典
             */
        private processorMap;
        /**
        * 注册所有的Processor
        */
        private registerProcessors;
        /**
        * 注册Processor
        * @param $processor
        */
        private registerProcessor;
        /**
        * module字典
        */
        static moduleMap: Object;
        /**
        * 注册Module
        * @param $module
        */
        static registerModule($module: Module): void;
    }
}

declare module Pan3d {
    class Processor {
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
}

declare module Pan3d {
    class ModuleEventManager {
        private static _instance;
        static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void;
        static dispatchEvent($event: BaseEvent, $data?: any): void;
    }
}

declare class GameVersion {
    private static _dic;
    static init(str: string): void;
    static getVersion(key: string): string;
}
declare function getUItittleUrl(name: string): string;
declare function getSkillUrl(name: string): string;
declare function getModelUrl(name: string): string;
declare function getModelUIUrl(name: string): string;
declare function getMapUrl(name: string): string;
declare function getRoleUrl(name: string): string;
declare function getZipMapUrl(name: string): string;
/**标准化数字 */
declare function Snum($num: number): string;
declare function getEffectUIUrl(name: string): string;
declare function getKeyProById($id: number): string;

declare module Pan3d {
    class CharAction {
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
}

declare module Pan3d {
    class Unit extends GuidObject {
        path: Array<Vector2D>;
        sceneChar: SceneChar;
        uintGuid: number;
        isMain: boolean;
        private originalRotation;
    }
}

declare module Pan3d {
    class SceneBaseChar extends Display3dMovie {
        private _avatar;
        _visible: boolean;
        visible: boolean;
        setAvatar(num: number): void;
        update(): void;
        protected getSceneCharAvatarUrl(num: number): string;
        protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
    }
}

declare module Pan3d {
    class SceneChar extends SceneBaseChar {
        _speedDirect: Vector3D;
        speedTX: number;
        life: number;
        protected _walkPath: Array<Vector3D>;
        private _astarDirect;
        private _astatTopos;
        skillitem: Array<Skill>;
        unit: Unit;
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
        readonly isDeath: boolean;
        isBoss: boolean;
        px: number;
        py: number;
        pz: number;
        /**强制角度 */
        forceRotationY: number;
        pRotationY: number;
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
        private _charTitleVo;
        refreshTittle(): void;
        protected _charNameVo: CharNameMeshVo;
        showName($color?: string): void;
        protected _charBloodVo: BloodLineMeshVo;
        private lastBloodcolorType;
        showBlood($colorType?: number): void;
        tittleHeight: number;
        onMeshLoaded(): void;
        refreshPos(): void;
        walkPath: Array<Vector3D>;
        fixAstartData(pos: Vector2D): void;
        applyWalk($item: Array<Vector2D>): void;
        moveToPos2D: Vector2D;
        private stopToPos;
        private moveTile;
        updateFrame(t: number): void;
        refreshY(): void;
        refreshHP(): void;
        protected rotationToNew(value: number, num?: number): void;
        speedUseTime: number;
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
        private destoryName;
        removeStage(): void;
        addStage(): void;
        math_distance($other: Display3dMovie): number;
        visible: boolean;
        optimization: boolean;
        private _resultVisible;
        readonly resultVisible: boolean;
        applyVisible(): void;
        private lineSprite;
        update(): void;
        private _showHitBox;
        private triIndex;
        private hitBox2DItem;
        mouseClik($lineA: Vector3D, $lineB: Vector3D): boolean;
    }
}

declare module Pan3d {
    class MountChar extends SceneBaseChar {
        setData($rank: number, $iid: number): void;
    }
}

declare module Pan3d {
    class BaseProcessor extends Processor {
    }
}

declare module Pan3d {
    class GameStart {
        /**是否是外网 */
        static outNet: boolean;
        static GM: boolean;
        static ready: boolean;
        dataReady: boolean;
        uiReadyNum: number;
        uiAllNum: number;
        static appVersion: number;
        init(): void;
        private loadAll;
        private loadDataComplet;
    }
}

declare module Pan3d {
    class GameMouseManager {
        private static _instance;
        static getInstance(): GameMouseManager;
        constructor();
        private ready;
        setBtn($a: UICompenent, $b: UICompenent): void;
        private b_yaogan_bar;
        private b_yaogan_bg;
        uiConatiner: UIVirtualContainer;
        private resetPos;
        private bindPos;
        addMouseEvent(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        useMouseEvent: boolean;
        private isCanUseMouseEvent;
        private onMouse;
        private canTestClikGroundMove;
        lastMouseEvetTime: number;
        private makeMouseEvent;
        private mouseToEvent;
        private cantClikGround;
        onSceneMouseDown($evt: InteractiveEvent): void;
        private lastMousePos;
        private onTouchStart;
        private onTouchEnd;
        private setBasePostion;
        private onTouchMove;
        private nextSendTime;
        skipNum: number;
        private _speedDirect;
        private isFristTouchMove;
        private yaoganIdentifier;
        private updataFun;
        private _lastV2dNrm;
        updata(t: number): void;
        private getMouseDownPos;
    }
}

declare module scenedis.me {
    class SkillSceneChar extends Pan3d.SceneChar {
        onMeshLoaded(): void;
        loadFinishFun: Function;
        changeActionFun: Function;
        changeAction($action: string): void;
        setWeaponByAvatar(avatar: number, $suffix?: string): void;
    }
}

declare module scenedis.me {
    class ModelSceneChar extends Pan3d.SceneChar {
        setWeaponByAvatar(avatar: number, $suffix?: string): void;
        setWingByID($wingId: string): void;
        setMountById($mountId: string): void;
    }
}

declare module scenedis.me {
    class ModelshowMouseManager {
        private static _instance;
        static getInstance(): ModelshowMouseManager;
        constructor();
        addMouseEvent(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        private onMouse;
        private mouseToEvent;
        private makeMouseEvent;
        private clikSceneGround;
        walkPathComplete(): void;
    }
}

declare module scenedis.me {
    class SceneMouseEventModel {
        private static _instance;
        static getInstance(): SceneMouseEventModel;
        constructor();
        initSceneFocueEvent(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        private lastRotationY;
        private lastRotationX;
        private _lastMousePos;
        private _isMouseDown;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
    }
}

declare module scenedis.me {
    class CharModelShow {
        constructor();
        private addModelChar;
    }
}

declare module scenedis.me {
    class CharSkillPlayModel {
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
}

declare module scene3d_me {
    class OverrideEngine extends Pan3d.Engine {
        constructor();
        static initConfig(): void;
        static update(): void;
        static resetSize(width?: number, height?: number): void;
        static init($caves: HTMLCanvasElement): void;
    }
}

declare module scene3d_me {
    class OverrideSceneManager extends Pan3d.SceneManager {
        constructor();
        static initConfig(): void;
        update(): void;
    }
}

declare module scene3d_me {
    class ExpTextJumpUiDrawAndRefreash256 extends Pan3d.ExpTextJumpUiDrawAndRefreash {
        protected drawTxtBydigitalAndtext($vo: Pan3d.TextJumpUiVo): number;
    }
}
declare module scene3d_me {
    class OverrideBloodManager extends Pan3d.BloodManager {
        static getInstance(): OverrideBloodManager;
        private _jumpText256_256;
        constructor();
        setExpJump256_256Num($textJumpUiVo: Pan3d.TextJumpUiVo): void;
    }
}

declare module scene3d_me {
    class Scene3dInit {
        static isConfig: boolean;
        static initData(): void;
    }
}

declare module scene2d_me {
    class Override2dEngine extends scene3d_me.OverrideEngine {
        constructor();
        static htmlScale: number;
        static initConfig(): void;
        static resetSize(width?: number, height?: number): void;
        static init($caves: HTMLCanvasElement): void;
        static resetViewMatrx3D(): void;
    }
}

declare module scene2d_me {
    class Override2dSceneManager extends scene3d_me.OverrideSceneManager {
        constructor();
        static initConfig(): void;
        update(): void;
    }
}

declare module scene2d_me {
    class CanvasPostionModel {
        private static _instance;
        static getInstance(): CanvasPostionModel;
        constructor();
        initSceneFocueEvent(): void;
        private lastPostionV2d;
        private _lastMousePos;
        private _isMouseDown;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
        tureMoveV2d: Pan3d.Vector2D;
        resetSize(): void;
    }
}

declare module scene2d_me {
    class Scene2dChar extends Pan3d.SceneChar {
        setWeaponByAvatar(avatar: number, $suffix?: string): void;
        setWingByID($wingId: string): void;
        setMountById($mountId: string): void;
        set2dPos($x: number, $y: number): void;
        rotationY: number;
    }
}

declare module scene2d_me {
    class Ground2dBaseShader extends Pan3d.Shader3D {
        static Ground2dBaseShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Ground2dBaseSprite extends Pan3d.Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        setPicUrl($url: string): void;
        _uvTextureRes: Pan3d.TextureRes;
        upToGpu(): void;
        update(): void;
        width: number;
        height: number;
        static perentpos: Pan3d.Vector2D;
        private getMoveSizeData;
    }
    class GroundModel {
        private static _instance;
        static getInstance(): GroundModel;
        constructor();
        update(): void;
        addGroundPicByeUrl($url?: string, $rect?: Pan3d.Rectangle): Ground2dBaseSprite;
        private _groundItem;
    }
}

declare module scene2d_me {
    class Scene2dInit {
        static isConfig: boolean;
        static initData(): void;
        private static addGridLineSprite;
    }
}

declare module scene2d_me {
    class AppDataArpg {
        static mainChar: Pan3d.SceneChar;
        static sceneStagePos: Pan3d.Vector2D;
        static lockMainChar: boolean;
        static math3dto2Darpg($p: Pan3d.Vector3D): Pan3d.Vector2D;
        static getScene2DBy3Dpostion($v3d: Pan3d.Vector3D): Pan3d.Vector2D;
        private static triItem;
        static math2Dto3DGroundarpg($p: Pan3d.Vector2D): Pan3d.Vector3D;
        private static math2dto3Darpg;
        private static _vpMatrixInver;
        static refrishPos($vec: Pan3d.Vector2D): void;
        static resetSelfPosCenter(): void;
    }
}

declare class mainpan3d_me {
    static canvas: HTMLCanvasElement;
}

declare module layapan_me {
    class OverrideSkillTrajectory extends Pan3d.SkillTrajectory {
        skill: OverrideSkill;
        reset(): void;
        addToRender(): void;
        endPlayFun(e?: Pan3d.BaseEvent): void;
        setInfo(obj: Pan3d.SkillKeyVo): void;
    }
}

declare module layapan_me {
    class OverrideSkillFixEffectKeyVo extends Pan3d.SkillFixEffectKeyVo {
        constructor();
    }
}

declare module layapan_me {
    import SkillData = Pan3d.SkillData;
    class OverrideSkill extends Pan3d.Skill {
        skillManager: LayaOverride2dSkillManager;
        baseName: string;
        constructor($skillManager?: LayaOverride2dSkillManager);
        skillComplete(): void;
        setData($data: any, $skillData: SkillData): void;
        setKeyAry(): void;
    }
}

declare module layapan_me {
    class OverrideSkillFixEffect extends Pan3d.SkillFixEffect {
        skill: OverrideSkill;
        constructor($skillvo: OverrideSkill);
        protected onPlayCom(event?: Event): void;
        addToRender(): void;
    }
}

declare module layapan_me {
    import ShadowManager = Pan3d.ShadowManager;
    class LayaOverrideShadowManager extends ShadowManager {
        constructor();
    }
}

declare module layapan_me {
    import Shader3D = Pan3d.Shader3D;
    import Display3DParticle = Pan3d.Display3DParticle;
    import CombineParticle = Pan3d.CombineParticle;
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import ParticleManager = Pan3d.ParticleManager;
    import TextureRes = Pan3d.TextureRes;
    class Frame3DParticleShader extends Shader3D {
        static Frame3DParticleShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Frame3DParticle extends Display3DParticle {
        private shader;
        private beginTime;
        private static baseFrameObjData;
        constructor();
        updateTime(t: number): void;
        private objData;
        protected initData(): void;
        private speedTm;
        private picNum;
        private loop;
        private makeFrameParticle;
        static getFrameParticle(pathurl: string, fileBaseName: string, info: any): CombineParticle;
        private loadTexture;
        private frameTextureItem;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        update(): void;
    }
    class AtlasFrameVo {
        frame: any;
        sourceSize: any;
        spriteSourceSize: Pan3d.Vector2D;
        key: string;
        meshData(value: any): void;
    }
    class Frame3DAtlasShader extends Shader3D {
        static Frame3DAtlasShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Frame3DAtlasParticle extends Display3DParticle {
        private shader;
        private beginTime;
        private static baseFrameObjData;
        constructor();
        updateTime(t: number): void;
        private objData;
        protected initData(): void;
        private timeLen;
        private loop;
        private frameScale;
        private isShow;
        private makeFrameParticle;
        private frameInfoItem;
        private LoadAtlas;
        static getFrameParticle(pathurl: string, fileBaseName: string, info: any): CombineParticle;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        update(): void;
        private uvchangeData;
    }
    class LayaOverride2dParticleManager extends ParticleManager {
        constructor();
        getParticleByte($url: string): CombineParticle;
        registerUrl($url: string): void;
        releaseUrl($url: string): void;
        addResByte($url: string, $data: Pan3dByteArray): void;
    }
}

declare module layapan_me {
    class LayaOverride2dEngine extends scene3d_me.OverrideEngine {
        constructor();
        static initConfig(): void;
        static uiScaleresize(): void;
    }
}

declare module layapan_me {
    import SkillRes = Pan3d.SkillRes;
    import SkillData = Pan3d.SkillData;
    import SkillManager = Pan3d.SkillManager;
    class LayaOverride2dSkillManager extends SkillManager {
        sceneManager: LayaOverride2dSceneManager;
        constructor($sceneManager: LayaOverride2dSceneManager);
        addSrc($url: string, skillData: SkillData): void;
        playSkill($skill: OverrideSkill): void;
        getSkill($url: string, $name: string, $callback?: Function): OverrideSkill;
        protected loadSkillCom($url: string, $skillRes: SkillRes): void;
    }
}

declare module layapan_me {
    class LayaGroupRes extends Pan3d.GroupRes {
        constructor();
        scene: LayaOverride2dSceneManager;
        readParticle(): void;
    }
    class LayaOverrideGroupDataManager extends Pan3d.GroupDataManager {
        scene: LayaOverride2dSceneManager;
        getGroupData($url: string, $fun: Function): void;
    }
}

declare module layapan_me {
    import Display3dMovie = Pan3d.Display3dMovie;
    class LayaOverride2dSceneManager extends scene3d_me.OverrideSceneManager {
        private static sceneNum;
        constructor();
        shadowManager: LayaOverrideShadowManager;
        groupDataManager: LayaOverrideGroupDataManager;
        skillManager: LayaOverride2dSkillManager;
        particleManager: LayaOverride2dParticleManager;
        static initConfig(): void;
        update(): void;
        changeBloodManager($bloodManager: Pan3d.BloodManager): void;
        addMovieDisplay($display: Display3dMovie): void;
        loadSceneConfigCom(obj: any): void;
        playLyf($url: string, $pos: Pan3d.Vector3D, $r?: number): void;
        charPlaySkill($char: layapan_me.LayaSceneChar, $skillfile: string): void;
        protected onPlayCom(value: Pan3d.BaseEvent): void;
        cameraMatrix: Pan3d.Matrix3D;
        viewMatrx3D: Pan3d.Matrix3D;
        upFrame(): void;
    }
}

/**
* name
*/
declare module layapan_me {
    import MeshData = Pan3d.MeshData;
    import GroupRes = Pan3d.GroupRes;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    import Skill = Pan3d.Skill;
    class LayaSceneBaseChar extends Pan3d.Display3dMovie {
        private _avatar;
        _visible: boolean;
        changeColor: Array<number>;
        constructor();
        alpha: number;
        private _alpha;
        updateMaterialMesh($mesh: MeshData): void;
        skillVo: Skill;
        protected _walkPath: Array<Vector3D>;
        playSkill($skill: Skill): void;
        setMaterialTextureAlpha($material: Material, $mp?: MaterialBaseParam): void;
        private static alphaShader;
        private makeAlphaShader;
        visible: boolean;
        setAvatar(num: number): void;
        shadow: boolean;
        update(): void;
        protected getSceneCharAvatarUrl(num: number): string;
        protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
        isPlaying(): boolean;
        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
        removeStage(): void;
        px: number;
        py: number;
        pz: number;
        addSkinMeshParticle(): void;
    }
}

/**
* name
*/
declare module layapan_me {
    import CharNameMeshVo = Pan3d.CharNameMeshVo;
    import BloodLineMeshVo = Pan3d.BloodLineMeshVo;
    import Display3D = Pan3d.Display3D;
    import Skill = Pan3d.Skill;
    import Vector3D = Pan3d.Vector3D;
    import Vector2D = Pan3d.Vector2D;
    import Display3dMovie = Pan3d.Display3dMovie;
    import GroupRes = Pan3d.GroupRes;
    class LayaSceneChar extends LayaSceneBaseChar {
        static BLOOD_COLOR_HP: number;
        static BLOOD_COLOR_ANGER: number;
        skillitem: Array<Pan3d.Skill>;
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
        protected _pScale: number;
        tittleHeight: number;
        private _optimization;
        constructor();
        /**强制角度 */
        forceRotationY: number;
        pRotationY: number;
        pScale: number;
        protected _mountChar: LayaSceneBaseChar;
        setMount(v: string): boolean;
        protected _wingDisplay: LayaSceneBaseChar;
        setWing(v: string): void;
        private _weaponNum;
        setWeapon(num: number): void;
        setWeaponByAvatar(avatar: number, $suffix?: string): void;
        addPart($key: string, $bindSocket: string, $url: string): void;
        addPartToPos($key: string, $url: string, $pos?: Vector3D): void;
        protected loadPartToPos(groupRes: GroupRes, ary: Array<any>, $pos: Vector3D): void;
        removePart($key: string): void;
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
        visible: boolean;
        optimization: boolean;
        protected _resultVisible: boolean;
        readonly resultVisible: boolean;
        applyVisible(): void;
        protected _isCamera2D: boolean;
        isCamera2D: boolean;
        protected _charBloodVo: BloodLineMeshVo;
        protected _bloodColor: number;
        bloodColor: number;
        private _hpRatio;
        hpRatio: number;
        protected _bloodEnable: boolean;
        bloodEnable: boolean;
        protected _charAngerVo: BloodLineMeshVo;
        protected _angerColor: number;
        angerColor: number;
        private _angerRatio;
        angerRatio: number;
        private _angerEnable;
        angerEnable: boolean;
        protected _charNameVo: CharNameMeshVo;
        protected _charName: string;
        charName: string;
        protected _nameEnable: boolean;
        nameEnable: boolean;
        updateBind(): void;
        private updateWeaponScale;
        refreshPos(): void;
        px: number;
        pz: number;
        private lineSprite;
        update(): void;
        math_distance($other: Display3dMovie): number;
        get2dPos(): Vector2D;
        set2dPos($x: number, $y: number): void;
        private _showHitBox;
        protected _triIndex: Array<number>;
        protected _hitBox2DItem: Array<Vector2D>;
        private math3DWorldtoDisplay2DPos;
        mouseClik(lineA: Vector3D, $lineB: Vector3D): boolean;
        removeStage(): void;
        addStage(): void;
    }
}

declare module pack {
    interface ITile {
        getName(): string;
        version: number;
    }
}

declare module pack {
    import Material = Pan3d.Material;
    import ObjData = Pan3d.ObjData;
    import EventDispatcher = Pan3d.EventDispatcher;
    class Prefab extends EventDispatcher implements ITile {
        getName(): string;
        url: string;
        objsurl: string;
        objData: ObjData;
        textureurl: string;
        material: Material;
        version: number;
    }
}

declare module pack {
    class PrefabStaticMesh extends Prefab {
        paramInfo: Array<any>;
        sunColor: Vector3D;
        constructor();
        getObject(): any;
    }
}

declare module pack {
    class RoleStaticMesh extends Prefab {
        skinMesh: any;
        animDic: any;
        animPlayKey: string;
        constructor();
        getObject(): any;
    }
}

declare module pack {
    import EventDispatcher = Pan3d.EventDispatcher;
    class SkillStatcMesh extends EventDispatcher implements ITile {
        skillUrl: string;
        roleUrl: string;
        url: string;
        actionnum: number;
        interval: number;
        version: number;
        constructor();
        getObject(): any;
        getName(): string;
    }
}

declare module pack {
    class PackMaterialManager {
        private static _instance;
        static getInstance(): PackMaterialManager;
        constructor();
        private dic;
        private loadDic;
        replaceMaterialByUrl($url: string): void;
        private makeRoleShader;
        outShader($str: string): void;
        makeMaterialShaderByByte($byte: Pan3d.Pan3dByteArray, $url: string, Met?: materialui.MaterialTree): materialui.MaterialTree;
        getMaterialByUrl($url: string, bfun: Function): void;
        private makeConstList;
        private makeFc;
        private loadTextureRes;
        private makeTextList;
    }
}

declare module pack {
    class PackObjDataManager {
        private static _instance;
        static getInstance(): PackObjDataManager;
        private dic;
        private loadDic;
        getObjDataByUrl($url: string, bfun: Function): void;
        readTxtToModel($str: string): ObjData;
    }
}

declare module pack {
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    class PackPrefabManager {
        private static _instance;
        static getInstance(): PackPrefabManager;
        constructor();
        private dic;
        private loadDic;
        private playBfun;
        makeMaterialBaseParam(materialParam: MaterialBaseParam, paramInfo: Array<any>): void;
        private makeParamValue;
        private mekeParamTexture;
        getPrefabByUrl($url: string, bfun: Function): void;
    }
}

declare module pack {
    import Dictionary = Pan3d.Dictionary;
    class PackRoleManager {
        private static _instance;
        static getInstance(): PackRoleManager;
        constructor();
        private dic;
        private loadDic;
        private playBfun;
        private makeBufToRole;
        private pushToBuff;
        private getFloat32ArrayByArr;
        protected getmeshBoneQPAryDic($arr: any): Dictionary;
        getRoleZzwByUrl($url: string, bfun: Function): void;
        private loadMeshArrBy;
    }
}

declare module pack {
    class PackSkillManager {
        private static _instance;
        static getInstance(): PackSkillManager;
        private dic;
        private loadDic;
        private playBfun;
        getPrefabByUrl($url: string, bfun: Function): void;
    }
}

declare module md5list {
    import MeshData = Pan3d.MeshData;
    import ObjectBone = Pan3d.ObjectBone;
    class MeshToObjUtils {
        getObj(mesh: Md5MeshData): MeshData;
        private getW;
        processBoneNew(targetAry: Array<ObjectBone>): Array<ObjectBone>;
        static getStorNewTargerArr(targetAry: Array<ObjectBone>): Array<ObjectBone>;
    }
}

declare module md5list {
    class Md5Analysis {
        constructor();
        addMesh(str: string): Md5MeshData;
        joinJoints(meshData: Md5MeshData): void;
        private joinUV;
        private joinPoint;
        joinTri(meshData: Md5MeshData): void;
        private genewStr;
    }
}

declare module md5list {
    import Matrix3D = Pan3d.Matrix3D;
    import ObjectBone = Pan3d.ObjectBone;
    class Md5animAnalysis {
        allFrames: Array<Array<ObjectBone>>;
        framesok: Boolean;
        private _dir;
        private _hierarchyitem;
        private _hierarchy;
        private _baseframe;
        private _bounds;
        private _frame;
        bigArr: Array<string>;
        resultInfo: any;
        private loopKey;
        private boundsKey;
        private nameHeightKey;
        private interKey;
        private pos;
        /**
         * 包围盒最终数据
         */
        private _boundFrameAry;
        private _posFrameAry;
        private _interAry;
        addAnim(ini: String): Array<Array<Matrix3D>>;
        private setFrameToMatrix;
        private getW;
        private setRestult;
        private _pushhierarchyitem;
        private _pushbasefamer;
        _pushfamers(): void;
        _getsamplefamer(_framesample: Array<any>): Array<ObjectBone>;
        private getBoneFilterStr;
        private handleBigWord;
    }
}

declare module md5list {
    import Shader3D = Pan3d.Shader3D;
    import Display3DSprite = Pan3d.Display3DSprite;
    import MeshData = Pan3d.MeshData;
    import TextureRes = Pan3d.TextureRes;
    class Md5MeshShader extends Shader3D {
        static Md5MeshShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Md5MeshSprite extends Display3DSprite {
        private md5shader;
        constructor();
        setMd5BodyUrl($url: string): void;
        private _md5MeshData;
        private loadBodyMesh;
        private md5objData;
        protected loadTexture(): void;
        protected _uvTextureRes: TextureRes;
        private baseShder;
        updateMaterialMesh($mesh: MeshData): void;
        update(): void;
        updateMaterialMeshCopy(): void;
    }
}

declare module md5list {
    import Display3DSprite = Pan3d.Display3DSprite;
    import ObjData = Pan3d.ObjData;
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
    import Matrix3D = Pan3d.Matrix3D;
    import TextureRes = Pan3d.TextureRes;
    class Md5MoveSprite extends Display3DSprite {
        private md5shader;
        constructor();
        md5MeshData: Md5MeshData;
        md5objData: ObjData;
        protected loadBodyMesh(): void;
        private bodyUrl;
        private animUrl;
        setMd5url($bodyurl: string, $animurl: string, $picurl?: string): void;
        frameQuestArr: Array<DualQuatFloat32Array>;
        protected loadAnimFrame(): void;
        protected makeDualQuatFloat32Array($frameAry: Array<Matrix3D>): DualQuatFloat32Array;
        protected loadTexture(): void;
        protected uvTextureRes: TextureRes;
        private baseShder;
        update(): void;
        private lastTm;
        private _actionTime;
        updateMaterialMeshCopy(): void;
        private skipNum;
    }
}

declare module md5list {
    import Vector3D = Pan3d.Vector3D;
    import MeshData = Pan3d.MeshData;
    import Dictionary = Pan3d.Dictionary;
    import ObjectBone = Pan3d.ObjectBone;
    class ObjectTri {
        id: number;
        t0: number;
        t1: number;
        t2: number;
        constructor();
    }
    class ObjectWeight {
        x: number;
        y: number;
        z: number;
        w: number;
        weight: number;
        boneId: number;
        id: number;
        constructor();
        clone(): ObjectWeight;
    }
    class ObjectUv {
        x: number;
        y: number;
        z: number;
        a: number;
        b: number;
        w: number;
        id: number;
        constructor();
    }
    class MeshItem {
        verts: Vector3D;
        normal: Vector3D;
        uvInfo: ObjectUv;
        num: number;
    }
    class Md5MeshData extends MeshData {
        mesh: Dictionary;
        triItem: Array<ObjectTri>;
        weightItem: Array<ObjectWeight>;
        uvItem: Array<ObjectUv>;
        boneItem: Array<ObjectBone>;
        faceNum: number;
        dataAry: Array<number>;
        uvArray: Array<number>;
        boneWeightAry: Array<number>;
        bonetIDAry: Array<number>;
        indexAry: Array<number>;
    }
    class MeshImportSort {
        processMesh(meshData: Md5MeshData): void;
        beginKey: number;
        bindWidth: number;
        private processForAgal;
        uplodToGpu(meshData: MeshData, uvArray: Array<number>, ary3: Array<Array<number>>, boneWeightAry: Array<number>, bonetIDAry: Array<number>, indexAry: Array<number>): void;
        private getboneNum;
        /**
     * 返回映射关系列表
     * @param targetAry
     * @return
     *
     */
        private getMapValue;
    }
}

declare module win {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIConatiner = Pan3d.UIConatiner;
    class UIPanelEvent extends Pan3d.BaseEvent {
        static DISPOSE_PANEL_EVENT: string;
        panel: UIPanel;
    }
    class UIPanel extends UIConatiner {
        private _disposeEventFun;
        constructor();
        onAdd(): void;
        onRemove(): void;
        addRender($uiRender: UIRenderComponent): void;
        removeRender($uiRender: UIRenderComponent): void;
    }
}

declare module win {
    import UICompenent = Pan3d.UICompenent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import Grid9Compenent = Pan3d.Grid9Compenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Rectangle = Pan3d.Rectangle;
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import UIMask = Pan3d.UIMask;
    import Vector2D = Pan3d.Vector2D;
    class BaseWindow extends UIConatiner {
        private useMoseMove;
        protected onMouseWheelFun: any;
        constructor($rect?: Rectangle, $move?: boolean);
        protected _bRender: UIRenderComponent;
        protected _mRender: UIRenderComponent;
        protected _tRender: UIRenderComponent;
        protected _baseMidRender: UIRenderComponent;
        protected _baseTopRender: UIRenderComponent;
        protected _closeRender: UIRenderComponent;
        protected _uiMask: UIMask;
        protected mouseDown(evt: InteractiveEvent): void;
        private mouseIsDown;
        protected stageMouseMove(evt: InteractiveEvent): void;
        protected mouseUp(evt: InteractiveEvent): void;
        protected b_bottom_left: UICompenent;
        protected b_bottom_mid: UICompenent;
        protected b_bottom_right: UICompenent;
        protected b_bottom_line_left: UICompenent;
        protected b_bottom_line_right: UICompenent;
        protected b_win_close: UICompenent;
        static maskLevel: number;
        protected loadConfigCom(): void;
        protected c_win_bg: UICompenent;
        protected c_tittle_bg: UICompenent;
        protected c_left_line: UICompenent;
        protected c_right_line: UICompenent;
        protected c_bottom_line: UICompenent;
        protected c_scroll_bar_bg: UICompenent;
        protected c_scroll_bar: UICompenent;
        protected e_panel_1: Grid9Compenent;
        removeMoveEvent(): void;
        protected a_bg: UICompenent;
        protected a_tittle_bg: UICompenent;
        protected a_rigth_line: UICompenent;
        protected a_left_line: UICompenent;
        protected a_bottom_line: UICompenent;
        protected a_scroll_bar: UICompenent;
        protected a_scroll_bar_bg: UICompenent;
        protected contentHeight: number;
        setRect(value: Rectangle): void;
        private hideUiItem;
        setHideUi(value?: Array<string>): void;
        private showUiItem;
        setShowUi(value?: Array<string>): void;
        maskRoundRect: Rectangle;
        resize(): void;
        protected lastPagePos: Vector2D;
        protected lastMousePos: Vector2D;
        protected mouseMoveTaget: UICompenent;
        protected pageRect: Rectangle;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        protected tittleMouseUp(evt: InteractiveEvent): void;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
        protected moveListTy: number;
        protected changeScrollBar(): void;
    }
    class Dis2dBaseWindow extends win.BaseWindow {
        protected _baseRender: UIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        private panelInfo;
        private initData;
        private mathSize;
        private _textureRect;
        private _voNum;
        private _voRect;
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<Pan3d.baseMeshVo>;
        private makeBaseUi;
        showTemp($data: any): Disp2DBaseText;
        protected makeOtherRender(): UIRenderComponent;
        private clearLostItem;
        playLost(): void;
        clearOneTemp(): void;
        clearTemp($data: any): void;
        getVoByData(value: any): Disp2DBaseText;
        getVoByUi($ui: UICompenent): Disp2DBaseText;
        clearAll(): void;
        private updateFun;
        update(t: number): void;
        getUiItemLen(): number;
    }
}

declare module pack {
    class FileVo {
        name: string;
        path: string;
        suffix: string;
        isFolder: boolean;
        select: boolean;
        static PREFAB: string;
        static MATERIAL: string;
        static JPG: string;
        static PNG: string;
        static TXT: string;
        static OBJS: string;
        static MAP: string;
        static LYF: string;
        static ZZW: string;
        static SKILL: string;
        static MD5ANIM: string;
        static MD5MESH: string;
        meshStr(str: string): void;
        static meshObj(value: any): FileVo;
    }
    class FileOssModel {
        private static waitItem;
 
        private static oneByOne;
        private static saveDicfileGropFun;
        private static indexFileName;
        private static getDicByUrl;
        private static getPerentPath;
        static getDisByOss($dir: string, bfun: Function): void;
        static isMustUseOssGetDic: boolean;
        static getFolderArr($dir: string, bfun: Function): void;
        private static getTempOss;
        private static waitOssWrapper;
        private static getWarpperByUrl;
        static makeOssWrapper(bfun: Function): void;
        static makeOssWrapperCopy(bfun: Function): void;
        static deleFile($filename: string, $bfun?: Function): void;
        private static uploadFile;
        static copyFile(toUrl: string, srcoueUrl: string, $bfun?: Function): void;
        static WEB_SEVER_EVENT_AND_BACK(webname: string, postStr: string, $bfun?: Function): void;
        static webseverurl: string;
        private static isPostWeboffwx;
        private static waitItemUpFile;
        static version: number;
        static upOssFile(file: File, $fileUrl: string, $bfun?: Function): void;
        private static oneByOneUpFile;
        static upTempFileToOss(bfun: Function): void;
    }
}

declare module win {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Rectangle = Pan3d.Rectangle;
    import UIConatiner = Pan3d.UIConatiner;
    class LayBaseTab extends UIConatiner {
        static imgBaseDic: any;
        constructor();
        private _bottomRender;
        private _topRender;
        protected mouseDown(evt: InteractiveEvent): void;
        private mouseIsDown;
        protected stageMouseMove(evt: InteractiveEvent): void;
        protected mouseUp(evt: InteractiveEvent): void;
        private loadFinish;
        protected loadConfigCom(): void;
        protected butClik(evt: InteractiveEvent): void;
        pageRect: Rectangle;
        private _pageRect;
        private a_bg;
        private a_win_tittle;
        private a_bottom_line;
        private a_right_bottom;
        private a_rigth_line;
        private a_left_line;
        private refrishSize;
    }
}

declare module win {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Vector2D = Pan3d.Vector2D;
    class LayUIManager {
        private _uiList;
        _containerList: Array<UIConatiner>;
        readonly uiList: Array<UIRenderComponent>;
        constructor();
        addUI($ui: UIRenderComponent): void;
        removeUI($ui: UIRenderComponent): void;
        addUIContainer($container: UIConatiner): void;
        removeAll(): void;
        removeUIContainer($container: UIConatiner): void;
        hasWindowUI(): boolean;
        removeNoInterfaceUI(): void;
        resize(): void;
        upBgGroundZero(): void;
        update(): void;
        regEvent($touce: any): void;
        private onTouch;
        private onMouse;
        private lastSwipeDis;
        private lastSwipeRot;
        interactiveEvent($e: any): void;
        private lastMousePos;
        disMoveNnum(v2d: Vector2D, $num: number): boolean;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
        private lastTime;
    }
}

declare module win {
    import Rectangle = Pan3d.Rectangle;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Vector2D = Pan3d.Vector2D;
    import UICompenent = Pan3d.UICompenent;
    class Sprite extends LayUIManager {
        rect: Rectangle;
        private _rect;
        perent: Sprite;
        protected children: Array<Sprite>;
        onAdd(): void;
        onRemove(): void;
        constructor();
        addChild(value: Sprite): void;
        removeChild(value: Sprite): void;
        update(): void;
        resize(): void;
        x: number;
        y: number;
        width: number;
        height: number;
        getObjectsUnderPoint(evt: Vector2D): UICompenent;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
        changeSize(): void;
    }
}

declare module win {
    class LayoutbaseBg extends win.BaseWindow {
        protected loadConfigCom(): void;
    }
}

declare module win {
    class Panel extends Sprite {
        ishide: boolean;
        layer: number;
    }
}

declare module win {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Vector2D = Pan3d.Vector2D;
    import UICompenent = Pan3d.UICompenent;
    class GameUIInstance {
        constructor();
        static uiContainer: Sprite;
        static layoutBottom: Sprite;
        static layoutTop: Sprite;
    }
    class LayerManager {
        private static _instance;
        static getInstance(): LayerManager;
        children: Array<Panel>;
        initData(): void;
        addPanel($panel: Panel, $level: number, $isOnly?: boolean): void;
        removePanel($panel: Panel): void;
        update(): void;
        resize(): void;
        getObjectsUnderPoint(evt: Vector2D): UICompenent;
        static isHideMouseEvent: boolean;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
    }
}

declare module xyz {
    import Object3D = Pan3d.Object3D;
    class MouseVO extends Object3D {
        _mouseDown: Boolean;
        last_mouse_x: number;
        last_mouse_y: number;
        oldPosx: number;
        oldPosy: number;
        oldPosz: number;
        old_rotation_x: number;
        old_rotation_y: number;
    }
}

declare module xyz {
    import Matrix3D = Pan3d.Matrix3D;
    import Display3D = Pan3d.Display3D;
    class TooXyzPosData {
        id: number;
        type: number;
        oldx: number;
        oldy: number;
        oldz: number;
        oldangle_x: number;
        oldangle_y: number;
        oldangle_z: number;
        oldscale_x: number;
        oldscale_y: number;
        oldscale_z: number;
        x: number;
        y: number;
        z: number;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        baseMatrix3D: Matrix3D;
        changeModelMatrix3d(): void;
        updateMatrix(): void;
        modeMatrx3D: Matrix3D;
        dataItem: Array<TooXyzPosData>;
        spriteItem: Array<Display3D>;
        dataChangeFun: Function;
        dataUpDate: Function;
        static getTemapXyzPosData(_id: number, _x: number, _y: number, _z: number): TooXyzPosData;
        getEulerAngles(quat: any): Array<number>;
        upRootMatrix3DToItem(): void;
        static getBase($arr: Array<Display3D>, isCenten?: boolean): TooXyzPosData;
    }
}

declare module xyz {
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import Rectangle = Pan3d.Rectangle;
    import Display3D = Pan3d.Display3D;
    import SceneManager = Pan3d.SceneManager;
    class TooMathHitModel {
        private static getViewMatrx3D;
        static testHitModel(display3D: Display3D, scene: SceneManager, mouseV2: Vector2D): number;
        static getCamFontDistent(scene: SceneManager, mouseV2: Vector2D, $depht: number): Vector3D;
        static math3DWorldtoDisplay2DPos($pos: Vector3D, mat: Matrix3D, rect: Rectangle): Vector2D;
        static mathDisplay2Dto3DWorldPos($point: Vector2D, scene: SceneManager): Vector3D;
    }
}

declare module xyz {
    class TooMathMoveUint {
        static MOVE_NULL: number;
        static MOVE_XYZ: number;
        static MOVE_SCALE: number;
        static MOVE_ROUTATION: number;
    }
}

declare module xyz {
    import Object3D = Pan3d.Object3D;
    import Vector3D = Pan3d.Vector3D;
    class TooObjectHitBox extends Object3D {
        beginx: number;
        beginy: number;
        beginz: number;
        endx: number;
        endy: number;
        endz: number;
        id: number;
        pointVec: Array<Vector3D>;
        constructor($x?: number, $y?: number, $z?: number);
    }
}

declare module xyz {
    class TooXyzRotationMath {
    }
}

declare module xyz {
    import Display3D = Pan3d.Display3D;
    import Vector3D = Pan3d.Vector3D;
    class TooLineDisplaySprite extends Display3D {
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
}

declare module xyz {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    class TooBoxDisplay3DShader extends Shader3D {
        static TooBoxDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooBoxDisplay3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private makeBoxTampData;
        upToGpu(): void;
        colorVect: Vector3D;
        update(): void;
    }
}

declare module xyz {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    class TooJianTouDisplay3DShader extends Shader3D {
        static TooJianTouDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooJianTouDisplay3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private makeObjData;
        upToGpu(): void;
        colorVect: Vector3D;
        update(): void;
    }
}

declare module cctv {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    class TooJianTouDisplay3DShader extends Shader3D {
        static TooJianTouDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooRotationDisplay3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private mathRoundTri;
        upToGpu(): void;
        colorVect: Vector3D;
        update(): void;
    }
}

declare module xyz {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    class TooLineTri3DShader extends Shader3D {
        static TooLineTri3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooLineTri3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private makeBoxObjdata;
        private makeBoxTampData;
        upToGpu(): void;
        update(): void;
    }
}

declare module xyz {
    import Display3D = Pan3d.Display3D;
    class TooBaseModelLevel extends Display3D {
        parent: MoveScaleRotationLevel;
        constructor(value: MoveScaleRotationLevel);
        isHit(mouseVect2d: Vector2D): void;
        selectId: number;
        onMouseDown(mouseVect2d: Vector2D): void;
        onMouseUp(mouseVect2d: Vector2D): void;
        onMouseMove(mouseVect2d: Vector2D): void;
        testHitTemp(display3D: any, v2d: Vector2D, vec: Array<Vector3D>): void;
        update(): void;
    }
}

declare module xyz {
    class TooMoveLevel extends TooBaseModelLevel {
        private _boxA;
        private _boxB;
        private _boxC;
        private _lineA;
        private _lineB;
        private _lineC;
        constructor(value: MoveScaleRotationLevel);
        isHit(mouseVect2d: Vector2D): void;
        onMouseDown(mouseVect2d: Vector2D): void;
        private lastMatrix3d;
        private pointItem;
        onMouseUp(mouseVect2d: Vector2D): void;
        private getMouseHitPanelPos;
        private lastMousePosV3d;
        onMouseMove(mouseVect2d: Vector2D): boolean;
        private getMouseHitPos;
        update(): void;
    }
}

declare module xyz {
    class TooRotationLevel extends TooBaseModelLevel {
        private _roundA;
        private _roundB;
        private _roundC;
        constructor(value: MoveScaleRotationLevel);
        isHit(mouseVect2d: Vector2D): void;
        onMouseDown(mouseVect2d: Vector2D): void;
        private showYaix;
        private _linePosinA;
        private _linePosinB;
        onMouseUp(mouseVect2d: Vector2D): void;
        private lastDis;
        private testInfo;
        onMouseMove(mouseVect2d: Vector2D): boolean;
        update(): void;
    }
}

declare module xyz {
    class TooScaleLevel extends TooBaseModelLevel {
        private _boxA;
        private _boxB;
        private _boxC;
        private _lineA;
        private _lineB;
        private _lineC;
        constructor(value: MoveScaleRotationLevel);
        isHit(mouseVect2d: Vector2D): void;
        onMouseDown(mouseVect2d: Vector2D): void;
        private lastScaleV3d;
        private lastMatrix3d;
        private pointItem;
        onMouseUp(mouseVect2d: Vector2D): void;
        private getMouseHitPanelPos;
        private lastMousePosV3d;
        onMouseMove(mouseVect2d: Vector2D): boolean;
        private getMouseHitPos;
        update(): void;
    }
}

declare module xyz {
    import Display3D = Pan3d.Display3D;
    class MoveScaleRotationLevel extends Display3D {
        private _tooMoveLevel;
        private _tooRotationLevel;
        private _tooScaleLevel;
        _statceType: number;
        constructor();
        lookLenToFocu: number;
        update(): void;
        addStage(): void;
        dataUpDate(): void;
        private _xyzMoveData;
        xyzMoveData: TooXyzPosData;
        onMouseMove($e: MouseEvent): void;
        private upChange;
        onMouseUp($e: MouseEvent): void;
        onMouseDown($e: MouseEvent): void;
    }
}

declare module xyz {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIConatiner = Pan3d.UIConatiner;
    class MoveScaleRotatioinEvent extends BaseEvent {
        static INIT_MOVE_SCALE_ROTATION: string;
        static INIT_UICONTAINER_TO_XYZ: string;
        static MAKE_DTAT_ITEM_TO_CHANGE: string;
        static CLEAR_XYZ_MOVE_DATA: string;
    }
    class MoveScaleRotatioinModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MoveScaleRotatioinProcessor extends BaseProcessor {
        getName(): string;
        uiContainer: UIConatiner;
        private moveScaleRotationLevel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private makeBaseData;
        private mouseInfo;
        private selectScene;
        private onMouseWheelFun;
        private onMouseDownFun;
        private onMouseMoveFun;
        private onMouseUpFun;
        private onKeyDownFun;
        private onKeyUpFun;
        private addEvents;
        private removeEvents;
        private selectVec;
        private getCamData;
        private readonly isCanToDo;
        private A;
        private B;
        private C;
        private baseCamData;
        private disMatrix3D;
        private onMouseMove;
        private mouseHitInWorld3D;
        private middleMovetType;
        private _middleMoveVe;
        private onMouseDown;
        private onMouseUp;
        private onKeyDown;
        private cancalAltKey;
        private onKeyUp;
        onMouseWheel($evt: MouseWheelEvent): void;
        private getCamForntPos;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

import ObjData = Pan3d.ObjData;
import Vector3D = Pan3d.Vector3D;
import Vector2D = Pan3d.Vector2D;
declare class TBNUtils {
    constructor();
    static processTBN(_objData: ObjData, normalV4?: Boolean): void;
}

declare module left {
    import Md5MoveSprite = md5list.Md5MoveSprite;
    class LocalMd5MoveSprite extends Md5MoveSprite {
        private meshItem;
        constructor();
        addLocalMeshByStr($str: string): void;
        addLocalAdimByStr($str: string): void;
        update(): void;
        protected loadBodyMesh(): void;
        protected loadAnimFrame(): void;
    }
}

declare module left {
    import Display3DSprite = Pan3d.Display3DSprite;
    import Material = Pan3d.Material;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    class MaterialModelSprite extends Display3DSprite {
        constructor();
        setMaterialVc($material: Material, $mp?: MaterialBaseParam): void;
        setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
        setMaterialVaIndependent(): void;
        protected setBaseMaterialVc($material: Material): void;
        readTxtToModel($str: string): void;
        private readonly isTextureLoadFinish;
        update(): void;
    }
}

declare module left {
    import MaterialShader = Pan3d.MaterialShader;
    class BuildMaterialShader extends MaterialShader {
        static BuildMaterialShader: string;
        constructor();
        buildParamAry($material: materialui.MaterialTree): void;
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
    }
}

declare module left {
    import MaterialAnimShader = Pan3d.MaterialAnimShader;
    class RoleMaterialShader extends MaterialAnimShader {
        static RoleMaterialShader: string;
        constructor();
        buildParamAry($material: materialui.MaterialTree): void;
        binLocation($context: WebGLRenderingContext): void;
        static getMd5M44Str(): string;
        static getMd5M44NrmStr(): string;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}

declare module left {
    import Display3dMovie = Pan3d.Display3dMovie;
    import MeshData = Pan3d.MeshData;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    import Material = Pan3d.Material;
    import SkinMesh = Pan3d.SkinMesh;
    import Skill = Pan3d.Skill;
    class MaterialRoleSprite extends Display3dMovie {
        update(): void;
        skinMesh: SkinMesh;
        animDic: any;
        updateFrame(t: number): void;
        setVcMatrix($mesh: MeshData): void;
        updateMaterialMesh($mesh: MeshData): void;
        setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
        skillVo: Skill;
        protected _walkPath: Array<Vector3D>;
        playSkill($skill: Skill): void;
        setVaCompress($mesh: MeshData): void;
        changeRoleWeb(dis: md5list.Md5MoveSprite): void;
        private getmeshBoneQPAryDic;
        roleStaticMesh: pack.RoleStaticMesh;
        setRoleZwwUrl(url: string): void;
        protected meshParamInfo(): void;
    }
}

declare module left {
    import FBO = Pan3d.FBO;
    import Display3D = Pan3d.Display3D;
    class SceneRenderToTextrue {
        private static _instance;
        static getInstance(): SceneRenderToTextrue;
        private renderContext;
        private fw;
        private fh;
        private getFBO;
        private updateDepthTexture;
        viweLHnumber: number;
        resetViewMatrx3D(): void;
        fbo: FBO;
        renderToTexture($item: Array<Display3D>): void;
    }
}

declare module left {
    import Shader3D = Pan3d.Shader3D;
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    import Material = Pan3d.Material;
    import Display3D = Pan3d.Display3D;
    class ModelShowModel {
        private static _instance;
        static getInstance(): ModelShowModel;
        modelSprite: MaterialModelSprite;
        roleSprite: MaterialRoleSprite;
        addBaseModel(): void;
        changeWebModel(): void;
        webmd5Sprite: LocalMd5MoveSprite;
        private makeMd5MoveSprite;
        private _time;
        _bigPic: UIRenderOnlyPicComponent;
        update(t: any): void;
        selectShowDisp: Display3D;
        readTxtToModelBy(value: string): void;
        changeRoleUrl(value: string): void;
        private makeRoleShader;
        private makeBuldShader;
        outShaderStr($treeMater: materialui.MaterialTree): void;
        getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
    }
}

declare module pack {
    import RoleRes = Pan3d.RoleRes;
    import SkinMesh = Pan3d.SkinMesh;
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import MeshData = Pan3d.MeshData;
    import MeshDataManager = Pan3d.MeshDataManager;
    class MeshDataChangeManager extends MeshDataManager {
        readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
        readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void;
        private readChangeBuff;
        readBytes2ArrayBuffer($byte: Pan3dByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType?: number): void;
    }
    class RoleChangeRes extends RoleRes {
        meshDataChangeManager: MeshDataChangeManager;
        constructor();
        protected readNext(): void;
        readMesh(): void;
    }
    class RoleChangeModel {
        private static _instance;
        static getInstance(): RoleChangeModel;
        private materialRoleSprite;
        private changeRoleModel;
        loadLocalFile(arrayBuffer: ArrayBuffer, roleDis: left.MaterialRoleSprite): void;
        makeBufToRole(meshData: MeshData): void;
        private pushToBuff;
        private makeMeshData;
        private meshAnimDic;
        getChangeRoleStr(): string;
        private getFloat32ArrayByArr;
        private getmeshBoneQPAryDic;
        private loatMaterialTree;
        private loadWebRole;
    }
}

declare module editscene {
    class ChangeNameModel {
        private static _instance;
        static getInstance(): ChangeNameModel;
        constructor();
        private chatHtmlInput;
        private _chatHtmlInput;
        private setInputTxtPos;
        private changFun;
        private changeInputTxt;
        private onMouseDownFun;
        getTextMetrics($str: string, fontsize?: number): TextMetrics;
        private changeBfun;
        changeName(rect: Pan3d.Rectangle, str: string, bfun: Function): void;
        private onMouseDown;
    }
}

declare module editscene {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Rectangle = Pan3d.Rectangle;
    import UIAtlas = Pan3d.UIAtlas;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    class MenuListData {
        label: string;
        level: number;
        subMenu: Array<MenuListData>;
        select: boolean;
        key: string;
        static showSon: boolean;
        constructor($label: string, $key?: string);
    }
    class LabelTxtVo extends Disp2DBaseText {
        uiScale: number;
        static shareUiAtlas: UIAtlas;
        makeData(): void;
        drawToUiAtlasToCtx($ctx: CanvasRenderingContext2D, $fromuiAtlas: UIAtlas, $shareName: string, $posRect: Rectangle): void;
    }
    class EditTopMenuPanel extends Dis2DUIContianerPanel {
        static _instance: any;
        static getInstance(): EditTopMenuPanel;
        private _bottomRender;
        constructor();
        private winBg;
        private loadConfigCom;
        resize(): void;
        private menuXmlItem;
        initMenuData(value: any): void;
        private getMenu0;
        private getMenu1;
        private getMenu2;
        private meneType;
        makeSceneTopMenu(): void;
        makeTextureTopMenu(): void;
        private menuBfun;
        private isRoleFile;
        private inputH5roleRes;
        private changeZZW;
        showMainUi(): void;
        private onStageMouseUp;
        showTempMenu($data: MenuListData, i: number, tx: number, ty: number): LabelTxtVo;
        clearTemp($data: any): void;
        private setColorByLevel;
        private removeOtherSonMenu;
        protected butMove(evt: InteractiveEvent): void;
        private bfun;
        protected onMouseUp(evt: InteractiveEvent): void;
        private showSon;
    }
}

declare module editscene {
    import Sprite = win.Sprite;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class TempSceneLine extends win.BaseWindow {
        private leftLine;
        private rightLine;
        private bottomLine;
        private leftLineMin;
        private rightLineMin;
        private bottomLineMin;
        private closeLeftBut;
        private closeRightBut;
        private closeBottomBut;
        protected loadConfigCom(): void;
        private hideItemDic;
        protected butClik(evt: InteractiveEvent): void;
        leftSpeed: number;
        private _leftSpeed;
        rightSpeed: number;
        private _rightSpeed;
        bottomSpeed: number;
        private _bottomSpeed;
        private leftWidthNum;
        private rightWidthNum;
        private bottomHeightNum;
        resize(): void;
        protected lastLaoutVec: Vector3D;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        private menuHeight;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
    }
    class EditSceneLine extends Sprite {
        private winBg;
        constructor(has?: boolean);
    }
}

declare module editscene {
    import Panel = win.Panel;
    import UIConatiner = Pan3d.UIConatiner;
    class EditLeftPanel extends Panel {
        static leftPanel: EditLeftPanel;
        addUIContainer($container: UIConatiner): void;
        private removeNeedRemove;
        removeUIContainer($container: UIConatiner): void;
        resize(): void;
    }
}

declare module editscene {
    import Rectangle = Pan3d.Rectangle;
    import UICompenent = Pan3d.UICompenent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Panel = win.Panel;
    class RightTabInfoVo {
        label: string;
        view: prop.MetaDataView;
    }
    class RightTabText extends Disp2DBaseText {
        bgUi: UICompenent;
        textMetrics: Rectangle;
        rightTabInfoVo: RightTabInfoVo;
        select: boolean;
        private _select;
        makeData(): void;
    }
    class RightOpenList {
        private perent;
        private topRender;
        constructor(value: MainRightBaseWin, render: UIRenderComponent);
        private tabItemArr;
        private tabBgClik;
        removePathUrl(value: RightTabInfoVo): void;
        changeVoBg(vo: RightTabText, value: boolean): void;
        private refrishTabUiSelect;
        private testIsNeedAdd;
        pushPathUrl(value: RightTabInfoVo): void;
        private selectRightTabInfoVo;
    }
    class MainRightBaseWin extends win.Dis2dBaseWindow {
        constructor();
        private e_file_list_path_bg;
        protected loadConfigCom(): void;
        private skilNum;
        pushViewToTab(value: prop.MetaDataView): void;
        private rightOpenList;
        resize(): void;
    }
    class MainRightPanel extends Panel {
        protected winBg: MainRightBaseWin;
        constructor(has?: boolean);
        readonly mainRightBaseWin: MainRightBaseWin;
        changeSize(): void;
    }
}

declare module editscene {
    import Panel = win.Panel;
    import UIConatiner = Pan3d.UIConatiner;
    class CentenPanel extends Panel {
        addUIContainer($container: UIConatiner): void;
    }
    class EditScenePanel extends Panel {
        constructor();
        private _sceneLaoutLinePane;
        private addSceneLaoutLinePane;
        private addCenten;
        private addRight;
        private addTop;
        private addLeft;
    }
}

declare module editscene {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class EditSceneEvent extends BaseEvent {
        static SHOW_EDITSCENE_PANEL: string;
        static EDITE_SCENE_RESIZE: string;
        static SHOW_HIDE_EDIT_TEMP_PANEL: string;
        static EDITE_SCENE_UI_LOAD_COMPLETE: string;
    }
    class EditSceneModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class EditSceneProcessor extends BaseProcessor {
        getName(): string;
        private _editScenePanel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private initSceneData;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module drag {
    class DragSource {
        type: string;
        name: string;
        url: string;
        icon: string;
    }
}

declare module drag {
    import UIConatiner = Pan3d.UIConatiner;
    interface IDragManager {
        doDrag(dragInitiator: UIConatiner, dragSource: DragSource, mouseEvent: MouseEvent): any;
    }
    class TempDrawManager implements IDragManager {
        doDrag(dragInitiator: UIConatiner, dragSource: DragSource, mouseEvent: MouseEvent): void;
    }
    class DragManager {
        static NONE: string;
        static COPY: string;
        static MOVE: string;
        static LINK: string;
        static dragSource: DragSource;
        static doDragdoDrag(dragInitiator: UIConatiner, node: DragSource): void;
    }
}

declare module drag {
    import UICompenent = Pan3d.UICompenent;
    import UIConatiner = Pan3d.UIConatiner;
    class DragPanel extends UIConatiner {
        private _bRender;
        private tempUiName;
        ui: UICompenent;
        constructor(w: number, h: number);
        setData(value: DragSource): void;
    }
}

declare module drag {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class PanDragEvent extends BaseEvent {
        static DRAG_SHOW: string;
        static DRAG_ENTER: string;
        static DRAG_DROP: string;
    }
    class DragModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class DragProcessor extends BaseProcessor {
        getName(): string;
        private _dragPanel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private topDrag;
        private addUIContainer;
        private addStageMoveEvets;
        private onMove;
        private getObjectsUnderPoint;
        private onUp;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module menutwo {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    class ComboTwoBoxMenu extends Dis2DUIContianerPanel {
        constructor();
        private _comboxData;
        private _comBoxFun;
        showComboBoxList($comboxData: Array<any>, $comBoxFun: Function): void;
        showTempMenu($data: MenuListData, i: number): LabelTxtVo;
        protected butMove(evt: InteractiveEvent): void;
        private setColorByLevel;
        clearAll(): void;
        clearTemp($data: any): void;
        protected onMouseUp(evt: InteractiveEvent): void;
    }
}

declare module menutwo {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    class MenuListData {
        label: string;
        level: number;
        subMenu: Array<MenuListData>;
        select: boolean;
        key: string;
        constructor($label: string, $key?: string);
    }
    class LabelTxtVo extends Disp2DBaseText {
        makeData(): void;
    }
    class MenuTwoPanel extends Dis2DUIContianerPanel {
        constructor();
        private menuXmlItem;
        initMenuData(value: any): void;
        private skipNum;
        showMainUi(): void;
        private onStageMouseUp;
        showTempMenu($data: MenuListData, i: number, ty: number): LabelTxtVo;
        clearTemp($data: any): void;
        private setColorByLevel;
        private removeOtherSonMenu;
        protected butMove(evt: InteractiveEvent): void;
        private bfun;
        protected onMouseUp(evt: InteractiveEvent): void;
        private showSon;
    }
}

declare module menutwo {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import Vector2D = Pan3d.Vector2D;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class MenuTwoEvent extends BaseEvent {
        static SHOW_RIGHT_MENU: string;
        static SHOW_COMBOX_MENU: string;
        posv2d: Vector2D;
        comboxData: Array<any>;
        comboxFun: Function;
    }
    class MenuTwoModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MenuTwoProcessor extends BaseProcessor {
        getName(): string;
        private _MenuTwoPanel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private _comboBoxMenuPanel;
        private showComboBoxMenuPanel;
        private showMenuPanel;
        private topMenuPanel;
        private addUIContainer;
        private removeUIContainer;
        onMouseDown($evt: InteractiveEvent): void;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module colorview {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Vector3D = Pan3d.Vector3D;
    import UIPanel = win.UIPanel;
    class ColorPanel extends UIPanel {
        _bottomRender: UIRenderComponent;
        _midRender: UIRenderComponent;
        _topRender: UIRenderComponent;
        constructor();
        applyLoad(): void;
        private c_tittle;
        private c_mainper;
        private c_out_color;
        private c_color_txt_bg;
        private c_close;
        private loadConfigCom;
        private c_text_r;
        private c_text_g;
        private c_text_b;
        private c_text_a;
        private c_text_info;
        private c_pickImg;
        private _currentMainPer;
        private _perX;
        private _perY;
        private changeFun;
        initColor(value: Vector3D, $bfun: Function): void;
        private showColor;
        private showColorTxt;
        private getHtxColor;
        private drawStrToUi;
        private drawOutColor;
        protected onUiStageUp(evt: InteractiveEvent): void;
        protected onMainColorMove(evt: InteractiveEvent): void;
        private _outColorVect;
        private onPanelColorMove;
        rgb2hsb(color: Vector3D): Vector3D;
        private mainColor;
        private changePanelColor;
        argbToHex16(r: number, g: number, b: number): number;
        private c_panel_color;
        private drawPanelColor;
        private maincary;
        private drawMainColor;
        private c_main_color;
        protected butClik(evt: InteractiveEvent): void;
        private lastPanelPos;
        private mouseXY;
        private addStageMoveEvets;
        private onMove;
        private onUp;
    }
}

declare module colorview {
    import BaseEvent = Pan3d.BaseEvent;
    import Vector3D = Pan3d.Vector3D;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class ColorEvent extends BaseEvent {
        static SHOW_COLOR_PANEL: string;
        static HIDE_COLOR_PANEL: string;
        bfun: Function;
        v3dColor: Vector3D;
    }
    class ColorModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class ColorProcessor extends BaseProcessor {
        getName(): string;
        protected receivedModuleEvent($event: BaseEvent): void;
        private hideColorPanel;
        private showColorPanel;
        private colorWinPanel;
        private colorPanel;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module prop {
    class BaseReflComponent {
        propPanle: UiMeshSprite;
        Category: string;
        protected _width: number;
        protected _height: number;
        protected _x: number;
        protected _y: number;
        protected _data: any;
        target: any;
        FunKey: string;
        changFun: Function;
        KeyStep: number;
        constructor(value: UiMeshSprite);
        protected _label: string;
        label: string;
        visible: boolean;
        private _visible;
        data: any;
        x: number;
        y: number;
        width: number;
        height: number;
        setTarget(obj: any): void;
        refreshViewValue(): void;
        protected initView(): void;
        destory(): void;
        resize(): void;
        protected drawOutColor(ui: Pan3d.UICompenent, $vcolor: Vector3D): void;
        protected drawUrlImgToUi(ui: Pan3d.UICompenent, url: string): void;
        protected drawImgToUi(ui: Pan3d.UICompenent, $img: any): void;
    }
}

declare module prop {
    class ReflectionData {
        static Key_Type: string;
        static Key_GetFun: string;
        static Key_SetFun: string;
        static Key_GetView: string;
        static Key_Data: string;
        static Key_Label: string;
        static Key_Category: string;
        static Key_Suffix: string;
        static Key_Step: string;
        static Key_MaxNum: string;
        static Key_MinNum: string;
        static Key_Tip: string;
        static Key_GetMaxNumFun: string;
        static Key_GetMinNumFun: string;
        static Key_SelectIndex: string;
        static NumberInput: string;
        static CaptureIdUi: string;
        static TEXT: string;
        static Num: string;
        static Input: string;
        static ComboBox: string;
        static ColorPick: string;
        static CheckBox: string;
        static Line: string;
        static Vec3: string;
        static Vec2: string;
        static Btn: string;
        static Texturue2DUI: string;
        static MaterialPicUi: string;
        static RoleMesh2DUI: string;
        static RoleAnim2DUI: string;
        static MeshScene2DUI: string;
        static MaterialFunContentUI: string;
        static MeshMaterialLeft2DUI: string;
        static AgalFunUI: string;
        static Vec3Color: string;
        static Vec2Prama: string;
        static UserView: string;
        static FunKey: string;
        static ClikEventKey: string;
        static Number: string;
    }
}

declare module prop {
    class MetaDataView {
        x: number;
        y: number;
        protected _data: any;
        protected _top: number;
        type: string;
        getMeshInfo(): any;
        onAdd(): void;
        onRemove(): void;
        top: number;
        width: number;
        protected _width: number;
        height: number;
        protected _height: number;
        private propPanle;
        constructor(value: UiMeshSprite);
        replayUiList(): void;
        getView(): Array<any>;
        data: any;
        ui: Array<BaseReflComponent>;
        private categoryKey;
        private hideCategory;
        creat(data: Array<any>): void;
        protected hideCategoryKey: any;
        categoryFun: Function;
        categoryClikUp(value: string): void;
        private getUiIndxByCategory;
        resize(): void;
        eventKey(value: string): void;
        creatComponent(obj: any): BaseReflComponent;
        getMaterialFunContentUI($obj: Object): MaterialFunContentUI;
        getMeshMaterialLeft2DUI($obj: Object): MeshMaterialLfetView2DUI;
        getMeshScene2DUI($obj: Object): MeshSceneView2DUI;
        getCategoryUI(value: string): Category2DUI;
        getTextField2DUI($obj: Object): TextField2DUI;
        getVec3($obj: Object): Vec3dCtrlUI;
        getVec2($obj: Object): Vec2PrameCtrlUI;
        getVec3Color($obj: Object): Vec3ColorCtrlUI;
        getComboBox($obj: Object): ComBoBoxCtrl2D;
        getCheckBox($obj: Object): CheckBox2DUI;
        getTexturue2DUI($obj: Object): Texturue2DUI;
        getMaterialPicUi($obj: Object): Material2DUI;
        getRoleMesh2DUI($obj: Object): RoleMesh2DUI;
        getRoleAnimi2DUI($obj: Object): RoleAnimi2DUI;
        getNumComponent($obj: Object): TextCtrlInput;
        getAgalFunComponent($obj: Object): AgalFunUI;
        refreshViewValue(): void;
        destory(): void;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class ComBoBoxCtrl2D extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected initView(): void;
        destory(): void;
        data: any;
        private comboxListTxt;
        protected comboBoxUiDown($evt: InteractiveEvent): void;
        protected selectFun(value: number): void;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    class CombineReflectionView extends MetaDataView {
        getMeshInfo(): any;
        private list;
        constructor(value: UiMeshSprite);
        replayUiList(): void;
        addView($view: MetaDataView): void;
        refreshViewValue(): void;
        destory(): void;
        resize(): void;
    }
}

declare module prop {
    class TextCtrlInput extends BaseReflComponent {
        private textLabelUI;
        private inputTextUi;
        protected initView(): void;
        destory(): void;
        visible: boolean;
        data: any;
        private onChangeInput;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    class MaterialParamUi extends BaseReflComponent {
        private uiItem;
        protected initView(): void;
        setData(item: Array<any>): void;
        private changeDataEvtFun;
        refreshViewValue(): void;
        destory(): void;
        resize(): void;
        data: any;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class Texturue2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected searchIcon: BaseMeshUi;
        protected initView(): void;
        protected searchClik(evt: InteractiveEvent): void;
        protected searchFileByPath(value: string): void;
        private getPerentPath;
        private onChangePicurl;
        private makeNewTextureByFile;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
        private _suffix;
        suffix: string;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class MeshSceneView2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected initView(): void;
        protected texturePicUiChange($evt: ReflectionEvet): void;
        private _suffix;
        suffix: string;
        private wheelEventFun;
        onMouseWheel($evt: MouseWheelEvent): void;
        protected butClik(evt: InteractiveEvent): void;
        private lastRotationY;
        private mouseDonwPos;
        private addStagetMouseMove;
        private removeStagetMouseMove;
        private onStageMouseMove;
        private onStageMouseUp;
        protected sceneManager: maineditor.EdItorSceneManager;
        protected initScene(): void;
        private upDataFun;
        protected oneByFrame(): void;
        destory(): void;
        data: any;
        private modelKey;
        private addUrlToView;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    class MaterialFunContentUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected inputFunTextUi: InputFunTextUi;
        protected initView(): void;
        texturePicUiChange(evt: ReflectionEvet): void;
        destory(): void;
        resize(): void;
        data: any;
        private nodeUi;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    import Material = Pan3d.Material;
    class LaterOtherDiplay3dSprite extends left.MaterialModelSprite {
        outTexture: WebGLTexture;
        setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
        maketRectMaterial(temp: materialui.MaterialTree): void;
        makeRectObjData(): void;
    }
    class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {
        private iconItem;
        protected initView(): void;
        protected butClik(evt: InteractiveEvent): void;
        x: number;
        resize(): void;
        destory(): void;
        protected texturePicUiChange($evt: ReflectionEvet): void;
        private defFileUrl;
        private refrishShowMaterialModel;
        private latersceneManager;
        protected initScene(): void;
        private ktvSprite;
        private setZzwUrlToRole;
        protected oneByFrame(): void;
        width: number;
        constructor(value: UiMeshSprite);
        private lastObjUrl;
        private setObjUrlToSprite;
        private modelSprite;
        private roleSprite;
        refreshViewValue(): void;
    }
}

declare module prop {
    class Material2DUI extends Texturue2DUI {
        private textureTree;
        protected initView(): void;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        private _materialTreeMc;
        paramChange(item: Array<any>): void;
        private showMaterialParamUi;
        resize(): void;
        protected searchClik(evt: Pan3d.InteractiveEvent): void;
        private makeTempInfo;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class RoleAnimi2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected deleIcon: BaseMeshUi;
        protected md5animUrlText: TextLabelUI;
        protected md5animPicUi: TexturePicUi;
        protected md5searchIcon: BaseMeshUi;
        private _animDic;
        protected initView(): void;
        protected md5searchIconClik(evt: InteractiveEvent): void;
        private drawInAnimUrl;
        protected deleIconDown($evt: InteractiveEvent): void;
        private getObjKeyLen;
        destory(): void;
        x: number;
        y: number;
        protected comboBoxUiDown($evt: InteractiveEvent): void;
        protected selectFun(value: number): void;
        refreshViewValue(): void;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class RoleMesh2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected deleIcon: BaseMeshUi;
        protected md5meshUrlText: TextLabelUI;
        protected md5meshPicUi: TexturePicUi;
        protected md5searchIcon: BaseMeshUi;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected texturesearchIcon: BaseMeshUi;
        private _skinMesh;
        private textureTree;
        protected initView(): void;
        protected deleIconDown($evt: InteractiveEvent): void;
        private drawInTextureUrl;
        private drawInMeshUrl;
        destory(): void;
        x: number;
        y: number;
        protected comboBoxUiDown($evt: InteractiveEvent): void;
        protected selectFun(value: number): void;
        data: any;
        private selectMeshId;
        refreshViewValue(): void;
        private _materialTreeMc;
        paramChange(item: Array<any>): void;
        private showMaterialParamUi;
        getParamItem(value: string): any;
        private makeTempInfo;
    }
}

declare module prop {
    class TextField2DUI extends BaseReflComponent {
        private textLabelUI;
        private infoLabelUi;
        protected initView(): void;
        private clikMouseUp;
        private clikEventInfo;
        clikEvent: string;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    class Category2DUI extends BaseReflComponent {
        private categoryBgUi;
        private categoryIcon;
        private categoryOpen;
        private textLabelUI;
        protected initView(): void;
        private clikMouseUp;
        resize(): void;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    class CheckBox2DUI extends BaseReflComponent {
        private boxIcon;
        private textLabelUI;
        protected initView(): void;
        private clikMouseUp;
        destory(): void;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
    class Vec2PrameCtrlUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected inputTextUiX: InputTextUi;
        protected inputTextUiY: InputTextUi;
        protected textX: TextLabelUI;
        protected textY: TextLabelUI;
        protected _v2d: Vector2D;
        protected initView(): void;
        destory(): void;
        visible: boolean;
        data: any;
        private inputTextUiXchange;
        private inputTextUiYchange;
        private changeV3d;
        protected colorPickUIchange($evt: ReflectionEvet): void;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        resize(): void;
        y: number;
        label: string;
    }
}

declare module prop {
    import Vector3D = Pan3d.Vector3D;
    class Vec3dCtrlUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected inputTextUiX: InputTextUi;
        protected inputTextUiY: InputTextUi;
        protected inputTextUiZ: InputTextUi;
        protected textX: TextLabelUI;
        protected textY: TextLabelUI;
        protected textZ: TextLabelUI;
        protected _v3d: Vector3D;
        protected initView(): void;
        destory(): void;
        visible: boolean;
        data: any;
        private inputTextUiXchange;
        private inputTextUiYchange;
        private inputTextUiZchange;
        private changeV3d;
        protected colorPickUIchange($evt: ReflectionEvet): void;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        resize(): void;
        y: number;
        label: string;
    }
    class Vec3ColorCtrlUI extends Vec3dCtrlUI {
        private colorPickUI;
        x: number;
        y: number;
        refreshViewValue(): void;
        protected initView(): void;
        destory(): void;
    }
}

declare module prop {
    import BaseEvent = Pan3d.BaseEvent;
    class ReflectionEvet extends BaseEvent {
        static CHANGE_DATA: string;
        data: any;
    }
}

declare module prop {
    import EventDispatcher = Pan3d.EventDispatcher;
    import UICompenent = Pan3d.UICompenent;
    import UIConatiner = Pan3d.UIConatiner;
    class TextureContext extends UIConatiner {
        private _bRender;
        private tempUiName;
        ui: UICompenent;
        uiViewScale: number;
        constructor(w: number, h: number);
    }
    class BaseMeshUi extends EventDispatcher {
        textureContext: TextureContext;
        ui: UICompenent;
        constructor(w?: number, h?: number);
        visible: boolean;
        private _visible;
        destory(): void;
        protected addEvets(): void;
        protected butClik(evt: InteractiveEvent): void;
        resize(): void;
        private _x;
        private _y;
        x: number;
        y: number;
    }
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class TextLabelUI extends BaseMeshUi {
        constructor(w?: number, h?: number);
        protected initView(): void;
        label: string;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class InputTextUi extends TextLabelUI {
        constructor(w?: number, h?: number);
        private onHtmlInputMouseDown;
        protected initView(): void;
        destory(): void;
        private chatHtmlInput;
        private setInputTxtPos;
        private changeInputTxt;
        resize(): void;
        visible: boolean;
        text: string;
        private onHtmlInputMouseDownFun;
        protected butClik(evt: InteractiveEvent): void;
    }
}

declare module prop {
    class InputFunTextUi extends BaseMeshUi {
        constructor(w?: number, h?: number);
        protected initView(): void;
        destory(): void;
        private chatHtmlIArea;
        private makeHtmlArear;
        private changeInputTxt;
        resize(): void;
        width: number;
        height: number;
        private agalStr;
        text: string;
        protected drawUrlImgToUi(ui: Pan3d.UICompenent, url: string): void;
        private drawTittleBg;
        private PointRectByTypeStr;
        protected drawImgToUi(ui: Pan3d.UICompenent, $img: any): void;
        private nodeLenHeight;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class TexturePicUi extends BaseMeshUi {
        constructor(w?: number, h?: number);
        protected initView(): void;
        protected addEvets(): void;
        private dragDrop;
        private dragEnter;
        private $dulbelClikTm;
        private _inputHtmlSprite;
        suffix: string;
        haveDoubleCilk: boolean;
        protected butClik(evt: InteractiveEvent): void;
        protected doubleClick(): void;
        private testSuffix;
        private changeFile;
        url: string;
        protected _url: string;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class ComboBoxUi extends TextLabelUI {
        constructor(w?: number, h?: number);
        protected initView(): void;
        destory(): void;
        text: string;
        protected butClik(evt: InteractiveEvent): void;
    }
}

declare module prop {
    import Vector3D = Pan3d.Vector3D;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class ColorPickUI extends TextLabelUI {
        constructor(w?: number, h?: number);
        protected initView(): void;
        private drawOutColor;
        private _vec3d;
        vec3d: Vector3D;
        protected butClik(evt: InteractiveEvent): void;
        private colorPickPanelFun;
    }
}

declare module prop {
    class AgalFunUI extends BaseReflComponent {
        private textLabelUI;
        private textFunNameUI;
        protected initView(): void;
        destory(): void;
        data: any;
        private onChangeInput;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}

declare module prop {
}

declare module prop {
    class MathFunMeshPanel extends MetaDataView {
        private mathFunNodeUI;
        getView(): Array<any>;
        readonly tittleStr: string;
        data: any;
        private changeFile;
        destory(): void;
        nodeUI: materialui.MathFunNodeUI;
        private changeData;
    }
}

declare module prop {
    class FloatPropMeshPanel extends MetaDataView {
        private constFloatNodeUI;
        getView(): Array<any>;
        data: any;
        constValue: number;
        private changeData;
    }
}

declare module prop {
    import Vector2D = Pan3d.Vector2D;
    class Vec2PropMeshPanel extends MetaDataView {
        private constVec2NodeUI;
        getView(): Array<any>;
        vec2data: Vector2D;
        data: any;
        private changeData;
    }
}

declare module prop {
    import Vector3D = Pan3d.Vector3D;
    class Vec3PropMeshPanel extends MetaDataView {
        private constVec3NodeUI;
        getView(): Array<any>;
        data: any;
        constValue: Vector3D;
        private changeData;
    }
}

declare module prop {
    class NodeTimePropPanel extends MetaDataView {
        private timeNodeUI;
        getView(): Array<any>;
        data: any;
        timeInterval: number;
        numScale: number;
        private changeData;
    }
}

declare module prop {
    class PannerPropPanel extends MetaDataView {
        private pannerNodeUI;
        getView(): Array<any>;
        private _coordinate;
        data: any;
        coordinateX: number;
        coordinateY: number;
        speedX: number;
        speedY: number;
        private changeData;
    }
}

declare module prop {
    class TexturePropMeshPanel extends MetaDataView {
        getView(): Array<any>;
        private textureSampleNodeUI;
        data: any;
        picurl: string;
        constValue: number;
        wrapValue: number;
        mipmapValue: number;
        filterValue: number;
        permulValue: number;
        private changeData;
    }
}

declare module prop {
    class Texture3DMeshPanel extends MetaDataView {
        getView(): Array<any>;
        private textureSampleNodeUI;
        data: any;
        picurl: string;
        constValue: number;
        wrapValue: number;
        mipmapValue: number;
        filterValue: number;
        permulValue: number;
        private changeData;
    }
}

declare module prop {
    class TextureCubeMeshPanel extends MetaDataView {
        getView(): Array<any>;
        private textureSampleNodeUI;
        data: any;
        picurl: string;
        constValue: number;
        wrapValue: number;
        mipmapValue: number;
        filterValue: number;
        permulValue: number;
        private changeData;
    }
}

declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class TextureFunPanel extends win.BaseWindow {
        protected loadConfigCom(): void;
        private e_pop_panel;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
        private chatHtmlInput;
        private setInputTxtPos;
        protected butClik(evt: InteractiveEvent): void;
        resize(): void;
        private changeInputResize;
        private changeFile;
        private changeData;
        private static _instance;
        static getInstance(): TextureFunPanel;
        private layaPanel;
        private mathFunNodeUI;
        constructor();
        showPanel(value: materialui.MathFunNodeUI): void;
        hidePanel(): void;
    }
}

declare module prop {
    import Vector3D = Pan3d.Vector3D;
    class SciencePropMeshPanel extends MetaDataView {
        getView(): Array<any>;
        data: any;
        sunDirect: Vector3D;
        sunColor: Vector3D;
        ambientColor: Vector3D;
    }
}

declare module prop {
    import Vector3D = Pan3d.Vector3D;
    class OpPropMeshPanel extends MetaDataView {
        private resultNodeUI;
        getView(): Array<any>;
        data: any;
        directLight: number;
        sunDirect: Vector3D;
        sunColor: Vector3D;
        ambientColor: Vector3D;
        private changeData;
    }
}

declare module prop {
    class UiMeshSprite extends win.Sprite {
        resize(): void;
        onAdd(): void;
        onRemove(): void;
        addBaseMeshUi(value: BaseMeshUi): void;
        private metaViewItem;
        addMeshView(value: MetaDataView): void;
    }
}

declare module prop {
    class PropModel {
        private static _instance;
        static getInstance(): PropModel;
        resize(): void;
        constructor();
        propPanle: UiMeshSprite;
        private metaDataView;
        private lastNodel;
        hidePanel(): void;
        showTextureUiPanel($ui: materialui.BaseMaterialNodeUI): void;
        private clearOladMeshView;
        showOtherMeshView(value: MetaDataView): void;
    }
}

declare module filelist {
    import MetaDataView = prop.MetaDataView;
    class FileMeshView extends MetaDataView {
        getView(): Array<any>;
        eventKey(value: string): void;
        fileUrl: string;
        data: any;
    }
}

declare module filelist {
    import Material = Pan3d.Material;
    import MetaDataView = prop.MetaDataView;
    class PrefabMeshView extends MetaDataView {
        private prefabStaticMesh;
        getView(): Array<any>;
        eventKey(value: string): void;
        private textureChangeInfo;
        private chuangeData;
        getParamItem(value: string): any;
        prebaburl: string;
        texture: Material;
        objsurl: string;
        data: any;
        private isSaveNow;
        private lastTm;
        private saveTm;
        saveToSever(): void;
    }
}

declare module filelist {
    import Material = Pan3d.Material;
    import MetaDataView = prop.MetaDataView;
    class RoleMeshView extends MetaDataView {
        private _roleStaticMesh;
        getView(): Array<any>;
        eventKey(value: string): void;
        private animChange;
        animDic: Array<any>;
        skinMesh: Array<any>;
        private textureChangeInfo;
        private chuangeData;
        roleurl: string;
        texture: Material;
        data: any;
        getChangeRoleStr(): string;
        private isSaveNow;
        private lastTm;
        private saveTm;
        saveToSever(): void;
    }
}

declare module filelist {
    import MetaDataView = prop.MetaDataView;
    class SkillMeshView extends MetaDataView {
        private _skillStaticMesh;
        getView(): Array<any>;
        skillmeshUrl: string;
        eventKey(value: string): void;
        intervalTm: number;
        actionname: number;
        filename: string;
        roleurl: string;
        skillurl: string;
        data: any;
        private mashSkillActionInfo;
        categoryClikUp(value: string): void;
        private isSaveNow;
        private lastTm;
        private saveTm;
        saveToSever(): void;
    }
}

declare module basefolderwin {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Rectangle = Pan3d.Rectangle;
    class BaseFolderWindow extends win.BaseWindow {
        constructor();
        setRect(value: Rectangle): void;
        resize(): void;
        getPageRect(): Rectangle;
        percentNum: number;
        private setLinePos;
        private pathUrlBg;
        protected loadConfigCom(): void;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        private refrishWinSize;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
        private moveLine;
    }
}

declare module ossfolder {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import FileVo = pack.FileVo;
    class OssListFile {
        isOpen: boolean;
        baseFile: FileVo;
    }
    class FolderMeshVo extends Pan3d.baseMeshVo {
        ossListFile: OssListFile;
        childItem: Array<FolderMeshVo>;
        needDraw: boolean;
        constructor();
        name: string;
        destory(): void;
    }
    class FolderName extends Disp2DBaseText {
        folderMeshVo: FolderMeshVo;
        makeData(): void;
        update(): void;
    }
    class OssFolderPanel extends win.Dis2dBaseWindow {
        static imgBaseDic: any;
        constructor();
        protected loadConfigCom(): void;
        private loadAssetImg;
        resize(): void;
        private loadTempOne;
        update(t: number): void;
        fileOssFolderDic(value: string): void;
        private fileAndOpenDicByUrl;
        protected itemMouseUp(evt: InteractiveEvent): void;
        private resetHideDic;
        private pushChidrenDic;
        private clearChildern;
        private makeItemUiList;
        private fileItem;
        getCharNameMeshVo(value: FileVo): FolderMeshVo;
        protected makeOtherRender(): UIRenderComponent;
        private folderCellHeight;
        private refrishFolder;
        private readonly isCanToDo;
        onMouseWheel($evt: MouseWheelEvent): void;
        protected changeScrollBar(): void;
        private moveAllTy;
        private static listTy;
        private disChiendren;
    }
}

declare module filelist {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Rectangle = Pan3d.Rectangle;
    import FileVo = pack.FileVo;
    class SampleFileVo {
        id: number;
        perent: number;
        data: FileVo;
    }
    class FileListMeshVo extends Pan3d.baseMeshVo {
        private _name;
        fileXmlVo: SampleFileVo;
        ty: number;
        cellHeightNum: number;
        childItem: Array<FileListMeshVo>;
        needDraw: boolean;
        constructor();
        name: string;
        destory(): void;
    }
    class FileListName extends Disp2DBaseText {
        fileListMeshVo: FileListMeshVo;
        private lastSelect;
        private lastName;
        makeData(): void;
        private tempDown;
        private drawFileIconName;
        update(): void;
    }
    class PathurlRect extends Rectangle {
        pathurl: string;
    }
    class PathurlLabel extends prop.TextLabelUI {
        constructor();
        pathurlLabelMove($evt: InteractiveEvent): void;
        pathurlLabelDown($evt: InteractiveEvent): void;
        label: string;
        private areaRectItem;
        setPath(value: any): void;
    }
    class FileListPanel extends win.Dis2dBaseWindow {
        static imgBaseDic: any;
        constructor();
        private pathlistBg;
        private pathurlLabel;
        protected loadConfigCom(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        private readonly isCanToDo;
        resize(): void;
        private loadAssetImg;
        private loadTempOne;
        update(t: number): void;
        private _lastfileDonwInfo;
        protected fileMouseDown(evt: InteractiveEvent): void;
        private timeOutMakeDragFun;
        private lastDragEvent;
        private makeDragData;
        private fileDuboclik;
        private selectFileClik;
        protected fileMouseUp(evt: InteractiveEvent): void;
        private selectFileIcon;
        private clearListAll;
        refrishPath(filePath: string): void;
        addRender($uiRender: UIRenderComponent): void;
        private getItemVoByUi;
        private makeItemUiList;
        private onRightMenuFun;
        onRightMenu($evt: MouseEvent): void;
        private makeFileFloadMenu;
        private makeFileListMenu;
        private menuBfun;
        downFile(): void;
        changeFileName(): void;
        private creatTexture;
        private refrishIndexGroup;
        private creatPefab;
        deleFile(): void;
        private _inputHtmlSprite;
        protected upTempFileToOss(): void;
        private changeFile;
        private resetSampleFilePos;
        private getcontentHeight;
        private fileItem;
        getCharNameMeshVo(value: SampleFileVo): FileListMeshVo;
    }
}

declare module folder {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import Vector2D = Pan3d.Vector2D;
    class FolderEvent extends BaseEvent {
        static SHOW_FOLDER_PANEL: string;
        static EDITSCENE_RESET_SIZE: string;
        static RESET_FOLDE_WIN_SIZE: string;
        static LIST_DIS_ALL_FILE: string;
        static LIST_OSS_FOLDER_FILE: string;
        posv2d: Vector2D;
        comboxData: Array<any>;
        comboxFun: Function;
    }
    class FolderModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class FolderProcessor extends BaseProcessor {
        getName(): string;
        private _folderPanel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private resetFolderWinSize;
        private fristRect;
        private folderPanel;
        private addOtherPanel;
        private addUIContainer;
        private _fileListPanel;
        private _baseFolderWindow;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module materialui {
    import BaseEvent = Pan3d.BaseEvent;
    class MEvent_Material_Connect extends BaseEvent {
        static MEVENT_MATERIAL_CONNECT_STARTDRAG: string;
        static MEVENT_MATERIAL_CONNECT_STOPDRAG: string;
        static MEVENT_MATERIAL_CONNECT_REMOVELINE: string;
        static MEVENT_MATERIAL_CONNECT_DOUBLUELINE: string;
        itemNode: ItemMaterialUI;
        line: MaterialNodeLineUI;
        startNode: ItemMaterialUI;
        endNode: ItemMaterialUI;
    }
}

declare module materialui {
    class NodeTreeItem {
        static IN: string;
        static OUT: string;
        node: NodeTree;
        inoutType: string;
        id: number;
        type: string;
        name: string;
        constructor();
        getObj(): Object;
        otherNeedObj(): Object;
    }
}

declare module materialui {
    class NodeTreeInputItem extends NodeTreeItem {
        private _parentNodeItem;
        hasCompiled: boolean;
        constructor();
        parentNodeItem: NodeTreeOutoutItem;
        getObj(): Object;
    }
}

declare module materialui {
    class NodeTreeOutoutItem extends NodeTreeItem {
        constructor();
        sunNodeItems: Array<NodeTreeInputItem>;
        pushSunNode(nodeitem: NodeTreeInputItem): void;
        removeSunNode(nodeitem: NodeTreeInputItem): void;
        getObj(): Object;
    }
}

declare module materialui {
    import EventDispatcher = Pan3d.EventDispatcher;
    import FrameCompenent = Pan3d.FrameCompenent;
    import Vector2D = Pan3d.Vector2D;
    class ItemMaterialUI extends EventDispatcher {
        private _type;
        hasConnet: boolean;
        inOut: boolean;
        nodeTreeItem: NodeTreeItem;
        pointframe: FrameCompenent;
        labelframe: FrameCompenent;
        parent: BaseMaterialNodeUI;
        titleLabeltext: string;
        outLineList: Array<MaterialNodeLineUI>;
        private _inLine;
        constructor(name: string, $type: string, $inOut?: boolean);
        removeOut($line: MaterialNodeLineUI): void;
        removeIn(): void;
        setConnect(): void;
        removeAllLine(): void;
        typets: string;
        private _x;
        private _y;
        x: number;
        y: number;
        getStagePoint(): Vector2D;
        changeType($type: string): void;
        drawSp(): void;
        inLine: MaterialNodeLineUI;
        drawLine(): void;
    }
}

declare module materialui {
    class NodeTree {
        static TEX: string;
        static TEX3D: string;
        static TEXCUBE: string;
        static OP: string;
        static ADD: string;
        static SUB: string;
        static MUL: string;
        static FUN: string;
        static DIV: string;
        static RCP: string;
        static MIN: string;
        static MAX: string;
        static FRC: string;
        static SQT: string;
        static RSQ: string;
        static POW: string;
        static LOG: string;
        static EXP: string;
        static NRM: string;
        static SIN: string;
        static COS: string;
        static CRS: string;
        static DP3: string;
        static DP4: string;
        static ABS: string;
        static NEG: string;
        static SAT: string;
        static LERP: string;
        static VEC3: string;
        static VEC2: string;
        static FLOAT: string;
        static NORMAL: string;
        static TIME: string;
        static TEXCOORD: string;
        static TEXCOORDLIGHT: string;
        static DYNVEC3: string;
        static PTCOLOR: string;
        static VERCOLOR: string;
        static HEIGHTINFO: string;
        static FRESNEL: string;
        static REFRACTION: string;
        static PANNER: string;
        inputVec: Array<NodeTreeInputItem>;
        outputVec: Array<NodeTreeOutoutItem>;
        ui: BaseMaterialNodeUI;
        type: string;
        paramName: string;
        canDynamic: boolean;
        regResultTemp: RegisterItem;
        regResultConst: RegisterItem;
        regResultTex: RegisterItem;
        regConstIndex: number;
        priority: number;
        shaderStr: string;
        static jsMode: boolean;
        constructor();
        addInput($in: NodeTreeItem): void;
        removeInput($in: NodeTreeItem): void;
        addOutput($in: NodeTreeItem): void;
        removeOutput($out: NodeTreeItem): void;
        static getID($constID: number): string;
        refreshID(): void;
        id: number;
        getObj(): Object;
        isDynamic: boolean;
        private _isDynamic;
        checkInput(): Boolean;
        getComponentID($id: number): string;
        releaseUse(): void;
    }
}

declare module materialui {
    class NodeTreeDynamic extends NodeTree {
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    class NodeTreeOP extends NodeTree {
        blendMode: number;
        killNum: number;
        backCull: boolean;
        writeZbuffer: boolean;
        useDynamicIBL: boolean;
        normalScale: number;
        lightProbe: boolean;
        directLight: boolean;
        noLight: boolean;
        fogMode: number;
        scaleLightMap: boolean;
        hdr: boolean;
        constructor();
        checkInput(): boolean;
    }
}

declare module materialui {
    class NodeTreeTex extends NodeTree {
        url: string;
        isMain: boolean;
        wrap: number;
        mipmap: number;
        filter: number;
        permul: boolean;
        constructor();
        checkInput(): boolean;
    }
}

declare module materialui {
    class NodeTreeAdd extends NodeTreeDynamic {
        constructor();
    }
}

declare module materialui {
    class NodeTreeSub extends NodeTree {
        constructor();
    }
}

declare module materialui {
    class NodeTreeMul extends NodeTreeDynamic {
        constructor();
    }
}

declare module materialui {
    class NodeTreeDiv extends NodeTreeDynamic {
        constructor();
    }
}

declare module materialui {
    class NodeTreeSin extends NodeTree {
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    class NodeTreeCos extends NodeTree {
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class NodeTreeVec3 extends NodeTree {
        constVec3: Vector3D;
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class NodeTreeVec2 extends NodeTree {
        constValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    class NodeTreeFloat extends NodeTree {
        constValue: number;
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    class NodeTreeFresnel extends NodeTree {
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class NodeTreeLightuv extends NodeTree {
        constValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class NodeTreeTexCoord extends NodeTree {
        constValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class NodeTreePanner extends NodeTree {
        coordinateValue: Vector2D;
        speedValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
        checkInput(): boolean;
    }
}

declare module materialui {
    class NodeTreeTime extends NodeTree {
        speed: number;
        timeValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class NodeTreeNormal extends NodeTree {
        constVec3: Vector3D;
        constructor();
        getComponentID($id: number): string;
    }
}

declare module materialui {
    class DataMathFunNode {
        name: string;
        type: string;
        constructor($name: string, $type: string);
    }
    class NodeTreeFun extends NodeTreeDynamic {
        funStr: string;
        funName: string;
        constructor();
        static isNeedChangePanel($a: string, $b: string): boolean;
        static getMathFunName($agalStr: string): string;
        static getMathFunReturnType($agalStr: string): string;
        static getDataMathFunArr($agalStr: string): Array<DataMathFunNode>;
    }
}

declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class MaterialBaseData {
        baseColorUrl: string;
        normalUrl: string;
        url: string;
        baseColor: Vector3D;
        roughness: number;
        specular: number;
        metallic: number;
        usePbr: boolean;
        setData(obj: any): void;
    }
}

declare module materialui {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIPanel = win.UIPanel;
    class PanelContainer {
        private uiRender;
        private labelRender;
        private panel;
        constructor($panel: UIPanel, $label: UIRenderComponent, $render: UIRenderComponent);
        removeChild($ui: ItemMaterialUI): void;
        addChild($ui: ItemMaterialUI): void;
        private static strItem;
        private drawTextToName;
    }
}

declare module materialui {
    class MaterialItemType {
        static FLOAT: string;
        static VEC2: string;
        static VEC3: string;
        static VEC4: string;
        static UNDEFINE: string;
    }
}

declare module materialui {
    import UIAtlas = Pan3d.UIAtlas;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIPanel = win.UIPanel;
    class BaseMaterialNodeUI extends UIPanel {
        _bottomRender: UIRenderComponent;
        _midRender: UIRenderComponent;
        _labelRender: UIRenderComponent;
        _topRender: UIRenderComponent;
        protected inPutItemVec: Array<ItemMaterialUI>;
        protected outPutItemVec: Array<ItemMaterialUI>;
        protected _container: PanelContainer;
        nodeTree: NodeTree;
        protected gap: number;
        name: string;
        static baseUIAtlas: UIAtlas;
        constructor();
        setInItemByData(ary: Array<any>): void;
        setOutItemByData(ary: Array<any>): void;
        setData(obj: any): void;
        getData(): Object;
        getObj(): Object;
        protected resetBgSize(): void;
        private a_select_line;
        private a_panel_title_frame;
        static titleFrameId: number;
        protected loadConfigCom(): void;
        tittleStr: string;
        protected drawTitleToFrame($str: string): void;
        private drawTextToName;
        addItems($nodeUI: ItemMaterialUI): void;
        removeItem($nodeUI: ItemMaterialUI): void;
        refreshNodePos(): void;
        removeAllNodeLine(): void;
        protected a_tittle_bg: FrameCompenent;
        protected a_cell_base_bg: UICompenent;
        protected butClik(evt: InteractiveEvent): void;
        getInItem($id: number): ItemMaterialUI;
        getOutItem($id: number): ItemMaterialUI;
        clikUiEvent($mouseEvt: InteractiveEvent): void;
        private getPointFrameTagetFoItemVec;
        private lastPanelPos;
        private mouseXY;
        private addStageMoveEvets;
        private onMove;
        drawLine(): void;
        private onUp;
        private _select;
        select: boolean;
        showDynamic(): void;
    }
}

declare module materialui {
    class TextureSampleNodeUI extends BaseMaterialNodeUI {
        private uvItem;
        private rgbItem;
        private rItem;
        private gItem;
        private bItem;
        private aItem;
        private rgbaItem;
        private _wrap;
        private _mipmap;
        private _filter;
        private a_texture_pic_frame;
        constructor();
        private drawTextureUrlToFrame;
        static texture_pic_frame_ID: number;
        private getTexturePicUi;
        private initItem;
        creatBase($url: string): void;
        drawPicBmp(): void;
        setData(obj: any): void;
        getData(): Object;
        wrap: number;
        mipmap: number;
        filter: number;
        permul: boolean;
        isMain: boolean;
        showDynamic(): void;
    }
}

declare module materialui {
    class Texture3DNodeUI extends BaseMaterialNodeUI {
        private uvItem;
        private rgbItem;
        private _wrap;
        private _mipmap;
        private _filter;
        private _permul;
        private a_texture_pic_frame;
        constructor();
        private drawTextureUrlToFrame;
        static texture_pic_frame_ID: number;
        private getTexturePicUi;
        private initItem;
        creatBase($url: string): void;
        drawPicBmp(): void;
        setData(obj: any): void;
        getData(): Object;
        wrap: number;
        mipmap: number;
        filter: number;
        permul: boolean;
        isMain: boolean;
        showDynamic(): void;
    }
}

declare module materialui {
    class TextureCubeNodeUI extends BaseMaterialNodeUI {
        private rgbItem;
        private _wrap;
        private _mipmap;
        private _filter;
        private _permul;
        private a_texture_pic_frame;
        constructor();
        private drawTextureUrlToFrame;
        static texture_pic_frame_ID: number;
        private getTexturePicUi;
        private initItem;
        creatBase($url: string): void;
        drawPicBmp(): void;
        setData(obj: any): void;
        getData(): Object;
        wrap: number;
        mipmap: number;
        filter: number;
        permul: boolean;
        isMain: boolean;
        showDynamic(): void;
    }
}

declare module materialui {
    class ResultNodeUI extends BaseMaterialNodeUI {
        private diffuseItem;
        private normalItem;
        private reflectItem;
        private alphaItem;
        private killItem;
        private _blenderMode;
        private _killNum;
        private _backCull;
        private _writeZbuffer;
        private _useDynamicIBL;
        private _normalScale;
        private _lightProbe;
        private _directLight;
        private _noLight;
        private _fogMode;
        private _scaleLightMap;
        private _hdr;
        constructor();
        private initItem;
        blenderMode: number;
        normalScale: number;
        lightProbe: boolean;
        directLight: boolean;
        noLight: boolean;
        fogMode: number;
        scaleLightMap: boolean;
        writeZbuffer: boolean;
        hdr: boolean;
        getData(): Object;
        setData(obj: any): void;
    }
}

declare module materialui {
    import Shader3D = Pan3d.Shader3D;
    import Vector2D = Pan3d.Vector2D;
    import UICompenent = Pan3d.UICompenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIPanel = win.UIPanel;
    class NodeLineLinkShader extends Shader3D {
        static NodeLineLinkShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class MapLineUi extends UICompenent {
        constructor();
        applyRenderSize(): void;
    }
    class NodeLineLinkComponent extends UIRenderComponent {
        constructor();
        makeLineUiItem($arr: Array<Vector2D>): void;
        private nextPostForTow;
        private mapLineUiList;
        private makeLineVetlineObjData;
        private getUiDataForItem;
        update(): void;
    }
    class MaterialLineContainer extends UIPanel {
        _midRender: NodeLineLinkComponent;
        constructor();
        private _currentLine;
        private _lineList;
        startLine($item: ItemMaterialUI): void;
        removeLine($line: MaterialNodeLineUI): void;
        globalToLocal($v: Vector2D): Vector2D;
        getMouse($v: InteractiveEvent): Vector2D;
        protected onMouseUp(event: MouseEvent): void;
        addConnentLine($startItem: ItemMaterialUI, $endItem: ItemMaterialUI): void;
        stopLine($item: ItemMaterialUI): void;
    }
}

declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class BezierClasszip {
        static drawbezier(_array: Array<Vector2D>, _time: number): Vector2D;
        private static mathmidpoint;
    }
    class MaterialNodeLineUI {
        lineRender: NodeLineLinkComponent;
        fromNode: ItemMaterialUI;
        endNode: ItemMaterialUI;
        dragMode: Boolean;
        startPoint: Vector2D;
        endPoint: Vector2D;
        needNodeType: boolean;
        currentHasNode: ItemMaterialUI;
        parent: MaterialLineContainer;
        constructor();
        setFromNode($node: ItemMaterialUI): void;
        private mousePos;
        private onMove;
        setEndNode($node: ItemMaterialUI): void;
        setNodeLine(): void;
        removeStage(): void;
        draw(): void;
        remove(): void;
    }
}

declare module materialui {
    import TexItem = Pan3d.TexItem;
    import TextureCube = Pan3d.TextureCube;
    import Material = Pan3d.Material;
    import Shader3D = Pan3d.Shader3D;
    import ConstItem = Pan3d.ConstItem;
    class MaterialTree extends Material {
        private _data;
        showurl: string;
        zbuff: boolean;
        pointlight: boolean;
        private _compileData;
        private _url;
        shaderStr: string;
        laterTextureurl: string;
        laterTexture: MaterialTree;
        texList: Array<TexItem>;
        cubeTextItem: TextureCube;
        constList: Array<ConstItem>;
        hasTime: boolean;
        timeValue: Vector2D;
        blendMode: number;
        backCull: boolean;
        killNum: number;
        hasVertexColor: boolean;
        usePbr: boolean;
        useNormal: boolean;
        useUv: boolean;
        useLightUv: boolean;
        roughness: number;
        writeZbuffer: boolean;
        useDynamicIBL: boolean;
        normalScale: number;
        lightProbe: boolean;
        directLight: boolean;
        scaleLightMap: boolean;
        noLight: boolean;
        fogMode: number;
        useKill: boolean;
        hasAlpha: boolean;
        hasSkyBox: boolean;
        skyBoxTextId: number;
        materialBaseData: MaterialBaseData;
        fcNum: number;
        fcIDAry: Array<number>;
        modelShader: Shader3D;
        roleShader: Shader3D;
        data: any;
        setData(value: any): void;
        clone(): MaterialTree;
        compileData: any;
    }
}

declare module materialui {
    import Panel = win.Panel;
    class MaterialCtrl {
        private static _instance;
        static getInstance(): MaterialCtrl;
        constructor();
        initData(): void;
        lineContainer: MaterialLineContainer;
        linePanel: Panel;
        nodeUiPanel: Panel;
        bgwinPanel: Panel;
        private _materialTree;
        private uiList;
        nodeList: Array<NodeTree>;
        addNodeUI(ui: BaseMaterialNodeUI): void;
        private addUIContainer;
        removeUI(ui: BaseMaterialNodeUI): void;
        getObj(): Object;
    }
}

declare module materialui {
    class MaterialTreeManager {
        private static _instance;
        static getInstance(): MaterialTreeManager;
        getMaterial($url: String, $fun: Function): void;
    }
}

declare module materialui {
    class MaterialViewBuildUtils {
        private static _instance;
        static getInstance(): MaterialViewBuildUtils;
        constructor();
        private _dataAry;
        private _uiVec;
        addFun: Function;
        setData(ary: Array<any>): void;
        drawLine(): void;
        getUIbyID($pid: number, $id: number, $inout: boolean): ItemMaterialUI;
        private getNodeUI;
        getUI(type: String): BaseMaterialNodeUI;
    }
}

declare module materialui {
    import BaseEvent = Pan3d.BaseEvent;
    class MathDynamicNodeUI extends BaseMaterialNodeUI {
        private intAItem;
        private intBItem;
        private outItem;
        private outRItem;
        private outGItem;
        private outBItem;
        private outXYItem;
        private outRGBItem;
        private outAItem;
        constructor();
        protected initItem(): void;
        addEvents($nodeUI: ItemMaterialUI): void;
        addDisEvent($nodeUI: ItemMaterialUI): void;
        disConnect(event: BaseEvent): void;
        protected onConnect(event: BaseEvent): void;
        checkItem(): void;
        setInItemByData(ary: Array<any>): void;
        setOutItemByData(ary: Array<any>): void;
    }
}

declare module materialui {
    class MathAddNodeUI extends MathDynamicNodeUI {
        constructor();
    }
}

declare module materialui {
    class MathSubNodeUI extends MathDynamicNodeUI {
        constructor();
    }
}

declare module materialui {
    class MathMulNodeUI extends MathDynamicNodeUI {
        constructor();
    }
}

declare module materialui {
    class MathDivNodeUI extends MathDynamicNodeUI {
        constructor();
    }
}

declare module materialui {
    class MathStaticNodeUI extends BaseMaterialNodeUI {
        private intItem;
        private outItem;
        constructor();
        protected initItem(): void;
    }
}

declare module materialui {
    class MathSinNodeUI extends MathStaticNodeUI {
        constructor();
    }
}

declare module materialui {
    class MathCosNodeUI extends MathStaticNodeUI {
        constructor();
    }
}

declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class ConstVec3NodeUI extends BaseMaterialNodeUI {
        private outItem;
        private outAItem;
        private outRGBAItem;
        private _constValue;
        protected _bastTitleStr: String;
        constructor();
        getData(): Object;
        initNodeTree(): void;
        setData(obj: any): void;
        constValue: Vector3D;
        showDynamic(): void;
        getNumStr(num: number): string;
    }
}

declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class ConstVec2NodeUI extends BaseMaterialNodeUI {
        private outItem;
        constValue: Vector2D;
        getData(): Object;
        setData(obj: any): void;
        showDynamic(): void;
        getNumStr(num: number): string;
        constructor();
    }
}

declare module materialui {
    class ConstFloatNodeUI extends BaseMaterialNodeUI {
        private outItem;
        private _constValue;
        constructor();
        setData(obj: any): void;
        getData(): Object;
        constValue: number;
        showDynamic(): void;
        getNumStr(num: number): string;
    }
}

declare module materialui {
    class FresnelNodeUI extends BaseMaterialNodeUI {
        private inItem;
        private inAItem;
        private inBItem;
        private outItem;
        constructor();
    }
}

declare module materialui {
    class TexCoordNodeUI extends BaseMaterialNodeUI {
        private outItem;
        constructor();
    }
}

declare module materialui {
    class TexLightUvNodeUI extends BaseMaterialNodeUI {
        private outItem;
        constructor();
    }
}

declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class PannerNodeUI extends BaseMaterialNodeUI {
        private inItem;
        private inSpeedItem;
        private outItem;
        private _coordinate;
        private _speed;
        constructor();
        speed: Vector2D;
        coordinate: Vector2D;
        setData(obj: any): void;
    }
}

declare module materialui {
    class TimeNodeUI extends BaseMaterialNodeUI {
        private outItem;
        private _speed;
        constructor();
        speed: number;
        timeValue: Vector2D;
        getData(): Object;
        setData(obj: any): void;
    }
}

declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class NormalNodeUI extends BaseMaterialNodeUI {
        private outItem;
        private outAItem;
        private outRGBAItem;
        private _constValue;
        protected _bastTitleStr: String;
        constructor();
        getData(): Object;
        initNodeTree(): void;
        setData(obj: any): void;
        constValue: Vector3D;
    }
}

declare module materialui {
    import BaseEvent = Pan3d.BaseEvent;
    class MathFunNodeUI extends BaseMaterialNodeUI {
        private intAItem;
        private outItem;
        constructor();
        inPutFunStr($baseStr?: string): void;
        private clearNode;
        protected resetBgSize(): void;
        addEvents($nodeUI: ItemMaterialUI): void;
        addDisEvent($nodeUI: ItemMaterialUI): void;
        removeEvents($nodeUI: ItemMaterialUI): void;
        removeDisEvent($nodeUI: ItemMaterialUI): void;
        disConnect(event: BaseEvent): void;
        protected onConnect(event: BaseEvent): void;
        checkItem(): void;
        setData(obj: any): void;
        getData(): Object;
        setInItemByData(ary: Array<any>): void;
        setOutItemByData(ary: Array<any>): void;
    }
}

declare module materialui {
    class RegisterItem {
        id: number;
        inUse: boolean;
        url: string;
        xUse: boolean;
        yUse: boolean;
        zUse: boolean;
        wUse: boolean;
        hasInit: boolean;
        constructor($id: number);
        getUse($nodeTree: NodeTree): boolean;
    }
}

declare module materialui {
    import TextureCube = Pan3d.TextureCube;
    class CompileTwo {
        static SPACE: string;
        static COMMA: string;
        static END: string;
        static FC: string;
        static FT: string;
        static TEXTURE: string;
        static FS: string;
        static VI: string;
        static OP: string;
        static FO: string;
        static XYZ: string;
        static XY: string;
        static X: string;
        static Y: string;
        static Z: string;
        static W: string;
        static ZW: string;
        static MOV: string;
        static ONE_FLOAT: string;
        static ZERO: string;
        static ONE: string;
        static TWO: string;
        static TWO_FLOAT: string;
        static THREE: string;
        static FOUR: string;
        static LN: string;
        static texType: string;
        static TEX_2D: string;
        static TEX_LINEAR: string;
        static TEX_NEAREST: string;
        static TEX_WRAP_REPEAT: string;
        static TEX_WRAP_CLAMP: string;
        static LEFT_BRACKET: string;
        static RIGHT_BRACKET: string;
        static texCubeType: string;
        static TEX: string;
        static ADD: string;
        static SUB: string;
        static MUL: string;
        static DIV: string;
        static ADD_MATH: string;
        static SUB_MATH: string;
        static MUL_MATH: string;
        static MUL_EQU_MATH: string;
        static DIV_MATH: string;
        static RCP: string;
        static MIN: string;
        static MAX: string;
        static FRC: string;
        static SQT: string;
        static RSQ: string;
        static POW: string;
        static LOG: string;
        static EXP: string;
        static NRM: string;
        static SIN: string;
        static COS: string;
        static CRS: string;
        static DP3: string;
        static DOT: string;
        static DP4: string;
        static ABS: string;
        static NEG: string;
        static SAT: string;
        static LERP: string;
        static KIL: string;
        static M33: string;
        static VEC4: string;
        static VEC3: string;
        static VEC2: string;
        static EQU: string;
        static texture2D: string;
        static textureCube: string;
        static LEFT_PARENTH: string;
        static RIGHT_PARENTH: string;
        static DEFAULT_VEC4: string;
        static MIX: string;
        static REFLECT: string;
        static IF: string;
        static DISCARD: string;
        static scalelight: string;
        priorityList: Array<Array<NodeTree>>;
        private fragmentTempList;
        private fragmentTexList;
        private fragmentConstList;
        private defaultUvReg;
        private strVec;
        private texVec;
        private constVec;
        private hasTime;
        private timeSpeed;
        private timeValue;
        private useNormal;
        private useUv;
        private useLightUv;
        private fcNum;
        private _timeID;
        private _fcBeginID;
        constructor();
        private initReg;
        compile($priorityList: Array<Array<NodeTree>>, $materialTree: MaterialTree): string;
        private getMaxFc;
        private makeFc;
        private funNodeStr;
        private getGLSLStr;
        private getInputNormal;
        private getFragmentTex;
        private getFragmentTemp;
        private processTexCubeNode;
        cubeTextItem: TextureCube;
        private processTex3DNode;
        private processTexNode;
        private processFunNode;
        private FunDic;
        private processDynamicNode;
        private processNode;
        private processTimeNode;
        private processStaticNode;
        private traceFt;
        private readonly timeStr;
        private processVec3Node;
        private addConstItem;
        private setFragmentConst;
        private processOpNode;
        private initBaseFc;
    }
}


declare module materialui {
    class MaterialCompile {
        private static _instance;
        static getInstance(): MaterialCompile;
        nodeList: Array<NodeTree>;
        priorityList: Array<Array<NodeTree>>;
        maxPriority: number;
        private _compileGlslServer;
        compile($list: Array<NodeTree>, $materialTree: MaterialTree): void;
        setPriority($node: NodeTree): void;
        getOpNode(): NodeTree;
        resetCompile($list: Array<NodeTree>): void;
        resetPriority(): void;
    }
}

declare module materialui {
    class MtlUiData {
        static Scale: number;
    }
}

declare module materialui {
    class MaterialModel {
        private static _instance;
        static getInstance(): MaterialModel;
        makePanle(): void;
        selectMaterialUrl(url: string): void;
        private getMenuXml;
        private getMathListData;
        private getV2CListData;
        private getTextureListData;
        private getOtherListData;
        mekeMaterialRightMenu($evt: MouseEvent): void;
        private menuBfun;
        private onTempNode;
        private dataURLtoFile;
        MakeTempWebMaterialTree($temp: MaterialTree, $info: any): void;
        upMaterialTreeToWeb($temp: MaterialTree, $info: any, $url: string): void;
        selectFileById(value: number): void;
    }
}

declare module materialui {
    import UICompenent = Pan3d.UICompenent;
    import UIConatiner = Pan3d.UIConatiner;
    class TextureContext extends UIConatiner {
        private _bRender;
        private tempUiName;
        ui: UICompenent;
        uiViewScale: number;
        constructor(w: number, h: number);
    }
    class MaterialCavasPanel extends win.BaseWindow {
        private blakCavansRender;
        constructor();
        private linesSmailRender;
        private getTempLineUi;
        private lineBigRender;
        private lineItemBigA;
        private lineItemBigB;
        private getTempBigLineUi;
        private drawOutColor;
        private tempListBg;
        private lineItemA;
        private lineItemB;
        protected loadConfigCom(): void;
        resize(): void;
        private moveLineA;
        private moveLineB;
        private movelineItemBigA;
        private movelineItemBigB;
    }
}

declare module materialui {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class MaterialEvent extends BaseEvent {
        static INIT_MATERIA_PANEL: string;
        static SHOW_MATERIA_PANEL: string;
        static SAVE_MATERIA_PANEL: string;
        static SELECT_MATERIAL_NODE_UI: string;
        static COMPILE_MATERIAL: string;
        static INUPT_NEW_MATERIAL_FILE: string;
    }
    class MaterialModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MaterialProcessor extends BaseProcessor {
        getName(): string;
        private baseWindow;
        private lastMaterialUrl;
        constructor();
        protected receivedModuleEvent($event: BaseEvent): void;
        private changeLeftMeshView;
        private onMouseWheelFun;
        private onMouseFun;
        private onMouseMoveFun;
        private onMouseUpFun;
        private onKeyDownFun;
        private onKeyUpFun;
        private onRightMenuFun;
        private readonly hasStage;
        private addEvents;
        onRightMenu($evt: MouseEvent): void;
        private removeEvents;
        private clearAllMaterialUi;
        private resetMaterialListUi;
        private _materialTree;
        private saveMateriaPanel;
        private getMakeProgemePrame;
        private selectNodeUi;
        setConnetLine($startItem: ItemMaterialUI, $endItem: ItemMaterialUI): void;
        removeLine($line: MaterialNodeLineUI): void;
        startDragLine($node: ItemMaterialUI): void;
        stopDragLine($node: ItemMaterialUI): void;
        private openMaterialPanel;
        private loadConfigCom;
        private baseMaterialTree;
        private readMaterialTree;
        onKeyDown($evt: KeyboardEvent): void;
        private delUI;
        private getCanUseParamName;
        private getSelUI;
        onKeyUp($evt: KeyboardEvent): void;
        private _isMidelMouse;
        private onMouse;
        private onMouseMove;
        private onMouseUp;
        private mouseXY;
        onMouseWheel($evt: MouseWheelEvent): void;
        private changeScalePanle;
        private stageMoveTx;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module materialleft {
    import Vector3D = Pan3d.Vector3D;
    import MetaDataView = prop.MetaDataView;
    import UiMeshSprite = prop.UiMeshSprite;
    class MateriaMeshView extends MetaDataView {
        constructor(value: UiMeshSprite);
        resize(): void;
        getView(): Array<any>;
        getParamItem(value: string): any;
        laterTexture: materialui.MaterialTree;
        private textureChangeInfo;
        materialTree: materialui.MaterialTree;
        private _materialTree;
        blendMode: number;
        testzbuff: boolean;
        writeZbuffer: boolean;
        pointlight: boolean;
        data: any;
        sunDirect: Vector3D;
        sunColor: Vector3D;
        ambientColor: Vector3D;
    }
}

declare module materialleft {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class MaterialLeftPanel extends win.BaseWindow {
        only: boolean;
        constructor();
        propPanle: prop.UiMeshSprite;
        private materiaMeshView;
        private addPojectView;
        private _materialTree;
        materialTree: materialui.MaterialTree;
        protected loadConfigCom(): void;
        protected butClik(evt: InteractiveEvent): void;
        private initView;
        resize(): void;
        private _inputHtmlSprite;
        protected selectInputDae(evt: InteractiveEvent): void;
        private changeFile;
        private isRoleFile;
    }
}

declare module materialleft {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class MaterialLeftEvent extends BaseEvent {
        static SHOW_MATERIAL_LEFT_PANEL: string;
        static HIDE_MATERIAL_LEFT_PANEL: string;
    }
    class MaterialLeftModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MaterialLeftProcessor extends BaseProcessor {
        getName(): string;
        protected receivedModuleEvent($event: BaseEvent): void;
        private readBaseModel;
        private hideLeftPanel;
        private showLeftPanel;
        private materialLeftPanel;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module maineditor {
    import EventDispatcher = Pan3d.EventDispatcher;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    class SceneProjectVo extends EventDispatcher {
        paramInfo: Array<any>;
        materialParam: MaterialBaseParam;
        gildline: boolean;
        scenescale: number;
        material: materialui.MaterialTree;
        textureurl: string;
        constructor(value: any);
        meshObj(value: any): void;
        getSaveObj(): any;
    }
}

declare module maineditor {
    class FileNode {
        id: number;
        name: string;
        path: string;
        url: string;
        extension: string;
        children: Array<any>;
        rename: Boolean;
        parentNode: FileNode;
        data: any;
        static FILE_NODE: string;
        constructor();
    }
}

declare module maineditor {
    import Matrix3D = Pan3d.Matrix3D;
    import Display3DSprite = Pan3d.Display3DSprite;
    class LyfSpriteDisplay extends Display3DSprite {
        constructor();
        private waitLoadUrl;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        addLyfByUrl($url: string): void;
        removeStage(): void;
        addStage(): void;
        private particleItem;
        private loadTempByUrl;
    }
}

declare module maineditor {
    import Display3DSprite = Pan3d.Display3DSprite;
    class SkillSpriteDisplay extends Display3DSprite {
        constructor();
        updateMatrix(): void;
        private waitLoadUrl;
        addSkillByUrl($url: any): void;
        addStage(): void;
        skillStaticMesh: pack.SkillStatcMesh;
        private roleChar;
        private skipNum;
        private playNextSkill;
        private skillActionItem;
        private loadTempByUrl;
    }
}

declare module maineditor {
    class HierarchyNodeType {
        static Folder: number;
        static Prefab: number;
        static Light: number;
        static Water: number;
        static Grass: number;
        static Capture: number;
        static Build: number;
        static Reflection: number;
        static LightProbe: number;
        static ParallelLight: number;
        static Particle: number;
        static Role: number;
        static SKILL: number;
        static Ground: number;
    }
    class HierarchyFileNode extends FileNode {
        type: number;
        treeSelect: Boolean;
        lock: Boolean;
        isHide: Boolean;
        isOpen: boolean;
        constructor();
    }
}

declare module maineditor {
    import Rectangle = Pan3d.Rectangle;
    import UICompenent = Pan3d.UICompenent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    class SelectFileListText extends Disp2DBaseText {
        bgUi: UICompenent;
        textMetrics: TextMetrics;
        tittlestr: string;
        select: boolean;
        private _select;
        makeData(): void;
    }
    class EditorOpenList {
        private perent;
        private topRender;
        constructor(value: MainEditorPanel, render: UIRenderComponent);
        private tabItemArr;
        private tabBgClik;
        removePathUrl(value: string): void;
        changeVoBg(vo: SelectFileListText, value: boolean): void;
        private refrishTabUiSelect;
        pushPathUrl(value: string): void;
        private selectTabStr;
    }
    class MainEditorPanel extends win.Dis2dBaseWindow {
        constructor();
        sceneProjectVo: SceneProjectVo;
        private _sceneViewRender;
        private e_line_left;
        private e_line_right;
        private e_centen_panel;
        editorOpenList: EditorOpenList;
        protected loadConfigCom(): void;
        showType: number;
        private a_scene_view;
        private initView;
        protected butClik(evt: InteractiveEvent): void;
        onPanellMouseWheel($evt: MouseWheelEvent): void;
        private dragDrop;
        suffix: string;
        private testSuffix;
        private dragEnter;
        private upFrame;
        resize(): void;
        panelEventChanger(value: Rectangle): void;
        refrishSize(): void;
    }
}

declare module maineditor {
    import Vector3D = Pan3d.Vector3D;
    import MetaDataView = prop.MetaDataView;
    class PropertyMeshView extends MetaDataView {
        private xyzPosData;
        getView(): Array<any>;
        resize(): void;
        data: any;
        pos: Vector3D;
        rotation: Vector3D;
        scale: Vector3D;
    }
}

declare module maineditor {
    import Vector3D = Pan3d.Vector3D;
    import MaterialTree = materialui.MaterialTree;
    import MetaDataView = prop.MetaDataView;
    class ScenePojectMeshView extends MetaDataView {
        getView(): Array<any>;
        scenescale: number;
        private static gridLineSprite;
        gridline: number;
        private textureChangeInfo;
        getParamItem(value: string): any;
        texture: MaterialTree;
        readonly mapname: string;
        data: any;
        private sceneProjectVo;
        campos: Vector3D;
        private _bgcolor;
        bgcolor: Vector3D;
        camrotation: Vector3D;
    }
}

declare module maineditor {
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    import Shader3D = Pan3d.Shader3D;
    import Material = Pan3d.Material;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    class UiModelViewShder extends Shader3D {
        static UiModelViewShder: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class UiModelViewRender extends UIRenderOnlyPicComponent {
        constructor();
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void;
        makeRenderDataVc($vcId: number): void;
        private _sceneProjectVo;
        sceneProjectVo: SceneProjectVo;
        private sceneProjectUpData;
        private time;
        private materialTree;
        setMaterialVc($material: Material, $mp?: MaterialBaseParam): void;
        update(): void;
    }
}

declare module maineditor {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Vector2D = Pan3d.Vector2D;
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    import PrefabStaticMesh = pack.PrefabStaticMesh;
    class TestDiplay3dShader extends Shader3D {
        static TestDiplay3dShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class ModelSprite extends left.MaterialModelSprite {
        constructor();
        update(): void;
        private baseTextureres;
        private baseModeShader;
        private drawBaseModel;
        private _prefab;
        prefab: PrefabStaticMesh;
        private meshParamInfo;
        setPreFabUrl(url: string, bfun?: Function): void;
    }
    class OssListFile extends HierarchyFileNode {
    }
    class FolderMeshVo extends Pan3d.baseMeshVo {
        ossListFile: OssListFile;
        childItem: Array<FolderMeshVo>;
        needDraw: boolean;
        dis: Display3D;
        cellPos: Vector2D;
        constructor();
        name: string;
        destory(): void;
    }
    class FolderName extends Disp2DBaseText {
        folderMeshVo: FolderMeshVo;
        makeData(): void;
        update(): void;
    }
    class HierarchyListPanel extends win.Dis2dBaseWindow {
        only: boolean;
        static imgBaseDic: any;
        constructor();
        protected makeOtherRender(): UIRenderComponent;
        protected loadConfigCom(): void;
        private readonly isCanToDo;
        onMouseWheel($evt: MouseWheelEvent): void;
        private _cellBgRender;
        private loadAssetImg;
        private loadTempOne;
        update(t: number): void;
        changeFileName($vo: FolderName): void;
        private makeFileFloadMenu;
        private menuBfun;
        deleFile(item: Array<FolderMeshVo>, vo: FolderMeshVo): void;
        protected itemMouseUp(evt: InteractiveEvent): void;
        private showMeshView;
        private showXyzMove;
        private hidefileItemBg;
        private clearChildern;
        private isCompelet;
        protected makeItemUiList(): void;
        private onKeyDownFun;
        private onKeyDown;
        addRender($uiRender: UIRenderComponent): void;
        private loadBaseSceneUrl;
        private onRightMenuFun;
        onRightMenu($evt: MouseEvent): void;
        private selectFolderMeshVo;
        private getItemVoByUi;
        private wirteItem;
        inputZzwToScene(temp: any): void;
        inputLyfToScene(temp: any): void;
        inputSkillToScene(temp: any): void;
        inputPrefabToScene(temp: any): void;
        private makeModelSprite;
        clearSceneAll(): void;
        private _sceneProjectVo;
        readMapFile(mapUrl: string): void;
        private addBasrole;
        selectModelEvet(tempItem: Array<FolderMeshVo>, isshift?: boolean): void;
        saveMap(): void;
        private getWillSaveItem;
        protected changeScrollBar(): void;
        resize(): void;
        private refrishFolder;
        private cellBgItem;
        private showSelectBg;
        private moveAllTy;
        private getItemDisNum;
        private listTy;
        private disChiendren;
    }
}

declare module maineditor {
    class EditorModel {
        static _instance: EditorModel;
        static getInstance(): EditorModel;
        constructor();
        loadHideMixImg($url: string, $fun: Function): void;
        private convertCanvasToImage;
        private makeMixPicByUrl;
        private dataURLtoFile;
        openFileByUrl(fileUrl: string): void;
        hierarchyListPanel: HierarchyListPanel;
        selectItem: Array<FolderMeshVo>;
        addSelctItem(value: Array<FolderMeshVo>, isShift: boolean): void;
        keyDeleSelectItem(): void;
        deleSelectItem(): void;
        fileItem: Array<FolderMeshVo>;
        private mouseHitSprite;
        selectModel(mouseVect2d: Vector2D): Array<FolderMeshVo>;
    }
}

declare module maineditor {
    import FBO = Pan3d.FBO;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = layapan_me.LayaOverride2dSceneManager;
    class EdItorSceneManager extends SceneManager {
        constructor();
        fbo: FBO;
        private updateDepthTexture;
        renderToTexture($m?: Matrix3D): void;
        textureRes: Pan3d.TextureRes;
        update(): void;
        getGroundPos($mouse: Vector2D): Vector3D;
        playLyf($url: string, $pos: Pan3d.Vector3D, $r?: number): void;
    }
}

declare module inputres {
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    class SceneRes extends Pan3d.SceneRes {
        bfun: Function;
        readScene(): void;
        private saveImgToSever;
        private dataURLtoFile;
        private readChangeBuff;
        private saveObjDataToSever;
        private needRefrishArr;
        private getPerentPath;
        private addNeedReedRerishDic;
        reFrishArrByOney(): void;
        fileRoot: string;
        scale: number;
        private upOssFile;
        readObj($srcByte: Pan3dByteArray): void;
        readImg(): void;
    }
    class ImputGameResModel {
        private static _instance;
        static getInstance(): ImputGameResModel;
        private sceneRes;
        inputSceneFile($file: File, $fileroot: string): void;
        private setMapByteMesh;
        private isMapH5File;
        private getMainPic;
        private getNameByPath;
        private makePerfabToSever;
    }
}

declare module maineditor {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class MainEditorEvent extends BaseEvent {
        static LOAD_SCENE_MAP: string;
        static INIT_MAIN_EDITOR_PANEL: string;
        static SHOW_MAIN_EDITOR_PANEL: string;
        static INPUT_PREFAB_TO_SCENE: string;
        static INPUT_ZZW_TO_SCENE: string;
        static INPUT_LYF_TO_SCENE: string;
        static INPUT_SKILL_TO_SCENE: string;
        static SAVE_SCENE_MAP_TO_SEVER: string;
        static CLEAR_SCENE_MAP_ALL: string;
        static SHOW_SCENE_POJECT_MESH_VIEW: string;
        static SCENE_SELECT_SPRITE_DOWN: string;
        static CHANGE_LEFT_PANEL_SHOW: string;
    }
    class MainEditorModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MainEditorProcessor extends BaseProcessor {
        getName(): string;
        private _mainEditorPanel;
        static edItorSceneManager: EdItorSceneManager;
        private initPanelConfig;
        protected receivedModuleEvent($event: BaseEvent): void;
        private sceneProjectVo;
        private showScnePojectView;
        private onMouseWheelFun;
        private onMouseDownFun;
        private onMouseMoveFun;
        private onMouseUpFun;
        private onKeyDownFun;
        private onKeyUpFun;
        private addEvents;
        private removeEvents;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
        private readonly hasStage;
        private onKeyDown;
        private onKeyUp;
        private readonly isCanToDo;
        onMouseWheel($evt: MouseWheelEvent): void;
        private maseSceneManager;
        private changePageRect;
        private _hierarchyListPanel;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}

declare module LayaPan3D {
    import EdItorSceneManager = maineditor.EdItorSceneManager;
    class Laya3dSprite extends Laya.Image {
        constructor(w?: number, h?: number);
        scale(scaleX: number, scaleY: number, speedMode?: boolean): Laya. Sprite;
        private resizeRect;
        protected initScene(): void;
        bgColor: Vector3D;
        protected addDisplay(): void;
        protected addRole(): void;
        protected addSkillRole(): void;
        protected addLyfSprite;
        upData(): void;
        protected renderToTexture(): void;
        public sceneManager: EdItorSceneManager;
    }
}

declare module LayaPan3D {
    import Shader3D = Pan3d.Shader3D;
    import TextureRes = Pan3d.TextureRes;
    class LayaScene2dPicShader extends Shader3D {
        static LayaScene2dPicShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class LayaScene2dPicSprit extends Pan3d.Display3D {
        constructor(value?: string);
        private static objdata2D;
        protected initData(): void;
        width: number;
        height: number;
        updateMatrix(): void;
        set2dPos($x: number, $y: number): void;
        private loadTextureByUrl;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        imgRectInfo: Array<number>;
        update(): void;
    }
    class LayaScene2dSceneChar extends layapan_me.LayaSceneChar {
        private posv2;
        set2dPos($x: number, $y: number): void;
        addStage(): void;
    }
    class LayaScene2D extends Laya3dSprite {
        rootpos: Vector2D;
        readonly scene2dScale: number;
        protected initScene(): void;
        upData(): void;
        protected getMousePos(tx: number, ty: number): Vector2D;
        getPos3dBy2D($x: number, $y: number): Vector3D;
        protected renderToTexture(): void;
    }
}

declare module LayaPan3D {
    class LayaScene3D extends Laya3dSprite {
        constructor(w?: number, h?: number);
        protected addEvents(): void;
        protected addSceneModel(): void;
        private onMouseWheel;
        private lastMouseVec2d;
        private lastfocus3D;
        private dragRegion;
        private onStartDrag;
        private onMouseUp;
        private onMouseMove;
        upData(): void;
    }
}

declare module LayaPan3D {
    class LayaGame2dDemo extends LayaScene2D {
        constructor(w?: number, h?: number);
        protected initScene(): void;
        private mainChar;
        private addSceneModel;
        private addFramePartice;
        addGrouandPic(value: string, rect: Pan3d.Rectangle): LayaScene2dPicSprit;
        protected addEvents(): void;
        upData(): void;
        private onMouseWheel;
        private dragRegion;
        private onStartDrag;
    }
}

