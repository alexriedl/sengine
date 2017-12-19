import { methodTracker } from '../Utils/Performance';
import BaseEntity from './BaseEntity';
import Camera from './Camera';

export default class Scene extends BaseEntity {
	private readonly cameras: Camera[];

	public constructor(camera: Camera | Camera[]) {
		super();
		if (Array.isArray(camera)) {
			this.cameras = camera;
		}
		else {
			this.cameras = [camera];
		}
	}

	@methodTracker()
	public clearScreen(gl: WebGLRenderingContext): this {
		for (const camera of this.cameras) {
			camera.clearScreen(gl);
		}
		return this;
	}

	@methodTracker()
	public render(gl: WebGLRenderingContext): this {
		for (const camera of this.cameras) {
			camera
				.setRenderTarget(gl)
				.setViewport(gl);
			const viewMatrix = camera.getViewMatrix(gl);
			const projectionmatrix = camera.getProjectionMatrix(gl);
			super.render(gl, viewMatrix, projectionmatrix);
		}

		return this;
	}

	@methodTracker()
	public update(deltaTime: number): this {
		return super.update(deltaTime);
	}
}
