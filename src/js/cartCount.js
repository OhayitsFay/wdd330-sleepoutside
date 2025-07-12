import { getLocalStorage } from "./utils.mjs";

const cartElement = document.querySelector(".cart");

const cartItems = getLocalStorage("so-cart");
let prodCount = 0;

if(cartItems){
    prodCount = cartItems.length;
}

if(prodCount > 0) {
  cartElement.insertAdjacentHTML("afterbegin", '<div id="product-count"></div>')

  const countElement = document.querySelector("#product-count");
  
  countElement.innerHTML = prodCount;
}