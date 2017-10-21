import { Buffer } from '../Model/Buffer';
import { Color } from '../Utils';
import { mat4 } from '../Math';
import { SimpleShader } from '../Model/Shader';
import Model from './Model';
declare class SimpleRectangle extends Model {
    protected buffer: Buffer;
    protected shader: SimpleShader;
    protected color: Color;
    constructor(color: Color);
    protected createShader(): SimpleShader;
    protected createVertexBuffer(): Buffer;
    protected updateAttributes(gl: WebGLRenderingContext): void;
    protected updateUniforms(gl: WebGLRenderingContext, mvpMatrix: mat4): void;
    protected draw(gl: WebGLRenderingContext): void;
}
export default SimpleRectangle;
