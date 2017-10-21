import { Color } from '../Utils';
import { SimpleTextureShader } from '../Model/Shader';
import SimpleRectangle from './SimpleRectangle';
export default class SimpleTextureRectangle extends SimpleRectangle {
    constructor(texture) {
        super(new Color(1, 1, 1));
        this.texture = texture;
    }
    createShader() {
        return SimpleTextureShader.createShader();
    }
    updateAttributes(gl) {
        super.updateAttributes(gl);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
}
//# sourceMappingURL=SimpleTextureRectangle.js.map