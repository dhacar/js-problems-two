const toggleButton = document.querySelector(".toggle-button")
const navbar = document.querySelector(".navbar");
toggleButton.addEventListener("click", function(){
    navbar.classList.toggle("active")
})