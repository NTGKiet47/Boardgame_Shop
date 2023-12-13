let productsList = null;
fetch("../js/data.json")
  .then((response) => response.json())
  .then((data) => {
    productsList = data;
  });

let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let searchClear = document.getElementById("searchClear");
let suggestionWrapper = document.getElementById("suggestionWrapper");
searchInput.addEventListener("keyup", () => {
  let searchValue = searchInput.value.toLowerCase();
  productsList.forEach((product) => {
    if (product.searchName.toLowerCase().includes(searchValue)) {
      let div = document.createElement("div");
      div.classList.add("suggest");
      div.innerHTML = `
      <span>${product.name}</span>
      `;
      suggestionWrapper.appendChild(div);
    }
  });
  if (searchValue === "") {
    while (suggestionWrapper.firstChild) {
      suggestionWrapper.removeChild(suggestionWrapper.firstChild);
    }
  }
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
});
// click vào gợi ý thì hiện lên ô tìm kiếm
document.querySelectorAll(".suggest").forEach((item) => {
  item.addEventListener("click", (event) => {
    searchInput.value = event.target.textContent;
    searchInput.focus();
  });
});
