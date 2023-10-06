// splide
function splide(classList, gap = 0, breakpoint = {}) {
   let splideList = document.querySelector(`.${classList} .splide__list`);
   let splideItem = document.querySelectorAll(`.${classList} .splide__item`);
   let splideDots = document.querySelector(`.${classList} .splide__dots`);
   let splideNext = document.querySelector(`.${classList} .splide__next`);
   let splidePrev = document.querySelector(`.${classList} .splide__prev`);
   let splideItemWidth = splideList.offsetWidth;
   let scrollWidth = splideList.scrollWidth;
   let splideLength = scrollWidth / splideItemWidth;
   let positionItem = 0;
   let spacing = gap;
   let index = 0;
   // resize

   window.onresize = (e) => {
      let viewPortWidth = window.innerWidth;
      splideItemWidth = splideList.offsetWidth;
      splideLength = Math.floor(scrollWidth / splideItemWidth);
      let keyBreakpoint = [];
      let valueBreakpoint = [];
      Object.keys(breakpoint).map((item) => keyBreakpoint.unshift(item));
      Object.values(breakpoint).map((item) => valueBreakpoint.unshift(item));
      for (let i = 0; i <= keyBreakpoint.length - 1; i++) {
         if (+keyBreakpoint[i] < +viewPortWidth) {
            spacing = valueBreakpoint[i];
            break;
         }
      }
   };
   // splideDots
   for (let a = 0; a < splideLength; a++) {
      let template = `<li data-index=${a}></li>`;
      splideDots.insertAdjacentHTML("beforeend", template);
   }
   let splideDotItem = document.querySelectorAll(
      `.${classList} .splide__dots li`
   );
   function removeClassActiveDot() {
      [...splideDotItem].forEach((item) => item.classList.remove("active-dot"));
   }
   function changeDot() {
      removeClassActiveDot();
      [...splideDotItem].forEach((item) => {
         +item.dataset.index === +index ? item.classList.add("active-dot") : "";
      });
   }
   changeDot();
   if (splideDotItem) {
      // insert dots
      [...splideDotItem].forEach((item) =>
         item.addEventListener("click", function (e) {
            removeClassActiveDot();
            let dataIndex = +e.target.dataset.index;
            if (dataIndex === 0) spacing = 0;
            positionItem = -1 * dataIndex * splideItemWidth - spacing;
            splideList.style.transform = `translateX(${positionItem}px)`;
            e.target.classList.add("active-dot");
            index = dataIndex;
         })
      );
   }
   // splide Next
   if (splideNext) {
      splideNext.addEventListener("click", function (e) {
         handleChangeSplide(1);
         changeDot();
      });
   }
   // splide Prev
   if (splidePrev) {
      splidePrev.addEventListener("click", function (e) {
         handleChangeSplide(-1);
         changeDot();
      });
   }
   function handleChangeSplide(direction) {
      if (direction === 1) {
         index++;
         positionItem = positionItem - splideItemWidth - spacing;
         if (index >= splideLength) {
            index = 0;
            positionItem = 0;
         }
         splideList.style.transform = `translateX(${positionItem}px)`;
      } else if (direction === -1) {
         index--;
         positionItem = positionItem + splideItemWidth + spacing;
         console.log(`handleChangeSplide ~ positionItem:`, positionItem);
         if (index < 0) {
            index = splideLength - 1;
            positionItem = -index * splideItemWidth - spacing;
         }
         splideList.style.transform = `translateX(${positionItem}px)`;
      }
   }
}
