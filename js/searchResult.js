document.addEventListener("DOMContentLoaded", () => {
  let storedResults = sessionStorage.getItem("searchResult");
  let searchResult = JSON.parse(storedResults);
  console.log(searchResult);
  let searchResultsContainer = document.querySelector(
    ".searchResultsContainer"
  );
  searchResult.forEach((product) => {
    let result = document.createElement("div");
    result.classList.add("card", "item");
    result.innerHTML = `
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
    searchResultsContainer.appendChild(result);
    console.log("ok");
  });
});
