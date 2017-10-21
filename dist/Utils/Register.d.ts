export declare function register<T>(type: {
    new (): T;
}, item: T): void;
export declare function unregisterAll<T>(type: {
    new (): T;
}, action?: (item: T) => void): void;
export declare class GLRegister {
    initialize(gl: WebGLRenderingContext): void;
}
export declare function registerGLItem(item: GLRegister): void;
export declare function initializeGLItems(gl: WebGLRenderingContext): void;
