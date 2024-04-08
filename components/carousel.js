// const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
// const galleryControls = [{ name: 'previous', text: '<' }, { name: 'next', text: '>' }];
// const galleryItems = document.querySelectorAll(".gallery-item");


class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateGallery() {
    this.carouselArray.forEach((item) => {
      item.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
    })

    this.carouselArray.slice(0, 5).forEach((item, index) => {
      item.classList.add(`gallery-item-${index + 1}`);
    })
  }

  setCurrentState(direction) {
    if (direction.className === 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    }
    else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control.name}`;
      document.querySelector(`.gallery-controls-${control.name}`).innerText = control.text;
    })
  }
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      })
    })
  }
}

// const myCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

// myCarousel.setControls();
// myCarousel.useControls();

export default Carousel