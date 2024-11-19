
function changeImage() {
    const image = document.querySelector("#image");
    const url = prompt("Enter image URL:");
    const borderColor = prompt("Enter border color:");
    const width = prompt("Enter width in pixels:");
    const height = prompt("Enter height in pixels:");
    const borderRadius = prompt("Enter border radius in pixels:");

    image.src = url;
    image.style.border = `2px solid ${borderColor}`;
    image.style.width = `${width}px`;
    image.style.height = `${height}px`;
    image.style.borderRadius = `${borderRadius}px`;
}
