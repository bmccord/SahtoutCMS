
        // Removed: a duplicate tab handler that could never run. It bound to
        // '.tab' and '#tab-content'; the markup uses '.tab-btn' and '#panel-*',
        // so neither selector matched. It also hardcoded a placeholder bug
        // tracker URL and a 'news' branch with untranslatable English copy.
        // The working handler is inline in index.php.

        // Slider Functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${-index * 100}%)`;
                dots[i].classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        document.querySelector('.slider-nav.prev').addEventListener('click', () => {
            showSlide((currentSlide - 1 + totalSlides) % totalSlides);
        });

        document.querySelector('.slider-nav.next').addEventListener('click', () => {
            showSlide((currentSlide + 1) % totalSlides);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                showSlide(parseInt(dot.getAttribute('data-slide')));
            });
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            showSlide((currentSlide + 1) % totalSlides);
        }, 5000);