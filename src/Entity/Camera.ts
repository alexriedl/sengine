import { mat4, vec2 } from '../Math';
import { Texture } from '../OpenGL';
import { Color } from '../Utils';

export default abstract class Camera {
	private backgroundColor: Color = Color.BLACK;
	public renderTarget: RenderTarget;

		// tslint:disable-next-line:no-bitwise
	public readonly CLEAR_MASK = WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT;

	public abstract getViewMatrix(gl: WebGLRenderingContext): mat4;
	public abstract getProjectionMatrix(gl: WebGLRenderingContext): mat4;

	public setViewport(gl: WebGLRenderingContext): this {
		let width;
		let height;
		if (!this.renderTarget) {
			width = gl.drawingBufferWidth;
			height = gl.drawingBufferHeight;
		}

		gl.viewport(0, 0, width, height);
		return this;
	}

	public setBackgroundColor(backgroundColor: Color): this {
		this.backgroundColor = backgroundColor;
		return this;
	}

	public clearScreen(gl: WebGLRenderingContext): this {
		gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
		gl.clear(this.CLEAR_MASK);
		return this;
	}

	public setRenderTarget(gl: WebGLRenderingContext): this {
		if (this.renderTarget) this.renderTarget.bind(gl);
		return this;
	}
}

// tslint:disable-next-line:max-classes-per-file
export abstract class RenderTarget {
	private static LAST_RENDER_TARGET: RenderTarget;
	public dimensions: vec2;
	public get aspect(): number { return this.dimensions.x / this.dimensions.y; }

	public constructor(gl: WebGLRenderingContext) {
		//
	}

	protected abstract bindToTarget(gl: WebGLRenderingContext): void;

	public bind(gl: WebGLRenderingContext): void {
		if (this !== RenderTarget.LAST_RENDER_TARGET) {
			this.bindToTarget(gl);
			RenderTarget.LAST_RENDER_TARGET = this;
		}
	}
}

// tslint:disable-next-line:max-classes-per-file
export class FrameBufferRenderTarget extends RenderTarget {
	public target: WebGLFramebuffer | null;

	public constructor(gl: WebGLRenderingContext, target: Texture) {
		super(gl);

		const framebuffer = gl.createFramebuffer();
		gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, framebuffer);
		gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER,
			WebGLRenderingContext.COLOR_ATTACHMENT0, target.webGLTarget, target.webGLTexture, 0);

		this.target = framebuffer;
		this.dimensions = new vec2(target.width, target.height);

		gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
	}

	protected bindToTarget(gl: WebGLRenderingContext): void {
		gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, this.target);
	}
}
