import { mat4 } from '../../Math';
import { Color } from '../../Utils';
import Buffer from '../Buffer';
import Shader from './Shader';

const vertexShaderSource = `
attribute vec4 a_position;
uniform mat4 u_mvp_matrix;

void main() {
	gl_Position = u_mvp_matrix * a_position;
}`;

const fragmentShaderSource = `
precision mediump float;

struct DirectionalLight
{
	vec4 color;
	float ambientIntensity;
};

uniform vec4 u_color;
uniform DirectionalLight u_directional_light;

void main() {
	gl_FragColor = u_color * u_directional_light.color * u_directional_light.ambientIntensity;
}`;

export interface ISimpleShaderMetadata extends Shader.IShaderMetadata {
	attributes: { a_position: number };
	uniforms: {
		u_mvp_matrix: WebGLUniformLocation,
		u_color: WebGLUniformLocation,
		u_directional_light: WebGLUniformLocation,
	};
}

export interface IDirectionalLight {
	color: Color;
	ambientIntensity: number;
}
export const DEFAULT_DIRECTIONAL_LIGHT: IDirectionalLight = {
	color: Color.WHITE,
	ambientIntensity: 1.0,
};

export default class AmbientLightShader extends Shader {
	protected buffer: Buffer;
	protected color: Color;
	protected directionalLight: IDirectionalLight;

	public constructor(buffer: Buffer, color: Color = Color.WHITE,
		directionalLight: IDirectionalLight = DEFAULT_DIRECTIONAL_LIGHT) {
		super(vertexShaderSource, fragmentShaderSource);
		this.buffer = buffer;
		this.color = color;
		this.directionalLight = directionalLight;
	}

	public setBuffer(buffer: Buffer): this {
		this.buffer = buffer;
		return this;
	}

	public setColor(color: Color): this {
		this.color = color;
		return this;
	}

	public setDirectionalLight(directionalLight: IDirectionalLight): this {
		this.directionalLight = directionalLight;
		return this;
	}

	protected createMetadata(vertex: string, fragment: string): ISimpleShaderMetadata {
		const metadata = super.createMetadata(vertex, fragment) as ISimpleShaderMetadata;
		metadata.attributes.a_position = undefined;
		metadata.uniforms.u_color = undefined;
		metadata.uniforms.u_mvp_matrix = undefined;
		metadata.uniforms.u_directional_light = {
			color: undefined,
			ambientIntensity: undefined,
		};
		return metadata;
	}

	public draw(gl: WebGLRenderingContext, mvpMatrix: mat4): void {
		if (!this.bind(gl)) return;
		if (!this.buffer.bindVertex(gl, this.metadata.attributes.a_position)) return;
		gl.uniformMatrix4fv(this.metadata.uniforms.u_mvp_matrix, false, mvpMatrix.toFloat32Array());
		gl.uniform4fv(this.metadata.uniforms.u_color, this.color.toFloat32Array());
		gl.uniform4fv(this.metadata.uniforms.u_directional_light.color, this.directionalLight.color.toFloat32Array());
		gl.uniform1f(this.metadata.uniforms.u_directional_light.ambientIntensity, this.directionalLight.ambientIntensity);
		gl.drawArrays(this.buffer.options.renderMode, 0, this.buffer.options.count);
	}
}
