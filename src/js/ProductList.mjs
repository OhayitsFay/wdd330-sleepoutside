import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product?.FinalPrice?.toFixed(2) || "0.00"}</p>
    </a>
  </li>`
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init(){
    const productList = await this.dataSource.getData(this.category);
    //const filteredList = filterProducts(productList);
    this.renderList(productList);
  }
  async sortBy(sortFilter) {
    let sortAttribute = sortFilter === 'name' ? 'Name' : 'FinalPrice';

    const productList = await this.dataSource.getData(this.category);
    const sortedList = productList.sort((a, b) => a[sortAttribute] - b[sortAttribute]);
    renderListWithTemplate(productCardTemplate, this.listElement, sortedList, 'afterBegin', true);
  }


  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
  }
}