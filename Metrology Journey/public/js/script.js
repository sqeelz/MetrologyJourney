document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navUl = document.querySelector("header nav ul");

    menuToggle.addEventListener("click", function() {
        navUl.classList.toggle("showing");
    });

    const menuItems = document.querySelectorAll("header nav ul li");
    menuItems.forEach(function(item) {
        item.addEventListener("mouseenter", function() {
            this.style.backgroundColor = "#b23838";
        });

        item.addEventListener("mouseleave", function() {
            this.style.backgroundColor = "transparent";
        });

        item.addEventListener("click", function() {
            this.style.backgroundColor = "#8c2b2b";
            setTimeout(() => {
                this.style.backgroundColor = "transparent";
            }, 300);
        });
    });
});
