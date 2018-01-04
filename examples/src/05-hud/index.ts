// tslint:disable-next-line:no-implicit-dependencies max-line-length
import { Buffer, Camera2D, Camera3D, Color, Entity, Game, mat4, Performance, scalar, Scene, Shader, vec2, vec3 } from 'sengine';

// tslint:disable-next-line:max-classes-per-file
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
class StatBar extends Entity {
	protected shader: Shader.SimpleShader;

	public constructor(position: number) {
		super(new vec3(position, 0, 0));
		this.setShader(new Shader.SimpleShader(Buffer.createRectangleUV(0, 0, 1, 1), Color.TRANSPARENT));
	}

	public setColor(color: Color): this {
		this.shader.setColor(color);
		return this;
	}

	public setScale(scale: vec3): this {
		this.scale = scale;
		return this;
	}
}

// tslint:disable-next-line:max-classes-per-file
class Hud extends Scene {
	private readonly FRAME_WIDTH: number;
	private frameBackground: Entity;
	private frames: StatBar[];

	private readonly BACKGROUND_WIDTH: number;

	public constructor() {
		const hudWidth = 500;
		const hudHeight = 500;
		const camera = new Camera2D(new vec2(hudWidth, hudHeight), new vec2(hudWidth / 2, hudHeight / 2));
		super(camera);

		this.BACKGROUND_WIDTH = 100;
		const backgroundHeight = 50;
		const bgColor = Color.BLACK.lighten(0.5);
		this.frameBackground = new Entity()
			.setShader(new Shader.SimpleShader(Buffer.createRectangleUV(0, 0, this.BACKGROUND_WIDTH, backgroundHeight), bgColor))
			.setParent(this);

		this.frames = [];
	}

	public update(deltaTime: number): this {
		const allStats = Performance.allFrameStats();
		if (allStats) {
			const min = 0;
			const max = 0.1;

			const currentIndex = Performance.getFrameStatsIndex();
			const currentStats = allStats[currentIndex]['2::Scene::update'];
			const percent = currentStats.ave / (max - min);

			let entity = this.frames[currentIndex];
			if (!entity) {
				const position = currentIndex * this.BACKGROUND_WIDTH / Performance.FRAME_STATS_BUFFER_SIZE;
				this.frames[currentIndex] = new StatBar(position).setParent(this.frameBackground);
				entity = this.frames[currentIndex];
			}
			entity.setColor(Color.YELLOW).setScale(entity.scale.setY(percent * 90));

			const lastIndex = scalar.mod(currentIndex - 1, Performance.FRAME_STATS_BUFFER_SIZE);
			const lastEntity = this.frames[lastIndex];
			if (lastEntity) {
				lastEntity.setColor(Color.WHITE);
			}
		}

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
