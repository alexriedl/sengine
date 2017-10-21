import { vec4 } from '../Math';
export default class Color extends vec4 {
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
//# sourceMappingURL=Color.js.map