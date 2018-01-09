import { mat4, vec3 } from '../../Math';
import { Color } from '../../Utils';
import Buffer from '../Buffer';
import Shader from './Shader';

const vertexShaderSource = `
attribute vec4 a_position;
attribute vec3 a_normal;

uniform mat4 u_mvp_matrix;
uniform mat4 u_normal_matrix;

varying vec3 v_normal;

void main() {
	gl_Position = u_mvp_matrix * a_position;
	v_normal = (u_normal_matrix * vec4(a_normal, 0.0)).xyz;
}`;

const fragmentShaderSource = `
precision mediump float;

struct DirectionalLight
{
	float ambientIntensity;
	vec3 direction;
	vec4 color;
};

uniform vec4 u_color;
uniform DirectionalLight u_directional_light;

varying vec3 v_normal;

void main() {
	vec3 normal = normalize(v_normal);
	float diffuseIntensity = max(0.0, dot(normal, -u_directional_light.direction));
	vec4 lighting = u_directional_light.color * (u_directional_light.ambientIntensity + diffuseIntensity);
	gl_FragColor = u_color * lighting;
}`;

export interface IAmbientLightShaderMetadata extends Shader.IShaderMetadata {
	attributes: {
		a_position: number,
		a_normal: number,
	};
	uniforms: {
		u_mvp_matrix: WebGLUniformLocation,
		u_normal_matrix: WebGLUniformLocation,
		u_color: WebGLUniformLocation,
		u_directional_light: {
			ambientIntensity: WebGLUniformLocation,
			color: WebGLUniformLocation,
			direction: WebGLUniformLocation,
		},
	};
}

export interface IDirectionalLight {
	ambientIntensity: number;
	color: Color;
	direction: vec3;
}
export const DEFAULT_DIRECTIONAL_LIGHT: IDirectionalLight = {
	ambientIntensity: 1.0,
	color: Color.WHITE,
	direction: new vec3(1, -3, 0).normalize(),
};

export default class AmbientLightShader extends Shader<IAmbientLightShaderMetadata> {
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

	protected createMetadata(vertex: string, fragment: string): IAmbientLightShaderMetadata {
		const metadata = super.createMetadata(vertex, fragment) as IAmbientLightShaderMetadata;
		metadata.attributes.a_position = undefined;
		metadata.attributes.a_normal = undefined;
		metadata.uniforms.u_color = undefined;
		metadata.uniforms.u_mvp_matrix = undefined;
		metadata.uniforms.u_normal_matrix = undefined;
		metadata.uniforms.u_directional_light = {
			ambientIntensity: undefined,
			color: undefined,
			direction: undefined,
		};
		return metadata;
	}

	public draw(gl: WebGLRenderingContext, modelMatrix: mat4, mvpMatrix: mat4): void {
		if (!this.bind(gl)) return;
		if (!this.buffer.bindVertex(gl, [
			this.metadata.attributes.a_position,
			this.metadata.attributes.a_normal,
		])) return;
		const normalMatrix = modelMatrix.inverse().transpose();
		gl.uniformMatrix4fv(this.metadata.uniforms.u_mvp_matrix, false, mvpMatrix.toFloat32Array());
		gl.uniformMatrix4fv(this.metadata.uniforms.u_normal_matrix, false, normalMatrix.toFloat32Array());
		gl.uniform4fv(this.metadata.uniforms.u_color, this.color.toFloat32Array());
		gl.uniform4fv(this.metadata.uniforms.u_directional_light.color, this.directionalLight.color.toFloat32Array());
		gl.uniform3fv(this.metadata.uniforms.u_directional_light.direction, this.directionalLight.direction.toFloat32Array());
		gl.uniform1f(this.metadata.uniforms.u_directional_light.ambientIntensity, this.directionalLight.ambientIntensity);
		gl.drawArrays(this.buffer.options.renderMode, 0, this.buffer.options.count);
	}
}
