// tslint:disable-next-line:no-implicit-dependencies
import { Color, Shader } from 'sengine';

import * as sengine from '../../../src/remake';

let gameInitialized: boolean = false;
let time: number = Math.random() * 1000;

function initializeGame(): void {
	gameInitialized = true;
}

function update(deltaTime: number): void {
	if (!gameInitialized) initializeGame();
	time += deltaTime / 2000;

	const s = Math.sin(time * 3);
	const c = Math.cos(time);
	const b = new Color(s * s, c * c, 1 - (s * s));
	sengine.setClearColor(b);
}

function pushToScreen(gl: WebGLRenderingContext): void {
	//
}

sengine.setUpdateFunction(update);
sengine.setPushToScreenFunction(pushToScreen);
