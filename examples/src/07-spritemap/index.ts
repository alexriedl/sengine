import '../../rsc/pacman.png';

// tslint:disable-next-line:no-implicit-dependencies
import { Camera2D, Game, Scene, vec2 } from 'sengine';

import Pacman, { Direction } from './pacman';
import Sprite from './Sprite';

export default class SpriteMapExample extends Game {
	private pacman: Pacman;
	private readonly controllers: Gamepad[] = [];

	protected left: boolean;
	protected right: boolean;
	protected up: boolean;
	protected down: boolean;

	public constructor() {
		super('game-canvas');

		const width = 10;
		const height = 10;

		const scene = new Scene(new Camera2D(new vec2(width, height)));
		this.setScene(scene);

		const spriteSize = new vec2(16, 16);
		const textureSize = new vec2(16 * 3, 16 * 3);
		const sprite = new Sprite('images/pacman.png', spriteSize, textureSize, 9);
		sprite.setParent(scene);

		this.pacman = new Pacman(sprite, width, height).setParent(scene);
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

	protected buttonPressed(button: GamepadButton | number): boolean {
		if (typeof (button) === 'object') return button.pressed;
		return button > 0;
	}

	protected update(deltaTime: number): void {
		for (const gamepad of this.controllers) {
			if (gamepad && gamepad.connected) {
				this.left = this.buttonPressed(gamepad.buttons[14]);
				this.right = this.buttonPressed(gamepad.buttons[15]);
				this.up = this.buttonPressed(gamepad.buttons[12]);
				this.down = this.buttonPressed(gamepad.buttons[13]);
			}
		}

		let d: Direction;
		if (this.left) d = Direction.LEFT;
		if (this.right) d = Direction.RIGHT;
		if (this.up) d = Direction.UP;
		if (this.down) d = Direction.DOWN;
		if (d) this.pacman.setDirection(d);

		super.update(deltaTime);
	}
}

const game = new SpriteMapExample();
document.onkeydown = game.onkeydown;
document.onkeyup = game.onkeyup;
game.start();
