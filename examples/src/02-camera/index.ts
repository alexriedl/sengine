// tslint:disable-next-line:no-implicit-dependencies
import { Buffer, Camera2D, Color, Entity, Game, Scene, Shader, Texture, vec2 } from 'sengine';

export default class CameraExample extends Game {
	private camera: Camera2D;
	private square: Entity;

	protected left: boolean = false;
	protected right: boolean = false;
	protected up: boolean = false;
	protected down: boolean = false;

	public constructor() {
		super('game-canvas');
		this.camera = new Camera2D(new vec2(10, 10));
		this.setScene(new Scene(this.camera));

		const shader = new Shader.TextureShader(
			Buffer.createSquare(10),
			Buffer.createRectangleUV(),
			new Texture(),
		);
		new Entity().setShader(shader).setParent(this.scene);

		this.square = new Entity()
			.setShader(new Shader.SimpleShader(Buffer.createSquare(1), Color.GREEN))
			.setParent(this.scene);
	}

	public onkeydown = (event: KeyboardEvent): boolean => {
		const stringCode = String.fromCharCode(event.keyCode);
		switch (stringCode) {
			case 'A': case '%': this.left = true; return false;
			case 'D': case "'": this.right = true; return false;
			case 'S': case '(': this.down = true; return false;
			case 'W': case '&': this.up = true; return false;
		}
	}

	public onkeyup = (event: KeyboardEvent) => {
		const stringCode = String.fromCharCode(event.keyCode);
		switch (stringCode) {
			case 'A': case '%': this.left = false; return false;
			case 'D': case "'": this.right = false; return false;
			case 'S': case '(': this.down = false; return false;
			case 'W': case '&': this.up = false; return false;
		}
	}

	protected update(deltaTime: number): void {
		const speed = 0.01 * deltaTime;
		const vx = (-this.left * speed) + (+this.right * speed);
		const vy = (-this.up * speed) + (+this.down * speed);
		if (vx || vy) {
			this.square.position = this.square.position.addValues(vx, vy, 0);
			this.camera.position = new vec2(...this.square.position.xy);
		}
	}
}

const game = new CameraExample();
document.onkeydown = game.onkeydown;
document.onkeyup = game.onkeyup;
game.start();
