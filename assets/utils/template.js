// templateProductItem
function templateItemProduct({ id, hot, discount, img, price, name }, parent) {
   let template = `
	<div class="product__item splide__item">
	<div class="product__item--new" style=${hot === 0 ? "display:none" : ""}>
	<span>${hot === 1 ? "NEW" : ""}</span>
	</div>
	<div class="product__item--new" style=${discount <= 0 ? "display:none" : ""}>
	<span>${discount > 0 ? `${discount}%` : ""}</span>
	</div>
	<div class="product__top">
	<img src="./assets/images/${img}" alt="" class="product__top--img">
	<div class="overplay__product">
	<i class="fa fa-heart" data-tooltip ="Yêu Thích" data-id=${id}></i>
	<i class="fa-solid fa-cart-plus overplay__product--cart" data-tooltip ="Giỏ hàng" data-id=${id}></i>
	</div>
	</div>
	<div class="product__bot">
	<a href="./productDetail.html"><h3 class="product__bot--title hidden__text">
	${name}
	</h3></a>
	<div class="product__price">
	<span class="product__price--new">${localStorageManagement.currencyChange(
      price
   )}</span>
	<span class="product__price--old">

	${
      discount > 0
         ? localStorageManagement.currencyChange(
              price + price * (discount / 100)
           )
         : ""
   }</span>
	</div>
	<div class="product__start--list">
	<li class="product__start--item">
	<i class="fa-solid fa-star"></i>
	</li>
	<li class="product__start--item">
	<i class="fa-solid fa-star"></i>
	</li>
	<li class="product__start--item">
	<i class="fa-solid fa-star"></i>
	</li>
	<li class="product__start--item">
	<i class="fa-solid fa-star"></i>
	</li>
	<li class="product__start--item">
	<i class="fa-solid fa-star"></i>
	</li>
	</div>
	</div>
	</div>
	`;
   parent.insertAdjacentHTML("afterbegin", template);
}
//  templateCartMiniItem
function templateItemCartMini(img, name, price, quantity, id, parent) {
   let template = `
	<li class="mini__product--item">
	<div href="#" class="mini__product--content">
	<a href="#" class="mini__product--img">
	<img src="./assets/images/${img}" alt="">
	</a>
	<div class="mini__product--detail">
	<p class="mini__product--text">
	<a href="#" class="mini__product--link">
	${name}
	</a>
	</p>
	<a href="#" class="mini__product--remove" data-id="${id}">
	<i class="fa fa-close"></i>
	</a>
	<div class="mini__product--price">
	<span class="mini__product--number">${localStorageManagement.currencyChange(
      price
   )}</span> x
	<span class="mini__product--quantity">${quantity}</span>
	</div>
	</div>
	</div>
	</li>
	`;
   parent.insertAdjacentHTML("afterbegin", template);
}
//  templateCartItem
function templateItemCart(parent, quantity, img, name, id, price) {
   let template = `
	<div class="cart__item">
	<div class="cart__item--info">
	<div class="cart__item--img">
	<img src="./assets/images/${img}" alt="">
	</div>
	<div class="cart__item--name">
	<span>${name}</span>
	<div class="cart__item--price cart__center">
	${localStorageManagement.currencyChange(price)}
	</div>
	<button class="cart__item--remove" data-id="${id}">
	<i class="fa-solid fa-xmark"></i>Xoá
	</button>
	</div>
	</div>
	<div class="cart__item--price cart__center">
	${localStorageManagement.currencyChange(price)}
	</div>
	<div class="cart__item--quantity cart__center">
	<input type="number" class="cart__item--input" value="${quantity}" data-id="${id}">
	<button class="cart__item--remove" data-id="${id}">
	<i class="fa-solid fa-xmark"></i>Xoá
	</button>
	</div>
	<div class="cart__item--total cart__right">
	<span>${localStorageManagement.currencyChange(+price * +quantity)}</span>
	</div>
	</div>
	`;
   parent.insertAdjacentHTML("afterbegin", template);
}
// templateOPtion
function templateOption(name, id, parent) {
   let template = `
	<option value="${name}" data-code="${id}" >${name}</option>
	`;
   parent.insertAdjacentHTML("afterbegin", template);
}
// templateOrderItem
function templateItemOrder(parent, number, { id, date }) {
   let template = `
	<div class="order__item">
	<div class="order__center" style="width: 5%;">${number}</div>
	<div class="order__center" style="width: 25%;">${id}</div>
	<div class="order__center" style="width: 58%;">${date}</div>
	<div class="order__center"  style="width: 12%;">
	<a href="#" class='order__detail--link' data-id="${id}">Chi tiết</a>
	</div>
	</div>
	`;
   parent.insertAdjacentHTML("beforeend", template);
}
// tempalteItemOrderDetail
function templateItemOrderDetail(
   parent,
   { id, name, phone, email, address, wards, districts, provinces, date }
) {
   let template = `
	<div class="order__detail--item">Mã Đơn hàng: ${id}</div>
	<div class="order__detail--item">Họ và tên: ${name}</div>
	<div class="order__detail--item">Số điện thoại: ${phone}</div>
	<div class="order__detail--item">Email: ${email}</div>
	<div class="order__detail--item">Địa chỉ: ${
      address + ", " + wards + ", " + districts + ", " + provinces
   }</div>
	<div class="order__detail--item">Ngày dặt: ${date}</div>
	`;
   parent.insertAdjacentHTML("beforeend", template);
}
// templateItemTableOrderDetail
function templateItemTableOrderDetail(parent, number, name, price, quantity) {
   let template = `
	<div class="order__item" style="width: 100%">
	<div class="order__center" style="width: 10%;">${number}</div>
	<div class="order__center" style="width: 55%;">${name}</div>
	<div class="order__center" style="width: 25%;">${localStorageManagement.currencyChange(
      price
   )}</div>
	<div class="order__center" style="width: 10%;">${quantity}</div>
	</div>
	</div>
	`;
   parent.insertAdjacentHTML("beforeend", template);
}
// templateFooterOrderDetail
function templateFooterOrderDetail(parent, id, totalQuantity, totalPrice) {
   let template = `
	<div class="order__detail--quantity">Tổng số lượng: ${totalQuantity}</div>
	<div class="order__detail--total">Tổng giá tiền: ${localStorageManagement.currencyChange(
      totalPrice
   )}</div>
	<div class="order__detail--btn">
	<button class="btn btn--return" data-id="${id}">Trả hàng</button>
	<button class="btn btn--order">Danh sách đơn hàng</button>
	</div>
	`;
   parent.insertAdjacentHTML("beforeend", template);
}
