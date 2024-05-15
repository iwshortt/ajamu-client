// ---------------------------------------------------------------
// nav
// ---------------------------------------------------------------
// opens / closes nav overlay when header 'menu' is clicked
const primaryNav = document.querySelector('.header-nav-cont');
const navToggle = document.querySelector('.nav-toggle');
const xMark = `
    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 18 18">
        <title>xmark</title>
        <g class="nc-icon-wrapper" fill="none" stroke="#212121" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke="#212121" d="M14 4L4 14"></path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4L14 14"></path>
        </g>
    </svg>
`;
const burgerMenu = `
    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 18 18">
        <title>minus</title>
        <g fill="#212121" class="nc-icon-wrapper">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" stroke="#212121" class="nc-icon-wrapper" d="M-3.25 3.5L17.75 3.5"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" stroke="#212121" class="nc-icon-wrapper" d="M3.25 9L17.75 9"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" stroke="#212121" class="nc-icon-wrapper" d="M-3.25 14.5L17.75 14.5"></path>
        </g>
    </svg>
`;
navToggle.addEventListener('click', (e) => {
    const visibility = primaryNav.getAttribute('data-visible');

    if (visibility === 'false') {
        primaryNav.setAttribute('data-visible', true);
        navToggle.innerHTML = xMark;
    } else if (visibility === 'true') {
        primaryNav.setAttribute('data-visible', false);
        navToggle.innerHTML = burgerMenu;
    }
});
// closes nav overlay when 'a' tag is clicked
const nav = document.querySelector('.header-nav');
nav.addEventListener('click', (e) => {
    const navLinks = document.querySelectorAll('nav a');
    for (let i = 0; i < navLinks.length; i++) {
        if (e.target === navLinks[i]) {
            primaryNav.setAttribute('data-visible', false);
            navToggle.innerHTML = burgerMenu;
        }
    }
});
// closes nav overlay when 'get in touch' or 'instagram' logo is clicked
const navContactBtn = document.querySelector('.menu-contact');
navContactBtn.addEventListener('click', (e) => {
    const menuBtn = document.querySelector('.menu-btn');
    const instaBtn = document.querySelector('.insta-logo');
    if (e.target === menuBtn || e.target === instaBtn) {
        primaryNav.setAttribute('data-visible', false);
        navToggle.innerHTML = burgerMenu;
    }
});

// ---------------------------------------------------------------
// hero image
// ---------------------------------------------------------------
// // ***NOTE*** consider changing the random image pattern to a loop
// function changeBg() {
//     const gradient = 'linear-gradient(rgb(104 98 98 / 50%),rgb(0 0 0 / 50%))'; // ***NOTE*** change gradient here NOT css
//     // ***NOTE*** change gradient here NOT css -- array containing the image path
//     const heroImages = [
//         'url("img/test-bride-groom.jpg")',
//         'url("img/test-bride-groom-2.jpg")',
//         'url("img/test-bride-groom-3.jpg")',
//         'url("img/test-bride-groom-4.jpg")',
//         'url("img/test-bride-groom-5.jpg")',
//         'url("img/test-bride-groom-6.jpg")',
//         'url("img/test-wedding-portfolio-2.jpg")',
//         'url("img/test-wedding-portfolio-11.jpg")',
//         'url("img/test-wedding-social-4.jpg")',
//     ];
//     const heroSection = document.querySelector('.hero-img');
//     if (heroSection) {
//         const randomBgImage = heroImages[Math.floor(Math.random() * heroImages.length)];
//         heroSection.style.backgroundImage = `${gradient}, ${randomBgImage}`; // template literals allow for the insertion of the 'gradient' and 'randomBgImage' into the DOM
//     };
    
// }

// setInterval(changeBg, 3000); // ***NOTE*** find the best time also, design so that if image is unavable it doesnt break

// function changeOpacity() {
//     const heroSection = document.querySelector('.hero-img');
//     heroSection.style.opacity = '1';
// }
// setInterval(changeOpacity, 2500);

// function changeOpacityBack() {
//     const heroSection = document.querySelector('.hero-img');
//     heroSection.style.opacity = '1';
// }
// setInterval(changeOpacityBack, 3000);

// ---------------------------------------------------------------
// intersection observer
// ---------------------------------------------------------------
// this function runs anytime the visibility of an observed element changes
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { // loop over each entry
        if (entry.isIntersecting) { // chack if the entry is intersecting the viewport
            entry.target.classList.add('show'); // if entry is intersecting the viewport add the show class to that entry to make it visible
        } else {
            entry.target.classList.remove('show'); // if the entry is no longer intersecting the viewport remove the show class from that entry
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden'); // grab all elements that have the hidden class in the html
hiddenElements.forEach((el) => observer.observe(el));

// ---------------------------------------------------------------
// porfolio image carousel
// ---------------------------------------------------------------
const track = document.querySelector('#carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('#carousel-btn-right');
    const prevBtn = document.querySelector('#carousel-btn-left');
    const carouselNav = document.querySelector('.portfolio-carousel-nav');
    const carouselDots = Array.from(carouselNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // arrange the slides next to one another
    // slides[0].style.left = slideWidth * 0 + 'px';
    // slides[1].style.left = slideWidth * 1 + 'px';
    // slides[2].style.left = slideWidth * 2 + 'px';
    // slides[3].style.left = slideWidth * 3 + 'px';
    // slides[4].style.left = slideWidth * 4 + 'px';

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        currentSlide.classList.add('scale-slide');
        targetSlide.classList.add('current-slide');
        targetSlide.classList.remove('scale-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        // update indicator dot to current slide
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
        if (targetIndex === 0) {
            prevBtn.classList.add('is-hidden');
            nextBtn.classList.remove('is-hidden');
        } else if (targetIndex === slides.length -1) {
            prevBtn.classList.remove('is-hidden');
            nextBtn.classList.add('is-hidden');
        } else {
            prevBtn.classList.remove('is-hidden');
            nextBtn.classList.remove('is-hidden');
        }
    };

    // wwhen i clock left, move slides to the left
    prevBtn.addEventListener('click', (e) => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = carouselNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide)
        // move to the previous slide
        moveToSlide(track, currentSlide, prevSlide);
        // update indicator dot to current slide
        updateDots(currentDot, prevDot);
        // hide / show arrows
        hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
    });


    // when i click right, move the lsides to the right

    nextBtn.addEventListener('click', (e) => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = carouselNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide)
        // move to the next slide
        moveToSlide(track, currentSlide, nextSlide);
        // update indicator dot to current slide
        updateDots(currentDot, nextDot);
        // hide / show arrows
        hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
    });

    // when i click the indicators, move to that slide

    carouselNav.addEventListener('click', (e) => {
        // what indicator was clicked
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = carouselNav.querySelector('.current-slide');
        const targetIndex = carouselDots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];
        // move to the next slide
        moveToSlide(track, currentSlide, targetSlide);
        // update indicator dot to current slide
        updateDots(currentDot, targetDot);
        // hide / show arrows
        hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
    });
}


// ---------------------------------------------------------------
// gallery lightbox
// ---------------------------------------------------------------
const clientNav = document.querySelectorAll('.portfolio-selections-cont');

if (clientNav) {
    const navLinks = document.querySelectorAll('.portfolio-selection');
    const activeLink = document.querySelector('.active');
    // activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center'}); // causes the page to scroll directly to the client nav on refresh or click of a link

    navLinks.forEach( function(link) {
        link.addEventListener('click', (event) => {
            navLinks.forEach( function(link) {
                link.classList.remove('active');
            });
            e.preventDefault(); /* stops the auto scroll to the top of the images in the gallery on click */
            link.classList.add('active');
            link.scrollIntoView({behavior: 'smooth', inline: 'center'});
        });
    });
};

// ---------------------------------------------------------------
// gallery nav
// ---------------------------------------------------------------
// access the portfolio nav and place in variable
const portfolioNav = document.querySelector('.portfolio-selections'); // selects all elements on the page with class '.portfolio-selections' ***NOTE*** add this class allows us to control the nav
const galleryImages = document.querySelectorAll('.gallery-img-cont'); // selects all of the containers holding the images

if (portfolioNav) {
    portfolioNav.addEventListener('click', (e) => {
        const target = e.target.closest('.portfolio-selection'); // selects the closest div within the nav ***NOTE*** the class in html gives the access
    
        if (!target) return;
    
        const activeCategory = document.querySelector('.active'); // selects the 'active' class
        const hiddenCategory = document.querySelector('.hidden-category'); // selects the 'hidden' divs with display 'none'
        const portfolioNavChildren = Array.from(portfolioNav.children); // creates an array from off the category selections so we can differentiate them by index
        const targetIndex = portfolioNavChildren.findIndex(child => child === target); // matches users click to the closest category index
    
        for (let i = 0; i < portfolioNavChildren.length; i++) { // loops through each category ***NOTE*** the number of category will match number of gallery img containers
            if (targetIndex === i) { // if user selection index matches the loop counter
                portfolioNavChildren[i].classList.add('active');
                galleryImages[i].classList.remove('hidden-category');
            } else { // if user selection index does not match the loop counter
                portfolioNavChildren[i].classList.remove('active');
                galleryImages[i].classList.add('hidden-category');
            }
        }
    });
}


// ---------------------------------------------------------------
// gallery lightbox
// ---------------------------------------------------------------
const galleryItem = document.getElementsByClassName('gallery-item');

// create element for lightbox
const lightBoxContainer = document.createElement('div');
// for basic area
const lightBoxContent = document.createElement('div');
// for images
const lightBoxImg = document.createElement('img');
// for prev button to change images
const lightBoxPrev = document.createElement('div');
// for next button
const lightBoxNext = document.createElement('div');

// create classlist

lightBoxContainer.classList.add('lightbox');
lightBoxContent.classList.add('lightbox-content');
lightBoxPrev.classList.add('fa', 'fa-angle-left', 'lightbox-prev');
lightBoxPrev.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 18 18" style="transform: rotate(-90deg)">
        <title>chevron up</title>
        <g fill="#212121" class="nc-icon-wrapper">
            <polyline points="2.75 11.5 9 5.25 15.25 11.5" fill="none" stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline>
        </g>
    </svg>
`;
lightBoxNext.classList.add('fa', 'fa-angle-right', 'lightbox-next');
lightBoxNext.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 18 18" style="transform: rotate(90deg)">
        <title>chevron up</title>
        <g fill="#212121" class="nc-icon-wrapper">
            <polyline points="2.75 11.5 9 5.25 15.25 11.5" fill="none" stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline>
        </g>
    </svg>
`;

lightBoxContainer.appendChild(lightBoxContent);
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
document.body.appendChild(lightBoxContainer);

let index = 1;

// create functions

function showLightBox(n) {
    if (n > galleryItem.length) {
        index = 1;
    } else if (n < 1) {
        index = galleryItem.length;
    }

    let imageLocation = galleryItem[index-1].children[0].getAttribute('src');
    lightBoxImg.setAttribute('src', imageLocation);
};

function currentImage() {
    lightBoxContainer.style.display = 'flex';

    let imageIndex = parseInt(this.getAttribute('data-index'));
    showLightBox(index = imageIndex);
};

for (let i = 0; i < galleryItem.length; i++) {
    galleryItem[i].addEventListener('click', currentImage);
};

function sliderImage(n) {
    showLightBox(index += n);
};

function prevImage() {
    sliderImage(-1);
};

function nextImage() {
    sliderImage(1);
};

lightBoxPrev.addEventListener('click', prevImage);
lightBoxNext.addEventListener('click', nextImage);

// close lightbox

function closeLightBox() {
    if (this === event.target) {
        lightBoxContainer.style.display = 'none';
    };
};

lightBoxContainer.addEventListener('click', closeLightBox);

// ---------------------------------------------------------------
// view more button
// ---------------------------------------------------------------
const viewMoreBtn = document.querySelector('#view-more');
if (viewMoreBtn) {
    let currentItem = 3;

    viewMoreBtn.onclick = () => {
        let boxes = [...document.querySelectorAll('.featured-highlight')];
        for (let i = currentItem; i < currentItem + 3; i++) {
            boxes[i].style.display = 'flex';
        }
        currentItem += 3;

        if (currentItem >= boxes.length) {
            viewMoreBtn.style.display = 'none';
        }
    }
}
