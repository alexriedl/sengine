import vec3 from './vec3';

/**
 * Logic from: https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js
 */
// tslint:disable-next-line:class-name
export default class mat4 {
	public static readonly EPSILON = 0.000001;
	private elements: number[];

	public get m00(): number { return this.elements[0]; }
	public get m01(): number { return this.elements[1]; }
	public get m02(): number { return this.elements[2]; }
	public get m03(): number { return this.elements[3]; }
	public get m10(): number { return this.elements[4]; }
	public get m11(): number { return this.elements[5]; }
	public get m12(): number { return this.elements[6]; }
	public get m13(): number { return this.elements[7]; }
	public get m20(): number { return this.elements[8]; }
	public get m21(): number { return this.elements[9]; }
	public get m22(): number { return this.elements[10]; }
	public get m23(): number { return this.elements[11]; }
	public get m30(): number { return this.elements[12]; }
	public get m31(): number { return this.elements[13]; }
	public get m32(): number { return this.elements[14]; }
	public get m33(): number { return this.elements[15]; }

	public mul = this.multiply;

	public constructor(elements?: number[]) {
		if (elements) this.elements = [...elements];
		else {
			this.elements = [
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1,
			];
		}
	}

	public copy(): mat4 {
		return new mat4(this.elements);
	}

	public static identity(): mat4 {
		return new mat4();
	}

	public transpose(): mat4 {
		return new mat4([
			this.m00, this.m10, this.m20, this.m30,
			this.m01, this.m11, this.m21, this.m31,
			this.m02, this.m12, this.m22, this.m32,
			this.m03, this.m13, this.m23, this.m33,
		]);
	}

	public inverse(): mat4 {
		const m00 = this.m00 * this.m11 - this.m01 * this.m10;
		const m01 = this.m00 * this.m12 - this.m02 * this.m10;
		const m02 = this.m00 * this.m13 - this.m03 * this.m10;
		const m03 = this.m01 * this.m12 - this.m02 * this.m11;
		const m04 = this.m01 * this.m13 - this.m03 * this.m11;
		const m05 = this.m02 * this.m13 - this.m03 * this.m12;
		const m06 = this.m20 * this.m31 - this.m21 * this.m30;
		const m07 = this.m20 * this.m32 - this.m22 * this.m30;
		const m08 = this.m20 * this.m33 - this.m23 * this.m30;
		const m09 = this.m21 * this.m32 - this.m22 * this.m31;
		const m10 = this.m21 * this.m33 - this.m23 * this.m31;
		const m11 = this.m22 * this.m33 - this.m23 * this.m32;

		let determinant = m00 * m11 - m01 * m10 + m02 * m09 + m03 * m08 - m04 * m07 + m05 * m06;
		if (!determinant) return null;
		determinant = 1.0 / determinant;

		const out00 = (this.m11 * m11 - this.m12 * m10 + this.m13 * m09) * determinant;
		const out01 = (this.m02 * m10 - this.m01 * m11 - this.m03 * m09) * determinant;
		const out02 = (this.m31 * m05 - this.m32 * m04 + this.m33 * m03) * determinant;
		const out03 = (this.m22 * m04 - this.m21 * m05 - this.m23 * m03) * determinant;
		const out10 = (this.m12 * m08 - this.m10 * m11 - this.m13 * m07) * determinant;
		const out11 = (this.m00 * m11 - this.m02 * m08 + this.m03 * m07) * determinant;
		const out12 = (this.m32 * m02 - this.m30 * m05 - this.m33 * m01) * determinant;
		const out13 = (this.m20 * m05 - this.m22 * m02 + this.m23 * m01) * determinant;
		const out20 = (this.m10 * m10 - this.m11 * m08 + this.m13 * m06) * determinant;
		const out21 = (this.m01 * m08 - this.m00 * m10 - this.m03 * m06) * determinant;
		const out22 = (this.m30 * m04 - this.m31 * m02 + this.m33 * m00) * determinant;
		const out23 = (this.m21 * m02 - this.m20 * m04 - this.m23 * m00) * determinant;
		const out30 = (this.m11 * m07 - this.m10 * m09 - this.m12 * m06) * determinant;
		const out31 = (this.m00 * m09 - this.m01 * m07 + this.m02 * m06) * determinant;
		const out32 = (this.m31 * m01 - this.m30 * m03 - this.m32 * m00) * determinant;
		const out33 = (this.m20 * m03 - this.m21 * m01 + this.m22 * m00) * determinant;

		return new mat4([
			out00, out01, out02, out03,
			out10, out11, out12, out13,
			out20, out21, out22, out23,
			out30, out31, out32, out33,
		]);
	}

	public translate(v: vec3): mat4 {
		if (!v || (v.x === 0 && v.y === 0 && v.z === 0)) return this;
		const m30 = this.m00 * v.x + this.m10 * v.y + this.m20 * v.z + this.m30;
		const m31 = this.m01 * v.x + this.m11 * v.y + this.m21 * v.z + this.m31;
		const m32 = this.m02 * v.x + this.m12 * v.y + this.m22 * v.z + this.m32;
		const m33 = this.m03 * v.x + this.m13 * v.y + this.m23 * v.z + this.m33;
		return new mat4([
			this.m00, this.m01, this.m02, this.m03,
			this.m10, this.m11, this.m12, this.m13,
			this.m20, this.m21, this.m22, this.m23,
			m30, m31, m32, m33,
		]);
	}

	public scale(v: vec3): mat4 {
		if (!v || (v.x === 1 && v.y === 1 && v.z === 1)) return this;
		return new mat4([
			this.m00 * v.x, this.m01 * v.x, this.m02 * v.x, this.m03 * v.x,
			this.m10 * v.y, this.m11 * v.y, this.m12 * v.y, this.m13 * v.y,
			this.m20 * v.z, this.m21 * v.z, this.m22 * v.z, this.m23 * v.z,
			this.m30, this.m31, this.m32, this.m33,
		]);
	}

	public multiply(o: mat4): mat4 {
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

		return new mat4([
			m00, m01, m02, m03,
			m10, m11, m12, m13,
			m20, m21, m22, m23,
			m30, m31, m32, m33,
		]);
	}

	public rotateX(radians: number) {
		if (!radians || radians === 0) return this;
		const s = Math.sin(radians);
		const c = Math.cos(radians);

		const m10 = this.m10 * c + this.m20 * s;
		const m11 = this.m11 * c + this.m21 * s;
		const m12 = this.m12 * c + this.m22 * s;
		const m13 = this.m13 * c + this.m23 * s;

		const m20 = this.m20 * c - this.m10 * s;
		const m21 = this.m21 * c - this.m11 * s;
		const m22 = this.m22 * c - this.m12 * s;
		const m23 = this.m23 * c - this.m13 * s;

		return new mat4([
			this.m00, this.m01, this.m02, this.m03,
			m10, m11, m12, m13,
			m20, m21, m22, m23,
			this.m30, this.m31, this.m32, this.m33,
		]);
	}

	public rotateY(radians: number) {
		if (!radians || radians === 0) return this;
		const s = Math.sin(radians);
		const c = Math.cos(radians);

		const m00 = this.m00 * c - this.m20 * s;
		const m01 = this.m01 * c - this.m21 * s;
		const m02 = this.m02 * c - this.m22 * s;
		const m03 = this.m03 * c - this.m23 * s;

		const m20 = this.m00 * s + this.m20 * c;
		const m21 = this.m01 * s + this.m21 * c;
		const m22 = this.m02 * s + this.m22 * c;
		const m23 = this.m03 * s + this.m23 * c;

		return new mat4([
			m00, m01, m02, m03,
			this.m10, this.m11, this.m12, this.m13,
			m20, m21, m22, m23,
			this.m30, this.m31, this.m32, this.m33,
		]);
	}

	public rotateZ(radians: number) {
		if (!radians || radians === 0) return this;
		const s = Math.sin(radians);
		const c = Math.cos(radians);

		const m00 = this.m00 * c + this.m10 * s;
		const m01 = this.m01 * c + this.m11 * s;
		const m02 = this.m02 * c + this.m12 * s;
		const m03 = this.m03 * c + this.m13 * s;

		const m10 = this.m10 * c - this.m00 * s;
		const m11 = this.m11 * c - this.m01 * s;
		const m12 = this.m12 * c - this.m02 * s;
		const m13 = this.m13 * c - this.m03 * s;

		return new mat4([
			m00, m01, m02, m03,
			m10, m11, m12, m13,
			this.m20, this.m21, this.m22, this.m23,
			this.m30, this.m31, this.m32, this.m33,
		]);
	}

	public getTranslation(): vec3 {
		return new vec3(this.m30, this.m31, this.m32);
	}

	public str(): string {
		return `(${this.m00}, ${this.m01}, ${this.m02}, ${this.m03})
(${this.m10}, ${this.m11}, ${this.m12}, ${this.m13})
(${this.m20}, ${this.m21}, ${this.m22}, ${this.m23})
(${this.m30}, ${this.m31}, ${this.m32}, ${this.m33})`;
	}

	public toFloat32Array(): Float32Array {
		return new Float32Array(this.elements);
	}

	public toFloat64Array(): Float64Array {
		return new Float64Array(this.elements);
	}

	/**
	 * Creates a matrix from a vector translation.
	 * This is equivalent to (but much faster than):
	 *
	 *    const m = mat4.identity();
	 *    m.translate(vec);
	 */
	public static fromTranslation(v: vec3) {
		return new mat4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			v.x, v.y, v.z, 1,
		]);
	}

	/**
	 * Creates a matrix from a vector scale.
	 * This is equivalent to (but much faster than):
	 *
	 *    const m = mat4.identity();
	 *    m.scale(vec);
	 */
	public static fromScale(v: vec3) {
		return new mat4([
			v.x, 0, 0, 0,
			0, v.y, 0, 0,
			0, 0, v.z, 0,
			0, 0, 0, 1,
		]);
	}

	/**
	 * Generates a frustum matrix with the given bounds
	 */
	public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
		const rl = 1 / (right - left);
		const tb = 1 / (top - bottom);
		const nf = 1 / (near - far);
		return new mat4([
			(near * 2) * rl, 0, 0, 0,
			0, (near * 2) * tb, 0, 0,
			(right + left) * rl, (top + bottom) * tb, (far + near) * nf, -1,
			0, 0, (far * near * 2) * nf, 0,
		]);
	}

	/**
	 * Generates a perspective projection matrix with the given bounds
	 * @param fovy Vertical field of view in radians
	 * @param aspect Aspect ration. Typically viewport width/height
	 * @param near Near bound of the frustum
	 * @param far Far bound of the frustum
	 */
	public static perspective(fovy: number, aspect: number, near: number, far: number) {
		const f = 1.0 / Math.tan(fovy / 2);
		const nf = 1 / (near - far);

		return new mat4([
			f / aspect, 0, 0, 0,
			0, f, 0, 0,
			0, 0, (far + near) * nf, -1,
			0, 0, (2 * far * near) * nf, 0,
		]);
	}

	/**
	 * Generates an orthogonal projection matrix with the given bounds
	 */
	public static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
		const lr = 1 / (left - right);
		const bt = 1 / (bottom - top);
		const nf = 1 / (near - far);
		return new mat4([
			-2 * lr, 0, 0, 0,
			0, -2 * bt, 0, 0,
			0, 0, 2 * nf, 0,
			(left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1,
		]);
	}

	/**
	 * Generateas a look-at matrix with the given position, focal point and up axis
	 *
	 * @param position Position of the viewer
	 * @param target Point the viewer is looking at
	 * @param up Vec3 pointing up (normalized vector)
	 */
	public static lookAt(position: vec3, target: vec3, up: vec3): mat4 {
		let z0 = position.x - target.x;
		let z1 = position.y - target.y;
		let z2 = position.z - target.z;

		if (Math.abs(z0) < mat4.EPSILON &&
			Math.abs(z1) < mat4.EPSILON &&
			Math.abs(z2) < mat4.EPSILON) {
			return mat4.identity();
		}

		const zLength = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
		z0 *= zLength;
		z1 *= zLength;
		z2 *= zLength;

		let x0 = up.y * z2 - up.z * z1;
		let x1 = up.z * z0 - up.x * z2;
		let x2 = up.x * z1 - up.y * z0;
		let xLength = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
		if (!xLength) {
			x0 = 0;
			x1 = 0;
			x2 = 0;
		}
		else {
			xLength = 1 / xLength;
			x0 *= xLength;
			x1 *= xLength;
			x2 *= xLength;
		}

		let y0 = z1 * x2 - z2 * x1;
		let y1 = z2 * x0 - z0 * x2;
		let y2 = z0 * x1 - z1 * x0;
		let yLength = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
		if (!yLength) {
			y0 = 0;
			y1 = 0;
			y2 = 0;
		}
		else {
			yLength = 1 / yLength;
			y0 *= yLength;
			y1 *= yLength;
			y2 *= yLength;
		}

		const w0 = -(x0 * position.x + x1 * position.y + x2 * position.z);
		const w1 = -(y0 * position.x + y1 * position.y + y2 * position.z);
		const w2 = -(z0 * position.x + z1 * position.y + z2 * position.z);

		return new mat4([
			x0, y0, z0, 0,
			x1, y1, z1, 0,
			x2, y2, z2, 0,
			w0, w1, w2, 1,
		]);
	}
}
