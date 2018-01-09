// tslint:disable-next-line:no-implicit-dependencies
import { Buffer, Entity, mat4, Shader, Texture, vec2 } from 'sengine';

interface ISpriteRenderThing {
	position: vec2;
	size: vec2;
	spriteIndex: number;
}
interface ISpriteFrame {
	left: number;
	right: number;
	top: number;
	bottom: number;
}

export default class Sprite extends Entity {
	private thingsToRender: ISpriteRenderThing[] = [];
	private frames: ISpriteFrame[];
	private buffer: Buffer;

	public constructor(texture: string | Texture, spriteSize: vec2, textureSize: vec2,
		totalSprites: number, paddingSize: vec2 = new vec2()) {
		super();
		const SIZE_OF_FLOAT = 4;
		this.buffer = new Buffer([], {
			renderMode: WebGLRenderingContext.TRIANGLES,
			bufferUsages: [
				{ size: 2, stride: 4 * SIZE_OF_FLOAT, offset: 0 * SIZE_OF_FLOAT },
				{ size: 2, stride: 4 * SIZE_OF_FLOAT, offset: 2 * SIZE_OF_FLOAT },
			],
		});

		this.setShader(new Shader.TextureShader(texture, this.buffer));
		this.buildFrames(spriteSize, textureSize, totalSprites, paddingSize);
	}

	protected buildFrames(spriteSize: vec2, textureSize: vec2, totalSprites: number, paddingSize: vec2) {
		const frames: ISpriteFrame[] = [];
		let count = 0;
		for (let y = paddingSize.y; y < textureSize.y && count < totalSprites; y += spriteSize.y) {
			for (let x = paddingSize.x; x < textureSize.x && count < totalSprites; x += spriteSize.x) {
				count++;

				const left = x / textureSize.x;
				const right = (x + spriteSize.x) / textureSize.x;
				const top = y / textureSize.y;
				const bottom = (y + spriteSize.y) / textureSize.y;

				frames.push({ left, right, top, bottom });
			}
		}
		this.frames = frames;
	}

	// NOTE: Perhaps multiple methods. center vs corner vs etc.
	public push(position: vec2, size: vec2, spriteIndex: number): void {
		this.thingsToRender.push({ position, size, spriteIndex });
	}

	public render(gl: WebGLRenderingContext, viewMatrix: mat4, projectionMatrix: mat4): this {
		let newBuffer = [];
		for (const thing of this.thingsToRender) {
			const frame = this.frames[thing.spriteIndex];
			if (!frame) {
				console.log('failed to find frame info for index' + thing.spriteIndex);
				continue;
			}

			const x = thing.position.x;
			const y = thing.position.y;
			const width = thing.size.x;
			const height = thing.size.y;

			const LEFT = x;
			const RIGHT = x + width;
			const TOP = y;
			const BOTTOM = y + height;

			// newBuffer.push.apply([
			newBuffer = [
				LEFT, TOP, frame.left, frame.top,
				RIGHT, TOP, frame.right, frame.top,
				RIGHT, BOTTOM, frame.right, frame.bottom,

				RIGHT, BOTTOM, frame.right, frame.bottom,
				LEFT, BOTTOM, frame.left, frame.bottom,
				LEFT, TOP, frame.left, frame.top,
			];
		}

		this.thingsToRender = [];
		this.buffer.setBufferNow(gl, newBuffer);
		return super.render(gl, viewMatrix, projectionMatrix);
	}
}
