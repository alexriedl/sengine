import { Scene } from '../Entity';
import { Canvas } from '../OpenGL';
import { Register } from '../Utils';

export default abstract class Game {
	protected scene: Scene;
	private gl: WebGLRenderingContext;

	private then: number;
	private running: boolean = false;

	public constructor(glContext: WebGLRenderingContext | string) {
		if (glContext instanceof WebGLRenderingContext) {
			this.gl = glContext;
		}
		else {
			this.gl = Canvas.createFromElementId(glContext);
		}

		// TODO: Make more configurable (webgl setup/feature enables)
		const gl = this.gl;
		gl.enable(WebGLRenderingContext.DEPTH_TEST);
		gl.depthFunc(WebGLRenderingContext.LEQUAL);

		gl.enable(WebGLRenderingContext.BLEND);
		gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);

		gl.enable(WebGLRenderingContext.CULL_FACE);
		gl.cullFace(WebGLRenderingContext.FRONT);
	}

	/**
	 * Set the scene for the game. The default update/render functions redirect logic to this scene.
	 * The old scene will be returned
	 */
	public setScene(scene: Scene): Scene {
		const old = this.scene;
		this.scene = scene;
		return old;
	}

	protected update(deltaTime: number): void {
		if (this.scene) this.scene.update(deltaTime);
	}

	protected render(): void {
		if (this.scene) this.scene.render(this.gl);
	}

	public start(): void {
		if (this.running) return;
		this.running = true;
		requestAnimationFrame(this.frame);
	}

	public stop(): void {
		this.running = false;
	}

	protected frame = (now: number) => {
		if (!this.running) {
			this.then = undefined;
			return;
		}

		const deltaTime = now - this.then;
		{
			const skipFrame = !this.then;
			this.then = now;

			if (skipFrame) {
				requestAnimationFrame(this.frame);
				return;
			}
		}

		Register.initializeGLItems(this.gl);
		this.update(deltaTime);
		this.render();

		requestAnimationFrame(this.frame);
	}
}
