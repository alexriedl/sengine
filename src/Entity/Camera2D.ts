import { mat4, vec2, vec3 } from '../Math';
import { Field } from '../Utils';
import Camera from './Camera';

export default class Camera2D extends Camera {
	private viewMatrix: mat4;
	private readonly _position: Field<vec2>;
	public get position(): vec2 { return this._position.Value; }
	public set position(value: vec2) { this._position.Value = value; }

	private projectionMatrix: mat4;
	private readonly _size: Field<vec2>;
	public get size(): vec2 { return this._size.Value; }
	public set size(value: vec2) { this._size.Value = value; }

	public constructor(size?: vec2, position: vec2 = new vec2()) {
		super();
		this._position = new Field(position);
		this._size = new Field(size);
	}

	public getViewMatrix(gl: WebGLRenderingContext): mat4 {
		if (!this.viewMatrix || this._position.IsDirty) {
			this.viewMatrix = mat4.fromTranslation(this.position.negate().toVec3());
			this._position.markClean();
		}

		return this.viewMatrix;
	}

	public getProjectionMatrix(gl: WebGLRenderingContext): mat4 {
		if (!this.projectionMatrix || this._size.IsDirty) {
			if (!this.size) this.size = new vec2(gl.drawingBufferWidth, gl.drawingBufferHeight);
			const halfSize = this.size.scale(0.5);
			this.projectionMatrix = mat4.ortho(-halfSize.x, halfSize.x, halfSize.y, -halfSize.y, -1, 1);
			this._size.markClean();
		}

		return this.projectionMatrix;
	}
}
