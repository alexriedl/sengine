import Entity from './Entity';
import { mat4, vec2 } from '../Math';
import { Color } from '../Utils';

export default class Scene extends Entity {
	private static LAST_RENDER_TARGET: WebGLFramebuffer;
	public renderTarget: WebGLFramebuffer;
	public backgroundColor: Color;
	public dimensions: vec2;
	private vpMatrix: mat4;

	public constructor(pixelDimensions: vec2, backgroundColor: Color = Color.BLACK) {
		super();
		this
			.setOrtho(pixelDimensions)
			.setBackgroundColor(backgroundColor);
	}

	protected clearScreen(gl: WebGLRenderingContext): this {
		gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
		// tslint:disable-next-line:no-bitwise
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		return this;
	}

	protected viewport(gl: WebGLRenderingContext): this {
		const width = this.dimensions.x;
		const height = this.dimensions.y;
		gl.viewport(0, 0, width, height);
		return this;
	}

	public setOrtho(pixelDimensions: vec2): this {
		// TODO: This is not configurable enough (breaks droneup)
		this.vpMatrix = mat4.ortho(0, pixelDimensions.x, pixelDimensions.y, 0, -1, 1);
		this.dimensions = pixelDimensions;
		return this;
	}

	public setBackgroundColor(backgroundColor: Color): this {
		this.backgroundColor = backgroundColor;
		return this;
	}

	public render(gl: WebGLRenderingContext): void {
		// TODO: Validate this test (null or undefined [unbind frame buffer takes only null?])
		if (this.renderTarget !== Scene.LAST_RENDER_TARGET) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.renderTarget);
			Scene.LAST_RENDER_TARGET = this.renderTarget;
			console.log('rebound render target');
		}

		this.viewport(gl);
		this.clearScreen(gl);
		super.render(gl, this.vpMatrix);
	}
}
