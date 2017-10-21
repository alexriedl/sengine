var scalar;
(function (scalar) {
    function mod(n, m) {
        return ((n % m) + m) % m;
    }
    scalar.mod = mod;
})(scalar || (scalar = {}));
export default scalar;
//# sourceMappingURL=scalar.js.map