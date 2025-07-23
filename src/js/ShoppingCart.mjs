import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__remove" data-id=${item.Id}>❌</button>
</li>`;

  return newItem;
}

function cartTotal() {
  let total = getLocalStorage("so-cart");
  total = total ? getLocalStorage("so-cart") : [];

  let totalCart = 0;
  for (let i = 0; i < total.length; i++) {
    let item = total[i];
    totalCart += item.FinalPrice;
  }

  if (totalCart > 0) {
    const cartTotalElement = document.querySelector(".cart-footer");
    cartTotalElement.classList.remove("hide");
    cartTotalElement.innerHTML = `Total: $${totalCart}`;
  }
}
export default class ShoppingCart {
  constructor(dataSource, listElement) {
      this.dataSource = dataSource;
      this.listElement = listElement;
  }

  async init() {
    this.renderList();
  }

  renderList() {
    renderListWithTemplate(cartItemTemplate, this.listElement, this.dataSource);
  }
}

cartTotal()
