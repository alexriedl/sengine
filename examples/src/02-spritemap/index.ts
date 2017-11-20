import { Game, Scene, vec2 } from 'sengine';

import Pacman, { Direction } from './pacman';

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

const game = new SpriteMapExample();
document.onkeydown = (event: KeyboardEvent) => game.onkeydown(event);
document.onkeyup = (event: KeyboardEvent) => game.onkeyup(event);
game.start();
