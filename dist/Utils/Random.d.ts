export default class Random {
    private seed;
    private MAX;
    /**
     * Creates a pseudo-random value generator. The seed must be an integer.
     *
     * Uses an optimized version of the Park-Miller PRNG.
     * http://www.firstpr.com.au/dsp/rand31/
     */
    constructor(seed?: number);
    next(): number;
    /**
     * Returns a positive int (0 - 32^2-2)
     */
    nextInt(): number;
    /**
     * Returns a float between 0 and 1
     */
    nextFloat(): number;
    /**
     * Returns a float between 'start' and 'end'
     */
    nextRangeFloat(start: number, end: number): number;
    /**
     * Returns an int between 'start' and 'end'. [start...end)
     */
    nextRangeInt(start: number, end: number): number;
    /**
     * Returns a random element from an array
     */
    choice<T>(array: T[]): T;
}
