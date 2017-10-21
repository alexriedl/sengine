export default class vec3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly xy: number[];
    readonly yz: number[];
    readonly xyz: number[];
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly rgb: number[];
    len: () => number;
    sub: (other: vec3) => vec3;
    mul: (other: vec3) => vec3;
    div: (other: vec3) => vec3;
    dist: (other: vec3) => number;
    sqrDist: (other: vec3) => number;
    sqrLen: () => number;
    constructor(x?: number, y?: number, z?: number);
    /**
     * Create a new vector with the same values as this vector
     */
    clone(): vec3;
    /**
     * Add another vector to this vector, and return a new vector with the result
     */
    add(other: vec3): vec3;
    /**
     * Add values to this vector, and return a new vector with the result
     */
    addValues(x: number, y: number, z: number): vec3;
    /**
     * Subtract another vector from this vector, and return a new vector with the result
     */
    subtract(other: vec3): vec3;
    /**
     * Multiply another vector to this vector, and return a new vector with the result
     */
    multiply(other: vec3): vec3;
    /**
     * Divide another vector from this vector, and return a new vector with the result
     */
    divide(other: vec3): vec3;
    /**
     * Mod divide each componenet by a value
     */
    mod(value: number): vec3;
    /**
     * Mod divide each componenet by a value using a better than default mod function
     */
    cmod(v: number | vec3): vec3;
    /**
     * Math.ceil the components of this vector, and return a new vector with the result
     */
    ceil(): vec3;
    /**
     * Math.floor the components of this vector, and return a new vector with the result
     */
    floor(): vec3;
    /**
     * Math.min the components of this vector, and return a new vector with the result
     */
    min(): vec3;
    /**
     * Math.max the components of this vector, and return a new vector with the result
     */
    max(): vec3;
    /**
     * Math.round the components of this vector, and return a new vector with the result
     */
    round(): vec3;
    /**
     * Multiply each component of this vector by the scale value, and return
     * a new vector with the result
     */
    scale(scale: number): vec3;
    /**
     * Calculates the euclidian distance between this vector and another vector
     */
    distance(other: vec3): number;
    /**
     * Calculates the squared euclidian distance between this vector and another vector
     */
    squaredDistance(other: vec3): number;
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
    negate(): vec3;
    /**
     * Returns the inverse of this vector
     */
    inverse(): vec3;
    /**
     * Normalizes this vector, and returns a new vector with the result
     */
    normalize(): vec3;
    /**
     * Calculates the dot product of two vectors
     */
    dot(other: vec3): number;
    /**
     * Calculates the cross product of two vectors
     */
    cross(other: vec3): vec3;
    /**
     * Performs a linear interpolation between this vector and another vector
     */
    lerp(other: vec3, t: number): vec3;
    /**
     * Returns a string representation of this vector
     */
    str(): string;
    /**
     * Returns whether or not this vector's components exactly matches another vector's. (Compared
     * with ===)
     */
    exactEquals(other: vec3): boolean;
    /**
     * Returns a Float32Array with the components from this vector
     */
    toFloat32Array(): Float32Array;
    /**
     * Returns a Float64Array with the components from this vector
     */
    toFloat64Array(): Float64Array;
    /**
     * Returns a new vec3 from the values of an array
     */
    static fromArray(values: number[]): vec3;
}
