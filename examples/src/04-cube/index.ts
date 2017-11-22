import { Buffer, Camera3D, Color, Entity, Game, mat4, Scene, Shader, vec3 } from 'sengine';

class Cube extends Entity {
	public rotation: number = 0;

	public constructor() {
		super();
		this.setShader(new Shader.SimplerShader(Buffer.createCube(), Color.GREEN));
	}

	public update(deltaTime: number): this {
		this.rotation += deltaTime / 1000;
		return this;
	}

	public render(gl: WebGLRenderingContext, vpMatrix: mat4): this {
		// TODO: Build rotation into Entity
		const modelMatrix = mat4.fromTranslation(this.position).scale(this.scale).rotateY(this.rotation);
		const mvpMatrix = modelMatrix.mul(vpMatrix);

		if (this.shader) {
			this.shader.draw(gl, mvpMatrix);
		}

		return this;
	}
}

const game = new Game('game-canvas');
const cameraPosition = new vec3(1, 1, 2).normalize().scale(3);
game.setScene(new Scene(new Camera3D({ position: cameraPosition })));
new Cube().setParent(game.scene);
game.start();
