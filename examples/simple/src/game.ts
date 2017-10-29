import { Buffer, Color, Entity, Game, Scene, Shader, vec2, vec3 } from 'sengine';

export default class SimpleGame extends Game {
	private square: Entity;
	private time = 0;

	public constructor() {
		super('game-canvas');
		this.setScene(new Scene(new vec2(500, 500)));

		this.square =
			new Entity(new vec3(50, 50), new vec3(30, 30, 1))
			.setShader(new Shader.SimplerShader(Buffer.createRectangle(), Color.RED))
			.setParent(this.scene);
	}

	protected update(deltaTime: number): void {
		this.time += deltaTime / 2000;
		const s = Math.sin(this.time * 1.3);
		const c = Math.cos(this.time);
		this.square.position = new vec3(250 + s * 50, 250 + c * 50);
		this.scene.backgroundColor = new Color(s * s, c * c, 1 - (s * s));
	}
}

new SimpleGame().start();
