import { mat4, vec3 } from '../Math';
import Camera from './Camera';

export interface IFrustum {
	fovy?: number;
	aspect?: number;
	near?: number;
	far?: number;
}

export interface IView {
	position?: vec3;
	target?: vec3;
	up?: vec3;
}

export default class Camera3D extends Camera {
	public position: vec3;
	public target: vec3;
	public up: vec3;

	public view: IView = {
		position: new vec3(0, 0, -10),
		target: new vec3(0, 0, 0),
		up: new vec3(0, 1, 0),
	};

	public frustum: IFrustum = {
		fovy: 90,
		near: 0.01,
		far: 100,
	};

	public constructor(view: IView = {}, frustum: IFrustum = {}) {
		super();

		this.view = {
			...this.view,
			...view,
		};

		this.frustum = {
			...this.frustum,
			...frustum,
		};
	}

	public getViewProjectionMatrix(gl: WebGLRenderingContext): mat4 {
		let aspect = this.frustum.aspect;
		if (!aspect) {
			aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
		}

		// TODO: Implement a dirty check so these are not calculated every frame
		const projection = mat4.perspective(this.frustum.fovy, aspect, this.frustum.near, this.frustum.far);
		const view = mat4.lookAt(this.view.position, this.view.target, this.view.up);
		return view.mul(projection);
	}
}
