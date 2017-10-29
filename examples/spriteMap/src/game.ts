import './pacman.png';
import { Buffer, Color, Entity, Game, Scene, Shader, Texture, vec2, vec3 } from 'sengine';

const TOTAL_FRAME_TIME = (100 / 6) * 3;
const LEFT: number[] = [0, 1, 2, 1];
const RIGHT: number[] = [0, 3, 4, 3];
const UP: number[] = [0, 5, 6, 5];
const DOWN: number[] = [0, 7, 8, 7];

export default class SpriteMapExample extends Game {
	private pacman: Pacman;

	protected left: boolean;
	protected right: boolean;
	protected up: boolean;
	protected down: boolean;

	public constructor() {
		super('game-canvas');
		this.setScene(new Scene(new vec2(500, 500)));
		this.pacman = new Pacman().setParent(this.scene);
	}

	public onkeydown(event: KeyboardEvent): boolean {
		const stringCode = String.fromCharCode(event.keyCode);
		switch (stringCode) {
			case 'A': case '%': this.left = true; return false;
			case 'D': case "'": this.right = true; return false;
			case 'S': case '(': this.down = true; return false;
			case 'W': case '&': this.up = true; return false;
		}
	}

	public onkeyup(event: KeyboardEvent) {
		const stringCode = String.fromCharCode(event.keyCode);
		switch (stringCode) {
			case 'A': case '%': this.left = false; return false;
			case 'D': case "'": this.right = false; return false;
			case 'S': case '(': this.down = false; return false;
			case 'W': case '&': this.up = false; return false;
		}
	}

	protected update(deltaTime: number): void {
		let d: Direction;
		if (this.left) d = Direction.LEFT;
		if (this.right) d = Direction.RIGHT;
		if (this.up) d = Direction.UP;
		if (this.down) d = Direction.DOWN;
		if (d) this.pacman.setDirection(d);

		super.update(deltaTime);
	}
}

// tslint:disable-next-line:max-classes-per-file
class Pacman extends Entity {
	private texCoords: Buffer;
	private spriteFrame: number = 0;
	private frameTime: number = TOTAL_FRAME_TIME;
	private direction: number[] = LEFT;
	private movementDirection: vec3 = new vec3();
	private readonly speed: number = 3;

	public constructor() {
		super(new vec3(250, 250, 0));
		this.texCoords = Buffer.createGridUV(new vec2(16, 16), new vec2(16 * 3, 16 * 3), 9);
		const texture = new Texture('images/pacman.png');
		const verts = Buffer.createSquare(50);
		const shader = new Shader.TextureShader(verts, this.texCoords, texture);
		this.setShader(shader);
	}

	public setDirection(direction: Direction) {
		switch (direction) {
			case Direction.LEFT: this.direction = LEFT; this.movementDirection = new vec3(-1, 0); break;
			case Direction.RIGHT: this.direction = RIGHT; this.movementDirection = new vec3(+1, 0); break;
			case Direction.UP: this.direction = UP; this.movementDirection = new vec3(0, -1); break;
			case Direction.DOWN: this.direction = DOWN; this.movementDirection = new vec3(0, +1); break;
		}
	}

	public update(deltaTime: number): void {
		this.frameTime -= deltaTime;
		if (this.frameTime <= 0) {
			this.frameTime += TOTAL_FRAME_TIME;
			this.spriteFrame = (this.spriteFrame + 1) % 3;
		}

		const frameIndex = this.direction[this.spriteFrame];
		this.texCoords.options.offset = frameIndex * 8 * 4;

		const p = this.position;
		let x = p.x + this.movementDirection.x * this.speed;
		let y = p.y + this.movementDirection.y * this.speed;
		if (x > 500) x = 0;
		else if (x < 0) x = 500;
		if (y > 500) y = 0;
		else if (y < 0) y = 500;
		this.position = new vec3(x, y);
	}
}

enum Direction { LEFT = 'L', RIGHT = 'R', UP = 'U', DOWN = 'D' }

const game = new SpriteMapExample();
document.onkeydown = (event: KeyboardEvent) => game.onkeydown(event);
document.onkeyup = (event: KeyboardEvent) => game.onkeyup(event);
game.start();
