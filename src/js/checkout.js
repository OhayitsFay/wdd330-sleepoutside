import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

let orderSummary = new CheckoutProcess("so-cart", "#order-summary");

orderSummary.init();

orderSummary.calculateOrdertotal();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.forms["checkout"];
  const isValid = form.checkValidity();

  if (!isValid) {
    form.reportValidity();
    return;
  }
  orderSummary.checkout();
});