let products_array = null;
window.addEventListener("load", () => {
  fetch("../js/data.json")
    .then((res) => res.json())
    .then((data) => {
      products_array = data;
      load_mostBuy();
    });
});
function load_mostBuy() {
  let product_list = document.querySelector("#product-list");

  if (products_array != null) {
    products_array.forEach((product) => {
      let rank = product.rank;
      if (rank == 1) {
        let newProduct = document.createElement("div");
        newProduct.classList.add("card", "item");
        newProduct.innerHTML = `
                      <a href="#">
                        <p class="card-id" hidden>${product.id}</p>
                        <div class="card-img">
                            <img class="product-img" src="${product.img}" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.price}</h5>
                            <p class="card-text">${product.name}</p>
                            </div>
                      </a>
                                            <button class="buyBtn button" onclick="addCart(${product.id})">Thêm vào giỏ hàng</button>`;

        product_list.appendChild(newProduct);
      }
    });
  } else {
    alert("Loading error!!!");
  }
}
