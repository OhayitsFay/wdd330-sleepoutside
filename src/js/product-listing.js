import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

/*const category = getParam("category");

const headingElement = document.querySelector("#heading");
headingElement.innerHTML = `top products: ${category}`;
headingElement.style.textTransform = "capitalize";

const productData = new ProductData(category);

const targetElement = document.querySelector(".product-list");

const productList = new ProductList(category, productData, targetElement);

productList.init();*/


const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();