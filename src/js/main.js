import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("/partial/header.html", "/partial/footer.html");

const data = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const list = new ProductList("tents", data, listElement);

list.init();
