import Shader from './Shader';
export default class SimpleShader extends Shader {
    attributePositionLocation: number;
    uniformMVPMatrixLocation: WebGLUniformLocation;
    uniformProjectionMatrixLocation: WebGLUniformLocation;
    uniformColorLocation: WebGLUniformLocation;
    initialize(gl: WebGLRenderingContext): void;
    getVertexSource(): string;
    getFragmentSource(): string;
    static createShader(): SimpleShader;
}
