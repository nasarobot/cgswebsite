import Carousel from './components/carousel'
import { populateGames } from './components/games'

const wrapper = document.querySelectorAll(".wrapper")
const sideNavButtons = document.querySelectorAll(".side-nav-button")
const closeButtons = document.querySelectorAll(".close-button")
const Main = document.querySelector('#Main')
// const array_ = ['about-us', 'what-we-do', 'our-games', 'our-graphics', 'blog']
// draggable
wrapper.forEach(item => {
  item.children[0].addEventListener("mousedown", () => {
    // e.preventDefault();
    item.children[0].classList.add("active");
    push_(item.children[0])
  });
})

document.addEventListener("mouseup", () => {
  let activeWrapper = Main.querySelector('.active');
  push_(activeWrapper)
  if (activeWrapper) {
    activeWrapper.classList.remove("active");
  }
});

sideNavButtons.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    wrapper.forEach(item1 => {
      if (item1.classList.contains(item.classList[1])) {
        item1.classList.remove('hidden')
        Main.querySelectorAll('.active').forEach(item => {
          item.classList.remove('active')
        })
        item1.children[0].classList.add('active')
        push_(item1.children[0])
      }
    })
  })
})

closeButtons.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    item.parentElement.parentElement.classList.add('hidden')
    array_.pop()
    console.log(array_)
    display_z_index()
  })
})



//Stack implementation
var array_ = []

const push_ = (activeHeader) => {
  console.log(activeHeader)
  if (activeHeader) {
    let active = activeHeader.parentElement.classList[1]
    if (array_.includes(active)) {
      let i = array_.length - 1; let l = i;
      let temp_arr = []
      for (; i >= 0; i--) {
        if (array_[i] === active)
          break;
        temp_arr.push(array_[i]);
        array_.pop();
      }
      array_.pop()

      let j = l - i - 1
      for (; j >= 0; j--) {
        array_.push(temp_arr[j])
        temp_arr.pop()
      }
      array_.push(active);
    }
    else {
      array_.push(active)
    }
    display_z_index()
    console.log(array_)
  }
  return;
}

function display_z_index() {
  if (array_.length) {
    for (let i = 0; i < array_.length; i++) {
      for (let j = 0; j < wrapper.length; j++) {
        if (wrapper[j].classList[1] === array_[i]) {
          wrapper[j].style.zIndex = i + 2;
          break;
        }
      }
    }
  }
  return;
}

import { gsap } from "gsap/dist/gsap";

import { Draggable } from "gsap/dist/Draggable";


gsap.registerPlugin(Draggable);

const draggables = document.querySelectorAll(".draggable");
for (let i = 0; i < draggables.length; i++) {
  Draggable.create(`#${draggables[i].classList[1]}`, {
    bounds: "#outer-container",
  })
}

populateGames('./components/games.json').then(() => {
  const galleryContainer = document.querySelector(".gallery-container");
  // const galleryControlsContainer = document.querySelector(".gallery-controls");
  const galleryControls = [{ name: 'previous', text: '<' }, { name: 'next', text: '>' }];
  const galleryItems = document.querySelectorAll(".gallery-item");

  const myCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

  myCarousel.setControls();
  myCarousel.useControls();
})
