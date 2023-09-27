window.addEventListener("load", function () {
   // function setHeight
   function setHeight(box, height) {
      box.style.height = `${height}px`;
      box.classList.toggle("active__height");
      if (!box.classList.contains("active__height")) {
         box.style.height = "0px";
      }
   }
   // decounce
   function debounce(func, timeout = 3000) {
      let timer;
      return (...args) => {
         clearTimeout(timer);
         timer = setTimeout(() => {
            func.apply(this, args);
         }, timeout);
      };
   }
   // header__nav
   const headerNav = document.querySelector(".header__nav");
   window.addEventListener(
      "wheel",
      debounce(function (e) {
         let numberScroll = e.deltaY;
         if (numberScroll >= 0) {
            headerNav.style.height = `${45}px`;
            headerNav.style.overflow = "visible";
         } else if (numberScroll < 0) {
            headerNav.style.height = `${0}px`;
            headerNav.style.overflow = "hidden";
         }
      }, 20)
   );

   // header__search
   const searchIcon = document.querySelector(".header__xl--search");
   const searchWrap = document.querySelector(".search__wrap");
   searchIcon.addEventListener("click", function (e) {
      searchBoxHeight = searchWrap.scrollHeight;
      setHeight(searchWrap, searchBoxHeight);
   });
   // Menu
   const barBtn = document.querySelector(".header__xl--bar i");
   const menuList = document.querySelector(".menu__wrap");
   barBtn.addEventListener("click", function (e) {
      menuList.classList.toggle("active__menu");
      barBtn.classList.toggle("fa-close");
   });
   // dropdown_menu
   const downBtn = document.querySelectorAll(".menu__item--icon");
   [...downBtn].forEach((item) => {
      item.addEventListener("click", function (e) {
         let dropdown = e.target.nextElementSibling;
         let heightDropDown = dropdown.scrollHeight;
         setHeight(dropdown, heightDropDown);
         e.target.classList.toggle("fa-angle-up");
      });
   });
   // click--top
   const btnClickTop = document.querySelector(".click--top");
   btnClickTop.addEventListener("click", function (e) {
      window.scrollTo({ top: 0, behavior: "smooth" });
   });

   // sidebar__dropdown
   const sidebarDropdown = document.querySelectorAll(".sidebar__item--icon");
   [...sidebarDropdown].forEach((item) => {
      item.addEventListener("click", function (e) {
         let dropdownParent =
            e.target.previousElementSibling.previousElementSibling;
         dropdownParent.classList.toggle("active__color");
         let dropdown = e.target.nextElementSibling;
         let heightDropDown = dropdown.scrollHeight;
         setHeight(dropdown, heightDropDown);
         e.target.children[0].classList.toggle("fa-angle-up");
      });
   });
   // tooltip
   let iconTooltip = document.querySelectorAll(".overplay__product i");
   [...iconTooltip].forEach((item) =>
      item.addEventListener("mouseenter", function (e) {
         const title = e.target.dataset.tooltip;
         const tooltipDiv = document.createElement("div");
         tooltipDiv.className = "tooltip-text";
         tooltipDiv.textContent = title;
         document.body.appendChild(tooltipDiv);
         const cords = e.target.getBoundingClientRect();
         const { top, left, width } = cords;
         const tooltipHeight = tooltipDiv.offsetHeight;
         const triangleHeight = 5;
         tooltipDiv.style.left = `${left - width / 1.3}px`;
         tooltipDiv.style.top = `${top - tooltipHeight - triangleHeight}px`;
      })
   );
   [...iconTooltip].forEach((item) =>
      item.addEventListener("mouseleave", function (event) {
         const tooltip = document.querySelector(".tooltip-text");
         if (!tooltip) return;
         tooltip.parentNode.removeChild(tooltip);
      })
   );
});
//
