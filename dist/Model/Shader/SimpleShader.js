import Shader from './Shader';
const vertexShaderSource = `
attribute vec4 a_position;
uniform mat4 u_mvp_matrix;

void main() {
	gl_Position = u_mvp_matrix * a_position;
}`;
const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_color;

void main() {
	gl_FragColor = u_color;
}`;
export default class SimpleShader extends Shader {
    initialize(gl) {
        super.initialize(gl);
        this.attributePositionLocation = this.getAttributeLocation(gl, 'a_position');
        this.uniformMVPMatrixLocation = this.getUniformLocation(gl, 'u_mvp_matrix');
        this.uniformColorLocation = this.getUniformLocation(gl, 'u_color');
    }
    getVertexSource() {
        return vertexShaderSource;
    }
    getFragmentSource() {
        return fragmentShaderSource;
    }
    static createShader() {
        return Shader.create(SimpleShader);
    }
}
//# sourceMappingURL=SimpleShader.js.map