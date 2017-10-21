import { Buffer } from '../Model/Buffer';
import { mat4 } from '../Math';
import { Shader } from '../Model/Shader';
declare abstract class Model {
    protected shader: Shader;
    protected buffer: Buffer;
    constructor();
    useShader(gl: WebGLRenderingContext): void;
    render(gl: WebGLRenderingContext, mvpMatrix: mat4): void;
    initialize(gl: WebGLRenderingContext): void;
    protected abstract createShader(): Shader;
    protected abstract createVertexBuffer(): Buffer;
    protected abstract updateAttributes(gl: WebGLRenderingContext): void;
    protected abstract updateUniforms(gl: WebGLRenderingContext, mvpMatrix: mat4): void;
    protected abstract draw(gl: WebGLRenderingContext): void;
}
export default Model;
