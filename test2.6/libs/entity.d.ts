 /** Properties of a SpritePoint. */
 interface ISpritePoint {

    /** 坐标x */
    x?: (number|null);

    /** 坐标y */
    y?: (number|null);
}

/** 坐标 */
class SpritePoint implements ISpritePoint {

    /**
     * Constructs a new SpritePoint.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISpritePoint);

    /** 坐标x */
    public x: number;

    /** 坐标y */
    public y: number;

    /**
     * Encodes the specified SpritePoint message. Does not implicitly {@link msg.base.SpritePoint.verify|verify} messages.
     * @param message SpritePoint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISpritePoint, writer?: any): any;

    /**
     * Decodes a SpritePoint message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SpritePoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: (Uint8Array), length?: number): SpritePoint;
}