import { Buffer, Camera2D, Color, Entity, Game, Scene, Shader, vec2, vec3 } from 'sengine';

export default class SimpleExample extends Game {
	private camera: Camera2D;
	private square: SimpleObject;
	private time = Math.floor(Math.random() * 2500);

	public constructor() {
		super('game-canvas');
		this.camera = new Camera2D(new vec2(500, 500));
		this.setScene(new Scene(this.camera));
		this.square = new SimpleObject(30).setParent(this.scene);
	}

	protected update(deltaTime: number): void {
		this.time += deltaTime / 2000;

		const s = Math.sin(this.time * 2);
		const c = Math.cos(this.time) - 0.5;
		const b = new Color(s * s, c * c, 1 - (s * s));

		this.camera.setBackgroundColor(b);

		this.square.position = new vec3(s * 50, c * 50);
		this.square.setColor(new Color(1 - b.r, 1 - b.g, 1 - b.b));
	}
}

// tslint:disable-next-line:max-classes-per-file
class SimpleObject extends Entity {
	protected shader: Shader.SimplerShader;

	public constructor(size: number) {
		super();
		this.setShader(new Shader.SimplerShader(Buffer.createSquare(size)));
	}

	public setColor(color: Color): void {
		this.shader.setColor(color);
	}
}

new SimpleExample().start();
