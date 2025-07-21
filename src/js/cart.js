import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const list = document.querySelector(".product-list");
const data = getLocalStorage("so-cart");

const shoppingCart = new ShoppingCart(data, list);
shoppingCart.init();

loadHeaderFooter("/partial/header.html", "/partial/footer.html");

function renderCartContents() {
  document.querySelectorAll(".cart-card__remove").forEach((element) => {
    element.addEventListener("click", () => {
      const itemId = element.getAttribute("data-id");
      removeCartItem(itemId);
    });
  });
}
function removeCartItem(itemId) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCart = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}
renderCartContents();
