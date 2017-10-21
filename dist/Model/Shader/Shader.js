import { Register } from '../../Utils';
export function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success)
        return shader;
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
class Shader {
    /**
     * Not intended to be a public constructor, but needs to be because of the generic/inheritance version
     * of the singleton being used... DO NOT CALL THIS DIRECTLY!
     * Use <My Shader>.create(); instead
     */
    constructor() {
        Register.registerGLItem(this);
    }
    use(gl) {
        gl.useProgram(this.program);
    }
    initialize(gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, this.getVertexSource());
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, this.getFragmentSource());
        if (!vertexShader || !fragmentShader) {
            console.log('Failed to compile one of the shaders...');
            return;
        }
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        const success = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!success) {
            console.log(gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
            this.program = undefined;
        }
    }
    getAttributeLocation(gl, name) {
        return gl.getAttribLocation(this.program, name);
    }
    getUniformLocation(gl, name) {
        return gl.getUniformLocation(this.program, name);
    }
    static create(type) {
        if (Shader.instances[type.name])
            return Shader.instances[type.name];
        Shader.instances[type.name] = new type();
        return Shader.instances[type.name];
    }
}
Shader.instances = {};
export default Shader;
//# sourceMappingURL=Shader.js.map