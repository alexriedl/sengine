import { mat4 } from '../Math';

export default abstract class Entity {
	public readonly children?: Entity[] = [];

	public render(gl: WebGLRenderingContext, viewMatrix: mat4, projectionMatrix: mat4): this {
		this.children.forEach((c) => {
			c.render(gl, viewMatrix, projectionMatrix);
		});

		return this;
	}

	public update(deltaTime: number): this {
		this.children.forEach((child) => {
			child.update(deltaTime);
		});

		return this;
	}
}
