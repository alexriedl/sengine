import Buffer from './Buffer';
export default class DynamicBuffer extends Buffer {
    initialize(gl) {
        super.initialize(gl);
        // TODO: Do not store GL as property of buffer...
        this.gl = gl;
    }
    getValues() { return []; }
    getUsage(gl) { return gl.DYNAMIC_DRAW; }
    setBuffer(values) {
        this.setFullBuffer(this.gl, values);
    }
    /**
     * Update the data in a buffer. Unless the size of the data is changing, this is the prefered
     * method of updating (over "setBuffer")
     */
    updateBuffer(values, offset = 0) {
        const gl = this.gl;
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, new Float32Array(values));
    }
}
//# sourceMappingURL=DynamicBuffer.js.map