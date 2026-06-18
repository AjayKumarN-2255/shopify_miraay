document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');

    if (!banner) return;

    const track = banner.querySelector('.banner__track');
    const slides = banner.querySelectorAll('.banner__slide');

    const prevBtn = banner.querySelector('.banner__arrow--prev');
    const nextBtn = banner.querySelector('.banner__arrow--next');
    const dots = banner.querySelectorAll('.banner__dot');

    const autoplay = banner.dataset.autoplay === 'true';

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            currentIndex = Number(dot.dataset.slide);
            updateSlider();
        });
    });

    if (autoplay && totalSlides > 1) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }

    updateSlider();
});