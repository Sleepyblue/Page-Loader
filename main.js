'use strict';

const loaders = document.querySelectorAll('.loader');
const loaderIcon = document.querySelector('.loader__top-icon');
const btn = document.querySelector('.btn');
const slides = document.querySelectorAll('.main__slide');
let shownSlide = 1;

const loaderTransition = function () {
  loaders.forEach((loader) => {
    const bubbles = loader.querySelectorAll('.loader__bubble');
    const square = loader.querySelectorAll('.loader__square');

    loaderIcon.classList.add('loader--show');
    loader.style.overflow = 'visible';
    loader.classList.add('loader--transition');
    square.forEach((square) => square.classList.add('loader--show'));

    if (loader.classList.contains('loader__top')) {
      loader.style.borderBottom = `6px solid var(--bg)`;
      bubbles.forEach((bubble) => bubble.classList.add('loader--bubbles-top'));
    }

    if (loader.classList.contains('loader__bot')) {
      loader.style.borderTop = `6px solid var(--bg)`;
      bubbles.forEach((bubble) => bubble.classList.add('loader--bubbles-bot'));
    }

    setTimeout(function () {
      loader.style.overflow = 'hidden';
      loader.style.border = 'none';

      loaderIcon.classList.remove('loader--show');
      square.forEach((square) => square.classList.remove('loader--show'));
      loader.classList.remove('loader--transition');
      loader.classList.remove('loader__top--border', 'loader__bot--border');

      bubbles.forEach((bubble) =>
        bubble.classList.remove('loader--bubbles-top', 'loader--bubbles-bot')
      );
    }, 3000);
  });
};

const slidePseudoLoop = function () {
  if (shownSlide === slides.length) {
    shownSlide = 1;
    let activeSlide = document.querySelector('.section--show');
    let futureSlide = document.querySelector(`.main__slide-${shownSlide}`);

    activeSlide.classList.remove('section--show');
    activeSlide.classList.add('section--hide');
    futureSlide.classList.remove('section--hide');
    futureSlide.classList.add('section--show');
  } else {
    shownSlide++;
    let activeSlide = document.querySelector('.section--show');
    let futureSlide = document.querySelector(`.main__slide-${shownSlide}`);

    activeSlide.classList.remove('section--show');
    activeSlide.classList.add('section--hide');
    futureSlide.classList.remove('section--hide');
    futureSlide.classList.add('section--show');
  }
};

const sectionTransition = function () {
  setTimeout(slidePseudoLoop, 2000);
};

const noPointerEventsNav = function (e) {
  btn.classList.add('no--click');
  setTimeout(function () {
    btn.classList.remove('no--click');
  }, 3050);
};

const init = function () {
  slides.forEach((slide) => {
    if (slide.classList.contains('main__slide-1'))
      slide.classList.add('section--show');
    else slide.classList.add('section--hide');
  });
};

init();

btn.addEventListener('click', function (e) {
  noPointerEventsNav();
  loaderTransition();
  sectionTransition();
});
