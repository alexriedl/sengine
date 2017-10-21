import { Register } from '../../Utils';
export default class Buffer {
    constructor() {
        Register.registerGLItem(this);
    }
    initialize(gl) {
        this.buffer = gl.createBuffer();
        this.setFullBuffer(gl, this.getValues());
    }
    setFullBuffer(gl, values) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), this.getUsage(gl));
    }
    getBuffer() { return this.buffer; }
    getUsage(gl) { return gl.STATIC_DRAW; }
    static create(type) {
        if (Buffer.instances[type.name])
            return Buffer.instances[type.name];
        Buffer.instances[type.name] = new type();
        return Buffer.instances[type.name];
    }
}
Buffer.instances = {};
//# sourceMappingURL=Buffer.js.map