// decounce
function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
window.addEventListener("load", function () {
  // ------------cart------------
  // ckeckout
  const btnCheckout = document.querySelector(".cart__btn--checkout");
  const dialog = document.querySelector(".dialog");
  const btnClose = document.querySelector(".dialog__icon");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", function (e) {
      dialog.classList.add("active__dialog");
    });
  }
  btnClose.addEventListener("click", function (e) {
    dialog.classList.remove("active__dialog");
  });
  document.body.addEventListener("click", function (e) {
    if (e.target.matches(".dialog")) {
      e.target.classList.remove("active__dialog");
    }
  });
});
