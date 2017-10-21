import { Register } from '../Utils';
class Model {
    constructor() {
        this.shader = this.createShader();
        this.buffer = this.createVertexBuffer();
        Register.registerGLItem(this);
    }
    useShader(gl) {
        this.shader.use(gl);
    }
    render(gl, mvpMatrix) {
        this.updateAttributes(gl);
        this.updateUniforms(gl, mvpMatrix);
        this.draw(gl);
    }
    initialize(gl) {
        return;
    }
}
export default Model;
//# sourceMappingURL=Model.js.map