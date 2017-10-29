import { mat4, vec3 } from '../Math';
import { Shader } from '../OpenGL';

export default class Entity {
	protected parent?: Entity;
	protected readonly children?: Entity[] = [];

	public position: vec3;
	public scale: vec3;
	protected shader: Shader.Shader;

	public constructor(position: vec3 = new vec3(), scale: vec3 = new vec3(1, 1, 1)) {
		this.position = position;
		this.scale = scale;
	}

	public getRenderingPosition(): vec3 { return this.position; }
	public getRenderingScale(): vec3 { return this.scale; }

	public setShader(shader: Shader.Shader): this {
		this.shader = shader;
		return this;
	}

	public setParent(parent: Entity): this {
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

	public render(gl: WebGLRenderingContext, vpMatrix: mat4): void {
		const scale = this.getRenderingScale();
		const position = this.getRenderingPosition();

		const modelMatrix = mat4.fromTranslation(position).scale(scale);
		const mvpMatrix = modelMatrix.mul(vpMatrix);

		if (this.shader) {
			this.shader.draw(gl, mvpMatrix);
		}

		this.children.forEach((c) => {
			c.render(gl, mvpMatrix);
		});
	}

	public update(deltaTime: number): void {
		this.children.forEach((child) => {
			child.update(deltaTime);
		});
	}
}
