import scalar from './scalar';
// tslint:disable-next-line:class-name
export default class vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.len = this.length;
        this.sub = this.subtract;
        this.mul = this.multiply;
        this.div = this.divide;
        this.dist = this.distance;
        this.sqrDist = this.squaredDistance;
        this.sqrLen = this.squaredLength;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get xy() { return [this.x, this.y]; }
    get yz() { return [this.y, this.z]; }
    get xyz() { return [this.x, this.y, this.z]; }
    get r() { return this.x; }
    get g() { return this.y; }
    get b() { return this.z; }
    get rgb() { return [this.r, this.g, this.b]; }
    /**
     * Create a new vector with the same values as this vector
     */
    clone() {
        return new vec3(this.x, this.y, this.z);
    }
    /**
     * Add another vector to this vector, and return a new vector with the result
     */
    add(other) {
        return new vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    /**
     * Add values to this vector, and return a new vector with the result
     */
    addValues(x, y, z) {
        return new vec3(this.x + x, this.y + y, this.z + z);
    }
    /**
     * Subtract another vector from this vector, and return a new vector with the result
     */
    subtract(other) {
        return new vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    /**
     * Multiply another vector to this vector, and return a new vector with the result
     */
    multiply(other) {
        return new vec3(this.x * other.x, this.y * other.y, this.z * other.z);
    }
    /**
     * Divide another vector from this vector, and return a new vector with the result
     */
    divide(other) {
        return new vec3(this.x / other.x, this.y / other.y, this.z / other.z);
    }
    /**
     * Mod divide each componenet by a value
     */
    mod(value) {
        return new vec3(this.x % value, this.y % value, this.z % value);
    }
    /**
     * Mod divide each componenet by a value using a better than default mod function
     */
    cmod(v) {
        if (!(v instanceof vec3))
            v = new vec3(v, v, v);
        return new vec3(scalar.mod(this.x, v.x), scalar.mod(this.y, v.y), scalar.mod(this.z, v.z));
    }
    /**
     * Math.ceil the components of this vector, and return a new vector with the result
     */
    ceil() {
        return new vec3(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
    }
    /**
     * Math.floor the components of this vector, and return a new vector with the result
     */
    floor() {
        return new vec3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    }
    /**
     * Math.min the components of this vector, and return a new vector with the result
     */
    min() {
        const o = Math.min(this.x, this.y, this.z);
        return new vec3(o, o, o);
    }
    /**
     * Math.max the components of this vector, and return a new vector with the result
     */
    max() {
        const o = Math.max(this.x, this.y, this.z);
        return new vec3(o, o, o);
    }
    /**
     * Math.round the components of this vector, and return a new vector with the result
     */
    round() {
        return new vec3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
    }
    /**
     * Multiply each component of this vector by the scale value, and return
     * a new vector with the result
     */
    scale(scale) {
        return new vec3(this.x * scale, this.y * scale, this.z * scale);
    }
    /**
     * Calculates the euclidian distance between this vector and another vector
     */
    distance(other) {
        const x = other.x - this.x;
        const y = other.y - this.y;
        const z = other.z - this.z;
        return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Calculates the squared euclidian distance between this vector and another vector
     */
    squaredDistance(other) {
        const x = other.x - this.x;
        const y = other.y - this.y;
        const z = other.z - this.z;
        return x * x + y * y + z * z;
    }
    /**
     * Calculates the length of this vector
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * Calculates the length of this vector
     */
    squaredLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    /**
     * Negates the components of this vector, and returns a new vector with the result
     */
    negate() {
        return new vec3(-this.x, -this.y, -this.z);
    }
    /**
     * Returns the inverse of this vector
     */
    inverse() {
        return new vec3(1.0 / this.x, 1.0 / this.y, 1.0 / this.z);
    }
    /**
     * Normalizes this vector, and returns a new vector with the result
     */
    normalize() {
        const sqLen = this.squaredLength();
        if (sqLen <= 0)
            return this;
        const len = 1 / Math.sqrt(sqLen);
        return new vec3(this.x * len, this.y * len, this.z * len);
    }
    /**
     * Calculates the dot product of two vectors
     */
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    /**
     * Calculates the cross product of two vectors
     */
    cross(other) {
        const x = this.y * other.z - this.z * other.y;
        const y = this.z * other.x - this.x * other.z;
        const z = this.x * other.y - this.y * other.x;
        return new vec3(x, y, z);
    }
    /**
     * Performs a linear interpolation between this vector and another vector
     */
    lerp(other, t) {
        const x = this.x + t * (other.x - this.x);
        const y = this.y + t * (other.y - this.y);
        const z = this.z + t * (other.z - this.z);
        return new vec3(x, y, z);
    }
    /**
     * Returns a string representation of this vector
     */
    str() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
    /**
     * Returns whether or not this vector's components exactly matches another vector's. (Compared
     * with ===)
     */
    exactEquals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
    /**
     * Returns a Float32Array with the components from this vector
     */
    toFloat32Array() {
        return new Float32Array([this.x, this.y, this.z]);
    }
    /**
     * Returns a Float64Array with the components from this vector
     */
    toFloat64Array() {
        return new Float64Array([this.x, this.y, this.z]);
    }
    /**
     * Returns a new vec3 from the values of an array
     */
    static fromArray(values) {
        return new vec3(values[0], values[1], values[2]);
    }
}
//# sourceMappingURL=vec3.js.map