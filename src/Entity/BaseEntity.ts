import { mat4 } from '../Math';

export default abstract class Entity {
	public readonly children?: Entity[] = [];

	public render(gl: WebGLRenderingContext, mvpMatrix: mat4): this {
		this.children.forEach((c) => {
			c.render(gl, mvpMatrix);
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
