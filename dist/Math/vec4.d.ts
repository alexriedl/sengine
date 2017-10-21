export default class vec4 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
    readonly xy: number[];
    readonly yz: number[];
    readonly xyz: number[];
    readonly xyzw: number[];
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    readonly rgb: number[];
    readonly rgba: number[];
    len: () => number;
    sub: (other: vec4) => vec4;
    mul: (other: vec4) => vec4;
    div: (other: vec4) => vec4;
    dist: (other: vec4) => number;
    sqrDist: (other: vec4) => number;
    sqrLen: () => number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * Create a new vector with the same values as this vector
     */
    clone(): vec4;
    /**
     * Add another vector to this vector, and return a new vector with the result
     */
    add(other: vec4): vec4;
    /**
     * Add values to this vector, and return a new vector with the result
     */
    addValues(x: number, y: number, z: number, w: number): vec4;
    /**
     * Subtract another vector from this vector, and return a new vector with the result
     */
    subtract(other: vec4): vec4;
    /**
     * Multiply another vector to this vector, and return a new vector with the result
     */
    multiply(other: vec4): vec4;
    /**
     * Divide another vector from this vector, and return a new vector with the result
     */
    divide(other: vec4): vec4;
    /**
     * Mod divide each componenet by a value
     */
    mod(value: number): vec4;
    /**
     * Mod divide each componenet by a value using a better than default mod function
     */
    cmod(v: number | vec4): vec4;
    /**
     * Math.ceil the components of this vector, and return a new vector with the result
     */
    ceil(): vec4;
    /**
     * Math.floor the components of this vector, and return a new vector with the result
     */
    floor(): vec4;
    /**
     * Math.min the components of this vector, and return a new vector with the result
     */
    min(): vec4;
    /**
     * Math.max the components of this vector, and return a new vector with the result
     */
    max(): vec4;
    /**
     * Math.round the components of this vector, and return a new vector with the result
     */
    round(): vec4;
    /**
     * Multiply each component of this vector by the scale value, and return
     * a new vector with the result
     */
    scale(scale: number): vec4;
    /**
     * Calculates the euclidian distance between this vector and another vector
     */
    distance(other: vec4): number;
    /**
     * Calculates the squared euclidian distance between this vector and another vector
     */
    squaredDistance(other: vec4): number;
    /**
     * Calculates the length of this vector
     */
    length(): number;
    /**
     * Calculates the length of this vector
     */
    squaredLength(): number;
    /**
     * Negates the components of this vector, and returns a new vector with the result
     */
    negate(): vec4;
    /**
     * Returns the inverse of this vector
     */
    inverse(): vec4;
    /**
     * Normalizes this vector, and returns a new vector with the result
     */
    normalize(): vec4;
    /**
     * Calculates the dot product of two vectors
     */
    dot(other: vec4): number;
    /**
     * Performs a linear interpolation between this vector and another vector
     */
    lerp(other: vec4, t: number): vec4;
    /**
     * Returns a string representation of this vector
     */
    str(): string;
    /**
     * Returns whether or not this vector's components exactly matches another vector's. (Compared
     * with ===)
     */
    exactEquals(other: vec4): boolean;
    /**
     * Returns a Float32Array with the components from this vector
     */
    toFloat32Array(): Float32Array;
    /**
     * Returns a Float64Array with the components from this vector
     */
    toFloat64Array(): Float64Array;
    /**
     * Returns a new vec4 from the values of an array
     */
    static fromArray(values: number[]): vec4;
}
