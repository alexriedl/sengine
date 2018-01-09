import { mat4 } from '../../Math';
import Buffer from '../Buffer';
import Texture from '../Texture';
import Shader from './Shader';

const vertexShaderSource = `
attribute vec4 a_position;
attribute vec2 a_texcoord;
uniform mat4 u_mvp_matrix;

varying vec2 v_texcoord;

void main() {
	gl_Position = u_mvp_matrix * a_position;
	v_texcoord = a_texcoord;
}`;

const fragmentShaderSource = `
precision mediump float;
uniform sampler2D u_texture;

varying vec2 v_texcoord;

void main() {
	gl_FragColor = texture2D(u_texture, v_texcoord);
}`;

export interface ITextureShaderMetadata extends Shader.IShaderMetadata {
	attributes: {
		a_position: number,
		a_texcoord: number,
	};
	uniforms: {
		u_mvp_matrix: WebGLUniformLocation,
	};
}

export default class TextureShader extends Shader<ITextureShaderMetadata> {
	protected vertBuffer: Buffer;
	protected uvBuffer: Buffer;
	protected texture: Texture;

	public constructor(texture: Texture | string, vertBuffer: Buffer, uvBuffer?: Buffer) {
		super(vertexShaderSource, fragmentShaderSource);
		this.vertBuffer = vertBuffer;
		this.uvBuffer = uvBuffer;
		if (texture instanceof Texture) {
			this.texture = texture;
		}
		else {
			this.texture = new Texture(texture);
		}
	}

	public setVertBuffer(vertBuffer: Buffer): this {
		this.vertBuffer = vertBuffer;
		return this;
	}

	public setUVBuffer(uvBuffer: Buffer): this {
		this.uvBuffer = uvBuffer;
		return this;
	}

	protected createMetadata(vertex: string, fragment: string): ITextureShaderMetadata {
		const metadata = super.createMetadata(vertex, fragment) as ITextureShaderMetadata;
		metadata.attributes.a_position = undefined;
		metadata.attributes.a_texcoord = undefined;
		metadata.uniforms.u_mvp_matrix = undefined;
		return metadata;
	}

	public draw(gl: WebGLRenderingContext, _, mvpMatrix: mat4): void {
		if (!this.vertBuffer) return;
		if (!this.bind(gl)) return;
		if (!this.texture.bind(gl)) return;

		// TODO: Come up with a cleaner way to pass attributes
		if (this.uvBuffer) {
			if (!this.vertBuffer.bindVertex(gl, this.metadata.attributes.a_position)) return;
			if (!this.uvBuffer.bindVertex(gl, this.metadata.attributes.a_texcoord)) return;
		}
		else {
			const both = [this.metadata.attributes.a_position, this.metadata.attributes.a_texcoord];
			if (!this.vertBuffer.bindVertex(gl, both)) return;
		}

		gl.uniformMatrix4fv(this.metadata.uniforms.u_mvp_matrix, false, mvpMatrix.toFloat32Array());
		gl.drawArrays(this.vertBuffer.options.renderMode, 0, this.vertBuffer.options.count);
	}
}
