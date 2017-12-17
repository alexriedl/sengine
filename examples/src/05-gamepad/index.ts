// tslint:disable-next-line:no-implicit-dependencies
import { Camera2D, Game, Scene, vec2 } from 'sengine';

import Pacman, { Direction } from './pacman';

const haveEvents = 'ongamepadconnected' in window;
const DEAD_ZONE = 0.5;

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

		this.setScene(new Scene(new Camera2D(new vec2(width, height))));
		this.pacman = new Pacman(width, height).setParent(this.scene);
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

	public addGamepad(gamepad: Gamepad) {
		this.controllers[gamepad.index] = gamepad;
	}
	public removeGamepad(gamepad: Gamepad) {
		delete this.controllers[gamepad.index];
	}

	protected scanGamepads() {
		const n = navigator as any;
		const gamepads = n.getGamepads ? n.getGamepads() : (n.webkitGetGamepads ? n.webkitGetGamepads() : []);
		for (const gamepad of gamepads) {
			if (gamepad) {
				this.addGamepad(gamepad);
			}
		}
	}

	protected update(deltaTime: number): void {
		if (!haveEvents) {
			this.scanGamepads();
		}
		for (const gamepad of this.controllers) {
			if (gamepad && gamepad.connected) {
				this.left = this.buttonPressed(gamepad.buttons[14]);
				this.right = this.buttonPressed(gamepad.buttons[15]);
				this.up = this.buttonPressed(gamepad.buttons[12]);
				this.down = this.buttonPressed(gamepad.buttons[13]);

				this.left = gamepad.axes[0] < -DEAD_ZONE;
				this.right = gamepad.axes[0] > +DEAD_ZONE;

				this.up = gamepad.axes[1] < -DEAD_ZONE;
				this.down = gamepad.axes[1] > +DEAD_ZONE;
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

function handleGamepadEvents(e: GamepadEvent) {
	const gamepad = e.gamepad;
	if (gamepad.connected) game.addGamepad(gamepad);
	else game.removeGamepad(gamepad);
}

window.addEventListener('gamepadconnected', handleGamepadEvents);
window.addEventListener('gamepaddisconnected', handleGamepadEvents);
