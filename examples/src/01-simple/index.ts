// tslint:disable-next-line:no-implicit-dependencies
import { Buffer, Camera2D, Color, Entity, Game, mat4, Scene, Shader, vec2, vec3 } from 'sengine';

class SimpleObject extends Entity {
	private time = Math.floor(Math.random() * 2500);
	protected shader: Shader.SimpleShader;

	public constructor(size: number) {
		super();
		this.setShader(new Shader.SimpleShader(Buffer.createSquare(size)));
	}

	public update(deltaTime: number): this {
		this.time += deltaTime / 2000;

		const s = Math.sin(this.time * 3);
		const c = Math.cos(this.time);
		const b = new Color(s * s, c * c, 1 - (s * s));
		const limit = boardSize * 0.4;

		this.position = new vec3(s * limit, c * limit);
		this.shader.setColor(new Color(1 - b.r, 1 - b.g, 1 - b.b));

		camera.setBackgroundColor(b);

		return this;
	}

	public render(gl: WebGLRenderingContext, viewMatrix: mat4, projectionMatrix: mat4): this {
		// TODO: Build rotation into Entity
		const modelMatrix = mat4.fromTranslation(this.position).scale(this.scale).rotateZ(this.time);
		const modelViewMatrix = modelMatrix.mul(viewMatrix);
		const mvpMatrix = modelViewMatrix.mul(projectionMatrix);

		if (this.shader) {
			this.shader.draw(gl, modelMatrix, mvpMatrix);
		}

		return this;
	}
}

const boardSize = 50;

const game = new Game('game-canvas');
const camera = new Camera2D(new vec2(boardSize, boardSize));
const scene = new Scene(camera);
const square = new SimpleObject(3).setParent(scene);
game.setScene(scene);
game.start();
