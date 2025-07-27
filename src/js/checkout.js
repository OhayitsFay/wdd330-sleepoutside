import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

let orderSummary = new CheckoutProcess("so-cart", "#order-summary");

orderSummary.init();

orderSummary.calculateOrdertotal();

document.querySelector("#checkout").addEventListener("submit", function (event) {
  event.preventDefault();
  orderSummary.checkout();
});