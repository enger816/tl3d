declare namespace Zlib {
    export class Inflate {
        constructor(data?: Uint8Array);
        decompress(): Uint8Array;
    }
    export class Deflate {
        constructor(data?: Uint8Array);
        compress(): Uint8Array
    }

    
}