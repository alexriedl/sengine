import { vec2 } from '../Math';
import { Register } from '../Utils';

// tslint:disable:max-line-length
export class Texture {
	private data: Uint8Array | string;
	private w?: vec2 | number;
	private h?: number;
	private texture: WebGLTexture;

	constructor(source: string);
	constructor(data: Uint8Array, dimensions: vec2);
	constructor(data: Uint8Array, width: number, height: number);
	constructor(data: Uint8Array | string, w?: vec2 | number, h?: number) {
		this.data = data;
		this.w = w;
		this.h = h;
		Register.registerGLItem(this);
	}

	public initialize(gl: WebGLRenderingContext): void {
		this.texture = Texture.create(gl, this.data, this.w, this.h);
	}

	public bind(gl: WebGLRenderingContext): boolean {
		if (!this.texture) return false;
		gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
		return true;
	}
}

export namespace Texture {
	export function create(gl: WebGLRenderingContext, source: string): WebGLTexture;
	export function create(gl: WebGLRenderingContext, data: Uint8Array, dimensions: vec2): WebGLTexture;
	export function create(gl: WebGLRenderingContext, data: Uint8Array, width: number, height: number): WebGLTexture;
	export function create(gl: WebGLRenderingContext, data: Uint8Array | string, w?: vec2 | number, h?: number): WebGLTexture;
	export function create(
		gl: WebGLRenderingContext,
		data: Uint8Array | string,
		w?: vec2 | number,
		h?: number): WebGLTexture {

		let source;
		if (typeof data === 'string') {
			h = w = 1;
			source = data;
			data = new Uint8Array([0, 0, 255, 255]);
		}
		else if (w instanceof vec2) {
			h = w.y;
			w = w.x;
		}

		const texture = gl.createTexture();
		gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
		gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
		gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, w, h, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, data);

		gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
		gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
		gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE);
		gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE);

		gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);

		if (source) {
			const image = new Image();
			image.src = source;
			image.onload = () => {
				gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
				gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, image);
				gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);
			};
		}

		return texture;
	}
}

export default Texture;
