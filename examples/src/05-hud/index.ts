// tslint:disable-next-line:no-implicit-dependencies
import { Buffer, Camera2D, Camera3D, Color, Entity, Game, mat4, Scene, Shader, vec2, vec3 } from 'sengine';

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

function setupScene(): Scene {
	const cameraPosition = new vec3(0, 1, -2).normalize().scale(3);
	const camera = new Camera3D({ position: cameraPosition });
	const scene = new Scene(camera);
	const cube = new Cube().setParent(scene);

	return scene;
}

function setupHud(): Scene {
	const camera = new Camera2D(new vec2(100, 100));
	const scene = new Scene(camera);
	const square = new Entity(new vec3(50, 50, 0))
		.setShader(new Shader.SimpleShader(Buffer.createRectangle(50, 50), Color.GREEN))
		.setParent(scene);

	return scene;
}

const game = new Game('game-canvas');
game.setScene(setupScene(), 0);
game.setScene(setupHud(), 1);
game.start();
