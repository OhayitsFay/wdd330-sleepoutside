import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const data = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const list = new ProductList("tents", data, listElement);

list.init();