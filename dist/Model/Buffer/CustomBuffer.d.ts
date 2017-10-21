import Buffer from './Buffer';
export default class CustomBuffer extends Buffer {
    private values;
    constructor(values: number[]);
    protected getValues(): number[];
}
