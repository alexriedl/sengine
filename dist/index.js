/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Register = __webpack_require__(21);
exports.Register = Register;
const Color_1 = __webpack_require__(22);
exports.Color = Color_1.default;
const Random_1 = __webpack_require__(23);
exports.Random = Random_1.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const mat4_1 = __webpack_require__(16);
exports.mat4 = mat4_1.default;
const scalar_1 = __webpack_require__(2);
exports.scalar = scalar_1.default;
const vec2_1 = __webpack_require__(17);
exports.vec2 = vec2_1.default;
const vec3_1 = __webpack_require__(6);
exports.vec3 = vec3_1.default;
const vec4_1 = __webpack_require__(18);
exports.vec4 = vec4_1.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var scalar;
(function (scalar) {
    function mod(n, m) {
        return (n % m + m) % m;
    }
    scalar.mod = mod;
})(scalar || (scalar = {}));
exports.default = scalar;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(0);
class Buffer {
    constructor() {
        Utils_1.Register.registerGLItem(this);
    }
    initialize(gl) {
        this.buffer = gl.createBuffer();
        this.setFullBuffer(gl, this.getValues());
    }
    setFullBuffer(gl, values) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), this.getUsage(gl));
    }
    getBuffer() {
        return this.buffer;
    }
    getUsage(gl) {
        return gl.STATIC_DRAW;
    }
    static create(type) {
        if (Buffer.instances[type.name]) return Buffer.instances[type.name];
        Buffer.instances[type.name] = new type();
        return Buffer.instances[type.name];
    }
}
Buffer.instances = {};
exports.default = Buffer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Shader_1 = __webpack_require__(5);
exports.Shader = Shader_1.default;
const SimpleShader_1 = __webpack_require__(11);
exports.SimpleShader = SimpleShader_1.default;
const SimpleTextureShader_1 = __webpack_require__(12);
exports.SimpleTextureShader = SimpleTextureShader_1.default;
const TextureShader_1 = __webpack_require__(28);
exports.TextureShader = TextureShader_1.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(0);
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
exports.createShader = createShader;
class Shader {
    /**
     * Not intended to be a public constructor, but needs to be because of the generic/inheritance version
     * of the singleton being used... DO NOT CALL THIS DIRECTLY!
     * Use <My Shader>.create(); instead
     */
    constructor() {
        Utils_1.Register.registerGLItem(this);
    }
    use(gl) {
        gl.useProgram(this.program);
    }
    initialize(gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, this.getVertexSource());
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, this.getFragmentSource());
        if (!vertexShader || !fragmentShader) {
            console.log('Failed to compile one of the shaders...');
            return;
        }
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        const success = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!success) {
            console.log(gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
            this.program = undefined;
        }
    }
    getAttributeLocation(gl, name) {
        return gl.getAttribLocation(this.program, name);
    }
    getUniformLocation(gl, name) {
        return gl.getUniformLocation(this.program, name);
    }
    static create(type) {
        if (Shader.instances[type.name]) return Shader.instances[type.name];
        Shader.instances[type.name] = new type();
        return Shader.instances[type.name];
    }
}
Shader.instances = {};
exports.default = Shader;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const scalar_1 = __webpack_require__(2);
// tslint:disable-next-line:class-name
class vec3 {
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
    get xy() {
        return [this.x, this.y];
    }
    get yz() {
        return [this.y, this.z];
    }
    get xyz() {
        return [this.x, this.y, this.z];
    }
    get r() {
        return this.x;
    }
    get g() {
        return this.y;
    }
    get b() {
        return this.z;
    }
    get rgb() {
        return [this.r, this.g, this.b];
    }
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
        if (!(v instanceof vec3)) v = new vec3(v, v, v);
        return new vec3(scalar_1.default.mod(this.x, v.x), scalar_1.default.mod(this.y, v.y), scalar_1.default.mod(this.z, v.z));
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
        if (sqLen <= 0) return this;
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
exports.default = vec3;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Buffer_1 = __webpack_require__(8);
const Shader_1 = __webpack_require__(4);
const Model_1 = __webpack_require__(10);
class SimpleRectangle extends Model_1.default {
    constructor(color) {
        super();
        this.color = color;
    }
    createShader() {
        return Shader_1.SimpleShader.createShader();
    }
    createVertexBuffer() {
        return Buffer_1.RectangleBuffer.createBuffer();
    }
    updateAttributes(gl) {
        const shader = this.shader;
        const vertexBuffer = this.buffer.getBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(shader.attributePositionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(shader.attributePositionLocation);
    }
    updateUniforms(gl, mvpMatrix) {
        const shader = this.shader;
        gl.uniformMatrix4fv(shader.uniformMVPMatrixLocation, false, mvpMatrix.toFloat32Array());
        gl.uniform4fv(shader.uniformColorLocation, this.color.toFloat32Array());
    }
    draw(gl) {
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
}
exports.default = SimpleRectangle;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Buffer_1 = __webpack_require__(3);
exports.Buffer = Buffer_1.default;
const CustomBuffer_1 = __webpack_require__(25);
exports.CustomBuffer = CustomBuffer_1.default;
const DynamicBuffer_1 = __webpack_require__(26);
exports.DynamicBuffer = DynamicBuffer_1.default;
const RectangleBuffer_1 = __webpack_require__(27);
exports.RectangleBuffer = RectangleBuffer_1.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(0);
const Math_1 = __webpack_require__(1);
class Renderer {
    constructor(canvasId) {
        this.pixelDimensions = new Math_1.vec2(100, 100);
        const canvas = document.getElementById(canvasId);
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            alert('Unable to initialize WebGL. Your browser may not support it.');
            return;
        }
        this.gl = gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    setSize(pixelDimensions) {
        this.pixelDimensions = pixelDimensions;
    }
    clearScreen(background) {
        const gl = this.gl;
        gl.clearColor(background.r, background.g, background.b, 1.0);
        // tslint:disable-next-line:no-bitwise
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    render(scene, background) {
        const gl = this.gl;
        Utils_1.Register.initializeGLItems(gl);
        const width = gl.canvas.clientWidth;
        const height = gl.canvas.clientHeight;
        gl.viewport(0, 0, width, height);
        this.clearScreen(background);
        const orthoMatrix = Math_1.mat4.ortho(0, this.pixelDimensions.x, this.pixelDimensions.y, 0, -1, 1);
        scene.render(gl, orthoMatrix);
    }
}
exports.default = Renderer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(0);
class Model {
    constructor() {
        this.shader = this.createShader();
        this.buffer = this.createVertexBuffer();
        Utils_1.Register.registerGLItem(this);
    }
    useShader(gl) {
        this.shader.use(gl);
    }
    render(gl, mvpMatrix) {
        this.updateAttributes(gl);
        this.updateUniforms(gl, mvpMatrix);
        this.draw(gl);
    }
    initialize(gl) {
        return;
    }
}
exports.default = Model;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Shader_1 = __webpack_require__(5);
const vertexShaderSource = `
attribute vec4 a_position;
uniform mat4 u_mvp_matrix;

void main() {
	gl_Position = u_mvp_matrix * a_position;
}`;
const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_color;

void main() {
	gl_FragColor = u_color;
}`;
class SimpleShader extends Shader_1.default {
    initialize(gl) {
        super.initialize(gl);
        this.attributePositionLocation = this.getAttributeLocation(gl, 'a_position');
        this.uniformMVPMatrixLocation = this.getUniformLocation(gl, 'u_mvp_matrix');
        this.uniformColorLocation = this.getUniformLocation(gl, 'u_color');
    }
    getVertexSource() {
        return vertexShaderSource;
    }
    getFragmentSource() {
        return fragmentShaderSource;
    }
    static createShader() {
        return Shader_1.default.create(SimpleShader);
    }
}
exports.default = SimpleShader;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Shader_1 = __webpack_require__(5);
const SimpleShader_1 = __webpack_require__(11);
const vertexShaderSource = `
attribute vec4 a_position;
uniform mat4 u_mvp_matrix;

varying vec2 v_texcoord;

void main() {
	gl_Position = u_mvp_matrix * a_position;
	v_texcoord = a_position.xy + vec2(0.5);
}`;
const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_color;
uniform sampler2D u_texture;

varying vec2 v_texcoord;

void main() {
	gl_FragColor = texture2D(u_texture, v_texcoord);
}`;
class SimpleTextureShader extends SimpleShader_1.default {
    getVertexSource() {
        return vertexShaderSource;
    }
    getFragmentSource() {
        return fragmentShaderSource;
    }
    static createShader() {
        return Shader_1.default.create(SimpleTextureShader);
    }
}
exports.default = SimpleTextureShader;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(14));
__export(__webpack_require__(19));
__export(__webpack_require__(1));
__export(__webpack_require__(24));
__export(__webpack_require__(8));
__export(__webpack_require__(4));
__export(__webpack_require__(0));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __webpack_require__(15);
exports.Entity = Entity_1.default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Math_1 = __webpack_require__(1);
class Entity {
    constructor(model, position = new Math_1.vec3(), scale = new Math_1.vec3(1, 1, 1)) {
        this.children = [];
        this.model = model;
        this.position = position;
        this.scale = scale;
    }
    getRenderingPosition() {
        return this.position;
    }
    getRenderingScale() {
        return this.scale;
    }
    setParent(parent) {
        if (this.parent) {
            const index = this.parent.children.indexOf(this);
            if (index >= 0) {
                this.parent.children.splice(index, 1);
            }
        }
        if (parent) {
            parent.children.push(this);
        }
        this.parent = parent;
    }
    render(gl, vpMatrix, overridePosition, overrideScale) {
        const scale = overrideScale || this.getRenderingScale();
        const position = overridePosition || this.getRenderingPosition();
        const modelMatrix = Math_1.mat4.fromTranslation(position).scale(scale);
        const mvpMatrix = modelMatrix.mul(vpMatrix);
        if (this.model) {
            this.model.useShader(gl);
            this.model.render(gl, mvpMatrix);
        }
        this.children.forEach(c => {
            c.render(gl, mvpMatrix);
        });
    }
    update(deltaTime) {
        let childrenAnimating = false;
        for (const child of this.children) {
            const childAnimating = child.update(deltaTime);
            if (childAnimating) childrenAnimating = true;
        }
        return childrenAnimating;
    }
}
exports.default = Entity;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = __webpack_require__(6);
/**
 * Logic from: https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js
 */
// tslint:disable-next-line:class-name
class mat4 {
    constructor(elements) {
        this.mul = this.multiply;
        if (elements) this.elements = [...elements];else {
            this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    }
    get m00() {
        return this.elements[0];
    }
    get m01() {
        return this.elements[1];
    }
    get m02() {
        return this.elements[2];
    }
    get m03() {
        return this.elements[3];
    }
    get m10() {
        return this.elements[4];
    }
    get m11() {
        return this.elements[5];
    }
    get m12() {
        return this.elements[6];
    }
    get m13() {
        return this.elements[7];
    }
    get m20() {
        return this.elements[8];
    }
    get m21() {
        return this.elements[9];
    }
    get m22() {
        return this.elements[10];
    }
    get m23() {
        return this.elements[11];
    }
    get m30() {
        return this.elements[12];
    }
    get m31() {
        return this.elements[13];
    }
    get m32() {
        return this.elements[14];
    }
    get m33() {
        return this.elements[15];
    }
    copy() {
        return new mat4(this.elements);
    }
    static identity() {
        return new mat4();
    }
    transpose() {
        return new mat4([this.m00, this.m10, this.m20, this.m30, this.m01, this.m11, this.m21, this.m31, this.m02, this.m12, this.m22, this.m32, this.m03, this.m13, this.m23, this.m33]);
    }
    translate(v) {
        const m30 = this.m00 * v.x + this.m10 * v.y + this.m20 * v.z + this.m30;
        const m31 = this.m01 * v.x + this.m11 * v.y + this.m21 * v.z + this.m31;
        const m32 = this.m02 * v.x + this.m12 * v.y + this.m22 * v.z + this.m32;
        const m33 = this.m03 * v.x + this.m13 * v.y + this.m23 * v.z + this.m33;
        return new mat4([this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, m30, m31, m32, m33]);
    }
    scale(v) {
        return new mat4([this.m00 * v.x, this.m01 * v.x, this.m02 * v.x, this.m03 * v.x, this.m10 * v.y, this.m11 * v.y, this.m12 * v.y, this.m13 * v.y, this.m20 * v.z, this.m21 * v.z, this.m22 * v.z, this.m23 * v.z, this.m30, this.m31, this.m32, this.m33]);
    }
    multiply(o) {
        const m00 = this.m00 * o.m00 + this.m01 * o.m10 + this.m02 * o.m20 + this.m03 * o.m30;
        const m01 = this.m00 * o.m01 + this.m01 * o.m11 + this.m02 * o.m21 + this.m03 * o.m31;
        const m02 = this.m00 * o.m02 + this.m01 * o.m12 + this.m02 * o.m22 + this.m03 * o.m32;
        const m03 = this.m00 * o.m03 + this.m01 * o.m13 + this.m02 * o.m23 + this.m03 * o.m33;
        const m10 = this.m10 * o.m00 + this.m11 * o.m10 + this.m12 * o.m20 + this.m13 * o.m30;
        const m11 = this.m10 * o.m01 + this.m11 * o.m11 + this.m12 * o.m21 + this.m13 * o.m31;
        const m12 = this.m10 * o.m02 + this.m11 * o.m12 + this.m12 * o.m22 + this.m13 * o.m32;
        const m13 = this.m10 * o.m03 + this.m11 * o.m13 + this.m12 * o.m23 + this.m13 * o.m33;
        const m20 = this.m20 * o.m00 + this.m21 * o.m10 + this.m22 * o.m20 + this.m23 * o.m30;
        const m21 = this.m20 * o.m01 + this.m21 * o.m11 + this.m22 * o.m21 + this.m23 * o.m31;
        const m22 = this.m20 * o.m02 + this.m21 * o.m12 + this.m22 * o.m22 + this.m23 * o.m32;
        const m23 = this.m20 * o.m03 + this.m21 * o.m13 + this.m22 * o.m23 + this.m23 * o.m33;
        const m30 = this.m30 * o.m00 + this.m31 * o.m10 + this.m32 * o.m20 + this.m33 * o.m30;
        const m31 = this.m30 * o.m01 + this.m31 * o.m11 + this.m32 * o.m21 + this.m33 * o.m31;
        const m32 = this.m30 * o.m02 + this.m31 * o.m12 + this.m32 * o.m22 + this.m33 * o.m32;
        const m33 = this.m30 * o.m03 + this.m31 * o.m13 + this.m32 * o.m23 + this.m33 * o.m33;
        return new mat4([m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33]);
    }
    getTranslation() {
        return new vec3_1.default(this.m30, this.m31, this.m32);
    }
    str() {
        return `(${this.m00}, ${this.m01}, ${this.m02}, ${this.m03})
(${this.m10}, ${this.m11}, ${this.m12}, ${this.m13})
(${this.m20}, ${this.m21}, ${this.m22}, ${this.m23})
(${this.m30}, ${this.m31}, ${this.m32}, ${this.m33})`;
    }
    toFloat32Array() {
        return new Float32Array(this.elements);
    }
    toFloat64Array() {
        return new Float64Array(this.elements);
    }
    /**
     * Creates a matrix from a vector translation.
     * This is equivalent to (but much faster than):
     *
     *    const m = mat4.identity();
     *    m.translate(vec);
     */
    static fromTranslation(v) {
        return new mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z, 1]);
    }
    /**
     * Creates a matrix from a vector scale.
     * This is equivalent to (but much faster than):
     *
     *    const m = mat4.identity();
     *    m.scale(vec);
     */
    static fromScale(v) {
        return new mat4([v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1]);
    }
    /**
     * Generates a frustum matrix with the given bounds
     */
    static frustum(left, right, bottom, top, near, far) {
        const rl = 1 / (right - left);
        const tb = 1 / (top - bottom);
        const nf = 1 / (near - far);
        return new mat4([near * 2 * rl, 0, 0, 0, 0, near * 2 * tb, 0, 0, (right + left) * rl, (top + bottom) * tb, (far + near) * nf, -1, 0, 0, far * near * 2 * nf, 0]);
    }
    /**
     * Generates a perspective projection matrix with the given bounds
     */
    static perspective(fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);
        return new mat4([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
    }
    /**
     * Generates an orthogonal projection matrix with the given bounds
     */
    static ortho(left, right, bottom, top, near, far) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        return new mat4([-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1]);
    }
}
exports.default = mat4;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const scalar_1 = __webpack_require__(2);
const vec3_1 = __webpack_require__(6);
// tslint:disable-next-line:class-name
class vec2 {
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
    get xy() {
        return [this.x, this.y];
    }
    toVec3(z = 0) {
        return new vec3_1.default(this.x, this.y, z);
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
        if (!(v instanceof vec2)) v = new vec2(v, v);
        return new vec2(scalar_1.default.mod(this.x, v.x), scalar_1.default.mod(this.y, v.y));
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
        if (sqLen <= 0) return this;
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
        return new vec3_1.default(0, 0, z);
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
exports.default = vec2;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const scalar_1 = __webpack_require__(2);
// tslint:disable-next-line:class-name
class vec4 {
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
    get xy() {
        return [this.x, this.y];
    }
    get yz() {
        return [this.y, this.z];
    }
    get xyz() {
        return [this.x, this.y, this.z];
    }
    get xyzw() {
        return [this.x, this.y, this.z, this.w];
    }
    get r() {
        return this.x;
    }
    get g() {
        return this.y;
    }
    get b() {
        return this.z;
    }
    get a() {
        return this.w;
    }
    get rgb() {
        return [this.r, this.g, this.b];
    }
    get rgba() {
        return [this.r, this.g, this.b, this.a];
    }
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
        if (!(v instanceof vec4)) v = new vec4(v, v, v, v);
        return new vec4(scalar_1.default.mod(this.x, v.x), scalar_1.default.mod(this.y, v.y), scalar_1.default.mod(this.z, v.z), scalar_1.default.mod(this.w, v.w));
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
        if (sqLen <= 0) return this;
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
exports.default = vec4;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __webpack_require__(20);
exports.Game = Game_1.default;
const Renderer_1 = __webpack_require__(9);
exports.Renderer = Renderer_1.default;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(0);
const Renderer_1 = __webpack_require__(9);
class Game {
    constructor(canvasId) {
        this.running = false;
        this.initialized = false;
        this.frame = now => {
            if (!this.running) {
                this.then = undefined;
                return;
            }
            const deltaTime = now - this.then;
            {
                const skipFrame = !this.then;
                this.then = now;
                if (skipFrame) {
                    requestAnimationFrame(this.frame);
                    return;
                }
            }
            this.update(deltaTime);
            this.render();
            requestAnimationFrame(this.frame);
        };
        this.renderer = new Renderer_1.default(canvasId);
    }
    initialize(gl) {
        Utils_1.Register.initializeGLItems(gl);
    }
    /**
     * Set the scene for the game. The default update/render functions redirect logic to this scene.
     * The old scene will be returned
     */
    setScene(scene, PixelDimensions, backgroundColor = Utils_1.Color.BLACK) {
        const old = this.scene;
        this.scene = scene;
        this.backgroundColor = backgroundColor;
        this.renderer.setSize(PixelDimensions);
        return old;
    }
    update(deltaTime) {
        if (this.scene) this.scene.update(deltaTime);
    }
    render() {
        if (this.scene) this.renderer.render(this.scene, this.backgroundColor);else this.renderer.clearScreen(this.backgroundColor);
    }
    start() {
        if (!this.initialized) {
            this.initialize(this.renderer.gl);
            this.initialized = true;
        }
        if (this.running) return;
        this.running = true;
        requestAnimationFrame(this.frame);
    }
    stop() {
        this.running = false;
    }
}
exports.default = Game;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const registrar = {};
function register(type, item) {
    const name = type.name;
    if (!registrar[name]) registrar[name] = [];
    registrar[name].push(item);
}
exports.register = register;
function unregisterAll(type, action) {
    const name = type.name;
    const items = registrar[name];
    delete registrar[name];
    if (items && action) {
        for (const item of items) {
            action(item);
        }
    }
}
exports.unregisterAll = unregisterAll;
class GLRegister {
    initialize(gl) {
        return;
    }
}
exports.GLRegister = GLRegister;
function registerGLItem(item) {
    register(GLRegister, item);
}
exports.registerGLItem = registerGLItem;
function initializeGLItems(gl) {
    unregisterAll(GLRegister, item => {
        item.initialize(gl);
    });
}
exports.initializeGLItems = initializeGLItems;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Math_1 = __webpack_require__(1);
class Color extends Math_1.vec4 {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        super(r, g, b, a);
    }
    /**
     * Create a new color a percentage lighter than this color.
     * Parameter is a value between 0 and 1.
     *
     * NOTE: This is an extremely nieve way of doing a lighten. Do
     * not rely on this being perfect
     */
    lighten(percent) {
        const r = Math.min(1, this.r + 1 * percent);
        const g = Math.min(1, this.g + 1 * percent);
        const b = Math.min(1, this.b + 1 * percent);
        return new Color(r, g, b, this.a);
    }
    /**
     * Create a new color a percentage darken than this color.
     * Parameter is a value between 0 and 1.
     *
     * NOTE: This is an extremely nieve way of doing a darken. Do
     * not rely on this being perfect
     */
    darken(percent) {
        const r = Math.max(0, this.r - 1 * percent);
        const g = Math.max(0, this.g - 1 * percent);
        const b = Math.max(0, this.b - 1 * percent);
        return new Color(r, g, b, this.a);
    }
    /**
     * Assumes this color was specified as 0-255. Divides each componenet by 255
     */
    normalize() {
        return new Color(this.x / 255, this.y / 255, this.z / 255, this.w / 255);
    }
}
Color.BLACK = new Color();
Color.WHITE = new Color(1, 1, 1);
Color.RED = new Color(1, 0, 0);
Color.GREEN = new Color(0, 1, 0);
Color.BLUE = new Color(0, 0, 1);
Color.YELLOW = new Color(1, 1, 0);
exports.default = Color;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
class Random {
    /**
     * Creates a pseudo-random value generator. The seed must be an integer.
     *
     * Uses an optimized version of the Park-Miller PRNG.
     * http://www.firstpr.com.au/dsp/rand31/
     */
    constructor(seed) {
        this.MAX = 2147483647;
        this.seed = seed ? seed : Math.floor(Math.random() * (this.MAX - 1));
        if (this.seed <= 0) this.seed *= -1;
    }
    next() {
        return this.seed = this.seed * 16807 % this.MAX;
    }
    /**
     * Returns a positive int (0 - 32^2-2)
     */
    nextInt() {
        return this.next();
    }
    /**
     * Returns a float between 0 and 1
     */
    nextFloat() {
        return this.nextInt() / (this.MAX - 1);
    }
    /**
     * Returns a float between 'start' and 'end'
     */
    nextRangeFloat(start, end) {
        const rangeSize = end - start;
        const randomUnder1 = this.nextInt() / this.MAX;
        return start + randomUnder1 * rangeSize;
    }
    /**
     * Returns an int between 'start' and 'end'. [start...end)
     */
    nextRangeInt(start, end) {
        const rangeSize = end - start;
        const randomUnder1 = this.nextInt() / this.MAX;
        return start + Math.floor(randomUnder1 * rangeSize);
    }
    /**
     * Returns a random element from an array
     */
    choice(array) {
        return array[this.nextRangeInt(0, array.length)];
    }
}
exports.default = Random;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __webpack_require__(10);
exports.Model = Model_1.default;
const SimpleRectangle_1 = __webpack_require__(7);
exports.SimpleRectangle = SimpleRectangle_1.default;
const SimpleTextureRectangle_1 = __webpack_require__(29);
exports.SimpleTextureRectangle = SimpleTextureRectangle_1.default;
const SpriteMap_1 = __webpack_require__(30);
exports.SpriteMap = SpriteMap_1.default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Buffer_1 = __webpack_require__(3);
class CustomBuffer extends Buffer_1.default {
    constructor(values) {
        super();
        this.values = values;
    }
    getValues() {
        const v = this.values;
        this.values = undefined;
        return v;
    }
}
exports.default = CustomBuffer;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Buffer_1 = __webpack_require__(3);
class DynamicBuffer extends Buffer_1.default {
    initialize(gl) {
        super.initialize(gl);
        // TODO: Do not store GL as property of buffer...
        this.gl = gl;
    }
    getValues() {
        return [];
    }
    getUsage(gl) {
        return gl.DYNAMIC_DRAW;
    }
    setBuffer(values) {
        this.setFullBuffer(this.gl, values);
    }
    /**
     * Update the data in a buffer. Unless the size of the data is changing, this is the prefered
     * method of updating (over "setBuffer")
     */
    updateBuffer(values, offset = 0) {
        const gl = this.gl;
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, new Float32Array(values));
    }
}
exports.default = DynamicBuffer;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Buffer_1 = __webpack_require__(3);
class RectangleBuffer extends Buffer_1.default {
    getValues() {
        return [-0.5, -0.5, +0.5, -0.5, +0.5, +0.5, -0.5, +0.5];
    }
    static createBuffer() {
        return Buffer_1.default.create(RectangleBuffer);
    }
}
exports.default = RectangleBuffer;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Shader_1 = __webpack_require__(5);
const SimpleTextureShader_1 = __webpack_require__(12);
const vertexShaderSource = `
attribute vec4 a_position;
attribute vec2 a_texcoord;
uniform mat4 u_mvp_matrix;

varying vec2 v_texcoord;

void main() {
	gl_Position = u_mvp_matrix * a_position;
	v_texcoord = a_texcoord;
}`;
class TextureShader extends SimpleTextureShader_1.default {
    initialize(gl) {
        super.initialize(gl);
        this.attributeTexCoordLocation = this.getAttributeLocation(gl, 'a_texcoord');
    }
    getVertexSource() {
        return vertexShaderSource;
    }
    static createShader() {
        return Shader_1.default.create(TextureShader);
    }
}
exports.default = TextureShader;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(0);
const Shader_1 = __webpack_require__(4);
const SimpleRectangle_1 = __webpack_require__(7);
class SimpleTextureRectangle extends SimpleRectangle_1.default {
    constructor(texture) {
        super(new Utils_1.Color(1, 1, 1));
        this.texture = texture;
    }
    createShader() {
        return Shader_1.SimpleTextureShader.createShader();
    }
    updateAttributes(gl) {
        super.updateAttributes(gl);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
}
exports.default = SimpleTextureRectangle;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const Buffer_1 = __webpack_require__(8);
const Utils_1 = __webpack_require__(0);
const Shader_1 = __webpack_require__(4);
const SimpleRectangle_1 = __webpack_require__(7);
function buildBuffer(mapInfo) {
    const buffer = [];
    let count = 0;
    for (let y = mapInfo.topPadding; y < mapInfo.textureHeight && count < mapInfo.totalSprites; y += mapInfo.spritHeight) {
        for (let x = mapInfo.leftPadding; x < mapInfo.textureWidth && count < mapInfo.totalSprites; x += mapInfo.spritWidth) {
            count++;
            const left = x / mapInfo.textureWidth;
            const right = (x + mapInfo.spritWidth) / mapInfo.textureWidth;
            const top = y / mapInfo.textureHeight;
            const bottom = (y + mapInfo.spritHeight) / mapInfo.textureHeight;
            buffer.push(left, top, right, top, right, bottom, left, bottom);
        }
    }
    return buffer;
}
function createAsyncTexture(gl, source) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    const image = new Image();
    image.src = source;
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    return texture;
}
class SpriteMap extends SimpleRectangle_1.default {
    constructor() {
        super(new Utils_1.Color(1, 1, 1));
        this.frame = 0;
    }
    initialize(gl) {
        const mapInfo = this.getMapInfo();
        if (!mapInfo.leftPadding) mapInfo.leftPadding = 0;
        if (!mapInfo.topPadding) mapInfo.topPadding = 0;
        this.textureBuffer = new Buffer_1.CustomBuffer(buildBuffer(mapInfo));
        this.texture = createAsyncTexture(gl, mapInfo.source);
        this.totalFrames = mapInfo.totalSprites;
    }
    setFrame(frame) {
        const oldFrame = this.frame;
        this.frame = frame % this.totalFrames;
        return oldFrame;
    }
    createShader() {
        return Shader_1.TextureShader.createShader();
    }
    updateAttributes(gl) {
        super.updateAttributes(gl);
        const shader = this.shader;
        const textureBuffer = this.textureBuffer.getBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shader.attributeTexCoordLocation, 2, gl.FLOAT, false, 0, this.frame * 8 * 4);
        gl.enableVertexAttribArray(shader.attributeTexCoordLocation);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
}
exports.default = SpriteMap;

/***/ })
/******/ ]);