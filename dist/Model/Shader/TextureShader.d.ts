import SimpleTextureShader from './SimpleTextureShader';
export default class TextureShader extends SimpleTextureShader {
    attributeTexCoordLocation: number;
    initialize(gl: WebGLRenderingContext): void;
    getVertexSource(): string;
    static createShader(): TextureShader;
}
