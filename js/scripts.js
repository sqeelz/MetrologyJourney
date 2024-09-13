/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 



window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

document.querySelector(".about-btn").addEventListener("click", function(event) {
    event.preventDefault();

    let aboutsection = document.getElementById("about");
    let bodySelector = document.querySelector("body");

    if (aboutsection.style.display !== "none" && aboutsection.style.display !== "") {
        aboutsection.style.display = "none";
        bodySelector.style.backgroundColor = "#0d6efd";
    } else {
        aboutsection.style.display = "block";
        bodySelector.style.backgroundColor = "#dee2e6";
        // Scroll to the "About" section
        aboutsection.scrollIntoView({ behavior: "smooth" });
    }
});