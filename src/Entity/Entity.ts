import { mat4, vec3 } from '../Math';
import { Shader } from '../OpenGL';
import BaseEntity from './BaseEntity';

export default class Entity extends BaseEntity {
	protected parent?: BaseEntity;
	protected shader: Shader.Shader;
	public position: vec3;
	public scale: vec3;

	public constructor(position: vec3 = new vec3(), scale: vec3 = new vec3(1, 1, 1)) {
		super();
		this.position = position;
		this.scale = scale;
	}

	public setShader(shader: Shader.Shader): this {
		this.shader = shader;
		return this;
	}

	public setParent(parent: BaseEntity): this {
		if (this.parent) {
			const index = this.parent.children.indexOf(this);
			if (index >= 0) {
				this.parent.children.splice(index, 1);
			}
		}

		if (parent) {
			parent.children.push(this);
		}

		this.parent = parent;
		return this;
	}

	public render(gl: WebGLRenderingContext, viewMatrix: mat4, projectionMatrix: mat4): this {
		const modelMatrix = mat4.fromTranslation(this.position).scale(this.scale);
		const modelViewMatrix = modelMatrix.mul(viewMatrix);
		const mvpMatrix = modelViewMatrix.mul(projectionMatrix);

		if (this.shader) {
			this.shader.draw(gl, modelMatrix, mvpMatrix);
		}

		return super.render(gl, modelViewMatrix, projectionMatrix);
	}
}
