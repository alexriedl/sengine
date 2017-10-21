import { SimpleTextureShader } from '../Model/Shader';
import SimpleRectangle from './SimpleRectangle';
export default class SimpleTextureRectangle extends SimpleRectangle {
    protected texture: WebGLTexture;
    protected shader: SimpleTextureShader;
    constructor(texture: WebGLTexture);
    protected createShader(): SimpleTextureShader;
    protected updateAttributes(gl: WebGLRenderingContext): void;
}
