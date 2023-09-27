const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
let dataCarts = localStorageManagement.getDataLocal(keyLocalStorageItemCart);
let dataProducts = localStorageManagement.getDataLocal(keyLocalStorageListSP);

const throttle = (fn, time) => {
   let delay = time || 0;
   let last = 0;
   return (...args) => {
      let now = new Date().getTime();
      if (now - last < delay) return;
      last = now;
      fn(...args);
   };
};
// start
(function () {
   if (
      !Array.isArray(dataProducts) ||
      dataProducts.length <= 0 ||
      dataProducts === null
   ) {
      localStorageManagement.saveDataLocal(keyLocalStorageListSP, data);
      dataProducts = localStorageManagement.getDataLocal(keyLocalStorageListSP);
   }
   // ---------renderProductHome---------
   const homeListProduct = document.querySelectorAll(".product__list");
   if (homeListProduct) {
      [...homeListProduct].forEach((item) => {
         renderManagement.renderProductList(dataProducts, item);
      });
   }
   // renderCartMini
   localStorageManagement.updateCartMini(dataCarts, dataProducts);
})();
// ---------renderListProduct----------
const productList = document.querySelector(".page__product .product__list");
if (productList) {
   renderManagement.renderProductList(dataProducts, productList);
}

// ---------addSp---------
document.body.addEventListener(
   "click",
   throttle((e) => {
      if (e.target.classList.contains("overplay__product--cart")) {
         let id = e.target.dataset.id;
         dataCarts = localStorageManagement.getDataLocal(
            keyLocalStorageItemCart
         );
         if (
            localStorageManagement.checkQuantityProduct(dataCarts, dataProducts)
         ) {
            localStorageManagement.addSP(
               id,
               keyLocalStorageItemCart,
               dataProducts
            );
         }
      }
      // removeProductCartMini
      if (e.target.classList.contains("mini__product--remove")) {
         let id = e.target.dataset.id;
         localStorageManagement.deleteProduct(id, dataCarts, dataProducts);
      }
   }, 1000)
);
// ------------cart---------
const cartList = document.querySelector(".cart__body");
if (cartList) {
   renderManagement.renderItemCart(cartList, dataCarts, dataProducts);
   // changeQuantityProduct
   cartList.addEventListener("change", function (e) {
      if (e.target.classList.contains("cart__item--input")) {
         let id = +e.target.dataset.id;
         let quantity = +e.target.value;
         if (
            !localStorageManagement.checkQuantityProduct(
               dataCarts,
               dataProducts
            )
         ) {
            let cart = dataCarts.find((item) => +item.id === +id);
            quantity = cart.quantity;
         }
         localStorageManagement.changeQuantityProduct(
            id,
            quantity,
            dataCarts,
            dataProducts,
            cartList
         );
      }
   });
   // deleteProduct
   cartList.addEventListener("click", function (e) {
      if (e.target.classList.contains("cart__item--remove")) {
         let id = e.target.dataset.id;
         localStorageManagement.deleteProduct(id, dataCarts, dataProducts);
      }
   });
}
// cart__total
const cartPriceTotal = document.querySelector(".cart__total--number");
if (cartPriceTotal) {
   renderManagement.renderTotalPrice(cartPriceTotal, dataCarts, dataProducts);
}

// ----------ApiDivisions----------
const districtsEndpoint = "https://provinces.open-api.vn/api/d/";
const wardsEndpoint = "https://provinces.open-api.vn/api/w/";
const provinces = document.querySelector("#provinces");
const districts = document.querySelector("#districts");
const wards = document.querySelector("#wards");
if (provinces) {
   // renderProvinces
   renderManagement.renderProvinces(provinces);
   provinces.addEventListener("change", async function (e) {
      let optionSelect = e.target.selectedOptions[0];
      let code = optionSelect.dataset.code;
      let data = await apiManagement.getDataApi(districtsEndpoint);
      wards.innerHTML = "<option>-----------</option>";
      districts.innerHTML = "<option>-----------</option>";
      data.forEach((item) => {
         if (+item.province_code === +code) {
            templateOption(item.name, item.code, districts);
         }
      });
   });
}
if (districts) {
   districts.addEventListener("change", async function (e) {
      let optionSelect = e.target.selectedOptions[0];
      let code = optionSelect.dataset.code;
      wards.innerHTML = "<option>-----------</option>";
      let data = await apiManagement.getDataApi(wardsEndpoint);
      data.forEach((item) => {
         if (+item.district_code === +code) {
            templateOption(item.name, item.code, wards);
         }
      });
   });
}
// -------------order------------
// validator
const orderBody = document.querySelector(".order__body");
const orderTable = document.querySelector(".order__table");
const orderContainer = document.querySelector(".order__container");
const orderDetail = document.querySelector(".order__detail");
const orderListDetail = document.querySelector(".order__detail--list");
const orderTableDetail = document.querySelector(".order__detail--body");
if (orderBody) {
   renderManagement.renderItemOrder(orderBody);
}
document.body.onclick = async function (e) {
   if (e.target.classList.contains("order__detail--link")) {
      let idOrder = e.target.dataset.id;
      orderTable.style.display = "none";
      let data = await apiManagement.getOrderWithId(idOrder);
      orderDetail.style.display = "block";
      orderListDetail.innerHTML = "";
      renderManagement.renderOrderDetail(idOrder, data, orderListDetail);
      // renderItemTableOrderDetail
      let dataOrders = data.infoOrder;
      orderTableDetail.innerHTML = "";
      renderManagement.renderItemTableOrderDetail(
         orderTableDetail,
         dataOrders,
         dataProducts,
         idOrder
      );
   }
   if (e.target.classList.contains("btn--return")) {
      let id = e.target.dataset.id;
      apiManagement.returnOrder(id, dataProducts);
   }
   if (e.target.classList.contains("btn--order")) {
      orderTable.style.display = "block";
      orderDetail.style.display = "none";
   }
};
