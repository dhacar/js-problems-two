
document.addEventListener("DOMContentLoaded", () => {
    const colorPicker = document.querySelector("#colorPicker");
    const preview = document.querySelector("#colorPreview");
    const historyList = document.querySelector("#colorHistory");
    const clearButton = document.querySelector("#clearHistoryButton");

    colorPicker.addEventListener("input", () => {
        const color = colorPicker.value;
        preview.style.backgroundColor = color;
        const historyItem = document.createElement("li");
        historyItem.textContent = color;
        historyItem.style.color = color;
        historyList.appendChild(historyItem);
    });

    clearButton.addEventListener("click", () => {
        historyList.innerHTML = "";
    });
});
