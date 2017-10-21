import { RectangleBuffer } from '../Model/Buffer';
import { SimpleShader } from '../Model/Shader';
import Model from './Model';
class SimpleRectangle extends Model {
    constructor(color) {
        super();
        this.color = color;
    }
    createShader() {
        return SimpleShader.createShader();
    }
    createVertexBuffer() {
        return RectangleBuffer.createBuffer();
    }
    updateAttributes(gl) {
        const shader = this.shader;
        const vertexBuffer = this.buffer.getBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(shader.attributePositionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(shader.attributePositionLocation);
    }
    updateUniforms(gl, mvpMatrix) {
        const shader = this.shader;
        gl.uniformMatrix4fv(shader.uniformMVPMatrixLocation, false, mvpMatrix.toFloat32Array());
        gl.uniform4fv(shader.uniformColorLocation, this.color.toFloat32Array());
    }
    draw(gl) {
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
}
export default SimpleRectangle;
//# sourceMappingURL=SimpleRectangle.js.map