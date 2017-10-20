import { Buffer } from '../Model/Buffer';
import { mat4 } from '../Math';
import { Shader } from '../Model/Shader';
import { Register } from '../Utils';

abstract class Model {
	protected shader: Shader;
	protected buffer: Buffer;

	public constructor() {
		this.shader = this.createShader();
		this.buffer = this.createVertexBuffer();
		Register.registerGLItem(this);
	}

	public useShader(gl: WebGLRenderingContext): void {
		this.shader.use(gl);
	}

	public render(gl: WebGLRenderingContext, mvpMatrix: mat4): void {
		this.updateAttributes(gl);
		this.updateUniforms(gl, mvpMatrix);
		this.draw(gl);
	}

	public initialize(gl: WebGLRenderingContext): void {
		return;
	}

	protected abstract createShader(): Shader;
	protected abstract createVertexBuffer(): Buffer;
	protected abstract updateAttributes(gl: WebGLRenderingContext): void;
	protected abstract updateUniforms(gl: WebGLRenderingContext, mvpMatrix: mat4): void;
	protected abstract draw(gl: WebGLRenderingContext): void;
}

export default Model;
