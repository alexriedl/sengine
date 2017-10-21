import Buffer from './Buffer';
export default class RectangleBuffer extends Buffer {
    getValues() {
        return [
            -0.5, -0.5,
            +0.5, -0.5,
            +0.5, +0.5,
            -0.5, +0.5,
        ];
    }
    static createBuffer() {
        return Buffer.create(RectangleBuffer);
    }
}
//# sourceMappingURL=RectangleBuffer.js.map