
async function delayedAsync() {
    try {
        const message = await new Promise((resolve, reject) => {
            setTimeout(() => resolve("Success after 2 seconds!"), 2000);
        });
        console.log(message);
    } catch (error) {
        console.error(error);
    }
}
delayedAsync();
