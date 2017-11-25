import { mat4, vec2, vec3 } from '../Math';
import Camera from './Camera';

export default class Camera2D extends Camera {
	public position: vec2;
	public size: vec2;

	public constructor(size?: vec2, position?: vec2) {
		super();
		this.size = size;
		this.position = position;
	}

	public getViewMatrix(gl: WebGLRenderingContext): mat4 {
		let position;
		if (this.position) position = this.position.toVec3();
		else position = new vec3();

		return mat4.fromTranslation(position.negate());
	}

	public getProjectionMatrix(gl: WebGLRenderingContext): mat4 {
		let size = this.size;
		if (!size) size = new vec2(gl.drawingBufferWidth, gl.drawingBufferHeight);
		const halfSize = size.scale(0.5);

		// TODO: Implement a dirty check so this is not calculated every frame
		return mat4.ortho(-halfSize.x, halfSize.x, halfSize.y, -halfSize.y, -1, 1);
	}
}
