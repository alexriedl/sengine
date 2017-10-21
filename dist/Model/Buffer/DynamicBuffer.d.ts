import Buffer from './Buffer';
export default class DynamicBuffer extends Buffer {
    private gl;
    initialize(gl: WebGLRenderingContext): void;
    getValues(): number[];
    protected getUsage(gl: WebGLRenderingContext): number;
    setBuffer(values: number[]): void;
    /**
     * Update the data in a buffer. Unless the size of the data is changing, this is the prefered
     * method of updating (over "setBuffer")
     */
    updateBuffer(values: number[], offset?: number): void;
}
