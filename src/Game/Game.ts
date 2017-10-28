import { Color, Register } from '../Utils';
import { Entity } from '../Entity';
import { vec2 } from '../Math';
import Renderer from './Renderer';

export default abstract class Game {
	protected readonly renderer: Renderer;

	// TODO: Perhaps extend entity to make a real scene? Allow a color to be set
	protected scene: Entity;
	protected backgroundColor: Color;

	private then: number;
	private running: boolean = false;
	private initialized: boolean = false;

	public constructor(canvasId: string) {
		this.renderer = new Renderer(canvasId);
	}

	protected initialize(gl: WebGLRenderingContext): void {
		Register.initializeGLItems(gl);
	}

	/**
	 * Set the scene for the game. The default update/render functions redirect logic to this scene.
	 * The old scene will be returned
	 */
	public setScene(scene: Entity, PixelDimensions: vec2, backgroundColor: Color = Color.BLACK): Entity {
		const old = this.scene;
		this.scene = scene;
		this.backgroundColor = backgroundColor;
		this.renderer.setSize(PixelDimensions);
		return old;
	}

	protected update(deltaTime: number): void {
		if (this.scene) this.scene.update(deltaTime);
	}

	protected render(): void {
		if (this.scene) this.renderer.render(this.scene, this.backgroundColor);
		else this.renderer.clearScreen(this.backgroundColor);
	}

	public start(): void {
		if (!this.initialized) {
			this.initialize(this.renderer.gl);
			this.initialized = true;
		}
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

		this.update(deltaTime);
		this.render();

		requestAnimationFrame(this.frame);
	}
}
