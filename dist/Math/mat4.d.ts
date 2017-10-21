import vec3 from './vec3';
/**
 * Logic from: https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js
 */
export default class mat4 {
    private elements;
    readonly m00: number;
    readonly m01: number;
    readonly m02: number;
    readonly m03: number;
    readonly m10: number;
    readonly m11: number;
    readonly m12: number;
    readonly m13: number;
    readonly m20: number;
    readonly m21: number;
    readonly m22: number;
    readonly m23: number;
    readonly m30: number;
    readonly m31: number;
    readonly m32: number;
    readonly m33: number;
    mul: (o: mat4) => mat4;
    constructor(elements?: number[]);
    copy(): mat4;
    static identity(): mat4;
    transpose(): mat4;
    translate(v: vec3): mat4;
    scale(v: vec3): mat4;
    multiply(o: mat4): mat4;
    getTranslation(): vec3;
    str(): string;
    toFloat32Array(): Float32Array;
    toFloat64Array(): Float64Array;
    /**
     * Creates a matrix from a vector translation.
     * This is equivalent to (but much faster than):
     *
     *    const m = mat4.identity();
     *    m.translate(vec);
     */
    static fromTranslation(v: vec3): mat4;
    /**
     * Creates a matrix from a vector scale.
     * This is equivalent to (but much faster than):
     *
     *    const m = mat4.identity();
     *    m.scale(vec);
     */
    static fromScale(v: vec3): mat4;
    /**
     * Generates a frustum matrix with the given bounds
     */
    static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
    /**
     * Generates a perspective projection matrix with the given bounds
     */
    static perspective(fovy: any, aspect: any, near: any, far: any): mat4;
    /**
     * Generates an orthogonal projection matrix with the given bounds
     */
    static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
}
