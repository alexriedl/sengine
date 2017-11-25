import { mat4, vec3 } from '../Math';
import { Field } from '../Utils';
import Camera from './Camera';

export interface IFrustum {
	readonly fovy?: number;
	readonly aspect?: number;
	readonly near?: number;
	readonly far?: number;
}

export interface IView {
	readonly position?: vec3;
	readonly target?: vec3;
	readonly up?: vec3;
}

export default class Camera3D extends Camera {
	private viewMatrix: mat4;
	public readonly _view: Field<IView>;
	public get view(): IView { return this._view.Value; }
	public set view(value: IView) { this._view.Value = { ...this._view.Value, ...value }; }

	private projectionMatarix: mat4;
	public readonly _frustum: Field<IFrustum>;
	public get frustum(): IFrustum { return this._frustum.Value; }
	public set frustum(value: IFrustum) { this._frustum.Value = { ...this._frustum.Value, ...value }; }

	public constructor(view: IView = {}, frustum: IFrustum = {}) {
		super();

		this._view = new Field({
			position: new vec3(0, 0, 10),
			target: new vec3(0, 0, 0),
			up: new vec3(0, 1, 0),
			...view,
		});

		this._frustum = new Field({
			fovy: 90,
			near: 0.01,
			far: 100,
			...frustum,
		});
	}

	public getViewMatrix(gl: WebGLRenderingContext): mat4 {
		if (!this.view || this._view.IsDirty) {
			this.viewMatrix = mat4.lookAt(this.view.position, this.view.target, this.view.up);
			this._view.markClean();
		}

		return this.viewMatrix;
	}

	public getProjectionMatrix(gl: WebGLRenderingContext): mat4 {
		if (!this.frustum || this._frustum.IsDirty) {
			if (!this.frustum.aspect) {
				const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
				this.frustum = {
					...this.frustum,
					aspect,
				};
			}

			this.projectionMatarix = mat4.perspective(
				this.frustum.fovy,
				this.frustum.aspect,
				this.frustum.near,
				this.frustum.far,
			);
			this._frustum.markClean();
		}

		return this.projectionMatarix;
	}
}
