document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('showing');
    });
});

async function fetchContent() {
    const response = await fetch('/api/content');
    const contents = await response.json();
    const featuresSection = document.getElementById('features');

    contents.forEach(content => {
        const featureDiv = document.createElement('div');
        featureDiv.className = 'feature';
        featureDiv.innerHTML = `
            <h3>${content.title}</h3>
            <p>${content.content}</p>
            <small>${content.category}</small>
        `;
        featuresSection.appendChild(featureDiv);
    });
}

window.onload = fetchContent;
