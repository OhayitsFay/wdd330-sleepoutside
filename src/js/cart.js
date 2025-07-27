import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector(".product-list");
const dataSource = getLocalStorage("so-cart");
const shoppingCart = new ShoppingCart(dataSource, listElement);
shoppingCart.init();

loadHeaderFooter();

function renderCartContents() {
  document.querySelectorAll(".cart-card__remove").forEach((element) => {
    element.addEventListener("click", () => {
      const itemId = element.getAttribute("data-id");
      removeCartItem(itemId);
    });
  });
  function removeCartItem(itemId) {
    const cartItems = getLocalStorage("so-cart");
    const updatedCart = cartItems.filter(item => item.Id !== itemId);
    setLocalStorage("so-cart", updatedCart);
  }
}

renderCartContents();