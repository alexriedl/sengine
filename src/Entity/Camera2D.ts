import { mat4, vec2 } from '../Math';
import Camera from './Camera';

export default class Camera2D extends Camera {
	public position: vec2;
	public size: vec2;

	public constructor(size?: vec2, position?: vec2) {
		super();
		this.size = size;
		this.position = position;
	}

	public getViewProjectionMatrix(gl: WebGLRenderingContext): mat4 {
		let size = this.size;
		let position = this.position;

		if (!size) size = new vec2(gl.drawingBufferWidth, gl.drawingBufferHeight);
		if (!position) position = new vec2();

		const halfSize = size.scale(0.5);

		return mat4.ortho(
			position.x - halfSize.x,
			position.x + halfSize.x,
			position.y + halfSize.y,
			position.y - halfSize.y,
			-1, 1);
	}
}
