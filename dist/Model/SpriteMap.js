import { CustomBuffer } from '../Model/Buffer';
import { Color } from '../Utils';
import { TextureShader } from '../Model/Shader';
import SimpleRectangle from './SimpleRectangle';
function buildBuffer(mapInfo) {
    const buffer = [];
    let count = 0;
    for (let y = mapInfo.topPadding; y < mapInfo.textureHeight && count < mapInfo.totalSprites; y += mapInfo.spritHeight) {
        for (let x = mapInfo.leftPadding; x < mapInfo.textureWidth && count < mapInfo.totalSprites; x += mapInfo.spritWidth) {
            count++;
            const left = x / mapInfo.textureWidth;
            const right = (x + mapInfo.spritWidth) / mapInfo.textureWidth;
            const top = y / mapInfo.textureHeight;
            const bottom = (y + mapInfo.spritHeight) / mapInfo.textureHeight;
            buffer.push(left, top, right, top, right, bottom, left, bottom);
        }
    }
    return buffer;
}
function createAsyncTexture(gl, source) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    const image = new Image();
    image.src = source;
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    return texture;
}
class SpriteMap extends SimpleRectangle {
    constructor() {
        super(new Color(1, 1, 1));
        this.frame = 0;
    }
    initialize(gl) {
        const mapInfo = this.getMapInfo();
        if (!mapInfo.leftPadding)
            mapInfo.leftPadding = 0;
        if (!mapInfo.topPadding)
            mapInfo.topPadding = 0;
        this.textureBuffer = new CustomBuffer(buildBuffer(mapInfo));
        this.texture = createAsyncTexture(gl, mapInfo.source);
        this.totalFrames = mapInfo.totalSprites;
    }
    setFrame(frame) {
        const oldFrame = this.frame;
        this.frame = frame % this.totalFrames;
        return oldFrame;
    }
    createShader() {
        return TextureShader.createShader();
    }
    updateAttributes(gl) {
        super.updateAttributes(gl);
        const shader = this.shader;
        const textureBuffer = this.textureBuffer.getBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shader.attributeTexCoordLocation, 2, gl.FLOAT, false, 0, this.frame * 8 * 4);
        gl.enableVertexAttribArray(shader.attributeTexCoordLocation);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
}
export default SpriteMap;
//# sourceMappingURL=SpriteMap.js.map