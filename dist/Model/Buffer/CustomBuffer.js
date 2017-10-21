import Buffer from './Buffer';
export default class CustomBuffer extends Buffer {
    constructor(values) {
        super();
        this.values = values;
    }
    getValues() {
        const v = this.values;
        this.values = undefined;
        return v;
    }
}
//# sourceMappingURL=CustomBuffer.js.map