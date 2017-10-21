import vec3 from './vec3';
export default class vec2 {
    readonly x: number;
    readonly y: number;
    readonly xy: number[];
    len: () => number;
    sub: (other: vec2) => vec2;
    mul: (other: vec2) => vec2;
    div: (other: vec2) => vec2;
    dist: (other: vec2) => number;
    sqrDist: (other: vec2) => number;
    sqrLen: () => number;
    constructor(x?: number, y?: number);
    toVec3(z?: number): vec3;
    /**
     * Create a new vector with the same values as this vector
     */
    clone(): vec2;
    /**
     * Add another vector to this vector, and return a new vector with the result
     */
    add(other: vec2): vec2;
    /**
     * Add values to this vector, and return a new vector with the result
     */
    addValues(x: number, y: number): vec2;
    /**
     * Subtract another vector from this vector, and return a new vector with the result
     */
    subtract(other: vec2): vec2;
    /**
     * Multiply another vector to this vector, and return a new vector with the result
     */
    multiply(other: vec2): vec2;
    /**
     * Divide another vector from this vector, and return a new vector with the result
     */
    divide(other: vec2): vec2;
    /**
     * Mod divide each componenet by a value
     */
    mod(value: number): vec2;
    /**
     * Mod divide each componenet by a value using a better than default mod function
     */
    cmod(v: number | vec2): vec2;
    /**
     * Math.ceil the components of this vector, and return a new vector with the result
     */
    ceil(): vec2;
    /**
     * Math.floor the components of this vector, and return a new vector with the result
     */
    floor(): vec2;
    /**
     * Math.min the components of this vector, and return a new vector with the result
     */
    min(): vec2;
    /**
     * Math.max the components of this vector, and return a new vector with the result
     */
    max(): vec2;
    /**
     * Math.round the components of this vector, and return a new vector with the result
     */
    round(): vec2;
    /**
     * Multiply each component of this vector by the scale value, and return
     * a new vector with the result
     */
    scale(scale: number): vec2;
    /**
     * Calculates the euclidian distance between this vector and another vector
     */
    distance(other: vec2): number;
    /**
     * Calculates the squared euclidian distance between this vector and another vector
     */
    squaredDistance(other: vec2): number;
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
    negate(): vec2;
    /**
     * Returns the inverse of this vector
     */
    inverse(): vec2;
    /**
     * Normalizes this vector, and returns a new vector with the result
     */
    normalize(): vec2;
    /**
     * Calculates the dot product of two vectors
     */
    dot(other: vec2): number;
    /**
     * Calculates the cross product of two vectors
     */
    cross(other: vec2): vec3;
    /**
     * Performs a linear interpolation between this vector and another vector
     */
    lerp(other: vec2, t: number): vec2;
    /**
     * Returns a string representation of this vector
     */
    str(): string;
    /**
     * Returns whether or not this vector's components exactly matches another vector's. (Compared
     * with ===)
     */
    exactEquals(other: vec2): boolean;
    /**
     * Returns a Float32Array with the components from this vector
     */
    toFloat32Array(): Float32Array;
    /**
     * Returns a Float64Array with the components from this vector
     */
    toFloat64Array(): Float64Array;
    /**
     * Returns a new vec2 from the values of an array
     */
    static fromArray(values: number[]): vec2;
}
