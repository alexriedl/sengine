import Shader from './Shader';
import SimpleTextureShader from './SimpleTextureShader';
const vertexShaderSource = `
attribute vec4 a_position;
attribute vec2 a_texcoord;
uniform mat4 u_mvp_matrix;

varying vec2 v_texcoord;

void main() {
	gl_Position = u_mvp_matrix * a_position;
	v_texcoord = a_texcoord;
}`;
export default class TextureShader extends SimpleTextureShader {
    initialize(gl) {
        super.initialize(gl);
        this.attributeTexCoordLocation = this.getAttributeLocation(gl, 'a_texcoord');
    }
    getVertexSource() {
        return vertexShaderSource;
    }
    static createShader() {
        return Shader.create(TextureShader);
    }
}
//# sourceMappingURL=TextureShader.js.map