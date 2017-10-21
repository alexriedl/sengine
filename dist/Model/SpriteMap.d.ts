import { Buffer } from '../Model/Buffer';
import { TextureShader } from '../Model/Shader';
import SimpleRectangle from './SimpleRectangle';
declare abstract class SpriteMap extends SimpleRectangle {
    protected textureBuffer: Buffer;
    protected shader: TextureShader;
    protected texture: WebGLTexture;
    private frame;
    private totalFrames;
    constructor();
    initialize(gl: WebGLRenderingContext): void;
    protected abstract getMapInfo(): SpriteMap.IMapInfo;
    setFrame(frame: number): number;
    protected createShader(): TextureShader;
    protected updateAttributes(gl: WebGLRenderingContext): void;
}
declare namespace SpriteMap {
    interface IMapInfo {
        leftPadding?: number;
        topPadding?: number;
        textureWidth: number;
        textureHeight: number;
        spritWidth: number;
        spritHeight: number;
        totalSprites: number;
        source: string;
    }
}
export default SpriteMap;
