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
			const vpMatrix = camera
				.setRenderTarget(gl)
				.setViewport(gl)
				.clearScreen(gl)
				.getViewProjectionMatrix(gl);
			super.render(gl, vpMatrix);
		}

		return this;
	}
}
