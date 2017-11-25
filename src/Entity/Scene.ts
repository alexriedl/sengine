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

	public render(gl: WebGLRenderingContext): this {
		for (const camera of this.cameras) {
			camera
				.setRenderTarget(gl)
				.setViewport(gl)
				.clearScreen(gl);
			const viewMatrix = camera.getViewMatrix(gl);
			const projectionmatrix = camera.getProjectionMatrix(gl);
			super.render(gl, viewMatrix, projectionmatrix);
		}

		return this;
	}
}
