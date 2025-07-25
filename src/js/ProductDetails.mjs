import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="msrp">$${product.SuggestedRetailPrice}</p>
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product-card__discount">You save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails("main");

    document.getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // get cuurent products in cart
    let products = getLocalStorage("so-cart");
  
    // confirm if cart is empty
    if(products) {
      let newProductList = products.concat(this.product);
      setLocalStorage("so-cart", newProductList);
    } else {
      /**
       * so-cart was empty
       * initialize with new/first product added
       * should be an array
       * */ 
      setLocalStorage("so-cart", Array(this.product));
    }
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);

    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}