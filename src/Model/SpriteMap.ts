/*
import { Buffer, CustomBuffer } from '../Model/Buffer';
import { Color, OpenGL } from '../Utils';
import { TextureShader } from '../Model/Shader';
import SimpleRectangle from './SimpleRectangle';

function buildBuffer(mapInfo: SpriteMap.IMapInfo): number[] {
	const buffer = [];
	let count = 0;
	for (let y = mapInfo.topPadding;
		y < mapInfo.textureHeight && count < mapInfo.totalSprites;
		y += mapInfo.spritHeight) {
		for (let x = mapInfo.leftPadding;
			x < mapInfo.textureWidth && count < mapInfo.totalSprites;
			x += mapInfo.spritWidth) {
			count++;
			const left = x / mapInfo.textureWidth;
			const right = (x + mapInfo.spritWidth) / mapInfo.textureWidth;
			const top = y / mapInfo.textureHeight;
			const bottom = (y + mapInfo.spritHeight) / mapInfo.textureHeight;

			buffer.push(
				left, top,
				right, top,
				right, bottom,
				left, bottom,
			);
		}
	}

	return buffer;
}

abstract class SpriteMap extends SimpleRectangle {
	protected textureBuffer: Buffer;
	protected shader: TextureShader;
	protected texture: WebGLTexture;

	private frame: number;
	private totalFrames: number;

	public constructor() {
		super(new Color(1, 1, 1));
		this.frame = 0;
	}

	public initialize(gl: WebGLRenderingContext): void {
		const mapInfo = this.getMapInfo();
		if (!mapInfo.leftPadding) mapInfo.leftPadding = 0;
		if (!mapInfo.topPadding) mapInfo.topPadding = 0;

		this.textureBuffer = new CustomBuffer(buildBuffer(mapInfo));
		this.texture = OpenGL.Texture.create(gl, mapInfo.source);
		this.totalFrames = mapInfo.totalSprites;
	}

	protected abstract getMapInfo(): SpriteMap.IMapInfo;

	public setFrame(frame: number): number {
		const oldFrame = this.frame;
		this.frame = frame % this.totalFrames;
		return oldFrame;
	}

	protected createShader(): TextureShader {
		return TextureShader.createShader();
	}

	protected updateAttributes(gl: WebGLRenderingContext): void {
		super.updateAttributes(gl);

		const shader = this.shader;
		const textureBuffer = this.textureBuffer.getBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
		gl.vertexAttribPointer(shader.attributeTexCoordLocation, 2, gl.FLOAT, false, 0, this.frame * 8 * 4);
		gl.enableVertexAttribArray(shader.attributeTexCoordLocation);

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
	}
}

namespace SpriteMap {
	export interface IMapInfo {
		leftPadding?: number;
		topPadding?: number;
		textureWidth: number;
		textureHeight: number;
		spritWidth: number;
		spritHeight: number;
		totalSprites: number;
		source: string;
	}
}

export default SpriteMap;

*/
