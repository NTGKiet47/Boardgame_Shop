let productsList_forDetail = null;
fetch("../js/data.json")
  .then((response) => response.json())
  .then((data) => {
    productsList_forDetail = data;
  });
// Bấm vào hiện thông tin
function saveCardDetail(idProduct) {
  productsList_forDetail.forEach((product) => {
    if (product.id == idProduct) {
      sessionStorage.setItem("needed_id", product.id);
      sessionStorage.setItem("needed_img", product.img);
      sessionStorage.setItem("needed_name", product.name);
      sessionStorage.setItem("needed_price", product.price);
    }
    return;
  });
  window.location.href = "../productDetail.html";
}
