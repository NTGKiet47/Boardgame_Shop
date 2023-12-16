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
let suggests = document.querySelectorAll(".suggest");
searchInput.addEventListener("keyup", () => {
  clearSuggestions();
  let searchValue = searchInput.value.toLowerCase();
  if (searchValue != " ") {
    productsList.forEach((product) => {
      if (
        product.searchName.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        let span = document.createElement("span");
        span.classList.add("suggest");
        span.style.display = "block";
        span.innerText = product.name;
        span.onclick = function () {
          searchInput.value = span.innerText;
        };
        suggestionWrapper.appendChild(span);
      }
    });
  }
  if (searchValue === "") {
    clearSuggestions();
  }
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
});
function clearSuggestions() {
  while (suggestionWrapper.firstChild) {
    suggestionWrapper.removeChild(suggestionWrapper.firstChild);
  }
}
// click ra ngoai thi mat gợi ý
document.addEventListener("click", (event) => {
  if (
    event.target != searchInput &&
    event.target != searchButton &&
    event.target != suggestionWrapper
  ) {
    clearSuggestions();
  }
});
searchButton.onclick = function () {
  let searchResult = [];
  let searchValue = searchInput.value;
  productsList.forEach((product) => {
    if (
      product.searchName.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      searchResult.push(product);
    }
  });
  sessionStorage.setItem("searchResult", JSON.stringify(searchResult));
  console.log(searchResult);
  window.location.href = "searchResult.html";
};
document.addEventListener("keypress", (event) => {
  if (searchInput.value != "") {
    if (event.key === "Enter") {
      let searchResult = [];
      let searchValue = searchInput.value;
      productsList.forEach((product) => {
        if (
          product.searchName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          searchResult.push(product);
        }
      });
      sessionStorage.setItem("searchResult", JSON.stringify(searchResult));
      console.log(searchResult);
      window.location.href = "searchResult.html";
    }
  }
});
