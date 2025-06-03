document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded. Starting temple display setup.');

    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
            alt: "Aba Nigeria Temple"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
            alt: "Manti Utah Temple"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x250/payson-utah-temple-exterior-1416671-wallpaper.jpg",
            alt: "Payson Utah Temple"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo-guam-temple-2.jpg",
            alt: "Yigo Guam Temple"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington-dc-temple-exterior-2.jpeg",
            alt: "Washington D.C. Temple"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-1075606-wallpaper.jpg",
            alt: "Lima Perú Temple"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
            alt: "Mexico City Mexico Temple"
        },
        {
            templeName: "Rome Italy",
            location: "Rome, Italy",
            dedicated: "2019, March, 10",
            area: 41000,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-2160929.jpg",
            alt: "Rome Italy Temple"
        },
        {
            templeName: "Provo Utah",
            location: "Provo, Utah, United States",
            dedicated: "1972, February, 9",
            area: 130825,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-utah/400x250/provo-utah-temple-exterior-1056877-wallpaper.jpg",
            alt: "Provo Utah Temple"
        },
        {
            templeName: "Cedar City Utah",
            location: "Cedar City, Utah, United States",
            dedicated: "2017, December, 10",
            area: 42655,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cedar-city-utah/400x250/cedar-city-utah-temple-exterior-1996865-wallpaper.jpg",
            alt: "Cedar City Utah Temple"
        }
    ];

    // Function to parse dedicated date string (e.g., "2005, August, 7")
    function parseDedicatedDate(dateString) {
        try {
            const [year, month, day] = dateString.split(', ').map(str => str.trim());
            return new Date(`${month} ${day}, ${year}`);
        } catch (error) {
            console.error(`Error parsing date ${dateString}:`, error);
            return new Date();
        }
    }

    // Function to display temples
    function displayTemples(templeList) {
        const grid = document.getElementById('temple-grid');
        if (!grid) {
            console.error('Error: #temple-grid not found. Check HTML.');
            document.body.innerHTML = '<p>Error: Temple grid container not found.</p>';
            return;
        }
        grid.innerHTML = '';
        console.log(`Rendering ${templeList.length} temples`);

        templeList.forEach(temple => {
            const card = document.createElement('div');
            card.className = 'temple-card';
            card.innerHTML = `
                <h2>${temple.templeName}</h2>
                <p>Location: ${temple.location}</p>
                <p>Dedicated: ${parseDedicatedDate(temple.dedicated).toLocaleDateString()}</p>
                <p>Area: ${temple.area.toLocaleString()} sq ft</p>
                <img src="${temple.imageUrl}" alt="${temple.alt}" loading="lazy" onerror="this.classList.add('error'); this.src='https://placehold.co/400x250?text=${encodeURIComponent(temple.templeName)}';">
            `;
            grid.appendChild(card);
        });
    }

    // Function to filter temples
    function filterTemples(filter) {
        console.log(`Applying filter: ${filter}`);
        let filteredTemples = temples;
        switch (filter) {
            case 'old':
                filteredTemples = temples.filter(temple => parseDedicatedDate(temple.dedicated).getFullYear() < 1900);
                break;
            case 'new':
                filteredTemples = temples.filter(temple => parseDedicatedDate(temple.dedicated).getFullYear() > 2000);
                break;
            case 'large':
                filteredTemples = temples.filter(temple => temple.area > 90000);
                break;
            case 'small':
                filteredTemples = temples.filter(temple => temple.area < 10000);
                break;
            case 'home':
            default:
                filteredTemples = temples;
        }
        console.log(`Filtered to ${filteredTemples.length} temples`);
        displayTemples(filteredTemples);

        // Close the hamburger menu after a filter is applied (on mobile)
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    // Setup hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    } else {
        console.error('Error: Hamburger or nav-links not found.');
    }

    // Setup navigation event listeners
    const links = document.querySelectorAll('.nav-links a');
    if (!links.length) {
        console.error('Error: No navigation links found.');
        document.body.innerHTML = '<p>Error: Navigation links not found.</p>';
        return;
    }
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;
            if (!filter) {
                console.error('Error: data-filter missing on link:', e.target);
                return;
            }
            console.log(`Nav clicked: ${filter}`);
            filterTemples(filter);
        });
    });

    // Update footer
    const copyrightYear = document.getElementById('copyright-year');
    const lastModified = document.getElementById('last-modified');
    if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();
    if (lastModified) lastModified.textContent = document.lastModified;

    // Initial display
    console.log('Initial display of all temples');
    displayTemples(temples);

    // Test image URLs
    console.log('Testing image URLs:');
    temples.forEach(temple => {
        const img = new Image();
        img.src = temple.imageUrl;
        img.onload = () => console.log(`Image loaded: ${temple.templeName}`);
        img.onerror = () => console.error(`Image failed: ${temple.templeName} (${temple.imageUrl})`);
    });
});