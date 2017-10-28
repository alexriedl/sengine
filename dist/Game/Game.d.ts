import { Color } from '../Utils';
import { Entity } from '../Entity';
import { vec2 } from '../Math';
import Renderer from './Renderer';
export default abstract class Game {
    protected readonly renderer: Renderer;
    protected scene: Entity;
    protected backgroundColor: Color;
    private then;
    private running;
    private initialized;
    constructor(canvasId: string);
    protected initialize(gl: WebGLRenderingContext): void;
    /**
     * Set the scene for the game. The default update/render functions redirect logic to this scene.
     * The old scene will be returned
     */
    setScene(scene: Entity, PixelDimensions: vec2, backgroundColor?: Color): Entity;
    protected update(deltaTime: number): void;
    protected render(): void;
    start(): void;
    stop(): void;
    protected frame: (now: number) => void;
}
