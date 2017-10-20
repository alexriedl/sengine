import { Color, Register } from '../Utils';
import { Entity } from '../Entity';
import { mat4 } from '../Math';

export default class Renderer {
	public gl: WebGLRenderingContext;
	private xSize: number;
	private ySize: number;

	public constructor(canvasId: string, xSize: number, ySize: number) {
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

		this.xSize = xSize;
		this.ySize = ySize;
	}

	protected static clearScreen(gl: WebGLRenderingContext): void {
		// tslint:disable-next-line:no-bitwise
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	public render(scene: Entity, background: Color = Color.BLACK.lighten(0.3)): void {
		const gl: WebGLRenderingContext = this.gl;

		Register.initializeGLItems(gl);

		const width = gl.canvas.clientWidth;
		const height = gl.canvas.clientHeight;

		gl.viewport(0, 0, width, height);
		gl.clearColor(background.r, background.g, background.b, 1.0);
		Renderer.clearScreen(gl);
		const orthoMatrix = mat4.ortho(0, this.xSize, this.ySize, 0, -1, 1);

		scene.render(gl, orthoMatrix);
	}
}
