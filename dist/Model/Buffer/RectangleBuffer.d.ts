import Buffer from './Buffer';
export default class RectangleBuffer extends Buffer {
    protected getValues(): number[];
    static createBuffer(): RectangleBuffer;
}
