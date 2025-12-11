// Fibonacci function (CPU heavy)
function fib(n) {
    if(n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

process.on("message", (msg) => {
    const result = fib(msg.number);
    process.send({ result });
})