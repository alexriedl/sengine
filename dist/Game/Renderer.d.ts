import { Color } from '../Utils';
import { Entity } from '../Entity';
import { vec2 } from '../Math';
export default class Renderer {
    gl: WebGLRenderingContext;
    private pixelDimensions;
    constructor(canvasId: string);
    setSize(pixelDimensions: vec2): void;
    clearScreen(background: Color): void;
    render(scene: Entity, background: Color): void;
}
