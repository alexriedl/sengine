import '../../rsc/pacman.png';

// tslint:disable-next-line:no-implicit-dependencies
import { Buffer, Entity, Shader, vec2, vec3 } from 'sengine';

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
	private readonly speed: number = 0.07;

	private halfBoardWidth: number;
	private halfBoardHeight: number;

	public constructor(boardWidth: number, boardHeight: number) {
		super();
		this.texCoords = Buffer.createGridUV(new vec2(16, 16), new vec2(16 * 3, 16 * 3), 9);
		const verts = Buffer.createSquare(1);
		const shader = new Shader.TextureShader(verts, this.texCoords, 'images/pacman.png');
		this.setShader(shader);
		this.setDirection(Direction.LEFT);
		this.halfBoardWidth = boardWidth / 2;
		this.halfBoardHeight = boardHeight / 2;
	}

	public setDirection(direction: Direction): this {
		switch (direction) {
			case Direction.LEFT: this.direction = LEFT; this.movementDirection = new vec3(-1, 0); break;
			case Direction.RIGHT: this.direction = RIGHT; this.movementDirection = new vec3(+1, 0); break;
			case Direction.UP: this.direction = UP; this.movementDirection = new vec3(0, -1); break;
			case Direction.DOWN: this.direction = DOWN; this.movementDirection = new vec3(0, +1); break;
		}

		return this;
	}

	public update(deltaTime: number): this {
		// NOTE: Only update the frame on exact fps
		this.frameTime -= deltaTime;
		if (this.frameTime <= 0) {
			this.frameTime += TOTAL_FRAME_TIME;
			this.spriteFrame = (this.spriteFrame + 1) % 3;
		}

		// NOTE: Use the current frame during rendering
		const frameIndex = this.direction[this.spriteFrame];
		this.texCoords.options.offset = frameIndex * 8 * 4;

		const p = this.position;
		let x = p.x + this.movementDirection.x * this.speed;
		let y = p.y + this.movementDirection.y * this.speed;

		// NOTE: Bind pacman in the world
		{
			if (x > this.halfBoardWidth) x = -this.halfBoardWidth;
			else if (x < -this.halfBoardWidth) x = this.halfBoardWidth;
			if (y > this.halfBoardHeight) y = -this.halfBoardHeight;
			else if (y < -this.halfBoardHeight) y = this.halfBoardHeight;
		}

		this.position = new vec3(x, y);

		return this;
	}
}
