
// Blocking function
function delayBlocking() {
    const start = Date.now();
    while (Date.now() - start < 2000) {}
    return "2 seconds delay completed.";
}
console.log(delayBlocking());

// Non-blocking function
function delayNonBlocking() {
    setTimeout(() => console.log("2 seconds delay completed."), 2000);
}
delayNonBlocking();
