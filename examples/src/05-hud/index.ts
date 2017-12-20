// tslint:disable-next-line:no-implicit-dependencies
import { Buffer, Camera2D, Camera3D, Color, Entity, Game, mat4, Performance, Scene, Shader, vec2, vec3 } from 'sengine';

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

// tslint:disable-next-line:max-classes-per-file
class Hud extends Scene {
	private frame: Entity;
	private readonly MAX_HEIGHT: number;
	private readonly MIN_HEIGHT: number;

	public constructor() {
		const camera = new Camera2D(new vec2(1000, 1000));
		super(camera);

		const width = 200;
		const height = 100;
		const bgColor = Color.BLACK.lighten(0.5);
		const background = new Entity(new vec3(500 - width / 2, -500 + height / 2, 0))
			.setShader(new Shader.SimpleShader(Buffer.createRectangle(width, height), bgColor))
			.setParent(this);

		this.MAX_HEIGHT = height / 2;
		this.MIN_HEIGHT = this.MAX_HEIGHT / 20;
		this.frame = new Entity(new vec3(0, this.MAX_HEIGHT, 0)).setParent(background);
		this.frame.setShader(new Shader.SimpleShader(Buffer.createRectangleUV(-0.5, -height, +0.5, 0), Color.WHITE));
	}

	public update(deltaTime: number): this {
		let min = Number.MAX_SAFE_INTEGER;
		let max = Number.MIN_SAFE_INTEGER;
		const allStats = Performance.allFrameStats();
		for (const frameStats of allStats) {
			const stats = frameStats['2::Scene::update'];
			if (stats.ave > max) max = stats.ave;
			if (stats.ave < min) min = stats.ave;
		}

		const currentIndex = Performance.getFrameStatsIndex();
		const currentStats = allStats[currentIndex]['2::Scene::update'];
		const percent = currentStats.ave / (max - min) ;
		this.frame.scale = new vec3(this.frame.scale.x, percent, this.frame.scale.z);

		return super.update(deltaTime);
	}
}

function setupScene(): Scene {
	const cameraPosition = new vec3(0, 1, -2).normalize().scale(3);
	const camera = new Camera3D({ position: cameraPosition });
	const scene = new Scene(camera);
	const cube = new Cube().setParent(scene);

	return scene;
}

const game = new Game('game-canvas');
game.setScene(setupScene(), 0);
game.setScene(new Hud(), 1);
game.start();
