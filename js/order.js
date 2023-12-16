let products = null;

fetch("../js/data.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
  });

let listCart = [];
function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  } else {
    listCart = [];
  }
}
checkCart();
function addCart(idProduct) {
  let productsCopy = JSON.parse(JSON.stringify(products));
  //// If this product is not in the cart
  if (!listCart[idProduct]) {
    listCart[idProduct] = productsCopy.filter(
      (product) => product.id == idProduct
    )[0];
    listCart[idProduct].quantity = 1;
  } else {
    //If this product is already in the cart.
    //I just increased the quantity
    listCart[idProduct].quantity++;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  addCartToHTML();
}
// thêm thẻ vào trang giỏ hàng (thanh toán)
addCartToHTML();
function addCartToHTML() {
  // clear data default
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";

  let totalHTML = document.querySelector(".totalQuantity");
  let totalQuantity = 0;
  // if has product in Cart
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `<img src="${product.img}">
              <div class="contentWrapper">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">${product.price}đ / 1 sản phẩm</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>
                <button onclick="deleteProduct(${product.id})">Xóa sản phẩm này</button>
              </div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
      }
    });
  }
  totalHTML.innerText = totalQuantity;
  payment();
}
function changeQuantity(idProduct, typeđ) {
  switch (typeđ) {
    case "+":
      listCart[idProduct].quantity++;
      break;
    case "-":
      listCart[idProduct].quantity--;

      // if quantity <= 0 then remove product in cart
      if (listCart[idProduct].quantity <= 0) {
        delete listCart[idProduct];
      }
      break;

    default:
      break;
  }
  // save new data in cookie
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  // reload html view cart
  addCartToHTML();
}
function deleteProduct(idProduct) {
  delete listCart[idProduct];
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  // reload html view cart
  addCartToHTML();
}
function payment() {
  let totalQuantityHTML = document.querySelector(".bill_totalQuantity");
  let totalPriceHTML = document.querySelector(".totalPrice");
  let totalQuantity = 0;
  let totalPrice = 0;
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        totalQuantity = totalQuantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
      }
    });
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = totalPrice + "000 đ";
}
// Bấm nút thanh toán
let orderButton = document.querySelector(".buttonCheckout");
let nameInput = document.getElementById("name");
let phoneInput = document.getElementById("phone");
let addressInput = document.getElementById("address");
let selectElement = document.getElementById("country");
orderButton.addEventListener("click", function () {
  // Kiểm tra rỗng
  if (nameInput.value === "") {
    alert("Nhập vào họ tên người mua");
    return false;
  }
  if (phoneInput.value === "") {
    alert("Nhập vào số điện thoại người mua");
    return false;
  }
  if (addressInput.value === "") {
    alert("Nhập vào địa chỉ người mua");
    return false;
  }
  if (selectElement.selectedIndex === 0) {
    alert("Hãy chọn thành phố");
    return false;
  }
  //Kiểm tra tính họp lệ
  if (phoneInput.value.length != 10) {
    alert("Hãy nhập đúng số điện thoại");
    return false;
  }
  return true;
});
