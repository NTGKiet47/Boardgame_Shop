let product_detail = document.getElementById("product_detail");
let box_left = product_detail.children[0];
let box_right = product_detail.children[1];

document.addEventListener("DOMContentLoaded", function loadCardDetail() {
  console.log(box_left);
  let needed_id = sessionStorage.getItem("needed_id");
  let needed_img = sessionStorage.getItem("needed_img");
  let needed_name = sessionStorage.getItem("needed_name");
  let needed_price = sessionStorage.getItem("needed_price");

  let img = document.createElement("img");
  img.src = needed_img;
  box_left.appendChild(img);

  let right_content = document.createElement("div");
  right_content.innerHTML = `
  <div id="pro_header">
    <span id="product_name">Tên sản phẩm: ${needed_name}</span> 
      <div id="pro_additionInfo">
          <div id="star">
            <span>4.9</span>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div id="figures">
            <span>6.2k</span>
            <span>Đã bán</span>
          </div>
          <div id="comments">
            <span>4.8k</span>
            <span>Đánh giá</span>
          </div>
      </div>
  </div>
  <div id="pro_body">
    <span id="product_id">ID: ${needed_id}</span> <br>
    <span id="product_price">Giá sản phẩm: ${needed_price}đ <br></span>
    <i class="fa-solid fa-truck-fast"></i>
    <span id="shipfee">Phí vận chuyển: 0đ</span>
  </div>
    `;
  box_right.appendChild(right_content);
});
