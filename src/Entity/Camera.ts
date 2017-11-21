import { mat4 } from '../Math';
import { Color } from '../Utils';

export default abstract class Camera {
	private static LAST_RENDER_TARGET: WebGLFramebuffer;
	private backgroundColor: Color = Color.BLACK;
	public renderTarget: WebGLFramebuffer;

	public abstract getViewProjectionMatrix(gl: WebGLRenderingContext): mat4;

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

	protected getClearMask(gl: WebGLRenderingContext): number {
		// tslint:disable-next-line:no-bitwise
		return gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
	}

	public clearScreen(gl: WebGLRenderingContext): this {
		gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
		gl.clear(this.getClearMask(gl));
		return this;
	}

	public setRenderTarget(gl: WebGLRenderingContext): this {
		// TODO: Validate this test (null or undefined [unbind frame buffer takes only null?])
		if (this.renderTarget !== Camera.LAST_RENDER_TARGET) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.renderTarget);
			Camera.LAST_RENDER_TARGET = this.renderTarget;
			console.log('rebound render target');
		}
		return this;
	}
}
