import { vec2 } from '../Math';
import { Register } from '../Utils';

// tslint:disable:max-line-length
export class Texture {
	private asyncInitializingInfo: {
		data: Uint8Array | string;
		options: Texture.IBaseTextureOptions | Texture.ITextureOptionsN | Texture.ITextureOptionsV;
	};
	private texture: Texture.ITextureOptionsResult;

	public get webGLTexture(): WebGLTexture { return this.texture.texture; }
	public get webGLTarget(): number { return this.texture.target; }
	public get width(): number { return this.texture.width; }
	public get height(): number { return this.texture.height; }

	constructor(source: string, options?: Texture.IBaseTextureOptions);
	constructor(data: Uint8Array, options: Texture.ITextureOptionsN | Texture.ITextureOptionsV);
	constructor(data?: string | Uint8Array, options?: Texture.IBaseTextureOptions | Texture.ITextureOptionsN | Texture.ITextureOptionsV);
	constructor(data?: string | Uint8Array, options?: Texture.IBaseTextureOptions | Texture.ITextureOptionsN | Texture.ITextureOptionsV) {
		this.asyncInitializingInfo = { data, options };
		Register.registerGLItem(this);
	}

	public initialize(gl: WebGLRenderingContext): void {
		this.texture = Texture.create(gl, this.asyncInitializingInfo.data, this.asyncInitializingInfo.options);
	}

	public bind(gl: WebGLRenderingContext): boolean {
		if (!this.webGLTexture) return false;
		gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.webGLTexture);
		return true;
	}
}

export namespace Texture {
	export const DEFAULT_TEXTURE_WIDTH = 10;
	export const DEFAULT_TEXTURE_HEIGHT = 10;
	const defaultData = [];
	const BLACK = [0, 0, 0, 255];
	const WHITE = [255, 255, 255, 255];
	for (let y = 0; y < DEFAULT_TEXTURE_HEIGHT; y++) {
		for (let x = 0; x < DEFAULT_TEXTURE_WIDTH; x++) {
			if (x % 2 === (y % 2)) {
				defaultData.push(...WHITE);
			}
			else {
				defaultData.push(...BLACK);
			}
		}
	}
	export const DEFAULT_TEXTURE_DATA: Uint8Array = new Uint8Array(defaultData);

	export const DEFAULT_OPTIONS: IBaseTextureOptions = {
		target: WebGLRenderingContext.TEXTURE_2D,
		magFilter: WebGLRenderingContext.NEAREST,
		minFilter: WebGLRenderingContext.NEAREST,
		wrapS: WebGLRenderingContext.CLAMP_TO_EDGE,
		wrapT: WebGLRenderingContext.CLAMP_TO_EDGE,
	};

	export interface IBaseTextureOptions {
		target?: number;
		magFilter?: number;
		minFilter?: number;
		wrapS?: number;
		wrapT?: number;
	}

	export interface ITextureOptionsV extends IBaseTextureOptions {
		dimensions: vec2;
	}

	export interface ITextureOptionsN extends IBaseTextureOptions {
		width: number;
		height: number;
	}

	export interface ITextureOptionsResult extends ITextureOptionsN {
		texture: WebGLTexture;
	}

	export function create(gl: WebGLRenderingContext, source: string, options?: IBaseTextureOptions): ITextureOptionsResult;
	export function create(gl: WebGLRenderingContext, data: Uint8Array, options: ITextureOptionsN | ITextureOptionsV): ITextureOptionsResult;
	export function create(gl: WebGLRenderingContext, data: string | Uint8Array, options?: IBaseTextureOptions | ITextureOptionsN | ITextureOptionsV): ITextureOptionsResult;
	export function create(gl: WebGLRenderingContext, data?: string | Uint8Array, options?: IBaseTextureOptions | ITextureOptionsN | ITextureOptionsV): ITextureOptionsResult {
		options = { ...DEFAULT_OPTIONS, ...options };

		let w;
		let h;
		let source;
		if (typeof data === 'string' || !data) {
			source = data;
			data = DEFAULT_TEXTURE_DATA;
		}

		if ('dimensions' in options) {
			w = (options as ITextureOptionsV).dimensions.x;
			h = (options as ITextureOptionsV).dimensions.y;
		}
		if ('width' in options) w = (options as ITextureOptionsN).width;
		if ('height' in options) h = (options as ITextureOptionsN).height;

		if (!w) w = DEFAULT_TEXTURE_WIDTH;
		if (!h) h = DEFAULT_TEXTURE_HEIGHT;

		const texture = gl.createTexture();
		gl.bindTexture(options.target, texture);
		gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
		gl.texImage2D(options.target, 0, WebGLRenderingContext.RGBA, w, h, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, data);

		gl.texParameteri(options.target, WebGLRenderingContext.TEXTURE_MAG_FILTER, options.magFilter);
		gl.texParameteri(options.target, WebGLRenderingContext.TEXTURE_MIN_FILTER, options.minFilter);
		gl.texParameteri(options.target, WebGLRenderingContext.TEXTURE_WRAP_S, options.wrapS);
		gl.texParameteri(options.target, WebGLRenderingContext.TEXTURE_WRAP_T, options.wrapT);

		gl.bindTexture(options.target, null);

		const outOptions = {
			...options,
			width: w,
			height: h,
			texture,
		};

		if (source) {
			const image = new Image();
			image.src = source;
			image.onload = () => {
				gl.bindTexture(options.target, texture);
				gl.texImage2D(options.target, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, image);
				gl.bindTexture(options.target, null);

				outOptions.width = image.width;
				outOptions.height = image.height;
			};
		}

		return outOptions;
	}
}

export default Texture;
