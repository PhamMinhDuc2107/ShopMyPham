const localStorageManagement = (() => {
   return {
      // getDataLocal
      getDataLocal(key) {
         const item = localStorage.getItem(key);
         const data = JSON.parse(item);
         return data;
      },
      // function currency change
      currencyChange(data) {
         let number = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
         }).format(data);
         return number;
      },
      // saveLocal
      saveDataLocal(key, data) {
         try {
            if (Array.isArray(data)) {
               let dataJson = JSON.stringify(data);
               localStorage.setItem(key, dataJson);
            } else {
               console.warn("Dữ liệu truyền vào phải là một array");
            }
         } catch (error) {
            console.error("Lỗi khi lưu data trong localStorage", error);
         }
      },
      // addSP
      addSP(id, key, dataProducts) {
         try {
            const dataCartLocal =
               localStorageManagement.getDataLocal("DANHSACHITEMCART");
            let data = [];
            if (Array.isArray(dataCartLocal) && dataCartLocal.length >= 0) {
               data = dataCartLocal;
            }
            let foundItem = data.find((item) => +id === +item.id);
            if (foundItem) {
               foundItem.quantity += 1;
            } else {
               data.push({ id: id, quantity: 1 });
            }
            localStorageManagement.saveDataLocal(key, data);
            localStorageManagement.updateCartMini(data, dataProducts);
            toast("Success", `Thêm sản phẩm thành công`, "success");
         } catch (error) {
            console.error("Lỗi khi thêm sản phẩm", error);
         }
      },
      //total quantity cart
      totalQuantityProducts(dataCarts) {
         if (Array.isArray(dataCarts) && dataCarts.length > 0) {
            let totalProducts = dataCarts.reduce(
               (total, item) => total + item.quantity,
               0
            );
            return totalProducts;
         }
         return 0;
      },
      // totalPrice: Tính tống giá tiền
      totalPrice(dataCarts, dataProducts) {
         if (Array.isArray(dataCarts) && dataCarts.length > 0) {
            let total = 0;
            dataCarts.forEach((item) => {
               let product = dataProducts.find(
                  (record) => +item.id === record.id
               );
               if (product) {
                  total += product.price * item.quantity;
               }
            });
            return total;
         }
         return 0;
      },
      // changeQuantityProduct
      changeQuantityProduct(id, number, dataCarts, dataProducts) {
         let data = [];
         if (dataCarts) {
            data = dataCarts;
         }
         let item = data.find((product) => +product.id === id);
         if (item && number > 0) {
            item.quantity = number;
         } else {
            data = data.filter((product) => +product.id !== id);
         }
         localStorageManagement.saveDataLocal("DANHSACHITEMCART", data);
         localStorageManagement.updateCart(dataCarts, dataProducts);
         localStorageManagement.updateCartMini(dataCarts, dataProducts);
      },
      // deleteProduct
      deleteProduct(id, dataCarts, dataProducts) {
         let index = dataCarts.findIndex((item) => +item.id === +id);
         dataCarts.splice(index, 1);
         localStorageManagement.saveDataLocal("DANHSACHITEMCART", dataCarts);
         localStorageManagement.updateCartMini(dataCarts, dataProducts);
         localStorageManagement.updateCart(dataCarts, dataProducts);
      },
      // updateCart
      updateCart(dataCarts, dataProducts) {
         const cartList = document.querySelector(".cart__body");
         if (cartList) {
            cartList.innerHTML = "";
         }
         // render CartItem
         renderManagement.renderItemCart(cartList, dataCarts, dataProducts);
         // cartTotalPrice
         const cartTotalPrice = document.querySelector(".cart__total--number");
         renderManagement.renderTotalPrice(
            cartTotalPrice,
            dataCarts,
            dataProducts
         );
      },
      // updateCartMini
      updateCartMini(dataCarts, dataProducts) {
         // renderCartMiniItem
         const cartMini = document.querySelector(".mini__product--list");
         cartMini.innerHTML = "";
         renderManagement.renderItemCartMini(cartMini, dataCarts, dataProducts);
         // cartMini
         const cartMiniPrice = document.querySelector(".mini__total--price");
         renderManagement.renderTotalPrice(
            cartMiniPrice,
            dataCarts,
            dataProducts
         );
         // updateQuantityProduct
         const parentQuantity = document.querySelector(".header__cart--number");
         renderManagement.renderTotalQuantityProducts(
            parentQuantity,
            dataCarts
         );
      },
      // checkQuantityProduct
      checkQuantityProduct(dataCarts, dataProducts) {
         let validQuantity = true;
         if (!Array.isArray(dataCarts) || dataCarts === null)
            return validQuantity;
         for (let i = 0; i < dataCarts.length; i++) {
            let order = dataCarts[i];
            for (let j = 0; j < dataProducts.length; j++) {
               let product = dataProducts[j];
               if (+order.id === +product.id) {
                  if (+order.quantity >= +product.quantity) {
                     toast(
                        "Warning",
                        `${product.name} chỉ còn ${product.quantity} sản phẩm`,
                        "warn"
                     );
                     order.quantity = product.quantity;
                     validQuantity = false;
                     break;
                  }
               }
            }
            if (!validQuantity) break;
         }
         return validQuantity;
      },
      // updateQuantityProduct
      updateQuantityProduct(dataCarts, dataProducts) {
         if (Array.isArray(dataCarts) && dataCarts.length > 0) {
            for (let i = 0; i < dataCarts.length; i++) {
               let order = dataCarts[i];
               for (let j = 0; j < dataProducts.length; j++) {
                  let product = dataProducts[j];
                  if (+order.id === +product.id) {
                     product.quantity -= order.quantity;
                  }
               }
            }
            localStorageManagement.saveDataLocal("DANHSACHSP", dataProducts);
         }
         return true;
      },
      //
      addOrderAndUpdate(parent, dataCarts, dataProducts, data) {
         if (apiManagement.addOrder(data)) {
            localStorageManagement.updateQuantityProduct(
               dataCarts,
               dataProducts
            );
            localStorage.removeItem("DANHSACHITEMCART");
            parent.style.display = "none";
            localStorageManagement.updateCart(dataCarts, dataProducts);
            localStorageManagement.updateCartMini(dataCarts, dataProducts);
            toast("Success", "Đặt hàng thành công", "success");
         }
      },
   };
})();
// renderManagement
const renderManagement = (() => {
   return {
      // RenderProductSlider
      renderProductList(data, parent) {
         try {
            const dataProducts = data;
            if (dataProducts) {
               dataProducts.forEach((item) => {
                  templateItemProduct(item, parent);
               });
            } else {
               console.warn("Không có dữ liệu localStorage");
            }
         } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ LocalStorage", error);
         }
      },
      // renderTotalProduct
      renderTotalQuantityProducts(parent, dataCarts) {
         parent.textContent =
            localStorageManagement.totalQuantityProducts(dataCarts);
      },
      // renderTotalPrice
      renderTotalPrice(parent, dataCarts, dataProducts) {
         if (parent) {
            parent.textContent = localStorageManagement.currencyChange(
               localStorageManagement.totalPrice(dataCarts, dataProducts)
            );
         }
      },
      //renderItemCartMini
      renderItemCartMini(parent, dataCarts, dataProducts) {
         if (
            Array.isArray(dataCarts) &&
            dataCarts.length > 0 &&
            Array.isArray(dataProducts)
         ) {
            dataCarts.forEach((item) => {
               let product = dataProducts.find(
                  (record) => +item.id === +record.id
               );
               if (product) {
                  templateItemCartMini(
                     product.img,
                     product.name,
                     product.price,
                     item.quantity,
                     product.id,
                     parent
                  );
               }
            });
         } else {
            if (parent) {
               parent.innerHTML = `
          <div class = "cart__emty">
          <span>Không có sản phẩm nào trong giỏ hàng. <a href="./home.html">Quay lại cửa hàng để tiếp tục mua sắm</a>.</span>
          </div>
          `;
            }
         }
      },
      // renderCartItem
      renderItemCart(parent, dataCarts, dataProducts) {
         if (
            Array.isArray(dataCarts) &&
            dataCarts.length > 0 &&
            Array.isArray(dataProducts)
         ) {
            dataCarts.forEach((item) => {
               let product = dataProducts.find(
                  (record) => +item.id === +record.id
               );
               if (product) {
                  templateItemCart(
                     parent,
                     item.quantity,
                     product.img,
                     product.name,
                     product.id,
                     product.price
                  );
               }
            });
         } else {
            if (parent) {
               parent.innerHTML = `
          <div class = "cart__emty emty__body">
          <span>Không có sản phẩm nào trong giỏ hàng. 
          <a href="./home.html">Quay lại cửa hàng để tiếp tục mua sắm</a></span>
          </div>
          `;
            }
         }
      },
      // renderOrderDetail
      renderOrderDetail(id, data, parent) {
         try {
            if (data) {
               templateItemOrderDetail(parent, data);
            }
         } catch (error) {
            console.error(error.message);
         }
      },
      // renderItemTableOrderDetail
      renderItemTableOrderDetail(parent, dataOrders, dataProducts, id) {
         let number = 0;
         let total = 0;
         let quantity = 0;
         if (Array.isArray(dataOrders) && dataOrders.length > 0) {
            dataOrders.forEach((order) => {
               number++;
               dataProducts.forEach((product) => {
                  if (+order.id === +product.id) {
                     quantity += order.quantity;
                     total += order.quantity * product.price;
                     templateItemTableOrderDetail(
                        parent,
                        number,
                        product.name,
                        product.price,
                        order.quantity
                     );
                  }
               });
            });
            templateFooterOrderDetail(parent, id, quantity, total);
         }
      },
      // renderOrder
      renderItemOrder: async (parent) => {
         try {
            let data = await apiManagement.getOrder();
            if (Array.isArray(data) && data.length > 0) {
               let number = 0;
               data.forEach((item) => {
                  number++;
                  templateItemOrder(parent, number, item);
               });
            } else {
               parent.innerHTML = `
          <div class = "cart__emty">
          <span> Không có đơn hàng nào. 
          <a href="./home.html">Quay lại cửa hàng để tiếp tục mua sắm</a></span>
          </div>
          `;
            }
         } catch (error) {
            console.error(error.message);
         }
      },
      // renderProvinces
      renderProvinces: async (provinces) => {
         try {
            let data = await apiManagement.getDataApi();
            if (Array.isArray(data) && data.length > 0) {
               data.forEach((item) => {
                  templateOption(item.name, item.code, provinces);
               });
            } else {
               throw new error("Không có dữ liệu!");
            }
         } catch (e) {
            console.log(e.message);
         }
      },
   };
})();

// Api

const apiManagement = (function () {
   let listOrderId = new Set();
   return {
      getListOrderId: () => {
         return listOrderId;
      },
      setListOrderId: (value) => {
         listOrderId.add(value);
      },
      // createRandomId
      createRandomId: (length = 10) => {
         let idRandom = "";
         let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
         for (let i = 0; i < length; i++) {
            idRandom += characters.charAt(Math.random() * characters.length);
         }
         let listId = apiManagement.getListOrderId();
         if (listId.has(idRandom)) {
            idRandom = apiManagement.createRandomId();
         }
         apiManagement.setListOrderId(idRandom);
         return idRandom;
      },
      getDataApi: async (endpoint = "https://provinces.open-api.vn/api/p") => {
         try {
            let response = await fetch(`${endpoint}`);
            if (!response.ok) {
               throw new Error("Lỗi code:" + response.status);
            }
            let data = await response.json();
            return data;
         } catch (error) {
            console.log(error.message);
         }
      },
      getOrder: async () => {
         let data = await apiManagement.getDataApi(
            "http://localhost:3000/orders"
         );
         if (Array.isArray(data) && data.length > 0) {
            return data;
         }
         return 0;
      },
      addOrder: async (data) => {
         try {
            let response = await fetch("http://localhost:3000/orders", {
               method: "POST",
               body: JSON.stringify(data),
               headers: {
                  "Content-type": "application/json; charset=UTF-8",
               },
            });
            if (!response.ok) {
               throw new Error(`Lỗi status: ${response.status}`);
            }
            return response;
         } catch (error) {
            console.log(error.message);
         }
      },
      // Xoá Order
      deleteOrder: async (id) => {
         try {
            let response = await fetch(`http://localhost:3000/orders/${id}`, {
               method: "DELETE",
               headers: {
                  "Content-type": "application/json; charset=UTF-8",
               },
            });
            if (!response.ok) {
               throw new Error(`Lỗi status: ${response.status}`);
            }
            toast("Success", `Xoá đơn hàng ${id} thành công`, "success");
         } catch (error) {
            console.log(error.message);
         }
      },
      // getOrderWithId
      getOrderWithId: async (id) => {
         try {
            let orders = await apiManagement.getOrder();
            if (orders) {
               let order = orders.find((item) => item.id === id);
               return order;
            }
         } catch (error) {
            console.error(error.message);
         }
      },
      // returnOrder
      returnOrder: async (id, dataProducts) => {
         let data = await apiManagement.getOrderWithId(id);
         let dataOrders = data.infoOrder;
         if (Array.isArray(dataOrders) && dataOrders.length > 0) {
            dataOrders.forEach((order) => {
               dataProducts.forEach((product) => {
                  if (+order.id === +product.id) {
                     product.quantity += order.quantity;
                  }
               });
            });
         }
         localStorageManagement.saveDataLocal("DANHSACHSP", dataProducts);
         apiManagement.deleteOrder(id);
         setTimeout(function () {
            location.reload();
         }, 2000);
      },
   };
})();

// getDataApi
// Toast
function toast(title, msg, type, duration = 3000) {
   let main = document.querySelector("#toast");
   if (!main) {
      main = document.createElement("div");
      main.setAttribute("id", `toast`);
      document.body.appendChild(main);
   }
   const toast = document.createElement("div");
   const autoRemove = setTimeout(function () {
      main.removeChild(toast);
   }, duration + 500);
   toast.onclick = (e) => {
      if (e.target.classList.contains("toast__close")) {
         main.removeChild(toast);
         clearTimeout(autoRemove);
      }
   };
   const icons = {
      success: "fa-solid fa-circle-check",
      warn: "fa-solid fa-circle-exclamation",
   };
   let icon = icons[type];
   toast.setAttribute("class", `toast toast--${type}`);
   toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${
      duration / 1000
   }s forwards`;
   toast.innerHTML = `
	<div class="toast__icon">
	<i class="${icon}"></i>
	</div>
	<div class="toast__body">
	<h3 class="toast__title">${title}</h3>
	<p class="toast__msg">${msg}</p>
	</div>
	<div class="toast__close">
	<i class="fa fa-times"></i>
	</div>
	`;
   main.appendChild(toast);
}
