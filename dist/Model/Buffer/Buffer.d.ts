export default abstract class Buffer {
    private buffer;
    constructor();
    initialize(gl: WebGLRenderingContext): void;
    protected setFullBuffer(gl: WebGLRenderingContext, values: number[]): void;
    getBuffer(): WebGLBuffer;
    protected getUsage(gl: WebGLRenderingContext): number;
    protected abstract getValues(): number[];
    private static instances;
    protected static create<T extends Buffer>(type: {
        new (): T;
    }): T;
}
