export declare function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader;
declare abstract class Shader {
    protected program: WebGLProgram;
    /**
     * Not intended to be a public constructor, but needs to be because of the generic/inheritance version
     * of the singleton being used... DO NOT CALL THIS DIRECTLY!
     * Use <My Shader>.create(); instead
     */
    constructor();
    use(gl: WebGLRenderingContext): void;
    initialize(gl: WebGLRenderingContext): void;
    abstract getVertexSource(): string;
    abstract getFragmentSource(): string;
    protected getAttributeLocation(gl: WebGLRenderingContext, name: string): number;
    protected getUniformLocation(gl: WebGLRenderingContext, name: string): WebGLUniformLocation;
    private static instances;
    protected static create<T extends Shader>(type: {
        new (): T;
    }): T;
}
export default Shader;
