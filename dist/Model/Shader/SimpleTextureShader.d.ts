import SimpleShader from './SimpleShader';
export default class SimpleTextureShader extends SimpleShader {
    getVertexSource(): string;
    getFragmentSource(): string;
    static createShader(): SimpleTextureShader;
}
