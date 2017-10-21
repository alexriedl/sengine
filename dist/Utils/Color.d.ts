import { vec4 } from '../Math';
export default class Color extends vec4 {
    constructor(r?: number, g?: number, b?: number, a?: number);
    static BLACK: Color;
    static WHITE: Color;
    static RED: Color;
    static GREEN: Color;
    static BLUE: Color;
    static YELLOW: Color;
    /**
     * Create a new color a percentage lighter than this color.
     * Parameter is a value between 0 and 1.
     *
     * NOTE: This is an extremely nieve way of doing a lighten. Do
     * not rely on this being perfect
     */
    lighten(percent: number): Color;
    /**
     * Create a new color a percentage darken than this color.
     * Parameter is a value between 0 and 1.
     *
     * NOTE: This is an extremely nieve way of doing a darken. Do
     * not rely on this being perfect
     */
    darken(percent: number): Color;
    /**
     * Assumes this color was specified as 0-255. Divides each componenet by 255
     */
    normalize(): Color;
}
