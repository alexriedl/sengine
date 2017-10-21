import scalar from './scalar';
// tslint:disable-next-line:class-name
export default class vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
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
        this.w = w;
    }
    get xy() { return [this.x, this.y]; }
    get yz() { return [this.y, this.z]; }
    get xyz() { return [this.x, this.y, this.z]; }
    get xyzw() { return [this.x, this.y, this.z, this.w]; }
    get r() { return this.x; }
    get g() { return this.y; }
    get b() { return this.z; }
    get a() { return this.w; }
    get rgb() { return [this.r, this.g, this.b]; }
    get rgba() { return [this.r, this.g, this.b, this.a]; }
    /**
     * Create a new vector with the same values as this vector
     */
    clone() {
        return new vec4(this.x, this.y, this.z, this.w);
    }
    /**
     * Add another vector to this vector, and return a new vector with the result
     */
    add(other) {
        return new vec4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    }
    /**
     * Add values to this vector, and return a new vector with the result
     */
    addValues(x, y, z, w) {
        return new vec4(this.x + x, this.y + y, this.z + z, this.w + w);
    }
    /**
     * Subtract another vector from this vector, and return a new vector with the result
     */
    subtract(other) {
        return new vec4(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    }
    /**
     * Multiply another vector to this vector, and return a new vector with the result
     */
    multiply(other) {
        return new vec4(this.x * other.x, this.y * other.y, this.z * other.z, this.w * other.w);
    }
    /**
     * Divide another vector from this vector, and return a new vector with the result
     */
    divide(other) {
        return new vec4(this.x / other.x, this.y / other.y, this.z / other.z, this.w / other.w);
    }
    /**
     * Mod divide each componenet by a value
     */
    mod(value) {
        return new vec4(this.x % value, this.y % value, this.z % value, this.w % value);
    }
    /**
     * Mod divide each componenet by a value using a better than default mod function
     */
    cmod(v) {
        if (!(v instanceof vec4))
            v = new vec4(v, v, v, v);
        return new vec4(scalar.mod(this.x, v.x), scalar.mod(this.y, v.y), scalar.mod(this.z, v.z), scalar.mod(this.w, v.w));
    }
    /**
     * Math.ceil the components of this vector, and return a new vector with the result
     */
    ceil() {
        return new vec4(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z), Math.ceil(this.w));
    }
    /**
     * Math.floor the components of this vector, and return a new vector with the result
     */
    floor() {
        return new vec4(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z), Math.floor(this.w));
    }
    /**
     * Math.min the components of this vector, and return a new vector with the result
     */
    min() {
        const o = Math.min(this.x, this.y, this.z);
        return new vec4(o, o, o);
    }
    /**
     * Math.max the components of this vector, and return a new vector with the result
     */
    max() {
        const o = Math.max(this.x, this.y, this.z);
        return new vec4(o, o, o);
    }
    /**
     * Math.round the components of this vector, and return a new vector with the result
     */
    round() {
        return new vec4(Math.round(this.x), Math.round(this.y), Math.round(this.z), Math.round(this.w));
    }
    /**
     * Multiply each component of this vector by the scale value, and return
     * a new vector with the result
     */
    scale(scale) {
        return new vec4(this.x * scale, this.y * scale, this.z * scale, this.w * scale);
    }
    /**
     * Calculates the euclidian distance between this vector and another vector
     */
    distance(other) {
        const x = other.x - this.x;
        const y = other.y - this.y;
        const z = other.z - this.z;
        const w = other.w - this.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * Calculates the squared euclidian distance between this vector and another vector
     */
    squaredDistance(other) {
        const x = other.x - this.x;
        const y = other.y - this.y;
        const z = other.z - this.z;
        const w = other.w - this.w;
        return x * x + y * y + z * z + w * w;
    }
    /**
     * Calculates the length of this vector
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    /**
     * Calculates the length of this vector
     */
    squaredLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    /**
     * Negates the components of this vector, and returns a new vector with the result
     */
    negate() {
        return new vec4(-this.x, -this.y, -this.z, -this.w);
    }
    /**
     * Returns the inverse of this vector
     */
    inverse() {
        return new vec4(1.0 / this.x, 1.0 / this.y, 1.0 / this.z, 1.0 / this.w);
    }
    /**
     * Normalizes this vector, and returns a new vector with the result
     */
    normalize() {
        const sqLen = this.squaredLength();
        if (sqLen <= 0)
            return this;
        const len = 1 / Math.sqrt(sqLen);
        return new vec4(this.x * len, this.y * len, this.z * len, this.w * len);
    }
    /**
     * Calculates the dot product of two vectors
     */
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }
    /**
     * Performs a linear interpolation between this vector and another vector
     */
    lerp(other, t) {
        const x = this.x + t * (other.x - this.x);
        const y = this.y + t * (other.y - this.y);
        const z = this.z + t * (other.z - this.z);
        const w = this.w + t * (other.w - this.w);
        return new vec4(x, y, z, w);
    }
    /**
     * Returns a string representation of this vector
     */
    str() {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }
    /**
     * Returns whether or not this vector's components exactly matches another vector's. (Compared
     * with ===)
     */
    exactEquals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }
    /**
     * Returns a Float32Array with the components from this vector
     */
    toFloat32Array() {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }
    /**
     * Returns a Float64Array with the components from this vector
     */
    toFloat64Array() {
        return new Float64Array([this.x, this.y, this.z, this.w]);
    }
    /**
     * Returns a new vec4 from the values of an array
     */
    static fromArray(values) {
        return new vec4(values[0], values[1], values[2], values[3]);
    }
}
//# sourceMappingURL=vec4.js.map