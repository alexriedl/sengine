import { Color, Entity, Game, SimpleRectangle, vec2, vec3 } from 'sengine';

export default class SimpleGame extends Game {
	private square: Entity;
	private time = 0;

	public constructor() {
		super('game-canvas');
		this.setScene(new Entity(), new vec2(500, 500));

		this.square = new Entity(new SimpleRectangle(Color.RED), new vec3(50, 50), new vec3(30, 30, 1));
		this.square.setParent(this.scene);
	}

	protected update(deltaTime: number): void {
		this.time += deltaTime / 1000;
		const s = Math.sin(this.time);
		const c = Math.cos(this.time);
		this.square.position = new vec3(250 + s * 50, 250 + c * 50);
		this.backgroundColor = new Color(s * s, c * c, Math.abs(s) * Math.abs(c));
	}
}

new SimpleGame().start();
