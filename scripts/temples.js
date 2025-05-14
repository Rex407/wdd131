document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.warn('Element with ID "current-year" not found.');
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const day = String(lastModified.getDate()).padStart(2, '0');
        const month = String(lastModified.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = lastModified.getFullYear();
        const hours = String(lastModified.getHours()).padStart(2, '0');
        const minutes = String(lastModified.getMinutes()).padStart(2, '0');
        const seconds = String(lastModified.getSeconds()).padStart(2, '0');
        lastModifiedElement.textContent = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    } else {
        console.warn('Element with ID "last-modified" not found.');
    }

    // Hamburger menu toggle
    const menuButton = document.getElementById('menu');
    const navigation = document.querySelector('.nav-menu');
    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('active');
            menuButton.textContent = navigation.classList.contains('active') ? '✖' : '☰';
            menuButton.setAttribute('aria-expanded', navigation.classList.contains('active'));
        });
    } else {
        console.warn('Menu button or navigation element not found.', {
            menuButton: !!menuButton,
            navigation: !!navigation
        });
    }

    // Navigation filter functionality
    const figures = document.querySelectorAll('.temple-gallery figure');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (figures.length > 0 && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = link.getAttribute('data-filter');
                figures.forEach(figure => {
                    if (filter === 'all') {
                        figure.style.display = 'block';
                    } else {
                        const categories = figure.getAttribute('data-category')?.split(' ') || [];
                        figure.style.display = categories.includes(filter) ? 'block' : 'none';
                    }
                });
            });
        });
    } else {
        console.warn('Gallery figures or navigation links not found.', {
            figuresCount: figures.length,
            navLinksCount: navLinks.length
        });
    }
});