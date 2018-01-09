import { Canvas, Color } from '../index';

let running: boolean = false;
let then: number;
let gl: WebGLRenderingContext;

// tslint:disable-next-line:no-bitwise
export let CLEAR_MASK = WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT;
let gameUpdate: (deltaTime: number) => void;
let gamePushToScreen: (gl: WebGLRenderingContext) => void;

export function setUpdateFunction(update: (deltaTime: number) => void) {
	gameUpdate = update;
}

export function setPushToScreenFunction(pushToScreen: (gl: WebGLRenderingContext) => void) {
	gamePushToScreen = pushToScreen;
}

function setupScreen(context: WebGLRenderingContext | string) {
	if (context instanceof WebGLRenderingContext) {
		gl = context;
	}
	else {
		gl = Canvas.createFromElementId(context);
	}

	// NOTE: Basic GL setup
	// TODO: Make more configurable (webgl setup/feature enables)
	gl.enable(WebGLRenderingContext.DEPTH_TEST);
	gl.depthFunc(WebGLRenderingContext.LEQUAL);

	gl.enable(WebGLRenderingContext.BLEND);
	gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);

	gl.enable(WebGLRenderingContext.CULL_FACE);
	gl.cullFace(WebGLRenderingContext.FRONT);
}

export function pause(): void {
	running = false;
}

export function start(): void {
	if (running) return;
	running = true;
	requestAnimationFrame(frame);
}

export function setClearColor(color: Color): void {
	gl.clearColor(color.r, color.g, color.b, 1.0);
}

export function setViewport(): void {
	const width = gl.drawingBufferWidth;
	const height = gl.drawingBufferHeight;
	gl.viewport(0, 0, width, height);
}

function frame(now: number): void {
	if (!running) {
		then = undefined;
		return;
	}

	let deltaTime = now - then;
	if (!then) deltaTime = 0;
	then = now;

	const frameStart = performance.now();
	if (gameUpdate) gameUpdate(deltaTime);
	const renderStart = performance.now() ;
	gl.clear(CLEAR_MASK);
	if (gamePushToScreen) gamePushToScreen(gl);
	const frameEnd = performance.now();

	const updateTime = renderStart - frameStart;
	const renderTime = frameEnd - renderStart;
	const frameTime = frameEnd - frameStart;

	console.log(`UpdateTime: ${updateTime}`, `RenderTime: ${renderTime}`, `FrameTime: ${frameTime}`);

	requestAnimationFrame(frame);
}

setupScreen('game-canvas');
setClearColor(Color.BLACK);
setViewport();
start();
