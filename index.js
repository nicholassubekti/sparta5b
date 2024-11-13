function blurHeader() {
    const header = document.getElementById('header')
    if (window.scrollY >= 50) {
        header.classList.add('blur-header');
    } else {
        header.classList.remove('blur-header');
    }
}
window.addEventListener('scroll', blurHeader)

// Initialize all interactions
document.addEventListener('DOMContentLoaded', () => {
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    let isScrolling = false;
    let currentActiveLink = null;

    // Determine if we're on about page
    const isAboutPage = window.location.pathname.includes('about.html');
    const defaultSection = isAboutPage ? 'about' : 'home';

    // Set initial active state
    function setInitialActive() {
        const defaultLink = document.querySelector(`a[href="#${defaultSection}"]`);
        if (defaultLink) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            defaultLink.classList.add('active-link');
            currentActiveLink = defaultLink;
        }
    }

    // Handle scroll active state
    function handleScroll() {
        if (isScrolling) return;

        const scrollY = window.pageYOffset;
        let foundActiveSection = false;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active-link'));
                    correspondingLink.classList.add('active-link');
                    currentActiveLink = correspondingLink;
                    foundActiveSection = true;
                }
            }
        });

        // If at the top of the page or no active section
        if (!foundActiveSection && scrollY < 100) {
            setInitialActive();
        }
    }

    // Handle click events
    function handleClick(e) {
        e.preventDefault();
        isScrolling = true;

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active-link'));
            
            // Add active class to clicked link
            this.classList.add('active-link');
            currentActiveLink = this;

            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Add click event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', handleClick);
    });

    // Handle scroll up button
    const scrollUp = document.getElementById('scroll-up');
    if (scrollUp) {
        scrollUp.addEventListener('click', (e) => {
            e.preventDefault();
            isScrolling = true;

            // Get the target section based on the page
            const targetSection = document.getElementById(defaultSection);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active state
                navLinks.forEach(link => link.classList.remove('active-link'));
                setInitialActive();
            }

            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        });
    }

    // Show/hide scroll up button
    function toggleScrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) {
            if (window.scrollY >= 350) {
                scrollUp.classList.add('show-scroll');
            } else {
                scrollUp.classList.remove('show-scroll');
            }
        }
    }

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        toggleScrollUp();
    });

    // Set initial states
    setInitialActive();
    handleScroll();
    toggleScrollUp();

    // Handle page load with hash
    if (window.location.hash) {
        const targetLink = document.querySelector(`a[href="${window.location.hash}"]`);
        if (targetLink) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            targetLink.classList.add('active-link');
            currentActiveLink = targetLink;
        }
    }
});

// ScrollReveal animations

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initializeSlideshow()
    window.addEventListener('scroll', blurHeader)
    window.addEventListener('scroll', activeLink)
    window.addEventListener('scroll', scrollUp)
    
    // Initialize ScrollReveal animations
    sr.reveal('.home__data', {})
    sr.reveal('.home__title', { delay: 500 })
    sr.reveal('.home__description', { delay: 600 })
    sr.reveal('.home__button', { delay: 700 })
    // ... Additional reveal animations ...
})

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slideshow__img');  // Use correct class selector
    let currentImageIndex = 0;
    
    // Function to switch images
    function switchImage() {
        // Remove active class from all images
        images.forEach(img => img.classList.remove('active'));
        
        // Add active class to the next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }
    
    // Make sure the first image is visible
    images[0].classList.add('active');
    
    // Set interval for switching images
    setInterval(switchImage, 5000); // Change image every 5 seconds
});

document.addEventListener('DOMContentLoaded', function() {
    // View buttons handler
    const viewButtons = document.querySelectorAll('.itinerary__view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = `${this.dataset.modal}-modal`;
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            modal.show();
        });
    });

    // Modal handlers
    const modals = document.querySelectorAll('.itinerary__modal');
    
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            document.body.style.overflow = 'hidden';
        });

        modal.addEventListener('hidden.bs.modal', function() {
            document.body.style.overflow = '';
        });
    });

    // Optional: ScrollReveal animations
    if (window.sr) {
        sr.reveal('.itinerary__card', {
            duration: 2000,
            origin: 'bottom',
            distance: '30px',
            interval: 100
        });
    }
});


// Experience Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience__card');
    
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-target');
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            modal.show();
        });
    });

    // Add animation when any experience modal opens
    const experienceModals = document.querySelectorAll('.modal');
    experienceModals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function () {
            const modalImages = this.querySelectorAll('img');
            modalImages.forEach((img, index) => {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                }, 100 * (index + 1));
            });
        });
    });
});

class GallerySlider {
    constructor() {
        this.slider = document.querySelector('.gallery__slider')
        this.track = document.querySelector('.gallery__track')
        this.items = document.querySelectorAll('.gallery__item')
        this.prevButton = document.querySelector('.gallery__nav--prev')
        this.nextButton = document.querySelector('.gallery__nav--next')

        if (!this.track || this.items.length === 0) return

        this.isDragging = false
        this.startPos = 0
        this.currentTranslate = 0
        this.prevTranslate = 0
        this.animationID = 0
        this.itemWidth = 324 // 300px item width + 24px gap
        this.originalItemCount = this.items.length

        this.init()
    }

    init() {
        // Clone items banyak kali untuk memastikan infinite scroll
        this.setupInfiniteScroll()
        this.addEventListeners()
        this.startAutoSlide()
    }

    setupInfiniteScroll() {
        // Clone items sebanyak 10 kali
        for (let i = 0; i < 10; i++) {
            this.items.forEach(item => {
                const clone = item.cloneNode(true)
                this.track.appendChild(clone)
            })
        }
    }

    addEventListeners() {
        this.track.addEventListener('touchstart', this.touchStart.bind(this))
        this.track.addEventListener('touchmove', this.touchMove.bind(this))
        this.track.addEventListener('touchend', this.touchEnd.bind(this))

        this.track.addEventListener('mousedown', this.touchStart.bind(this))
        this.track.addEventListener('mousemove', this.touchMove.bind(this))
        this.track.addEventListener('mouseup', this.touchEnd.bind(this))
        this.track.addEventListener('mouseleave', this.touchEnd.bind(this))

        this.nextButton?.addEventListener('click', () => this.slide('next'))
        this.prevButton?.addEventListener('click', () => this.slide('prev'))

        this.track.addEventListener('contextmenu', e => e.preventDefault())

        // Monitor transformasi untuk reset posisi jika diperlukan
        this.track.addEventListener('transitionend', () => this.checkPosition())
    }

    checkPosition() {
        if (!this.track) return

        // Jika sudah di pertengahan, reset ke awal tanpa transisi
        const currentPos = Math.abs(this.currentTranslate)
        const midPoint = (this.track.children.length * this.itemWidth) / 2

        if (currentPos > midPoint) {
            this.track.style.transition = 'none'
            this.currentTranslate = 0
            this.prevTranslate = 0
            this.setSliderPosition()
            
            // Force reflow
            this.track.offsetHeight

            // Kembalikan transisi
            this.track.style.transition = 'transform 0.5s ease'
        }
    }

    touchStart(event) {
        this.isDragging = true
        this.startPos = this.getPositionX(event)
        this.animationID = requestAnimationFrame(this.animation.bind(this))
        this.track.style.cursor = 'grabbing'
        this.track.style.transition = 'none'
    }

    touchMove(event) {
        if (!this.isDragging) return
        
        const currentPosition = this.getPositionX(event)
        const diff = currentPosition - this.startPos
        this.currentTranslate = this.prevTranslate + diff
    }

    touchEnd() {
        this.isDragging = false
        cancelAnimationFrame(this.animationID)
        this.track.style.cursor = 'grab'
        this.track.style.transition = 'transform 0.5s ease'

        const movedBy = this.currentTranslate - this.prevTranslate
        
        if (Math.abs(movedBy) > 100) {
            if (movedBy < 0) {
                this.slide('next')
            } else {
                this.slide('prev')
            }
        } else {
            this.currentTranslate = this.prevTranslate
            this.setSliderPosition()
        }
    }

    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }

    animation() {
        this.setSliderPosition()
        if (this.isDragging) {
            requestAnimationFrame(this.animation.bind(this))
        }
    }

    setSliderPosition() {
        if (!this.track) return
        this.track.style.transform = `translateX(${this.currentTranslate}px)`
    }

    slide(direction) {
        if (direction === 'next') {
            this.currentTranslate -= this.itemWidth
        } else {
            this.currentTranslate += this.itemWidth
        }
        
        this.prevTranslate = this.currentTranslate
        this.setSliderPosition()
        this.checkPosition()
    }

    startAutoSlide() {
        setInterval(() => {
            if (!this.isDragging) {
                this.slide('next')
            }
        }, 3000)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GallerySlider()
})

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    if(this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll')
    } else {
        scrollUp.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)

// Initialize ScrollReveal
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

/*=============== HOME ===============*/

// Reveal home content 
sr.reveal('.home__content', { 
    delay: 300,
    origin: 'left',
    distance: '40px',
});

// Reveal home subtitle
sr.reveal('.home__subtitle', { 
    delay: 500,
    origin: 'left',
    distance: '40px',
});

// Reveal home title
sr.reveal('.home__title', { 
    delay: 600,
    origin: 'left',
    distance: '40px',
});

// Reveal home description
sr.reveal('.home__description', { 
    delay: 700,
    origin: 'left',
    distance: '40px',
});

// Reveal home button 
sr.reveal('.home__button', { 
    delay: 800,
    origin: 'left',
    distance: '40px',
    scale: 0.9,
    easing: 'ease-in-out',
    mobile: true,
    reset: true,
    interval: 100,
});

// Optional: Reveal slideshow images
sr.reveal('.slideshow__img', { 
    delay: 100,
    origin: 'top',
    distance: '0px',
    scale: 1.1,
    duration: 2000,
    easing: 'ease-out'
});

/*=============== ITINERARY ===============*/
sr.reveal('.itinerary.section .section__title', { 
    delay: 200,
    distance: '30px',
    origin: 'top' 
});

// Reveal each day title
sr.reveal('.itinerary__day-title', {
    delay: 300,
    distance: '30px',
    origin: 'top'
});

// Reveal each card group
sr.reveal('.itinerary__group', {
    delay: 400,
    distance: '40px',
    origin: 'bottom',
    interval: 200
});

// Reveal individual cards within each group
sr.reveal('.itinerary__content', {
    delay: 200,
    distance: '30px',
    origin: 'bottom',
    interval: 100,
});

// Reveal card images
sr.reveal('.itinerary__image-container', {
    delay: 300,
    distance: '30px',
    interval: 100,
});

// Reveal card locations
sr.reveal('.itinerary__location', {
    delay: 400,
    distance: '20px',
    origin: 'bottom',
    interval: 100
});

// Reveal view details buttons
sr.reveal('.itinerary__view', {
    delay: 500,
    distance: '20px',
    origin: 'bottom',
    interval: 100
});


/*=============== PRICE LIST ===============*/
sr.reveal('.price__table-container', {
    delay: 300,
    distance: '40px',
    origin: 'bottom'
});

sr.reveal('.cost__includes', {
    origin: 'left',
    delay: 500,
    distance: '40px'
});

sr.reveal('.cost__not__includes', {
    origin: 'right',
    delay: 500,
    distance: '40px'
});

sr.reveal('.hotel__section', { delay: 200 });
sr.reveal('.hotel__group', { 
    delay: 400,
    interval: 100,
    distance: '30px',
    origin: 'bottom'
});

sr.reveal('.hotel__card', {
    delay: 300,
    interval: 100,
    distance: '30px',
    origin: 'bottom'
});

/*=============== EXPERIENCES ===============*/
sr.reveal('.experience__card', {
    delay: 300,
    interval: 200,
    distance: '30px',
    origin: 'bottom',
    scale: 0.95
});


/*=============== GALLERY ===============*/
sr.reveal('.gallery__container', {
    delay: 400,
    distance: '40px',
    origin: 'bottom'
});

sr.reveal('.gallery__slider', {
    delay: 500,
    distance: '40px',
    origin: 'bottom'
});

sr.reveal('.gallery__item', {
    delay: 300,
    interval: 100,
    distance: '30px',
    origin: 'bottom'
});

sr.reveal('.gallery__nav', {
    delay: 600,
    distance: '20px',
    origin: 'bottom',
    interval: 100
});

/*=============== JOIN SECTION ===============*/
sr.reveal('.join__image', {
    origin: 'left',
    delay: 400,
    distance: '40px'
});

sr.reveal('.join__data', {
    origin: 'right',
    delay: 500,
    distance: '40px'
});

sr.reveal('.join__description', {
    delay: 600,
    distance: '30px'
});

sr.reveal('.join__form', {
    delay: 700,
    distance: '30px',
    origin: 'bottom'
});

/*=============== ABOUT PAGE ===============*/
sr.reveal('.about__image', {
    origin: 'left',
    delay: 400,
    distance: '40px'
});

sr.reveal('.about__content', {
    origin: 'right',
    delay: 500,
    distance: '40px'
});

sr.reveal('.about__subtitle', {
    delay: 600,
    distance: '30px'
});

sr.reveal('.about__description', {
    delay: 700,
    distance: '30px'
});

sr.reveal('.about__stats-card', {
    delay: 800,
    interval: 100,
    distance: '30px',
    origin: 'bottom',
    scale: 0.95
});

/*=============== CONTACT SECTION ===============*/
sr.reveal('.contact__info', {
    origin: 'left',
    delay: 400,
    distance: '40px'
});

sr.reveal('.contact__form', {
    origin: 'right',
    delay: 500,
    distance: '40px'
});

sr.reveal('.contact__item', {
    delay: 600,
    interval: 100,
    distance: '30px'
});

/*=============== FOOTER ===============*/

sr.reveal('.footer__description', {
    delay: 400,
    distance: '30px'
});

sr.reveal('.footer__links', {
    delay: 500,
    interval: 100,
    distance: '30px',
    origin: 'bottom'
});

sr.reveal('.footer__social', {
    delay: 600,
    interval: 100,
    distance: '20px',
    origin: 'bottom'
});

sr.reveal('.footer__copy', {
    delay: 700,
    distance: '20px',
    origin: 'bottom'
});

/*=============== SCROLL UP ===============*/
sr.reveal('.scrollup', {
    delay: 300,
    origin: 'bottom',
    distance: '20px'
});