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

		// NOTE: Deep copy options to ensure no re-use of object
		// TODO: Find a more performant way to ensure this
		this.options = JSON.parse(JSON.stringify({
			...Buffer.DEFAULT_OPTIONS,
			...(options || this.options),
		}));
		const totalSize = this.options.bufferUsages.map((u) => u.size).reduce((a, b) => a + b, 0);
		this.options.count = this.options.count || Math.floor(values.length / totalSize);
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

	public bindVertex(gl: WebGLRenderingContext, vertexAttributeIndexs: number | number[]): boolean {
		if (!this.buffer) return false;

		if (!Array.isArray(vertexAttributeIndexs)) {
			vertexAttributeIndexs = [vertexAttributeIndexs];
		}

		gl.bindBuffer(this.options.target, this.buffer);

		for (let index = 0; index < vertexAttributeIndexs.length; index++) {
			const attributeIndex = vertexAttributeIndexs[index];
			const usage = this.options.bufferUsages[index];

			gl.vertexAttribPointer(attributeIndex, usage.size, this.options.type,
				this.options.normalized, usage.stride, usage.offset);

			// TODO: Does this need to be done every frame?
			gl.enableVertexAttribArray(attributeIndex);
		}

		return true;
	}
}

export namespace Buffer {
	// TODO: Come up with a way to have verts and/or colors and/or uv and/or normals in the same buffer
	export interface IBufferOptions {
		target?: number; /* : WebGLBufferTarget = gl.ARRAY_BUFFER */
		usage?: number; /* : WebGLBufferUsage = gl.STATIC_DRAW */
		type?: number; /* : GLType = gl.FLOAT */
		normalized?: boolean; /* : boolean = false */
		count?: number; /* : number = Math.floor(values.length / size) */
		renderMode?: number; /* : number = gl.TRIANGLE_FAN */
		bufferUsages?: IBufferUsage[];
	}
	export interface IBufferUsage {
		size?: number; /* : number = 2 */
		stride?: number; /* : number = 0 */
		offset?: number; /* : number = 0 */
	}
	export const DEFAULT_OPTIONS: IBufferOptions = {
		target: WebGLRenderingContext.ARRAY_BUFFER,
		usage: WebGLRenderingContext.STATIC_DRAW,
		type: WebGLRenderingContext.FLOAT,
		normalized: false,
		count: undefined,
		renderMode: WebGLRenderingContext.TRIANGLE_FAN,
		bufferUsages: [ { size: 2, stride: 0, offset: 0 } ],
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

	export function createRectangleUV(minX: number = 0, minY: number = 0, maxX: number = 1, maxY: number = 1): Buffer {
		const o: IBufferOptions = {
			renderMode: WebGLRenderingContext.TRIANGLE_FAN,
			bufferUsages: [{ size: 2 }],
		};
		return new Buffer([
			minX, minY,
			maxX, minY,
			maxX, maxY,
			minX, maxY,
		], o);
	}

	export function createSquare(size: number = 1): Buffer {
		return createRectangle(size, size);
	}

	export function createRectangle(width: number = 1, height: number = 1): Buffer {
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		const o: IBufferOptions = {
			renderMode: WebGLRenderingContext.TRIANGLE_FAN,
			bufferUsages: [{ size: 2 }],
		};
		return new Buffer([
			-halfWidth, -halfHeight,
			+halfWidth, -halfHeight,
			+halfWidth, +halfHeight,
			-halfWidth, +halfHeight,
		], o);
	}

	export function createCube(width: number = 1, height: number = 1, depth: number = 1): Buffer {
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		const halfDepth = depth / 2;
		const SIZE_OF_FLOAT = 4;
		const o: IBufferOptions = {
			renderMode: WebGLRenderingContext.TRIANGLES,
			bufferUsages: [
				{ size: 3, stride: 6 * SIZE_OF_FLOAT, offset: 0 * SIZE_OF_FLOAT },
				{ size: 3, stride: 6 * SIZE_OF_FLOAT, offset: 3 * SIZE_OF_FLOAT },
			],
		};
		const LEFT_BOTTOM_CLOSE = [-halfWidth, -halfHeight, -halfDepth];
		const RIGHT_BOTTOM_CLOSE = [+halfWidth, -halfHeight, -halfDepth];
		const RIGHT_TOP_CLOSE = [+halfWidth, +halfHeight, -halfDepth];
		const LEFT_TOP_CLOSE = [-halfWidth, +halfHeight, -halfDepth];

		const LEFT_BOTTOM_FAR = [-halfWidth, -halfHeight, +halfDepth];
		const RIGHT_BOTTOM_FAR = [+halfWidth, -halfHeight, +halfDepth];
		const RIGHT_TOP_FAR = [+halfWidth, +halfHeight, +halfDepth];
		const LEFT_TOP_FAR = [-halfWidth, +halfHeight, +halfDepth];

		const NORMAL_TOWARDS = [0, 0, -1];
		const NORMAL_AWAY = [0, 0, 1];
		const NORMAL_LEFT = [-1, 0, 0];
		const NORMAL_RIGHT = [1, 0, 0];
		const NORMAL_UP = [0, 1, 0];
		const NORMAL_DOWN = [0, -1, 0];

		return new Buffer([
			// Front Face
			...LEFT_BOTTOM_CLOSE, ...NORMAL_TOWARDS,
			...RIGHT_BOTTOM_CLOSE, ...NORMAL_TOWARDS,
			...RIGHT_TOP_CLOSE, ...NORMAL_TOWARDS,

			...RIGHT_TOP_CLOSE, ...NORMAL_TOWARDS,
			...LEFT_TOP_CLOSE, ...NORMAL_TOWARDS,
			...LEFT_BOTTOM_CLOSE, ...NORMAL_TOWARDS,

			// Back Face
			...LEFT_BOTTOM_FAR, ...NORMAL_AWAY,
			...RIGHT_TOP_FAR, ...NORMAL_AWAY,
			...RIGHT_BOTTOM_FAR, ...NORMAL_AWAY,

			...RIGHT_TOP_FAR, ...NORMAL_AWAY,
			...LEFT_BOTTOM_FAR, ...NORMAL_AWAY,
			...LEFT_TOP_FAR, ...NORMAL_AWAY,

			// Left Face
			...LEFT_BOTTOM_CLOSE, ...NORMAL_LEFT,
			...LEFT_TOP_CLOSE, ...NORMAL_LEFT,
			...LEFT_TOP_FAR, ...NORMAL_LEFT,

			...LEFT_TOP_FAR, ...NORMAL_LEFT,
			...LEFT_BOTTOM_FAR, ...NORMAL_LEFT,
			...LEFT_BOTTOM_CLOSE, ...NORMAL_LEFT,

			// Right Face
			...RIGHT_BOTTOM_CLOSE, ...NORMAL_RIGHT,
			...RIGHT_TOP_FAR, ...NORMAL_RIGHT,
			...RIGHT_TOP_CLOSE, ...NORMAL_RIGHT,

			...RIGHT_TOP_FAR, ...NORMAL_RIGHT,
			...RIGHT_BOTTOM_CLOSE, ...NORMAL_RIGHT,
			...RIGHT_BOTTOM_FAR, ...NORMAL_RIGHT,

			// Top Face
			...RIGHT_TOP_CLOSE, ...NORMAL_UP,
			...RIGHT_TOP_FAR, ...NORMAL_UP,
			...LEFT_TOP_FAR, ...NORMAL_UP,

			...LEFT_TOP_FAR, ...NORMAL_UP,
			...LEFT_TOP_CLOSE, ...NORMAL_UP,
			...RIGHT_TOP_CLOSE, ...NORMAL_UP,

			// Bottom Face
			...RIGHT_BOTTOM_CLOSE, ...NORMAL_DOWN,
			...RIGHT_BOTTOM_FAR, ...NORMAL_DOWN,
			...LEFT_BOTTOM_FAR, ...NORMAL_DOWN,

			...LEFT_BOTTOM_FAR, ...NORMAL_DOWN,
			...LEFT_BOTTOM_CLOSE, ...NORMAL_DOWN,
			...RIGHT_BOTTOM_CLOSE, ...NORMAL_DOWN,
		], o);
	}
}

export default Buffer;
