window.addEventListener("load", function () {
  const filterBtn = document.querySelector(".filter__btn");
  filterBtn.addEventListener("click", function (e) {
    const filterWrap = document.querySelector(".sidebar__filter");
    filterWrap.classList.add("active__filter");
  });
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("sidebar__filter")) {
      e.target.classList.remove("active__filter");
    }
  });
  // renderProductList
});
