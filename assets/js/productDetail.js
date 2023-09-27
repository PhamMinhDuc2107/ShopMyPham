window.addEventListener("load", function () {
  // quantity
  const iconPlus = document.querySelector(".buy__icon--plus");
  const iconMinus = document.querySelector(".buy__icon--minus");
  const quantity = document.querySelector(".productDetail__buy--quantity span");
  iconPlus.addEventListener("click", function (e) {
    let number = +quantity.textContent;
    number++;
    quantity.textContent = number;
  });
  iconMinus.addEventListener("click", function (e) {
    let number = +quantity.textContent;
    if (number <= 0) return 0;
    number--;
    quantity.textContent = number;
  });
  // tabBtn
  const tabBtn = document.querySelector(".product__tab--btn span");
  const tabContent = document.querySelector(".product__tab--content");
  tabBtn.addEventListener("click", function (e) {
    let heightTabContent = tabContent.scrollHeight;
    tabContent.style.height = `${heightTabContent}px`;
    tabBtn.textContent = "Thu gọn";
    tabBtn.classList.toggle("active__btn");
    if (!tabBtn.classList.contains("active__btn")) {
      tabBtn.textContent = "Xem thêm >>";
      tabContent.style.height = `200px`;
    }
  });
  // change Img
  const listImg = document.querySelectorAll(".productDetail__item img");
  const detailImg = document.querySelector(".productDetail__img img");
  [...listImg].forEach((item) =>
    item.addEventListener("click", function (e) {
      [...listImg].forEach((item) => item.classList.remove("active__border"));
      e.target.classList.add("active__border");
      srcImg = e.target.getAttribute("src");
      detailImg.setAttribute("src", srcImg);
    })
  );
});
