import './pacman.png';
import { Buffer, Entity, Shader, Texture, vec2, vec3 } from 'sengine';

const TOTAL_FRAME_TIME = (100 / 6) * 3;
const LEFT: number[] = [0, 1, 2, 1];
const RIGHT: number[] = [0, 3, 4, 3];
const UP: number[] = [0, 5, 6, 5];
const DOWN: number[] = [0, 7, 8, 7];

export enum Direction { LEFT = 'L', RIGHT = 'R', UP = 'U', DOWN = 'D' }

export default class Pacman extends Entity {
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
		this.setDirection(Direction.LEFT);
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
