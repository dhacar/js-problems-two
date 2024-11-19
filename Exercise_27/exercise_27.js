
function delayedPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Success after 2 seconds!"), 2000);
    });
}

delayedPromise()
    .then((message) => console.log(message))
    .catch((error) => console.error(error));
