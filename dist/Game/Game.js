import { Color, Register } from '../Utils';
import Renderer from './Renderer';
export default class Game {
    constructor(canvasId) {
        this.running = false;
        this.initialized = false;
        this.frame = (now) => {
            if (!this.running) {
                this.then = undefined;
                return;
            }
            const deltaTime = now - this.then;
            {
                const skipFrame = !this.then;
                this.then = now;
                if (skipFrame) {
                    requestAnimationFrame(this.frame);
                    return;
                }
            }
            this.update(deltaTime);
            this.render();
            requestAnimationFrame(this.frame);
        };
        this.renderer = new Renderer(canvasId);
    }
    initialize(gl) {
        Register.initializeGLItems(gl);
    }
    /**
     * Set the scene for the game. The default update/render functions redirect logic to this scene.
     * The old scene will be returned
     */
    setScene(scene, PixelDimensions, backgroundColor = Color.BLACK) {
        const old = this.scene;
        this.scene = scene;
        this.backgroundColor = backgroundColor;
        this.renderer.setSize(PixelDimensions);
        return old;
    }
    update(deltaTime) {
        if (this.scene)
            this.scene.update(deltaTime);
    }
    render() {
        if (this.scene)
            this.renderer.render(this.scene, this.backgroundColor);
        else
            this.renderer.clearScreen(this.backgroundColor);
    }
    start() {
        if (!this.initialized) {
            this.initialize(this.renderer.gl);
            this.initialized = true;
        }
        if (this.running)
            return;
        this.running = true;
        requestAnimationFrame(this.frame);
    }
    stop() {
        this.running = false;
    }
}
//# sourceMappingURL=Game.js.map