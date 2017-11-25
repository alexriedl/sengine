import { Md5 } from 'ts-md5/dist/md5';

import { mat4 } from '../../Math';
import { Register, Types } from '../../Utils';

export abstract class Shader {
	private static metadata: Types.IStringMap<Shader.IShaderMetadata> = {};
	protected metadata: Shader.IShaderMetadata;

	constructor(vertex: string, fragment: string, cacheProgram: boolean = true) {
		if (cacheProgram) {
			const hash = Md5.hashStr(vertex + fragment) as string;
			if (!Shader.metadata[hash]) {
				Shader.metadata[hash] = this.createMetadata(vertex, fragment);
			}

			this.metadata = Shader.metadata[hash];
		}
		else {
			this.metadata = this.createMetadata(vertex, fragment);
		}
	}

	protected createMetadata(vertex: string, fragment: string): Shader.IShaderMetadata {
		Register.registerGLItem(this);
		return {
			vertex,
			fragment,
			program: undefined,
			attributes: {},
			uniforms: {},
		};
	}

	public initialize(gl: WebGLRenderingContext): void {
		this.metadata.program = Shader.buildProgram(gl, this.metadata.vertex, this.metadata.fragment);
		if (typeof this.metadata.attributes === 'object') {
			Object.keys(this.metadata.attributes).forEach((key) => {
				this.metadata.attributes[key] = gl.getAttribLocation(this.metadata.program, key);
			});
		}

		// TODO: Come up with a more robust way to recursively pull values out of shader attributes/uniforms
		if (typeof this.metadata.uniforms === 'object') {
			Object.keys(this.metadata.uniforms).forEach((key) => {
				if (typeof this.metadata.uniforms[key] === 'object') {
					if (!this.metadata.uniforms[key]) this.metadata.uniforms[key] = {};
					Object.keys(this.metadata.uniforms[key]).forEach((k) => {
						this.metadata.uniforms[key][k] = gl.getUniformLocation(this.metadata.program, `${key}.${k}`);
					});
				}
				else {
					this.metadata.uniforms[key] = gl.getUniformLocation(this.metadata.program, key);
				}
			});
		}
	}

	protected bind(gl: WebGLRenderingContext): boolean {
		if (!this.metadata.program) return false;
		gl.useProgram(this.metadata.program);
		return true;
	}

	public abstract draw(gl: WebGLRenderingContext, modelMatrix: mat4, mvpMatrix: mat4): void;

	public static compileSource(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
		const shader: WebGLShader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		const success = gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS);
		if (success) return shader;

		console.log(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
	}

	public static buildProgram(gl: WebGLRenderingContext, vertex: string, fragment: string): WebGLProgram {
		const vertexShader = Shader.compileSource(gl, WebGLRenderingContext.VERTEX_SHADER, vertex);
		const fragmentShader = Shader.compileSource(gl, WebGLRenderingContext.FRAGMENT_SHADER, fragment);

		if (!vertexShader || !fragmentShader) {
			console.error('Failed to compile a shader.');
			gl.deleteShader(vertexShader);
			gl.deleteShader(fragmentShader);
			return;
		}

		const program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		const success = gl.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS);
		if (!success) {
			console.log(gl.getProgramInfoLog(program));
			console.error('Failed to create shader program.');
			gl.deleteProgram(program);
			return;
		}

		return program;
	}
}

export namespace Shader {
	export interface IShaderMetadata {
		readonly vertex: string;
		readonly fragment: string;
		program: WebGLProgram;
		attributes: any;
		uniforms: any;
	}
}

export default Shader;
