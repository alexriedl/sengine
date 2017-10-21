import { Register } from '../Utils';
import { mat4, vec2 } from '../Math';
export default class Renderer {
    constructor(canvasId) {
        this.pixelDimensions = new vec2(100, 100);
        const canvas = document.getElementById(canvasId);
        const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
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
    setSize(pixelDimensions) {
        this.pixelDimensions = pixelDimensions;
    }
    clearScreen(background) {
        const gl = this.gl;
        gl.clearColor(background.r, background.g, background.b, 1.0);
        // tslint:disable-next-line:no-bitwise
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    render(scene, background) {
        const gl = this.gl;
        Register.initializeGLItems(gl);
        const width = gl.canvas.clientWidth;
        const height = gl.canvas.clientHeight;
        gl.viewport(0, 0, width, height);
        this.clearScreen(background);
        const orthoMatrix = mat4.ortho(0, this.pixelDimensions.x, this.pixelDimensions.y, 0, -1, 1);
        scene.render(gl, orthoMatrix);
    }
}
//# sourceMappingURL=Renderer.js.map