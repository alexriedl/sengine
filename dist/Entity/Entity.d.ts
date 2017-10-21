import { Model } from '../Model';
import { vec3, mat4 } from '../Math';
export default class Entity {
    protected model: Model;
    protected parent?: Entity;
    protected readonly children?: Entity[];
    position: vec3;
    scale: vec3;
    constructor(model?: Model, position?: vec3, scale?: vec3);
    getRenderingPosition(): vec3;
    getRenderingScale(): vec3;
    setParent(parent: Entity): void;
    render(gl: WebGLRenderingContext, vpMatrix: mat4, overridePosition?: vec3, overrideScale?: vec3): void;
    update(deltaTime: number): boolean;
}
