import { Buffer, Camera3D, Color, Entity, Game, mat4, Scene, Shader, vec3 } from 'sengine';

export default class CubeExample extends Game {
	private cube: SimpleObject;
	private time: number = 0;

	public constructor() {
		super('game-canvas');

		this.setScene(new Scene(new Camera3D({
			position: new vec3(2, 1, -2).normalize().scale(3),
		})));
		this.cube = new SimpleObject().setParent(this.scene);
	}

	protected update(deltaTime: number): void {
		this.time += deltaTime;
		this.cube.rotation = this.time / 1000;

		super.update(deltaTime);
	}
}

// tslint:disable-next-line:max-classes-per-file
class SimpleObject extends Entity {
	public rotation: number = 0;

	public constructor() {
		super();
		this.setShader(new Shader.SimplerShader(Buffer.createCube(), Color.GREEN));
	}

	public render(gl: WebGLRenderingContext, vpMatrix: mat4): this {
		const modelMatrix = mat4.fromTranslation(this.position).scale(this.scale).rotateY(this.rotation);
		const mvpMatrix = modelMatrix.mul(vpMatrix);

		if (this.shader) {
			this.shader.draw(gl, mvpMatrix);
		}

		return this;
	}
}

new CubeExample().start();
