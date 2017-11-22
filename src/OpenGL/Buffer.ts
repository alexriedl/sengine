import { vec2 } from '../Math';
import { Register } from '../Utils';

export class Buffer {
	protected buffer: WebGLBuffer;
	public options: Buffer.IBufferOptions;

	protected asyncInitializeSettings: { values: number[], options?: Buffer.IBufferOptions };

	constructor(values: number[], options?: Buffer.IBufferOptions) {
		this.setBuffer(values, options);
	}

	public initialize(gl: WebGLRenderingContext): void {
		if (!this.asyncInitializeSettings) return;
		if (!this.buffer) this.buffer = gl.createBuffer();
		const values = this.asyncInitializeSettings.values;
		const options = this.asyncInitializeSettings.options;

		this.options = {
			...Buffer.DEFAULT_OPTIONS,
			...(options || this.options),
		};
		this.options.count = this.options.count || Math.floor(values.length / this.options.size);
		gl.bindBuffer(this.options.target, this.buffer);
		gl.bufferData(this.options.target, new Float32Array(values), this.options.usage);

		this.asyncInitializeSettings = undefined;
	}

	/**
	 * Sets the value within the buffer. Use this function of this size of the buffer is changing.
	 * If the data is changing, but staying the same size, use updateBuffer instead.
	 */
	public setBuffer(values: number[], options?: Buffer.IBufferOptions) {
		this.asyncInitializeSettings = { values, options };
		Register.registerGLItem(this);
	}

	/**
	 * Updates the values within a buffer. This is the perfered method to update values if the size
	 * of the buffer does not change. Do not call this function if the buffer's size changes.
	 */
	public updateBuffer(gl: WebGLRenderingContext, values: number[], offset: number = 0): void {
		gl.bindBuffer(this.options.target, this.buffer);
		gl.bufferSubData(this.options.target, offset, new Float32Array(values));
	}

	public bindVertex(gl: WebGLRenderingContext, vertexAttributeIndex: number): boolean {
		if (!this.buffer) return false;

		gl.bindBuffer(this.options.target, this.buffer);
		gl.vertexAttribPointer(vertexAttributeIndex, this.options.size, this.options.type,
			this.options.normalized, this.options.stride, this.options.offset);

		// TODO: Does this need to be done every frame?
		gl.enableVertexAttribArray(vertexAttributeIndex);

		return true;
	}

	public setSize(size: number): this { this.options.size = size; return this; }
	public setStride(stride: number): this { this.options.stride = stride; return this; }
	public setOffset(offset: number): this { this.options.offset = offset; return this; }
}

export namespace Buffer {
	export interface IBufferOptions {
		target?: number; /* : WebGLBufferTarget = gl.ARRAY_BUFFER */
		usage?: number; /* : WebGLBufferUsage = gl.STATIC_DRAW */
		size?: number; /* : number = 2 */
		type?: number; /* : GLType = gl.FLOAT */
		normalized?: boolean; /* : boolean = false */
		stride?: number; /* : number = 0 */
		offset?: number; /* : number = 0 */
		count?: number; /* : number = Math.floor(values.length / size) */
		renderMode?: number; /* : number = gl.TRIANGLE_FAN */
	}
	export const DEFAULT_OPTIONS = {
		target: WebGLRenderingContext.ARRAY_BUFFER,
		usage: WebGLRenderingContext.STATIC_DRAW,
		size: 2,
		type: WebGLRenderingContext.FLOAT,
		normalized: false,
		stride: 0,
		offset: 0,
		count: undefined,
		renderMode: WebGLRenderingContext.TRIANGLE_FAN,
	};

	export function createGridUV(spriteDim: vec2, textureDim: vec2, totalSprites?: number,
		paddingDim: vec2 = new vec2(), options?: IBufferOptions): Buffer {
		if (!totalSprites) totalSprites = 3; // TODO: Actually calculate this

		const buffer = [];
		let count = 0;
		for (let y = paddingDim.y; y < textureDim.y && count < totalSprites; y += spriteDim.y) {
			for (let x = paddingDim.x; x < textureDim.x && count < totalSprites; x += spriteDim.x) {
				count++;

				const left = x / textureDim.x;
				const right = (x + spriteDim.x) / textureDim.x;
				const top = y / textureDim.y;
				const bottom = (y + spriteDim.y) / textureDim.y;

				buffer.push(
					left, top,
					right, top,
					right, bottom,
					left, bottom,
				);
			}
		}

		return new Buffer(buffer, options);
	}

	export function createRectangleUV(minX: number = 0, minY: number = 0, maxX: number = 1, maxY: number = 1,
		options?: IBufferOptions): Buffer {
		const o: IBufferOptions = {
			...options,
			size: 2,
		};
		return new Buffer([
			minX, minY,
			maxX, minY,
			maxX, maxY,
			minX, maxY,
		], o);
	}

	export function createSquare(size: number = 1, options?: IBufferOptions): Buffer {
		return createRectangle(size, size, options);
	}

	export function createRectangle(width: number = 1, height: number = 1, options?: IBufferOptions): Buffer {
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		const o: IBufferOptions = {
			...options,
			size: 2,
		};
		return new Buffer([
			-halfWidth, -halfHeight,
			+halfWidth, -halfHeight,
			+halfWidth, +halfHeight,
			-halfWidth, +halfHeight,
		], o);
	}

	export function createCube(width: number = 1, height: number = 1, depth: number = 1,
		options?: IBufferOptions): Buffer {
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		const halfDepth = depth / 2;
		const o: IBufferOptions = {
			...options,
			size: 3,
			renderMode: WebGLRenderingContext.TRIANGLES,
		};
		const LEFT_BOTTOM_CLOSE = [-halfWidth, -halfHeight, -halfDepth];
		const RIGHT_BOTTOM_CLOSE = [+halfWidth, -halfHeight, -halfDepth];
		const RIGHT_TOP_CLOSE = [+halfWidth, +halfHeight, -halfDepth];
		const LEFT_TOP_CLOSE = [-halfWidth, +halfHeight, -halfDepth];

		const LEFT_BOTTOM_FAR = [-halfWidth, -halfHeight, +halfDepth];
		const RIGHT_BOTTOM_FAR = [+halfWidth, -halfHeight, +halfDepth];
		const RIGHT_TOP_FAR = [+halfWidth, +halfHeight, +halfDepth];
		const LEFT_TOP_FAR = [-halfWidth, +halfHeight, +halfDepth];

		return new Buffer([
			// Front Face
			...LEFT_BOTTOM_CLOSE,
			...RIGHT_BOTTOM_CLOSE,
			...RIGHT_TOP_CLOSE,

			...RIGHT_TOP_CLOSE,
			...LEFT_TOP_CLOSE,
			...LEFT_BOTTOM_CLOSE,

			// Back Face
			...LEFT_BOTTOM_FAR,
			...RIGHT_TOP_FAR,
			...RIGHT_BOTTOM_FAR,

			...RIGHT_TOP_FAR,
			...LEFT_BOTTOM_FAR,
			...LEFT_TOP_FAR,

			// Left Face
			...LEFT_BOTTOM_CLOSE,
			...LEFT_TOP_CLOSE,
			...LEFT_TOP_FAR,

			...LEFT_TOP_FAR,
			...LEFT_BOTTOM_FAR,
			...LEFT_BOTTOM_CLOSE,

			// Right Face
			...RIGHT_BOTTOM_CLOSE,
			...RIGHT_TOP_FAR,
			...RIGHT_TOP_CLOSE,

			...RIGHT_TOP_FAR,
			...RIGHT_BOTTOM_CLOSE,
			...RIGHT_BOTTOM_FAR,

			// Top Face
			...RIGHT_TOP_CLOSE,
			...RIGHT_TOP_FAR,
			...LEFT_TOP_FAR,

			...LEFT_TOP_FAR,
			...LEFT_TOP_CLOSE,
			...RIGHT_TOP_CLOSE,

			// Bottom Face
			...RIGHT_BOTTOM_CLOSE,
			...RIGHT_BOTTOM_FAR,
			...LEFT_BOTTOM_FAR,

			...LEFT_BOTTOM_FAR,
			...LEFT_BOTTOM_CLOSE,
			...RIGHT_BOTTOM_CLOSE,
		], o);
	}
}

export default Buffer;
