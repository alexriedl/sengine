// tslint:disable-next-line:no-implicit-dependencies
import { Buffer, Camera3D, Color, Entity, Game, mat4, Scene, Shader, vec3 } from 'sengine';

class Cube extends Entity {
	public rotation: number = 0;

	public constructor() {
		super();
		this.setShader(new Shader.AmbientLightShader(
			Buffer.createCube(),
			Color.GREEN,
			{ ambientIntensity: 0.2, color: Color.WHITE, direction: new vec3(2.5, -3, 1).normalize() },
		));
	}

	public update(deltaTime: number): this {
		this.rotation += deltaTime / 1000;
		return this;
	}

	public render(gl: WebGLRenderingContext, viewMatrix: mat4, projectionMatrix: mat4): this {
		// TODO: Build rotation into Entity
		const modelMatrix = mat4.fromTranslation(this.position).scale(this.scale).rotateY(this.rotation);
		const modelViewMatrix = modelMatrix.mul(viewMatrix);
		const mvpMatrix = modelViewMatrix.mul(projectionMatrix);

		if (this.shader) {
			this.shader.draw(gl, modelMatrix, mvpMatrix);
		}

		return this;
	}
}

const game = new Game('game-canvas');
const cameraPosition = new vec3(0, 1, -2).normalize().scale(3);
const camera = new Camera3D({ position: cameraPosition });
const scene = new Scene(camera);
const cube = new Cube().setParent(scene);
game.setScene(scene);
game.start();
