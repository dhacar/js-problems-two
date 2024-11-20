
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector("#addButton");
    const removeButton = document.querySelector("#removeButton");
    const list = document.querySelector("#list");

    addButton.addEventListener("click", () => {
        const newItem = document.createElement("li");
        newItem.textContent = "New Item";
        list.appendChild(newItem);
    });

    removeButton.addEventListener("click", () => {
        if (list.lastChild) list.removeChild(list.lastChild);
    });
});
