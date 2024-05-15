
// ---------------------------------------------------------------
// gallery lightbox
// ---------------------------------------------------------------
const clientNav = document.querySelectorAll('.gallery-nav-controls');

if (clientNav) {
    const navLinks = document.querySelectorAll('.client-gallery-selection');
    const activeLink = document.querySelector('.active');
    // activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center'}); // causes the page to scroll directly to the client nav on refresh or click of a link

    navLinks.forEach( function(link) {
        link.addEventListener('click', (event) => {
            navLinks.forEach( function(link) {
                link.classList.remove('active');
            });
            event.preventDefault(); /* stops the auto scroll to the top of the images in the gallery on click */
            link.classList.add('active');
            link.scrollIntoView({behavior: 'smooth', inline: 'center'});
        });
    });
};

// ---------------------------------------------------------------
// gallery lightbox
// ---------------------------------------------------------------
// access the portfolio nav and place in variable
const galleryNav = document.querySelector('.client-gallery-selections'); // selects all elements on the page with class '.portfolio-selections' ***NOTE*** add this class allows us to control the nav
const galleryImages = document.querySelectorAll('.client-photo-gallery'); // selects all of the containers holding the images

galleryNav.addEventListener('click', (e) => {
    const target = e.target.closest('.client-gallery-selection'); // selects the closest div within the nav ***NOTE*** the class in html gives the access

    if (!target) return;

    const activeCategory = document.querySelector('.active'); // selects the 'active' class
    const hiddenCategory = document.querySelector('.hide-item'); // selects the 'hidden' divs with display 'none'
    const galleryNavChildren = Array.from(galleryNav.children); // creates an array from off the category selections so we can differentiate them by index
    const targetIndex = galleryNavChildren.findIndex(child => child === target); // matches users click to the closest category index

    for (let i = 0; i < galleryNavChildren.length; i++) { // loops through each category ***NOTE*** the number of category will match number of gallery img containers
        if (targetIndex === i) { // if user selection index matches the loop counter
            galleryNavChildren[i].classList.add('active');
            galleryImages[i].classList.remove('hide-item');
        } else { // if user selection index does not match the loop counter
            galleryNavChildren[i].classList.remove('active');
            galleryImages[i].classList.add('hide-item');
        }
    }
});

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
// client nav dropdown menu
// ---------------------------------------------------------------
const selectField = document.querySelector('.select-field');
const options = document.getElementsByClassName('client-nav-list-item');
const list = document.querySelector('.client-gallery-nav');

if (selectField) {
    selectField.onclick = function() {
        list.classList.toggle('hide-item');
    }
}