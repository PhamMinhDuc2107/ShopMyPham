const blogSlider = new Splide(".blog__wrap", {
  type: "loop",
  rewind: true,
  autoplay: true,
  interval: 5000,
  perPage: 3,
  perMove: 1,
  breakpoints: {
    1230: {
      perPage: 3,
    },
    900: {
      perPage: 2,
    },
    600: {
      perPage: 1,
    },
  },
});
blogSlider.mount();
