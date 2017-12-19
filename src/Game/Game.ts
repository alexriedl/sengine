import { Canvas, Performance, Register, Scene } from '..';

export default class Game {
	private scenes: Scene[] = [];
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
	public setScene(scene: Scene, index: number = 0): this {
		this.scenes[index] = scene;
		return this;
	}

	protected update(deltaTime: number): void {
		for (const scene of this.scenes) {
			scene.update(deltaTime);
		}
	}

	protected clearScreen(): void {
		for (const scene of this.scenes) {
			scene.clearScreen(this.gl);
		}
	}

	protected render(): void {
		for (const scene of this.scenes) {
			scene.render(this.gl);
		}
	}

	public start(): void {
		if (this.running) return;
		this.running = true;
		requestAnimationFrame(this.frame);
	}

	public stop(): void {
		this.running = false;
	}

	protected frame = (now: number): void => {
		if (!this.running) {
			this.then = undefined;
			return;
		}

		const deltaTime = now - this.then;
		{
			const skipFrame = !this.then;
			this.then = now;

			if (skipFrame) {
				console.log('Skipping bad frame');
				requestAnimationFrame(this.frame);
				return;
			}
		}

		Performance.frameStart();

		Register.initializeGLItems(this.gl);
		this.update(deltaTime);
		this.clearScreen();
		this.render();

		Performance.frameEnd();

		requestAnimationFrame(this.frame);
	}
}
