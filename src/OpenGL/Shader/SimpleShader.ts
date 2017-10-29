import Shader from './Shader';
import { mat4 } from '../../Math';
import { Color } from '../../Utils';
import Buffer from '../Buffer';

const vertexShaderSource = `
attribute vec4 a_position;
uniform mat4 u_mvp_matrix;

void main() {
	gl_Position = u_mvp_matrix * a_position;
}`;

const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_color;

void main() {
	gl_FragColor = u_color;
}`;

export interface ISimpleShaderMetadata extends Shader.IShaderMetadata {
	attributes: { a_position: number };
	uniforms: {
		u_mvp_matrix: WebGLUniformLocation,
		u_color: WebGLUniformLocation,
	};
}

export default class SimpleShader extends Shader {
	protected buffer: Buffer;
	protected color: Color;

	public constructor(buffer: Buffer, color: Color = Color.WHITE) {
		super(vertexShaderSource, fragmentShaderSource);
		this.buffer = buffer;
		this.color = color;
	}

	public setBuffer(buffer: Buffer): this {
		this.buffer = buffer;
		return this;
	}

	public setColor(color: Color): this {
		this.color = color;
		return this;
	}

	protected createMetadata(vertex: string, fragment: string): ISimpleShaderMetadata {
		const metadata = super.createMetadata(vertex, fragment) as ISimpleShaderMetadata;
		metadata.attributes.a_position = undefined;
		metadata.uniforms.u_color = undefined;
		metadata.uniforms.u_mvp_matrix = undefined;
		return metadata;
	}

	public draw(gl: WebGLRenderingContext, mvpMatrix: mat4): void {
		if (!this.bind(gl)) return;
		if (!this.buffer.bindVertex(gl, this.metadata.attributes.a_position)) return;
		gl.uniformMatrix4fv(this.metadata.uniforms.u_mvp_matrix, false, mvpMatrix.toFloat32Array());
		gl.uniform4fv(this.metadata.uniforms.u_color, this.color.toFloat32Array());
		gl.drawArrays(gl.TRIANGLE_FAN, 0, this.buffer.options.count);
	}
}
