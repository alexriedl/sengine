export default class Random {
    /**
     * Creates a pseudo-random value generator. The seed must be an integer.
     *
     * Uses an optimized version of the Park-Miller PRNG.
     * http://www.firstpr.com.au/dsp/rand31/
     */
    constructor(seed) {
        this.MAX = 2147483647;
        this.seed = seed ? seed : Math.floor(Math.random() * (this.MAX - 1));
        if (this.seed <= 0)
            this.seed *= -1;
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
        return start + (randomUnder1 * rangeSize);
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
//# sourceMappingURL=Random.js.map