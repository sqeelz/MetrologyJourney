document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navUl = document.querySelector("header nav ul");

    menuToggle.addEventListener("click", function() {
        navUl.classList.toggle("open");
    });
});

