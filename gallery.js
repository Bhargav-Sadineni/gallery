
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const caption = document.querySelector('.caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;


galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const figcaption = item.querySelector('figcaption');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = figcaption.textContent;

    lightbox.style.display = 'flex';
}


function closeLightbox() {
    lightbox.style.display = 'none';
}

closeBtn.addEventListener('click', closeLightbox);


lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});


prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox();
});


document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            openLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            openLightbox();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});
const addPhotosBtn = document.getElementById('addPhotosBtn');
const fileInput = document.getElementById('fileInput');

addPhotosBtn.addEventListener('click', () => {
    fileInput.click(); // open file chooser
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = (e) => {
            // Create new figure element
            const figure = document.createElement('figure');
            figure.classList.add('gallery-item');
            figure.setAttribute('data-category', 'new'); // optional category

            // Create image element
            const img = document.createElement('img');
            img.src = e.target.result; // base64 image
            img.alt = file.name;

            // Create figcaption
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = file.name;

            // Append img and caption to figure
            figure.appendChild(img);
            figure.appendChild(figcaption);

            // Append figure to gallery
            document.querySelector('.gallery').appendChild(figure);

            // Add click listener for lightbox
            figure.addEventListener('click', () => {
                currentIndex = Array.from(document.querySelectorAll('.gallery-item')).indexOf(figure);
                openLightbox();
            });
        };

        reader.readAsDataURL(file);
    });

    // Reset input
    fileInput.value = '';
});


