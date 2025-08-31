let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const caption = document.querySelector('.caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const addPhotosBtn = document.getElementById('addPhotosBtn');
const fileInput = document.getElementById('fileInput');

function getGalleryItems() {
    return document.querySelectorAll('.gallery-item');
}

function openLightbox() {
    const items = getGalleryItems();
    const item = items[currentIndex];
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

function attachClickListeners() {
    const items = getGalleryItems();
    items.forEach((item, index) => {
        if (!item.dataset.listenerAttached) {
            item.addEventListener('click', () => {
                currentIndex = index;
                openLightbox();
            });
            item.dataset.listenerAttached = "true";
        }
    });
}

attachClickListeners();

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

prevBtn.addEventListener('click', () => {
    const items = getGalleryItems();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox();
});

nextBtn.addEventListener('click', () => {
    const items = getGalleryItems();
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox();
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        const items = getGalleryItems();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            openLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % items.length;
            openLightbox();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

addPhotosBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const figure = document.createElement('figure');
            figure.classList.add('gallery-item');
            figure.setAttribute('data-category', 'new');
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = file.name;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            document.querySelector('.gallery').appendChild(figure);
            attachClickListeners();
        };
        reader.readAsDataURL(file);
    });
    fileInput.value = '';
});
