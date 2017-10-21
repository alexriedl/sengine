import scalar from './scalar';
import vec3 from './vec3';
// tslint:disable-next-line:class-name
export default class vec2 {
    constructor(x = 0, y = 0) {
        this.len = this.length;
        this.sub = this.subtract;
        this.mul = this.multiply;
        this.div = this.divide;
        this.dist = this.distance;
        this.sqrDist = this.squaredDistance;
        this.sqrLen = this.squaredLength;
        this.x = x;
        this.y = y;
    }
    get xy() { return [this.x, this.y]; }
    toVec3(z = 0) {
        return new vec3(this.x, this.y, z);
    }
    /**
     * Create a new vector with the same values as this vector
     */
    clone() {
        return new vec2(this.x, this.y);
    }
    /**
     * Add another vector to this vector, and return a new vector with the result
     */
    add(other) {
        return new vec2(this.x + other.x, this.y + other.y);
    }
    /**
     * Add values to this vector, and return a new vector with the result
     */
    addValues(x, y) {
        return new vec2(this.x + x, this.y + y);
    }
    /**
     * Subtract another vector from this vector, and return a new vector with the result
     */
    subtract(other) {
        return new vec2(this.x - other.x, this.y - other.y);
    }
    /**
     * Multiply another vector to this vector, and return a new vector with the result
     */
    multiply(other) {
        return new vec2(this.x * other.x, this.y * other.y);
    }
    /**
     * Divide another vector from this vector, and return a new vector with the result
     */
    divide(other) {
        return new vec2(this.x / other.x, this.y / other.y);
    }
    /**
     * Mod divide each componenet by a value
     */
    mod(value) {
        return new vec2(this.x % value, this.y % value);
    }
    /**
     * Mod divide each componenet by a value using a better than default mod function
     */
    cmod(v) {
        if (!(v instanceof vec2))
            v = new vec2(v, v);
        return new vec2(scalar.mod(this.x, v.x), scalar.mod(this.y, v.y));
    }
    /**
     * Math.ceil the components of this vector, and return a new vector with the result
     */
    ceil() {
        return new vec2(Math.ceil(this.x), Math.ceil(this.y));
    }
    /**
     * Math.floor the components of this vector, and return a new vector with the result
     */
    floor() {
        return new vec2(Math.floor(this.x), Math.floor(this.y));
    }
    /**
     * Math.min the components of this vector, and return a new vector with the result
     */
    min() {
        const o = Math.min(this.x, this.y);
        return new vec2(o, o);
    }
    /**
     * Math.max the components of this vector, and return a new vector with the result
     */
    max() {
        const o = Math.max(this.x, this.y);
        return new vec2(o, o);
    }
    /**
     * Math.round the components of this vector, and return a new vector with the result
     */
    round() {
        return new vec2(Math.round(this.x), Math.round(this.y));
    }
    /**
     * Multiply each component of this vector by the scale value, and return
     * a new vector with the result
     */
    scale(scale) {
        return new vec2(this.x * scale, this.y * scale);
    }
    /**
     * Calculates the euclidian distance between this vector and another vector
     */
    distance(other) {
        const x = other.x - this.x;
        const y = other.y - this.y;
        return Math.sqrt(x * x + y * y);
    }
    /**
     * Calculates the squared euclidian distance between this vector and another vector
     */
    squaredDistance(other) {
        const x = other.x - this.x;
        const y = other.y - this.y;
        return x * x + y * y;
    }
    /**
     * Calculates the length of this vector
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * Calculates the length of this vector
     */
    squaredLength() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * Negates the components of this vector, and returns a new vector with the result
     */
    negate() {
        return new vec2(-this.x, -this.y);
    }
    /**
     * Returns the inverse of this vector
     */
    inverse() {
        return new vec2(1.0 / this.x, 1.0 / this.y);
    }
    /**
     * Normalizes this vector, and returns a new vector with the result
     */
    normalize() {
        const sqLen = this.squaredLength();
        if (sqLen <= 0)
            return this;
        const len = 1 / Math.sqrt(sqLen);
        return new vec2(this.x * len, this.y * len);
    }
    /**
     * Calculates the dot product of two vectors
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    /**
     * Calculates the cross product of two vectors
     */
    cross(other) {
        const z = this.x * other.y - this.y * other.x;
        return new vec3(0, 0, z);
    }
    /**
     * Performs a linear interpolation between this vector and another vector
     */
    lerp(other, t) {
        const x = this.x + t * (other.x - this.x);
        const y = this.y + t * (other.y - this.y);
        return new vec2(x, y);
    }
    /**
     * Returns a string representation of this vector
     */
    str() {
        return `(${this.x}, ${this.y})`;
    }
    /**
     * Returns whether or not this vector's components exactly matches another vector's. (Compared
     * with ===)
     */
    exactEquals(other) {
        return this.x === other.x && this.y === other.y;
    }
    /**
     * Returns a Float32Array with the components from this vector
     */
    toFloat32Array() {
        return new Float32Array([this.x, this.y]);
    }
    /**
     * Returns a Float64Array with the components from this vector
     */
    toFloat64Array() {
        return new Float64Array([this.x, this.y]);
    }
    /**
     * Returns a new vec2 from the values of an array
     */
    static fromArray(values) {
        return new vec2(values[0], values[1]);
    }
}
//# sourceMappingURL=vec2.js.map