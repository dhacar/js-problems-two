
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#changeTextButton");
    const text = document.querySelector("#textToChange");

    button.addEventListener("click", () => {
        text.innerHTML = "Text and content changed!";
    });
});
