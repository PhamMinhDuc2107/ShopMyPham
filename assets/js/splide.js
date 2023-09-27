// banner
const sliderBanner = new Splide(".slider", {
   type: "loop",
   drag: "free",
   perPage: 1,
   autoplay: true,
   interval: 5000,
});
sliderBanner.mount();

const blogSlider = new Splide(".blog__main", {
   type: "loop",
   rewind: true,
   autoplay: true,
   interval: 5000,
   perPage: 4,
   breakpoints: {
      1230: {
         perPage: 3,
      },
      900: {
         perPage: 2,
      },
      768: {
         perPage: 1,
      },
   },
});
blogSlider.mount();
const sliderBlogMini = new Splide(".blogMini", {
   perPage: 2,
   autoplay: true,
   interval: 10000,
   breakpoints: {
      900: {
         perPage: 1,
      },
   },
});
sliderBlogMini.mount();
