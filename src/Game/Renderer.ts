import { Color, Register } from '../Utils';
import { Entity } from '../Entity';
import { mat4, vec2 } from '../Math';

export default class Renderer {
	public gl: WebGLRenderingContext;
	private pixelDimensions: vec2 = new vec2(100, 100);

	public constructor(canvasId: string) {
		const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
		if (!gl) {
			alert('Unable to initialize WebGL. Your browser may not support it.');
			return;
		}

		this.gl = gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);

		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	}

	public setSize(pixelDimensions: vec2): void {
		this.pixelDimensions = pixelDimensions;
	}

	public clearScreen(background: Color): void {
		const gl: WebGLRenderingContext = this.gl;
		gl.clearColor(background.r, background.g, background.b, 1.0);
		// tslint:disable-next-line:no-bitwise
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	public render(scene: Entity, background: Color): void {
		const gl: WebGLRenderingContext = this.gl;

		Register.initializeGLItems(gl);

		const width = gl.canvas.clientWidth;
		const height = gl.canvas.clientHeight;

		gl.viewport(0, 0, width, height);
		this.clearScreen(background);
		const orthoMatrix = mat4.ortho(0, this.pixelDimensions.x, this.pixelDimensions.y, 0, -1, 1);

		scene.render(gl, orthoMatrix);
	}
}
