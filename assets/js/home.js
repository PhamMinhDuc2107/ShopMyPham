window.addEventListener("load", function (e) {
   // sliderProduct
   const productListSlider = document.querySelector(
      ".product__slider .product__list"
   );
   const productNext = document.querySelector(".product__next");
   const productPrev = document.querySelector(".product__prev");
   let scrollAmount = 0;
   function scrollProduct() {
      scrollAmount += productListSlider.clientWidth;
      if (scrollAmount > productListSlider.scrollWidth) {
         scrollAmount = 0;
      }
      console.log(scrollAmount);
      productListSlider.style.transform = `translateX(-${scrollAmount}px)`;
   }
   productNext.addEventListener("click", scrollProduct);
   productPrev.addEventListener("click", function (e) {
      scrollAmount -= productListSlider.clientWidth;
      if (scrollAmount < 0) {
         scrollAmount =
            productListSlider.scrollWidth - productListSlider.clientWidth;
      }
      productListSlider.style.transform = `translateX(-${scrollAmount}px)`;
   });
   // auto scroll
   setInterval(scrollProduct, 5000);
});
